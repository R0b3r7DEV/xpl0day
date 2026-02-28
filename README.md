# XPL0DAY — Cybersecurity Training Platform

> 🇪🇸 Plataforma de entrenamiento en ciberseguridad inspirada en HackTheBox  
> 🇺🇸 Cybersecurity training platform inspired by HackTheBox

**Autor / Author:** [R0b3r7DEV](https://github.com/R0b3r7DEV)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_AI-D97757?style=flat&logo=anthropic&logoColor=white)

---

## 🇪🇸 Descripción

**XPL0DAY** es una plataforma web de entrenamiento en ciberseguridad desarrollada como proyecto personal durante el primer curso del CFGS Desarrollo de Aplicaciones Web. Inspirada en HackTheBox, permite a los usuarios registrarse, completar un test de nivel inicial, y acceder a un dashboard con máquinas virtuales, retos y un asistente de IA en tiempo real.

El proyecto nace de la experiencia real del desarrollador en plataformas de pentesting y bug bounty, con el objetivo de aplicar los conocimientos adquiridos en clase a un entorno práctico y real. A diferencia de otras plataformas similares, XPL0DAY incorpora funcionalidades únicas orientadas al aprendizaje guiado y la proyección profesional del usuario.

## 🇺🇸 Description

**XPL0DAY** is a web-based cybersecurity training platform developed as a personal project during the first year of a Web Application Development degree. Inspired by HackTheBox, it allows users to register, complete an initial skill assessment, and access a dashboard featuring virtual machines, challenges, and a real-time AI assistant.

The project is built from the developer's hands-on experience in pentesting platforms and bug bounty hunting, and includes unique features focused on guided learning and professional growth.

---

## 🚀 Funcionalidades actuales / Current Features

- ✅ Landing page con terminal animada y sección "Cómo funciona" / Landing page with animated terminal and "How it works" section
- ✅ Registro de usuarios con validación y medidor de contraseña / User registration with validation and password strength meter
- ✅ Login con gestión de sesión / Login with session management
- ✅ **Test de nivel inicial** — 15 preguntas en 7 categorías que asignan rango automáticamente / Initial skill assessment with automatic rank assignment
- ✅ Dashboard con máquinas activas, consola de actividad y progreso de rango / Dashboard with active machines, activity console and rank progress
- ✅ Página de perfil con estadísticas, badges y progreso de rango / Profile page with stats, badges and rank progress
- ✅ Página de máquinas con grid, filtros por dificultad/SO/estado y buscador en tiempo real / Machines page with grid, filters and real-time search
- ✅ **Enigma** — Asistente de IA flotante universal conectado a Claude API, con animación de robot androide, historial de conversación y hints adaptados al rango del usuario / Universal floating AI assistant powered by Claude API
- ✅ Sistema de logout seguro / Secure logout system
- ✅ Diseño responsive / Responsive design

---

## 💡 Funcionalidades únicas / Unique Features

Estas funcionalidades diferencian XPL0DAY de otras plataformas como HackTheBox:

> **🧠 Test de nivel inicial / Initial skill assessment**  
> Al registrarse, el usuario responde 15 preguntas sobre Redes, Linux, Kali Linux, Windows, Web, Criptografía y Herramientas. El sistema asigna automáticamente un rango (Script Kiddie, Hacker o Elite) y recomienda máquinas adaptadas a su nivel.

> **🤖 Enigma — AI Assistant**  
> Robot androide flotante con animaciones SVG que acompaña al usuario en toda la plataforma. Conectado a Claude AI, da hints progresivos sobre máquinas CTF sin spoilear la solución, adapta sus respuestas al rango del usuario y mantiene historial de conversación. Ninguna plataforma similar tiene algo parecido.

> **📄 Generador de informes de pentest / Pentest report generator** *(en desarrollo)*  
> Al completar una máquina, el usuario podrá generar un informe profesional en PDF. Una herramienta con salida directa al CV.

> **🌐 Perfil público compartible / Shareable public profile** *(en desarrollo)*  
> URL pública con estadísticas y badges para mostrar en LinkedIn o entrevistas.

---

## 🛠️ Tecnologías / Technologies

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 + Variables CSS | Estilos y diseño global |
| JavaScript (Vanilla) | Lógica de negocio y sesión |
| LocalStorage | Persistencia de datos en cliente |
| SVG animado | Robot Enigma y logo |
| Claude AI API | Asistente Enigma en tiempo real |
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
├── test_HTB.html           # Test de nivel inicial / Skill assessment
├── dashboard_HTB.html      # Panel de control / Dashboard
├── profile_HTB.html        # Perfil de usuario / User profile
├── machines_HTB.html       # Página de máquinas / Machines page
├── chatbot_HTB.html        # Chatbot standalone
├── css/
│   ├── global.css          # Variables y estilos globales
│   ├── index_HTB.css
│   ├── login_HTB.css
│   ├── register_HTB.css
│   ├── test_HTB.css
│   ├── dashboard_HTB.css
│   ├── profile_HTB.css
│   └── machines_HTB.css
├── js/
│   ├── script_HTB.js             # Lógica de login
│   ├── register-logic_HTB.js     # Lógica de registro
│   ├── test-logic_HTB.js         # Lógica del test de nivel
│   ├── dashboard-logic_HTB.js    # Lógica del dashboard
│   ├── profile-logic_HTB.js      # Lógica del perfil
│   ├── machines-logic_HTB.js     # Lógica de máquinas
│   └── enigma.js                 # 🤖 Asistente Enigma (universal)
└── assets/
    ├── logo.svg
    └── avatar_R0b3r7DEV.svg
```

---

## 🔄 Flujo de usuario / User flow

```
Landing → Registro → Login → Test de Nivel → Dashboard → Máquinas / Perfil
                                                    ↕
                                             🤖 Enigma (siempre disponible)
```

---

## 🗺️ Roadmap

### v0.1 — Completado ✅
- [x] Landing page, login y registro
- [x] Dashboard con consola de actividad
- [x] Sistema de sesión con LocalStorage

### v0.2 — Completado ✅
- [x] Corrección de variables CSS
- [x] Página de perfil con stats y badges
- [x] Página de máquinas con filtros y buscador
- [x] Sección "Cómo funciona" y footer en landing

### v0.3 — Completado ✅
- [x] Test de nivel inicial con 15 preguntas y 7 categorías
- [x] Rango asignado automáticamente según resultado
- [x] Recomendaciones de máquinas personalizadas
- [x] Flujo correcto: Registro → Login → Test → Dashboard
- [x] **Enigma** — robot androide flotante con Claude AI integrado
- [x] Historial de conversación y hints adaptados al rango

### v0.4 — Próximamente / Coming soon
- [ ] Página de Retos / Challenges page
- [ ] Dashboard con datos dinámicos del usuario
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

🇪🇸 Este proyecto es únicamente con fines educativos. No almacena datos reales ni está conectado a ningún servidor propio. Las contraseñas se guardan en LocalStorage sin cifrar, algo que se corregirá en versiones futuras con implementación de backend real.

🇺🇸 This project is for educational purposes only. It does not store real data or connect to any own server. Passwords are stored unencrypted in LocalStorage, which will be addressed in future versions with a real backend implementation.
