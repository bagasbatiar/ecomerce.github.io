const PRODUCTS = [
  {
    id: 1,
    name: "Alysa Clouse",
    category: "Atasan",
    brand: "Zara",
    price: 310000,
    rating: 4.9,
    reviews: 120,
    description: "Kemeja wanita elegan dengan model kancing depan penuh dan kerah tegak (shanghai). Memiliki detail kerutan halus di bagian dada dan bahu yang memberikan kesan feminin. Terbuat dari bahan kain jatuh yang lembut dan nyaman digunakan untuk acara formal maupun santai.",
    specs: {
      "Material": "Rayon Premium / Ceruty (Kain Jatuh)",
      "Model Kerah": "Kerah Tegak (Shanghai Collar)",
      "Detail": "Full Kancing Depan & Aksen Kerut Dada",
      "Gaya": "Casual & Formal Hijab Friendly"
    },
    variants: [
      {
        color: "Pink",
        colorCode: "#f8b4c6",
        images: ["assets/img/alysa clouse kemeja pink.jfif"]
      },
      {
        color: "Coklat",
        colorCode: "#954e0b",
        images: ["assets/img/alysa clouse kemeja coklat.jfif"]
      }
    ]
  },
  {
    id: 2,
    name: "Blouse Kekinian",
    category: "Atasan",
    brand: "H&M",
    price: 299000,
    rating: 4.6,
    reviews: 88,
    description: "Blus wanita dengan motif garis vertikal warna pink lembut yang memberi kesan feminin dan elegan.",
    specs: {
      "Material": "Linen Blend",
      "Sleeve": "Long Sleeve",
      "Collar": "Mandarin",
      "Care": "Machine Washable"
    },
    variants: [
      {
        color: "Biru",
        colorCode: "#1ce6f1",
        images: ["assets/img/blouse kekinian.webp"]
      },
      {
        color: "Pink",
        colorCode: "#f8b4c6",
        images: ["assets/img/blouse kekinian pink.png"]
      }
    ]
  },
  {
    id: 3,
    name: "Giovani Blouse",
    category: "Atasan",
    brand: "Levis",
    price: 200000,
    rating: 4.8,
    reviews: 140,
    description: "Giovani Blouse adalah blus wanita berwarna putih dengan desain elegan dan feminin.",
    specs: {
      "Material": "Denim Rigid",
      "Fit": "Slim Fit",
      "Waist": "Mid Rise",
      "Pockets": "5 Pocket Design"
    },
    variants: [
      {
        color: "Putih",
        colorCode: "#ffffff",
        images: ["assets/img/giovani.png"]
      },
      {
        color: "Coklat",
        colorCode: "#df7935",
        images: ["assets/img/giovani blouse.jfif"]
      }
    ]
  },
  {
    id: 4,
    name: "Kaos Polos Pria",
    category: "Atasan",
    brand: "Nike",
    price: 199000,
    rating: 4.7,
    reviews: 200,
    description: "Kaos polos pria dengan desain sederhana dan potongan klasik.",
    specs: {
      "Material": "Cotton Combed 30s",
      "Fit": "Regular Fit",
      "Weight": "150g",
      "Feature": "Cool Tech"
    },
    variants: [
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/kaos polos hitam.png"]
      },
      {
        color: "Putih",
        colorCode: "#f5f5f5",
        images: ["assets/img/kaos polos.png"]
      }
    ]
  },
  {
    id: 5,
    name: "Kemeja Pria",
    category: "Atasan",
    brand: "Adidas",
    price: 390000,
    rating: 4.5,
    reviews: 60,
    description: "Kemeja pria warna putih dengan desain klasik dan potongan rapi.",
    specs: {
      "Material": "Oxford Cotton",
      "Sleeve": "Long Sleeve",
      "Fit": "Slim Fit",
      "Occasion": "Formal"
    },
    variants: [
      {
        color: "Putih",
        colorCode: "#ffffff",
        images: ["assets/img/kemeja putih.png"]
      },
      {
        color: "Coklat",
        colorCode: "#e8773a",
        images: ["assets/img/kemeja coklat.png"]
      }
    ]
  },
  {
    id: 6,
    name: "Jam Tangan Pria",
    category: "Aksesoris",
    brand: "Puma",
    price: 299000,
    rating: 4.4,
    reviews: 30,
    description: "Jam tangan dengan desain elegan dan fungsional, menampilkan tampilan modern yang mudah dibaca.",
    specs: {
      "Strap": "Genuine Leather",
      "Water Resist": "5 ATM",
      "Glass": "Mineral Crystal",
      "Style": "Elegant"
    },
    variants: [
      {
        color: "Coklat",
        colorCode: "#6d4c41",
        images: ["assets/img/jam tangan swsarmy coklat.jfif"]
      },
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/jam hitam.jpg"]
      }
    ]
  },
  {
    id: 7,
    name: "Kaca Mata",
    category: "Aksesoris",
    brand: "Zara",
    price: 99000,
    rating: 4.9,
    reviews: 77,
    description: "Kacamata dengan desain stylish dan modern yang memberikan perlindungan optimal untuk mata.",
    specs: {
      "Frame": "Acetate Premium",
      "Lens": "UV400 Protection",
      "Hardware": "Gold Tone",
      "Shape": "Square"
    },
    variants: [
      {
        color: "Coklat",
        colorCode: "#6d4c41",
        images: ["assets/img/product/product-3.webp"]
      }
    ]
  },
  {
    id: 8,
    name: "Adidas Samba",
    category: "Sepatu",
    brand: "Uniqlo",
    price: 490000,
    rating: 4.6,
    reviews: 210,
    description: "Adidas Samba adalah sepatu ikonik dengan desain klasik yang tak lekang oleh waktu.",
    specs: {
      "Upper": "Leather & Suede",
      "Sole": "Gum Rubber",
      "Closure": "Lace-up",
      "Type": "Casual"
    },
    variants: [
      {
        color: "Putih",
        colorCode: "#ffffff",
        images: ["assets/img/adidas putih.webp"]
      },
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/adidas hitam.avif"]
      }
    ]
  },
  {
    id: 9,
    name: "Sepatu Sneakers",
    category: "Sepatu",
    brand: "H&M",
    price: 279000,
    rating: 4.5,
    reviews: 95,
    description: "Sepatu sneakers warna hitam dengan desain minimalis dan modern, dilengkapi tali depan serta sol tebal yang nyaman digunakan.",
    specs: {
      "Material": "Canvas",
      "Sole": "High Quality Rubber",
      "Heel": "Flat",
      "Style": "Modern Minimalist"
    },
    variants: [
      {
        color: "Putih",
        colorCode: "#ffffff",
        images: ["assets/img/sepatu sneakers putih.webp"]
      },
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/septu.png"]
      }
    ]
  },
  {
    id: 10,
    name: "Calibre Cargo",
    category: "Celana",
    brand: "Nike",
    price: 150000,
    rating: 4.8,
    reviews: 330,
    description: "Celana Calibre Cargo hadir dengan desain maskulin dan fungsional, dilengkapi banyak saku yang praktis.",
    specs: {
      "Material": "Ripstop Cotton",
      "Fit": "Relaxed Fit",
      "Pockets": "6 Cargo Pockets",
      "Usage": "Outdoor & Casual"
    },
    variants: [
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/kalibre cargo hitam.jpg"]
      },
      {
        color: "Coklat",
        colorCode: "#c67411",
        images: ["assets/img/kalibre cargo coklat.jpeg"]
      }
    ]
  },
  {
    id: 11,
    name: "Levis Classic",
    category: "Celana",
    brand: "Nike",
    price: 250000,
    rating: 4.8,
    reviews: 330,
    description: "Celana jeans warna biru dengan potongan lurus yang klasik dan nyaman dipakai.",
    specs: {
      "Material": "Denim 100%",
      "Fit": "Straight Fit",
      "Waist": "Mid Rise",
      "Style": "Vintage Classic"
    },
    variants: [
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/levis hitam.png"]
      },
      {
        color: "Biru",
        colorCode: "#538ece",
        images: ["assets/img/levis biru.png"]
      }
    ]
  },
  {
    id: 12,
    name: "Oversized Hoodie",
    category: "Atasan",
    brand: "H&M",
    price: 350000,
    rating: 4.7,
    reviews: 112,
    description: "Hoodie dengan potongan oversized yang trendy dan bahan fleece hangat.",
    specs: {
      "Material": "Cotton Fleece",
      "Fit": "Oversized",
      "Hood": "Adjustable Drawstring",
      "Feature": "Kangaroo Pocket"
    },
    variants: [
      {
        color: "Cream",
        colorCode: "#f5f5dc",
        images: ["assets/img/product/product-4.webp"]
      },
      {
        color: "Hitam",
        colorCode: "#000000",
        images: ["assets/img/houdi hitam.png"]
      }
    ]
  }
];