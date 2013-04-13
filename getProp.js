/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function getProp(o, name){
		if(typeof name == "string"){
			name = name.split(/[^\w]+/);
		}
		for(var i = 0; i < name.length; ++i){
			if(!o){ return; }
			o = o[name[i]];
		}
		return o;
	};
});
