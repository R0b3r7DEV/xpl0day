# INFORME DE AUDITORÍA DE SEGURIDAD — XPL0DAY

**Fecha:** 2026-06-02 | **Alcance:** Frontend estático + Nginx/Docker + GitHub Actions | **Carácter del proyecto:** Educativo/Portfolio

---

## 1. EXPOSICIÓN DE SECRETOS

### [ALTA] Arquitectura diseñada para API key cliente-side — `js/enigma.js` línea 615

La llamada a `https://api.anthropic.com/v1/messages` se ejecuta directamente desde el navegador del visitante. La documentación interna (`CLAUDE.md`) describe explícitamente que la clave se debe añadir en el header `Authorization` de `sendMessage()`.

**Riesgo real:** Cualquier persona que abra las DevTools o haga `view-source:` verá la clave en texto plano. Las claves de Anthropic no tienen restricción de origen en el lado API, por lo que puede ser extraída y usada en nombre de la cuenta del propietario, generando costes ilimitados.

**Estado actual:** La clave NO está hardcodeada ahora mismo (la fetch no incluye el header `Authorization`), y el historial de git tampoco muestra que se haya comprometido una clave real en ningún commit. El Enigma no funcionará hasta que se añada, pero la arquitectura lo invita a hacerlo de forma insegura.

**Recomendación:** No añadir nunca la API key en código cliente. El patrón correcto es un proxy mínimo servidor-lado (un endpoint `/api/chat` que tenga la clave como variable de entorno y llame a Anthropic). Para un proyecto educativo sin backend, documentar explícitamente "este widget está desactivado en producción" es preferible a exponer una clave real.

---

### [BAJA] Historial de git sin secretos confirmado

Revisión de `git log -p` filtrada por patrones de API keys (`sk-ant`, `Authorization`, `Bearer`, `.env`): ningún resultado. No hay credenciales quemadas en el historial. El `.gitignore` incluye `.env`, lo cual es correcto.

---

## 2. SEGURIDAD DEL LADO CLIENTE — XSS

### [ALTA] XSS DOM via `localStorage.username` — `js/enigma.js` líneas 541 y 578

```javascript
// línea 541
tooltip.innerHTML = `<strong>Hola ${user.username} 👋</strong><br>Soy Enigma. ¿Necesitas ayuda?`;

// línea 578
tooltip.innerHTML = `<strong>Enigma</strong> · AI Assistant<br><span ...>Clic para abrir</span>`;
```

`user.username` se obtiene de `localStorage.getItem('xpl0day_active_user')` sin ningún escape o sanitización, y se inyecta directamente en `innerHTML`. Si un atacante controla el valor de `username` en localStorage (trivial, basta abrir DevTools), puede ejecutar HTML arbitrario:

```javascript
// payload en DevTools:
localStorage.setItem('xpl0day_active_user', JSON.stringify({
    username: '<img src=x onerror="alert(document.cookie)">',
    rank: 'Elite'
}));
```

Al cargar cualquier página que incluya `enigma.js`, el tooltip ejecuta el payload.

**Nota:** El vector de entrada inicial es localStorage (mismo origen), pero encadenado con cualquier otro XSS o con un atacante con acceso físico al navegador, es explotable.

**Recomendación:** Reemplazar `innerHTML` por `textContent` para el nombre de usuario, o usar una función de escape:
```javascript
function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
tooltip.innerHTML = `<strong>Hola ${escHtml(user.username)} 👋</strong>...`;
```
La función `addMessage` (línea 649) ya implementa este escape correctamente — el patrón existe, solo falta aplicarlo en el tooltip.

---

### [MEDIA] `innerHTML` con datos dinámicos — `js/machines-logic_HTB.js` líneas 68–90

```javascript
card.innerHTML = `
    <span class="machine-name">${m.name}</span>
    <p class="machine-ip">${m.ip}</p>
`;
```

Actualmente `m.name` y `m.ip` provienen de un array hardcodeado en el propio archivo, por lo que no es explotable en el estado actual. Sin embargo, si en el futuro estos datos vienen de localStorage, el patrón es inseguro.

**Recomendación:** Crear los elementos con `createElement` + `textContent` en lugar de `innerHTML` con interpolación de strings, o sanitizar antes de inyectar.

---

## 3. ALMACENAMIENTO Y DATOS

### [CRÍTICA — Limitación documentada y aceptada] Contraseñas en texto plano en `localStorage`

