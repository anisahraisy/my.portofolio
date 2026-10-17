# Anisah Rihadatul Aisy, S.Si. | Professional Portfolio

Web portofolio profesional untuk **Anisah Rihadatul Aisy, S.Si.** (Sarjana Kimia Universitas Brawijaya, R&D Formulator, Analytical Chemist & Quality Control Specialist). Dibangun menggunakan **Astro** dengan skema warna adaptasi `developerFolio` dan dilengkapi **Full-CRUD Admin Panel**.

## Fitur Utama

1. **Multi-Page Clean Architecture**: Navigasi instan antar 6 halaman (*Overview*, *Skills & Lab*, *Experiences*, *Education & Certs*, *Publications*, *Contact*) sehingga tampilan bersih dan tidak menumpuk dalam satu halaman panjang.
2. **Frameless Cutout Hero Stage**: Menampilkan foto profil tanpa latar belakang (*blank background*) di luar kotak dengan elemen *orbiting molecular ring* dan *floating badges*.
3. **5-Level Segmented Competency Bar**: Indikator keahlian menggunakan 5 segmen terputus (*Beginner*, *Intermediate*, *Advanced*, *Professional*, *Expert*) yang hanya menampilkan level aktif di sisi kanan bar.
4. **Structured Certification Cards**: Setiap sertifikat menampilkan nama, *issuer*, bulan dan tahun terbit (wajib), bulan dan tahun kadaluarsa (opsional), rincian kompetensi, dan tautan kredensial.
5. **Direct Redirect Publications & External Articles**: Kartu publikasi ilmiah dan artikel eksternal langsung mengarahkan pengunjung ke URL jurnal atau media terkait saat diklik.
6. **Full-CRUD Light Admin Panel (`/admin`)**: Antarmuka manajemen konten bertema terang untuk menambah, membaca, mengedit, dan menghapus seluruh kartu yang ada di sistem.
7. **Dual Theme (Light & Dark Mode)**: Menggunakan variabel warna asli `_globalColor.scss` dari `developerFolio` serta responsif untuk desktop dan perangkat mobile.

## Struktur Direktori

```text
anisah-portfolio/
├── .github/workflows/deploy.yml   # GitHub Actions otomatis untuk GitHub Pages
├── public/assets/                 # Foto profil cutout transparan & file PDF CV
├── src/
│   ├── data/portfolioData.json    # Sumber data utama portofolio (JSON)
│   ├── pages/
│   │   ├── index.astro            # Halaman publik portofolio (Multi-Page)
│   │   └── admin.astro            # Halaman Admin Panel CRUD (/admin)
│   └── styles/portfolio.css       # Sistem tema Light/Dark & Responsive Layout
├── astro.config.mjs
├── DEPLOYMENT_GUIDE.md
└── package.json
```

## Menjalankan Proyek Secara Lokal

```bash
# 1. Instal dependensi
npm install

# 2. Jalankan server pengembangan lokal
npm run dev
```

* Halaman Utama: `http://localhost:4321/`
* Halaman Admin Panel CRUD: `http://localhost:4321/admin`
