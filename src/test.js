/* eslint-disable @typescript-eslint/no-unused-vars */
/**  @param {import("../").NS} ns */
export async function main(ns) {
	//uwu
	let types = [];
	ns.gang.getEquipmentNames().forEach((e) => {
		const eType = ns.gang.getEquipmentType(e);
		for (let i = 0; i < types.length; i++) {
			if (types[i] == eType) return;
		}
		types.push(eType);
	});
	ns.tprint(types);
}
