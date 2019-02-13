const LaguntzaileDadoak = function (options) {
	this._options = options || {};
	this.target = document.getElementById(this._options.target);
	this._dataSource = this._options.dataSource;
	this.render();
};

LaguntzaileDadoak.classNames = {
	DICE: "ld-dice",
	GUESSING: "ld-guessing",
	TERM: "ld-term",
	FIRST_ELEMENT: "ld-1st-element",
	SECOND_ELEMENT: "ld-2nd-element",
	THIRD_ELEMENT: "ld-3rd-element",
	ELEMENT: "ld-element",
	ACTIVE: "ld-active",
	TENSE: "ld-tense",
	MODE: "ld-mode",
	NOLA: "ld-nola",
	PAST: "ld-past"
};

(function () {

	LaguntzaileDadoak.prototype.render = function () {
		const self = this;
		if (self.target) {
			self.target.classList.add(LaguntzaileDadoak.classNames.DICE);
			self._termSection = document.createElement('section');
			self._termSection.classList.add(LaguntzaileDadoak.classNames.TERM);
			self.target.appendChild(self._termSection);
			self._1stElementSection = document.createElement('section');
			self._1stElementSection.classList.add(LaguntzaileDadoak.classNames.ELEMENT);
			self._1stElementSection.classList.add(LaguntzaileDadoak.classNames.FIRST_ELEMENT);
			self.target.appendChild(self._1stElementSection);
			self._2ndElementSection = document.createElement('section');
			self._2ndElementSection.classList.add(LaguntzaileDadoak.classNames.ELEMENT);
			self._2ndElementSection.classList.add(LaguntzaileDadoak.classNames.SECOND_ELEMENT);
			self.target.appendChild(self._2ndElementSection);
			self._3rdElementSection = document.createElement('section');
			self._3rdElementSection.classList.add(LaguntzaileDadoak.classNames.ELEMENT);
			self._3rdElementSection.classList.add(LaguntzaileDadoak.classNames.THIRD_ELEMENT);
			self.target.appendChild(self._3rdElementSection);
			self._modeSection = document.createElement('section');
			self._modeSection.classList.add(LaguntzaileDadoak.classNames.MODE);
			self.target.appendChild(self._modeSection);
			self._tenseSection = document.createElement('section');
			self._tenseSection.classList.add(LaguntzaileDadoak.classNames.TENSE);
			self._tenseSection.innerHTML = "(lehenaldia)";
			self.target.appendChild(self._tenseSection);
			
			self.target.addEventListener('click', function () {
				self.nextStep();
			});
		}
	};
	
	LaguntzaileDadoak.prototype.getTermSection = function () {
		return this._termSection;
	};
	
	LaguntzaileDadoak.prototype.get1stElementSection = function () {
		return this._1stElementSection;
	};
	
	LaguntzaileDadoak.prototype.get2ndElementSection = function () {
		return this._2ndElementSection;
	};
	
	LaguntzaileDadoak.prototype.get3rdElementSection = function () {
		return this._3rdElementSection;
	};
	
	LaguntzaileDadoak.prototype.getTenseSection = function () {
		return this._tenseSection;
	};
	
	LaguntzaileDadoak.prototype.getModeSection = function () {
		return this._modeSection;
	};
	
	LaguntzaileDadoak.prototype.updateTermSection = function (value) {
		this.getTermSection().innerHTML = value;
	};
	
	LaguntzaileDadoak.prototype.getNor = function (key) {
		switch (key) {
			case '1s':
				return 'ni';
			case '2s':
				return 'zu';
			case '3s':
				return 'hura';
			case '1p':
				return 'gu';
			case '2p':
				return 'zuek';
			case '3p':
				return 'haiek';
			default:
				return '';
		}
	};
	
	LaguntzaileDadoak.prototype.getNork = function (key) {
		switch (key) {
			case '1s':
				return 'nik';
			case '2s':
				return 'zuk';
			case '3s':
				return 'hark';
			case '1p':
				return 'guk';
			case '2p':
				return 'zuek';
			case '3p':
				return 'haiek';
			default:
				return '';
		}
	};
	
	LaguntzaileDadoak.prototype.getNori = function (key) {
		switch (key) {
			case '1s':
				return 'niri';
			case '2s':
				return 'zuri';
			case '3s':
				return 'hari';
			case '1p':
				return 'guri';
			case '2p':
				return 'zuei';
			case '3p':
				return 'haiei';
			default:
				return '';
		}
	};
	
	LaguntzaileDadoak.prototype.update1stElementSection = function (key) {
		const self = this;
		const section = self.get1stElementSection();
		section.classList.remove(LaguntzaileDadoak.classNames.ACTIVE);
		setTimeout(function () {
			self.updateSection(section, key, /./, LaguntzaileDadoak.classNames.ACTIVE);
		});
		self.updateSection(section, key, /^......l/, LaguntzaileDadoak.classNames.PAST);
		var text;
		if (/^....00/.test(key)) {
			text = self.getNor(/^(..)/.exec(key)[1]);
		}
		else {
			text = self.getNork(/^....(..)/.exec(key)[1]);
		}
		section.innerHTML = text;
	};
	
	LaguntzaileDadoak.prototype.update2ndElementSection = function (key) {
		const self = this;
		const section = self.get2ndElementSection();
		section.classList.remove(LaguntzaileDadoak.classNames.ACTIVE);
		setTimeout(function () {
			self.updateSection(section, key, /^..[^0][^0]|^....[^0][^0]/, LaguntzaileDadoak.classNames.ACTIVE);
		});
		self.updateSection(section, key, /^......l/, LaguntzaileDadoak.classNames.PAST);
		var text;
		if (/^..00/.test(key)) {
			text = self.getNor(/^(..)/.exec(key)[1]);
		}
		else {
			text = self.getNori(/^..(..)/.exec(key)[1]);
		}
		section.innerHTML = text;
	};
	
	LaguntzaileDadoak.prototype.update3rdElementSection = function (key) {
		const self = this;
		const section = self.get3rdElementSection();
		section.classList.remove(LaguntzaileDadoak.classNames.ACTIVE);
		setTimeout(function () {
			self.updateSection(section, key, /^[^0][^0][^0][^0][^0][^0]/, LaguntzaileDadoak.classNames.ACTIVE);
		});
		self.updateSection(section, key, /^......l/, LaguntzaileDadoak.classNames.PAST);
		section.innerHTML = self.getNor(/^(..)/.exec(key)[1]);
	};

	LaguntzaileDadoak.prototype.updateTenseSection = function (key) {
		const self = this;
		self.updateSection(self.getTenseSection(), key, /l$|l0$|l1$/, LaguntzaileDadoak.classNames.ACTIVE);
	};

	LaguntzaileDadoak.prototype.updateModeSection = function (key) {
		const self = this;
		const section = self.getModeSection();
		self.updateSection(section, key, /0$|1$/, LaguntzaileDadoak.classNames.ACTIVE);
		self.updateSection(section, key, /1$/, LaguntzaileDadoak.classNames.NOLA);
	};

	LaguntzaileDadoak.prototype.updateSection = function (section, key, regexp, className) {
		if (regexp.test(key)) {
			section.classList.add(className);
		}
		else {
			section.classList.remove(className);
		}
	};
	
	LaguntzaileDadoak.prototype.init = function () {
		const self = this;
		fetch(self._dataSource, { mode: 'same-origin' })
			.then(function(response) {
				return response.json();
			})
			.then(function(obj) {
				self.data = obj;
				self.remainingEntries = [];
				self.reviewedEntries = [];
				for (var key in obj) {
					const entry = {
						key: key,
						value: obj[key]
					};
					self.remainingEntries[self.remainingEntries.length] = entry;
				}
				self._ready = true;
				self.nextStep();
			});
	};

	LaguntzaileDadoak.prototype.nextStep = function () {
		const self = this;
		if (self._ready) {
			if (self._guessing) {
				self.resolve();
			}
			else {
				self.getEntry();
			}
		}
	};
	
	LaguntzaileDadoak.prototype.setGuessing = function (value) {
		var self = this;
		self._guessing = value;
		if (self._guessing) {
			self.target.classList.add(LaguntzaileDadoak.classNames.GUESSING);
		}
		else {
			self.target.classList.remove(LaguntzaileDadoak.classNames.GUESSING);
		}
	};
	
	LaguntzaileDadoak.prototype.getEntry = function (key) {
		const self = this;
		if (key) {
			const filterFunction = function (elm) {
				return (elm.key === key);
			}
			var entry = self.remainingEntries.filter(filterFunction)[0];
			if (!entry) {
				entry = self.reviewedEntries.filter(filterFunction)[0];
			}
			self.currentEntry = entry;
		}
		else {
			const idx = self.getRandomIndex(self.remainingEntries.length);
			self.currentEntry = self.remainingEntries[idx];
			self.remainingEntries.splice(idx, 1);
			self.reviewedEntries.push(self.currentEntry);
		}
		key = self.currentEntry.key;
		const term = self.currentEntry.value;
		self.updateTermSection(term);
		self.update1stElementSection(key);
		self.update2ndElementSection(key);
		self.update3rdElementSection(key);
		self.updateTenseSection(key);
		self.updateModeSection(key);
		self.setGuessing(true);
	};
	
	LaguntzaileDadoak.prototype.resolve = function () {
		const self = this;
		self.setGuessing(false);
		if (!self.remainingEntries.length) {
			self.reset();
		}
	};
	
	LaguntzaileDadoak.prototype.reset = function () {
		this.init();
	};
	
	LaguntzaileDadoak.prototype.getRandomIndex = function (length) {
		return Math.floor(Math.random() * length);
	};
})();