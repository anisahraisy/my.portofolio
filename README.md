# Professional Portfolio & CMS Web Application

Aplikasi web portofolio profesional dan sistem manajemen konten (CMS) modern berbasis **Astro**. Didesain dengan estetika visual tinggi, arsitektur *clean multi-page stage*, skema data terstandarisasi, pengurutan kronologis waktu otomatis (*Chronological Sorting Engine*), serta dilengkapi **Full-CRUD Admin Panel** yang mandiri dan terintegrasi dengan GitHub Pages.

---

## Fitur Utama & Perkembangan Terbaru

### 1. Pengurutan Kronologis Otomatis (*Chronological Sorting Engine*)
Semua kartu pada 4 fitur utama otomatis diurutkan secara deterministik dari **waktu paling baru** (tampil pertama: atas paling kiri) hingga **waktu paling lama** (tampil terakhir: bawah paling kanan):
- **Work & Laboratory Experiences** (`experiences`)
- **Education & Certifications** (`education` & `certifications`)
- **Publications & External Articles** (`publications`)
- **Projects & Data Access Links** (`projects`)

Fitur pengurutan ini ditenagai oleh modul khusus `src/utils/chronologicalSort.js` dengan mekanisme:
- **Prioritas ISO `YYYY-MM`**: Membaca input tahun dan bulan presisi standar industri.
- **Dukungan Status Aktif (*Ongoing / Current*)**: Posisi aktif (misal *present*, *sekarang*, atau `isCurrent: true`) mendapatkan prioritas teratas secara dinamis.
- **Deterministik Tie-Breaking**: Jika dua item memiliki waktu akhir yang sama, pengurutan diperbandingkan berdasarkan waktu mulai (`startDate`), dilanjutkan dengan ID fallback.
- **Backward-Compatible Fallback Parser**: Mampu mengenali string teks periode lama dalam Bahasa Indonesia maupun Bahasa Inggris (misalnya `"Februari - Desember 2025"` atau `"June 2025 s/d August 2025"`).

### 2. Skema Data Terstandarisasi (*Standardized JSON Schema*)
Seluruh data portofolio tersentralisasi pada `src/data/portfolioData.json` dengan struktur field yang konsisten dan terukur:
- **Experiences**: `id`, `company`, `role`, `period`, `startDate` (`YYYY-MM`), `endDate` (`YYYY-MM`), `isCurrent` (boolean), `summary`, `metrics`, `bannerColor`.
- **Education**: `institution`, `degree`, `period`, `startDate` (`YYYY-MM`), `endDate` (`YYYY-MM`), `gpa`, `thesis`, `highlights`.
- **Certifications**: `id`, `name`, `issuer`, `issuedYearMonth` (`YYYY-MM`), `expiryYearMonth` (`YYYY-MM`), `issuedDate`, `expiryDate`, `detail`, `credentialUrl`.
- **Publications**: `id`, `type`, `title`, `publisher`, `publishedDate` (`YYYY-MM`), `year`, `summary`, `url`.
- **Projects**: `id`, `title`, `description`, `projectDate` (`YYYY-MM`), `periodLabel`, `period`, `accessUrl`.

### 3. Full-CRUD Admin Panel & Client-Side CMS (`/admin`)
Antarmuka panel administrasi modern bertema terang (*light theme*) yang memberikan kendali penuh terhadap konten portofolio:
- **Modal CRUD Interaktif**: Mengedit dan menambah data dengan input presisi `<input type="month">`.
- **Otomasi Label Periode**: Otomatis menghasilkan teks periode dalam Bahasa Indonesia (contoh: input `2026-05` otomatis menampilkan label `"Mei 2026"`).
- **Auto-Sort on Read & Persist**: Data langsung diurutkan ulang secara kronologis saat dimuat, disimpan ke `localStorage`, maupun diekspor.
- **Export & Import JSON**: Memungkinkan pencadangan (*backup*) data ke file lokal dan pemulihan (*restore*) instan.
- **GitHub Auto-Sync**: Sinkronisasi langsung ke repository GitHub via Personal Access Token (PAT) menggunakan GitHub REST API.

### 4. Multi-Page Stage Architecture (SPA Experience)
Navigasi instan berbasis tab (*clean stage switching*) tanpa *reload* halaman:
- **Overview**: Pengenalan profil, ringkasan keahlian, dan aksi kontak langsung.
- **Skills & Lab**: Visualisasi instrumen analitik dan tingkat penguasaan kompetensi.
- **Experiences**: Rekam jejak profesional, riset laboratorium, dan organisasi.
- **Education & Certs**: Kualifikasi akademik dan sertifikat kompetensi beserta tautan verifikasi.
- **Publications**: Karya tulis ilmiah, jurnal, antologi, dan kegiatan kepemimpinan / *outreach*.
- **Projects**: Dokumentasi proyek riset dan akses berkas / data pendukung.
- **Contact**: Saluran komunikasi terverifikasi dan tautan jejaring profesional.

