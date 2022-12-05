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
	 * Hud HTML helpers, for custom HUDs with HTML instead of Unicode.
	 */
	htm: {
		/**
		 * Push the beginning of the HUD to the HUD array.
		 * @param {Array} hud The HUD array.
		 */
		startHud: function(hud) { hud.push(`<div id="customHud">`) },

		/**
		 * Push the end of the HUD to the HUD array.
		 * @param {Array} hud The HUD array.
		 */
		endHud: function(hud) { hud.push(`</div>`) },

		/**
		 * Push a subsection to the HUD array.
		 * @param {Array} hud the HUD array.
		 * @param {string} title the title of the subsection.
		 * @param {Array} content An array of subsection elements, constructed by `addContent`.
		 * @param {string} mVar The name of the subsection's visibility variable.
		 */
		addSection: function(hud, title, content, mVar) {
			hud.push(
				`<div class="hudSection">
					<div class="hudSectionTitle">
						<span style="text-align: center">${title}</span>
						<a id="${title}-min" style="cursor: pointer; transition: all .2s;" onclick="${mVar} = !${mVar};"></a>
					</div>
					<div class="hudSectionContent" id="${title}-content">${content.join('')}</div>
				</div>`)
		},

		/**
		 * Push some headers and values to a content array.
		 * @param {Array} arrContent The content array.
		 * @param {string} head The header text.
		 * @param {string} col The color of both the header and value.
		 * @param {string} valId
		 */
		addContent: function(arrContent, head, col, valId) {
			arrContent.push(`<span class="hudContent" style="color: ${col}">${head}</span><span id="${valId}" class="hudContent" style="color: ${col}"></span>`)
		}
	},

	/**
	 * Add a display of the bitverse. Meant to be called once during setup, and never again.
	 * @param {Element} hook0 the first ovv content hook.
	 * @param {Element} hook1 the second ovv content hook.
	 * @param {string} col The color of the text.
	 * @param {array} sfs The source files, from `ns.singularity.getOwnedSourceFiles`, or a recreation of the array.
	 */
	bitverse: function(hook0, hook1, col, sfs) {
		const verse = [
			"            ", "              O                          ",
			"            ", " |  O  O      |      O  O  |             ",
			"        O   ", " |  | /     __|       \\ |  |    O        ",
			"      O |   ", " O  | |  O /  |  O    | |  O    | O      ",
			"    | | |   ", " |  |_/  |/   |   \\_  \\_|  |    | | |    ",
			"  O | | | O ", " |  | O__/    |   / \\__ |  |  O | | | O  ",
			"  | | | | | ", " |  |   /    /|  O  /  \\|  |  | | | | |  ",
			"O | | |  \\| ", " |  O  /   _/ |    /    O  |  |/  | | | O",
			"| | | |O  / ", " |  | O   /   |   O   O |  |  \\  O| | | |",
			"| | |/  \\/  ", "/ __| | |/ \\  |   \\   | |__ \\  \\/  \\| | |",
			" \\| O   |  |", `_/    |\\|   \\ <span onclick="bna = 13;" class="bnSpan" id="bn13">O</span>    \\__|    \\_|  |   O |/ `,
			"  | |   |_/ ", "      | |    \\|    /  |       \\_|   | |  ",
			"   \\|   /   ", "       \\|     |   /  /          \\   |/   ",
			`    |  <span onclick="bna = 10;" class="bnSpan" id="bn10">O</span>    `, `        |     |  /  |            <span onclick="bna = 11;" class="bnSpan" id="bn11">O</span>  |    `,
			`  <span onclick="bna = 9;" class="bnSpan" id="bn9">O</span> |  |    `, `        |     |     |            |  | <span onclick="bna = 12;" class="bnSpan" id="bn12">O</span>  `,
			"  | |  |    ", "        /    / \\    \\            |  | |  ",
			"   \\|  |    ", `       /  <span onclick="bna = 7;" class="bnSpan" id="bn7">O</span> /   \\ <span onclick="bna = 8;" class="bnSpan" id="bn8">O</span>  \\           |  |/   `,
			"    \\  |    ", "      /  / |     | \\  \\          |  /    ",
			"     \\ \\JUMP", ` <span onclick="bna = 5;" class="bnSpan" id="bn5">O</span>3R |  |  |     |  |  | R3<span onclick="bna = 6;" class="bnSpan" id="bn6">O</span> PMUJ/ /     `,
			"      \\||   ", " |   |  |  |     |  |  |   |    ||/      ",
			"       \\|   ", "  \\_ |  |  |     |  |  | _/     |/       ",
			"        \\   ", "    \\| /    \\   /    \\ |/       /        ",
			`         <span onclick="bna = 1;" class="bnSpan" id="bn1">O</span>  `, `     |/   <span onclick="bna = 2;" class="bnSpan" id="bn2">O</span>  | |  <span onclick="bna = 3;" class="bnSpan" id="bn3">O</span>   \\|       <span onclick="bna = 4;" class="bnSpan" id="bn4">O</span>         `,
			"         |  ", "     |    |  | |  |    |       |         ",
			"          \\J", "UMP3R|JUMP|3R| |R3|PMUJ|R3PMUJ/          "
		];
		let ls = "";
		let rs = "";
		for (let i = 0; i < verse.length; i+=2) {
			ls += `<span class="ovvCont" style="cursor: default; white-space: break-spaces;color: ${col};"><span style="color: #FFFFFF;">│   </span>${verse[i]}</span><br>`;
			rs += `<span class="ovvCont" style="cursor: default; white-space: break-spaces;color: ${col};">${verse[i+1]}<span style="color: #FFFFFF;">   │</span></span><br>`;
		}
		//put the bitverse *inside* of elements
		const bvl = eval('document.createElement("div")');
		const bvr = eval('document.createElement("div")');
		bvl.innerHTML = ls;
		bvr.innerHTML = rs;
		bvl.id = "bitverseL";
		bvr.id = "bitverseR";
		bvl.className = "bitverse bitverseDSP";
		bvr.className = "bitverse bitverseDSP";
		//append the bitverse to the end of the hud.
		hook0.parentNode.insertBefore(bvl, hook0.nextSibling);
		hook1.parentNode.insertBefore(bvr, hook1.nextSibling);
		const end = eval('document.createElement("div")');
		const endr = eval('document.createElement("div")');
		end.innerHTML = `<span class="ovvCont" style="cursor: default; color: #FFFFFF;">╰───────────────</span>`;
		endr.innerHTML = `<span class="ovvCont" style="cursor: default; color: #FFFFFF;">────────────────────────────────────────────╯</span>`;
		end.className = "bitverse";
		endr.className = "bitverse";
		hook0.parentNode.insertBefore(end, hook0.nextSibling.nextSibling);
		hook1.parentNode.insertBefore(endr, hook1.nextSibling.nextSibling);

		//change the colors based on the owned source files
		for (let i = 0; i < sfs.length; i++) {
			const sf = sfs[i];
			const lv = eval(`document.getElementById('bn${sf.n}')`);
			switch (sf.lvl) {
				case 1:
					lv.className = "bnSpan1";
					break;
				case 2:
					lv.className = "bnSpan2";
					break;
				case 3:
					lv.className = "bnSpan3";
					break;
			}
		}
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
	},

	/**
	 * Returns neatly formatted BitNode Multipliers.
	 * @param {NS} s Netscript reference.
	 * @param {number} bn The BitNode number.
	 * @param {number} l The level of the BitNode. Only applicable to BitNode 12.
	 */
	bitNodeMultis: function (s, bn, l) {
		/*
		example obj
		AgilityLevelMultiplier: 0.4
		AugmentationMoneyCost: 5
		AugmentationRepCost: 2
		BladeburnerRank: 0.8
		BladeburnerSkillCost: 1
		CharismaLevelMultiplier: 0.4
		ClassGymExpGain: 1
		CodingContractMoney: 0.5
		CompanyWorkExpGain: 1
		CompanyWorkMoney: 0.5
		CorporationSoftcap: 0.9
		CorporationValuation: 0.5
		CrimeExpGain: 1
		CrimeMoney: 0.5
		DaedalusAugsRequirement: 30
		DefenseLevelMultiplier: 0.4
		DexterityLevelMultiplier: 0.4
		FactionPassiveRepGain: 1
		FactionWorkExpGain: 1
		FactionWorkRepGain: 1
		FourSigmaMarketDataApiCost: 1
		FourSigmaMarketDataCost: 1
		GangSoftcap: 0.9
		GangUniqueAugs: 0.25
		HackExpGain: 1
		HackingLevelMultiplier: 0.35
		HacknetNodeMoney: 0.5
		HomeComputerRamCost: 1.5
		InfiltrationMoney: 0.5
		InfiltrationRep: 1
		ManualHackMoney: 0.5
		PurchasedServerCost: 5
		PurchasedServerLimit: 0.6
		PurchasedServerMaxRam: 0.5
		PurchasedServerSoftcap: 1.1
		RepToDonateToFaction: 1
		ScriptHackMoney: 0.5
		ScriptHackMoneyGain: 1
		ServerGrowthRate: 1
		ServerMaxMoney: 1
		ServerStartingMoney: 1
		ServerStartingSecurity: 1
		ServerWeakenRate: 1
		StaneksGiftExtraSize: -3
		StaneksGiftPowerMultiplier: 0.75
		StrengthLevelMultiplier: 0.4
		WorldDaemonDifficulty: 2
		*/
		let m;
		if (bn !== undefined) {
			if (bn === 12) {
				if (l === undefined) {l = 1}
				m = s.getBitNodeMultipliers(bn, l)
			} else {
				m = s.getBitNodeMultipliers(bn)
			}
		} else {
			bn = s.getPlayer().bitNodeN;
			m = s.getBitNodeMultipliers()
		}
		`<h2><b>BitNode-${bn} Multipliers:</b></h2><h4>Experience & Skills:</h4><br>Hacking: Level: ${s.nFormat(m.HackingLevelMultiplier * 100, '0%')} Experience: ${m.HackExpGain}`
	}
}

