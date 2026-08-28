# Laboratorium Genetika Virtual (GEN-OS)

> **Media Pembelajaran Interaktif & Alat Penelitian Skripsi S1**  
> **Judul Penelitian:** *PENGEMBANGAN E-MODULE BERBENTUK FLIPBOOK MATERI GENETIKA UNTUK MENINGKATKAN KEMAMPUAN BERPIKIR KRITIS SISWA KELAS XII SMAN 2 LAUNG TUHUP*  
> **Peneliti:** Muhammad Ikhwannor (NIM: 2211140014)  
> **Program Studi:** Tadris Biologi  
> **Institusi:** UIN Palangka Raya  

---

## 📌 Pendahuluan

**Laboratorium Genetika Virtual (GEN-OS)** adalah rangkaian simulasi interaktif berbasis web yang dirancang khusus untuk mendukung E-Module berbentuk Flipbook pada materi Genetika dan Bioteknologi Biologi Kelas XII SMA. Tools interaktif ini diintegrasikan (*embedded*) secara langsung ke dalam Flipbook E-Module milik peneliti untuk membantu siswa memvisualisasikan konsep-konsep abstrak genetika, melakukan eksperimen persilangan mandiri, serta meningkatkan kemampuan berpikir kritis.

---

## 🚀 Modul & Alat Laboratorium Virtual

Laboratorium Virtual ini terdiri dari 5 modul utama yang dirancang interaktif:

### 1. 🧬 GEN-LAB (Generator Genotipe Alel / Simulasi Monohibrid)
- **Fungsi:** Simulasi persilangan satu sifat beda (Hukum I Mendel / Segregasi).
- **Fitur Utama:** 
  - Input kombinasi alel parental fleksibel (misal: `Aa` × `Aa`).
  - Visualisasi tabel Punnett 2×2 beserta simulasi batang warna kromosom.
  - Perhitungan otomatis rasio fenotipe & genotipe F1.
  - Laporan laboratorium genetik otomatis berbasis interpretasi teori Mendel.

### 2. 🌿 BIO-SEQUENCER (Generator Rasio Dihibrid)
- **Fungsi:** Simulasi persilangan dua sifat beda (Hukum II Mendel / Asortasi Bebas).
- **Fitur Utama:**
  - Input 4 alel parental (misal: `BbKk` × `bbkk`).
  - Grid Punnett 4×4 interaktif dengan render SVG visual bentuk biji (Bulat/Kisut, Kuning/Hijau).
  - Grafik distribusi statistik fenotipe (rasio 9:3:3:1 atau Test Cross 1:1:1:1).
  - Animasi heliks DNA 3D dan proses pembentukan gamet.

### 3. 🩸 GEN-X (Generator Risiko Pewarisan Sifat Seks)
- **Fungsi:** Kalkulator dan prediktor risiko penyakit terpaut kromosom seks (Kromosom X - Hemofilia/Buta Warna).
- **Fitur Utama:**
  - Pemilihan status genotipe Orang Tua (Ibu XX Normal/Carrier/Sakit & Ayah XY Normal/Sakit).
  - Simulasi kartu anak digital (F1) lengkap dengan status genotipe dan fenotipe.
  - *Risk Assessment Meter* (diagram cincin risiko anak sakit vs carrier).
  - Laporan klinis medis pewarisan *Criss-Cross Inheritance* & Lyonisasi.

### 4. 🔬 GEN-K (Simulasi Deteksi Kromosom / Karyotype Scanner)
- **Fungsi:** Mikroskop digital pendeteksi mutasi jumlah kromosom (Aneuploidi).
- **Fitur Utama:**
  - Pemilihan target kromosom autosom (Chr 1, 3, 13, 18, 21) & gonosom (Chr X).
  - Pengaturan jumlah alel / ploidi (Monosomi, Disomi, Trisomi).
  - Visualisasi mikroskopis kromosom Giemsa dengan animasi pembelahan sel (mitosis).
  - Diagnosis klinis lengkap (*Down Syndrome*, *Turner Syndrome*, *Patau Syndrome*, *Edwards Syndrome*) beserta *Lethality Index*.

### 5. 📂 BIO-ARCHIVE (Generator Aplikasi Bioteknologi)
- **Fungsi:** Ensiklopedia interaktif bioteknologi konvensional dan modern.
- **Fitur Utama:**
  - Katalog pengetahuan ilmiah: Insulin Rekombinan, Golden Rice, Bioremediasi, dan DNA Profiling (PCR).
  - Penilaian *Impact Analysis* (Nilai Ekonomi, Keberlanjutan, dan Risiko Etis).
  - Glosarium terminologi kunci dengan fitur tooltip referensi sitasi akademik.

---

## 🛠️ Teknologi & Arsitektur Sistem

Proyek ini dibangun menggunakan teknologi web modern berkinerja tinggi tanpa dependensi berat:

- **Frontend Core:** HTML5, JavaScript ES6+ (Vanilla JS).
- **Styling & UI:** Tailwind CSS (CDN), Custom Vanilla CSS dengan estetika *Glassmorphism* & *Dark Neon Medical Theme*.
- **Visualisasi & Animasi:** SVG Dinamis, Canvas API 2D Particle Engine, CSS 3D Transforms & Keyframes.
- **Integrasi E-Module:** Kompatibel penuh untuk disematkan dalam Flipbook E-Module via `<iframe>` atau akses langsung (*responsive design* untuk perangkat desktop dan tablet/smartphone).

---

## 💻 Cara Menggunakan / Menjalankan

### Akses Melalui E-Module Flipbook
Tools ini terintegrasi secara langsung di dalam E-Module Flipbook pada halaman praktikum virtual. Siswa cukup mengklik tombol atau frame simulasi yang tersedia di dalam halaman flipbook.

### Mengakses Secara Standalone (Lokal)
1. Unduh atau *clone* repositori ini:
   ```bash
   git clone https://github.com/mrcat2890-droid/Labolatorium-Genetika-Virtual.git
   ```
2. Buka folder repositori di komputer Anda.
3. Jalankan berkas `index.html` menggunakan peramban web modern (Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari).
4. Pilih modul simulasi yang ingin digunakan dari halaman dashboard utama.

---

## 🎓 Konteks Penelitian & Subjek Penelitian

- **Peneliti:** Muhammad Ikhwannor (NIM: 2211140014)
- **Program Studi:** Tadris Biologi, UIN Palangka Raya
- **Subjek Penelitian:** Siswa Kelas XII SMAN 2 Laung Tuhup
- **Tujuan Penelitian:** Mengukur efektivitas penggunaan E-Module berbentuk Flipbook yang dilengkapi laboratorium virtual dalam meningkatkan indikator kemampuan berpikir kritis siswa pada materi Genetika & Bioteknologi.

---

## 📜 Lisensi & Attribution

Hak Cipta © 2026 **Muhammad Ikhwannor**.  
Dikembangkan sebagai bagian dari Tugas Akhir / Skripsi Program Sarjana (S1). Dilarang mengutip atau mereproduksi sebagian atau seluruh isi media tanpa mencantumkan sumber dan izin dari peneliti.
