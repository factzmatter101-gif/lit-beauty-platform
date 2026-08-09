import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey:            "AIzaSyB2xJrTFgQwlL2CIhI8lvoI5j7nIx7u1_w",
  authDomain:        "lti-beauty.firebaseapp.com",
  projectId:         "lti-beauty",
  storageBucket:     "lti-beauty.firebasestorage.app",
  messagingSenderId: "302381933702",
  appId:             "1:302381933702:web:afd293d700d8904f8c9d07",
};

const VAPID_KEY = "BANA3FqgF9Q5ALdGJZC4Gv7tnTKiCsZayiQc0LHv-GW6qtFq5ReyaSMxEPzTCnGd3PF0qDGIZlxrj6H9HvSJGz4";

let app, messaging;
try {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
} catch(e) { console.warn("Firebase init:", e); }

export async function requestNotificationPermission() {
  try {
    if (!messaging || !("Notification" in window)) return null;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    return token || null;
  } catch(e) { return null; }
}

export function onForegroundMessage(callback) {
  if (!messaging) return () => {};
  return onMessage(messaging, callback);
}

export { messaging };
export default app;
