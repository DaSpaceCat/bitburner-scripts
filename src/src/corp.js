/** @param {NS} ns */
/** @param {import(".").NS} ns */
export async function main(ns) {
    let corp = eval("ns.corporation");
    if (!ns.getPlayer()['hasCorporation']) {
        ns.tprint("You don't have a corporation you dingus");
        return;
    }
    let corpObj = corp.getCorporation();
    if (corpObj[])
        ;
}
