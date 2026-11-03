// Conversion events for Plausible (BRIEF §3). Elements opt in with data-event.
// Queues calls until the Plausible script loads; does nothing without it.
(() => {
  window.plausible =
    window.plausible ||
    function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-event]");
    if (el) window.plausible(el.dataset.event);
  });

  // Implant and family enquiries are tracked separately (BRIEF §3, §6).
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!form.matches("[data-callback-form]")) return;
    window.plausible("callback_submit");
    const data = new FormData(form);
    if (data.get("help-with") === "Dental implants") window.plausible("implant_callback_submit");
    const who = data.get("appointment-for");
    if (who && who !== "Me") window.plausible("family_callback_submit");
  });

  // Page-view events set by a page's front matter (e.g. fees_view_implants).
  const viewEvent = document.body.dataset.viewEvent;
  if (viewEvent) window.plausible(viewEvent);
})();
