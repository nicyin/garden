/* eslint-env browser */

import "./styles.css";

import * as tools from "../participants/index.js";

const toolbar = document.getElementById("toolbar");

Object.values(tools).forEach(tool => {
  const btn = document.createElement("button");
  btn.innerHTML = `<span class="tool-icon">${tool.icon}</span><span class="tool-name">${tool.name}</span>`;
  btn.draggable = true;

  btn.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", tool.name);
  });

  toolbar.appendChild(btn);
});

function makeDropTarget(el) {
  el.addEventListener("dragover", e => {
    e.preventDefault();
    el.classList.add("drag-hover");
  });

  el.addEventListener("dragleave", () => {
    el.classList.remove("drag-hover");
  });

  el.addEventListener("drop", e => {
    e.preventDefault();
    el.classList.remove("drag-hover");
    const toolId = e.dataTransfer.getData("text/plain");
    const tool = Object.values(tools).find(t => t.name === toolId);
    if (!tool) return;
    tool.apply(el);
    // Frozen garden: nothing to send anywhere. Changes you make now are
    // local to your browser and aren't saved or shared with anyone else.
  });
}

document.querySelectorAll("[data-plot], [data-droppable]").forEach(makeDropTarget);

// Replay the garden's history (captured before the live PartyKit server shut
// down) so the page loads showing the final frozen state. Same lookup the
// old "sync" handler used: find tool by name, target by id, tool.apply(target).
fetch("garden-history.json")
  .then(res => res.json())
  .then(history => {
    history.forEach(({ toolId, targetId }) => {
      const tool = Object.values(tools).find(t => t.name === toolId);
      const target = document.getElementById(targetId);
      if (tool && target) tool.apply(target);
    });
  })
  .catch(err => {
    console.error("Couldn't load garden history:", err);
  });
