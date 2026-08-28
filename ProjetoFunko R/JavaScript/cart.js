const FunkoCart = (function () {
  const KEY = "funko_cart_v2";

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("funko:cart-updated", { detail: { items } }));
  }

  function addItem(id, qty = 1) {
    const items = read();
    const existing = items.find(i => i.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id, qty });
    }
    write(items);
  }

  function removeItem(id) {
    write(read().filter(i => i.id !== id));
  }

  function setQty(id, qty) {
    const items = read();
    const existing = items.find(i => i.id === id);
    if (!existing) return;
    if (qty <= 0) {
      write(items.filter(i => i.id !== id));
    } else {
      existing.qty = qty;
      write(items);
    }
  }

  function clear() {
    write([]);
  }

  function getCount() {
    return read().reduce((sum, i) => sum + i.qty, 0);
  }

  /* Junta os itens do carrinho com os dados completos do produto */
  function getDetailedItems() {
    return read()
      .map(i => {
        const product = typeof funkoGetProductById === "function" ? funkoGetProductById(i.id) : null;
        if (!product) return null;
        return { ...product, qty: i.qty, lineTotal: product.preco * i.qty };
      })
      .filter(Boolean);
  }

  function getSubtotal() {
    return getDetailedItems().reduce((sum, i) => sum + i.lineTotal, 0);
  }

  return { addItem, removeItem, setQty, clear, getCount, getDetailedItems, getSubtotal };
})();

/* ---- Badge do carrinho + toasts, ativos em toda página que carregar cart.js ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderCartBadges();
  document.addEventListener("funko:cart-updated", renderCartBadges);

  document.body.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.getAttribute("data-add-to-cart");
    const qtyInput = btn.closest("[data-product-block]")?.querySelector("[data-qty-input]");
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
    FunkoCart.addItem(id, qty);

    const product = funkoGetProductById(id);
    funkoToast(product ? `${product.nome} adicionado ao carrinho` : "Produto adicionado ao carrinho");

    const originalText = btn.textContent;
    btn.textContent = "Adicionado ✓";
    btn.classList.add("is-added");
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("is-added");
      btn.disabled = false;
    }, 1100);
  });
});

function renderCartBadges() {
  const count = FunkoCart.getCount();
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = count;
    el.classList.toggle("is-empty", count === 0);
  });
}

function funkoToast(message) {
  let container = document.getElementById("funko-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "funko-toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "funko-toast";
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}
