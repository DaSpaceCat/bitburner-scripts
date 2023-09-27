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

	function kill() {
		if (toKill !== undefined) {
			ns.kill(toKill);
			toKill = undefined;
		}
	}
	async function sleeve() {
		if (sleeveDo.action !== undefined) {
			sleeveHelper.setTask(ns, true, undefined, sleeveDo.action, sleeveDo.task)
			sleeveDo.action = undefined;
		}
	}
	async function bnalert() {

	}
  while (true) {
		run();
		sleeve();
		//bnalert();
		kill();
		await ns.sleep(100);
  }
}
