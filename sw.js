/* NewCraft AI — self-retiring service worker.
   The catalog app no longer uses offline caching; this unregisters any
   previously-installed worker and clears its caches so every visit loads
   the latest page directly from the network. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(c => c.navigate(c.url));
    } catch (_) {}
  })());
});
