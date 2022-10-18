var running;
export async function main(ns) {
    let doc = eval("document")
    ns.disableLog("ALL"), !0 !== running && (running = !1);
    try {
        doc.getElementById("terminal").parentNode;
    } catch (e) {
        ns.tail(), ns.print("ERROR: Could not find terminal."), ns.print("ERROR: Please switch back to the terminal"), ns.print("ERROR: before running this script."), error(ns, "could not find terminal.");
        ns.print(e);
    }
    //pls work hh
    ns.print("INFO: Terminal background started.");
    let sty;
    sty = doc.createElement("style");
    sty.id = "bg-css"
    sty.type = "text/css"
    sty.innerHTML = bgCSS()
    doc.head.appendChild(sty);
    let term = doc.getElementById("terminal").parentNode;
    Object.assign(term.parentNode, { id: "transparent-term" });
    let img = doc.createElement("img");
    img.src = "https://gitlab.com/kalilinux/packages/kali-wallpapers/-/raw/kali/master/2023/backgrounds/kali/kali-cubism-16x9.png"
    Object.assign(img, { id: "bg-img" }), term.parentNode.insertBefore(img, term);
    await ns.sleep(1000);
}
function bgCSS(e) {
    return [
        "img#bg-img {",
        " position: fixed;",
        " top: 0;",
        " left: 0;",
        " pointer-events: none;",
		" z-index: -100;",
        " width: 1920px;",
        " height: 1080px;",
        "}",
        ".MuiPaper-root {",
        " background-color: rgba(33,37,43,0.5);",
        " backdrop-filter: blur(2px);",
        "}",
        ".MuiButtonBase-root {",
        " background-color: rgba(33,37,43,0.5);",
        " backdrop-filter: blur(2px);",
        "}",
        ".MuiButton-root {",
        " background-color: rgba(75,82,99,0.5);",
        " backdrop-filter: blur(2px);",
        "}",
        ".Mui-selected {",
        " background-color: rgba(75,82,99,0.5) !important;",
        " backdrop-filter: blur(2px);",
        "}",
        ".MuiInput-root {",
        " background-color: rgba(33,37,43,0.5);",
        " backdrop-filter: blur(2px);",
        "}",
    ].join("\n");
}

function mCleanup() {
    running = !1;
    let doc = eval("document");
    try {
        doc.getElementById("bg-canvas").remove(), doc.getElementById("bg-css").remove();
    } catch (e) {}
}

function error(e, r, o = 0) {
    e.tprintf("%s: %s", e.getScriptName(), r);
}
