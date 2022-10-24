/* eslint-disable no-constant-condition */
import { gangHelper } from "/src/helpers.js";

/** @param {import(".").NS} ns */
export async function main(ns) {
	const lvlThres = 20000
	while (true) {
		if (ns.gang.inGang()) {
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
					}
				} else {
					if (member.agi < lvlThres || member.def < lvlThres || member.dex < lvlThres || member.str < lvlThres) {
						ns.gang.setMemberTask(members[i], "Train Combat");
					} else {
						if (i == 0) {
							ns.gang.setMemberTask(members[i], "Vigilante Justice");
						} else {
							ns.gang.setMemberTask(members[i], "Human Traffiking");
						}
					}
				}
			}
		}
	}
}
