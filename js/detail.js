// ============================
// detail.js - Detail Page
// ============================

// DOM element
const detailContainer = document.getElementById('product-detail');

// Ambil ID produk dari query string
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

// Fetch produk
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const productId = getProductId();
    const product = data.find(p => p.id === productId);

    if (!product) {
      detailContainer.innerHTML = '<p style="color:#ff4c4c; text-align:center; margin-top:20px;">Produk tidak ditemukan.</p>';
      return;
    }

    renderProductDetail(product);
  })
  .catch(err => {
    detailContainer.innerHTML = '<p style="color:#ff4c4c; text-align:center; margin-top:20px;">Gagal memuat data produk.</p>';
    console.error('Error fetching products:', err);
  });

// Render detail produk
function renderProductDetail(product) {
  detailContainer.innerHTML = `
    <div class="detail-card">
      <h2>${product.name}</h2>
      <div class="images">
        <div class="img-box">
          <h3>KW</h3>
          <img src="${product.kwImage}" alt="${product.name} KW">
          <p>Harga: Rp ${product.priceKW.toLocaleString()}</p>
        </div>
        <div class="img-box">
          <h3>Original</h3>
          <img src="${product.originalImage}" alt="${product.name} Original">
          <p>Harga: Rp ${product.priceOriginal.toLocaleString()}</p>
        </div>
      </div>

      <div class="description">
        <h3>Deskripsi & Perbandingan</h3>
        <p>${product.description}</p>
        <p><strong>Versi Original:</strong> ${product.descriptionOriginal}</p>
        <p><strong>Perbandingan:</strong> ${product.comparisonText}</p>
      </div>

      <div class="legal">
        <h3>Kategori Fake Brand</h3>
        <p>${product.category || 'Belum ditentukan'}</p>
        <h3>Analisis Hukum & Pasal UU Merek</h3>
        <p>${product.legal || 'Belum ditentukan'}</p>
      </div>

      <div class="links">
        <h3>Referensi Gambar</h3>
        <p><a href="${product.marketplaceLink}" target="_blank">Sumber gambar original</a> | <a href="${product.tiktokLink}" target="_blank">Sumber gambar tiruan</a></p>
      </div>
    </div>
  `;

  // Animasi fade-in
  const card = document.querySelector('.detail-card');
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = 1;
    card.style.transform = 'translateY(0)';
  }, 50);
}
