// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service Worker Registered:', reg);
    })
    .catch(err => {
      console.log('Service Worker Registration Failed:', err);
    });
}

// Request Notification Permission immediately
if ('Notification' in window) {
  Notification.requestPermission().then(status => {
    console.log('Notification permission status:', status);
  });
}

// Function to trigger test notification
function sendTestNotification() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Test Order!', {
        body: 'This is a test notification.',
        icon: 'icon-192.png'
      });
    });
  } else {
    alert('Notification test fallback');
  }
}

// Attach to button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('testNotif');
  if (btn) {
    btn.addEventListener('click', sendTestNotification);
  }
});