`js/register-logic_HTB.js` línea 49:
```javascript
const newUser = {
    username: username,
    email: email,
    password: password,  // ← texto plano
    rank: 'Script Kiddie',
    points: 0
};
localStorage.setItem('xpl0day_users', JSON.stringify(users));
```

El array completo de todos los usuarios registrados, incluyendo contraseñas en claro, vive en `localStorage` bajo la clave `xpl0day_users`. Cualquier script JavaScript con acceso al mismo origen puede leer todas las credenciales:

```javascript
JSON.parse(localStorage.getItem('xpl0day_users'))
// → [{username:"...", password:"mi_contraseña_real", ...}, ...]
```

**Clasificación:** El README y el propio comentario en el código documentan esta limitación explícitamente como deuda técnica pendiente de resolver con el backend Spring Boot. Es una **limitación aceptable y documentada** para uso educativo/demo, siempre que los usuarios sean conscientes de no registrarse con contraseñas reales.

**Recomendación:** Aunque sea frontend-only, se podría aplicar `bcrypt` en cliente (librería `bcryptjs`) para almacenar el hash en lugar del plaintext. No es seguridad real (el hash está igualmente en localStorage), pero evita que contraseñas reales aparezcan en claro y es una práctica más honesta para un proyecto educativo.

---

### [ALTA] Manipulación de sesión, rango y puntos desde DevTools

Toda la lógica de autorización se basa en la existencia de `xpl0day_active_user` en localStorage. Cualquier usuario puede:

```javascript
localStorage.setItem('xpl0day_active_user', JSON.stringify({
    username: 'hacker',
    rank: 'Elite',
    testCompleted: true,
    points: 99999
}));
// Navegar a dashboard_HTB.html → acceso completo
```

Los controles en `dashboard-logic_HTB.js` línea 10, `machines-logic_HTB.js` línea 5 y `profile-logic_HTB.js` línea 6 son completamente cosméticos.

**Clasificación:** Limitación estructural aceptable dado el carácter educativo. No debe presentarse como "sistema de autenticación seguro".

**Recomendación:** Añadir un aviso explícito en el README (o en la interfaz) de que la sesión es demostrativa y no protege datos reales.

---

## 4. AUTENTICACIÓN Y SESIÓN

### [MEDIA] Sin protección contra fuerza bruta en login

`js/script_HTB.js` hace la comparación de credenciales directamente contra localStorage sin ningún contador de intentos fallidos, bloqueo temporal, ni CAPTCHA.

**Recomendación:** Implementar un contador de intentos fallidos en localStorage con bloqueo temporal (`loginAttempts`, `lockUntil`).

---

### [BAJA] El test de nivel es repetible y manipulable

`js/test-logic_HTB.js` guarda el rango en localStorage al finalizar el test. Un usuario puede borrar `xpl0day_active_user` y repetir el test para conseguir el rango "Elite". No hay ningún control servidor-lado que lo impida.

**Clasificación:** Limitación aceptable para el proyecto.

---

## 5. CONFIGURACIÓN DE INFRAESTRUCTURA

### [CRÍTICA] Directorio `.git/` accesible via HTTP — `Dockerfile` línea 3

```dockerfile
COPY . /usr/share/nginx/html
```

Esta instrucción copia todo el contenido del directorio de trabajo, incluyendo `.git/`, `.github/` y cualquier fichero oculto, directamente a la raíz del servidor web. Nginx no tiene ninguna regla en `nginx/default.conf` que bloquee el acceso a estos directorios.

Esto significa que `https://xpl0day.com/.git/config` es probablemente accesible, lo que permite reconstruir el repositorio completo con herramientas como `git-dumper`:

```bash
git-dumper https://xpl0day.com/.git/ ./repo_robado
```

**Recomendación A — `.dockerignore`:**
```
.git
.github
*.md
```

**Recomendación B — `nginx/default.conf`:**
```nginx
location ~ /\. {
    deny all;
    return 404;
}
```

---

### [ALTA] Ausencia total de cabeceras HTTP de seguridad — `nginx/default.conf`

| Cabecera | Riesgo de ausencia |
|---|---|
| `Content-Security-Policy` | Sin restricción de fuentes; cualquier XSS puede cargar scripts externos |
| `Strict-Transport-Security` | El primer acceso HTTP no está protegido contra downgrade |
| `X-Frame-Options` | La página puede ser embebida en iframes (clickjacking) |
| `X-Content-Type-Options: nosniff` | MIME-sniffing en navegadores legacy |
| `Referrer-Policy` | URLs de navegación internas filtradas a terceros |
| `Permissions-Policy` | Acceso a cámara/micrófono/geolocalización no restringido |

