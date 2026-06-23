const savedTheme =
  localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

export function setTheme(theme) {

  if (theme === "dark") {

    document.body.classList.add(
      "dark-mode"
    );

  } else {

    document.body.classList.remove(
      "dark-mode"
    );

  }

  localStorage.setItem(
    "theme",
    theme
  );

}