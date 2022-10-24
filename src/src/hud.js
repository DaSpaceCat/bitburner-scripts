/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { hudHelper, globalHelper } from "/src/helpers.js"

//colors for the UI, defined how they would be in CSS
const col = {
	money: "#e5C07B",
	def: "#FFFFFF",
	hak: "#98c379",
	sta: "#abb2bf",
	cha: "#c678dd",
	hp: "#E06C75"
}


let gMinPID;
/** @param {NS} ns */
/** @param {import(".").NS} ns */
export async function main(ns) {
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
		ovv.style.borderRadius = "10px";
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
		for (let i = 0; i < 15; i++) {
			let elm = ovvCont.firstChild.childNodes[i]
			elm.style.display = "none";
		}
		try {
			const headers = [];
			const values = [];
			hudHelper.startHud(headers ,values)
			hudHelper.pushCont(headers, values, "In: " + ns.getPlayer()['city'], "At: " + ns.getPlayer()['location'], col.def);
			hudHelper.pushCont(headers, values, "Health: ", `   ${ns.nFormat(ns.getPlayer().hp.current, '0,0')} / ${ns.nFormat(ns.getPlayer().hp.max, '0,0')} | ${ns.nFormat(ns.getPlayer().hp.current/ns.getPlayer().hp.max, '0.000%')}`, col.hp)
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'LEVELS', '────────────────', lvlMin, "lvlMin", 'levels');
			hudHelper.startSec(headers, values, "levels", lvlMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, "Hacking: ", `   ${ns.nFormat(ns.getPlayer().skills.hacking, '0,0')}`, col.hak);
			hudHelper.pushCont(headers, values, "Str | Def: ", `   ${ns.nFormat(ns.getPlayer().skills.strength, '0,0')} | ${ns.nFormat(ns.getPlayer().skills.defense, '0,0')}`, col.sta);
			hudHelper.pushCont(headers, values, "Dex | Agi: ", `   ${ns.nFormat(ns.getPlayer().skills.dexterity, '0,0')} | ${ns.nFormat(ns.getPlayer().skills.agility, '0,0')}`, col.sta);
			hudHelper.pushCont(headers, values, "Charisma: ", `   ${ns.nFormat(ns.getPlayer().skills.charisma, '0,0')}`, col.cha);
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'SKILL EXPERIENCE', '───────────', sklMin, "sklMin", 'skill');
			hudHelper.startSec(headers, values, "skill", sklMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, "Hacking: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'), col.hak);
			hudHelper.pushCont(headers, values, "Str | Def: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['strength'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['defense'], '0,0'), col.sta);
			hudHelper.pushCont(headers, values, "Dex | Agi: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['dexterity'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['agility'], '0,0'), col.sta);
			hudHelper.pushCont(headers, values, "Charisma: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['charisma'], '0,0'), col.cha);
			//hudHelper.pushCont(headers, values, 'Intelligence: ', '   ' + ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'), col.def);
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'CRIMES', '────────────────', crmMin, "crmMin", 'crime');
			hudHelper.startSec(headers, values, "crime", crmMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, "Total Karma: ", '   ' + ns.nFormat(ns.heart.break(), '0,0'), col.cha);
			hudHelper.pushCont(headers, values, "People Killed: ", '   ' + ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'), col.hp);
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'MONEY & PROFIT', '────────────', monMin, "monMin", 'money');
			hudHelper.startSec(headers, values, "money", monMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, "Money: ", '   ' + ns.nFormat(ns.getPlayer()['money'], '$0,0'), col.money);
			if (ns.gang.inGang()) {
				if (ns.gang.getGangInformation()['moneyGainRate'] > 0) {
					hudHelper.pushCont(headers, values, "Gang Income: ", '   ' + ns.nFormat((5 * ns.gang.getGangInformation()['moneyGainRate']), '$0,0') + ' /s', col.money);
				}
			}
			hudHelper.pushCont(headers, values, 'Hack Income: ', '   ' + ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s', col.money);
			/*if (ns.hacknet.numHashes() > 0) {
			headers.push('Hashes: ');
				values.push(' ' + ns.hacknet.numHashes().toPrecision(3) + ' / ' + ns.hacknet.hashCapacity().toPrecision(3));
			}*/
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'SLEEVE', '────────────────', slvMin, "slvMin", 'sleeve')
			hudHelper.startSec(headers, values, "sleeve", slvMin ? "none" : "inline");
			for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
				hudHelper.pushCont(headers, values, `Sleeve ${i}:`, `Shock: ${ns.nFormat(ns.sleeve.getSleeveStats(i).shock, '0.000%')} | Sync: ${ns.nFormat(ns.sleeve.getSleeveStats(i).sync / 100, '0.00%')}`, col.def)
				let action = ns.sleeve.getTask(i);
				let stat = ns.sleeve.getSleeveStats(i)
				let hp = {cur: ns.sleeve.getInformation(i).hp.current, max: ns.sleeve.getInformation(i).hp.max}
				if (action != null) {
					switch (action.type) {
						case "CRIME":
							hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│</span> Action: `, `Crime, ${action.crimeType}`, col.hak)
							break;
						case "FACTION":
							hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│</span> Action: `, `Faction Work for ${action.factionName}: ${action.factionWorkType}`, col.hak)
							break;
						case undefined:
							hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│</span> Action: `, `Bladeburner: ${action.actionType}: ${action.actionName}`, col.hak);
							break;
					}
				} else {
					hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│</span> Action: `, `Idle`, col.sta)
				}
				hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│ </span>Health: `, `${ns.nFormat(hp.cur, '0,0')} / ${ns.nFormat(hp.max, '0,0')} | ${ns.nFormat(hp.cur/hp.max, '0.00%')}`, col.hp);
				hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│ </span>Hack: `, `${ns.nFormat(stat.hacking, '0,0')}`, col.hak);
				hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│ </span>Str/Def: `, `${ns.nFormat(stat.strength, '0,0')}/${ns.nFormat(stat.defense, '0,0')}`, col.sta);
				hudHelper.pushCont(headers, values, ` <span style="color: ${col.def};">│ </span>Dex/Agi: `, `${ns.nFormat(stat.dexterity, '0,0')}/${ns.nFormat(stat.agility, '0,0')}`, col.sta);
				hudHelper.pushCont(headers, values, ` ╰─────────────`, `────────────────────────────────────────────`, col.def)
			}
			hudHelper.pushCont(headers, values, "quikMurder:", `<span class="gngRun" style="${buttonCSS}" onclick="sleeveDo.action = 'crime'; sleeveDo.task = 'Homicide';">Set every Sleeve to Homicide</button>`, col.hp)
			hudHelper.endSec(headers, values);
			// --------------------------------
			if (ns.gang.inGang()) {
				hudHelper.pushBreak(headers, values, 'GANG', '─────────────────', gngMin, "gngMin", 'gang');
				hudHelper.startSec(headers, values, "gang", gngMin ? "none" : "inline");
				if (ns.gang.getBonusTime() > 3000) {
					hudHelper.pushCont(headers, values, "Bonus Time: ", '   ' + ns.tFormat(ns.gang.getBonusTime()), col.hak);
				}
				let gangType = (ns.gang.getGangInformation()['isHacking']) ? "Hacking" : "Combat";
				hudHelper.pushCont(headers, values, "Faction: ", '   ' + ns.gang.getGangInformation()['faction'] + ', ' + gangType, col.def);	
				hudHelper.pushCont(headers, values, "Respect: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['respect'], '0,0'), col.cha);
				if (ns.gang.getGangInformation()['power'] > 1) {
					hudHelper.pushCont(headers, values, "Power: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['power'], '0,0.00'), col.hp);
				}
				hudHelper.pushCont(headers, values, "Territory: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['territory'], '0.000%'), col.hp);
				if (ns.gang.getGangInformation()['wantedLevel'] > 1) {
					hudHelper.pushCont(headers, values, "Wanted Level: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['wantedLevel'], '0,0'), col.cha);
				}
				if (ns.gang.getGangInformation()['territoryClashChance'] > 0) {
					hudHelper.pushCont(headers, values, "Clash Chance: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['territoryClashChance'], '0.0%') + ' / ' + ((ns.gang.getGangInformation()['territoryWarfareEngaged']) ? "" : ""), col.hp);
				}
				hudHelper.endSec(headers, values);
			}
			// --------------------------------
			if (ns.getPlayer()['hasCorporation']) {
				let corp = eval("ns.corporation.getCorporation()");
				let bTime = eval("ns.corporation.getBonusTime()")
				hudHelper.pushBreak(headers, values, 'CORP', '─────────────────', crpMin, "crpMin", 'corp');
				hudHelper.startSec(headers, values, "corp", crpMin ? "none" : "inline");
				if (bTime > 3000) {
					hudHelper.pushCont(headers, values, "Bonus Time: ", `   ${ns.tFormat(bTime)}`, col.hak);
				}
				hudHelper.pushCont(headers, values, "Name: ", '   ' + corp['name'], col.def);
				hudHelper.pushCont(headers, values, "Funds: ", '   ' + ns.nFormat(corp['funds'], '$0,0'), col.money);
				hudHelper.pushCont(headers, values, "Revenue: ", '   ' + ns.nFormat(corp['revenue'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(headers, values, "Expenses: ", '   ' + ns.nFormat(corp['expenses'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(headers, values, "Profit: ", '   ' + ns.nFormat(corp['revenue'] - corp['expenses'], '$0,0') + '/s', col.money);
				hudHelper.pushCont(headers, values, "Shares: ", '   ' + ns.nFormat(corp['numShares'], '0,0') + ' / ' + ns.nFormat(corp['totalShares'], '0,0'), col.hak);
				hudHelper.endSec(headers, values);
			}
			// --------------------------------
			if (ns.getPlayer()['inBladeburner']) {
				hudHelper.pushBreak(headers, values, 'BLADEBURNERS', '─────────────', bldMin, "bldMin", 'blade');
				hudHelper.startSec(headers, values, "blade", bldMin ? "none" : "inline");
				if (ns.bladeburner.getBonusTime > 3000) {
					hudHelper.pushCont(headers, values, "Bonus Time: ", `   ${ns.tFormat(ns.bladeburner.getBonusTime())}`, col.hak)
				}
				hudHelper.pushCont(headers, values, "Rank: ", '   ' + ns.nFormat(ns.bladeburner.getRank(), '0,0'), col.cha);
				let stm = ns.bladeburner.getStamina();
				hudHelper.pushCont(headers, values, "Stamina: ", `   ${ns.nFormat(stm[0], '0,0.00')}/${ns.nFormat(stm[1], '0,0.00')} | ${ns.nFormat(stm[0] / stm[1], '0.000%')}`, col.hp);
				if (ns.bladeburner.getCurrentAction().type == "Idle") {
					hudHelper.pushCont(headers, values, "Action: ", '   ' + ns.bladeburner.getCurrentAction()['type'], col.sta);
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
					hudHelper.pushCont(headers, values, "Action: ", `   ${action.type}: ${action.name}`, col.hak);
					hudHelper.pushCont(headers, values, "Time: ", `   ${dspCurTime} / ${dspTakTime} : ${ns.nFormat(curTime / takTime, "0.00%")}`)
					hudHelper.pushCont(headers, values, "Level: ", `   ${ns.nFormat(cbbLvl, '0,0')} / ${ns.nFormat(mbbLvl, '0,0')}`);
					if (chance[0] != chance[1]) {
						hudHelper.pushCont(headers, values, "Est. Chance: ", `   ${ns.nFormat(chance[0], '0.00%')} ~ ${ns.nFormat(chance[1], '0.00%')}`, col.hak)
					} else {
						hudHelper.pushCont(headers, values, "Chance: ", `   ${ns.nFormat(chance[0], '0.00%')}`, col.hak)
					}
				}
				hudHelper.pushCont(headers, values, "Skill Points: ", '   ' + ns.nFormat(ns.bladeburner.getSkillPoints(), '0,0'), col.hak);
				hudHelper.pushCont(headers, values, "City: ", '   ' + ns.bladeburner.getCity(), col.sta);
				hudHelper.endSec(headers, values);
			}
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'SERVER', '────────────────', srvMin, "srvMin", 'server');
			hudHelper.startSec(headers, values, "server", srvMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, 'Home: ', "   Cores: " + ns.getServer('home')['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'), col.hak);
			for (let i = 0; i <= srvs.length - 1; i++) {
				hudHelper.pushCont(headers, values, srvs[i] + ": ", "   Cores: " + ns.getServer(srvs[i])['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam(srvs[i]), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam(srvs[i]), '0,0'), col.hak);
			}
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'PLAYTIME', '───────────────', pltMin, "pltMin", 'playt');
			hudHelper.startSec(headers, values, "playt", pltMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, `BN${ns.getPlayer()['bitNodeN']}: `, ns.tFormat(ns.getPlayer()['playtimeSinceLastBitnode']), col.def);
			hudHelper.pushCont(headers, values, 'Total: ', ns.tFormat(ns.getPlayer()['totalPlaytime']), col.def);
			hudHelper.endSec(headers, values);
			// --------------------------------
			hudHelper.pushBreak(headers, values, 'SCRIPT RUNNERS', '────────────', runMin, "runMin", 'srcr');
			hudHelper.startSec(headers, values, 'srcr', runMin ? "none" : "inline");
			hudHelper.pushCont(headers, values, "Breach: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/xsink/breach.js', false]">Root every server you can.</button>`, col.hak)
			hudHelper.pushCont(headers, values, "Matrix: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/ui/matrix.js', false]">Create a Matrix background.</button>`, col.hak)
			hudHelper.pushCont(headers, values, "Map: ", `<span class="scrRun" style="${buttonCSS}" onclick="toRun = ['/src/mapt.js', true]">Show a map of all servers.</button>`, col.hak)
			hudHelper.endSec(headers, values);
			if (scriptContent) {
				hudHelper.pushBreak(headers, values, 'SCRIPT CONTENT', '────────────', cusMin, "cusMin", 'scriptCont')
				hudHelper.startSec(headers, values, 'scriptCont', cusMin ? "none" : "inline");
				hudHelper.pushCont(headers, values, `<span id="scriptContent-hook-0">${scriptContentV0}</span>`, `<span id="scriptContent-hook-1">${scriptContentV1}</span>`, col.def);
				hudHelper.endSec(headers, values);
			}
			hudHelper.endHud(headers ,value);
			hook0.innerHTML = headers.join(" \n");
			hook1.innerHTML = values.join("\n");
			ns.print(doc.getElementById('hudMins'));
		}
		catch (err) {
			ns.print("ERROR: Update Skipped: " + String(err));
		}
		await ns.sleep(1000);
	}
}
