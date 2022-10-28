/** @param {NS} ns */
export async function main(ns) {
	var sv = ns.args[0];
	//eval("window.performance.now = function() {return 0;}");
	//await eval("ns.grow(sv)")
	await ns.grow(sv)
}