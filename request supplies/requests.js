import {
  db,
  storage
} from "./config.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";
const form = document.getElementById("requestForm");
const requestsList = document.getElementById("requestsList");

// CREATE REQUEST
if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const item =
      document.getElementById("item").value;

    const quantity =
      document.getElementById("quantity").value;

    const priority =
      document.getElementById("priority").value;

    const description =
      document.getElementById("description").value;

      const imageFile =
      document.getElementById("requestImage").files[0];
    
    let imageUrl = "";
    
    if (imageFile) {
    
      const storageRef =
        ref(
          storage,
          `requests/${Date.now()}-${imageFile.name}`
        );
    
      await uploadBytes(
        storageRef,
        imageFile
      );
    
      imageUrl =
        await getDownloadURL(
          storageRef
        );
    
    }
    
    try {

      await addDoc(
        collection(db, "requests"),
        {
          item,
          quantity: Number(quantity),
          priority,
          description,
          imageUrl,
          status: "Pending",
          createdAt: serverTimestamp()
        }
      );

      alert("Request submitted!");

      form.reset();

      loadRequests();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  });

}

// LOAD REQUESTS
async function loadRequests() {

  if (!requestsList) return;

  requestsList.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "requests"));

  querySnapshot.forEach((requestDoc) => {

    const request = requestDoc.data();

    requestsList.innerHTML += `
      <div class="card">

        ${
          request.imageUrl
            ? `
              <img
                src="${request.imageUrl}"
                alt="Request Image"
                style="
                  width:100%;
                  max-height:250px;
                  object-fit:cover;
                  border-radius:10px;
                  margin-bottom:10px;
                "
              >
            `
            : ""
        }

        <h3>${request.item}</h3>

        <p>Quantity: ${request.quantity}</p>

        <p>Priority: ${request.priority}</p>

        <p>Status: ${request.status}</p>

        <p>${request.description}</p>

      </div>
    `;

  });

}

loadRequests();