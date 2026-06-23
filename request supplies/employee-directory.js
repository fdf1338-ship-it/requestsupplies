import { db } from "./config.js";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const employeeList =
  document.getElementById("employeeList");

const searchInput =
  document.getElementById("searchInput");

let employees = [];

window.deleteEmployee =
  deleteEmployee;

window.editEmployee =
  editEmployee;

async function loadEmployees() {

  employeeList.innerHTML = "";

  const querySnapshot =
    await getDocs(
      collection(db, "employees")
    );

  employees = [];

  querySnapshot.forEach((employeeDoc) => {

    employees.push({
      id: employeeDoc.id,
      ...employeeDoc.data()
    });

  });

  renderEmployees(employees);

}

function renderEmployees(data) {

  employeeList.innerHTML = "";

  data.forEach((employee) => {

    employeeList.innerHTML += `
      <div class="card">

        <h3>${employee.employeeName}</h3>

        <p>${employee.employeeEmail}</p>

        <p>Role: ${employee.employeeRole}</p>

        <button
          onclick="editEmployee('${employee.id}')"
        >
          Edit Employee
        </button>

        <button
          onclick="deleteEmployee('${employee.id}')"
        >
          Delete Employee
        </button>

      </div>
    `;

  });

}

async function editEmployee(id) {

  const employee =
    employees.find(
      employee => employee.id === id
    );

  if (!employee) return;

  const newName =
    prompt(
      "Employee Name:",
      employee.employeeName
    );

  if (newName === null) return;

  const newEmail =
    prompt(
      "Employee Email:",
      employee.employeeEmail
    );

  if (newEmail === null) return;

  const newRole =
    prompt(
      "Employee Role (Worker, Manager, Admin):",
      employee.employeeRole
    );

  if (newRole === null) return;

  try {

    await updateDoc(
      doc(db, "employees", id),
      {
        employeeName: newName,
        employeeEmail: newEmail,
        employeeRole: newRole
      }
    );

    alert("Employee Updated!");

    loadEmployees();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

async function deleteEmployee(id) {

  const confirmed =
    confirm(
      "Delete this employee?"
    );

  if (!confirmed) return;

  await deleteDoc(
    doc(db, "employees", id)
  );

  loadEmployees();

}

searchInput.addEventListener(
  "input",
  () => {

    const search =
      searchInput.value
      .toLowerCase();

    const filtered =
      employees.filter(
        employee =>
          employee.employeeName
            .toLowerCase()
            .includes(search) ||

          employee.employeeEmail
            .toLowerCase()
            .includes(search)
      );

    renderEmployees(filtered);

  }
);

loadEmployees();