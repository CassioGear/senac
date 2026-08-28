document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector("[data-catalog-grid]");
  if (!grid) return;

  const mode = window.CATALOG_MODE || "all";
  const baseList = mode === "promo"
    ? FUNKO_PRODUCTS.filter(p => p.selos.includes("promocao"))
    : FUNKO_PRODUCTS.slice();

  const params = new URLSearchParams(window.location.search);
  const state = {
    categorias: params.getAll("categoria"),
    busca: params.get("busca") || "",
    ordenar: "relevancia",
    visiveis: 8,
  };

  const filtersPanel = document.querySelector("[data-filters-panel]");
  const resultsCount = document.querySelector("[data-results-count]");
  const chipsWrap = document.querySelector("[data-active-chips]");
  const searchInput = document.querySelector("[data-catalog-search]");
  if (searchInput) searchInput.value = state.busca;

  function buildFilters() {
    if (!filtersPanel) return;
    const categoriasComContagem = FUNKO_CATEGORIAS.map(c => ({
      ...c,
      count: baseList.filter(p => p.categoria === c.slug).length,
    })).filter(c => c.count > 0);

    filtersPanel.innerHTML = `
      <div class="filter-group">
        <h4>Categorias</h4>
        ${categoriasComContagem.map(c => `
          <label class="filter-option">
            <input type="checkbox" value="${c.slug}" ${state.categorias.includes(c.slug) ? "checked" : ""}>
            ${c.nome} <span class="count">(${c.count})</span>
          </label>`).join("")}
      </div>
      <button type="button" id="clear-filters">Limpar filtros</button>
    `;
    filtersPanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", () => {
        const vals = Array.from(filtersPanel.querySelectorAll('input:checked')).map(i => i.value);
        state.categorias = vals;
        state.visiveis = 8;
        render();
      });
    });
    filtersPanel.querySelector("#clear-filters").addEventListener("click", () => {
      state.categorias = [];
      state.busca = "";
      if (searchInput) searchInput.value = "";
      state.visiveis = 8;
      render();
    });
  }

  function getFiltered() {
    let list = baseList.filter(p => {
      const matchCategoria = state.categorias.length === 0 || state.categorias.includes(p.categoria);
      const term = state.busca.trim().toLowerCase();
      const matchBusca = !term || p.nome.toLowerCase().includes(term) || p.franquia.toLowerCase().includes(term);
      return matchCategoria && matchBusca;
    });

    if (state.ordenar === "menor-preco") list.sort((a, b) => a.preco - b.preco);
    else if (state.ordenar === "maior-preco") list.sort((a, b) => b.preco - a.preco);
    else if (state.ordenar === "avaliacao") list.sort((a, b) => b.avaliacao - a.avaliacao);

    return list;
  }

  function renderChips() {
    if (!chipsWrap) return;
    const chips = [];
    state.categorias.forEach(slug => {
      const cat = FUNKO_CATEGORIAS.find(c => c.slug === slug);
      if (cat) chips.push({ label: cat.nome, remove: () => { state.categorias = state.categorias.filter(s => s !== slug); } });
    });
    if (state.busca) chips.push({ label: `Busca: "${state.busca}"`, remove: () => { state.busca = ""; if (searchInput) searchInput.value = ""; } });

    chipsWrap.innerHTML = chips.map((c, i) => `<span class="chip" data-i="${i}">${c.label} <button type="button">✕</button></span>`).join("");
    chipsWrap.querySelectorAll(".chip button").forEach((btn, i) => {
      btn.addEventListener("click", () => { chips[i].remove(); state.visiveis = 8; render(); });
    });
  }

  function render() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, state.visiveis);

    if (resultsCount) {
      resultsCount.textContent = filtered.length === 0
        ? "Nenhum produto encontrado"
        : `Mostrando ${toShow.length} de ${filtered.length} produto${filtered.length > 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Nenhum produto encontrado</h3>
          <p>Tente remover algum filtro ou buscar por outro termo.</p>
          <button type="button" class="btn btn-outline" id="empty-clear">Limpar busca</button>
        </div>`;
      grid.querySelector("#empty-clear")?.addEventListener("click", () => {
        state.categorias = []; state.busca = ""; if (searchInput) searchInput.value = ""; render();
      });
    } else {
      grid.innerHTML = toShow.map(funkoBuildCard).join("");
    }

    const loadMoreWrap = document.querySelector("[data-load-more-wrap]");
    if (loadMoreWrap) {
      loadMoreWrap.style.display = filtered.length > state.visiveis ? "block" : "none";
    }

    renderChips();
    buildFilters();
  }

  document.querySelector("[data-sort-select]")?.addEventListener("change", e => {
    state.ordenar = e.target.value;
    render();
  });

  if (searchInput) {
    let debounce;
    searchInput.addEventListener("input", e => {
      clearTimeout(debounce);
      debounce = setTimeout(() => { state.busca = e.target.value; state.visiveis = 8; render(); }, 220);
    });
  }

  document.querySelector("[data-load-more]")?.addEventListener("click", () => {
    state.visiveis += 8;
    render();
  });

  document.querySelector("[data-filters-toggle]")?.addEventListener("click", () => {
    filtersPanel.classList.toggle("is-collapsed");
  });

  render();
});
