/*___  _     _ _       _   _ _   _ ____                  _       _
|  _ \| |__ (_| )___  | | | | | | |  _ \   ___  ___ _ __(_)_ __ | |_
| |_) | '_ \| |// __| | |_| | | | | | | | / __|/ __| '__| | '_ \| __|
|  _ <| | | | | \__ \ |  _  | |_| | |_| | \__ \ (__| |  | | |_) | |_
|_| \_\_| |_|_| |___/ |_| |_|\___/|____/  |___/\___|_|  |_| .__/ \__|
                                                          |_|      */

import {hudHelper, globalHelper, formulaHelper, hashnetHelper, gangHelper} from "./helpers.js"
import { ProgressBar, FiraBar } from "./glyph.js"
import {run} from "node:test";

//Boolean indicating whether or not you have SF5
const sf5 = true

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
	{n: 10, lvl: 3},
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
	ovv.style.backgroundColor = "rgba(24,24,37,0.8)";
	ovv.style.backdropFilter = "blur(1px)";
	ovv.style.borderWidth = "2px";
	ovv.style.margin = "0px";
	ovv.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)"
	ovv.style.zIndex = "99999999";
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
	ovvCont.style.margin = "0px";

	//hide default stats
	//                  VV should be 15 if you don't have int unlocked
	for (let i = 0; i < 17; i++) {
		let elm = ovvCont.firstChild.childNodes[i]
		elm.style.display = "none";
	}

	//create global styles and variables
	let gVars = `let toKill = undefined;let bna = 0; let x = 0; let y = 0; let scpMin = false;let lvlMin = false;let crmMin = false;let monMin = false;let sklMin = false;let slvMin = true;let gngMin = false;let crpMin = false;let bldMin = false;let srvMin = false;let pltMin = false;let runMin = false;let mscMin = false;let bvsMin = false;let cusMin = false;let nsgRun = null;let toRun;let scriptContent = false;let scriptContentV0, scriptContentV1;let sleeveDo = {action: undefined, task: undefined};`
	let sty = `.scrRun:hover {background-color: ${col.hak}; color: ${col.def}} .ovvMin:hover {color: ${col.hak}} ${hudHelper.tooltip.style}`
	globalHelper.createGlobalStyle("hudSty", sty)
	globalHelper.createGlobalScript("hudMins", gVars);
	let buttonCSS = `transition: all 0.2s; display: inline; width: 90%; background-color: rgba(0,0,0,0); cursor: pointer;`

	//make bitverse
	hudHelper.bitverse(hook0, hook1, col.hak, sfs);
	hudHelper.tooltip.setElementTooltip("bn1" , hudHelper.tooltip.createBNObject(sfs[0] , "Source Genesis", "The original BitNode"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn2" , hudHelper.tooltip.createBNObject(sfs[1] , "Rise of the Underworld", "From the shadows, they rose"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn3" , hudHelper.tooltip.createBNObject(sfs[2] , "Corporatocracy", "The Price of Civilization"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn4" , hudHelper.tooltip.createBNObject(sfs[3] , "The Singularity", "The Man and the Machine"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn5" , hudHelper.tooltip.createBNObject(sfs[4] , "Artificial Intelligence", "Posthuman"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn6" , hudHelper.tooltip.createBNObject(sfs[5] , "Bladeburners", "Like Tears in Rain"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn7" , hudHelper.tooltip.createBNObject(sfs[6] , "Bladeburners 2079", "More human than humans"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn8" , hudHelper.tooltip.createBNObject(sfs[7] , "Ghost of Wall Street", "Money never sleeps"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn9" , hudHelper.tooltip.createBNObject(sfs[8] , "Hacktocracy", "Hacknet Unleashed"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn10", hudHelper.tooltip.createBNObject(sfs[9] , "Digital Carbon", "Your body is not who you are"), doneEL);
	hudHelper.tooltip.setElementTooltip("bn11", hudHelper.tooltip.createBNObject(sfs[10], "The Big Crash", "Okay. Sell it all."), doneEL);
	hudHelper.tooltip.setElementTooltip("bn12", hudHelper.tooltip.createBNObject(sfs[11], "The Recursion", "Repeat.", true), doneEL);
	hudHelper.tooltip.setElementTooltip("bn13", hudHelper.tooltip.createBNObject(sfs[12], "They're lunatics", "1 step back, 2 steps forward"), doneEL);
	const curTool = doc.getElementById(`bn${ns.getPlayer().bitNodeN}-tooltip`);
	curTool.innerHTML += `<br><span style="color: ${col.hak};">You are in this BitNode.</span>`

	//exposes certain NS functions to a global context
	gMinPID = ns.run("/src/nsg.js");

	//MISC global CSS
	let style = doc.createElement('style');
	const css = `.bnSpan {color: red;font-weight: bold;transition: all 0.2s;} .bnSpan1 {color: yellow;font-weight: bold;transition: all 0.2s;} .bnSpan2 {color: #48D1CC;font-weight: bold;transition: all 0.2s;} .bnSpan3 {color: blue;font-weight: bold;transition: all 0.2s;} .bnSpan:hover, .bnSpan1:hover, .bnSpan2:hover, .bnSpan3:hover {color: #FFFFFF;cursor: pointer;} .ovvCont {margin: 0px;font-family: 'FiraCode Nerd Font Mono', 'FiraCode NF Regular', 'Lucida Sans Unicode', monospace;font-weight: 400;font-size: 1rem;line-height: 0;}`
	// noinspection CommaExpressionJS
	Object.assign(style, { id: "glob-css" }), (style.type = "text/css"), (style.innerHTML = css), doc.head.appendChild(style);

	//cleanup
	ns.atExit(() => {
		//remove global styles and variables, as well as the BitNode display
		doc.getElementById("glob-css").remove();
		doc.getElementById("hudSty").remove();
		doc.getElementById("hudMins").remove();

		const bvels = doc.getElementsByClassName("bitverse")
		let bv = parseInt(bvels.length, 10)
		for (let i = 0; i < bv; i++) {
			bvels[0].remove();
		}
		//remove the tooltips from the DOM
		const tltels = doc.getElementsByClassName("tooltiptext")
		let tooltips = parseInt(tltels.length, 10)
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
		ovvCont.style.margin = "";
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
	hudHelper.pushCont(hed, val, "Augments:", col.int, "augs")
	/* --------------------------------
	 ____  _    _ _ _
	/ ___|| | _(_) | |___
	\___ \| |/ / | | / __|
	 ___) |   <| | | \__ \
	|____/|_|\_\_|_|_|___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, ' LEVELS ', '──────────────', lvlMin, "lvlMin", 'levels');
	hudHelper.startSec(hed, val, 'levels', "inline");
	hudHelper.pushCont(hed, val, "Hacking: ", col.hak, "skHak");
	hudHelper.pushCont(hed, val, "Str | Def: ", col.sta, "skStrDef");
	hudHelper.pushCont(hed, val, "Dex | Agi: ", col.sta, "skDexAgi");
	hudHelper.pushCont(hed, val, "Charisma: ", col.cha, "skCha");
	hudHelper.pushCont(hed, val, "Intelligence: ", col.int, "skInt");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, ' SKILL EXPERIENCE ', '─────────', sklMin, "sklMin", 'skill');
	hudHelper.startSec(hed, val, 'skill', "inline");
	hudHelper.pushCont(hed, val, "Hacking: ", col.hak, "xpHak");
	hudHelper.pushCont(hed, val, "Str | Def: ", col.sta, "xpStrDef");
	hudHelper.pushCont(hed, val, "Dex | Agi: ", col.sta, "xpDexAgi");
	hudHelper.pushCont(hed, val, "Charisma: ", col.cha, "xpCha");
	hudHelper.pushCont(hed, val, "Intelligence: ", col.int, "xpInt");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, '理 CRIMES 理', '──────────────', crmMin, "crmMin", 'crime');
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
	hudHelper.pushBreak(hed, val, ' MONEY & PROFIT ', '──────────', monMin, "monMin", 'money');
	hudHelper.startSec(hed, val, 'money', "inline");
	hudHelper.pushCont(hed, val, "Money: ", col.money, "money")
	hudHelper.pushCont(hed, val, "Gang Income: ", col.money, "gangIncome")
	hudHelper.pushCont(hed, val, "Hack Income: ", col.money, "hackIncome")
	hudHelper.startSubsec(hed, val, 'HASHNET', '─────────────────');
	hudHelper.pushContSub(hed, val, "Hashes: ", col.money, "hashes")
	hudHelper.pushContSub(hed, val, "Nodes: ", col.hak, "nodes")
	hudHelper.pushContSub(hed, val, '"Money":', col.money, "hashMoney")
	hudHelper.pushContSub(hed, val, 'Corp Fund:', col.money, "hashCorp")
	hudHelper.pushContSub(hed, val, 'Hash Gain:', col.hak, "hashGain")
	hudHelper.pushContSub(hed, val, '"Money" Gain:', col.money, "hashMoneyGain")
	hudHelper.pushContSub(hed, val, 'Corp FGain:', col.money, "hashCorpGain")
	hudHelper.pushContSub(hed, val, "Exchange: ", col.money, "hashExchangeMoney")
	hudHelper.pushContSub(hed, val, "Exchange: ", col.money, "hashExchangeCorp")
	hudHelper.endSubsec(hed, val);
	hudHelper.endSec(hed, val);
	/* --------------------------------
	 ____  _
	/ ___|| | ___  _____   _____  ___
	\___ \| |/ _ \/ _ \ \ / / _ \/ __|
	 ___) | |  __/  __/\ V /  __/\__ \
	|____/|_|\___|\___| \_/ \___||___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, ' SLEEVE ', '──────────────', slvMin, "slvMin", 'sleeve')
	hudHelper.startSec(hed, val, 'sleeve', "hidden");
	for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
		hudHelper.startSubsec(hed, val, `SLEEVE 0${i+1}`, '────────────────');
		hudHelper.pushContSub(hed, val, `General:`, col.int, `sleeve${i}`)
		hudHelper.pushContSub(hed, val, `Action: `, col.hak, `sleeve${i}Act`)
		hudHelper.pushContSub(hed, val, `Health: `, col.hp, `sleeve${i}Hp`)
		hudHelper.pushContSub(hed, val, `Hack: `, col.hak, `sleeve${i}Hak`)
		hudHelper.pushContSub(hed, val, `Str/Def: `, col.sta, `sleeve${i}StrDef`)
		hudHelper.pushContSub(hed, val, `Dex/Agi: `, col.sta, `sleeve${i}DexAgi`)
		hudHelper.pushContSub(hed, val, `Cha: `, col.cha, `sleeve${i}Cha`)
		hudHelper.endSubsec(hed, val)
	}
	hudHelper.pushCont(hed, val, "quikMug", col.hp, "slvMug")
	hudHelper.pushCont(hed, val, "quikMurder:", col.hp, "slvHom")
	hudHelper.endSec(hed, val);
	/* --------------------------------
	  ____
	 / ___| __ _ _ __   __ _
	| |  _ / _` | '_ \ / _` |
	| |_| | (_| | | | | (_| |
	 \____|\__,_|_| |_|\__, |
	                   |___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, ' GANG ', '───────────────', gngMin, "gngMin", 'gang');
	hudHelper.startSec(hed, val, "gang", gngMin ? "none" : "inline");
	hudHelper.pushCont(hed, val, "Bonus Time:", col.int, "gangBonusTime");
	hudHelper.pushCont(hed, val, "Faction:", col.cha, "gangFaction")
	hudHelper.pushCont(hed, val, "Respect:", col.cha, "gangRespect")
	hudHelper.pushCont(hed, val, "Power:", col.hp, "gangPower");
	hudHelper.pushCont(hed, val, "Territory:", col.hp, "gangTerritory");
	hudHelper.pushCont(hed, val, "Wanted Level:", col.cha, "gangWanted")
	hudHelper.pushCont(hed, val, "Clash Chance:", col.hp, "gangClashChance")
	hudHelper.pushCont(hed, val, "Equip Price *:", col.hp, "gangEquipDiscount")
	hudHelper.endSec(hed, val)
	/* --------------------------------
	  ____                                 _   _
	 / ___|___  _ __ _ __   ___  _ __ __ _| |_(_) ___  _ __
	| |   / _ \| '__| '_ \ / _ \| '__/ _` | __| |/ _ \| '_ \
	| |__| (_) | |  | |_) | (_) | | | (_| | |_| | (_) | | | |
	 \____\___/|_|  | .__/ \___/|_|  \__,_|\__|_|\___/|_| |_|
	                |_|
	-------------------------------- */
	hudHelper.pushBreak(hed, val, ' CORP ', '───────────────', crpMin, "crpMin", 'corp');
	hudHelper.startSec(hed, val, "corp", crpMin ? "none" : "inline");
	hudHelper.pushCont(hed, val, "Bonus Time:", col.int, "corpBonusTime")
	hudHelper.pushCont(hed, val, "Name:", col.cha, "corpName")
	hudHelper.pushCont(hed, val, "Funds:", col.money, "corpFunds")
	hudHelper.pushCont(hed, val, "Revenue:", col.money, "corpRevenue")
	hudHelper.pushCont(hed, val, "Expenses:", col.money, "corpExpenses")
	hudHelper.pushCont(hed, val, "Profit:", col.money, "corpProfit")
	hudHelper.pushCont(hed, val, "Shares:", col.hak, "corpShares")
	hudHelper.endSec(hed, val)
	/* --------------------------------
	 ____  _           _      _
	| __ )| | __ _  __| | ___| |__  _   _ _ __ _ __   ___ _ __
	|  _ \| |/ _` |/ _` |/ _ \ '_ \| | | | '__| '_ \ / _ \ '__|
	| |_) | | (_| | (_| |  __/ |_) | |_| | |  | | | |  __/ |
	|____/|_|\__,_|\__,_|\___|_.__/ \__,_|_|  |_| |_|\___|_|
	-------------------------------- */;
	hudHelper.pushBreak(hed, val, ' BLADEBURNERS ', '───────────', bldMin, "bldMin", 'blade');
	hudHelper.startSec(hed, val, "blade", bldMin ? "none" : "inline");
	hudHelper.pushCont(hed, val, "Bonus Time:", col.int, "bladeBonus");
	hudHelper.pushCont(hed, val, "Rank:", col.int, "bladeRank");
	hudHelper.pushCont(hed, val, "Stamina:", col.hp, "bladeStamina");
	hudHelper.pushCont(hed, val, "Action:", col.hak, "bladeAction");
	hudHelper.pushCont(hed, val, "Time:", col.hak, "bladeTime");
	hudHelper.pushCont(hed, val, "Level:", col.hak, "bladeLevel")
	hudHelper.pushCont(hed, val, "Est. Chance:", col.hak, "bladeChance");
	hudHelper.pushCont(hed, val, "Skill Points:", col.int, "bladeSkill");
	hudHelper.pushCont(hed, val, "City:", col.def, "bladeCity");
	hudHelper.endSec(hed, val)
	/* --------------------------------
	 ____
	/ ___|  ___ _ ____   _____ _ __ ___
	\___ \ / _ \ '__\ \ / / _ \ '__/ __|
	 ___) |  __/ |   \ V /  __/ |  \__ \
	|____/ \___|_|    \_/ \___|_|  |___/
	-------------------------------- */
	hudHelper.pushBreak(hed, val, ' SERVER ', '──────────────', srvMin, "srvMin", 'server');
	hudHelper.startSec(hed, val, 'server', "inline");
	hudHelper.pushCont(hed, val, "Home: ", col.hak, "srvHome");
	for (let i = 0; i <= srvs.length - 1; i++) {
		const dspSrv = srvs[i].replace('hacknet-node', 'HKN');
		hudHelper.pushCont(hed, val, `${dspSrv}:`, col.hak, `srv${i}`);
	}
	hudHelper.endSec(hed, val);
	hudHelper.pushBreak(hed, val, ' ACTIVE SCRIPTS (HOME SERVER) ', '───', scpMin, "scpMin", 'scripts');
	hudHelper.startSec(hed, val, 'scripts', "inline");
	hed.push(`<span style="cursor: default;" id="lAScripts"></span>`)
	val.push(`<span style="cursor: default;" id="rAScripts"></span>`)
	hudHelper.endSec(hed, val);
	/* --------------------------------
	 __  __ ___ ____   ____
	|  \/  |_ _/ ___| / ___|
	| |\/| || |\___ \| |
	| |  | || | ___) | |___
	|_|  |_|___|____/ \____|
	-------------------------------- */
	hudHelper.pushBreak(hed, val, '祥 PLAYTIME 祥', '─────────────', pltMin, "pltMin", 'playt');
	hudHelper.startSec(hed, val, "playt", "inline");
	hudHelper.pushCont(hed, val, `BN${ns.getPlayer().bitNodeN}: `, col.time, "playTimeBN");
	hudHelper.pushCont(hed, val, "Total: ", col.time, "playTimeTotal");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, ' SCRIPT RUNNERS ', '──────────', runMin, "runMin", 'srcr');
	hudHelper.startSec(hed, val, "srcr", "inline");
	hudHelper.pushCont(hed, val, "Breach: ", col.hak, "runBreach");
	hudHelper.pushCont(hed, val, "Matrix: ", col.hak, "runMatrix");
	hudHelper.pushCont(hed, val, "Map: ", col.hak, "runMap");
	hudHelper.pushCont(hed, val, "Programs: ", col.int, "runPrograms");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, ' MISC ', '───────────────', mscMin, "mscMin", 'misc');
	hudHelper.startSec(hed, val, "misc", "inline");
	hudHelper.pushCont(hed, val, "Share Bonus:", col.int, "shareBonus");
	hudHelper.startSubsec(hed, val, 'DAEDALUS REQS', '──────────────');
	hudHelper.pushContSub(hed, val, "Money:", col.money, "daedalusReqMoney");
	hudHelper.pushContSub(hed, val, "Hacking Exp:", col.hak, "daedalusReqHak");
	hudHelper.pushContSub(hed, val, "Strength Exp:", col.sta, "daedalusReqStr");
	hudHelper.pushContSub(hed, val, "Defense Exp:", col.sta, "daedalusReqDef");
	hudHelper.pushContSub(hed, val, "Dexterity Exp:", col.sta, "daedalusReqDex");
	hudHelper.pushContSub(hed, val, "Agility Exp:", col.sta, "daedalusReqAgi");
	hudHelper.endSubsec(hed, val);
	hudHelper.startSubsec(hed, val, 'COVENANT REQS', '──────────────');
	hudHelper.pushContSub(hed, val, "Money:", col.money, "covenantReqMoney");
	hudHelper.pushContSub(hed, val, "Hacking Exp:", col.hak, "covenantReqHak");
	hudHelper.pushContSub(hed, val, "Strength Exp:", col.sta, "covenantReqStr");
	hudHelper.pushContSub(hed, val, "Defense Exp:", col.sta, "covenantReqDef");
	hudHelper.pushContSub(hed, val, "Dexterity Exp:", col.sta, "covenantReqDex");
	hudHelper.pushContSub(hed, val, "Agility Exp:", col.sta, "covenantReqAgi");
	hudHelper.endSubsec(hed, val);
	hudHelper.startSubsec(hed, val, 'ILLUMINATI REQS', '─────────────');
	hudHelper.pushContSub(hed, val, "Money:", col.money, "illuminatiReqMoney");
	hudHelper.pushContSub(hed, val, "Hacking Exp:", col.hak, "illuminatiReqHak");
	hudHelper.pushContSub(hed, val, "Strength Exp:", col.sta, "illuminatiReqStr");
	hudHelper.pushContSub(hed, val, "Defense Exp:", col.sta, "illuminatiReqDef");
	hudHelper.pushContSub(hed, val, "Dexterity Exp:", col.sta, "illuminatiReqDex");
	hudHelper.pushContSub(hed, val, "Agility Exp:", col.sta, "illuminatiReqAgi");
	hudHelper.endSubsec(hed, val);
	hudHelper.pushCont(hed, val, "w0r1d_d43m0n", col.hak, "worldDaemonRq");
	//hudHelper.pushCont(hed, val, "", col.hak, "worldDaemonHak");
	hudHelper.endSec(hed, val);
	// --------------------------------
	hudHelper.pushBreak(hed, val, ' BITVERSE ', '─────────────', bvsMin, "bvsMin", 'bitverseDSP');
	hook0.innerHTML = hed.join(" \n");
	hook1.innerHTML = val.join("\n");

	// Set buttons or things that don't need to be constantly updated
	hudHelper.updateVal("augs", ns.singularity.getOwnedAugmentations().length);
	// hash buttons
	hudHelper.updateVal("hashExchangeMoney", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/getHashMoney.js', false]">Exchange hashes for money</button>`);
	hudHelper.updateVal("hashExchangeCorp", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/getHashCorp.js', false]">Exchange hashes for Corp funds.</button>`);

	//sleeve homicide & mug
	hudHelper.updateVal("slvMug", `<span class="gngRun" style="${buttonCSS}" onclick="sleeveDo.action = 'crime'; sleeveDo.task = 'Mug';">Set every Sleeve to Mug</button>`);
	hudHelper.updateVal("slvHom", `<span class="gngRun" style="${buttonCSS}" onclick="sleeveDo.action = 'crime'; sleeveDo.task = 'Homicide';">Set every Sleeve to Homicide</button>`);

	// script runners
	hudHelper.updateVal("runBreach", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/breach.js', false]">Root every server you can.</button>`);
	hudHelper.updateVal("runMatrix", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/ui/matrix.js', false]">Create a Matrix background.</button>`);
	hudHelper.updateVal("runMap", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/mapt.gns.js', true]">Show a map of all servers.</button>`);
	hudHelper.updateVal("runPrograms", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/buyPrograms.js', false]">Purchase TOR/all programs.</button>`);

	//init running scripts display
	let runningScripts = ns.ps()
	let shownPIDs = [];
	for (let i = 0; i < runningScripts.length; i++) {
		if (runningScripts[i].filename !== "weaken-once.js" || runningScripts[i].filename !== "grow-once.js" || runningScripts[i].filename !== "hack-once.js") {
			let dRunningScriptsHed = [];
			let dRunningScriptsVal = [];
			dRunningScriptsHed.push(`<div class="scr${runningScripts[i].pid}">`);
			dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">│╭──────────────</span><br>`)
			dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hak};">RAM / Threads:</span><br>`)
			dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hak};">PID: </span><br>`)
			dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hp};">Kill: </span><br>`)

			let ramUse = ns.getScriptRam(runningScripts[i].filename) * runningScripts[i].threads;
			dRunningScriptsHed.push(`<div class="scr${runningScripts[i].pid}">`);
			dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hak};">${runningScripts[i].filename}</span><span style="cursor: default; color: #ffffff"> ╮│</span><br>`)
			dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hak};">${ramUse} / ${runningScripts[i].threads}</span><span style="cursor: default; color: #ffffff">││</span><br>`)
			dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hp};"><span class="scrRun" style="${buttonCSS}" onclick="toKill = ${runningScripts[i].pid}">Stop Running Script</button></span><span style="cursor: default; color: #ffffff">││</span><br>`)

			hudHelper.endSubsec(dRunningScriptsHed, dRunningScriptsVal);
			dRunningScriptsHed.push(`</div>`)
			dRunningScriptsVal.push(`</div>`)
			shownPIDs.push(runningScripts[i].pid);

			doc.getElementById("lAScripts").innerHTML = dRunningScriptsHed.join("");
			doc.getElementById("rAScripts").innerHTML = dRunningScriptsVal.join("");
		}
	}

	//actual HUD
	while (true) {
		try {
			const ply = ns.getPlayer();

			// Formulae
			hudHelper.tooltip.setElementTooltip("ovv-hashMoney", hudHelper.tooltip.createObject("(<i>numHashes</i> / 4) * 1e6"))

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
			hudHelper.tooltip.setElementTooltip("ovv-xpHak",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', nhLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpStrDef", hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'strength', nsLvl, sf5), '0,0')} | ${ns.nFormat(formulaHelper.getExpReq(ns, 'defense', ndeLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpDexAgi", hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', ndxLvl, sf5), '0,0')} | ${ns.nFormat(formulaHelper.getExpReq(ns, 'agility', naLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpCha",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'charisma', ncLvl, sf5), '0,0')}`), doneEL)
			hudHelper.tooltip.setElementTooltip("ovv-xpInt",    hudHelper.tooltip.createObject(`<b>EXP required for next level</b><br>${ns.nFormat(formulaHelper.getExpReq(ns, 'intelligence', niLvl, false), '0,0')}`), doneEL)
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
			if (ns.gang.inGang()) {
				hudHelper.updateVal("gangIncome", ns.nFormat((5 * ns.gang.getGangInformation()['moneyGainRate']), '$0,0') + ' /s');
			} else {
				hudHelper.updateVal("gangIncome", 'N/A');
			}
			hudHelper.updateVal("hackIncome", ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s');

			// Hashnet
			if (ns.hacknet.numNodes() > 0) {
				let hashGain = 0;
				for (let i = 0; i < ns.hacknet.numNodes(); i++) {
					hashGain += ns.hacknet.getNodeStats(i).production;
				}
				const posCorp = hashnetHelper.canGet(ns, "Sell for Corporation Funds")
				hudHelper.updateVal("hashes", `${ns.nFormat(ns.hacknet.numHashes(), '0,0.000')} / ${ns.nFormat(ns.hacknet.hashCapacity(), '0,0')}`);
				hudHelper.updateVal("nodes", ns.nFormat(ns.hacknet.numNodes(), '0,0'));
				hudHelper.updateVal("hashMoney", `${ns.nFormat(Math.floor(ns.hacknet.numHashes() / 4) * 1000000, '$0,0')} / ${ns.nFormat((ns.hacknet.hashCapacity() / 4) * 1000000, '$0,0')}`);
				hudHelper.updateVal("hashCorp", ns.nFormat(posCorp * 1000000000, '$0,0'));
				hudHelper.updateVal("hashGain", ns.nFormat(hashGain, '0,0.000') + ' h/s');
				hudHelper.updateVal("hashMoneyGain", `${ns.nFormat((hashGain / 4) * 1000000, '$0,0')}/s`);
				hudHelper.updateVal("hashCorpGain", `${ns.nFormat((hashGain / ns.hacknet.hashCost("Sell for Corporation Funds")) * 1000000000, '$0,0')}/s`);
			} else {
				hudHelper.updateVal("hashes", "You don't have a hashnet node!")
				hudHelper.updateVal("nodes", "N/A")
				hudHelper.updateVal("hashMoney", "N/A")
				hudHelper.updateVal("hashCorp", "N/A")
				hudHelper.updateVal("hashGain", "N/A")
				hudHelper.updateVal("hashMoneyGain", "N/A")
				hudHelper.updateVal("hashCorpGain", "N/A")
			}

			// Sleeve
			for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
				let action = ns.sleeve.getTask(i);
				let stat = ns.sleeve.getSleeve(i).skills;
				let hp = {cur: ns.sleeve.getSleeve(i).hp.current, max: ns.sleeve.getSleeve(i).hp.max}
				// Shock & Sync
				hudHelper.updateVal(`sleeve${i}`, `Shock: ${ns.nFormat(ns.sleeve.getSleeve(i).shock / 100, '0.000%')} | Sync: ${ns.nFormat(ns.sleeve.getSleeve(i).sync / 100, '0.00%')}`);
				if (action != null) {
					switch (action.type) {
						case "CRIME": hudHelper.updateVal(`sleeve${i}Act`, `Crime, ${action.crimeType}`); break;
						case "FACTION": hudHelper.updateVal(`sleeve${i}Act`, `Faction Work for ${action.factionName}: ${action.factionWorkType}`); break;
						case undefined: hudHelper.updateVal(`sleeve${i}Act`, `Bladeburner: ${action.actionType}: ${action.actionName}`); break;
					}
				} else { hudHelper.updateVal(`sleeve${i}Act`, `Idle`); }
				hudHelper.updateVal(`sleeve${i}Hp`, `${ns.nFormat(hp.cur, '0,0')} / ${ns.nFormat(hp.max, '0,0')} | ${ns.nFormat(hp.cur/hp.max, '0.00%')}`);
				hudHelper.updateVal(`sleeve${i}Hak`, `${ns.nFormat(stat.hacking, '0,0')}`);
				hudHelper.updateVal(`sleeve${i}StrDef`, `${ns.nFormat(stat.strength, '0,0')}/${ns.nFormat(stat.defense, '0,0')}`);
				hudHelper.updateVal(`sleeve${i}DexAgi`, `${ns.nFormat(stat.dexterity, '0,0')}/${ns.nFormat(stat.agility, '0,0')}`);
				hudHelper.updateVal(`sleeve${i}Cha`, `${ns.nFormat(stat.charisma, '0,0')}`);
			}

			// Gang
			if (ns.gang.inGang()) {
				let info = ns.gang.getGangInformation()
				let gangType = (info.isHacking) ? "Hacking" : "Combat";
				hudHelper.updateVal("gangBonusTime", ns.tFormat(ns.gang.getBonusTime()));
				hudHelper.updateVal("gangFaction", `${info.faction}, ${gangType}`);
				hudHelper.updateVal("gangRespect", ns.nFormat(info.respect, '0,0'));
				hudHelper.updateVal("gangPower", ns.nFormat(info.power, '0,0.00'));
				hudHelper.updateVal("gangTerritory", ns.nFormat(info.territory, '0.000%'));
				hudHelper.updateVal("gangWanted", ns.nFormat(info.wantedLevel, '0,0.00'));
				hudHelper.updateVal("gangClashChance", `${ns.nFormat(info.territoryClashChance, '0.0%')} / ${info.territoryWarfareEngaged ? "" : ""}`);
				hudHelper.updateVal("gangEquipDiscount", gangHelper.getUpgradeDiscount(info.power, info.respect));
			} else {
				gngMin = true;
			}

			// Corp
			if (ply.hasCorporation) {
				let corp = eval("ns.corporation.getCorporation()");
				let bTime = eval("ns.corporation.getBonusTime()");
				hudHelper.updateVal("corpBonusTime", `${ns.tFormat(bTime)}`);
				hudHelper.updateVal("corpName", corp.name);
				hudHelper.updateVal("corpFunds", `$${ns.nFormat(corp.funds, '0,0')}`);
				hudHelper.updateVal("corpRevenue", `$${ns.nFormat(corp.revenue, '$0,0')}/s`);
				hudHelper.updateVal("corpExpenses", `$${ns.nFormat(corp.expenses, '$0,0')}/s`);
				hudHelper.updateVal("corpProfit", `$${ns.nFormat(corp.revenue - corp.expenses, '0,0')}/s`);
				hudHelper.updateVal("corpShares", `${ns.nFormat(corp.numShares, '0,0')} / ${ns.nFormat(corp.totalShares, '0,0')}`);
			} else {
				crpMin = true;
			}

			// Bladeburners
			if (ns.bladeburner.inBladeburner()) {
				let stm = ns.bladeburner.getStamina();
				hudHelper.updateVal("bladeBonus", `${ns.tFormat(ns.bladeburner.getBonusTime())}`)
				hudHelper.updateVal("bladeRank", ns.nFormat(ns.bladeburner.getRank(), '0,0'))
				hudHelper.updateVal("bladeStamina", `${ns.nFormat(stm[0], '0,0.00')}/${ns.nFormat(stm[1], '0,0.00')} | ${ns.nFormat(stm[0] / stm[1], '0.000%')}`)
				hudHelper.updateVal("bladeSkill", ns.nFormat(ns.bladeburner.getSkillPoints(), '0,0'))
				hudHelper.updateVal("bladeCity", ns.bladeburner.getCity())
				if (ns.bladeburner.getCurrentAction().type === "Idle") {
					hudHelper.updateVal("bladeAction", `Idle`)
					hudHelper.updateVal("bladeTime", `N/A`)
					hudHelper.updateVal("bladeLevel", `N/A`)
					hudHelper.updateVal("bladeChance", `N/A`)
				} else {
					let action  = ns.bladeburner.getCurrentAction()
					let chance  = ns.bladeburner.getActionEstimatedSuccessChance(action.type, action.name);
					let curTime = ns.bladeburner.getActionCurrentTime()
					let takTime = ns.bladeburner.getActionTime(action.type, action.name)
					let cbbLvl  = ns.bladeburner.getActionCurrentLevel(action.type, action.name);
					let mbbLvl  = ns.bladeburner.getActionMaxLevel(action.type, action.name);
					//mess with bb time display because the hud isn't big enough for "seconds" and "minutes"
					let dspCurTime = ns.tFormat(curTime)
					let dspTakTime = ns.tFormat(takTime)
					dspCurTime = dspCurTime.replace(' minutes', 'm');
					dspCurTime = dspCurTime.replace(' seconds', 's');
					dspCurTime = dspCurTime.replace(' minute' , 'm');
					dspCurTime = dspCurTime.replace(' second' , 's');
					dspTakTime = dspTakTime.replace(' minutes', 'm');
					dspTakTime = dspTakTime.replace(' seconds', 's');
					dspTakTime = dspTakTime.replace(' minute' , 'm');
					dspTakTime = dspTakTime.replace(' second' , 's');
					//actual adding
					hudHelper.updateVal("bladeAction", `${action.type}: ${action.name}`);
					hudHelper.updateVal("bladeTime", `${dspCurTime} / ${dspTakTime} : ${ns.nFormat(curTime / takTime, "0.00%")}`)
					hudHelper.updateVal("bladeLevel", `${ns.nFormat(cbbLvl, '0,0')} / ${ns.nFormat(mbbLvl, '0,0')}`);
					if (chance[0] !== chance[1]) {
						hudHelper.updateVal("bladeChance", `${ns.nFormat(chance[0], '0.00%')} ~ ${ns.nFormat(chance[1], '0.00%')}`)
					} else {
						hudHelper.updateVal("bladeChance", `${ns.nFormat(chance[0], '0.00%')}`)
					}
				}
			} else {
				bldMin = true;
			}

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
					const inc = ns.getScriptIncome(rS[i].pid);
					const ram = ns.getScriptRam(rS[i].filename) * rS[i].threads;
					scripts += `<b>${i + 1}: ${rS[i].filename}</b>: ${rS[i].threads} threads, PID ${rS[i].pid}, RAM: ${ns.nFormat(ram, '0,0.0')}, Income: $${ns.nFormat(inc, '0,0')}<br>`;
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

			// Running scripts
			for (let i = rs.length; i >= 0; i--) {
				if (shownPIDs.indexOf(rS[i].pid) !== -1) rS.splice(i, 1); // Remove any scripts that are already shown
				if (rS[i].filename !== "weaken-once.js" || rS[i].filename !== "grow-once.js" || rS[i].filename !== "hack-once.js") rS.splice(i, 1)
			}

			// Add new scripts
			for (let i = 0; i < rS.length; i++) {
				let unbroken = true;
				for (let j = shownPIDs.length; j >= 0; j--) {
					if (shownPIDs[j] === rS[i].pid) unbroken = false;
				}
				if (unbroken) {
					let dRunningScriptsHed = [];
					let dRunningScriptsVal = [];
					dRunningScriptsHed.push(`<div class="scr${rS[i].pid}">`);
					dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">│╭──────────────</span><br>`)
					dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hak};">RAM / Threads:</span><br>`)
					dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hak};">PID: </span><br>`)
					dRunningScriptsHed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col.hp};">Kill: </span><br>`)

					let ramUse = ns.getScriptRam(rS[i].filename) * rS[i].threads;
					dRunningScriptsHed.push(`<div class="scr${rS[i].pid}">`);
					dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hak};">${rS[i].filename}</span><span style="cursor: default; color: #ffffff"> ╮│</span><br>`)
					dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hak};">${ramUse} / ${rS[i].threads}</span><span style="cursor: default; color: #ffffff">││</span><br>`)
					dRunningScriptsVal.push(`<span style="cursor: default; color: ${col.hp};"><span class="scrRun" style="${buttonCSS}" onclick="toKill = ${rS[i].pid}">Stop Running Script</button></span><span style="cursor: default; color: #ffffff">││</span><br>`)

					hudHelper.endSubsec(dRunningScriptsHed, dRunningScriptsVal);
					dRunningScriptsHed.push(`</div>`)
					dRunningScriptsVal.push(`</div>`)
					shownPIDs.push(rS[i].pid);

					doc.getElementById("lAScripts").innerHTML = dRunningScriptsHed.join("");
					doc.getElementById("rAScripts").innerHTML = dRunningScriptsVal.join("");
				}
			}

			// remove old scripts
			for (let i = shownPIDs.length; i >= 0; i--) {
				let unbroken = true;
				for (let j = rS.length; j >= 0; j--) {
					if (shownPIDs[i] === rS[j].pid) unbroken = false;
				}
				if (unbroken) {
					doc.getElementById(`scr${shownPIDs[i]}`).remove();
					shownPIDs.splice(i, 1);
				}
			}

			// Playtime
			hudHelper.updateVal("playTimeBN", ns.tFormat(ply.playtimeSinceLastBitnode));
			hudHelper.tooltip.setElementTooltip("ovv-playTimeBN", hudHelper.tooltip.createObject(`<b>In ms:</b><br>${ply.playtimeSinceLastBitnode}`), doneEL)
			hudHelper.updateVal("playTimeTotal", ns.tFormat(ply.totalPlaytime));
			hudHelper.tooltip.setElementTooltip("ovv-playTimeTotal", hudHelper.tooltip.createObject(`<b>In ms:</b><br>${ply.totalPlaytime}`), doneEL)

			// MISC
			hudHelper.updateVal("shareBonus", ns.nFormat(ns.getSharePower(), '0.000'));
			//DAEDALUS
			hudHelper.updateVal("daedalusReqMoney", `$${ns.nFormat(ply.money, '0,0')} / $100,000,000,000`);
			hudHelper.updateVal("daedalusReqHak", ns.nFormat(formulaHelper.getExpReq(ns, 'hacking',   2500, sf5), '0,0'));
			hudHelper.updateVal("daedalusReqStr", ns.nFormat(formulaHelper.getExpReq(ns, 'strength',  1500, sf5), '0,0'));
			hudHelper.updateVal("daedalusReqDef", ns.nFormat(formulaHelper.getExpReq(ns, 'defense',   1500, sf5), '0,0'));
			hudHelper.updateVal("daedalusReqDex", ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', 1500, sf5), '0,0'));
			hudHelper.updateVal("daedalusReqAgi", ns.nFormat(formulaHelper.getExpReq(ns, 'agility',   1500, sf5), '0,0'));
			//COVENANT
			hudHelper.updateVal("covenantReqMoney", `$${ns.nFormat(ply.money, '0,0')} / $75,000,000,000`);
			hudHelper.updateVal("covenantReqHak", ns.nFormat(formulaHelper.getExpReq(ns, 'hacking',   850, sf5), '0,0'));
			hudHelper.updateVal("covenantReqStr", ns.nFormat(formulaHelper.getExpReq(ns, 'strength',  850, sf5), '0,0'));
			hudHelper.updateVal("covenantReqDef", ns.nFormat(formulaHelper.getExpReq(ns, 'defense',   850, sf5), '0,0'));
			hudHelper.updateVal("covenantReqDex", ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', 850, sf5), '0,0'));
			hudHelper.updateVal("covenantReqAgi", ns.nFormat(formulaHelper.getExpReq(ns, 'agility',   850, sf5), '0,0'));
			//ILLUMINATI
			hudHelper.updateVal("illuminatiReqMoney", `$${ns.nFormat(ply.money, '0,0')} / $150,000,000,000`);
			hudHelper.updateVal("illuminatiReqHak", ns.nFormat(formulaHelper.getExpReq(ns, 'hacking',   1500, sf5), '0,0'));
			hudHelper.updateVal("illuminatiReqStr", ns.nFormat(formulaHelper.getExpReq(ns, 'strength',  1200, sf5), '0,0'));
			hudHelper.updateVal("illuminatiReqDef", ns.nFormat(formulaHelper.getExpReq(ns, 'defense',   1200, sf5), '0,0'));
			hudHelper.updateVal("illuminatiReqDex", ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', 1200, sf5), '0,0'));
			hudHelper.updateVal("illuminatiReqAgi", ns.nFormat(formulaHelper.getExpReq(ns, 'agility',   1200, sf5), '0,0'));
			// world daemon
			const wdl = ns.getBitNodeMultipliers().WorldDaemonDifficulty * 3000
			hudHelper.tooltip.setElementTooltip("ovv-worldDaemonRq", hudHelper.tooltip.createObject(`Hack Req: ${wdl}`), doneEL);
			hudHelper.updateVal("worldDaemonRq", `You need ${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', wdl, sf5), '0,0')} exp.`);

			// check minimize buttons
			const els = [[bvsMin, 'bitverseDSP'], [bldMin, 'blade'], [gngMin, 'gang'], [crpMin, 'corp'], [lvlMin, 'levels'], [crmMin, 'crime'], [monMin, 'money'], [sklMin, 'skill'], [slvMin, 'sleeve'], [srvMin, 'server'], [pltMin, 'playt'], [runMin, 'srcr'], [mscMin, 'misc']];
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
