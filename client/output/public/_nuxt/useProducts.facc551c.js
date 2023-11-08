import{u as O}from"./useConfig.8e65169a.js";import{r as a,f as j,O as L,g as F,E as R}from"./entry.b2f549b0.js";function M(){const l=O(),h=a({}),f=a({id:0,name:"",price:"",stock:"",description:"",created_at:""}),s=j(),v=a([]),p=a({}),o=a(!1),c=L("$swal"),d=a(!0),k=a(!0),m=a(!1),A=a([s.value.searchPeriodeStartAt,s.value.searchPeriodeEndAt]),_=a(s.value.searchGlobal),$=a(s.value.orderColumn),x=a(s.value.orderDirection),S=a(s.value.searchPerPage),T=a(s.value.pageNumber),C=a({id:"",text:""}),y=F(),g=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0,minimumFractionDigits:0}).format(e),P=e=>new Intl.NumberFormat("id-ID",{maximumFractionDigits:0,minimumFractionDigits:0}).format(e),N={decimal:",",separator:".",prefix:"Rp. ",precision:2,masked:!1},E={decimal:",",separator:".",suffix:" pcs"},i=R(),b=()=>{i.value=localStorage.getItem("token")};return{products:h,product:f,getProducts:async(e=1,t="",n="",r="",u="",D="",w=5)=>{b(),$fetch(l.public.BASE_URL+"/api/products?page="+e+"&search_periode_start_at="+t+"&search_periode_end_at="+n+"&search_global="+r+"&order_column="+u+"&order_direction="+D+"&search_per_page="+w,{method:"GET",credentials:"include",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,"Content-Type":"application/json",Accept:"application/json"}}).then(B=>{h.value=B,d.value=!1}).catch(B=>{h.value=B.response._data,d.value=!1})},getProduct:async e=>{b(),await $fetch(l.public.BASE_URL+"/api/products/"+e,{method:"GET",credentials:"include",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,"Content-Type":"application/json",Accept:"application/json"}}).then(t=>{f.value=t.data,k.value=!1}).catch(t=>{f.value=t.response._data})},storeProduct:async e=>{o.value||(o.value=!0,p.value={},c({title:"Apa Anda yakin?",html:`<p class="text-left text-sm">
      Data yang dimasukan berikut sudah benar?<br><br>
      Nama: ${e.name}<br>
      Harga: ${g(e.price)}<br>
      Stok: ${P(e.stock)}<br>
      Deskripsi: ${e.description}<br>
      </p>`,icon:"warning",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Ya, saya yakin",confirmButtonColor:"#10b981",timer:2e4,timerProgressBar:!0,reverseButtons:!0}).then(t=>{if(t.isConfirmed){let n=JSON.stringify(e);$fetch(`${l.public.BASE_URL}/api/products`,{method:"POST",credentials:"omit",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,Accept:"application/json"},body:n}).then(r=>{d.value=!0,y.value.create=!1,s.value.successCreateProduct=!0,c({icon:"success",title:"Sukses &#9996",text:r.message})}).catch(r=>{var u;(u=r.response)!=null&&u._data&&(p.value=r.response._data.errors)}).finally(()=>o.value=!1)}else o.value=!1}))},updateProduct:async e=>{o.value||(o.value=!0,p.value={},c({title:"Apa Anda yakin?",html:`<p class="text-left text-sm">
      Data yang dimasukan berikut sudah benar?</p>
      <ul class="text-left text-sm list-disc mt-2">
      Nama: ${e.name}<br>
      Harga: ${g(e.price)}<br>
      Stok: ${P(e.stock)}<br>
      Deskripsi: ${e.description}<br>
      </ul>`,icon:"warning",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Ya, saya yakin",confirmButtonColor:"#10b981",timerProgressBar:!0,reverseButtons:!0}).then(t=>{if(t.isConfirmed){let n=JSON.stringify(e);$fetch(`${l.public.BASE_URL}/api/products/${e.id}`,{method:"PUT",credentials:"omit",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,Accept:"application/json"},body:n}).then(r=>{d.value=!0,s.value.successCreateProduct=!0,c({icon:"success",title:"Sukses &#9996",text:r.message})}).catch(r=>{var u;(u=r.response)!=null&&u._data&&(o.value=!1,p.value=r.response._data.errors)}).finally(()=>o.value=!1)}else o.value=!1}))},deleteProduct:async e=>{c({title:"Apa Anda yakin?",text:"Produk akan dihapus permanen.",icon:"warning",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Ya, hapus produk",confirmButtonColor:"#ef4444",timer:2e4,timerProgressBar:!0,reverseButtons:!0}).then(t=>{t.isConfirmed&&$fetch(`${l.public.BASE_URL}/api/products/${e}`,{method:"DELETE",credentials:"omit",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,Accept:"application/json"}}).then(n=>{d.value=!0,s.value.successCreateProduct=!0,y.value.show=!1,c({icon:"success",title:"Sukses &#9996",text:n.message})}).catch(n=>{c({icon:"error",title:"Terjadi Kesalahan",text:n.response._data.message})})})},validationErrors:p,isLoading:o,isLoadingProducts:d,isLoadingProduct:k,selectProducts:async(e="")=>{b(),m.value=!0,await $fetch(`${l.public.BASE_URL}/api/product/select?search_name=`+e,{method:"GET",credentials:"include",headers:{Authorization:`Bearer ${JSON.parse(i.value)}`,"Content-Type":"application/json",Accept:"application/json"}}).then(t=>{m.value=!1,v.value=t.results}).catch(t=>{m.value=!1,v.value=t.response._data.results})},productOptions:v,searchGlobal:_,searchPeriodeAt:A,orderColumn:$,orderDirection:x,searchPerPage:S,pageNumber:T,rupiah:g,fixedNumberFormat:P,rupiahNumberInputFormat:N,pcsNumberFormatIntegerInputFormat:E,optionSelectedProduct:C,isLoadingProductOptions:m}}export{M as u};