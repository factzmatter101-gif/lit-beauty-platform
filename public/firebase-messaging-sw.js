// ═══════════════════════════════════════════════════════════════════════════════
//  LTI VENTURES — Firebase Messaging Service Worker
//  Handles background push notifications
// ═══════════════════════════════════════════════════════════════════════════════

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyB2xJrTFgQwlL2CIhI8lvoI5j7nIx7u1_w",
  authDomain:        "lti-beauty.firebaseapp.com",
  projectId:         "lti-beauty",
  storageBucket:     "lti-beauty.firebasestorage.app",
  messagingSenderId: "302381933702",
  appId:             "1:302381933702:web:afd293d700d8904f8c9d07",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || "Love That Idea";
  const body  = payload.notification?.body  || "You have a new notification";
  const type  = payload.data?.type || "general";

  self.registration.showNotification(title, {
    body,
    icon:     "/icons/icon-192x192.png",
    badge:    "/icons/icon-96x96.png",
    tag:      type,
    renotify: true,
    data:     payload.data || {},
    actions:  type === "flash_fill"
      ? [{ action:"view", title:"Claim Slot" }, { action:"dismiss", title:"Dismiss" }]
      : [{ action:"view", title:"View" }],
  });
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  if (event.action === "dismiss") return;
  const url = event.notification.data?.url || "https://www.ltibeauty.com";
  event.waitUntil(
    clients.matchAll({ type:"window", includeUncontrolled:true }).then(function(list) {
      for (const client of list) {
        if (client.url.includes("ltibeauty.com") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
