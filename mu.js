(function(definition) {
	/* jshint strict: false */

	if (typeof exports === "object") { // CommonJS
		module.exports = definition();
	} else if (typeof define === "function" && define.amd) { // RequireJS
		define(definition);
	} else { // <script>
		µ = definition();
		mu = definition();
	}
})(function() {
	"use strict";

	function µ() {};

/******************************************************************************/
// Helper functions

	function toCamelCase(s) {
		return s.replace(/-(.)/g, function(a, b) {return b.toUpperCase();});
	};

	function isArray(a) {
		return {}.toString.call(a) === "[object Array]";
	};

	function toArray(a) {
		return [].slice.call(a);
	};

/******************************************************************************/
// Main functions

	µ.one = function(selector) {
		return document.querySelector(selector);
	};

	µ.all = function(selector) {
		return toArray(document.querySelectorAll(selector));
	};

	µ.create = function(tag) {
		return document.createElement(tag);
	};

/******************************************************************************/
// Node prototype extensions

	var nodeFunctions = {
		one: function(selector) {
			return this.querySelector(selector);
		},

		all: function(selector) {
			return toArray(this.querySelectorAll(selector));
		},

		each: function(func) {
			func.bind(this)(0);

			return this;
		},

		µAddEventListener: Node.prototype.addEventListener,

		addEventListener: function() {
			this.µEventCache = this.µEventCache || [];

			this.µEventCache.push(arguments);

			this.µAddEventListener.apply(this, arguments);
		},

		on: function(evt, func) {
			this.addEventListener(evt, func);

			return this;
		},

		add: function() {
			return toArray(arguments).reduce(function(self, arg) {
				if (isArray(arg)) {
					self.add.apply(self, arg);
				} else {
					self.appendChild(!!arg.nodeType ? arg : document.createTextNode(arg));
				}

				return self;
			}, this);
		},

		css: function(rules) {
			if (typeof rules === "string") {
				return this.style[toCamelCase(rules)];
			}

			for (var rule in rules) {
				this.style[toCamelCase(rule)] = rules[rule];
			}

			return this;
		},

		attr: function(rules) {
			if (typeof rules === "string") {
				return this[rules];
			}

			for (var rule in rules) {
				this[rule] = rules[rule];
			}

			return this;
		},

		empty: function() {
			this.innerHTML = "";

			return this;
		},

		text: function(t) {
			return typeof t === "undefined" ? this.textContent : this.attr({textContent: t});
		},

		copy: function() {
			var clone = this.cloneNode(false);

			if (this.µEventCache) {
				this.µEventCache.each(function() {
					clone.addEventListener.apply(clone, this);
				});
			}

			return clone.add.apply(clone, toArray(this.childNodes));
		}
	};

	for (var func in nodeFunctions) {
		Node.prototype[func] = nodeFunctions[func];
	};

	Window.prototype.on = Node.prototype.on;

/******************************************************************************/
// Array prototype extensions

	var arrayFunctions = {
		each: function(func) {
			this.forEach(function(el, i) {
				func.bind(el)(i);
			});

			return this;
		},

		one: function(selector) {
			var list = [];

			this.each(function() {
				this.querySelector(selector) && list.push(this.querySelector(selector));
			});

			return list;
		},

		all: function(selector) {
			var list = [];

			this.each(function() {
				list = list.concat(toArray(this.querySelectorAll(selector)));
			});

			return list;
		},

		add: function() {
			var args = arguments;

			return this.each(function() {
				return toArray(args).reduce(function(self, arg) {
					if (isArray(arg)) {
						self.add.apply(self, arg.copy());
					} else {
						self.appendChild(!!arg.nodeType ? arg.copy() : document.createTextNode(arg));
					}

					return self;
				}, this);
			});
		}
	};

	for (var func in arrayFunctions) {
		Array.prototype[func] = arrayFunctions[func];
	}

	// copy Node functions to Array prototype
	"on css attr empty text copy".split(" ").each(function() {
		var func = this + "";

		Array.prototype[func] = function() {
			var args = arguments,
				arr = [];

			this.each(function() {
				arr.push(this[func].apply(this, args));
			});

			return arr;
		};
	});

/******************************************************************************/
// Creation shorthand

	// tags with attributes
	var tags = {
		img: ["src", "alt", "title"],
		a: ["href"],
		input: ["type", "name", "value"],
		option: ["value"],
		abbr: ["title"],
		canvas: ["width", "height"]
	},

	// tags with automatically nested elements
	nestedTags = {
		ul: "li",
		ol: "li",
		tr: "td",
		table: "tr"
	};

	// tags without nesting or attributes
	"section nav article aside header footer address main div span p strong em h1 h2 h3 h4 h5 h6 li td".split(" ").each(function() {
		tags[this] = [];
	});

	// add tags to µ as shorthand functions
	for (var tag in tags) {
		µ[tag] = (function(t, attrs) {
			return function() {
				var args = toArray(arguments);

				return µ.create(t).attr(attrs.reduce(function(a, b) {
					if (args.length) a[b] = args.shift();
					return a;
				}, {})).add(args);
			};
		})(tag, tags[tag]);
	}

	// add nested tags to µ as shorthand functions
	for (var tag in nestedTags) {
		µ[tag] = (function(t, child) {
			return function() {
				return µ.create(t).add(toArray(arguments).map(function(arg) {
					return µ[child].apply(null, isArray(arg) ? arg : [arg]);
				}));
			};
		})(tag, nestedTags[tag]);
	}

/******************************************************************************/

	return µ;
});