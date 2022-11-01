/*
 ____  _     _ _       ____  _ _   _
|  _ \| |__ (_| )___  | __ )(_) |_| |__  _   _ _ __ _ __   ___ _ __
| |_) | '_ \| |// __| |  _ \| | __| '_ \| | | | '__| '_ \ / _ \ '__|
|  _ <| | | | | \__ \ | |_) | | |_| |_) | |_| | |  | | | |  __/ |
|_| \_\_| |_|_| |___/ |____/|_|\__|_.__/ \__,_|_|  |_| |_|\___|_|
 _   _      _                   _     _ _
| | | | ___| |_ __   ___ _ __  | |   (_) |__  _ __ __ _ _ __ _   _
| |_| |/ _ \ | '_ \ / _ \ '__| | |   | | '_ \| '__/ _` | '__| | | |
|  _  |  __/ | |_) |  __/ |    | |___| | |_) | | | (_| | |  | |_| |
|_| |_|\___|_| .__/ \___|_|    |_____|_|_.__/|_|  \__,_|_|   \__, |
             |_|                                             |___/
*/

/**
 * Helpers for global objects in the DOM
 */
export const globalHelper = {
	/**
	 * Inject a script into the DOM
	 * @param {string} id HTML element id
	 * @param {string} script the JavaScript to inject.
	 */
	createGlobalScript: function(id, script) {
		let doc = eval("document")
		if (doc.getElementById(id) == null) {
			let s = doc.createElement("script");
			s.id = id;
			s.innerHTML = script;
			doc.head.appendChild(s);
		} else {
			console.log("WARN: Script with that ID already exists! overwriting current!");
			doc.getElementById(id).innerHTML = script;
		}
	},

	/**
	 * Inject CSS into the DOM
	 * @param {string} id HTML element id
	 * @param {string} style the CSS to inject.
	 */
	createGlobalStyle: function (id, style) {
		let doc = eval("document")
		if (doc.getElementById(id) == null) {
			let s = doc.createElement("style");
			s.id = id;
			s.innerHTML = style;
			doc.head.appendChild(s);
		} else {
			console.log("WARN: Style with that ID already exists! overwriting current!");
			doc.getElementById(id).innerHTML = style;
		}
	}
}

/**
 * HUD helper functions.
 */