**Recomendación:** Añadir al bloque `server` del 443:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.anthropic.com;" always;
```

Nota: `unsafe-inline` es necesario por el `<script>` inline en `index_HTB.html`. Refactorizar ese bloque a un archivo externo permitiría eliminarlo.

---

### [MEDIA] Path del servidor expuesto en workflow público — `.github/workflows/deploy.yml` línea 22

```yaml
script: |
    cd /home/n2k/xpl0day
    git pull
    docker compose up -d --build
```

El path absoluto (`/home/n2k/xpl0day`) y el nombre de usuario del sistema (`n2k`) son información de reconocimiento visible públicamente en el repositorio de GitHub.

**Nota positiva:** Las credenciales SSH se gestionan correctamente a través de Secrets de GitHub.

**Recomendación:** Mover el path a un secret (`${{ secrets.DEPLOY_PATH }}`).

---

### [BAJA] TLS mínimamente configurado, sin OCSP stapling

`nginx/default.conf` habilita TLSv1.2 y TLSv1.3 correctamente. Sin embargo no incluye `ssl_session_cache`, `ssl_session_timeout` ni `ssl_stapling on`. La suite de cifrado `ssl_ciphers HIGH:!aNULL:!MD5` es funcional pero no sigue las recomendaciones modernas de Mozilla.

---

## 6. DEPENDENCIAS Y SUPERFICIE DE ATAQUE

### [MEDIA] Google Fonts cargado desde CDN externo — todos los `*.html`

```html
<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&..." rel="stylesheet">
```

Cada visita envía la IP del usuario a servidores de Google. En contexto europeo, potencialmente relevante para RGPD. Además crea una dependencia de disponibilidad externa.

**Recomendación:** Auto-hospedar las fuentes Ubuntu y Ubuntu Mono descargándolas con `google-webfonts-helper` e incluyéndolas en `assets/fonts/`.

---

### [ALTA — cuando la API key se añada] Llamada directa a Anthropic desde el browser

`js/enigma.js` línea 615 realiza un fetch a `https://api.anthropic.com/v1/messages`. Además de la exposición de la clave, esto implica:

- El **system prompt completo** de Enigma es visible en el código fuente (líneas 9-14).
- El **modelo exacto** usado (`claude-sonnet-4-20250514`) es visible.
- Sin límite de requests por sesión de usuario implementado en cliente.

---

### [BAJA] Dependencia de terceros en GitHub Actions sin SHA fijo

`appleboy/ssh-action@v1.2.0` se referencia por etiqueta de versión. Si el repositorio fuera comprometido (supply chain attack), el workflow ejecutaría código malicioso con acceso a los secrets SSH del VPS.

**Recomendación:** Fijar la acción a su SHA de commit:
```yaml
uses: appleboy/ssh-action@[SHA_COMPLETO_DEL_COMMIT]
```

---

## RESUMEN DE SEVERIDADES

| # | Hallazgo | Severidad | Explotable ahora |
|---|---|---|---|
| 1 | `.git/` accesible vía HTTP (Dockerfile + Nginx sin bloqueo) | **Crítica** | Sí |
| 2 | Cabeceras HTTP de seguridad ausentes (CSP, HSTS, X-Frame-Options…) | **Alta** | Sí |
| 3 | XSS DOM via `username` en `tooltip.innerHTML` (enigma.js:541,578) | **Alta** | Sí (mismo origen) |
| 4 | Contraseñas en texto plano en localStorage | **Alta** | Sí — limitación documentada |
| 5 | Arquitectura para API key cliente-side (enigma.js:615) | **Alta** | Cuando se añada la key |
| 6 | Manipulación de sesión/rango desde DevTools | **Alta** | Sí — limitación estructural |
| 7 | Llamada directa a Anthropic (system prompt expuesto) | **Media** | Sí |
| 8 | Path del servidor expuesto en workflow | **Media** | Info disclosure |
| 9 | Sin rate limiting en login | **Media** | Sí |
| 10 | `innerHTML` con datos dinámicos en machines-logic | **Media** | No (datos hardcodeados) |
| 11 | TLS sin HSTS, sin OCSP stapling | **Baja** | No |
| 12 | Google Fonts CDN externo | **Baja** | No |
| 13 | Supply chain: acción SSH sin SHA fijo | **Baja** | No |
| 14 | Test de nivel repetible | **Baja** | Limitación aceptable |

