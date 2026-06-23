import { db } from "./config.js";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* =========================
   ACTIVITY LOGS
========================= */

export async function createLog(
  action,
  adminEmail = "Admin"
) {

  try {

    await addDoc(
      collection(
        db,
        "logs"
      ),
      {
        action,
        adminEmail,
        createdAt:
          serverTimestamp()
      }
    );

  } catch (error) {

    console.error(error);

  }

}

/* =========================
   ANNOUNCEMENTS
========================= */

export async function sendAnnouncement() {

  const message =
    prompt(
      "Announcement"
    );

  if (!message) return;

  await addDoc(
    collection(
      db,
      "announcements"
    ),
    {
      message,
      createdAt:
        serverTimestamp()
    }
  );

  alert(
    "Announcement sent."
  );

}

/* =========================
   NOTIFICATIONS
========================= */

export async function sendNotification() {

  const title =
    prompt(
      "Notification Title"
    );

  const message =
    prompt(
      "Notification Message"
    );

  if (
    !title ||
    !message
  ) return;

  await addDoc(
    collection(
      db,
      "notifications"
    ),
    {
      title,
      message,
      createdAt:
        serverTimestamp()
    }
  );

  alert(
    "Notification created."
  );

}

/* =========================
   MAINTENANCE MODE
========================= */

export async function toggleMaintenanceMode(
  enabled
) {

  await setDoc(
    doc(
      db,
      "system",
      "settings"
    ),
    {
      maintenanceMode:
        enabled
    },
    {
      merge: true
    }
  );

  alert(
    enabled
      ? "Maintenance enabled."
      : "Maintenance disabled."
  );

}

/* =========================
   SAVE GLOBAL SETTINGS
========================= */

export async function saveSystemSettings(
  settings
) {

  await setDoc(
    doc(
      db,
      "system",
      "settings"
    ),
    settings,
    {
      merge: true
    }
  );

}

/* =========================
   SECURITY ACTIONS
========================= */

export async function forceLogout(
  uid
) {

  alert(
    "Requires Firebase Admin SDK."
  );

}

export async function forcePasswordReset(
  uid
) {

  alert(
    "Requires Firebase Admin SDK."
  );

}

/* =========================
   GLOBALS
========================= */

window.sendAnnouncement =
  sendAnnouncement;

window.sendNotification =
  sendNotification;

window.toggleMaintenanceMode =
  toggleMaintenanceMode;

window.saveSystemSettings =
  saveSystemSettings;

window.createLog =
  createLog;

window.forceLogout =
  forceLogout;

window.forcePasswordReset =
  forcePasswordReset;