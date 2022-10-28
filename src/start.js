/** @param {NS} ns */
//used for resetting the running brains AFTER a period of offline
export async function main(ns) {
	ns.killall();
	ns.run("src/brain.js", 1, "alpha-ent", 66000)
	ns.run("src/brain.js", 1, "infocomm", 65000)
	ns.run("src/brain.js", 1, "nova-med", 65000)
	ns.run("src/brain.js", 1, "nwo", 66000)
}