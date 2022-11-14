/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
// noinspection JSUnusedLocalSymbols,InfiniteLoopJS,CommaExpressionJS

/*
 _               _    _
| |__  _   _  __| |  (_)___
| '_ \| | | |/ _` |  | / __|
| | | | |_| | (_| |_ | \__ \
|_| |_|\__,_|\__,_(_)/ |___/
                   |__/

 ____  _     _ _       _   _ _   _ ____                  _       _
|  _ \| |__ (_| )___  | | | | | | |  _ \   ___  ___ _ __(_)_ __ | |_
| |_) | '_ \| |// __| | |_| | | | | | | | / __|/ __| '__| | '_ \| __|
|  _ <| | | | | \__ \ |  _  | |_| | |_| | \__ \ (__| |  | | |_) | |_
|_| \_\_| |_|_| |___/ |_| |_|\___/|____/  |___/\___|_|  |_| .__/ \__|
                                                          |_|
*/

import { hudHelper, globalHelper, formulaHelper } from "/helpers.e.js"
import { ProgressBar, AsciiBar as FiraBar } from "/glyph.js"

//don't edit this
const sf5 = false

const sfs = [
	{n: 1,  lvl: 2},
	{n: 2,  lvl: 1},
	{n: 3,  lvl: 1},
	{n: 4,  lvl: 0},
	{n: 5,  lvl: 1},
	{n: 6,  lvl: 0},
	{n: 7,  lvl: 1},
	{n: 8,  lvl: 0},
	{n: 9,  lvl: 1},
	{n: 10, lvl: 1},
	{n: 11, lvl: 0},
	{n: 12, lvl: 0},
	{n: 13, lvl: 0},
]

//colors for the UI, defined how they would be in CSS
const col = {
	money: "#F9E2AF",
	def: "#FFFFFF",
	hak: "#A6E3A1",
	sta: "#A6ADC8",
	cha: "#CBA6F7",
	int: "#89B4FA",
	hp: "#F38BA8"
}

