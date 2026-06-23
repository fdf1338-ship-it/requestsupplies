import { auth, db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const rolesList =
  document.getElementById("rolesList");

window.saveRole = saveRole;

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
          doc(db, "users", user.uid)
        );

      if (!userDoc.exists()) {

        alert("User record not found.");

        window.location.href =
          "dashboard.html";

        return;

      }

      const currentUser =
        userDoc.data();

      if (
        currentUser.role !== "Admin"
      ) {

        alert(
          "Access denied. Admins only."
        );

        window.location.href =
          "dashboard.html";

        return;

      }

      loadUsers();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }
);

async function saveRole(userId) {

  const select =
    document.getElementById(
      `role-${userId}`
    );

  const newRole =
    select.value;

  try {

    await updateDoc(
      doc(db, "users", userId),
      {
        role: newRole
      }
    );

    alert("Role Updated!");

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

async function loadUsers() {

  rolesList.innerHTML = "";

  const querySnapshot =
    await getDocs(
      collection(db, "users")
    );

  querySnapshot.forEach((userDoc) => {

    const user =
      userDoc.data();

    rolesList.innerHTML += `
      <div class="card">

        <h3>${user.fullName || "No Name"}</h3>

        <p>${user.email}</p>

        <select
          id="role-${userDoc.id}"
        >

          <option
            ${user.role === "Worker" ? "selected" : ""}
          >
            Worker
          </option>

          <option
            ${user.role === "Manager" ? "selected" : ""}
          >
            Manager
          </option>

          <option
            ${user.role === "Admin" ? "selected" : ""}
          >
            Admin
          </option>

        </select>

        <button
          onclick="saveRole('${userDoc.id}')"
        >
          Save Role
        </button>

      </div>
    `;
  });

}