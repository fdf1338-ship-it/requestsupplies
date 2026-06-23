import { db } from "./config.js";

import {
  deleteInventoryItem,
  editInventoryItem,
  addStock
} from "./actions.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const inventoryList =
  document.getElementById(
    "inventoryList"
  );

if (inventoryList) {

  const q =
    query(
      collection(
        db,
        "inventory"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

  onSnapshot(
    q,
    (snapshot) => {

      inventoryList.innerHTML = "";

      if (snapshot.empty) {

        inventoryList.innerHTML = `
          <div class="inventory-empty">
            <h2>No Inventory Found</h2>
            <p>Add your first inventory item.</p>
          </div>
        `;

        return;

      }

      snapshot.forEach(
        (itemDoc) => {

          const item =
            itemDoc.data();

          const lowStock =
            item.itemQuantity <=
            item.minimumQuantity;

          const card =
            document.createElement(
              "div"
            );

          card.className =
            "inventory-card";

          card.innerHTML = `

            ${
              item.imageUrl
                ? `
                  <img
                    src="${item.imageUrl}"
                    class="inventory-image"
                  >
                `
                : ""
            }

            <div class="inventory-content">

              <h3>
                ${item.itemName}
              </h3>

              <p>
                Quantity:
                ${item.itemQuantity}
              </p>

              <p>
                Minimum:
                ${item.minimumQuantity}
              </p>

              ${
                lowStock
                  ? `
                    <div class="low-stock-alert">
                      Low Stock
                    </div>
                  `
                  : `
                    <div class="stock-badge stock-good">
                      In Stock
                    </div>
                  `
              }

              <div class="inventory-actions">

                <button
                  class="edit-btn"
                >
                  ✏️ Edit
                </button>

                <button
                  class="stock-btn"
                >
                  ➕ Stock
                </button>

                <button
                  class="delete-btn"
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          `;

          card
            .querySelector(
              ".edit-btn"
            )
            .addEventListener(
              "click",
              () =>
                editInventoryItem(
                  itemDoc.id,
                  item
                )
            );

          card
            .querySelector(
              ".stock-btn"
            )
            .addEventListener(
              "click",
              () =>
                addStock(
                  itemDoc.id,
                  item.itemQuantity
                )
            );

          card
            .querySelector(
              ".delete-btn"
            )
            .addEventListener(
              "click",
              () =>
                deleteInventoryItem(
                  itemDoc.id
                )
            );

          inventoryList.appendChild(
            card
          );

        }
      );

    }
  );

}