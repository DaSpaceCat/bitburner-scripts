import { sleeveHelper } from "./helpers.js";

export async function main(ns) {
	async function run() {
		if (toRun !== undefined) {
			ns.run(toRun[0]);
			if (toRun[1]) {
				ns.tail(toRun[0]);
			}
			//await ns.sleep(100);
			toRun = undefined;
		}
	}
	while (true) {
		run();
		await ns.sleep(100);
	}
}
