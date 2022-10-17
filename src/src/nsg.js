export async function main(ns) {
  nsgRun = function (scr) {
	  toRun = scr;
	}
	async function run() {
		if (toRun[0] != undefined) {
			ns.run(toRun[0]);
			if (toRun[1]) {
				ns.tail(toRun[0]);
			}
			//await ns.sleep(100);
			toRun = undefined;
		}
	}
  while (true) {
		run()
		await ns.sleep(100);
  }
}
