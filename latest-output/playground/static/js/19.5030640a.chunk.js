(this["webpackJsonpelectron-playground"]=this["webpackJsonpelectron-playground"]||[]).push([[19],{1384:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return i}));var r=n(57),o=n(0),c=n.n(o),u=n(154),a=n.n(u);function i(){var t=Object(o.useState)(5),e=Object(r.a)(t,2),n=e[0],u=e[1];return Object(o.useEffect)((function(){var t;return document.title="\u5b50\u7a97\u53e3",n>0?t=setTimeout((function(){u(n-1)}),1e3):(window.sendToParent("hello"),window.close()),function(){t&&clearTimeout(t)}}),[n]),c.a.createElement("div",{className:a.a.countDown},"\u5b50\u7a97\u53e3 ",n," \u79d2\u4e4b\u540e\uff0c\u8bf7\u770b\u4e3b\u7a97\u53e3")}},144:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(164);function o(t,e){if(t){if("string"===typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},154:function(t,e,n){t.exports={wrap:"style_wrap__FMFZh",countDown:"style_countDown__x97aX",close:"style_close__2rmeL",model:"style_model__r2Jd4",bg:"style_bg__xXgYG",confirm:"style_confirm__1D_N2",ok:"style_ok__soQG5",cancel:"style_cancel__3TMtk","full-screen":"style_full-screen__1TBe-",btn:"style_btn__2byeX"}},163:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},164:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},165:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},57:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(163);var o=n(144),c=n(165);function u(t,e){return Object(r.a)(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,c=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(i){o=!0,c=i}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}}}]);