(function(e){function n(n){for(var t,r,u=n[0],s=n[1],l=n[2],c=0,f=[];c<u.length;c++)r=u[c],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t]);d&&d(n);while(f.length)f.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var e,n=0;n<a.length;n++){for(var o=a[n],t=!0,r=1;r<o.length;r++){var u=o[r];0!==i[u]&&(t=!1)}t&&(a.splice(n--,1),e=s(s.s=o[0]))}return e}var t={},r={app:0},i={app:0},a=[];function u(e){return s.p+"js/"+({"inout~login":"inout~login",inout:"inout",login:"login"}[e]||e)+"."+{"inout~login":"1af14f5d",inout:"43c3800d",login:"264f7893"}[e]+".js"}function s(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.e=function(e){var n=[],o={"inout~login":1,inout:1,login:1};r[e]?n.push(r[e]):0!==r[e]&&o[e]&&n.push(r[e]=new Promise((function(n,o){for(var t="css/"+({"inout~login":"inout~login",inout:"inout",login:"login"}[e]||e)+"."+{"inout~login":"4e72f3e1",inout:"f10f1434",login:"d7711ebf"}[e]+".css",i=s.p+t,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],c=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(c===t||c===i))return n()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){l=f[u],c=l.getAttribute("data-href");if(c===t||c===i)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var t=n&&n.target&&n.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=t,delete r[e],d.parentNode.removeChild(d),o(a)},d.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){r[e]=0})));var t=i[e];if(0!==t)if(t)n.push(t[2]);else{var a=new Promise((function(n,o){t=i[e]=[n,o]}));n.push(t[2]=a);var l,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=u(e);var f=new Error;l=function(n){c.onerror=c.onload=null,clearTimeout(d);var o=i[e];if(0!==o){if(o){var t=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+t+": "+r+")",f.name="ChunkLoadError",f.type=t,f.request=r,o[1](f)}i[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:c})}),12e4);c.onerror=c.onload=l,document.head.appendChild(c)}return Promise.all(n)},s.m=e,s.c=t,s.d=function(e,n,o){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)s.d(o,t,function(n){return e[n]}.bind(null,t));return o},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=n,l=l.slice();for(var f=0;f<l.length;f++)n(l[f]);var d=c;a.push([0,"chunk-vendors"]),o()})({0:function(e,n,o){e.exports=o("56d7")},"034f":function(e,n,o){"use strict";var t=o("8a23"),r=o.n(t);r.a},"56d7":function(e,n,o){"use strict";o.r(n);o("e260"),o("e6cf"),o("cca6"),o("a79d");var t=o("2b0e"),r=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("v-app",[o("v-content",[o("v-container",{attrs:{fluid:"","fill-height":""}},[e.isMobile?o("router-view",{attrs:{session:e.session,version:e.version},on:{childLogout:e.logout}}):o("div",[e._v("We're sorry but CoralHR Lite doesn't work properly on non Android/iOS")])],1)],1)],1)},i=[],a={name:"App",data:function(){return{session:{},isMobile:!0,version:"v20200708"}},mounted:function(){console.log("version: ",this.version)},methods:{checkIsMobile:function(){var e=navigator.userAgent||navigator.vendor||window.opera;/android/i.test(e)||/iPad|iPhone|iPod/.test(e)&&!window.MSStream?this.isMobile=!0:this.isMobile=!1},checkSession:function(){this.session=JSON.parse(localStorage.getItem("CORALHR_LITE_SESSION")||"{}"),this.session.key&&"/login"==this.$route.path?this.$router.push("/"):this.session.key||"/login"==this.$route.path||this.$router.push("/login")},logout:function(){localStorage.removeItem("CORALHR_LITE_SESSION"),this.checkSession()}},watch:{$route:function(e,n){this.checkSession()}}},u=a,s=(o("034f"),o("2877")),l=o("6544"),c=o.n(l),f=o("7496"),d=o("a523"),p=o("a75b"),g=Object(s["a"])(u,r,i,!1,null,null,null),h=g.exports;c()(g,{VApp:f["a"],VContainer:d["a"],VContent:p["a"]});var v=o("9483");Object(v["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});o("d3b7");var m=o("8c4f");t["a"].use(m["a"]);var b=new m["a"]({routes:[{path:"/",name:"inout",component:function(){return Promise.all([o.e("inout~login"),o.e("inout")]).then(o.bind(null,"3403"))}},{path:"/login",name:"login",component:function(){return Promise.all([o.e("inout~login"),o.e("login")]).then(o.bind(null,"578a"))}}]}),y=o("f309");t["a"].use(y["a"]);var w=new y["a"]({});t["a"].config.productionTip=!1,t["a"].use(o("2ead")),window["app"]=new t["a"]({router:b,vuetify:w,render:function(e){return e(h)}}).$mount("#app")},"8a23":function(e,n,o){}});
//# sourceMappingURL=app.bf804562.js.map