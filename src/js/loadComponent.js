const BASE = "src";


const CORE_STYLES = ["variable.css", "reset.css", "style.css"];


const LAST_STYLES = ["responsive.css"];


const CORE_SCRIPTS = ["main.js"];

// Añade un <link> con el CSS al <head>
function loadStyle(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${BASE}/css/${file}`;
  document.head.appendChild(link);
}

// Añade un <script> y espera a que termine de cargar
function loadScript(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${BASE}/js/${file}`;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`No se pudo cargar ${script.src}`));
    document.body.appendChild(script);
  });
}

// Descarga el HTML de un componente y lo pone en su sitio
async function loadHTML(el, name) {
  const url = `${BASE}/components/${name}.html`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
  el.outerHTML = await response.text();
}

// Carga un componente completo: su CSS, su HTML y su JS
async function loadComponent(el) {
  const name = el.dataset.component;
  try {
    loadStyle(`${name}.css`);
    await loadHTML(el, name);
    await loadScript(`${name}.js`);
  } catch (error) {
    console.error(error);
  }
}

async function initApp() {
  //Estilos generales
  CORE_STYLES.forEach(loadStyle);

  //Componentes (todos los elementos con data-component)
  const components = document.querySelectorAll("[data-component]");
  await Promise.all([...components].map(loadComponent));

  //Estilos finales
  LAST_STYLES.forEach(loadStyle);

  //Scripts generales
  for (const file of CORE_SCRIPTS) {
    await loadScript(file);
  }

  // 5. Avisa de que todo está listo
  document.dispatchEvent(new Event("components:loaded"));
}

initApp();