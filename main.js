// Import Firebase functions (if using module bundler)
// If plain script in HTML, Firebase SDK scripts are already included

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_TytbX1kd4SKQ5uHZfd5XVGwdw0gzUOE",
  authDomain: "feeling-hungry-102a9.firebaseapp.com",
  databaseURL: "https://feeling-hungry-102a9-default-rtdb.firebaseio.com",
  projectId: "feeling-hungry-102a9",
  storageBucket: "feeling-hungry-102a9.firebasestorage.app",
  messagingSenderId: "736201265500",
  appId: "1:736201265500:web:7b7064b314247c02ad7199"
};

firebase.initializeApp(firebaseConfig);

// Initialize messaging
const messaging = firebase.messaging();

// Request Notification Permission
Notification.requestPermission().then(permission => {
  console.log("Notification permission status:", permission);

  if(permission === "granted"){
    // Get device token
    messaging.getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
      .then((currentToken) => {
        if(currentToken){
          console.log("Device token:", currentToken);
          // Save this token in your Admin database to send real notifications
        } else {
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token:", err);
      });
  }
});

// Register Service Worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
    })
    .catch(err => {
      console.log('Service Worker registration failed:', err);
    });
}

// Test Notification Button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('testNotif');
  if(btn){
    btn.addEventListener('click', () => {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Test Order!', {
          body: 'This is a test notification.',
          icon: '/icon-192.png'
        });
      });
    });
  }
});