export const hudHelper = {
	/** 
	 * Internal Function.
	 */
	createMin: function(dv, isMin, cVar, id) {
		dv.slice(0, -4);
		if (isMin) {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar}; ovvMax('${id}')"></a> ─`;
		} else {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar}; ovvMin('${id}')"></a> ─`;
		}
		return dv;
	},

	/**
	 * End a section of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 */
	endSec: function(hed, val) {
		hed.push("</div>")
		val.push("</div>")
	},

	/**
	 * Insert a break between sections of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} sec The name of the section.
	 * @param {string} dv The divider string. should be made up of the ─ character.
	 * @param {boolean} min Whether or not the section should be minimized by default.
	 * @param {string} minVar The name of the variable that will be used to store the minimized state.
	 * @param {string} cls The class name of the DIV the minimize button wil use.
	 */
	pushBreak: function(hed, val, sec, dv, min, minVar, cls) {
		hed.push(`<span style="color: #FFFFFF">├───────────────</span><br>`)
		val.push(`<span style="color: #FFFFFF">${dv} <span style="color: #98C379">${sec}</span> ${hudHelper.createMin(dv, min, minVar, cls)}┤</span><br>`)
	},

	/**
	 * Insert content into the hud.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} tp The header content.
	 * @param {string} cont The value content.
	 * @param {string} col The color of the content. can be any valid CSS color value
	 * @param {string} allign Optional. The CSS text allignment of the content.
	 */
	pushCont: function(hed, val, tp, cont, col, allign) {
		hed.push(`<span style="color: #ffffff">│</span><span style="color: ${col}">${tp}</span><br>`)
		if (allign != undefined) {
			val.push(`<span style="color: ${col}; text-allign: ${allign}">${cont}</span><span style="color: #ffffff">│</span><br>`)
			return;
		}
		val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">│</span><br>`)
	},

	/**
	 * Internal Function.
	 */
	pushContE: function(hed, val, tp, cont, col) {
		hed.push(`<span style="color: ${col}">${tp}</span><br>`)
		val.push(`<span style="color: ${col}">${cont}</span><br>`)
	},

	/**
	 * Start a section of the hud. has no effect on the hud appearance.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} clas The class of the section.
	 * @param {string} dsp The display style of the section. should be either "none" or "inline".
	 */
	startSec: function(hed, val, clas, dsp) {
		hed.push(`<div class="${clas}" style="display: ${dsp}">`)
		val.push(`<div class="${clas}" style="display: ${dsp}">`)
	},

	/**
	 * Push the starting text of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 */
	startHud: function(hed, val) {
		this.pushContE(hed ,val, "╭───────────────", "────────────────────────────────────────────╮", "#FFFFFF")
	},

	/**
	 * Push the ending text of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 */
	endHud: function(hed, val) {
		this.pushContE(hed, val, "╰───────────────", "────────────────────────────────────────────╯", "#FFFFFF")
	},

	/**
	 * Start a subsection of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} t The title of the subsection.
	 * @param {string} f The divider text. should be made up of the ─ character.
	 */
	startSubsec: function(hed, val, t, f) {
		this.pushContE(hed ,val, "│╭──────────────", `${f} <span style="color: #98C379">${t}</span> ${f}╮│`, "#FFFFFF")
	},

	/**
	 * End a subsection of the HUD.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 */
	endSubsec: function(hed, val) {
		this.pushContE(hed, val, "│╰──────────────", "───────────────────────────────────────────╯│", "#FFFFFF")
	},

	/**
	 * 
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} tp The header content.
	 * @param {string} col The color of the content. can be any valid CSS color value
	 * @param {string} cont The value content.
	 */
	pushContSub: function(hed, val, tp, cont, col) {
		hed.push(`<span style="color: #ffffff">││</span><span style="color: ${col}">${tp}</span><br>`)
		val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">││</span><br>`)
	}
}

/**
 * Miscelaneous helper functions that didn't fit anywhere else.
 */
export const miscHelper = {
	/** 
	 * Gets a route to the specified server.
	 * @param {ns} s Reference to netscript.
	 * @param {string} srv The server to get the route to.
	 * @returns {array} An array containing the route.
	 */
	findRoute: function (s, srv) {
		let route = [srv]
		while (route[0] != "home") {
			let temp = s.scan(route[0])
			route.unshift(temp[0])
		}
		return route;
	}
}

/**
 * Sleeve API helpers.
 */
