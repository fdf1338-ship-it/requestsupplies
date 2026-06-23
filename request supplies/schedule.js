import { db } from "./config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("scheduleForm");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const employee =
      document.getElementById("employee").value;

    const date =
      document.getElementById("date").value;

    const startTime =
      document.getElementById("startTime").value;

    const endTime =
      document.getElementById("endTime").value;

    try {

      await addDoc(
        collection(db, "shifts"),
        {
          employee,
          date,
          startTime,
          endTime,
          status: "Scheduled",
          createdAt: serverTimestamp()
        }
      );

      alert("Shift Created!");

      form.reset();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  });

}