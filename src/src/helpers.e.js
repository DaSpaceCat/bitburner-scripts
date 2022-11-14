// ____  _     _ _       ____  _ _   _
//|  _ \| |__ (_| )___  | __ )(_) |_| |__  _   _ _ __ _ __   ___ _ __
//| |_) | '_ \| |// __| |  _ \| | __| '_ \| | | | '__| '_ \ / _ \ '__|
//|  _ <| | | | | \__ \ | |_) | | |_| |_) | |_| | |  | | | |  __/ |
//|_| \_\_| |_|_| |___/ |____/|_|\__|_.__/ \__,_|_|  |_| |_|\___|_|
// _   _      _                   _     _ _
//| | | | ___| |_ __   ___ _ __  | |   (_) |__  _ __ __ _ _ __ _   _
//| |_| |/ _ \ | '_ \ / _ \ '__| | |   | | '_ \| '__/ _` | '__| | | |
//|  _  |  __/ | |_) |  __/ |    | |___| | |_) | | | (_| | |  | |_| |
//|_| |_|\___|_| .__/ \___|_|    |_____|_|_.__/|_|  \__,_|_|   \__, |
//             |_|                                             |___/

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
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar};"></a> ─`;
		} else {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar};"></a> ─`;
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
		hed.push(`<span style="cursor: default; color: #FFFFFF">├───────────────</span><br>`)
		val.push(`<span style="cursor: default; color: #FFFFFF">${dv} <span style="cursor: default; color: #98C379">${sec}</span> ${hudHelper.createMin(dv, min, minVar, cls)}┤</span><br>`)
	},

	/**
	 * Insert content into the hud.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} tp The header content.
	 * @param {string} col The color of the content. can be any valid CSS color value
	 * @param {string} id The HTML id of the value content.
	 * @param {string} allign Optional. The CSS text alignment of the content.
	 */
	pushCont: function(hed, val, tp, /*cont,*/ col, id, allign) {
		hed.push(`<span style="cursor: default; color: #ffffff">│</span><span style="cursor: default; color: ${col}">${tp}</span><br>`)
		if (allign !== undefined) {
			val.push(`<span class="tooltip" id="ovv-${id}" style="cursor: default; position: relative; color: ${col}; text-align: ${allign}"></span><span style="cursor: default; color: #ffffff">│</span><br>`)
			return;
		}
		val.push(`<span class="tooltip" id="ovv-${id}" style="cursor: default; color: ${col}; width: 100%;"></span><span style="cursor: default; color: #ffffff">│</span><br>`)
	},

	/**
	 * Internal Function.
	 */
	pushContE: function(hed, val, tp, cont, col) {
		hed.push(`<span style="cursor: default; color: ${col}">${tp}</span><br>`)
		val.push(`<span style="cursor: default; color: ${col}">${cont}</span><br>`)
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
	 * Push subsection content.
	 * @param {array} hed The array of hud header elements.
	 * @param {array} val The array of hud value elements.
	 * @param {string} tp The header content.
	 * @param {string} col The color of the content. can be any valid CSS color value
	 * @param {string} id The HTML id of the value content `<span>`.
	 */
	pushContSub: function(hed, val, tp, col, id) {
		hed.push(`<span style="cursor: default; color: #ffffff">││</span><span style="cursor: default; color: ${col}">${tp}</span><br>`)
		val.push(`<span id="ovv-${id}" style="cursor: default; color: ${col}"></span><span style="cursor: default; color: #ffffff">││</span><br>`)
	},

	/**
	 * Update the value of HUD content.
	 * @param {string} id The HTML id of the value content `<span>`.
	 * @param {string} val The HTML for the `<span>`.
	 */
	updateVal: function(id, val) {
		let e = eval(`document.getElementById("ovv-${id}")`)
		e.innerHTML = val
	},

	/**
	 * Custom Tooltips. Credit for some code goes to @KarmicChaos#7777
	 */
	tooltip: {
		updatePos: function(e) {
			const d = eval("document");
			let cx = e.clientX;
			let cy = e.clientY;
			const els = d.getElementsByClassName("tooltiptext")
			for (let i = 0; i < els.length; i++) {
				const elc = els[i]
				let lpx = (cx - 10);
				const wd = eval("window.innerWidth")
				while (((lpx + elc.offsetWidth) + 8) > wd) {
					lpx --;
				}
				elc.style.left = (lpx) + "px";
				elc.style.top  = (cy + 10) + "px";
			}
		},

		style: `.tooltiptext{font-family: "Fira Code", monospace;
			padding: 4px 8px;
			margin: 2px;
			overflow-wrap: normal;
			white-space: pre;
			font-weight: 500;
			font-size: 1em;
			border-radius: 0px;
			border: 2px solid white;
			max-width: 100vh;
			position: fixed;
			z-index: 9999999999;
			inset: 0px auto auto 0px;
			transform: translate3d(0px, 20px, 0px);
			transition: all 0.2s;
			color: #F5C2E7;
			background-color: #181825
		}`,

		/**
		 * Create a tooltip object, used for creating tooltips.
		 * @param {string} tx The content of the tooltip.
		 * @param {string} allign Optional: The tooltip's text alignment.
		 */
		createObject: function(tx, allign) {
			return {
				tooltiptext: tx,
				textAlign: allign
			}
		},

		/**
		 * Create a BitNode tooltip object.
		 * @param {Object} sf The source file object.
		 * @param {string} h The bitNode header.
		 * @param {string} s The bitNode description.
		 * @param {boolean} b12 Optional. Whether or not the bitNode is BitNode-12.
		 */
		createBNObject: function(sf, h, s, b12) {
			if (b12) {
				return {
					tooltiptext: `<span style="font-weight: bold;">${h}</span><br>${s}<br>SF: ${sf.lvl}`,
				}
			} else {
				return {
					tooltiptext: `<span style="font-weight: bold;">${h}</span><br>${s}<br>SF: ${sf.lvl} / 3`,
					textAlign: "left"
				}
			}
		},

		/**
		 * Heavily modified helper function from the game's source code for creating tooltips
		 * @param {string} el The ID of the element to attach the tooltip to.
		 * @param {any} params - Dictionary of relevant tooltip parameters
		 * @param {boolean} doneEL Boolean stating if the document handler has been created.
		 */
		setElementTooltip: function (el, params, doneEL) {
			const d = eval('document');
			if (!doneEL) {d.addEventListener("mousemove", this.updatePos, false); doneEL = true;}
			if (params.tooltiptext !== undefined && params.tooltiptext !== "") {
				// If the tooltip does not exist, make a new one.
				let curToolTip = d.getElementById(`${el}-tooltip`)
				if (curToolTip === null) {
					//create and append the element.
					let tt = d.createElement("span");
					tt.id = `${el}-tooltip`
					tt.className = "tooltiptext"
					tt.innerHTML = params.tooltiptext
					d.body.appendChild(tt);
					// Apply all additional parameters that were specified. Add more checks here as needed
					if (params.textAlign !== undefined) d.getElementById(`${el}-tooltip`).style.textAlign = params.textAlign;
					// Add event listeners for mouseout/mouseover to hide/show the tooltip.
					d.getElementById(`${el}-tooltip`).style.visibility = "hidden";
					d.getElementById(`${el}-tooltip`).style.opacity = "0";
					d.getElementById(el).addEventListener('mouseover', (e) => {
						d.getElementById(`${el}-tooltip`).style.visibility = "visible";
						d.getElementById(`${el}-tooltip`).style.opacity = "1";
					});
					d.getElementById(el).addEventListener('mouseout', (e) => {
						d.getElementById(`${el}-tooltip`).style.visibility = "hidden";
						d.getElementById(`${el}-tooltip`).style.opacity = "0";
					});
				}
				// If the current tooltip exists but the text does not match what we want, replace it.
				else if (curToolTip.innerHTML !== params.tooltiptext) {
					curToolTip.innerHTML = params.tooltiptext
				}
			}
		}
	}
}

