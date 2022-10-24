/**  @param {import("./src/").NS} ns */
export async function main(ns) {
	ns.tprint(ns.gang.getTaskNames());
	ns.tprint(ns.gang.getEquipmentType(ns.gang.getEquipmentNames()[0]));
}
