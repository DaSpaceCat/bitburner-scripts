/** @param {import(".").NS} ns */
export async function main(ns) {
  ns.tprint(ns.getPurchasedServerMaxRam());
  ns.tprint(ns.getPurchasedServerCost(ns.getPurchasedServerMaxRam()));
}