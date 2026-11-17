/* =========================================================================
   EL ORÁCULO CREATIVO · 2027 — lógica de interacción
   ========================================================================= */
(() => {
  'use strict';

  /* -----------------------------------------------------------------------
     Placeholders de ilustración (SVG generado). Sustituye `image` en ARCANA
     por la ruta real cuando tengas las ilustraciones: 'assets/arcanos/01.webp'
     ----------------------------------------------------------------------- */
  const pt = (cx, cy, r, a) => `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;

  const starPolygon = (cx, cy, n, r1, r2, extra = '') => {
    const pts = [];
    for (let i = 0; i < n * 2; i++) pts.push(pt(cx, cy, i % 2 ? r2 : r1, (Math.PI / n) * i - Math.PI / 2));
    return `<polygon points="${pts.join(' ')}" ${extra}/>`;
  };

  const rays = (cx, cy, n, r1, r2, a0 = 0, a1 = Math.PI * 2) => {
    let d = '';
    const step = (a1 - a0) / (a1 - a0 >= Math.PI * 2 ? n : n - 1);
    for (let i = 0; i < n; i++) {
      const a = a0 + step * i;
      d += `M${pt(cx, cy, r1, a)} L${pt(cx, cy, r2, a)} `;
    }
    return `<path d="${d}"/>`;
  };

  const wheat = () => {
    let s = '<path d="M100 205 V92"/>';
    for (let i = 0; i < 5; i++) {
      const y = 100 + i * 17;
      s += `<ellipse cx="91" cy="${y}" rx="5" ry="11" transform="rotate(-28 91 ${y})"/>`;
      s += `<ellipse cx="109" cy="${y}" rx="5" ry="11" transform="rotate(28 109 ${y})"/>`;
    }
    return s;
  };

  const ORANGE = 'fill="#FF5500" stroke="none"';
  const GLYPHS = {
    alianza:  `<circle cx="78" cy="125" r="40"/><circle cx="122" cy="125" r="40"/><circle cx="100" cy="125" r="7" ${ORANGE}/>`,
    impacto:  starPolygon(100, 125, 12, 66, 24) + rays(100, 125, 24, 74, 86) + `<circle cx="100" cy="125" r="11" ${ORANGE}/>`,
    faro:     `<path d="M100 98 L32 70 V126 Z" fill="#FF5500" fill-opacity=".22" stroke-opacity=".5"/><path d="M100 98 L168 70 V126 Z" fill="#FF5500" fill-opacity=".22" stroke-opacity=".5"/><path d="M86 200 L93 110 H107 L114 200 Z"/><rect x="89" y="88" width="22" height="22" rx="2"/><path d="M100 76 V88 M60 200 H140 M90 140 H110 M88 170 H112"/><circle cx="100" cy="99" r="5" ${ORANGE}/>`,
    salto:    `<path d="M40 190 Q100 26 162 150"/><path d="M147 147 L163 153 L167 136"/><circle cx="40" cy="190" r="7" ${ORANGE}/><path d="M28 206 H172" stroke-dasharray="3 7"/>`,
    cosecha:  `<path d="M150 58 A40 40 0 1 0 150 122 A31 31 0 1 1 150 58 Z" fill="#FF5500" fill-opacity=".3"/>` + wheat(),
    estrella: starPolygon(100, 122, 8, 70, 26) + starPolygon(100, 122, 4, 30, 9, ORANGE) + `<circle cx="40" cy="50" r="2" fill="currentColor"/><circle cx="165" cy="200" r="2.5" fill="currentColor"/><circle cx="160" cy="45" r="1.5" fill="currentColor"/>`,
  };

  const placeholderArt = (key, id) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <defs><radialGradient id="g" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#1e3a70"/><stop offset="1" stop-color="#0B1023"/></radialGradient></defs>
      <rect width="200" height="250" fill="url(#g)"/>
      <g fill="none" stroke="#4FC7C6" stroke-opacity=".16"><circle cx="100" cy="125" r="92"/><circle cx="100" cy="125" r="76" stroke-dasharray="2 5"/></g>
      <g fill="none" stroke="#4FC7C6" color="#4FC7C6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[key]}</g>
      <text x="100" y="240" text-anchor="middle" font-family="monospace" font-size="7" letter-spacing="3" fill="#4FC7C6" fill-opacity=".45">ILUSTRACIÓN 0${id}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  /* -----------------------------------------------------------------------
     DATOS: los 6 Arcanos (copy provisional)
     ----------------------------------------------------------------------- */
  const ARCANA = [
    { id: 1, title: 'La Alianza',  message: 'Los astros son claros: los mejores proyectos nacen cuando unimos fuerzas. El 2027 nos encontrará construyendo juntos.',   image: placeholderArt('alianza', 1) },
    { id: 2, title: 'El Impacto',  message: 'Un gran impacto en resultados se avecina. Este año, cada idea que lancemos dejará una marca imborrable.',          image: placeholderArt('impacto', 2) },
    { id: 3, title: 'El Faro',     message: 'Incluso en los briefings con más niebla, la claridad nos guiará. En 2027, iluminaremos juntos el camino hacia el éxito.',                image: placeholderArt('faro', 3) },
    { id: 4, title: 'El Salto',    message: 'Es el momento de atreverse. Las cartas predicen un año de ideas valientes e innovación que nos llevarán al siguiente nivel.',     image: placeholderArt('salto', 4) },
    { id: 5, title: 'La Cosecha',  message: 'Todo el esfuerzo sembrado empieza a dar sus frutos. Prepárate para un año donde recogeremos grandes victorias juntos.',            image: placeholderArt('cosecha', 5) },
    { id: 6, title: 'La Estrella', message: 'La alineación es perfecta. En 2027,  brillaremos tanto juntos que será imposible pasar desapercibidos.',            image: placeholderArt('estrella', 6) },
  ];

  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  /* -----------------------------------------------------------------------
     TIEMPOS — única fuente de verdad (se vuelcan a variables CSS)
     ----------------------------------------------------------------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const k = reduceMotion ? 0.35 : 1;
  const TIMING = {
    lift: 1100 * k,          // separación del mazo
    flip: 1100 * k,          // giro 180º
    revealDelay: 1000 * k,   // espera tras el giro antes del texto + CTA
    reveal: 900 * k,         // fade-in del texto
  };

  const root = document.documentElement;
  root.style.setProperty('--t-lift', `${TIMING.lift}ms`);
  root.style.setProperty('--t-flip', `${TIMING.flip}ms`);
  root.style.setProperty('--t-reveal', `${TIMING.reveal}ms`);

  /* -----------------------------------------------------------------------
     DOM
     ----------------------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);
  const els = {
    oracle: $('oracle'),
    deck: $('deck'),
    card: $('card'),
    tilt: $('cardTilt'),
    float: $('cardFloat'),
    numeral: $('cardNumeral'),
    image: $('cardImage'),
    title: $('cardTitle'),
    reading: $('reading'),
    kicker: $('readingKicker'),
    text: $('readingText'),
    fx: $('fx'),
    header: document.querySelector('.oracle__header'),
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* -----------------------------------------------------------------------
     Dorso de la carta (line-art: marco, soles, ojo con rayos, planetas)
     Se dibuja una vez en el <symbol id="back-art"> y lo reutilizan todas.
     ----------------------------------------------------------------------- */
  function buildBackArt() {
    const sun = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="6"/>${rays(cx, cy, 8, 9, 14)}`;
    const diamond = (cx, cy, s = 5) => `<path d="M${cx} ${cy - s * 1.6} L${cx + s} ${cy} L${cx} ${cy + s * 1.6} L${cx - s} ${cy} Z"/>`;
    const planet = (cx, cy, rot) => `<circle cx="${cx}" cy="${cy}" r="5"/><ellipse cx="${cx}" cy="${cy}" rx="12" ry="3.6" transform="rotate(${rot} ${cx} ${cy})"/>`;
    const corner = (x, y) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12"/><rect x="${x - 2.5}" y="${y - 2.5}" width="5" height="5"/>`;

    let dots = '';
    const seed = [[34, 110], [168, 96], [30, 200], [172, 218], [58, 40], [142, 290], [64, 286], [150, 32], [40, 150], [162, 160]];
    seed.forEach(([x, y], i) => { dots += `<circle cx="${x}" cy="${y}" r="${i % 3 ? 0.9 : 1.4}"/>`; });

    document.getElementById('back-art').innerHTML = `
      <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="12" y="12" width="176" height="300" rx="2"/>
        <rect x="18" y="18" width="164" height="288" rx="1.5" stroke-width=".7" opacity=".6"/>
        ${corner(12, 12)}${corner(188, 12)}${corner(12, 312)}${corner(188, 312)}
        ${sun(48, 58)}${sun(152, 58)}${sun(48, 268)}${sun(152, 268)}
        ${diamond(100, 44)}<path d="M100 56 V112"/>
        ${rays(100, 170, 23, 38, 82, Math.PI * 1.08, Math.PI * 1.92)}
        <path d="M50 170 Q100 126 150 170 Q100 214 50 170 Z" stroke-width="2"/>
        <circle cx="100" cy="214" r="3"/><path d="M100 220 V266"/>${diamond(100, 282)}
        ${diamond(60, 212, 3.5)}${diamond(140, 212, 3.5)}
        ${planet(70, 240, -18)}${planet(130, 240, 18)}
      </g>
      <circle cx="100" cy="170" r="17" fill="#FF5500"/>
      <circle cx="94" cy="164" r="4" fill="#fff" fill-opacity=".55"/>
      <g fill="currentColor" opacity=".7">${dots}</g>`;
  }

  /* -----------------------------------------------------------------------
     Geometría: dónde termina la carta y a qué escala.
     Encaja la carta entre la cabecera y el bloque de texto (que existe en el
     layout aunque esté invisible), sin pasarse del ancho de pantalla.
     ----------------------------------------------------------------------- */
  function computeLayout() {
    const deck = els.deck.getBoundingClientRect();
    const headerBottom = els.header.getBoundingClientRect().bottom;
    const readingTop = els.reading.getBoundingClientRect().top;
    const gap = Math.max(14, window.innerHeight * 0.025);

    const space = readingTop - headerBottom - gap * 2;
    const scale = clamp(Math.min(space / deck.height, (window.innerWidth - 40) / deck.width), 0.7, 1.35);
    const targetCenter = headerBottom + gap + space / 2;
    const liftY = targetCenter - (deck.top + deck.height / 2);

    root.style.setProperty('--lift-y', `${liftY.toFixed(1)}px`);
    root.style.setProperty('--lift-scale', scale.toFixed(3));
    root.style.setProperty('--fx-y', `${targetCenter.toFixed(1)}px`);
  }

  /* -----------------------------------------------------------------------
     Contenido
     ----------------------------------------------------------------------- */
  function pickArcano() {
    const buf = new Uint32Array(1);
    const rnd = window.crypto?.getRandomValues ? crypto.getRandomValues(buf)[0] / 2 ** 32 : Math.random();
    return ARCANA[Math.floor(rnd * ARCANA.length)];
  }

  function renderCard(a) {
    els.numeral.textContent = ROMAN[a.id - 1];
    els.title.textContent = a.title;
    els.image.src = a.image;
    els.image.alt = `Ilustración del arcano ${a.title}`;
    els.kicker.textContent = `Arcano ${ROMAN[a.id - 1]} · ${a.title}`;
    els.text.textContent = a.message;
  }

  /* -----------------------------------------------------------------------
     Destellos naranjas/turquesa al girar
     ----------------------------------------------------------------------- */
  function burstSparks() {
    if (reduceMotion) return;
    const cardW = els.deck.offsetWidth * parseFloat(getComputedStyle(root).getPropertyValue('--lift-scale') || 1);
    const n = 22;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'spark' + (i % 4 === 0 ? ' spark--turq' : '');
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
      const dist = cardW * (0.75 + Math.random() * 0.6);
      s.style.setProperty('--dx', `${(Math.cos(a) * dist).toFixed(0)}px`);
      s.style.setProperty('--dy', `${(Math.sin(a) * dist * 1.3).toFixed(0)}px`);
      s.style.setProperty('--s', `${(2 + Math.random() * 4).toFixed(1)}px`);
      s.style.setProperty('--d', `${(700 + Math.random() * 700).toFixed(0)}ms`);
      s.addEventListener('animationend', () => s.remove(), { once: true });
      els.fx.appendChild(s);
    }
  }

  /* =======================================================================
     MOVIMIENTO DE LA CARTA (inclinación + foil)
     Fuentes de movimiento:
       · Ratón      → vanilla-tilt (solo desktop) rota .card__tilt
       · Giroscopio → rota .card__float (móvil, con permiso en iOS)
       · Dedo       → arrastrar sobre la carta rota .card__float (plan B)
       · Reposo     → animación suave automática cuando no hay entrada real
     Un único bucle (requestAnimationFrame) mezcla el reposo con la entrada
     real y escribe --x, --y, --foil para el brillo.
     ======================================================================= */

  // Ajustes de la animación EN REPOSO
  const IDLE = {
    angle: 4,             // grados máximos de inclinación en reposo
    reach: 0.8,           // 0–1: cuánto recorre la luz la carta en reposo
    period: 8000,         // ms por ciclo completo (trayectoria en forma de 8)
    resumeAfter: 2000,    // ms sin entrada real antes de volver al reposo
    fadeIn: 1200,         // ms que tarda el reposo en recuperar el control
    fadeOut: 400,         // ms que tarda en cederlo cuando el usuario interactúa
    glintEvery: 7000,     // ms entre destellos que cruzan la carta (0 = sin destellos)
    glintDuration: 1400,  // ms que dura cada destello
  };

  // Ajustes de la entrada real en MÓVIL (giroscopio y dedo)
  const MOTION = {
    gyroRange: 12,        // grados que hay que inclinar el móvil para llegar al máximo
    maxAngle: 12,         // grados máximos que gira la carta
    smoothing: 0.14,      // 0–1: suavizado por frame (más bajo = más suave)
    recenter: 0.004,      // velocidad a la que se recalibra la posición "neutra" del móvil
    jitter: 0.35,         // grados: por debajo se considera temblor del sensor, no movimiento
  };

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const motion = {
    running: false,
    raf: 0,
    last: 0,
    idleW: 1,                    // 1 = reposo total · 0 = control total del usuario
    lastInput: -Infinity,
    target: { x: 0, y: 0 },      // entrada real normalizada (-1…1)
    current: { x: 0, y: 0 },     // entrada suavizada
    mouseTilt: false,            // vanilla-tilt activo (desktop)
    dragId: null,
    gyroOn: false,
    gyro: { base: null, prev: null },
  };

  const markInput = () => { motion.lastInput = performance.now(); };
  const smoothstep = (t) => t * t * (3 - 2 * t);
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

  function frame(now) {
    const dt = Math.min(64, now - (motion.last || now));
    motion.last = now;

    // 1) Peso del reposo: baja rápido con entrada real, vuelve despacio sin ella
    const active = now - motion.lastInput < IDLE.resumeAfter;
    const step = dt / (active ? IDLE.fadeOut : IDLE.fadeIn);
    motion.idleW = clamp(motion.idleW + (active ? -step : step), 0, 1);
    const w = smoothstep(motion.idleW);

    // 2) Entrada real suavizada
    const k = 1 - Math.pow(1 - MOTION.smoothing, dt / 16.7);
    motion.current.x += (motion.target.x - motion.current.x) * k;
    motion.current.y += (motion.target.y - motion.current.y) * k;

    // 3) Trayectoria de reposo: curva de Lissajous (un "8" tumbado)
    const ph = (now / IDLE.period) * Math.PI * 2;
    const ix = Math.sin(ph);
    const iy = Math.sin(ph * 2) * 0.55;

    // 4) Rotación de .card__float
    const idleDeg = reduceMotion ? 0 : IDLE.angle;
    const userRot = motion.mouseTilt ? 0 : MOTION.maxAngle * (1 - w); // en desktop rota vanilla-tilt
    const rx = iy * idleDeg * w + motion.current.y * userRot;
    const ry = ix * idleDeg * w + motion.current.x * userRot;
    els.float.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${(-ry).toFixed(2)}deg)`;

    // 5) Foil: posición de la luz e intensidad
    const x = ix * IDLE.reach * w + motion.current.x * (1 - w);
    const y = iy * IDLE.reach * w + motion.current.y * (1 - w);
    let fx = 50 + x * 50;
    let fy = 50 + y * 50;
    let intensity = 0.15 + clamp(Math.hypot(x, y), 0, 1) * 0.55;

    // Destello periódico (solo en reposo): una franja de luz cruza la carta en diagonal
    if (IDLE.glintEvery > 0) {
      const g = (now % IDLE.glintEvery) / IDLE.glintDuration;
      if (g < 1) {
        const amt = Math.sin(Math.PI * g) * w;
        const pos = -10 + 120 * easeInOut(g);
        fx += (pos - fx) * amt;
        fy += (pos - fy) * amt;
        intensity += 0.45 * amt;
      }
    }

    els.tilt.style.setProperty('--x', `${clamp(fx, -10, 110).toFixed(1)}%`);
    els.tilt.style.setProperty('--y', `${clamp(fy, -10, 110).toFixed(1)}%`);
    els.tilt.style.setProperty('--foil', clamp(intensity, 0, 1).toFixed(2));

    motion.raf = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (motion.raf) return;
    motion.last = 0;
    motion.raf = requestAnimationFrame(frame);
  }
  function stopLoop() {
    cancelAnimationFrame(motion.raf);
    motion.raf = 0;
  }

  // Pausa el bucle con la pestaña oculta (no gasta batería en segundo plano)
  document.addEventListener('visibilitychange', () => {
    if (!motion.running) return;
    if (document.hidden) stopLoop(); else startLoop();
  });

  /* ---- Ratón (desktop): vanilla-tilt ---- */
  function initMouseTilt() {
    if (!finePointer || !window.VanillaTilt) return;
    VanillaTilt.init(els.tilt, {
      max: 14,                     // grados máximos de inclinación con el ratón
      speed: 900,
      perspective: 1000,
      scale: 1.02,
      glare: false,                // usamos nuestro propio foil
      reset: true,
      'full-page-listening': true, // toda la pantalla mueve la carta
      gyroscope: false,            // el giroscopio lo gestionamos nosotros
    });
    motion.mouseTilt = true;
    els.tilt.addEventListener('tiltChange', (e) => {
      motion.target.x = clamp((e.detail.percentageX - 50) / 50, -1, 1);
      motion.target.y = clamp((e.detail.percentageY - 50) / 50, -1, 1);
      markInput();
    });
  }

  /* ---- Giroscopio ---- */
  function onOrientation(e) {
    if (e.beta == null || e.gamma == null) return;
    let b = e.beta;   // inclinación adelante/atrás
    let g = e.gamma;  // inclinación izquierda/derecha

    // En horizontal se intercambian los ejes
    const angle = (screen.orientation && screen.orientation.angle) ?? window.orientation ?? 0;
    if (angle === 90) [b, g] = [-g, b];
    else if (angle === -90 || angle === 270) [b, g] = [g, -b];

    const G = motion.gyro;
    if (!G.base) { G.base = { b, g }; G.prev = { b, g }; return; }

    // La posición "neutra" se recalibra poco a poco: da igual cómo sujete el móvil el usuario
    G.base.b += (b - G.base.b) * MOTION.recenter;
    G.base.g += (g - G.base.g) * MOTION.recenter;

    const moved = Math.abs(b - G.prev.b) + Math.abs(g - G.prev.g);
    G.prev = { b, g };
    if (motion.dragId !== null) return;            // el dedo tiene prioridad
    if (moved > MOTION.jitter) markInput();         // ignora el temblor del sensor

    motion.target.x = clamp((g - G.base.g) / MOTION.gyroRange, -1, 1);
    motion.target.y = clamp((b - G.base.b) / MOTION.gyroRange, -1, 1);
  }

  function enableGyro() {
    if (motion.gyroOn) return;
    motion.gyroOn = true;
    window.addEventListener('deviceorientation', onOrientation);
  }

  // iOS 13+: el permiso SOLO se puede pedir dentro de un touchend/click.
  // Si el usuario lo deniega, queda el arrastre con el dedo y la animación en reposo.
  let motionPermission = 'unknown';
  function ensureMotionPermission() {
    const DOE = window.DeviceOrientationEvent;
    if (!DOE) return;
    if (typeof DOE.requestPermission !== 'function') { enableGyro(); return; } // Android: no hace falta permiso
    if (motionPermission !== 'unknown') return;
    motionPermission = 'pending';
    DOE.requestPermission()
      .then((state) => {
        motionPermission = state;                  // 'granted' | 'denied'
        if (state === 'granted') enableGyro();
      })
      .catch(() => { motionPermission = 'unknown'; }); // no era un gesto válido: se reintenta en el siguiente toque
  }

  /* ---- Dedo: arrastrar sobre la carta para inclinarla ---- */
  function onDrag(e) {
    const r = els.card.getBoundingClientRect();
    motion.target.x = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
    motion.target.y = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
    markInput();
  }
  els.card.addEventListener('pointerdown', (e) => {
    if (!motion.running || e.pointerType === 'mouse') return;
    motion.dragId = e.pointerId;
    els.card.setPointerCapture?.(e.pointerId);
    onDrag(e);
  });
  els.card.addEventListener('pointermove', (e) => {
    if (e.pointerId === motion.dragId) onDrag(e);
  });
  const endDrag = (e) => {
    if (e.pointerId !== motion.dragId) return;
    motion.dragId = null;
    motion.target.x = 0;
    motion.target.y = 0;
    markInput();
  };
  els.card.addEventListener('pointerup', endDrag);
  els.card.addEventListener('pointercancel', endDrag);

  function startMotion() {
    if (motion.running) return;
    motion.running = true;
    initMouseTilt();
    startLoop();
  }

  /* -----------------------------------------------------------------------
     FLUJO PRINCIPAL
     ----------------------------------------------------------------------- */
  let drawn = false;

  async function draw() {
    if (drawn) return;           // bloquea nuevos clics
    drawn = true;

    els.deck.removeAttribute('tabindex');
    els.deck.setAttribute('aria-disabled', 'true');

    renderCard(pickArcano());
    computeLayout();

    const { oracle } = els;

    // 1) La carta se separa del mazo
    oracle.classList.add('is-drawn');
    await wait(TIMING.lift);
    oracle.classList.add('is-placed');

    // 2) Flip 3D + destellos a mitad de giro
    oracle.classList.add('is-flipped');
    wait(TIMING.flip * 0.45).then(burstSparks);
    await wait(TIMING.flip);

    // 3) Movimiento: reposo + ratón/giroscopio/dedo
    startMotion();

    // 4) Revelación del texto
    await wait(TIMING.revealDelay);
    oracle.classList.add('is-revealed');
  }

  /* -----------------------------------------------------------------------
     Entrada: tap, swipe hacia arriba o teclado
     ----------------------------------------------------------------------- */
  let startY = null;
  els.deck.addEventListener('pointerdown', (e) => { startY = e.clientY; });
  els.deck.addEventListener('pointerup', (e) => {
    if (startY === null) return;
    const dy = e.clientY - startY;
    startY = null;
    if (dy < -20 || Math.abs(dy) < 12) draw();   // swipe arriba o toque
  });
  els.deck.addEventListener('pointercancel', () => { startY = null; });
  // Permiso del giroscopio (iOS): se pide en touchend/click, que Safari sí acepta como gesto
  els.deck.addEventListener('touchend', ensureMotionPermission);
  els.deck.addEventListener('click', ensureMotionPermission);
  els.deck.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); draw(); }
  });

  // Recalcula la posición final si cambia el viewport (rotación, barra del navegador…)
  let raf = 0;
  window.addEventListener('resize', () => {
    if (!drawn) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(computeLayout);
  });

  buildBackArt();
})();
