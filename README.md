# XPL0DAY — Cybersecurity Training Platform

> 🇪🇸 Plataforma de entrenamiento en ciberseguridad inspirada en HackTheBox  
> 🇺🇸 Cybersecurity training platform inspired by HackTheBox

**Autor / Author:** [R0b3r7DEV](https://github.com/R0b3r7DEV)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)

---

## 🇪🇸 Descripción

**XPL0DAY** es una plataforma web de entrenamiento en ciberseguridad desarrollada como proyecto personal durante el primer curso del CFGS Desarrollo de Aplicaciones Web. Inspirada en HackTheBox, permite a los usuarios registrarse, iniciar sesión y acceder a un dashboard con máquinas virtuales, retos y una consola de actividad en tiempo real.

El proyecto nace de la experiencia real del desarrollador en plataformas de pentesting y bug bounty, con el objetivo de aplicar los conocimientos adquiridos en clase a un entorno práctico y real. A diferencia de otras plataformas similares, XPL0DAY incorporará funcionalidades únicas orientadas al aprendizaje guiado y la proyección profesional del usuario.

## 🇺🇸 Description

**XPL0DAY** is a web-based cybersecurity training platform developed as a personal project during the first year of a Web Application Development degree. Inspired by HackTheBox, it allows users to register, log in, and access a dashboard featuring virtual machines, challenges, and a real-time activity console.

The project is built from the developer's hands-on experience in pentesting platforms and bug bounty hunting, and will include unique features focused on guided learning and professional growth.

---

## 🚀 Funcionalidades actuales / Current Features

- ✅ Landing page con terminal animada y sección "Cómo funciona" / Landing page with animated terminal and "How it works" section
- ✅ Registro de usuarios con validación y medidor de contraseña / User registration with validation and password strength meter
- ✅ Login con gestión de sesión / Login with session management
- ✅ Dashboard con máquinas activas, consola de actividad y progreso de rango / Dashboard with active machines, activity console and rank progress
- ✅ Página de perfil con estadísticas, badges y progreso de rango / Profile page with stats, badges and rank progress
- ✅ Página de máquinas con filtros por dificultad, SO y estado / Machines page with filters by difficulty, OS and status
- ✅ Buscador de máquinas en tiempo real / Real-time machine search
- ✅ Sistema de logout seguro / Secure logout system
- ✅ Diseño responsive / Responsive design

---

## 💡 Funcionalidades únicas en desarrollo / Unique Features in Development

Estas funcionalidades diferencian XPL0DAY de otras plataformas como HackTheBox:

> **🧠 Test de nivel inicial / Initial skill assessment**  
> Al registrarse, el usuario responde un test que evalúa su nivel real en ciberseguridad. El sistema le asigna un perfil (principiante, intermedio, avanzado) y le recomienda automáticamente máquinas y cursos adaptados. Ninguna plataforma similar hace esto de forma guiada.

> **📄 Generador de informes de pentest / Pentest report generator**  
> Al completar una máquina, el usuario puede generar un informe profesional en PDF con las vulnerabilidades encontradas, el vector de ataque y recomendaciones de mitigación. Una herramienta real de aprendizaje con salida profesional directa al CV.

> **🌐 Perfil público compartible / Shareable public profile**  
> Cada usuario tendrá una URL pública con sus estadísticas, badges y máquinas completadas. Una forma de mostrar habilidades reales en LinkedIn o entrevistas de trabajo, y un canal de crecimiento orgánico para la plataforma.

---

## 🛠️ Tecnologías / Technologies

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 + Variables CSS | Estilos y diseño global |
| JavaScript (Vanilla) | Lógica de negocio y sesión |
| LocalStorage | Persistencia de datos en cliente |
| Google Fonts (Ubuntu Mono) | Tipografía temática |
| Java + Spring Boot *(próximo)* | Backend y API REST |
| MySQL *(próximo)* | Base de datos |
| jsPDF *(próximo)* | Generación de informes PDF |

---

## ⚙️ Instalación / Installation

🇪🇸 No requiere servidor ni dependencias. Solo clona el repositorio y abre el archivo en tu navegador.

🇺🇸 No server or dependencies required. Just clone the repo and open the file in your browser.

```bash
# Clonar el repositorio / Clone the repository
git clone https://github.com/R0b3r7DEV/xpl0day.git

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
├── index_HTB.html          # Landing page
├── login_HTB.html          # Login
├── register_HTB.html       # Registro / Register
├── dashboard_HTB.html      # Panel de control / Dashboard
├── profile_HTB.html        # Perfil de usuario / User profile
├── machines_HTB.html       # Página de máquinas / Machines page
├── css/
│   ├── global.css          # Variables y estilos globales
│   ├── index_HTB.css
│   ├── login_HTB.css
│   ├── register_HTB.css
│   ├── dashboard_HTB.css
│   ├── profile_HTB.css
│   └── machines_HTB.css
├── js/
│   ├── script_HTB.js             # Lógica de login
│   ├── register-logic_HTB.js     # Lógica de registro
│   ├── dashboard-logic_HTB.js    # Lógica del dashboard
│   ├── profile-logic_HTB.js      # Lógica del perfil
│   └── machines-logic_HTB.js     # Lógica de máquinas
└── assets/
    ├── logo.svg
    └── avatar_R0b3r7DEV.svg
```

---

## 🗺️ Roadmap

### v0.2 — Completado ✅
- [x] Corrección de variables CSS inconsistentes
- [x] Página de perfil con stats, badges y progreso de rango
- [x] Página de máquinas con filtros y buscador
- [x] Sección "Cómo funciona" y footer en landing
- [x] Perfil enlazado desde sidebar

### v0.3 — En progreso / In progress
- [ ] Test de nivel inicial para nuevos usuarios
- [ ] Página de Retos / Challenges page
- [ ] Generador de informes PDF al completar máquina
- [ ] Animaciones de transición entre páginas

### v1.0 — Futuro (con backend) / Future (with backend)
- [ ] Backend con Spring Boot (Java) o Node.js
- [ ] Base de datos MySQL
- [ ] Hashing de contraseñas con bcrypt
- [ ] Perfil público compartible con URL propia
- [ ] Sistema de retos dinámico
- [ ] Tabla de clasificación global / Global leaderboard
- [ ] Recomendador de máquinas basado en nivel del usuario

---

## 👨‍💻 Autor / Author

Desarrollado por **[R0b3r7DEV](https://github.com/R0b3r7DEV)**, estudiante de DAW con experiencia en HackTheBox (rango **Hacker**), pentesting y bug bounty hunting.

Developed by **[R0b3r7DEV](https://github.com/R0b3r7DEV)**, a DAW student with experience in HackTheBox (**Hacker** rank), pentesting and bug bounty hunting.

---

## ⚠️ Aviso / Disclaimer

🇪🇸 Este proyecto es únicamente con fines educativos. No almacena datos reales ni está conectado a ningún servidor. Las contraseñas se guardan en LocalStorage sin cifrar, algo que se corregirá en versiones futuras con implementación de backend real.

🇺🇸 This project is for educational purposes only. It does not store real data or connect to any server. Passwords are stored unencrypted in LocalStorage, which will be addressed in future versions with a real backend implementation.
