import { db } from "./config.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const scheduleList =
  document.getElementById("scheduleList");

async function loadShifts() {

  if (!scheduleList) return;

  scheduleList.innerHTML = "";

  try {

    const shiftsQuery =
      query(
        collection(db, "shifts"),
        orderBy("date")
      );

    const snapshot =
      await getDocs(shiftsQuery);

    if (snapshot.empty) {

      scheduleList.innerHTML = `
        <div class="card">
          <h3>No Shifts Found</h3>
          <p>Create a shift to get started.</p>
        </div>
      `;

      return;

    }

    snapshot.forEach((shiftDoc) => {

      const shift =
        shiftDoc.data();

      scheduleList.innerHTML += `
        <div class="card">

          <h3>
            ${shift.employee}
          </h3>

          <p>
            Date:
            ${shift.date}
          </p>

          <p>
            Start:
            ${shift.startTime}
          </p>

          <p>
            End:
            ${shift.endTime}
          </p>

        </div>
      `;

    });

  } catch (error) {

    console.error(error);

    scheduleList.innerHTML = `
      <div class="card">
        Error loading shifts.
      </div>
    `;

  }

}

loadShifts();