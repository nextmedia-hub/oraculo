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

  /* -----------------------------------------------------------------------
     FOIL: vanilla-tilt → variables CSS --x, --y, --foil
     vanilla-tilt emite 'tiltChange' con percentageX/Y (0–100) tanto con
     ratón como con giroscopio.
     ----------------------------------------------------------------------- */
  function setFoil(px, py) {
    const x = clamp(px, 0, 100);
    const y = clamp(py, 0, 100);
    // Intensidad del foil: base 0.15 en reposo → 1 con la carta muy inclinada
    const intensity = 0.15 + clamp(Math.hypot(x - 50, y - 50) / 60, 0, 1) * 0.85;
    els.tilt.style.setProperty('--x', `${x.toFixed(1)}%`);
    els.tilt.style.setProperty('--y', `${y.toFixed(1)}%`);
    els.tilt.style.setProperty('--foil', intensity.toFixed(2));
  }

  function initFoilTilt() {
    if (window.VanillaTilt) {
      VanillaTilt.init(els.tilt, {
        max: 14,                    // grados máximos de inclinación
        speed: 900,
        perspective: 1000,
        scale: 1.02,
        glare: false,               // usamos nuestro propio foil
        reset: true,
        'full-page-listening': true, // en desktop, toda la pantalla mueve la carta
        gyroscope: true,
        gyroscopeMinAngleX: -25, gyroscopeMaxAngleX: 25,
        gyroscopeMinAngleY: -25, gyroscopeMaxAngleY: 25,
      });
      els.tilt.addEventListener('tiltChange', (e) => setFoil(e.detail.percentageX, e.detail.percentageY));
    } else {
      // Fallback si el CDN falla: solo foil, sin rotación
      window.addEventListener('pointermove', (e) => {
        setFoil((e.clientX / window.innerWidth) * 100, (e.clientY / window.innerHeight) * 100);
      });
    }
  }

  // iOS 13+: el giroscopio requiere permiso explícito dentro de un gesto del usuario
  function requestGyroPermission() {
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      DOE.requestPermission().catch(() => {});
    }
  }

  /* -----------------------------------------------------------------------
     FLUJO PRINCIPAL
     ----------------------------------------------------------------------- */
  let drawn = false;

  async function draw() {
    if (drawn) return;           // bloquea nuevos clics
    drawn = true;

    requestGyroPermission();     // ¡tiene que ir antes de cualquier await!

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

    // 3) Foil interactivo
    initFoilTilt();

    // 4) Revelación del texto + CTA
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
