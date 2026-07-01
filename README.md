# XPL0DAY — Plataforma de Entrenamiento en Ciberseguridad

Plataforma web de entrenamiento en ciberseguridad inspirada en HackTheBox, que permite a los usuarios completar un test de nivel inicial, acceder a un catálogo de máquinas virtuales y recibir asistencia guiada en tiempo real mediante un asistente de IA integrado.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Claude AI](https://img.shields.io/badge/Claude_AI-D97757?style=flat&logo=anthropic&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

<p>
  <a href="https://www.xpl0day.com"><img alt="Live site" src="https://img.shields.io/badge/🌐_Live_site-www.xpl0day.com-000000?style=for-the-badge" /></a>
</p>

🌐 **Web en vivo:** [www.xpl0day.com](https://www.xpl0day.com)

---

## Características principales

- **Landing page** con terminal animada, estadísticas de la plataforma y sección explicativa del flujo de uso.
- **Registro con validación** — medidor de seguridad de contraseña en tiempo real, comprobación de unicidad de usuario y código de invitación opcional.
- **Autenticación con gestión de sesión** — login con animación de verificación por fases y redirección inteligente según estado del usuario.
- **Test de nivel inicial** — 15 preguntas en 7 categorías (Redes, Linux, Kali Linux, Windows, Web, Criptografía, Herramientas) que asignan automáticamente un rango: `Script Kiddie`, `Hacker` o `Elite`.
- **Dashboard** con listado de máquinas activas, consola de actividad en tiempo real y barra de progreso de rango.
- **Catálogo de máquinas** con 12 máquinas, filtros combinables por dificultad, sistema operativo y estado, y búsqueda en tiempo real.
- **Perfil de usuario** con estadísticas, visualización del progreso de rango, historial de actividad y sistema de badges/logros.
- **Enigma** — asistente de IA flotante, presente en todas las páginas, con animación de robot androide en SVG, historial de conversación y hints progresivos adaptados al rango del usuario, impulsado por la API de Claude (Anthropic).
- **Diseño responsive** con sidebar colapsable, adaptado a móvil y escritorio.

---

## Stack tecnológico

| Tecnología | Versión / Nota | Uso |
|---|---|---|
| HTML5 | — | Estructura de todas las páginas |
| CSS3 + Variables CSS | — | Estilos, paleta global, diseño responsive |
| JavaScript (Vanilla) | ES6+ | Lógica de negocio, sesión, filtros, UI dinámica |
| LocalStorage API | Nativa del navegador | Persistencia de usuarios y sesión activa |
| SVG animado | — | Robot Enigma, logo y favicon |
| Claude API (Anthropic) | `claude-sonnet-4-20250514` | Asistente Enigma en tiempo real |
| Google Fonts | Ubuntu Mono | Tipografía temática terminal |
| Docker + Nginx Alpine | — | Contenedor de producción con GZIP y TLS |
| Let's Encrypt | — | Certificados SSL/TLS automáticos |
| GitHub Actions | — | CI/CD: despliegue automático al VPS en cada push a `main` |

> Este proyecto no tiene ningún paso de compilación (no npm, no bundler, no framework). Es HTML/CSS/JS puro servido por Nginx.

---

## Requisitos previos

Para desarrollo local no se necesita nada más que un navegador web moderno.

Para el despliegue con Docker:

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/) instalados.
- (Producción) Certificados SSL en `/etc/letsencrypt` en el host (Let's Encrypt / Certbot).

---

## Instalación y uso en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/R0b3r7DEV/xpl0day.git
cd xpl0day

# 2. Abrir directamente en el navegador (sin servidor)
# En Windows:
start index_HTB.html

# En macOS:
open index_HTB.html

# En Linux:
xdg-open index_HTB.html
```

No hay dependencias que instalar. Cualquier edición en los archivos se refleja al recargar el navegador.

---

## Uso con Docker

```bash
# Construir la imagen y arrancar el contenedor
docker compose up --build

# Arrancar en segundo plano
docker compose up -d

# Detener
docker compose down
```

El contenedor sirve la aplicación en el puerto `80` (HTTP) y `443` (HTTPS con TLS 1.2/1.3).

---

## Configuración del asistente Enigma (API key)

El widget Enigma llama directamente a la API de Anthropic desde el navegador. Para activarlo, es necesario añadir una API key válida en [js/enigma.js](js/enigma.js), en la función `sendMessage()` (aproximadamente línea 615):

```js
// js/enigma.js — función sendMessage()
headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'TU_API_KEY_AQUÍ',   // <-- reemplazar por tu clave real
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
}
```

> **Nota de seguridad:** Al ser un proyecto puramente frontend, la API key queda expuesta en el código fuente del navegador. Esta arquitectura es aceptable para uso educativo o demo. No usar una clave de producción con límites de facturación altos. En la versión con backend (v1.0) las llamadas se harán desde el servidor.

---

## Estructura del proyecto

```
xpl0day/
├── index_HTB.html          # Landing page
├── login_HTB.html          # Autenticación
├── register_HTB.html       # Registro de usuario
├── test_HTB.html           # Test de nivel inicial (15 preguntas)
├── dashboard_HTB.html      # Panel principal
├── machines_HTB.html       # Catálogo de máquinas con filtros
├── profile_HTB.html        # Perfil y estadísticas del usuario
│
├── css/
│   ├── global.css          # Variables CSS globales (paleta, tipografía, espaciado)
│   ├── index_HTB.css
│   ├── login_HTB.css
│   ├── register_HTB.css
│   ├── test_HTB.css
│   ├── dashboard_HTB.css
│   ├── machines_HTB.css
│   └── profile_HTB.css
│
├── js/
│   ├── enigma.js                  # Widget IA flotante (universal, todas las páginas)
│   ├── script_HTB.js              # Lógica de login y sesión
│   ├── register-logic_HTB.js      # Validación y registro
│   ├── test-logic_HTB.js          # Motor del test de nivel
│   ├── dashboard-logic_HTB.js     # Lógica del dashboard
│   ├── machines-logic_HTB.js      # Filtros y gestión de máquinas
│   └── profile-logic_HTB.js       # Cálculo de progreso y rango
│
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   └── avatar_R0b3r7DEV.svg
│
├── nginx/
│   └── default.conf        # Configuración Nginx (GZIP, TLS, SPA fallback)
│
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml      # CI/CD: auto-deploy al VPS en push a main
```

---

## Aspectos técnicos destacables

### Autenticación y sesión sin backend

Toda la persistencia se gestiona mediante la API de LocalStorage del navegador con dos claves principales:

- `xpl0day_users` — array con todos los usuarios registrados.
- `xpl0day_active_user` — objeto del usuario en sesión activa.

El flujo de redirección en el login comprueba el flag `testCompleted` del usuario para dirigirle al test o directamente al dashboard, lo que simula un sistema de onboarding real.

### Enigma: integración directa con Claude API desde el navegador

El widget Enigma (`js/enigma.js`) es una IIFE autocontenida (~690 líneas) que:

1. Inyecta sus propios estilos, SVG animado y panel de chat en el DOM de cualquier página donde se incluya.
2. Lee el rango del usuario desde LocalStorage y lo pasa al `system prompt` de Claude para adaptar la dificultad de los hints.
3. Mantiene el historial de conversación en memoria durante la sesión de navegación.
4. Formatea las respuestas de la IA aplicando estilos a bloques de código (backticks) y negrita (asteriscos dobles).

### Pipeline CI/CD con GitHub Actions

Cada push a la rama `main` desencadena automáticamente un workflow que se conecta al VPS por SSH y ejecuta `git pull && docker compose up -d --build`, consiguiendo despliegue continuo sin intervención manual.

### CSS totalmente basado en custom properties

`css/global.css` centraliza toda la paleta de color, tipografía y espaciado como variables CSS (`--color-primary: #9fef00`, etc.). Ninguna hoja de estilos específica de página usa valores hardcodeados, lo que permite cambiar el tema completo desde un único archivo.

---

## Roadmap

### v0.3 — Completado
- Test de nivel con 15 preguntas y asignación automática de rango
- Widget Enigma con Claude AI integrado
- Flujo completo: Registro → Login → Test → Dashboard

### v0.4 — En desarrollo
- [ ] Página de retos (`challenges_HTB.html`)
- [ ] Generador de informes de pentest en PDF al completar una máquina
- [ ] Datos del dashboard dinámicos por usuario

### v1.0 — Con backend
- [ ] API REST con Spring Boot (Java)
- [ ] Base de datos MySQL con hashing de contraseñas (bcrypt)
- [ ] Perfil público compartible con URL propia
- [ ] Tabla de clasificación global

---

## Autor

Desarrollado por **[R0b3r7DEV](https://github.com/R0b3r7DEV)**, estudiante de CFGS Desarrollo de Aplicaciones Web con experiencia práctica en HackTheBox (rango **Hacker**), pentesting y bug bounty hunting.

---

## Aviso

Proyecto con fines educativos. No almacena datos reales ni se conecta a servidores propios. Las contraseñas se guardan en LocalStorage sin cifrar; esto se resolverá en v1.0 al implementar el backend con hashing bcrypt.
