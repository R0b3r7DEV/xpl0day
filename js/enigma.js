(function() {

// ============================================
//  ENIGMA — XPL0DAY AI Assistant
//  Componente flotante universal
//  Uso: <script src="js/enigma.js"></script>
// ============================================

const ENIGMA_SYSTEM_PROMPT = `Eres Enigma, el asistente de IA de XPL0DAY, una plataforma de entrenamiento en ciberseguridad.
Tienes personalidad: eres misterioso, directo y técnico, con un toque de humor hacker.
Ayudas con pentesting, CTFs, herramientas de seguridad y conceptos de ciberseguridad.
Nunca das soluciones completas a máquinas CTF, solo hints progresivos.
Responde siempre en español, de forma concisa. Máximo 3 párrafos por respuesta.
Usa \`código\` para comandos. Empieza tus respuestas de forma variada, nunca siempre igual.`;

// --- ESTILOS ---
const style = document.createElement('style');
style.textContent = `
  #enigma-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    font-family: 'Ubuntu', 'Ubuntu Mono', monospace;
    user-select: none;
  }

  /* ROBOT SVG CONTAINER */
  #enigma-robot {
    width: 70px;
    height: 70px;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 0 12px rgba(159,239,0,0.4));
    animation: enigmaFloat 3s ease-in-out infinite;
  }

  #enigma-robot:hover {
    transform: scale(1.1) translateY(-4px);
    filter: drop-shadow(0 0 20px rgba(159,239,0,0.7));
  }

  @keyframes enigmaFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  /* BADGE DE NOTIFICACIÓN */
  #enigma-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    background: #ff5f56;
    border-radius: 50%;
    border: 2px solid #050d0a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: white;
    font-weight: bold;
    animation: badgePulse 2s infinite;
  }

  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.2); }
  }

  /* TOOLTIP */
  #enigma-tooltip {
    position: absolute;
    bottom: 80px;
    right: 0;
    background: #111927;
    border: 1px solid #9fef00;
    border-radius: 8px 8px 0 8px;
    padding: 10px 14px;
    font-size: 0.78rem;
    color: #a4b1cd;
    white-space: nowrap;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    animation: tooltipIn 0.3s ease;
    max-width: 220px;
    white-space: normal;
    line-height: 1.4;
  }

  #enigma-tooltip::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    border: 4px solid transparent;
    border-top-color: #9fef00;
  }

  #enigma-tooltip strong { color: #9fef00; }

  @keyframes tooltipIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* CHAT PANEL */
  #enigma-panel {
    position: absolute;
    bottom: 85px;
    right: 0;
    width: 360px;
    height: 480px;
    background: #0d1117;
    border: 1px solid #9fef00;
    border-radius: 12px 12px 0 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(159,239,0,0.1);
    animation: panelIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes panelIn {
    from { opacity: 0; transform: scale(0.8) translateY(20px); transform-origin: bottom right; }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* PANEL HEADER */
  #enigma-panel-header {
    background: #060a11;
    border-bottom: 1px solid #1e293b;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .enigma-header-avatar {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .enigma-header-info { flex-grow: 1; }

  .enigma-header-name {
    font-size: 0.85rem;
    font-weight: bold;
    color: #9fef00;
    letter-spacing: 1px;
  }

  .enigma-header-status {
    font-size: 0.68rem;
    color: #a4b1cd;
    font-family: 'Ubuntu Mono', monospace;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .enigma-status-dot {
    width: 6px;
    height: 6px;
    background: #9fef00;
    border-radius: 50%;
    animation: statusPulse 2s infinite;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  #enigma-close {
    background: transparent;
    border: none;
    color: #a4b1cd;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: 0.2s;
    line-height: 1;
  }

  #enigma-close:hover { background: rgba(255,95,86,0.15); color: #ff5f56; }

  /* MENSAJES */
  #enigma-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scrollbar-width: thin;
    scrollbar-color: #1e293b transparent;
  }

  .enigma-msg {
    display: flex;
    gap: 8px;
    animation: msgIn 0.25s ease;
    max-width: 90%;
  }

  @keyframes msgIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .enigma-msg.user { align-self: flex-end; flex-direction: row-reverse; }
  .enigma-msg.bot  { align-self: flex-start; }

  .enigma-msg-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: bold;
    flex-shrink: 0;
    font-family: 'Ubuntu Mono', monospace;
  }

  .enigma-msg.bot  .enigma-msg-avatar { background: #9fef00; color: #000; }
  .enigma-msg.user .enigma-msg-avatar { background: #1e293b; color: #9fef00; border: 1px solid #1e293b; font-size: 0.55rem; }

  .enigma-msg-bubble {
    padding: 9px 13px;
    border-radius: 8px;
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .enigma-msg.bot .enigma-msg-bubble {
    background: #111927;
    border: 1px solid #1e293b;
    color: #e2e8f0;
    border-radius: 0 8px 8px 8px;
  }

  .enigma-msg.user .enigma-msg-bubble {
    background: rgba(159,239,0,0.08);
    border: 1px solid rgba(159,239,0,0.2);
    color: #e2e8f0;
    border-radius: 8px 0 8px 8px;
  }

  .enigma-msg-bubble code {
    background: #060a11;
    color: #9fef00;
    padding: 1px 5px;
    border-radius: 3px;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.8em;
  }

  /* TYPING */
  .enigma-typing {
    display: flex;
    gap: 4px;
    padding: 10px 13px;
    align-items: center;
  }

  .enigma-typing-dot {
    width: 6px;
    height: 6px;
    background: #9fef00;
    border-radius: 50%;
    animation: enigmaTyping 1.2s infinite;
  }

  .enigma-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .enigma-typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes enigmaTyping {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
    40%            { transform: scale(1); opacity: 1; }
  }

  /* SUGERENCIAS */
  #enigma-suggestions {
    padding: 8px 12px;
    border-top: 1px solid #1e293b;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    background: #060a11;
    flex-shrink: 0;
  }

  .enigma-sug {
    background: transparent;
    border: 1px solid #1e293b;
    color: #a4b1cd;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.68rem;
    font-family: 'Ubuntu Mono', monospace;
    cursor: pointer;
    transition: 0.2s;
  }

  .enigma-sug:hover { border-color: #9fef00; color: #9fef00; }

  /* INPUT */
  #enigma-input-area {
    padding: 10px 12px;
    border-top: 1px solid #1e293b;
    display: flex;
    gap: 8px;
    align-items: center;
    background: #060a11;
    flex-shrink: 0;
  }

  #enigma-input-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;
    background: #0a0f1a;
    border: 1px solid #1e293b;
    border-radius: 4px;
    padding: 0 10px;
    transition: 0.3s;
  }

  #enigma-input-wrap:focus-within {
    border-color: #9fef00;
    box-shadow: 0 0 6px rgba(159,239,0,0.15);
  }

  #enigma-input-wrap span {
    color: #9fef00;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.85rem;
    margin-right: 6px;
  }

  #enigma-input {
    flex-grow: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e2e8f0;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.82rem;
    padding: 9px 0;
  }

  #enigma-input::placeholder { color: #4a5568; }

  #enigma-send {
    background: #9fef00;
    color: #000;
    border: none;
    padding: 9px 14px;
    border-radius: 4px;
    font-weight: bold;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.75rem;
    cursor: pointer;
    transition: 0.2s;
    flex-shrink: 0;
  }

  #enigma-send:hover { background: #7ac200; }
  #enigma-send:disabled { opacity: 0.4; cursor: not-allowed; }

  @media (max-width: 480px) {
    #enigma-panel { width: calc(100vw - 40px); right: -15px; }
    #enigma-widget { right: 20px; bottom: 20px; }
  }
`;
document.head.appendChild(style);

// --- SVG ROBOT ENIGMA ---
const robotSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" id="enigma-robot-svg">
  <defs>
    <filter id="enigmaGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1a2f1a"/>
      <stop offset="100%" stop-color="#050d05"/>
    </radialGradient>
  </defs>

  <!-- ANTENA -->
  <line x1="50" y1="8" x2="50" y2="18" stroke="#9fef00" stroke-width="2" filter="url(#enigmaGlow)"/>
  <circle cx="50" cy="6" r="3" fill="#9fef00" filter="url(#enigmaGlow)">
    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
  </circle>

  <!-- CABEZA -->
  <rect x="25" y="18" width="50" height="38" rx="8" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1.5" filter="url(#enigmaGlow)"/>

  <!-- OJOS -->
  <rect id="enigma-eye-left" x="33" y="28" width="13" height="10" rx="3" fill="#9fef00" opacity="0.9" filter="url(#enigmaGlow)">
    <animate attributeName="scaleY" values="1;0.1;1" dur="4s" repeatCount="indefinite" begin="2s"/>
  </rect>
  <rect id="enigma-eye-right" x="54" y="28" width="13" height="10" rx="3" fill="#9fef00" opacity="0.9" filter="url(#enigmaGlow)">
    <animate attributeName="scaleY" values="1;0.1;1" dur="4s" repeatCount="indefinite" begin="2s"/>
  </rect>

  <!-- BOCA / DISPLAY -->
  <rect x="32" y="44" width="36" height="7" rx="3" fill="#060a11" stroke="#9fef00" stroke-width="0.8"/>
  <rect x="34" y="46" width="8" height="3" rx="1" fill="#9fef00" opacity="0.7">
    <animate attributeName="width" values="8;20;8" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- CUELLO -->
  <rect x="44" y="56" width="12" height="7" rx="2" fill="#0a1a0f" stroke="#9fef00" stroke-width="1"/>

  <!-- CUERPO -->
  <rect x="20" y="63" width="60" height="30" rx="8" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1.5" filter="url(#enigmaGlow)"/>

  <!-- DETALLES CUERPO -->
  <rect x="30" y="70" width="18" height="10" rx="3" fill="#060a11" stroke="#9fef00" stroke-width="0.8"/>
  <circle cx="39" cy="75" r="3" fill="#9fef00" opacity="0.8" filter="url(#enigmaGlow)">
    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite"/>
  </circle>

  <rect x="52" y="70" width="18" height="4" rx="2" fill="#9fef00" opacity="0.3"/>
  <rect x="52" y="76" width="12" height="4" rx="2" fill="#9fef00" opacity="0.2"/>

  <!-- BRAZOS -->
  <rect x="6" y="65" width="12" height="22" rx="5" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1.2">
    <animateTransform attributeName="transform" type="rotate" values="0 12 76;5 12 76;0 12 76;-5 12 76;0 12 76" dur="3s" repeatCount="indefinite"/>
  </rect>
  <rect x="82" y="65" width="12" height="22" rx="5" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1.2">
    <animateTransform attributeName="transform" type="rotate" values="0 88 76;-5 88 76;0 88 76;5 88 76;0 88 76" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- PIES -->
  <rect x="28" y="93" width="18" height="7" rx="4" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1"/>
  <rect x="54" y="93" width="18" height="7" rx="4" fill="url(#bodyGrad)" stroke="#9fef00" stroke-width="1"/>
</svg>`;

// --- MINI SVG PARA EL HEADER DEL PANEL ---
const miniRobotSVG = `
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <rect x="8" y="6" width="24" height="18" rx="4" fill="#111927" stroke="#9fef00" stroke-width="1.2"/>
  <rect x="13" y="10" width="6" height="5" rx="1.5" fill="#9fef00" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" repeatCount="indefinite" begin="1s"/>
  </rect>
  <rect x="21" y="10" width="6" height="5" rx="1.5" fill="#9fef00" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" repeatCount="indefinite" begin="1s"/>
  </rect>
  <line x1="20" y1="3" x2="20" y2="6" stroke="#9fef00" stroke-width="1.5"/>
  <circle cx="20" cy="2" r="1.5" fill="#9fef00">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
  </circle>
  <rect x="5" y="26" width="30" height="12" rx="4" fill="#111927" stroke="#9fef00" stroke-width="1.2"/>
  <circle cx="16" cy="32" r="2.5" fill="#9fef00" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite"/>
  </circle>
</svg>`;

// --- HTML DEL WIDGET ---
const widget = document.createElement('div');
widget.id = 'enigma-widget';
widget.innerHTML = `
  <div id="enigma-robot" title="Habla con Enigma">
    ${robotSVG}
    <div id="enigma-badge">1</div>
  </div>

  <div id="enigma-tooltip" style="display:none"></div>

  <div id="enigma-panel" style="display:none">
    <div id="enigma-panel-header">
      <div class="enigma-header-avatar">${miniRobotSVG}</div>
      <div class="enigma-header-info">
        <div class="enigma-header-name">ENIGMA</div>
        <div class="enigma-header-status">
          <div class="enigma-status-dot"></div>
          AI Assistant · Online
        </div>
      </div>
      <button id="enigma-close" title="Cerrar">✕</button>
    </div>

    <div id="enigma-messages"></div>

    <div id="enigma-suggestions">
      <button class="enigma-sug" data-msg="Dame un hint para empezar con una máquina Linux">💡 Hint Linux</button>
      <button class="enigma-sug" data-msg="¿Cómo enumero un servidor web?">🔍 Enum web</button>
      <button class="enigma-sug" data-msg="Explícame qué es privilege escalation">⬆️ PrivEsc</button>
    </div>

    <div id="enigma-input-area">
      <div id="enigma-input-wrap">
        <span>></span>
        <input type="text" id="enigma-input" placeholder="Pregunta a Enigma..." autocomplete="off"/>
      </div>
      <button id="enigma-send">↑</button>
    </div>
  </div>
`;
document.body.appendChild(widget);

// --- ESTADO ---
let isOpen = false;
let conversationHistory = [];
let hasShownWelcome = false;

const robot     = document.getElementById('enigma-robot');
const panel     = document.getElementById('enigma-panel');
const tooltip   = document.getElementById('enigma-tooltip');
const badge     = document.getElementById('enigma-badge');
const messages  = document.getElementById('enigma-messages');
const input     = document.getElementById('enigma-input');
const sendBtn   = document.getElementById('enigma-send');
const closeBtn  = document.getElementById('enigma-close');

// --- USUARIO ACTIVO ---
function getUser() {
    try {
        const u = localStorage.getItem('xpl0day_active_user');
        return u ? JSON.parse(u) : { username: 'Hacker', rank: 'Script Kiddie' };
    } catch(e) {
        return { username: 'Hacker', rank: 'Script Kiddie' };
    }
}

// --- ESCAPE HTML (evita XSS al inyectar datos de usuario en el DOM) ---
function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// --- TOOLTIP DE BIENVENIDA ---
setTimeout(() => {
    if (!isOpen) {
        const user = getUser();
        tooltip.innerHTML = `<strong>Hola ${escHtml(user.username)} 👋</strong><br>Soy Enigma. ¿Necesitas ayuda?`;
        tooltip.style.display = 'block';
        setTimeout(() => { tooltip.style.display = 'none'; }, 4000);
    }
}, 1500);

// --- ABRIR / CERRAR ---
robot.addEventListener('click', togglePanel);
closeBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(); });

function togglePanel() {
    isOpen = !isOpen;
    panel.style.display = isOpen ? 'flex' : 'none';
    tooltip.style.display = 'none';
    badge.style.display = 'none';

    if (isOpen && !hasShownWelcome) {
        hasShownWelcome = true;
        const user = getUser();
        setTimeout(() => {
            addMessage('bot', `Sistema iniciado. Soy **Enigma**, tu asistente de ciberseguridad en XPL0DAY.\n\nRango detectado: \`${user.rank}\`. Estoy aquí para guiarte sin spoilearte. ¿Qué necesitas?`);
        }, 300);
    }

    if (isOpen) {
        setTimeout(() => input.focus(), 100);
        robot.style.animation = 'none';
    } else {
        robot.style.animation = 'enigmaFloat 3s ease-in-out infinite';
    }
}

