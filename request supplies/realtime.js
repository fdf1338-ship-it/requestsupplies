import { db } from "./config.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export function watchCollection(
  collectionName,
  callback
) {

  const q = query(
    collection(db, collectionName),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const data = [];

      snapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data()
        });

      });

      callback(data);

    },
    console.error
  );

}