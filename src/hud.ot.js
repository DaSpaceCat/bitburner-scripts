//import { Comm_NS, PeekPort_NS } from "tb_nstools.js";
//import { TextFloat, StandardNotation } from 'tb_toolbox.js';
//
/** @param {import("../").NS} ns */
export async function main(ns) {
    //ns.tail('hud.js')
    const d = eval("document");
    ns.clearLog();
    let showHiddenRows = false; // only applies to rows that are being updated or when resetting hud via "kill all running scripts"
    try {
        InitExistingRows();
        // TEXT HOOKS:
        // ============================================================
        // 		Initializing (from this file):
        // InitHudRow(hudHook, beforeThisRowHook, colorFromThisHook);
        //
        // 		Updating (from other files):
        // ns.run("hud.js", 1, "update", "nameOf-hook", "Leftside Text|Rightside Text");
        // ============================================================
        //
        // Unlike progress bars, these can be hidden at any time by updating them with the string "null|null"
        // therefore they don't need to be "hidden" or "shown"!
        //
        // PROGRESS BAR HOOKS:
        // ============================================================
        //		Initializing (from this file):
        // InitProgrBar(hudHook, beforeThisRowHook, colorFromThisHook);
        //
        // 		Show (from other files):
        // ns.run("hud.js", 1, "show", "nameOf-hook");
        //
        // 		Hide (from other files):
        // ns.run("hud.js", 1, "hide", "nameOf-hook");
        //
        // 		Updating (from other files):
        // ns.run("hud.js", 1, "progr", "nameOf-hook", 75);
        // ==========================================================
        //
        // Note that you cannot take color from a hook that does not have an existing progress bar, so no red or yellow bars :(
        //
        // List of all your custom hooks below! These are the ones I use.
        InitHudRow("bitnode-hook", "hp-hook", "cha-hook");
        InitHudRow("aug-hook", "hp-hook", "cha-hook");
        InitHudRow("ram-hook", "money-hook", "hp-hook");
        InitHudRow("bar1-hook", "money-hook", "extra-hook-0"); // decorative separator bars can be made by setting color to "extra-hook-0"
        InitHudRow("income-hook", "hack-hook", "money-hook");
        InitHudRow("stock-hook", "hack-hook", "money-hook");
        InitHudRow("hash-hook", "hack-hook", "hack-hook");
        InitHudRow("hashincome-hook", "hack-hook", "hack-hook");
        InitHudRow("bar2-hook", "hack-hook", "extra-hook-0");
        InitHudRow("buyupgrYES-hook", "hack-hook", "money-hook");
        InitHudRow("buyupgrNO-hook", "hack-hook", "hp-hook");
        InitHudRow("buynodeYES-hook", "hack-hook", "money-hook");
        InitHudRow("buynodeNO-hook", "hack-hook", "hp-hook");
        InitHudRow("buyservYES-hook", "hack-hook", "money-hook");
        InitHudRow("buyservNO-hook", "hack-hook", "hp-hook");
        InitHudRow("buyhashYES-hook", "hack-hook", "hack-hook");
        InitHudRow("buyhashNO-hook", "hack-hook", "hp-hook");
        InitHudRow("buyhashcorpYES-hook", "hack-hook", "hack-hook");
        InitHudRow("buyhashcorpNO-hook", "hack-hook", "hp-hook");
        InitHudRow("buyhashbladeYES-hook", "hack-hook", "hack-hook");
        InitHudRow("buyhashbladeNO-hook", "hack-hook", "hp-hook");
        InitHudRow("bar3-hook", "hack-hook", "extra-hook-0");
        // regular hack/combat/cha/int stats show up here
        InitHudRow("bar4-hook", "extra-hook-0", "extra-hook-0");
        InitHudRow("karma-hook", "extra-hook-0", "str-hook");
        InitProgrBar("karma-progr-hook", "extra-hook-0", "str-hook");
        InitHudRow("kill-hook", "extra-hook-0", "str-hook");
        InitProgrBar("kill-progr-hook", "extra-hook-0", "str-hook");
        InitHudRow("gangtimer-hook", "extra-hook-0", "hp-hook");
        d.getElementById("overview-extra-hook-2").innerText = "";
        // If we run this file with the right args we can update hud elements from other files!
        let updType = ns.args[0] || null;
        let updHook = ns.args[1] || null;
        let updInfo = ns.args[2] || null;
        if (updType == "update" || updType == "upd") {
            if (updInfo == null)
                updInfo = "null|null";
            UpdateHudRow(updHook, updInfo, false);
        }
        else if (updType == "update-progr" || updType == "progr") {
            if (updInfo == null)
                updInfo = 0;
            UpdateHudRow(updHook, updInfo, true);
        }
        else if (updType == "activate" || updType == "show") {
            if (updInfo == null)
                updInfo = 0;
            ShowProgrBar(updhook);
            UpdateHudRow(updHook, updInfo, true);
        }
        else if (updType == "deactivate" || updType == "hide" || updType == "kill") {
            HideProgrBar(updhook);
        }
        // Or just define and update hud elements locally! These are the ones I do locally.
        // Kills
        let kills = ns.getPlayer().numPeopleKilled;
        let killStr = "Kills|" + kills;
        UpdateHudRow("kill-hook", killStr);
        // Kill progress (toward the 30 required to access all factions)
        let killProgr = (kills / 30);
        if (killProgr < 1) {
            ShowProgrBar("kill-progr-hook");
            UpdateHudRow("kill-progr-hook", killProgr, true);
        }
        else {
            HideProgrBar("kill-progr-hook");
        }
        ;
        // Karma
        var karma = ns.heart.break();
        //let karmaStr = "Karma|" + StandardNotation(karma, 3);
        //UpdateHudRow("karma-hook", karmaStr);
        // Karma progress (toward unlocking gang)
        let karmaProgr = (Math.abs(karma) / 54000);
        //if (karmaProgr < 1 && PeekPort_NS(ns, 7)["wantGang"]) { ShowProgrBar("karma-progr-hook"); UpdateHudRow("karma-progr-hook", karmaProgr, true); }
        //else { HideProgrBar("karma-progr-hook"); };
        // Income (I use port 2 to store an array of income vals from different scripts and add them together here)
        //let totalCashPerSec = PeekPort_NS(ns, 2, "sumdict")
        //UpdateHudRow("income-hook", "$/sec|$" + StandardNotation(totalCashPerSec, 3));
    }
    catch (err) {
        ns.toast("ERROR: HUD update Skipped: " + String(err), "error", 1000);
    }
    // Functions (don't touch the stuff below this line!)
    // ==========================================================
    function InitExistingRows() {
        let hooknames = ["hp-hook", "money-hook", "str-hook", "def-hook", "dex-hook", "agi-hook", "cha-hook", "int-hook", "extra-hook-0"];
        for (let hook of hooknames) {
            let rowElement = d.getElementById("overview-row-" + hook);
            if (rowElement !== null)
                continue;
            d.getElementById("overview-" + hook).parentElement.parentElement.id = "overview-row-" + hook;
        }
        let rowElement = d.getElementById("overview-row-hack-hook");
        if (rowElement !== null)
            return;
        d.getElementById("overview-hack-hook").parentElement.parentElement.previousSibling.previousSibling.id = "overview-row-hack-hook";
        let nodeToDel = d.getElementById("overview-hack-hook").parentElement.parentElement;
        d.getElementById("overview-hack-hook").parentElement.parentElement.parentElement.removeChild(nodeToDel);
    }
    function InitHudRow(hudHook, beforeThisRowHook, colorFromThisHook) {
        let rowElement = d.getElementById("overview-row-" + hudHook);
        if (rowElement !== null)
            return rowElement;
        // Get the custom display elements in HUD.
        let existingRow = d.getElementById("overview-row-" + colorFromThisHook);
        // Make a clone of the hook for our extra hud elements
        let newHudRow = existingRow.cloneNode(true);
        // Remove any nested elements created by stats.js
        newHudRow.querySelectorAll("p > p").forEach(el => el.parentElement.removeChild(el));
        // Change ids for individual columns since duplicate id's are invalid
        newHudRow.querySelectorAll("p").forEach((el, i) => el.id = "overview-" + hudHook + "-" + i);
        newHudRow.id = "overview-row-" + hudHook;
        // Display label and default value
        newHudRow.querySelectorAll("p")[0].innerText = "";
        if (showHiddenRows)
            newHudRow.querySelectorAll("p")[0].innerText = hudHook;
        newHudRow.querySelectorAll("p")[1].innerText = "";
        // Determine where to insert our element
        existingRow.parentElement.insertBefore(newHudRow, d.getElementById("overview-row-" + beforeThisRowHook));
        return newHudRow;
    }
    function InitProgrBar(hudHook, beforeThisRowHook, colorFromThisHook) {
        let rowElement = d.getElementById("overview-row-" + hudHook);
        if (rowElement !== null)
            return rowElement;
        // Get the custom display elements in HUD.
        let existingRow = d.getElementById("overview-row-" + colorFromThisHook).nextSibling;
        // Make a clone of the hook for our extra hud elements
        let newHudRow = existingRow.cloneNode(true);
        newHudRow.id = "overview-row-" + hudHook;
        // Determine where to insert our element
        existingRow.parentElement.insertBefore(newHudRow, d.getElementById("overview-row-" + beforeThisRowHook));
        UpdateProgrBar(newHudRow.firstChild.firstChild, 0);
        return newHudRow;
    }
    function HideProgrBar(hudHook) {
        let rowElement = d.getElementById("overview-row-" + hudHook);
        if (rowElement !== null) {
            // Remove all HTML from the deepest child so the HTML doesn't auto-update
            rowElement.firstChild.firstChild.innerHTML = "";
            // Rename "class" to "clss" in the HTML of the first-depth child so the information cannot be parsed.
            let curHTML = rowElement.innerHTML;
            let htmlL = curHTML.split(`-3px;"><span cl`)[0] + `-3px;"><span cl`;
            let htmlR = curHTML.split(`-3px;"><span cl`)[1];
            if (htmlR[0] == "a") {
                rowElement.innerHTML = htmlL + curHTML.split(`-3px;"><span cla`)[1];
            }
        }
    }
    function ShowProgrBar(hudHook) {
        let rowElement = d.getElementById("overview-row-" + hudHook);
        if (rowElement !== null) {
            // Replace the missing HTML in the deepest child
            let existingHTML = d.getElementById("overview-row-str-hook").nextSibling.firstChild.firstChild.innerHTML;
            rowElement.firstChild.firstChild.innerHTML = existingHTML;
            // Rename "class" back to "clss" in the HTML of the first-depth child so the information can be parsed once again.
            let curHTML = rowElement.innerHTML;
            let htmlL = curHTML.split(`-3px;"><span cl`)[0] + `-3px;"><span cl`;
            let htmlR = curHTML.split(`-3px;"><span cl`)[1];
            if (htmlR[0] != "a") {
                rowElement.innerHTML = htmlL + "a" + htmlR;
            }
        }
    }
    function UpdateHudRow(hookToUpdate, updateStr, isProgressBar = false) {
        if (!isProgressBar) {
            let textL = updateStr.split("|")[0];
            if (textL == null || textL == "null") {
                if (showHiddenRows)
                    textL = hookToUpdate;
                else
                    textL = "";
            }
            d.getElementById("overview-" + hookToUpdate + "-0").innerText = textL;
            let textR = updateStr.split("|")[1];
            if (textR == null || textR == "null") {
                textR = "";
            }
            ;
            d.getElementById("overview-" + hookToUpdate + "-1").innerText = textR;
        }
        else if (isProgressBar) {
            UpdateProgrBar(d.getElementById("overview-row-" + hookToUpdate).firstChild.firstChild, updateStr);
        }
    }
    ;
    function UpdateProgrBar(elementToUpdate, updatePercent) {
        if (updatePercent == null || updatePercent == "null")
            updatePercent = 1;
        else
            updatePercent = (1 - Number(updatePercent)) * 100;
        // get existing HTML
        let existingHTML = elementToUpdate.innerHTML;
        // split the HTML so we get the sections we want to edit
        let leftHTML = String(existingHTML).split("translateX(-")[0] + "translateX(-";
        let rightHTML = "%);" + String(existingHTML).split("%);")[1];
        let newHTML = leftHTML + updatePercent + rightHTML;
        elementToUpdate.innerHTML = newHTML;
    }
    ;
}
