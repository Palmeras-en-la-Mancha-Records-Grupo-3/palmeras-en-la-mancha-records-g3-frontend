// Arranca la app cuando todos los componentes están cargados
document.addEventListener("components:loaded", () => {
  initHeader();
  initFooter();

  window.addEventListener("hashchange", router);
  router();
});


const ROUTES = {
  artistas: { view: "artists", scripts: ["artistsApi.js", "artists.js"], init: "initArtistsView" },
  genres: { view: "genres", scripts: ["genres.js"], init: "initGenresView" },
};

const DEFAULT_ROUTE = "catalogo";

// Lee el # de la URL y carga su vista
async function router() {
  const hash = location.hash.slice(1) || DEFAULT_ROUTE;
  updateNavLinks(hash);

  const route = ROUTES[hash];
  if (!route) {
    showPendingView();
    return;
  }

  try {
    await loadView(route);
  } catch (error) {
    console.error(error);
    showPendingView();
  }
}

// Marca como activo el enlace de la sección actual (header y barra inferior)
function updateNavLinks(hash) {
  const links = document.querySelectorAll(".nav-link");
  let section = "";

  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${hash}`;
    link.classList.toggle("active", isActive);
    if (isActive) section = link.dataset.section;
  });

  const subtitle = document.getElementById("current-section");
  if (subtitle && section) subtitle.textContent = section;
}

// Secciones que todavía no tienen vista
function showPendingView() {
  document.getElementById("app").innerHTML = `
    <div class="pending-view">
      <span class="material-symbols-outlined">construction</span>
      <p>Sección en construcción</p>
    </div>
  `;
}