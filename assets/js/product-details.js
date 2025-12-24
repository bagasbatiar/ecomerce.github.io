// 1. Ambil ID Produk dari URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const product = PRODUCTS.find(p => p.id === productId);

// Element Selector Utama
const mainImage = document.getElementById("main-product-image");
const thumbnailGrid = document.querySelector(".thumbnail-grid");
const colorGrid = document.querySelector(".color-grid");
const selectedVariantText = document.querySelector(".selected-variant span");
const quantityInput = document.querySelector(".quantity-input");
const buyNowBtn = document.querySelector(".secondary-action");

let selectedVariant = null;
let currentQuantity = 1;

if (product) {
    // 2. ISI INFORMASI UTAMA (Header & Deskripsi Cepat)
    document.querySelector(".product-name").innerText = product.name;
    document.querySelector(".badge-category").innerText = product.category;
    document.querySelector(".product-description p").innerText = product.description;

    // 3. OTOMATISASI TAB OVERVIEW
    const overviewTab = document.querySelector("#tab-overview");
    if (overviewTab) {
        overviewTab.querySelector("h3").innerText = `Tentang ${product.name}`;
        overviewTab.querySelector("p").innerText = product.description;

        // Render Key Highlights secara otomatis
        const highlightsGrid = overviewTab.querySelector(".highlights-grid");
        if (highlightsGrid) {
            highlightsGrid.innerHTML = `
                <div class="highlight-card">
                    <i class="bi bi-patch-check"></i>
                    <h5>Original 100%</h5>
                    <p>Produk asli dan berkualitas dari brand ${product.brand}.</p>
                </div>
                <div class="highlight-card">
                    <i class="bi bi-truck"></i>
                    <h5>Gratis Ongkir</h5>
                    <p>Tersedia layanan pengiriman gratis untuk wilayah tertentu.</p>
                </div>
                <div class="highlight-card">
                    <i class="bi bi-award"></i>
                    <h5>Kualitas Premium</h5>
                    <p>Dibuat dengan material ${product.specs.Material || 'pilihan'} terbaik.</p>
                </div>
                <div class="highlight-card">
                    <i class="bi bi-arrow-repeat"></i>
                    <h5>Garansi Retur</h5>
                    <p>Jaminan tukar produk jika size tidak pas atau produk cacat.</p>
                </div>`;
        }

        // Render Package Contents
        const packageList = overviewTab.querySelector(".contents-list");
        if (packageList) {
            packageList.innerHTML = `
                <li><i class="bi bi-check-circle"></i> 1 Unit ${product.name}</li>
                <li><i class="bi bi-check-circle"></i> Tag & Label Resmi ${product.brand}</li>
                <li><i class="bi bi-check-circle"></i> Box atau Plastik Kemasan Original</li>
                <li><i class="bi bi-check-circle"></i> Kartu Garansi / Invoice</li>
            `;
        }
    }

    // 4. OTOMATISASI TAB TECHNICAL DETAILS
    const techTab = document.querySelector("#tab-technical");
    if (techTab && product.specs) {
        const specTable = techTab.querySelector(".spec-table");
        specTable.innerHTML = ""; // Bersihkan konten lama

        // Loop melalui data 'specs' di products.js secara otomatis
        for (const [key, value] of Object.entries(product.specs)) {
            specTable.innerHTML += `
                <div class="spec-row">
                    <span class="spec-name">${key}</span>
                    <span class="spec-value">${value}</span>
                </div>`;
        }
    }

    // 5. RENDER PILIHAN WARNA (VARIANT)
    if (colorGrid) {
        colorGrid.innerHTML = "";
        product.variants.forEach((variant, index) => {
            const div = document.createElement("div");
            div.className = "color-chip" + (index === 0 ? " active" : "");
            div.style.background = variant.colorCode;
            div.title = variant.color;
            div.innerHTML = `<span class="selection-check"><i class="bi bi-check"></i></span>`;
            div.addEventListener("click", () => selectVariant(index));
            colorGrid.appendChild(div);
        });
    }

    // Inisialisasi tampilan pertama
    selectVariant(0);
    updatePriceDisplay();
}

