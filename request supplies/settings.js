import { auth, db } from "./config.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const saveBtn =
  document.getElementById(
    "saveSettingsBtn"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

const changePasswordBtn =
  document.getElementById(
    "changePasswordBtn"
  );

function applyTheme(
  darkMode
) {

  if (darkMode) {

    document.body.classList.add(
      "dark-mode"
    );

  } else {

    document.body.classList.remove(
      "dark-mode"
    );

  }

}

onAuthStateChanged(
  auth,
  async (user) => {

    if (!user) {

      window.location.href =
        "login.html";

      return;

    }

    document.getElementById(
      "email"
    ).value = user.email;

    const settingsRef =
      doc(
        db,
        "settings",
        user.uid
      );

    const settingsSnap =
      await getDoc(
        settingsRef
      );

    if (
      settingsSnap.exists()
    ) {

      const data =
        settingsSnap.data();

      document.getElementById(
        "displayName"
      ).value =
        data.displayName || "";

      document.getElementById(
        "phone"
      ).value =
        data.phone || "";

      document.getElementById(
        "emailNotifications"
      ).checked =
        data.emailNotifications || false;

      document.getElementById(
        "inventoryAlerts"
      ).checked =
        data.inventoryAlerts || false;

      document.getElementById(
        "chatNotifications"
      ).checked =
        data.chatNotifications || false;

      document.getElementById(
        "darkMode"
      ).checked =
        data.darkMode || false;

      document.getElementById(
        "showOnlineStatus"
      ).checked =
        data.showOnlineStatus || false;

      document.getElementById(
        "language"
      ).value =
        data.language || "en";

      applyTheme(
        data.darkMode
      );

    }

  }
);

saveBtn?.addEventListener(
  "click",
  async () => {

    const user =
      auth.currentUser;

    if (!user) return;

    const darkMode =
  document.getElementById(
    "darkMode"
  ).checked;

localStorage.setItem(
  "theme",
  darkMode
    ? "dark"
    : "light"
);

try {

      await setDoc(
        doc(
          db,
          "settings",
          user.uid
        ),
        {
          displayName:
            document.getElementById(
              "displayName"
            ).value,

          phone:
            document.getElementById(
              "phone"
            ).value,

          emailNotifications:
            document.getElementById(
              "emailNotifications"
            ).checked,

          inventoryAlerts:
            document.getElementById(
              "inventoryAlerts"
            ).checked,

          chatNotifications:
            document.getElementById(
              "chatNotifications"
            ).checked,

          darkMode,

          showOnlineStatus:
            document.getElementById(
              "showOnlineStatus"
            ).checked,

          language:
            document.getElementById(
              "language"
            ).value
        },
        {
          merge: true
        }
      );

      applyTheme(
        darkMode
      );

      alert(
        "Settings Saved!"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.message
      );

    }

  }
);

logoutBtn?.addEventListener(
  "click",
  async () => {

    await signOut(auth);

    window.location.href =
      "login.html";

  }
);

changePasswordBtn?.addEventListener(
  "click",
  async () => {

    const user =
      auth.currentUser;

    if (!user) return;

    try {

      await sendPasswordResetEmail(
        auth,
        user.email
      );

      alert(
        "Password reset email sent."
      );

    } catch (error) {

      alert(
        error.message
      );

    }

  }
);