importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD_TytbX1kd4SKQ5uHZfd5XVGwdw0gzUOE",
  authDomain: "feeling-hungry-102a9.firebaseapp.com",
  databaseURL: "https://feeling-hungry-102a9-default-rtdb.firebaseio.com",
  projectId: "feeling-hungry-102a9",
  storageBucket: "feeling-hungry-102a9.firebasestorage.app",
  messagingSenderId: "736201265500",
  appId: "1:736201265500:web:7b7064b314247c02ad7199"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[FCM] Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});