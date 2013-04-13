/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	//TODO: consider defineProperty() & Co. on capable JS engines.

	return function mixOwn(t, s){
		for(var k in s){
			if(s.hasOwnProperty(k)){
				t[k] = s[k];
			}
		}
		return t;
	};
});
