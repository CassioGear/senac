/* ==========================================================================
   FUNKO STORE — Comportamento geral do site
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------- Menu mobile ---------------------------- */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const header = document.querySelector(".site-header");
  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => header.classList.toggle("menu-open"));
  }

  /* ------------------------------ Busca --------------------------------- */
  document.querySelectorAll("[data-search-form]").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input");
      const term = (input.value || "").trim();
      const url = new URL("Funko.html", window.location.href);
      if (term) url.searchParams.set("busca", term);
      window.location.href = url.pathname.split("/").pop() + url.search;
    });
  });

  /* --------------------------- Hero carousel ----------------------------- */
  const heroWindow = document.querySelector("[data-hero-window]");
  if (heroWindow) {
    const slides = FUNKO_PRODUCTS.filter(p => p.selos.includes("novidade") || p.selos.includes("mais-vendido")).slice(0, 5);
    const img = heroWindow.querySelector("img");
    const dotsWrap = document.querySelector("[data-hero-dots]");
    const nameEl = document.querySelector("[data-hero-name]");
    let idx = 0;
    let timer = null;

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = slides.map((s, i) =>
        `<button type="button" data-i="${i}" class="${i === idx ? "is-active" : ""}" aria-label="Ver ${s.nome}"></button>`
      ).join("");
    }

    function show(i) {
      idx = i;
      const p = slides[idx];
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = "../Imagens/" + p.imagem;
        img.alt = "Funko Pop! " + p.nome;
        img.style.opacity = "1";
        if (nameEl) nameEl.textContent = p.nome + " — " + p.franquia;
      }, 150);
      renderDots();
    }

    function next() { show((idx + 1) % slides.length); }
    function prev() { show((idx - 1 + slides.length) % slides.length); }
    function start() { stop(); timer = setInterval(next, 4500); }
    function stop() { if (timer) clearInterval(timer); }

    document.querySelector("[data-hero-next]")?.addEventListener("click", () => { next(); start(); });
    document.querySelector("[data-hero-prev]")?.addEventListener("click", () => { prev(); start(); });
    dotsWrap?.addEventListener("click", e => {
      const btn = e.target.closest("button[data-i]");
      if (!btn) return;
      show(parseInt(btn.getAttribute("data-i"), 10));
      start();
    });
    heroWindow.addEventListener("mouseenter", stop);
    heroWindow.addEventListener("mouseleave", start);

    img.style.transition = "opacity 200ms ease";
    show(0);
    start();
  }

  /* ------------------------ Renderização da Home -------------------------- */
  renderHomeSection("[data-home-bestsellers]", p => p.selos.includes("mais-vendido"), 4);
  renderHomeSection("[data-home-novidades]", p => p.selos.includes("novidade"), 4);
  renderHomePromo();

  /* ------------------------------ Newsletter ------------------------------ */
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input");
      funkoToast("Inscrição confirmada! Fique de olho no seu e-mail para novidades e cupons.");
      form.reset();
    });
  });

  /* --------------------------- Contador de promoção ------------------------ */
  initCountdown();
});

function funkoStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function funkoBuildCard(p) {
  const discount = funkoDiscountPercent(p);
  const badgesHtml = p.selos.map(s => `<span class="badge badge-${s}">${FUNKO_SELOS_LABEL[s] || s}</span>`).join("");
  const discountBadge = discount > 0 ? `<span class="badge badge-desconto">-${discount}%</span>` : "";
  return `
    <a class="product-card" href="Product.html?id=${p.id}">
      <div class="card-media">
        <span class="pop-number">Nº ${p.numero}</span>
        <div class="card-badges">${discountBadge}${badgesHtml}</div>
        <img src="../Imagens/${p.imagem}" alt="Funko Pop! ${p.franquia} - ${p.nome} ${p.numero}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-franquia">${p.franquia}</span>
        <span class="card-nome">${p.nome}</span>
        <span class="card-rating"><span class="stars">${funkoStars(p.avaliacao)}</span> (${p.avaliacoesQtd})</span>
        <div class="card-price-row">
          <span class="price-current">${funkoFormatBRL(p.preco)}</span>
          ${p.precoAntigo ? `<span class="price-old">${funkoFormatBRL(p.precoAntigo)}</span>` : ""}
        </div>
        <div class="card-cta">
          <button type="button" class="btn btn-outline btn-sm" data-add-to-cart="${p.id}">Adicionar ao carrinho</button>
        </div>
      </div>
    </a>`;
}

function renderHomeSection(selector, filterFn, limit) {
  const el = document.querySelector(selector);
  if (!el) return;
  const items = FUNKO_PRODUCTS.filter(filterFn).slice(0, limit);
  el.innerHTML = items.map(funkoBuildCard).join("");
}

function renderHomePromo() {
  const el = document.querySelector("[data-home-promo]");
  if (!el) return;
  const items = FUNKO_PRODUCTS.filter(p => p.selos.includes("promocao")).slice(0, 4);
  el.innerHTML = items.map(funkoBuildCard).join("");
}

function initCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;
  const deadline = new Date();
  deadline.setHours(23, 59, 59, 0);
  if (deadline < new Date()) deadline.setDate(deadline.getDate() + 1);

  function tick() {
    const diff = Math.max(0, deadline - new Date());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.querySelector("[data-h]").textContent = String(h).padStart(2, "0");
    el.querySelector("[data-m]").textContent = String(m).padStart(2, "0");
    el.querySelector("[data-s]").textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}
