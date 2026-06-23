import { auth, db, storage } from "./config.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const profileForm =
  document.getElementById("profileForm");

const profileName =
  document.getElementById("profileName");

const profileEmail =
  document.getElementById("profileEmail");

const profileImage =
  document.getElementById("profileImage");

const fullNameInput =
  document.getElementById("fullName");

const companyInput =
  document.getElementById("company");

const departmentInput =
  document.getElementById("department");

const phoneInput =
  document.getElementById("phone");

const bioInput =
  document.getElementById("bio");

const profilePhoto =
  document.getElementById("profilePhoto");

onAuthStateChanged(
  auth,
  async (user) => {

    if (!user) {

      window.location.href =
        "login.html";

      return;

    }

    profileEmail.textContent =
      user.email;

    const profileRef =
      doc(
        db,
        "profiles",
        user.uid
      );

    const profileSnap =
      await getDoc(
        profileRef
      );

    if (
      profileSnap.exists()
    ) {

      const data =
        profileSnap.data();

      profileName.textContent =
        data.fullName || "User";

      fullNameInput.value =
        data.fullName || "";

      companyInput.value =
        data.company || "";

      if (departmentInput)
        departmentInput.value =
          data.department || "";

      phoneInput.value =
        data.phone || "";

      if (bioInput)
        bioInput.value =
          data.bio || "";

      if (
        profileImage &&
        data.photoURL
      ) {

        profileImage.src =
          data.photoURL;

      }

    }

  }
);

if (profileForm) {

  profileForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const user =
        auth.currentUser;

      if (!user) return;

      try {

        let photoURL = "";

        if (
          profilePhoto &&
          profilePhoto.files.length > 0
        ) {

          const file =
            profilePhoto.files[0];

          const imageRef =
            ref(
              storage,
              `profile-images/${user.uid}`
            );

          await uploadBytes(
            imageRef,
            file
          );

          photoURL =
            await getDownloadURL(
              imageRef
            );

        } else {

          const profileSnap =
            await getDoc(
              doc(
                db,
                "profiles",
                user.uid
              )
            );

          if (
            profileSnap.exists()
          ) {

            photoURL =
              profileSnap.data()
                .photoURL || "";

          }

        }

        await setDoc(
          doc(
            db,
            "profiles",
            user.uid
          ),
          {
            fullName:
              fullNameInput.value,

            company:
              companyInput.value,

            department:
              departmentInput
                ? departmentInput.value
                : "",

            phone:
              phoneInput.value,

            bio:
              bioInput
                ? bioInput.value
                : "",

            email:
              user.email,

            photoURL
          },
          {
            merge: true
          }
        );

        profileName.textContent =
          fullNameInput.value;

        if (
          profileImage &&
          photoURL
        ) {

          profileImage.src =
            photoURL;

        }

        alert(
          "Profile Saved!"
        );

      } catch (error) {

        console.error(error);

        alert(
          error.message
        );

      }

    }
  );

}