import { db } from "./config.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const logsList =
  document.getElementById(
    "logsList"
  );

const logsQuery =
  query(
    collection(
      db,
      "logs"
    ),
    orderBy(
      "createdAt",
      "desc"
    )
  );

onSnapshot(
  logsQuery,
  (snapshot) => {

    logsList.innerHTML = "";

    if (
      snapshot.empty
    ) {

      logsList.innerHTML =
        `
        <div class="loading-card">
          No activity logs found.
        </div>
        `;

      return;

    }

    snapshot.forEach(
      (logDoc) => {

        const log =
          logDoc.data();

        const date =
          log.createdAt
            ? log.createdAt
                .toDate()
                .toLocaleString()
            : "Unknown Date";

        logsList.innerHTML +=
          `
          <div class="log-card">

            <h3>
              ${
                log.action ||
                "Unknown Action"
              }
            </h3>

            <p>
              Admin:
              ${
                log.adminEmail ||
                "Unknown"
              }
            </p>

            <p>
              ${date}
            </p>

          </div>
          `;

      }
    );

  },
  (error) => {

    console.error(
      error
    );

    logsList.innerHTML =
      `
      <div class="loading-card">
        Error loading logs.
      </div>
      `;

  }
);