(function(){"use strict";function N(l,s,i,c){function y(t){return new Promise(n=>i.exists(t,n))}function I(t){return new Promise((n,r)=>{const e=new Date;i.utimes(t,e,e,o=>o?r(o):n())})}function J(t){return new Promise((n,r)=>i.mkdir(t,{recursive:!0},e=>e&&e.code!=="EEXIST"?r(e):n(t)))}function M(t){return new Promise((n,r)=>i.rmdir(t,{recursive:!0},e=>e&&e.code!=="ENOENT"?r(e):n()))}function _(t){return new Promise((n,r)=>i.readFile(t,"utf8",(e,o)=>e?r(e):n(o)))}function F(t,n){return new Promise((r,e)=>i.writeFile(t,n,"utf8",o=>o?e(o):r()))}function T(t){const n=s.join(t,"languagepacks.json");try{return l(n)}catch(r){}}function V(t,n){try{for(;n;){if(t[n])return n;{const r=n.lastIndexOf("-");if(r>0)n=n.substring(0,r);else return}}}catch(r){console.error("Resolving language pack configuration failed.",r)}}function U(t,n,r,e){if(e==="pseudo")return Promise.resolve({locale:e,availableLanguages:{},pseudo:!0});if(process.env.VSCODE_DEV)return Promise.resolve({locale:e,availableLanguages:{}});if(e&&(e==="en"||e==="en-us"))return Promise.resolve({locale:e,availableLanguages:{}});const o=e;c.mark("code/willGenerateNls");const u=function(a){return c.mark("code/didGenerateNls"),Promise.resolve({locale:a,availableLanguages:{}})};try{if(!t)return u(o);const a=T(n);if(!a||(e=V(a,e),!e))return u(o);const f=a[e];let P;return!f||typeof f.hash!="string"||!f.translations||typeof(P=f.translations.vscode)!="string"?u(o):y(P).then(X=>{if(!X)return u(o);const O=f.hash+"."+e,d=s.join(n,"clp",O),g=s.join(d,t),S=s.join(d,"tcf.json"),x=s.join(d,"corrupted.info"),C={locale:o,availableLanguages:{"*":e},_languagePackId:O,_translationsConfigFile:S,_cacheRoot:d,_resolvedLanguagePackCoreLocation:g,_corruptedFile:x};return y(x).then($=>{let b;return $?b=M(d):b=Promise.resolve(void 0),b.then(()=>y(g).then(z=>z?(I(g).catch(()=>{}),c.mark("code/didGenerateNls"),C):J(g).then(()=>Promise.all([_(r),_(P)])).then(m=>{const p=JSON.parse(m[0]),A=JSON.parse(m[1]).contents,B=Object.keys(p.bundles),w=[];for(const E of B){const H=p.bundles[E],q=Object.create(null);for(const h of H){const G=p.keys[h],R=p.messages[h],D=A[h];let k;if(D){k=[];for(let v=0;v<G.length;v++){const j=G[v],K=typeof j=="string"?j:j.key;let L=D[K];L===void 0&&(L=R[v]),k.push(L)}}else k=R;q[h]=k}w.push(F(s.join(g,E.replace(/\//g,"!")+".nls.json"),JSON.stringify(q)))}return w.push(F(S,JSON.stringify(f.translations))),Promise.all(w)}).then(()=>(c.mark("code/didGenerateNls"),C)).catch(m=>(console.error("Generating translation files failed.",m),u(e)))))})})}catch(a){return console.error("Generating translation files failed.",a),u(e)}}return{getNLSConfiguration:U}}if(typeof define=="function")define(["require","path","fs","vs/base/common/performance"],function(l,s,i,c){return N(l.__$__nodeRequire,s,i,c)});else if(typeof module=="object"&&typeof module.exports=="object"){const l=require("path"),s=require("fs"),i=require("../common/performance");module.exports=N(require,l,s,i)}else throw new Error("Unknown context")})();

//# sourceMappingURL=languagePacks.js.map
