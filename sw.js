// แคชเฉพาะตัวเปลือกแอป (ไม่แคชข้อมูล/เว็บแอปหลัก → อัปเดต Apps Script แล้วเห็นของใหม่ทันที)
const C='autolog-shell-v1',F=['./index.html','./config.js','./manifest.webmanifest','./icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request,{ignoreSearch:true})));});
