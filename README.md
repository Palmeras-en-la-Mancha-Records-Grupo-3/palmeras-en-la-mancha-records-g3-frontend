# Palmeras en la Mancha Records - Frontend (v3)

Este es el frontend de la plataforma **palmeras-en-la-mancha-records-g3**. Está desarrollado con tecnologías web nativas (**HTML5, CSS3 y JavaScript Moderno**) bajo una arquitectura modular orientada a componentes reutilizables mediante carga dinámica de scripts.

## 🛠️ Tecnologías Utilizadas

* **HTML5**: Estructuración semántica de las vistas y componentes.
* **CSS3**: Estilos customizados organizados por vistas, layouts adaptables y variables globales.
* **JavaScript (ES6+)**: Consumo asíncrono de la API de FastAPI y renderizado dinámico de la interfaz.

## 📂 Estructura del Proyecto

```text
├── pages/
│   └── branches.html         # Vista específica para la sección de sucursales
├── src/
│   ├── components/           # Fragmentos HTML reutilizables
│   │   ├── footer.html
│   │   ├── header.html
│   │   └── modal.html
│   ├── css/                  # Hojas de estilo modulares
│   │   ├── artists.css
│   │   ├── branches.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── modal.css
│   │   ├── reset.css          # Reseteo de estilos globales
│   │   ├── responsive.css     # Reglas de Media Queries para móviles
│   │   ├── style.css          # Estilos generales comunes
│   │   └── variable.css       # Definición de variables de diseño (colores, fuentes)
│   ├── js/                   # Lógica de interacción y consumo de servicios
│   │   ├── api.js            # Instancia y fetch base hacia la API del Backend
│   │   ├── artists.js
│   │   ├── artistsApi.js     # Consumo específico de endpoints de artistas
│   │   ├── branches.js
│   │   ├── footer.js
│   │   ├── header.js
│   │   ├── loadComponent.js  # Script encargado de inyectar dinámicamente los componentes
│   │   ├── main.js           # Orquestador principal del cliente
│   │   └── modal.js
│   └── views/                # Vistas de contenido de la aplicación
│       └── artists.html
├── index.html                # Punto de acceso principal de la web
└── README.md                 # Documentación del Frontend
```

## 🚀 Despliegue en Desarrollo

Al ser un proyecto basado en archivos estáticos nativos, no requiere un proceso de compilación complejo.

### Opción 1: Servidor Local con VS Code (Recomendado)
1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Asegúrate de tener instalada la extensión **Live Server**.
3. Haz clic derecho sobre el archivo `index.html` en la raíz y selecciona **Open with Live Server**.

### Opción 2: Usando Node.js (`http-server`)
Si tienes Node instalado en tu equipo, puedes levantar un servidor ultrarrápido desde la consola:
```bash
# Instalar globalmente (solo la primera vez)
npm install -g http-server

# Ejecutar en la raíz del frontend
http-server .
```

## ⚙️ Integración con el Backend
Toda la comunicación con el servidor FastAPI se centraliza en `src/js/api.js`. Si necesitas apuntar a un entorno local o de producción diferente, asegúrate de modificar la URL base dentro de este archivo:
```javascript
const BASE_URL = "http://127.0.0.1:8000";
```