/* ==========================================================================
   FUNKO STORE — Página de carrinho e checkout
   ========================================================================== */

const FRETE_PADRAO = 19.90;
const FRETE_GRATIS_ACIMA_DE = 250;

document.addEventListener("DOMContentLoaded", function () {
  renderCartPage();
  renderCheckoutPage();
  document.addEventListener("funko:cart-updated", renderCartPage);
});

function currentFrete(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FRETE_GRATIS_ACIMA_DE ? 0 : FRETE_PADRAO;
}

function renderCartPage() {
  const wrap = document.querySelector("[data-cart-page]");
  if (!wrap) return;

  const items = FunkoCart.getDetailedItems();
  const subtotal = FunkoCart.getSubtotal();
  const frete = currentFrete(subtotal);
  const total = subtotal + frete;

  if (items.length === 0) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h2>Seu carrinho está vazio</h2>
        <p>Que tal dar uma olhada nos nossos lançamentos e promoções?</p>
        <a href="Funko.html" class="btn btn-primary">Ver produtos</a>
      </div>`;
    return;
  }

  wrap.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items" data-cart-items></div>
      <aside class="cart-summary">
        <h3>Resumo do pedido</h3>
        <div class="summary-row"><span>Subtotal</span><span>${funkoFormatBRL(subtotal)}</span></div>
        <div class="summary-row"><span>Frete</span><span>${frete === 0 ? "Grátis" : funkoFormatBRL(frete)}</span></div>
        <p class="shipping-note">${frete === 0 ? "Você ganhou frete grátis!" : `Faltam ${funkoFormatBRL(FRETE_GRATIS_ACIMA_DE - subtotal)} para frete grátis.`}</p>
        <div class="cep-row">
          <input type="text" placeholder="Seu CEP" maxlength="9" data-cep-input>
          <button type="button" data-cep-calc>Calcular</button>
        </div>
        <div class="summary-row total"><span>Total</span><span data-cart-total>${funkoFormatBRL(total)}</span></div>
        <a href="Checkout.html" class="btn btn-primary btn-block">Finalizar compra</a>
        <a href="Funko.html" class="btn btn-outline btn-block" style="margin-top:10px;">Continuar comprando</a>
        <div class="trust-badges">
          <div class="item"><span class="icon">🔒</span>Pagamento seguro</div>
          <div class="item"><span class="icon">↩️</span>Troca em 30 dias</div>
          <div class="item"><span class="icon">🚚</span>Envio nacional</div>
        </div>
      </aside>
    </div>
  `;

  const itemsWrap = wrap.querySelector("[data-cart-items]");
  itemsWrap.innerHTML = items.map(item => `
    <div class="cart-item">
      <a href="Product.html?id=${item.id}" class="item-media">
        <img src="../Imagens/${item.imagem}" alt="${item.nome}">
      </a>
      <div class="item-info">
        <span class="card-franquia">${item.franquia}</span>
        <h3><a href="Product.html?id=${item.id}">${item.nome}</a></h3>
        <div class="qty-stepper">
          <button type="button" data-cart-decrease="${item.id}">−</button>
          <input type="text" value="${item.qty}" readonly>
          <button type="button" data-cart-increase="${item.id}">+</button>
        </div>
        <button type="button" class="remove-btn" data-cart-remove="${item.id}">Remover</button>
      </div>
      <div class="item-price">
        ${funkoFormatBRL(item.lineTotal)}
        <span class="unit">${funkoFormatBRL(item.preco)} un.</span>
      </div>
    </div>
  `).join("");

  itemsWrap.querySelectorAll("[data-cart-increase]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cart-increase");
      const item = items.find(i => i.id === id);
      FunkoCart.setQty(id, item.qty + 1);
    });
  });
  itemsWrap.querySelectorAll("[data-cart-decrease]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cart-decrease");
      const item = items.find(i => i.id === id);
      FunkoCart.setQty(id, item.qty - 1);
    });
  });
  itemsWrap.querySelectorAll("[data-cart-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      FunkoCart.removeItem(btn.getAttribute("data-cart-remove"));
      funkoToast("Produto removido do carrinho");
    });
  });

  wrap.querySelector("[data-cep-calc]")?.addEventListener("click", () => {
    const cep = wrap.querySelector("[data-cep-input]").value.trim();
    if (cep.length < 8) { funkoToast("Digite um CEP válido"); return; }
    funkoToast("Frete calculado para o CEP " + cep);
  });
}

