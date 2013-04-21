/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function throttle(f, threshold){
		var handle, last;
		return function(){
			var now = new Date().getTime();
			if(last && now < last + threshold){
				if(handle){
					clearTimeout(handle);
				}
				var self = this, args = arguments;
				handle = setTimeout(function(){
					handle = null;
					last = new Date().getTime();
					f.apply(self, args);
				}, last + threshold - now);
			}else{
				last = now;
				f.apply(this, arguments);
			}
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
