var running;
import getopts from "/ui/geopts.js";
export async function main(ns) {
    ns.disableLog("ALL"), !0 !== running && (running = !1);
    let opts = getopts(ns.args, matrixOpts(ns));
    !0 === opts.help
        ? help(ns)
        : opts._.length
        ? error(ns, "too many arguments.")
        : "boolean" == typeof opts.blur || opts.blur < 0 || opts.blur > 10 || !Number.isInteger(Math.floor(opts.blur))
        ? error(ns, "blur must be an integer from 0 to 10.")
        : "boolean" != typeof opts.color && Number.isInteger(Math.floor(opts.color))
        ? "boolean" == typeof opts.delay || opts.delay < 1 || opts.delay > 1e4 || !Number.isInteger(Math.floor(opts.delay))
            ? error(ns, "delay must be an integer from 1 to 10000.")
            : !1 !== opts.rainbow && (opts.rainbow < 1 || opts.rainbow > 100 || !Number.isInteger(Math.floor(opts.rainbow)))
            ? error(ns, "rainbow must be an integer from 1 to 100.")
            : ("boolean" == typeof opts.opacity || opts.opacity < 0 || opts.opacity > 100 || !Number.isInteger(Math.floor(opts.opacity))) && error(ns, "opacity must be an integer from 0 to 100.")
        : error(ns, "color must be an integer from 0 to 359."),
        !0 === opts.random && (opts.color = Math.floor(360 * Math.random())),
        !0 === opts.rainbow ? (opts.rainbow = 10) : (opts.rainbow = Math.floor(opts.rainbow)),
        running &&
            (ns.tprintf("%s: ERROR: script is already running.", ns.getScriptName()),
            ns.tprint("ERROR: Script is already running with"),
            ns.tprint("ERROR: other arguments. Kill previous"),
            ns.tprint("ERROR: PIDs if you want to use new "),
            ns.tprint("ERROR: arguments."),
            ns.exit());
    let doc = eval("document"),
        win = eval("window");
    running || mCleanup(), ns.atExit(mCleanup);
    try {
        doc.querySelector("#terminal").parentNode;
    } catch (e) {
        ns.tail(), ns.print("ERROR: Could not find terminal."), ns.print("ERROR: Please switch back to the terminal"), ns.print("ERROR: before running this script."), error(ns, "could not find terminal.");
    }
    ns.print("INFO: Matrix terminal background started."),
        ns.print(sprintf("INFO: Delay: %dms Hue: %d\xb0 Opacity: %d%%", Math.floor(opts.delay), Math.floor(opts.color), Math.floor(opts.opacity))),
        ns.print(sprintf("INFO: Blur: %dpx Rainbow: %s", Math.floor(opts.blur), !1 === opts.rainbow ? "Off" : Math.floor(opts.rainbow) + "s"));
    var style = doc.createElement("style");
    Object.assign(style, { id: "matrix-css" }), (style.type = "text/css"), (style.innerHTML = matrixCSS(opts)), doc.head.appendChild(style);
    let term = doc.querySelector("#terminal").parentNode;
    Object.assign(term.parentNode, { id: "transparent-term" });
    let canvas = doc.createElement("canvas");
    Object.assign(canvas, { id: "matrix-canvas" }), term.parentNode.insertBefore(canvas, term);
    var ctx = canvas.getContext("2d"),
        columns = [],
        chars = [];
    (canvas.height = win.screen.height), (canvas.width = win.screen.width), ctx.translate(canvas.width, 0), ctx.scale(-1, 1), (ctx.shadowBlur = 2);
    for (let i = 0; i < 300; columns[i] = 1, chars[i++] = "゠");
    for (running = !0; ; )
        (ctx.fillStyle = "rgba(0,0,0,0.05)"),
            (ctx.shadowColor = "#000"),
            ctx.fillRect(0, 0, canvas.width, canvas.height),
            columns.map(function (e, r) {
                (ctx.fillStyle = ctx.shadowColor = "#000"),
                    ctx.fillRect(10 * r, e - 10, 10, 10),
                    (ctx.fillStyle = ctx.shadowColor = "#0F0"),
                    ctx.fillText(chars[r], 10 * r, e - 10),
                    (columns[r] = e > 758 + 1e4 * Math.random() ? 0 : e + 10),
                    (chars[r] = String.fromCharCode(12448 + 96 * Math.random())),
                    (ctx.fillStyle = ctx.shadowColor = "#AFA"),
                    ctx.fillText(chars[r], 10 * r, e);
            }),
            await ns.sleep(opts.delay);
}
function matrixCSS(e) {
    let r = sprintf(" rainbow %ds infinite", !1 !== e.rainbow ? e.rainbow : 0);
    return [
        "canvas#matrix-canvas {",
        " position: fixed;",
        " top: 0;",
        " left: 0;",
        " pointer-events: none;",
				" z-index: -100;",
        " opacity:" + sprintf(" %d%%;", Math.floor(e.opacity)),
        " filter:" + sprintf(" hue-rotate(%ddeg)", Math.floor(e.color) % 360) + sprintf(" blur(%dpx)", Math.floor(e.blur)) + ";",
        !1 !== e.rainbow ? " -webkit-animation:" + r + ";" : "",
        "}",
        "",
        "@-webkit-keyframes rainbow {",
        " 0% { -webkit-filter: hue-rotate(0deg); }",
        " 100% { -webkit-filter: hue-rotate(359deg); }",
        "}",
				".MuiPaper-root {",
				" background-color: rgba(33,37,43,0.1);",
				" backdrop-filter: blur(1px);",
				"}",
				".MuiButtonBase-root {",
				" background-color: rgba(33,37,43,0.1);",
				" backdrop-filter: blur(1px);",
				"}",
				".MuiButton-root {",
				" background-color: rgba(75,82,99,0.1);",
				" backdrop-filter: blur(1px);",
				"}",
				".Mui-selected {",
				" background-color: rgba(75,82,99,0.4) !important;",
				" backdrop-filter: blur(1px);",
				"}",
				".MuiInput-root {",
				" background-color: rgba(33,37,43,0.1);",
				" backdrop-filter: blur(1px);",
				"}",
    ].join("\n");
}
function mCleanup() {
    running = !1;
    let doc = eval("document");
    try {
        doc.getElementById("matrix-canvas").remove(), doc.getElementById("matrix-css").remove();
    } catch (e) {}
}
function error(e, r, o = 0) {
    e.tprintf("%s: %s", e.getScriptName(), r), help(e);
}
function matrixOpts(e) {
    return {
        boolean: { help: ["h", "help"], random: ["r", "random"] },
        string: { blur: ["b", "blur"], color: ["c", "color"], delay: ["d", "delay"], opacity: ["o", "opacity"], rainbow: ["R", "rainbow"] },
        default: { blur: 0, color: 0, delay: 33, help: !1, opacity: 25, rainbow: !1, random: !1 },
        alias: { blur: ["b", "blur"], color: ["c", "color"], delay: ["d", "delay"], help: ["h", "help"], opacity: ["o", "opacity"], random: ["r", "random"], rainbow: ["R", "rainbow"] },
        unknown(r) {
            "t" == r && e.tail(), error(e, sprintf("invalid option: %s\n", (r.length > 1 ? "--" : "-") + r));
        },
    };
}
function help(e) {
    let r = e.tprintf;
    r("Usage: %s [OPTIONS]", e.getScriptName()),
        r(
            "\nChanges your terminal background to a green matrix style output.\n\n -b, --blur N Apply blur with N pixels. (default: 0)\n -c, --color DEG Color hue in degrees from the base. (default: 0)\n -d, --delay MS Delay in milliseconds between updates. (default: 33)\n Lower values result in faster animation.\n -o, --opacity PCT Percentage of opacity. (default: 25)\n -R, --rainbow [SEC] Loop through rainbow colors in seconds. (default: Off|10)\n\n -r, --random Chooses a random color. Overrides -c and --color.\n -t, --tail Tail the output log.\n\n -h, --help This help.\n\nNOTE: Can only be run when the terminal is visible."
        ),
        e.exit();
}
