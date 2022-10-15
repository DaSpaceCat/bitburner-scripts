/** @param {NS} ns */
/*
this script is called with [server name], [ram usable (in gigabytes)], and [instance] (starts at 0)
*/

/** @param {import(".").NS} ns */
export async function WaitPids(ns, pids, hooks, vars, instance, cycles) {
	if (!Array.isArray(pids)) pids = [pids];
	while (pids.some(p => ns.getRunningScript(p) != undefined)) {
		await ns.sleep(5);
		hud(ns, hooks[0], hooks[1], instance, cycles);
		console(ns, vars[0], vars[1], vars[2], vars[3], vars[4], vars[5], vars[6], instance, cycles);
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

let doc = eval("document");
/** @param {import(".").NS} ns */
export async function main(ns) {
	let instance = ns.args[2];
	let cycles = 0;
	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	let hs = ns.args[0];
	let ram = ns.args[1];
	//let coH = Math.floor((ram/3)/1.6);
	//let coG = Math.floor((ram/3)/1.6);
	let coH = Math.floor((ram/3)/1.7);
	let coG = Math.floor((ram/3)/1.75);
	let coW = coG;
	let wag = ns.weakenAnalyze(coG, ns.getServer().cpuCores);
	if (wag >  100) {
		while (wag > 100) {
			coW -= 1;
			wag = ns.weakenAnalyze(coW, ns.getServer().cpuCores);
		}
	}
	coG = Math.floor(((ram-(coW*1.75))/2)/1.75);
	coH = Math.floor(((ram-(coW*1.75))/2)/1.7);

	let ht = Math.ceil(ns.getHackTime(hs)/1000);
	let gt = Math.ceil(ns.getGrowTime(hs)/1000);
	let wt = Math.ceil(ns.getWeakenTime(hs)/1000);

	if (ns.getServerMinSecurityLevel(hs) < ns.getServerSecurityLevel(hs) || ns.getServerMaxMoney(hs) > ns.getServerMoneyAvailable(hs)) {
		while (ns.getServerMinSecurityLevel(hs) < ns.getServerSecurityLevel(hs) || ns.getServerMaxMoney(hs) > ns.getServerMoneyAvailable(hs)) {
			let prep = [ns.run('src/weak.js', coW, hs), ns.run('src/grow.js', coG * 2, hs)]
			await WaitPids(ns, prep, [hook0, hook1], [hs, coH, coG, coW, gt, ht, wt], instance, cycles);
		}
	}

	let ha = ns.hackAnalyze(hs) * coH;
	if (ha > 1.05) {
		while (ha > 1.05) {
			coH -= 1;
			ha = ns.hackAnalyze(hs) * coH;
		}
	}
	coG = Math.floor(((ram-((coW*1.75)+(coH*1.7))))/1.75);

	ht = Math.ceil(ns.getHackTime(hs)/1000);
	gt = Math.ceil(ns.getGrowTime(hs)/1000);
	wt = Math.ceil(ns.getWeakenTime(hs)/1000);

	//eval("ns.bypass(document);")
	// eslint-disable-next-line no-constant-condition
	while (true) {
		let batch = [ns.run('src/weak.js', coW, hs), ns.run('src/grow.js', coG, hs), ns.run ('src/heck.js', coH, hs)]
		await WaitPids(ns, batch, [hook0, hook1], [hs, coH, coG, coW, gt, ht, wt], instance, cycles);
		cycles++
		//rerun hack calc so that leveling up dosen't cause us to hack for more than we need
		ha = ns.hackAnalyze(hs) * coH;
		if (ha > 1.05) {
			while (ha > 1.05) {
				coH -= 1;
				ha = ns.hackAnalyze(hs) * coH;
			}
		}
		coG = Math.floor(((ram-((coW*1.75)+(coH*1.7))))/1.75);
		//prep the server if we've hacked it out / Security is over minimum
		if (ns.getServerMinSecurityLevel(hs) < ns.getServerSecurityLevel(hs) || ns.getServerMaxMoney(hs) > ns.getServerMoneyAvailable(hs)) {
			while (ns.getServerMinSecurityLevel(hs) < ns.getServerSecurityLevel(hs) || ns.getServerMaxMoney(hs) > ns.getServerMoneyAvailable(hs)) {
				let prep = [ns.run('src/weak.js', coW, hs), ns.run('src/grow.js', coG * 2, hs)]
				await WaitPids(ns, prep, [hook0, hook1], [hs, coH, coG, coW, gt, ht, wt], instance, cycles);
			}
		}
	}
}

/** @param {import(".").NS} ns */
function hud(ns, hook0, hook1, instance, cycles) {
	try {
		let header;
		let val;

		//add wether or not we're hacking, growing, weakening
		header = "Hk/Gw/Wk\n";
		if (ns.isRunning("/src/heck.js", "home", ns.args[0])) {val = `/`} else {val = `/`}
		if (ns.isRunning("/src/grow.js", "home", ns.args[0])) {val += `/`} else {val += `/`}
		if (ns.isRunning("/src/weak.js", "home", ns.args[0])) {val += `\n`} else {val += `\n`}
		ns.print(val);
		// Now drop it into the placeholder elements
		if (instance > 0) {
			//hook0.innerText += "----\nInstance\n" + header;
			//hook1.innerText += "----\n" + instance + "\n" + val;
		} else {
			hook0.innerText = "Instance\n" + header
			hook1.innerText = "0\n" + val
		}
		let wam = ns.getServerMaxRam("home")
		let wamU = ns.getServerUsedRam("home")

		//other stats
		const headers = []
		const values = [];
		// Add allowed ram usage
		headers.push("Brain Ram");
		values.push(ns.args[1])
		//add current server hacking
		headers.push("Server Target")
		values.push(ns.args[0])
		//add cycles
		headers.push("Cycles")
		values.push(cycles);
		// Add ram
		headers.push("Home Ram");
		values.push(wam);
		// add free ram
		headers.push("Home Ram Free");
		values.push(Math.round((wam - wamU) * 100) / 100);

		// Now drop those into the placeholder elements
		if (instance == 0) {
			hook0.innerText += headers.join("\n");
			hook1.innerText += values.join("\n");
		}
	} catch (err) { // This might come in handy later
		ns.print("ERROR: Update Skipped: " + String(err));
	}
}

/** @param {import(".").NS} ns */
function console(ns, sv, coH, coG, coW, sgt, sht, swt, instance, cycles) {
	let gt = Math.ceil(ns.getGrowTime(sv)/1000);
	let ht = Math.ceil(ns.getHackTime(sv)/1000);
	let wt = Math.ceil(ns.getWeakenTime(sv)/1000);
	let sl = ns.getServerSecurityLevel(sv);
	let sml = ns.getServerMinSecurityLevel(sv);
	let mm = ns.getServerMaxMoney(sv);
	let ma = ns.getServerMoneyAvailable(sv);
	let hm = ns.hackAnalyze(sv) * coH;
	let wa = ns.weakenAnalyze(coW, ns.getServer().cpuCores);
	let ga = ns.growthAnalyze(sv, 2, ns.getServer().cpuCores);
	let gaa = coG/ga;
	ns.clearLog();
	ns.print("╭┐Hack Brain┌──────────────────────────────────╮\n");
	ns.print(`│╰──────────╯      Hack/Grow/Weak | ${isHacking(ns)}${col.d}/${isGrowing(ns)}${col.d}/${isWeakening(ns)}${col.d}      │\n`);
	ns.print(`│ ${col.g}Target: ${sv}\n`);
	ns.print(`│ ${col.g}Instance: ${instance}\n`);
	ns.print(`${col.d}│ ${col.g}Hack Time : ${Math.floor(ht/60)}m ${ht % 60}s | At run : ${Math.floor(sht/60)}m ${sht % 60}s\n`);
	ns.print(`${col.d}│ ${col.y}Grow Time : ${Math.floor(gt/60)}m ${gt % 60}s | At run : ${Math.floor(sgt/60)}m ${sgt % 60}s\n`);
	ns.print(`${col.d}│ ${col.g}Weaken Time : ${Math.floor(wt/60)}m ${wt % 60}s | At run : ${Math.floor(swt/60)}m ${swt % 60}s\n`);
	ns.print(`${col.d}│ ${col.c}Security Level : ${sl}\n`);
	ns.print(`${col.d}│ ${col.c}Min Security Level : ${sml}\n`);
	ns.print(`${col.d}│ ${col.y}Max Money : ${mm}\n`);
	ns.print(`${col.d}│ ${col.y}Money Available : ${ma}\n`);
	ns.print(`${col.d}│ ${col.y}Hack Money : ${hm}\n`);
	ns.print(`${col.d}│ ${col.g}Weaken Amount : ${wa}\n`);
	ns.print(`${col.d}│ ${col.y}Grow ??? : ${gaa}\n`);
	ns.print(`${col.d}│ ${col.g}Cycles : ${cycles}\n`);
	ns.print(`${col.d}│ ${col.g}Live Time : ${Math.floor(ns.getRunningScript().onlineRunningTime/60)}m ${Math.round(ns.getRunningScript().onlineRunningTime % 60)}s\n`);
	ns.print(`${col.d}╰──────────────────────────────────────────────╯`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calcWhitespace(sl, bl) {
	let ws = "";
	for (let i = 0; i < sl - bl; i++) {
		ws += " ";
	}
	return ws;
}

/** @param {import(".").NS} ns */
function isWeakening(ns) {if (ns.isRunning("/src/weak.js", "home", ns.args[0])) {return col.g + ""} else {return col.r + ""}}
function isHacking(ns) {if (ns.isRunning("/src/heck.js", "home", ns.args[0])) {return col.g + ""} else {return col.r + ""}}
function isGrowing(ns) {if (ns.isRunning("/src/grow.js", "home", ns.args[0])) {return col.g + ""} else {return col.r + ""}}

//check Xmark
//       
