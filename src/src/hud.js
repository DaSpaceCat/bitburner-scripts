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
/** @param {NS} ns */
/** @param {import(".").NS} ns */
export async function main(ns) {
	const doc = eval('document');
	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	while (true) {
		try {
			const headers = [];
			const values = [];
			headers.push('───────────────');
			values.push('──────────────── CRIMES ────────────────'); // ────────────MONEY and PROFIT────────────
			headers.push("Total Karma: ");
			values.push('   ' + ns.nFormat(ns.heart.break(), '0,0'));
			headers.push("People Killed: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'));
			headers.push('───────────────');
			values.push('─────────── MONEY and PROFIT ───────────'); // ────────────MONEY and PROFIT────────────
			headers.push("Money: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['money'], '$0,0'));
			if (ns.gang.inGang()) {
				if (ns.gang.getGangInformation()['moneyGainRate'] > 0) {
					headers.push("Gang Income: ");
					values.push('   ' + ns.nFormat((5 * ns.gang.getGangInformation()['moneyGainRate']), '$0,0') + ' /s');
				}
			}
			headers.push('Hack Income: ');
			values.push('   ' + ns.nFormat(ns.getTotalScriptIncome()[0], '$0,0') + ' /s');
			if (ns.hacknet.numHashes() > 0) {
				headers.push('Hashes: ');
				values.push(' ' + ns.hacknet.numHashes().toPrecision(3) + ' / ' + ns.hacknet.hashCapacity().toPrecision(3));
			}
			headers.push('───────────────');
			values.push('─────────── SKILL EXPERIENCE ───────────'); // ────────────SKILL EXPERIENCE────────────
			headers.push("Hacking: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'));
			headers.push("Str | Def: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['strength'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['defense'], '0,0'));
			headers.push("Dex | Agi: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['dexterity'], '0,0') + ' | ' + ns.nFormat(ns.getPlayer()['exp']['agility'], '0,0'));
			headers.push("Charisma: ");
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['charisma'], '0,0'));
			headers.push('Intelligence: ')
			values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'));
			if (ns.gang.inGang()) {
				headers.push('───────────────');
				values.push('───────────────── GANG ─────────────────');
				headers.push("Faction: ");
				values.push('   ' + ns.gang.getGangInformation()['faction']);
				let gangType = (ns.gang.getGangInformation()['isHacking']) ? "Hacking" : "Combat";
				headers.push("Type: ");
				values.push('   ' + gangType);
				headers.push("Respect: ");
				values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['respect'], '0,0'));
				headers.push("Power: ");
				values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['power'], '0,0.0'));
				headers.push("Territory: ");
				values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['territory'], '0.0%'));
				headers.push("Wanted Level: ");
				values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['wantedLevel'], '0,0'));
				if (ns.gang.getGangInformation()['territoryClashChance'] > 0) {
					headers.push("Clash Chance: ");
					values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['territoryClashChance'], '0.0%') + ' / ' + ((ns.gang.getGangInformation()['territoryWarfareEngaged']) ? "" : ""));
				}
			}
			if (ns.getPlayer()['hasCorporation']) {
				let corp = eval("ns.corporation.getCorporation()");
				headers.push('───────────────');
				values.push('───────────────── CORP ─────────────────');
				headers.push("Name: ");
				values.push('   ' + corp['name']);
				headers.push("Funds: ");
				values.push('   ' + ns.nFormat(corp['funds'], '$0,0'));
				headers.push("Revenue: ");
				values.push('   ' + ns.nFormat(corp['revenue'], '$0,0') + '/s');
				headers.push("Expenses: ");
				values.push('   ' + ns.nFormat(corp['expenses'], '$0,0') + '/s');
				headers.push("Profit: ");
				values.push('   ' + ns.nFormat(corp['revenue'] - corp['expenses'], '$0,0') + '/s');
				headers.push("Shares: ");
				values.push('   ' + ns.nFormat(corp['numShares'], '0,0') + ' / ' + ns.nFormat(corp['totalShares'], '0,0'));
			}
			headers.push('───────────────');
			values.push('────────────── STATISTICS ──────────────'); // ───────────────STATISTICS───────────────
			headers.push('Home Ram Use: ');
			values.push(ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'));
			headers.push('BitNode: ');
			values.push(ns.getPlayer()['bitNodeN']);
			headers.push('Time in Node: ');
			values.push(ns.tFormat(ns.getPlayer()['playtimeSinceLastBitnode']));
			headers.push('Total Playtime: ');
			values.push(ns.tFormat(ns.getPlayer()['totalPlaytime']));
			headers.push(ns.getPlayer()['city']);
			values.push(ns.getPlayer()['location']);
			hook0.innerText = headers.join(" \n");
			hook1.innerText = values.join("\n");
		}
		catch (err) {
			ns.print("ERROR: Update Skipped: " + String(err));
		}
		await ns.sleep(1000);
	}
}
