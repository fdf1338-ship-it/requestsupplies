import { db } from "./config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

async function loadStats() {

  const employeeCount =
    (await getDocs(collection(db, "employees"))).size;

  const inventoryCount =
    (await getDocs(collection(db, "inventory"))).size;

  const requestCount =
    (await getDocs(collection(db, "requests"))).size;

  const shiftCount =
    (await getDocs(collection(db, "shifts"))).size;

  document.getElementById("employeeCount").textContent =
    employeeCount;

  document.getElementById("inventoryCount").textContent =
    inventoryCount;

  document.getElementById("requestCount").textContent =
    requestCount;

  document.getElementById("shiftCount").textContent =
    shiftCount;
}

loadStats();