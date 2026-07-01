# XPL0DAY — Cybersecurity Training Platform (Front-End)

> A HackTheBox-inspired cybersecurity training platform: a skill-assessment quiz, a machine catalog
> and an in-page AI assistant. Built as a **front-end engineering + DevOps showcase** — vanilla
> HTML/CSS/JS with no framework, containerized and continuously deployed to a custom domain.

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

🌐 **Live site:** [www.xpl0day.com](https://www.xpl0day.com) &nbsp;·&nbsp; 🇪🇸 *A Spanish version of this document is available on request.*

<!-- TODO: screenshot — landing page with animated terminal + Enigma assistant -->

> **Scope:** this is a **front-end project**. State (users, session, progress) is persisted in the
> browser via `localStorage`; there is no backend or database, and the machine catalog is demo data.
> The value on display is UI/UX engineering, vanilla-JS architecture and a real deployment pipeline —
> a backend (Spring Boot + MySQL) is planned in the roadmap.

---

## Features

- **Landing page** with an animated terminal, platform stats and a how-it-works section.
- **Registration with validation** — real-time password-strength meter, username uniqueness check and
  optional invite code.
- **Session management** — login with a phased verification animation and smart redirect based on the
  user's state (quiz completed or not).
- **Skill-assessment quiz** — 15 questions across 7 categories (Networking, Linux, Kali, Windows, Web,
  Cryptography, Tools) that automatically assign a rank: `Script Kiddie`, `Hacker` or `Elite`.
- **Dashboard** with active machines, a live activity console and a rank-progress bar.
- **Machine catalog** — 12 machines with combinable filters (difficulty, OS, status) and live search.
- **User profile** with stats, rank progression, activity history and a badges/achievements system.
- **Enigma** — a floating AI assistant present on every page (animated SVG robot) with conversation
  history and progressive hints adapted to the user's rank, powered by the Claude API (Anthropic).
- **Responsive design** with a collapsible sidebar, tuned for mobile and desktop.

---

## Tech stack

| Technology | Note | Used for |
|---|---|---|
| HTML5 | — | Page structure |
| CSS3 + CSS custom properties | — | Styling, global palette, responsive layout |
| JavaScript (Vanilla) | ES6+ | Business logic, session, filters, dynamic UI |
| LocalStorage API | browser-native | User & session persistence |
| Animated SVG | — | Enigma robot, logo, favicon |
| Claude API (Anthropic) | — | Real-time Enigma assistant |
| Docker + Nginx (Alpine) | — | Production container with GZIP and TLS |
| Let's Encrypt | — | Automatic SSL/TLS certificates |
| GitHub Actions | — | CI/CD: auto-deploy to the VPS on every push to `main` |

> No build step: no npm, no bundler, no framework. Pure HTML/CSS/JS served by Nginx.

---

## Technical highlights

- **Self-contained AI widget.** `js/enigma.js` is a ~690-line IIFE that injects its own styles,
  animated SVG and chat panel into any page it's included on, reads the user's rank from localStorage
  to tune the Claude `system` prompt, keeps conversation history in memory, and formats code blocks /
  bold in the AI responses.
- **Auth & session without a backend.** Persistence lives in two localStorage keys (`xpl0day_users`,
  `xpl0day_active_user`); the login redirect inspects a `testCompleted` flag to simulate a real
  onboarding flow.
- **CI/CD with GitHub Actions.** Every push to `main` triggers a workflow that SSHes into the VPS and
  runs `git pull && docker compose up -d --build` — continuous deployment with no manual step.
- **Fully tokenized CSS.** `css/global.css` centralizes palette, typography and spacing as CSS
  variables, so the entire theme can be changed from a single file.

---

## Project structure

```
├── *_HTB.html          # pages: landing, login, register, quiz, dashboard, machines, profile
├── css/
│   ├── global.css      # global CSS variables (palette, typography, spacing)
│   └── *_HTB.css       # per-page styles
├── js/
│   ├── enigma.js               # floating AI assistant (loaded on every page)
│   ├── script_HTB.js           # login & session
│   ├── register-logic_HTB.js   # validation & registration
│   ├── test-logic_HTB.js       # quiz engine
│   ├── dashboard-logic_HTB.js  # dashboard logic
│   ├── machines-logic_HTB.js   # machine filters
│   └── profile-logic_HTB.js    # rank / progress
├── assets/             # logo, favicon, avatar (SVG)
├── nginx/default.conf  # Nginx config (GZIP, TLS, SPA fallback)
├── Dockerfile · docker-compose.yml
└── .github/workflows/deploy.yml   # CI/CD: auto-deploy to VPS on push to main
```

---

## Run it

**Locally** — no dependencies, no server needed:

```bash
git clone https://github.com/R0b3r7DEV/xpl0day.git
cd xpl0day
start index_HTB.html      # Windows  (macOS: open …  ·  Linux: xdg-open …)
```

**With Docker:**

```bash
docker compose up --build   # serves on :80 (HTTP) and :443 (HTTPS)
```

**Enigma assistant:** the widget calls the Anthropic API directly from the browser, so it needs an API
key set in `js/enigma.js` (`sendMessage()`, ~line 615). Because this is a front-end-only project the
key is exposed client-side — use only a limited/educational key, never a production one. Moving these
calls to a server proxy is part of the planned backend.

---

## Roadmap

- **v0.4 (in progress):** challenges page, PDF pentest report on machine completion, per-user dynamic
  dashboard data.
- **v1.0 (backend):** Spring Boot REST API, MySQL with bcrypt-hashed passwords, shareable public
  profiles and a global leaderboard.

---

## What I learned building this

- Architecting a **multi-page vanilla-JS app** with shared session state, a reusable injectable widget
  and a fully tokenized CSS design system — no framework crutches.
- Building a **containerized deployment** (Docker + Nginx) with a **GitHub Actions CI/CD pipeline** and
  automatic **Let's Encrypt TLS** to a custom domain.
- Integrating an **LLM assistant** into a plain web app and adapting its behavior to app state.
- Understanding the security limits of a front-end-only design (client-side keys, unhashed storage) and
  planning the backend that resolves them.

---

## Notice

Educational project. It does not store real data or connect to owned servers. Passwords are kept in
localStorage unencrypted by design; this is addressed in v1.0 with a backend and bcrypt hashing.

Built by **[R0b3r7DEV](https://github.com/R0b3r7DEV)**.
