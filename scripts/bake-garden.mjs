// One-off tool, not part of the normal build.
//
// This was used once to freeze the garden: it replays garden-history.json's
// 85 saved actions against the garden's original starting markup (using the
// same participant tool code, via jsdom instead of a real browser), then
// prints the resulting .garden HTML so it can be pasted directly into
// public/index.html. That's how the site now loads instantly with the
// final look already baked in, instead of re-running the replay (and
// re-rolling every tool's Math.random() calls) on every page load.
//
// participants/*.js use ESM `export default` syntax, but this project's
// package.json has no "type": "module", so Node would otherwise refuse to
// import them from a plain CommonJS-flavored .js/.mjs. Easiest fix: bundle
// this file with esbuild first (which doesn't care about Node's module
// rules), then run the bundle with plain node:
//
//   npm install --no-save jsdom
//   npx esbuild scripts/bake-garden.mjs --bundle --platform=node \
//     --format=esm --external:jsdom --outfile=/tmp/bake-garden.bundle.mjs
//   node /tmp/bake-garden.bundle.mjs > /tmp/baked-garden.html

import { JSDOM } from "jsdom";
import fs from "fs";
import * as tools from "../participants/index.js";

const html = fs.readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
const dom = new JSDOM(html);
globalThis.document = dom.window.document;
globalThis.window = dom.window;

const history = JSON.parse(
  fs.readFileSync(new URL("../garden-history.json", import.meta.url), "utf8")
);
const toolList = Object.values(tools);

let applied = 0;
const skipped = [];
history.forEach(({ toolId, targetId }) => {
  const tool = toolList.find(t => t.name === toolId);
  const target = dom.window.document.getElementById(targetId);
  if (tool && target) {
    tool.apply(target);
    applied++;
  } else {
    skipped.push({ toolId, targetId, hasTool: !!tool, hasTarget: !!target });
  }
});

console.error(`Applied ${applied}/${history.length} actions.`);
if (skipped.length) {
  console.error("Skipped:", JSON.stringify(skipped, null, 2));
}

// Print the baked garden markup to stdout.
console.log(dom.window.document.querySelector(".garden").outerHTML);
