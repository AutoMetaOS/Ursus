!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).MegaCard=e()}(this,(function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function u(t){t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}function i(t){return document.createTextNode(t)}function f(){return i(" ")}function l(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let p;function g(t){p=t}const $=[],h=[],m=[],y=[],b=Promise.resolve();let _=!1;function x(t){m.push(t)}const v=new Set;let k=0;function N(){const t=p;do{for(;k<$.length;){const t=$[k];k++,g(t),w(t.$$)}for(g(null),$.length=0,k=0;h.length;)h.pop()();for(let t=0;t<m.length;t+=1){const e=m[t];v.has(e)||(v.add(e),e())}m.length=0}while($.length);for(;y.length;)y.pop()();_=!1,v.clear(),g(t)}function w(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(x)}}const C=new Set;function E(t,e){-1===t.$$.dirty[0]&&($.push(t),_||(_=!0,b.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function j(s,c,a,i,f,l,d,$=[-1]){const h=p;g(s);const m=s.$$={fragment:null,ctx:null,props:l,update:t,not_equal:f,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(h?h.$$.context:[])),callbacks:n(),dirty:$,skip_bound:!1,root:c.target||h.$$.root};d&&d(m.root);let y=!1;if(m.ctx=a?a(s,c.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return m.ctx&&f(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),y&&E(s,t)),e})):[],m.update(),y=!0,o(m.before_update),m.fragment=!!i&&i(m.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);m.fragment&&m.fragment.l(t),t.forEach(u)}else m.fragment&&m.fragment.c();c.intro&&((b=s.$$.fragment)&&b.i&&(C.delete(b),b.i(_))),function(t,n,s,c){const{fragment:u,on_mount:a,on_destroy:i,after_update:f}=t.$$;u&&u.m(n,s),c||x((()=>{const n=a.map(e).filter(r);i?i.push(...n):o(n),t.$$.on_mount=[]})),f.forEach(x)}(s,c.target,c.anchor,c.customElement),N()}var b,_;g(h)}function A(e){let n,o,r,s,p,g,$,h,m,y=e[0].Category+"",b=e[0].Name+"",_=e[0].Result+"";return{c(){n=a("div"),o=a("h3"),r=i(y),s=f(),p=a("div"),g=i(b),$=f(),h=a("div"),m=i(_),l(o,"class","fw4 p10 svelte-10igsgy"),l(p,"class","name p10 svelte-10igsgy"),l(h,"class","result "+e[1]()+" p10 svelte-10igsgy"),l(n,"class","card fade-left †l svelte-10igsgy")},m(t,e){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,e),c(n,o),c(o,r),c(n,s),c(n,p),c(p,g),c(n,$),c(n,h),c(h,m)},p(t,[e]){1&e&&y!==(y=t[0].Category+"")&&d(r,y),1&e&&b!==(b=t[0].Name+"")&&d(g,b),1&e&&_!==(_=t[0].Result+"")&&d(m,_)},i:t,o:t,d(t){t&&u(n)}}}function R(t,e,n){let{data:o={Category:"None",Name:"None",Result:"Fail"}}=e;return t.$$set=t=>{"data"in t&&n(0,o=t.data)},[o,()=>"Pass"===o.Result?"green":"red"]}return class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),j(this,t,R,A,s,{data:0})}}}));
