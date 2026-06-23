import { auth, db } from "./config.js";

import {
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

/* =========================
   AUTH CHECK
========================= */

onAuthStateChanged(
  auth,
  async (user) => {

    if (!user) {

      window.location.href =
        "login.html";

      return;

    }

    try {

      const userDoc =
        await getDoc(
          doc(
            db,
            "users",
            user.uid
          )
        );

      if (!userDoc.exists()) {

        alert(
          "User record not found."
        );

        return;

      }

      const userData =
        userDoc.data();

      if (
        userData.role !==
        "Admin"
      ) {

        alert(
          "Admins only."
        );

        window.location.href =
          "dashboard.html";

        return;

      }

      loadAdminStats();

    } catch (error) {

      console.error(error);

    }

  }
);

/* =========================
   STATS
========================= */

async function loadAdminStats() {

  try {

    const employees =
      (
        await getDocs(
          collection(
            db,
            "employees"
          )
        )
      ).size;

    const inventory =
      (
        await getDocs(
          collection(
            db,
            "inventory"
          )
        )
      ).size;

    const requests =
      (
        await getDocs(
          collection(
            db,
            "requests"
          )
        )
      ).size;

    const shifts =
      (
        await getDocs(
          collection(
            db,
            "shifts"
          )
        )
      ).size;

    document.getElementById(
      "adminEmployees"
    ).textContent =
      employees;

    document.getElementById(
      "adminInventory"
    ).textContent =
      inventory;

    document.getElementById(
      "adminRequests"
    ).textContent =
      requests;

    document.getElementById(
      "adminShifts"
    ).textContent =
      shifts;

  } catch (error) {

    console.error(error);

  }

}

/* =========================
   BUTTONS
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const buttons =
      document.querySelectorAll(
        ".admin-btn"
      );

    buttons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const action =
              button.textContent.trim();

            switch (action) {

              /* USERS */

              case "View Users":
              case "Promote Admin":
              case "Suspend User":
              case "Delete User":
              case "Reset Password":
              case "Manage Roles":

                window.location.href =
                  "user-management.html";

                break;

              /* EMPLOYEES */

              case "Add Employee":
              case "Edit Employee":
              case "Delete Employee":

                window.location.href =
                  "employees.html";

                break;

              /* INVENTORY */

              case "Add Item":
              case "Edit Item":
              case "Delete Item":
              case "Low Stock Report":
              case "Inventory Statistics":

                window.location.href =
                  "inventory.html";

                break;

              /* REQUESTS */

              case "Approve Request":
              case "Reject Request":
              case "Edit Request":
              case "Archive Request":

                window.location.href =
                  "request-management.html";

                break;

              case "Request Reports":

                window.location.href =
                  "reports.html";

                break;

              /* REPORTS */

              case "User Statistics":

                window.location.href =
                  "reports.html";

                break;

              /* COMMUNICATION */

              case "View Notifications":

                window.location.href =
                  "notifications.html";

                break;

              case "View Messages":

                window.location.href =
                  "chat.html";

                break;

              /* SECURITY */

              case "Login History":
              case "Force Password Reset":
              case "Force Logout User":
              case "View Audit Logs":

                window.location.href =
                  "activity-logs.html";

                break;

              /* SYSTEM */

              case "Maintenance Mode":
              case "System Backup":
              case "Restore Backup":

                alert(
                  action +
                  " executed."
                );

                break;

              /* BACKUP */

              case "Create Backup":
              case "Download Backup":

                alert(
                  action +
                  " started."
                );

                break;

              /* EMERGENCY */

              case "Lock System":
              case "Disable Chat":
              case "Emergency Alert":

                alert(
                  action +
                  " activated."
                );

                case "Send Notification":

    if (
      typeof sendNotification ===
      "function"
    ) {

      sendNotification();

    }

    break;

              case "Create Announcement":

                alert(
                  "Announcement created."
                );

                break;

              default:

                console.log(
                  "No action configured:",
                  action
                );

                break;

            }

          }
        );

      }
    );

  }
);