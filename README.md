# XPL0DAY — Cybersecurity Training Platform

> 🇪🇸 Plataforma de entrenamiento en ciberseguridad inspirada en HackTheBox  
> 🇺🇸 Cybersecurity training platform inspired by HackTheBox

**Autor / Author:** [R0b3r7DEV](https://github.com/R0b3r7DEV)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🇪🇸 Descripción

**XPL0DAY** es una plataforma web de entrenamiento en ciberseguridad desarrollada como proyecto personal durante el primer curso del CFGS Desarrollo de Aplicaciones Web. Inspirada en HackTheBox, permite a los usuarios registrarse, iniciar sesión y acceder a un dashboard con máquinas virtuales, retos y una consola de actividad en tiempo real.

El proyecto nace de la experiencia real del desarrollador en plataformas de pentesting y bug bounty, con el objetivo de aplicar los conocimientos adquiridos en clase a un entorno práctico y real.

## 🇺🇸 Description

**XPL0DAY** is a web-based cybersecurity training platform developed as a personal project during the first year of a Web Application Development degree. Inspired by HackTheBox, it allows users to register, log in, and access a dashboard featuring virtual machines, challenges, and a real-time activity console.

The project is built from the developer's hands-on experience in pentesting platforms and bug bounty hunting.

---

## 🚀 Funcionalidades / Features

- ✅ Landing page con terminal animada / Landing page with animated terminal
- ✅ Registro de usuarios con validación y medidor de contraseña / User registration with validation and password strength meter
- ✅ Login con gestión de sesión / Login with session management
- ✅ Dashboard con máquinas activas, consola de actividad y progreso de rango / Dashboard with active machines, activity console and rank progress
- ✅ Diseño responsive / Responsive design
- ✅ Sistema de logout seguro / Secure logout system

---

## 🛠️ Tecnologías / Technologies

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 + Variables CSS | Estilos y diseño global |
| JavaScript (Vanilla) | Lógica de negocio y sesión |
| LocalStorage | Persistencia de datos en cliente |
| Google Fonts (Ubuntu Mono) | Tipografía temática |

---

## ⚙️ Instalación / Installation

🇪🇸 No requiere servidor ni dependencias. Solo clona el repositorio y abre el archivo en tu navegador.

🇺🇸 No server or dependencies required. Just clone the repo and open the file in your browser.

```bash
# Clonar el repositorio / Clone the repository
git clone https://github.com/tuusuario/xpl0day.git

# Entrar en la carpeta / Enter the folder
cd xpl0day

# Abrir en el navegador / Open in browser
# Abre index_HTB.html directamente desde tu explorador de archivos
# Just open index_HTB.html directly from your file explorer
```

---

## 📁 Estructura del proyecto / Project structure

```
xpl0day/
├── index_HTB.html        # Landing page
├── login_HTB.html        # Login
├── register_HTB.html     # Registro / Register
├── dashboard_HTB.html    # Panel de control / Dashboard
├── css/
│   ├── global.css        # Variables y estilos globales
│   ├── index_HTB.css
│   ├── login_HTB.css
│   ├── register_HTB.css
│   └── dashboard_HTB.css
├── js/
│   ├── script_HTB.js           # Lógica de login
│   ├── register-logic_HTB.js   # Lógica de registro
│   └── dashboard-logic_HTB.js  # Lógica del dashboard
└── assets/
    └── logo.svg
```

---

## 🗺️ Roadmap

### v0.2 — En progreso / In progress
- [ ] Corrección de variables CSS inconsistentes
- [ ] Página de perfil de usuario / User profile page
- [ ] Sistema de retos / Challenges system

### v0.3 — Próximamente / Coming soon
- [ ] JavaScript avanzado: puntuación dinámica / Advanced JS: dynamic scoring
- [ ] Animaciones de transición entre páginas / Page transition animations
- [ ] Modo oscuro/claro / Dark/light mode toggle

### v1.0 — Futuro (con backend) / Future (with backend)
- [ ] Backend con Spring Boot (Java) o Node.js / Backend with Spring Boot (Java) or Node.js
- [ ] Base de datos MySQL / MySQL database
- [ ] Hashing de contraseñas con bcrypt / Password hashing with bcrypt
- [ ] Sistema de retos dinámico / Dynamic challenges system
- [ ] Tabla de clasificación global / Global leaderboard

---

## 👨‍💻 Autor / Author

Desarrollado por **[R0b3r7DEV](https://github.com/R0b3r7DEV)**, estudiante de DAW con experiencia en HackTheBox (rango **Hacker**), pentesting y bug bounty hunting.

Developed by **[R0b3r7DEV](https://github.com/R0b3r7DEV)**, a DAW student with experience in HackTheBox (**Hacker** rank), pentesting and bug bounty hunting.

---

## ⚠️ Aviso / Disclaimer

🇪🇸 Este proyecto es únicamente con fines educativos. No almacena datos reales ni está conectado a ningún servidor. Las contraseñas se guardan en LocalStorage sin cifrar, algo que se corregirá en versiones futuras con implementación de backend real.

🇺🇸 This project is for educational purposes only. It does not store real data or connect to any server. Passwords are stored unencrypted in LocalStorage, which will be addressed in future versions with a real backend implementation.
