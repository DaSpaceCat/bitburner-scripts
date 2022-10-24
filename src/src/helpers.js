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
		hed.push(`<span style="color: ${col.def}">├───────────────</span><br>`)
		val.push(`<span style="color: ${col.def}">${dv} <span style="color: ${col.hak}">${sec}</span> ${hudHelper.createMin(dv, min, minVar, cls)}┤</span><br>`)
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
	}
}

export const sleeveHelper = {
	setTask: function(s, a, n, t, o1, o2) {
		let i = n;
		let sleeves = 1
		if (a) { i = 0; sleeves = s.sleeve.getNumSleeves(); }
		for (i = i; i < sleeves; i++) {
		switch (t) {
			case "recovery":
				return s.sleeve.setToShockRecovery(i)
				break;
			case "sync":
				return s.sleeve.setToSynchronize(i)
				break;
			case "crime":
				if (o1 != undefined) {
					return s.sleeve.setToCommitCrime(i, o1);
				} else { s.print("ERROR: no crime provided") }
				break;
			case "wFaction":
				if (o1 != undefined) {
					if (o2 != undefined) {
						return s.sleeve.setToFactionWork(i, o1, o2)
					} else { s.print("ERROR: no work type provided") }
				} else { s.print("ERROR: no faction provided") }
				break;
			case "wCompany":
				if (o1 != undefined) {
					return s.sleeve.setToCompanyWork(i, o1)
				} else { s.print("ERROR: no company defined") }
				break;
			case "gym":
				if (o1 != undefined) {
					if (o2 != undefined) {
						return s.sleeve.setToGymWorkout(i, o1, o2)
					} else { s.print("ERROR: no gym provided") }
				} else { s.print("ERROR: no stat provided") }
				break;
			case "uni"
				if (o1 != undefined) {
					if (o2 != undefined) {
						return s.sleeve.setToUniversityCourse(i, o1, o2)
					} else { s.print("ERROR: no university provided") }
				} else { s.print("ERROR: no course provided") }
				break;
			case "blade":
				if (o1 != undefined) {
					if (o2 != undefined) {
						return s.sleeve.setToBladeburnerAction(i, o1, o2)
					} else { s.print("ERROR: no category provided") }
				} else { s.print("ERROR: no contract provided") }
				break;
			case undefined:
				s.print("you, didn't define a work type. what are tou even doing?");
				return("check the script log");
				break;
			//end
		}
		}
	},
	buyAllAugs: function (s) {
		for (let i = 0; i < s.sleeve.getNumSleeves(); i++) {
			const augs = s.sleeve.getSleevePurchasableAugs(i)
			let totalCost;
			for (let j = 0; j < augs.length; j++) {
				totalCost += s.sleeve.getSleeveAugmentationPrice(augs[j]);
			}
			if (s.getPlayer().money < totalCost) {
				s.tprint(`ERROR: Not enough dollariedoos to buy augments for sleeve ${i}. Aborting.`)
				return;
			}
			for (let j = 0; j < augs.length; j++) {
				purchaseSleeveAug(i, augs[j]);
			}
			return;
		}
	}
}
