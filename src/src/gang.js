/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { gangHelper } from "./helpers.js";

/** @param {import("../../").NS} ns */
export async function main(ns) {
	const lvlThres = 20000
	const ascThres = 8000
    let m30t = 1;
    let first = true;
	while (true) {
		if (ns.gang.inGang()) {
			//send a notification if we've exceeded 30 mins of script runtime
            const runtimeS = ns.getRunningScript().onlineRunningTime;
            if (runtimeS >= m30t * 1800 || first) {
                const gangInfo = ns.gang.getGangInformation()
                fetch('https://ntfy.sh/yourntfyhere', {
                    method: 'POST',
                    body: `Income: $${ns.nFormat(gangInfo.moneyGainRate, '0,0')}/t\nRespect Gain: ${ns.nFormat(gangInfo.respectGainRate, '0,0')}/t\nRespect: ${ns.nFormat(gangInfo.respect, '0,0')}\nPower: ${ns.nFormat(gangInfo.power, '0,0')}\nWanted Level: ${ns.nFormat(gangInfo.wantedLevel, '0,0')}\nMembers: ${ns.gang.getMemberNames().length}: ${ns.gang.getMemberNames().join(', ')}`,
                    headers: {
                        'Title': 'Bitburner: Gang Status Update:',
                        'Tags': 'fire,detective'
                    }
                });
                first = false;
            }

            //do member recruting if we can
			if (ns.gang.canRecruitMember()) {
				let done = ns.gang.recruitMember(gangHelper.randomName());
				//one pass just in case we get the same name
				if (!done) {
					ns.gang.recruitMember(gangHelper.randomName(ns.gang.getMemberNames()));
				}
			}
			//get every gang member and set them to train combat/hacking if their stats are low, other stuff if they aren't'
			const members = ns.gang.getMemberNames();
			for (let i = 0; i < members.length; i++) {
				const member = ns.gang.getMemberInformation(members[i])
				if (ns.gang.getGangInformation().isHacking) {
					if (member.hack < lvlThres) {
						ns.gang.setMemberTask(members[i], "Train Hacking");
					} else {
						if (i == 0) {
							ns.gang.setMemberTask(members[i], "Ethical Hacking");
						} else {
							ns.gang.setMemberTask(members[i], "Money Laundering");
						}
					}
				} else {
					if (member.agi < lvlThres || member.def < lvlThres || member.dex < lvlThres || member.str < lvlThres) {
						ns.gang.setMemberTask(members[i], "Train Combat");
					} else {
						if (i == 0) {
							ns.gang.setMemberTask(members[i], "Vigilante Justice");
						} else {
							ns.gang.setMemberTask(members[i], "Human Trafficking");
						}
					}
				}
			}
			//check multipliers for ascencion
			for (let i = 0; i < members.length; i++) {
				const member = ns.gang.getMemberInformation(members[i])
				//basically, what this says, is that when every stat applicable to the gang type, based off of 0x asc, we will ascend
				if (ns.gang.getGangInformation().isHacking) {
					const expGoalHck = member.hack_asc_mult * ascThres;
					if (member.hack_exp >= expGoalHck) {
						ns.gang.ascendMember(members[i]);
                        fetch('https://ntfy.sh/yourntfyhere', {
                            method: 'POST',
                            body: `${members[i]} has been ascended!`,
                            headers: {
                                'Title': 'Bitburner: Gang:',
                                'tags': 'fire,ninja'
                            }
                        });
						const n = new Notification("Gang", { body: `${members[i]} has been ascended!` });
					}
				} else {
					//for COMBAT gangs
					const expGoalAgi = member.agi_asc_mult * ascThres;
					const expGoalDef = member.def_asc_mult * ascThres;
					const expGoalDex = member.dex_asc_mult * ascThres;
					const expGoalStr = member.str_asc_mult * ascThres;
					if ((member.agi_exp >= expGoalAgi || member.agi >= lvlThres) && member.def_exp >= expGoalDef && member.dex_exp >= expGoalDex && member.str_exp >= expGoalStr) {
						ns.gang.ascendMember(members[i]);
                        fetch('https://ntfy.sh/yourntfyhere', {
                            method: 'POST',
                            body: `${members[i]} has been ascended!`,
                            headers: {
                                'Title': 'Bitburner: Gang:',
                                'tags': 'fire,ninja'
                            }
                        });
                        const n = new Notification("Gang", {body: `${members[i]} has been ascended!`});
					}
				}
			}
			//can we buy some augments? i think this should work now? hopefully?
			let augs = [];
			ns.gang.getEquipmentNames().forEach((name) => {
				if (ns.gang.getEquipmentType(name) == "Augmentation") {
					augs.push(name);
				}
			});
			const discount = gangHelper.getUpgradeDiscount(ns.gang.getGangInformation().power, ns.gang.getGangInformation().respect);
			if (discount >= 0.9) {
				let totalPrice;
				augs.forEach((aug) => {
					totalPrice += ns.gang.getEquipmentCost(aug);
				});
				if (totalPrice * members.length <= ns.getPlayer().money) {
					augs.forEach((aug) => {
						members.forEach((m) => {
							ns.gang.purchaseEquipment(m, aug);
						});
					});
					const n = new Notification("Gang", {body: `Purchased all Augments for every gang member! it cost you $${ns.nFormat(totalPrice, '0,0')}.`});
				}
				//also, check for other equipment depending on gang type
				if (ns.gang.getGangInformation().isHacking) {
					let equip = ns.gang.getEquipmentNames();
					let toBuy = [];
					let eqp;
					equip.forEach((e) => {
						if (ns.gang.getEquipmentType(e) == "Rootkit") {
							toBuy.push(e);
						}
					});
					//calc total price
					toBuy.forEach((e) => {
						eqp += ns.gang.getEquipmentCost(e);
					});
					if (eqp * members.length <= ns.getPlayer().money) {
						toBuy.forEach((e) => {
							members.forEach((m) => {
								ns.gang.purchaseEquipment(m, e);
							});
						});
						const n = new Notification("Gang", {body: `Purchased all Rootkits for every gang member! it cost you $${ns.nFormat(eqp, '0,0')}.`});
					}
				} else {
					let equip = ns.gang.getEquipmentNames();
					let toBuy = [];
					let eqp;
					equip.forEach((e) => {
						if (ns.gang.getEquipmentType(e) == "Armor" || ns.gang.getEquipmentType(e) == "Weapon" || ns.gang.getEquipmentType(e) == "Vehicle") {
							toBuy.push(e);
						}
					});
					//calc total price
					toBuy.forEach((e) => {
						eqp += ns.gang.getEquipmentCost(e);
					});
					if (eqp * members.length <= ns.getPlayer().money) {
						toBuy.forEach((e) => {
							members.forEach((m) => {
								ns.gang.purchaseEquipment(m, e);
							});
						});
						const n = new Notification("Gang", {body: `Purchased all Armor, Weapons, and Vehicles for every gang member! it cost you $${ns.nFormat(eqp, '0,0')}.`});
					}
				}
			}
		} else {
			ns.tprint("you're not in a gang, dingy");
		}
		await ns.sleep(250);
	}
}
