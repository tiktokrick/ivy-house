// Category filter for the smile gallery. All cases are in the HTML already.
(() => {
  const filter = document.querySelector("[data-gallery-filter]");
  const items = document.querySelectorAll("[data-gallery] [data-category]");
  if (!filter || !items.length) return;

  filter.hidden = false;
  filter.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    const value = btn.dataset.filter;
    filter.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    items.forEach((item) => {
      item.hidden = value !== "all" && item.dataset.category !== value;
    });
  });
})();
