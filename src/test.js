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
	
	console.log(ns.ps('home'));
}