function renderCheckoutPage() {
  const wrap = document.querySelector("[data-checkout-page]");
  if (!wrap) return;

  const items = FunkoCart.getDetailedItems();
  const subtotal = FunkoCart.getSubtotal();

  if (items.length === 0) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos antes de finalizar a compra.</p>
        <a href="Funko.html" class="btn btn-primary">Ver produtos</a>
      </div>`;
    return;
  }

  const frete = currentFrete(subtotal);
  const total = subtotal + frete;

  wrap.innerHTML = `
    <div class="checkout-steps">
      <span class="step is-active"><span class="num">1</span> Dados e entrega</span>
      <span class="sep">—</span>
      <span class="step"><span class="num">2</span> Pagamento</span>
      <span class="sep">—</span>
      <span class="step"><span class="num">3</span> Confirmação</span>
    </div>

    <form class="checkout-layout" data-checkout-form novalidate>
      <div>
        <div class="form-card">
          <h3>Dados pessoais</h3>
          <div class="form-grid">
            <div class="form-field full"><label>Nome completo</label><input type="text" required></div>
            <div class="form-field"><label>E-mail</label><input type="email" required></div>
            <div class="form-field"><label>Telefone</label><input type="tel" required></div>
          </div>
        </div>

        <div class="form-card">
          <h3>Endereço de entrega</h3>
          <div class="form-grid">
            <div class="form-field"><label>CEP</label><input type="text" required></div>
            <div class="form-field"><label>Cidade</label><input type="text" required></div>
            <div class="form-field full"><label>Endereço</label><input type="text" required></div>
            <div class="form-field"><label>Número</label><input type="text" required></div>
            <div class="form-field"><label>Complemento</label><input type="text"></div>
            <div class="form-field">
              <label>Estado</label>
              <select required>
                <option value="">Selecione</option>
                <option>MG</option><option>SP</option><option>RJ</option><option>ES</option>
                <option>PR</option><option>SC</option><option>RS</option><option>BA</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3>Forma de pagamento</h3>
          <div class="payment-options" data-payment-options>
            <label class="payment-option">
              <input type="radio" name="pagamento" value="pix" checked> Pix — 5% de desconto
            </label>
            <label class="payment-option">
              <input type="radio" name="pagamento" value="cartao"> Cartão de crédito — em até 3x sem juros
              <div class="payment-detail">
                <div class="form-grid" style="margin-top:12px;">
                  <div class="form-field full"><label>Número do cartão</label><input type="text" placeholder="0000 0000 0000 0000"></div>
                  <div class="form-field"><label>Validade</label><input type="text" placeholder="MM/AA"></div>
                  <div class="form-field"><label>CVV</label><input type="text" placeholder="123"></div>
                </div>
              </div>
            </label>
            <label class="payment-option">
              <input type="radio" name="pagamento" value="boleto"> Boleto bancário
            </label>
          </div>
        </div>
      </div>

      <aside class="cart-summary">
        <h3>Resumo do pedido</h3>
        ${items.map(i => `
          <div class="summary-row"><span>${i.qty}x ${i.nome}</span><span>${funkoFormatBRL(i.lineTotal)}</span></div>
        `).join("")}
        <div class="summary-row"><span>Frete</span><span>${frete === 0 ? "Grátis" : funkoFormatBRL(frete)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${funkoFormatBRL(total)}</span></div>
        <button type="submit" class="btn btn-primary btn-block">Confirmar pedido</button>
        <a href="Cart.html" class="btn btn-outline btn-block" style="margin-top:10px;">Voltar ao carrinho</a>
      </aside>
    </form>
  `;

  wrap.querySelectorAll('[data-payment-options] input[type="radio"]').forEach(radio => {
    radio.addEventListener("change", () => {
      wrap.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("is-selected"));
      radio.closest(".payment-option").classList.add("is-selected");
    });
  });

  wrap.querySelector("[data-checkout-form]").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!this.checkValidity()) { this.reportValidity(); return; }
    const orderNumber = "FK-" + Math.floor(100000 + Math.random() * 900000);
    FunkoCart.clear();
    wrap.innerHTML = `
      <div class="order-confirmation">
        <div class="check-circle">✓</div>
        <h1>Pedido confirmado!</h1>
        <p>Obrigado pela compra. Enviamos os detalhes para o seu e-mail.</p>
        <p class="order-number">#${orderNumber}</p>
        <a href="Funko.html" class="btn btn-primary">Continuar comprando</a>
      </div>`;
  });
}
