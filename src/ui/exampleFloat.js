/* eslint-disable no-undef */
import { initRhiUI } from "/ui/ui.js";

/** @param {import(".").NS} ns */
export async function main(ns) {
  initRhiUI();
  let content = `
  <h1>Test, hello world!</h1>
  <button onclick="alert('i work')">Click me!</button>`;
  rhiUI.floatWindow('test', 'header', 300, 300, 5, 3, 10, content);
}