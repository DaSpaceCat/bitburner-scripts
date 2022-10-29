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

//helpers that deal with creating custom HUD displays
export const hudHelper = {
	//cVar should be a STRING that is the variable
	createMin: function(dv, isMin, cVar, id) {
		dv.slice(0, -4);
		if (isMin) {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar}; ovvMax('${id}')"></a> ─`;
		} else {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar}; ovvMin('${id}')"></a> ─`;
		}
		return dv;
	},
	endSec: function(hed, val) {
		hed.push("</div>")
		val.push("</div>")
	},
	//min is the boolean passed, minVar is the boolean var name passed as a string
	pushBreak: function(hed, val, sec, dv, min, minVar, cls) {
		hed.push(`<span style="color: #FFFFFF">├───────────────</span><br>`)
		val.push(`<span style="color: #FFFFFF">${dv} <span style="color: #98C379">${sec}</span> ${hudHelper.createMin(dv, min, minVar, cls)}┤</span><br>`)
	},
	pushCont: function(hed, val, tp, cont, col, all) {
		hed.push(`<span style="color: #ffffff">│</span><span style="color: ${col}">${tp}</span><br>`)
		if (all != undefined) {
			val.push(`<span style="color: ${col}; text-allign: ${all}">${cont}</span><span style="color: #ffffff">│</span><br>`)
			return;
		}
		val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">│</span><br>`)
	},
	pushContE: function(hed, val, tp, cont, col) {
		hed.push(`<span style="color: ${col}">${tp}</span><br>`)
		val.push(`<span style="color: ${col}">${cont}</span><br>`)
	},
	//dsp should either be "none" or "inline"
	startSec: function(hed, val, clas, dsp) {
		hed.push(`<div class="${clas}" style="display: ${dsp}">`)
		val.push(`<div class="${clas}" style="display: ${dsp}">`)
	},
	startHud: function(hed, val) {
		this.pushContE(hed ,val, "╭───────────────", "────────────────────────────────────────────╮", "#FFFFFF")
	},
	endHud: function(hed, val) {
		this.pushContE(hed, val, "╰───────────────", "────────────────────────────────────────────╯", "#FFFFFF")
	},
	startSubsec: function(hed, val, t, f) {
		this.pushContE(hed ,val, "│╭──────────────", `${f} <span style="color: #98C379">${t}</span> ${f}╮│`, "#FFFFFF")
	},
	endSubsec: function(hed, val) {
		this.pushContE(hed, val, "│╰──────────────", "───────────────────────────────────────────╯│", "#FFFFFF")
	},
	pushContSub: function(hed, val, tp, cont, col) {
		hed.push(`<span style="color: #ffffff">││</span><span style="color: ${col}">${tp}</span><br>`)
		val.push(`<span style="color: ${col}">${cont}</span><span style="color: #ffffff">││</span><br>`)
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
