// Mobile menu. Without JS the nav simply wraps below the logo.
(() => {
  const header = document.querySelector("[data-site-header]");
  const toggle = header?.querySelector("[data-nav-toggle]");
  if (!header || !toggle) return;

  header.classList.add("has-js");
  toggle.hidden = false;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    header.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// Dropdown groups: one open at a time; close on outside click or Escape.
(() => {
  const groups = [...document.querySelectorAll("[data-nav-group]")];
  if (!groups.length) return;
  groups.forEach((g) =>
    g.addEventListener("toggle", () => {
      if (g.open) groups.forEach((other) => other !== g && (other.open = false));
    }),
  );
  document.addEventListener("click", (e) => {
    groups.forEach((g) => g.open && !g.contains(e.target) && (g.open = false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = groups.find((g) => g.open);
    if (open) {
      open.open = false;
      open.querySelector("summary").focus();
    }
  });
})();
