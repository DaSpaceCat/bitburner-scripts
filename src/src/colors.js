/** @param {NS} ns */
export async function main(ns) {

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
    ns.tprint(col.bk + "black " + col.r + "red " + col.g + "green " + col.y + "yellow "
        + col.b + "blue " + col.m + "magenta " + col.c + "cyan " + col.w + "white " + col.d + "default")

}