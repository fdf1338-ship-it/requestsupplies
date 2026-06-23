import { db } from "./config.js";

import {
  collection,
  query,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const notificationsList =
  document.getElementById(
    "notificationsList"
  );

async function loadNotifications() {

  if (!notificationsList) return;

  notificationsList.innerHTML = "";

  try {

    const notificationsQuery =
      query(
        collection(
          db,
          "notifications"
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(
        notificationsQuery
      );

    if (snapshot.empty) {

      notificationsList.innerHTML = `
        <div class="card">
          <h3>No Notifications</h3>
          <p>
            Nothing has happened yet.
          </p>
        </div>
      `;

      return;

    }

    snapshot.forEach((doc) => {

      const notification =
        doc.data();

      notificationsList.innerHTML += `
        <div class="card">

          <h3>
            ${notification.title || "Notification"}
          </h3>

          <p>
            ${notification.message || ""}
          </p>

        </div>
      `;

    });

  } catch (error) {

    console.error(error);

    notificationsList.innerHTML = `
      <div class="card">
        Error loading notifications.
      </div>
    `;

  }

}

loadNotifications();