export const sleeveHelper = {
	/**
	 * Change the action of a sleeve.
	 * @param {ns} s Netscript reference.
	 * @param {boolean} a If true, change the action of every sleeve.
	 * @param {number} n The sleeve to change the action of. Can be any number if `a` is `true`.
	 * @param {string} t The action to change to. Can be: `"recovery"`, `"sync"`, `"crime"`, `"wFaction"`, `"wCompany"`, `"gym"`, `"uni"`, or `"blade"`. 
	 * @param {string} o1 The sub-action of the action. Only applies to some actions.
	 * @param {string} o2 The sub-sub-action of the action. Only applies to some actions.
	 */
	setTask: function(s, a, n, t, o1, o2) {
		let i = n;
		let sleeves = 1
		if (a) { i = 0; sleeves = s.sleeve.getNumSleeves(); }
		for (i = i; i < sleeves; i++) {
			switch (t) {
				case "recovery":
					s.sleeve.setToShockRecovery(i)
					break;
				case "sync":
					eval("s.sleeve.setToSynchronize(i)");
					break;
				case "crime":
					if (o1 != undefined) {
						eval("s.sleeve.setToCommitCrime(i, o1)");
					} else { s.print("ERROR: no crime provided") }
					break;
				case "wFaction":
					if (o1 != undefined) {
						if (o2 != undefined) {
							eval("s.sleeve.setToFactionWork(i, o1, o2)");
						} else { s.print("ERROR: no work type provided") }
					} else { s.print("ERROR: no faction provided") }
					break;
				case "wCompany":
					if (o1 != undefined) {
						eval("s.sleeve.setToCompanyWork(i, o1)");
					} else { s.print("ERROR: no company defined") }
					break;
				case "gym":
					if (o1 != undefined) {
						if (o2 != undefined) {
							eval("s.sleeve.setToGymWorkout(i, o1, o2)");
						} else { s.print("ERROR: no gym provided") }
					} else { s.print("ERROR: no stat provided") }
					break;
				case "uni":
					if (o1 != undefined) {
						if (o2 != undefined) {
							eval("s.sleeve.setToUniversityCourse(i, o1, o2)");
						} else { s.print("ERROR: no university provided") }
					} else { s.print("ERROR: no course provided") }
					break;
				case "blade":
					if (o1 != undefined) {
						if (o2 != undefined) {
							eval("s.sleeve.setToBladeburnerAction(i, o1, o2)");
						} else { s.print("ERROR: no category provided") }
					} else { s.print("ERROR: no contract provided") }
					break;
				case undefined:
					s.print("you, didn't define a work type. what are you even doing?");
					("check the script log");
					break;
				//end
			}
		}
	},

	/**
	 * Buy all augments for every sleeve.
	 * @param {ns} s Netscript reference.
	 */
	buyAllAugs: function (s) {
		for (let i = 0; i < s.sleeve.getNumSleeves(); i++) {
			const augs = eval("s.sleeve.getSleevePurchasableAugs(i)");
			let totalCost;
			for (let j = 0; j < augs.length; j++) {
				totalCost += eval("s.sleeve.getSleeveAugmentationPrice(augs[j])");
			}
			if (s.getPlayer().money < totalCost) {
				s.tprint(`ERROR: Not enough dollariedoos to buy augments for sleeve ${i}. Aborting.`)
				return;
			}
			for (let j = 0; j < augs.length; j++) {
				eval("s.purchaseSleeveAug(i, augs[j])");
			}
			return;
		}
	}
}

/**
 * Helper functions for Gangs.
 */
export const gangHelper = {
	/**
	 * get a random name from a list, excluding current names.
	 * @param {array} members The array of current gang members.
	 * @returns a random name from the list, excluding names in the passed list.
	 */
	randomName: function (members) {
		const names = [
			"Boe Jiden",
			"Beff Jesos",
			"Darcetine",
			"Gill Bates",
			"Zarco",
			"Lilly",
			"Doc. Brown",
			"Marty McFly",
			"Roxy",
			"Natalie",
			"Rem",
			"Tai",
			"Luther",
			"Sean",
			"Celso",
			"Paul",
			"Kit",
			"Anna",
			"Todd",
			"Chozo",
			"Kai",
			"Tucker",
			"John Doe",
			"undefined",
			"Nezomi",
			"Avery",
			"Phillip",
			"Amtrak",
			"Avelican",
			"You",
			"Hydroflame",
			"xsinx",
			"Zoe",
			"Zelow",
			"nightElf",
			"Jeoshua",
			"Lyra",
			"Dashi",
			"ElJay",
			"Quacksouls",
			"_NAME_PLACEHOLDER_",
			"Neo",
			"Trinity",
			"Morpheus",
			"Agent Smith",
			"Keanu Reeves",
			"John Matrix",
			"Mughur",
			"Khan",
			"James T. Kirk",
			"Spock",
			"Leonard McCoy",
			"Jean-Luc Picard",
			"William Riker",
			"Data",
			"Kathryn Janeway",
			"Chakotay",
			"Tom Paris",
			"Harry Kim",
			"Neelix",
			"The Borg Queen",
			"Seven of Nine",
			"Q",
			"Mariah Carey",
			"Rafi",
			"Rios",
			"Grant",
			"Alex",
			"Robert",
			"Ace",
		]
		//remove names already in use
		for (let i = 0; i < members; i++) {
			for (let j = 0; j < names.length; j++) {
				if (names[j] == members[i]) {
					names.splice(j, 1);
				}
			}
		}
		return names[Math.floor(Math.random() * names.length)];
	},

	/**
	 * Get the current equipment discount for a gang.
	 * @param {number} pwr the gang's power
	 * @param {number} rep the gang's reputation
	 * @returns {number} The discount percentage
	 */
	getUpgradeDiscount: function (pwr, rep) {
		const rlf = 5e6;
		const plf = 1e6;
		const d = Math.pow(rep, 0.01) + rep / rlf + Math.pow(pwr, 0.01) + pwr / plf - 1;
		return Math.max(1, d);
	}
}