// Fungsi untuk mengganti Varian dan Gallery
function selectVariant(index) {
    selectedVariant = product.variants[index];

    // Update UI Chip Warna
    document.querySelectorAll(".color-chip").forEach(c => c.classList.remove("active"));
    const chips = document.querySelectorAll(".color-chip");
    if (chips[index]) chips[index].classList.add("active");

    selectedVariantText.innerText = selectedVariant.color;

    // Update Gambar Utama
    mainImage.src = selectedVariant.images[0];

    // 6. UPDATE GALLERY THUMBNAIL DINAMIS
    if (thumbnailGrid) {
        thumbnailGrid.innerHTML = "";
        selectedVariant.images.forEach((imgSrc, i) => {
            const thumb = document.createElement("div");
            thumb.className = "thumbnail-wrapper thumbnail-item" + (i === 0 ? " active" : "");
            thumb.innerHTML = `<img src="${imgSrc}" class="img-fluid">`;

            thumb.addEventListener("click", function () {
                mainImage.src = imgSrc;
                document.querySelectorAll(".thumbnail-item").forEach(t => t.classList.remove("active"));
                this.classList.add("active");
            });
            thumbnailGrid.appendChild(thumb);
        });
    }
}

// 7. FUNGSI UPDATE HARGA & QUANTITY
function updatePriceDisplay() {
    const totalPrice = product.price * currentQuantity;
    document.querySelector(".sale-price").innerText = "Rp " + totalPrice.toLocaleString('id-ID');

    // Estimasi harga sebelum diskon (Regular Price)
    const originalPrice = Math.round(totalPrice / 0.8);
    document.querySelector(".regular-price").innerText = "Rp " + originalPrice.toLocaleString('id-ID');
    document.querySelector(".save-amount").innerText = "Hemat Rp " + (originalPrice - totalPrice).toLocaleString('id-ID');
}

// Event Listeners Tombol Quantity
document.querySelector(".quantity-btn.increase").addEventListener("click", () => {
    currentQuantity++;
    quantityInput.value = currentQuantity;
    updatePriceDisplay();
});

document.querySelector(".quantity-btn.decrease").addEventListener("click", () => {
    if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        updatePriceDisplay();
    }
});

// 8. LOGIKA CHECKOUT (BUY NOW)
if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (!product || !selectedVariant) {
            alert("Harap pilih varian terlebih dahulu.");
            return;
        }

        const quantity = parseInt(quantityInput.value) || 1;
        const totalHarga = product.price * quantity;

        const dataKeCheckout = {
            id: product.id,
            name: product.name,
            price: totalHarga,
            color: selectedVariant.color,
            image: selectedVariant.images[0],
            qty: quantity
        };

        localStorage.setItem("selectedProduct", JSON.stringify(dataKeCheckout));
        window.location.href = "checkout.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderFeaturedProducts();
});

function renderFeaturedProducts() {
    const container = document.getElementById("featured-products-container");
    if (!container) return;

    // Menentukan produk yang tampil (Contoh ID: 2, 10, 12, 6)
    const featuredIds = [2, 10, 12, 6];
    const featuredList = PRODUCTS.filter(p => featuredIds.includes(p.id));

    container.innerHTML = ""; // Bersihkan kontainer

    featuredList.forEach((product, index) => {
        const originalPrice = Math.round(product.price / 0.8);
        const productImage = product.variants[0].images[0];

        const productHTML = `
          <div class="col-lg-3 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="${100 + (index * 50)}">
            <div class="product-showcase h-100 d-flex flex-column border rounded p-3 shadow-sm">
              <div class="product-image">
                <a href="product-details.html?id=${product.id}">
                    <img src="${productImage}" alt="${product.name}" class="img-fluid" style="height: 250px; object-fit: cover; width: 100%;">
                </a>
              </div>
              <div class="product-details mt-3 d-flex flex-column flex-grow-1 text-center">
                <h6><a href="product-details.html?id=${product.id}" class="text-dark text-decoration-none fw-bold">${product.name}</a></h6>
                <div class="price-section mb-3">
                  <span class="original-price fw-bold text-danger">Rp ${product.price.toLocaleString('id-ID')}</span>
                </div>
                
                <div class="product-actions mt-auto">
                    <a href="product-details.html?id=${product.id}" class="btn btn-dark w-100 py-2">
                        <i class="bi bi-cart-plus me-2"></i>Beli Produk
                    </a>
                </div>
              </div>
            </div>
          </div>`;

        container.insertAdjacentHTML("beforeend", productHTML);
    });
}