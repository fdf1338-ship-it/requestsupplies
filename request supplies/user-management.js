import { auth, db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const usersList =
  document.getElementById(
    "usersList"
  );

const searchInput =
  document.getElementById(
    "userSearch"
  );

let allUsers = [];

/* =========================
   AUTH
========================= */

onAuthStateChanged(
  auth,
  async (user) => {

    if (!user) {

      window.location.href =
        "login.html";

      return;

    }

    loadUsers();

  }
);

/* =========================
   LOAD USERS
========================= */

async function loadUsers() {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "users"
        )
      );

    allUsers = [];

    snapshot.forEach(
      (userDoc) => {

        allUsers.push({
          id: userDoc.id,
          ...userDoc.data()
        });

      }
    );

    renderUsers(
      allUsers
    );

  } catch (error) {

    console.error(error);

    alert(
      error.message
    );

  }

}

/* =========================
   RENDER USERS
========================= */

function renderUsers(
  users
) {

  usersList.innerHTML = "";

  if (!users.length) {

    usersList.innerHTML =
      `
      <div class="loading-card">
        No users found.
      </div>
      `;

    return;

  }

  users.forEach(
    (user) => {

      usersList.innerHTML +=
        `
        <div class="user-card">

          <h3>
            ${
              user.fullName ||
              "Unknown User"
            }
          </h3>

          <p>
            ${
              user.email ||
              "No Email"
            }
          </p>

          <p>
            Role:
            ${
              user.role ||
              "Worker"
            }
          </p>

          <div class="admin-actions">

            <button
              class="admin-btn btn-green"
              onclick="promoteUser('${user.id}')"
            >
              Promote Admin
            </button>

            <button
              class="admin-btn btn-orange"
              onclick="suspendUser('${user.id}')"
            >
              Suspend User
            </button>

            <button
              class="admin-btn btn-red"
              onclick="deleteUserAccount('${user.id}')"
            >
              Delete User
            </button>

            <button
              class="admin-btn btn-purple"
              onclick="resetPassword('${user.email}')"
            >
              Reset Password
            </button>

          </div>

        </div>
        `;

    }
  );

}

/* =========================
   SEARCH
========================= */

if (
  searchInput
) {

  searchInput.addEventListener(
    "input",
    () => {

      const term =
        searchInput.value
          .toLowerCase();

      const filtered =
        allUsers.filter(
          (user) =>
            (
              user.fullName ||
              ""
            )
              .toLowerCase()
              .includes(term) ||

            (
              user.email ||
              ""
            )
              .toLowerCase()
              .includes(term)
        );

      renderUsers(
        filtered
      );

    }
  );

}

/* =========================
   ACTIONS
========================= */

window.promoteUser =
  async (id) => {

    try {

      await updateDoc(
        doc(
          db,
          "users",
          id
        ),
        {
          role:
            "Admin"
        }
      );

      alert(
        "User promoted."
      );

      loadUsers();

    } catch (error) {

      console.error(
        error
      );

    }

  };

window.suspendUser =
  async (id) => {

    try {

      await updateDoc(
        doc(
          db,
          "users",
          id
        ),
        {
          suspended:
            true
        }
      );

      alert(
        "User suspended."
      );

      loadUsers();

    } catch (error) {

      console.error(
        error
      );

    }

  };

window.deleteUserAccount =
  async (id) => {

    if (
      !confirm(
        "Delete user?"
      )
    ) return;

    try {

      await deleteDoc(
        doc(
          db,
          "users",
          id
        )
      );

      alert(
        "User deleted."
      );

      loadUsers();

    } catch (error) {

      console.error(
        error
      );

    }

  };

window.resetPassword =
  async (email) => {

    alert(
      "Password reset for: " +
      email
    );

  };