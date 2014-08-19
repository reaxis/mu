describe("module", function() {
	it("should work properly with CommonJS");

	it("should work properly with RequireJS");

	it("should create a global with <script>");
});

describe("µ", function() {
	describe(".one", function() {
		it("always returns only 1 element", function() {
			expect(µ.one("div").toString()).toBe("[object HTMLDivElement]");
		});

		it("returns null when element is not found", function() {
			expect(µ.one("address")).toBeNull();
		});

		it("returns something falsy when element is not found", function() {
			expect(µ.one("address")).toBeFalsy();
		});

		it("gives an error when called with Number", function() {
			try {µ.one(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {µ.one(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {µ.one(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {µ.one([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".all", function() {
		it("always returns an Array", function() {
			expect(Object.prototype.toString.call(µ.all("div"))).toBe("[object Array]");
		});

		it("can return an emtpy Array", function() {
			expect(µ.all("address").length).toBe(0);
		});

		it("gives an error when called with Number", function() {
			try {µ.all(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {µ.all(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {µ.all(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {µ.all([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".create", function() {
		it("called with 'div' generates a div", function() {
			expect(µ.create("div")).toEqual(document.createElement("div"));
		});

		it("called with 'div' generates a HTMLDivElement", function() {
			expect(µ.create("div").toString()).toEqual("[object HTMLDivElement]");
		});

		it("called with 'div' generates correct HTML", function() {
			expect(µ.create("div").outerHTML).toEqual("<div></div>");
		});

		it("called with 'p' generates a HTMLParagraphElement", function() {
			expect(µ.create("p").toString()).toEqual("[object HTMLParagraphElement]");
		});

		it("called with 'p' generates a HTMLpElement", function() {
			expect(µ.create("p").outerHTML).toEqual("<p></p>");
		});
	});
});

/******************************************************************************/

describe("shorthand creation functions", function() {
	describe(".a", function() {
		it("should generate proper anchor", function() {
			expect(µ.a("http://awsm.nl", "My cool site").outerHTML).toBe('<a href="http://awsm.nl">My cool site</a>');
		});
	});

	describe(".img", function() {
		it("should generate proper image", function() {
			expect(µ.img("logo.png", "Logo", "Logo").outerHTML).toBe('<img title="Logo" alt="Logo" src="logo.png">');
		});

		it("should work with too many arguments", function() {
			expect(µ.img("logo.png", "Logo", "Logo", "a", "b").outerHTML).toBe('<img title="Logo" alt="Logo" src="logo.png">');
		});

		it("should work with fewer arguments", function() {
			expect(µ.img("logo.png", "Logo").outerHTML).toBe('<img alt="Logo" src="logo.png">');
			expect(µ.img("logo.png").outerHTML).toBe('<img src="logo.png">');
		});
	});

	describe(".input", function() {
		it("should generate proper input", function() {
			expect(µ.input("text", "in").outerHTML).toBe('<input name="in" type="text">');
		});
	});

	describe(".table", function() {
		it("should generate proper table", function() {
			expect(µ.table([1, 2], [3, 4]).outerHTML).toBe("<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>");
		});
	});

	describe(".ul", function() {
		it("should generate proper unordered list", function() {
			expect(µ.ul(1, 2).outerHTML).toBe("<ul><li>1</li><li>2</li></ul>");
		});
	});

	describe(".abbr", function() {
		it("should generate proper abbreviation", function() {
			expect(µ.abbr("HyperText Markup Language", "HTML").outerHTML).toBe('<abbr title="HyperText Markup Language">HTML</abbr>');
		});

		it("should work with more arguments", function() {
			expect(µ.abbr("HyperText Markup Language", "HTML", "a").outerHTML).toBe('<abbr title="HyperText Markup Language">HTMLa</abbr>');
		});
	});

	describe("combined", function() {
		it("should generate proper output for nested calls", function() {
			expect(µ.section(µ.div(µ.h1("Title"), µ.p(µ.em("Emphasis")))).outerHTML).toBe("<section><div><h1>Title</h1><p><em>Emphasis</em></p></div></section>");
		});
	})
});

/******************************************************************************/

describe("Node", function() {
	describe(".one", function() {
		it("always returns only 1 element", function() {
			expect(µ.one("div").one("div").toString()).toBe("[object HTMLDivElement]");
		});

		it("returns null when element is not found", function() {
			expect(µ.one("div").one("address")).toBeNull();
		});

		it("returns something falsy when element is not found", function() {
			expect(µ.one("div").one("address")).toBeFalsy();
		});

		it("also works with newly generated elements", function() {
			var div = µ.div(µ.span("wut"));
			expect(div.one("span")).toBeDefined();
			expect(div.one("span").text()).toBe("wut");
		});

		it("gives an error when called with Number", function() {
			try {µ.one("div").one(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {µ.one("div").one(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {µ.one("div").one(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {µ.one("div").one([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".all", function() {
		it("always returns an Array", function() {
			expect(Object.prototype.toString.call(µ.one("div").all("div"))).toBe("[object Array]");
		});

		it("can return an emtpy Array", function() {
			expect(µ.one("div").all("address").length).toBe(0);
		});

		it("also works with newly generated elements", function() {
			var div = µ.div(µ.span("wut"), µ.span("hoi"));
			expect(div.all("span")).toBeDefined();
			expect(div.all("span").length).toBe(2);
			expect(div.all("span")[0].text()).toBe("wut");
		});

		it("gives an error when called with Number", function() {
			try {µ.one("div").all(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {µ.one("div").all(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {µ.one("div").all(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {µ.one("div").all([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".each", function() {
		it("applies a function to the Node", function() {
			var count = 0;

			µ.div().each(function() {
				count++;
			});

			expect(count).toBe(1);
		});

		it("'this' should refer to the Node", function() {
			var div = µ.div();

			div.each(function() {
				expect(this).toBe(div);
			});
		});
	});

	describe(".on", function() {
		it("adds an event as eventListener and to µEventCache", function() {
			var handler = function() {},
				div = µ.div().on("click", handler);

			expect(div.µEventCache[0][0]).toBe("click");
			expect(div.µEventCache[0][1]).toEqual(handler);
		});
	});

	describe(".add", function() {
		it("works like appendChild", function() {
			var div = document.createElement("div");
			div.appendChild(document.createElement("span"));

			expect(µ.div().add(µ.span())).toEqual(div);
		});

		it("generates correct HTML", function() {
			expect(µ.div().add(µ.span()).outerHTML).toEqual("<div><span></span></div>");
		});

		it("adds Strings as TextNodes and Nodes as Nodes", function() {
			expect(µ.div().add("hoi", µ.span(), "doei").outerHTML).toEqual("<div>hoi<span></span>doei</div>");
		});
	});

	describe(".css", function() {
		var div = µ.div();

		it("correctly sets CSS properties using camelCase syntax", function() {
			expect(div.css({backgroundColor: "red"}).style.backgroundColor).toBe("red");
		});

		it("correctly sets CSS properties using CSS syntax", function() {
			expect(div.css({"background-color": "green"}).style.backgroundColor).toBe("green");
		});

		it("returns a value when called with a string using camelCase syntax", function() {
			expect(div.css("backgroundColor")).toBe("green");
		});

		it("returns a value when called with a string using CSS syntax", function() {
			expect(div.css("background-color")).toBe("green");
		});

		it("also works on undefined properties", function() {
			expect(div.css({"undefined-property": "red"}).css("undefined-property")).toBe("red");
		});

		it("toCamelCase is not exposed", function() {
			expect(typeof toCamelCase).toBe("undefined");
		});
	});

	describe(".attr", function() {
		it("sets attributes for the Node", function() {
			expect(µ.div().attr({title: "test"}).title).toBe("test");
		});
	});

	describe(".empty", function() {
		it("empties Node", function() {
			expect(µ.div("hoi").empty().innerHTML).toBe("");
		});
	});

	describe(".text", function() {
		it("sets textContent for Node when called with string");

		it("returns textContent for Node when called with nothing");
	});

	describe(".copy", function() {
		it("copies a Node", function() {
			expect(µ.div().copy()).toEqual(µ.div());
		});

		it("copies a Node with children", function() {
			expect(µ.div(µ.span()).copy()).toEqual(µ.div(µ.span()));
		});

		it("copies a Node with events", function() {
			var handler = function() {},
				div = µ.div().on("click", handler);

			expect(div.copy().µEventCache[0][0]).toBe("click");
			expect(div.copy().µEventCache[0][1]).toEqual(handler);
		});

		it("copies a Node with children with events", function() {
			var handler = function() {},
				div = µ.div(µ.span().on("click", handler)),
				clone = div.copy();

			expect(clone.µEventCache).toBeUndefined();

			expect(clone.one("span").µEventCache[0][0]).toBe("click");
			expect(clone.one("span").µEventCache[0][1]).toEqual(handler);
		});
	});
});

/******************************************************************************/

describe("Array", function() {
	describe(".one", function() {
		var container = [µ.div(µ.span(), µ.span()), µ.div(µ.span(), µ.span())];

		it("always returns an Array", function() {
			expect(Object.prototype.toString.call(container.one("span"))).toBe("[object Array]");
			expect(Object.prototype.toString.call(container.one("address"))).toBe("[object Array]");
		});

		it("returns empty Array when elements are not found", function() {
			expect(container.one("address").length).toBe(0);
		});

		it("gives an error when called with Number", function() {
			try {container.one(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {container.one(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {container.one(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {container.one([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".all", function() {
		var container = [µ.div(µ.span(), µ.span()), µ.div(µ.span(), µ.span())];

		it("always returns an Array", function() {
			expect(Object.prototype.toString.call(container.all("div"))).toBe("[object Array]");
		});

		it("can return an emtpy Array", function() {
			expect(container.all("address").length).toBe(0);
		});

		it("gives an error when called with Number", function() {
			try {container.all(2);} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with element", function() {
			try {container.all(µ.div());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Date", function() {
			try {container.all(new Date());} catch(e) {expect("error").toBe("error");}
		});

		it("gives an error when called with Array", function() {
			try {container.all([]);} catch(e) {expect("error").toBe("error");}
		});
	});

	describe(".each", function() {
		var container = [µ.div(µ.span(), µ.span()), µ.div(µ.span(), µ.span())];

		it("applies a function to all elements in Array", function() {
			var count = 0;

			container.each(function() {
				count++;
			});

			expect(count).toBe(2);
		});

		it("'this' should refer to the Node", function() {
			container.each(function(i) {
				expect(this).toBe(container[i]);
			});
		});
	});

	describe(".on", function() {});

	describe(".add", function() {
		it("generates correct HTML", function() {
			var ps = µ.div(µ.p("a"), µ.p("b"));
			ps.all("p").add(µ.span());

			expect(ps.outerHTML).toEqual("<div><p>a<span></span></p><p>b<span></span></p></div>");
		});
	});

	describe(".css", function() {});

	describe(".attr", function() {});

	describe(".empty", function() {});

	describe(".text", function() {});

	describe(".copy", function() {});
});