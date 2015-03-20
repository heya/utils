/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	function identity(value){ return value; }

	function pad(init){
		var filler = init;
		return function(value, length, right){
			var len = length - value.length;
			while(filler.length < len){ filler += filler; }
			var padding = filler.substr(0, len);
			return right ? value + padding : padding + value;
		};
	}
	var padZero = pad("00000000"), padSpace = pad("        ");

	// alternative prefix
	var a = {o: "0", O: "0", x: "0x", X: "0X", b: "b", B: "B"};

	function integer(radix){
		return function(value, precision, flags, format){
			var result = Math.round(value).toString(radix), first = result.charAt(0), isNum = "0" <= first && first <= "9";
			if(isNum){
				if(flags.indexOf("+") >= 0){
					result = "+" + result; first = "+"; isNum = false;
				}else if(flags.indexOf(" ") >= 0){
					result = " " + result; first = " "; isNum = false;
				}
			}
			if(!isNaN(precision) && result.length < precision){
				result = isNum ? padZero(result, precision) : first + padZero(result.substr(1), precision - 1);
			}
			if(flags.indexOf("#") >= 0 && result !== "0"){
				result = isNum ? (a[format] || "") + result : first + (a[format] || "") + result.substr(1);
			}
			return result;
		};
	}

	var c = { // conversion routines
			d:   integer(10),
			b:   integer(2),
			o:   integer(8),
			x:   integer(16),
			f:   function fixed(value, precision){ return isNaN(precision) ? value.toFixed() : value.toFixed(precision); },
			e:   function scientific(value, precision){ return isNaN(precision) ? value.toExponential() : value.toExponential(precision); },
			g:   function automatic(value, precision){ return isNaN(precision) ? value.toPrecision() : value.toPrecision(precision); },
			j:   function json(value){ return JSON.stringify(value); },
			s:   function string(value, precision){ return isNaN(precision) ? value.toString() : value.toString().slice(0, precision); },
			"%": function percent(){ return "%"; }
		};
	c.i = c.u = c.d; c.B = c.b; c.X = c.x; c.E = c.e; c.G = c.g; c.S = c.t = c.s;

	var p = { // post-processing
			S: function upper(value){ return value.toUpperCase(); },
			t: function lower(value){ return value.toLowerCase(); }
		};
	p.E = p.G = p.X = p.S;

	return function sprintf(fmt){
		var args = arguments, argc = 1;
		return fmt.replace(/%([\-\+\ #]*)(\d*)(\.\d+|)([diobBuxXeEfgGjsSt%])/g,
			function(match, flags, width, precision, format){
				var result = (p[format] || identity)(c[format](args[argc], parseInt(precision.substr(1), 10), flags, format)),
					w = parseInt(width, 10);
				if(!isNaN(w) && result.length < w){
					result = padSpace(result, w, flags.indexOf("-") >= 0);
				}
				if(format != "%"){ ++argc; }
				return result;
			});
	};
});
