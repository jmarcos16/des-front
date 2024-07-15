var M=Object.defineProperty;var L=(e,t,i)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var h=(e,t,i)=>L(e,typeof t!="symbol"?t+"":t,i);import{j as q,r as N,k as $,l as I,n as J,p as T,a as _,c as A}from"./index-B9bgAer8.js";/**
 * Vue Number Format 3.34.1
 * (c) 2021-2023 Dipak Sarkar <hello@dipaksarkar.in> (https://dipaksarkar.in/)
 * @license MIT
 */var F={prefix:"",suffix:"",separator:",",decimal:".",precision:2,minimumFractionDigits:null,prefill:!0,reverseFill:!1,min:null,max:null,nullValue:""};function H(e){return t=0,i=e,l=20,Math.max(t,Math.min(i,l));var t,i,l}class w{constructor(t){h(this,"options");h(this,"input");h(this,"number");h(this,"isClean");h(this,"preSurRegExp");h(this,"numberRegExp");h(this,"cleanRegExp");h(this,"negativeRegExp");this.options=Object.assign(R(F),t);const{prefix:i,suffix:l,decimal:a,reverseFill:u}=this.options;this.input="",this.number="",this.isClean=!u;const r=i.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),n=l.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&");this.preSurRegExp=new RegExp(`${r}|${n}`,"g"),this.numberRegExp=new RegExp(`[^0-9\\${a}]+`,"gi"),this.cleanRegExp=new RegExp("[^0-9]+","gi"),this.negativeRegExp=new RegExp("[^0-9\\-]+","gi")}isNull(){return!this.numberOnly(this.isClean?this.cleanRegExp:this.negativeRegExp)}clean(t=!1){return this.isClean=t,this}sign(){if(this.input===null||this.input===void 0)return"";const t=this.input.toString().indexOf("-")>=0;return this.isClean?t&&this.realNumber()>0?"-":"":t?"-":""}toFixed(){const t=Math.pow(10,this.options.precision);return(parseFloat(this.numberOnly(/\D+/g))/t||0).toFixed(H(this.options.precision))}toNumber(t){return Number(t)}numberOnly(t){var i;return(i=this.input)==null?void 0:i.toString().replace(this.preSurRegExp,"").replace(t||this.numberRegExp,"")}isNegative(){return this.sign()==="-"}numbers(){const{reverseFill:t,decimal:i}=this.options;return t?this.number=this.toFixed().replace(".",i):typeof this.input=="number"?this.number=this.parts(this.input.toString().replace("-",""),".").join(i):isNaN(this.toNumber(this.input))?this.number=this.parts(this.numberOnly()).join(i):this.number=this.parts(this.input.replace("-",""),".").join(i),this.number}unformatNumber(){return this.numbers().toString().replace(this.options.decimal,".")}realNumber(){return parseFloat(this.unformatNumber())}parts(t,i){const{precision:l,minimumFractionDigits:a,decimal:u}=this.options;let r=t.toString().split(i||u);if(r.length>1&&(r[0]=this.toNumber(r[0])||0,r[1]=r.slice(1,r.length).join(""),r=r.slice(0,2)),this.isClean){const n=this.toNumber(r.join(".")).toFixed(l),o=this.toNumber(n),s=o.toFixed(a);r=a>=0&&o.toString().length<s.length?s.toString().split("."):o.toString().split(".")}return r.slice(0,2)}addSeparator(){const{decimal:t,separator:i}=this.options,l=this.numbers().split(t);return l[0]=l[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm,`$1${i}`),l.join(t)}format(t){this.input=t;const{reverseFill:i,nullValue:l,prefix:a,suffix:u}=this.options;return this.isNull()&&!i?l:this.sign()+a+this.addSeparator()+u}unformat(t){this.input=t;const{reverseFill:i,nullValue:l}=this.options,a=this.realNumber(),u=this.unformatNumber();return this.isNull()||i&&a===0?l:this.sign()+u}}const y="-";function R(e){return JSON.parse(JSON.stringify(e))}function S(e){return new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:{facade:!0}})}function E(e){const t=e instanceof HTMLInputElement?e:e.querySelector("input");if(!t)throw new Error("number directive requires an input element");return t}function j(e,t){const i=()=>{e.setSelectionRange(t,t)};i(),setTimeout(i,1)}function x(e,t,{emit:i=!0,force:l=!1,clean:a=!1}={}){var m;const{options:u,oldValue:r}=e,{reverseFill:n,max:o,min:s}=u,p=((m=t==null?void 0:t.props)==null?void 0:m.value)||e.value;if(l||r!==p){const d=new w(u).clean(a&&!n);let f=d.format(p),v=d.clean(!n).unformat(p);return a&&(Number(o)===o&&Number(v)>o?(f=d.format(o),v=o.toString()):Number(s)===s&&Number(v)<s&&(f=d.format(s),v=s.toString())),e.oldValue=f,e.unmasked=v,e.value!==f&&(e.value=f),i&&e.dispatchEvent(S("input"))}}var P={beforeMount:(e,{value:t,modifiers:i},l)=>{var o;e=E(e);const a=Object.assign(R(F),t,i),{reverseFill:u,precision:r,decimal:n}=a;e.options=a,e.setAttribute("inputmode","numeric"),u&&e.value?(e.value=parseFloat(new w({...a,reverseFill:!1}).unformat(e.value)).toFixed(r),(o=l==null?void 0:l.props)!=null&&o.value&&(l.props.value=e.value)):e.value&&!isNaN(Number(e.value))&&(e.value=e.value.replace(".",n)),x(e,l,{force:a.prefill,clean:!0,emit:!1})},mounted:e=>{const t=(e=E(e)).parentElement||e,i=u=>{u.target===e&&function(r){const{target:n,detail:o}=r;if(o!=null&&o.facade)return!1;r.stopPropagation();let s=n.value.length;const{oldValue:p,options:m}=n;n.selectionEnd&&(s=n.value.length-n.selectionEnd),x(n,null,{clean:!m.precision,emit:!1}),m.suffix&&(s=Math.max(s,m.suffix.length)),s=n.value.length-s,m.prefix&&(s=Math.max(s,m.prefix.length)),j(n,s),p!==n.value&&n.dispatchEvent(S("input"))}(u)},l=u=>{u.target===e&&function(r){const{target:n}=r,{oldValue:o}=n;x(n,null,{force:!0,clean:!0,emit:!1}),o!==n.value&&n.dispatchEvent(S("input"))}(u)},a=u=>{u.target===e&&function(r,n){const{options:o}=n,{prefix:s,suffix:p,decimal:m,min:d,separator:f}=o,{key:v}=r,O=new RegExp(`${s}|${p}`,"g"),V=n.value.replace(O,""),B=d===void 0||Number(d)<0||Number(d)!==d;if(v===m)V.includes(m)?r.preventDefault():V||(n.value="0"+m,n.dispatchEvent(new Event("input")));else if(v!==y||B){if(v==="Backspace"){const b=n.selectionEnd||0,k=n.value.slice(b-1,b),C=n.value.slice(b-2,b);let g=n.value.length-b;[s,y,f].includes(k)&&(r.preventDefault(),n.value=k===f?n.value.replace(C,""):n.value.replace(new RegExp(`[${s}${y}]`,"g"),""),g=Math.max(g,p.length),g=n.value.length-g,g=Math.max(g,s.length),j(n,g),n.dispatchEvent(new Event("input")))}}else r.preventDefault()}(u,e)};t.addEventListener("input",i,!0),t.addEventListener("blur",l,!0),t.addEventListener("keydown",a,!0),e.cleanup=()=>{t.removeEventListener("input",i,!0),t.removeEventListener("blur",l,!0),t.removeEventListener("keydown",a,!0)}},updated:(e,{value:t,oldValue:i,modifiers:l},a)=>{if(e=E(e),t!==i){const u=e.options;e.options=Object.assign(u,t,l),x(e,a,{force:!0,clean:!1,emit:!1})}else x(e,a,{emit:!1})},unmounted:e=>{E(e).cleanup()}};const c=R(F);var D=q({name:"VueNumber",directives:{number:P},props:{modelValue:{type:[String,Number],required:!0},nullValue:{type:[Number,String],default:c.nullValue},masked:Boolean,readonly:Boolean,disabled:Boolean,reverseFill:{type:Boolean,default:c.reverseFill},prefill:{type:Boolean,default:c.prefill},precision:{type:Number,default:()=>c.precision},minimumFractionDigits:{type:Number,default:()=>c.minimumFractionDigits},decimal:{type:String,default:()=>c.decimal},min:{type:Number,default:()=>c.min},max:{type:Number,default:()=>c.max},separator:{type:String,default:()=>c.separator},prefix:{type:String,default:()=>c.prefix},suffix:{type:String,default:()=>c.suffix}},emits:["update:model-value","input:model-value"],setup(e,{emit:t}){const i=N(e.modelValue),l=N(!1),a=N(""),u=$(()=>({...e})),r=new w(u.value),n=$(()=>e.masked?r.format(i.value):a.value),o=()=>{t("update:model-value",n.value)};return I(()=>e.modelValue,s=>{const p=r.format(s);p!==i.value&&(i.value=p)}),{config:u,maskedValue:i,unmaskedValue:a,input:s=>{const{target:p}=s;i.value=p.value,a.value=p.unmasked,l.value=!0,t("input:model-value",n.value)},blur:()=>{l.value&&n.value!==e.modelValue&&o()},change:o}}});const z=["value","readonly","disabled"];D.render=function(e,t,i,l,a,u){const r=J("number");return T((_(),A("input",{type:"text",autocomplete:"off",value:e.maskedValue,readonly:e.readonly,disabled:e.disabled,class:"v-number vue-number-format",onChange:t[0]||(t[0]=(...n)=>e.change&&e.change(...n)),onInput:t[1]||(t[1]=(...n)=>e.input&&e.input(...n)),onBlur:t[2]||(t[2]=(...n)=>e.blur&&e.blur(...n))},null,40,z)),[[r,e.config]])},D.__file="src/component.vue";export{D as x};
