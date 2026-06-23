import { db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const requestsList =
  document.getElementById(
    "requestsList"
  );

const requestSearch =
  document.getElementById(
    "requestSearch"
  );

let allRequests = [];

loadRequests();

/* =========================
   LOAD REQUESTS
========================= */

async function loadRequests() {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "requests"
        )
      );

    allRequests = [];

    snapshot.forEach(
      (requestDoc) => {

        allRequests.push({
          id: requestDoc.id,
          ...requestDoc.data()
        });

      }
    );

    renderRequests(
      allRequests
    );

  } catch (error) {

    console.error(error);

  }

}

/* =========================
   RENDER REQUESTS
========================= */

function renderRequests(
  requests
) {

  requestsList.innerHTML = "";

  if (!requests.length) {

    requestsList.innerHTML =
      `
      <div class="loading-card">
        No requests found.
      </div>
      `;

    return;

  }

  requests.forEach(
    (request) => {

      requestsList.innerHTML +=
        `
        <div class="request-card">

          <h3>
            ${request.item}
          </h3>

          <p>
            Quantity:
            ${request.quantity}
          </p>

          <p>
            Priority:
            ${request.priority}
          </p>

          <p>
            Status:
            ${request.status}
          </p>

          <p>
            ${request.description}
          </p>

          <div class="admin-actions">

            <button
              class="admin-btn btn-green"
              onclick="approveRequest('${request.id}')"
            >
              Approve
            </button>

            <button
              class="admin-btn btn-orange"
              onclick="rejectRequest('${request.id}')"
            >
              Reject
            </button>

            <button
              class="admin-btn btn-red"
              onclick="deleteRequest('${request.id}')"
            >
              Delete
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

if (requestSearch) {

  requestSearch.addEventListener(
    "input",
    () => {

      const term =
        requestSearch.value
          .toLowerCase();

      const filtered =
        allRequests.filter(
          (request) =>
            (
              request.item || ""
            )
              .toLowerCase()
              .includes(term)
        );

      renderRequests(
        filtered
      );

    }
  );

}

/* =========================
   ACTIONS
========================= */

window.approveRequest =
  async (id) => {

    await updateDoc(
      doc(
        db,
        "requests",
        id
      ),
      {
        status:
          "Approved"
      }
    );

    loadRequests();

  };

window.rejectRequest =
  async (id) => {

    await updateDoc(
      doc(
        db,
        "requests",
        id
      ),
      {
        status:
          "Rejected"
      }
    );

    loadRequests();

  };

window.deleteRequest =
  async (id) => {

    if (
      !confirm(
        "Delete request?"
      )
    ) return;

    await deleteDoc(
      doc(
        db,
        "requests",
        id
      )
    );

    loadRequests();

  };