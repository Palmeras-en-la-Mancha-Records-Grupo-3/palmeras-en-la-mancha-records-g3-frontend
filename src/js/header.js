// Componente header: menú lateral (hamburguesa) en móvil
function initHeader() {
  const toggle = document.querySelector(".nav-toggle");
  const backdrop = document.querySelector(".drawer-backdrop");

  toggle.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  backdrop.addEventListener("click", () => setMenu(false));
}

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  document.querySelector(".nav-toggle").setAttribute("aria-expanded", open);
}