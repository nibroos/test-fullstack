import{G as K,g as R,j as $,l as G,o as r,c as i,b as g,w as h,y as V,d as P,t as n,m as e,a as t,J as v,K as I,x as b,F as f,s as p,aa as N,n as C,L as J,v as O,z as Q,T as W,H as X,C as Y}from"./entry.1de9dfe4.js";import{u as Z}from"./useProducts.44416419.js";import{d as S,r as ee,m as te,u as oe,a as x}from"./validationRules.6a62d1e7.js";import"./useConfig.8dee7b20.js";const re={class:"rounded-xl"},ie=["onSubmit"],le={key:0,class:"px-6 py-4 flex flex-row md:flex-col justify-between"},se=Y('<div class="pr-3 w-full"><div><label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100"> Nama </label><div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-6/12"></div></div><div class="mt-3"><label class="block font-bold text-sm text-zinc-700 dark:text-zinc-50"> Harga </label><div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div></div><div class="mt-3"><label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100"> Stok </label><div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-3/12"></div></div><div class="mt-3"><label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100"> Deskripsi </label><div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-3/12"></div></div></div>',1),de=[se],ne={key:1,class:"px-6 py-4 flex flex-row md:flex-col justify-between"},ae={class:"pr-3 w-full flex flex-col gap-3"},ce=t("label",{class:"block font-bold text-sm text-zinc-700 dark:text-zinc-100"}," Nama ",-1),ue={class:"relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500"},me={class:"text-rose-500 text-xs mt-1 flex flex-col ml-4"},be={class:"list-disc list-outside"},fe={key:0},pe=t("label",{class:"block font-bold text-sm text-zinc-700 dark:text-zinc-100"}," Harga ",-1),xe={class:"relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500"},ke={class:"text-rose-500 text-xs mt-1 flex flex-col ml-4"},ge={class:"list-disc list-outside"},he={key:0},ve=t("label",{class:"block font-bold text-sm text-zinc-700 dark:text-zinc-100"}," Stok ",-1),_e={class:"relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500"},ze={class:"text-rose-500 text-xs mt-1 flex flex-col ml-4"},ye={class:"list-disc list-outside"},we={key:0},Ve=t("label",{class:"block font-bold text-sm text-zinc-700 dark:text-zinc-100"}," Deskripsi ",-1),Pe={class:"relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500"},Ie={class:"text-rose-500 text-xs mt-1 flex flex-col ml-4"},Ne={class:"list-disc list-outside"},Ce={key:0},Se={class:"bg-zinc-100 dark:bg-zinc-950 px-6 py-4 rounded-b-xl flex flex-row justify-end"},Me={class:"flex flex-row justify-end"},je=t("span",{class:"font-bold"},"Tutup",-1),qe=[je],Fe=["disabled"],He={class:"inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-emerald-600 rounded-full"},Le={key:0},Te={key:1,class:"font-bold"},Ke={__name:"ButtonModalEditProductComponent",props:{uuid:"",productInfo:{name:"",price:"",stock:"",description:""},isLoadingProduct:!0},emits:"updateCurrentSearchProduct",setup(M,{emit:Be}){const _=Q(),d=M;S("required",ee),S("min",te);const j={name:"required",price:"required|min:0",stock:"required|min:0"},{validate:q,errors:a}=oe({validationSchema:j}),{value:F}=x("name",null,{initialValue:d.productInfo.name,label:"Nama"}),{value:c}=x("price",null,{initialValue:d.productInfo.price,label:"Email"}),{value:H}=x("description",null,{initialValue:d.productInfo.description,label:"No HP"}),{value:u}=x("stock",null,{initialValue:d.productInfo.stock,label:"NIK"});let L=d.productInfo.id;const{updateProduct:T,validationErrors:m,isLoading:k,rupiahNumberInputFormat:B,pcsNumberFormatIntegerInputFormat:A}=Z(),l=K({id:L,name:F,price:c,description:H,stock:u});function D(){q().then(z=>{z.valid&&T(l)})}const E=R();return $(()=>{l.id||(l.id=d.productInfo.id,l.name=d.productInfo.name,l.price=d.productInfo.price,l.description=d.productInfo.description,l.stock=d.productInfo.stock)}),(z,s)=>{const y=W,U=X,w=G("vue-number");return r(),i("div",re,[g(U,null,{default:h(()=>[d.isLoadingProduct?(r(),V(y,{key:0},{default:h(()=>[P(n(e(_).public.APP_NAME),1)]),_:1})):(r(),V(y,{key:1},{default:h(()=>[P("Edit "+n(e(l).name)+" • Products • "+n(e(_).public.APP_NAME),1)]),_:1}))]),_:1}),t("form",{onSubmit:O(D,["prevent"])},[d.isLoadingProduct?(r(),i("div",le,de)):(r(),i("div",ne,[t("div",ae,[t("div",null,[ce,t("div",ue,[v(t("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=o=>e(l).name=o),class:"block mt-1 outline-none w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm",placeholder:"Meja",autocomplete:"on",required:"",autofocus:""},null,512),[[I,e(l).name]])]),t("div",me,[t("ul",be,[e(a).name?(r(),i("li",fe,n(e(a).name),1)):b("",!0),(r(!0),i(f,null,p(e(m).name,o=>(r(),i("li",{key:o},n(o),1))),128))])])]),t("div",null,[pe,t("div",xe,[g(w,N({modelValue:e(c),"onUpdate:modelValue":s[1]||(s[1]=o=>C(c)?c.value=o:null)},e(B),{onChange:s[2]||(s[2]=o=>e(l).price=e(c)),class:"block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm",placeholder:"100000",autocomplete:"on",required:""}),null,16,["modelValue"])]),t("div",ke,[t("ul",ge,[e(a).price?(r(),i("li",he,n(e(a).price),1)):b("",!0),(r(!0),i(f,null,p(e(m).price,o=>(r(),i("li",{key:o},n(o),1))),128))])])]),t("div",null,[ve,t("div",_e,[g(w,N({modelValue:e(u),"onUpdate:modelValue":s[3]||(s[3]=o=>C(u)?u.value=o:null)},e(A),{onChange:s[4]||(s[4]=o=>e(l).stock=e(u)),class:"block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm",placeholder:"4",autocomplete:"on",required:""}),null,16,["modelValue"])]),t("div",ze,[t("ul",ye,[e(a).stock?(r(),i("li",we,n(e(a).stock),1)):b("",!0),(r(!0),i(f,null,p(e(m).stock,o=>(r(),i("li",{key:o},n(o),1))),128))])])]),t("div",null,[Ve,t("div",Pe,[v(t("input",{type:"text","onUpdate:modelValue":s[5]||(s[5]=o=>e(l).description=o),class:"block mt-1 outline-none w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm",placeholder:"Kokoh",autocomplete:"on"},null,512),[[I,e(l).description]])]),t("div",Ie,[t("ul",Ne,[e(a).description?(r(),i("li",Ce,n(e(a).description),1)):b("",!0),(r(!0),i(f,null,p(e(m).description,o=>(r(),i("li",{key:o},n(o),1))),128))])])])])])),t("div",Se,[t("div",Me,[t("div",{onClick:s[6]||(s[6]=o=>e(E).show=!1),class:"font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white rounded-lg cursor-pointer mr-4"},qe),t("button",{disabled:e(k),class:"grow font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"},[v(t("div",He,null,512),[[J,e(k)]]),e(k)?(r(),i("span",Le,"Menyimpan...")):(r(),i("span",Te,"Simpan Perubahan"))],8,Fe)])])],40,ie)])}}};export{Ke as default};
