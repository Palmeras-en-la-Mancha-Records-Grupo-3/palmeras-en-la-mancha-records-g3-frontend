// Arranca la app cuando todos los componentes están cargados
document.addEventListener("components:loaded", () => {
  initHeader();
  initFooter();
  initNavLinks();
});


function initNavLinks() {
  const links = document.querySelectorAll(".nav-link");
  const subtitle = document.getElementById("current-section");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const section = link.dataset.section;
      links.forEach((l) => l.classList.toggle("active", l.dataset.section === section));
      subtitle.textContent = section;
      setMenu(false);
    });
  });
}