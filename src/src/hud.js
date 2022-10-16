/*let example = {
	"hp": {"current":10,"max":10},
	"skills": {"hacking":1,"strength":1,"defense":1,"dexterity":1,"agility":1,"charisma":1,"intelligence":0},
	"exp": {"hacking":0,"strength":0,"defense":0,"dexterity":0,"agility":0,"charisma":0,"intelligence":0},
	"mults": {
		"hacking_chance":1.248706083443425,
		"hacking_speed":1.248706083443425,
		"hacking_money":1.248706083443425,
		"hacking_grow":1.248706083443425,
		"hacking":1.248706083443425,
		"hacking_exp":1.248706083443425,
		"strength":1.248706083443425,
		"strength_exp":1.248706083443425,
		"defense":1.248706083443425,
		"defense_exp":1.248706083443425,
		"dexterity":1.248706083443425,
		"dexterity_exp":1.248706083443425,
		"agility":1.248706083443425,
		"agility_exp":1.248706083443425,
		"charisma":1.548395543469847,
		"charisma_exp":1.248706083443425,
		"hacknet_node_money":1.248706083443425,
		"hacknet_node_purchase_cost":0.7546959334265841,
		"hacknet_node_ram_cost":0.7546959334265841,
		"hacknet_node_core_cost":0.7546959334265841,
		"hacknet_node_level_cost":0.7546959334265841,
		"company_rep":1.248706083443425,
		"faction_rep":1.248706083443425,
		"work_money":1.248706083443425,
		"crime_success":1.548395543469847,
		"crime_money":1.548395543469847,
		"bladeburner_max_stamina":1,
		"bladeburner_stamina_gain":1,
		"bladeburner_analysis":1,
		"bladeburner_success_chance":1
	},
	"numPeopleKilled":0,
	"money":1030,
	"city":"Sector-12",
	"location":"Travel Agency",
	"bitNodeN":3,
	"totalPlaytime":4393143400,
	"playtimeSinceLastAug":1975600,
	"playtimeSinceLastBitnode":1975600,
	"jobs":{},
	"factions":[],
	"tor":false,
	"inBladeburner":false,
	"hasCorporation":true,
	"entropy":0
}*/
/* eslint-disable no-constant-condition */
const col = {
	money: "#e5C07B",
	def: "#FFFFFF"
	hak: "#98c379"
	sta: "#abb2bf"
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
			pushContE(headers ,values, "╭─ CUSTOM STATS ", "────────────────────────────────────────╮", col.def)
			pushCont(headers, values, "In: " + ns.getPlayer()['city'], "At: " + ns.getPlayer()['location'], col.def);
			pushBreak(headers, values, 'CRIMES', '────────────────');
			pushCont(headers, values, "Total Karma: ", '   ' + ns.nFormat(ns.heart.break(), '0,0'), col.cha);
			pushCont(headers, values, "People Killed: ", '   ' + ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'), col.cha);
			pushBreak(headers, values, 'MONEY & PROFIT', '────────────');
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
			pushBreak(headers, values, 'SKILL EXPERIENCE', '───────────');
			pushCont(headers, values, "Hacking: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'), col.hak);
			pushCont(headers, values, "Str | Def: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['strength'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['defense'], '0,0'), col.sta);
			pushCont(headers, values, "Dex | Agi: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['dexterity'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['agility'], '0,0'), col.sta);
			pushCont(headers, values, "Charisma: ", '   ' + ns.nFormat(ns.getPlayer()['exp']['charisma'], '0,0'), col.cha);
			/*headers.push('Intelligence: ')
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'));*/
			if (ns.gang.inGang()) {
				pushBreak(headers, values, 'GANG', '─────────────────');
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
			}
			if (ns.getPlayer()['hasCorporation']) {
				let corp = eval("ns.corporation.getCorporation()");
				pushBreak(headers, values, 'CORP', '─────────────────');
				pushCont(headers, values, "Name: ", '   ' + corp['name'], col.def);
				pushCont(headers, values, "Funds: ", '   ' + ns.nFormat(corp['funds'], '$0,0'), col.money);
				pushCont(headers, values, "Revenue: ", '   ' + ns.nFormat(corp['revenue'], '$0,0') + '/s', col.money);
				pushCont(headers, values, "Expenses: ", '   ' + ns.nFormat(corp['expenses'], '$0,0') + '/s', col.money);
				pushCont(headers, values, "Profit: ", '   ' + ns.nFormat(corp['revenue'] - corp['expenses'], '$0,0') + '/s', col.money);
				pushCont(headers, values, "Shares: ", '   ' + ns.nFormat(corp['numShares'], '0,0') + ' / ' + ns.nFormat(corp['totalShares'], '0,0'), col.hak);
			}
			if (ns.getPlayer()['inBladeburner']) {
				pushBreak(headers, values, 'BLADEBURNERS', '─────────────');
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
			}
			pushBreak(headers, values, 'SERVER', '────────────────');
			pushCont(headers, values, 'Home: ', "   Cores: " + ns.getServer('home')['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'), col.hak);
			for (let i = 0; i <= srvs.length - 1; i++) {
				pushCont(headers, values, srvs[i] + ": ", "   Cores: " + ns.getServer(srvs[i])['cpuCores'] + " | Ram: " + ns.nFormat(ns.getServerUsedRam(srvs[i]), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam(srvs[i]), '0,0'), col.hak);
			}
			pushBreak(headers, values, 'PLAYTIME', '───────────────');
			pushCont(headers, values, `BN${ns.getPlayer()['bitNodeN']}: `, ns.tFormat(ns.getPlayer()['playtimeSinceLastBitnode']), col.def);
			pushCont(headers, values, 'Total: ', ns.tFormat(ns.getPlayer()['totalPlaytime']), col.def);
			pushContE(headers ,values, "╰─ CUSTOM STATS ", "────────────────────────────────────────╯", col.def)
			hook0.innerHTML = headers.join(" \n");
			hook1.innerHTML = values.join("\n");
		}
		catch (err) {
			ns.print("ERROR: Update Skipped: " + String(err));
		}
		await ns.sleep(1000);
	}
}

function pushBreak(hed, val, sec, dv) {
	hed.push(`<span style="color: ${col.def}">├───────────────</span><br>`)
	val.push(`<span style="color: ${col.def}">${dv} <span style="color: ${col.hak}">${sec}</span> ${dv}┤</span><br>`)
}

function pushCont(hed, val, tp, cont, col) {
	hed.push(`<span style="color: #ffffff">│</span><span style="color: ${col}">${tp}</span><br>`)
	val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">│</span><br>`)
}

function pushContE(hed, val, tp, cont, col) {
	hed.push(`<span style="color: ${col}">${tp}</span><br>`)
	val.push(`<span style="color: ${col}">${cont}</span><br>`)
}
