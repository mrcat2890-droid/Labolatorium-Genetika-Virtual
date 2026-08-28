# Catatan Perubahan (CHANGELOG)

Semua perubahan, perbaikan, dan revisi penting pada **Laboratorium Genetika Virtual (GEN-OS)** didokumentasikan dalam berkas ini. Format dokumentasi mengacu pada standar [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan penentuan versi mengacu pada [Semantic Versioning](https://semver.org/).

---

## [1.2.0] - 2026-08-28

### 📌 Revisi Validasi Dosen Ahli Materi & Dosen Ahli Media

Rilis versi 1.2.0 ini berfokus pada penyempurnaan media simulasi berdasarkan hasil masukan, kritik, dan saran validasi oleh **Dosen Ahli Materi** dan **Dosen Ahli Media** guna mengoptimalkan kepraktisan dan keefektifan alat simulasi dalam E-Module Flipbook untuk siswa kelas XII SMAN 2 Laung Tuhup.

#### 🎓 Revisi Ahli Materi (Subject Matter Expert Revisions)
- **Penyesuaian Nomenklatur & Istilah Genetika:**
  - Mengubah label aksi tombol utama pada modul Dihibrid dari `"RUN SEQUENCER"` menjadi **`"MULAI PERSILANGAN"`** agar sesuai dengan terminologi persilangan genetika SMA (bukan *sequencing* genom laboratorium laboratorium analisis molekuler).
  - Mengubah label tombol aksi `"SCAN & ANALYZE"` pada modul Monohibrid menjadi **`"PINDAI & ANALISIS"`**.
  - Mengubah label tombol `"INITIATE ANALYSIS"` pada modul Sifat Terpaut Seks menjadi **`"MULAI ANALISIS"`**.
  - Mengubah label tombol `"INITIATE SCAN"` pada modul Deteksi Kromosom menjadi **`"MULAI PINDAIAN"`**.
- **Penyempurnaan Penjelasan Ilmiah pada Laporan Otomatis:**
  - Memastikan konsistensi penulisan genotipe heterozigot (`Aa`, bukan `aA`) pada simulasi Punnett Square.
  - Memperjelas penjelasan Hukum I Mendel (Segregasi Bebas) dan Hukum II Mendel (Asortasi Bebas) pada teks kesimpulan otomatis laboratorium.
  - Penyesuaian informasi letalitas mutasi kromosom (*Lethality Index*) pada autosom besar (Chr 1 & 3) vs trisomi yang mampu bertahan hidup (Chr 13 Patau, Chr 18 Edwards, Chr 21 Down).
  - Penyesuaian istilah kromosom orang tua dari bahasa Inggris `"MOTHER (XX)"` & `"FATHER (XY)"` menjadi **`"IBU (XX)"`** dan **`"AYAH (XY)"`**.

#### 🎨 Revisi Ahli Media (Media & Instructional Design Expert Revisions)
- **Lokalisasi Bahasa Antarmuka (UI Translation & Localization):**
  - Mengubah seluruh label aksi tombol dan petunjuk navigasi utama dari Bahasa Inggris ke Bahasa Indonesia yang ramah siswa SMA.
  - Mengubah tombol navigasi beranda dari `"INITIALIZE"` menjadi **`"MULAI SIMULASI"`**.
  - Mengubah tombol akses database dari `"ACCESS DATABASE"` menjadi **`"BUKA DATABASE"`**.
  - Menerjemahkan indikator status sistem (`"SYSTEM: READY"` -> `"SISTEM: SIAP"`, `"SYSTEM SECURE"` -> `"SISTEM AMAN"`, `"NEURAL LINK ESTABLISHED"` -> `"JARINGAN NEURAL TERHUBUNG"`).
  - Menerjemahkan teks animasi *loading* (`"READING GENOME..."` -> `"MEMPROSES GENOM..."`, `"SEQUENCING DNA..."` -> `"MEMPROSES DNA..."`, `"SCANNING FOR MUTATIONS..."` -> `"MEMINDAI MUTASI..."`, `"MITOSIS IN PROGRESS"` -> `"MITOSIS BERLANGSUNG"`).
- **Aksesibilitas & Integrasi E-Module:**
  - Penyesuaian kontras warna elemen UI (neon cyan, emerald green, magenta, dan rose pink) dengan latar belakang gelap untuk mengurangi kelelahan mata siswa (*eye strain*).
  - Penyesuaian skema responsif sehingga tampilan alat laboratorium virtual dapat disematkan (*embedded*) dengan presisi tinggi di dalam `iframe` E-Module Flipbook tanpa memotong elemen tombol interaktif.

---

## [1.1.0] - 2026-08-15

### Added
- **Modul 05 (BIO-ARCHIVE):** Penambahan ensiklopedia interaktif aplikasi bioteknologi modern dan konvensional (Insulin Rekombinan, Golden Rice, Bioremediasi, DNA Profiling PCR).
- **Modul 04 (GEN-K):** Penambahan fitur simulasi mikroskop digital *Karyotype Scanner* untuk mutasi kromosom aneuploidi (monosomi, disomi, trisomi).
- **Modul 03 (GEN-X):** Penambahan kalkulator risiko penyakit terpaut kromosom X (Hemofilia / Buta warna) dan kartu bayi digital F1.

### Changed
- Refactoring arsitektur UI menggunakan Tailwind CSS CDN & Custom Glassmorphism CSS.
- Penambahan animasi 3D Heliks DNA dan Canvas Particle Background pada halaman utama GEN-OS.

---

## [1.0.0] - 2026-08-01

### Added
- Peluncuran *prototype* awal Laboratorium Genetika Virtual (GEN-OS).
- Modul dasar Simulasi Monohibrid (GEN-LAB) dan Simulasi Dihibrid (BIO-SEQUENCER).
- Perhitungan dasar rasio Punnett Square 2x2 dan 4x4.
