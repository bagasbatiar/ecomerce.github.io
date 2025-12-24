// 1. Inisialisasi variabel filter
let currentFilters = {
    search: "",
    category: "Semua Produk",
    brands: [],
    minPrice: 0,
    maxPrice: 1000000 
};

const productContainer = document.querySelector(".category-product-list .row");
const minRangeInput = document.querySelector(".min-range");
const maxRangeInput = document.querySelector(".max-range");
const minPriceSpan = document.querySelector(".min-price");
const maxPriceSpan = document.querySelector(".max-price");
const applyFilterBtn = document.querySelector(".filter-actions .btn-primary");

// --- 2. FUNGSI RENDER PRODUK ---
function updateDisplay() {
    const filteredProducts = PRODUCTS.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(currentFilters.search.toLowerCase());
        const matchCategory = currentFilters.category === "Semua Produk" || product.category === currentFilters.category;
        const matchBrand = currentFilters.brands.length === 0 || currentFilters.brands.includes(product.brand);
        const matchPrice = product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice;

        return matchSearch && matchCategory && matchBrand && matchPrice;
    });

    renderProducts(filteredProducts);
}

function renderProducts(products) {
    productContainer.innerHTML = "";
    if (products.length === 0) {
        productContainer.innerHTML = '<div class="col-12 text-center py-5"><h5>Produk tidak ditemukan dengan filter ini.</h5></div>';
        return;
    }

    products.forEach(product => {
        const mainImg = product.variants[0].images[0];
        const productHTML = `
            <div class="col-6 col-xl-4 mb-4">
                <div class="product-card border p-3 rounded h-100 shadow-sm">
                    <div class="product-image mb-3 text-center">
                        <img src="${mainImg}" class="img-fluid rounded" style="height: 200px; object-fit: cover;" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <small class="text-muted">${product.category}</small>
                        <h5 class="product-title mt-1">
                            <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                        </h5>
                        <div class="product-price fw-bold text-danger mb-3">Rp ${product.price.toLocaleString('id-ID')}</div>
                        <a href="product-details.html?id=${product.id}" class="btn btn-dark btn-sm w-100">Lihat Detail</a>
                    </div>
                </div>
            </div>`;
        productContainer.insertAdjacentHTML("beforeend", productHTML);
    });
}

// --- 3. LOGIKA PRICE RANGE ---
function updatePriceLabels() {
    const minVal = parseInt(minRangeInput.value);
    const maxVal = parseInt(maxRangeInput.value);

    // Update Tampilan Teks
    minPriceSpan.innerText = `Rp ${minVal.toLocaleString('id-ID')}`;
    maxPriceSpan.innerText = `Rp ${maxVal.toLocaleString('id-ID')}`;
    
    // Update Nilai di Variabel Filter
    currentFilters.minPrice = minVal;
    currentFilters.maxPrice = maxVal;
}

// --- 4. EVENT LISTENERS ---

// Listener Slider (Real-time update label)
minRangeInput.addEventListener("input", updatePriceLabels);
maxRangeInput.addEventListener("input", updatePriceLabels);

// Tombol Apply Filter
applyFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateDisplay();
});

// Filter Kategori
document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelectorAll(".category-link").forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        
        currentFilters.category = this.innerText.trim();
        updateDisplay();
    });
});

// Pencarian
document.getElementById("productSearch").addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    updateDisplay();
});

// Inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
    updatePriceLabels();
    updateDisplay();
});