import{a as _,B as k}from"./Button-T3Iyg7Gm.js";import{r as x,o as V,a as n,c,b as e,d as t,w as s,u as a,m as B,F as C,e as F,t as N,f,g as P}from"./index-B9bgAer8.js";import{_ as S}from"./Link-BRL_5qLa.js";import{c as T,d as i,F as u,E as m,b as $}from"./index.esm-Bbkdc5GM.js";import{x as q}from"./index-C18OWheQ.js";const E={class:"py-12"},O={class:"max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"},M={class:"p-8 bg-white shadow rounded-lg"},R={class:"space-y-4"},j=e("header",null,[e("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"}," Informações do produto "),e("p",{class:"mt-1 text-sm text-gray-600 dark:text-gray-400"}," Preencha os campos abaixo para adicionar um novo produto. ")],-1),A={class:"grid grid-cols-1 gap-6"},D=e("label",{for:"name",class:"block text-sm font-medium text-gray-700"},"Nome",-1),I=e("label",{for:"price",class:"block text-sm font-medium text-gray-700"},"Preço",-1),L=e("label",{for:"product_type_id",class:"block text-sm font-medium text-gray-700"},"Tipo",-1),U=e("option",{value:""},"Selecione um tipo",-1),z=["value"],G={class:"mt-8 f flex justify-between"},Y={__name:"Create",setup(H){const g=P(),p=x([]),l=x(0),y=async()=>{const r=await _.get("product-types/all");p.value=r.data},h=T({name:i().required("O nome é obrigatório"),price:i().required("O preço é obrigatório"),product_type_id:i().required("O tipo é obrigatório")}),b=async r=>{try{await _.post("products",r),g.push("/products")}catch(d){console.error(d)}},v={prefix:"R$ ",thousands:".",decimal:",",precision:2,masked:!0};return V(()=>{y()}),(r,d)=>(n(),c("div",E,[e("div",O,[e("div",M,[e("div",R,[j,t(a($),{onSubmit:b,"validation-schema":a(h)},{default:s(()=>[e("div",A,[e("div",null,[D,t(a(u),{name:"name",type:"name",class:"border border-gray-200 rounded-lg px-4 py-2 w-full"}),t(a(m),{name:"name",class:"text-red-500 text-sm"})]),e("div",null,[I,t(a(u),{name:"price",modelValue:l.value,"onUpdate:modelValue":d[0]||(d[0]=o=>l.value=o),type:"price"},{default:s(({handleChange:o,handleBlur:w})=>[t(a(q),B({class:"border border-gray-200 rounded-lg px-4 py-2 w-full",name:"price"},v,{modelValue:l.value,onChange:o,onBlur:w}),null,16,["modelValue","onChange","onBlur"])]),_:1},8,["modelValue"]),t(a(m),{name:"price",class:"text-red-500 text-sm"})]),e("div",null,[L,t(a(u),{name:"product_type_id",as:"select",class:"border border-gray-200 rounded-lg px-4 py-2 w-full"},{default:s(()=>[U,(n(!0),c(C,null,F(p.value,o=>(n(),c("option",{key:o.id,value:o.id},N(o.name),9,z))),128))]),_:1}),t(a(m),{name:"product_type_id",class:"text-red-500 text-sm"})])]),e("div",G,[t(S,{url:"/products"},{default:s(()=>[f("Cancelar")]),_:1}),t(k,{type:"submit"},{default:s(()=>[f("Adicionar produto")]),_:1})])]),_:1},8,["validation-schema"])])])])]))}};export{Y as default};