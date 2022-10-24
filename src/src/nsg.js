import { sleeveHelper } from "/src/helpers.js";

export async function main(ns) {
	async function run() {
		if (toRun != undefined) {
			ns.run(toRun[0]);
			if (toRun[1]) {
				ns.tail(toRun[0]);
			}
			//await ns.sleep(100);
			toRun = undefined;
		}
	}
	async function sleeve() {
		if (sleeveDo.action != undefined) {
			sleeveHelper.setTask(ns, true, undefined, sleeveDo.action, sleeveDo.task)
		}
	}
  while (true) {
		run();
		sleeve();
		await ns.sleep(100);
  }
}
