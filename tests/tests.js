/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "heya-unit", "../mixin", "../mixOwn", "../mixDeep", "../clone",
	"../getProp", "../setProp", "../delay", "../debounce", "../throttle"],
function(module, unit, mixin, mixOwn, mixDeep, clone,
	getProp, setProp, delay, debounce, throttle){

	"use strict";

	// tests

	unit.add(module, [
	]);

	unit.run();
});
