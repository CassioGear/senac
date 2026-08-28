/* ==========================================================================
   FUNKO STORE — Página de produto individual (Product.html?id=...)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = id ? funkoGetProductById(id) : null;

  if (!product) {
    root.innerHTML = `
      <div class="not-found">
        <h1>Produto não encontrado</h1>
        <p>O item que você procura pode ter saído de linha ou o link está incorreto.</p>
        <a class="btn btn-primary" href="Funko.html">Ver todos os produtos</a>
      </div>`;
    document.title = "Produto não encontrado — Funko Pop Store";
    return;
  }

  document.title = `${product.nome} — Funko Pop! ${product.franquia} | Funko Pop Store`;

  const discount = funkoDiscountPercent(product);
  const stockLabel = product.estoque === 0 ? "Fora de estoque"
    : product.estoque <= 8 ? `Últimas ${product.estoque} unidades`
    : "Em estoque";
  const stockClass = product.estoque === 0 ? "out" : product.estoque <= 8 ? "low" : "";

  document.querySelector("[data-breadcrumb-cat]").textContent =
    (FUNKO_CATEGORIAS.find(c => c.slug === product.categoria) || {}).nome || product.categoria;
  document.querySelector("[data-breadcrumb-cat]").href = `Funko.html?categoria=${product.categoria}`;
  document.querySelector("[data-breadcrumb-name]").textContent = product.nome;

  root.innerHTML = `
    <div class="product-detail" data-product-block>
      <div class="pd-gallery">
        <div class="pd-gallery-main">
          <span class="pop-number">Nº ${product.numero}</span>
          <img src="../Imagens/${product.imagem}" alt="Funko Pop! ${product.franquia} - ${product.nome}">
        </div>
        <div class="pd-thumbs">
          <button type="button" class="is-active"><img src="../Imagens/${product.imagem}" alt=""></button>
          <button type="button"><img src="../Imagens/${product.imagem}" alt="" style="transform: scaleX(-1);"></button>
          <button type="button"><img src="../Imagens/${product.imagem}" alt="" style="filter: grayscale(1) contrast(1.1);"></button>
        </div>
      </div>

      <div class="pd-info">
        <span class="card-franquia">${product.franquia}</span>
        <h1>${product.nome}</h1>
        <div class="pd-rating">
          <span class="stars">${funkoStars(product.avaliacao)}</span>
          <a href="#avaliacoes" data-tab-link="avaliacoes">${product.avaliacao.toFixed(1)} · ${product.avaliacoesQtd} avaliações</a>
        </div>

        <div class="pd-price-block">
          <span class="price-current">${funkoFormatBRL(product.preco)}</span>
          ${product.precoAntigo ? `<span class="price-old">${funkoFormatBRL(product.precoAntigo)}</span><span class="badge badge-desconto">-${discount}%</span>` : ""}
        </div>
        <p class="pd-installments">em até 3x de ${funkoFormatBRL(product.preco / 3)} sem juros, ou 5% de desconto no Pix</p>

        <div class="pd-stock ${stockClass}"><span class="dot"></span> ${stockLabel}</div>

        <p class="pd-desc">${product.descricao}</p>

        <div class="pd-actions">
          <div class="qty-stepper">
            <button type="button" data-qty-decrease>−</button>
            <input type="text" inputmode="numeric" value="1" data-qty-input readonly>
            <button type="button" data-qty-increase>+</button>
          </div>
          <button type="button" class="btn btn-primary" data-add-to-cart="${product.id}" ${product.estoque === 0 ? "disabled" : ""}>
            ${product.estoque === 0 ? "Indisponível" : "Adicionar ao carrinho"}
          </button>
          <a href="Cart.html" class="btn btn-outline" data-buy-now>Comprar agora</a>
        </div>

        <ul class="pd-meta-list">
          <li><span>SKU</span><span>FK-${product.numero}-${product.id.slice(-4).toUpperCase()}</span></li>
          <li><span>Franquia</span><span>${product.franquia}</span></li>
          <li><span>Número da figura</span><span>${product.numero}</span></li>
          <li><span>Altura aproximada</span><span>9,5 cm</span></li>
          <li><span>Material</span><span>Vinil</span></li>
          <li><span>Licença</span><span>Produto oficial licenciado</span></li>
        </ul>

        <div class="pd-perks">
          <div class="pd-perk"><span class="icon">🚚</span> Envio para todo o Brasil</div>
          <div class="pd-perk"><span class="icon">↩️</span> Troca grátis em até 30 dias</div>
          <div class="pd-perk"><span class="icon">🛡️</span> Compra 100% segura</div>
        </div>
      </div>
    </div>

    <div class="pd-tabs">
      <div class="tabs-nav">
        <button type="button" class="is-active" data-tab="descricao">Descrição</button>
        <button type="button" data-tab="especificacoes">Especificações</button>
        <button type="button" data-tab="avaliacoes" id="avaliacoes">Avaliações (${product.avaliacoesQtd})</button>
      </div>

      <div class="tab-panel is-active" data-tab-panel="descricao">
        <p>${product.descricao}</p>
        <p>Toda figura Funko Pop! é fabricada em vinil resistente, com a icônica cabeça grande e olhos expressivos que definem a linha desde 2010. Uma peça que combina o carinho pelo personagem com o design minimalista que virou febre entre colecionadores no mundo todo.</p>
        <p>Vem em caixa com janela transparente, ideal tanto para exposição fora da embalagem quanto para quem prefere manter lacrado (mint on card) e valorizar o item com o tempo.</p>
      </div>

      <div class="tab-panel" data-tab-panel="especificacoes">
        <table class="spec-table">
          <tr><td>Franquia</td><td>${product.franquia}</td></tr>
          <tr><td>Categoria</td><td>${(FUNKO_CATEGORIAS.find(c => c.slug === product.categoria) || {}).nome || product.categoria}</td></tr>
          <tr><td>Número</td><td>${product.numero}</td></tr>
          <tr><td>Material</td><td>Vinil (PVC)</td></tr>
          <tr><td>Altura</td><td>Aprox. 9,5 cm</td></tr>
          <tr><td>Embalagem</td><td>Caixa com janela ilustrada</td></tr>
          <tr><td>Faixa etária</td><td>Recomendado para colecionadores 15+</td></tr>
          <tr><td>Origem</td><td>Importado</td></tr>
        </table>
      </div>

      <div class="tab-panel" data-tab-panel="avaliacoes">
        <div class="review-summary">
          <span class="big-score">${product.avaliacao.toFixed(1)}</span>
          <div>
            <span class="stars">${funkoStars(product.avaliacao)}</span>
            <p style="margin:4px 0 0;">Baseado em ${product.avaliacoesQtd} avaliações verificadas</p>
          </div>
        </div>
        ${buildFakeReviews(product)}
      </div>
    </div>

    <section class="section" data-related-section>
      <div class="section-head">
        <h2>Você também pode gostar</h2>
      </div>
      <div class="product-grid" data-related-grid></div>
    </section>
  `;

  /* Quantidade */
  const qtyInput = root.querySelector("[data-qty-input]");
  root.querySelector("[data-qty-increase]").addEventListener("click", () => {
    qtyInput.value = Math.min(product.estoque || 99, parseInt(qtyInput.value, 10) + 1);
  });
  root.querySelector("[data-qty-decrease]").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
  });

  /* Comprar agora: adiciona e vai direto pro carrinho */
  root.querySelector("[data-buy-now]").addEventListener("click", (e) => {
    e.preventDefault();
    FunkoCart.addItem(product.id, Math.max(1, parseInt(qtyInput.value, 10) || 1));
    window.location.href = "Cart.html";
  });

  /* Miniaturas da galeria */
  root.querySelectorAll(".pd-thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".pd-thumbs button").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      root.querySelector(".pd-gallery-main img").src = btn.querySelector("img").src;
      root.querySelector(".pd-gallery-main img").style.transform = btn.querySelector("img").style.transform || "none";
      root.querySelector(".pd-gallery-main img").style.filter = btn.querySelector("img").style.filter || "none";
    });
  });

  /* Tabs */
  root.querySelectorAll("[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-tab");
      root.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("is-active", b === btn));
      root.querySelectorAll("[data-tab-panel]").forEach(p => p.classList.toggle("is-active", p.getAttribute("data-tab-panel") === key));
    });
  });
  root.querySelectorAll("[data-tab-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      root.querySelector(`[data-tab="${link.getAttribute("data-tab-link")}"]`).click();
    });
  });

  /* Relacionados */
  const related = funkoRelatedProducts(product, 4);
  root.querySelector("[data-related-grid]").innerHTML = related.length
    ? related.map(funkoBuildCard).join("")
    : "";
  if (related.length === 0) root.querySelector("[data-related-section]").style.display = "none";
});

function buildFakeReviews(product) {
  const reviewers = ["Camila R.", "Bruno S.", "Larissa T.", "Diego M."];
  const comments = [
    "Chegou super bem embalado, a pintura ficou impecável e mais bonito ainda pessoalmente.",
    "Já é o quinto Funko que compro aqui, entrega sempre rápida e produto original.",
    "Acabamento de qualidade, caixa perfeita para exposição. Recomendo demais!",
    "Ótimo custo-benefício, mas a entrega demorou um pouco mais do que o esperado.",
  ];
  return reviewers.map((name, i) => `
    <div class="review-item">
      <div class="review-head">
        <span class="review-author">${name}</span>
        <span class="review-date">há ${(i + 1) * 8} dias</span>
      </div>
      <span class="stars">${funkoStars(5 - (i === 3 ? 1 : 0))}</span>
      <p style="margin-top:6px;">${comments[i]}</p>
    </div>
  `).join("");
}
