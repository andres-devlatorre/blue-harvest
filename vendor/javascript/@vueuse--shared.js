import{shallowRef as e,watchEffect as t,readonly as n,ref as r,watch as o,customRef as u,getCurrentScope as a,onScopeDispose as l,effectScope as c,getCurrentInstance as s,provide as i,inject as f,isVue3 as d,version as m,isRef as h,unref as p,computed as v,reactive as g,toRefs as y,toRef as b,isVue2 as w,set as O,onBeforeMount as V,nextTick as A,onBeforeUnmount as T,onMounted as D,onUnmounted as F,isReactive as S}from"vue-demi";function computedEager(r,o){var u;const a=e();t((()=>{a.value=r()}),{...o,flush:(u=o==null?void 0:o.flush)!=null?u:"sync"});return n(a)}function computedWithControl(e,t){let n;let a;let l;const c=r(true);const update=()=>{c.value=true;l()};o(e,update,{flush:"sync"});const s=typeof t==="function"?t:t.get;const i=typeof t==="function"?void 0:t.set;const f=u(((e,t)=>{a=e;l=t;return{get(){if(c.value){n=s();c.value=false}a();return n},set(e){i==null?void 0:i(e)}}}));Object.isExtensible(f)&&(f.trigger=update);return f}function tryOnScopeDispose(e){if(a()){l(e);return true}return false}function createEventHook(){const e=new Set;const off=t=>{e.delete(t)};const on=t=>{e.add(t);const offFn=()=>off(t);tryOnScopeDispose(offFn);return{off:offFn}};const trigger=(...t)=>Promise.all(Array.from(e).map((e=>e(...t))));return{on:on,off:off,trigger:trigger}}function createGlobalState(e){let t=false;let n;const r=c(true);return(...o)=>{if(!t){n=r.run((()=>e(...o)));t=true}return n}}const M=new WeakMap;const provideLocal=(e,t)=>{var n;const r=(n=s())==null?void 0:n.proxy;if(r==null)throw new Error("provideLocal must be called in setup");M.has(r)||M.set(r,Object.create(null));const o=M.get(r);o[e]=t;i(e,t)};const injectLocal=(...e)=>{var t;const n=e[0];const r=(t=s())==null?void 0:t.proxy;if(r==null)throw new Error("injectLocal must be called in setup");return M.has(r)&&n in M.get(r)?M.get(r)[n]:f(...e)};function createInjectionState(e,t){const n=(t==null?void 0:t.injectionKey)||Symbol(e.name||"InjectionState");const r=t==null?void 0:t.defaultValue;const useProvidingState=(...t)=>{const r=e(...t);provideLocal(n,r);return r};const useInjectedState=()=>injectLocal(n,r);return[useProvidingState,useInjectedState]}function createSharedComposable(e){let t=0;let n;let r;const dispose=()=>{t-=1;if(r&&t<=0){r.stop();n=void 0;r=void 0}};return(...o)=>{t+=1;if(!n){r=c(true);n=r.run((()=>e(...o)))}tryOnScopeDispose(dispose);return n}}function extendRef(e,t,{enumerable:n=false,unwrap:r=true}={}){if(d||m.startsWith("2.7.")){for(const[o,u]of Object.entries(t))o!=="value"&&(h(u)&&r?Object.defineProperty(e,o,{get(){return u.value},set(e){u.value=e},enumerable:n}):Object.defineProperty(e,o,{value:u,enumerable:n}));return e}if(process.env.NODE_ENV!=="production")throw new Error("[VueUse] extendRef only works in Vue 2.7 or above.")}function get(e,t){return t==null?p(e):p(e)[t]}function isDefined(e){return p(e)!=null}function makeDestructurable(e,t){if(typeof Symbol!=="undefined"){const n={...e};Object.defineProperty(n,Symbol.iterator,{enumerable:false,value(){let e=0;return{next:()=>({value:t[e++],done:e>t.length})}}});return n}return Object.assign([...t],e)}function toValue(e){return typeof e==="function"?e():p(e)}const j=toValue;function reactify(e,t){const n=(t==null?void 0:t.computedGetter)===false?p:toValue;return function(...t){return v((()=>e.apply(this,t.map((e=>n(e))))))}}function reactifyObject(e,t={}){let n=[];let r;if(Array.isArray(t))n=t;else{r=t;const{includeOwnProperties:o=true}=t;n.push(...Object.keys(e));o&&n.push(...Object.getOwnPropertyNames(e))}return Object.fromEntries(n.map((t=>{const n=e[t];return[t,typeof n==="function"?reactify(n.bind(e),r):n]})))}function toReactive(e){if(!h(e))return g(e);const t=new Proxy({},{get(t,n,r){return p(Reflect.get(e.value,n,r))},set(t,n,r){h(e.value[n])&&!h(r)?e.value[n].value=r:e.value[n]=r;return true},deleteProperty(t,n){return Reflect.deleteProperty(e.value,n)},has(t,n){return Reflect.has(e.value,n)},ownKeys(){return Object.keys(e.value)},getOwnPropertyDescriptor(){return{enumerable:true,configurable:true}}});return g(t)}function reactiveComputed(e){return toReactive(v(e))}function reactiveOmit(e,...t){const n=t.flat();const r=n[0];return reactiveComputed((()=>typeof r==="function"?Object.fromEntries(Object.entries(y(e)).filter((([e,t])=>!r(toValue(t),e)))):Object.fromEntries(Object.entries(y(e)).filter((e=>!n.includes(e[0]))))))}const P=typeof window!=="undefined"&&typeof document!=="undefined";const C=typeof WorkerGlobalScope!=="undefined"&&globalThis instanceof WorkerGlobalScope;const isDef=e=>typeof e!=="undefined";const notNullish=e=>e!=null;const assert=(e,...t)=>{e||console.warn(...t)};const I=Object.prototype.toString;const isObject=e=>I.call(e)==="[object Object]";const now=()=>Date.now();const timestamp=()=>+Date.now();const clamp=(e,t,n)=>Math.min(n,Math.max(t,e));const noop=()=>{};const rand=(e,t)=>{e=Math.ceil(e);t=Math.floor(t);return Math.floor(Math.random()*(t-e+1))+e};const hasOwn=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const E=getIsIOS();function getIsIOS(){var e,t;return P&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(?:ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function createFilterWrapper(e,t){function wrapper(...n){return new Promise(((r,o)=>{Promise.resolve(e((()=>t.apply(this,n)),{fn:t,thisArg:this,args:n})).then(r).catch(o)}))}return wrapper}const bypassFilter=e=>e();function debounceFilter(e,t={}){let n;let r;let o=noop;const _clearTimeout=e=>{clearTimeout(e);o();o=noop};const filter=u=>{const a=toValue(e);const l=toValue(t.maxWait);n&&_clearTimeout(n);if(a<=0||l!==void 0&&l<=0){if(r){_clearTimeout(r);r=null}return Promise.resolve(u())}return new Promise(((e,c)=>{o=t.rejectOnCancel?c:e;l&&!r&&(r=setTimeout((()=>{n&&_clearTimeout(n);r=null;e(u())}),l));n=setTimeout((()=>{r&&_clearTimeout(r);r=null;e(u())}),a)}))};return filter}function throttleFilter(...e){let t=0;let n;let r=true;let o=noop;let u;let a;let l;let c;let s;h(e[0])||typeof e[0]!=="object"?[a,l=true,c=true,s=false]=e:({delay:a,trailing:l=true,leading:c=true,rejectOnCancel:s=false}=e[0]);const clear=()=>{if(n){clearTimeout(n);n=void 0;o();o=noop}};const filter=e=>{const i=toValue(a);const f=Date.now()-t;const invoke=()=>u=e();clear();if(i<=0){t=Date.now();return invoke()}if(f>i&&(c||!r)){t=Date.now();invoke()}else l&&(u=new Promise(((e,u)=>{o=s?u:e;n=setTimeout((()=>{t=Date.now();r=true;e(invoke());clear()}),Math.max(0,i-f))})));c||n||(n=setTimeout((()=>r=true),i));r=false;return u};return filter}function pausableFilter(e=bypassFilter){const t=r(true);function pause(){t.value=false}function resume(){t.value=true}const eventFilter=(...n)=>{t.value&&e(...n)};return{isActive:n(t),pause:pause,resume:resume,eventFilter:eventFilter}}const N={mounted:d?"mounted":"inserted",updated:d?"updated":"componentUpdated",unmounted:d?"unmounted":"unbind"};function cacheStringFunction(e){const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}}const R=/\B([A-Z])/g;const W=cacheStringFunction((e=>e.replace(R,"-$1").toLowerCase()));const x=/-(\w)/g;const B=cacheStringFunction((e=>e.replace(x,((e,t)=>t?t.toUpperCase():""))));function promiseTimeout(e,t=false,n="Timeout"){return new Promise(((r,o)=>{t?setTimeout((()=>o(n)),e):setTimeout(r,e)}))}function identity(e){return e}function createSingletonPromise(e){let t;function wrapper(){t||(t=e());return t}wrapper.reset=async()=>{const e=t;t=void 0;e&&await e};return wrapper}function invoke(e){return e()}function containsProp(e,...t){return t.some((t=>t in e))}function increaseWithUnit(e,t){var n;if(typeof e==="number")return e+t;const r=((n=e.match(/^-?\d+\.?\d*/))==null?void 0:n[0])||"";const o=e.slice(r.length);const u=Number.parseFloat(r)+t;return Number.isNaN(u)?e:u+o}function objectPick(e,t,n=false){return t.reduce(((t,r)=>{r in e&&(n&&e[r]===void 0||(t[r]=e[r]));return t}),{})}function objectOmit(e,t,n=false){return Object.fromEntries(Object.entries(e).filter((([e,r])=>(!n||r!==void 0)&&!t.includes(e))))}function objectEntries(e){return Object.entries(e)}function getLifeCycleTarget(e){return e||s()}function toRef(...e){if(e.length!==1)return b(...e);const t=e[0];return typeof t==="function"?n(u((()=>({get:t,set:noop})))):r(t)}const k=toRef;function reactivePick(e,...t){const n=t.flat();const r=n[0];return reactiveComputed((()=>typeof r==="function"?Object.fromEntries(Object.entries(y(e)).filter((([e,t])=>r(toValue(t),e)))):Object.fromEntries(n.map((t=>[t,toRef(e,t)])))))}function refAutoReset(e,t=1e4){return u(((n,r)=>{let o=toValue(e);let u;const resetAfter=()=>setTimeout((()=>{o=toValue(e);r()}),toValue(t));tryOnScopeDispose((()=>{clearTimeout(u)}));return{get(){n();return o},set(e){o=e;r();clearTimeout(u);u=resetAfter()}}}))}function useDebounceFn(e,t=200,n={}){return createFilterWrapper(debounceFilter(t,n),e)}function refDebounced(e,t=200,n={}){const u=r(e.value);const a=useDebounceFn((()=>{u.value=e.value}),t,n);o(e,(()=>a()));return u}function refDefault(e,t){return v({get(){var n;return(n=e.value)!=null?n:t},set(t){e.value=t}})}function useThrottleFn(e,t=200,n=false,r=true,o=false){return createFilterWrapper(throttleFilter(t,n,r,o),e)}function refThrottled(e,t=200,n=true,u=true){if(t<=0)return e;const a=r(e.value);const l=useThrottleFn((()=>{a.value=e.value}),t,n,u);o(e,(()=>l()));return a}function refWithControl(e,t={}){let n=e;let r;let o;const a=u(((e,t)=>{r=e;o=t;return{get(){return get()},set(e){set(e)}}}));function get(e=true){e&&r();return n}function set(e,r=true){var u,a;if(e===n)return;const l=n;if(((u=t.onBeforeChange)==null?void 0:u.call(t,e,l))!==false){n=e;(a=t.onChanged)==null?void 0:a.call(t,e,l);r&&o()}}const untrackedGet=()=>get(false);const silentSet=e=>set(e,false);const peek=()=>get(false);const lay=e=>set(e,false);return extendRef(a,{get:get,set:set,untrackedGet:untrackedGet,silentSet:silentSet,peek:peek,lay:lay},{enumerable:true})}const L=refWithControl;function set(...e){if(e.length===2){const[t,n]=e;t.value=n}if(e.length===3)if(w)O(...e);else{const[t,n,r]=e;t[n]=r}}function watchWithFilter(e,t,n={}){const{eventFilter:r=bypassFilter,...u}=n;return o(e,createFilterWrapper(r,t),u)}function watchPausable(e,t,n={}){const{eventFilter:r,...o}=n;const{eventFilter:u,pause:a,resume:l,isActive:c}=pausableFilter(r);const s=watchWithFilter(e,t,{...o,eventFilter:u});return{stop:s,pause:a,resume:l,isActive:c}}function syncRef(e,t,...[n]){const{flush:r="sync",deep:o=false,immediate:u=true,direction:a="both",transform:l={}}=n||{};const c=[];const s="ltr"in l&&l.ltr||(e=>e);const i="rtl"in l&&l.rtl||(e=>e);a!=="both"&&a!=="ltr"||c.push(watchPausable(e,(e=>{c.forEach((e=>e.pause()));t.value=s(e);c.forEach((e=>e.resume()))}),{flush:r,deep:o,immediate:u}));a!=="both"&&a!=="rtl"||c.push(watchPausable(t,(t=>{c.forEach((e=>e.pause()));e.value=i(t);c.forEach((e=>e.resume()))}),{flush:r,deep:o,immediate:u}));const stop=()=>{c.forEach((e=>e.stop()))};return stop}function syncRefs(e,t,n={}){const{flush:r="sync",deep:u=false,immediate:a=true}=n;Array.isArray(t)||(t=[t]);return o(e,(e=>t.forEach((t=>t.value=e))),{flush:r,deep:u,immediate:a})}function toRefs(e,t={}){if(!h(e))return y(e);const n=Array.isArray(e.value)?Array.from({length:e.value.length}):{};for(const r in e.value)n[r]=u((()=>({get(){return e.value[r]},set(n){var o;const u=(o=toValue(t.replaceRef))==null||o;if(u)if(Array.isArray(e.value)){const t=[...e.value];t[r]=n;e.value=t}else{const t={...e.value,[r]:n};Object.setPrototypeOf(t,Object.getPrototypeOf(e.value));e.value=t}else e.value[r]=n}})));return n}function tryOnBeforeMount(e,t=true,n){const r=getLifeCycleTarget(n);r?V(e,n):t?e():A(e)}function tryOnBeforeUnmount(e,t){const n=getLifeCycleTarget(t);n&&T(e,t)}function tryOnMounted(e,t=true,n){const r=getLifeCycleTarget();r?D(e,n):t?e():A(e)}function tryOnUnmounted(e,t){const n=getLifeCycleTarget(t);n&&F(e,t)}function createUntil(e,t=false){function toMatch(n,{flush:r="sync",deep:u=false,timeout:a,throwOnTimeout:l}={}){let c=null;const s=new Promise((a=>{c=o(e,(e=>{if(n(e)!==t){c==null?void 0:c();a(e)}}),{flush:r,deep:u,immediate:true})}));const i=[s];a!=null&&i.push(promiseTimeout(a,l).then((()=>toValue(e))).finally((()=>c==null?void 0:c())));return Promise.race(i)}function toBe(n,r){if(!h(n))return toMatch((e=>e===n),r);const{flush:u="sync",deep:a=false,timeout:l,throwOnTimeout:c}=r!=null?r:{};let s=null;const i=new Promise((r=>{s=o([e,n],(([e,n])=>{if(t!==(e===n)){s==null?void 0:s();r(e)}}),{flush:u,deep:a,immediate:true})}));const f=[i];l!=null&&f.push(promiseTimeout(l,c).then((()=>toValue(e))).finally((()=>{s==null?void 0:s();return toValue(e)})));return Promise.race(f)}function toBeTruthy(e){return toMatch((e=>Boolean(e)),e)}function toBeNull(e){return toBe(null,e)}function toBeUndefined(e){return toBe(void 0,e)}function toBeNaN(e){return toMatch(Number.isNaN,e)}function toContains(e,t){return toMatch((t=>{const n=Array.from(t);return n.includes(e)||n.includes(toValue(e))}),t)}function changed(e){return changedTimes(1,e)}function changedTimes(e=1,t){let n=-1;return toMatch((()=>{n+=1;return n>=e}),t)}if(Array.isArray(toValue(e))){const n={toMatch:toMatch,toContains:toContains,changed:changed,changedTimes:changedTimes,get not(){return createUntil(e,!t)}};return n}{const n={toMatch:toMatch,toBe:toBe,toBeTruthy:toBeTruthy,toBeNull:toBeNull,toBeNaN:toBeNaN,toBeUndefined:toBeUndefined,changed:changed,changedTimes:changedTimes,get not(){return createUntil(e,!t)}};return n}}function until(e){return createUntil(e)}function defaultComparator(e,t){return e===t}function useArrayDifference(...e){var t;const n=e[0];const r=e[1];let o=(t=e[2])!=null?t:defaultComparator;if(typeof o==="string"){const e=o;o=(t,n)=>t[e]===n[e]}return v((()=>toValue(n).filter((e=>toValue(r).findIndex((t=>o(e,t)))===-1))))}function useArrayEvery(e,t){return v((()=>toValue(e).every(((e,n,r)=>t(toValue(e),n,r)))))}function useArrayFilter(e,t){return v((()=>toValue(e).map((e=>toValue(e))).filter(t)))}function useArrayFind(e,t){return v((()=>toValue(toValue(e).find(((e,n,r)=>t(toValue(e),n,r))))))}function useArrayFindIndex(e,t){return v((()=>toValue(e).findIndex(((e,n,r)=>t(toValue(e),n,r)))))}function findLast(e,t){let n=e.length;while(n-- >0)if(t(e[n],n,e))return e[n]}function useArrayFindLast(e,t){return v((()=>toValue(Array.prototype.findLast?toValue(e).findLast(((e,n,r)=>t(toValue(e),n,r))):findLast(toValue(e),((e,n,r)=>t(toValue(e),n,r))))))}function isArrayIncludesOptions(e){return isObject(e)&&containsProp(e,"formIndex","comparator")}function useArrayIncludes(...e){var t;const n=e[0];const r=e[1];let o=e[2];let u=0;if(isArrayIncludesOptions(o)){u=(t=o.fromIndex)!=null?t:0;o=o.comparator}if(typeof o==="string"){const e=o;o=(t,n)=>t[e]===toValue(n)}o=o!=null?o:(e,t)=>e===toValue(t);return v((()=>toValue(n).slice(u).some(((e,t,n)=>o(toValue(e),toValue(r),t,toValue(n))))))}function useArrayJoin(e,t){return v((()=>toValue(e).map((e=>toValue(e))).join(toValue(t))))}function useArrayMap(e,t){return v((()=>toValue(e).map((e=>toValue(e))).map(t)))}function useArrayReduce(e,t,...n){const reduceCallback=(e,n,r)=>t(toValue(e),toValue(n),r);return v((()=>{const t=toValue(e);return n.length?t.reduce(reduceCallback,toValue(n[0])):t.reduce(reduceCallback)}))}function useArraySome(e,t){return v((()=>toValue(e).some(((e,n,r)=>t(toValue(e),n,r)))))}function uniq(e){return Array.from(new Set(e))}function uniqueElementsBy(e,t){return e.reduce(((n,r)=>{n.some((n=>t(r,n,e)))||n.push(r);return n}),[])}function useArrayUnique(e,t){return v((()=>{const n=toValue(e).map((e=>toValue(e)));return t?uniqueElementsBy(n,t):uniq(n)}))}function useCounter(e=0,t={}){let n=p(e);const o=r(e);const{max:u=Number.POSITIVE_INFINITY,min:a=Number.NEGATIVE_INFINITY}=t;const inc=(e=1)=>o.value=Math.max(Math.min(u,o.value+e),a);const dec=(e=1)=>o.value=Math.min(Math.max(a,o.value-e),u);const get=()=>o.value;const set=e=>o.value=Math.max(a,Math.min(u,e));const reset=(e=n)=>{n=e;return set(e)};return{count:o,inc:inc,dec:dec,get:get,set:set,reset:reset}}const U=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[T\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/i;const $=/[YMDHhms]o|\[([^\]]+)\]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;function defaultMeridiem(e,t,n,r){let o=e<12?"AM":"PM";r&&(o=o.split("").reduce(((e,t)=>e+`${t}.`),""));return n?o.toLowerCase():o}function formatOrdinal(e){const t=["th","st","nd","rd"];const n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}function formatDate(e,t,n={}){var r;const o=e.getFullYear();const u=e.getMonth();const a=e.getDate();const l=e.getHours();const c=e.getMinutes();const s=e.getSeconds();const i=e.getMilliseconds();const f=e.getDay();const d=(r=n.customMeridiem)!=null?r:defaultMeridiem;const m={Yo:()=>formatOrdinal(o),YY:()=>String(o).slice(-2),YYYY:()=>o,M:()=>u+1,Mo:()=>formatOrdinal(u+1),MM:()=>`${u+1}`.padStart(2,"0"),MMM:()=>e.toLocaleDateString(n.locales,{month:"short"}),MMMM:()=>e.toLocaleDateString(n.locales,{month:"long"}),D:()=>String(a),Do:()=>formatOrdinal(a),DD:()=>`${a}`.padStart(2,"0"),H:()=>String(l),Ho:()=>formatOrdinal(l),HH:()=>`${l}`.padStart(2,"0"),h:()=>`${l%12||12}`.padStart(1,"0"),ho:()=>formatOrdinal(l%12||12),hh:()=>`${l%12||12}`.padStart(2,"0"),m:()=>String(c),mo:()=>formatOrdinal(c),mm:()=>`${c}`.padStart(2,"0"),s:()=>String(s),so:()=>formatOrdinal(s),ss:()=>`${s}`.padStart(2,"0"),SSS:()=>`${i}`.padStart(3,"0"),d:()=>f,dd:()=>e.toLocaleDateString(n.locales,{weekday:"narrow"}),ddd:()=>e.toLocaleDateString(n.locales,{weekday:"short"}),dddd:()=>e.toLocaleDateString(n.locales,{weekday:"long"}),A:()=>d(l,c),AA:()=>d(l,c,false,true),a:()=>d(l,c,true),aa:()=>d(l,c,true,true)};return t.replace($,((e,t)=>{var n,r;return(r=t!=null?t:(n=m[e])==null?void 0:n.call(m))!=null?r:e}))}function normalizeDate(e){if(e===null)return new Date(Number.NaN);if(e===void 0)return new Date;if(e instanceof Date)return new Date(e);if(typeof e==="string"&&!/Z$/i.test(e)){const t=e.match(U);if(t){const e=t[2]-1||0;const n=(t[7]||"0").substring(0,3);return new Date(t[1],e,t[3]||1,t[4]||0,t[5]||0,t[6]||0,n)}}return new Date(e)}function useDateFormat(e,t="HH:mm:ss",n={}){return v((()=>formatDate(normalizeDate(toValue(e)),toValue(t),n)))}function useIntervalFn(e,t=1e3,n={}){const{immediate:u=true,immediateCallback:a=false}=n;let l=null;const c=r(false);function clean(){if(l){clearInterval(l);l=null}}function pause(){c.value=false;clean()}function resume(){const n=toValue(t);if(!(n<=0)){c.value=true;a&&e();clean();l=setInterval(e,n)}}u&&P&&resume();if(h(t)||typeof t==="function"){const e=o(t,(()=>{c.value&&P&&resume()}));tryOnScopeDispose(e)}tryOnScopeDispose(pause);return{isActive:c,pause:pause,resume:resume}}function useInterval(e=1e3,t={}){const{controls:n=false,immediate:o=true,callback:u}=t;const a=r(0);const update=()=>a.value+=1;const reset=()=>{a.value=0};const l=useIntervalFn(u?()=>{update();u(a.value)}:update,e,{immediate:o});return n?{counter:a,reset:reset,...l}:a}function useLastChanged(e,t={}){var n;const u=r((n=t.initialValue)!=null?n:null);o(e,(()=>u.value=timestamp()),t);return u}function useTimeoutFn(e,t,o={}){const{immediate:u=true}=o;const a=r(false);let l=null;function clear(){if(l){clearTimeout(l);l=null}}function stop(){a.value=false;clear()}function start(...n){clear();a.value=true;l=setTimeout((()=>{a.value=false;l=null;e(...n)}),toValue(t))}if(u){a.value=true;P&&start()}tryOnScopeDispose(stop);return{isPending:n(a),start:start,stop:stop}}function useTimeout(e=1e3,t={}){const{controls:n=false,callback:r}=t;const o=useTimeoutFn(r!=null?r:noop,e,t);const u=v((()=>!o.isPending.value));return n?{ready:u,...o}:u}function useToNumber(e,t={}){const{method:n="parseFloat",radix:r,nanToZero:o}=t;return v((()=>{let t=toValue(e);typeof t==="string"&&(t=Number[n](t,r));o&&Number.isNaN(t)&&(t=0);return t}))}function useToString(e){return v((()=>`${toValue(e)}`))}function useToggle(e=false,t={}){const{truthyValue:n=true,falsyValue:o=false}=t;const u=h(e);const a=r(e);function toggle(e){if(arguments.length){a.value=e;return a.value}{const e=toValue(n);a.value=a.value===e?toValue(o):e;return a.value}}return u?toggle:[a,toggle]}function watchArray(e,t,n){let r=(n==null?void 0:n.immediate)?[]:[...e instanceof Function?e():Array.isArray(e)?e:toValue(e)];return o(e,((e,n,o)=>{const u=Array.from({length:r.length});const a=[];for(const t of e){let e=false;for(let n=0;n<r.length;n++)if(!u[n]&&t===r[n]){u[n]=true;e=true;break}e||a.push(t)}const l=r.filter(((e,t)=>!u[t]));t(e,r,a,l,o);r=[...e]}),n)}function watchAtMost(e,t,n){const{count:o,...u}=n;const a=r(0);const l=watchWithFilter(e,((...e)=>{a.value+=1;a.value>=toValue(o)&&A((()=>l()));t(...e)}),u);return{count:a,stop:l}}function watchDebounced(e,t,n={}){const{debounce:r=0,maxWait:o,...u}=n;return watchWithFilter(e,t,{...u,eventFilter:debounceFilter(r,{maxWait:o})})}function watchDeep(e,t,n){return o(e,t,{...n,deep:true})}function watchIgnorable(e,t,n={}){const{eventFilter:u=bypassFilter,...a}=n;const l=createFilterWrapper(u,t);let c;let s;let i;if(a.flush==="sync"){const t=r(false);s=()=>{};c=e=>{t.value=true;e();t.value=false};i=o(e,((...e)=>{t.value||l(...e)}),a)}else{const t=[];const n=r(0);const u=r(0);s=()=>{n.value=u.value};t.push(o(e,(()=>{u.value++}),{...a,flush:"sync"}));c=e=>{const t=u.value;e();n.value+=u.value-t};t.push(o(e,((...e)=>{const t=n.value>0&&n.value===u.value;n.value=0;u.value=0;t||l(...e)}),a));i=()=>{t.forEach((e=>e()))}}return{stop:i,ignoreUpdates:c,ignorePrevAsyncUpdates:s}}function watchImmediate(e,t,n){return o(e,t,{...n,immediate:true})}function watchOnce(e,t,n){const r=o(e,((...e)=>{A((()=>r()));return t(...e)}),n);return r}function watchThrottled(e,t,n={}){const{throttle:r=0,trailing:o=true,leading:u=true,...a}=n;return watchWithFilter(e,t,{...a,eventFilter:throttleFilter(r,o,u)})}function watchTriggerable(e,t,n={}){let r;function onEffect(){if(!r)return;const e=r;r=void 0;e()}function onCleanup(e){r=e}const _cb=(e,n)=>{onEffect();return t(e,n,onCleanup)};const o=watchIgnorable(e,_cb,n);const{ignoreUpdates:u}=o;const trigger=()=>{let t;u((()=>{t=_cb(getWatchSources(e),getOldValue(e))}));return t};return{...o,trigger:trigger}}function getWatchSources(e){return S(e)?e:Array.isArray(e)?e.map((e=>toValue(e))):toValue(e)}function getOldValue(e){return Array.isArray(e)?e.map((()=>{})):void 0}function whenever(e,t,n){const r=o(e,((e,o,u)=>{if(e){(n==null?void 0:n.once)&&A((()=>r()));t(e,o,u)}}),{...n,once:false});return r}export{assert,refAutoReset as autoResetRef,bypassFilter,B as camelize,clamp,computedEager,computedWithControl,containsProp,computedWithControl as controlledComputed,L as controlledRef,createEventHook,createFilterWrapper,createGlobalState,createInjectionState,reactify as createReactiveFn,createSharedComposable,createSingletonPromise,debounceFilter,refDebounced as debouncedRef,watchDebounced as debouncedWatch,N as directiveHooks,computedEager as eagerComputed,extendRef,formatDate,get,getLifeCycleTarget,hasOwn,W as hyphenate,identity,watchIgnorable as ignorableWatch,increaseWithUnit,injectLocal,invoke,P as isClient,isDef,isDefined,E as isIOS,isObject,C as isWorker,makeDestructurable,noop,normalizeDate,notNullish,now,objectEntries,objectOmit,objectPick,pausableFilter,watchPausable as pausableWatch,promiseTimeout,provideLocal,rand,reactify,reactifyObject,reactiveComputed,reactiveOmit,reactivePick,refAutoReset,refDebounced,refDefault,refThrottled,refWithControl,k as resolveRef,j as resolveUnref,set,syncRef,syncRefs,throttleFilter,refThrottled as throttledRef,watchThrottled as throttledWatch,timestamp,toReactive,toRef,toRefs,toValue,tryOnBeforeMount,tryOnBeforeUnmount,tryOnMounted,tryOnScopeDispose,tryOnUnmounted,until,useArrayDifference,useArrayEvery,useArrayFilter,useArrayFind,useArrayFindIndex,useArrayFindLast,useArrayIncludes,useArrayJoin,useArrayMap,useArrayReduce,useArraySome,useArrayUnique,useCounter,useDateFormat,refDebounced as useDebounce,useDebounceFn,useInterval,useIntervalFn,useLastChanged,refThrottled as useThrottle,useThrottleFn,useTimeout,useTimeoutFn,useToNumber,useToString,useToggle,watchArray,watchAtMost,watchDebounced,watchDeep,watchIgnorable,watchImmediate,watchOnce,watchPausable,watchThrottled,watchTriggerable,watchWithFilter,whenever};

