console.log("AUTH LOADED");

import { auth, db } from "./config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// SIGN UP
const signupForm = document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const fullName =
        document.getElementById("name").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const password =
        document.getElementById("password").value;

      try {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user =
          userCredential.user;

        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            fullName,
            email,
            role: "Worker",
            createdAt: serverTimestamp()
          }
        );

        console.log(
          "User Created:",
          user
        );

        alert("Account created!");

        window.location.href =
          "dashboard.html";

      } catch (error) {

        console.error(error);

        alert(error.message);

      }

    }
  );

}

// LOGIN
const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById("email").value.trim();

      const password =
        document.getElementById("password").value;

      try {

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        console.log(
          "Logged In:",
          userCredential.user
        );

        alert("Login successful!");

        window.location.href =
          "dashboard.html";

      } catch (error) {

        console.error(error);

        alert(error.message);

      }

    }
  );

}

// LOGOUT
async function logout() {

  try {

    await signOut(auth);

    alert("Logged out");

    window.location.href =
      "login.html";

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

window.logout = logout;