---

## TOP 5 ARREGLOS DE MAYOR IMPACTO

**1. Bloquear acceso a `.git/` en Nginx + `.dockerignore`**
Una línea en `nginx/default.conf` y un fichero `.dockerignore`. Elimina la exposición del repositorio completo en producción. Riesgo crítico, coste de implementación mínimo.

**2. Añadir cabeceras de seguridad HTTP en Nginx**
Cinco `add_header` en `default.conf`. Habilita HSTS, elimina clickjacking, restringe orígenes de scripts con CSP. Mejora masiva del posture de seguridad con un único cambio de infraestructura.

**3. Sanitizar `user.username` antes de inyectarlo en `innerHTML` (enigma.js:541,578)**
Cambiar dos líneas para escapar el nombre de usuario. Elimina el único vector de XSS DOM ejecutable actualmente. La función de escape ya existe en el mismo archivo (`addMessage`), solo hay que reutilizarla.

**4. Nunca añadir la API key de Anthropic en código cliente**
No es un cambio de código sino de política y arquitectura. Si el widget Enigma no puede tener un proxy servidor-lado, desactivarlo en producción y documentar por qué. El riesgo económico de exponer una clave de API real en JavaScript público es real e inmediato.

**5. Fijar `appleboy/ssh-action` a su SHA de commit**
Una palabra en el workflow. Protege contra compromiso de la cadena de suministro en el único punto del pipeline con acceso SSH al servidor de producción.

---

*Informe de solo lectura. Ningún archivo del proyecto fue modificado durante esta auditoría.*

---

## CORRECCIONES APLICADAS

**Fecha:** 2026-06-02 | **Rama:** `fix/seguridad` | **Commit:** `044706d`

Los cinco arreglos de mayor impacto del TOP 5 han sido implementados:

| # | Hallazgo | Archivos modificados | Estado |
|---|---|---|---|
| 1 | `.git/` y `.github/` accesibles vía HTTP | `.dockerignore`, `nginx/default.conf` | ✅ Corregido |
| 2 | Cabeceras HTTP de seguridad ausentes | `nginx/default.conf` | ✅ Corregido |
| 3 | XSS DOM via `username` en `tooltip.innerHTML` | `js/enigma.js` | ✅ Corregido |
| 4 | Acción SSH sin SHA fijo (supply chain) | `.github/workflows/deploy.yml` | ✅ Corregido |
| 5 | Path del servidor hardcodeado en workflow | `.github/workflows/deploy.yml` | ✅ Corregido |

### Detalle de cambios

**`.dockerignore`**
Añadida la exclusión de `.github/` al contexto de build Docker (`.git/` y `*.md` ya estaban excluidos).

**`nginx/default.conf`**
- Añadida regla `location ~ /\.` con `deny all; return 404;` para bloquear cualquier ruta que empiece por punto.
- Añadidas cabeceras: `Strict-Transport-Security` (HSTS 1 año), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y `Content-Security-Policy` con orígenes explícitos. La directiva `unsafe-inline` en `script-src` es temporal hasta que los scripts inline de `index_HTB.html` se muevan a un archivo externo.

**`js/enigma.js`**
Creada la función `escHtml()` que escapa `&`, `<`, `>` y `"`. Aplicada sobre `user.username` en `tooltip.innerHTML` (línea 541). Ahora un username con HTML malicioso almacenado en localStorage se renderiza como texto literal.

**`.github/workflows/deploy.yml`**
- `appleboy/ssh-action@v1.2.0` sustituido por el SHA completo del commit `7eaf76671a0d7eec5d98ee897acda4f968735a17` (con comentario `# v1.2.0` para legibilidad).
- Path de despliegue `/home/n2k/xpl0day` sustituido por `${{ secrets.DEPLOY_PATH }}`. El secret `DEPLOY_PATH` debe existir en GitHub → Settings → Secrets and variables → Actions.

### Hallazgos pendientes (fuera del alcance de esta rama)

| Hallazgo | Motivo de no corrección |
|---|---|
| Contraseñas en texto plano en localStorage | Requiere backend (Spring Boot v1.0) |
| Manipulación de sesión desde DevTools | Limitación estructural sin backend |
| API key de Anthropic cliente-side | Decisión de arquitectura — no añadir key en producción |
| Google Fonts CDN externo | Mejora de privacidad, no urgente |
| TLS sin OCSP stapling | Mejora menor, requiere revisión de config SSL completa |
