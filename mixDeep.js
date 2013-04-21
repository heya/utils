/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	//TODO: consider defineProperty() & Co. on capable JS engines.

	function identity(x){ return x; }

	return function mixDeep(t, s, dontCreate, cloneFn){
		cloneFn = cloneFn || identity;
		main: {
			if(!s || typeof s != "object" || s instanceof Date || s instanceof RegExp){
				return cloneFn(s);
			}
			if(s instanceof Array){
				if(!(t instanceof Array)){
					return cloneFn(s);
				}
			}
			// copy members
			for(var k in s){
				if(k in t){
					t[k] = mixDeep(t[k], s[k], dontCreate, cloneFn);
				}else if(!dontCreate){
					t[k] = cloneFn(s[k]);
				}
			}
			return t;
		}
		throw new Error("mixDeep: Structural mismatch");
	};
});
