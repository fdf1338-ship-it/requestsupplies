import { db } from "./config.js";

import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* =========================
   REQUESTS
========================= */

export async function approveRequest(id) {

  await updateDoc(
    doc(db, "requests", id),
    {
      status: "Approved"
    }
  );

  alert("Request approved.");

}

export async function rejectRequest(id) {

  await updateDoc(
    doc(db, "requests", id),
    {
      status: "Rejected"
    }
  );

  alert("Request rejected.");

}

export async function deleteRequest(id) {

  if (
    !confirm(
      "Delete request?"
    )
  ) return;

  await deleteDoc(
    doc(db, "requests", id)
  );

  alert("Request deleted.");

}

/* =========================
   INVENTORY
========================= */

export async function addStock(
  id,
  currentQty
) {

  const amount =
    prompt(
      "Stock to add:"
    );

  if (!amount) return;

  await updateDoc(
    doc(
      db,
      "inventory",
      id
    ),
    {
      itemQuantity:
        Number(currentQty) +
        Number(amount)
    }
  );

}

export async function editInventory(
  id,
  item
) {

  const itemName =
    prompt(
      "Item Name",
      item.itemName
    );

  const itemQuantity =
    prompt(
      "Quantity",
      item.itemQuantity
    );

  const minimumQuantity =
    prompt(
      "Minimum Quantity",
      item.minimumQuantity
    );

  await updateDoc(
    doc(
      db,
      "inventory",
      id
    ),
    {
      itemName,
      itemQuantity:
        Number(itemQuantity),
      minimumQuantity:
        Number(
          minimumQuantity
        )
    }
  );

}

export async function deleteInventory(
  id
) {

  if (
    !confirm(
      "Delete inventory item?"
    )
  ) return;

  await deleteDoc(
    doc(
      db,
      "inventory",
      id
    )
  );

}

/* =========================
   EMPLOYEES
========================= */

export async function addEmployee() {

  const employeeName =
    prompt(
      "Employee Name"
    );

  const employeeEmail =
    prompt(
      "Employee Email"
    );

  const employeeRole =
    prompt(
      "Employee Role"
    );

  if (
    !employeeName ||
    !employeeEmail
  ) return;

  await addDoc(
    collection(
      db,
      "employees"
    ),
    {
      employeeName,
      employeeEmail,
      employeeRole,
      createdAt:
        serverTimestamp()
    }
  );

}

export async function editEmployee(
  id,
  employee
) {

  const employeeName =
    prompt(
      "Employee Name",
      employee.employeeName
    );

  const employeeEmail =
    prompt(
      "Employee Email",
      employee.employeeEmail
    );

  const employeeRole =
    prompt(
      "Employee Role",
      employee.employeeRole
    );

  await updateDoc(
    doc(
      db,
      "employees",
      id
    ),
    {
      employeeName,
      employeeEmail,
      employeeRole
    }
  );

}

export async function deleteEmployee(
  id
) {

  if (
    !confirm(
      "Delete employee?"
    )
  ) return;

  await deleteDoc(
    doc(
      db,
      "employees",
      id
    )
  );

}

/* =========================
   GLOBALS
========================= */

window.approveRequest =
  approveRequest;

window.rejectRequest =
  rejectRequest;

window.deleteRequest =
  deleteRequest;

window.addStock =
  addStock;

window.editInventory =
  editInventory;

window.deleteInventory =
  deleteInventory;

window.addEmployee =
  addEmployee;

window.editEmployee =
  editEmployee;

window.deleteEmployee =
  deleteEmployee;