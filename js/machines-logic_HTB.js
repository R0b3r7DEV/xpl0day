document.addEventListener('DOMContentLoaded', () => {

    // --- SESIÓN ---
    const activeUserJSON = localStorage.getItem('xpl0day_active_user');
    if (!activeUserJSON) {
        alert("ACCESO DENEGADO. Debes iniciar sesión primero.");
        window.location.href = "login_HTB.html";
        return;
    }
    const user = JSON.parse(activeUserJSON);
    const initials = user.username.substring(0, 2).toUpperCase();
    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('sidebarUsername').textContent = user.username;
    document.getElementById('sidebarRank').textContent = user.rank;

    // --- DATOS DE MÁQUINAS ---
    const machines = [
        { id: 1,  name: "Inception",   os: "linux",   diff: "easy",   status: "active",    points: 20,  ip: "10.10.11.5"  },
        { id: 2,  name: "X-Vault",     os: "linux",   diff: "medium", status: "active",    points: 30,  ip: "10.10.11.8"  },
        { id: 3,  name: "BlackHole",   os: "linux",   diff: "hard",   status: "active",    points: 50,  ip: "10.10.11.12" },
        { id: 4,  name: "NullByte",    os: "linux",   diff: "easy",   status: "retired",   points: 20,  ip: "10.10.11.15" },
        { id: 5,  name: "Phantom",     os: "windows", diff: "medium", status: "active",    points: 30,  ip: "10.10.11.20" },
        { id: 6,  name: "ZeroDay",     os: "windows", diff: "insane", status: "active",    points: 100, ip: "10.10.11.25" },
        { id: 7,  name: "RootKit",     os: "linux",   diff: "hard",   status: "retired",   points: 50,  ip: "10.10.11.30" },
        { id: 8,  name: "Mirage",      os: "windows", diff: "easy",   status: "active",    points: 20,  ip: "10.10.11.35" },
        { id: 9,  name: "Spectre",     os: "linux",   diff: "insane", status: "active",    points: 100, ip: "10.10.11.40" },
        { id: 10, name: "Shellshock",  os: "linux",   diff: "medium", status: "completed", points: 30,  ip: "10.10.11.45" },
        { id: 11, name: "CryptoBox",   os: "windows", diff: "hard",   status: "active",    points: 50,  ip: "10.10.11.50" },
        { id: 12, name: "GhostWire",   os: "linux",   diff: "easy",   status: "completed", points: 20,  ip: "10.10.11.55" },
    ];

    // --- ESTADO DE FILTROS ---
    let activeFilters = { diff: 'all', os: 'all', status: 'all', search: '' };

    // --- RENDER ---
    function renderMachines() {
        const grid = document.getElementById('machinesGrid');
        const noResults = document.getElementById('noResults');

        const filtered = machines.filter(m => {
            const matchDiff   = activeFilters.diff   === 'all' || m.diff   === activeFilters.diff;
            const matchOS     = activeFilters.os     === 'all' || m.os     === activeFilters.os;
            const matchStatus = activeFilters.status === 'all' || m.status === activeFilters.status;
            const matchSearch = m.name.toLowerCase().includes(activeFilters.search.toLowerCase());
            return matchDiff && matchOS && matchStatus && matchSearch;
        });

        grid.innerHTML = '';

        if (filtered.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        filtered.forEach(m => {
            const osIcon = m.os === 'linux' ? '🐧' : '🪟';
            const isCompleted = m.status === 'completed';
            const isRetired = m.status === 'retired';

            const diffLabels = { easy: 'Fácil', medium: 'Media', hard: 'Difícil', insane: 'Insane' };
            const statusLabels = { active: 'Activa', retired: 'Retirada', completed: 'Completada' };

            const card = document.createElement('div');
            card.className = `machine-card ${isCompleted ? 'completed' : ''} ${isRetired ? 'retired' : ''}`;

            card.innerHTML = `
                <div class="card-banner banner-${m.diff}"></div>
                ${isCompleted ? '<div class="completed-stamp">✔</div>' : ''}
                <div class="card-body">
                    <div class="card-header">
                        <span class="machine-name">${m.name}</span>
                        <span class="machine-os">${osIcon}</span>
                    </div>
                    <div class="card-badges">
                        <span class="badge-diff badge-${m.diff}">${diffLabels[m.diff]}</span>
                        <span class="badge-status status-${m.status}">${statusLabels[m.status]}</span>
                    </div>
                    <div class="card-info">
                        <div>
                            <p class="machine-points">+${m.points} pts</p>
                            <p class="machine-ip">${m.ip}</p>
                        </div>
                        <button class="btn-hack" ${isCompleted || isRetired ? 'disabled' : ''} data-id="${m.id}" data-name="${m.name}" data-ip="${m.ip}">
                            ${isCompleted ? 'PWNED' : isRetired ? 'RETIRADA' : 'HACK'}
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Botones HACK
        document.querySelectorAll('.btn-hack:not(:disabled)').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                const ip = btn.dataset.ip;
                btn.textContent = 'INICIANDO...';
                btn.disabled = true;
                setTimeout(() => {
                    alert(`Instancia de '${name}' iniciada.\nTu objetivo: ${ip}`);
                    btn.textContent = 'ACTIVE';
                    btn.style.background = 'var(--primary)';
                    btn.style.color = '#000';
                }, 1500);
            });
        });

        // Actualizar contador
        const completed = machines.filter(m => m.status === 'completed').length;
        document.getElementById('completedCount').textContent = completed;
    }

    // --- FILTROS DE DIFICULTAD ---
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.diff = btn.dataset.filter;
            renderMachines();
        });
    });

    // --- FILTROS DE SO ---
    document.querySelectorAll('[data-os]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-os]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.os = btn.dataset.os;
            renderMachines();
        });
    });

    // --- FILTROS DE ESTADO ---
    document.querySelectorAll('[data-status]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-status]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.status = btn.dataset.status;
            renderMachines();
        });
    });

    // --- BUSCADOR ---
    document.getElementById('searchInput').addEventListener('input', (e) => {
        activeFilters.search = e.target.value;
        renderMachines();
    });

    // --- LOGOUT ---
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("¿Cerrar la conexión segura?")) {
            localStorage.removeItem('xpl0day_active_user');
            window.location.href = "login_HTB.html";
        }
    });

    // --- RENDER INICIAL ---
    renderMachines();
});
