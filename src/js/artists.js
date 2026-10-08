// Arranca la vista (la llama el router al entrar en #artistas)
function initArtistsView() {
  //Evento del formulario artista
  const form = document.getElementById("artist-form");
  //Cuando le doi al boton guardar que ejecute la funcion onartistformsubmit
  form.addEventListener("submit", onArtistFormSubmit);
  form.addEventListener("reset", clearArtistForm);
  document.getElementById("artist-description").addEventListener("input", updateDescriptionCount);
}

//Funcion ejecutar el guardado del formulario artista
async function onArtistFormSubmit(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("artist-name").value.trim(),
    description: document.getElementById("artist-description").value.trim(),
  };

  if (!validateArtist(data)) return;

  const saveBtn = document.getElementById("artist-save-btn");
  saveBtn.disabled = true;

  try {
    //Funcion que ejecuta el js de artistapi que contiene el axios 
    const artist = await createArtist(data);
    document.getElementById("artist-form").reset();
    //Se abre la modal pero me da error
    await openModal({
      type: "success",
      title: "Artista creado",
      message: "El artista {item} se ha guardado correctamente.",
      item: artist.name,
      confirmText: "Entendido",
      showCancel: false,
    });
  } catch (error) {
    console.error(error); // muestra el error real en la consola (F12)
    showFormMessage(getErrorMessage(error), "error");
  } finally {
    saveBtn.disabled = false;
  }
}

// Comprueba los campos antes de enviar. Devuelve true si todo está bien
function validateArtist({ name, description }) {
  clearFieldErrors();
  let valid = true;

  if (name.length < 2) {
    setFieldError("artist-name", "El nombre debe tener al menos 2 caracteres.");
    valid = false;
  }
  if (!description) {
    setFieldError("artist-description", "La descripción es obligatoria.");
    valid = false;
  }

  return valid;
}

function setFieldError(fieldId, message) {
  document.getElementById(fieldId).setAttribute("aria-invalid", "true");
  document.getElementById(`${fieldId}-error`).textContent = message;
}

function clearFieldErrors() {
  ["artist-name", "artist-description"].forEach((id) => {
    document.getElementById(id).removeAttribute("aria-invalid");
    document.getElementById(`${id}-error`).textContent = "";
  });
}

// Mensaje bajo el formulario: type = "success" (verde) o "error" (rojo)
function showFormMessage(text, type) {
  const message = document.getElementById("artist-form-message");
  message.textContent = text;
  message.dataset.type = type;
  message.hidden = false;
}

// Al pulsar Limpiar borra errores y mensajes
function clearArtistForm() {
  clearFieldErrors();
  document.getElementById("artist-form-message").hidden = true;
  setTimeout(updateDescriptionCount); // el reset vacía los campos justo después
}

function updateDescriptionCount() {
  const length = document.getElementById("artist-description").value.length;
  document.getElementById("artist-description-count").textContent = length;
}