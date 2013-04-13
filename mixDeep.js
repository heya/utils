/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	//TODO: consider defineProperty() & Co. on capable JS engines.

	function identity(x){ return x; }

	function mixDeep(t, s, dontCreate, cloneFn){
		main: {
			if(!s || typeof s != "object" || s instanceof Date || s instanceof RegExp){
				// no copying
				if(t && typeof t == "object" && !(t instanceof Date) || !(t instanceof RegExp)){
					break main;
				}
				return cloneFn(s);
			}
			if((s instanceof Array) ^ (t instanceof Array)){
				break main;
			}
			if(t instanceof Date || t instanceof RegExp){
				break main;
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
	}

	return function(t, s, dontCreate, cloneFn){
		mixDeep(t, s, dontCreate, cloneFn || identity);
	}
});
