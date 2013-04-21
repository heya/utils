/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	//TODO: consider defineProperty() & Co. on capable JS engines.

	return function clone(s){
		if(!s || typeof s != "object" || typeof s == "function"){
			return s;
		}
		if(s instanceof Date){
			return new Date(s.getTime());
		}
		if(s instanceof RegExp){
			return new RegExp(s.source,
					(s.global ? "g" : "") +
					(s.multiline ? "m" : "") +
					(s.ignoreCase ? "i" : "")
				);
		}
		var t = s instanceof Array ? [] : {};
		for(var i in s){
			t[i] = clone(s[i]);
		}
		return t;
	};
});
