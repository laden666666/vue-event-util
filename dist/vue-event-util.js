!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.vueElementResizeEvent=n():t.vueElementResizeEvent=n()}("undefined"!=typeof self?self:this,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(2),o=e.n(r),i=(e(3),e(4)),u=e.n(i);e(5);o.a,u.a},function(t,n,e){(function(n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt,l="object"==typeof n&&n&&n.Object===Object&&n,s="object"==typeof self&&self&&self.Object===Object&&self,p=l||s||Function("return this")(),v=Object.prototype.toString,y=Math.max,d=Math.min,b=function(){return p.Date.now()};function m(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function j(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&v.call(t)==o}(t))return r;if(m(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=m(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}t.exports=function(t,n,r){var o,i,u,f,c,a,l=0,s=!1,p=!1,v=!0;if("function"!=typeof t)throw new TypeError(e);function g(n){var e=o,r=i;return o=i=void 0,l=n,f=t.apply(r,e)}function h(t){var e=t-a;return void 0===a||e>=n||e<0||p&&t-l>=u}function x(){var t=b();if(h(t))return O(t);c=setTimeout(x,function(t){var e=n-(t-a);return p?d(e,u-(t-l)):e}(t))}function O(t){return c=void 0,v&&o?g(t):(o=i=void 0,f)}function w(){var t=b(),e=h(t);if(o=arguments,i=this,a=t,e){if(void 0===c)return function(t){return l=t,c=setTimeout(x,n),s?g(t):f}(a);if(p)return c=setTimeout(x,n),g(a)}return void 0===c&&(c=setTimeout(x,n)),f}return n=j(n)||0,m(r)&&(s=!!r.leading,u=(p="maxWait"in r)?y(j(r.maxWait)||0,n):u,v="trailing"in r?!!r.trailing:v),w.cancel=function(){void 0!==c&&clearTimeout(c),l=0,o=a=i=c=void 0},w.flush=function(){return void 0===c?f:O(b())},w}}).call(n,e(0))},function(t,n,e){(function(n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt,l="object"==typeof n&&n&&n.Object===Object&&n,s="object"==typeof self&&self&&self.Object===Object&&self,p=l||s||Function("return this")(),v=Object.prototype.toString,y=Math.max,d=Math.min,b=function(){return p.Date.now()};function m(t,n,r){var o,i,u,f,c,a,l=0,s=!1,p=!1,v=!0;if("function"!=typeof t)throw new TypeError(e);function m(n){var e=o,r=i;return o=i=void 0,l=n,f=t.apply(r,e)}function h(t){var e=t-a;return void 0===a||e>=n||e<0||p&&t-l>=u}function x(){var t=b();if(h(t))return O(t);c=setTimeout(x,function(t){var e=n-(t-a);return p?d(e,u-(t-l)):e}(t))}function O(t){return c=void 0,v&&o?m(t):(o=i=void 0,f)}function w(){var t=b(),e=h(t);if(o=arguments,i=this,a=t,e){if(void 0===c)return function(t){return l=t,c=setTimeout(x,n),s?m(t):f}(a);if(p)return c=setTimeout(x,n),m(a)}return void 0===c&&(c=setTimeout(x,n)),f}return n=g(n)||0,j(r)&&(s=!!r.leading,u=(p="maxWait"in r)?y(g(r.maxWait)||0,n):u,v="trailing"in r?!!r.trailing:v),w.cancel=function(){void 0!==c&&clearTimeout(c),l=0,o=a=i=c=void 0},w.flush=function(){return void 0===c?f:O(b())},w}function j(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function g(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&v.call(t)==o}(t))return r;if(j(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=j(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}t.exports=function(t,n,r){var o=!0,i=!0;if("function"!=typeof t)throw new TypeError(e);return j(r)&&(o="leading"in r?!!r.leading:o,i="trailing"in r?!!r.trailing:i),m(t,n,{leading:o,maxWait:n,trailing:i})}}).call(n,e(0))},function(t,n){var e="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt;var l=Object.prototype.toString,s=Math.max;var p,v,y=(p=function(t,n,s){return function(t,n,r){if("function"!=typeof t)throw new TypeError(e);return setTimeout(function(){t.apply(void 0,r)},n)}(t,function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&l.call(t)==o}(t))return r;if(d(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=d(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=f.test(t);return e||c.test(t)?a(t.slice(2),e?2:8):u.test(t)?r:+t}(n)||0,s)},v=s(void 0===v?p.length-1:v,0),function(){for(var t=arguments,n=-1,e=s(t.length-v,0),r=Array(e);++n<e;)r[n]=t[v+n];n=-1;for(var o=Array(v+1);++n<v;)o[n]=t[n];return o[v]=r,function(t,n,e){switch(e.length){case 0:return t.call(n);case 1:return t.call(n,e[0]);case 2:return t.call(n,e[0],e[1]);case 3:return t.call(n,e[0],e[1],e[2])}return t.apply(n,e)}(p,this,o)});function d(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}t.exports=y},function(t,n,e){"use strict";function r(t,n){var e,r;if(0===n.length)return t;for(e=0,r=n.length;e<r;e++)t=(t<<5)-t+n.charCodeAt(e),t|=0;return t<0?-2*t:t}function o(t,n,e,i){var u,f=r(r(r(t,e),(u=n,Object.prototype.toString.call(u))),typeof n);return null===n?r(f,"null"):void 0===n?r(f,"undefined"):"object"==typeof n?-1!==i.indexOf(n)?r(f,"[Circular]"+e):(i.push(n),function(t,n,e){return Object.keys(n).sort().reduce(function(t,r){return o(t,n[r],r,e)},t)}(f,n,i)):r(f,n.toString())}t.exports=function(t){return function(t,n){for(;t.length<n;)t="0"+t;return t}(o(0,t,"",[]).toString(16),8)}}])});