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
    // Frozen garden: this page loads with the workshop's final state
    // already baked into the HTML. Dropping tools now still works for
    // you, locally, but nothing is saved or shared with anyone else —
    // reload the page and you're back to the frozen state.
  });
}

document.querySelectorAll("[data-plot], [data-droppable]").forEach(makeDropTarget);
