/* eslint-disable no-constant-condition */
const col = {
  money: "#e5C07B",
  def: "#FFFFFF",
  hak: "#98c379",
  sta: "#abb2bf",
  cha: "#c678dd"
}
/** @param {NS} ns */
/** @param {import(".").NS} ns */
export async function main(ns) {
  const doc = eval('document');
  const hook0 = doc.getElementById('overview-extra-hook-0');
  const hook1 = doc.getElementById('overview-extra-hook-1');
  const ovv = doc.getElementsByClassName('MuiPaper-root')[0];
  let srvs = ns.args;
  let gVars = `let crmMin = false;
  let monMin = false;
  let sklMin = false;
  let gngMin = false;
  let crpMin = false;
  let bldMin = false;
  let srvMin = false;
  let pltMin = false;`
  createGlobalScript("hudMins", gVars);
  while (true) {
	ovv.style.borderRadius = "10px";
	ovv.style.backgroundColor = "rgba(33,37,43,0.8)";
	ovv.style.backdropFilter = "blur(1px)";
	ovv.style.border = "none";
	ovv.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)"
	ovv.style.zIndex = "99999999";
	try {
	  const headers = [];
	  const values = [];
	  pushContE(headers ,values, "╭─ CUSTOM STATS ", "────────────────────────────────────────────╮", col.def)
	  pushCont(headers, values, "In: " + ns.getPlayer()['city'], "At: " + ns.getPlayer()['location'], col.def);
	  // --------------------------------
	  pushBreak(headers, values, 'CRIMES', '────────────────', crmMin, "crmMin");
	  startSec(headers, values, "crime", crmMin ? "none" : "inline");
	  pushCont(headers, values, "Total Karma: ", '   ' + ns.nFormat(ns.heart.break(), '0,0'), col.cha);
	  pushCont(headers, values, "People Killed: ", '   ' + ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'), col.cha);
	  endSec(headers, values);
	  // --------------------------------
	  pushBreak(headers, values, 'MONEY & PROFIT', '────────────', monMin, "monMin");
	  startSec(headers, values, "money", monMin ? "none" : "inline");
	  pushCont(headers, values, "Money: ", '   ' + ns.nFormat(ns.getPlayer()['money'], '$0,0'), col.money);
	  if (ns.gang.inGang()) {
		if (ns.gang.getGangInformation()['moneyGainRate'] > 0) {
		  pushCont(headers, values, "Gang Income: ", '   ' + ns.nFormat((5 * ns.gang.getGangInformation()['moneyGainRate']), '$0,0') + ' /s', col.money);
		}
	  }
	  pushCont(headers, values, 'Hack Income: ', '   ' + ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s', col.money);
	  /*if (ns.hacknet.numHashes() > 0) {
		headers.push('Hashes: ');
	    values.push(' ' + ns.hacknet.numHashes().toPrecision(3) + ' / ' + ns.hacknet.hashCapacity().toPrecision(3));
	  }*/
	  endSec(headers, values);
	  // --------------------------------
	  pushBreak(headers, values, 'SKILL EXPERIENCE', '───────────', sklMin, "sklMin");
	  startSec(headers, values, "skill", sklMin ? "none" : "inline");
	  pushCont(headers, values, "Hacking: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'), col.hak);
	  pushCont(headers, values, "Str | Def: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['strength'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['defense'], '0,0'), col.sta);
	  pushCont(headers, values, "Dex | Agi: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['dexterity'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['agility'], '0,0'), col.sta);
	  pushCont(headers, values, "Charisma: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['charisma'], '0,0'), col.cha);
	  /*headers.push('Intelligence: ')
	  values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'));*/
	  endSec(headers, values);
	  // --------------------------------
	  if (ns.gang.inGang()) {
		pushBreak(headers, values, 'GANG', '─────────────────', gngMin, "gngMin");
		startSec(headers, values, "gang", gngMin ? "none" : "inline");
		if (ns.gang.getBonusTime() > 3000) {
		  pushCont(headers, values, "Bonus Time: ", '   ' + ns.tFormat(ns.gang.getBonusTime()), col.hak);
		}
		let gangType = (ns.gang.getGangInformation()['isHacking']) ? "Hacking" : "Combat";
		pushCont(headers, values, "Faction: ", '   ' + ns.gang.getGangInformation()['faction'] + ', ' + gangType, col.def);	
		pushCont(headers, values, "Respect: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['respect'], '0,0'), col.sta);
		if (ns.gang.getGangInformation()['power'] > 1) {
		  pushCont(headers, values, "Power: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['power'], '0,0.00'), col.sta);
		}
		pushCont(headers, values, "Territory: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['territory'], '0.000%'), col.cha);
		if (ns.gang.getGangInformation()['wantedLevel'] > 1) {
		  pushCont(headers, values, "Wanted Level: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['wantedLevel'], '0,0'), col.cha);
		}
		if (ns.gang.getGangInformation()['territoryClashChance'] > 0) {
		  pushCont(headers, values, "Clash Chance: ", '   ' + ns.nFormat(ns.gang.getGangInformation()['territoryClashChance'], '0.0%') + ' / ' + ((ns.gang.getGangInformation()['territoryWarfareEngaged']) ? "" : ""), col.cha);
		}
		endSec(headers, values);
	  }
	  // --------------------------------
	  if (ns.getPlayer()['hasCorporation']) {
		let corp = eval("ns.corporation.getCorporation()");
		pushBreak(headers, values, 'CORP', '─────────────────', crpMin, "crpMin");
		startSec(headers, values, "corp", crpMin ? "none" : "inline");
		pushCont(headers, values, "Name: ", '   ' + corp['name'], col.def);
		pushCont(headers, values, "Funds: ", '   ' + ns.nFormat(corp['funds'], '$0,0'), col.money);
		pushCont(headers, values, "Revenue: ", '   ' + ns.nFormat(corp['revenue'], '$0,0') + '/s', col.money);
		pushCont(headers, values, "Expenses: ", '   ' + ns.nFormat(corp['expenses'], '$0,0') + '/s', col.money);
		pushCont(headers, values, "Profit: ", '   ' + ns.nFormat(corp['revenue'] - corp['expenses'], '$0,0') + '/s', col.money);
		pushCont(headers, values, "Shares: ", '   ' + ns.nFormat(corp['numShares'], '0,0') + ' / ' + ns.nFormat(corp['totalShares'], '0,0'), col.hak);
		endSec(headers, values);
	  }
	  // --------------------------------
	  if (ns.getPlayer()['inBladeburner']) {
		pushBreak(headers, values, 'BLADEBURNERS', '─────────────', bldMin, "bldMin");
		startSec(headers, values, "blade", bldMin ? "none" : "inline");
		pushCont(headers, values, "Rank: ", '   ' + ns.nFormat(ns.bladeburner.getRank(), '0,0'), col.cha);
		let stm = ns.bladeburner.getStamina();
		pushCont(headers, values, "Stamina: ", `   ${ns.nFormat(stm[0], '0,0.00')}/${ns.nFormat(stm[1], '0,0.00')} | ${ns.nFormat(stm[0] / stm[1], '0.000%')}`, col.sta);
		if (ns.bladeburner.getCurrentAction()['type'] == "Idle") {
		  pushCont(headers, values, "Action: ", '   ' + ns.bladeburner.getCurrentAction()['type'], col.sta);
		} else {
		  pushCont(headers, values, "Action: ", `   ${ns.bladeburner.getCurrentAction()['type']}: ${ns.bladeburner.getCurrentAction()['name']}`, col.hak);
		}
		pushCont(headers, values, "Skill Points: ", '   ' + ns.nFormat(ns.bladeburner.getSkillPoints(), '0,0'), col.hak);
		pushCont(headers, values, "City: ", '   ' + ns.bladeburner.getCity(), col.def);
		endSec(headers, values);
	  }
	  // --------------------------------
	  pushBreak(headers, values, 'SERVER', '────────────────', srvMin, "srvMin");
	  startSec(headers, values, "server", srvMin ? "none" : "inline");
	  pushCont(headers, values, 'Home: ', "   Cores: " + ns.getServer('home')['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'), col.hak);
	  //addProgBar(headers, values, 'Ram: ', "rgb(17,17,17)", col.hak, ns.getServerUsedRam('home')/ns.getServerMaxRam('home'))
	  for (let i = 0; i <= srvs.length - 1; i++) {
		pushCont(headers, values, srvs[i] + ": ", "   Cores: " + ns.getServer(srvs[i])['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam(srvs[i]), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam(srvs[i]), '0,0'), col.hak);
	  }
	  endSec(headers, values);
	  // --------------------------------
	  pushBreak(headers, values, 'PLAYTIME', '───────────────', pltMin, "pltMin");
	  startSec(headers, values, "playt", pltMin ? "none" : "inline");
	  pushCont(headers, values, `BN${ns.getPlayer()['bitNodeN']}: `, ns.tFormat(ns.getPlayer()['playtimeSinceLastBitnode']), col.def);
	  pushCont(headers, values, 'Total: ', ns.tFormat(ns.getPlayer()['totalPlaytime']), col.def);
	  endSec(headers, values);
	  pushContE(headers ,values, "╰─ CUSTOM STATS ", "────────────────────────────────────────────╯", col.def)
	  hook0.innerHTML = headers.join(" \n");
	  hook1.innerHTML = values.join("\n");
	}
	catch (err) {
	  ns.print("ERROR: Update Skipped: " + String(err));
	}
	await ns.sleep(1000);
  }
}

//min is the boolean passed, minVar is the boolean var name passed as a string
function pushBreak(hed, val, sec, dv, min, minVar) {
  hed.push(`<span style="color: ${col.def}">├───────────────</span><br>`)
  val.push(`<span style="color: ${col.def}">${dv} <span style="color: ${col.hak}">${sec}</span> ${createMin(dv, min, minVar)}┤</span><br>`)
}

function pushCont(hed, val, tp, cont, col) {
  hed.push(`<span style="color: #ffffff">│</span><span style="color: ${col}">${tp}</span><br>`)
  //val.push(`<span style="color: ${col}">${cont}<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate" style="background-color: ${progCol}; transform: translateX(-${progPrec}%)"></span></span><span style="color: #ffffff">│</span><br>`)
  val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">│</span><br>`)
}

function pushContE(hed, val, tp, cont, col) {
  hed.push(`<span style="color: ${col}">${tp}</span><br>`)
  val.push(`<span style="color: ${col}">${cont}</span><br>`)
}

//dsp should either be "none" or "inline"
function startSec(hed, val, clas, dsp) {
  hed.push(`<div class="${class}" style="display: ${dsp}">`)
  val.push(`<div class="${class}" style="display: ${dsp}">`)
}

function endSec(hed, val) {
  hed.push("</div>")
  val.push("</div>")
}

//cVar should be a STRING that is the variable
function createMin(dv, isMin, cVar) {
  dv.slice(0, -4);
  if (isMin) {
	dv += ` <a style="cursor: pointer;" onclick="${cVar} = !${cVar}"></a> ─`;
  } else {
	dv += ` <a style="cursor: pointer;" onclick="${cVar} = !${cVar}"></a> ─`;
  }
  return dv;
}

function createGlobalScript(id, script) {
  if (document.getElementById(id) == null) {
	let s = document.createElement("script");
	s.id = id;
	s.innerHTML = script;
	document.head.appendChild(s);
  } else {
	console.log("WARN: Script with that ID already exists! overwriting current!");
	document.getElementById(id).innerHTML = script;
  }
}

/*function addProgBar(hed, val, dv, bg, fg, pc) {
  hed.push(`<span style="color: #ffffff">│</span><span style="color: ${fg}">${dv}</span><br>`)
  val.push(`<span class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow"${Math.floor(pc)}" style="background-color: ${bg}; overflow: none; z-index: 0; color: rgba(0,0,0,0)">
	────────────────────────────────────────
	<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate" style="background-color: ${fg}; color: rgba(0,0,0,0); transform: translateX(-${100 - pc}%)">
	  ────────────────────────────────────────
	</span>
  </span>
  <span style="color: #ffffff">│</span><br>`)
}*/
