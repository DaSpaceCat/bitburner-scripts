/*
  This script will print a map of the entire network, treed from Home.
  if you have root access to a server, it will be marked in green, otherwise red.
  normally, both the name and checkmark will be green, but if you have root but cannot hack (if your level is too low) the name will be yellow.
  if you do not have root access, but can hack, the name will be yellow.
  otherwise, both the name and checkmark will be red.
  the required hacking level is shown in brackets, with the difference to your hacking level shown next to that.
*/
const col = {
  "r": "\x1b[31m",
  "g": "\x1b[32m",
  "b": "\x1b[34m",
  "c": "\x1b[36m",
  "m": "\x1b[35m",
  "y": "\x1b[33m",
  "bk": "\x1b[30m",
  "w": "\x1b[37m",
  "d": "\x1b[0m" //default color
}
export async function main(ns) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		ns.disableLog("ALL");
		ns.clearLog();
		let seenList = [];
		ns.print("╭┐Map ┌────────────────────────────────────────────────────────────────────────────────────────────────╮");
		ns.print(`│${col.g}R: Home ${col.d}[1]                                                                                           │`);
		ScanServer(ns, "home", seenList, 0, "");
		ns.print("╰────────────────────────────────────────────────────────────────────────────────────────────────┘Map └╯");
		await ns.sleep(1000);
	}
}

function ScanServer(ns, serverName, seenList, indent, prefix) {
	if (seenList.includes(serverName)) return;
	seenList.push(serverName);
	
	let serverList = ns.scan(serverName);
	serverList = serverList.filter(function (item) { return seenList.indexOf(item) === -1; });
	serverList = serverList.sort(ChildCountCompare(ns));

	for (let i = 0; i < serverList.length; i++) {
		let newServer = serverList[i];
		if (seenList.includes(newServer)) continue;
		if (i !== serverList.length - 1) {
			PrintServerInfo(ns, newServer, prefix + "├─")
			ScanServer(ns, newServer, seenList, indent + 1, prefix + "│ ");
		}
		else {
			PrintServerInfo(ns, newServer, prefix + "╰─")
			ScanServer(ns, newServer, seenList, indent + 1, prefix + "  ");
		}
	}
}

function ChildCountCompare(ns, a, b) {
	let ax = ChildCount(ns, a);
	let bx = ChildCount(ns, b);
	return ChildCount(ns, a) > ChildCount(ns, b) ? 1 : -1;
}

function ChildCount(ns, serverName) {
	let count = 0;
	let serverList = ns.scan(serverName);
	for (let i = 1; i < serverList.length; i++) {
		count += ChildCount(ns, serverList[i]) + 1;
	}
	return count;
}

function PrintServerInfo(ns, serverName, prefix) {
	let hacked = (ns.hasRootAccess(serverName)) ? "" : "";
	//swap these lines from being commented if you're not using a nerd font / don't want fancy marks on the root indicator
	//var hacked = (ns.hasRootAccess(serverName)) ? "Y" : "N";
	let serverHackingLevel = ns.getServerRequiredHackingLevel(serverName);
	let serverRam = ns.getServerMaxRam(serverName);
	let hackSkill = ns.getPlayer()['skills']['hacking'];
	let hackDiff;
	let money = [ns.nFormat(ns.getServerMoneyAvailable(serverName), '$0,0'), ns.nFormat(ns.getServerMaxMoney(serverName), '$0,0')]
	if (serverHackingLevel > hackSkill) hackDiff = `-${serverHackingLevel - hackSkill}`;
	if (serverHackingLevel === hackSkill) hackDiff = 0;
	if (serverHackingLevel < hackSkill) hackDiff = `+${hackSkill - serverHackingLevel}`;
	let canhack = false;
	let dfstring = `│${prefix}R:${hacked} ${serverName} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${money[0]}/${money[1]}`
	let dfl = dfstring.length
	let spa = 104 - dfl;
	let sp = "";
	for (let i = 0; i < spa; i++) {
		sp += " "
	}
	if (ns.getHackingLevel() >= serverHackingLevel) {canhack = true}
	if (ns.hasRootAccess(serverName)) {
		if (canhack) {
			ns.print(`│${prefix}${col.g}R:${hacked} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		} else {
			ns.print(`│${prefix}${col.g}R:${hacked}${col.y} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		}
	} else {
		if (canhack) {
			ns.print(`│${prefix}${col.r}R:${hacked}${col.y} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		} else {
			ns.print(`│${prefix}${col.r}R:${hacked} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		}
	}
}
