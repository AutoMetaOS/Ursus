const AMOS_root='https://cmos.nukes.in';var KEYS=constants={domain_name:'',account_id:'',zone_id:'',API:{urlmeta:'c3NtYW5hdkBpY2xvdWQuY29tOjBmM0NkbGhpbnlBVmNHNjRSRXh4'}};const headers={std:{'content-type':'application/json;charset=UTF-8','Access-Control-Allow-Origin':'*'},cors:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,POST,OPTIONS','Access-Control-Max-Age':'86400'}};var cfg=config={quick:{suggest:{type:'func',func:async e=>{const t=(await fetch('https://www.google.com/complete/search?cp=6&client=gws-wiz&xssi=t&q='+e).then((e=>e.text()))).split('\'')[1].replaceAll('<b>','').replaceAll('</b>','');return JSON.parse(t)[0].slice(0,2)},filter:e=>e.toString()},metadata:{type:'func',func:async e=>await fetch(`https://api.urlmeta.org/?url=${e}`,{headers:{Authorization:`Basic ${KEYS.API.urlmeta}`}}).then((e=>e.json())),filter:e=>e.get('url')}},cms:{css:{type:'redirect',url:e=>`${AMOS_root}/OUI/css/${e.get('name')}`}},social:{twitter:{type:'func',func:async e=>{const t=await fetch('https://kizie.co/api/requests/getTweet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:BigInt(e).toString()})}).then((e=>e.json())),{id_str:s,full_text:n,user:r}=t,{id_str:c,name:i,screen_name:o,profile_image_url_https:a}=r;return{id:s,text:n,by:{id:c,name:i,screen:o,dp:a}}},filter:e=>e.get('id')}}};async function handleRequest(e){const{pathname:t,searchParams:s}=new URL(e.url),n=t.split('/'),r=n[1],c=n.slice(2).join('/'),i=await((e,t,s)=>{const{type:n,func:r,filter:c,url:i}=cfg[e][t];return'func'===n?r(c(s)):'redirect'===n?{type:'special',url:i(s)}:void 0})(r,c,s);return'special'===i.type?Response.redirect(i.url,statusCode=307):new Response((e=>{const t=typeof e;return'string'===t?e:'object'===t?JSON.stringify(e):void 0})(i),{headers:headers.std})}addEventListener('fetch',(e=>e.respondWith(handleRequest(e.request))));
