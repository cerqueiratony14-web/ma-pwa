// Mode hors ligne : l'application et ses bibliothèques restent disponibles sans réseau.
const CACHE = "studio-habitat-v33";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const LIBS = ["https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(CORE).then(() => Promise.all(LIBS.map(u => c.add(u).catch(() => null)))))
    .then(() => self.skipWaiting()));
});
const VOICES = "studio-habitat-voix-v1"; // voix du narrateur : gardées entre les mises à jour
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== VOICES).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // page : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request.url, { cache: "no-cache", credentials: "same-origin" }).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put("index.html", c)); return r; }).catch(() => caches.match("index.html")));
    return;
  }
  // voix du narrateur et musiques (gros fichiers) : téléchargées une fois, gardées à part
  if (url.origin === location.origin && (url.pathname.includes("/voices/") || url.pathname.includes("/music/"))) {
    e.respondWith(caches.open(VOICES).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok && r.status === 200) c.put(e.request, r.clone()); return r; }))));
    return;
  }
  // le reste (bibliothèques, polices, icônes) : cache d'abord
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && (url.origin === location.origin || /cdnjs|fonts\.(googleapis|gstatic)/.test(url.host))) { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); }
    return r;
  })));
});
