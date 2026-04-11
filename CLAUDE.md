# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XPL0DAY is a **pure frontend** cybersecurity training platform (no build system, no npm, no backend). All pages are static HTML served by Nginx via Docker. There are zero dependencies to install.

## Running the Project

**Local development (no Docker):**
Open any `*_HTB.html` file directly in a browser. No server needed.

**With Docker (production):**
```bash
docker compose up --build      # build and start
docker compose up -d           # detached
docker compose down            # stop
```
The container serves the site at port 80 (redirects to 443 with Let's Encrypt). SSL certs are mounted read-only from `/etc/letsencrypt` on the host.

## File Naming Convention

All project files use the `_HTB` suffix:
- Pages: `<name>_HTB.html`
- JS logic: `<name>-logic_HTB.js`  
- CSS: `<name>_HTB.css`

The only exception is `js/enigma.js` (no suffix — it's the universal floating widget loaded on every page).

## Architecture

**User flow:**
```
index_HTB.html → register_HTB.html → login_HTB.html → test_HTB.html → dashboard_HTB.html
                                                                              ↕
                                                                    machines_HTB.html / profile_HTB.html
                                                                    (+ Enigma widget on all pages)
```

**Session & data persistence (LocalStorage only — no backend):**
- `xpl0day_users` — array of all registered users (username, password in plaintext, rank, testCompleted, testScore)
- `xpl0day_active_user` — the currently logged-in user object

Login (`js/script_HTB.js`) checks credentials against `xpl0day_users`. After login it redirects to `test_HTB.html` if `testCompleted` is false, otherwise to `dashboard_HTB.html`.

**Rank system** (assigned by `js/test-logic_HTB.js` after the 15-question test):
- `Script Kiddie` — score < 50%
- `Hacker` — score 50–79%
- `Elite` — score ≥ 80%

The rank is stored on the user object in LocalStorage and read by Enigma to adapt hints.

**CSS architecture:**
`css/global.css` defines all CSS custom properties (color palette, spacing). Every page-specific stylesheet imports from those variables. The primary accent color is `#9fef00` (HackTheBox green).

**Enigma AI widget (`js/enigma.js`):**
A self-contained IIFE that injects its own styles, SVG robot, and chat panel into any page it's loaded on. It calls the Anthropic Messages API directly from the browser (`https://api.anthropic.com/v1/messages`). The API key must be added to the `Authorization` header in `sendMessage()` (line ~615). The system prompt instructs the model to give progressive hints without full solutions, always in Spanish, max 3 paragraphs. Conversation history is kept in memory (not persisted across page navigation).

## Skills y convenciones

**Git — Conventional Commits en español:**
Todos los commits deben escribirse en español usando los siguientes prefijos:
- `feat:` — nueva funcionalidad
- `fix:` — corrección de error
- `docs:` — cambios en documentación
- `seguridad:` — mejoras o parches de seguridad
- `estilo:` — cambios de CSS/formato sin afectar lógica

**Seguridad:**
Nunca escribir contraseñas, API keys ni credenciales directamente en el código. Usar siempre variables de entorno o archivos `.env` (ya incluidos en `.gitignore`). Esto aplica especialmente a la API key de Anthropic usada por Enigma.

**Archivos nuevos:**
Todos los archivos nuevos deben seguir la convención `_HTB` al final del nombre (ej. `challenges_HTB.html`, `challenges-logic_HTB.js`, `challenges_HTB.css`). La única excepción vigente es `js/enigma.js`.

**CSS:**
Todos los colores, fuentes y valores de espaciado reutilizables deben definirse como variables CSS en `css/global.css`. Nunca hardcodear estos valores en hojas de estilo específicas de página.

**Despliegue en VPS:**
Cuando se modifique `nginx/default.conf` o `docker-compose.yml`, ejecutar en el servidor tras hacer push:
```bash
git pull && docker compose up -d --build
```

**Comentarios en el código:**
Todos los comentarios deben escribirse en español.

## Key Constraints

- **No build step** — edits to HTML/CSS/JS are immediately reflected on reload.
- **Passwords are stored in plaintext** in LocalStorage. This is a known limitation documented in the README, to be fixed when a Spring Boot backend is added in v1.0.
- The Enigma widget makes **client-side API calls to Anthropic** — the API key is exposed in the browser. Do not commit a real production key here; this is acceptable for educational/demo use only.
- All pages must include `<script src="js/enigma.js"></script>` before `</body>` to display the floating assistant.
