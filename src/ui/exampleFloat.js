/* eslint-disable no-undef */
import { initRhiUI } from "/ui/ui.js";
/** @param {import(".").NS} ns */
export async function main(ns) {
    initRhiUI();
    ns.run("/dev/null");
    rhiUI.createGlobNS(ns);
    let content = `
  <h1>Test, hello world!</h1>
  <h2 id="tsthck">Hack Skill: </h2>`;
    let scr = `function update() {
  document.getElementById("tsthck").innerHTML = "Hack Skill: " + globNS.getPlayer()["skills"]["hacking"]  
}
setInterval(update, 1000);`;
    rhiUI.floatWindow('test', 'header', 300, 300, 5, 3, 10, content);
}
