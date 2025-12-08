// ============================
// app.js - Index Page
// ============================

// DOM Elements
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');

// Variable to store fetched products
let products = [];

// Fetch products from JSON
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  })
  .catch(err => {
    productList.innerHTML = `<p style="color:#ff4c4c;">Gagal memuat data produk.</p>`;
    console.error('Error fetching products:', err);
  });

// Render products to the page
function renderProducts(items) {
  productList.innerHTML = ''; // Clear existing products

  if (items.length === 0) {
    productList.innerHTML = '<p style="color:#ffd700;">Tidak ada produk ditemukan.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.kwImage}" alt="${product.name} KW">
      <h3>${product.name}</h3>
    `;

    // Click handler -> navigate to detail.html?id=PRODUCT_ID
    card.addEventListener('click', () => {
      window.location.href = `detail.html?id=${product.id}`;
    });

    productList.appendChild(card);

    // Optional: Fade-in animation
    card.style.animation = `fadeIn 0.5s ease forwards`;
    card.style.opacity = 0;
    setTimeout(() => card.style.opacity = 1, 100);
  });
}

// ============================
// Search Functionality
// ============================
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});
