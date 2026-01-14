// service-worker.js

// Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installed');
  self.skipWaiting(); // नए SW को तुरंत activate करे
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated');
  return self.clients.claim(); // पुराने tabs पर भी apply करे
});

// Push event - notification handle करता है
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');

  let data = {};
  if (event.data) {
    data = event.data.json(); // server से json data आता है
  }

  const title = data.title || 'New Order!';
  const options = {
    body: data.message || 'You have a new order.',
    icon: '/icon-192.png', // app icon
    badge: '/icon-192.png', // small icon
    data: {
      url: data.url || '/' // notification click पर खुलने वाला page
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});