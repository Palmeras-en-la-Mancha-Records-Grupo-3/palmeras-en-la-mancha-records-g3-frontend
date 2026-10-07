// Cambia esta URL por la ruta de tu API.
const API_URL = "http://localhost:8000/api/branch";

let stores = [];

const storeList = document.querySelector("#store-list");
const nameFilter = document.querySelector("#name-filter");
const addressFilter = document.querySelector("#address-filter");
const phoneFilter = document.querySelector("#phone-filter");
const emptyMessage = document.querySelector("#empty-message");
const resultsCount = document.querySelector("#results-count");

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

[nameFilter, addressFilter, phoneFilter].forEach((input) => {
  input.addEventListener("input", renderStores);
});

loadStores();

async function loadStores() {
  storeList.innerHTML = '<p class="loading-message">Cargando tiendas…</p>';

  try {
    const response = await axios.get(API_URL);

    // Admite una respuesta en formato array o dentro de { stores: [...] }.
    stores = Array.isArray(response.data)
      ? response.data
      : response.data.stores;

    if (!Array.isArray(stores)) {
      throw new Error("La respuesta de la API no contiene una lista de tiendas.");
    }

    renderStores();
  } catch (error) {
    console.error("No se pudieron cargar las tiendas:", error);
    storeList.innerHTML =
      '<p class="error-message">No se pudieron cargar las tiendas. Inténtalo de nuevo.</p>';
    resultsCount.textContent = "No se pudieron cargar las tiendas";
  }
}

function renderStores() {
  const nameTerm = nameFilter.value.trim().toLocaleLowerCase("es");
  const addressTerm = addressFilter.value.trim().toLocaleLowerCase("es");
  const phoneTerm = phoneFilter.value.trim().toLocaleLowerCase("es");

  const filteredStores = stores.filter((store) =>
    String(store.name ?? "").toLocaleLowerCase("es").includes(nameTerm) &&
    String(store.address ?? "").toLocaleLowerCase("es").includes(addressTerm) &&
    String(store.phone ?? "").toLocaleLowerCase("es").includes(phoneTerm)
  );

  storeList.innerHTML = filteredStores.map((store) => `
    <article class="store-row">
      <span class="store-row__item">
        <span class="material-symbols-outlined" aria-hidden="true">tag</span>
        ${escapeHTML(store.id ?? "")}
      </span>
      <strong class="store-row__item">
        <span class="material-symbols-outlined" aria-hidden="true">storefront</span>
        ${escapeHTML(store.name ?? "")}
      </strong>
      <span class="store-row__item">
        <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
        ${escapeHTML(store.address ?? "")}
      </span>
      <span class="store-row__item">
        <span class="material-symbols-outlined" aria-hidden="true">call</span>
        ${escapeHTML(store.phone ?? "")}
      </span>
    </article>
  `).join("");

  emptyMessage.hidden = filteredStores.length > 0;
  resultsCount.textContent =
    `Mostrando ${filteredStores.length} de ${stores.length} tiendas`;
}

loadStores();