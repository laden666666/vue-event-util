!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.vueElementResizeEvent=n():t.vueElementResizeEvent=n()}("undefined"!=typeof self?self:this,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(2),o=e.n(r),i=e(3),u=e.n(i),f=e(4),c=e.n(f),a=e(5),l=e.n(a),p=e(6),s=e.n(p),v=e(7),y=e.n(v);e(8);function d(t,n){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];return function(r,o,i){return r[o].veuData={arg:e,methodName:t,isKeyMethod:n},i}}function b(t){return d("defer",!1,t)}function h(t){return d("defer",!0,t)}function g(t){return d("throttle",!1,t)}function m(t){return d("throttle",!0,t)}function j(t){return d("debounce",!1,t)}function x(t){return d("debounce",!0,t)}function O(t){return d("after",!1,t)}function $(t){return d("after",!0,t)}function w(t){return d("before",!1,t)}function E(t){return d("before",!0,t)}function T(t,n){t.mixin({beforeCreate:function(t){this._VEUData={}},created:function(t){var n=this,e=this.$options.methods;if(e)for(var r in e){var o=e[r],i=o.veuData;i&&function(){var t=i.arg,e=i.isKeyMethod,u=i.methodName;if(e){var f=n[r];n[r]=function(e){return n["$"+u](e,f(e),t[0],t[1])}}else n[r]=n["$"+u](o.bind(n),t[0],t[1])}()}},beforeDestroy:function(){this._VEUData=null}}),t.prototype.$$VEUBind=function(t,n,e){var r,o=this._VEUData;if(o[t]?r=o[t]:o[t]=r={},r[n])return r[n];var i=this;return r[n]=function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e.call.apply(e,[i].concat(n))}},t.prototype.$defer=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return"function"==typeof t&&(e=n||0,n=t),function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return s.a.apply(void 0,[n,e].concat(r))}};for(var e=[["throttle",function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return u()(t,n,{trailing:!1})}],["debounce",o.a],["after",function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return l()(n,t)}],["before",function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return c()(n,t)}]],r=function(n){var r=e[n][0],o=e[n][1];t.prototype["$"+r]=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return"function"==typeof t&&(e=n||0,n=t,t=""),t=y()([t,n.toString(),e]),this.$$VEUBind(r,t,o(n,e))}},i=0;i<e.length;i++)r(i)}y.a;e.d(n,"install",function(){return T}),e.d(n,"hash",function(){return y.a}),e.d(n,"debounce",function(){return j}),e.d(n,"debounceKey",function(){return x}),e.d(n,"defer",function(){return b}),e.d(n,"deferKey",function(){return h}),e.d(n,"throttle",function(){return g}),e.d(n,"throttleKey",function(){return m}),e.d(n,"after",function(){return O}),e.d(n,"afterKey",function(){return $}),e.d(n,"before",function(){return w}),e.d(n,"beforeKey",function(){return E})},function(t,n,e){(function(n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt,l="object"==typeof n&&n&&n.Object===Object&&n,p="object"==typeof self&&self&&self.Object===Object&&self,s=l||p||Function("return this")(),v=Object.prototype.toString,y=Math.max,d=Math.min,b=function(){return s.Date.now()};function h(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function g(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&v.call(t)==o}(t))return r;if(h(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=h(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}t.exports=function(t,n,r){var o,i,u,f,c,a,l=0,p=!1,s=!1,v=!0;if("function"!=typeof t)throw new TypeError(e);function m(n){var e=o,r=i;return o=i=void 0,l=n,f=t.apply(r,e)}function j(t){var e=t-a;return void 0===a||e>=n||e<0||s&&t-l>=u}function x(){var t=b();if(j(t))return O(t);c=setTimeout(x,function(t){var e=n-(t-a);return s?d(e,u-(t-l)):e}(t))}function O(t){return c=void 0,v&&o?m(t):(o=i=void 0,f)}function $(){var t=b(),e=j(t);if(o=arguments,i=this,a=t,e){if(void 0===c)return function(t){return l=t,c=setTimeout(x,n),p?m(t):f}(a);if(s)return c=setTimeout(x,n),m(a)}return void 0===c&&(c=setTimeout(x,n)),f}return n=g(n)||0,h(r)&&(p=!!r.leading,u=(s="maxWait"in r)?y(g(r.maxWait)||0,n):u,v="trailing"in r?!!r.trailing:v),$.cancel=function(){void 0!==c&&clearTimeout(c),l=0,o=a=i=c=void 0},$.flush=function(){return void 0===c?f:O(b())},$}}).call(n,e(0))},function(t,n,e){(function(n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt,l="object"==typeof n&&n&&n.Object===Object&&n,p="object"==typeof self&&self&&self.Object===Object&&self,s=l||p||Function("return this")(),v=Object.prototype.toString,y=Math.max,d=Math.min,b=function(){return s.Date.now()};function h(t,n,r){var o,i,u,f,c,a,l=0,p=!1,s=!1,v=!0;if("function"!=typeof t)throw new TypeError(e);function h(n){var e=o,r=i;return o=i=void 0,l=n,f=t.apply(r,e)}function j(t){var e=t-a;return void 0===a||e>=n||e<0||s&&t-l>=u}function x(){var t=b();if(j(t))return O(t);c=setTimeout(x,function(t){var e=n-(t-a);return s?d(e,u-(t-l)):e}(t))}function O(t){return c=void 0,v&&o?h(t):(o=i=void 0,f)}function $(){var t=b(),e=j(t);if(o=arguments,i=this,a=t,e){if(void 0===c)return function(t){return l=t,c=setTimeout(x,n),p?h(t):f}(a);if(s)return c=setTimeout(x,n),h(a)}return void 0===c&&(c=setTimeout(x,n)),f}return n=m(n)||0,g(r)&&(p=!!r.leading,u=(s="maxWait"in r)?y(m(r.maxWait)||0,n):u,v="trailing"in r?!!r.trailing:v),$.cancel=function(){void 0!==c&&clearTimeout(c),l=0,o=a=i=c=void 0},$.flush=function(){return void 0===c?f:O(b())},$}function g(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function m(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&v.call(t)==o}(t))return r;if(g(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=g(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}t.exports=function(t,n,r){var o=!0,i=!0;if("function"!=typeof t)throw new TypeError(e);return g(r)&&(o="leading"in r?!!r.leading:o,i="trailing"in r?!!r.trailing:i),h(t,n,{leading:o,maxWait:n,trailing:i})}}).call(n,e(0))},function(t,n){var e="Expected a function",r=1/0,o=1.7976931348623157e308,i=NaN,u="[object Symbol]",f=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,l=/^0o[0-7]+$/i,p=parseInt,s=Object.prototype.toString;function v(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}t.exports=function(t,n){var y;if("function"!=typeof n)throw new TypeError(e);return t=function(t){var n=function(t){if(!t)return 0===t?t:0;if((t=function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&s.call(t)==u}(t))return i;if(v(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=v(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var e=a.test(t);return e||l.test(t)?p(t.slice(2),e?2:8):c.test(t)?i:+t}(t))===r||t===-r){var n=t<0?-1:1;return n*o}return t==t?t:0}(t),e=n%1;return n==n?e?n-e:n:0}(t),function(){return--t>0&&(y=n.apply(this,arguments)),t<=1&&(n=void 0),y}}},function(t,n){var e="Expected a function",r=1/0,o=1.7976931348623157e308,i=NaN,u="[object Symbol]",f=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,l=/^0o[0-7]+$/i,p=parseInt,s=Object.prototype.toString;function v(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}t.exports=function(t,n){if("function"!=typeof n)throw new TypeError(e);var y,d;return y=function(t){if(!t)return 0===t?t:0;if((t=function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&s.call(t)==u}(t))return i;if(v(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=v(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var e=a.test(t);return e||l.test(t)?p(t.slice(2),e?2:8):c.test(t)?i:+t}(t))===r||t===-r){var n=t<0?-1:1;return n*o}return t==t?t:0}(t),d=y%1,t=y==y?d?y-d:y:0,function(){if(--t<1)return n.apply(this,arguments)}}},function(t,n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt;var l=Object.prototype.toString,p=Math.max;var s,v,y=(s=function(t,n,p){return function(t,n,r){if("function"!=typeof t)throw new TypeError(e);return setTimeout(function(){t.apply(void 0,r)},n)}(t,function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&l.call(t)==o}(t))return r;if(d(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=d(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}(n)||0,p)},v=p(void 0===v?s.length-1:v,0),function(){for(var t=arguments,n=-1,e=p(t.length-v,0),r=Array(e);++n<e;)r[n]=t[v+n];n=-1;for(var o=Array(v+1);++n<v;)o[n]=t[n];return o[v]=r,function(t,n,e){switch(e.length){case 0:return t.call(n);case 1:return t.call(n,e[0]);case 2:return t.call(n,e[0],e[1]);case 3:return t.call(n,e[0],e[1],e[2])}return t.apply(n,e)}(s,this,o)});function d(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}t.exports=y},function(t,n,e){"use strict";function r(t,n){var e,r;if(0===n.length)return t;for(e=0,r=n.length;e<r;e++)t=(t<<5)-t+n.charCodeAt(e),t|=0;return t<0?-2*t:t}function o(t,n,e,i){var u,f=r(r(r(t,e),(u=n,Object.prototype.toString.call(u))),typeof n);return null===n?r(f,"null"):void 0===n?r(f,"undefined"):"object"==typeof n?-1!==i.indexOf(n)?r(f,"[Circular]"+e):(i.push(n),function(t,n,e){return Object.keys(n).sort().reduce(function(t,r){return o(t,n[r],r,e)},t)}(f,n,i)):r(f,n.toString())}t.exports=function(t){return function(t,n){for(;t.length<n;)t="0"+t;return t}(o(0,t,"",[]).toString(16),8)}},function(t,n){}])});