/**
 * Miscellaneous helper functions that didn't fit anywhere else.
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
		while (route[0] !== "home") {
			let temp = s.scan(route[0])
			route.unshift(temp[0])
		}
		return route;
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
	 * @param {boolean} sf5 set to true if you have SF5, false otherwise.
	 * @returns The EXP required to get to the specified level.
	 */
	getExpReq: function (s, sk, lvl, sf5) {
		const exp = s.getPlayer()['exp'][sk];
		let multi
		if (sf5) {
			switch (sk) {
				case 'hacking':   multi = s.getBitNodeMultipliers().HackingLevelMultiplier   * s.getPlayer()['mults'][sk]; break;
				case 'strength':  multi = s.getBitNodeMultipliers().StrengthLevelMultiplier  * s.getPlayer()['mults'][sk]; break;
				case 'defense':   multi = s.getBitNodeMultipliers().DefenseLevelMultiplier   * s.getPlayer()['mults'][sk]; break;
				case 'dexterity': multi = s.getBitNodeMultipliers().DexterityLevelMultiplier * s.getPlayer()['mults'][sk]; break;
				case 'agility':   multi = s.getBitNodeMultipliers().AgilityLevelMultiplier   * s.getPlayer()['mults'][sk]; break;
				case 'charisma':  multi = s.getBitNodeMultipliers().CharismaLevelMultiplier  * s.getPlayer()['mults'][sk]; break;
			}
		} else {
			multi = s.getPlayer()['mults'][sk];
		}
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
		return lvlExp - clvl;
	}
}
