if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let f={};const n=e=>i(e,r),a={module:{uri:r},exports:f,require:n};s[r]=Promise.all(c.map((e=>a[e]||n(e)))).then((e=>(d(...e),f)))}}define(["./workbox-d7e7cdfe"],(function(e){"use strict";e.setCacheNameDetails({prefix:"1664631242767"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/ImgManage-479834e7.css",revision:"a7696fef6785d5bedde6aa71f38c7c52"},{url:"css/index-725de744.css",revision:"4d8ef0995d436c8e9bb2f6d9e3a748f7"},{url:"index.html",revision:"926d2fabe12366147a7e366d00a0fb07"},{url:"js/ImgManage-b46160c3.js",revision:"2ae22d82eba04efa445bed9502c8537c"},{url:"js/ImgManage-legacy-dca7ed04.js",revision:"77b8497840b72db71c4e5d4f1fd7ab00"},{url:"js/index-b66dd72f.js",revision:"94df13c74c07a2d6540a8469d31f7d7b"},{url:"js/index-legacy-13fa8255.js",revision:"0f8594595cfeccc3feacb3dc0843cf2a"},{url:"js/polyfills-legacy-cf8c27f6.js",revision:"588ee6378a23aa318856f6f966760385"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches()}));
