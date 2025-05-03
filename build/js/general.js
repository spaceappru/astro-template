function m({ id: s, duration: c = 200 }) {
  const l = document.querySelectorAll(`#${s}`), e = document.querySelector(`[data-drawer="${s}"]`), n = e == null ? void 0 : e.querySelector("[data-back]");
  e instanceof HTMLElement && e.style.setProperty("--transition", `${c}ms ease-in-out`);
  let t = !1;
  o();
  function o() {
    l.forEach((i) => {
      i.setAttribute("data-open", `${t}`);
    });
  }
  function r() {
    e == null || e.setAttribute("data-open", "true"), document.getElementsByTagName("html")[0].style.overflow = "hidden", t = !0, o();
  }
  function a() {
    e == null || e.setAttribute("data-open", "idle"), setTimeout(() => {
      e == null || e.setAttribute("data-open", "false"), document.getElementsByTagName("html")[0].style.overflow = "auto", t = !1, o();
    }, c);
  }
  function d() {
    return t ? a() : r();
  }
  l.forEach((i) => {
    i.addEventListener("click", d);
  }), n == null || n.addEventListener("click", a);
}
function u() {
  document.documentElement.style.setProperty(
    "--real-page-width",
    `${document.documentElement.clientWidth}px`
  );
}
function f() {
  u(), window.addEventListener("resize", u);
}
f();
m({ id: "mobile-menu" });
