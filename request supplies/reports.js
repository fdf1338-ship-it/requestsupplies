import { db } from "./config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

async function loadReports() {

  const employees =
    (await getDocs(collection(db, "employees"))).size;

  const inventory =
    (await getDocs(collection(db, "inventory"))).size;

  const requests =
    (await getDocs(collection(db, "requests"))).size;

  const shifts =
    (await getDocs(collection(db, "shifts"))).size;

  document.getElementById("reportEmployees").textContent =
    employees;

  document.getElementById("reportInventory").textContent =
    inventory;

  document.getElementById("reportRequests").textContent =
    requests;

  document.getElementById("reportShifts").textContent =
    shifts;

}

loadReports();