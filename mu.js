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

Node.prototype.add = function(obj) {
	this.appendChild(obj);

	return this;
};

Node.prototype.text = function(text) {
	this.appendChild(document.createTextNode(text));

	return this;
};

Node.prototype.css = function(rules) {
	console.log("css called", this, rules);

	for (var rule in rules) {
		this.style[rule] = rules[rule];
	}

	return this;
};

Node.prototype.attr = function(attr, value) {
	this[attr] = value;

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

Array.prototype.add = function(obj) {
	return this.each(function() {
		this.add(obj.cloneNode());
	});
};

["on", "text", "css", "attr"].each(function() {
	var func = this + "";

	Array.prototype[func] = function() {
		var $args = arguments;

		return this.each(function() {
			this[func].apply(this, $args);
		});
	}
});