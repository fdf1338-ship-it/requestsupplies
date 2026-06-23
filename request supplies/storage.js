import { storage } from "./config.js";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

export async function uploadImage(
  folder,
  file
) {

  const fileRef =
    ref(
      storage,
      `${folder}/${Date.now()}-${file.name}`
    );

  await uploadBytes(
    fileRef,
    file
  );

  return await getDownloadURL(
    fileRef
  );

}

export async function deleteImage(
  imagePath
) {

  const imageRef =
    ref(storage, imagePath);

  await deleteObject(
    imageRef
  );

}