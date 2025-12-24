document.addEventListener("DOMContentLoaded", function() {
    // 1. Ambil data produk yang disimpan dari Local Storage
    const savedData = JSON.parse(localStorage.getItem("selectedProduct"));
    
    // Selector Elemen UI
    const provinsiSelect = document.getElementById("select-provinsi");
    const kotaSelect = document.getElementById("select-kota");
    const ongkirDisplay = document.querySelector(".text-success"); // Menampilkan status ongkir di ringkasan
    const checkoutForm = document.querySelector('.checkout-form');
    
    let ongkirTerpilih = 0;
    let bankTerpilih = "BCA";

    // Data Informasi Rekening Bank
    const infoBank = {
        "BCA": "<strong>Bank BCA</strong><br>No. Rekening: 1234567890<br>A/N: NiceShop Indonesia",
        "Mandiri": "<strong>Bank Mandiri</strong><br>No. Rekening: 0987654321<br>A/N: NiceShop Indonesia"
    };

    // Data Simulasi Ongkir Berdasarkan Provinsi dan Kota
    const dataOngkir = {
        "Jawa Barat": { "Bandung": 15000, "Bogor": 10000, "Bekasi": 5000 },
        "DKI Jakarta": { "Jakarta Selatan": 5000, "Jakarta Pusat": 5000 },
        "Jawa Tengah": { "Semarang": 20000, "Solo": 25000 }
    };

    if (savedData) {
        // Tampilkan Data Produk ke Ringkasan Pesanan
        document.getElementById("checkout-product-name").innerText = savedData.name;
        document.getElementById("checkout-product-color").innerText = "Warna: " + savedData.color + " (Qty: " + savedData.qty + ")";
        document.getElementById("checkout-img").src = savedData.image;
        
        updateTotals();

        // LOGIKA 1: Memilih Metode Pembayaran (Bank)
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', function() {
                // Beri tanda visual pada pilihan yang diklik
                document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active', 'border-dark', 'bg-white'));
                this.classList.add('active', 'border-dark', 'bg-white');
                
                // Update teks informasi rekening
                bankTerpilih = this.getAttribute('data-bank');
                document.getElementById("bank-detail").innerHTML = infoBank[bankTerpilih];
            });
        });

        // LOGIKA 2: Memilih Provinsi (Dropdown Kota akan Muncul)
        provinsiSelect.addEventListener("change", function() {
            const daftarKota = dataOngkir[this.value];
            
            // Reset pilihan kota
            kotaSelect.innerHTML = '<option value="" selected disabled>Pilih Kota</option>';
            kotaSelect.disabled = false;

            // Masukkan daftar kota sesuai provinsi yang dipilih
            for (let kota in daftarKota) {
                const opt = document.createElement("option");
                opt.value = kota;
                opt.text = `${kota} (Rp ${daftarKota[kota].toLocaleString('id-ID')})`;
                kotaSelect.add(opt);
            }
        });

        // LOGIKA 3: Memilih Kota (Hitung Ongkir)
        kotaSelect.addEventListener("change", function() {
            ongkirTerpilih = dataOngkir[provinsiSelect.value][this.value];
            updateTotals();
        });

        // FUNGSI: Update Total Harga di Layar
        function updateTotals() {
            const subtotal = savedData.price;
            const totalFinal = subtotal + ongkirTerpilih;
            const formatRupiah = (n) => "Rp " + n.toLocaleString('id-ID');

            // Update teks subtotal dan total keseluruhan
            document.querySelectorAll(".checkout-total-price").forEach(el => {
                el.innerText = el.closest('.fw-bold') ? formatRupiah(totalFinal) : formatRupiah(subtotal);
            });

            // Update label ongkos kirim
            if (ongkirDisplay) {
                ongkirDisplay.innerText = ongkirTerpilih === 0 ? "Gratis" : formatRupiah(ongkirTerpilih);
            }

            // Update harga di tombol Buat Pesanan
            document.querySelector(".btn-price").innerText = formatRupiah(totalFinal);
        }

        // LOGIKA 4: Submit Form ke WhatsApp
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Ambil data dari input form (Bahasa Indonesia)
                const namaDepan = document.querySelector('input[placeholder="Nama Depan Anda"]').value;
                const namaBelakang = document.querySelector('input[placeholder="Nama Belakang Anda"]').value;
                const phone = document.querySelector('input[placeholder="Nomor Telepon Anda"]').value;
                const address = document.getElementById("alamat-lengkap").value;
                const provinsi = provinsiSelect.value;
                const kota = kotaSelect.value;

                if(!provinsi || !kota) {
                    alert("Harap pilih Provinsi dan Kota!");
                    return;
                }

                const nomorWA = "62895639068080"; 
                const totalBayar = savedData.price + ongkirTerpilih;

                // Format Pesan WhatsApp
                const pesan = `*ORDER BARU - NICESHOP*%0A` +
                              `----------------------------%0A` +
                              `*--- Data Produk ---*%0A` +
                              `• Produk: ${savedData.name}%0A` +
                              `• Warna: ${savedData.color}%0A` +
                              `• Qty: ${savedData.qty}%0A` +
                              `• Harga: Rp ${savedData.price.toLocaleString('id-ID')}%0A` +
                              `• Ongkir: Rp ${ongkirTerpilih.toLocaleString('id-ID')}%0A` +
                              `*Total: Rp ${totalBayar.toLocaleString('id-ID')}*%0A%0A` +
                              `*--- Alamat Pengiriman ---*%0A` +
                              `• Nama: ${namaDepan} ${namaBelakang}%0A` +
                              `• No HP: ${phone}%0A` +
                              `• Alamat: ${address}%0A` +
                              `• Kota/Prov: ${kota}, ${provinsi}%0A%0A` +
                              `*--- Metode Pembayaran ---*%0A` +
                              `• Transfer Bank: ${bankTerpilih}%0A` +
                              `----------------------------%0A` +
                              `_Mohon segera diproses ya, terima kasih!_`;

                // Buka WhatsApp di tab baru
                window.open(`https://api.whatsapp.com/send?phone=${nomorWA}&text=${pesan}`, '_blank');
            });
        }
    } else {
        // Jika tidak ada data di Local Storage, kembali ke halaman kategori
        alert("Keranjang belanja kosong!");
        window.location.href = "category.html";
    }
});