/* eslint-disable @typescript-eslint/no-unused-vars */

import { formulaHelper } from "./src/helpers.js";

/**  @param {import("../").NS} ns */
export async function main(ns) {
	//get gang aug types
	/*let types = [];
	ns.gang.getEquipmentNames().forEach((e) => {
		const eType = ns.gang.getEquipmentType(e);
		for (let i = 0; i < types.length; i++) {
			if (types[i] == eType) return;
		}
		types.push(eType);
	});
	ns.tprint(types);*/
	
	ns.tprint("Player OBJ hacking multi: " + ns.getPlayer().mults.hacking);
	ns.tprint("Player OBJ hacking multi * BitNode Hack Level Multi: " + ns.getPlayer().mults.hacking * ns.getBitNodeMultipliers().HackingLevelMultiplier);
	ns.tprint(`Hacking Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', 2500, false), '0,0')}`);
	ns.tprint(`Hacking Exp: ${ns.nFormat(formulaHelper.getExpReq(ns, 'hacking', 2500, true), '0,0')}`);
}
