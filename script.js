const products = [
  {
    name: "Fone Bluetooth Premium",
    price: 89.9,
    rating: 4.8,
    reviews: 1240,
    category: "tecnologia",
    marketplace: "Shopee",
    link: "https://shopee.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Fone+Bluetooth"
  },
  {
    name: "Luminária Decorativa LED",
    price: 59.9,
    rating: 4.7,
    reviews: 860,
    category: "casa",
    marketplace: "Mercado Livre",
    link: "https://mercadolivre.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Lumin%C3%A1ria+LED"
  },
  {
    name: "Bolsa Feminina Casual",
    price: 74.9,
    rating: 4.9,
    reviews: 2015,
    category: "moda",
    marketplace: "Shopee",
    link: "https://shopee.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Bolsa+Feminina"
  },
  {
    name: "Kit Skincare Completo",
    price: 119.9,
    rating: 4.8,
    reviews: 540,
    category: "beleza",
    marketplace: "Mercado Livre",
    link: "https://mercadolivre.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Kit+Skincare"
  },
  {
    name: "Smartwatch Moderno",
    price: 149.9,
    rating: 4.9,
    reviews: 980,
    category: "tecnologia",
    marketplace: "Shopee",
    link: "https://shopee.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Smartwatch"
  },
  {
    name: "Jogo de Cama Premium",
    price: 199.9,
    rating: 4.7,
    reviews: 430,
    category: "casa",
    marketplace: "Mercado Livre",
    link: "https://mercadolivre.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Jogo+de+Cama"
  },
  {
    name: "Tênis Casual Unissex",
    price: 129.9,
    rating: 4.8,
    reviews: 750,
    category: "moda",
    marketplace: "Shopee",
    link: "https://shopee.com.br",
    image: "https://via.placeholder.com/900x720.png?text=T%C3%AAnis+Casual"
  },
  {
    name: "Secador Compacto",
    price: 99.9,
    rating: 4.9,
    reviews: 620,
    category: "beleza",
    marketplace: "Mercado Livre",
    link: "https://mercadolivre.com.br",
    image: "https://via.placeholder.com/900x720.png?text=Secador+Compacto"
  }
];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";
let searchTerm = "";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeFilter === "all"
      || (activeFilter === "melhor-avaliados" && product.rating >= 4.8)
      || product.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  productsGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" />
        <span class="marketplace-badge">${product.marketplace}</span>
      </div>

      <div class="product-body">
        <h3>${product.name}</h3>

        <div class="product-meta">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="rating">⭐ ${product.rating} • ${product.reviews} avaliações</span>
        </div>

        <a
          class="btn btn-secondary"
          href="${product.link}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar
        </a>
      </div>
    </article>
  `).join("");

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum produto encontrado</h3>
        <p>Tente outro nome ou limpe os filtros.</p>
      </div>
    `;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();
  renderProducts();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  activeFilter = "all";

  filterButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");

  renderProducts();
});

renderProducts();
