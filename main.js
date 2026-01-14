// main.js

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => {
      console.log('Service Worker Registered:', reg);
    })
    .catch(err => {
      console.log('Service Worker Registration Failed:', err);
    });
}

// Example: Request notification permission
if ('Notification' in window) {
  Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });
}