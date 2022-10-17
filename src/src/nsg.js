export async function main(ns) {
  nsgRun = function (scr) {
	  toRun = scr;
	}
	function run() {
		if (toRun != undefined) {
			ns.run(toRun);
			toRun = undefined
		}
	}
  while (true) {
		run()
		await ns.sleep(100);
  }
}
