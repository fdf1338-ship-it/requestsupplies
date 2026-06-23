import { db } from "./config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form =
  document.getElementById("employeeForm");

if (form) {

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const employeeName =
        document.getElementById(
          "employeeName"
        ).value;

      const employeeEmail =
        document.getElementById(
          "employeeEmail"
        ).value;

      const employeeRole =
        document.getElementById(
          "employeeRole"
        ).value;

      try {

        await addDoc(
          collection(db, "employees"),
          {
            employeeName,
            employeeEmail,
            employeeRole,
            createdAt:
              serverTimestamp()
          }
        );

        await addDoc(
          collection(db, "notifications"),
          {
            title:
              "New Employee Added",
            message:
              `${employeeName} was added as ${employeeRole}`,
            createdAt:
              serverTimestamp()
          }
        );

        alert(
          "Employee Added!"
        );

        form.reset();

      } catch (error) {

        console.error(error);

        alert(error.message);

      }

    }
  );

}