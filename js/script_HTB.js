document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputUsername = document.getElementById('username').value.trim();
        const inputPassword = document.getElementById('password').value;
        const btn = document.querySelector('.login-btn');
        const subtitle = document.querySelector('.subtitle');

        // 1. Traer los usuarios de la base de datos del navegador
        let users = JSON.parse(localStorage.getItem('xpl0day_users')) || [];

        // 2. Buscar si las credenciales coinciden
        const validUser = users.find(u => u.username === inputUsername && u.password === inputPassword);

        if (validUser) {
            // LOGIN EXITOSO - Simulamos la conexión
            btn.disabled = true;
            btn.innerText = "AUTHENTICATING...";
            btn.style.opacity = "0.7";
            btn.style.cursor = "not-allowed";

            const messages = [
                "Verificando credenciales...",
                "Cifrando túnel SSH (AES-256)...",
                "Estableciendo conexión segura..."
            ];

            let i = 0;
            subtitle.style.color = "var(--primary)";
            
            const interval = setInterval(() => {
                if (i < messages.length) {
                    subtitle.innerText = `[LOG]: ${messages[i]}`;
                    i++;
                } else {
                    clearInterval(interval);
                    subtitle.innerText = "¡ACCESO CONCEDIDO!";
                    
                    // Guardamos quién es el usuario activo (sesión)
                    localStorage.setItem('xpl0day_active_user', JSON.stringify(validUser));

                    setTimeout(() => {
                        if (!validUser.testCompleted) {
                            window.location.href = "test_HTB.html";
                        } else {
                            window.location.href = "dashboard_HTB.html";
                        }
                    }, 800);
                }
            }, 600);

        } else {
            // LOGIN FALLIDO
            subtitle.innerText = "[ERROR]: Credenciales inválidas o cuenta no existente.";
            subtitle.style.color = "var(--error)";
            
            // Efecto visual de error en los inputs
            document.querySelectorAll('.input-wrapper').forEach(wrapper => {
                wrapper.style.borderColor = "var(--error)";
                setTimeout(() => wrapper.style.borderColor = "var(--border-color)", 2000);
            });
        }
    });
});