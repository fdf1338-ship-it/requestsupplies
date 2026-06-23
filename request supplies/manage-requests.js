import { db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const requestsList =
  document.getElementById("requestsList");

async function updateStatus(id, status) {

  try {

    await updateDoc(
      doc(db, "requests", id),
      {
        status: status
      }
    );

    loadRequests();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

window.updateStatus = updateStatus;

async function loadRequests() {

  requestsList.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "requests"));

  querySnapshot.forEach((requestDoc) => {

    const request = requestDoc.data();

    requestsList.innerHTML += `
      <div class="card">

        <h3>${request.item}</h3>

        <p>Quantity: ${request.quantity}</p>

        <p>Priority: ${request.priority}</p>

        <p>Status: ${request.status}</p>

        <p>${request.description}</p>

        <button
          onclick="updateStatus('${requestDoc.id}','Approved')">
          Approve
        </button>

        <button
          onclick="updateStatus('${requestDoc.id}','Denied')">
          Deny
        </button>

      </div>
    `;

  });

}

loadRequests();