const cacheKey = "myhome-v2";
const assets = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./C2DD4F6E-7577-4855-9927-11E6249175F6.jpeg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheKey).then(c => c.addAll(assets)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(list => Promise.all(
    list.filter(k => k !== cacheKey).map(k => caches.delete(k))
  )));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
