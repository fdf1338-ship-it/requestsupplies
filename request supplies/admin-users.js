import { db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* =========================
   LOAD USERS
========================= */

export async function loadUsers() {

  const snapshot =
    await getDocs(
      collection(db, "users")
    );

  return snapshot.docs.map(
    (docItem) => ({
      id: docItem.id,
      ...docItem.data()
    })
  );

}

/* =========================
   PROMOTE USER
========================= */

export async function promoteUser(uid) {

  try {

    await updateDoc(
      doc(db, "users", uid),
      {
        role: "Admin"
      }
    );

    alert(
      "User promoted to Admin."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

/* =========================
   DEMOTE USER
========================= */

export async function demoteUser(uid) {

  try {

    await updateDoc(
      doc(db, "users", uid),
      {
        role: "Worker"
      }
    );

    alert(
      "User demoted."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

/* =========================
   SUSPEND USER
========================= */

export async function suspendUser(uid) {

  try {

    await updateDoc(
      doc(db, "users", uid),
      {
        suspended: true
      }
    );

    alert(
      "User suspended."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

/* =========================
   UNSUSPEND USER
========================= */

export async function unsuspendUser(uid) {

  try {

    await updateDoc(
      doc(db, "users", uid),
      {
        suspended: false
      }
    );

    alert(
      "User unsuspended."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

/* =========================
   DELETE USER
========================= */

export async function deleteUser(uid) {

  const confirmDelete =
    confirm(
      "Delete this user record?"
    );

  if (!confirmDelete) return;

  try {

    await deleteDoc(
      doc(db, "users", uid)
    );

    alert(
      "User deleted."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.promoteUser =
  promoteUser;

window.demoteUser =
  demoteUser;

window.suspendUser =
  suspendUser;

window.unsuspendUser =
  unsuspendUser;

window.deleteUser =
  deleteUser;1