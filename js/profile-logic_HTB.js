document.addEventListener('DOMContentLoaded', () => {

    // --- GESTIÓN DE SESIÓN ---
    const activeUserJSON = localStorage.getItem('xpl0day_active_user');

    if (!activeUserJSON) {
        alert("ACCESO DENEGADO. Debes iniciar sesión primero.");
        window.location.href = "login_HTB.html";
        return;
    }

    const user = JSON.parse(activeUserJSON);

    // --- RELLENAR DATOS DEL USUARIO ---
    const initials = user.username.substring(0, 2).toUpperCase();

    // Sidebar
    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('sidebarUsername').textContent = user.username;
    document.getElementById('sidebarRank').textContent = user.rank;

    // Header
    document.getElementById('headerPoints').textContent = user.points || 0;

    // Hero del perfil
    document.getElementById('profileAvatar').textContent = initials;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileRank').textContent = user.rank;
    document.getElementById('quickPoints').textContent = user.points || 0;

    // Fecha de registro simulada
    document.getElementById('profileJoined').textContent = "Febrero 2025";

    // --- CALCULAR PROGRESO DE RANGO ---
    const points = user.points || 0;
    const ranks = [
        { name: "Script Kiddie", min: 0,   max: 100  },
        { name: "Hacker",        min: 100,  max: 500  },
        { name: "Pro Hacker",    min: 500,  max: 1500 },
        { name: "Elite",         min: 1500, max: 9999 }
    ];

    let currentRank = ranks[0];
    let nextRank = ranks[1];

    for (let i = 0; i < ranks.length; i++) {
        if (points >= ranks[i].min) {
            currentRank = ranks[i];
            nextRank = ranks[i + 1] || null;
        }
    }

    const progressPercent = nextRank
        ? Math.min(((points - currentRank.min) / (nextRank.min - currentRank.min)) * 100, 100)
        : 100;

    const pointsLeft = nextRank ? nextRank.min - points : 0;

    document.getElementById('progressBar').style.width = progressPercent + '%';
    document.getElementById('pointsLeft').textContent = pointsLeft;
    document.getElementById('progressLabel').innerHTML = 
        `${points} / ${nextRank ? nextRank.min : '—'} puntos para <strong>${nextRank ? nextRank.name : 'Rango Máximo'}</strong>`;

    // Estadísticas
    document.getElementById('statPoints').textContent = points;
    document.getElementById('statRank').textContent = user.rank;

    // --- LOGOUT ---
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("¿Estás seguro de que deseas cerrar la conexión segura?")) {
            localStorage.removeItem('xpl0day_active_user');
            window.location.href = "login_HTB.html";
        }
    });
});
