/* eslint-disable no-constant-condition */
/** @param {NS} ns **/
/** @param {import(".").NS} ns */
export async function main(ns) {
    const doc = eval('document');
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    while (true) {
        try {
            const headers = [];
            const values = [];
            headers.push('---------------');
            values.push('-----------------CRIMES-----------------'); // ------------MONEY and PROFIT------------
            headers.push("Total Karma: ");
            values.push('   ' + ns.nFormat(ns.heart.break(), '0,0'));
            headers.push("People Killed: ");
            values.push('   ' + ns.nFormat(ns.getPlayer()['numPeopleKilled'], '0,0'));
            headers.push('---------------');
            values.push('------------MONEY and PROFIT------------'); // ------------MONEY and PROFIT------------
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
            headers.push('---------------');
            values.push('------------SKILL EXPERIENCE------------'); // ------------SKILL EXPERIENCE------------
            headers.push("Hacking EXP: ");
            values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['hacking'], '0,0'));
            headers.push('Intelligence: ')
            values.push('   ' + ns.nFormat(ns.getPlayer()['exp']['intelligence'], '0,0'));
            //EXAMPLE GANG OBJECT
            //{"faction":"NiteSec","isHacking":true,"moneyGainRate":2483647.443279274,"power":1,"respect":26663496.956160907,"respectGainRate":118.52362700148927,"territory":0.14285714285714413,"territoryClashChance":0,"territoryWarfareEngaged":false,"wantedLevel":1,"wantedLevelGainRate":-0.4421478504236176,"wantedPenalty":0.9999999624955435}
            if (ns.gang.inGang()) {
                headers.push('---------------');
                values.push('------------------GANG------------------');
                headers.push("Faction: ");
                values.push('   ' + ns.gang.getGangInformation()['faction']);
                let gangType = (ns.gang.getGangInformation()['isHacking']) ? "Hacking" : "Combat";
                headers.push("Type: ");
                values.push('   ' + gangType);
                headers.push("Power: ");
                values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['power'], '0,0'));
                headers.push("Respect: ");
                values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['respect'], '0,0'));
                headers.push("Wanted Level: ");
                values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['wantedLevel'], '0,0'));
                if (ns.gang.getGangInformation()['territoryWarfareEngaged']) {
                    headers.push("Clash Chance: ");
                    values.push('   ' + ns.nFormat(ns.gang.getGangInformation()['territoryClashChance'], '0.0%'));
                }
            }
            headers.push('---------------');
            values.push('---------------STATISTICS---------------'); // ---------------STATISTICS---------------
            headers.push('Home Ram Use: ');
            values.push(ns.nFormat(ns.getServerUsedRam('home'), '0,0') + ' / ' + ns.nFormat(ns.getServerMaxRam('home'), '0,0'));
            headers.push('Bit Node: ');
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
