(this["webpackJsonpflone-react"]=this["webpackJsonpflone-react"]||[]).push([[10],{472:function(e,t,n){"use strict";var a=n(471),l=n(0),r=n.n(l),o=n(102),s=function(e){var t=e.imageUrl,n=e.logoClass,a=e.logoText;return r.a.createElement("div",{className:"".concat(n||""," d-flex align-items-center")},r.a.createElement(o.b,{to:"/",className:"logo-link"},t&&a?r.a.createElement("div",{className:"d-flex align-items-center"},r.a.createElement("img",{className:"logo-image",alt:"",src:""+t,width:"50px"}),r.a.createElement("div",{className:"logo-text"},a)):t?r.a.createElement("img",{alt:"",src:""+t,width:"50px"}):a?r.a.createElement("p",{className:"logo-text"},a):""),r.a.createElement("div",{className:"logo-sidetext"},"\u043f\u043e\u0438\u0441\u043a \u043e\u0442\u0437\u044b\u0432\u043e\u0432 \u043e \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0438 \u044e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043b\u0438\u0446\u0430\u0445 \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430"))},i=n(143),c=n(15),u=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,user:e.auth.user}}),(function(e){return{logout:function(){e(Object(c.H)())}}}))((function(e){var t=e.iconWhiteClass,n=e.isAuthenticated,a=e.logout,s=e.user,i=function(e){e.currentTarget.nextSibling.classList.toggle("active")},c=function(){return r.a.createElement(l.Fragment,null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/profile"},"\u041c\u043e\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430")),r.a.createElement("li",null,r.a.createElement("a",{className:"nav-link",href:"",onClick:function(){a()}},"\u0412\u044b\u0445\u043e\u0434")))},u=function(){return r.a.createElement(l.Fragment,null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/register"},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/login"},"\u0412\u0445\u043e\u0434")))};return r.a.createElement("div",{className:"header-right-wrap ".concat(t||"")},r.a.createElement("div",{className:"same-style cart-wrap d-flex justify-content-between"},r.a.createElement(o.b,{to:"/search",className:"d-flex align-items-center add-review"},r.a.createElement("i",{className:"pe-7s-search mr-2",style:{fontSize:30}}))),r.a.createElement("div",{className:"same-style cart-wrap d-flex justify-content-between"},r.a.createElement(o.b,{to:"/review",className:"d-flex align-items-center add-review"},r.a.createElement("i",{className:"pe-7s-plus mr-2",style:{fontSize:30}}))),r.a.createElement("div",{className:"same-style cart-wrap d-none d-lg-flex justify-content-between"},r.a.createElement("button",{className:"account-setting-active d-flex align-items-center",onClick:function(e){return i(e)}},r.a.createElement("i",{className:"pe-7s-user-female mr-2",style:{fontSize:32}})," ",r.a.createElement("span",{style:{fontSize:16}},s&&s.name)),r.a.createElement("div",{className:"account-dropdown"},r.a.createElement("ul",null,n?c():u()))),r.a.createElement("div",{className:"same-style cart-wrap d-block d-lg-none"},r.a.createElement("button",{className:"account-setting-active",onClick:function(e){return i(e)}},r.a.createElement("i",{className:"pe-7s-user-female",style:{fontSize:32,marginTop:3}})),r.a.createElement("div",{className:"account-dropdown"},r.a.createElement("ul",null,n?c():u()))))}));function m(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}function f(){var e=Object(l.useState)(m()),t=Object(a.a)(e,2),n=t[0],r=t[1];return Object(l.useEffect)((function(){function e(){r(m())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}var d=function(e){var t=e.layout,n=(e.top,e.borderStyle,e.headerPaddingClass),o=e.headerPositionClass,i=e.headerBgClass,c=Object(l.useState)(0),m=Object(a.a)(c,2),d=m[0],p=m[1],h=Object(l.useState)(0),v=Object(a.a)(h,2),g=v[0],E=v[1],k=f().width;Object(l.useEffect)((function(){return window.addEventListener("scroll",b),function(){window.removeEventListener("scroll",b)}}),[]),Object(l.useEffect)((function(){E(k<=991?67:90)}),[k]);var b=function(){p(window.scrollY)};return r.a.createElement("header",{className:"header-area clearfix ".concat(i||""," ").concat(o||"")},r.a.createElement("div",{className:"karman-header ".concat(n||""," sticky-bar header-res-padding clearfix ").concat(d>g?"stick":"")},r.a.createElement("div",{className:"container-fluid"===t?t:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xl-2 col-lg-2 col-md-6 col-4"},r.a.createElement(s,{imageUrl:"/assets/img/logo/logo-karman.png",logoClass:"logo",logoText:"\u043a\u0430\u0440\u043c\u0430\u043d"})),r.a.createElement("div",{className:"col-xl-8 col-lg-8 d-none d-lg-block"}),r.a.createElement("div",{className:"col-xl-2 col-lg-2 col-md-6 col-8"},r.a.createElement(u,null))))))},p=n(480),h=function(e){e.footerLogo;var t=e.spaceBottomClass,n=e.colorClass,s=e.imageUrl,i=e.logoText,c=Object(l.useState)(),u=Object(a.a)(c,2),m=u[0],f=u[1];return Object(l.useEffect)((function(){f((new Date).getFullYear())}),[]),r.a.createElement("div",{className:"copyright ".concat(t||""," ").concat(n||"")},r.a.createElement("div",{className:"footer-logo"},r.a.createElement(o.b,{to:"/",className:"logo-link"},s&&i?r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement("img",{className:"logo-image",alt:"",src:""+s,width:"50px"}),r.a.createElement("div",{className:"footer-logo-text"},i)):s?r.a.createElement("img",{alt:"",src:""+s,width:"50px"}):i?r.a.createElement("p",{className:"logo-text"},i):"")),r.a.createElement("p",null,"\xa9 ",m),r.a.createElement("p",null,"\u041f\u043e\u0438\u0441\u043a \u043e\u0442\u0437\u044b\u0432\u043e\u0432 \u043e \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0438 \u044e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043b\u0438\u0446\u0430\u0445 \u043f\u043e \u043d\u043e\u043c\u0435\u0440\u0443 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430"))},v=(n(482),function(e){var t=e.backgroundColorClass,n=e.spaceTopClass,s=e.spaceBottomClass,i=e.spaceLeftClass,c=e.spaceRightClass,u=e.containerClass,m=e.extraFooterClass,f=e.sideMenu,d=Object(l.useState)(0),v=Object(a.a)(d,2),g=v[0],E=v[1],k=Object(l.useState)(0),b=Object(a.a)(k,2),w=b[0],C=b[1];Object(l.useEffect)((function(){return C(100),window.addEventListener("scroll",N),function(){window.removeEventListener("scroll",N)}}),[]);var N=function(){E(window.scrollY)};return r.a.createElement("footer",{className:"footer-area ".concat(t||""," ").concat(n||""," ").concat(s||""," ").concat(m||""," ").concat(i||""," ").concat(c||"")}," ",r.a.createElement("div",{className:"".concat(u||"container")},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"".concat(f?"col-xl-4 col-sm-4":"col-lg-4 col-sm-4")},r.a.createElement(h,{footerLogo:"/assets/img/logo/logo.png",imageUrl:"/assets/img/logo/logo-karman.png",logoText:"\u043a\u0430\u0440\u043c\u0430\u043d"})),r.a.createElement("div",{className:"".concat(f?"col-xl-2 col-sm-2":"col-lg-2 col-sm-2")},r.a.createElement("div",{className:"footer-widget mb-30 ml-30"},r.a.createElement("div",{className:"footer-title"},r.a.createElement("h3",null,"\u041a\u0410\u0420\u041c\u0410\u041d")),r.a.createElement("div",{className:"footer-list"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/about"},"\u0412\u0445\u043e\u0434/\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"\u041f\u043e\u0438\u0441\u043a \u043e\u0442\u0437\u044b\u0432\u043e\u0432")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/contact"},"\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043e\u0442\u0437\u044b\u0432")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"\u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442")))))),r.a.createElement("div",{className:"".concat(f?"col-xl-2 col-sm-2":"col-lg-2 col-sm-2")},r.a.createElement("div",{className:"footer-widget mb-30 ml-30"},r.a.createElement("div",{className:"footer-title"},r.a.createElement("h3",null,"\u041c\u042b \u0412 \u0421\u041e\u0426\u0421\u0415\u0422\u042f\u0425")),r.a.createElement("div",{className:"footer-list"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/about"},"Facebook")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"Instagram")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/contact"},"Vkontakte")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"Tweeter")))))),r.a.createElement("div",{className:"".concat(f?"col-xl-4 col-sm-4":"col-lg-4 col-sm-4")},r.a.createElement("div",{className:"".concat(f?"footer-widget mb-30 ml-95":"footer-widget mb-30 ml-50")},r.a.createElement("div",{className:"footer-title"},r.a.createElement("h3",null,"\u0421\u0412\u042f\u0416\u0418\u0422\u0415\u0421\u042c \u0421 \u041d\u0410\u041c\u0418")),r.a.createElement("div",{className:"footer-list"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"Returns")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"Support Policy")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"Size guide")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"#/"},"FAQs")))))))),r.a.createElement("button",{className:"scroll-top ".concat(g>w?"show":""),onClick:function(){p.animateScroll.scrollToTop()}},r.a.createElement("i",{className:"fa fa-angle-double-up"})))});t.a=function(e){var t=e.children,n=e.headerContainerClass,o=e.headerTop,s=e.headerPaddingClass,i=e.headerPositionClass,c=Object(l.useState)(0),u=Object(a.a)(c,2),m=u[0],p=u[1],h=f().width;return Object(l.useEffect)((function(){p(h<=991?67:90)}),[h]),r.a.createElement("div",{className:"main-container"},r.a.createElement(d,{layout:n,top:o,headerPaddingClass:s,headerPositionClass:i}),r.a.createElement("main",{className:"main-content",style:{marginTop:m}},t),r.a.createElement(v,{backgroundColorClass:"bg-dark-gray",spaceTopClass:"pt-100",spaceBottomClass:"pb-70"}))}},474:function(e,t,n){e.exports=n(475)},475:function(e,t,n){"use strict";var a,l=(a=n(0))&&"object"==typeof a&&"default"in a?a.default:a,r=n(41);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function s(e,t){e.prototype=Object.create(t.prototype),function(e,t){for(var n=Object.getOwnPropertyNames(t),a=0;a<n.length;a++){var l=n[a],r=Object.getOwnPropertyDescriptor(t,l);r&&r.configurable&&void 0===e[l]&&Object.defineProperty(e,l,r)}}(e.prototype.constructor=e,t)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var c=function(e,t,n,a,l,r,o,s){if(!e){var i;if(void 0===t)i=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,a,l,r,o,s],u=0;(i=new Error(t.replace(/%s/g,(function(){return c[u++]})))).name="Invariant Violation"}throw i.framesToPop=1,i}};function u(e,t,n){if("selectionStart"in e&&"selectionEnd"in e)e.selectionStart=t,e.selectionEnd=n;else{var a=e.createTextRange();a.collapse(!0),a.moveStart("character",t),a.moveEnd("character",n-t),a.select()}}var m={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"};function f(e,t,n){var a="",l="",r=null,o=[];if(void 0===t&&(t="_"),null==n&&(n=m),!e||"string"!=typeof e)return{maskChar:t,formatChars:n,mask:null,prefix:null,lastEditablePosition:null,permanents:[]};var s=!1;return e.split("").forEach((function(e){s=!s&&"\\"===e||(s||!n[e]?(o.push(a.length),a.length===o.length-1&&(l+=e)):r=a.length+1,a+=e,!1)})),{maskChar:t,formatChars:n,prefix:l,mask:a,lastEditablePosition:r,permanents:o}}function d(e,t){return-1!==e.permanents.indexOf(t)}function p(e,t,n){var a=e.mask,l=e.formatChars;if(!n)return!1;if(d(e,t))return a[t]===n;var r=l[a[t]];return new RegExp(r).test(n)}function h(e,t){return t.split("").every((function(t,n){return d(e,n)||!p(e,n,t)}))}function v(e,t){var n=e.maskChar,a=e.prefix;if(!n){for(;t.length>a.length&&d(e,t.length-1);)t=t.slice(0,t.length-1);return t.length}for(var l=a.length,r=t.length;r>=a.length;r--){var o=t[r];if(!d(e,r)&&p(e,r,o)){l=r+1;break}}return l}function g(e,t){return v(e,t)===e.mask.length}function E(e,t){var n=e.maskChar,a=e.mask,l=e.prefix;if(!n){for((t=k(e,"",t,0)).length<l.length&&(t=l);t.length<a.length&&d(e,t.length);)t+=a[t.length];return t}if(t)return k(e,E(e,""),t,0);for(var r=0;r<a.length;r++)d(e,r)?t+=a[r]:t+=n;return t}function k(e,t,n,a){var l=e.mask,r=e.maskChar,o=e.prefix,s=n.split(""),i=g(e,t);return!r&&a>t.length&&(t+=l.slice(t.length,a)),s.every((function(n){for(;u=n,d(e,c=a)&&u!==l[c];){if(a>=t.length&&(t+=l[a]),s=n,r&&d(e,a)&&s===r)return!0;if(++a>=l.length)return!1}var s,c,u;return!p(e,a,n)&&n!==r||(a<t.length?t=r||i||a<o.length?t.slice(0,a)+n+t.slice(a+1):(t=t.slice(0,a)+n+t.slice(a),E(e,t)):r||(t+=n),++a<l.length)})),t}function b(e,t){for(var n=e.mask,a=t;a<n.length;++a)if(!d(e,a))return a;return null}function w(e){return e||0===e?e+"":""}function C(e,t,n,a,l){var r=e.mask,o=e.prefix,s=e.lastEditablePosition,i=t,c="",u=0,m=0,f=Math.min(l.start,n.start);return n.end>l.start?m=(u=function(e,t,n,a){var l=e.mask,r=e.maskChar,o=n.split(""),s=a;return o.every((function(t){for(;o=t,d(e,n=a)&&o!==l[n];)if(++a>=l.length)return!1;var n,o;return(p(e,a,t)||t===r)&&a++,a<l.length})),a-s}(e,0,c=i.slice(l.start,n.end),f))?l.length:0:i.length<a.length&&(m=a.length-i.length),i=a,m&&(1!==m||l.length||(f=l.start===n.start?b(e,n.start):function(e,t){for(var n=t;0<=n;--n)if(!d(e,n))return n;return null}(e,n.start)),i=function(e,t,n,a){var l=n+a,r=e.maskChar,o=e.mask,s=e.prefix,i=t.split("");if(r)return i.map((function(t,a){return a<n||l<=a?t:d(e,a)?o[a]:r})).join("");for(var c=l;c<i.length;c++)d(e,c)&&(i[c]="");return n=Math.max(s.length,n),i.splice(n,l-n),t=i.join(""),E(e,t)}(e,i,f,m)),i=k(e,i,c,f),(f+=u)>=r.length?f=r.length:f<o.length&&!u?f=o.length:f>=o.length&&f<s&&u&&(f=b(e,f)),c||(c=null),{value:i=E(e,i),enteredString:c,selection:{start:f,end:f}}}function N(e){return"function"==typeof e}function O(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame}function S(e){return(O()?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:function(){return setTimeout(e,1e3/60)})(e)}function y(e){(O()||clearTimeout)(e)}var x=function(e){function t(t){var n=e.call(this,t)||this;n.focused=!1,n.mounted=!1,n.previousSelection=null,n.selectionDeferId=null,n.saveSelectionLoopDeferId=null,n.saveSelectionLoop=function(){n.previousSelection=n.getSelection(),n.saveSelectionLoopDeferId=S(n.saveSelectionLoop)},n.runSaveSelectionLoop=function(){null===n.saveSelectionLoopDeferId&&n.saveSelectionLoop()},n.stopSaveSelectionLoop=function(){null!==n.saveSelectionLoopDeferId&&(y(n.saveSelectionLoopDeferId),n.saveSelectionLoopDeferId=null,n.previousSelection=null)},n.getInputDOMNode=function(){if(!n.mounted)return null;var e=r.findDOMNode(i(i(n))),t="undefined"!=typeof window&&e instanceof window.Element;if(e&&!t)return null;if("INPUT"!==e.nodeName&&(e=e.querySelector("input")),!e)throw new Error("react-input-mask: inputComponent doesn't contain input node");return e},n.getInputValue=function(){var e=n.getInputDOMNode();return e?e.value:null},n.setInputValue=function(e){var t=n.getInputDOMNode();t&&(n.value=e,t.value=e)},n.setCursorToEnd=function(){var e=v(n.maskOptions,n.value),t=b(n.maskOptions,e);null!==t&&n.setCursorPosition(t)},n.setSelection=function(e,t,a){void 0===a&&(a={});var l=n.getInputDOMNode(),r=n.isFocused();l&&r&&(a.deferred||u(l,e,t),null!==n.selectionDeferId&&y(n.selectionDeferId),n.selectionDeferId=S((function(){n.selectionDeferId=null,u(l,e,t)})),n.previousSelection={start:e,end:t,length:Math.abs(t-e)})},n.getSelection=function(){return function(e){var t=0,n=0;if("selectionStart"in e&&"selectionEnd"in e)t=e.selectionStart,n=e.selectionEnd;else{var a=document.selection.createRange();a.parentElement()===e&&(t=-a.moveStart("character",-e.value.length),n=-a.moveEnd("character",-e.value.length))}return{start:t,end:n,length:n-t}}(n.getInputDOMNode())},n.getCursorPosition=function(){return n.getSelection().start},n.setCursorPosition=function(e){n.setSelection(e,e)},n.isFocused=function(){return n.focused},n.getBeforeMaskedValueChangeConfig=function(){var e=n.maskOptions,t=e.mask,a=e.maskChar,l=e.permanents,r=e.formatChars;return{mask:t,maskChar:a,permanents:l,alwaysShowMask:!!n.props.alwaysShowMask,formatChars:r}},n.isInputAutofilled=function(e,t,a,l){var r=n.getInputDOMNode();try{if(r.matches(":-webkit-autofill"))return!0}catch(c){}return!n.focused||l.end<a.length&&t.end===e.length},n.onChange=function(e){var t=i(i(n)).beforePasteState,a=i(i(n)).previousSelection,l=n.props.beforeMaskedValueChange,r=n.getInputValue(),o=n.value,s=n.getSelection();n.isInputAutofilled(r,s,o,a)&&(o=E(n.maskOptions,""),a={start:0,end:0,length:0}),t&&(a=t.selection,o=t.value,s={start:a.start+r.length,end:a.start+r.length,length:0},r=o.slice(0,a.start)+r+o.slice(a.end),n.beforePasteState=null);var c=C(n.maskOptions,r,s,o,a),u=c.enteredString,m=c.selection,f=c.value;if(N(l)){var d=l({value:f,selection:m},{value:o,selection:a},u,n.getBeforeMaskedValueChangeConfig());f=d.value,m=d.selection}n.setInputValue(f),N(n.props.onChange)&&n.props.onChange(e),n.isWindowsPhoneBrowser?n.setSelection(m.start,m.end,{deferred:!0}):n.setSelection(m.start,m.end)},n.onFocus=function(e){var t=n.props.beforeMaskedValueChange,a=n.maskOptions,l=a.mask,r=a.prefix;if(n.focused=!0,n.mounted=!0,l){if(n.value)v(n.maskOptions,n.value)<n.maskOptions.mask.length&&n.setCursorToEnd();else{var o=E(n.maskOptions,r),s=E(n.maskOptions,o),i=v(n.maskOptions,s),c=b(n.maskOptions,i),u={start:c,end:c};if(N(t)){var m=t({value:s,selection:u},{value:n.value,selection:null},null,n.getBeforeMaskedValueChangeConfig());s=m.value,u=m.selection}var f=s!==n.getInputValue();f&&n.setInputValue(s),f&&N(n.props.onChange)&&n.props.onChange(e),n.setSelection(u.start,u.end)}n.runSaveSelectionLoop()}N(n.props.onFocus)&&n.props.onFocus(e)},n.onBlur=function(e){var t=n.props.beforeMaskedValueChange,a=n.maskOptions.mask;if(n.stopSaveSelectionLoop(),n.focused=!1,a&&!n.props.alwaysShowMask&&h(n.maskOptions,n.value)){var l="";N(t)&&(l=t({value:l,selection:null},{value:n.value,selection:n.previousSelection},null,n.getBeforeMaskedValueChangeConfig()).value);var r=l!==n.getInputValue();r&&n.setInputValue(l),r&&N(n.props.onChange)&&n.props.onChange(e)}N(n.props.onBlur)&&n.props.onBlur(e)},n.onMouseDown=function(e){if(!n.focused&&document.addEventListener){n.mouseDownX=e.clientX,n.mouseDownY=e.clientY,n.mouseDownTime=(new Date).getTime();document.addEventListener("mouseup",(function e(t){if(document.removeEventListener("mouseup",e),n.focused){var a=Math.abs(t.clientX-n.mouseDownX),l=Math.abs(t.clientY-n.mouseDownY),r=Math.max(a,l),o=(new Date).getTime()-n.mouseDownTime;(r<=10&&o<=200||r<=5&&o<=300)&&n.setCursorToEnd()}}))}N(n.props.onMouseDown)&&n.props.onMouseDown(e)},n.onPaste=function(e){N(n.props.onPaste)&&n.props.onPaste(e),e.defaultPrevented||(n.beforePasteState={value:n.getInputValue(),selection:n.getSelection()},n.setInputValue(""))},n.handleRef=function(e){null==n.props.children&&N(n.props.inputRef)&&n.props.inputRef(e)};var a=t.mask,l=t.maskChar,o=t.formatChars,s=t.alwaysShowMask,c=t.beforeMaskedValueChange,m=t.defaultValue,d=t.value;n.maskOptions=f(a,l,o),null==m&&(m=""),null==d&&(d=m);var p=w(d);if(n.maskOptions.mask&&(s||p)&&(p=E(n.maskOptions,p),N(c))){var g=t.value;null==t.value&&(g=m),p=c({value:p,selection:null},{value:g=w(g),selection:null},null,n.getBeforeMaskedValueChangeConfig()).value}return n.value=p,n}s(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.getInputDOMNode()&&(this.isWindowsPhoneBrowser=function(){var e=new RegExp("windows","i"),t=new RegExp("phone","i"),n=navigator.userAgent;return e.test(n)&&t.test(n)}(),this.maskOptions.mask&&this.getInputValue()!==this.value&&this.setInputValue(this.value))},n.componentDidUpdate=function(){var e=this.previousSelection,t=this.props,n=t.beforeMaskedValueChange,a=t.alwaysShowMask,l=t.mask,r=t.maskChar,o=t.formatChars,s=this.maskOptions,i=a||this.isFocused(),c=null!=this.props.value,u=c?w(this.props.value):this.value,m=e?e.start:null;if(this.maskOptions=f(l,r,o),this.maskOptions.mask){!s.mask&&this.isFocused()&&this.runSaveSelectionLoop();var d=this.maskOptions.mask&&this.maskOptions.mask!==s.mask;if(s.mask||c||(u=this.getInputValue()),(d||this.maskOptions.mask&&(u||i))&&(u=E(this.maskOptions,u)),d){var p=v(this.maskOptions,u);(null===m||p<m)&&(m=g(this.maskOptions,u)?p:b(this.maskOptions,p))}!this.maskOptions.mask||!h(this.maskOptions,u)||i||c&&this.props.value||(u="");var k={start:m,end:m};if(N(n)){var C=n({value:u,selection:k},{value:this.value,selection:this.previousSelection},null,this.getBeforeMaskedValueChangeConfig());u=C.value,k=C.selection}this.value=u;var O=this.getInputValue()!==this.value;O?(this.setInputValue(this.value),this.forceUpdate()):d&&this.forceUpdate();var S=!1;null!=k.start&&null!=k.end&&(S=!e||e.start!==k.start||e.end!==k.end),(S||O)&&this.setSelection(k.start,k.end)}else s.mask&&(this.stopSaveSelectionLoop(),this.forceUpdate())},n.componentWillUnmount=function(){this.mounted=!1,null!==this.selectionDeferId&&y(this.selectionDeferId),this.stopSaveSelectionLoop()},n.render=function(){var e,t=this.props,n=(t.mask,t.alwaysShowMask,t.maskChar,t.formatChars,t.inputRef,t.beforeMaskedValueChange,t.children),a=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],0<=t.indexOf(n)||(l[n]=e[n]);return l}(t,["mask","alwaysShowMask","maskChar","formatChars","inputRef","beforeMaskedValueChange","children"]);if(n){N(n)||c(!1);var r=["onChange","onPaste","onMouseDown","onFocus","onBlur","value","disabled","readOnly"],s=o({},a);r.forEach((function(e){return delete s[e]})),e=n(s),r.filter((function(t){return null!=e.props[t]&&e.props[t]!==a[t]})).length&&c(!1)}else e=l.createElement("input",o({ref:this.handleRef},a));var i={onFocus:this.onFocus,onBlur:this.onBlur};return this.maskOptions.mask&&(a.disabled||a.readOnly||(i.onChange=this.onChange,i.onPaste=this.onPaste,i.onMouseDown=this.onMouseDown),null!=a.value&&(i.value=this.value)),e=l.cloneElement(e,i)},t}(l.Component);e.exports=x},476:function(e,t,n){"use strict";var a=n(0),l=n.n(a),r=n(102),o=n(144);t.a=function(){return l.a.createElement("div",{className:"breadcrumb-area pt-35 pb-35 bg-gray-3"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"breadcrumb-content text-center"},l.a.createElement(o.Breadcrumbs,{separator:l.a.createElement("span",null,"/"),item:r.c,finalItem:"span"}))))}},481:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e){for(var t in e)if(e.hasOwnProperty(t))return!0;return!1}},560:function(e,t,n){"use strict";n.r(t);var a=n(471),l=n(0),r=n.n(l),o=n(478),s=n.n(o),i=n(144),c=n(498),u=n(497),m=n(472),f=n(476),d=n(143),p=n(15),h=(n(481),n(474),n(477),n(21));t.default=Object(d.b)(null,{reset_password:p.J})((function(e){var t=e.location,n=e.reset_password,o=t.pathname,d=Object(l.useState)(""),p=Object(a.a)(d,2),v=p[0],g=p[1],E=Object(l.useState)(!1),k=Object(a.a)(E,2),b=k[0],w=k[1];return b?r.a.createElement(h.a,{to:"/request-sent"}):r.a.createElement(l.Fragment,null,r.a.createElement(s.a,null,r.a.createElement("title",null,"\u041a\u0430\u0440\u043c\u0430\u043d | \u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f"),r.a.createElement("meta",{name:"description",content:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})),r.a.createElement(i.BreadcrumbsItem,{to:"/"},"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),r.a.createElement(i.BreadcrumbsItem,{to:""+o},"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f"),r.a.createElement(m.a,{headerTop:"visible"},r.a.createElement(f.a,null),r.a.createElement("div",{className:"login-register-area pt-100 pb-100"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-7 col-md-12 ml-auto mr-auto"},r.a.createElement("div",{className:"login-register-wrapper"},r.a.createElement(c.a.Container,{defaultActiveKey:"register"},r.a.createElement(u.a,{variant:"pills",className:"login-register-tab-list"},r.a.createElement(u.a.Item,null,r.a.createElement(u.a.Link,{eventKey:"register",className:"text-center",style:{pointerEvents:"none"}},r.a.createElement("h4",null,"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f")))),r.a.createElement(c.a.Content,null,r.a.createElement(c.a.Pane,{eventKey:"register"},r.a.createElement("div",{className:"login-form-container"},r.a.createElement("div",{className:"login-register-form"},r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("input",{type:"email",name:"user-email",placeholder:"Email",onChange:function(e){return g(e.target.value)}}),r.a.createElement("div",{className:"button-box"},r.a.createElement("button",{type:"submit",onClick:function(){return n(v),void w(!0)}},r.a.createElement("span",null,"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))))))))))))))))}))}}]);
//# sourceMappingURL=10.fc78d07d.chunk.js.map