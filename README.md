# XPL0DAY — Prototipo de interfaz

**Esto es un prototipo de interfaz sin backend, hecho para practicar diseño y maquetación web.**
No es una plataforma funcional y no está previsto que lo sea: no hay servidor de aplicación, no hay
base de datos y los datos son de demostración. Lo que se enseña aquí es la interfaz.

*A UI prototype for a HackTheBox-style cybersecurity training platform. Front-end only: no backend,
no database, demo data.*

**Desplegado en:** [www.xpl0day.com](https://www.xpl0day.com)

---

## Qué incluye

Siete pantallas maquetadas, con estética inspirada en HackTheBox:

| Pantalla | Qué muestra |
|---|---|
| `index_HTB.html` | Portada con terminal animada, estadísticas y sección de cómo funciona |
| `register_HTB.html` | Registro con validación en tiempo real y medidor de fuerza de contraseña |
| `login_HTB.html` | Acceso con animación de verificación por fases |
| `test_HTB.html` | Cuestionario de 15 preguntas en 7 categorías que asigna un rango |
| `dashboard_HTB.html` | Panel con máquinas activas, consola de actividad y barra de progreso |
| `machines_HTB.html` | Catálogo de 12 máquinas con filtros combinables y búsqueda |
| `profile_HTB.html` | Perfil con estadísticas, progresión de rango, historial e insignias |

La sesión y el "registro de usuarios" se guardan en `localStorage` del navegador. Sirve para recorrer
el flujo de pantallas de principio a fin; **no es autenticación real** y las contraseñas se guardan
en claro, cosa que en un producto de verdad sería inaceptable.

## Enigma: maqueta de asistente

`js/enigma.js` dibuja un asistente flotante —robot SVG animado, panel de chat, historial— presente en
todas las páginas. **Es solo la interfaz: no responde.** La llamada a la API de Anthropic que hay en
el código no envía credenciales ni las cabeceras que esa API exige, así que siempre falla y el widget
muestra un error de conexión.

Está en el repositorio como pieza de maquetación, no como funcionalidad. Hacerlo funcionar exigiría
un backend que actuara de intermediario y custodiara la clave: desde el navegador, cualquier clave
queda expuesta a quien abra las herramientas de desarrollo.

## Stack

| Tecnología | Para qué |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 con variables | Estilos, paleta global y diseño adaptable |
| JavaScript (ES6+, sin framework) | Lógica de interfaz, filtros, sesión simulada |
| `localStorage` | Persistencia en el navegador |
| SVG animado | Robot de Enigma, logotipo y favicon |
| Docker + Nginx (Alpine) | Contenedor de publicación con GZIP y TLS |
| Let's Encrypt | Certificados TLS automáticos |
| GitHub Actions | Despliegue automático al VPS en cada push a `main` |

Sin paso de compilación: ni npm, ni empaquetador, ni framework.

## Estructura

```
├── *_HTB.html          # las siete pantallas
├── css/
│   ├── global.css      # variables globales: paleta, tipografía, espaciado
│   └── *_HTB.css       # estilos por página
├── js/
│   ├── enigma.js               # maqueta del asistente (en todas las páginas)
│   ├── script_HTB.js           # acceso y sesión simulada
│   ├── register-logic_HTB.js   # validación y alta
│   ├── test-logic_HTB.js       # motor del cuestionario
│   ├── dashboard-logic_HTB.js  # lógica del panel
│   ├── machines-logic_HTB.js   # filtros del catálogo
│   └── profile-logic_HTB.js    # rango y progreso
├── assets/             # logotipo, favicon y avatar en SVG
├── nginx/default.conf  # configuración de Nginx (GZIP, TLS)
├── Dockerfile · docker-compose.yml
└── .github/workflows/deploy.yml
```

## Cómo ejecutarlo

Sin dependencias y sin servidor:

```bash
git clone https://github.com/R0b3r7DEV/xpl0day.git
cd xpl0day
start index_HTB.html      # Windows  ·  macOS: open …  ·  Linux: xdg-open …
```

Con Docker, tal y como se publica:

```bash
docker compose up --build   # sirve en :80 y :443
```

## Alcance

Prototipo de interfaz, cerrado como tal. **No hay backend previsto.** Si algún día se convirtiera en
una aplicación funcional, haría falta rehacer la autenticación, mover la persistencia a un servidor y
sacar del navegador cualquier llamada que necesite credenciales.
