/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "heya-unit", "../mixin", "../mixOwn", "../mixDeep", "../clone",
	"../getProp", "../setProp", "../delay", "../debounce", "../throttle"],
function(module, unit, mixin, mixOwn, mixDeep, clone,
	getProp, setProp, delay, debounce, throttle){

	"use strict";

	// tests

	unit.add(module, [
		// mixin
		function test_mixin(t){
			var p1 = {a: 1, b: "Hi!", c: [1, 2, 3]},
				r1 = mixin({}, p1);
			eval(t.TEST("t.unify(r1, p1)"));
			eval(t.TEST("r1.c === p1.c"));

			var r2 = mixin({a: null, b: {}, d: 3}, p1);
			eval(t.TEST("t.unify(r2, {a: 1, b: 'Hi!', c: [1, 2, 3], d: 3})"));

			var p2 = Object.create(p1);
			p2.b = 42;
			p2.d = 55;
			var r3 = mixin({}, p2);
			eval(t.TEST("t.unify(r3, {a: 1, b: 42, c: [1, 2, 3], d: 55})"));

			eval(t.TEST("r3.hasOwnProperty('a')"));
			eval(t.TEST("r3.hasOwnProperty('b')"));
			eval(t.TEST("r3.hasOwnProperty('c')"));
			eval(t.TEST("r3.hasOwnProperty('d')"));

			eval(t.TEST("!p2.hasOwnProperty('a')"));
			eval(t.TEST("p2.hasOwnProperty('b')"));
			eval(t.TEST("!p2.hasOwnProperty('c')"));
			eval(t.TEST("p2.hasOwnProperty('d')"));
		},
		// mixOwn
		function test_mixOwn(t){
			var p1 = {a: 1, b: "Hi!", c: [1, 2, 3]},
				r1 = mixOwn({}, p1);
			eval(t.TEST("t.unify(r1, p1)"));
			eval(t.TEST("r1.c === p1.c"));

			var r2 = mixOwn({a: null, b: {}, d: 3}, p1);
			eval(t.TEST("t.unify(r2, {a: 1, b: 'Hi!', c: [1, 2, 3], d: 3})"));

			var p2 = Object.create(p1);
			p2.b = 42;
			p2.d = 55;
			var r3 = mixOwn({}, p2);
			eval(t.TEST("t.unify(r3, {b: 42, d: 55})"));

			eval(t.TEST("!r3.hasOwnProperty('a')"));
			eval(t.TEST("r3.hasOwnProperty('b')"));
			eval(t.TEST("!r3.hasOwnProperty('c')"));
			eval(t.TEST("r3.hasOwnProperty('d')"));

			eval(t.TEST("!p2.hasOwnProperty('a')"));
			eval(t.TEST("p2.hasOwnProperty('b')"));
			eval(t.TEST("!p2.hasOwnProperty('c')"));
			eval(t.TEST("p2.hasOwnProperty('d')"));
		},
		// clone
		function test_clone(t){
			var p1 = {a: 1, b: "Hi!", c: [1, 2, 3]},
				r1 = clone(p1);
			eval(t.TEST("t.unify(r1, p1)"));
			eval(t.TEST("r1 !== p1"));
			eval(t.TEST("r1.c !== p1.c"));

			var p2 = Object.create(p1);
			p2.b = 42;
			p2.d = 55;
			var r3 = clone(p2);
			eval(t.TEST("t.unify(r3, {a: 1, b: 42, c: [1, 2, 3], d: 55})"));

			eval(t.TEST("r3.hasOwnProperty('a')"));
			eval(t.TEST("r3.hasOwnProperty('b')"));
			eval(t.TEST("r3.hasOwnProperty('c')"));
			eval(t.TEST("r3.hasOwnProperty('d')"));

			eval(t.TEST("!p2.hasOwnProperty('a')"));
			eval(t.TEST("p2.hasOwnProperty('b')"));
			eval(t.TEST("!p2.hasOwnProperty('c')"));
			eval(t.TEST("p2.hasOwnProperty('d')"));

			var p3 = {a: [new Date(), /abc/g]},
				r2 = clone(p3);
			eval(t.TEST("t.unify(r2, p3)"));
			eval(t.TEST("r2 !== p3"));
			eval(t.TEST("r2.a !== p3.a"));
			eval(t.TEST("r2.a[0] !== p3.a[0]"));
			eval(t.TEST("r2.a[0].getTime() === p3.a[0].getTime()"));
			eval(t.TEST("r2.a[1] !== p3.a[1]"));
			eval(t.TEST("r2.a[1].source === p3.a[1].source"));
			eval(t.TEST("r2.a[1].global === p3.a[1].global"));
			eval(t.TEST("r2.a[1].ignoreCase === p3.a[1].ignoreCase"));
			eval(t.TEST("r2.a[1].multiline === p3.a[1].multiline"));
		},
		// mixDeep
		function test_mixDeep(t){
			eval(t.TEST("t.unify(mixDeep({}, {}), {})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: {c: 2}}), {a: {b: 1, c: 2}})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: [1, 2]}), {a: [1, 2]})"));
			eval(t.TEST("t.unify(mixDeep({a: [1, , 3]}, {a: [, 2, , 4]}), {a: [1, 2, 3, 4]})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: new Date(2013, 3, 15)}}, {a: {c: /.+/mig}}), {a: {b: new Date(2013, 3, 15), c: /.+/mig}})"));
			eval(t.TEST("t.unify(mixDeep({}, {a: {c: 2}}), {a: {c: 2}})"));

			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: {c: 2}}, true), {a: {b: 1}})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: {b: 42, c: 2}, d: 13}, true), {a: {b: 42}})"));

			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: {c: 2}}, false, clone), {a: {b: 1, c: 2}})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: 1}}, {a: [1, 2]}, false, clone), {a: [1, 2]})"));
			eval(t.TEST("t.unify(mixDeep({a: [1, , 3]}, {a: [, 2, , 4]}, false, clone), {a: [1, 2, 3, 4]})"));
			eval(t.TEST("t.unify(mixDeep({a: {b: new Date(2013, 3, 15)}}, {a: {c: /.+/mig}}, false, clone), {a: {b: new Date(2013, 3, 15), c: /.+/mig}})"));
			eval(t.TEST("t.unify(mixDeep({}, {a: {c: 2}}, false, clone), {a: {c: 2}})"));
		},
		// getProp/setProp
		function test_prop(t){
			var p = {a: 1, " ": "Hi!", c: [new Date(2013, 3, 15), /.+/mig], d: {
					e: [1, 2, 3], f: {
						g: "Hello", h: null
					}
				}};

			eval(t.TEST("getProp(p, 'a') === 1"));
			eval(t.TEST("getProp(p, 'c') === p.c"));
			eval(t.TEST("getProp(p, 'c.length') === 2"));
			eval(t.TEST("getProp(p, 'c.0').getFullYear() === 2013"));
			eval(t.TEST("getProp(p, 'c.1.source') === '.+'"));
			eval(t.TEST("getProp(p, 'd.e.length') === 3"));
			eval(t.TEST("getProp(p, 'e') === undefined"));
			eval(t.TEST("getProp(p, 'd.f.g') === 'Hello'"));

			eval(t.TEST("getProp(p, [' ']) === 'Hi!'"));
			eval(t.TEST("getProp(p, ['d', 'f', 'g']) === 'Hello'"));

			var r = {};
			setProp(r, "a", 1);
			setProp(r, "d.f.g", "Hello");
			setProp(r, ["d", "f", "h"], null);
			setProp(r, [" "], "Hi!");
			setProp(r, "d.e", [1, 2, 3]);
			setProp(r, "c", [, /.+/mig]);
			setProp(r, "c.0", new Date(2013, 3, 15));

			eval(t.TEST("t.unify(p, r)"));
		},
		// delay
		{
			timeout: 1000,
			test: function test_delay(t){
				var a = t.startAsync("delay");
				t.info("Creating delayed function");
				var f = delay(function(v){
						t.info("callback #1: " + v);
						a.done();
					}, 200);
				t.info("Calling delayed function");
				var h = f(1);
				t.info("Canceling delayed function");
				h.destroy();
				t.info("Calling delayed function again");
				f(2);
				t.info("Waiting for result");
			},
			logs: [
				{text: "Creating delayed function"},
				{text: "Calling delayed function"},
				{text: "Canceling delayed function"},
				{text: "Calling delayed function again"},
				{text: "Waiting for result"},
				{text: "callback #1: 2"}
			]
		},
		// debounce
		{
			timeout: 1000,
			test: function test_debounce(t){
				var a = t.startAsync("debounce");
				t.info("Creating debounced function");
				var f = debounce(function(v){
						t.info("callback #1: " + v);
						a.done();
					}, 200);
				t.info("Calling debounced function");
				var h = f(1);
				t.info("Canceling debounced function");
				h.destroy();
				t.info("Calling debounced function again");
				f(2);
				t.info("Running timeline");
				for(var i = 20; i < 100; i += 20){
					(function(ms){
						setTimeout(function(){
							t.info("Calling with: " + ms);
							f(ms);
						}, ms);
					})(i);
				}
				t.info("Waiting for result");
			},
			logs: [
				{text: "Creating debounced function"},
				{text: "Calling debounced function"},
				{text: "Canceling debounced function"},
				{text: "Calling debounced function again"},
				{text: "Running timeline"},
				{text: "Waiting for result"},
				{text: "Calling with: 20"},
				{text: "Calling with: 40"},
				{text: "Calling with: 60"},
				{text: "Calling with: 80"},
				{text: "callback #1: 80"}
			]
		},
		// throttle
		{
			timeout: 1000,
			test: function test_throttle(t){
				var a = t.startAsync("throttle");
				t.info("Creating throttled function");
				var flag = false, f = throttle(function(v){
						t.info("callback #1: " + v);
						if(flag){
							a.done();
						}
					}, 200);
				t.info("Calling throttled function");
				f(1);
				t.info("Calling throttled function again");
				var h = f(2);
				t.info("Canceling throttled function");
				h.destroy();
				t.info("Running timeline");
				for(var i = 20; i < 100; i += 20){
					(function(ms){
						setTimeout(function(){
							t.info("Calling with: " + ms);
							flag = ms == 80;
							f(ms);
						}, ms);
					})(i);
				}
				t.info("Waiting for result");
			},
			logs: [
				{text: "Creating throttled function"},
				{text: "Calling throttled function"},
				{text: "callback #1: 1"},
				{text: "Calling throttled function again"},
				{text: "Canceling throttled function"},
				{text: "Running timeline"},
				{text: "Waiting for result"},
				{text: "Calling with: 20"},
				{text: "Calling with: 40"},
				{text: "Calling with: 60"},
				{text: "Calling with: 80"},
				{text: "callback #1: 80"}
			]
		}
	]);

	unit.run();
});