/**
 * Helpers for the Formulas API.
 */
export const formulaHelper = {
	/**
	 * Check if the player has formulas.
	 * @param {ns} s netscript object
	 * @returns boolean stating whether or not the player has formulas.exe
	 */
	hasFormulas : function (s) { return s.fileExists("Formulas.exe", "home"); },

	/** 
	 * Get the EXP required to get to a specific level of a skill.
	 * @param {ns} s netscript object
	 * @param {string} sk The skill to check.
	 * @param {number} lvl The level you want to get to.
	 * @returns The EXP required to get to the specified level.
	*/
	getExpReq: function (s, sk, lvl) {
		const exp = s.getPlayer()['exp'][sk];
		const multi = s.getPlayer()['mults'][sk];
		const expReq = s.formulas.skills.calculateExp(lvl, multi);
		return expReq - exp;
	},
	
	/**
	 * get how many levels that getting `exp` EXP will give you.
	 * @param {ns} s netscript object
	 * @param {string} sk the skill to check
	 * @param {number} exp the amount of EXP to use for the calculation.
	 * @returns 
	 */
	levelsFromExpGain: function (s, sk, exp) {
		const multi = s.getPlayer()['mults'][sk];
		const cexp = s.getPlayer()['exp'][sk] + exp;
		const clvl = s.getPlayer()['skills'][sk];
		const lvlExp = s.formulas.skills.calculateSkill(cexp, multi);
		const extLvls = lvlExp - clvl;
		return extLvls;
	}
}

/**
 * Helpers for the Hash/Hacknet API.
 */
export const hashnetHelper = {

	/**
	 * Check if you have the hashes to purchase `num` of `upgrade`.
	 * @param {ns} s Netscript object.
	 * @param {string} upgrade The name of the upgrade. What's shown ingame.
	 * @param {number} num The amount of upgrades you want to buy.
	 * @returns A boolean that tells you if you can purchase `num` of `upgrade`.
	 */
	canGet: function (s, upgrade, num) {
		const hashes = s.hacknet.numHashes();
		const dCost = s.hacknet.hashCost(upgrade, 1);
		const inc = this.getPriceIncrease(upgrade);
		for (i = 0; i < num; i++) {
			//the cost will be the cost of what it is right now, and the cost of the increase
			//multiplied by the current iteration of purchasing.
			hashes -= dCost + (inc * i);
			if (hashes < 0) {
				return false;
			}
		}
		return true;
	},

	/**
	 * get the price increase of a hashnet upgrade.
	 * @param {string} upgrade the upgrade to check.
	 * @returns {number} the price increase.
	 */
	getPriceIncrease: function (upgrade) {
		switch (upgrade) {
			case "Sell for Corporation Funds":
				return 100;
			case "Reduce Minimum Security":
				return 50;
			case "Increase Maximum Money":
				return 50;
			case "Improve Studying":
				return 50;
			case "Improve Gym Training":
				return 50
			case "Exchange for Corporation Research":
				return 200;
			case "Exchange for Bladeburner Rank":
				return 250;
			case "Exchange for Bladeburner SP":
				return 250;
			case "Generate Coding Contract":
				return 200;
		}
	}
}