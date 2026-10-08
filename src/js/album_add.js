// Interacciones de la página web de Inventario de Vinilos
console.log("Proyecto de Vinilos cargado correctamente.");
let enlace_temporal_global = "";

const drop_zone = document.getElementById("drop-zone");
const image_preview = document.getElementById("image-preview");
const drop_zone_prompt = document.getElementById("drop-zone-prompt");

// 1. Evitar que el navegador abra la imagen en una pestaña nueva por defecto
["dragenter", "dragover", "dragleave", "drop"].forEach((event_name) => {
  drop_zone.addEventListener(event_name, (e) => e.preventDefault(), false);
});

// 2. Escuchar cuando el usuario suelta la imagen dentro del contenedor
drop_zone.addEventListener("drop", (e) => {
  const uploaded_files = e.dataTransfer.files;

  // Validar que se haya arrastrado un archivo y que sea una imagen
  if (
    uploaded_files.length > 0 &&
    uploaded_files[0].type.startsWith("image/")
  ) {
    const target_file = uploaded_files[0];

    // EJECUCIÓN DE LA DEMO: Procesamos la imagen localmente
    procesar_imagen_demo(target_file);
  } else {
    alert("Por favor, arrastra solo archivos de imagen.");
  }
});

// 3. Función de la demo para simular el guardado y generar el enlace
function procesar_imagen_demo(file_data) {
  // "GUARDA" EL ARCHIVO EN MEMORIA Y GENERA UN ENLACE REAL (Blob URL)
  // Este enlace luce algo así: blob:http://localhost:5500/a1b2c3d4...
  const url_temporal = URL.createObjectURL(file_data);
  enlace_temporal_global = url_temporal;
  // A) MOSTRAR EN EL CONTENEDOR: Asignamos el enlace al elemento <img>
  image_preview.src = url_temporal;
  image_preview.style.display = "block"; // Hacemos visible la imagen
  drop_zone_prompt.style.display = "none"; // Ocultamos el texto informativo

  // B) ENLACE PARA TU API: Aquí tienes el string de texto listo para enviar
  console.log("¡Enlace generado para tu API actual!", url_temporal);

  // Guardamos este enlace en una variable o puedes usarlo directamente
  // en tu función de Axios para enviarlo al campo de texto que te pide tu API.
  create_album(url_temporal);
}
function url_image(url) {
  return;
}

let url = "http://127.0.0.1:8000/api/album";
let label_id_d = document.getElementById("label-id");
let artist_id_d = document.getElementById("artist");
let genre_id_d = document.getElementById("genre");
let format_id_d = document.getElementById("format");
let price_d = document.getElementById("price");
let stock_d = document.getElementById("stock");
let title_d = document.getElementById("title");
let release_year_d = document.getElementById("release_year");
let button_save = document.getElementById("button-save");

button_save.addEventListener("click", () => {
  album = {
    title: title_d.value,
    release_year: Number(release_year_d.value),
    cover_image_url: enlace_temporal_global,
    label_id: Number(label_id_d.value),
    artist_ids: [Number(artist_id_d.value)],
    genre_ids: [Number(genre_id_d.value)],
    formats: [
      {
        format_id: Number(format_id_d.value),
        price: Number(price_d.value),
        stock: Number(stock_d.value),
      },
    ],
  };
  console.log(JSON.stringify(album));
  create_album_api(url, album);
});

async function create_album_api(url, album_data) {
  try {
    console.log(album_data);
    let response = await axios.post(url, album_data);

    console.log("Usuario creado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al enviar los datos:",
      error.response?.data || error.message,
    );
  }
}
