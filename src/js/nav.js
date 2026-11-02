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
