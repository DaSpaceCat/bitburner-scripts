/*
  This script will print a map of the entire network, treed from Home.
  if you have root access to a server, it will be marked in green, otherwise red.
  normally, both the name and checkmark will be green, but if you have root but cannot hack (if your level is too low) the name will be yellow.
  if you do not have root access, but can hack, the name will be yellow.
  otherwise, both the name and checkmark will be red.
  the required hacking level is shown in brackets, with the diffrence to your hacking level shown next to that.
*/

var _ns;
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
		var seenList = [];
		_ns = ns;
		ns.print("╭┐Map ┌────────────────────────────────────────────────────────────────────────────────────────────────╮");
		ns.print(`│${col.g}R: Home ${col.d}[1]                                                                                           │`);
		ScanServer("home", seenList, 0, "");
		ns.print("╰────────────────────────────────────────────────────────────────────────────────────────────────┘Map └╯");
		await ns.sleep(1000);
	}
}

function ScanServer(serverName, seenList, indent, prefix) {
	if (seenList.includes(serverName)) return;
	seenList.push(serverName);

	var serverList = _ns.scan(serverName);
	serverList = serverList.filter(function (item) { return seenList.indexOf(item) === -1; });
	serverList = serverList.sort(ChildCountCompare);

	for (var i = 0; i < serverList.length; i++) {
		var newServer = serverList[i];
		if (seenList.includes(newServer)) continue;
		if (i != serverList.length - 1) {
			PrintServerInfo(newServer, prefix + "├─")
			ScanServer(newServer, seenList, indent + 1, prefix + "│ ");
		}
		else {
			PrintServerInfo(newServer, prefix + "╰─")
			ScanServer(newServer, seenList, indent + 1, prefix + "  ");
		}
	}
}

function ChildCountCompare(a, b) {
	var ax = ChildCount(a);
	var bx = ChildCount(b);
	return ChildCount(a) > ChildCount(b) ? 1 : -1;
}

function ChildCount(serverName) {
	var count = 0;
	var serverList = _ns.scan(serverName);
	for (var i = 1; i < serverList.length; i++) {
		count += ChildCount(serverList[i]) + 1;
	}
	return count;
}

/** @param {import(".").NS} ns */
function PrintServerInfo(serverName, prefix) {
	var hacked = (_ns.hasRootAccess(serverName)) ? "" : "";
	//swap these lines from being commented if you're not using a nerd font / don't want fancy marks on the root indicator
	//var hacked = (_ns.hasRootAccess(serverName)) ? "Y" : "N";
	var serverHackingLevel = _ns.getServerRequiredHackingLevel(serverName);
	var serverRam = _ns.getServerMaxRam(serverName);
	var hackSkill = _ns.getPlayer()['skills']['hacking'];
	var hackDiff;
	var money = [_ns.nFormat(_ns.getServerMoneyAvailable(serverName), '$0,0'), _ns.nFormat(_ns.getServerMaxMoney(serverName), '$0,0')]
	if (serverHackingLevel > hackSkill) hackDiff = `-${serverHackingLevel - hackSkill}`;
	if (serverHackingLevel == hackSkill) hackDiff = 0;
	if (serverHackingLevel < hackSkill) hackDiff = `+${hackSkill - serverHackingLevel}`;
	var canhack = false;
	var dfstring = `│${prefix}R:${hacked} ${serverName} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${money[0]}/${money[1]}`
	let dfl = dfstring.length
	let spa = 104 - dfl;
	let sp = "";
	for (let i = 0; i < spa; i++) {
		sp += " "
	}
	if (_ns.getHackingLevel() >= serverHackingLevel) {canhack = true}
	if (_ns.hasRootAccess(serverName)) {
		if (canhack) {
			_ns.print(`│${prefix}${col.g}R:${hacked} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		} else {
			_ns.print(`│${prefix}${col.g}R:${hacked}${col.y} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		}
	} else {
		if (canhack) {
			_ns.print(`│${prefix}${col.r}R:${hacked}${col.y} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		} else {
			_ns.print(`│${prefix}${col.r}R:${hacked} ${serverName}${col.d} ${serverRam}GB [${serverHackingLevel}] ${hackDiff} ${col.y}${money[0]}/${money[1]}${col.d}${sp}│`)
		}
	}
}