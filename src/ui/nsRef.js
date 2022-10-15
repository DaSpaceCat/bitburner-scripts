let globNS;
export async function main(ns) {
  let functs = [ns.getPlayer()]
  globNS = ns;
  await ns.sleep(1000)
}
