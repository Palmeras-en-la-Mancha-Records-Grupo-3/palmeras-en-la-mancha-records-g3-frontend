// Arranca la app cuando todos los componentes están cargados
document.addEventListener("components:loaded", () => {
  initHeader();
  initFooter();
  initNavLinks();
});

// Sincroniza el enlace activo del header y de la barra inferior
function initNavLinks() {
  const links = document.querySelectorAll(".nav-link");
  const subtitle = document.getElementById("current-section");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const section = link.dataset.section;

      links.forEach((item) => {
        item.classList.toggle("active", item.dataset.section === section);
      });

      if (subtitle) {
        subtitle.textContent = section;
      }
    });
  });
}

// Carga los formatos cuando el DOM esté preparado
document.addEventListener("DOMContentLoaded", () => {
  const listaContenedor = document.getElementById("lista-formatos");

  if (listaContenedor) {
    obtenerFormatosBD(listaContenedor);
  }
});

async function obtenerFormatosBD(listaContenedor) {
  try {
    const respuesta = await axios.get("http://127.0.0.1:8000/format");
    const formatos = respuesta.data;

    if (!Array.isArray(formatos)) {
      throw new Error("La respuesta del backend no es una lista.");
    }

    listaContenedor.innerHTML = "";

    if (formatos.length === 0) {
      listaContenedor.innerHTML =
        '<li class="catalog-item">No hay formatos registrados.</li>';
      return;
    }

    formatos.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("catalog-item");

      const id = document.createElement("span");
      id.classList.add("format-id");
      id.textContent = `#${item.id}`;

      const nombre = document.createElement("h3");
      nombre.textContent = item.name ?? "";

      const descripcion = document.createElement("p");
      descripcion.textContent = item.description ?? "";

      li.append(id, nombre, descripcion);
      listaContenedor.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar formatos:", {
      mensaje: error.message,
      estado: error.response?.status,
      respuesta: error.response?.data,
      url: error.config?.url,
    });

    listaContenedor.innerHTML =
      '<li class="catalog-item">Error al cargar el inventario.</li>';
  }
}
