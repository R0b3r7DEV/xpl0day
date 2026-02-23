document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTIÓN DE LA SESIÓN DEL USUARIO ---
    
    // Recuperamos el usuario activo que guardamos en el login
    const activeUserJSON = localStorage.getItem('xpl0day_active_user');
    
    // Si no hay usuario activo, significa que alguien intentó entrar directamente
    // poniendo "dashboard.html" en la URL sin loguearse. ¡Lo echamos!
    if (!activeUserJSON) {
        alert("ACCESO DENEGADO. Debes iniciar sesión primero.");
        window.location.href = "login_HTB.html";
        return; // Detenemos la ejecución del resto del código
    }

    // Convertimos el texto JSON de vuelta a un objeto JavaScript
    const activeUser = JSON.parse(activeUserJSON);

    // Actualizamos la interfaz (UI) con los datos del usuario real
    document.querySelector('.username').textContent = activeUser.username;
    document.querySelector('.rank').textContent = activeUser.rank;
    
    // Actualizamos las iniciales en el avatar (ej: si es "neo_hax", pone "NE")
    const initial = activeUser.username.substring(0, 2).toUpperCase();
    document.querySelector('.avatar').textContent = initial;

    // Actualizamos los puntos en la parte superior derecha
    // (Asumimos que el HTML tiene un span dentro de .mini-stat para los puntos)
    const pointsElement = document.querySelectorAll('.mini-stat span')[0];
    if (pointsElement) {
        pointsElement.textContent = activeUser.points || 0;
    }


    // --- 2. LÓGICA DE LAS MÁQUINAS (BOTÓN HACK) ---

    const terminalMini = document.querySelector('.terminal-mini');

    document.querySelectorAll('.btn-pwn').forEach(button => {
        button.addEventListener('click', function() {
            // Buscamos la fila (tr) a la que pertenece el botón
            const row = this.closest('tr');
            // Sacamos el nombre de la máquina (primera celda)
            const machineName = row.cells[0].innerText;
            // Sacamos los puntos que da la máquina (tercera celda)
            const machinePoints = parseInt(row.cells[2].innerText);
            
            // Si el botón ya está activo, no hacemos nada
            if (this.innerText === "ACTIVE" || this.innerText === "STARTING...") return;

            // Efecto visual al hacer clic
            this.innerText = "STARTING...";
            this.style.borderColor = "var(--text-gray)";
            this.style.color = "var(--text-gray)";

            // Añadir log a la mini-consola del Dashboard
            agregarLogTerminal(`[SYS] Iniciando entorno para: ${machineName}...`);
            
            setTimeout(() => {
                const ipAsignada = `10.10.11.${Math.floor(Math.random() * 254) + 1}`;
                
                // Mostrar alerta de éxito
                alert(`Instancia de la máquina '${machineName}' iniciada.\nTu objetivo está en: ${ipAsignada}`);
                
                // Cambiar el botón a verde (Activo)
                this.innerText = "ACTIVE";
                this.style.backgroundColor = "var(--primary)";
                this.style.borderColor = "var(--primary)";
                this.style.color = "#000";

                // Añadir log de éxito
                agregarLogTerminal(`[OK] ${machineName} levantada en ${ipAsignada}`);
                
                // [OPCIONAL] Aquí podríamos sumar puntos al usuario temporalmente
                // activeUser.points += machinePoints;
                // pointsElement.textContent = activeUser.points;
                // localStorage.setItem('xpl0day_active_user', JSON.stringify(activeUser));

            }, 1500);
        });
    });

    // Función auxiliar para añadir texto a la mini-consola
    function agregarLogTerminal(mensaje) {
        if (!terminalMini) return;
        
        // Creamos un nuevo párrafo
        const nuevoLog = document.createElement('p');
        // Obtenemos la hora actual en formato HH:MM
        const ahora = new Date();
        const hora = ahora.getHours().toString().padStart(2, '0') + ':' + ahora.getMinutes().toString().padStart(2, '0');
        
        nuevoLog.textContent = `[${hora}] ${mensaje}`;
        
        // Buscamos el cursor parpadeante (el último elemento de la terminal)
        const cursor = terminalMini.querySelector('.blink');
        
        // Insertamos el nuevo log justo antes del cursor
        if (cursor) {
            terminalMini.insertBefore(nuevoLog, cursor);
        } else {
            terminalMini.appendChild(nuevoLog);
        }
        
        // Hacemos scroll hacia abajo para ver el último log
        terminalMini.scrollTop = terminalMini.scrollHeight;
    }

    // --- 3. LÓGICA DE CERRAR SESIÓN (LOGOUT) ---
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace recargue la página bruscamente

            // Mensaje de confirmación (estilo sistema operativo)
            const confirmar = confirm("¿Estás seguro de que deseas cerrar la conexión segura?");
            
            if (confirmar) {
                // 1. Borramos ÚNICAMENTE el usuario activo de la sesión
                localStorage.removeItem('xpl0day_active_user');
                
                // ¡OJO! No uses localStorage.clear() porque eso borraría también la lista 
                // de todos los usuarios registrados (xpl0day_users).

                // 2. Redirigimos de vuelta a tu página de login
                window.location.href = "login_HTB.html"; 
            }
        });
    }
});