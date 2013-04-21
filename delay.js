/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function delay(f, ms){
		return function(){
			var self = this, args = arguments,
				handle = setTimeout(function(){
					handle = null;
					f.apply(self, args);
				}, ms);
			return {
				isWaiting: function(){ return !!handle; },
				destroy: function(){
					if(handle){
						clearTimeout(handle);
						handle = null;
					}
				}
			};
		};
	};
});
