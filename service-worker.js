self.addEventListener('install', event => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated');
  return self.clients.claim();
});

self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'New Order!';
  const options = {
    body: data.message || 'You have a new order.',
    icon: 'icon-192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
