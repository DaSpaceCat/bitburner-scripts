/** @param {import("../../").NS} ns */
export async function main(ns) {
	const h = ns.hacknet.numHashes();
	const t = Math.floor(h / 100);
	ns.print(`You have ${h} hashes, and you can get ${ns.nFormat(t*1000000000, '0,0')} money from them.`);
	for (let i = 0; i < t; i++) {
		ns.hacknet.spendHashes("Sell for Corporation Funds");
	}
}