### 5. Estetika Visual & Desain Responsif
- **Frameless Cutout Hero Stage**: Presentasi foto profil transparan di luar bingkai konvensional dengan aksen *floating badges* dan animasi *molecular orbit ring*.
- **5-Level Segmented Competency Bar**: Indikator tingkat kemahiran 5 segmen terputus (*Beginner*, *Intermediate*, *Advanced*, *Professional*, *Expert*) dengan penanda level aktif di sebelah kanan.
- **Dual Theme Support**: Mode terang (*Light*) dan gelap (*Dark*) yang halus dengan variabel warna sistem modern.
- **Responsive Layout**: Menggunakan CSS Grid fleksibel (`grid-2`, `grid-3`, dan 1 kolom pada layar ponsel).

---

## Struktur Direktori Proyek

```text
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD GitHub Actions untuk deploy ke GitHub Pages
├── public/
│   └── assets/                     # Aset gambar transparan, favicon, dan berkas PDF
├── src/
│   ├── data/
│   │   └── portfolioData.json      # Sumber kebenaran tunggal (Single Source of Truth) data portofolio
│   ├── pages/
│   │   ├── index.astro             # Halaman publik utama portofolio (Multi-Page Stage)
│   │   └── admin.astro             # Halaman Admin Panel CRUD (/admin)
│   ├── styles/
│   │   └── portfolio.css           # Sistem desain Vanilla CSS, tema Light/Dark & utilitas grid
│   └── utils/
│       └── chronologicalSort.js    # Mesin utilitas pengurutan kronologis deterministik
├── astro.config.mjs                # Konfigurasi Astro (Static Site Generation / SSG)
├── package.json                    # Dependensi dan skrip proyek
└── README.md                       # Dokumentasi proyek
```

---

## Memulai Pengembangan Lokal

### Prasyarat
- **Node.js** (versi 18.x atau lebih baru)
- **npm** atau package manager kompatibel

### Langkah Instalasi

1. **Clone repository dan masuk ke direktori proyek**:
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd <NAMA_DIREKTORI>
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan lokal**:
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses melalui browser pada:
   - **Halaman Utama**: `http://localhost:4321/`
   - **Admin Panel CMS**: `http://localhost:4321/admin`

4. **Validasi dan build untuk produksi**:
   ```bash
   npm run build
   ```
   Hasil build statis akan disimpan di folder `dist/` dan siap dideploy ke server statis mana pun.

---

## Penggunaan Admin Panel (`/admin`)

1. **Akses Panel**: Buka rute `/admin` pada browser lokal atau URL deployment Anda.
2. **Tambah / Edit Konten**:
   - Pilih tab kategori yang ingin dikelola (*Hero*, *Skills*, *Experiences*, *Education & Certs*, *Publications*, *Projects*, dsb.).
   - Klik tombol **"+ Add"** atau ikon **Edit** pada kartu terkait.
   - Masukkan tahun dan bulan menggunakan kontrol pemilih tanggal (`input type="month"`). Sistem akan otomatis memformat label tampilan.
3. **Penyimpanan Lokal**: Klik tombol **"Save Changes"**. Perubahan akan langsung disimpan ke `localStorage` browser dan diurutkan ulang secara kronologis.
4. **Pencadangan Data**: Klik **"Export Data (JSON)"** untuk mengunduh salinan berkas `portfolioData.json` terbaru.
5. **Sinkronisasi ke GitHub (Opsional)**:
   - Masukkan konfigurasi akun GitHub (Owner, Repo, Branch, dan Personal Access Token dengan izin `repo:contents`).
   - Sistem akan otomatis melakukan *commit* pembaruan data langsung ke repository saat data disimpan.

---

## Alur Deployment (GitHub Pages)

Proyek ini telah dikonfigurasi untuk otomatis melakukan deployment ke **GitHub Pages** menggunakan GitHub Actions (`.github/workflows/deploy.yml`):
1. Setiap perubahan yang di-*push* ke cabang `main` akan memicu workflow build otomatis.
2. Workflow akan menjalankan `npm run build` dan mempublikasikan artefak statis `dist/` ke GitHub Pages.
3. Pastikan pengaturan GitHub Pages pada repository diatur ke sumber **GitHub Actions** (*Settings -> Pages -> Build and deployment -> Source: GitHub Actions*).

---

## Lisensi

Proyek ini dirancang sebagai template web portofolio profesional dan dapat dikembangkan serta disesuaikan secara bebas sesuai kebutuhan Anda.
