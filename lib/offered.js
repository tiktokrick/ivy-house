// Whether a service-dependent page or link should exist (BRIEF §4: only publish a
// page for a treatment Ivy House actually provides). `when` is a dotted path into
// site.json, e.g. "implants.services.fullArch".
//
// Only an explicit false hides it. "[TBC]" keeps it visible (highlighted in
// previews; a live build fails on any [TBC], so it can't go live undecided).
export function lookup(site, when) {
  return String(when)
    .split(".")
    .reduce((obj, key) => (obj == null ? undefined : obj[key]), site);
}

export function isOffered(site, when) {
  if (!when) return true;
  const value = lookup(site, when);
  return !(value === false || value === "false");
}
