document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm_password');
    const strengthBar = document.getElementById('strengthBar');
    const registerForm = document.getElementById('registerForm');
    
    // Lógica visual del medidor de contraseña (se mantiene igual)
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let strength = 0;
        if (val.length > 0) strength += 25;
        if (val.length >= 8) strength += 25;
        if (val.match(/[A-Z]/) && val.match(/[0-9]/)) strength += 25;
        if (val.match(/[^a-zA-Z\d]/)) strength += 25;

        strengthBar.style.width = strength + '%';
        if (strength <= 25) strengthBar.style.backgroundColor = 'var(--error)';
        else if (strength <= 50) strengthBar.style.backgroundColor = 'var(--warning)';
        else strengthBar.style.backgroundColor = 'var(--primary)';
    });

    // LÓGICA DE REGISTRO CON LOCALSTORAGE
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;

        // 1. Validar contraseñas
        if (password !== confirmInput.value) {
            alert("[ERROR]: Las contraseñas no coinciden.");
            return;
        }

        // 2. Traer los usuarios que ya existan en la "base de datos" del navegador
        // Si no hay ninguno, creamos un array vacío []
        let users = JSON.parse(localStorage.getItem('xpl0day_users')) || [];

        // 3. Comprobar si el usuario o email ya existen
        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            alert("[ERROR]: El nombre de usuario o email ya están registrados en el sistema.");
            return;
        }

        // 4. Crear el nuevo "Recluta"
        const newUser = {
            username: username,
            email: email,
            password: password, // En un sistema real esto iría encriptado (hash)
            rank: 'Script Kiddie',
            points: 0
        };

        // 5. Añadirlo a la lista y guardarlo en el navegador
        users.push(newUser);
        localStorage.setItem('xpl0day_users', JSON.stringify(users));

        // 6. Efectos visuales de éxito
        const btn = document.querySelector('.register-btn');
        btn.disabled = true;
        btn.innerText = "GENERANDO CLAVES SSH...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            btn.innerText = "CUENTA CREADA";
            btn.style.backgroundColor = "var(--primary-dark)";
            
            setTimeout(() => {
                alert(`¡Bienvenido a la red, ${username}! Ahora inicia sesión.`);
                // Redirigir a la página de login
                window.location.href = "login_HTB.html"; 
            }, 800);
        }, 1500);
    });
});