/** @param {import("../../").NS} ns */
export async function main(ns) {
	if (!ns.hasTorRouter()) ns.singularity.purchaseTor();
	let programs = [{name:"brutessh.exe",cost:5e5},{name:"serverprofiler.exe",cost:5e5},{name:"deepscanv1.exe",cost:5e5},{name:"autolink.exe",cost:1e6},{name:"deepscanv2.exe",cost:2.5e6},{name:"relaysmtp.exe",cost:5e6},{name:"ftpcrack.exe",cost:1.5e7},{name:"httpworm.exe",cost:3e7},{name:"sqlinject.exe",cost:2.5e8}]
	for (let i = 0; i < programs.length; i++) {
		if (ns.getPlayer().money > programs[i].cost) {
			ns.singularity.purchaseProgram(programs[i].name);
		}
	}
}