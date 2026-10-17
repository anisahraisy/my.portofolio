# Panduan Instalasi, Pengelolaan Admin CRUD, dan Deployment GitHub Pages

Dokumen ini menjelaskan langkah-langkah menjalankan proyek secara lokal, mengoperasikan halaman Admin Panel (`/admin`), dan mempublikasikannya ke **GitHub Pages**.

---

## 1. Persiapan Awal di Komputer Lokal

Pastikan **Node.js (versi 18.17+ atau 20+)** dan **Git** sudah terpasang di komputer Anda.

1. Ekstrak file `anisah-portfolio-astro.zip` atau jalankan `node build-project.mjs`.
2. Buka terminal di dalam folder `anisah-portfolio`:
   ```bash
   cd anisah-portfolio
   npm install
   npm run dev
   ```
3. Buka browser dan akses:
   * **Website Publik**: `http://localhost:4321`
   * **Admin Panel CRUD**: `http://localhost:4321/admin`

---

## 2. Cara Menggunakan Admin Panel CRUD (`/admin`)

1. Buka `/admin` untuk melihat seluruh kartu yang sudah terdaftar (Welcoming/Hero, 5 Kompetensi, 6 Pengalaman Lab/Kerja, Pendidikan & 7 Sertifikat, 6 Publikasi/Artikel, serta 5 Akun Kontak).
2. **Mengedit Kartu yang Sudah Ada**: Klik tombol **Edit** pada kartu mana saja. Formulir akan terbuka dalam kondisi sudah terisi data kartu tersebut (*pre-filled*). Ubah isinya lalu klik **Simpan**.
3. **Menambah Kartu Baru**: Klik tombol **+ Tambah** di pojok kanan atas masing-masing seksi.
4. **Menyimpan Permanen ke Repository GitHub**:
   * Setiap perubahan di `/admin` langsung tersimpan secara instan di browser untuk pratinjau langsung di halaman utama.
   * Untuk menyimpan perubahan secara permanen agar dilihat oleh seluruh pengunjung di GitHub Pages, klik tombol **Export portfolioData.json** di bilah atas Admin Panel, lalu timpa file `src/data/portfolioData.json` di proyek Anda dengan file hasil unduhan tersebut sebelum melakukan `git push`.

---

## 3. Langkah Deployment ke GitHub Pages

1. Buat repository baru di GitHub (contoh: `anisah-portfolio` atau `username.github.io`).
2. Jika nama repository Anda **bukan** `username.github.io` (misalnya `anisah-portfolio`), buka `astro.config.mjs` dan sesuaikan properti `site` dan `base`:
   ```javascript
   export default defineConfig({
     site: 'https://username.github.io',
     base: '/anisah-portfolio',
     output: 'static'
   });
   ```
3. Push seluruh kode ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Anisah R. Aisy Astro Portfolio"
   git branch -M main
   git remote add origin https://github.com/username/anisah-portfolio.git
   git push -u origin main
   ```
4. Masuk ke repository GitHub Anda, buka menu **Settings > Pages**.
5. Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
6. Workflow `.github/workflows/deploy.yml` akan otomatis berjalan dan mempublikasikan situs Anda dalam waktu sekitar 1 menit.
