(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(r){if(r.ep)return;r.ep=!0;const l=i(r);fetch(r.href,l)}})();function zf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fc={exports:{}},Yr={},pc={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tn=Symbol.for("react.element"),_f=Symbol.for("react.portal"),Tf=Symbol.for("react.fragment"),Nf=Symbol.for("react.strict_mode"),Mf=Symbol.for("react.profiler"),jf=Symbol.for("react.provider"),Pf=Symbol.for("react.context"),Af=Symbol.for("react.forward_ref"),$f=Symbol.for("react.suspense"),If=Symbol.for("react.memo"),Rf=Symbol.for("react.lazy"),Go=Symbol.iterator;function Of(e){return e===null||typeof e!="object"?null:(e=Go&&e[Go]||e["@@iterator"],typeof e=="function"?e:null)}var gc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hc=Object.assign,yc={};function zi(e,t,i){this.props=e,this.context=t,this.refs=yc,this.updater=i||gc}zi.prototype.isReactComponent={};zi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};zi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function mc(){}mc.prototype=zi.prototype;function Ks(e,t,i){this.props=e,this.context=t,this.refs=yc,this.updater=i||gc}var Xs=Ks.prototype=new mc;Xs.constructor=Ks;hc(Xs,zi.prototype);Xs.isPureReactComponent=!0;var Qo=Array.isArray,vc=Object.prototype.hasOwnProperty,qs={current:null},wc={key:!0,ref:!0,__self:!0,__source:!0};function xc(e,t,i){var n,r={},l=null,s=null;if(t!=null)for(n in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(l=""+t.key),t)vc.call(t,n)&&!wc.hasOwnProperty(n)&&(r[n]=t[n]);var o=arguments.length-2;if(o===1)r.children=i;else if(1<o){for(var a=Array(o),d=0;d<o;d++)a[d]=arguments[d+2];r.children=a}if(e&&e.defaultProps)for(n in o=e.defaultProps,o)r[n]===void 0&&(r[n]=o[n]);return{$$typeof:Tn,type:e,key:l,ref:s,props:r,_owner:qs.current}}function Ff(e,t){return{$$typeof:Tn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zs(e){return typeof e=="object"&&e!==null&&e.$$typeof===Tn}function Df(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(i){return t[i]})}var Yo=/\/+/g;function pl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Df(""+e.key):t.toString(36)}function ir(e,t,i,n,r){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Tn:case _f:s=!0}}if(s)return s=e,r=r(s),e=n===""?"."+pl(s,0):n,Qo(r)?(i="",e!=null&&(i=e.replace(Yo,"$&/")+"/"),ir(r,t,i,"",function(d){return d})):r!=null&&(Zs(r)&&(r=Ff(r,i+(!r.key||s&&s.key===r.key?"":(""+r.key).replace(Yo,"$&/")+"/")+e)),t.push(r)),1;if(s=0,n=n===""?".":n+":",Qo(e))for(var o=0;o<e.length;o++){l=e[o];var a=n+pl(l,o);s+=ir(l,t,i,a,r)}else if(a=Of(e),typeof a=="function")for(e=a.call(e),o=0;!(l=e.next()).done;)l=l.value,a=n+pl(l,o++),s+=ir(l,t,i,a,r);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function On(e,t,i){if(e==null)return e;var n=[],r=0;return ir(e,n,"","",function(l){return t.call(i,l,r++)}),n}function Hf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i)},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},nr={transition:null},Bf={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:nr,ReactCurrentOwner:qs};function kc(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:On,forEach:function(e,t,i){On(e,function(){t.apply(this,arguments)},i)},count:function(e){var t=0;return On(e,function(){t++}),t},toArray:function(e){return On(e,function(t){return t})||[]},only:function(e){if(!Zs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=zi;P.Fragment=Tf;P.Profiler=Mf;P.PureComponent=Ks;P.StrictMode=Nf;P.Suspense=$f;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bf;P.act=kc;P.cloneElement=function(e,t,i){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=hc({},e.props),r=e.key,l=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,s=qs.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(a in t)vc.call(t,a)&&!wc.hasOwnProperty(a)&&(n[a]=t[a]===void 0&&o!==void 0?o[a]:t[a])}var a=arguments.length-2;if(a===1)n.children=i;else if(1<a){o=Array(a);for(var d=0;d<a;d++)o[d]=arguments[d+2];n.children=o}return{$$typeof:Tn,type:e.type,key:r,ref:l,props:n,_owner:s}};P.createContext=function(e){return e={$$typeof:Pf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:jf,_context:e},e.Consumer=e};P.createElement=xc;P.createFactory=function(e){var t=xc.bind(null,e);return t.type=e,t};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:Af,render:e}};P.isValidElement=Zs;P.lazy=function(e){return{$$typeof:Rf,_payload:{_status:-1,_result:e},_init:Hf}};P.memo=function(e,t){return{$$typeof:If,type:e,compare:t===void 0?null:t}};P.startTransition=function(e){var t=nr.transition;nr.transition={};try{e()}finally{nr.transition=t}};P.unstable_act=kc;P.useCallback=function(e,t){return me.current.useCallback(e,t)};P.useContext=function(e){return me.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return me.current.useDeferredValue(e)};P.useEffect=function(e,t){return me.current.useEffect(e,t)};P.useId=function(){return me.current.useId()};P.useImperativeHandle=function(e,t,i){return me.current.useImperativeHandle(e,t,i)};P.useInsertionEffect=function(e,t){return me.current.useInsertionEffect(e,t)};P.useLayoutEffect=function(e,t){return me.current.useLayoutEffect(e,t)};P.useMemo=function(e,t){return me.current.useMemo(e,t)};P.useReducer=function(e,t,i){return me.current.useReducer(e,t,i)};P.useRef=function(e){return me.current.useRef(e)};P.useState=function(e){return me.current.useState(e)};P.useSyncExternalStore=function(e,t,i){return me.current.useSyncExternalStore(e,t,i)};P.useTransition=function(){return me.current.useTransition()};P.version="18.3.1";pc.exports=P;var I=pc.exports;const Uf=zf(I);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wf=I,Vf=Symbol.for("react.element"),Gf=Symbol.for("react.fragment"),Qf=Object.prototype.hasOwnProperty,Yf=Wf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kf={key:!0,ref:!0,__self:!0,__source:!0};function bc(e,t,i){var n,r={},l=null,s=null;i!==void 0&&(l=""+i),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(s=t.ref);for(n in t)Qf.call(t,n)&&!Kf.hasOwnProperty(n)&&(r[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)r[n]===void 0&&(r[n]=t[n]);return{$$typeof:Vf,type:e,key:l,ref:s,props:r,_owner:Yf.current}}Yr.Fragment=Gf;Yr.jsx=bc;Yr.jsxs=bc;fc.exports=Yr;var p=fc.exports,Kl={},Sc={exports:{}},Te={},Cc={exports:{}},Ec={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(C,T){var M=C.length;C.push(T);e:for(;0<M;){var K=M-1>>>1,le=C[K];if(0<r(le,T))C[K]=T,C[M]=le,M=K;else break e}}function i(C){return C.length===0?null:C[0]}function n(C){if(C.length===0)return null;var T=C[0],M=C.pop();if(M!==T){C[0]=M;e:for(var K=0,le=C.length,In=le>>>1;K<In;){var Mt=2*(K+1)-1,fl=C[Mt],jt=Mt+1,Rn=C[jt];if(0>r(fl,M))jt<le&&0>r(Rn,fl)?(C[K]=Rn,C[jt]=M,K=jt):(C[K]=fl,C[Mt]=M,K=Mt);else if(jt<le&&0>r(Rn,M))C[K]=Rn,C[jt]=M,K=jt;else break e}}return T}function r(C,T){var M=C.sortIndex-T.sortIndex;return M!==0?M:C.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var s=Date,o=s.now();e.unstable_now=function(){return s.now()-o}}var a=[],d=[],y=1,h=null,g=3,w=!1,x=!1,k=!1,O=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function c(C){for(var T=i(d);T!==null;){if(T.callback===null)n(d);else if(T.startTime<=C)n(d),T.sortIndex=T.expirationTime,t(a,T);else break;T=i(d)}}function m(C){if(k=!1,c(C),!x)if(i(a)!==null)x=!0,ul(S);else{var T=i(d);T!==null&&dl(m,T.startTime-C)}}function S(C,T){x=!1,k&&(k=!1,f(z),z=-1),w=!0;var M=g;try{for(c(T),h=i(a);h!==null&&(!(h.expirationTime>T)||C&&!Oe());){var K=h.callback;if(typeof K=="function"){h.callback=null,g=h.priorityLevel;var le=K(h.expirationTime<=T);T=e.unstable_now(),typeof le=="function"?h.callback=le:h===i(a)&&n(a),c(T)}else n(a);h=i(a)}if(h!==null)var In=!0;else{var Mt=i(d);Mt!==null&&dl(m,Mt.startTime-T),In=!1}return In}finally{h=null,g=M,w=!1}}var E=!1,L=null,z=-1,Y=5,A=-1;function Oe(){return!(e.unstable_now()-A<Y)}function Ni(){if(L!==null){var C=e.unstable_now();A=C;var T=!0;try{T=L(!0,C)}finally{T?Mi():(E=!1,L=null)}}else E=!1}var Mi;if(typeof u=="function")Mi=function(){u(Ni)};else if(typeof MessageChannel<"u"){var Vo=new MessageChannel,Lf=Vo.port2;Vo.port1.onmessage=Ni,Mi=function(){Lf.postMessage(null)}}else Mi=function(){O(Ni,0)};function ul(C){L=C,E||(E=!0,Mi())}function dl(C,T){z=O(function(){C(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){x||w||(x=!0,ul(S))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return i(a)},e.unstable_next=function(C){switch(g){case 1:case 2:case 3:var T=3;break;default:T=g}var M=g;g=T;try{return C()}finally{g=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,T){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var M=g;g=C;try{return T()}finally{g=M}},e.unstable_scheduleCallback=function(C,T,M){var K=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?K+M:K):M=K,C){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=M+le,C={id:y++,callback:T,priorityLevel:C,startTime:M,expirationTime:le,sortIndex:-1},M>K?(C.sortIndex=M,t(d,C),i(a)===null&&C===i(d)&&(k?(f(z),z=-1):k=!0,dl(m,M-K))):(C.sortIndex=le,t(a,C),x||w||(x=!0,ul(S))),C},e.unstable_shouldYield=Oe,e.unstable_wrapCallback=function(C){var T=g;return function(){var M=g;g=T;try{return C.apply(this,arguments)}finally{g=M}}}})(Ec);Cc.exports=Ec;var Xf=Cc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf=I,_e=Xf;function v(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,i=1;i<arguments.length;i++)t+="&args[]="+encodeURIComponent(arguments[i]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Lc=new Set,fn={};function Xt(e,t){xi(e,t),xi(e+"Capture",t)}function xi(e,t){for(fn[e]=t,e=0;e<t.length;e++)Lc.add(t[e])}var rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xl=Object.prototype.hasOwnProperty,Zf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ko={},Xo={};function Jf(e){return Xl.call(Xo,e)?!0:Xl.call(Ko,e)?!1:Zf.test(e)?Xo[e]=!0:(Ko[e]=!0,!1)}function ep(e,t,i,n){if(i!==null&&i.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:i!==null?!i.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tp(e,t,i,n){if(t===null||typeof t>"u"||ep(e,t,i,n))return!0;if(n)return!1;if(i!==null)switch(i.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ve(e,t,i,n,r,l,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=r,this.mustUseProperty=i,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=s}var ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ue[e]=new ve(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ue[t]=new ve(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ue[e]=new ve(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ue[e]=new ve(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ue[e]=new ve(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ue[e]=new ve(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ue[e]=new ve(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ue[e]=new ve(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ue[e]=new ve(e,5,!1,e.toLowerCase(),null,!1,!1)});var Js=/[\-:]([a-z])/g;function eo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Js,eo);ue[t]=new ve(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Js,eo);ue[t]=new ve(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Js,eo);ue[t]=new ve(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ue[e]=new ve(e,1,!1,e.toLowerCase(),null,!1,!1)});ue.xlinkHref=new ve("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ue[e]=new ve(e,1,!1,e.toLowerCase(),null,!0,!0)});function to(e,t,i,n){var r=ue.hasOwnProperty(t)?ue[t]:null;(r!==null?r.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(tp(t,i,r,n)&&(i=null),n||r===null?Jf(t)&&(i===null?e.removeAttribute(t):e.setAttribute(t,""+i)):r.mustUseProperty?e[r.propertyName]=i===null?r.type===3?!1:"":i:(t=r.attributeName,n=r.attributeNamespace,i===null?e.removeAttribute(t):(r=r.type,i=r===3||r===4&&i===!0?"":""+i,n?e.setAttributeNS(n,t,i):e.setAttribute(t,i))))}var at=qf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fn=Symbol.for("react.element"),Jt=Symbol.for("react.portal"),ei=Symbol.for("react.fragment"),io=Symbol.for("react.strict_mode"),ql=Symbol.for("react.profiler"),zc=Symbol.for("react.provider"),_c=Symbol.for("react.context"),no=Symbol.for("react.forward_ref"),Zl=Symbol.for("react.suspense"),Jl=Symbol.for("react.suspense_list"),ro=Symbol.for("react.memo"),dt=Symbol.for("react.lazy"),Tc=Symbol.for("react.offscreen"),qo=Symbol.iterator;function ji(e){return e===null||typeof e!="object"?null:(e=qo&&e[qo]||e["@@iterator"],typeof e=="function"?e:null)}var G=Object.assign,gl;function Vi(e){if(gl===void 0)try{throw Error()}catch(i){var t=i.stack.trim().match(/\n( *(at )?)/);gl=t&&t[1]||""}return`
`+gl+e}var hl=!1;function yl(e,t){if(!e||hl)return"";hl=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var n=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){n=d}e.call(t.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&typeof d.stack=="string"){for(var r=d.stack.split(`
`),l=n.stack.split(`
`),s=r.length-1,o=l.length-1;1<=s&&0<=o&&r[s]!==l[o];)o--;for(;1<=s&&0<=o;s--,o--)if(r[s]!==l[o]){if(s!==1||o!==1)do if(s--,o--,0>o||r[s]!==l[o]){var a=`
`+r[s].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=s&&0<=o);break}}}finally{hl=!1,Error.prepareStackTrace=i}return(e=e?e.displayName||e.name:"")?Vi(e):""}function ip(e){switch(e.tag){case 5:return Vi(e.type);case 16:return Vi("Lazy");case 13:return Vi("Suspense");case 19:return Vi("SuspenseList");case 0:case 2:case 15:return e=yl(e.type,!1),e;case 11:return e=yl(e.type.render,!1),e;case 1:return e=yl(e.type,!0),e;default:return""}}function es(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ei:return"Fragment";case Jt:return"Portal";case ql:return"Profiler";case io:return"StrictMode";case Zl:return"Suspense";case Jl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _c:return(e.displayName||"Context")+".Consumer";case zc:return(e._context.displayName||"Context")+".Provider";case no:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ro:return t=e.displayName||null,t!==null?t:es(e.type)||"Memo";case dt:t=e._payload,e=e._init;try{return es(e(t))}catch{}}return null}function np(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return es(t);case 8:return t===io?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Et(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Nc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function rp(e){var t=Nc(e)?"checked":"value",i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var r=i.get,l=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(s){n=""+s,l.call(this,s)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Dn(e){e._valueTracker||(e._valueTracker=rp(e))}function Mc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var i=t.getValue(),n="";return e&&(n=Nc(e)?e.checked?"true":"false":e.value),e=n,e!==i?(t.setValue(e),!0):!1}function br(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ts(e,t){var i=t.checked;return G({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:i??e._wrapperState.initialChecked})}function Zo(e,t){var i=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;i=Et(t.value!=null?t.value:i),e._wrapperState={initialChecked:n,initialValue:i,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function jc(e,t){t=t.checked,t!=null&&to(e,"checked",t,!1)}function is(e,t){jc(e,t);var i=Et(t.value),n=t.type;if(i!=null)n==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+i):e.value!==""+i&&(e.value=""+i);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ns(e,t.type,i):t.hasOwnProperty("defaultValue")&&ns(e,t.type,Et(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Jo(e,t,i){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,i||t===e.value||(e.value=t),e.defaultValue=t}i=e.name,i!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,i!==""&&(e.name=i)}function ns(e,t,i){(t!=="number"||br(e.ownerDocument)!==e)&&(i==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+i&&(e.defaultValue=""+i))}var Gi=Array.isArray;function di(e,t,i,n){if(e=e.options,t){t={};for(var r=0;r<i.length;r++)t["$"+i[r]]=!0;for(i=0;i<e.length;i++)r=t.hasOwnProperty("$"+e[i].value),e[i].selected!==r&&(e[i].selected=r),r&&n&&(e[i].defaultSelected=!0)}else{for(i=""+Et(i),t=null,r=0;r<e.length;r++){if(e[r].value===i){e[r].selected=!0,n&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function rs(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(v(91));return G({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ea(e,t){var i=t.value;if(i==null){if(i=t.children,t=t.defaultValue,i!=null){if(t!=null)throw Error(v(92));if(Gi(i)){if(1<i.length)throw Error(v(93));i=i[0]}t=i}t==null&&(t=""),i=t}e._wrapperState={initialValue:Et(i)}}function Pc(e,t){var i=Et(t.value),n=Et(t.defaultValue);i!=null&&(i=""+i,i!==e.value&&(e.value=i),t.defaultValue==null&&e.defaultValue!==i&&(e.defaultValue=i)),n!=null&&(e.defaultValue=""+n)}function ta(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ac(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ls(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ac(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Hn,$c=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,i,n,r){MSApp.execUnsafeLocalFunction(function(){return e(t,i,n,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Hn=Hn||document.createElement("div"),Hn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Hn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function pn(e,t){if(t){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=t;return}}e.textContent=t}var Xi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lp=["Webkit","ms","Moz","O"];Object.keys(Xi).forEach(function(e){lp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Xi[t]=Xi[e]})});function Ic(e,t,i){return t==null||typeof t=="boolean"||t===""?"":i||typeof t!="number"||t===0||Xi.hasOwnProperty(e)&&Xi[e]?(""+t).trim():t+"px"}function Rc(e,t){e=e.style;for(var i in t)if(t.hasOwnProperty(i)){var n=i.indexOf("--")===0,r=Ic(i,t[i],n);i==="float"&&(i="cssFloat"),n?e.setProperty(i,r):e[i]=r}}var sp=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ss(e,t){if(t){if(sp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(v(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(v(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(v(61))}if(t.style!=null&&typeof t.style!="object")throw Error(v(62))}}function os(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var as=null;function lo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cs=null,fi=null,pi=null;function ia(e){if(e=jn(e)){if(typeof cs!="function")throw Error(v(280));var t=e.stateNode;t&&(t=Jr(t),cs(e.stateNode,e.type,t))}}function Oc(e){fi?pi?pi.push(e):pi=[e]:fi=e}function Fc(){if(fi){var e=fi,t=pi;if(pi=fi=null,ia(e),t)for(e=0;e<t.length;e++)ia(t[e])}}function Dc(e,t){return e(t)}function Hc(){}var ml=!1;function Bc(e,t,i){if(ml)return e(t,i);ml=!0;try{return Dc(e,t,i)}finally{ml=!1,(fi!==null||pi!==null)&&(Hc(),Fc())}}function gn(e,t){var i=e.stateNode;if(i===null)return null;var n=Jr(i);if(n===null)return null;i=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error(v(231,t,typeof i));return i}var us=!1;if(rt)try{var Pi={};Object.defineProperty(Pi,"passive",{get:function(){us=!0}}),window.addEventListener("test",Pi,Pi),window.removeEventListener("test",Pi,Pi)}catch{us=!1}function op(e,t,i,n,r,l,s,o,a){var d=Array.prototype.slice.call(arguments,3);try{t.apply(i,d)}catch(y){this.onError(y)}}var qi=!1,Sr=null,Cr=!1,ds=null,ap={onError:function(e){qi=!0,Sr=e}};function cp(e,t,i,n,r,l,s,o,a){qi=!1,Sr=null,op.apply(ap,arguments)}function up(e,t,i,n,r,l,s,o,a){if(cp.apply(this,arguments),qi){if(qi){var d=Sr;qi=!1,Sr=null}else throw Error(v(198));Cr||(Cr=!0,ds=d)}}function qt(e){var t=e,i=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(i=t.return),e=t.return;while(e)}return t.tag===3?i:null}function Uc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function na(e){if(qt(e)!==e)throw Error(v(188))}function dp(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(v(188));return t!==e?null:e}for(var i=e,n=t;;){var r=i.return;if(r===null)break;var l=r.alternate;if(l===null){if(n=r.return,n!==null){i=n;continue}break}if(r.child===l.child){for(l=r.child;l;){if(l===i)return na(r),e;if(l===n)return na(r),t;l=l.sibling}throw Error(v(188))}if(i.return!==n.return)i=r,n=l;else{for(var s=!1,o=r.child;o;){if(o===i){s=!0,i=r,n=l;break}if(o===n){s=!0,n=r,i=l;break}o=o.sibling}if(!s){for(o=l.child;o;){if(o===i){s=!0,i=l,n=r;break}if(o===n){s=!0,n=l,i=r;break}o=o.sibling}if(!s)throw Error(v(189))}}if(i.alternate!==n)throw Error(v(190))}if(i.tag!==3)throw Error(v(188));return i.stateNode.current===i?e:t}function Wc(e){return e=dp(e),e!==null?Vc(e):null}function Vc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Vc(e);if(t!==null)return t;e=e.sibling}return null}var Gc=_e.unstable_scheduleCallback,ra=_e.unstable_cancelCallback,fp=_e.unstable_shouldYield,pp=_e.unstable_requestPaint,Z=_e.unstable_now,gp=_e.unstable_getCurrentPriorityLevel,so=_e.unstable_ImmediatePriority,Qc=_e.unstable_UserBlockingPriority,Er=_e.unstable_NormalPriority,hp=_e.unstable_LowPriority,Yc=_e.unstable_IdlePriority,Kr=null,Xe=null;function yp(e){if(Xe&&typeof Xe.onCommitFiberRoot=="function")try{Xe.onCommitFiberRoot(Kr,e,void 0,(e.current.flags&128)===128)}catch{}}var We=Math.clz32?Math.clz32:wp,mp=Math.log,vp=Math.LN2;function wp(e){return e>>>=0,e===0?32:31-(mp(e)/vp|0)|0}var Bn=64,Un=4194304;function Qi(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Lr(e,t){var i=e.pendingLanes;if(i===0)return 0;var n=0,r=e.suspendedLanes,l=e.pingedLanes,s=i&268435455;if(s!==0){var o=s&~r;o!==0?n=Qi(o):(l&=s,l!==0&&(n=Qi(l)))}else s=i&~r,s!==0?n=Qi(s):l!==0&&(n=Qi(l));if(n===0)return 0;if(t!==0&&t!==n&&!(t&r)&&(r=n&-n,l=t&-t,r>=l||r===16&&(l&4194240)!==0))return t;if(n&4&&(n|=i&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)i=31-We(t),r=1<<i,n|=e[i],t&=~r;return n}function xp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kp(e,t){for(var i=e.suspendedLanes,n=e.pingedLanes,r=e.expirationTimes,l=e.pendingLanes;0<l;){var s=31-We(l),o=1<<s,a=r[s];a===-1?(!(o&i)||o&n)&&(r[s]=xp(o,t)):a<=t&&(e.expiredLanes|=o),l&=~o}}function fs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Kc(){var e=Bn;return Bn<<=1,!(Bn&4194240)&&(Bn=64),e}function vl(e){for(var t=[],i=0;31>i;i++)t.push(e);return t}function Nn(e,t,i){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-We(t),e[t]=i}function bp(e,t){var i=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<i;){var r=31-We(i),l=1<<r;t[r]=0,n[r]=-1,e[r]=-1,i&=~l}}function oo(e,t){var i=e.entangledLanes|=t;for(e=e.entanglements;i;){var n=31-We(i),r=1<<n;r&t|e[n]&t&&(e[n]|=t),i&=~r}}var R=0;function Xc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var qc,ao,Zc,Jc,eu,ps=!1,Wn=[],mt=null,vt=null,wt=null,hn=new Map,yn=new Map,pt=[],Sp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function la(e,t){switch(e){case"focusin":case"focusout":mt=null;break;case"dragenter":case"dragleave":vt=null;break;case"mouseover":case"mouseout":wt=null;break;case"pointerover":case"pointerout":hn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":yn.delete(t.pointerId)}}function Ai(e,t,i,n,r,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:i,eventSystemFlags:n,nativeEvent:l,targetContainers:[r]},t!==null&&(t=jn(t),t!==null&&ao(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function Cp(e,t,i,n,r){switch(t){case"focusin":return mt=Ai(mt,e,t,i,n,r),!0;case"dragenter":return vt=Ai(vt,e,t,i,n,r),!0;case"mouseover":return wt=Ai(wt,e,t,i,n,r),!0;case"pointerover":var l=r.pointerId;return hn.set(l,Ai(hn.get(l)||null,e,t,i,n,r)),!0;case"gotpointercapture":return l=r.pointerId,yn.set(l,Ai(yn.get(l)||null,e,t,i,n,r)),!0}return!1}function tu(e){var t=Rt(e.target);if(t!==null){var i=qt(t);if(i!==null){if(t=i.tag,t===13){if(t=Uc(i),t!==null){e.blockedOn=t,eu(e.priority,function(){Zc(i)});return}}else if(t===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function rr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var i=gs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(i===null){i=e.nativeEvent;var n=new i.constructor(i.type,i);as=n,i.target.dispatchEvent(n),as=null}else return t=jn(i),t!==null&&ao(t),e.blockedOn=i,!1;t.shift()}return!0}function sa(e,t,i){rr(e)&&i.delete(t)}function Ep(){ps=!1,mt!==null&&rr(mt)&&(mt=null),vt!==null&&rr(vt)&&(vt=null),wt!==null&&rr(wt)&&(wt=null),hn.forEach(sa),yn.forEach(sa)}function $i(e,t){e.blockedOn===t&&(e.blockedOn=null,ps||(ps=!0,_e.unstable_scheduleCallback(_e.unstable_NormalPriority,Ep)))}function mn(e){function t(r){return $i(r,e)}if(0<Wn.length){$i(Wn[0],e);for(var i=1;i<Wn.length;i++){var n=Wn[i];n.blockedOn===e&&(n.blockedOn=null)}}for(mt!==null&&$i(mt,e),vt!==null&&$i(vt,e),wt!==null&&$i(wt,e),hn.forEach(t),yn.forEach(t),i=0;i<pt.length;i++)n=pt[i],n.blockedOn===e&&(n.blockedOn=null);for(;0<pt.length&&(i=pt[0],i.blockedOn===null);)tu(i),i.blockedOn===null&&pt.shift()}var gi=at.ReactCurrentBatchConfig,zr=!0;function Lp(e,t,i,n){var r=R,l=gi.transition;gi.transition=null;try{R=1,co(e,t,i,n)}finally{R=r,gi.transition=l}}function zp(e,t,i,n){var r=R,l=gi.transition;gi.transition=null;try{R=4,co(e,t,i,n)}finally{R=r,gi.transition=l}}function co(e,t,i,n){if(zr){var r=gs(e,t,i,n);if(r===null)_l(e,t,n,_r,i),la(e,n);else if(Cp(r,e,t,i,n))n.stopPropagation();else if(la(e,n),t&4&&-1<Sp.indexOf(e)){for(;r!==null;){var l=jn(r);if(l!==null&&qc(l),l=gs(e,t,i,n),l===null&&_l(e,t,n,_r,i),l===r)break;r=l}r!==null&&n.stopPropagation()}else _l(e,t,n,null,i)}}var _r=null;function gs(e,t,i,n){if(_r=null,e=lo(n),e=Rt(e),e!==null)if(t=qt(e),t===null)e=null;else if(i=t.tag,i===13){if(e=Uc(t),e!==null)return e;e=null}else if(i===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return _r=e,null}function iu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gp()){case so:return 1;case Qc:return 4;case Er:case hp:return 16;case Yc:return 536870912;default:return 16}default:return 16}}var ht=null,uo=null,lr=null;function nu(){if(lr)return lr;var e,t=uo,i=t.length,n,r="value"in ht?ht.value:ht.textContent,l=r.length;for(e=0;e<i&&t[e]===r[e];e++);var s=i-e;for(n=1;n<=s&&t[i-n]===r[l-n];n++);return lr=r.slice(e,1<n?1-n:void 0)}function sr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vn(){return!0}function oa(){return!1}function Ne(e){function t(i,n,r,l,s){this._reactName=i,this._targetInst=r,this.type=n,this.nativeEvent=l,this.target=s,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(i=e[o],this[o]=i?i(l):l[o]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Vn:oa,this.isPropagationStopped=oa,this}return G(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=Vn)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=Vn)},persist:function(){},isPersistent:Vn}),t}var _i={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fo=Ne(_i),Mn=G({},_i,{view:0,detail:0}),_p=Ne(Mn),wl,xl,Ii,Xr=G({},Mn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:po,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ii&&(Ii&&e.type==="mousemove"?(wl=e.screenX-Ii.screenX,xl=e.screenY-Ii.screenY):xl=wl=0,Ii=e),wl)},movementY:function(e){return"movementY"in e?e.movementY:xl}}),aa=Ne(Xr),Tp=G({},Xr,{dataTransfer:0}),Np=Ne(Tp),Mp=G({},Mn,{relatedTarget:0}),kl=Ne(Mp),jp=G({},_i,{animationName:0,elapsedTime:0,pseudoElement:0}),Pp=Ne(jp),Ap=G({},_i,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),$p=Ne(Ap),Ip=G({},_i,{data:0}),ca=Ne(Ip),Rp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Op={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Dp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Fp[e])?!!t[e]:!1}function po(){return Dp}var Hp=G({},Mn,{key:function(e){if(e.key){var t=Rp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=sr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Op[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:po,charCode:function(e){return e.type==="keypress"?sr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?sr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Bp=Ne(Hp),Up=G({},Xr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ua=Ne(Up),Wp=G({},Mn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:po}),Vp=Ne(Wp),Gp=G({},_i,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qp=Ne(Gp),Yp=G({},Xr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Kp=Ne(Yp),Xp=[9,13,27,32],go=rt&&"CompositionEvent"in window,Zi=null;rt&&"documentMode"in document&&(Zi=document.documentMode);var qp=rt&&"TextEvent"in window&&!Zi,ru=rt&&(!go||Zi&&8<Zi&&11>=Zi),da=" ",fa=!1;function lu(e,t){switch(e){case"keyup":return Xp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function su(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ti=!1;function Zp(e,t){switch(e){case"compositionend":return su(t);case"keypress":return t.which!==32?null:(fa=!0,da);case"textInput":return e=t.data,e===da&&fa?null:e;default:return null}}function Jp(e,t){if(ti)return e==="compositionend"||!go&&lu(e,t)?(e=nu(),lr=uo=ht=null,ti=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ru&&t.locale!=="ko"?null:t.data;default:return null}}var eg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!eg[e.type]:t==="textarea"}function ou(e,t,i,n){Oc(n),t=Tr(t,"onChange"),0<t.length&&(i=new fo("onChange","change",null,i,n),e.push({event:i,listeners:t}))}var Ji=null,vn=null;function tg(e){vu(e,0)}function qr(e){var t=ri(e);if(Mc(t))return e}function ig(e,t){if(e==="change")return t}var au=!1;if(rt){var bl;if(rt){var Sl="oninput"in document;if(!Sl){var ga=document.createElement("div");ga.setAttribute("oninput","return;"),Sl=typeof ga.oninput=="function"}bl=Sl}else bl=!1;au=bl&&(!document.documentMode||9<document.documentMode)}function ha(){Ji&&(Ji.detachEvent("onpropertychange",cu),vn=Ji=null)}function cu(e){if(e.propertyName==="value"&&qr(vn)){var t=[];ou(t,vn,e,lo(e)),Bc(tg,t)}}function ng(e,t,i){e==="focusin"?(ha(),Ji=t,vn=i,Ji.attachEvent("onpropertychange",cu)):e==="focusout"&&ha()}function rg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qr(vn)}function lg(e,t){if(e==="click")return qr(t)}function sg(e,t){if(e==="input"||e==="change")return qr(t)}function og(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ge=typeof Object.is=="function"?Object.is:og;function wn(e,t){if(Ge(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var i=Object.keys(e),n=Object.keys(t);if(i.length!==n.length)return!1;for(n=0;n<i.length;n++){var r=i[n];if(!Xl.call(t,r)||!Ge(e[r],t[r]))return!1}return!0}function ya(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ma(e,t){var i=ya(e);e=0;for(var n;i;){if(i.nodeType===3){if(n=e+i.textContent.length,e<=t&&n>=t)return{node:i,offset:t-e};e=n}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=ya(i)}}function uu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?uu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function du(){for(var e=window,t=br();t instanceof e.HTMLIFrameElement;){try{var i=typeof t.contentWindow.location.href=="string"}catch{i=!1}if(i)e=t.contentWindow;else break;t=br(e.document)}return t}function ho(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ag(e){var t=du(),i=e.focusedElem,n=e.selectionRange;if(t!==i&&i&&i.ownerDocument&&uu(i.ownerDocument.documentElement,i)){if(n!==null&&ho(i)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in i)i.selectionStart=t,i.selectionEnd=Math.min(e,i.value.length);else if(e=(t=i.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=i.textContent.length,l=Math.min(n.start,r);n=n.end===void 0?l:Math.min(n.end,r),!e.extend&&l>n&&(r=n,n=l,l=r),r=ma(i,l);var s=ma(i,n);r&&s&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),l>n?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=i;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<t.length;i++)e=t[i],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var cg=rt&&"documentMode"in document&&11>=document.documentMode,ii=null,hs=null,en=null,ys=!1;function va(e,t,i){var n=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;ys||ii==null||ii!==br(n)||(n=ii,"selectionStart"in n&&ho(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),en&&wn(en,n)||(en=n,n=Tr(hs,"onSelect"),0<n.length&&(t=new fo("onSelect","select",null,t,i),e.push({event:t,listeners:n}),t.target=ii)))}function Gn(e,t){var i={};return i[e.toLowerCase()]=t.toLowerCase(),i["Webkit"+e]="webkit"+t,i["Moz"+e]="moz"+t,i}var ni={animationend:Gn("Animation","AnimationEnd"),animationiteration:Gn("Animation","AnimationIteration"),animationstart:Gn("Animation","AnimationStart"),transitionend:Gn("Transition","TransitionEnd")},Cl={},fu={};rt&&(fu=document.createElement("div").style,"AnimationEvent"in window||(delete ni.animationend.animation,delete ni.animationiteration.animation,delete ni.animationstart.animation),"TransitionEvent"in window||delete ni.transitionend.transition);function Zr(e){if(Cl[e])return Cl[e];if(!ni[e])return e;var t=ni[e],i;for(i in t)if(t.hasOwnProperty(i)&&i in fu)return Cl[e]=t[i];return e}var pu=Zr("animationend"),gu=Zr("animationiteration"),hu=Zr("animationstart"),yu=Zr("transitionend"),mu=new Map,wa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _t(e,t){mu.set(e,t),Xt(t,[e])}for(var El=0;El<wa.length;El++){var Ll=wa[El],ug=Ll.toLowerCase(),dg=Ll[0].toUpperCase()+Ll.slice(1);_t(ug,"on"+dg)}_t(pu,"onAnimationEnd");_t(gu,"onAnimationIteration");_t(hu,"onAnimationStart");_t("dblclick","onDoubleClick");_t("focusin","onFocus");_t("focusout","onBlur");_t(yu,"onTransitionEnd");xi("onMouseEnter",["mouseout","mouseover"]);xi("onMouseLeave",["mouseout","mouseover"]);xi("onPointerEnter",["pointerout","pointerover"]);xi("onPointerLeave",["pointerout","pointerover"]);Xt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yi));function xa(e,t,i){var n=e.type||"unknown-event";e.currentTarget=i,up(n,t,void 0,e),e.currentTarget=null}function vu(e,t){t=(t&4)!==0;for(var i=0;i<e.length;i++){var n=e[i],r=n.event;n=n.listeners;e:{var l=void 0;if(t)for(var s=n.length-1;0<=s;s--){var o=n[s],a=o.instance,d=o.currentTarget;if(o=o.listener,a!==l&&r.isPropagationStopped())break e;xa(r,o,d),l=a}else for(s=0;s<n.length;s++){if(o=n[s],a=o.instance,d=o.currentTarget,o=o.listener,a!==l&&r.isPropagationStopped())break e;xa(r,o,d),l=a}}}if(Cr)throw e=ds,Cr=!1,ds=null,e}function H(e,t){var i=t[ks];i===void 0&&(i=t[ks]=new Set);var n=e+"__bubble";i.has(n)||(wu(t,e,2,!1),i.add(n))}function zl(e,t,i){var n=0;t&&(n|=4),wu(i,e,n,t)}var Qn="_reactListening"+Math.random().toString(36).slice(2);function xn(e){if(!e[Qn]){e[Qn]=!0,Lc.forEach(function(i){i!=="selectionchange"&&(fg.has(i)||zl(i,!1,e),zl(i,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Qn]||(t[Qn]=!0,zl("selectionchange",!1,t))}}function wu(e,t,i,n){switch(iu(t)){case 1:var r=Lp;break;case 4:r=zp;break;default:r=co}i=r.bind(null,t,i,e),r=void 0,!us||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),n?r!==void 0?e.addEventListener(t,i,{capture:!0,passive:r}):e.addEventListener(t,i,!0):r!==void 0?e.addEventListener(t,i,{passive:r}):e.addEventListener(t,i,!1)}function _l(e,t,i,n,r){var l=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var o=n.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(s===4)for(s=n.return;s!==null;){var a=s.tag;if((a===3||a===4)&&(a=s.stateNode.containerInfo,a===r||a.nodeType===8&&a.parentNode===r))return;s=s.return}for(;o!==null;){if(s=Rt(o),s===null)return;if(a=s.tag,a===5||a===6){n=l=s;continue e}o=o.parentNode}}n=n.return}Bc(function(){var d=l,y=lo(i),h=[];e:{var g=mu.get(e);if(g!==void 0){var w=fo,x=e;switch(e){case"keypress":if(sr(i)===0)break e;case"keydown":case"keyup":w=Bp;break;case"focusin":x="focus",w=kl;break;case"focusout":x="blur",w=kl;break;case"beforeblur":case"afterblur":w=kl;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=aa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Np;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Vp;break;case pu:case gu:case hu:w=Pp;break;case yu:w=Qp;break;case"scroll":w=_p;break;case"wheel":w=Kp;break;case"copy":case"cut":case"paste":w=$p;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=ua}var k=(t&4)!==0,O=!k&&e==="scroll",f=k?g!==null?g+"Capture":null:g;k=[];for(var u=d,c;u!==null;){c=u;var m=c.stateNode;if(c.tag===5&&m!==null&&(c=m,f!==null&&(m=gn(u,f),m!=null&&k.push(kn(u,m,c)))),O)break;u=u.return}0<k.length&&(g=new w(g,x,null,i,y),h.push({event:g,listeners:k}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",g&&i!==as&&(x=i.relatedTarget||i.fromElement)&&(Rt(x)||x[lt]))break e;if((w||g)&&(g=y.window===y?y:(g=y.ownerDocument)?g.defaultView||g.parentWindow:window,w?(x=i.relatedTarget||i.toElement,w=d,x=x?Rt(x):null,x!==null&&(O=qt(x),x!==O||x.tag!==5&&x.tag!==6)&&(x=null)):(w=null,x=d),w!==x)){if(k=aa,m="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(k=ua,m="onPointerLeave",f="onPointerEnter",u="pointer"),O=w==null?g:ri(w),c=x==null?g:ri(x),g=new k(m,u+"leave",w,i,y),g.target=O,g.relatedTarget=c,m=null,Rt(y)===d&&(k=new k(f,u+"enter",x,i,y),k.target=c,k.relatedTarget=O,m=k),O=m,w&&x)t:{for(k=w,f=x,u=0,c=k;c;c=Zt(c))u++;for(c=0,m=f;m;m=Zt(m))c++;for(;0<u-c;)k=Zt(k),u--;for(;0<c-u;)f=Zt(f),c--;for(;u--;){if(k===f||f!==null&&k===f.alternate)break t;k=Zt(k),f=Zt(f)}k=null}else k=null;w!==null&&ka(h,g,w,k,!1),x!==null&&O!==null&&ka(h,O,x,k,!0)}}e:{if(g=d?ri(d):window,w=g.nodeName&&g.nodeName.toLowerCase(),w==="select"||w==="input"&&g.type==="file")var S=ig;else if(pa(g))if(au)S=sg;else{S=rg;var E=ng}else(w=g.nodeName)&&w.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=lg);if(S&&(S=S(e,d))){ou(h,S,i,y);break e}E&&E(e,g,d),e==="focusout"&&(E=g._wrapperState)&&E.controlled&&g.type==="number"&&ns(g,"number",g.value)}switch(E=d?ri(d):window,e){case"focusin":(pa(E)||E.contentEditable==="true")&&(ii=E,hs=d,en=null);break;case"focusout":en=hs=ii=null;break;case"mousedown":ys=!0;break;case"contextmenu":case"mouseup":case"dragend":ys=!1,va(h,i,y);break;case"selectionchange":if(cg)break;case"keydown":case"keyup":va(h,i,y)}var L;if(go)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else ti?lu(e,i)&&(z="onCompositionEnd"):e==="keydown"&&i.keyCode===229&&(z="onCompositionStart");z&&(ru&&i.locale!=="ko"&&(ti||z!=="onCompositionStart"?z==="onCompositionEnd"&&ti&&(L=nu()):(ht=y,uo="value"in ht?ht.value:ht.textContent,ti=!0)),E=Tr(d,z),0<E.length&&(z=new ca(z,e,null,i,y),h.push({event:z,listeners:E}),L?z.data=L:(L=su(i),L!==null&&(z.data=L)))),(L=qp?Zp(e,i):Jp(e,i))&&(d=Tr(d,"onBeforeInput"),0<d.length&&(y=new ca("onBeforeInput","beforeinput",null,i,y),h.push({event:y,listeners:d}),y.data=L))}vu(h,t)})}function kn(e,t,i){return{instance:e,listener:t,currentTarget:i}}function Tr(e,t){for(var i=t+"Capture",n=[];e!==null;){var r=e,l=r.stateNode;r.tag===5&&l!==null&&(r=l,l=gn(e,i),l!=null&&n.unshift(kn(e,l,r)),l=gn(e,t),l!=null&&n.push(kn(e,l,r))),e=e.return}return n}function Zt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ka(e,t,i,n,r){for(var l=t._reactName,s=[];i!==null&&i!==n;){var o=i,a=o.alternate,d=o.stateNode;if(a!==null&&a===n)break;o.tag===5&&d!==null&&(o=d,r?(a=gn(i,l),a!=null&&s.unshift(kn(i,a,o))):r||(a=gn(i,l),a!=null&&s.push(kn(i,a,o)))),i=i.return}s.length!==0&&e.push({event:t,listeners:s})}var pg=/\r\n?/g,gg=/\u0000|\uFFFD/g;function ba(e){return(typeof e=="string"?e:""+e).replace(pg,`
`).replace(gg,"")}function Yn(e,t,i){if(t=ba(t),ba(e)!==t&&i)throw Error(v(425))}function Nr(){}var ms=null,vs=null;function ws(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xs=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,Sa=typeof Promise=="function"?Promise:void 0,yg=typeof queueMicrotask=="function"?queueMicrotask:typeof Sa<"u"?function(e){return Sa.resolve(null).then(e).catch(mg)}:xs;function mg(e){setTimeout(function(){throw e})}function Tl(e,t){var i=t,n=0;do{var r=i.nextSibling;if(e.removeChild(i),r&&r.nodeType===8)if(i=r.data,i==="/$"){if(n===0){e.removeChild(r),mn(t);return}n--}else i!=="$"&&i!=="$?"&&i!=="$!"||n++;i=r}while(i);mn(t)}function xt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ca(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="$"||i==="$!"||i==="$?"){if(t===0)return e;t--}else i==="/$"&&t++}e=e.previousSibling}return null}var Ti=Math.random().toString(36).slice(2),Ke="__reactFiber$"+Ti,bn="__reactProps$"+Ti,lt="__reactContainer$"+Ti,ks="__reactEvents$"+Ti,vg="__reactListeners$"+Ti,wg="__reactHandles$"+Ti;function Rt(e){var t=e[Ke];if(t)return t;for(var i=e.parentNode;i;){if(t=i[lt]||i[Ke]){if(i=t.alternate,t.child!==null||i!==null&&i.child!==null)for(e=Ca(e);e!==null;){if(i=e[Ke])return i;e=Ca(e)}return t}e=i,i=e.parentNode}return null}function jn(e){return e=e[Ke]||e[lt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ri(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(v(33))}function Jr(e){return e[bn]||null}var bs=[],li=-1;function Tt(e){return{current:e}}function B(e){0>li||(e.current=bs[li],bs[li]=null,li--)}function D(e,t){li++,bs[li]=e.current,e.current=t}var Lt={},ge=Tt(Lt),ke=Tt(!1),Vt=Lt;function ki(e,t){var i=e.type.contextTypes;if(!i)return Lt;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var r={},l;for(l in i)r[l]=t[l];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function be(e){return e=e.childContextTypes,e!=null}function Mr(){B(ke),B(ge)}function Ea(e,t,i){if(ge.current!==Lt)throw Error(v(168));D(ge,t),D(ke,i)}function xu(e,t,i){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return i;n=n.getChildContext();for(var r in n)if(!(r in t))throw Error(v(108,np(e)||"Unknown",r));return G({},i,n)}function jr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Lt,Vt=ge.current,D(ge,e),D(ke,ke.current),!0}function La(e,t,i){var n=e.stateNode;if(!n)throw Error(v(169));i?(e=xu(e,t,Vt),n.__reactInternalMemoizedMergedChildContext=e,B(ke),B(ge),D(ge,e)):B(ke),D(ke,i)}var Je=null,el=!1,Nl=!1;function ku(e){Je===null?Je=[e]:Je.push(e)}function xg(e){el=!0,ku(e)}function Nt(){if(!Nl&&Je!==null){Nl=!0;var e=0,t=R;try{var i=Je;for(R=1;e<i.length;e++){var n=i[e];do n=n(!0);while(n!==null)}Je=null,el=!1}catch(r){throw Je!==null&&(Je=Je.slice(e+1)),Gc(so,Nt),r}finally{R=t,Nl=!1}}return null}var si=[],oi=0,Pr=null,Ar=0,Me=[],je=0,Gt=null,et=1,tt="";function At(e,t){si[oi++]=Ar,si[oi++]=Pr,Pr=e,Ar=t}function bu(e,t,i){Me[je++]=et,Me[je++]=tt,Me[je++]=Gt,Gt=e;var n=et;e=tt;var r=32-We(n)-1;n&=~(1<<r),i+=1;var l=32-We(t)+r;if(30<l){var s=r-r%5;l=(n&(1<<s)-1).toString(32),n>>=s,r-=s,et=1<<32-We(t)+r|i<<r|n,tt=l+e}else et=1<<l|i<<r|n,tt=e}function yo(e){e.return!==null&&(At(e,1),bu(e,1,0))}function mo(e){for(;e===Pr;)Pr=si[--oi],si[oi]=null,Ar=si[--oi],si[oi]=null;for(;e===Gt;)Gt=Me[--je],Me[je]=null,tt=Me[--je],Me[je]=null,et=Me[--je],Me[je]=null}var ze=null,Le=null,U=!1,Be=null;function Su(e,t){var i=Pe(5,null,null,0);i.elementType="DELETED",i.stateNode=t,i.return=e,t=e.deletions,t===null?(e.deletions=[i],e.flags|=16):t.push(i)}function za(e,t){switch(e.tag){case 5:var i=e.type;return t=t.nodeType!==1||i.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ze=e,Le=xt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ze=e,Le=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(i=Gt!==null?{id:et,overflow:tt}:null,e.memoizedState={dehydrated:t,treeContext:i,retryLane:1073741824},i=Pe(18,null,null,0),i.stateNode=t,i.return=e,e.child=i,ze=e,Le=null,!0):!1;default:return!1}}function Ss(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Cs(e){if(U){var t=Le;if(t){var i=t;if(!za(e,t)){if(Ss(e))throw Error(v(418));t=xt(i.nextSibling);var n=ze;t&&za(e,t)?Su(n,i):(e.flags=e.flags&-4097|2,U=!1,ze=e)}}else{if(Ss(e))throw Error(v(418));e.flags=e.flags&-4097|2,U=!1,ze=e}}}function _a(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ze=e}function Kn(e){if(e!==ze)return!1;if(!U)return _a(e),U=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ws(e.type,e.memoizedProps)),t&&(t=Le)){if(Ss(e))throw Cu(),Error(v(418));for(;t;)Su(e,t),t=xt(t.nextSibling)}if(_a(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(v(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="/$"){if(t===0){Le=xt(e.nextSibling);break e}t--}else i!=="$"&&i!=="$!"&&i!=="$?"||t++}e=e.nextSibling}Le=null}}else Le=ze?xt(e.stateNode.nextSibling):null;return!0}function Cu(){for(var e=Le;e;)e=xt(e.nextSibling)}function bi(){Le=ze=null,U=!1}function vo(e){Be===null?Be=[e]:Be.push(e)}var kg=at.ReactCurrentBatchConfig;function Ri(e,t,i){if(e=i.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(i._owner){if(i=i._owner,i){if(i.tag!==1)throw Error(v(309));var n=i.stateNode}if(!n)throw Error(v(147,e));var r=n,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(s){var o=r.refs;s===null?delete o[l]:o[l]=s},t._stringRef=l,t)}if(typeof e!="string")throw Error(v(284));if(!i._owner)throw Error(v(290,e))}return e}function Xn(e,t){throw e=Object.prototype.toString.call(t),Error(v(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ta(e){var t=e._init;return t(e._payload)}function Eu(e){function t(f,u){if(e){var c=f.deletions;c===null?(f.deletions=[u],f.flags|=16):c.push(u)}}function i(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function n(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function r(f,u){return f=Ct(f,u),f.index=0,f.sibling=null,f}function l(f,u,c){return f.index=c,e?(c=f.alternate,c!==null?(c=c.index,c<u?(f.flags|=2,u):c):(f.flags|=2,u)):(f.flags|=1048576,u)}function s(f){return e&&f.alternate===null&&(f.flags|=2),f}function o(f,u,c,m){return u===null||u.tag!==6?(u=Rl(c,f.mode,m),u.return=f,u):(u=r(u,c),u.return=f,u)}function a(f,u,c,m){var S=c.type;return S===ei?y(f,u,c.props.children,m,c.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dt&&Ta(S)===u.type)?(m=r(u,c.props),m.ref=Ri(f,u,c),m.return=f,m):(m=pr(c.type,c.key,c.props,null,f.mode,m),m.ref=Ri(f,u,c),m.return=f,m)}function d(f,u,c,m){return u===null||u.tag!==4||u.stateNode.containerInfo!==c.containerInfo||u.stateNode.implementation!==c.implementation?(u=Ol(c,f.mode,m),u.return=f,u):(u=r(u,c.children||[]),u.return=f,u)}function y(f,u,c,m,S){return u===null||u.tag!==7?(u=Bt(c,f.mode,m,S),u.return=f,u):(u=r(u,c),u.return=f,u)}function h(f,u,c){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Rl(""+u,f.mode,c),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Fn:return c=pr(u.type,u.key,u.props,null,f.mode,c),c.ref=Ri(f,null,u),c.return=f,c;case Jt:return u=Ol(u,f.mode,c),u.return=f,u;case dt:var m=u._init;return h(f,m(u._payload),c)}if(Gi(u)||ji(u))return u=Bt(u,f.mode,c,null),u.return=f,u;Xn(f,u)}return null}function g(f,u,c,m){var S=u!==null?u.key:null;if(typeof c=="string"&&c!==""||typeof c=="number")return S!==null?null:o(f,u,""+c,m);if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Fn:return c.key===S?a(f,u,c,m):null;case Jt:return c.key===S?d(f,u,c,m):null;case dt:return S=c._init,g(f,u,S(c._payload),m)}if(Gi(c)||ji(c))return S!==null?null:y(f,u,c,m,null);Xn(f,c)}return null}function w(f,u,c,m,S){if(typeof m=="string"&&m!==""||typeof m=="number")return f=f.get(c)||null,o(u,f,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Fn:return f=f.get(m.key===null?c:m.key)||null,a(u,f,m,S);case Jt:return f=f.get(m.key===null?c:m.key)||null,d(u,f,m,S);case dt:var E=m._init;return w(f,u,c,E(m._payload),S)}if(Gi(m)||ji(m))return f=f.get(c)||null,y(u,f,m,S,null);Xn(u,m)}return null}function x(f,u,c,m){for(var S=null,E=null,L=u,z=u=0,Y=null;L!==null&&z<c.length;z++){L.index>z?(Y=L,L=null):Y=L.sibling;var A=g(f,L,c[z],m);if(A===null){L===null&&(L=Y);break}e&&L&&A.alternate===null&&t(f,L),u=l(A,u,z),E===null?S=A:E.sibling=A,E=A,L=Y}if(z===c.length)return i(f,L),U&&At(f,z),S;if(L===null){for(;z<c.length;z++)L=h(f,c[z],m),L!==null&&(u=l(L,u,z),E===null?S=L:E.sibling=L,E=L);return U&&At(f,z),S}for(L=n(f,L);z<c.length;z++)Y=w(L,f,z,c[z],m),Y!==null&&(e&&Y.alternate!==null&&L.delete(Y.key===null?z:Y.key),u=l(Y,u,z),E===null?S=Y:E.sibling=Y,E=Y);return e&&L.forEach(function(Oe){return t(f,Oe)}),U&&At(f,z),S}function k(f,u,c,m){var S=ji(c);if(typeof S!="function")throw Error(v(150));if(c=S.call(c),c==null)throw Error(v(151));for(var E=S=null,L=u,z=u=0,Y=null,A=c.next();L!==null&&!A.done;z++,A=c.next()){L.index>z?(Y=L,L=null):Y=L.sibling;var Oe=g(f,L,A.value,m);if(Oe===null){L===null&&(L=Y);break}e&&L&&Oe.alternate===null&&t(f,L),u=l(Oe,u,z),E===null?S=Oe:E.sibling=Oe,E=Oe,L=Y}if(A.done)return i(f,L),U&&At(f,z),S;if(L===null){for(;!A.done;z++,A=c.next())A=h(f,A.value,m),A!==null&&(u=l(A,u,z),E===null?S=A:E.sibling=A,E=A);return U&&At(f,z),S}for(L=n(f,L);!A.done;z++,A=c.next())A=w(L,f,z,A.value,m),A!==null&&(e&&A.alternate!==null&&L.delete(A.key===null?z:A.key),u=l(A,u,z),E===null?S=A:E.sibling=A,E=A);return e&&L.forEach(function(Ni){return t(f,Ni)}),U&&At(f,z),S}function O(f,u,c,m){if(typeof c=="object"&&c!==null&&c.type===ei&&c.key===null&&(c=c.props.children),typeof c=="object"&&c!==null){switch(c.$$typeof){case Fn:e:{for(var S=c.key,E=u;E!==null;){if(E.key===S){if(S=c.type,S===ei){if(E.tag===7){i(f,E.sibling),u=r(E,c.props.children),u.return=f,f=u;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dt&&Ta(S)===E.type){i(f,E.sibling),u=r(E,c.props),u.ref=Ri(f,E,c),u.return=f,f=u;break e}i(f,E);break}else t(f,E);E=E.sibling}c.type===ei?(u=Bt(c.props.children,f.mode,m,c.key),u.return=f,f=u):(m=pr(c.type,c.key,c.props,null,f.mode,m),m.ref=Ri(f,u,c),m.return=f,f=m)}return s(f);case Jt:e:{for(E=c.key;u!==null;){if(u.key===E)if(u.tag===4&&u.stateNode.containerInfo===c.containerInfo&&u.stateNode.implementation===c.implementation){i(f,u.sibling),u=r(u,c.children||[]),u.return=f,f=u;break e}else{i(f,u);break}else t(f,u);u=u.sibling}u=Ol(c,f.mode,m),u.return=f,f=u}return s(f);case dt:return E=c._init,O(f,u,E(c._payload),m)}if(Gi(c))return x(f,u,c,m);if(ji(c))return k(f,u,c,m);Xn(f,c)}return typeof c=="string"&&c!==""||typeof c=="number"?(c=""+c,u!==null&&u.tag===6?(i(f,u.sibling),u=r(u,c),u.return=f,f=u):(i(f,u),u=Rl(c,f.mode,m),u.return=f,f=u),s(f)):i(f,u)}return O}var Si=Eu(!0),Lu=Eu(!1),$r=Tt(null),Ir=null,ai=null,wo=null;function xo(){wo=ai=Ir=null}function ko(e){var t=$r.current;B($r),e._currentValue=t}function Es(e,t,i){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===i)break;e=e.return}}function hi(e,t){Ir=e,wo=ai=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(xe=!0),e.firstContext=null)}function Ie(e){var t=e._currentValue;if(wo!==e)if(e={context:e,memoizedValue:t,next:null},ai===null){if(Ir===null)throw Error(v(308));ai=e,Ir.dependencies={lanes:0,firstContext:e}}else ai=ai.next=e;return t}var Ot=null;function bo(e){Ot===null?Ot=[e]:Ot.push(e)}function zu(e,t,i,n){var r=t.interleaved;return r===null?(i.next=i,bo(t)):(i.next=r.next,r.next=i),t.interleaved=i,st(e,n)}function st(e,t){e.lanes|=t;var i=e.alternate;for(i!==null&&(i.lanes|=t),i=e,e=e.return;e!==null;)e.childLanes|=t,i=e.alternate,i!==null&&(i.childLanes|=t),i=e,e=e.return;return i.tag===3?i.stateNode:null}var ft=!1;function So(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _u(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function it(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function kt(e,t,i){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,$&2){var r=n.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),n.pending=t,st(e,i)}return r=n.interleaved,r===null?(t.next=t,bo(n)):(t.next=r.next,r.next=t),n.interleaved=t,st(e,i)}function or(e,t,i){if(t=t.updateQueue,t!==null&&(t=t.shared,(i&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,oo(e,i)}}function Na(e,t){var i=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,i===n)){var r=null,l=null;if(i=i.firstBaseUpdate,i!==null){do{var s={eventTime:i.eventTime,lane:i.lane,tag:i.tag,payload:i.payload,callback:i.callback,next:null};l===null?r=l=s:l=l.next=s,i=i.next}while(i!==null);l===null?r=l=t:l=l.next=t}else r=l=t;i={baseState:n.baseState,firstBaseUpdate:r,lastBaseUpdate:l,shared:n.shared,effects:n.effects},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=t:e.next=t,i.lastBaseUpdate=t}function Rr(e,t,i,n){var r=e.updateQueue;ft=!1;var l=r.firstBaseUpdate,s=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var a=o,d=a.next;a.next=null,s===null?l=d:s.next=d,s=a;var y=e.alternate;y!==null&&(y=y.updateQueue,o=y.lastBaseUpdate,o!==s&&(o===null?y.firstBaseUpdate=d:o.next=d,y.lastBaseUpdate=a))}if(l!==null){var h=r.baseState;s=0,y=d=a=null,o=l;do{var g=o.lane,w=o.eventTime;if((n&g)===g){y!==null&&(y=y.next={eventTime:w,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var x=e,k=o;switch(g=t,w=i,k.tag){case 1:if(x=k.payload,typeof x=="function"){h=x.call(w,h,g);break e}h=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=k.payload,g=typeof x=="function"?x.call(w,h,g):x,g==null)break e;h=G({},h,g);break e;case 2:ft=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,g=r.effects,g===null?r.effects=[o]:g.push(o))}else w={eventTime:w,lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},y===null?(d=y=w,a=h):y=y.next=w,s|=g;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;g=o,o=g.next,g.next=null,r.lastBaseUpdate=g,r.shared.pending=null}}while(!0);if(y===null&&(a=h),r.baseState=a,r.firstBaseUpdate=d,r.lastBaseUpdate=y,t=r.shared.interleaved,t!==null){r=t;do s|=r.lane,r=r.next;while(r!==t)}else l===null&&(r.shared.lanes=0);Yt|=s,e.lanes=s,e.memoizedState=h}}function Ma(e,t,i){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],r=n.callback;if(r!==null){if(n.callback=null,n=i,typeof r!="function")throw Error(v(191,r));r.call(n)}}}var Pn={},qe=Tt(Pn),Sn=Tt(Pn),Cn=Tt(Pn);function Ft(e){if(e===Pn)throw Error(v(174));return e}function Co(e,t){switch(D(Cn,t),D(Sn,e),D(qe,Pn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ls(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ls(t,e)}B(qe),D(qe,t)}function Ci(){B(qe),B(Sn),B(Cn)}function Tu(e){Ft(Cn.current);var t=Ft(qe.current),i=ls(t,e.type);t!==i&&(D(Sn,e),D(qe,i))}function Eo(e){Sn.current===e&&(B(qe),B(Sn))}var W=Tt(0);function Or(e){for(var t=e;t!==null;){if(t.tag===13){var i=t.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||i.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ml=[];function Lo(){for(var e=0;e<Ml.length;e++)Ml[e]._workInProgressVersionPrimary=null;Ml.length=0}var ar=at.ReactCurrentDispatcher,jl=at.ReactCurrentBatchConfig,Qt=0,V=null,ie=null,se=null,Fr=!1,tn=!1,En=0,bg=0;function de(){throw Error(v(321))}function zo(e,t){if(t===null)return!1;for(var i=0;i<t.length&&i<e.length;i++)if(!Ge(e[i],t[i]))return!1;return!0}function _o(e,t,i,n,r,l){if(Qt=l,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ar.current=e===null||e.memoizedState===null?Lg:zg,e=i(n,r),tn){l=0;do{if(tn=!1,En=0,25<=l)throw Error(v(301));l+=1,se=ie=null,t.updateQueue=null,ar.current=_g,e=i(n,r)}while(tn)}if(ar.current=Dr,t=ie!==null&&ie.next!==null,Qt=0,se=ie=V=null,Fr=!1,t)throw Error(v(300));return e}function To(){var e=En!==0;return En=0,e}function Ye(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?V.memoizedState=se=e:se=se.next=e,se}function Re(){if(ie===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=ie.next;var t=se===null?V.memoizedState:se.next;if(t!==null)se=t,ie=e;else{if(e===null)throw Error(v(310));ie=e,e={memoizedState:ie.memoizedState,baseState:ie.baseState,baseQueue:ie.baseQueue,queue:ie.queue,next:null},se===null?V.memoizedState=se=e:se=se.next=e}return se}function Ln(e,t){return typeof t=="function"?t(e):t}function Pl(e){var t=Re(),i=t.queue;if(i===null)throw Error(v(311));i.lastRenderedReducer=e;var n=ie,r=n.baseQueue,l=i.pending;if(l!==null){if(r!==null){var s=r.next;r.next=l.next,l.next=s}n.baseQueue=r=l,i.pending=null}if(r!==null){l=r.next,n=n.baseState;var o=s=null,a=null,d=l;do{var y=d.lane;if((Qt&y)===y)a!==null&&(a=a.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var h={lane:y,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};a===null?(o=a=h,s=n):a=a.next=h,V.lanes|=y,Yt|=y}d=d.next}while(d!==null&&d!==l);a===null?s=n:a.next=o,Ge(n,t.memoizedState)||(xe=!0),t.memoizedState=n,t.baseState=s,t.baseQueue=a,i.lastRenderedState=n}if(e=i.interleaved,e!==null){r=e;do l=r.lane,V.lanes|=l,Yt|=l,r=r.next;while(r!==e)}else r===null&&(i.lanes=0);return[t.memoizedState,i.dispatch]}function Al(e){var t=Re(),i=t.queue;if(i===null)throw Error(v(311));i.lastRenderedReducer=e;var n=i.dispatch,r=i.pending,l=t.memoizedState;if(r!==null){i.pending=null;var s=r=r.next;do l=e(l,s.action),s=s.next;while(s!==r);Ge(l,t.memoizedState)||(xe=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),i.lastRenderedState=l}return[l,n]}function Nu(){}function Mu(e,t){var i=V,n=Re(),r=t(),l=!Ge(n.memoizedState,r);if(l&&(n.memoizedState=r,xe=!0),n=n.queue,No(Au.bind(null,i,n,e),[e]),n.getSnapshot!==t||l||se!==null&&se.memoizedState.tag&1){if(i.flags|=2048,zn(9,Pu.bind(null,i,n,r,t),void 0,null),oe===null)throw Error(v(349));Qt&30||ju(i,t,r)}return r}function ju(e,t,i){e.flags|=16384,e={getSnapshot:t,value:i},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(i=t.stores,i===null?t.stores=[e]:i.push(e))}function Pu(e,t,i,n){t.value=i,t.getSnapshot=n,$u(t)&&Iu(e)}function Au(e,t,i){return i(function(){$u(t)&&Iu(e)})}function $u(e){var t=e.getSnapshot;e=e.value;try{var i=t();return!Ge(e,i)}catch{return!0}}function Iu(e){var t=st(e,1);t!==null&&Ve(t,e,1,-1)}function ja(e){var t=Ye();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ln,lastRenderedState:e},t.queue=e,e=e.dispatch=Eg.bind(null,V,e),[t.memoizedState,e]}function zn(e,t,i,n){return e={tag:e,create:t,destroy:i,deps:n,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(i=t.lastEffect,i===null?t.lastEffect=e.next=e:(n=i.next,i.next=e,e.next=n,t.lastEffect=e)),e}function Ru(){return Re().memoizedState}function cr(e,t,i,n){var r=Ye();V.flags|=e,r.memoizedState=zn(1|t,i,void 0,n===void 0?null:n)}function tl(e,t,i,n){var r=Re();n=n===void 0?null:n;var l=void 0;if(ie!==null){var s=ie.memoizedState;if(l=s.destroy,n!==null&&zo(n,s.deps)){r.memoizedState=zn(t,i,l,n);return}}V.flags|=e,r.memoizedState=zn(1|t,i,l,n)}function Pa(e,t){return cr(8390656,8,e,t)}function No(e,t){return tl(2048,8,e,t)}function Ou(e,t){return tl(4,2,e,t)}function Fu(e,t){return tl(4,4,e,t)}function Du(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Hu(e,t,i){return i=i!=null?i.concat([e]):null,tl(4,4,Du.bind(null,t,e),i)}function Mo(){}function Bu(e,t){var i=Re();t=t===void 0?null:t;var n=i.memoizedState;return n!==null&&t!==null&&zo(t,n[1])?n[0]:(i.memoizedState=[e,t],e)}function Uu(e,t){var i=Re();t=t===void 0?null:t;var n=i.memoizedState;return n!==null&&t!==null&&zo(t,n[1])?n[0]:(e=e(),i.memoizedState=[e,t],e)}function Wu(e,t,i){return Qt&21?(Ge(i,t)||(i=Kc(),V.lanes|=i,Yt|=i,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,xe=!0),e.memoizedState=i)}function Sg(e,t){var i=R;R=i!==0&&4>i?i:4,e(!0);var n=jl.transition;jl.transition={};try{e(!1),t()}finally{R=i,jl.transition=n}}function Vu(){return Re().memoizedState}function Cg(e,t,i){var n=St(e);if(i={lane:n,action:i,hasEagerState:!1,eagerState:null,next:null},Gu(e))Qu(t,i);else if(i=zu(e,t,i,n),i!==null){var r=ye();Ve(i,e,n,r),Yu(i,t,n)}}function Eg(e,t,i){var n=St(e),r={lane:n,action:i,hasEagerState:!1,eagerState:null,next:null};if(Gu(e))Qu(t,r);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var s=t.lastRenderedState,o=l(s,i);if(r.hasEagerState=!0,r.eagerState=o,Ge(o,s)){var a=t.interleaved;a===null?(r.next=r,bo(t)):(r.next=a.next,a.next=r),t.interleaved=r;return}}catch{}finally{}i=zu(e,t,r,n),i!==null&&(r=ye(),Ve(i,e,n,r),Yu(i,t,n))}}function Gu(e){var t=e.alternate;return e===V||t!==null&&t===V}function Qu(e,t){tn=Fr=!0;var i=e.pending;i===null?t.next=t:(t.next=i.next,i.next=t),e.pending=t}function Yu(e,t,i){if(i&4194240){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,oo(e,i)}}var Dr={readContext:Ie,useCallback:de,useContext:de,useEffect:de,useImperativeHandle:de,useInsertionEffect:de,useLayoutEffect:de,useMemo:de,useReducer:de,useRef:de,useState:de,useDebugValue:de,useDeferredValue:de,useTransition:de,useMutableSource:de,useSyncExternalStore:de,useId:de,unstable_isNewReconciler:!1},Lg={readContext:Ie,useCallback:function(e,t){return Ye().memoizedState=[e,t===void 0?null:t],e},useContext:Ie,useEffect:Pa,useImperativeHandle:function(e,t,i){return i=i!=null?i.concat([e]):null,cr(4194308,4,Du.bind(null,t,e),i)},useLayoutEffect:function(e,t){return cr(4194308,4,e,t)},useInsertionEffect:function(e,t){return cr(4,2,e,t)},useMemo:function(e,t){var i=Ye();return t=t===void 0?null:t,e=e(),i.memoizedState=[e,t],e},useReducer:function(e,t,i){var n=Ye();return t=i!==void 0?i(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=Cg.bind(null,V,e),[n.memoizedState,e]},useRef:function(e){var t=Ye();return e={current:e},t.memoizedState=e},useState:ja,useDebugValue:Mo,useDeferredValue:function(e){return Ye().memoizedState=e},useTransition:function(){var e=ja(!1),t=e[0];return e=Sg.bind(null,e[1]),Ye().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,i){var n=V,r=Ye();if(U){if(i===void 0)throw Error(v(407));i=i()}else{if(i=t(),oe===null)throw Error(v(349));Qt&30||ju(n,t,i)}r.memoizedState=i;var l={value:i,getSnapshot:t};return r.queue=l,Pa(Au.bind(null,n,l,e),[e]),n.flags|=2048,zn(9,Pu.bind(null,n,l,i,t),void 0,null),i},useId:function(){var e=Ye(),t=oe.identifierPrefix;if(U){var i=tt,n=et;i=(n&~(1<<32-We(n)-1)).toString(32)+i,t=":"+t+"R"+i,i=En++,0<i&&(t+="H"+i.toString(32)),t+=":"}else i=bg++,t=":"+t+"r"+i.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},zg={readContext:Ie,useCallback:Bu,useContext:Ie,useEffect:No,useImperativeHandle:Hu,useInsertionEffect:Ou,useLayoutEffect:Fu,useMemo:Uu,useReducer:Pl,useRef:Ru,useState:function(){return Pl(Ln)},useDebugValue:Mo,useDeferredValue:function(e){var t=Re();return Wu(t,ie.memoizedState,e)},useTransition:function(){var e=Pl(Ln)[0],t=Re().memoizedState;return[e,t]},useMutableSource:Nu,useSyncExternalStore:Mu,useId:Vu,unstable_isNewReconciler:!1},_g={readContext:Ie,useCallback:Bu,useContext:Ie,useEffect:No,useImperativeHandle:Hu,useInsertionEffect:Ou,useLayoutEffect:Fu,useMemo:Uu,useReducer:Al,useRef:Ru,useState:function(){return Al(Ln)},useDebugValue:Mo,useDeferredValue:function(e){var t=Re();return ie===null?t.memoizedState=e:Wu(t,ie.memoizedState,e)},useTransition:function(){var e=Al(Ln)[0],t=Re().memoizedState;return[e,t]},useMutableSource:Nu,useSyncExternalStore:Mu,useId:Vu,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=G({},t),e=e.defaultProps;for(var i in e)t[i]===void 0&&(t[i]=e[i]);return t}return t}function Ls(e,t,i,n){t=e.memoizedState,i=i(n,t),i=i==null?t:G({},t,i),e.memoizedState=i,e.lanes===0&&(e.updateQueue.baseState=i)}var il={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,i){e=e._reactInternals;var n=ye(),r=St(e),l=it(n,r);l.payload=t,i!=null&&(l.callback=i),t=kt(e,l,r),t!==null&&(Ve(t,e,r,n),or(t,e,r))},enqueueReplaceState:function(e,t,i){e=e._reactInternals;var n=ye(),r=St(e),l=it(n,r);l.tag=1,l.payload=t,i!=null&&(l.callback=i),t=kt(e,l,r),t!==null&&(Ve(t,e,r,n),or(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var i=ye(),n=St(e),r=it(i,n);r.tag=2,t!=null&&(r.callback=t),t=kt(e,r,n),t!==null&&(Ve(t,e,n,i),or(t,e,n))}};function Aa(e,t,i,n,r,l,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,l,s):t.prototype&&t.prototype.isPureReactComponent?!wn(i,n)||!wn(r,l):!0}function Ku(e,t,i){var n=!1,r=Lt,l=t.contextType;return typeof l=="object"&&l!==null?l=Ie(l):(r=be(t)?Vt:ge.current,n=t.contextTypes,l=(n=n!=null)?ki(e,r):Lt),t=new t(i,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=il,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=l),t}function $a(e,t,i,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(i,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(i,n),t.state!==e&&il.enqueueReplaceState(t,t.state,null)}function zs(e,t,i,n){var r=e.stateNode;r.props=i,r.state=e.memoizedState,r.refs={},So(e);var l=t.contextType;typeof l=="object"&&l!==null?r.context=Ie(l):(l=be(t)?Vt:ge.current,r.context=ki(e,l)),r.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Ls(e,t,l,i),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&il.enqueueReplaceState(r,r.state,null),Rr(e,i,r,n),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Ei(e,t){try{var i="",n=t;do i+=ip(n),n=n.return;while(n);var r=i}catch(l){r=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:r,digest:null}}function $l(e,t,i){return{value:e,source:null,stack:i??null,digest:t??null}}function _s(e,t){try{console.error(t.value)}catch(i){setTimeout(function(){throw i})}}var Tg=typeof WeakMap=="function"?WeakMap:Map;function Xu(e,t,i){i=it(-1,i),i.tag=3,i.payload={element:null};var n=t.value;return i.callback=function(){Br||(Br=!0,Os=n),_s(e,t)},i}function qu(e,t,i){i=it(-1,i),i.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var r=t.value;i.payload=function(){return n(r)},i.callback=function(){_s(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(i.callback=function(){_s(e,t),typeof n!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),i}function Ia(e,t,i){var n=e.pingCache;if(n===null){n=e.pingCache=new Tg;var r=new Set;n.set(t,r)}else r=n.get(t),r===void 0&&(r=new Set,n.set(t,r));r.has(i)||(r.add(i),e=Ug.bind(null,e,t,i),t.then(e,e))}function Ra(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Oa(e,t,i,n,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,i.flags|=131072,i.flags&=-52805,i.tag===1&&(i.alternate===null?i.tag=17:(t=it(-1,1),t.tag=2,kt(i,t,1))),i.lanes|=1),e)}var Ng=at.ReactCurrentOwner,xe=!1;function he(e,t,i,n){t.child=e===null?Lu(t,null,i,n):Si(t,e.child,i,n)}function Fa(e,t,i,n,r){i=i.render;var l=t.ref;return hi(t,r),n=_o(e,t,i,n,l,r),i=To(),e!==null&&!xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,ot(e,t,r)):(U&&i&&yo(t),t.flags|=1,he(e,t,n,r),t.child)}function Da(e,t,i,n,r){if(e===null){var l=i.type;return typeof l=="function"&&!Fo(l)&&l.defaultProps===void 0&&i.compare===null&&i.defaultProps===void 0?(t.tag=15,t.type=l,Zu(e,t,l,n,r)):(e=pr(i.type,null,n,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&r)){var s=l.memoizedProps;if(i=i.compare,i=i!==null?i:wn,i(s,n)&&e.ref===t.ref)return ot(e,t,r)}return t.flags|=1,e=Ct(l,n),e.ref=t.ref,e.return=t,t.child=e}function Zu(e,t,i,n,r){if(e!==null){var l=e.memoizedProps;if(wn(l,n)&&e.ref===t.ref)if(xe=!1,t.pendingProps=n=l,(e.lanes&r)!==0)e.flags&131072&&(xe=!0);else return t.lanes=e.lanes,ot(e,t,r)}return Ts(e,t,i,n,r)}function Ju(e,t,i){var n=t.pendingProps,r=n.children,l=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(ui,Ce),Ce|=i;else{if(!(i&1073741824))return e=l!==null?l.baseLanes|i:i,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,D(ui,Ce),Ce|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=l!==null?l.baseLanes:i,D(ui,Ce),Ce|=n}else l!==null?(n=l.baseLanes|i,t.memoizedState=null):n=i,D(ui,Ce),Ce|=n;return he(e,t,r,i),t.child}function ed(e,t){var i=t.ref;(e===null&&i!==null||e!==null&&e.ref!==i)&&(t.flags|=512,t.flags|=2097152)}function Ts(e,t,i,n,r){var l=be(i)?Vt:ge.current;return l=ki(t,l),hi(t,r),i=_o(e,t,i,n,l,r),n=To(),e!==null&&!xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,ot(e,t,r)):(U&&n&&yo(t),t.flags|=1,he(e,t,i,r),t.child)}function Ha(e,t,i,n,r){if(be(i)){var l=!0;jr(t)}else l=!1;if(hi(t,r),t.stateNode===null)ur(e,t),Ku(t,i,n),zs(t,i,n,r),n=!0;else if(e===null){var s=t.stateNode,o=t.memoizedProps;s.props=o;var a=s.context,d=i.contextType;typeof d=="object"&&d!==null?d=Ie(d):(d=be(i)?Vt:ge.current,d=ki(t,d));var y=i.getDerivedStateFromProps,h=typeof y=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==n||a!==d)&&$a(t,s,n,d),ft=!1;var g=t.memoizedState;s.state=g,Rr(t,n,s,r),a=t.memoizedState,o!==n||g!==a||ke.current||ft?(typeof y=="function"&&(Ls(t,i,y,n),a=t.memoizedState),(o=ft||Aa(t,i,o,n,g,a,d))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=a),s.props=n,s.state=a,s.context=d,n=o):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,_u(e,t),o=t.memoizedProps,d=t.type===t.elementType?o:De(t.type,o),s.props=d,h=t.pendingProps,g=s.context,a=i.contextType,typeof a=="object"&&a!==null?a=Ie(a):(a=be(i)?Vt:ge.current,a=ki(t,a));var w=i.getDerivedStateFromProps;(y=typeof w=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==h||g!==a)&&$a(t,s,n,a),ft=!1,g=t.memoizedState,s.state=g,Rr(t,n,s,r);var x=t.memoizedState;o!==h||g!==x||ke.current||ft?(typeof w=="function"&&(Ls(t,i,w,n),x=t.memoizedState),(d=ft||Aa(t,i,d,n,g,x,a)||!1)?(y||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,x,a),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,x,a)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=x),s.props=n,s.state=x,s.context=a,n=d):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),n=!1)}return Ns(e,t,i,n,l,r)}function Ns(e,t,i,n,r,l){ed(e,t);var s=(t.flags&128)!==0;if(!n&&!s)return r&&La(t,i,!1),ot(e,t,l);n=t.stateNode,Ng.current=t;var o=s&&typeof i.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&s?(t.child=Si(t,e.child,null,l),t.child=Si(t,null,o,l)):he(e,t,o,l),t.memoizedState=n.state,r&&La(t,i,!0),t.child}function td(e){var t=e.stateNode;t.pendingContext?Ea(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ea(e,t.context,!1),Co(e,t.containerInfo)}function Ba(e,t,i,n,r){return bi(),vo(r),t.flags|=256,he(e,t,i,n),t.child}var Ms={dehydrated:null,treeContext:null,retryLane:0};function js(e){return{baseLanes:e,cachePool:null,transitions:null}}function id(e,t,i){var n=t.pendingProps,r=W.current,l=!1,s=(t.flags&128)!==0,o;if((o=s)||(o=e!==null&&e.memoizedState===null?!1:(r&2)!==0),o?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),D(W,r&1),e===null)return Cs(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=n.children,e=n.fallback,l?(n=t.mode,l=t.child,s={mode:"hidden",children:s},!(n&1)&&l!==null?(l.childLanes=0,l.pendingProps=s):l=ll(s,n,0,null),e=Bt(e,n,i,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=js(i),t.memoizedState=Ms,e):jo(t,s));if(r=e.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return Mg(e,t,s,n,o,r,i);if(l){l=n.fallback,s=t.mode,r=e.child,o=r.sibling;var a={mode:"hidden",children:n.children};return!(s&1)&&t.child!==r?(n=t.child,n.childLanes=0,n.pendingProps=a,t.deletions=null):(n=Ct(r,a),n.subtreeFlags=r.subtreeFlags&14680064),o!==null?l=Ct(o,l):(l=Bt(l,s,i,null),l.flags|=2),l.return=t,n.return=t,n.sibling=l,t.child=n,n=l,l=t.child,s=e.child.memoizedState,s=s===null?js(i):{baseLanes:s.baseLanes|i,cachePool:null,transitions:s.transitions},l.memoizedState=s,l.childLanes=e.childLanes&~i,t.memoizedState=Ms,n}return l=e.child,e=l.sibling,n=Ct(l,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=i),n.return=t,n.sibling=null,e!==null&&(i=t.deletions,i===null?(t.deletions=[e],t.flags|=16):i.push(e)),t.child=n,t.memoizedState=null,n}function jo(e,t){return t=ll({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function qn(e,t,i,n){return n!==null&&vo(n),Si(t,e.child,null,i),e=jo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Mg(e,t,i,n,r,l,s){if(i)return t.flags&256?(t.flags&=-257,n=$l(Error(v(422))),qn(e,t,s,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=n.fallback,r=t.mode,n=ll({mode:"visible",children:n.children},r,0,null),l=Bt(l,r,s,null),l.flags|=2,n.return=t,l.return=t,n.sibling=l,t.child=n,t.mode&1&&Si(t,e.child,null,s),t.child.memoizedState=js(s),t.memoizedState=Ms,l);if(!(t.mode&1))return qn(e,t,s,null);if(r.data==="$!"){if(n=r.nextSibling&&r.nextSibling.dataset,n)var o=n.dgst;return n=o,l=Error(v(419)),n=$l(l,n,void 0),qn(e,t,s,n)}if(o=(s&e.childLanes)!==0,xe||o){if(n=oe,n!==null){switch(s&-s){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(n.suspendedLanes|s)?0:r,r!==0&&r!==l.retryLane&&(l.retryLane=r,st(e,r),Ve(n,e,r,-1))}return Oo(),n=$l(Error(v(421))),qn(e,t,s,n)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=Wg.bind(null,e),r._reactRetry=t,null):(e=l.treeContext,Le=xt(r.nextSibling),ze=t,U=!0,Be=null,e!==null&&(Me[je++]=et,Me[je++]=tt,Me[je++]=Gt,et=e.id,tt=e.overflow,Gt=t),t=jo(t,n.children),t.flags|=4096,t)}function Ua(e,t,i){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Es(e.return,t,i)}function Il(e,t,i,n,r){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:i,tailMode:r}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=i,l.tailMode=r)}function nd(e,t,i){var n=t.pendingProps,r=n.revealOrder,l=n.tail;if(he(e,t,n.children,i),n=W.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ua(e,i,t);else if(e.tag===19)Ua(e,i,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(D(W,n),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(i=t.child,r=null;i!==null;)e=i.alternate,e!==null&&Or(e)===null&&(r=i),i=i.sibling;i=r,i===null?(r=t.child,t.child=null):(r=i.sibling,i.sibling=null),Il(t,!1,r,i,l);break;case"backwards":for(i=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Or(e)===null){t.child=r;break}e=r.sibling,r.sibling=i,i=r,r=e}Il(t,!0,i,null,l);break;case"together":Il(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ur(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ot(e,t,i){if(e!==null&&(t.dependencies=e.dependencies),Yt|=t.lanes,!(i&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(v(153));if(t.child!==null){for(e=t.child,i=Ct(e,e.pendingProps),t.child=i,i.return=t;e.sibling!==null;)e=e.sibling,i=i.sibling=Ct(e,e.pendingProps),i.return=t;i.sibling=null}return t.child}function jg(e,t,i){switch(t.tag){case 3:td(t),bi();break;case 5:Tu(t);break;case 1:be(t.type)&&jr(t);break;case 4:Co(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,r=t.memoizedProps.value;D($r,n._currentValue),n._currentValue=r;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(D(W,W.current&1),t.flags|=128,null):i&t.child.childLanes?id(e,t,i):(D(W,W.current&1),e=ot(e,t,i),e!==null?e.sibling:null);D(W,W.current&1);break;case 19:if(n=(i&t.childLanes)!==0,e.flags&128){if(n)return nd(e,t,i);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),D(W,W.current),n)break;return null;case 22:case 23:return t.lanes=0,Ju(e,t,i)}return ot(e,t,i)}var rd,Ps,ld,sd;rd=function(e,t){for(var i=t.child;i!==null;){if(i.tag===5||i.tag===6)e.appendChild(i.stateNode);else if(i.tag!==4&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}};Ps=function(){};ld=function(e,t,i,n){var r=e.memoizedProps;if(r!==n){e=t.stateNode,Ft(qe.current);var l=null;switch(i){case"input":r=ts(e,r),n=ts(e,n),l=[];break;case"select":r=G({},r,{value:void 0}),n=G({},n,{value:void 0}),l=[];break;case"textarea":r=rs(e,r),n=rs(e,n),l=[];break;default:typeof r.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=Nr)}ss(i,n);var s;i=null;for(d in r)if(!n.hasOwnProperty(d)&&r.hasOwnProperty(d)&&r[d]!=null)if(d==="style"){var o=r[d];for(s in o)o.hasOwnProperty(s)&&(i||(i={}),i[s]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(fn.hasOwnProperty(d)?l||(l=[]):(l=l||[]).push(d,null));for(d in n){var a=n[d];if(o=r!=null?r[d]:void 0,n.hasOwnProperty(d)&&a!==o&&(a!=null||o!=null))if(d==="style")if(o){for(s in o)!o.hasOwnProperty(s)||a&&a.hasOwnProperty(s)||(i||(i={}),i[s]="");for(s in a)a.hasOwnProperty(s)&&o[s]!==a[s]&&(i||(i={}),i[s]=a[s])}else i||(l||(l=[]),l.push(d,i)),i=a;else d==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,o=o?o.__html:void 0,a!=null&&o!==a&&(l=l||[]).push(d,a)):d==="children"?typeof a!="string"&&typeof a!="number"||(l=l||[]).push(d,""+a):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(fn.hasOwnProperty(d)?(a!=null&&d==="onScroll"&&H("scroll",e),l||o===a||(l=[])):(l=l||[]).push(d,a))}i&&(l=l||[]).push("style",i);var d=l;(t.updateQueue=d)&&(t.flags|=4)}};sd=function(e,t,i,n){i!==n&&(t.flags|=4)};function Oi(e,t){if(!U)switch(e.tailMode){case"hidden":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var n=null;i!==null;)i.alternate!==null&&(n=i),i=i.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,i=0,n=0;if(t)for(var r=e.child;r!==null;)i|=r.lanes|r.childLanes,n|=r.subtreeFlags&14680064,n|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)i|=r.lanes|r.childLanes,n|=r.subtreeFlags,n|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=n,e.childLanes=i,t}function Pg(e,t,i){var n=t.pendingProps;switch(mo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(t),null;case 1:return be(t.type)&&Mr(),fe(t),null;case 3:return n=t.stateNode,Ci(),B(ke),B(ge),Lo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Kn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(Hs(Be),Be=null))),Ps(e,t),fe(t),null;case 5:Eo(t);var r=Ft(Cn.current);if(i=t.type,e!==null&&t.stateNode!=null)ld(e,t,i,n,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(v(166));return fe(t),null}if(e=Ft(qe.current),Kn(t)){n=t.stateNode,i=t.type;var l=t.memoizedProps;switch(n[Ke]=t,n[bn]=l,e=(t.mode&1)!==0,i){case"dialog":H("cancel",n),H("close",n);break;case"iframe":case"object":case"embed":H("load",n);break;case"video":case"audio":for(r=0;r<Yi.length;r++)H(Yi[r],n);break;case"source":H("error",n);break;case"img":case"image":case"link":H("error",n),H("load",n);break;case"details":H("toggle",n);break;case"input":Zo(n,l),H("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!l.multiple},H("invalid",n);break;case"textarea":ea(n,l),H("invalid",n)}ss(i,l),r=null;for(var s in l)if(l.hasOwnProperty(s)){var o=l[s];s==="children"?typeof o=="string"?n.textContent!==o&&(l.suppressHydrationWarning!==!0&&Yn(n.textContent,o,e),r=["children",o]):typeof o=="number"&&n.textContent!==""+o&&(l.suppressHydrationWarning!==!0&&Yn(n.textContent,o,e),r=["children",""+o]):fn.hasOwnProperty(s)&&o!=null&&s==="onScroll"&&H("scroll",n)}switch(i){case"input":Dn(n),Jo(n,l,!0);break;case"textarea":Dn(n),ta(n);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(n.onclick=Nr)}n=r,t.updateQueue=n,n!==null&&(t.flags|=4)}else{s=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ac(i)),e==="http://www.w3.org/1999/xhtml"?i==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=s.createElement(i,{is:n.is}):(e=s.createElement(i),i==="select"&&(s=e,n.multiple?s.multiple=!0:n.size&&(s.size=n.size))):e=s.createElementNS(e,i),e[Ke]=t,e[bn]=n,rd(e,t,!1,!1),t.stateNode=e;e:{switch(s=os(i,n),i){case"dialog":H("cancel",e),H("close",e),r=n;break;case"iframe":case"object":case"embed":H("load",e),r=n;break;case"video":case"audio":for(r=0;r<Yi.length;r++)H(Yi[r],e);r=n;break;case"source":H("error",e),r=n;break;case"img":case"image":case"link":H("error",e),H("load",e),r=n;break;case"details":H("toggle",e),r=n;break;case"input":Zo(e,n),r=ts(e,n),H("invalid",e);break;case"option":r=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},r=G({},n,{value:void 0}),H("invalid",e);break;case"textarea":ea(e,n),r=rs(e,n),H("invalid",e);break;default:r=n}ss(i,r),o=r;for(l in o)if(o.hasOwnProperty(l)){var a=o[l];l==="style"?Rc(e,a):l==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&$c(e,a)):l==="children"?typeof a=="string"?(i!=="textarea"||a!=="")&&pn(e,a):typeof a=="number"&&pn(e,""+a):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(fn.hasOwnProperty(l)?a!=null&&l==="onScroll"&&H("scroll",e):a!=null&&to(e,l,a,s))}switch(i){case"input":Dn(e),Jo(e,n,!1);break;case"textarea":Dn(e),ta(e);break;case"option":n.value!=null&&e.setAttribute("value",""+Et(n.value));break;case"select":e.multiple=!!n.multiple,l=n.value,l!=null?di(e,!!n.multiple,l,!1):n.defaultValue!=null&&di(e,!!n.multiple,n.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=Nr)}switch(i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return fe(t),null;case 6:if(e&&t.stateNode!=null)sd(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(v(166));if(i=Ft(Cn.current),Ft(qe.current),Kn(t)){if(n=t.stateNode,i=t.memoizedProps,n[Ke]=t,(l=n.nodeValue!==i)&&(e=ze,e!==null))switch(e.tag){case 3:Yn(n.nodeValue,i,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Yn(n.nodeValue,i,(e.mode&1)!==0)}l&&(t.flags|=4)}else n=(i.nodeType===9?i:i.ownerDocument).createTextNode(n),n[Ke]=t,t.stateNode=n}return fe(t),null;case 13:if(B(W),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(U&&Le!==null&&t.mode&1&&!(t.flags&128))Cu(),bi(),t.flags|=98560,l=!1;else if(l=Kn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!l)throw Error(v(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(v(317));l[Ke]=t}else bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;fe(t),l=!1}else Be!==null&&(Hs(Be),Be=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=i,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?re===0&&(re=3):Oo())),t.updateQueue!==null&&(t.flags|=4),fe(t),null);case 4:return Ci(),Ps(e,t),e===null&&xn(t.stateNode.containerInfo),fe(t),null;case 10:return ko(t.type._context),fe(t),null;case 17:return be(t.type)&&Mr(),fe(t),null;case 19:if(B(W),l=t.memoizedState,l===null)return fe(t),null;if(n=(t.flags&128)!==0,s=l.rendering,s===null)if(n)Oi(l,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Or(e),s!==null){for(t.flags|=128,Oi(l,!1),n=s.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=i,i=t.child;i!==null;)l=i,e=n,l.flags&=14680066,s=l.alternate,s===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=s.childLanes,l.lanes=s.lanes,l.child=s.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=s.memoizedProps,l.memoizedState=s.memoizedState,l.updateQueue=s.updateQueue,l.type=s.type,e=s.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),i=i.sibling;return D(W,W.current&1|2),t.child}e=e.sibling}l.tail!==null&&Z()>Li&&(t.flags|=128,n=!0,Oi(l,!1),t.lanes=4194304)}else{if(!n)if(e=Or(s),e!==null){if(t.flags|=128,n=!0,i=e.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),Oi(l,!0),l.tail===null&&l.tailMode==="hidden"&&!s.alternate&&!U)return fe(t),null}else 2*Z()-l.renderingStartTime>Li&&i!==1073741824&&(t.flags|=128,n=!0,Oi(l,!1),t.lanes=4194304);l.isBackwards?(s.sibling=t.child,t.child=s):(i=l.last,i!==null?i.sibling=s:t.child=s,l.last=s)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Z(),t.sibling=null,i=W.current,D(W,n?i&1|2:i&1),t):(fe(t),null);case 22:case 23:return Ro(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?Ce&1073741824&&(fe(t),t.subtreeFlags&6&&(t.flags|=8192)):fe(t),null;case 24:return null;case 25:return null}throw Error(v(156,t.tag))}function Ag(e,t){switch(mo(t),t.tag){case 1:return be(t.type)&&Mr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ci(),B(ke),B(ge),Lo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Eo(t),null;case 13:if(B(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(v(340));bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(W),null;case 4:return Ci(),null;case 10:return ko(t.type._context),null;case 22:case 23:return Ro(),null;case 24:return null;default:return null}}var Zn=!1,pe=!1,$g=typeof WeakSet=="function"?WeakSet:Set,b=null;function ci(e,t){var i=e.ref;if(i!==null)if(typeof i=="function")try{i(null)}catch(n){Q(e,t,n)}else i.current=null}function As(e,t,i){try{i()}catch(n){Q(e,t,n)}}var Wa=!1;function Ig(e,t){if(ms=zr,e=du(),ho(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var n=i.getSelection&&i.getSelection();if(n&&n.rangeCount!==0){i=n.anchorNode;var r=n.anchorOffset,l=n.focusNode;n=n.focusOffset;try{i.nodeType,l.nodeType}catch{i=null;break e}var s=0,o=-1,a=-1,d=0,y=0,h=e,g=null;t:for(;;){for(var w;h!==i||r!==0&&h.nodeType!==3||(o=s+r),h!==l||n!==0&&h.nodeType!==3||(a=s+n),h.nodeType===3&&(s+=h.nodeValue.length),(w=h.firstChild)!==null;)g=h,h=w;for(;;){if(h===e)break t;if(g===i&&++d===r&&(o=s),g===l&&++y===n&&(a=s),(w=h.nextSibling)!==null)break;h=g,g=h.parentNode}h=w}i=o===-1||a===-1?null:{start:o,end:a}}else i=null}i=i||{start:0,end:0}}else i=null;for(vs={focusedElem:e,selectionRange:i},zr=!1,b=t;b!==null;)if(t=b,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,b=e;else for(;b!==null;){t=b;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var k=x.memoizedProps,O=x.memoizedState,f=t.stateNode,u=f.getSnapshotBeforeUpdate(t.elementType===t.type?k:De(t.type,k),O);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var c=t.stateNode.containerInfo;c.nodeType===1?c.textContent="":c.nodeType===9&&c.documentElement&&c.removeChild(c.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(v(163))}}catch(m){Q(t,t.return,m)}if(e=t.sibling,e!==null){e.return=t.return,b=e;break}b=t.return}return x=Wa,Wa=!1,x}function nn(e,t,i){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var r=n=n.next;do{if((r.tag&e)===e){var l=r.destroy;r.destroy=void 0,l!==void 0&&As(t,i,l)}r=r.next}while(r!==n)}}function nl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var i=t=t.next;do{if((i.tag&e)===e){var n=i.create;i.destroy=n()}i=i.next}while(i!==t)}}function $s(e){var t=e.ref;if(t!==null){var i=e.stateNode;switch(e.tag){case 5:e=i;break;default:e=i}typeof t=="function"?t(e):t.current=e}}function od(e){var t=e.alternate;t!==null&&(e.alternate=null,od(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ke],delete t[bn],delete t[ks],delete t[vg],delete t[wg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ad(e){return e.tag===5||e.tag===3||e.tag===4}function Va(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ad(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Is(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?i.nodeType===8?i.parentNode.insertBefore(e,t):i.insertBefore(e,t):(i.nodeType===8?(t=i.parentNode,t.insertBefore(e,i)):(t=i,t.appendChild(e)),i=i._reactRootContainer,i!=null||t.onclick!==null||(t.onclick=Nr));else if(n!==4&&(e=e.child,e!==null))for(Is(e,t,i),e=e.sibling;e!==null;)Is(e,t,i),e=e.sibling}function Rs(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?i.insertBefore(e,t):i.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Rs(e,t,i),e=e.sibling;e!==null;)Rs(e,t,i),e=e.sibling}var ae=null,He=!1;function ct(e,t,i){for(i=i.child;i!==null;)cd(e,t,i),i=i.sibling}function cd(e,t,i){if(Xe&&typeof Xe.onCommitFiberUnmount=="function")try{Xe.onCommitFiberUnmount(Kr,i)}catch{}switch(i.tag){case 5:pe||ci(i,t);case 6:var n=ae,r=He;ae=null,ct(e,t,i),ae=n,He=r,ae!==null&&(He?(e=ae,i=i.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)):ae.removeChild(i.stateNode));break;case 18:ae!==null&&(He?(e=ae,i=i.stateNode,e.nodeType===8?Tl(e.parentNode,i):e.nodeType===1&&Tl(e,i),mn(e)):Tl(ae,i.stateNode));break;case 4:n=ae,r=He,ae=i.stateNode.containerInfo,He=!0,ct(e,t,i),ae=n,He=r;break;case 0:case 11:case 14:case 15:if(!pe&&(n=i.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){r=n=n.next;do{var l=r,s=l.destroy;l=l.tag,s!==void 0&&(l&2||l&4)&&As(i,t,s),r=r.next}while(r!==n)}ct(e,t,i);break;case 1:if(!pe&&(ci(i,t),n=i.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=i.memoizedProps,n.state=i.memoizedState,n.componentWillUnmount()}catch(o){Q(i,t,o)}ct(e,t,i);break;case 21:ct(e,t,i);break;case 22:i.mode&1?(pe=(n=pe)||i.memoizedState!==null,ct(e,t,i),pe=n):ct(e,t,i);break;default:ct(e,t,i)}}function Ga(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var i=e.stateNode;i===null&&(i=e.stateNode=new $g),t.forEach(function(n){var r=Vg.bind(null,e,n);i.has(n)||(i.add(n),n.then(r,r))})}}function Fe(e,t){var i=t.deletions;if(i!==null)for(var n=0;n<i.length;n++){var r=i[n];try{var l=e,s=t,o=s;e:for(;o!==null;){switch(o.tag){case 5:ae=o.stateNode,He=!1;break e;case 3:ae=o.stateNode.containerInfo,He=!0;break e;case 4:ae=o.stateNode.containerInfo,He=!0;break e}o=o.return}if(ae===null)throw Error(v(160));cd(l,s,r),ae=null,He=!1;var a=r.alternate;a!==null&&(a.return=null),r.return=null}catch(d){Q(r,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ud(t,e),t=t.sibling}function ud(e,t){var i=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Fe(t,e),Qe(e),n&4){try{nn(3,e,e.return),nl(3,e)}catch(k){Q(e,e.return,k)}try{nn(5,e,e.return)}catch(k){Q(e,e.return,k)}}break;case 1:Fe(t,e),Qe(e),n&512&&i!==null&&ci(i,i.return);break;case 5:if(Fe(t,e),Qe(e),n&512&&i!==null&&ci(i,i.return),e.flags&32){var r=e.stateNode;try{pn(r,"")}catch(k){Q(e,e.return,k)}}if(n&4&&(r=e.stateNode,r!=null)){var l=e.memoizedProps,s=i!==null?i.memoizedProps:l,o=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{o==="input"&&l.type==="radio"&&l.name!=null&&jc(r,l),os(o,s);var d=os(o,l);for(s=0;s<a.length;s+=2){var y=a[s],h=a[s+1];y==="style"?Rc(r,h):y==="dangerouslySetInnerHTML"?$c(r,h):y==="children"?pn(r,h):to(r,y,h,d)}switch(o){case"input":is(r,l);break;case"textarea":Pc(r,l);break;case"select":var g=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!l.multiple;var w=l.value;w!=null?di(r,!!l.multiple,w,!1):g!==!!l.multiple&&(l.defaultValue!=null?di(r,!!l.multiple,l.defaultValue,!0):di(r,!!l.multiple,l.multiple?[]:"",!1))}r[bn]=l}catch(k){Q(e,e.return,k)}}break;case 6:if(Fe(t,e),Qe(e),n&4){if(e.stateNode===null)throw Error(v(162));r=e.stateNode,l=e.memoizedProps;try{r.nodeValue=l}catch(k){Q(e,e.return,k)}}break;case 3:if(Fe(t,e),Qe(e),n&4&&i!==null&&i.memoizedState.isDehydrated)try{mn(t.containerInfo)}catch(k){Q(e,e.return,k)}break;case 4:Fe(t,e),Qe(e);break;case 13:Fe(t,e),Qe(e),r=e.child,r.flags&8192&&(l=r.memoizedState!==null,r.stateNode.isHidden=l,!l||r.alternate!==null&&r.alternate.memoizedState!==null||($o=Z())),n&4&&Ga(e);break;case 22:if(y=i!==null&&i.memoizedState!==null,e.mode&1?(pe=(d=pe)||y,Fe(t,e),pe=d):Fe(t,e),Qe(e),n&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!y&&e.mode&1)for(b=e,y=e.child;y!==null;){for(h=b=y;b!==null;){switch(g=b,w=g.child,g.tag){case 0:case 11:case 14:case 15:nn(4,g,g.return);break;case 1:ci(g,g.return);var x=g.stateNode;if(typeof x.componentWillUnmount=="function"){n=g,i=g.return;try{t=n,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(k){Q(n,i,k)}}break;case 5:ci(g,g.return);break;case 22:if(g.memoizedState!==null){Ya(h);continue}}w!==null?(w.return=g,b=w):Ya(h)}y=y.sibling}e:for(y=null,h=e;;){if(h.tag===5){if(y===null){y=h;try{r=h.stateNode,d?(l=r.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(o=h.stateNode,a=h.memoizedProps.style,s=a!=null&&a.hasOwnProperty("display")?a.display:null,o.style.display=Ic("display",s))}catch(k){Q(e,e.return,k)}}}else if(h.tag===6){if(y===null)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(k){Q(e,e.return,k)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;y===h&&(y=null),h=h.return}y===h&&(y=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Fe(t,e),Qe(e),n&4&&Ga(e);break;case 21:break;default:Fe(t,e),Qe(e)}}function Qe(e){var t=e.flags;if(t&2){try{e:{for(var i=e.return;i!==null;){if(ad(i)){var n=i;break e}i=i.return}throw Error(v(160))}switch(n.tag){case 5:var r=n.stateNode;n.flags&32&&(pn(r,""),n.flags&=-33);var l=Va(e);Rs(e,l,r);break;case 3:case 4:var s=n.stateNode.containerInfo,o=Va(e);Is(e,o,s);break;default:throw Error(v(161))}}catch(a){Q(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Rg(e,t,i){b=e,dd(e)}function dd(e,t,i){for(var n=(e.mode&1)!==0;b!==null;){var r=b,l=r.child;if(r.tag===22&&n){var s=r.memoizedState!==null||Zn;if(!s){var o=r.alternate,a=o!==null&&o.memoizedState!==null||pe;o=Zn;var d=pe;if(Zn=s,(pe=a)&&!d)for(b=r;b!==null;)s=b,a=s.child,s.tag===22&&s.memoizedState!==null?Ka(r):a!==null?(a.return=s,b=a):Ka(r);for(;l!==null;)b=l,dd(l),l=l.sibling;b=r,Zn=o,pe=d}Qa(e)}else r.subtreeFlags&8772&&l!==null?(l.return=r,b=l):Qa(e)}}function Qa(e){for(;b!==null;){var t=b;if(t.flags&8772){var i=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:pe||nl(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!pe)if(i===null)n.componentDidMount();else{var r=t.elementType===t.type?i.memoizedProps:De(t.type,i.memoizedProps);n.componentDidUpdate(r,i.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Ma(t,l,n);break;case 3:var s=t.updateQueue;if(s!==null){if(i=null,t.child!==null)switch(t.child.tag){case 5:i=t.child.stateNode;break;case 1:i=t.child.stateNode}Ma(t,s,i)}break;case 5:var o=t.stateNode;if(i===null&&t.flags&4){i=o;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&i.focus();break;case"img":a.src&&(i.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var y=d.memoizedState;if(y!==null){var h=y.dehydrated;h!==null&&mn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(v(163))}pe||t.flags&512&&$s(t)}catch(g){Q(t,t.return,g)}}if(t===e){b=null;break}if(i=t.sibling,i!==null){i.return=t.return,b=i;break}b=t.return}}function Ya(e){for(;b!==null;){var t=b;if(t===e){b=null;break}var i=t.sibling;if(i!==null){i.return=t.return,b=i;break}b=t.return}}function Ka(e){for(;b!==null;){var t=b;try{switch(t.tag){case 0:case 11:case 15:var i=t.return;try{nl(4,t)}catch(a){Q(t,i,a)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var r=t.return;try{n.componentDidMount()}catch(a){Q(t,r,a)}}var l=t.return;try{$s(t)}catch(a){Q(t,l,a)}break;case 5:var s=t.return;try{$s(t)}catch(a){Q(t,s,a)}}}catch(a){Q(t,t.return,a)}if(t===e){b=null;break}var o=t.sibling;if(o!==null){o.return=t.return,b=o;break}b=t.return}}var Og=Math.ceil,Hr=at.ReactCurrentDispatcher,Po=at.ReactCurrentOwner,$e=at.ReactCurrentBatchConfig,$=0,oe=null,J=null,ce=0,Ce=0,ui=Tt(0),re=0,_n=null,Yt=0,rl=0,Ao=0,rn=null,we=null,$o=0,Li=1/0,Ze=null,Br=!1,Os=null,bt=null,Jn=!1,yt=null,Ur=0,ln=0,Fs=null,dr=-1,fr=0;function ye(){return $&6?Z():dr!==-1?dr:dr=Z()}function St(e){return e.mode&1?$&2&&ce!==0?ce&-ce:kg.transition!==null?(fr===0&&(fr=Kc()),fr):(e=R,e!==0||(e=window.event,e=e===void 0?16:iu(e.type)),e):1}function Ve(e,t,i,n){if(50<ln)throw ln=0,Fs=null,Error(v(185));Nn(e,i,n),(!($&2)||e!==oe)&&(e===oe&&(!($&2)&&(rl|=i),re===4&&gt(e,ce)),Se(e,n),i===1&&$===0&&!(t.mode&1)&&(Li=Z()+500,el&&Nt()))}function Se(e,t){var i=e.callbackNode;kp(e,t);var n=Lr(e,e===oe?ce:0);if(n===0)i!==null&&ra(i),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(i!=null&&ra(i),t===1)e.tag===0?xg(Xa.bind(null,e)):ku(Xa.bind(null,e)),yg(function(){!($&6)&&Nt()}),i=null;else{switch(Xc(n)){case 1:i=so;break;case 4:i=Qc;break;case 16:i=Er;break;case 536870912:i=Yc;break;default:i=Er}i=wd(i,fd.bind(null,e))}e.callbackPriority=t,e.callbackNode=i}}function fd(e,t){if(dr=-1,fr=0,$&6)throw Error(v(327));var i=e.callbackNode;if(yi()&&e.callbackNode!==i)return null;var n=Lr(e,e===oe?ce:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=Wr(e,n);else{t=n;var r=$;$|=2;var l=gd();(oe!==e||ce!==t)&&(Ze=null,Li=Z()+500,Ht(e,t));do try{Hg();break}catch(o){pd(e,o)}while(!0);xo(),Hr.current=l,$=r,J!==null?t=0:(oe=null,ce=0,t=re)}if(t!==0){if(t===2&&(r=fs(e),r!==0&&(n=r,t=Ds(e,r))),t===1)throw i=_n,Ht(e,0),gt(e,n),Se(e,Z()),i;if(t===6)gt(e,n);else{if(r=e.current.alternate,!(n&30)&&!Fg(r)&&(t=Wr(e,n),t===2&&(l=fs(e),l!==0&&(n=l,t=Ds(e,l))),t===1))throw i=_n,Ht(e,0),gt(e,n),Se(e,Z()),i;switch(e.finishedWork=r,e.finishedLanes=n,t){case 0:case 1:throw Error(v(345));case 2:$t(e,we,Ze);break;case 3:if(gt(e,n),(n&130023424)===n&&(t=$o+500-Z(),10<t)){if(Lr(e,0)!==0)break;if(r=e.suspendedLanes,(r&n)!==n){ye(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=xs($t.bind(null,e,we,Ze),t);break}$t(e,we,Ze);break;case 4:if(gt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,r=-1;0<n;){var s=31-We(n);l=1<<s,s=t[s],s>r&&(r=s),n&=~l}if(n=r,n=Z()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Og(n/1960))-n,10<n){e.timeoutHandle=xs($t.bind(null,e,we,Ze),n);break}$t(e,we,Ze);break;case 5:$t(e,we,Ze);break;default:throw Error(v(329))}}}return Se(e,Z()),e.callbackNode===i?fd.bind(null,e):null}function Ds(e,t){var i=rn;return e.current.memoizedState.isDehydrated&&(Ht(e,t).flags|=256),e=Wr(e,t),e!==2&&(t=we,we=i,t!==null&&Hs(t)),e}function Hs(e){we===null?we=e:we.push.apply(we,e)}function Fg(e){for(var t=e;;){if(t.flags&16384){var i=t.updateQueue;if(i!==null&&(i=i.stores,i!==null))for(var n=0;n<i.length;n++){var r=i[n],l=r.getSnapshot;r=r.value;try{if(!Ge(l(),r))return!1}catch{return!1}}}if(i=t.child,t.subtreeFlags&16384&&i!==null)i.return=t,t=i;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gt(e,t){for(t&=~Ao,t&=~rl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var i=31-We(t),n=1<<i;e[i]=-1,t&=~n}}function Xa(e){if($&6)throw Error(v(327));yi();var t=Lr(e,0);if(!(t&1))return Se(e,Z()),null;var i=Wr(e,t);if(e.tag!==0&&i===2){var n=fs(e);n!==0&&(t=n,i=Ds(e,n))}if(i===1)throw i=_n,Ht(e,0),gt(e,t),Se(e,Z()),i;if(i===6)throw Error(v(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,$t(e,we,Ze),Se(e,Z()),null}function Io(e,t){var i=$;$|=1;try{return e(t)}finally{$=i,$===0&&(Li=Z()+500,el&&Nt())}}function Kt(e){yt!==null&&yt.tag===0&&!($&6)&&yi();var t=$;$|=1;var i=$e.transition,n=R;try{if($e.transition=null,R=1,e)return e()}finally{R=n,$e.transition=i,$=t,!($&6)&&Nt()}}function Ro(){Ce=ui.current,B(ui)}function Ht(e,t){e.finishedWork=null,e.finishedLanes=0;var i=e.timeoutHandle;if(i!==-1&&(e.timeoutHandle=-1,hg(i)),J!==null)for(i=J.return;i!==null;){var n=i;switch(mo(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&Mr();break;case 3:Ci(),B(ke),B(ge),Lo();break;case 5:Eo(n);break;case 4:Ci();break;case 13:B(W);break;case 19:B(W);break;case 10:ko(n.type._context);break;case 22:case 23:Ro()}i=i.return}if(oe=e,J=e=Ct(e.current,null),ce=Ce=t,re=0,_n=null,Ao=rl=Yt=0,we=rn=null,Ot!==null){for(t=0;t<Ot.length;t++)if(i=Ot[t],n=i.interleaved,n!==null){i.interleaved=null;var r=n.next,l=i.pending;if(l!==null){var s=l.next;l.next=r,n.next=s}i.pending=n}Ot=null}return e}function pd(e,t){do{var i=J;try{if(xo(),ar.current=Dr,Fr){for(var n=V.memoizedState;n!==null;){var r=n.queue;r!==null&&(r.pending=null),n=n.next}Fr=!1}if(Qt=0,se=ie=V=null,tn=!1,En=0,Po.current=null,i===null||i.return===null){re=1,_n=t,J=null;break}e:{var l=e,s=i.return,o=i,a=t;if(t=ce,o.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var d=a,y=o,h=y.tag;if(!(y.mode&1)&&(h===0||h===11||h===15)){var g=y.alternate;g?(y.updateQueue=g.updateQueue,y.memoizedState=g.memoizedState,y.lanes=g.lanes):(y.updateQueue=null,y.memoizedState=null)}var w=Ra(s);if(w!==null){w.flags&=-257,Oa(w,s,o,l,t),w.mode&1&&Ia(l,d,t),t=w,a=d;var x=t.updateQueue;if(x===null){var k=new Set;k.add(a),t.updateQueue=k}else x.add(a);break e}else{if(!(t&1)){Ia(l,d,t),Oo();break e}a=Error(v(426))}}else if(U&&o.mode&1){var O=Ra(s);if(O!==null){!(O.flags&65536)&&(O.flags|=256),Oa(O,s,o,l,t),vo(Ei(a,o));break e}}l=a=Ei(a,o),re!==4&&(re=2),rn===null?rn=[l]:rn.push(l),l=s;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=Xu(l,a,t);Na(l,f);break e;case 1:o=a;var u=l.type,c=l.stateNode;if(!(l.flags&128)&&(typeof u.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(bt===null||!bt.has(c)))){l.flags|=65536,t&=-t,l.lanes|=t;var m=qu(l,o,t);Na(l,m);break e}}l=l.return}while(l!==null)}yd(i)}catch(S){t=S,J===i&&i!==null&&(J=i=i.return);continue}break}while(!0)}function gd(){var e=Hr.current;return Hr.current=Dr,e===null?Dr:e}function Oo(){(re===0||re===3||re===2)&&(re=4),oe===null||!(Yt&268435455)&&!(rl&268435455)||gt(oe,ce)}function Wr(e,t){var i=$;$|=2;var n=gd();(oe!==e||ce!==t)&&(Ze=null,Ht(e,t));do try{Dg();break}catch(r){pd(e,r)}while(!0);if(xo(),$=i,Hr.current=n,J!==null)throw Error(v(261));return oe=null,ce=0,re}function Dg(){for(;J!==null;)hd(J)}function Hg(){for(;J!==null&&!fp();)hd(J)}function hd(e){var t=vd(e.alternate,e,Ce);e.memoizedProps=e.pendingProps,t===null?yd(e):J=t,Po.current=null}function yd(e){var t=e;do{var i=t.alternate;if(e=t.return,t.flags&32768){if(i=Ag(i,t),i!==null){i.flags&=32767,J=i;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,J=null;return}}else if(i=Pg(i,t,Ce),i!==null){J=i;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);re===0&&(re=5)}function $t(e,t,i){var n=R,r=$e.transition;try{$e.transition=null,R=1,Bg(e,t,i,n)}finally{$e.transition=r,R=n}return null}function Bg(e,t,i,n){do yi();while(yt!==null);if($&6)throw Error(v(327));i=e.finishedWork;var r=e.finishedLanes;if(i===null)return null;if(e.finishedWork=null,e.finishedLanes=0,i===e.current)throw Error(v(177));e.callbackNode=null,e.callbackPriority=0;var l=i.lanes|i.childLanes;if(bp(e,l),e===oe&&(J=oe=null,ce=0),!(i.subtreeFlags&2064)&&!(i.flags&2064)||Jn||(Jn=!0,wd(Er,function(){return yi(),null})),l=(i.flags&15990)!==0,i.subtreeFlags&15990||l){l=$e.transition,$e.transition=null;var s=R;R=1;var o=$;$|=4,Po.current=null,Ig(e,i),ud(i,e),ag(vs),zr=!!ms,vs=ms=null,e.current=i,Rg(i),pp(),$=o,R=s,$e.transition=l}else e.current=i;if(Jn&&(Jn=!1,yt=e,Ur=r),l=e.pendingLanes,l===0&&(bt=null),yp(i.stateNode),Se(e,Z()),t!==null)for(n=e.onRecoverableError,i=0;i<t.length;i++)r=t[i],n(r.value,{componentStack:r.stack,digest:r.digest});if(Br)throw Br=!1,e=Os,Os=null,e;return Ur&1&&e.tag!==0&&yi(),l=e.pendingLanes,l&1?e===Fs?ln++:(ln=0,Fs=e):ln=0,Nt(),null}function yi(){if(yt!==null){var e=Xc(Ur),t=$e.transition,i=R;try{if($e.transition=null,R=16>e?16:e,yt===null)var n=!1;else{if(e=yt,yt=null,Ur=0,$&6)throw Error(v(331));var r=$;for($|=4,b=e.current;b!==null;){var l=b,s=l.child;if(b.flags&16){var o=l.deletions;if(o!==null){for(var a=0;a<o.length;a++){var d=o[a];for(b=d;b!==null;){var y=b;switch(y.tag){case 0:case 11:case 15:nn(8,y,l)}var h=y.child;if(h!==null)h.return=y,b=h;else for(;b!==null;){y=b;var g=y.sibling,w=y.return;if(od(y),y===d){b=null;break}if(g!==null){g.return=w,b=g;break}b=w}}}var x=l.alternate;if(x!==null){var k=x.child;if(k!==null){x.child=null;do{var O=k.sibling;k.sibling=null,k=O}while(k!==null)}}b=l}}if(l.subtreeFlags&2064&&s!==null)s.return=l,b=s;else e:for(;b!==null;){if(l=b,l.flags&2048)switch(l.tag){case 0:case 11:case 15:nn(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,b=f;break e}b=l.return}}var u=e.current;for(b=u;b!==null;){s=b;var c=s.child;if(s.subtreeFlags&2064&&c!==null)c.return=s,b=c;else e:for(s=u;b!==null;){if(o=b,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:nl(9,o)}}catch(S){Q(o,o.return,S)}if(o===s){b=null;break e}var m=o.sibling;if(m!==null){m.return=o.return,b=m;break e}b=o.return}}if($=r,Nt(),Xe&&typeof Xe.onPostCommitFiberRoot=="function")try{Xe.onPostCommitFiberRoot(Kr,e)}catch{}n=!0}return n}finally{R=i,$e.transition=t}}return!1}function qa(e,t,i){t=Ei(i,t),t=Xu(e,t,1),e=kt(e,t,1),t=ye(),e!==null&&(Nn(e,1,t),Se(e,t))}function Q(e,t,i){if(e.tag===3)qa(e,e,i);else for(;t!==null;){if(t.tag===3){qa(t,e,i);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(bt===null||!bt.has(n))){e=Ei(i,e),e=qu(t,e,1),t=kt(t,e,1),e=ye(),t!==null&&(Nn(t,1,e),Se(t,e));break}}t=t.return}}function Ug(e,t,i){var n=e.pingCache;n!==null&&n.delete(t),t=ye(),e.pingedLanes|=e.suspendedLanes&i,oe===e&&(ce&i)===i&&(re===4||re===3&&(ce&130023424)===ce&&500>Z()-$o?Ht(e,0):Ao|=i),Se(e,t)}function md(e,t){t===0&&(e.mode&1?(t=Un,Un<<=1,!(Un&130023424)&&(Un=4194304)):t=1);var i=ye();e=st(e,t),e!==null&&(Nn(e,t,i),Se(e,i))}function Wg(e){var t=e.memoizedState,i=0;t!==null&&(i=t.retryLane),md(e,i)}function Vg(e,t){var i=0;switch(e.tag){case 13:var n=e.stateNode,r=e.memoizedState;r!==null&&(i=r.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(v(314))}n!==null&&n.delete(t),md(e,i)}var vd;vd=function(e,t,i){if(e!==null)if(e.memoizedProps!==t.pendingProps||ke.current)xe=!0;else{if(!(e.lanes&i)&&!(t.flags&128))return xe=!1,jg(e,t,i);xe=!!(e.flags&131072)}else xe=!1,U&&t.flags&1048576&&bu(t,Ar,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;ur(e,t),e=t.pendingProps;var r=ki(t,ge.current);hi(t,i),r=_o(null,t,n,e,r,i);var l=To();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,be(n)?(l=!0,jr(t)):l=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,So(t),r.updater=il,t.stateNode=r,r._reactInternals=t,zs(t,n,e,i),t=Ns(null,t,n,!0,l,i)):(t.tag=0,U&&l&&yo(t),he(null,t,r,i),t=t.child),t;case 16:n=t.elementType;e:{switch(ur(e,t),e=t.pendingProps,r=n._init,n=r(n._payload),t.type=n,r=t.tag=Qg(n),e=De(n,e),r){case 0:t=Ts(null,t,n,e,i);break e;case 1:t=Ha(null,t,n,e,i);break e;case 11:t=Fa(null,t,n,e,i);break e;case 14:t=Da(null,t,n,De(n.type,e),i);break e}throw Error(v(306,n,""))}return t;case 0:return n=t.type,r=t.pendingProps,r=t.elementType===n?r:De(n,r),Ts(e,t,n,r,i);case 1:return n=t.type,r=t.pendingProps,r=t.elementType===n?r:De(n,r),Ha(e,t,n,r,i);case 3:e:{if(td(t),e===null)throw Error(v(387));n=t.pendingProps,l=t.memoizedState,r=l.element,_u(e,t),Rr(t,n,null,i);var s=t.memoizedState;if(n=s.element,l.isDehydrated)if(l={element:n,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){r=Ei(Error(v(423)),t),t=Ba(e,t,n,i,r);break e}else if(n!==r){r=Ei(Error(v(424)),t),t=Ba(e,t,n,i,r);break e}else for(Le=xt(t.stateNode.containerInfo.firstChild),ze=t,U=!0,Be=null,i=Lu(t,null,n,i),t.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(bi(),n===r){t=ot(e,t,i);break e}he(e,t,n,i)}t=t.child}return t;case 5:return Tu(t),e===null&&Cs(t),n=t.type,r=t.pendingProps,l=e!==null?e.memoizedProps:null,s=r.children,ws(n,r)?s=null:l!==null&&ws(n,l)&&(t.flags|=32),ed(e,t),he(e,t,s,i),t.child;case 6:return e===null&&Cs(t),null;case 13:return id(e,t,i);case 4:return Co(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Si(t,null,n,i):he(e,t,n,i),t.child;case 11:return n=t.type,r=t.pendingProps,r=t.elementType===n?r:De(n,r),Fa(e,t,n,r,i);case 7:return he(e,t,t.pendingProps,i),t.child;case 8:return he(e,t,t.pendingProps.children,i),t.child;case 12:return he(e,t,t.pendingProps.children,i),t.child;case 10:e:{if(n=t.type._context,r=t.pendingProps,l=t.memoizedProps,s=r.value,D($r,n._currentValue),n._currentValue=s,l!==null)if(Ge(l.value,s)){if(l.children===r.children&&!ke.current){t=ot(e,t,i);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var o=l.dependencies;if(o!==null){s=l.child;for(var a=o.firstContext;a!==null;){if(a.context===n){if(l.tag===1){a=it(-1,i&-i),a.tag=2;var d=l.updateQueue;if(d!==null){d=d.shared;var y=d.pending;y===null?a.next=a:(a.next=y.next,y.next=a),d.pending=a}}l.lanes|=i,a=l.alternate,a!==null&&(a.lanes|=i),Es(l.return,i,t),o.lanes|=i;break}a=a.next}}else if(l.tag===10)s=l.type===t.type?null:l.child;else if(l.tag===18){if(s=l.return,s===null)throw Error(v(341));s.lanes|=i,o=s.alternate,o!==null&&(o.lanes|=i),Es(s,i,t),s=l.sibling}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===t){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}he(e,t,r.children,i),t=t.child}return t;case 9:return r=t.type,n=t.pendingProps.children,hi(t,i),r=Ie(r),n=n(r),t.flags|=1,he(e,t,n,i),t.child;case 14:return n=t.type,r=De(n,t.pendingProps),r=De(n.type,r),Da(e,t,n,r,i);case 15:return Zu(e,t,t.type,t.pendingProps,i);case 17:return n=t.type,r=t.pendingProps,r=t.elementType===n?r:De(n,r),ur(e,t),t.tag=1,be(n)?(e=!0,jr(t)):e=!1,hi(t,i),Ku(t,n,r),zs(t,n,r,i),Ns(null,t,n,!0,e,i);case 19:return nd(e,t,i);case 22:return Ju(e,t,i)}throw Error(v(156,t.tag))};function wd(e,t){return Gc(e,t)}function Gg(e,t,i,n){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,i,n){return new Gg(e,t,i,n)}function Fo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qg(e){if(typeof e=="function")return Fo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===no)return 11;if(e===ro)return 14}return 2}function Ct(e,t){var i=e.alternate;return i===null?(i=Pe(e.tag,t,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i.alternate=e,e.alternate=i):(i.pendingProps=t,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=e.flags&14680064,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,t=e.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i}function pr(e,t,i,n,r,l){var s=2;if(n=e,typeof e=="function")Fo(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case ei:return Bt(i.children,r,l,t);case io:s=8,r|=8;break;case ql:return e=Pe(12,i,t,r|2),e.elementType=ql,e.lanes=l,e;case Zl:return e=Pe(13,i,t,r),e.elementType=Zl,e.lanes=l,e;case Jl:return e=Pe(19,i,t,r),e.elementType=Jl,e.lanes=l,e;case Tc:return ll(i,r,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case zc:s=10;break e;case _c:s=9;break e;case no:s=11;break e;case ro:s=14;break e;case dt:s=16,n=null;break e}throw Error(v(130,e==null?e:typeof e,""))}return t=Pe(s,i,t,r),t.elementType=e,t.type=n,t.lanes=l,t}function Bt(e,t,i,n){return e=Pe(7,e,n,t),e.lanes=i,e}function ll(e,t,i,n){return e=Pe(22,e,n,t),e.elementType=Tc,e.lanes=i,e.stateNode={isHidden:!1},e}function Rl(e,t,i){return e=Pe(6,e,null,t),e.lanes=i,e}function Ol(e,t,i){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=i,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Yg(e,t,i,n,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vl(0),this.expirationTimes=vl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vl(0),this.identifierPrefix=n,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Do(e,t,i,n,r,l,s,o,a){return e=new Yg(e,t,i,o,a),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Pe(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:n,isDehydrated:i,cache:null,transitions:null,pendingSuspenseBoundaries:null},So(l),e}function Kg(e,t,i){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jt,key:n==null?null:""+n,children:e,containerInfo:t,implementation:i}}function xd(e){if(!e)return Lt;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(v(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(be(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(v(171))}if(e.tag===1){var i=e.type;if(be(i))return xu(e,i,t)}return t}function kd(e,t,i,n,r,l,s,o,a){return e=Do(i,n,!0,e,r,l,s,o,a),e.context=xd(null),i=e.current,n=ye(),r=St(i),l=it(n,r),l.callback=t??null,kt(i,l,r),e.current.lanes=r,Nn(e,r,n),Se(e,n),e}function sl(e,t,i,n){var r=t.current,l=ye(),s=St(r);return i=xd(i),t.context===null?t.context=i:t.pendingContext=i,t=it(l,s),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=kt(r,t,s),e!==null&&(Ve(e,r,s,l),or(e,r,s)),s}function Vr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Za(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<t?i:t}}function Ho(e,t){Za(e,t),(e=e.alternate)&&Za(e,t)}function Xg(){return null}var bd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bo(e){this._internalRoot=e}ol.prototype.render=Bo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(v(409));sl(e,t,null,null)};ol.prototype.unmount=Bo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kt(function(){sl(null,e,null,null)}),t[lt]=null}};function ol(e){this._internalRoot=e}ol.prototype.unstable_scheduleHydration=function(e){if(e){var t=Jc();e={blockedOn:null,target:e,priority:t};for(var i=0;i<pt.length&&t!==0&&t<pt[i].priority;i++);pt.splice(i,0,e),i===0&&tu(e)}};function Uo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ja(){}function qg(e,t,i,n,r){if(r){if(typeof n=="function"){var l=n;n=function(){var d=Vr(s);l.call(d)}}var s=kd(t,n,e,0,null,!1,!1,"",Ja);return e._reactRootContainer=s,e[lt]=s.current,xn(e.nodeType===8?e.parentNode:e),Kt(),s}for(;r=e.lastChild;)e.removeChild(r);if(typeof n=="function"){var o=n;n=function(){var d=Vr(a);o.call(d)}}var a=Do(e,0,!1,null,null,!1,!1,"",Ja);return e._reactRootContainer=a,e[lt]=a.current,xn(e.nodeType===8?e.parentNode:e),Kt(function(){sl(t,a,i,n)}),a}function cl(e,t,i,n,r){var l=i._reactRootContainer;if(l){var s=l;if(typeof r=="function"){var o=r;r=function(){var a=Vr(s);o.call(a)}}sl(t,s,e,r)}else s=qg(i,t,e,r,n);return Vr(s)}qc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var i=Qi(t.pendingLanes);i!==0&&(oo(t,i|1),Se(t,Z()),!($&6)&&(Li=Z()+500,Nt()))}break;case 13:Kt(function(){var n=st(e,1);if(n!==null){var r=ye();Ve(n,e,1,r)}}),Ho(e,1)}};ao=function(e){if(e.tag===13){var t=st(e,134217728);if(t!==null){var i=ye();Ve(t,e,134217728,i)}Ho(e,134217728)}};Zc=function(e){if(e.tag===13){var t=St(e),i=st(e,t);if(i!==null){var n=ye();Ve(i,e,t,n)}Ho(e,t)}};Jc=function(){return R};eu=function(e,t){var i=R;try{return R=e,t()}finally{R=i}};cs=function(e,t,i){switch(t){case"input":if(is(e,i),t=i.name,i.type==="radio"&&t!=null){for(i=e;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<i.length;t++){var n=i[t];if(n!==e&&n.form===e.form){var r=Jr(n);if(!r)throw Error(v(90));Mc(n),is(n,r)}}}break;case"textarea":Pc(e,i);break;case"select":t=i.value,t!=null&&di(e,!!i.multiple,t,!1)}};Dc=Io;Hc=Kt;var Zg={usingClientEntryPoint:!1,Events:[jn,ri,Jr,Oc,Fc,Io]},Fi={findFiberByHostInstance:Rt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Jg={bundleType:Fi.bundleType,version:Fi.version,rendererPackageName:Fi.rendererPackageName,rendererConfig:Fi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:at.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Wc(e),e===null?null:e.stateNode},findFiberByHostInstance:Fi.findFiberByHostInstance||Xg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var er=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!er.isDisabled&&er.supportsFiber)try{Kr=er.inject(Jg),Xe=er}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zg;Te.createPortal=function(e,t){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Uo(t))throw Error(v(200));return Kg(e,t,null,i)};Te.createRoot=function(e,t){if(!Uo(e))throw Error(v(299));var i=!1,n="",r=bd;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Do(e,1,!1,null,null,i,!1,n,r),e[lt]=t.current,xn(e.nodeType===8?e.parentNode:e),new Bo(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(v(188)):(e=Object.keys(e).join(","),Error(v(268,e)));return e=Wc(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Kt(e)};Te.hydrate=function(e,t,i){if(!al(t))throw Error(v(200));return cl(null,e,t,!0,i)};Te.hydrateRoot=function(e,t,i){if(!Uo(e))throw Error(v(405));var n=i!=null&&i.hydratedSources||null,r=!1,l="",s=bd;if(i!=null&&(i.unstable_strictMode===!0&&(r=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onRecoverableError!==void 0&&(s=i.onRecoverableError)),t=kd(t,null,e,1,i??null,r,!1,l,s),e[lt]=t.current,xn(e),n)for(e=0;e<n.length;e++)i=n[e],r=i._getVersion,r=r(i._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[i,r]:t.mutableSourceEagerHydrationData.push(i,r);return new ol(t)};Te.render=function(e,t,i){if(!al(t))throw Error(v(200));return cl(null,e,t,!1,i)};Te.unmountComponentAtNode=function(e){if(!al(e))throw Error(v(40));return e._reactRootContainer?(Kt(function(){cl(null,null,e,!1,function(){e._reactRootContainer=null,e[lt]=null})}),!0):!1};Te.unstable_batchedUpdates=Io;Te.unstable_renderSubtreeIntoContainer=function(e,t,i,n){if(!al(i))throw Error(v(200));if(e==null||e._reactInternals===void 0)throw Error(v(38));return cl(e,t,i,!1,n)};Te.version="18.3.1-next-f1338f8080-20240426";function Sd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sd)}catch(e){console.error(e)}}Sd(),Sc.exports=Te;var eh=Sc.exports,ec=eh;Kl.createRoot=ec.createRoot,Kl.hydrateRoot=ec.hydrateRoot;const Bs="accessibility-widget-protanopia-filter";function th(){if(document.getElementById(Bs))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id=Bs,e.setAttribute("aria-hidden","true"),e.style.cssText="position:absolute;width:0;height:0;pointer-events:none;",e.innerHTML=`
    <defs>
      <filter id="accessibility-widget-protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0 1 0"/>
      </filter>
    </defs>`,document.body.appendChild(e)}function ih(){var e;(e=document.getElementById(Bs))==null||e.remove()}const Us="accessibility-widget-host-effects",nt="accessibility-widget-host";function nh(){let e=document.getElementById(Us);return e||(e=document.createElement("style"),e.id=Us,document.head.appendChild(e)),e}function rh(){const e=document.getElementById(Us);e&&(e.textContent="")}function lh(){let e=document.getElementById(nt);if(e)return e;e=document.createElement("div"),e.id=nt;const t=document.body,i=[];for(const n of Array.from(t.childNodes))n instanceof HTMLElement&&(n.classList.contains("accessibility-widget-root")||n.id===nt)||i.push(n);for(const n of i)e.appendChild(n);return t.insertBefore(e,t.firstChild),e}function sh(){const e=document.getElementById(nt);if(!e)return;const t=e.parentElement;if(t){for(;e.firstChild;)t.insertBefore(e.firstChild,e);e.remove()}}const oh=.1,ah=.15,ch=.02,uh=[{bg:"#1f2937",text:"#f9fafb",border:"#6b7280"},{bg:"#111827",text:"#ffffff",border:"#9ca3af"},{bg:"#030712",text:"#ffffff",border:"#d1d5db"},{bg:"#000000",text:"#ffffff",border:"#ffffff"}],dh=[{bg:"#ffffff",text:"#111827",border:"#d1d5db"},{bg:"#f9fafb",text:"#0f172a",border:"#94a3b8"},{bg:"#ffffff",text:"#000000",border:"#475569"},{bg:"#ffffff",text:"#000000",border:"#000000"}],fh=[{bg:"#111111",text:"#fff7c2",border:"#ffe066"},{bg:"#000000",text:"#fff27a",border:"#fff27a"},{bg:"#000000",text:"#ffff00",border:"#ffff00"},{bg:"#000000",text:"#00ffff",border:"#00ffff"}],Gr=[{band:86,opacity:.35,edge:"#2563eb"},{band:116,opacity:.45,edge:"#0891b2"},{band:146,opacity:.55,edge:"#10b981"}],Qr=[{height:6,border:2,fill:"#0c0c0c",edge:"#facc15",glow:"rgba(250,204,21,0.28)"}];function An(e,t){return Math.max(0,Math.min(e-1,t-1))}function ph(e){const t=An(e,3),i=38+t*10,n=Math.round(i*.16),r=["#2563eb","#0891b2","#0f766e"][t],l=`
    <svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 64 64">
      <circle cx="30" cy="31" r="27" fill="${r}" opacity="0.24"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="#ffffff" stroke="#050505" stroke-width="5" stroke-linejoin="round"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="none" stroke="${r}" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `.trim();return`url("data:image/svg+xml,${encodeURIComponent(l)}") ${n} ${n}, auto`}function gh(e){return e===1?'"Accessibility Widget OpenDyslexic"':e===2?'"Accessibility Widget Atkinson Hyperlegible"':null}function hh(e){const t=[],i=`#${nt}`;if(e.fontSize!==0){const n=100+e.fontSize*oh*100;t.push(`${i} { font-size: ${n}% !important; }`)}if(e.lineHeight!==0){const n=1.5+e.lineHeight*ah;t.push(`${i} * { line-height: ${n} !important; }`)}if(e.letterSpacing!==0){const n=e.letterSpacing*ch;t.push(`${i} * { letter-spacing: ${n}em !important; }`)}if(e.textAlignment!=="default"&&t.push(`${i} * { text-align: ${e.textAlignment} !important; }`),e.bigCursor!==0){const n=ph(e.bigCursor);t.push(`html, body, ${i}, ${i} *, .accessibility-widget-root, .accessibility-widget-root * { cursor: ${n} !important; }`)}return t.join(`
`)}let mi=null,te=null;function Ki(e){return e.replace(/\s+/g," ").trim().slice(0,200)}function Cd(e,t){if(!(t.join(" ").length>=220)){if(e.nodeType===Node.TEXT_NODE){const i=Ki(e.textContent||"");i&&t.push(i);return}if(e instanceof Element&&!e.matches("script, style, noscript, template")&&!(e instanceof HTMLElement&&(e.hidden||e.getAttribute("aria-hidden")==="true"))){if(e instanceof HTMLSelectElement){const i=e.selectedOptions[0]??e.options[e.selectedIndex],n=Ki((i==null?void 0:i.textContent)||e.value);n&&t.push(n);return}if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const i=Ki(e.value||e.placeholder||e.getAttribute("aria-label")||"");i&&t.push(i);return}if(e instanceof HTMLImageElement){const i=Ki(e.alt||e.getAttribute("aria-label")||"");i&&t.push(i);return}for(const i of Array.from(e.childNodes))Cd(i,t)}}}function yh(e){const t=e.closest('button, a, label, summary, [role="button"], [role="link"], select, input, textarea')??e,i=[];return Cd(t,i),Ki(i.join(" "))}function tc(e){if(!te)return;const t=[{fontSize:18,maxWidth:260,padding:"8px 12px"},{fontSize:20,maxWidth:300,padding:"10px 14px"},{fontSize:22,maxWidth:340,padding:"12px 16px"}],i=t[Math.max(0,Math.min(e-1,t.length-1))];te.style.fontSize=`${i.fontSize}px`,te.style.maxWidth=`${i.maxWidth}px`,te.style.padding=i.padding}function mh(e){if(mi){tc(e);return}te=document.createElement("div"),te.className="accessibility-widget-magnify-cursor",te.style.display="none",document.body.appendChild(te),tc(e),mi=t=>{if(!te)return;const i=document.elementFromPoint(t.clientX,t.clientY);if(!i||i.closest(".accessibility-widget-root")||i.closest(".accessibility-widget-magnify-cursor")){te.style.display="none";return}const n=yh(i);if(!n){te.style.display="none";return}te.textContent=n,te.style.display="block";const r=te.getBoundingClientRect(),l=16,s=8,o=Math.max(s,window.innerWidth-r.width-s),a=Math.max(s,window.innerHeight-r.height-s),d=Math.min(Math.max(t.clientX+l,s),o),y=Math.min(Math.max(t.clientY+l,s),a);te.style.left=`${d}px`,te.style.top=`${y}px`},document.addEventListener("mousemove",mi)}function Ed(){mi&&(document.removeEventListener("mousemove",mi),mi=null),te&&(te.remove(),te=null)}let ne=null,gr=null,sn=null,on=null,Di=0,Hi=0,Ld=1;function vh(e){if(!ne)return;Ld=e;const t=Qr[An(e,Qr.length)];ne.dataset.level=String(e),ne.style.setProperty("--accessibility-widget-reading-guide-height",`${t.height}px`),ne.style.setProperty("--accessibility-widget-reading-guide-border",`${t.border}px`),ne.style.setProperty("--accessibility-widget-reading-guide-fill",t.fill),ne.style.setProperty("--accessibility-widget-reading-guide-edge",t.edge),ne.style.setProperty("--accessibility-widget-reading-guide-glow",t.glow)}function Fl(e,t){if(!ne)return;const i=Qr[An(Ld,Qr.length)],n=i.height+i.border*2,r=Math.max(0,Math.min(window.innerHeight-n,t-n/2));ne.style.top=`${r}px`,ne.style.setProperty("--accessibility-widget-reading-guide-x",`${e}px`)}function wh(e){ne||(ne=document.createElement("div"),ne.className="accessibility-widget-reading-guide",ne.setAttribute("aria-hidden","true"),gr=document.createElement("span"),gr.className="accessibility-widget-reading-guide-pointer",ne.appendChild(gr),document.body.appendChild(ne),Di=window.innerWidth/2,Hi=window.innerHeight/2,sn=t=>{Di=t.clientX,Hi=t.clientY,Fl(Di,Hi)},on=()=>Fl(Di,Hi),document.addEventListener("mousemove",sn,{passive:!0}),window.addEventListener("resize",on,{passive:!0})),vh(e),Fl(Di,Hi)}function zd(){sn&&(document.removeEventListener("mousemove",sn),sn=null),on&&(window.removeEventListener("resize",on),on=null),ne&&(ne.remove(),ne=null,gr=null)}let hr=220,yr=1.8,q=null,Ue=null,Dt=null,an=null,vi=null,Ws=0,Vs=0,mr=0,vr=0,It=!1;function ic(e){const t=[{diameter:220,zoom:1.8},{diameter:240,zoom:2.2},{diameter:260,zoom:2.75}],i=t[Math.max(0,Math.min(e-1,t.length-1))];hr=i.diameter,yr=i.zoom,!(!q||!Ue)&&(q.style.width=`${hr}px`,q.style.height=`${hr}px`,It&&(vi??(vi=requestAnimationFrame(_d))))}function Dl(){if(!Ue)return;const e=document.getElementById(nt);if(!e)return;const t=e.getBoundingClientRect();Dt=null,Ue.innerHTML="";const i=e.cloneNode(!0);i.id="",i.style.position="absolute",i.style.top=`${t.top}px`,i.style.left=`${t.left}px`,i.style.width=`${t.width}px`,i.style.pointerEvents="none",i.querySelectorAll(".accessibility-widget-root, .accessibility-widget-reading-lens, script, iframe").forEach(o=>o.remove());const n=e.querySelectorAll("input, textarea"),r=i.querySelectorAll("input, textarea");for(let o=0;o<n.length&&o<r.length;o++){const a=n[o],d=r[o];a instanceof HTMLInputElement&&d instanceof HTMLInputElement?(d.value=a.value,(a.type==="checkbox"||a.type==="radio")&&(d.checked=a.checked)):a instanceof HTMLTextAreaElement&&d instanceof HTMLTextAreaElement&&(d.value=a.value)}const l=e.querySelectorAll("select"),s=i.querySelectorAll("select");for(let o=0;o<l.length&&o<s.length;o++)s[o].selectedIndex=l[o].selectedIndex;Dt=i,Ue.appendChild(i)}function xh(){if(!Dt)return;const e=document.getElementById(nt);if(!e)return;const t=e.getBoundingClientRect();Dt.style.top=`${t.top}px`,Dt.style.left=`${t.left}px`,Dt.style.width=`${t.width}px`}function _d(){if(vi=null,!q||!Ue)return;const e=hr/2;mr=Math.round(Ws),vr=Math.round(Vs),xh(),q.style.transform=`translate3d(${mr-e}px, ${vr-e}px, 0)`;const t=e-mr*yr,i=e-vr*yr;Ue.style.transform=`translate3d(${t}px, ${i}px, 0) scale(${yr})`}function kh(e){if(ic(e),q){It||Dl();return}q=document.createElement("div"),q.className="accessibility-widget-reading-lens",q.setAttribute("aria-hidden","true"),q.style.display="none",q.style.left="0",q.style.top="0",q.style.willChange="transform",Ue=document.createElement("div"),Ue.className="accessibility-widget-reading-lens-inner",Ue.style.willChange="transform",q.appendChild(Ue),document.body.appendChild(q),ic(e),Dl(),an=t=>{if(!q)return;const i=t.target;if(i!=null&&i.closest(".accessibility-widget-root")){It&&(q.style.display="none",It=!1);return}It||(q.style.display="block",Ws=t.clientX,Vs=t.clientY,mr=t.clientX,vr=t.clientY,It=!0,Dl()),Ws=t.clientX,Vs=t.clientY,vi??(vi=requestAnimationFrame(_d))},document.addEventListener("mousemove",an,{passive:!0})}function Td(){an&&(document.removeEventListener("mousemove",an),an=null),vi!==null&&(cancelAnimationFrame(vi),vi=null),It=!1,q&&(q.remove(),q=null,Ue=null,Dt=null)}let Ee=null,wi=null,Ut=null,cn=null,un=null,Bi=0,Nd=1;function bh(e){if(!Ee)return;Nd=e;const t=Gr[An(e,Gr.length)];Ee.dataset.level=String(e),Ee.style.setProperty("--accessibility-widget-reading-mask-opacity",String(t.opacity)),Ee.style.setProperty("--accessibility-widget-reading-mask-edge",t.edge)}function Hl(e){if(!wi||!Ut)return;const t=Gr[An(Nd,Gr.length)],i=Math.max(0,e-t.band/2),n=Math.min(window.innerHeight,e+t.band/2);wi.style.height=`${i}px`,Ut.style.top=`${n}px`,Ut.style.height=`${Math.max(0,window.innerHeight-n)}px`}function Sh(e){Ee||(Ee=document.createElement("div"),Ee.className="accessibility-widget-reading-mask",Ee.setAttribute("aria-hidden","true"),wi=document.createElement("div"),wi.className="accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-top",Ut=document.createElement("div"),Ut.className="accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-bottom",Ee.append(wi,Ut),document.body.appendChild(Ee),Bi=window.innerHeight/2,cn=t=>{Bi=t.clientY,Hl(Bi)},un=()=>Hl(Bi),document.addEventListener("mousemove",cn,{passive:!0}),window.addEventListener("resize",un,{passive:!0})),bh(e),Hl(Bi)}function Md(){cn&&(document.removeEventListener("mousemove",cn),cn=null),un&&(window.removeEventListener("resize",un),un=null),Ee&&(Ee.remove(),Ee=null,wi=null,Ut=null)}function F(e,t,i){const n=i==null?void 0:i.trim();n?e.style.setProperty(t,n):e.style.removeProperty(t)}function Ch(e,t){F(e,"--accessibility-widget-legible-font-family",gh(t.legibleFonts)),F(e,"--accessibility-widget-legible-word-spacing",t.legibleFonts>0?`${t.legibleFonts===1?.03:.015}em`:null),F(e,"--accessibility-widget-legible-letter-spacing",t.legibleFonts>0?`${t.legibleFonts===1?.02:.005}em`:null),F(e,"--accessibility-widget-title-outline-width",t.highlightTitles>0?`${t.highlightTitles}px`:null),F(e,"--accessibility-widget-title-highlight-alpha",t.highlightTitles>0?`${.04+t.highlightTitles*.03}`:null),F(e,"--accessibility-widget-link-outline-width",t.highlightLinks>0?`${t.highlightLinks}px`:null),F(e,"--accessibility-widget-link-highlight-alpha",t.highlightLinks>0?`${.04+t.highlightLinks*.03}`:null),F(e,"--accessibility-widget-link-underline-width",t.highlightLinks>0?`${t.highlightLinks}px`:null);const i=t.darkContrast>0?uh[t.darkContrast-1]:null;F(e,"--accessibility-widget-dark-contrast-bg",(i==null?void 0:i.bg)??null),F(e,"--accessibility-widget-dark-contrast-text",(i==null?void 0:i.text)??null),F(e,"--accessibility-widget-dark-contrast-border",(i==null?void 0:i.border)??null);const n=t.lightContrast>0?dh[t.lightContrast-1]:null;F(e,"--accessibility-widget-light-contrast-bg",(n==null?void 0:n.bg)??null),F(e,"--accessibility-widget-light-contrast-text",(n==null?void 0:n.text)??null),F(e,"--accessibility-widget-light-contrast-border",(n==null?void 0:n.border)??null);const r=t.highContrast>0?fh[t.highContrast-1]:null;F(e,"--accessibility-widget-high-contrast-bg",(r==null?void 0:r.bg)??null),F(e,"--accessibility-widget-high-contrast-text",(r==null?void 0:r.text)??null),F(e,"--accessibility-widget-high-contrast-border",(r==null?void 0:r.border)??null),F(e,"--accessibility-widget-monochrome-amount",t.monochrome>0?"100%":null),F(e,"--accessibility-widget-invert-amount",t.invertColors>0?"100%":null),F(e,"--accessibility-widget-color-blind-saturate",t.colorBlind>0?`${1-t.colorBlind*.1}`:null),F(e,"--accessibility-widget-color-blind-contrast",t.colorBlind>0?`${1+t.colorBlind*.05}`:null)}function Eh(e){return[["accessibility-widget-effect-legible-fonts",e.legibleFonts>0],["accessibility-widget-effect-dyslexia",e.profile==="dyslexia"],["accessibility-widget-effect-highlight-titles",e.highlightTitles>0],["accessibility-widget-effect-highlight-links",e.highlightLinks>0],["accessibility-widget-effect-dark-contrast",e.darkContrast>0],["accessibility-widget-effect-light-contrast",e.lightContrast>0],["accessibility-widget-effect-high-contrast",e.highContrast>0],["accessibility-widget-effect-monochrome",e.monochrome>0],["accessibility-widget-effect-invert",e.invertColors>0],["accessibility-widget-effect-color-blind",e.colorBlind>0],["accessibility-widget-effect-hide-images",e.hideImages>0],["accessibility-widget-effect-off-animations",e.offAnimations>0],["accessibility-widget-effect-text-magnifier",e.textMagnifier>0],["accessibility-widget-effect-big-cursor",e.bigCursor>0],["accessibility-widget-effect-reading-mask-active",e.readingMask>0],["accessibility-widget-effect-reading-guide-active",e.readingGuide>0]]}function Bl(e){if(typeof document>"u")return;const t=document.getElementById(nt);if(t){for(const[i,n]of Eh(e))t.classList.toggle(i,n);Ch(t,e),e.colorBlind>0&&th(),nh().textContent=hh(e),e.textMagnifier>0?mh(e.textMagnifier):Ed(),e.readingLens>0?kh(e.readingLens):Td(),e.readingMask>0?Sh(e.readingMask):Md(),e.readingGuide>0?wh(e.readingGuide):zd()}}function Lh(){if(typeof document>"u")return;const e=document.getElementById(nt);if(e)for(const t of Array.from(e.classList))t.startsWith("accessibility-widget-effect-")&&e.classList.remove(t);rh(),ih(),Ed(),Td(),Md(),zd()}/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=(...e)=>e.filter((t,i,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zh=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _h=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,n)=>n?n.toUpperCase():i.toLowerCase());/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nc=e=>{const t=_h(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ul={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Th=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Nh=I.createContext({}),Mh=()=>I.useContext(Nh),jh=I.forwardRef(({color:e,size:t,strokeWidth:i,absoluteStrokeWidth:n,className:r="",children:l,iconNode:s,...o},a)=>{const{size:d=24,strokeWidth:y=2,absoluteStrokeWidth:h=!1,color:g="currentColor",className:w=""}=Mh()??{},x=n??h?Number(i??y)*24/Number(t??d):i??y;return I.createElement("svg",{ref:a,...Ul,width:t??d??Ul.width,height:t??d??Ul.height,stroke:e??g,strokeWidth:x,className:jd("lucide",w,r),...!l&&!Th(o)&&{"aria-hidden":"true"},...o},[...s.map(([k,O])=>I.createElement(k,O)),...Array.isArray(l)?l:[l]])});/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(e,t)=>{const i=I.forwardRef(({className:n,...r},l)=>I.createElement(jh,{ref:l,iconNode:t,className:jd(`lucide-${zh(nc(e))}`,`lucide-${e}`,n),...r}));return i.displayName=nc(e),i};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=[["path",{d:"m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16",key:"xik6mr"}],["path",{d:"M15.697 14h5.606",key:"1stdlc"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]];j("a-large-small",Pd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ad=[["rect",{width:"13",height:"7",x:"8",y:"3",rx:"1",key:"pkso9a"}],["path",{d:"m2 9 3 3-3 3",key:"1agib5"}],["rect",{width:"13",height:"7",x:"8",y:"14",rx:"1",key:"1q5fc1"}]];j("between-horizontal-start",Ad);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=[["rect",{width:"7",height:"13",x:"3",y:"8",rx:"1",key:"1fjrkv"}],["path",{d:"m15 2-3 3-3-3",key:"1uh6eb"}],["rect",{width:"7",height:"13",x:"14",y:"8",rx:"1",key:"w3fjg8"}]];j("between-vertical-start",$d);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M16 12h2",key:"7q9ll5"}],["path",{d:"M16 8h2",key:"msurwy"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}],["path",{d:"M6 12h2",key:"32wvfc"}],["path",{d:"M6 8h2",key:"30oboj"}]];j("book-open-text",Id);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",key:"1e3is1"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",key:"1gqd8o"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77",key:"iwvgf7"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464",key:"efp6ie"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",key:"1gq6am"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464",key:"k1g0md"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77",key:"q97ue3"}]];j("brain",Rd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]];j("chevron-down",Od);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fd=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]];j("chevron-up",Fd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]];j("circle",Dd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65",key:"1pfsoa"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92",key:"1ablyi"}]];j("circle-off",Hd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z",key:"j4l70d"}]];j("contrast",Bd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ud=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]];j("eye",Ud);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]];j("external-link",Wd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vd=[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]];j("focus",Vd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gd=[["path",{d:"M6 12h12",key:"8npq4p"}],["path",{d:"M6 20V4",key:"1w1bmo"}],["path",{d:"M18 20V4",key:"o2hl4u"}]];j("heading",Gd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]];j("image-off",Qd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",key:"yxxwt6"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]];j("landmark",Yd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]];j("layers",Kd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]];j("link",Gs);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=[["path",{d:"M10 13V7",key:"1u13u9"}],["path",{d:"M14 13V7",key:"1vj9om"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]];j("monitor-pause",Xd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qd=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]];j("moon",qd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zd=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]];j("mouse-pointer-2",Zd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jd=[["path",{d:"m18 8 4 4-4 4",key:"1ak13k"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}]];j("move-horizontal",Jd);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]];j("palette",ef);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tf=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]];j("rotate-ccw",tf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]];j("rows-3",nf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",key:"11ak4c"}]];j("scan-eye",rf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M20 12h.01",key:"1ykeid"}],["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M4 12h.01",key:"158zrr"}],["path",{d:"M17.657 6.343h.01",key:"31pqzk"}],["path",{d:"M17.657 17.657h.01",key:"jehnf4"}],["path",{d:"M6.343 17.657h.01",key:"gdk6ow"}],["path",{d:"M6.343 6.343h.01",key:"1uurf0"}]];j("sun-dim",lf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]];j("sun",sf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 19H5",key:"vjpgq2"}]];j("text-align-center",of);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 19H7",key:"4cu937"}]];j("text-align-end",af);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=[["path",{d:"M3 5h18",key:"1u36vt"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 19h18",key:"awlh7x"}]];j("text-align-justify",cf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 19H3",key:"z6ezky"}]];j("text-align-start",uf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=[["path",{d:"M15 5h6",key:"1pr8yx"}],["path",{d:"M15 12h6",key:"upa0zy"}],["path",{d:"M3 19h18",key:"awlh7x"}],["path",{d:"m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12",key:"6lvno8"}],["path",{d:"M3.92 10h6.16",key:"1tl8ex"}]];j("text-initial",df);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=[["path",{d:"M18 11c-1.5 0-2.5.5-3 2",key:"1fod00"}],["path",{d:"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",key:"d70hit"}],["path",{d:"M6 11c1.5 0 2.5.5 3 2",key:"136fht"}]];j("venetian-mask",ff);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=[["circle",{cx:"7",cy:"12",r:"3",key:"12clwm"}],["path",{d:"M10 9v6",key:"17i7lo"}],["circle",{cx:"17",cy:"12",r:"3",key:"gl7c2s"}],["path",{d:"M14 7v8",key:"dl84cr"}],["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",key:"lt2kga"}]];j("whole-word",pf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]];j("x",gf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]];j("zap",hf);/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]];j("zoom-in",yf);function Ae(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ph(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Ah(e){return Object.entries(e).filter(([t])=>t!=="key").map(([t,i])=>`${t}="${Ph(String(i))}"`).join(" ")}const N=e=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e.map(([t,i])=>`<${t} ${Ah(i)}/>`).join("")}</svg>`,rc=()=>'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="currentColor"></path></svg>',_={trigger:rc(),close:N(gf),reset:N(tf),chevronDown:N(Od),chevronUp:N(Fd),info:'<span class="accessibility-widget-info-glyph">i</span>',wheelchair:rc(),seizure:N(hf),vision:N(Ud),lightSensitivity:N(lf),adhd:N(Vd),cognitive:N(Rd),colorBlind:N(ef),dyslexia:N(Id),legibleFonts:N(df),dyslexiaFriendlyFont:N(pf),highlightTitles:N(Gd),fontSizing:N(Pd),textMagnifier:N(yf),readingLens:N(rf),bigCursor:N(Zd),readingMask:N(nf),readingGuide:N(Jd),highlightLinks:N(Gs),lineHeight:N($d),letterSpacing:N(Ad),textAlignLeft:N(uf),textAlignCenter:N(of),textAlignRight:N(af),textAlignJustify:N(cf),pageStructure:N(Kd),structureLandmark:N(Yd),structureLink:N(Gs),structureExternal:N(Wd),darkContrast:N(qd),lightContrast:N(sf),highContrast:N(Bd),monochrome:N(Dd),invertColors:N(Hd),colorBlindVisual:N(ff),hideImages:N(Qd),offAnimations:N(Xd)},$h={title:"React Accessibility Widget",subtitle:"إعدادات إمكانية الوصول",widgetSettings:"إعدادات الأداة",widgetSize:"حجم الأداة",widgetPosition:"موضع الأداة",smallSize:"صغير",largeSize:"كبير",leftPosition:"يسار",rightPosition:"يمين",profiles:"ملفات إمكانية الوصول",contentAdjustments:"المحتوى",colorAdjustments:"اللون",visibilityAdjustments:"الرؤية",pageStructure:"بنية الصفحة",structureHeadings:"العناوين",structureLandmarks:"المعالم",structureLinks:"الروابط",noStructureItems:"لم يتم العثور على عناصر.",untitledHeading:"عنوان بدون اسم",untitledLink:"رابط بدون اسم",resetAll:"إعادة تعيين جميع الإعدادات",close:"إغلاق قائمة إمكانية الوصول",seizureSafe:"آمن للصرع",visionImpaired:"ضعف البصر",lightSensitivity:"حساسية الضوء",colorBlind:"عمى الألوان",dyslexia:"عسر القراءة",adhdFriendly:"مناسب لـ ADHD",cognitiveDisability:"إعاقة معرفية",legibleFonts:"خطوط مقروءة",dyslexiaFriendly:"مناسب لعسر القراءة",highlightTitles:"تمييز العناوين",fontSize:"حجم الخط",textMagnifier:"مكبر النص",readingLens:"عدسة القراءة",bigCursor:"مؤشر كبير",readingMask:"قناع القراءة",readingGuide:"دليل القراءة",highlightLinks:"تمييز الروابط",lineHeight:"ارتفاع السطر",letterSpacing:"تباعد الحروف",textAlign:"محاذاة النص",darkContrast:"تباين داكن",lightContrast:"تباين فاتح",highContrast:"تباين عالٍ",monochrome:"أحادي اللون",invertColors:"عكس الألوان",hideImages:"إخفاء الصور",offAnimations:"تقليل الحركات"},Ih={title:"React Accessibility Widget",subtitle:"Barrierefreiheitseinstellungen",widgetSettings:"Widget-Einstellungen",widgetSize:"Widget-Größe",widgetPosition:"Widget-Position",smallSize:"Klein",largeSize:"Groß",leftPosition:"Links",rightPosition:"Rechts",profiles:"Barrierefreiheitsprofile",contentAdjustments:"Inhalt",colorAdjustments:"Farbe",visibilityAdjustments:"Sichtbarkeit",pageStructure:"Seitenstruktur",structureHeadings:"Überschriften",structureLandmarks:"Landmarken",structureLinks:"Links",noStructureItems:"Keine Elemente gefunden.",untitledHeading:"Unbenannte Überschrift",untitledLink:"Unbenannter Link",resetAll:"Alle Einstellungen zurücksetzen",close:"Barrierefreiheitsmenü schließen",seizureSafe:"Anfallssicher",visionImpaired:"Sehbehinderung",lightSensitivity:"Lichtempfindlichkeit",colorBlind:"Farbenblindheit",dyslexia:"Legasthenie",adhdFriendly:"ADHS-freundlich",cognitiveDisability:"Kognitive Behinderung",legibleFonts:"Lesbare Schriften",dyslexiaFriendly:"Legasthenie-freundlich",highlightTitles:"Überschriften hervorheben",fontSize:"Schriftgröße",textMagnifier:"Textlupe",readingLens:"Leselupe",bigCursor:"Großer Cursor",readingMask:"Lesemaske",readingGuide:"Lesehilfe",highlightLinks:"Links hervorheben",lineHeight:"Zeilenhöhe",letterSpacing:"Zeichenabstand",textAlign:"Textausrichtung",darkContrast:"Dunkler Kontrast",lightContrast:"Heller Kontrast",highContrast:"Hoher Kontrast",monochrome:"Monochrom",invertColors:"Farben invertieren",hideImages:"Bilder ausblenden",offAnimations:"Animationen reduzieren"},mf={title:"React Accessibility Widget",subtitle:"Accessibility Settings",widgetSettings:"Settings",widgetSize:"Widget Size",widgetPosition:"Widget Position",smallSize:"Small",largeSize:"Large",leftPosition:"Left",rightPosition:"Right",profiles:"Accessibility Profiles",contentAdjustments:"Content",colorAdjustments:"Color",visibilityAdjustments:"Visibility",pageStructure:"Page Structure",structureHeadings:"Headings",structureLandmarks:"Landmarks",structureLinks:"Links",noStructureItems:"No items found.",untitledHeading:"Untitled heading",untitledLink:"Untitled link",resetAll:"Reset all settings",close:"Close accessibility menu",seizureSafe:"Seizure Safe",visionImpaired:"Vision Impaired",lightSensitivity:"Light Sensitivity",colorBlind:"Color Blind",dyslexia:"Dyslexia",adhdFriendly:"ADHD Friendly",cognitiveDisability:"Cognitive Disability",legibleFonts:"Legible Fonts",dyslexiaFriendly:"Dyslexia Friendly",highlightTitles:"Highlight Titles",fontSize:"Font Size",textMagnifier:"Text Magnifier",readingLens:"Reading Lens",bigCursor:"Big Cursor",readingMask:"Reading Mask",readingGuide:"Reading Guide",highlightLinks:"Highlight Links",lineHeight:"Line Height",letterSpacing:"Letter Spacing",textAlign:"Text Align",darkContrast:"Dark Contrast",lightContrast:"Light Contrast",highContrast:"High Contrast",monochrome:"Monochrome",invertColors:"Invert Colors",hideImages:"Hide Images",offAnimations:"Reduce Animations"},Rh={title:"React Accessibility Widget",subtitle:"Configuración de Accesibilidad",widgetSettings:"Configuración del widget",widgetSize:"Tamaño del Widget",widgetPosition:"Posición del Widget",smallSize:"Pequeño",largeSize:"Grande",leftPosition:"Izquierda",rightPosition:"Derecha",profiles:"Perfiles de Accesibilidad",contentAdjustments:"Contenido",colorAdjustments:"Color",visibilityAdjustments:"Visibilidad",pageStructure:"Estructura de Página",structureHeadings:"Encabezados",structureLandmarks:"Puntos de Referencia",structureLinks:"Enlaces",noStructureItems:"No se encontraron elementos.",untitledHeading:"Encabezado sin título",untitledLink:"Enlace sin título",resetAll:"Restablecer configuración",close:"Cerrar menú de accesibilidad",seizureSafe:"Seguro para Convulsiones",visionImpaired:"Visión Reducida",lightSensitivity:"Sensibilidad a la Luz",colorBlind:"Daltonismo",dyslexia:"Dislexia",adhdFriendly:"TDAH Amigable",cognitiveDisability:"Discapacidad Cognitiva",legibleFonts:"Fuentes Legibles",dyslexiaFriendly:"Amigable para Dislexia",highlightTitles:"Resaltar Títulos",fontSize:"Tamaño de Fuente",textMagnifier:"Lupa de Texto",readingLens:"Lente de Lectura",bigCursor:"Cursor Grande",readingMask:"Máscara de Lectura",readingGuide:"Guía de Lectura",highlightLinks:"Resaltar Enlaces",lineHeight:"Altura de Línea",letterSpacing:"Espaciado de Letras",textAlign:"Alineación de Texto",darkContrast:"Contraste Oscuro",lightContrast:"Contraste Claro",highContrast:"Alto Contraste",monochrome:"Monocromático",invertColors:"Invertir Colores",hideImages:"Ocultar Imágenes",offAnimations:"Reducir Animaciones"},Oh={title:"React Accessibility Widget",subtitle:"Paramètres d'Accessibilité",widgetSettings:"Paramètres du widget",widgetSize:"Taille du Widget",widgetPosition:"Position du Widget",smallSize:"Petit",largeSize:"Grand",leftPosition:"Gauche",rightPosition:"Droite",profiles:"Profils d'Accessibilité",contentAdjustments:"Contenu",colorAdjustments:"Couleur",visibilityAdjustments:"Visibilité",pageStructure:"Structure de Page",structureHeadings:"Titres",structureLandmarks:"Repères",structureLinks:"Liens",noStructureItems:"Aucun élément trouvé.",untitledHeading:"Titre sans nom",untitledLink:"Lien sans nom",resetAll:"Réinitialiser les paramètres",close:"Fermer le menu d'accessibilité",seizureSafe:"Sûr pour Épilepsie",visionImpaired:"Déficience Visuelle",lightSensitivity:"Sensibilité à la Lumière",colorBlind:"Daltonisme",dyslexia:"Dyslexie",adhdFriendly:"TDAH Adapté",cognitiveDisability:"Handicap Cognitif",legibleFonts:"Polices Lisibles",dyslexiaFriendly:"Adapté à la Dyslexie",highlightTitles:"Surligner les Titres",fontSize:"Taille de Police",textMagnifier:"Loupe de Texte",readingLens:"Loupe de Lecture",bigCursor:"Grand Curseur",readingMask:"Masque de Lecture",readingGuide:"Guide de Lecture",highlightLinks:"Surligner les Liens",lineHeight:"Hauteur de Ligne",letterSpacing:"Espacement des Lettres",textAlign:"Alignement du Texte",darkContrast:"Contraste Sombre",lightContrast:"Contraste Clair",highContrast:"Contraste Élevé",monochrome:"Monochrome",invertColors:"Inverser les Couleurs",hideImages:"Masquer les Images",offAnimations:"Réduire les Animations"},Fh={title:"React Accessibility Widget",subtitle:"Configurações de Acessibilidade",widgetSettings:"Configurações do widget",widgetSize:"Tamanho do Widget",widgetPosition:"Posição do Widget",smallSize:"Pequeno",largeSize:"Grande",leftPosition:"Esquerda",rightPosition:"Direita",profiles:"Perfis de Acessibilidade",contentAdjustments:"Conteúdo",colorAdjustments:"Cor",visibilityAdjustments:"Visibilidade",pageStructure:"Estrutura da Página",structureHeadings:"Títulos",structureLandmarks:"Marcos",structureLinks:"Links",noStructureItems:"Nenhum item encontrado.",untitledHeading:"Título sem nome",untitledLink:"Link sem nome",resetAll:"Redefinir todas as configurações",close:"Fechar menu de acessibilidade",seizureSafe:"Seguro para Convulsões",visionImpaired:"Deficiência Visual",lightSensitivity:"Sensibilidade à Luz",colorBlind:"Daltonismo",dyslexia:"Dislexia",adhdFriendly:"Amigável para TDAH",cognitiveDisability:"Deficiência Cognitiva",legibleFonts:"Fontes Legíveis",dyslexiaFriendly:"Amigável para Dislexia",highlightTitles:"Destacar Títulos",fontSize:"Tamanho da Fonte",textMagnifier:"Lupa de Texto",readingLens:"Lupa de Leitura",bigCursor:"Cursor Grande",readingMask:"Máscara de Leitura",readingGuide:"Guia de Leitura",highlightLinks:"Destacar Links",lineHeight:"Altura da Linha",letterSpacing:"Espaçamento de Letras",textAlign:"Alinhamento de Texto",darkContrast:"Contraste Escuro",lightContrast:"Contraste Claro",highContrast:"Alto Contraste",monochrome:"Monocromático",invertColors:"Inverter Cores",hideImages:"Ocultar Imagens",offAnimations:"Reduzir Animações"},Dh={en:mf,es:Rh,fr:Oh,de:Ih,pt:Fh,ar:$h};function Qs(e="en"){return Dh[e]??mf}const lc=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", ");let dn=null,wr=null;function Wl(e,t,i){xr(),wr=e,dn=r=>{if(r.key==="Escape"){r.preventDefault(),i?i():(t.click(),t.focus());return}if(r.key!=="Tab")return;const l=Array.from(e.querySelectorAll(lc)).filter(a=>!a.closest("[hidden]")&&a.offsetParent!==null);if(l.length===0){r.preventDefault();return}const s=l[0],o=l[l.length-1];r.shiftKey?document.activeElement===s&&(r.preventDefault(),o.focus()):document.activeElement===o&&(r.preventDefault(),s.focus())},e.addEventListener("keydown",dn);const n=e.querySelector(lc);n==null||n.focus()}function xr(){dn&&wr&&wr.removeEventListener("keydown",dn),dn=null,wr=null}const sc="data-accessibility-widget-structure-id",Vl=80;let Hh=0;const vf=["header","nav","main","footer","aside","section","article","form",'[role="banner"]','[role="navigation"]','[role="main"]','[role="contentinfo"]','[role="complementary"]','[role="region"]','[role="search"]','[role="form"]','[role="article"]'].join(",");function Gl(e){const t=e.getAttribute(sc);if(t)return t;const i=`accessibility-widget-structure-${++Hh}`;return e.setAttribute(sc,i),i}function Bh(){return document.getElementById("accessibility-widget-host")??document.body}function Uh(e){return!!e.closest('.accessibility-widget-root, script, style, template, [hidden], [aria-hidden="true"]')}function kr(e){if(!(e instanceof HTMLElement)||Uh(e))return!1;const t=getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"}function zt(e){return(e??"").replace(/\s+/g," ").trim()}function Wh(e){return zt(e.getAttribute("aria-labelledby")).split(" ").filter(Boolean).map(i=>{var n;return zt((n=document.getElementById(i))==null?void 0:n.textContent)}).filter(Boolean).join(" ")}function wf(e){return zt(e.getAttribute("aria-label"))||Wh(e)||zt(e.getAttribute("title"))}function xf(e){return wf(e)||zt(e.textContent)}function Vh(e,t){return xf(e)||zt(e.href)||t}function kf(e){const t=zt(e.getAttribute("role")).toLowerCase();if(t==="banner")return"Header";if(t==="navigation")return"Navigation";if(t==="main")return"Main";if(t==="contentinfo")return"Footer";if(t==="complementary")return"Aside";if(t==="search")return"Search";if(t==="form")return"Form";if(t==="article")return"Article";if(t==="region")return"Section";const i=e.tagName.toLowerCase();return i==="nav"?"Navigation":i==="main"?"Main":i==="footer"?"Footer":i==="aside"?"Aside":i.charAt(0).toUpperCase()+i.slice(1)}function Gh(e){var t;return zt((t=e.querySelector("h1,h2,h3,h4,h5,h6"))==null?void 0:t.textContent)}function Qh(e){const t=kf(e),i=wf(e)||Gh(e);return i?`${t}: ${i}`:t}function Yh(e,t){let i=0,n=e.parentElement;for(;n&&n!==t;)n.matches(vf)&&kr(n)&&i++,n=n.parentElement;return Math.min(i,5)}function Kh(e){if(e.target==="_blank")return!0;try{return new URL(e.href,location.href).origin!==location.origin}catch{return!1}}function Xh(e){if(typeof document>"u")return{headings:[],landmarks:[],links:[]};const t=Bh(),i=Array.from(t.querySelectorAll("h1,h2,h3,h4,h5,h6")).filter(kr).slice(0,Vl).map(l=>{const s=Number(l.tagName.slice(1));return{id:Gl(l),label:xf(l)||e.untitledHeading,meta:`H${s}`,depth:Math.max(0,s-1)}}),n=Array.from(t.querySelectorAll(vf)).filter(kr).slice(0,Vl).map(l=>({id:Gl(l),label:Qh(l),meta:kf(l),depth:Yh(l,t)})),r=Array.from(t.querySelectorAll("a[href]")).filter(kr).slice(0,Vl).map(l=>({id:Gl(l),label:Vh(l,e.untitledLink),meta:"Link",external:Kh(l)}));return{headings:i,landmarks:n,links:r}}function bf(e,t){return e==="landmarks"?t.structureLandmarks:e==="links"?t.structureLinks:t.structureHeadings}function qh(e,t){const i=["headings","landmarks","links"];return`
    <div class="accessibility-widget-structure-tabs" role="tablist" aria-label="${Ae(t.pageStructure)}">
      ${i.map(n=>`
        <button type="button" class="accessibility-widget-structure-tab" role="tab" data-structure-tab="${n}" aria-selected="${e===n}">
          ${Ae(bf(n,t))}
        </button>
      `).join("")}
    </div>
  `}function Zh(e,t){return e==="headings"?`<span class="accessibility-widget-structure-badge accessibility-widget-structure-badge--text">${Ae(t.meta)}</span>`:`<span class="accessibility-widget-structure-badge">${e==="links"?_.structureLink:_.structureLandmark}</span>`}function Jh(e,t,i){return e.length===0?`<div class="accessibility-widget-structure-empty">${Ae(i.noStructureItems)}</div>`:e.map(n=>`
    <button type="button" class="accessibility-widget-structure-item" data-structure-target="${Ae(n.id)}" style="--accessibility-widget-structure-depth:${n.depth??0}">
      ${Zh(t,n)}
      <span class="accessibility-widget-structure-item-label">${Ae(n.label)}</span>
      ${n.external?`<span class="accessibility-widget-structure-external">${_.structureExternal}</span>`:""}
    </button>
  `).join("")}function ey(e,t,i,n){const r=n==="ar"?' dir="rtl"':"",l=e[t];return`
    <div class="accessibility-widget-structure-dialog" role="dialog" aria-modal="true" aria-label="${Ae(i.pageStructure)}"${r}>
      <div class="accessibility-widget-structure-header">
        <h2>${Ae(i.pageStructure)}</h2>
        <button type="button" class="accessibility-widget-structure-close" data-structure-action="close" aria-label="${Ae(i.close)}">
          ${_.close}
        </button>
      </div>
      ${qh(t,i)}
      <div class="accessibility-widget-structure-list" role="tabpanel" aria-label="${Ae(bf(t,i))}">
        ${Jh(l,t,i)}
      </div>
    </div>
  `}const $n={legibleFonts:2,highlightTitles:2,fontSize:4,textMagnifier:1,highlightLinks:2,readingLens:1,bigCursor:3,readingMask:3,readingGuide:1,lineHeight:3,letterSpacing:3,darkContrast:3,lightContrast:3,highContrast:3,monochrome:1,invertColors:1,colorBlind:1,hideImages:1,offAnimations:1},Wo=Object.keys($n),ty=4,Wt={profile:null,fontSize:0,lineHeight:0,letterSpacing:0,textAlignment:"default",legibleFonts:0,highlightTitles:0,highlightLinks:0,textMagnifier:0,readingLens:0,bigCursor:0,readingMask:0,readingGuide:0,darkContrast:0,lightContrast:0,highContrast:0,colorBlind:0,monochrome:0,invertColors:0,hideImages:0,offAnimations:0},Sf="react-accessibility-widget-state",iy=new Set(["seizure-safe","vision-impaired","light-sensitivity","color-blind","dyslexia","adhd-friendly","cognitive-disability"]),ny=new Set(["left","center","right","justify"]);function ry(e,t){return e===!0?1:e===!1||e==null?0:typeof e=="number"&&Number.isFinite(e)?e<=0?0:Math.min(t,Math.max(1,Math.round(e))):0}function ly(e){const t=e&&typeof e=="object"?e:{},i={...Wt};typeof t.profile=="string"&&iy.has(t.profile)&&(i.profile=t.profile);for(const n of Wo)i[n]=ry(t[n],$n[n]);return typeof t.textAlignment=="string"&&ny.has(t.textAlignment)&&(i.textAlignment=t.textAlignment),i}function sy(e){if(!e)return{...Wt};if(typeof localStorage>"u")return{...Wt};try{const t=localStorage.getItem(Sf);if(t)return ly(JSON.parse(t))}catch{}return{...Wt}}function oy(e,t){if(e&&!(typeof localStorage>"u"))try{localStorage.setItem(Sf,JSON.stringify(t))}catch{}}function Pt(e){for(const t of Wo){const i=e[t];if(typeof i!="number")continue;const n=$n[t];if(i<0||i>n)throw new Error(`Invalid profile preset: ${t} level ${i} exceeds max ${n}`)}return e}const ay={"seizure-safe":Pt({offAnimations:1,hideImages:1,monochrome:1}),"vision-impaired":Pt({fontSize:4,lineHeight:1,highContrast:2,bigCursor:2}),"light-sensitivity":Pt({darkContrast:2,offAnimations:1}),"color-blind":Pt({colorBlind:1,highlightLinks:2}),dyslexia:Pt({legibleFonts:1,lineHeight:2,letterSpacing:2,textAlignment:"left"}),"adhd-friendly":Pt({readingMask:2,offAnimations:1,highlightLinks:1}),"cognitive-disability":Pt({legibleFonts:2,fontSize:1,lineHeight:1,highlightTitles:2,highlightLinks:2})};function cy(e,t,i,n){const r=e.toUpperCase()==="L";return`
    <button type="button" class="accessibility-widget-size-switch" role="switch" data-size="${r?"S":"L"}" aria-checked="${r}" aria-label="${t}">
      <span class="accessibility-widget-size-switch-track" aria-hidden="true">
        <span class="accessibility-widget-size-switch-thumb"></span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--s">${i}</span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--l">${n}</span>
      </span>
    </button>
  `}function uy(e,t,i,n){return`
    <div class="accessibility-widget-position-grid" role="group" aria-label="${t}">
      <button type="button" class="accessibility-widget-position-option" data-position="left" aria-pressed="${e==="left"}" aria-label="${i}">
        <span aria-hidden="true">&#8601;</span>
      </button>
      <button type="button" class="accessibility-widget-position-option" data-position="right" aria-pressed="${e==="right"}" aria-label="${n}">
        <span aria-hidden="true">&#8600;</span>
      </button>
    </div>
  `}function Cf(e){const t=Ae(e);return`
    <span class="accessibility-widget-info" aria-hidden="true">
      ${_.info}
      <span class="accessibility-widget-tooltip">${t}</span>
    </span>
  `}function dy(e,t,i,n,r){return`
    <button class="accessibility-widget-card" type="button" data-profile="${e}" aria-pressed="${n}">
      ${Cf(r)}
      <span class="icon">${i}</span>
      <span class="label">${t}</span>
    </button>
  `}function fy(e,t){return t<=1?"":`
    <div class="accessibility-widget-levels" aria-hidden="true">
      ${Array.from({length:t},(i,n)=>`
        <span class="accessibility-widget-level${n+1===e?" active":""}"></span>
      `).join("")}
    </div>
  `}function Ys(e){const{key:t,icon:i,label:n,level:r,maxLevel:l,tooltip:s}=e,o=l<=1?r>0?"On":"Off":r>0?`Level ${r} of ${l}`:"Off";return`
    <button class="accessibility-widget-tile" type="button" data-tool="${t}" data-level="${r}" data-max-level="${l}" aria-pressed="${r>0}" aria-label="${n}, ${o}">
      ${Cf(s)}
      <span class="icon">${i}</span>
      <span class="label">${n}</span>
      ${fy(r,l)}
    </button>
  `}function ee(e,t,i,n,r){return Ys({key:t,icon:i,label:n,tooltip:r,level:e[t],maxLevel:$n[t]})}function py(e,t,i){const n=e.legibleFonts<=1;return ee(e,"legibleFonts",n?_.dyslexiaFriendlyFont:_.legibleFonts,n?t.dyslexiaFriendly:t.legibleFonts,i)}function gy(e){return e==="left"?1:e==="center"?2:e==="right"?3:e==="justify"?4:0}function hy(e){return e==="center"?_.textAlignCenter:e==="right"?_.textAlignRight:e==="justify"?_.textAlignJustify:_.textAlignLeft}const yy={"seizure-safe":"Stops animation, hides images, and applies monochrome to reduce flashing and visual triggers.","vision-impaired":"Increases text size, adds line height, applies high contrast, and enlarges the cursor.","light-sensitivity":"Applies a low-glare dark contrast profile and reduces motion.","color-blind":"Applies the color-blind filter and strengthens link highlighting so meaning is not color-only.",dyslexia:"Uses the dyslexia-friendly font with more spacing and left-aligned text.","adhd-friendly":"Adds a reading mask, reduces motion, and lightly highlights links for focus.","cognitive-disability":"Uses a hyperlegible font with clearer headings, links, spacing, and text size."},X={legibleFonts:"Cycles between the dyslexia-friendly font and Atkinson Hyperlegible.",highlightTitles:"Adds visual emphasis to headings so page structure is easier to scan.",fontSize:"Increases page text size across four levels.",textMagnifier:"Shows a magnified text preview for easier reading.",highlightLinks:"Highlights and underlines links so interactive text is easier to identify.",lineHeight:"Increases line spacing across three levels.",letterSpacing:"Increases character spacing across three levels.",textAlignment:"Cycles text alignment through left, center, right, and justify.",darkContrast:"Applies a dark contrast color treatment.",lightContrast:"Applies a light contrast color treatment.",highContrast:"Applies stronger high-contrast color combinations.",monochrome:"Removes color by applying a monochrome treatment.",invertColors:"Inverts page colors for users who prefer reversed contrast.",colorBlind:"Applies the color-blind visual filter.",readingLens:"Shows a horizontal reading lens that follows the pointer.",bigCursor:"Enlarges the cursor across three levels.",readingMask:"Dims surrounding content and keeps one reading band in focus.",readingGuide:"Adds a guide line that follows the pointer.",pageStructure:"Opens a headings, landmarks, and links navigator for the current page.",hideImages:"Hides images and videos from the page.",offAnimations:"Reduces animation and motion effects."};function my(e){return{settings:(e==null?void 0:e.settings)??!0,profiles:(e==null?void 0:e.profiles)??!1,content:(e==null?void 0:e.content)??!1,color:(e==null?void 0:e.color)??!1,visibility:(e==null?void 0:e.visibility)??!1}}function Ui(e,t,i,n){const r=`accessibility-widget-section-${e}`;return`
    <section class="accessibility-widget-section" data-section="${e}">
      <button type="button" class="accessibility-widget-section-head" data-section-toggle="${e}" aria-expanded="${!i}" aria-controls="${r}">
        <span class="accessibility-widget-section-title">${t}</span>
        <span class="accessibility-widget-section-chevron" aria-hidden="true">${i?_.chevronDown:_.chevronUp}</span>
      </button>
      <div id="${r}" class="accessibility-widget-section-body"${i?" hidden":""}>
        ${n}
      </div>
    </section>
  `}function vy(e,t,i="en",n={}){var y;const r=Qs(i),l=Ae(((y=n.title)==null?void 0:y.trim())||r.title),s=n.position??"right",o=my(n.collapsedSections),a=[{id:"seizure-safe",label:r.seizureSafe,icon:_.seizure},{id:"vision-impaired",label:r.visionImpaired,icon:_.vision},{id:"light-sensitivity",label:r.lightSensitivity,icon:_.lightSensitivity},{id:"color-blind",label:r.colorBlind,icon:_.colorBlind},{id:"dyslexia",label:r.dyslexia,icon:_.dyslexia},{id:"adhd-friendly",label:r.adhdFriendly,icon:_.adhd},{id:"cognitive-disability",label:r.cognitiveDisability,icon:_.cognitive}],d=i==="ar"?' dir="rtl"':"";return`
    <div class="accessibility-widget-header"${d}>
      <div class="accessibility-widget-header-left">
        <div class="accessibility-widget-header-icon">${_.wheelchair}</div>
        <div class="accessibility-widget-header-text">
          <div class="accessibility-widget-header-title">
            <span>${l}</span>
          </div>
          <kbd class="accessibility-widget-header-shortcut">CTRL + U</kbd>
          <div class="accessibility-widget-header-sub accessibility-widget-sr-only">${r.subtitle}</div>
        </div>
      </div>
      <div class="accessibility-widget-header-actions">
        <button type="button" class="accessibility-widget-icon-btn accessibility-widget-close" aria-label="${r.close}">${_.close}</button>
      </div>
    </div>

    <div class="accessibility-widget-body"${d}>
      <div class="accessibility-widget-body-container">
        ${Ui("settings",r.widgetSettings,o.settings,`
          <div class="accessibility-widget-setting-row">
            <span class="accessibility-widget-setting-label">${r.widgetSize}</span>
            ${cy(t,r.widgetSize,r.smallSize,r.largeSize)}
          </div>
          <div class="accessibility-widget-setting-row accessibility-widget-setting-row--stack">
            <span class="accessibility-widget-setting-label">${r.widgetPosition}</span>
            ${uy(s,r.widgetPosition,r.leftPosition,r.rightPosition)}
          </div>
        `)}

        ${Ui("profiles",r.profiles,o.profiles,`
          <div class="accessibility-widget-grid">
            ${a.map(h=>dy(h.id,h.label,h.icon,e.profile===h.id,yy[h.id])).join("")}
          </div>
        `)}

        ${Ui("content",r.contentAdjustments,o.content,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${py(e,r,X.legibleFonts)}
            ${ee(e,"highlightTitles",_.highlightTitles,r.highlightTitles,X.highlightTitles)}
            ${ee(e,"fontSize",_.fontSizing,r.fontSize,X.fontSize)}
            ${ee(e,"textMagnifier",_.textMagnifier,r.textMagnifier,X.textMagnifier)}
            ${ee(e,"highlightLinks",_.highlightLinks,r.highlightLinks,X.highlightLinks)}
            ${ee(e,"lineHeight",_.lineHeight,r.lineHeight,X.lineHeight)}
            ${ee(e,"letterSpacing",_.letterSpacing,r.letterSpacing,X.letterSpacing)}
            ${Ys({key:"textAlignment",icon:hy(e.textAlignment),label:r.textAlign,level:gy(e.textAlignment),maxLevel:ty,tooltip:X.textAlignment})}
          </div>
        `)}

        ${Ui("color",r.colorAdjustments,o.color,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${ee(e,"darkContrast",_.darkContrast,r.darkContrast,X.darkContrast)}
            ${ee(e,"lightContrast",_.lightContrast,r.lightContrast,X.lightContrast)}
            ${ee(e,"highContrast",_.highContrast,r.highContrast,X.highContrast)}
            ${ee(e,"monochrome",_.monochrome,r.monochrome,X.monochrome)}
            ${ee(e,"invertColors",_.invertColors,r.invertColors,X.invertColors)}
            ${ee(e,"colorBlind",_.colorBlindVisual,r.colorBlind,X.colorBlind)}
          </div>
        `)}

        ${Ui("visibility",r.visibilityAdjustments,o.visibility,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${ee(e,"readingLens",_.readingLens,r.readingLens,X.readingLens)}
            ${ee(e,"bigCursor",_.bigCursor,r.bigCursor,X.bigCursor)}
            ${ee(e,"readingMask",_.readingMask,r.readingMask,X.readingMask)}
            ${ee(e,"readingGuide",_.readingGuide,r.readingGuide,X.readingGuide)}
            ${Ys({key:"pageStructure",icon:_.pageStructure,label:r.pageStructure,level:n.pageStructureOpen?1:0,maxLevel:1,tooltip:X.pageStructure})}
            ${ee(e,"hideImages",_.hideImages,r.hideImages,X.hideImages)}
            ${ee(e,"offAnimations",_.offAnimations,r.offAnimations,X.offAnimations)}
          </div>
        `)}
      </div>
    </div>

    <div class="accessibility-widget-reset-bar"${d}>
      <button type="button" class="accessibility-widget-reset-btn" data-action="reset" aria-label="${r.resetAll}">
        ${_.reset}
        ${r.resetAll}
      </button>
    </div>
  `}const wy=`
/* ── Size switch ── */
.accessibility-widget-size-switch {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: inline-flex;
  align-items: center;
  min-height: 0;
  padding: 0;
}
.accessibility-widget-size-switch:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-size-switch-track {
  position: relative;
  width: 150px;
  height: 44px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 5%, #ffffff);
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 8%, #ffffff);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4px;
}
.accessibility-widget-size-switch-option {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 14px;
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0;
  color: #111827;
  transition: color 0.25s ease;
}
.accessibility-widget-size-switch-thumb {
  position: absolute;
  z-index: 1;
  left: 4px;
  top: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: #ffffff;
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 52%, #ffffff);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-thumb {
  transform: translateX(100%);
}
.accessibility-widget-size-switch[aria-checked="false"] .accessibility-widget-size-switch-option--s,
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-option--l {
  color: #111827;
}

/* ── Position grid ── */
.accessibility-widget-position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
}
.accessibility-widget-position-option {
  aspect-ratio: 16 / 7;
  border-radius: 8px;
  border: 1px solid var(--accessibility-widget-border);
  background: color-mix(in srgb, var(--accessibility-widget-text) 4%, #ffffff);
  color: color-mix(in srgb, var(--accessibility-widget-text) 64%, transparent);
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 17px;
  line-height: 1;
  padding: 6px;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.accessibility-widget-position-option[data-position="left"] span { place-self: end start; }
.accessibility-widget-position-option[data-position="right"] span { place-self: end end; }
.accessibility-widget-position-option:hover {
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-position-option:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-position-option[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: color-mix(in srgb, var(--accessibility-widget-primary) 12%, #ffffff);
  color: var(--accessibility-widget-primary);
}

/* ── Profile cards ── */
.accessibility-widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.accessibility-widget-grid-tools { grid-template-columns: repeat(2, 1fr); }
[data-size="L"] .accessibility-widget-grid-tools {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.accessibility-widget-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessibility-widget-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessibility-widget-grid > *, .accessibility-widget-grid-3 > *, .accessibility-widget-grid-tools > * { min-width: 0; }

.accessibility-widget-card {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 10px 34px 10px 12px;
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 9px;
  min-height: 58px;
  width: 100%;
}
.accessibility-widget-card:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-card[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-card[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card .icon {
  width: 28px;
  height: 28px;
  color: var(--accessibility-widget-text);
  border: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.accessibility-widget-card:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-card .icon svg { width: 19px; height: 19px; }
.accessibility-widget-card .label {
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: left;
  color: inherit;
}
.accessibility-widget-info {
  position: absolute;
  top: 13px;
  right: 13px;
  width: 18px;
  height: 18px;
  background: transparent;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accessibility-widget-text) 48%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: 0;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.accessibility-widget-info-glyph {
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
}
.accessibility-widget-tooltip {
  position: absolute;
  z-index: 8;
  top: calc(100% + 8px);
  right: 0;
  width: 198px;
  max-width: calc(100vw - 48px);
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accessibility-widget-panel-bg) 82%, #111827);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  display: none;
  pointer-events: auto;
  transition: none;
}
.accessibility-widget-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 7px;
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip {
  left: auto;
  right: 0;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip::before {
  left: auto;
  right: 7px;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
.accessibility-widget-card:hover .accessibility-widget-info,
.accessibility-widget-card:focus-visible .accessibility-widget-info,
.accessibility-widget-tile:hover .accessibility-widget-info,
.accessibility-widget-tile:focus-visible .accessibility-widget-info {
  opacity: 1;
  background: var(--accessibility-widget-info-bg);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-card[aria-pressed="true"] .accessibility-widget-info,
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-info {
  opacity: 1;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #ffffff) 18%, transparent);
  color: var(--accessibility-widget-on-primary, #ffffff);
}
.accessibility-widget-info:hover .accessibility-widget-tooltip {
  display: block;
}

/* ── Tiles (content & color adjustments) ── */
.accessibility-widget-tile {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  min-height: 114px;
  width: 100%;
}
.accessibility-widget-tile:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-tile[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-tile[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-tile[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
  border-color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 48%, transparent);
}
.accessibility-widget-tile .icon {
  width: 40px;
  height: 40px;
  color: var(--accessibility-widget-text);
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-tile:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-tile .icon svg { width: 22px; height: 22px; }
.accessibility-widget-tile .label {
  font-size: 13px;
  font-weight: 750;
  line-height: 1.25;
  overflow-wrap: anywhere;
  width: 100%;
  text-align: center;
  color: inherit;
}

/* ── Level indicator bars (centered under each tile) ── */
.accessibility-widget-levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 0;
  min-height: 7px;
}
.accessibility-widget-levels span {
  flex: 0 0 16px;
  width: 16px;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 16%, transparent);
  transition: background 0.2s ease, height 0.2s ease;
}
.accessibility-widget-levels span.active {
  height: 7px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 30%, transparent);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: var(--accessibility-widget-on-primary, #fff);
}

/* ── Reset bar ── */
.accessibility-widget-reset-bar {
  padding: 0 12px 10px;
  border-top: 0;
  flex-shrink: 0;
  background: var(--accessibility-widget-panel-bg);
}
.accessibility-widget-reset-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #ffffff);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-reset-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 90%, #ffffff);
}
.accessibility-widget-reset-btn svg { width: 14px; height: 14px; color: currentColor; }
`,xy=`
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`,ky=`
/* ── Applied host effects ── */
#accessibility-widget-host.accessibility-widget-effect-legible-fonts, #accessibility-widget-host.accessibility-widget-effect-legible-fonts * {
  font-family: var(--accessibility-widget-legible-font-family), Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: var(--accessibility-widget-legible-letter-spacing, 0em) !important;
  word-spacing: var(--accessibility-widget-legible-word-spacing, 0em) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dyslexia, #accessibility-widget-host.accessibility-widget-effect-dyslexia * {
  font-family: "Accessibility Widget OpenDyslexic", Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: 0.04em !important;
  word-spacing: 0.03em !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h1,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h2,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h3,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h4,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h5,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h6 {
  outline: var(--accessibility-widget-title-outline-width, 2px) solid #f59e0b !important;
  outline-offset: 2px !important;
  background: rgba(245,158,11,var(--accessibility-widget-title-highlight-alpha, 0.07)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-links a {
  outline: var(--accessibility-widget-link-outline-width, 2px) solid #3b82f6 !important;
  outline-offset: 2px !important;
  background: rgba(59,130,246,var(--accessibility-widget-link-highlight-alpha, 0.07)) !important;
  text-decoration: underline !important;
  text-decoration-thickness: var(--accessibility-widget-link-underline-width, 1px) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast {
  background: var(--accessibility-widget-dark-contrast-bg, #000) !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
  border-color: var(--accessibility-widget-dark-contrast-border, #333) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast {
  background: var(--accessibility-widget-light-contrast-bg, #fff) !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
  border-color: var(--accessibility-widget-light-contrast-border, #475569) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast {
  background: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast * {
  background-color: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
  border-color: var(--accessibility-widget-high-contrast-border, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-monochrome { filter: grayscale(var(--accessibility-widget-monochrome-amount, 100%)) !important; }
#accessibility-widget-host.accessibility-widget-effect-invert { filter: invert(var(--accessibility-widget-invert-amount, 100%)) hue-rotate(180deg) !important; }
#accessibility-widget-host.accessibility-widget-effect-color-blind {
  filter:
    url('#accessibility-widget-protanopia')
    saturate(var(--accessibility-widget-color-blind-saturate, 0.85))
    contrast(var(--accessibility-widget-color-blind-contrast, 1)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-hide-images img,
#accessibility-widget-host.accessibility-widget-effect-hide-images picture {
  visibility: hidden !important;
}
#accessibility-widget-host.accessibility-widget-effect-off-animations,
#accessibility-widget-host.accessibility-widget-effect-off-animations *,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::before,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::after {
  animation-delay: 0s !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0.001ms !important;
}
`,by=`
.accessibility-widget-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ── Trigger ── */
.accessibility-widget-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: var(--accessibility-widget-trigger-bg, var(--accessibility-widget-primary));
  color: var(--accessibility-widget-trigger-icon, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.accessibility-widget-trigger:hover { filter: brightness(0.93); }
.accessibility-widget-trigger:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accessibility-widget-primary) 55%, transparent);
  outline-offset: 3px;
}
.accessibility-widget-trigger svg { width: 26px; height: 26px; }
.accessibility-widget-trigger[data-position="right"] { right: var(--accessibility-widget-trigger-offset-x, 20px); bottom: var(--accessibility-widget-trigger-offset-y, 20px); }
.accessibility-widget-trigger[data-position="left"]  { left: var(--accessibility-widget-trigger-offset-x, 20px);  bottom: var(--accessibility-widget-trigger-offset-y, 20px); }

/* ── Overlay ── */
.accessibility-widget-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9,9,11,0.42);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.accessibility-widget-overlay.open { opacity: 1; pointer-events: auto; }

/* ── Panel ── */
.accessibility-widget-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--accessibility-widget-panel-bg);
  width: 380px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 720px;
  border-radius: 22px;
  border: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.accessibility-widget-panel.open {
  opacity: 1;
  pointer-events: auto;
}
.accessibility-widget-panel[data-size="S"] { width: 380px; max-height: 720px; }
.accessibility-widget-panel[data-size="L"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="right"] { right: 8px; bottom: 8px; }
.accessibility-widget-panel[data-position="left"]  { left: 8px;  bottom: 8px; }
@media (max-width: 480px) {
  .accessibility-widget-panel,
  .accessibility-widget-panel[data-size="S"],
  .accessibility-widget-panel[data-size="L"] {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    max-height: none;
  }
}

/* ── Header ── */
.accessibility-widget-header {
  background: var(--accessibility-widget-panel-bg);
  color: var(--accessibility-widget-on-primary, #fff);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 10px;
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.accessibility-widget-header-icon {
  width: 34px;
  height: 34px;
  background: var(--accessibility-widget-primary);
  border: 0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-header-icon svg { width: 20px; height: 20px; }
.accessibility-widget-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.accessibility-widget-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  max-width: 100%;
}
.accessibility-widget-header-title {
  display: block;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--accessibility-widget-on-primary, #fff);
  line-height: 1.15;
}
.accessibility-widget-header-title span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-header-shortcut {
  border: 0;
  padding: 0;
  background: transparent;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 76%, transparent);
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 72%, transparent);
  letter-spacing: 0;
  text-transform: uppercase;
  line-height: 1.2;
}
.accessibility-widget-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 7px;
}
.accessibility-widget-icon-btn {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-primary) 10%, #ffffff);
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.16s ease;
}
.accessibility-widget-icon-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 7%, #ffffff);
  color: #111827;
  transform: scale(1.04);
}
.accessibility-widget-icon-btn:active {
  transform: scale(0.98);
}
.accessibility-widget-icon-btn svg { width: 12px; height: 12px; }

/* ── Body ── */
.accessibility-widget-body {
  flex: 1;
  overflow: hidden;
  margin: 0 12px 10px;
  background: var(--accessibility-widget-panel-bg);
  min-width: 0;
  border-radius: 8px;
}

.accessibility-widget-body-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.accessibility-widget-body::-webkit-scrollbar { width: 7px; }
.accessibility-widget-body::-webkit-scrollbar-track { background: transparent; }
.accessibility-widget-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 36%, transparent);
  border-radius: 999px;
  border: 2px solid var(--accessibility-widget-panel-bg);
}
.accessibility-widget-body::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 56%, transparent);
}

/* ── Section ── */
.accessibility-widget-section {
  padding: 16px;
  background: var(--accessibility-widget-card-bg);
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 88%, #ffffff);
  border-radius: 8px;
  margin: 0 0 16px;
  color: var(--accessibility-widget-text);
}
.accessibility-widget-section:last-child { margin-bottom: 0; }
.accessibility-widget-section-head {
  width: 100%;
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: var(--accessibility-widget-section-head-bg);
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
}
.accessibility-widget-section-head:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-section-title {
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0;
  text-transform: none;
  color: var(--accessibility-widget-text);
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-section-chevron {
  width: 18px;
  height: 18px;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-section-chevron svg { width: 18px; height: 18px; }
.accessibility-widget-section-body {
  padding-top: 16px;
}
.accessibility-widget-section-body[hidden] {
  display: none;
}
.accessibility-widget-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
}
.accessibility-widget-setting-row + .accessibility-widget-setting-row {
  margin-top: 12px;
}
.accessibility-widget-setting-row--stack {
  align-items: stretch;
  flex-direction: column;
  gap: 8px;
}
.accessibility-widget-setting-label {
  color: var(--accessibility-widget-text);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
}
`,Sy=`
.accessibility-widget-magnify-cursor {
  position: fixed;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 2147483645;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 18px;
  max-width: 280px;
  color: #0c0c0c;
  line-height: 1.4;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

/* ── Reading lens (circular zoom that follows the cursor) ── */
.accessibility-widget-reading-lens {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2147483645;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 3px solid #0c0c0c;
  will-change: transform;
  contain: layout paint;
}
.accessibility-widget-reading-lens-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
  will-change: transform;
}
.accessibility-widget-reading-lens-inner > * {
  margin: 0 !important;
}
.accessibility-widget-reading-lens-inner,
.accessibility-widget-reading-lens-inner *,
.accessibility-widget-reading-lens-inner *::before,
.accessibility-widget-reading-lens-inner *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* ── Reading mask (clear horizontal band with shaded surroundings) ── */
.accessibility-widget-reading-mask {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483644;
}
.accessibility-widget-reading-mask-panel {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(0,0,0,var(--accessibility-widget-reading-mask-opacity, 0.45));
}
.accessibility-widget-reading-mask-top {
  top: 0;
  border-bottom: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}
.accessibility-widget-reading-mask-bottom {
  bottom: 0;
  border-top: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}

/* ── Reading guide (high-contrast rule that follows the cursor) ── */
.accessibility-widget-reading-guide {
  position: fixed;
  left: 0;
  width: 100vw;
  height: var(--accessibility-widget-reading-guide-height, 8px);
  border: var(--accessibility-widget-reading-guide-border, 3px) solid var(--accessibility-widget-reading-guide-edge, #facc15);
  border-radius: 999px;
  background: var(--accessibility-widget-reading-guide-fill, #0c0c0c);
  pointer-events: none;
  z-index: 2147483645;
}
.accessibility-widget-reading-guide-pointer {
  position: absolute;
  left: var(--accessibility-widget-reading-guide-x, 50vw);
  top: -24px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 18px solid var(--accessibility-widget-reading-guide-edge, #facc15);
}
.accessibility-widget-reading-guide-pointer::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 7px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accessibility-widget-reading-guide-fill, #0c0c0c);
}

.accessibility-widget-root :focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 2px;
}
`,Cy=`
/* ── Page structure dialog ── */
.accessibility-widget-structure-layer {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
}
.accessibility-widget-structure-layer[hidden] { display: none; }
.accessibility-widget-structure-dialog {
  position: fixed;
  top: 24px;
  bottom: 24px;
  left: clamp(16px, 5vw, 80px);
  width: min(920px, calc(100vw - 420px));
  min-width: min(640px, calc(100vw - 32px));
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  border-radius: 16px;
  border: 1px solid var(--accessibility-widget-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}
.accessibility-widget-structure-header {
  min-height: 62px;
  padding: 14px 22px;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.accessibility-widget-structure-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.accessibility-widget-structure-close {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.accessibility-widget-structure-close:hover {
  background: color-mix(in srgb, currentColor 14%, transparent);
}
.accessibility-widget-structure-close svg {
  width: 20px;
  height: 20px;
}
.accessibility-widget-structure-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--accessibility-widget-border);
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-tab {
  min-height: 50px;
  border: 0;
  border-inline-end: 1px solid var(--accessibility-widget-border);
  background: transparent;
  color: var(--accessibility-widget-muted);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.01em;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease;
}
.accessibility-widget-structure-tab:last-child { border-inline-end: 0; }
.accessibility-widget-structure-tab:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"] {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-list {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-item {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 22px);
  text-align: left;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessibility-widget-structure-item:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-badge {
  width: 34px;
  height: 26px;
  border-radius: 7px;
  background: var(--accessibility-widget-surface);
  border: 1px solid var(--accessibility-widget-border);
  color: var(--accessibility-widget-primary);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.accessibility-widget-structure-badge--text {
  background: var(--accessibility-widget-surface);
  font-size: 11px;
  font-weight: 700;
}
.accessibility-widget-structure-badge svg {
  width: 16px;
  height: 16px;
}
.accessibility-widget-structure-item-label {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 15px;
  line-height: 1.25;
}
.accessibility-widget-structure-external {
  flex: 0 0 auto;
  display: inline-flex;
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-external svg {
  width: 14px;
  height: 14px;
}
.accessibility-widget-structure-empty {
  padding: 28px 12px;
  color: var(--accessibility-widget-muted);
  font-size: 13px;
}

/* ── Page structure dialog — small viewports ── */
@media (max-width: 900px) {
  .accessibility-widget-structure-dialog {
    inset: 12px;
    width: auto;
    min-width: 0;
  }
  .accessibility-widget-structure-header {
    min-height: 64px;
    padding: 14px 18px;
  }
  .accessibility-widget-structure-tab {
    min-height: 46px;
    font-size: 13px;
  }
  .accessibility-widget-structure-list {
    padding: 12px;
  }
  .accessibility-widget-structure-item {
    margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 12px);
  }
  .accessibility-widget-structure-item-label {
    font-size: 14px;
  }
}
`,Ef={primary:"#0c0c0c",background:"#ffffff",text:"#0c0c0c",border:"#e4e4e7",muted:"#71717a",surface:"#f4f4f5"},Ey=e=>`
.accessibility-widget-root {
  --accessibility-widget-primary: ${e.primary};
  --accessibility-widget-bg: ${e.background};
  --accessibility-widget-text: ${e.text};
  --accessibility-widget-border: ${e.border};
  --accessibility-widget-muted: ${e.muted};
  --accessibility-widget-surface: ${e.surface};
  --accessibility-widget-on-primary: #ffffff;
  --accessibility-widget-panel-bg: color-mix(in srgb, var(--accessibility-widget-primary) 24%, #01020f);
  --accessibility-widget-card-bg: color-mix(in srgb, var(--accessibility-widget-bg) 92%, #ffffff);
  --accessibility-widget-section-head-bg: color-mix(in srgb, var(--accessibility-widget-text) 7%, #ffffff);
  --accessibility-widget-info-bg: color-mix(in srgb, var(--accessibility-widget-panel-bg) 9%, #ffffff);
  --accessibility-widget-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--accessibility-widget-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
.accessibility-widget-root *, .accessibility-widget-root *::before, .accessibility-widget-root *::after {
  box-sizing: border-box;
}
`,oc="accessibility-widget-styles";function Ly(e=Ef){return[xy,Ey(e),by,wy,Cy,ky,Sy].join(`
`)}const ac=["darkContrast","lightContrast","highContrast","monochrome","invertColors"],Ql=["left","center","right","justify"],zy=["settings","profiles","content","color","visibility"];function cc(e){return typeof e=="string"&&e.toUpperCase()==="L"?"L":"S"}function Wi(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function uc(e){return e==="left"?"left":"right"}function _y(e){const t=e.trim().replace(/^#/,"");let i,n,r;if(t.length===3)i=parseInt(t[0]+t[0],16),n=parseInt(t[1]+t[1],16),r=parseInt(t[2]+t[2],16);else if(t.length===6)i=parseInt(t.slice(0,2),16),n=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16);else return"#ffffff";if([i,n,r].some(o=>Number.isNaN(o)))return"#ffffff";const l=o=>{const a=o/255;return a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4)};return .2126*l(i)+.7152*l(n)+.0722*l(r)>.45?"#0c0c0c":"#ffffff"}let Ty=class{constructor(t={}){this.root=null,this.trigger=null,this.overlay=null,this.panel=null,this.structureDialog=null,this.isOpen=!1,this.pageStructureOpen=!1,this.pageStructureTab="headings",this.collapsedSections={settings:!0,profiles:!1,content:!1,color:!1,visibility:!1},this.shortcutListenerOptions={capture:!0},this.handleGlobalShortcut=i=>{const n=i.key.toLowerCase();i.ctrlKey&&!i.metaKey&&!i.altKey&&!i.shiftKey&&(n==="u"||i.code==="KeyU")&&(i.preventDefault(),i.stopPropagation(),this.toggle())},this.config={position:"right",persistence:!0,lang:"en",...t},this.config.position=uc(this.config.position),this.size=cc(this.config.size),this.lang=this.config.lang??"en",this.state=sy(this.config.persistence)}mount(){typeof document>"u"||(this.injectStyles(),lh(),this.root=document.createElement("div"),this.root.className="accessibility-widget-root",this.root.setAttribute("role","complementary"),this.applyTheme(),this.applyOffset(),this.trigger=document.createElement("button"),this.trigger.className="accessibility-widget-trigger",this.trigger.type="button",this.trigger.dataset.position=this.config.position,this.trigger.setAttribute("aria-expanded","false"),this.trigger.innerHTML=_.trigger,this.trigger.addEventListener("click",()=>this.toggle()),this.overlay=document.createElement("div"),this.overlay.className="accessibility-widget-overlay",this.overlay.addEventListener("click",()=>{this.pageStructureOpen?this.closePageStructure():this.close()}),this.panel=document.createElement("div"),this.panel.className="accessibility-widget-panel",this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.dataset.position=this.config.position,this.panel.dataset.size=this.size,this.panel.addEventListener("click",t=>this.handlePanelClick(t)),this.structureDialog=document.createElement("div"),this.structureDialog.className="accessibility-widget-structure-layer",this.structureDialog.hidden=!0,this.structureDialog.addEventListener("click",t=>this.handleStructureClick(t)),this.root.append(this.trigger,this.overlay,this.panel,this.structureDialog),document.body.appendChild(this.root),document.addEventListener("keydown",this.handleGlobalShortcut,this.shortcutListenerOptions),this.update(),Bl(this.state))}destroy(){Lh(),sh(),xr(),document.removeEventListener("keydown",this.handleGlobalShortcut,this.shortcutListenerOptions),this.root&&(this.root.remove(),this.root=null),this.trigger=null,this.overlay=null,this.panel=null,this.structureDialog=null}open(){var t,i,n;this.isOpen=!0,(t=this.trigger)==null||t.setAttribute("aria-expanded","true"),(n=(i=this.config).onOpen)==null||n.call(i),this.update(),this.panel&&this.trigger&&Wl(this.panel,this.trigger)}close(){var t,i,n;this.isOpen=!1,this.pageStructureOpen=!1,(t=this.trigger)==null||t.setAttribute("aria-expanded","false"),(n=(i=this.config).onClose)==null||n.call(i),xr(),this.update()}toggle(){this.isOpen?this.close():this.open()}reset(){var n,r;const t=this.captureScrollPosition(),i=this.capturePanelFocusSelector();this.pageStructureOpen=!1,this.state={...Wt},this.persist(),Bl(this.state),(r=(n=this.config).onReset)==null||r.call(n),this.update(t,i)}getState(){return{...this.state}}getIsOpen(){return this.isOpen}setSize(t){this.size=cc(t),this.panel&&(this.panel.dataset.size=this.size),this.update()}setPosition(t){const i=uc(t);this.config.position=i,this.trigger&&(this.trigger.dataset.position=i),this.panel&&(this.panel.dataset.position=i),this.update()}setOffsetX(t){this.config.offsetX=t,this.applyOffset()}setOffsetY(t){this.config.offsetY=t,this.applyOffset()}setLang(t){this.lang=t,this.update()}setTitle(t){this.config.title=t,this.updateWidgetLabels(),this.update()}setAccentColor(t){this.config.accentColor=t,this.applyTheme()}setTheme(t){this.config.theme=t,this.applyTheme()}setTriggerScheme(t){this.config.triggerScheme=t,this.applyTriggerScheme()}applyOffset(){if(!this.root)return;const{offsetX:t,offsetY:i}=this.config;F(this.root,"--accessibility-widget-trigger-offset-x",typeof t=="number"?`${t}px`:void 0),F(this.root,"--accessibility-widget-trigger-offset-y",typeof i=="number"?`${i}px`:void 0)}getTitle(){var t;return((t=this.config.title)==null?void 0:t.trim())||Qs(this.lang).title}getTriggerLabel(t){return t.toLowerCase().includes("menu")?`Open ${t}`:`Open ${t} menu`}updateWidgetLabels(){var i,n,r;const t=this.getTitle();(i=this.root)==null||i.setAttribute("aria-label",t),(n=this.trigger)==null||n.setAttribute("aria-label",this.getTriggerLabel(t)),(r=this.panel)==null||r.setAttribute("aria-label",`${t} settings`)}applyTheme(){var n,r;if(!this.root)return;const t=((n=this.config.accentColor)==null?void 0:n.trim())||((r=this.config.theme)==null?void 0:r.primary),i=this.config.theme;F(this.root,"--accessibility-widget-primary",t),F(this.root,"--accessibility-widget-header-bg",t),F(this.root,"--accessibility-widget-bg",i==null?void 0:i.background),F(this.root,"--accessibility-widget-text",i==null?void 0:i.text),F(this.root,"--accessibility-widget-on-primary",t?_y(t):void 0),this.applyTriggerScheme()}applyTriggerScheme(){if(!this.root)return;const t=this.config.triggerScheme??"auto",i=(n,r)=>{this.root.style.setProperty("--accessibility-widget-trigger-bg",n),this.root.style.setProperty("--accessibility-widget-trigger-icon",r)};t==="dark"?i("#0c0c0c","#ffffff"):t==="light"?i("#ffffff","#0c0c0c"):i("var(--accessibility-widget-primary)","#ffffff")}handlePanelClick(t){const i=t.target;if(i.closest(".accessibility-widget-close")){this.close();return}this.handleSectionToggleClick(i)||this.handleActionClick(i)||this.handleSizeClick(i)||this.handlePositionClick(i)||this.handleProfileClick(i)||this.handleToolClick(i)}handleSectionToggleClick(t){const i=t.closest("[data-section-toggle]");if(!i)return!1;const n=i.dataset.sectionToggle;return this.isPanelSection(n)&&(this.collapsedSections[n]=!this.collapsedSections[n],this.update()),!0}isPanelSection(t){return zy.includes(t)}handleActionClick(t){const i=t.closest("[data-action]");return i?(i.dataset.action==="reset"&&this.reset(),!0):!1}handleSizeClick(t){var n;const i=t.closest("[data-size]");return!i||!((n=this.panel)!=null&&n.contains(i))||!i.classList.contains("accessibility-widget-size-switch")?!1:(this.setSize(i.dataset.size),!0)}handlePositionClick(t){var r;const i=t.closest("[data-position]");if(!i||!((r=this.panel)!=null&&r.contains(i))||!i.classList.contains("accessibility-widget-position-option"))return!1;const n=i.dataset.position;return n!=="left"&&n!=="right"||this.setPosition(n),!0}handleProfileClick(t){const i=t.closest("[data-profile]");return i?(this.toggleProfile(i.dataset.profile),!0):!1}handleToolClick(t){const i=t.closest("[data-tool]");if(!i)return!1;const n=i.dataset.tool;return n==="pageStructure"?this.togglePageStructure():n==="textAlignment"?this.cycleAlignment():n&&Wo.includes(n)&&this.cycleLevel(n),!0}handleStructureClick(t){const i=t.target;if(i.closest('[data-structure-action="close"]')){this.closePageStructure();return}const n=i.closest("[data-structure-tab]");if(n){this.pageStructureTab=this.normalizeStructureTab(n.dataset.structureTab),this.update();return}const r=i.closest("[data-structure-target]");r!=null&&r.dataset.structureTarget&&this.jumpToStructureTarget(r.dataset.structureTarget)}normalizeStructureTab(t){return t==="landmarks"||t==="links"?t:"headings"}togglePageStructure(){this.pageStructureOpen?this.closePageStructure():this.openPageStructure()}openPageStructure(){this.pageStructureTab="headings",this.pageStructureOpen=!0,this.update(),this.trapStructureFocus()}closePageStructure(){this.pageStructureOpen&&(this.pageStructureOpen=!1,xr(),this.update(),this.isOpen&&this.panel&&this.trigger&&Wl(this.panel,this.trigger))}trapStructureFocus(){var i;const t=(i=this.structureDialog)==null?void 0:i.querySelector(".accessibility-widget-structure-close");!this.structureDialog||!t||Wl(this.structureDialog,t,()=>this.closePageStructure())}jumpToStructureTarget(t){const i=document.querySelector(`[data-accessibility-widget-structure-id="${t}"]`);i&&(this.closePageStructure(),i.scrollIntoView({block:"center",behavior:"smooth"}),i.hasAttribute("tabindex")||i.setAttribute("tabindex","-1"),i.focus({preventScroll:!0}))}toggleProfile(t){if(this.state.profile===t)this.state={...Wt};else{const i=ay[t]??{};this.state={...Wt,profile:t,...i}}this.commit()}cycleLevel(t){const i=this.state[t];if(typeof i!="number")return;const n=$n[t],r=i>=n?0:i+1;if(ac.includes(t)&&r>0)for(const l of ac)l!==t&&(this.state[l]=0);this.state[t]=r,this.commit()}cycleAlignment(){const t=Ql.indexOf(this.state.textAlignment);this.state.textAlignment=Ql[(t+1)%Ql.length],this.commit()}commit(){const t=this.captureScrollPosition(),i=this.capturePanelFocusSelector();this.persist(),Bl(this.state),this.update(t,i)}persist(){oy(this.config.persistence,this.state)}update(t=this.captureScrollPosition(),i=this.capturePanelFocusSelector()){var n;this.panel&&(this.updateWidgetLabels(),this.panel.classList.toggle("open",this.isOpen),(n=this.overlay)==null||n.classList.toggle("open",this.isOpen),this.panel.innerHTML=vy(this.state,this.size,this.lang,{pageStructureOpen:this.pageStructureOpen,title:this.getTitle(),position:this.config.position,collapsedSections:this.collapsedSections}),this.renderStructureDialog(),this.restorePanelFocus(i),this.restoreScrollPosition(t))}captureScrollPosition(){var i;const t=(i=this.panel)==null?void 0:i.querySelector(".accessibility-widget-body");return{panelBodyLeft:(t==null?void 0:t.scrollLeft)??0,panelBodyTop:(t==null?void 0:t.scrollTop)??0,windowX:typeof window>"u"?0:window.scrollX,windowY:typeof window>"u"?0:window.scrollY}}restoreScrollPosition(t){const i=()=>{var r;const n=(r=this.panel)==null?void 0:r.querySelector(".accessibility-widget-body");n&&(n.scrollLeft=t.panelBodyLeft,n.scrollTop=t.panelBodyTop),this.restoreWindowScroll(t.windowX,t.windowY)};i(),typeof window<"u"&&typeof window.requestAnimationFrame=="function"&&window.requestAnimationFrame(i)}restoreWindowScroll(t,i){if(typeof window>"u")return;const n=window.scrollX,r=window.scrollY;if(n===t&&r===i)return;if(typeof window.scrollTo=="function")try{window.scrollTo(t,i);return}catch{}const l=document.scrollingElement;l&&(l.scrollLeft=t,l.scrollTop=i)}capturePanelFocusSelector(){if(!this.panel||typeof document>"u")return null;const t=document.activeElement;if(!(t instanceof HTMLElement)||!this.panel.contains(t))return null;const i=t.closest("[data-tool]");if(i&&this.panel.contains(i)&&i.dataset.tool)return`[data-tool="${Wi(i.dataset.tool)}"]`;const n=t.closest("[data-profile]");if(n&&this.panel.contains(n)&&n.dataset.profile)return`[data-profile="${Wi(n.dataset.profile)}"]`;const r=t.closest("[data-section-toggle]");if(r&&this.panel.contains(r)&&r.dataset.sectionToggle)return`[data-section-toggle="${Wi(r.dataset.sectionToggle)}"]`;const l=t.closest(".accessibility-widget-position-option[data-position]");if(l&&this.panel.contains(l)&&l.dataset.position)return`.accessibility-widget-position-option[data-position="${Wi(l.dataset.position)}"]`;if(t.classList.contains("accessibility-widget-size-switch"))return".accessibility-widget-size-switch";if(t.classList.contains("accessibility-widget-close"))return".accessibility-widget-close";const s=t.closest("[data-action]");return s&&this.panel.contains(s)&&s.dataset.action?`[data-action="${Wi(s.dataset.action)}"]`:null}restorePanelFocus(t){if(!t||!this.isOpen||!this.panel)return;const i=this.panel.querySelector(t);if(i)try{i.focus({preventScroll:!0})}catch{i.focus()}}renderStructureDialog(){if(!this.structureDialog)return;if(this.structureDialog.hidden=!this.pageStructureOpen,this.structureDialog.classList.toggle("open",this.pageStructureOpen),!this.pageStructureOpen){this.structureDialog.innerHTML="";return}const t=Qs(this.lang),i=Xh(t);this.structureDialog.innerHTML=ey(i,this.pageStructureTab,t,this.lang)}injectStyles(){if(typeof document>"u"||document.getElementById(oc))return;const t=document.createElement("style");t.id=oc,t.textContent=Ly(Ef),document.head.appendChild(t)}};function Ny(e){const t=I.useRef(null),i=I.useRef(e);return i.current=e,I.useEffect(()=>{const n=new Ty(i.current);return t.current=n,n.mount(),()=>{n.destroy(),t.current=null}},[]),I.useEffect(()=>{t.current&&e.lang&&t.current.setLang(e.lang)},[e.lang]),I.useEffect(()=>{t.current&&e.size&&t.current.setSize(e.size)},[e.size]),I.useEffect(()=>{t.current&&e.position&&t.current.setPosition(e.position)},[e.position]),I.useEffect(()=>{t.current&&t.current.setOffsetX(e.offsetX)},[e.offsetX]),I.useEffect(()=>{t.current&&t.current.setOffsetY(e.offsetY)},[e.offsetY]),I.useEffect(()=>{t.current&&e.triggerScheme&&t.current.setTriggerScheme(e.triggerScheme)},[e.triggerScheme]),I.useEffect(()=>{t.current&&t.current.setTitle(e.title)},[e.title]),I.useEffect(()=>{t.current&&t.current.setAccentColor(e.accentColor)},[e.accentColor]),I.useEffect(()=>{t.current&&t.current.setTheme(e.theme)},[e.theme]),null}const tr="@firefam/react-accessibility-widget",Yl="https://github.com/firefam/react-accessibility-widget",ut={ember:{primary:"#c2410c",background:"#fffaf3",text:"#1c1917"},grove:{primary:"#15803d",background:"#f6fbf6",text:"#14241b"},tide:{primary:"#1d4ed8",background:"#f5f8ff",text:"#0f172a"},plum:{primary:"#7c3aed",background:"#faf5ff",text:"#1e1b2e"}},My=[{id:"left",corner:"↙"},{id:"right",corner:"↘"}],jy=[{icon:"profiles",title:"7 Preset Profiles",body:"Seizure Safe, Vision Impaired, Light Sensitivity, Color Blind, Dyslexia, ADHD Friendly, and Cognitive Disability."},{icon:"type",title:"8 Content Tools",body:"Legible fonts, title/link highlighting, font size, text magnifier, line height, letter spacing, and text alignment."},{icon:"color",title:"6 Color Tools",body:"Dark, light, and high contrast, plus monochrome, invert colors, and a color-blind visual filter."},{icon:"reading",title:"7 Visibility Tools",body:"Reading lens, big cursor, reading mask, reading guide, page structure, hide media, and reduce animations."},{icon:"keyboard",title:"Keyboard Shortcut",body:"Ctrl+U opens and closes the widget, with the shortcut shown under the configured widget title."},{icon:"theme",title:"Themeable Settings",body:"Configure title, accent color, panel size, left/right position, trigger offsets, and theme tokens."}],Py=[{value:"7",label:"Profiles"},{value:"21",label:"Tools"},{value:"3",label:"Tool groups"},{value:"2",label:"Positions"}],Ay=[{feature:"Profiles",result:"Apply curated bundles of real widget tools",target:"Fast accommodation presets"},{feature:"Content",result:"Fonts, scale, spacing, link/title highlights, alignment",target:"Reading comfort and scannability"},{feature:"Color",result:"Contrast modes, monochrome, invert, color-blind filter",target:"Low vision and color perception checks"},{feature:"Visibility",result:"Lens, mask, guide, cursor, structure, media, motion",target:"Focus, navigation, and distraction control"}],$y={profiles:p.jsxs(p.Fragment,{children:[p.jsx("circle",{cx:"9",cy:"8",r:"3.2"}),p.jsx("path",{d:"M3.5 19a5.5 5.5 0 0 1 11 0"}),p.jsx("path",{d:"M16 6a3 3 0 0 1 0 6"}),p.jsx("path",{d:"M17.5 19a5.5 5.5 0 0 0-3-4.9"})]}),type:p.jsxs(p.Fragment,{children:[p.jsx("path",{d:"M5 18 11 6l6 12"}),p.jsx("path",{d:"M7.5 13.5h7"})]}),color:p.jsxs(p.Fragment,{children:[p.jsx("circle",{cx:"12",cy:"12",r:"8.5"}),p.jsx("path",{d:"M12 3.5v17"}),p.jsx("path",{d:"M12 12a8.5 8.5 0 0 0 0-8.5",fill:"currentColor",stroke:"none"})]}),reading:p.jsxs(p.Fragment,{children:[p.jsx("path",{d:"M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"}),p.jsx("circle",{cx:"12",cy:"12",r:"2.6"})]}),keyboard:p.jsxs(p.Fragment,{children:[p.jsx("rect",{x:"3.5",y:"6.5",width:"17",height:"11",rx:"2"}),p.jsx("path",{d:"M7 10h.01"}),p.jsx("path",{d:"M10 10h.01"}),p.jsx("path",{d:"M13 10h.01"}),p.jsx("path",{d:"M16 10h.01"}),p.jsx("path",{d:"M7 13.5h5"}),p.jsx("path",{d:"M15 13.5h2"})]}),theme:p.jsxs(p.Fragment,{children:[p.jsx("path",{d:"M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-1 2-1.8 0-1.4-1.4-1.6-1.4-2.7 0-.8.7-1.5 1.6-1.5h1.6a4.1 4.1 0 0 0 4.1-4.6C20.7 6 16.8 3.5 12 3.5Z"}),p.jsx("circle",{cx:"8",cy:"11",r:"1",fill:"currentColor",stroke:"none"}),p.jsx("circle",{cx:"12",cy:"8",r:"1",fill:"currentColor",stroke:"none"}),p.jsx("circle",{cx:"16",cy:"11",r:"1",fill:"currentColor",stroke:"none"})]})};function Iy({name:e}){return p.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:$y[e]})}function dc(e,t){return`data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520" role="img" aria-label="Abstract interface composition">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${e}"/><stop offset="100%" stop-color="${t}"/>
        </linearGradient>
      </defs>
      <rect width="720" height="520" rx="32" fill="#ffffff" opacity="0.6"/>
      <rect x="40" y="40" width="640" height="440" rx="26" fill="url(#g)" opacity="0.16"/>
      <rect x="80" y="96" width="300" height="232" rx="22" fill="#ffffff"/>
      <rect x="408" y="84" width="232" height="52" rx="16" fill="#ffffff"/>
      <rect x="408" y="160" width="262" height="18" rx="9" fill="#ffffff" opacity="0.9"/>
      <rect x="408" y="196" width="214" height="18" rx="9" fill="#ffffff" opacity="0.7"/>
      <rect x="408" y="232" width="240" height="18" rx="9" fill="#ffffff" opacity="0.55"/>
      <circle cx="180" cy="212" r="78" fill="url(#g)"/>
      <circle cx="556" cy="352" r="84" fill="url(#g)" opacity="0.4"/>
      <rect x="104" y="356" width="236" height="22" rx="11" fill="#ffffff" opacity="0.9"/>
      <rect x="104" y="394" width="192" height="22" rx="11" fill="#ffffff" opacity="0.7"/>
    </svg>`)}`}const Ry=`
  <!doctype html><html lang="en"><body style="margin:0;font-family:Georgia,serif;background:#f4efe7;color:#26221d;display:flex;align-items:center;justify-content:flex-start;height:100%;">
    <div style="box-sizing:border-box;width:100%;padding:20px;text-align:left;"><strong>Embedded preview</strong>
    <p style="margin:8px 0 0;">A mixed-content surface for visual testing.</p></div>
  </body></html>`;function Oy({label:e,value:t,options:i,onChange:n}){return p.jsxs("div",{className:"cfg-field",children:[p.jsx("span",{className:"cfg-label",children:e}),p.jsx("div",{className:"segmented",role:"group","aria-label":e,children:i.map(r=>p.jsx("button",{type:"button",className:"seg","aria-pressed":t===r.id,onClick:()=>n(r.id),children:r.label},r.id))})]})}function Fy(){const[e,t]=I.useState("Accessibility"),[i,n]=I.useState("right"),[r,l]=I.useState("S"),[s,o]=I.useState(20),[a,d]=I.useState(20),[y,h]=I.useState("tide"),[g,w]=I.useState(ut.tide.primary),[x,k]=I.useState(!1),O={...ut[y],primary:g},f=`<AccessibilityWidget
  title="${e||"Accessibility"}"
  accentColor="${g}"
  position="${i}"
  offsetX={${s}}
  offsetY={${a}}
  size="${r}"
/>`;function u(){var c;(c=navigator.clipboard)==null||c.writeText(`npm install ${tr}`).then(()=>{k(!0),window.setTimeout(()=>k(!1),1600)}).catch(()=>{})}return p.jsxs("div",{className:"playground",style:{"--demo-accent":g},children:[p.jsxs("aside",{className:"config-rail","aria-label":"Widget configuration",children:[p.jsxs("div",{className:"brand",children:[p.jsx("span",{className:"brand-mark","aria-hidden":"true",children:p.jsx("svg",{viewBox:"0 0 32 32",fill:"currentColor",children:p.jsx("path",{d:"M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z",fill:"currentColor"})})}),p.jsxs("div",{children:[p.jsx("p",{className:"brand-name",children:"Accessibility Widget"}),p.jsx("p",{className:"brand-tag",children:"Live playground"})]})]}),p.jsxs("div",{className:"cfg-scroll",children:[p.jsxs("section",{className:"cfg-group",children:[p.jsx("h2",{className:"cfg-group-title",children:"Branding"}),p.jsxs("div",{className:"cfg-field",children:[p.jsx("label",{className:"cfg-label",htmlFor:"cfg-title",children:"Widget title"}),p.jsx("input",{id:"cfg-title",type:"text",value:e,placeholder:"Accessibility",onChange:c=>t(c.target.value)})]}),p.jsxs("div",{className:"cfg-field",children:[p.jsx("span",{className:"cfg-label",children:"Accent colour"}),p.jsxs("div",{className:"accent-row",children:[p.jsx("input",{type:"color",value:g,"aria-label":"Accent colour",onInput:c=>w(c.currentTarget.value),onChange:c=>w(c.currentTarget.value)}),p.jsx("code",{children:g}),p.jsx("div",{className:"swatches",role:"group","aria-label":"Theme presets",children:Object.keys(ut).map(c=>p.jsx("button",{type:"button",className:"swatch","aria-label":c,"aria-pressed":y===c&&g===ut[c].primary,style:{background:ut[c].primary},onClick:()=>{h(c),w(ut[c].primary)}},c))})]})]})]}),p.jsxs("section",{className:"cfg-group",children:[p.jsx("h2",{className:"cfg-group-title",children:"Placement"}),p.jsxs("div",{className:"cfg-field",children:[p.jsx("span",{className:"cfg-label",children:"Trigger position"}),p.jsx("div",{className:"pos-pad",role:"group","aria-label":"Trigger position",children:My.map(c=>p.jsx("button",{type:"button",className:"pos-cell","data-pos":c.id,"aria-pressed":i===c.id,"aria-label":c.id,onClick:()=>n(c.id),children:p.jsx("span",{"aria-hidden":"true",children:c.corner})},c.id))})]}),p.jsx(Oy,{label:"Panel size",value:r,options:[{id:"S",label:"Small"},{id:"L",label:"Large"}],onChange:l}),p.jsxs("div",{className:"cfg-field",children:[p.jsxs("span",{className:"cfg-label",children:["Offset X ",p.jsxs("span",{className:"cfg-value",children:[s,"px"]})]}),p.jsx("input",{className:"slider",type:"range",min:8,max:64,step:2,value:s,"aria-label":"Trigger horizontal offset",onChange:c=>o(Number(c.target.value))})]}),p.jsxs("div",{className:"cfg-field",children:[p.jsxs("span",{className:"cfg-label",children:["Offset Y ",p.jsxs("span",{className:"cfg-value",children:[a,"px"]})]}),p.jsx("input",{className:"slider",type:"range",min:8,max:64,step:2,value:a,"aria-label":"Trigger vertical offset",onChange:c=>d(Number(c.target.value))})]})]}),p.jsxs("section",{className:"cfg-group",children:[p.jsx("h2",{className:"cfg-group-title",children:"Current config"}),p.jsx("pre",{className:"snippet",children:p.jsx("code",{children:f})}),p.jsxs("div",{className:"rail-links",children:[p.jsx("a",{className:"rail-link",href:`https://www.npmjs.com/package/${tr}`,target:"_blank",rel:"noreferrer",children:"npm"}),p.jsx("a",{className:"rail-link",href:Yl,target:"_blank",rel:"noreferrer",children:"GitHub"})]})]})]})]}),p.jsxs("main",{className:"content",id:"main",children:[p.jsxs("section",{className:"hero",children:[p.jsxs("div",{className:"hero-copy",children:[p.jsx("p",{className:"eyebrow",children:"Drop-in accessibility overlay"}),p.jsx("h1",{children:"The accessibility widget your users deserve."}),p.jsx("p",{className:"lede",children:"One component adds 7 profiles and 21 content, color, and visibility tools to any React app. Tune the live widget from the panel on the left, then open it from the floating button to test each tool."}),p.jsxs("div",{className:"install",children:[p.jsxs("code",{children:["npm install ",tr]}),p.jsx("button",{type:"button",className:"copy-btn",onClick:u,children:x?"Copied ✓":"Copy"})]}),p.jsxs("p",{className:"hero-hint","aria-hidden":"true",children:["Open the widget on the ",p.jsx("strong",{children:i})," ↘"]})]}),p.jsx("img",{className:"hero-art",src:dc(g,ut[y].text),alt:""})]}),p.jsx("section",{className:"metrics","aria-label":"At a glance",children:Py.map(c=>p.jsxs("div",{className:"metric",children:[p.jsx("span",{className:"metric-value",children:c.value}),p.jsx("span",{className:"metric-label",children:c.label})]},c.label))}),p.jsx("section",{className:"features","aria-label":"Features",children:jy.map(c=>p.jsxs("article",{className:"feature",children:[p.jsx("span",{className:"feature-icon",children:p.jsx(Iy,{name:c.icon})}),p.jsx("h3",{children:c.title}),p.jsx("p",{children:c.body})]},c.title))}),p.jsxs("section",{className:"prose-card",children:[p.jsx("p",{className:"eyebrow",children:"Sample content"}),p.jsx("h2",{children:"What is web accessibility?"}),p.jsx("p",{children:"Web accessibility means people with disabilities can perceive, understand, navigate, and interact with the web. This page is dense on purpose — headings, prose, quotes, a form, a table, and media give the widget real content to adjust so you can judge each tool in context."}),p.jsx("blockquote",{children:"Good accessibility tooling is easier to trust when it can be exercised against content that looks like a real product instead of a synthetic sample."}),p.jsx("h3",{children:"Reading-level adjustments"}),p.jsx("p",{children:"Increase font size, loosen line height and letter spacing, highlight links or titles, switch fonts, or cycle text alignment and watch this paragraph re-flow live."}),p.jsxs("details",{children:[p.jsx("summary",{children:"Why keep an intentional test surface on the page?"}),p.jsx("p",{children:"Widget behaviour is easier to validate against realistic friction: dense prose, mixed controls, media, and compact links give manual visual QA useful targets."})]})]}),p.jsxs("div",{className:"split",children:[p.jsxs("section",{className:"form-card",children:[p.jsx("p",{className:"eyebrow",children:"Interactive controls"}),p.jsx("h2",{children:"Sample form"}),p.jsxs("form",{className:"demo-form",onSubmit:c=>c.preventDefault(),children:[p.jsxs("label",{children:["Full name",p.jsx("input",{type:"text",name:"fullName",placeholder:"Ari Mason"})]}),p.jsxs("label",{children:["Email address",p.jsx("input",{type:"email",name:"email",placeholder:"ari@example.com"})]}),p.jsxs("label",{children:["Team size",p.jsxs("select",{name:"teamSize",defaultValue:"6-20",children:[p.jsx("option",{value:"1-5",children:"1–5 people"}),p.jsx("option",{value:"6-20",children:"6–20 people"}),p.jsx("option",{value:"21-50",children:"21–50 people"}),p.jsx("option",{value:"50+",children:"50+ people"})]})]}),p.jsxs("label",{children:["Notes",p.jsx("textarea",{name:"notes",rows:3,placeholder:"What kind of review are you running?"})]}),p.jsxs("fieldset",{className:"choice-row",children:[p.jsx("legend",{children:"Preferred review path"}),p.jsxs("label",{children:[p.jsx("input",{type:"radio",name:"path",defaultChecked:!0})," Visual pass"]}),p.jsxs("label",{children:[p.jsx("input",{type:"radio",name:"path"})," Reading-aid pass"]})]}),p.jsx("button",{type:"submit",className:"submit-btn",children:"Submit"})]})]}),p.jsxs("section",{className:"table-card",children:[p.jsx("p",{className:"eyebrow",children:"Coverage"}),p.jsx("h2",{children:"Feature at a glance"}),p.jsxs("table",{children:[p.jsx("thead",{children:p.jsxs("tr",{children:[p.jsx("th",{scope:"col",children:"Feature"}),p.jsx("th",{scope:"col",children:"What it changes"}),p.jsx("th",{scope:"col",children:"Best for"})]})}),p.jsx("tbody",{children:Ay.map(c=>p.jsxs("tr",{children:[p.jsx("th",{scope:"row",children:c.feature}),p.jsx("td",{children:c.result}),p.jsx("td",{children:c.target})]},c.feature))})]}),p.jsxs("div",{className:"media-row",children:[p.jsx("img",{src:dc(ut[y].text,g),alt:"Decorative abstract composition"}),p.jsx("iframe",{title:"Embedded preview",srcDoc:Ry})]})]})]}),p.jsxs("section",{className:"quickstart",children:[p.jsx("p",{className:"eyebrow",children:"Quick start"}),p.jsx("h2",{children:"Add it in two lines"}),p.jsx("pre",{className:"code-block",children:p.jsx("code",{children:`import { AccessibilityWidget } from '${tr}'

export default function App() {
  return (
    <>
      <YourApp />
${f.split(`
`).map(c=>"      "+c).join(`
`)}
    </>
  )
}`})})]}),p.jsxs("footer",{className:"content-footer",children:[p.jsx("span",{children:"Built under the firefam organization."}),p.jsx("a",{href:Yl,target:"_blank",rel:"noreferrer",children:Yl.replace("https://","")})]})]}),p.jsx(Ny,{title:e,accentColor:g,position:i,offsetX:s,offsetY:a,size:r,theme:O})]})}Kl.createRoot(document.getElementById("root")).render(p.jsx(Uf.StrictMode,{children:p.jsx(Fy,{})}));
