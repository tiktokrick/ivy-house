// Click-to-load Google map. Nothing is requested from Google until the visitor
// asks; without JS the link opens Google Maps instead.
(() => {
  document.querySelectorAll("[data-map]").forEach((map) => {
    const link = map.querySelector("[data-map-load]");
    if (!link) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(map.dataset.query)}&output=embed`;
      iframe.title = "Map showing Ivy House Dental Practice";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.className = "map-embed__frame";
      map.replaceChildren(iframe);
      const directions = document.createElement("a");
      directions.href = link.href;
      directions.textContent = "Open in Google Maps for directions";
      directions.dataset.event = "directions_click";
      map.after(directions);
    });
  });
})();
