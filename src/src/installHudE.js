/** @param {import("../../").NS} ns */
export async function main (ns) {
	await ns.wget('https://raw.githubusercontent.com/reniivali/bitburner-scripts/main/src/src/hud.e.js', 'hud.e.js');
	await ns.wget('https://raw.githubusercontent.com/reniivali/bitburner-scripts/main/src/src/helpers.e.js', 'helpers.e.js');
	await ns.wget('https://raw.githubusercontent.com/reniivali/bitburner-scripts/main/src/src/nsg.e.js', 'nsg.e.js');
	await ns.wget('https://raw.githubusercontent.com/reniivali/bitburner-scripts/main/src/src/glyph.js', 'glyph.e.js');
}