import { db } from "./config.js";

import {
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export async function deleteInventoryItem(id) {

  if (
    !confirm(
      "Delete this inventory item?"
    )
  ) return;

  try {

    await deleteDoc(
      doc(
        db,
        "inventory",
        id
      )
    );

    alert(
      "Item deleted."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

export async function editInventoryItem(
  id,
  item
) {

  const itemName =
    prompt(
      "Item Name",
      item.itemName
    );

  if (!itemName) return;

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

  try {

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

    alert(
      "Inventory updated."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}

export async function addStock(
  id,
  currentQty
) {

  const amount =
    prompt(
      "Add Stock"
    );

  if (!amount) return;

  try {

    await updateDoc(
      doc(
        db,
        "inventory",
        id
      ),
      {
        itemQuantity:
          currentQty +
          Number(amount)
      }
    );

  } catch (error) {

    console.error(error);

  }

}

window.deleteInventoryItem =
  deleteInventoryItem;

window.editInventoryItem =
  editInventoryItem;

window.addStock =
  addStock;