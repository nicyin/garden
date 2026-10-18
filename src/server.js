/* eslint-env browser */

// @ts-check
// Optional JS type checking, powered by TypeScript.
/** @typedef {import("partykit/server").Room} Room */
/** @typedef {import("partykit/server").Server} Server */
/** @typedef {import("partykit/server").Connection} Connection */
/** @typedef {import("partykit/server").ConnectionContext} ConnectionContext */

// Hard cap on how many actions we keep. This is a forever-site safety net:
// PartyKit stores each value under a ~128 KiB limit, and at ~50 bytes per
// action that's ~2,500 drops before storage.put would start failing. Keeping
// the most recent actions stays comfortably under that.
const MAX_HISTORY = 1000;

// The Reset tool clears a plot entirely (contents + ripen + background), so any
// earlier actions targeting that same plot no longer affect the final state and
// can be dropped losslessly. This keeps the log small for the common
// "tend, reset, re-tend" pattern.
const RESET_TOOL_ID = "Reset";

/**
 * @implements {Server}
 */
class PartyServer {
  /**
   * @param {Room} room
   */
  constructor(room) {
    /** @type {Room} */
    this.room = room;
    /** @type {Array<{toolId: string, targetId: string}>} */
    this.history = [];
  }

  // Runs when the server starts (first connection, or after waking from idle).
  // Reload the saved history from storage so state survives restarts.
  async onStart() {
    this.history = (await this.room.storage.get("history")) ?? [];
  }

  /**
   * @param {Connection} conn - The connection object.
   * @param {ConnectionContext} ctx - The context object.
   */
  onConnect(conn, ctx) {
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // Send the full history to the new joiner so they see the current state
    conn.send(JSON.stringify({ type: "sync", history: this.history }));
  }

  /**
   * @param {string} message
   * @param {Connection} sender
   */
  async onMessage(message, sender) {
    try {
      const action = JSON.parse(message);

      // A Reset wipes its plot, so drop earlier actions on that same plot.
      if (action.toolId === RESET_TOOL_ID) {
        this.history = this.history.filter(
          (a) => a.targetId !== action.targetId
        );
      }

      this.history.push(action);

      // Safety net: never let the log grow past the storage limit.
      if (this.history.length > MAX_HISTORY) {
        this.history = this.history.slice(-MAX_HISTORY);
      }

      // Persist to storage so the garden survives when the room goes idle.
      await this.room.storage.put("history", this.history);
    } catch {}
    this.room.broadcast(message, [sender.id]);
  }
}

export default PartyServer;