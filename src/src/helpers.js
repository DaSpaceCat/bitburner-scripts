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
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar};">▶</a> ─`;
		} else {
			dv += ` <a class="ovvMin" id="${id}" style="cursor: pointer; transition: all .2s;" onclick="${cVar} = !${cVar};">▼</a> ─`;
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
	bitverse: function(hook0, hook1, col, sfs, ns) {
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
		end.innerHTML = `<span class="ovvCont" style="font-family: 'Fira Code'; cursor: default; color: #FFFFFF;">╰───────────────</span>`;
		endr.innerHTML = `<span class="ovvCont" style="font-family: 'Fira Code'; cursor: default; color: #FFFFFF;">────────────────────────────────────────────╯</span>`;
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
			lv.addEventListener('click', function() {
				alert(hudHelper.getBNDesc(i))
			});
		}
	},

	getBNDesc: function (bna) {
		switch (bna) {
			case 1:  return (`The first BitNode created by the Enders to imprison the minds of humans. It became the prototype and testing-grounds for all of the BitNodes that followed.<br><br>This is the first BitNode that you play through. It has no special modifications or mechanics.<br><br>Destroying this BitNode will give you Source-File 1, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File lets the player start with 32GB of RAM on his/her home computer when entering a new BitNode, and also increases all of the player's multipliers by:<br><br>16% / 24% / 28%`); break;
			case 2:  return (`From the shadows, they rose.<br><br>Organized crime groups quickly filled the void of power left behind from the collapse of Western government in the 2050s. As society and civilization broke down, people quickly succumbed to the innate human impulse of evil and savagery. The organized crime factions quickly rose to the top of the modern world.<br><br>Certain Factions (Slum Snakes, Tetrads, The Syndicate, The Dark Army, Speakers For The Dead, NiteSec, The Black Hand) give the player the ability to form and manage their own gangs. These gangs will earn the player money and reputation with the corresponding Faction.<br>Every Augmentation in the game will be available through the Factions listed above.<br><br>Destroying this BitNode will give you Source-File 2, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File allows you to form gangs in other BitNodes once your karma decreases to a certain value. It also increases the player's crime success rate, crime money, and charisma multipliers by:<br><br>24% / 36% / 42%`); break;
			case 3:  return (`Our greatest illusion is that a healthy society can revolve around a single-minded pursuit of wealth.<br><br>Sometime in the early 21st century economic and political globalization turned the world into a corporatocracy, and it never looked back. Now, the privileged elite will happily bankrupt their own countrymen, decimate their own community, and evict their neighbors from houses in their desperate bid to increase their wealth.<br><br>In this BitNode you can create and manage your own corporation. Running a successful corporation has the potential of generating massive profits.<br><br>Destroying this BitNode will give you Source-File 3, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File lets you create corporations on other BitNodes (although some BitNodes will disable this mechanic) and level 3 permanently unlocks the full API. This Source-File also increases your charisma and company salary multipliers by:<br>8% / 12% / 14%`); break;
			case 4:  return (`The Singularity has arrived. The human race is gone, replaced by artificially superintelligent beings that are more machine than man.<br><br><br>In this BitNode you will gain access to a new set of Netscript Functions known as Singularity Functions. These functions allow you to control most aspects of the game through scripts, including working for factions/companies, purchasing/installing Augmentations, and creating programs.<br><br>Destroying this BitNode will give you Source-File 4, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File lets you access and use the Singularity Functions in other BitNodes. Each level of this Source-File reduces the RAM cost of singularity functions:<br>16x / 4x / 1x`); break;
			case 5:  return (`They said it couldn't be done. They said the human brain, along with its consciousness and intelligence, couldn't be replicated. They said the complexity of the brain results from unpredictable, nonlinear interactions that couldn't be modeled by 1's and 0's. They were wrong.<br><br>Destroying this BitNode will give you Source-File 5, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File grants you a special new stat called Intelligence. Intelligence is unique because it is permanent and persistent (it never gets reset back to 1). However, gaining Intelligence experience is much slower than other stats. Higher Intelligence levels will boost your production for many actions in the game. <br><br>In addition, this Source-File will unlock the getBitNodeMultipliers() Netscript function and let you start with Formulas.exe, and will also raise all of your hacking-related multipliers by:<br>8% / 12% / 14%`); break;
			case 6:  return (`In the middle of the 21st century, OmniTek Incorporated began designing and manufacturing advanced synthetic androids, or Synthoids for short. They achieved a major technological breakthrough in the sixth generation of their Synthoid design, called MK-VI, by developing a hyperintelligent AI. Many argue that this was the first sentient AI ever created. This resulted in Synthoid models that were stronger, faster, and more intelligent than the humans that had created them.<br><br>In this BitNode, you will be able to access the Bladeburners Division at the NSA, which provides a new mechanic for progression.<br><br>Destroying this BitNode will give you Source-File 6, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File allows you to access the NSA's Bladeburners Division in other BitNodes. In addition, this Source-File will raise both the level and experience gain rate of all your combat stats by:<br><br>8% / 12% / 14%`); break;
			case 7:  return (`In the middle of the 21st century, you were doing cutting-edge work at OmniTek Incorporated as part of the AI design team for advanced synthetic androids, or Synthoids for short. You helped achieve a major technological breakthrough in the sixth generation of the company's Synthoid design, called MK-VI, by developing a hyperintelligent AI. Many argue that this was the first sentient AI ever created. This resulted in Synthoid models that were stronger, faster, and more intelligent than the humans that had created them.<br><br>In this BitNode you will be able to access the Bladeburners API, which allows you to access Bladeburners functionality through Netscript.<br><br>Destroying this BitNode will give you Source-File 7, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File allows you to access the Bladeburners Netscript API in other BitNodes. In addition, this Source-File will increase all of your Bladeburners multipliers by:<br>8% / 12% / 14%`); break;
			case 8:  return (`You are trying to make a name for yourself as an up-and-coming hedge fund manager on Wall Street.<br><br>In this BitNode:<br>You start with $250 million<br>You start with a WSE membership and access to the TIX API<br>You are able to short stocks and place different types of orders (limit/stop)<br><br>Destroying this BitNode will give you Source-File 8, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File grants the following benefits:<br><br>Level 1: Permanent access to WSE and TIX API<br>Level 2: Ability to short stocks in other BitNodes<br>Level 3: Ability to use limit/stop orders in other BitNodes<br><br>This Source-File also increases your hacking growth multipliers by:<br>12% / 18% / 21%`); break;
			case 9:  return (`When Fulcrum Secret Technologies released their open-source Linux distro Chapeau, it quickly became the OS of choice for the underground hacking community. Chapeau became especially notorious for powering the Hacknet, a global, decentralized network used for nefarious purposes. Fulcrum Secret Technologies quickly abandoned the project and dissociated themselves from it.<br><br>This BitNode unlocks the Hacknet Server, an upgraded version of the Hacknet Node. Hacknet Servers generate hashes, which can be spent on a variety of different upgrades.<br><br>Destroying this BitNode will give you Source-File 9, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File grants the following benefits:<br><br>Level 1: Permanently unlocks the Hacknet Server in other BitNodes<br>Level 2: You start with 128GB of RAM on your home computer when entering a new BitNode<br>Level 3: Grants a highly-upgraded Hacknet Server when entering a new BitNode.<br>(Note that the Level 3 effect of this Source-File only applies when entering a new BitNode, NOT when installing Augmentations)<br><br>This Source-File also increases your hacknet multipliers by:<br>8% / 12% / 14%`); break;
			case 10: return (`In 2084, VitaLife unveiled to the world the Persona Core, a technology that allowed people to digitize their consciousness. Their consciousness could then be transferred into Synthoids or other bodies by transmitting the digitized data. Human bodies became nothing more than 'sleeves' for the human consciousness. Mankind had finally achieved immortality - at least for those that could afford it.<br><br>This BitNode unlocks Sleeve and grafting technologies. Sleeve technology allows you to:<br><br>1. Grafting: Visit VitaLife in New Tokyo to be able to obtain Augmentations without needing to install<br>2. Duplicate Sleeves: Duplicate your consciousness into Synthoids, allowing you to perform different tasks synchronously.<br><br>Grafting technology allows you to graft Augmentations, which is an alternative way of installing Augmentations.<br><br>Destroying this BitNode will give you Source-File 10, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File unlocks Sleeve technology, and the Grafting API in other BitNodes. Each level of this Source-File also grants you a Duplicate Sleeve.`); break;
			case 11: return (`The 2050s was defined by the massive amounts of violent civil unrest and anarchic rebellion that rose all around the world. It was this period of disorder that eventually lead to the governmental reformation of many global superpowers, most notably the USA and China. But just as the world was slowly beginning to recover from these dark times, financial catastrophe hit.<br><br>In many countries, the high cost of trying to deal with the civil disorder bankrupted the governments. In all of this chaos and confusion, hackers were able to steal billions of dollars from the world's largest electronic banks, prompting an international banking crisis as governments were unable to bail out insolvent banks. Now, the world is slowly crumbling in the middle of the biggest economic crisis of all time.<br><br>Destroying this BitNode will give you Source-File 11, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File makes it so that company favor increases BOTH the player's salary and reputation gain rate at that company by 1% per favor (rather than just the reputation gain). This Source-File also increases the player's company salary and reputation gain multipliers by:<br>32% / 48% / 56%<br><br>It also reduces the price increase for every aug bought by:<br>4% / 6% / 7%`); break;
			case 12: return (`To iterate is human, to recurse divine.<br><br>Every time this BitNode is destroyed, it becomes slightly harder. Destroying this BitNode will give you Source-File 12, or if you already have this Source-File it will upgrade its level. There is no maximum level for Source-File 12. Each level of Source-File 12 lets you start any BitNodes with NeuroFlux Governor equal to the level of this source file.`); break;
			case 13: return (`With the invention of Augmentations in the 2040s a religious group known as the Church Of the Machine God has rallied far more support than anyone would have hoped.<br><br>Their leader, Allison "Mother" Stanek is said to have created her own Augmentation whose power goes beyond any other. Find her in Chongqing and gain her trust.<br><br>Destroying this BitNode will give you Source-File 13, or if you already have this Source-File it will upgrade its level up to a maximum of 3. This Source-File lets the Church Of the Machine God appear in other BitNodes.<br><br>Each level of this Source-File increases the size of Stanek's Gift.`); break;
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
		const disc = Math.pow(rep, 0.01) + rep / rlf + Math.pow(pwr, 0.01) + pwr / plf - 1;
		return 1 / Math.max(1, disc);
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
