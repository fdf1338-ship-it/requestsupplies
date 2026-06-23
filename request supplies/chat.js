import { auth, db } from "./config.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const chatMessages =
  document.getElementById(
    "chatMessages"
  );

const messageInput =
  document.getElementById(
    "messageInput"
  );

const sendMessageBtn =
  document.getElementById(
    "sendMessageBtn"
  );

let currentUser = null;

onAuthStateChanged(
  auth,
  (user) => {

    if (!user) {
      window.location.href =
        "login.html";
      return;
    }

    currentUser = user;

    loadMessages();

  }
);

async function sendMessage() {

  const message =
    messageInput.value.trim();

  if (!message) return;

  try {

    await addDoc(
      collection(
        db,
        "chat"
      ),
      {
        uid:
          currentUser.uid,
        email:
          currentUser.email,
        message,
        createdAt:
          serverTimestamp()
      }
    );

    messageInput.value = "";

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

if (sendMessageBtn) {

  sendMessageBtn.addEventListener(
    "click",
    sendMessage
  );

}

messageInput?.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  }
);

function loadMessages() {

  const q =
    query(
      collection(
        db,
        "chat"
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );

  onSnapshot(
    q,
    (snapshot) => {

      chatMessages.innerHTML = "";

      snapshot.forEach(
        (doc) => {

          const data =
            doc.data();

          chatMessages.innerHTML += `
            <div class="chat-message">
              <strong>
                ${data.email}
              </strong>
              <p>
                ${data.message}
              </p>
            </div>
          `;

        }
      );

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }
  );

}