export const ntfyHelper = {
	/**
	 * Creates an object for an NTFY notification
	 * @param {string} title The title of the notification.
	 * @param {string} body The body of the notification.
	 * @param {string} tags The tags (emoji) of the notification.
	 * @param {string} priority Optional. The priority of the notification.
	 * @returns {object} The NTFY notification object.
	 */
	createNtfyObject: function(title, body, tags, priority) {
		return {
			method: 'POST',
			body: body,
			headers: {
				'Title': title,
				'Priority': priority,
				'Tags': tags,
			}
		}
	},

	/**
	 * Sends an NTFY notification.
	 * @param {string} u The name of the NTFY 'server'.
	 * @param {Object} n The NTFY notification object.
	 */
	sendNtfyNotification: function(u, n) {
		fetch(`https://ntfy.sh/${u}`, n)
	}
}

// noinspection LoopStatementThatDoesntLoopJS
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
		for (i; i < sleeves; i++) {
			switch (t) {
				case "recovery":
					s.sleeve.setToShockRecovery(i)
					break;
				case "sync":
					eval("s.sleeve.setToSynchronize(i)");
					break;
				case "crime":
					if (o1 !== undefined) {
						eval("s.sleeve.setToCommitCrime(i, o1)");
					} else { s.print("ERROR: no crime provided") }
					break;
				case "wFaction":
					if (o1 !== undefined) {
						if (o2 !== undefined) {
							eval("s.sleeve.setToFactionWork(i, o1, o2)");
						} else { s.print("ERROR: no work type provided") }
					} else { s.print("ERROR: no faction provided") }
					break;
				case "wCompany":
					if (o1 !== undefined) {
						eval("s.sleeve.setToCompanyWork(i, o1)");
					} else { s.print("ERROR: no company defined") }
					break;
				case "gym":
					if (o1 !== undefined) {
						if (o2 !== undefined) {
							eval("s.sleeve.setToGymWorkout(i, o1, o2)");
						} else { s.print("ERROR: no gym provided") }
					} else { s.print("ERROR: no stat provided") }
					break;
				case "uni":
					if (o1 !== undefined) {
						if (o2 !== undefined) {
							eval("s.sleeve.setToUniversityCourse(i, o1, o2)");
						} else { s.print("ERROR: no university provided") }
					} else { s.print("ERROR: no course provided") }
					break;
				case "blade":
					if (o1 !== undefined) {
						if (o2 !== undefined) {
							eval("s.sleeve.setToBladeburnerAction(i, o1, o2)");
						} else { s.print("ERROR: no category provided") }
					} else { s.print("ERROR: no contract provided") }
					break;
				case undefined:
					s.print("you, didn't define a work type. what are you even doing?");
					s.tprint("you, didn't define a work type. what are you even doing?");
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
		// noinspection LoopStatementThatDoesntLoopJS
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
		// noinspection SpellCheckingInspection
		const names = ["Boe Jiden","Beff Jesos","Darcetine","Gill Bates","Zarco","Lilly","Doc. Brown","Marty McFly","Roxy","Natalie","Rem","Tai","Luther","Sean","Celso","Paul","Kit","Anna","Todd","Chozo","Kai","Tucker","John Doe","undefined","Nezomi","Avery","Phillip","Amtrak","Avelican","You","Hydroflame","xsinx","Zoe","Zelow","nightElf","Jeoshua","Lyra","Dashi","ElJay","Quacksouls","_NAME_PLACEHOLDER_","Neo","Trinity","Morpheus","Agent Smith","Keanu Reeves","John Matrix","Mughur","Khan","James T. Kirk","Spock","Leonard McCoy","Jean-Luc Picard","William Riker","Data","Kathryn Janeway","Chakotay","Tom Paris","Harry Kim","Neelix","The Borg Queen","Seven of Nine","Q","Mariah Carey","Rafi","Rios","Grant","Alex","Robert","Ace"]
		//remove names already in use
		for (let i = 0; i < members; i++) {
			for (let j = 0; j < names.length; j++) {
				if (names[j] === members[i]) {
					names.splice(j, 1);
				}
			}
		}
		return names[Math.floor(Math.random() * names.length)];
	},

	/**
	 * Get the current equipment price multiplier.
	 * @param {number} pwr the gang's power
	 * @param {number} rep the gang's reputation
	 * @returns {number} The discount percentage
	 */
	getUpgradeDiscount: function (pwr, rep) {
		const rlf = 5e6;
		const plf = 1e6;
		const d = Math.pow(rep, 0.01) + rep / rlf + Math.pow(pwr, 0.01) + pwr / plf - 1;
		return 1 / Math.max(1, d);
	}
	/*
	this = gang object
	getDiscount(): number {
		const power = this.getPower();
		const respect = this.respect;

		const respectLinearFac = 5e6;
		const powerLinearFac = 1e6;
		const discount =
			Math.pow(respect, 0.01) + respect / respectLinearFac + Math.pow(power, 0.01) + power / powerLinearFac - 1;
		return Math.max(1, discount);
	}
	*/
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

/**
 * Helpers for the Hash/Hacknet API.
 */
export const hashnetHelper = {

	/**
	 * Check if you have the hashes to purchase `num` of `upgrade`.
	 * @param {ns} s Netscript object.
	 * @param {string} upgrade The name of the upgrade. What's shown in-game.
	 * @returns The number of `upgrade` you can buy with your current hashes.
	 */
	canGet: function (s, upgrade) {
		let hashes = s.hacknet.numHashes();
		const dCost = s.hacknet.hashCost(upgrade, 1);
		const inc = this.getPriceIncrease(upgrade);
		for (let i = 0; hashes > 0; i++) {
			//the cost will be the cost of what it is right now, and the cost of the increase
			//multiplied by the current iteration of purchasing.
			hashes -= dCost + (inc * i);
			if (hashes < 0) {
				return i;
			}
		}
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
