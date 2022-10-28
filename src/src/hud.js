/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { hudHelper, globalHelper, formulaHelper } from "./helpers.js"
import { ProgressBar, FiraBar } from "./glyph.js"

//colors for the UI, defined how they would be in CSS
const col = {
	money: "#e5C07B",
	def: "#FFFFFF",
	hak: "#98c379",
	sta: "#abb2bf",
	cha: "#c678dd",
	int: "#61AFEF",
	hp: "#E06C75"
}


let gMinPID;
/** @param {NS} ns */
/** @param {import("../../").NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	let hoverOvvCont = false;
	const doc = eval('document');
	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	const ovv = doc.getElementsByClassName('MuiPaper-root')[0];
	const ovvCont = ovv.childNodes[1].firstChild.firstChild.firstChild;
	let srvs = ns.args;
	let gVars = `const ovvMin = function(cls) {
		let els = document.getElementsByClassName(cls);
		for (let i=0; i < els.length; i++) {els[i].style.display = "hidden"}
		document.getElementById(cls).innerHTML = "";
		document.getElementById(cls).onclick = ` + "`ovvMax(${cls})`" + `
	}
	const ovvMax = function(cls) {
		let els = document.getElementsByClassName(cls);
		for (let i=0; i < els.length; i++) {els[i].style.display = "inline"}
		document.getElementById(cls).innerHTML = "";
		document.getElementById(cls).onclick = ` + "`ovvMin('${cls}')`" + `
	}
	let lvlMin = false;
	let crmMin = false;
	let monMin = false;
	let sklMin = false;
	let slvMin = true;
	let gngMin = false;
	let crpMin = false;
	let bldMin = false;
	let srvMin = false;
	let pltMin = false;
	let runMin = false;
	let mscMin = false;
	let cusMin = false;
	let nsgRun = null;
	let toRun;
	let scriptContent = false;
	let scriptContentV0, scriptContentV1;
	let sleeveDo = {action: undefined, task: undefined};`
	let sty = `.scrRun:hover {background-color: ${col.hak}; color: ${col.def}}
	.ovvMin:hover {color: ${col.hak}}`
	globalHelper.createGlobalStyle("hudSty", sty)
	globalHelper.createGlobalScript("hudMins", gVars);
	gMinPID = ns.run("/src/nsg.js");
	let buttonCSS = `transition: all 0.2s; display: inline; width: 90%; background-color: rgba(0,0,0,0); cursor: pointer;`
	while (true) {
		ovv.style.borderRadius = "0px 0px 10px 10px";
		ovv.style.backgroundColor = "rgba(33,37,43,0.8)";
		ovv.style.backdropFilter = "blur(1px)";
		ovv.style.border = "none";
		ovv.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)"
		ovv.style.zIndex = "99999999";
		ovv.style.transiton = "all .2s";
		/*ovv.addEventListener('mouseover', (e) => {
			ovv.style.transform = "scale(1)";
		});
		ovv.addEventListener('mouseout', (e) => {
			ovv.style.transform = "scale(1)";
		});*/
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
		//                  VV should be 15 if you don't have int unlocked
		for (let i = 0; i < 17; i++) {
			let elm = ovvCont.firstChild.childNodes[i]
			elm.style.display = "none";
		}
		try {
			const hed = [];
			const val = [];
			hudHelper.startHud(hed ,val)
			hudHelper.pushCont(hed, val, "In: " + ns.getPlayer()['city'], "At: " + ns.getPlayer()['location'], col.def);
			hudHelper.pushCont(hed, val, "Health: ", `${ns.nFormat(ns.getPlayer().hp.current, '0,0')} / ${ns.nFormat(ns.getPlayer().hp.max, '0,0')} | ${ns.nFormat(ns.getPlayer().hp.current/ns.getPlayer().hp.max, '0.000%')}`, col.hp)
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'LEVELS', '────────────────', lvlMin, "lvlMin", 'levels');
			hudHelper.startSec(hed, val, "levels", lvlMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Hacking: ", `${ns.nFormat(ns.getPlayer().skills.hacking, '0,0')}`, col.hak);
			hudHelper.pushCont(hed, val, "Str | Def: ", `${ns.nFormat(ns.getPlayer().skills.strength, '0,0')} | ${ns.nFormat(ns.getPlayer().skills.defense, '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, "Dex | Agi: ", `${ns.nFormat(ns.getPlayer().skills.dexterity, '0,0')} | ${ns.nFormat(ns.getPlayer().skills.agility, '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, "Charisma: ", `${ns.nFormat(ns.getPlayer().skills.charisma, '0,0')}`, col.cha);
			hudHelper.pushCont(hed, val, 'Intelligence: ', ns.nFormat(ns.getPlayer().skills.intelligence, '0,0'), col.int);
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'SKILL EXPERIENCE', '───────────', sklMin, "sklMin", 'skill');
			hudHelper.startSec(hed, val, "skill", sklMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Hacking: ", ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'), col.hak);
			hudHelper.pushCont(hed, val, "Str | Def: ", ns.nFormat(ns.getPlayer()['exp']['strength'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['defense'], '0,0'), col.sta);
			hudHelper.pushCont(hed, val, "Dex | Agi: ", ns.nFormat(ns.getPlayer()['exp']['dexterity'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['agility'], '0,0'), col.sta);
			hudHelper.pushCont(hed, val, "Charisma: ", ns.nFormat(ns.getPlayer()['exp']['charisma'], '0,0'), col.cha);
			hudHelper.pushCont(hed, val, 'Intelligence: ', ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'), col.int);
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'CRIMES', '────────────────', crmMin, "crmMin", 'crime');
			hudHelper.startSec(hed, val, "crime", crmMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Total Karma: ", ns.nFormat(ns.heart.break(), '0,0'), col.cha);
			hudHelper.pushCont(hed, val, "People Killed: ", ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'), col.hp);
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'MONEY & PROFIT', '────────────', monMin, "monMin", 'money');
			hudHelper.startSec(hed, val, "money", monMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Money: ", ns.nFormat(ns.getPlayer()['money'], '$0,0'), col.money);
			if (ns.gang.inGang()) {
				if (ns.gang.getGangInformation()['moneyGainRate'] > 0) {
					hudHelper.pushCont(hed, val, "Gang Income: ", ns.nFormat((5 * ns.gang.getGangInformation()['moneyGainRate']), '$0,0') + ' /s', col.money);
				}
			}
			hudHelper.pushCont(hed, val, 'Hack Income: ', ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s', col.money);
			/*if (ns.hacknet.numHashes() > 0) {
			hed.push('Hashes: ');
				val.push(' ' + ns.hacknet.numHashes().toPrecision(3) + ' / ' + ns.hacknet.hashCapacity().toPrecision(3));
			}*/
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'SLEEVE', '────────────────', slvMin, "slvMin", 'sleeve')
			hudHelper.startSec(hed, val, "sleeve", slvMin ? "none" : "inline");
			for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
				hudHelper.pushCont(hed, val, `Sleeve ${i}:`, `Shock: ${ns.nFormat(ns.sleeve.getSleeveStats(i).shock, '0.000%')} | Sync: ${ns.nFormat(ns.sleeve.getSleeveStats(i).sync / 100, '0.00%')}`, col.int)
				let action = ns.sleeve.getTask(i);
				let stat = ns.sleeve.getSleeveStats(i)
				let hp = {cur: ns.sleeve.getInformation(i).hp.current, max: ns.sleeve.getInformation(i).hp.max}
				if (action != null) {
					switch (action.type) {
						case "CRIME":
							hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│</span> Action: `, `Crime, ${action.crimeType}`, col.hak)
							break;
						case "FACTION":
							hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│</span> Action: `, `Faction Work for ${action.factionName}: ${action.factionWorkType}`, col.hak)
							break;
						case undefined:
							hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│</span> Action: `, `Bladeburner: ${action.actionType}: ${action.actionName}`, col.hak);
							break;
					}
				} else {
					hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│</span> Action: `, `Idle`, col.sta)
				}
				hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│ </span>Health: `, `${ns.nFormat(hp.cur, '0,0')} / ${ns.nFormat(hp.max, '0,0')} | ${ns.nFormat(hp.cur/hp.max, '0.00%')}`, col.hp);
				hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│ </span>Hack: `, `${ns.nFormat(stat.hacking, '0,0')}`, col.hak);
				hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│ </span>Str/Def: `, `${ns.nFormat(stat.strength, '0,0')}/${ns.nFormat(stat.defense, '0,0')}`, col.sta);
				hudHelper.pushCont(hed, val, ` <span style="color: ${col.def};">│ </span>Dex/Agi: `, `${ns.nFormat(stat.dexterity, '0,0')}/${ns.nFormat(stat.agility, '0,0')}`, col.sta);
				hudHelper.pushCont(hed, val, ` ╰─────────────`, `────────────────────────────────────────────`, col.def)
			}
			hudHelper.pushCont(hed, val, "quikMurder:", `<span class="gngRun" style="${buttonCSS}" onclick="sleeveDo.action = 'crime'; sleeveDo.task = 'Homicide';">Set every Sleeve to Homicide</button>`, col.hp)
			hudHelper.endSec(hed, val);
			// --------------------------------
			if (ns.gang.inGang()) {
				hudHelper.pushBreak(hed, val, 'GANG', '─────────────────', gngMin, "gngMin", 'gang');
				hudHelper.startSec(hed, val, "gang", gngMin ? "none" : "inline");
				if (ns.gang.getBonusTime() > 3000) {
					hudHelper.pushCont(hed, val, "Bonus Time: ", ns.tFormat(ns.gang.getBonusTime()), col.int);
				}
				let gangType = (ns.gang.getGangInformation().isHacking) ? "Hacking" : "Combat";
				hudHelper.pushCont(hed, val, "Faction: ", ns.gang.getGangInformation()['faction'] + ', ' + gangType, col.def);	
				hudHelper.pushCont(hed, val, "Respect: ", ns.nFormat(ns.gang.getGangInformation()['respect'], '0,0'), col.cha);
				if (ns.gang.getGangInformation()['power'] > 1) {
					hudHelper.pushCont(hed, val, "Power: ", ns.nFormat(ns.gang.getGangInformation()['power'], '0,0.00'), col.hp);
				}
				hudHelper.pushCont(hed, val, "Territory: ", ns.nFormat(ns.gang.getGangInformation()['territory'], '0.000%'), col.hp);
				if (ns.gang.getGangInformation()['wantedLevel'] > 1) {
					hudHelper.pushCont(hed, val, "Wanted Level: ", ns.nFormat(ns.gang.getGangInformation()['wantedLevel'], '0,0'), col.cha);
				}
				if (ns.gang.getGangInformation()['territoryClashChance'] > 0) {
					hudHelper.pushCont(hed, val, "Clash Chance: ", ns.nFormat(ns.gang.getGangInformation()['territoryClashChance'], '0.0%') + ' / ' + ((ns.gang.getGangInformation()['territoryWarfareEngaged']) ? "" : ""), col.hp);
				}
				hudHelper.endSec(hed, val);
			}
			// --------------------------------
			if (ns.getPlayer()['hasCorporation']) {
				let corp = eval("ns.corporation.getCorporation()");
				let bTime = eval("ns.corporation.getBonusTime()")
				hudHelper.pushBreak(hed, val, 'CORP', '─────────────────', crpMin, "crpMin", 'corp');
				hudHelper.startSec(hed, val, "corp", crpMin ? "none" : "inline");
				if (bTime > 3000) {
					hudHelper.pushCont(hed, val, "Bonus Time: ", `${ns.tFormat(bTime)}`, col.hak);
				}
				hudHelper.pushCont(hed, val, "Name: ", corp['name'], col.def);
				hudHelper.pushCont(hed, val, "Funds: ", ns.nFormat(corp['funds'], '$0,0'), col.money);
				hudHelper.pushCont(hed, val, "Revenue: ", ns.nFormat(corp['revenue'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(hed, val, "Expenses: ", ns.nFormat(corp['expenses'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(hed, val, "Profit: ", ns.nFormat(corp['revenue'] - corp['expenses'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(hed, val, "Shares: ", ns.nFormat(corp['numShares'], '0,0') + ' / ' + ns.nFormat(corp['totalShares'], '0,0'), col.hak);
				hudHelper.endSec(hed, val);
			}
			// --------------------------------
			if (ns.getPlayer()['inBladeburner']) {
				hudHelper.pushBreak(hed, val, 'BLADEBURNERS', '─────────────', bldMin, "bldMin", 'blade');
				hudHelper.startSec(hed, val, "blade", bldMin ? "none" : "inline");
				if (ns.bladeburner.getBonusTime > 3000) {
					hudHelper.pushCont(hed, val, "Bonus Time: ", `${ns.tFormat(ns.bladeburner.getBonusTime())}`, col.hak)
				}
				hudHelper.pushCont(hed, val, "Rank: ", ns.nFormat(ns.bladeburner.getRank(), '0,0'), col.cha);
				let stm = ns.bladeburner.getStamina();
				hudHelper.pushCont(hed, val, "Stamina: ", `${ns.nFormat(stm[0], '0,0.00')}/${ns.nFormat(stm[1], '0,0.00')} | ${ns.nFormat(stm[0] / stm[1], '0.000%')}`, col.hp);
				if (ns.bladeburner.getCurrentAction().type == "Idle") {
					hudHelper.pushCont(hed, val, "Action: ", ns.bladeburner.getCurrentAction()['type'], col.sta);
				} else {
					let action = ns.bladeburner.getCurrentAction()
					let chance = ns.bladeburner.getActionEstimatedSuccessChance(action.type, action.name);
					let curTime = ns.bladeburner.getActionCurrentTime()
					let takTime = ns.bladeburner.getActionTime(action.type, action.name)
					let cbbLvl = ns.bladeburner.getActionCurrentLevel(action.type, action.name);
					let mbbLvl = ns.bladeburner.getActionMaxLevel(action.type, action.name);
					//mess with bb time display because the hud isn't big enough for "seconds" and "minutes"
					let dspCurTime = ns.tFormat(curTime)
					let dspTakTime = ns.tFormat(takTime)
					dspCurTime = dspCurTime.replace(' minutes', 'm');
					dspCurTime = dspCurTime.replace(' seconds', 's');
					dspCurTime = dspCurTime.replace(' minute', 'm');
					dspCurTime = dspCurTime.replace(' second', 's');
					dspTakTime = dspTakTime.replace(' minutes', 'm');
					dspTakTime = dspTakTime.replace(' seconds', 's');
					dspTakTime = dspTakTime.replace(' minute', 'm');
					dspTakTime = dspTakTime.replace(' second', 's');
					//actual adding
					hudHelper.pushCont(hed, val, "Action: ", `${action.type}: ${action.name}`, col.hak);
					hudHelper.pushCont(hed, val, "Time: ", `${dspCurTime} / ${dspTakTime} : ${ns.nFormat(curTime / takTime, "0.00%")}`)
					hudHelper.pushCont(hed, val, "Level: ", `${ns.nFormat(cbbLvl, '0,0')} / ${ns.nFormat(mbbLvl, '0,0')}`);
					if (chance[0] != chance[1]) {
						hudHelper.pushCont(hed, val, "Est. Chance: ", `${ns.nFormat(chance[0], '0.00%')} ~ ${ns.nFormat(chance[1], '0.00%')}`, col.hak)
					} else {
						hudHelper.pushCont(hed, val, "Chance: ", `${ns.nFormat(chance[0], '0.00%')}`, col.hak)
					}
				}
				hudHelper.pushCont(hed, val, "Skill Points: ", ns.nFormat(ns.bladeburner.getSkillPoints(), '0,0'), col.hak);
				hudHelper.pushCont(hed, val, "City: ", ns.bladeburner.getCity(), col.sta);
				hudHelper.endSec(hed, val);
			}
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'SERVER', '────────────────', srvMin, "srvMin", 'server');
			hudHelper.startSec(hed, val, "server", srvMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, 'Home: ', "   Cores: " + ns.getServer('home').cpuCores + " | Ram: " + ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'), col.hak);
			const mxRm = ns.getServerMaxRam('home');
			const usRm = ns.getServerUsedRam('home');
			const pcRm = (usRm / mxRm) * 100;
			const pdf = 2.27272727272727;
			const dpb = Math.floor(pcRm / pdf);
			ns.print(`filled: ` + dpb);
			ns.print(`precent of ram: ` + pcRm * 100);
			hudHelper.pushCont(hed, val, 'Home: ', `${ProgressBar(44, dpb, FiraBar)}`, col.hak)
			for (let i = 0; i <= srvs.length - 1; i++) {
				hudHelper.pushCont(hed, val, srvs[i] + ": ", `Cores: ${ns.getServer(srvs[i]).cpuCores} | Ram: ${ns.nFormat(ns.getServerUsedRam(srvs[i]), '0,0')} / ${ns.nFormat(ns.getServerMaxRam(srvs[i]), '0,0')}`, col.hak);
			}
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'PLAYTIME', '───────────────', pltMin, "pltMin", 'playt');
			hudHelper.startSec(hed, val, "playt", pltMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, `BN${ns.getPlayer()['bitNodeN']}: `, ns.tFormat(ns.getPlayer()['playtimeSinceLastBitnode']), col.def);
			hudHelper.pushCont(hed, val, 'Total: ', ns.tFormat(ns.getPlayer()['totalPlaytime']), col.def);
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'SCRIPT RUNNERS', '────────────', runMin, "runMin", 'srcr');
			hudHelper.startSec(hed, val, 'srcr', runMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Breach: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/xsink/breach.js', false]">Root every server you can.</button>`, col.hak)
			hudHelper.pushCont(hed, val, "Matrix: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/ui/matrix.js', false]">Create a Matrix background.</button>`, col.hak)
			hudHelper.pushCont(hed, val, "Map: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/mapt.js', true]">Show a map of all servers.</button>`, col.hak)
			hudHelper.endSec(hed, val);
			// --------------------------------
			hudHelper.pushBreak(hed, val, 'MISC', '─────────────────', mscMin, "mscMin", 'misc');
			hudHelper.startSec(hed, val, 'misc', mscMin ? "none" : "inline");
			hudHelper.pushCont(hed, val, "Daedalus Req:", `Hacking Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', 2500), '0,0')}`, col.hak);
			hudHelper.pushCont(hed, val, " │ ", `Strength Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'strength', 1500), '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, " │ ", `Defense Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'defense', 1500), '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, " │ ", `Dexterity Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'dexterity', 1500), '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, " │ ", `Agility Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'agility', 1500), '0,0')}`, col.sta);
			hudHelper.pushCont(hed, val, ` ╰─────────────`, `────────────────────────────────────────────`, col.def)
			const wdl = ns.getBitNodeMultipliers().WorldDaemonDifficulty * 3000
			hudHelper.pushCont(hed, val, "w0r1d_d43m0n", `Hack Req: ${wdl}`, col.hak);
			hudHelper.pushCont(hed, val, "", `You need ${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', wdl), '')} exp.`, col.hak);
			hudHelper.endSec(hed, val);
			if (scriptContent) {
				hudHelper.pushBreak(hed, val, 'SCRIPT CONTENT', '────────────', cusMin, "cusMin", 'scriptCont')
				hudHelper.startSec(hed, val, 'scriptCont', cusMin ? "none" : "inline");
				hudHelper.pushCont(hed, val, `<span id="scriptContent-hook-0">${scriptContentV0}</span>`, `<span id="scriptContent-hook-1">${scriptContentV1}</span>`, col.def);
				hudHelper.endSec(hed, val);
			}
			hudHelper.endHud(hed ,val);
			hook0.innerHTML = hed.join(" \n");
			hook1.innerHTML = val.join("\n");	
		}
		catch (err) {
			ns.print("ERROR: Update Skipped: " + String(err));
		}
		await ns.sleep(1000);
	}
}
