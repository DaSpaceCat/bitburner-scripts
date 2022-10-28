// Random utility functions
export function getBaseLog(x, y) { return Math.ceil(Math.log(y+1) / Math.log(x))}

// Random Braille - Suitable for Blinkenlights
export function RandomBraille() { return String.fromCharCode(0x2800 + Math.ceil(Math.random() * 0xFF)) }

// Binary Braille - Suitable for Binary counters
export const BrailleChar = (
    '⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸' +
    '⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸' +
    '⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼' +
    '⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼' +
    '⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺' +
    '⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺' +
    '⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾' +
    '⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾' +
    '⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹' +
    '⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹' +
    '⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽' +
    '⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽' +
    '⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻' +
    '⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻' +
    '⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿' +
    '⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿'
  ).split('')

export function BinaryBraille(num = 0) {
    let len = getBaseLog(256, num);
    let n = num.toString(16).padStart(len/2);
    let result = '';
    for (let i = 0; i <= len; i += 2) {
        let char = BrailleChar[parseInt(n.substring(i, i+2), 16)];
        result = result + char;
      }
      return result;
  }

// Presets - Wheel

export const AsciiWheel     = ['|', '/', '-', '\\'];
export const BounceWheel    = ["⠁","⠂","⠄", "⡀","⠄", "⠂"];
export const BrailleWheel   = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
export const ClockWheel     = ["🕛 ","🕐 ","🕑 ","🕒 ","🕓 ","🕔 ","🕕 ","🕖 ","🕗 ","🕘 ","🕙 ","🕚 "];
export const Dots           = ['.', '..', '...'];
export const EarthWheel     = ["🌍 ","🌎 ","🌏 "];
export const FiraWheel      = ['', '', '', '', '', ''];
export const MonoDots       = ['․', '‥', '…'];
export const MoonWheel      = ["🌑 ","🌒 ","🌓 ","🌔 ","🌕 ","🌖 ","🌗 ","🌘 "];
export const ScrollingDots  = [ ".  ",".. ","..."," ..","  .","   " ];

/** @param {import("../").NS} ns */
export function Wheel(period = 1000, style = AsciiWheel) {
    let len = style.length;
    return style[Math.floor(performance.now() / period) % len];
}

export const AsciiBar = [
		['[', '-', ']'],
		['[', '|', ']']
	];

export const FiraBar = [
		['', '', ''],
		['', '', '']
	];

/** @param {import("../").NS} ns */
export function ProgressBar(len = 5, fill = 0, style = AsciiBar) {
    let                                 result =    (fill > 0) ?    style[1][0] : style[0][0];
    for (let i = 1; i < len - 1; i++)   result +=   (i < fill) ?    style[1][1] : style[0][1];
                                        result +=   (fill >= len) ? style[1][2] : style[0][2];
    return result;
}

/** @param {import("../").NS} ns */
export async function main(ns){
    let period = 25;
    for (let i = 0; i <= 25; i++) {
        ns.clearLog();
        ns.tprint(`i = ${i} (${BinaryBraille(i)}): ${Wheel(period,MoonWheel)} - ${ProgressBar(25, i, FiraBar)} - ${Wheel(10, ['a', 'b', 'c'] )}`);
        await ns.sleep();
    }
}