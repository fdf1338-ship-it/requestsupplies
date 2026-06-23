document.addEventListener(
  "DOMContentLoaded",
  () => {

    // DARK MODE

    const theme =
      localStorage.getItem(
        "theme"
      );

    if (
      theme === "dark"
    ) {

      document.body.classList.add(
        "dark-mode"
      );

    }

    // SIDEBAR MENUS

    const menus =
      document.querySelectorAll(
        ".menu-title"
      );

    menus.forEach(
      (menu) => {

        menu.addEventListener(
          "click",
          () => {

            const items =
              menu.nextElementSibling;

            if (!items) return;

            if (
              items.style.display ===
              "block"
            ) {

              items.style.display =
                "none";

            } else {

              items.style.display =
                "block";

            }

          }
        );

      }
    );

  }
);