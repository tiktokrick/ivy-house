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

  document.addEventListener("submit", (e) => {
    if (e.target.matches("[data-callback-form]")) window.plausible("callback_submit");
  });
})();
