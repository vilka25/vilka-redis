/*
 AngularJS v1.5.6-build.4794+sha.f1f892d
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
 */
(function(V,q){'use strict';function Ba(a,b,c){if(!a)throw Oa("areq",b||"?",c||"required");return a}function Ca(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;ea(a)&&(a=a.join(" "));ea(b)&&(b=b.join(" "));return a+" "+b}function Pa(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function Y(a,b,c){var d="";a=ea(a)?a:a&&S(a)&&a.length?a.split(/\s+/):[];r(a,function(a,f){a&&0<a.length&&(d+=0<f?" ":"",d+=c?b+a:a+b)});return d}function Qa(a){if(a instanceof C)switch(a.length){case 0:return a;
    case 1:if(1===a[0].nodeType)return a;break;default:return C(ta(a))}if(1===a.nodeType)return C(a)}function ta(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Ra(a,b,c){r(b,function(b){a.addClass(b,c)})}function Sa(a,b,c){r(b,function(b){a.removeClass(b,c)})}function W(a){return function(b,c){c.addClass&&(Ra(a,b,c.addClass),c.addClass=null);c.removeClass&&(Sa(a,b,c.removeClass),c.removeClass=null)}}function pa(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
    Q;a.domOperation=function(){a.$$domOperationFired=!0;b();b=Q};a.$$prepared=!0}return a}function ia(a,b){Da(a,b);Ea(a,b)}function Da(a,b){b.from&&(a.css(b.from),b.from=null)}function Ea(a,b){b.to&&(a.css(b.to),b.to=null)}function J(a,b,c){var d=b.options||{};c=c.options||{};var e=(d.addClass||"")+" "+(c.addClass||""),f=(d.removeClass||"")+" "+(c.removeClass||"");a=Ta(a.attr("class"),e,f);c.preparationClasses&&(d.preparationClasses=fa(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
    e=d.domOperation!==Q?d.domOperation:null;Fa(d,c);e&&(d.domOperation=e);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Ta(a,b,c){function d(a){S(a)&&(a=a.split(" "));var b={};r(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);r(b,function(a,b){e[b]=1});c=d(c);r(c,function(a,b){e[b]=1===e[b]?null:-1});var f={addClass:"",removeClass:""};r(e,function(b,c){var d,e;1===b?(d="addClass",
    e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(f[d].length&&(f[d]+=" "),f[d]+=c)});return f}function D(a){return a instanceof q.element?a[0]:a}function Ua(a,b,c){var d="";b&&(d=Y(b,"ng-",!0));c.addClass&&(d=fa(d,Y(c.addClass,"-add")));c.removeClass&&(d=fa(d,Y(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function qa(a,b){var c=b?"-"+b+"s":"";ma(a,[na,c]);return[na,c]}function ua(a,b){var c=b?"paused":"",d=Z+"PlayState";ma(a,[d,c]);return[d,c]}function ma(a,b){a.style[b[0]]=
    b[1]}function fa(a,b){return a?b?a+" "+b:a:b}function Ga(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};r(c,function(a,b){var c=e[a];if(c){var y=c.charAt(0);if("-"===y||"+"===y||0<=y)c=Va(c);0===c&&(c=null);d[b]=c}});return d}function Va(a){var b=0;a=a.split(/\s*,\s*/);r(a,function(a){"s"===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function va(a){return 0===a||null!=a}function Ha(a,b){var c=T,d=a+"s";b?c+="Duration":d+=" linear all";
    return[c,d]}function Ia(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ja(a,b,c){r(c,function(c){a[c]=$(a[c])?a[c]:b.style.getPropertyValue(c)})}var Q=q.noop,Ka=q.copy,Fa=q.extend,C=q.element,r=q.forEach,ea=q.isArray,S=q.isString,wa=q.isObject,F=q.isUndefined,$=q.isDefined,La=q.isFunction,xa=q.isElement,T,ya,Z,za;F(V.ontransitionend)&&
$(V.onwebkittransitionend)?(T="WebkitTransition",ya="webkitTransitionEnd transitionend"):(T="transition",ya="transitionend");F(V.onanimationend)&&$(V.onwebkitanimationend)?(Z="WebkitAnimation",za="webkitAnimationEnd animationend"):(Z="animation",za="animationend");var ra=Z+"Delay",Aa=Z+"Duration",na=T+"Delay",Ma=T+"Duration",Oa=q.$$minErr("ng"),Wa={transitionDuration:Ma,transitionDelay:na,transitionProperty:T+"Property",animationDuration:Aa,animationDelay:ra,animationIterationCount:Z+"IterationCount"},
    Xa={transitionDuration:Ma,transitionDelay:na,animationDuration:Aa,animationDelay:ra};q.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,f,K){var v,y;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){v&&a.leave(v);y&&(y.$destroy(),y=null);if(e||0===e)y=b.$new(),K(y,function(b){v=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           c,d){function e(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var f=d.ngAnimateChildren;q.isString(f)&&0===f.length?c.data("$$ngAnimateChildren",!0):(e(a(f)(b)),d.$observe("ngAnimateChildren",e))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),K=0;K<b.length;K++)b[K]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",
    ["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);r(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return f[a].some(function(a){return a(b,c,d)})}function e(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var f=this.rules={skip:[],cancel:[],join:[]};f.join.push(function(a,b,c){return!b.structural&&e(b)});f.skip.push(function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       b,c){return!b.structural&&!e(b)});f.skip.push(function(a,b,c){return"leave"===c.event&&b.structural});f.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});f.cancel.push(function(a,b,c){return c.structural&&b.structural});f.cancel.push(function(a,b,c){return 2===c.state&&b.structural});f.cancel.push(function(a,b,d){if(d.structural)return!1;a=b.addClass;b=b.removeClass;var e=d.addClass;d=d.removeClass;return F(a)&&F(b)||F(e)&&F(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope",
        "$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow","$$isDocumentHidden",function(b,c,f,u,R,Ya,z,sa,A,N,L){function H(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function s(a,b,c){var g=D(b),d=D(a),s=[];(a=l[c])&&r(a,function(a){x.call(a.node,g)?s.push(a.callback):"leave"===c&&x.call(a.node,d)&&s.push(a.callback)});return s}function p(a,b,c){var g=ta(b);return a.filter(function(a){return!(a.node===g&&(!c||
        a.callback===c))})}function t(a,I,w){function k(c,g,d,h){f(function(){var c=s(N,a,g);c.length?b(function(){r(c,function(b){b(a,d,h)});"close"!==d||a[0].parentNode||ca.off(a)}):"close"!==d||a[0].parentNode||ca.off(a)});c.progress(g,d,h)}function l(b){var c=a,g=h;g.preparationClasses&&(c.removeClass(g.preparationClasses),g.preparationClasses=null);g.activeClasses&&(c.removeClass(g.activeClasses),g.activeClasses=null);Na(a,h);ia(a,h);h.domOperation();p.complete(!b)}var h=Ka(w),t,N;if(a=Qa(a))t=D(a),
            N=a.parent();var h=pa(h),p=new z,f=H();ea(h.addClass)&&(h.addClass=h.addClass.join(" "));h.addClass&&!S(h.addClass)&&(h.addClass=null);ea(h.removeClass)&&(h.removeClass=h.removeClass.join(" "));h.removeClass&&!S(h.removeClass)&&(h.removeClass=null);h.from&&!wa(h.from)&&(h.from=null);h.to&&!wa(h.to)&&(h.to=null);if(!t)return l(),p;w=[t.getAttribute("class"),h.addClass,h.removeClass].join(" ");if(!G(w))return l(),p;var y=0<=["enter","move","leave"].indexOf(I),x=L(),u=!oa||x||g.get(t);w=!u&&B.get(t)||
            {};var da=!!w.state;u||da&&1===w.state||(u=!O(a,N,I));if(u)return x&&k(p,I,"start"),l(),x&&k(p,I,"close"),p;y&&ka(a);x={structural:y,element:a,event:I,addClass:h.addClass,removeClass:h.removeClass,close:l,options:h,runner:p};if(da){if(d("skip",a,x,w)){if(2===w.state)return l(),p;J(a,w,x);return w.runner}if(d("cancel",a,x,w))if(2===w.state)w.runner.end();else if(w.structural)w.close();else return J(a,w,x),w.runner;else if(d("join",a,x,w))if(2===w.state)J(a,x,{});else return Ua(a,y?I:null,h),I=x.event=
            w.event,h=J(a,w,x),w.runner}else J(a,x,{});(da=x.structural)||(da="animate"===x.event&&0<Object.keys(x.options.to||{}).length||e(x));if(!da)return l(),m(a),p;var A=(w.counter||0)+1;x.counter=A;P(a,1,x);c.$$postDigest(function(){var b=B.get(t),c=!b,b=b||{},g=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||e(b));if(c||b.counter!==A||!g){c&&(Na(a,h),ia(a,h));if(c||y&&b.event!==I)h.domOperation(),p.end();g||m(a)}else I=!b.structural&&e(b,!0)?"setClass":b.event,P(a,2),b=Ya(a,I,b.options),
            p.setHost(b),k(p,I,"start",{}),b.done(function(b){l(!b);(b=B.get(t))&&b.counter===A&&m(D(a));k(p,I,"close",{})})});return p}function ka(a){a=D(a).querySelectorAll("[data-ng-animate]");r(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=B.get(a);if(c)switch(b){case 2:c.runner.end();case 1:B.remove(a)}})}function m(a){a=D(a);a.removeAttribute("data-ng-animate");B.remove(a)}function h(a,b){return D(a)===D(b)}function O(a,b,c){c=C(u[0].body);var d=h(a,c)||"HTML"===a[0].nodeName,s=h(a,
            f),k=!1,l,e=g.get(D(a));(a=C.data(a[0],"$ngAnimatePin"))&&(b=a);for(b=D(b);b;){s||(s=h(b,f));if(1!==b.nodeType)break;a=B.get(b)||{};if(!k){var p=g.get(b);if(!0===p&&!1!==e){e=!0;break}else!1===p&&(e=!1);k=a.structural}if(F(l)||!0===l)a=C.data(b,"$$ngAnimateChildren"),$(a)&&(l=a);if(k&&!1===l)break;d||(d=h(b,c));if(d&&s)break;if(!s&&(a=C.data(b,"$ngAnimatePin"))){b=D(a);continue}b=b.parentNode}return(!k||l)&&!0!==e&&s&&d}function P(a,b,c){c=c||{};c.state=b;a=D(a);a.setAttribute("data-ng-animate",b);
            c=(b=B.get(a))?Fa(b,c):c;B.put(a,c)}var B=new R,g=new R,oa=null,k=c.$watch(function(){return 0===sa.totalPendingRequests},function(a){a&&(k(),c.$$postDigest(function(){c.$$postDigest(function(){null===oa&&(oa=!0)})}))}),l={},da=a.classNameFilter(),G=da?function(a){return da.test(a)}:function(){return!0},Na=W(A),x=V.Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&16)},ca={on:function(a,b,c){var g=ta(b);l[a]=l[a]||[];l[a].push({node:g,callback:c});C(b).on("$destroy",
            function(){B.get(g)||ca.off(a,b,c)})},off:function(a,b,c){if(1!==arguments.length||q.isString(arguments[0])){var g=l[a];g&&(l[a]=1===arguments.length?null:p(g,b,c))}else for(g in b=arguments[0],l)l[g]=p(l[g],b)},pin:function(a,b){Ba(xa(a),"element","not an element");Ba(xa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,g){c=c||{};c.domOperation=g;return t(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!oa;else if(xa(a)){var d=D(a),h=g.get(d);1===
        c?b=!h:g.put(d,!b)}else b=oa=!!a;return b}};return ca}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,e,f,K,v,y){function u(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,t=d.parentNode;e.put(d,a);for(var f;t;){if(f=e.get(t)){f.processed||(f=b(f));break}t=t.parentNode}(f||c).children.push(a);
    return a}var c={children:[]},d,e=new v;for(d=0;d<a.length;d++){var f=a[d];e.put(f.domNode,a[d]={domNode:f.domNode,fn:f.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,h=[];for(d=0;d<c.length;d++){var f=c[d];0>=a&&(a=e,e=0,b.push(h),h=[]);h.push(f.fn);f.children.forEach(function(a){e++;c.push(a)});a--}h.length&&b.push(h);return b}(c)}var R=[],q=W(a);return function(z,v,A){function N(a){a=a.hasAttribute("ng-animate-ref")?
    [a]:a.querySelectorAll("[ng-animate-ref]");var b=[];r(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function L(a){var b=[],c={};r(a,function(a,g){var d=D(a.element),h=0<=["enter","move"].indexOf(a.event),d=a.structural?N(d):[];if(d.length){var e=h?"to":"from";r(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][e]={animationID:g,element:C(a)}})}else b.push(a)});var d={},h={};r(c,function(c,e){var k=c.from,s=c.to;if(k&&s){var f=a[k.animationID],
    p=a[s.animationID],t=k.animationID.toString();if(!h[t]){var B=h[t]={structural:!0,beforeStart:function(){f.beforeStart();p.beforeStart()},close:function(){f.close();p.close()},classes:H(f.classes,p.classes),from:f,to:p,anchors:[]};B.classes.length?b.push(B):(b.push(f),b.push(p))}h[t].anchors.push({out:k.element,"in":s.element})}else k=k?k.animationID:s.animationID,s=k.toString(),d[s]||(d[s]=!0,b.push(a[k]))});return b}function H(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var h=
    a[d];if("ng-"!==h.substring(0,3))for(var e=0;e<b.length;e++)if(h===b[e]){c.push(h);break}}return c.join(" ")}function s(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(f.has(d)&&(d=f.get(d)(a)))return d}}function p(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function t(){var a=b(z);!a||"leave"===v&&A.$$domOperationFired||a.end()}function ka(b){z.off("$destroy",t);z.removeData("$$animationRunner");q(z,A);ia(z,A);A.domOperation();P&&a.removeClass(z,
    P);z.removeClass("ng-animate");h.complete(!b)}A=pa(A);var m=0<=["enter","move","leave"].indexOf(v),h=new K({end:function(){ka()},cancel:function(){ka(!0)}});if(!c.length)return ka(),h;z.data("$$animationRunner",h);var O=Ca(z.attr("class"),Ca(A.addClass,A.removeClass)),P=A.tempClasses;P&&(O+=" "+P,A.tempClasses=null);var B;m&&(B="ng-"+v+"-prepare",a.addClass(z,B));R.push({element:z,classes:O,event:v,structural:m,options:A,beforeStart:function(){z.addClass("ng-animate");P&&a.addClass(z,P);B&&(a.removeClass(z,
    B),B=null)},close:ka});z.on("$destroy",t);if(1<R.length)return h;e.$$postDigest(function(){var a=[];r(R,function(c){b(c.element)?a.push(c):c.close()});R.length=0;var c=L(a),d=[];r(c,function(a){d.push({domNode:D(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var g=s(a);g&&(c=g.start)}c?(c=c(),c.done(function(a){d(!a)}),p(a,c)):d()}})});y(u(d))});return h}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=
    Ia(),c=Ia();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,f,K,v,y,u,R){function q(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++L))+"-"+a.getAttribute("class")+"-"+b}function z(s,f,t,N){var m;0<b.count(t)&&(m=c.get(t),m||(f=Y(f,"-stagger"),e.addClass(s,f),m=Ga(a,s,N),m.animationDuration=Math.max(m.animationDuration,0),m.transitionDuration=Math.max(m.transitionDuration,0),e.removeClass(s,
    f),c.put(t,m)));return m||{}}function sa(a){H.push(a);u.waitUntilQuiet(function(){b.flush();c.flush();for(var a=v(),d=0;d<H.length;d++)H[d](a);H.length=0})}function A(c,e,f){e=b.get(f);e||(e=Ga(a,c,Wa),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(f,e);c=e;f=c.animationDelay;e=c.transitionDelay;c.maxDelay=f&&e?Math.max(f,e):f||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var N=W(e),L=0,H=[];return function(a,c){function d(){m()}
    function u(){m(!0)}function m(b){if(!(L||ca&&x)){L=!0;x=!1;g.$$skipPreparationClasses||e.removeClass(a,ha);e.removeClass(a,fa);ua(k,!1);qa(k,!1);r(l,function(a){k.style[a[0]]=""});N(a,g);ia(a,g);Object.keys(H).length&&r(H,function(a,b){a?k.style.setProperty(b,a):k.style.removeProperty(b)});if(g.onDone)g.onDone();ga&&ga.length&&a.off(ga.join(" "),P);var c=a.data("$$animateCss");c&&(K.cancel(c[0].timer),a.removeData("$$animateCss"));C&&C.complete(!b)}}function h(a){n.blockTransition&&qa(k,a);n.blockKeyframeAnimation&&
    ua(k,!!a)}function O(){C=new f({end:d,cancel:u});sa(Q);m();return{$$willAnimate:!1,start:function(){return C},end:d}}function P(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-V,0)>=F&&b>=M&&(ca=!0,m())}function B(){function b(){if(!L){h(!1);r(l,function(a){k.style[a[0]]=a[1]});N(a,g);e.addClass(a,fa);if(n.recalculateTimingStyles){J=k.getAttribute("class")+" "+ha;la=q(k,J);E=A(k,J,la);aa=E.maxDelay;w=Math.max(aa,0);
        M=E.maxDuration;if(0===M){m();return}n.hasTransitions=0<E.transitionDuration;n.hasAnimations=0<E.animationDuration}n.applyAnimationDelay&&(aa="boolean"!==typeof g.delay&&va(g.delay)?parseFloat(g.delay):aa,w=Math.max(aa,0),E.animationDelay=aa,ba=[ra,aa+"s"],l.push(ba),k.style[ba[0]]=ba[1]);F=1E3*w;S=1E3*M;if(g.easing){var d,f=g.easing;n.hasTransitions&&(d=T+"TimingFunction",l.push([d,f]),k.style[d]=f);n.hasAnimations&&(d=Z+"TimingFunction",l.push([d,f]),k.style[d]=f)}E.transitionDuration&&ga.push(ya);
        E.animationDuration&&ga.push(za);V=Date.now();var B=F+1.5*S;d=V+B;var f=a.data("$$animateCss")||[],y=!0;if(f.length){var p=f[0];(y=d>p.expectedEndTime)?K.cancel(p.timer):f.push(m)}y&&(B=K(c,B,!1),f[0]={timer:B,expectedEndTime:d},f.push(m),a.data("$$animateCss",f));if(ga.length)a.on(ga.join(" "),P);g.to&&(g.cleanupStyles&&Ja(H,k,Object.keys(g.to)),Ea(a,g))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!L)if(k.parentNode){var d=function(a){if(ca)x&&
    a&&(x=!1,m());else if(x=!a,E.animationDuration)if(a=ua(k,x),x)l.push(a);else{var b=l,c=b.indexOf(a);0<=a&&b.splice(c,1)}},f=0<$&&(E.transitionDuration&&0===X.transitionDuration||E.animationDuration&&0===X.animationDuration)&&Math.max(X.animationDelay,X.transitionDelay);f?K(b,Math.floor(f*$*1E3),!1):b();I.resume=function(){d(!0)};I.pause=function(){d(!1)}}else m()}var g=c||{};g.$$prepared||(g=pa(Ka(g)));var H={},k=D(a);if(!k||!k.parentNode||!R.enabled())return O();var l=[],v=a.attr("class"),G=Pa(g),
        L,x,ca,C,I,w,F,M,S,V,ga=[];if(0===g.duration||!y.animations&&!y.transitions)return O();var ja=g.event&&ea(g.event)?g.event.join(" "):g.event,W="",U="";ja&&g.structural?W=Y(ja,"ng-",!0):ja&&(W=ja);g.addClass&&(U+=Y(g.addClass,"-add"));g.removeClass&&(U.length&&(U+=" "),U+=Y(g.removeClass,"-remove"));g.applyClassesEarly&&U.length&&N(a,g);var ha=[W,U].join(" ").trim(),J=v+" "+ha,fa=Y(ha,"-active"),v=G.to&&0<Object.keys(G.to).length;if(!(0<(g.keyframeStyle||"").length||v||ha))return O();var la,X;0<g.stagger?
        (G=parseFloat(g.stagger),X={transitionDelay:G,animationDelay:G,transitionDuration:0,animationDuration:0}):(la=q(k,J),X=z(k,ha,la,Xa));g.$$skipPreparationClasses||e.addClass(a,ha);g.transitionStyle&&(G=[T,g.transitionStyle],ma(k,G),l.push(G));0<=g.duration&&(G=0<k.style[T].length,G=Ha(g.duration,G),ma(k,G),l.push(G));g.keyframeStyle&&(G=[Z,g.keyframeStyle],ma(k,G),l.push(G));var $=X?0<=g.staggerIndex?g.staggerIndex:b.count(la):0;(ja=0===$)&&!g.skipBlocking&&qa(k,9999);var E=A(k,J,la),aa=E.maxDelay;
    w=Math.max(aa,0);M=E.maxDuration;var n={};n.hasTransitions=0<E.transitionDuration;n.hasAnimations=0<E.animationDuration;n.hasTransitionAll=n.hasTransitions&&"all"===E.transitionProperty;n.applyTransitionDuration=v&&(n.hasTransitions&&!n.hasTransitionAll||n.hasAnimations&&!n.hasTransitions);n.applyAnimationDuration=g.duration&&n.hasAnimations;n.applyTransitionDelay=va(g.delay)&&(n.applyTransitionDuration||n.hasTransitions);n.applyAnimationDelay=va(g.delay)&&n.hasAnimations;n.recalculateTimingStyles=
        0<U.length;if(n.applyTransitionDuration||n.applyAnimationDuration)M=g.duration?parseFloat(g.duration):M,n.applyTransitionDuration&&(n.hasTransitions=!0,E.transitionDuration=M,G=0<k.style[T+"Property"].length,l.push(Ha(M,G))),n.applyAnimationDuration&&(n.hasAnimations=!0,E.animationDuration=M,l.push([Aa,M+"s"]));if(0===M&&!n.recalculateTimingStyles)return O();if(null!=g.delay){var ba;"boolean"!==typeof g.delay&&(ba=parseFloat(g.delay),w=Math.max(ba,0));n.applyTransitionDelay&&l.push([na,ba+"s"]);n.applyAnimationDelay&&
    l.push([ra,ba+"s"])}null==g.duration&&0<E.transitionDuration&&(n.recalculateTimingStyles=n.recalculateTimingStyles||ja);F=1E3*w;S=1E3*M;g.skipBlocking||(n.blockTransition=0<E.transitionDuration,n.blockKeyframeAnimation=0<E.animationDuration&&0<X.animationDelay&&0===X.animationDuration);g.from&&(g.cleanupStyles&&Ja(H,k,Object.keys(g.from)),Da(a,g));n.blockTransition||n.blockKeyframeAnimation?h(M):g.skipBlocking||qa(k,!1);return{$$willAnimate:!0,end:d,start:function(){if(!L)return I={end:d,cancel:u,
        resume:null,pause:null},C=new f(I),sa(B),C}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,f,K,v){function y(a){return a.replace(/\bng-\S+\b/g,"")}function u(a,b){S(a)&&(a=a.split(" "));S(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function R(c,e,f){function s(a){var b={},c=D(a).getBoundingClientRect();
    r(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=F.scrollTop;break;case "left":d+=F.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function p(){var c=y(f.attr("class")||""),d=u(c,m),c=u(m,c),d=a(v,{to:s(f),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function t(){v.remove();e.removeClass("ng-animate-shim");f.removeClass("ng-animate-shim")}var v=C(D(e).cloneNode(!0)),m=y(v.attr("class")||"");e.addClass("ng-animate-shim");
    f.addClass("ng-animate-shim");v.addClass("ng-anchor");A.append(v);var h;c=function(){var c=a(v,{addClass:"ng-anchor-out",delay:!0,from:s(e)});return c.$$willAnimate?c:null}();if(!c&&(h=p(),!h))return t();var O=c||h;return{start:function(){function a(){c&&c.end()}var b,c=O.start();c.done(function(){c=null;if(!h&&(h=p()))return c=h.start(),c.done(function(){c=null;t();b.complete()}),c;t();b.complete()});return b=new d({end:a,cancel:a})}}}function q(a,b,c,e){var f=z(a,Q),y=z(b,Q),v=[];r(e,function(a){(a=
    R(c,a.out,a["in"]))&&v.push(a)});if(f||y||0!==v.length)return{start:function(){function a(){r(b,function(a){a.end()})}var b=[];f&&b.push(f.start());y&&b.push(y.start());r(v,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function z(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=fa(e.event,e.preparationClasses));
    c=a(d,e);return c.$$willAnimate?c:null}if(!f.animations&&!f.transitions)return Q;var F=v[0].body;c=D(e);var A=C(c.parentNode&&11===c.parentNode.nodeType||F.contains(c)?c:F);W(K);return function(a){return a.from&&a.to?q(a.from,a.to,a.classes,a.anchors):z(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=ea(c)?c:c.split(" ");for(var d=[],e={},f=0;f<c.length;f++){var r=c[f],q=a.$$registeredAnimations[r];
    q&&!e[r]&&(d.push(b.get(q)),e[r]=!0)}return d}var f=W(d);return function(a,b,d,u){function q(){u.domOperation();f(a,u)}function D(a,b,d,e,g){switch(d){case "animate":b=[b,e.from,e.to,g];break;case "setClass":b=[b,F,L,g];break;case "addClass":b=[b,F,g];break;case "removeClass":b=[b,L,g];break;default:b=[b,g]}b.push(e);if(a=a.apply(a,b))if(La(a.start)&&(a=a.start()),a instanceof c)a.done(g);else if(La(a))return a;return Q}function z(a,b,d,e,g){var f=[];r(e,function(e){var l=e[g];l&&f.push(function(){var e,
    g,f=!1,k=function(a){f||(f=!0,(g||Q)(a),e.complete(!a))};e=new c({end:function(){k()},cancel:function(){k(!0)}});g=D(l,a,b,d,function(a){k(!1===a)});return e})});return f}function C(a,b,d,e,g){var f=z(a,b,d,e,g);if(0===f.length){var k,l;"beforeSetClass"===g?(k=z(a,"removeClass",d,e,"beforeRemoveClass"),l=z(a,"addClass",d,e,"beforeAddClass")):"setClass"===g&&(k=z(a,"removeClass",d,e,"removeClass"),l=z(a,"addClass",d,e,"addClass"));k&&(f=f.concat(k));l&&(f=f.concat(l))}if(0!==f.length)return function(a){var b=
    [];f.length&&r(f,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){r(b,function(b){a?b.cancel():b.end()})}}}var A=!1;3===arguments.length&&wa(d)&&(u=d,d=null);u=pa(u);d||(d=a.attr("class")||"",u.addClass&&(d+=" "+u.addClass),u.removeClass&&(d+=" "+u.removeClass));var F=u.addClass,L=u.removeClass,H=e(d),s,p;if(H.length){var t,J;"leave"===b?(J="leave",t="afterLeave"):(J="before"+b.charAt(0).toUpperCase()+b.substr(1),t=b);"enter"!==b&&"move"!==b&&(s=C(a,b,u,H,J));p=C(a,b,u,H,t)}if(s||
    p){var m;return{$$willAnimate:!0,end:function(){m?m.end():(A=!0,q(),ia(a,u),m=new c,m.complete(!0));return m},start:function(){function b(c){A=!0;q();ia(a,u);m.complete(c)}if(m)return m;m=new c;var d,e=[];s&&e.push(function(a){d=s(a)});e.length?e.push(function(a){q();a(!0)}):q();p&&e.push(function(a){d=p(a)});m.setHost({end:function(){A||((d||Q)(void 0),b(void 0))},cancel:function(){A||((d||Q)(!0),b(!0))}});c.chain(e,b);return m}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");
    this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),q=d(a.to);if(b||q)return{start:function(){function a(){return function(){r(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());q&&d.push(q.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map