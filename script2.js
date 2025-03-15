let mobileNav = !1;
function onResize() {
  const e = document.querySelector("#details"),
    t = document.querySelector("#main-content"),
    i = e.classList.contains(HIDDEN_CLASS),
    n = document.querySelector(".runner-container");
  mobileNav !==
    window.matchMedia(
      "(min-width: 240px) and (max-width: 420px) and (min-height: 401px), (max-height: 560px) and (min-height: 240px) and (min-width: 421px)"
    ).matches &&
    ((mobileNav = !mobileNav)
      ? (t.classList.toggle(HIDDEN_CLASS, !i),
        e.classList.toggle(HIDDEN_CLASS, i),
        n && n.classList.toggle(HIDDEN_CLASS, !i))
      : i ||
        (t.classList.remove(HIDDEN_CLASS),
        e.classList.remove(HIDDEN_CLASS),
        n && n.classList.remove(HIDDEN_CLASS)));
}
function setupMobileNav() {
  window.addEventListener("resize", onResize), onResize();
}
document.addEventListener("DOMContentLoaded", setupMobileNav);
