// Service Worker: শুধু ফোনের নোটিফিকেশন দেখানো আর নোটিফিকেশনে চাপ দিলে অ্যাপ খোলার জন্য।
// কোনো ফাইল ক্যাশ করে না, তাই index.html আপডেট করলে সাথে সাথে নতুনটাই আসবে।
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var tab = e.notification.data && e.notification.data.tab;
  e.waitUntil((async function () {
    var all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (all.length) {
      var c = all[0];
      await c.focus();
      if (tab) c.postMessage({ tab: tab });
    } else {
      await self.clients.openWindow('./');
    }
  })());
});
