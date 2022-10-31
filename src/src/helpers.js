/* eslint-disable no-self-assign */
/* eslint-disable no-unreachable */
//helpers that deal with global elements
export const globalHelper = {
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
 * Library of HUD helper functions.
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
		if (all != undefined) {
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

//helpers dealing with sleeve actions
//mostly just a diff function for task setting cause i think the way it's in the game normally is stupid
export const sleeveHelper = {
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

export const gangHelper = {
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
	getUpgradeDiscount: function (pwr, rep) {
		const rlf = 5e6;
		const plf = 1e6;
		const d = Math.pow(rep, 0.01) + rep / rlf + Math.pow(pwr, 0.01) + pwr / plf - 1;
		return Math.max(1, d);
	}
}

/** @param {import("../../").NS} s*/
export const formulaHelper = {
	hasFormulas : function (s) { return s.fileExists("Formulas.exe", "home"); },
	//returns how much exp you need to get the provided level
	getExpReq: function (s, sk, lvl) {
		const exp = s.getPlayer()['exp'][sk];
		const multi = s.getPlayer()['mults'][sk];
		const expReq = s.formulas.skills.calculateExp(lvl, multi);
		return expReq - exp;
	},
	/** @param {import("../../").NS} s*/
	levelsFromExpGain: function (s, sk, exp) {
		const multi = s.getPlayer()['mults'][sk];
		const cexp = s.getPlayer()['exp'][sk] + exp;
		const clvl = s.getPlayer()['skills'][sk];
		const lvlExp = s.formulas.skills.calculateSkill(cexp, multi);
		const extLvls = lvlExp - clvl;
		return extLvls;
	}
}
