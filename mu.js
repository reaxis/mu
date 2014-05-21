(function(definition) {
	// Turn off strict mode for this function so we can assign to global.µ
	/* jshint strict: false */

	// CommonJS
	if (typeof exports === "object") {
		module.exports = definition();

	// RequireJS
	} else if (typeof define === "function" && define.amd) {
		define(definition);

	// <script>
	} else {
		µ = definition();
	}
})(function() {
	"use strict";

	function µ() {};

	µ.one = function(selector) {
		return document.querySelector(selector);
	};

	µ.all = function(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	};

	µ.create = function(tag) {
		return document.createElement(tag);
	};

	function toCamelCase(s) {
		return s.replace(/-(.)/g, function(a, b) {return b.toUpperCase();});
	};

	Node.prototype.one = function(selector) {
		return this.querySelector(selector);
	};

	Node.prototype.all = function(selector) {
		return Array.prototype.slice.call(this.querySelectorAll(selector));
	};

	Node.prototype.each = function(func) {
		func.bind(this)(0);

		return this;
	};

	Node.prototype.µAddEventListener = Node.prototype.addEventListener;

	Node.prototype.addEventListener = function(evt, func) {
		this.µEventCache = this.µEventCache || [];

		this.µEventCache.push(arguments);

		this.µAddEventListener.apply(this, arguments);
	};

	Node.prototype.on = function(evt, func) {
		this.addEventListener(evt, func);

		return this;
	};

	Node.prototype.add = function() {
		for (var i = 0; i < arguments.length; i++) {
			if (Object.prototype.toString.call(arguments[i]) === "[object Array]") {
				this.add.apply(this, arguments[i]);
			} else {
				this.appendChild(typeof arguments[i] === "string" ? document.createTextNode(arguments[i]) : arguments[i]);
			}
		}

		return this;
	};

	Node.prototype.css = function(rules) {
		if (typeof rules === "string") {
			return this.style[rules.replace(/-(.)/g, function(a, b) {return b.toUpperCase();})];
		} else {
			for (var rule in rules) {
				this.style[rule.replace(/-(.)/g, function(a, b) {return b.toUpperCase();})] = rules[rule];
			}

			return this;
		}
	};

	Node.prototype.attr = function(rules) {
		for (var rule in rules) {
			this[rule] = rules[rule];
		}

		return this;
	};

	Node.prototype.copy = function() {
		var clone = this.cloneNode(false);

		if (this.µEventCache) {
			this.µEventCache.each(function() {
				clone.addEventListener.apply(clone, this);
			});
		}

		Array.prototype.slice.call(this.childNodes).each(function() {
			clone.appendChild(this.copy());
		});

		return clone;
	};

	Array.prototype.one = function(selector) {
		var list = [];

		this.forEach(function(el) {
			list.push(el.querySelector(selector));
		});

		return list;
	};

	Array.prototype.all = function(selector) {
		var list = [];

		this.forEach(function(el) {
			list = list.concat(Array.prototype.slice.call(el.querySelectorAll(selector)));
		});

		return list;
	};

	Array.prototype.each = function(func) {
		this.forEach(function(el, i) {
			func.bind(el)(i);
		});

		return this;
	};

	Array.prototype.add = function() {
		var args = arguments;

		return this.each(function() {
			for (var i = 0; i < args.length; i++) {
				if (Object.prototype.toString.call(args[i]) === "[object Array]") {
					this.add.apply(this, args[i].copy());
				} else {
					this.appendChild(typeof args[i] === "string" ? document.createTextNode(args[i]) : args[i].copy());
				}
			}
		});
	};

	Array.prototype.copy = function() {
		var clones = [];

		this.each(function() {
			clones.push(this.copy());
		});

		return clones;
	};

	["on", "css", "attr"].each(function() {
		var func = this + "";

		Array.prototype[func] = function() {
			var $args = arguments;

			return this.each(function() {
				this[func].apply(this, $args);
			});
		};
	});

	var tags = {
		img: ["src", "alt", "title"],
		a: ["href"],
		input: ["type", "value"],
		option: ["value"],
		abbr: ["title"],
		canvas: ["width", "height"]
	},

	simpleTags = "section nav article aside header footer address main div span p strong em h1 h2 h3 h4 h5 h6 li td".split(" "),

	nestedTags = {
		ul: "li",
		ol: "li",
		tr: "td",
		table: "tr"
	};

	simpleTags.each(function() {
		tags[this] = [];
	});

	for (var tag in tags) {
		µ[tag] = (function(t, attrs) {
			return function() {
				var attributes = {};

				for (var i = 0; i < arguments.length && i < attrs.length; i++) {
					attributes[attrs[i]] = arguments[i];
				}

				var el = µ.create(t).attr(attributes);

				return el.add.apply(el, Array.prototype.slice.call(arguments, i));
			};
		})(tag, tags[tag]);
	}

	for (var tag in nestedTags) {
		µ[tag] = (function(t, child) {
			return function() {
				var el = µ.create(t);

				for (var i = 0; i < arguments.length; i++) {
					el.add(µ[child].apply(null, Array.prototype.slice.call(arguments[i])));
				}

				return el;
			};
		})(tag, nestedTags[tag]);
	}

	return µ;
});