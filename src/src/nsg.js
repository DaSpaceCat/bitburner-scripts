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
			switch(sleeveDo.action) {
				case "crime":
					for (let i = 0; i < ns.sleeve.getNumSleeves(); i++)
						ns.sleeve.setToCommitCrime(i, sleeveDo.task);
					break;
				case "shockRecovery":
					ns.sleeve.setToShockRecovery(i);
					break;
			}
			sleeveDo.action = undefined;
		}
	}
  while (true) {
		run();
		sleeve();
		await ns.sleep(100);
  }
}
