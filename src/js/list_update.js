// Función para traer los datos de la API y llenar el elemento select
async function loadDropdownData(url, selectElement) {
  try {
    // 1. Traer los datos desde la API usando Axios
    const response = await axios.get(url);
    const usersList = response.data; // Se espera un Array de objetos

    // 3. Recorrer la lista y extraer los 2 valores requeridos
    usersList.forEach((user) => {
      // Crear un nuevo elemento <option>
      const option = document.createElement("option");

      // Valor 1: El ID interno que se enviará al servidor
      option.value = user.id;

      // Valor 2: El texto visible que verá el usuario en la lista
      option.textContent = user.name;

      // Insertar la opción dentro del elemento select
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    selectElement.innerHTML = '<option value="">Error loading data</option>';
  }
}

function label() {
  const url = "http://127.0.0.1:8000/api/record_label"; // Endpoint GET de FastAPI
  const selectElement = document.getElementById("label-id");
  loadDropdownData(url, selectElement);
}

function artist() {
  const url = "http://127.0.0.1:8000/api/artist"; // Endpoint GET de FastAPI
  const selectElement = document.getElementById("artist");
  loadDropdownData(url, selectElement);
}

function genre() {
  const url = "http://127.0.0.1:8000/api/genre"; // Endpoint GET de FastAPI
  const selectElement = document.getElementById("genre");
  loadDropdownData(url, selectElement);
}

function format() {
  const url = "http://127.0.0.1:8000/api/format"; // Endpoint GET de FastAPI
  const selectElement = document.getElementById("format");
  loadDropdownData(url, selectElement);
}
// Ejecutar la función automáticamente cuando la página web termine de cargar
window.addEventListener("DOMContentLoaded", label);
window.addEventListener("DOMContentLoaded", artist);
window.addEventListener("DOMContentLoaded", genre);
window.addEventListener("DOMContentLoaded", format);
