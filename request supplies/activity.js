import { db } from "./config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export async function logActivity(
  action,
  details
) {

  await addDoc(
    collection(
      db,
      "activity"
    ),
    {
      action,
      details,
      createdAt:
        serverTimestamp()
    }
  );

}