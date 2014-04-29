# µ

#### JS DOM micro library

Are you also tired and fed up with the bulkiness of jQuery, but also don't want to have to type

    document.querySelector("div").appendChild(document.createTextNode("hello"));

just to add some text to an element?

Look no further!

µ is a tiny (1369 bytes) DOM library for JavaScript, based on prototypal extension of Node and Array (yes, it may be ugly, but it works mighty fine), chainability, and not caring about Internet Explorer.

## Examples

This code adds a green-colored paragraph with the word 'hello' to all divs:

    µ.all("div").add(µ.create("p").text("hello").css({color: "green"}));

The next code says 'hi' on clicking the first button in your document:

    µ.one("button").on(function() {alert("hi");});

Because it is all based on prototypes, you can just go back to using the bulky DOM syntax if that pleases you:

    µ.create("div").appendChild(document.createElement("p"));

Or you can go crazy!

    µ.all("div")
     .on(function() {
        alert("hi!");
     })
     .css({
        color: "green",
        background: "yellow"
     })
     .attr({"title": "mydiv"})
     .add(
        µ.create("p")
         .text("what's up?")
         .on(function(event) {
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

`µ.one(selector)` returns the first element in document found by `selector`.  
`µ.all(selector)` returns all elements in document found by `selector`.  
`µ.create(tag)` returns a new element.

### Using chaining

`.one(selector)` returns the first element found by `selector`.  
`.all(selector)` returns all elements found by `selector`.  
`.each(func)` loops over element(s) and runs `func` on each one.  
`.on(evt, func)` adds an event listener `func` for event type `evt`.  
`.add(el)` adds a new element to element(s).  
`.text(text)` adds a new TextNode to element(s).  
`.css({property: value})` changes the style of element(s).  
`.attr({attribute: value})` changes an attribute.

## Compatibility

So far I've tested this on Firefox 28 and Chrome 34.