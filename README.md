# µ

#### JS DOM micro library

Are you also tired and fed up with the bulkiness of jQuery, but also don't want to have to type

    document.querySelector("div").appendChild(document.createTextNode("hello"));

just to add some text to an element?

Look no further!

µ is a tiny (1.02KB gzipped) DOM library for JavaScript, based on prototypal extension of Node and Array (yes, it may be ugly, but it works mighty fine), chainability, and not caring about Internet Explorer.

The above example written with µ:

    µ.one("div").add("hello");

## Examples

This code adds a green-colored paragraph with the word 'hello' to all divs:

    µ.all("div").add(µ.p("hello").css({color: "green"}));

The next code says 'hi' on clicking the first button in your document:

    µ.one("button").on("click", function() {alert("hi");});

Because it is all based on prototypes, you can just go back to using the bulky DOM syntax if that pleases you:

    µ.div().appendChild(document.createElement("p"));

Or you can go crazy!

    µ.all("div")
     .on("click", function() {
        alert("hi!");
     })
     .css({
        color: "green",
        background: "yellow"
     })
     .attr({
        "title": "mydiv"
     })
     .add(
        µ.p("what's up?")
         .on("click", function(event) {
            event.preventDefault();
            alert("not much");
         })
     )
     .one("p")
     .css({
        color: "blue"
     });

## Syntax

### Using µ

- **µ.one(selector)** returns the first element in document found by `selector`.
- **µ.all(selector)** returns all elements in document found by `selector`.
- **µ.create(tag)** returns a new element.

### µ creation shorthand

You can create elements using the following shorthand functions. All arguments are optional, and adding more arguments basically works like `.add()` (see below).

- **µ.a(href)** creates an anchor.
- **µ.img(src, alt, title)** creates an image.
- **µ.input(type, value)** you guessed it.
- **µ.option(value)** yes.
- **µ.abbr(title)** also.
- **µ.canvas(width, height)** and a canvas.

And some special, nested tags:

- **µ.ul(liText, liText, liText)** creates a list.
- **µ.ol(liText, liText, liText)** creates a numbered list.
- **µ.tr(tdText, tdText)** creates a table row.
- **µ.table([tdText, tdText], [tdText, tdText])** creates a table.

There are also shorthands for the following tags, without specific attributes: **section, nav, article, aside, header, footer, address, main, div, span, p, strong, em, h1, h2, h3, h4, h5, h6, li, td**

### Using chaining

When using a callback function, like in `.each()` and `.on()`, `this` refers to the current element or the element which received the event.

- **.one(selector)** returns the first element found by `selector`.
- **.all(selector)** returns all elements found by `selector`.
- **.each(func)** loops over element(s) and runs `func` on each one. `func` receives one argument: the index of the current element.
- **.on(evt, func)** adds an event listener `func` for event type `evt`.
- **.add(el[, el2, el3, ...])** adds new element(s) or TextNodes (when the argument is a string) to element(s).
- **.css({property: value})** changes the style of element(s).
- **.css(property)** returns value(s) of property (only works with properties set by JavaScript).
- **.attr({attribute: value})** changes an attribute.
- **.attr(attribute)** returns value(s) of attribute.
- **.cls(class[, class2, class3, ...])** adds classes (adding multiple classes doesn't work on IE).
- **.empty()** empties element.
- **.remove()** removes and returns element.
- **.text(text)** sets textContent of element.
- **.text()** returns textContent of element (doesn't work on Arrays).
- **.copy()** copies element(s), complete with children and events (used internally by `.add()`).

## Compatibility

So far I've tested this on Firefox 46 and Chrome 50.

According to [caniuse.com](http://caniuse.com) and other sources, theoretically it should work on Firefox 3.6+, Chrome 8.0+, Internet Explorer 10.0+, Edge 12+, Safari 5.1+, Opera 11.50+, iOS Safari 5.0+, Android browser 3.0+ and Chrome for Android 33.0+, based on the following properties:

- [querySelector/querySelectorAll](http://caniuse.com/queryselector)
- [Array.prototype.forEach](http://kangax.github.io/es5-compat-table/#Array.prototype.forEach)
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener)
- [classList](https://developer.mozilla.org/en/docs/Web/API/Element/classList)