let gMinPID;
/** @param {NS} ns */
/** @param {import("../../").NS} ns */
export async function main(ns) {
	//disable netscript def logs
	ns.disableLog("ALL");

	//the extra servers are args passed to the script
	let srvs = ns.args;

	//grab some document elements, define hud hovering var
	let hoverOvvCont = false;
	const doc = eval('document');
	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	const ovv = doc.getElementsByClassName('MuiPaper-root')[0];
	const ovvCont = ovv.childNodes[1].firstChild.firstChild.firstChild;
	let doneEL = false;

	//change styles of those document elements for the custom HUD
	ovv.style.borderRadius = "0px 0px 10px 10px";
	ovv.style.backgroundColor = "#181825";
	ovv.style.backdropFilter = "blur(1px)";
	ovv.style.borderWidth = "2px";
	ovv.style.margin = "0px";
	ovv.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)"
	ovv.style.zIndex = "99999999";
	ovv.style.opacity = "0.8"
	ovv.style.transiton = "all .2s";
	ovvCont.addEventListener('mouseover', (e) => {
		ovvCont.style.maxHeight = "600px";
		hoverOvvCont = true;
	});
	ovvCont.addEventListener('mouseout', (e) => {
		ovvCont.style.maxHeight = "400px";
		hoverOvvCont = false;
	});
	ovvCont.style.transition = "all .2s";

	if (!hoverOvvCont) ovvCont.style.maxHeight = "400px";

	ovvCont.style.overflow = "scroll";

	//hide default stats
	for (let i = 0; i < 15; i++) {
		let elm = ovvCont.firstChild.childNodes[i]
		elm.style.display = "none";
	}

	//create global styles and variables
	let gVars = `let bna = 0; let x = 0; let y = 0; let lvlMin = false;let crmMin = false;let monMin = false;let sklMin = false;let slvMin = true;let gngMin = false;let crpMin = false;let bldMin = false;let srvMin = false;let pltMin = false;let runMin = false;let mscMin = false;let bvsMin = false;let cusMin = false;let nsgRun = null;let toRun;let scriptContent = false;let scriptContentV0, scriptContentV1;let sleeveDo = {action: undefined, task: undefined};`
	let sty = `.scrRun:hover {background-color: ${col.hak}; color: ${col.def}} .ovvMin:hover {color: ${col.hak}} ${hudHelper.tooltip.style}`
	globalHelper.createGlobalStyle("hudSty", sty)
	globalHelper.createGlobalScript("hudMins", gVars);
	let buttonCSS = `transition: all 0.2s; display: inline; width: 90%; background-color: rgba(0,0,0,0); cursor: pointer;`

	//exposes certain NS functions to a global context
	gMinPID = ns.run("/nsg.e.js");

	//MISC global CSS
	let style = doc.createElement('style');
	const css = `.ovvCont {margin: 0px;font-family: 'FiraCode Nerd Font Mono', 'FiraCode NF Regular', 'Lucida Sans Unicode', monospace;font-weight: 400;font-size: 1rem;line-height: 0;}`
	Object.assign(style, { id: "glob-css" }), (style.type = "text/css"), (style.innerHTML = css), doc.head.appendChild(style);

	//cleanup
	ns.atExit(() => {
		//remove global styles and variables
		doc.getElementById("glob-css").remove();
		doc.getElementById("hudSty").remove();
		doc.getElementById("hudMins").remove();

		//remove the tooltips from the DOM
		const tltels = doc.getElementsByClassName("tooltiptext")
		tooltips = parseInt(tltels.length, 10)
		for (let i = 0; i < tooltips; i++) {
			tltels[0].remove();
		}
		doc.removeEventListener("mousemove", hudHelper.tooltip.updatePos, false)

		//set overview back to usual style
		hook1.innerHTML = "";
		hook0.innerHTML = "";
		ovv.style.borderRadius = "";
		ovv.style.backgroundColor = "";
		ovv.style.backdropFilter = "";
		ovv.style.borderWidth = "";
		ovv.style.margin = "";
		ovv.style.boxShadow = ""
		ovv.style.zIndex = "";
		ovv.style.transiton = "";
		for (let i = 0; i < 17; i++) {
			let elm = ovvCont.firstChild.childNodes[i]
			elm.style.display = "";
		}
	});

	//hud SETUP
	const hed = []
	const val = []
	hudHelper.startHud(hed, val);
	hudHelper.pushCont(hed, val, "Location: ", col.def, "loc")
	hudHelper.pushCont(hed, val, "Health: ", col.hp, "hp")
	/* --------------------------------
	 ____  _    _ _ _
	/ ___|| | _(_) | |___
	\___ \| |/ / | | / __|
	 ___) |   <| | | \__ \
	|____/|_|\_\_|_|_|___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, 'LEVELS', '────────────────', lvlMin, "lvlMin", 'levels');
	hudHelper.startSec(hed, val, 'levels', "inline");
	hudHelper.pushCont(hed, val, "Hacking: ", col.hak, "skHak");
	hudHelper.pushCont(hed, val, "Str | Def: ", col.sta, "skStrDef");
	hudHelper.pushCont(hed, val, "Dex | Agi: ", col.sta, "skDexAgi");
	hudHelper.pushCont(hed, val, "Charisma: ", col.cha, "skCha");
	hudHelper.pushCont(hed, val, "Intelligence: ", col.int, "skInt");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, 'SKILL EXPERIENCE', '───────────', sklMin, "sklMin", 'skill');
	hudHelper.startSec(hed, val, 'skill', "inline");
	hudHelper.pushCont(hed, val, "Hacking: ", col.hak, "xpHak");
	hudHelper.pushCont(hed, val, "Str | Def: ", col.sta, "xpStrDef");
	hudHelper.pushCont(hed, val, "Dex | Agi: ", col.sta, "xpDexAgi");
	hudHelper.pushCont(hed, val, "Charisma: ", col.cha, "xpCha");
	hudHelper.pushCont(hed, val, "Intelligence: ", col.int, "xpInt");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, 'CRIMES', '────────────────', crmMin, "crmMin", 'crime');
	hudHelper.startSec(hed, val, 'crime', "inline");
	hudHelper.pushCont(hed, val, "Karma: ", col.hp, "karma");
	hudHelper.pushCont(hed, val, "People Killed: ", col.hp, "kills");
	hudHelper.endSec(hed, val);
	/* --------------------------------
	 ____             __ _ _
	|  _ \ _ __ ___  / _(_) |_ ___
	| |_) | '__/ _ \| |_| | __/ __|
	|  __/| | | (_) |  _| | |_\__ \
	|_|   |_|  \___/|_| |_|\__|___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, 'MONEY & PROFIT', '────────────', monMin, "monMin", 'money');
	hudHelper.startSec(hed, val, 'money', "inline");
	hudHelper.pushCont(hed, val, "Money: ", col.money, "money")
	hudHelper.pushCont(hed, val, "Hack Income: ", col.money, "hackIncome")
	hudHelper.endSec(hed, val);
	/* --------------------------------
	 ____
	/ ___|  ___ _ ____   _____ _ __ ___
	\___ \ / _ \ '__\ \ / / _ \ '__/ __|
	 ___) |  __/ |   \ V /  __/ |  \__ \
	|____/ \___|_|    \_/ \___|_|  |___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, 'SERVER', '────────────────', srvMin, "srvMin", 'server');
	hudHelper.startSec(hed, val, 'server', "inline");
	hudHelper.pushCont(hed, val, "Home: ", col.hak, "srvHome");
	for (let i = 0; i <= srvs.length - 1; i++) {
		const dspSrv = srvs[i].replace('hacknet-node', 'HKN');
		hudHelper.pushCont(hed, val, `${dspSrv}:`, col.hak, `srv${i}`);
	}
	hudHelper.endSec(hed, val);
	/* --------------------------------
	 __  __ ___ ____   ____
	|  \/  |_ _/ ___| / ___|
	| |\/| || |\___ \| |
	| |  | || | ___) | |___
	|_|  |_|___|____/ \____|
	-------------------------------- */
	hudHelper.pushBreak(hed, val, 'PLAYTIME', '───────────────', pltMin, "pltMin", 'playt');
	hudHelper.startSec(hed, val, "playt", "inline");
	hudHelper.pushCont(hed, val, "Total: ", col.time, "playTimeTotal");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, 'SCRIPT RUNNERS', '────────────', runMin, "runMin", 'srcr');
	hudHelper.startSec(hed, val, "srcr", "inline");
	hudHelper.pushCont(hed, val, "Breach: ", col.hak, "runBreach");
	hudHelper.pushCont(hed, val, "Matrix: ", col.hak, "runMatrix");
	hudHelper.pushCont(hed, val, "Map: ", col.hak, "runMap");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.endHud(hed, val);
	hook0.innerHTML = hed.join(" \n");
	hook1.innerHTML = val.join("\n");

	// script runners
	hudHelper.updateVal("runBreach", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/breach.js', false]">Root every server you can.</button>`);
	hudHelper.updateVal("runMatrix", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/ui/matrix.js', false]">Create a Matrix background.</button>`);
	hudHelper.updateVal("runMap", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/mapt.js', true]">Show a map of all servers.</button>`);

	//actual HUD
	while (true) {
		try {
			const ply = ns.getPlayer();

			// Location & HP
			hudHelper.updateVal("loc", `${ply.city}: ${ply.location}`);
			hudHelper.updateVal("hp", `${ns.nFormat(ply.hp.current, '0,0')} / ${ns.nFormat(ply.hp.max, '0,0')} | ${ns.nFormat(ply.hp.current/ply.hp.max, '0.000%')}`);

			// Levels
			hudHelper.updateVal("skHak", ns.nFormat(ply.skills.hacking, '0,0'))
			hudHelper.updateVal("skStrDef", `${ns.nFormat(ply.skills.strength, '0,0')} | ${ns.nFormat(ply.skills.defense, '0,0')}`)
			hudHelper.updateVal("skDexAgi", `${ns.nFormat(ply.skills.dexterity, '0,0')} | ${ns.nFormat(ply.skills.agility, '0,0')}`)
			hudHelper.updateVal("skCha", ns.nFormat(ply.skills.charisma, '0,0'))
			hudHelper.updateVal("skInt", ns.nFormat(ply.skills.intelligence, '0,0'))

			// EXP
			const nhLvl = ply.skills.hacking + 1
			const nsLvl = ply.skills.strength + 1
			const ndeLvl = ply.skills.defense + 1
			const ndxLvl = ply.skills.dexterity + 1
			const naLvl = ply.skills.agility + 1
			const ncLvl = ply.skills.charisma + 1
			const niLvl = ply.skills.intelligence + 1
			/*hudHelper.tooltip.setElementTooltip("ovv-xpHak",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', nhLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpStrDef", hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'strength', nsLvl, sf5), '0,0')} | ${ns.nFormat(formulaHelper.getExpReq(ns, 'defense', ndeLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpDexAgi", hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', ndxLvl, sf5), '0,0')} | ${ns.nFormat(formulaHelper.getExpReq(ns, 'agility', naLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpCha",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'charisma', ncLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpInt",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'intelligence', niLvl, false), '0,0')}`), doneEL)*/
			hudHelper.updateVal("xpHak", ns.nFormat(ply.exp.hacking, '0,0'))
			hudHelper.updateVal("xpStrDef", `${ns.nFormat(ply.exp.strength, '0,0')} | ${ns.nFormat(ply.exp.defense, '0,0')}`)
			hudHelper.updateVal("xpDexAgi", `${ns.nFormat(ply.exp.dexterity, '0,0')} | ${ns.nFormat(ply.exp.agility, '0,0')}`)
			hudHelper.updateVal("xpCha", ns.nFormat(ply.exp.charisma, '0,0'))
			hudHelper.updateVal("xpInt", ns.nFormat(ply.exp.intelligence, '0,0'))

			// Crime
			hudHelper.updateVal("karma", ns.nFormat(ns.heart.break(), '0,0'));
			hudHelper.updateVal("kills", ns.nFormat(ply.numPeopleKilled, '0,0'));

			// Profit
			hudHelper.updateVal("money", `$${ns.nFormat(ply.money, '0,0')}`)
			hudHelper.updateVal("hackIncome", ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s');

			// Server(s)
			// Ram calcs and prog bar
			const mxRm = ns.getServerMaxRam('home');
			const usRm = ns.getServerUsedRam('home');
			const pcRm = (usRm / mxRm) * 100;
			const pdf = 2.27272727272727;
			const dpb = Math.floor(pcRm / pdf);
			hudHelper.updateVal("srvHome", ProgressBar(44, dpb, FiraBar));
			// Running Scripts
			let rS = ns.ps("home");
			let scripts = `<b>Ram: ${ns.nFormat(ns.getServerUsedRam("home"), '0,0')} / ${ns.nFormat(ns.getServerMaxRam('home'), '0,0')} Cores: ${ns.getServer('home').cpuCores}</b><h3 style='margin: 0;'>Running Scripts: ${rS.length}</h3>`;
			// {filename: '/src/gang.js', threads: 1, args: Array(0), pid: 1}
			for (let i = 0; i < rS.length; i++) {
				if (i < 20) {
					scripts += `<b>${i + 1}: ${rS[i].filename}</b>: ${rS[i].threads} threads, PID ${rS[i].pid}<br>`;
				} else {
					break;
				}
			}
			hudHelper.tooltip.setElementTooltip("ovv-srvHome", hudHelper.tooltip.createObject(scripts), doneEL)

			// Passed servers
			for (let i = 0; i <= srvs.length - 1; i++) {
				// Ram calcs and prog bar
				let cS = ns.ps(srvs[i]);
				const dspSrv = srvs[i].replace('hacknet-node', 'HKN');
				const mxRm = ns.getServerMaxRam(srvs[i]);
				const usRm = ns.getServerUsedRam(srvs[i]);
				const pcRm = (usRm / mxRm) * 100;
				const pdf = 2.27272727272727;
				const dpb = Math.floor(pcRm / pdf);
				hudHelper.updateVal(`srv${i}`, ProgressBar(44, dpb, FiraBar));
				// Running Scripts
				let cScripts = `<b>Ram: ${ns.nFormat(ns.getServerUsedRam(srvs[i]), '0,0')} / ${ns.nFormat(ns.getServerMaxRam(srvs[i]), '0,0')} Cores: ${ns.getServer(srvs[i]).cpuCores}</b><h3 style='margin: 0;'>Running Scripts: ${cS.length}</h3>`;
				for (let i = 0; i < cS.length; i++) {
					if (i < 5) {
						cScripts += `<b>${i + 1}: ${cS[i].filename}</b>: ${cS[i].threads} threads, PID ${cS[i].pid}<br>`;
					} else {
						break;
					}
				}
				hudHelper.tooltip.setElementTooltip(`ovv-srv${i}`, hudHelper.tooltip.createObject(cScripts), doneEL)
			}

			// Playtime
			hudHelper.updateVal("playTimeTotal", ns.tFormat(ply.totalPlaytime));
			hudHelper.tooltip.setElementTooltip("ovv-playTimeTotal", hudHelper.tooltip.createObject(`<b>In ms:</b><br>${ply.totalPlaytime}`), doneEL)

			// check minimize buttons
			const els = [[lvlMin, 'levels'], [crmMin, 'crime'], [monMin, 'money'], [sklMin, 'skill'], [srvMin, 'server'], [pltMin, 'playt'], [runMin, 'srcr']];
			for (let i = 0; i < els.length; i++) {
				const el = els[i];
				if (el[0]) {
					const es = doc.getElementsByClassName(el[1])
					es[0].style.display = 'none';
					es[1].style.display = 'none';
					doc.getElementById(el[1]).innerHTML = ""
				} else {
					const es = doc.getElementsByClassName(el[1])
					es[0].style.display = 'inline';
					es[1].style.display = 'inline';
					doc.getElementById(el[1]).innerHTML = ""
				}
			}
		}
		catch (err) {
			ns.print("ERROR: " + String(err));
		}
		await ns.sleep(100);
	}
}
