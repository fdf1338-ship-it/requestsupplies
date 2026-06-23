import { auth, db } from "./config.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const employeeRef =
    doc(db, "employees", user.uid);

  const employeeSnap =
    await getDoc(employeeRef);

  if (!employeeSnap.exists()) {
    alert("Employee record not found.");
    return;
  }

  const employee =
    employeeSnap.data();

  const role =
    employee.employeeRole;

  const page =
    window.location.pathname
      .split("/")
      .pop();

  if (
    role === "Worker" &&
    [
      "admin.html",
      "roles.html",
      "reports.html",
      "settings.html",
      "manage-requests.html"
    ].includes(page)
  ) {

    alert("Access Denied");

    window.location.href =
      "dashboard.html";

  }

  if (
    role === "Manager" &&
    [
      "admin.html",
      "roles.html"
    ].includes(page)
  ) {

    alert("Access Denied");

    window.location.href =
      "dashboard.html";

  }

});