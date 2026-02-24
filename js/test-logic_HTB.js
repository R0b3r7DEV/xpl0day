document.addEventListener('DOMContentLoaded', () => {

    // --- PREGUNTAS ---
    const questions = [
        {
            category: "REDES",
            text: "¿Cuál es el rango de puertos bien conocidos (Well-Known Ports)?",
            options: ["0 - 1023", "1024 - 49151", "0 - 65535", "8000 - 9000"],
            correct: 0
        },
        {
            category: "REDES",
            text: "¿Qué protocolo usa el comando ping para comprobar conectividad?",
            options: ["TCP", "UDP", "ICMP", "ARP"],
            correct: 2
        },
        {
            category: "LINUX",
            text: "¿Qué comando de Linux muestra los procesos en ejecución con sus conexiones de red?",
            options: ["ps aux", "netstat -tulnp", "ls -la", "chmod 777"],
            correct: 1
        },
        {
            category: "LINUX",
            text: "¿Qué hace el comando 'chmod 777 archivo.sh' en Linux?",
            options: [
                "Elimina el archivo",
                "Da permisos de lectura, escritura y ejecución a todos los usuarios",
                "Cambia el propietario del archivo",
                "Encripta el archivo"
            ],
            correct: 1
        },
        {
            category: "KALI LINUX",
            text: "¿Cuál de estas herramientas viene preinstalada en Kali Linux y se usa para análisis de paquetes?",
            options: ["Photoshop", "Wireshark", "VLC", "LibreOffice"],
            correct: 1
        },
        {
            category: "KALI LINUX",
            text: "¿Qué comando de Kali Linux se usa para buscar exploits en la base de datos de Exploit-DB?",
            options: ["searchsploit", "find-exploit", "metasearch", "kali-search"],
            correct: 0
        },
        {
            category: "WINDOWS",
            text: "¿Qué comando de Windows muestra las conexiones de red activas y los puertos en escucha?",
            options: ["ipconfig /all", "netstat -ano", "tasklist", "systeminfo"],
            correct: 1
        },
        {
            category: "WINDOWS",
            text: "¿Dónde se almacenan los hashes de contraseñas de usuarios locales en Windows?",
            options: ["C:\\Windows\\passwords.txt", "El registro de Windows (SAM)", "C:\\Users\\hashes", "Active Directory"],
            correct: 1
        },
        {
            category: "WEB",
            text: "¿Qué cabecera HTTP indica el tipo de contenido que envía el servidor?",
            options: ["Accept", "Authorization", "Content-Type", "Host"],
            correct: 2
        },
        {
            category: "WEB",
            text: "¿Qué tipo de ataque consiste en inyectar código SQL malicioso en un formulario web?",
            options: ["XSS", "CSRF", "SQL Injection", "Path Traversal"],
            correct: 2
        },
        {
            category: "WEB",
            text: "¿Qué significa que una cookie tenga el flag 'HttpOnly'?",
            options: [
                "Solo funciona con HTTPS",
                "No puede ser accedida desde JavaScript",
                "Expira al cerrar el navegador",
                "Solo se envía en peticiones GET"
            ],
            correct: 1
        },
        {
            category: "CRIPTOGRAFÍA",
            text: "¿Cuál de estos es un algoritmo de hashing y NO de cifrado?",
            options: ["AES", "RSA", "SHA-256", "DES"],
            correct: 2
        },
        {
            category: "CRIPTOGRAFÍA",
            text: "¿Qué diferencia hay entre cifrado simétrico y asimétrico?",
            options: [
                "El simétrico usa la misma clave para cifrar y descifrar; el asimétrico usa clave pública y privada",
                "El simétrico es más seguro siempre",
                "El asimétrico usa la misma clave",
                "No hay diferencia práctica"
            ],
            correct: 0
        },
        {
            category: "HERRAMIENTAS",
            text: "¿Qué hace el comando 'nmap -sV -sC 10.10.11.5'?",
            options: [
                "Hace un ping al host",
                "Detecta versiones de servicios y ejecuta scripts por defecto",
                "Escanea solo el puerto 80",
                "Lanza un exploit automáticamente"
            ],
            correct: 1
        },
        {
            category: "HERRAMIENTAS",
            text: "¿Para qué se usa principalmente Burp Suite en pentesting web?",
            options: [
                "Para escanear puertos abiertos",
                "Para crackear contraseñas",
                "Para interceptar y modificar peticiones HTTP",
                "Para generar diccionarios de palabras"
            ],
            correct: 2
        }
    ];

    // --- RECOMENDACIONES POR NIVEL ---
    const recommendations = {
        scriptKiddie: [
            { name: "Inception",  diff: "easy",   label: "Fácil"   },
            { name: "GhostWire",  diff: "easy",   label: "Fácil"   },
            { name: "Mirage",     diff: "easy",   label: "Fácil"   },
        ],
        hacker: [
            { name: "X-Vault",    diff: "medium", label: "Media"   },
            { name: "Phantom",    diff: "medium", label: "Media"   },
            { name: "Shellshock", diff: "medium", label: "Media"   },
        ],
        elite: [
            { name: "BlackHole",  diff: "hard",   label: "Difícil" },
            { name: "ZeroDay",    diff: "hard",   label: "Difícil" },
            { name: "Spectre",    diff: "hard",   label: "Difícil" },
        ]
    };

    // --- ESTADO ---
    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    // --- ELEMENTOS ---
    const screenIntro  = document.getElementById('screenIntro');
    const screenTest   = document.getElementById('screenTest');
    const screenResult = document.getElementById('screenResult');

    // --- INICIAR TEST ---
    document.getElementById('btnStart').addEventListener('click', () => {
        screenIntro.classList.remove('active');
        screenTest.classList.add('active');
        renderQuestion();
    });

    // --- RENDER PREGUNTA ---
    function renderQuestion() {
        const q = questions[currentQuestion];
        answered = false;

        document.getElementById('questionCategory').textContent = q.category;
        document.getElementById('questionCounter').textContent = `${currentQuestion + 1} / ${questions.length}`;
        document.getElementById('questionText').textContent = q.text;
        document.getElementById('progressFill').style.width = `${((currentQuestion) / questions.length) * 100}%`;

        const grid = document.getElementById('optionsGrid');
        grid.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-letter">${letters[index]}</span> ${opt}`;

            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                // Marcar todas
                grid.querySelectorAll('.option-btn').forEach((b, i) => {
                    b.disabled = true;
                    if (i === q.correct) b.classList.add('correct');
                    else if (b === btn) b.classList.add('wrong');
                });

                if (index === q.correct) score++;

                // Siguiente pregunta tras un momento
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        renderQuestion();
                    } else {
                        showResult();
                    }
                }, 900);
            });

            grid.appendChild(btn);
        });
    }

    // --- MOSTRAR RESULTADO ---
    function showResult() {
        screenTest.classList.remove('active');
        screenResult.classList.add('active');

        document.getElementById('progressFill').style.width = '100%';

        const percent = Math.round((score / questions.length) * 100);

        // Determinar nivel
        let level, levelKey, desc, avatarText;

        if (percent >= 80) {
            level = "ELITE";
            levelKey = "elite";
            avatarText = "EL";
            desc = "Tienes conocimientos avanzados de ciberseguridad. Estás listo para máquinas difíciles y retos complejos. Tu perfil encaja con roles de pentester o red team.";
        } else if (percent >= 50) {
            level = "HACKER";
            levelKey = "hacker";
            avatarText = "HK";
            desc = "Tienes una base sólida. Conoces los conceptos fundamentales y estás listo para máquinas de dificultad media. Sigue practicando para alcanzar el nivel Elite.";
        } else {
            level = "SCRIPT KIDDIE";
            levelKey = "scriptKiddie";
            avatarText = "SK";
            desc = "Estás empezando tu camino en la ciberseguridad. No te preocupes, todos empezamos aquí. Comienza con máquinas fáciles y los módulos de Academia para construir tu base.";
        }

        document.getElementById('resultAvatar').textContent = avatarText;
        document.getElementById('resultTitle').textContent = level;
        document.getElementById('resultScore').textContent = `Has respondido correctamente ${score} de ${questions.length} preguntas`;
        document.getElementById('resultDesc').textContent = desc;
        document.getElementById('statCorrect').textContent = score;
        document.getElementById('statPercent').textContent = percent + '%';
        document.getElementById('statLevel').textContent = level.split(' ')[0];

        // Recomendaciones
        const recList = document.getElementById('recList');
        recList.innerHTML = '';
        recommendations[levelKey].forEach(r => {
            const item = document.createElement('div');
            item.className = 'rec-item';
            item.innerHTML = `
                <span class="rec-name">⚙ ${r.name}</span>
                <span class="rec-diff rec-${r.diff}">${r.label}</span>
            `;
            recList.appendChild(item);
        });

        // Guardar nivel en localStorage
        const activeUserJSON = localStorage.getItem('xpl0day_active_user');
        if (activeUserJSON) {
            const user = JSON.parse(activeUserJSON);
            user.rank = level === "SCRIPT KIDDIE" ? "Script Kiddie" : level === "HACKER" ? "Hacker" : "Elite";
            user.testCompleted = true;
            user.testScore = score;
            localStorage.setItem('xpl0day_active_user', JSON.stringify(user));
        }
    }

    // --- IR AL DASHBOARD ---
    document.getElementById('btnDashboard').addEventListener('click', () => {
        window.location.href = 'dashboard_HTB.html';
    });
});
