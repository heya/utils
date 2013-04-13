/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function setProp(o, name, value, strict){
		if(typeof name == "string"){
			name = name.split(/[^\w]+/);
		}
		var last = name.pop();
		for(var i = 0; i < name.length; ++i){
			var key = name[i];
			if(key in o){
				o = o[key];
			}else{
				if(strict){
					throw new Error("setProp: wrong path");
				}
				o = o[key] = {};
			}
		}
		o[last] = value;
	};
});
