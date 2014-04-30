var µ = {
	one: function(selector) {
		return document.querySelector(selector);
	},
	all: function(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	},
	create: function(tag) {
		return document.createElement(tag);
	}
};

Node.prototype.one = function(selector) {
	return this.querySelector(selector);
};

Node.prototype.all = function(selector) {
	return Array.prototype.slice.call(this.querySelectorAll(selector));
};

Node.prototype.each = function(func) {
	func.bind(this)();

	return this;
};

Node.prototype.on = function(evt, func) {
	this.addEventListener(evt, func.bind(this));

	return this;
};

Node.prototype.add = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] === "string") {
			this.appendChild(document.createTextNode(arguments[i]));
		} else {
			this.appendChild(arguments[i]);
		}
	}

	return this;
};

Node.prototype.css = function(rules) {
	for (var rule in rules) {
		this.style[rule] = rules[rule];
	}

	return this;
};

Node.prototype.attr = function(rules) {
	for (var rule in rules) {
		this[rule] = rules[rule];
	}

	return this;
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
	this.forEach(function(el) {
		func.bind(el)();
	});

	return this;
};

Array.prototype.add = function() {
	var args = arguments;

	return this.each(function() {
		for (var i = 0; i < args.length; i++) {
			if (typeof args[i] === "string") {
				this.appendChild(document.createTextNode(args[i]));
			} else {
				this.appendChild(args[i].cloneNode(true));
			}
		}
	});
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

(function() {
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

	for (var i = 0; i < simpleTags.length; i++) {
		tags[simpleTags[i]] = [];
	}

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
})();