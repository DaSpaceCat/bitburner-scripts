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
var doc = eval("document");
const term = doc.getElementById("terminal")
//why do you hate me? I
//if the script isn't working just edit and save it that should fix it
export async function main(ns) {
	var seenList = [];
	_ns = ns;
	ns.tprint("╭┐Map ┌──────────────────────────────────────────────────────────────────╮");
	ns.tprint(`│${col.g}R: Home ${col.d}[1]                                                             │`);
	//appterm("<span>╭─Map──<span>")
	//appterm('<span>│</span><span style="color: green;">R:✓ </span><span>Home [1]</span>')
	ScanServer("home", seenList, 0, "");
	ns.tprint("╰──────────────────────────────────────────────────────────────────┘Map └╯");
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

function PrintServerInfo(serverName, prefix) {
	var hacked = (_ns.hasRootAccess(serverName)) ? "" : "";
	var serverHackingLevel = _ns.getServerRequiredHackingLevel(serverName);
	var canhack = false;
	var dfstring = `│${prefix}R:${hacked} ${serverName} [${serverHackingLevel}]`
	let dfl = dfstring.length
	let spa = 74 - dfl;
	let sp = "";
	for (let i = 0; i < spa; i++) {
		sp += " "
	}
	if (_ns.getHackingLevel() >= serverHackingLevel && !_ns.hasRootAccess(serverName)) {canhack = true}
	if (_ns.hasRootAccess(serverName)) {
		_ns.tprint(`│${prefix}${col.g}R:${hacked} ${serverName}${col.d} [${serverHackingLevel}]${sp}│`)
		//appterm(`<span>│${prefix}</span><span style="color: green;">R:${hacked} </span><span>${serverName} [${serverHackingLevel}]</span>`);
	} else {
		if (canhack) {
			_ns.tprint(`│${prefix}${col.r}R:${hacked}${col.y} ${serverName}${col.d} [${serverHackingLevel}]${sp}│`)
		} else {
			_ns.tprint(`│${prefix}${col.r}R:${hacked} ${serverName}${col.d} [${serverHackingLevel}]${sp}│`)
		}
		//appterm(`<span>│${prefix}</span><span style="color: red;">R:${hacked} </span><span>${serverName} [${serverHackingLevel}]</span>`);
	}
}

function appterm(str) {
	let dv = doc.createElement("div");
	dv.innerHTML = '<li style="padding: 0px;" class="jss14 MuiListItem-root MuiListItem-gutters MuiListItem-padding css-17eb3a9"><p style="white-space: break-spaces;" class="jss19 MuiTypography-root MuiTypography-body1 css-8twwy">' + str + '</p></li>'
	term.append(dv)
}