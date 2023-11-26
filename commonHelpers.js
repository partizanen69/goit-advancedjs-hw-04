import{a as v,i as c}from"./assets/vendor-22b6a9f4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const g=40,E="40905594-bd576ff041a6f87471d33ae04",y=async(r,e)=>(await v.get("https://pixabay.com/api/",{params:{key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:g}})).data,u=r=>{r.classList.remove("hidden")},m=r=>{r.classList.add("hidden")};c.settings({timeout:5e3,position:"topRight"});const h=document.getElementById("search-form"),b=h.querySelector('input[name="searchQuery"]'),d=h.querySelector('button[type="submit"]'),p=document.querySelector(".gallery"),i=document.querySelector(".load-more"),w=document.querySelector(".load-more-end");d.addEventListener("click",q);i.addEventListener("click",x);let n=!1,a=1;async function q(r){if(r.preventDefault(),n)return;const e=b.value.trim();if(!e)return;let t;a=1,n=!0,d.disabled=!0,p.innerHTML="",m(i),m(w);try{console.log("Fetching images",e,a),t=await y(e,a)}catch(l){console.error("Request to pixabay failed with error",l),c.error({title:"Request to pixabay failed with error",message:l.message});return}finally{n=!1,d.disabled=!1}if(console.log("response from pixabay",t),!t.total){c.warning({message:"Sorry, there are no images matching your search query. Please try again."});return}c.success({message:`Hooray! We found ${t.total} images.`}),p.innerHTML=L(t.hits),t.totalHits>a*g&&u(i)}async function x(){if(n)return;m(i),d.disabled=!0;const r=b.value.trim();let e;try{console.log("Loading more images",r,a+1),n=!0,e=await y(r,a+1)}catch(t){console.error("Request to pixabay failed with error",t),c.error({title:"Request to pixabay failed with error",message:t.message}),u(i);return}finally{d.disabled=!1,n=!1}console.log("response from pixabay load more",e),a++,M(e.totalHits,a),e.hits&&p.insertAdjacentHTML("beforeend",L(e.hits))}const L=r=>{const e=[];for(const t of r)e.push(`
      <div class="photo-card">
        <img src="${t.previewURL}" alt="${t.tags}" loading="lazy" width="250" height="150" />
        <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${t.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${t.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${t.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${t.downloads}</span>
            </p>
        </div>
      </div>
  `);return e.join("")},M=(r,e)=>{r>e*g?u(i):u(w)};
//# sourceMappingURL=commonHelpers.js.map
