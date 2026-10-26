// quiz-app.js — Aplicación del quiz (vanilla JS, sin frameworks)

(() => {
  // ────────────────────────────────────────────────────
  // ESTADO
  // ────────────────────────────────────────────────────
  const state = {
    screen: "login",   // "login" | "quiz" | "result"
    user:   null,      // { cc, name, lastName, email, program }
    answers: {},       // { qId: { blankId: value } }
    current: 0,        // índice de pregunta activa (0-based)
  };

  // ────────────────────────────────────────────────────
  // UTILIDADES
  // ────────────────────────────────────────────────────
  function $(id) { return document.getElementById(id); }

  const TOTAL_PTS = QUIZ_QUESTIONS.reduce((t, q) => t + q.points, 0);

  // Puntaje parcial: cada espacio correcto vale su fracción de la pregunta
  function questionScore(q) {
    const ans = state.answers[q.id] || {};
    const ok  = q.blanks.filter(b => ans[b.id] === b.correct).length;
    return (ok / q.blanks.length) * q.points;
  }

  function score() {
    return QUIZ_QUESTIONS.reduce((total, q) => total + questionScore(q), 0);
  }

  function fmt(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  function answeredCount() {
    return QUIZ_QUESTIONS.filter(q => {
      const ans = state.answers[q.id] || {};
      return q.blanks.every(b => ans[b.id] !== undefined);
    }).length;
  }

  function sectionColor(sectionId) {
    return (QUIZ_SECTIONS.find(s => s.id === sectionId) || {}).color || "#6B7280";
  }

  function sectionName(sectionId) {
    return (QUIZ_SECTIONS.find(s => s.id === sectionId) || {}).abbrev || "?";
  }

  // Escapa HTML para mostrar código sin XSS
  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Convierte código con [1],[2],... a HTML con spans resaltados
  // Solo se reemplazan los números que son espacios de la pregunta
  // (así df.iloc[0] no se confunde con un espacio en blanco)
  function renderCode(code, qId) {
    const ans = state.answers[qId] || {};
    const q   = QUIZ_QUESTIONS.find(x => x.id === qId);
    const ids = new Set(q.blanks.map(b => b.id));
    let html = escHtml(code);
    html = html.replace(/(#[^\n]*)/g, '<span class="code-comment">$1</span>');
    html = html.replace(/\[(\d+)\]/g, (m, n) => {
      if (!ids.has(parseInt(n))) return m;
      const val = ans[parseInt(n)];
      if (val) {
        return `<span class="blank filled" data-blank="${n}">${escHtml(val)}</span>`;
      }
      return `<span class="blank empty" data-blank="${n}">[${n}]</span>`;
    });
    return html;
  }

  // ────────────────────────────────────────────────────
  // PANTALLA: LOGIN
  // ────────────────────────────────────────────────────
  function renderLogin() {
    return `
    <div class="screen-login">
      <div class="card login-card">
        <div class="login-header">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="96" height="96" aria-label="Python logo">
              <!-- Serpiente azul (arriba-izquierda) -->
              <path d="M54 10
                C36 10 28 18 28 30
                L28 42 54 42 54 46
                L22 46 C10 46 10 62 22 66
                L22 74 C22 88 34 96 54 96
                C58 96 62 95 66 94
                L66 82 54 82 C44 82 38 76 38 68
                L38 46 54 46 Z"
                fill="#3776AB"/>
              <!-- Pupila serpiente azul -->
              <circle cx="38" cy="30" r="4" fill="white"/>
              <circle cx="39" cy="30" r="2" fill="#1a1a2e"/>
              <!-- Serpiente amarilla (abajo-derecha) -->
              <path d="M56 100
                C74 100 82 92 82 80
                L82 68 56 68 56 64
                L88 64 C100 64 100 48 88 44
                L88 36 C88 22 76 14 56 14
                C52 14 48 15 44 16
                L44 28 56 28 C66 28 72 34 72 42
                L72 64 56 64 Z"
                fill="#FFD43B"/>
              <!-- Pupila serpiente amarilla -->
              <circle cx="72" cy="80" r="4" fill="white"/>
              <circle cx="73" cy="80" r="2" fill="#1a1a2e"/>
            </svg>
          </div>
          <p class="quiz-label">Quiz Cuatro</p>
          <h1>Evaluación de Pandas</h1>
          <p class="subtitle">DataFrame · Índice · Operaciones · Gráficos</p>
          <p class="subtitle">${QUIZ_QUESTIONS.length} Preguntas — ${TOTAL_PTS} Puntos</p>
        </div>
        <div class="login-instructions">
          <h3>Instrucciones Generales</h3>
          <ul>
            <li>Completa los <strong>espacios en blanco</strong> en cada fragmento de código Python, marcados como <span class="blank empty">[1]</span>.</li>
            <li>Los comentarios <span class="code-comment"># Rellena:</span> te dan pistas sobre qué escribir. Se usa el alias <code>pd</code> para Pandas.</li>
            <li>Esta evaluación se centra en: la estructura del DataFrame, el Índice (su rol y uso), y operaciones básicas (matemáticas, estadísticas, graficación).</li>
            <li>Presta atención a la <strong>sintaxis exacta</strong>.</li>
          </ul>
        </div>
        <form id="login-form" class="login-form" novalidate>
          <div class="field">
            <label>C.C. / TID *</label>
            <input required name="cc" type="text" placeholder="Número de identificación" autocomplete="off"/>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Nombre *</label>
              <input required name="name" type="text" placeholder="Juan"/>
            </div>
            <div class="field">
              <label>Apellidos *</label>
              <input required name="lastName" type="text" placeholder="Pérez"/>
            </div>
          </div>
          <div class="field">
            <label>Programa *</label>
            <input required name="program" type="text" placeholder="Ingeniería de Sistemas"/>
          </div>
          <div class="field">
            <label>Correo *</label>
            <input required name="email" type="email" placeholder="juan@email.com"/>
          </div>
          <button type="submit" class="btn btn-primary btn-lg">Iniciar Evaluación →</button>
        </form>
      </div>
    </div>`;
  }

  // ────────────────────────────────────────────────────
  // PANTALLA: QUIZ
  // ────────────────────────────────────────────────────
  function renderQuiz() {
    const q   = QUIZ_QUESTIONS[state.current];
    const ans = state.answers[q.id] || {};
    const done = answeredCount();
    const pct  = Math.round((done / QUIZ_QUESTIONS.length) * 100);

    // Sección progress sidebar
    const sectionProgress = QUIZ_SECTIONS.map(sec => {
      const secQs      = QUIZ_QUESTIONS.filter(x => x.section === sec.id);
      const secDone    = secQs.filter(x => {
        const a = state.answers[x.id] || {};
        return x.blanks.every(b => a[b.id] !== undefined);
      }).length;
      return `
        <div class="sec-item">
          <span class="sec-dot" style="background:${sec.color}"></span>
          <span class="sec-name">${sec.name}</span>
          <span class="sec-count">${secDone}/${secQs.length}</span>
        </div>`;
    }).join("");

    // Opciones por cada espacio en blanco
    const blanksHtml = q.blanks.map(b => {
      const selected = ans[b.id];
      const optsHtml = b.options.map((opt, idx) => {
        const letter  = String.fromCharCode(65 + idx);
        const active  = selected === opt ? "active" : "";
        return `<button class="opt-btn ${active}"
                  data-qid="${q.id}" data-blank="${b.id}" data-val="${escHtml(opt)}">
                  <span class="opt-letter">${letter}</span>
                  <code>${escHtml(opt)}</code>
                </button>`;
      }).join("");
      return `
        <div class="blank-row">
          <span class="blank-label">Espacio [${b.id}]:</span>
          <div class="opts">${optsHtml}</div>
        </div>`;
    }).join("");

    const isLast    = state.current === QUIZ_QUESTIONS.length - 1;
    const allFilled = q.blanks.every(b => ans[b.id] !== undefined);

    return `
    <div class="screen-quiz">
      <!-- Header -->
      <header class="quiz-header">
        <div class="header-left">
          <span class="header-title">Evaluación de Pandas</span>
          <span class="header-user">${state.user.name} ${state.user.lastName}</span>
        </div>
        <div class="header-right">
          <span class="progress-label">Completadas: ${done}/${QUIZ_QUESTIONS.length}</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
      </header>

      <div class="quiz-body">
        <!-- Pregunta principal -->
        <div class="question-card">
          <div class="q-meta">
            <span class="q-num">Pregunta ${state.current + 1} / ${QUIZ_QUESTIONS.length}</span>
            <span class="q-sec" style="background:${sectionColor(q.section)}20;color:${sectionColor(q.section)};border:1px solid ${sectionColor(q.section)}40">
              ${sectionName(q.section)}
            </span>
            <span class="q-pts">${q.points} pt${q.points > 1 ? "s" : ""}</span>
            <span class="q-topic">${q.topic}</span>
          </div>

          <p class="q-text">${escHtml(q.question).replace(/`([^`]+)`/g, "<code>$1</code>")}</p>

          <pre class="code-block"><code>${renderCode(q.code, q.id)}</code></pre>

          <div class="blanks-section">
            <p class="blanks-hint">Selecciona la opción correcta para cada espacio:</p>
            ${blanksHtml}
          </div>

          <div class="q-nav">
            <button id="btn-prev" class="btn btn-secondary" ${state.current === 0 ? "disabled" : ""}>
              ← Anterior
            </button>
            <div class="q-dots">
              ${QUIZ_QUESTIONS.slice(Math.max(0, state.current - 2), state.current + 3).map((x, i) => {
                const realIdx = Math.max(0, state.current - 2) + i;
                const isActive  = realIdx === state.current;
                const isDone = x.blanks.every(b => (state.answers[x.id] || {})[b.id] !== undefined);
                return `<span class="dot ${isActive ? "dot-active" : ""} ${isDone ? "dot-done" : ""}"></span>`;
              }).join("")}
            </div>
            ${isLast
              ? `<button id="btn-submit" class="btn btn-success" ${!allFilled ? "disabled" : ""}>
                   Finalizar ✓
                 </button>`
              : `<button id="btn-next" class="btn btn-primary">
                   Siguiente →
                 </button>`
            }
          </div>
          ${isLast && !allFilled
            ? `<p class="warn-msg">⚠ Completa todos los espacios para finalizar.</p>`
            : ""}
        </div>

        <!-- Sidebar de secciones -->
        <aside class="sidebar">
          <h3>Secciones</h3>
          ${sectionProgress}
          <div class="sidebar-total">
            <span>Total respondidas</span>
            <strong>${done} / ${QUIZ_QUESTIONS.length}</strong>
          </div>
        </aside>
      </div>
    </div>`;
  }

  // ────────────────────────────────────────────────────
  // PANTALLA: RESULTADO
  // ────────────────────────────────────────────────────
  function gradeMessage(pct) {
    if (pct >= 90) return "¡Excelente comprensión de los fundamentos de Pandas!";
    if (pct >= 80) return "¡Muy buen trabajo con los conceptos básicos!";
    if (pct >= 70) return "Buen manejo de DataFrame e Índice";
    if (pct >= 60) return "Aprobado, ¡repasa algunos detalles!";
    return "Necesitas reforzar los conceptos fundamentales de Pandas";
  }

  function renderResult() {
    const s   = score();
    const pct = Math.round((s / TOTAL_PTS) * 100);
    const u   = state.user;

    const bySection = QUIZ_SECTIONS.map(sec => {
      const secQs    = QUIZ_QUESTIONS.filter(q => q.section === sec.id);
      const secScore = secQs.reduce((t, q) => t + questionScore(q), 0);
      const maxScore = secQs.reduce((t, q) => t + q.points, 0);
      const spct     = Math.round((secScore / maxScore) * 100);
      return `
        <div class="sec-result">
          <div class="sec-result-header">
            <span style="color:${sec.color}">${sec.name}</span>
            <span>${fmt(secScore)}/${maxScore}</span>
          </div>
          <div class="mini-bar"><div style="width:${spct}%;background:${sec.color}"></div></div>
        </div>`;
    }).join("");

    const pythonLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="96" height="96" aria-label="Python logo">
              <path d="M54 10
                C36 10 28 18 28 30
                L28 42 54 42 54 46
                L22 46 C10 46 10 62 22 66
                L22 74 C22 88 34 96 54 96
                C58 96 62 95 66 94
                L66 82 54 82 C44 82 38 76 38 68
                L38 46 54 46 Z"
                fill="#3776AB"/>
              <circle cx="38" cy="30" r="4" fill="white"/>
              <circle cx="39" cy="30" r="2" fill="#1a1a2e"/>
              <path d="M56 100
                C74 100 82 92 82 80
                L82 68 56 68 56 64
                L88 64 C100 64 100 48 88 44
                L88 36 C88 22 76 14 56 14
                C52 14 48 15 44 16
                L44 28 56 28 C66 28 72 34 72 42
                L72 64 56 64 Z"
                fill="#FFD43B"/>
              <circle cx="72" cy="80" r="4" fill="white"/>
              <circle cx="73" cy="80" r="2" fill="#1a1a2e"/>
            </svg>`;

    return `
    <div class="screen-result">
      <div class="result-card">
        <div class="result-emoji">${pythonLogo}</div>
        <h1>Evaluación Completada</h1>
        <p class="result-sub">Los resultados han sido registrados.</p>

        <div class="score-box">
          <div class="score-num">${fmt(s)}</div>
          <div class="score-denom">/ ${TOTAL_PTS} puntos</div>
          <div class="score-pct">${pct}%</div>
          <div class="score-msg">${gradeMessage(pct)}</div>
        </div>

        <div class="result-sections">
          <h3>Detalle por sección</h3>
          ${bySection}
        </div>

        <div class="result-info">
          <p><strong>Estudiante:</strong> ${escHtml(u.name)} ${escHtml(u.lastName)}</p>
          <p><strong>CC / TID:</strong> ${escHtml(u.cc)}</p>
          <p><strong>Programa:</strong> ${escHtml(u.program)}</p>
          <p><strong>Correo:</strong> ${escHtml(u.email)}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-CO")}</p>
        </div>

        <button id="btn-restart" class="btn btn-secondary">↺ Nueva Evaluación</button>
      </div>
    </div>`;
  }

  // ────────────────────────────────────────────────────
  // RENDER PRINCIPAL
  // ────────────────────────────────────────────────────
  function render() {
    const root = document.getElementById("root");
    switch (state.screen) {
      case "login":  root.innerHTML = renderLogin();  break;
      case "quiz":   root.innerHTML = renderQuiz();   break;
      case "result": root.innerHTML = renderResult(); break;
    }
    attachEvents();
  }

  // ────────────────────────────────────────────────────
  // EVENTOS
  // ────────────────────────────────────────────────────
  function attachEvents() {
    if (state.screen === "login") {
      $("login-form").addEventListener("submit", e => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        state.user = {
          cc:       fd.get("cc").trim(),
          name:     fd.get("name").trim(),
          lastName: fd.get("lastName").trim(),
          program:  fd.get("program").trim(),
          email:    fd.get("email").trim(),
        };
        state.screen  = "quiz";
        state.current = 0;
        render();
      });
    }

    if (state.screen === "quiz") {
      // Opciones de respuesta
      document.querySelectorAll(".opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const qid   = parseInt(btn.dataset.qid);
          const blank = parseInt(btn.dataset.blank);
          const val   = btn.dataset.val;

          if (!state.answers[qid]) state.answers[qid] = {};

          // Toggle: si ya está seleccionado, deseleccionar
          if (state.answers[qid][blank] === val) {
            delete state.answers[qid][blank];
          } else {
            state.answers[qid][blank] = val;
          }
          render();
        });
      });

      // Navegación
      const prev = $("btn-prev");
      const next = $("btn-next");
      const sub  = $("btn-submit");

      if (prev) prev.addEventListener("click", () => { state.current--; render(); });
      if (next) next.addEventListener("click", () => { state.current++; render(); });
      if (sub)  sub.addEventListener("click",  submitQuiz);
    }

    if (state.screen === "result") {
      $("btn-restart").addEventListener("click", () => {
        state.screen  = "login";
        state.user    = null;
        state.answers = {};
        state.current = 0;
        render();
      });
    }
  }

  // ────────────────────────────────────────────────────
  // ENVÍO FINAL
  // ────────────────────────────────────────────────────
  function submitQuiz() {
    const s = score();
    const u = state.user;

    // Enviar a Google Forms (definido en sheets-integration.js)
    if (typeof window.submitQuizResults === "function") {
      window.submitQuizResults({
        cedula:   u.cc,
        nombre:   u.name,
        apellido: u.lastName,
        email:    u.email,
        programa: u.program,
        nota:     fmt(s),
        total:    TOTAL_PTS,
        porcentaje: ((s / TOTAL_PTS) * 100).toFixed(1) + "%",
      });
    }

    state.screen = "result";
    render();
  }

  // ────────────────────────────────────────────────────
  // ARRANQUE
  // ────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", render);
})();
