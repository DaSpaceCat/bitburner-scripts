export async function WaitPids(ns, pids, hooks, vars, instance, cycles) {
	if (!Array.isArray(pids)) pids = [pids];
	while (pids.some(p => ns.getRunningScript(p) != undefined)) {
		await ns.sleep(5);
	}
}

const col = {
  "r": "\x1b[31m",
  "g": "\x1b[32m",
  "b": "\x1b[34m",
  "c": "\x1b[36m",
  "m": "\x1b[35m",
  "y": "\x1b[33m",
  "bk": "\x1b[30m",
  "w": "\x1b[37m",
  "d": "\x1b[0m"
}

/** @param {import(".").NS} ns */
export async function main(ns) {
  
}
