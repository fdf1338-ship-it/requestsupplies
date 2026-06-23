import { db, storage } from "./config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const form =
  document.getElementById("inventoryForm");

if (form) {

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const itemName =
        document.getElementById(
          "itemName"
        ).value;

      const itemQuantity =
        document.getElementById(
          "itemQuantity"
        ).value;

      const minimumQuantity =
        document.getElementById(
          "minimumQuantity"
        ).value;

      const imageFile =
        document.getElementById(
          "itemImage"
        ).files[0];

      let imageUrl = "";

      try {

        if (imageFile) {

          const imageRef =
            ref(
              storage,
              `inventory/${Date.now()}-${imageFile.name}`
            );

          await uploadBytes(
            imageRef,
            imageFile
          );

          imageUrl =
            await getDownloadURL(
              imageRef
            );

        }

        await addDoc(
          collection(
            db,
            "inventory"
          ),
          {
            itemName,
            itemQuantity:
              Number(itemQuantity),
            minimumQuantity:
              Number(minimumQuantity),
            imageUrl,
            createdAt:
              serverTimestamp()
          }
        );

        alert(
          "Inventory item added!"
        );

        form.reset();

      } catch (error) {

        console.error(error);

        alert(error.message);

      }

    }
  );

}