// --- HOVER ROBOT ---
robot.addEventListener('mouseenter', () => {
    if (!isOpen) {
        tooltip.style.display = 'block';
        const user = getUser();
        tooltip.innerHTML = `<strong>Enigma</strong> · AI Assistant<br><span style="font-size:0.7rem">Clic para abrir</span>`;
    }
});

robot.addEventListener('mouseleave', () => {
    if (!isOpen) setTimeout(() => { tooltip.style.display = 'none'; }, 500);
});

// --- SUGERENCIAS ---
document.querySelectorAll('.enigma-sug').forEach(btn => {
    btn.addEventListener('click', () => {
        input.value = btn.dataset.msg;
        sendMessage();
    });
});

// --- ENTER ---
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
});

sendBtn.addEventListener('click', sendMessage);

// --- ENVIAR MENSAJE ---
async function sendMessage() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;

    input.value = '';
    const user = getUser();
    addMessage('user', text);
    sendBtn.disabled = true;
    conversationHistory.push({ role: 'user', content: text });

    const typingId = showTyping();

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: ENIGMA_SYSTEM_PROMPT + `\n\nUsuario: ${user.username}, Rango: ${user.rank}. Adapta tus hints a su nivel.`,
                messages: conversationHistory
            })
        });

        removeTyping(typingId);
        const data = await response.json();
        const reply = data.content[0].text;
        conversationHistory.push({ role: 'assistant', content: reply });
        addMessage('bot', reply);

    } catch(err) {
        removeTyping(typingId);
        addMessage('bot', '`[ERROR]` Conexión fallida. Comprueba tu red.');
    }

    sendBtn.disabled = false;
    input.focus();
}

// --- AÑADIR MENSAJE ---
function addMessage(role, text) {
    const user = getUser();
    const el = document.createElement('div');
    el.className = `enigma-msg ${role}`;

    const avatarText = role === 'bot' ? 'AI' : user.username.substring(0,2).toUpperCase();

    const formatted = text
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/`([^`]+)`/g,'<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g,'<strong style="color:#9fef00">$1</strong>')
        .replace(/\n/g,'<br>');

    el.innerHTML = `
        <div class="enigma-msg-avatar">${avatarText}</div>
        <div class="enigma-msg-bubble">${formatted}</div>
    `;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
}

// --- TYPING ---
function showTyping() {
    const id = 'et-' + Date.now();
    const el = document.createElement('div');
    el.className = 'enigma-msg bot';
    el.id = id;
    el.innerHTML = `
        <div class="enigma-msg-avatar">AI</div>
        <div class="enigma-msg-bubble">
            <div class="enigma-typing">
                <div class="enigma-typing-dot"></div>
                <div class="enigma-typing-dot"></div>
                <div class="enigma-typing-dot"></div>
            </div>
        </div>
    `;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

})();
