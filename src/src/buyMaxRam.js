/** @param {import(".").NS} ns */
export async function main(ns) {
  ns.purchaseServer(ns.args[0], ns.getPurchasedServerMaxRam());
}