# Catatan Perubahan (CHANGELOG)

Semua perubahan, perbaikan, dan revisi penting pada **Laboratorium Genetika Virtual (GEN-OS)** didokumentasikan dalam berkas ini. Format dokumentasi mengacu pada standar [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan penentuan versi mengacu pada [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### 📌 Penambahan Modul Simulasi Translasi mRNA → Protein (simulasi-translasi)
- **Peluncuran Modul Baru `simulasi-translasi`:** Menambahkan modul simulasi interaktif yang memvisualisasikan proses sintesis protein (translasi) dari mRNA ke rantai asam amino (polipeptida) di ribosom. Dilengkapi dengan animasi interaktif untuk setiap langkah (Inisiasi, Elongasi, Terminasi), pergerakan tRNA pembawa asam amino, pembentukan ikatan peptida, dan referensi tabel genetik kodon.

### 📌 Penambahan Modul Model Kromosom 3D Interaktif (chromosome-3d-interactive)
- **Peluncuran Modul Baru `chromosome-3d-interactive`:** Menambahkan modul eksplorasi visual 3D anatomi kromosom metafase duplikasi (berbentuk X) yang saling melengkapi dengan modul DNA 3D.
  - **Pemodelan Anatomi Sitogenetika Realistis:** Dua kromatid saudara (*Sister Chromatids*) dengan lekukan organik, penyempitan primer sentromer (*centromere*), kompleks lempeng protein kinetokor (*kinetochore*), tudung terminal telomer emas (*telomere*), serta pola pita horizontal *G-Banding* (heterokromatin padat dan eukromatin aktif).
  - **Simulasi Mitosis & Pemisahan Kromatid (Tahap Anafase):** Menambahkan fitur simulasi anafase di mana benang spindel mikrotubulus menarik kedua kromatid saudara ke arah kutub berlawanan dengan gerakan lentur khas huruf V.
  - **Mode Uraikan Komponen (*Exploded View*):** Memisahkan seluruh elemen anatomis (Sentromer melayang ke depan, Kinetokor ke samping, Telomer ke kutub ujung, dan Lengan p/q merekah) untuk mempermudah pemahaman struktur internal kromosom.
  - **Inspektor Sitogenetika Interaktif & Raycaster:** Klik/sentuh pada bagian kromosom menampilkan data sitologis lengkap (komposisi molekuler, lokasi sitologis, peran mitosis, signifikansi klinis, dan fungsi biologis).
  - **Arsitektur Responsif Universal Multi-Device:** Mengadaptasi sistem *Bottom Sheet Glassmorphism*, *Mobile Floating Quick Action Dock*, serta kamera *aspect-ratio scaling* untuk kompatibilitas sempurna pada semua rasio perangkat (smartphone, tablet, desktop).
  - **Perbaikan Bug Render Geometri:** Memperbaiki kesalahan `TypeError` saat inisialisasi orientasi cincin pita *G-Bands* (memindahkan pemanggilan `quaternion.setFromUnitVectors` dari objek geometri ke objek mesh) yang sebelumnya sempat menghentikan eksekusi rendering kromosom.
  - **Perbaikan Anatomi Kromosom & Crash Animasi:** Mengubah titik kurva geometri (*CatmullRomCurve3*) kromatid lengan p dan q agar berbentuk melengkung organik dan realistis (huruf X sejati), menghapus garis putih statis (mesh benang spindel), serta menulis ulang *vector lerp engine* agar tidak *crash* saat memproses rotasi Euler pada animasi pemisahan dan penguraian kromosom.
  - **Penyesuaian Tracking Label Anatomi 3D:** Memperbarui sistem proyeksi layar (*Screen Projection*) pada anotasi 3D agar titik garis penunjuk (*pointer/bracket*) melekat akurat tepat sasaran pada permukaan kromosom melalui penerapan modifikasi *offset* komputasi menggunakan CSS Variables dan utilitas `.callout-left` berkonsep *flex-reverse*.

### 📌 Penyempurnaan Realisme Molekuler & Perbaikan Fitur Pemisah DNA 3D
- **Rekonstruksi Model B-DNA Realistis (Watson-Crick Crystallographic Geometry):**
  - Mengganti model bola-kartun sederhana dengan visualisasi molekuler ilmiah profesional seperti ilustrasi medis/jurnal biologi molekuler.
  - Implementasi kurva kontinu *Tube Ribbon Geometry* untuk kedua pita tulang punggung gula-fosfat antiparalel (5' ke 3' dan 3' ke 5').
  - Penyesuaian sudut asimetris heliks (~136°) untuk membentuk **Lekukan Mayor (*Major Groove*)** dan **Lekukan Minor (*Minor Groove*)** sejati khas DNA tipe-B.
  - Representasi cincin molekuler akurat: Purin (Adenin & Guanin) dengan struktur dua cincin terpadu (heksagonal + pentagonal) dan Pirimidin (Timin & Sitosin) dengan satu cincin heksagonal.
  - Visualisasi jembatan **Ikatan Hidrogen** presisi: 2 ikatan pada pasangan A=T dan 3 ikatan pada pasangan G≡C.
- **Peningkatan Saturasi, Kontras & Ketajaman Warna Molekul:**
  - Mengatasi masalah warna pucat dengan menurunkan *exposure tone mapping* (dari 1.45 ke 1.05) dan menyeimbangkan intensitas tata cahaya studio agar warna tidak pudar (*over-exposed*).
  - Menerapkan palet warna pekat, solid, dan kontras tinggi: **Adenin** (Biru Royal `#1d63ff`), **Timin** (Kuning Amber `#ffb703`), **Guanin** (Hijau Zamrud `#00d659`), **Sitosin** (Merah Koral `#ff2a4b`), dan **Tulang Punggung** (Lilac-Indigo Mutiara `#5c6ae4`).
  - Menghilangkan lapisan putih *milky overlay* pada kanvas cap huruf (A, T, G, C) serta mengurangi *environment reflection* berlebih pada teks agar setiap basa nitrogen tampak jelas dan mudah dibedakan satu sama lain.
- **Visual Match dengan Gambar Referensi Medis/Ilmiah (Ultra-Realistic):**
  - Mengadaptasi skema warna presisi persis gambar referensi: Adenin (Biru Royal), Timin (Kuning Terang), Guanin (Hijau Daun), Sitosin (Merah Koral), dan Tulang Punggung (Pita Mutiara Lilac/Periwinkle).
  - Implementasi cap bundar (*letter-embossed badge*) beresolusi tinggi pada ujung setiap batang basa dengan huruf tertera jelas ('A', 'T', 'G', 'C').
  - Visualisasi jembatan ikatan hidrogen persis seperti gambar: 2 garis titik putih bercahaya (*dashed white lines*) pada pasangan A-T dan 3 garis titik pada pasangan C-G.
  - Penambahan anotasi 3D dinamis (*Real-time 3D Screen Tracking Callouts*) dengan kurung siku (*brackets*) dan garis penunjuk ke *Major Groove*, *Minor Groove*, *Sugar-Phosphate Backbone*, serta pasangan basa A-T dan C-G.
  - Latar belakang gradien biru laut dalam dengan partikel terlarut dan bola-bola *bokeh* kabur untuk menciptakan efek kedalaman optik (*microscopic depth of field*).
- **Perbaikan & Peningkatan Sistem Pemisahan Bagian DNA (*Separation Modes*):**
  - Mengganti pustaka eksternal Tween dengan *Internal Self-Contained Vector Lerp Engine* untuk menjamin tombol pemisah berfungsi 100% tanpa risiko kegagalan unduh skrip eksternal atau *offline*.
  - Menambahkan mode **Pisahkan Untai Ganda (*Unzipping / Denaturasi*)**: membelah ikatan hidrogen dan menjauhkan kedua untai heliks ke samping secara lateral seperti aksi enzim helikase.
  - Menambahkan mode **Uraikan Per Bagian (*Exploded View / Deconstruction*)**: mengekspansi pita tulang punggung keluar secara radial, memisahkan cincin purin ke kiri dan pirimidin ke kanan, serta mengisolasi ikatan hidrogen di tengah.
  - Menambahkan fitur **Isolasi & Filter Komponen Interaktif**: tombol filter untuk menonjolkan bagian tertentu (Semua, Tulang Punggung, Adenin, Timin, Guanin, Sitosin, atau Ikatan Hidrogen) dengan meredupkan bagian lainnya secara transparan.
  - Tombol **Gabungkan Kembali** untuk merekonstruksi kembali DNA ke bentuk heliks utuh secara mulus.
- **Desain Responsif Universal Multi-Device (Semua Rasio Layar & Handphone):**
  - Implementasi sistem kamera adaptif dinamis (*Dynamic Aspect-Ratio Camera & FOV Scaling*): otomatis menyesuaikan sudut pandang dan jarak kamera berdasarkan rasio aspek layar pengguna (smartphone vertikal 19.5:9, 20:9, 21:9, tablet 3:4, laptop 16:10, hingga desktop ultrawide 21:9) sehingga heliks DNA tidak pernah terpotong.
  - Transformasi panel kontrol dan inspektor menjadi **Glassmorphism Bottom Sheets / Drawer** yang meluncur mulus dari bawah pada perangkat berlayar sempit (< 768px), dilengkapi dengan *drag handle bar* ramah jempol dan tombol tutup.
  - Penambahan **Mobile Floating Quick Action Dock**: navigasi mengambang di bawah layar ponsel yang menyajikan tombol akses cepat satu ketukan (*One-Tap Unzip, Explode, Reset, Menu, dan Detail*).
  - Optimasi interaksi sentuh (*Mobile Touch Gestures*): mengaktifkan rotasi 1 jari, *pinch-to-zoom*, dan *pan* 2 jari dengan `touch-action: none` untuk mencegah benturan gestur bawaan peramban seluler.
  - Mendukung area aman layar ponsel modern (*CSS Safe Area Insets `env(safe-area-inset-top)` & `env(safe-area-inset-bottom)`*) untuk perangkat berponi (*notch / punch hole*).
  - Dukungan rotasi layar ponsel (*orientationchange listener*) otomatis antara mode potret dan lanskap.

---

## [1.3.0] - 2026-08-28

### 📌 Penyempurnaan Ahli Media & Integrasi Fitur Baru

Rilis versi 1.3.0 ini berfokus pada rekonstruksi arsitektur file agar dapat disematkan (*embedded*) dengan sempurna secara *offline* maupun *online* ke dalam piranti lunak (*software*) E-Module Flipbook, serta penambahan fitur analisis genetik tingkat lanjut.

#### ✨ Fitur Baru (New Features)
- **Kalkulasi & Visualisasi Rasio Genotipe (Revisi Ahli Materi):** Mengimplementasikan perhitungan Rasio Genotipe pada ketiga modul persilangan.
  - **Dihibrid:** Menampilkan urutan frekuensi kombinasi gen (misal `AABB`, `AaBb`) dalam bentuk *badge* khusus.
  - **Monohibrid:** Menampilkan statistik kombinasi alel (misal `AA`, `Aa`, `aa`) di bawah rasio fenotipe.
  - **Seks/Gen-X:** Menyisipkan tulisan genotipe alelik ($X^B X^b$, $X^b Y$, dll) pada teks laporan otomatis.
- **Simulasi Penyimpangan Semu Hukum Mendel:** Menambahkan fitur dropdown "Mode Pewarisan" pada modul Dihibrid (BIO-SEQUENCER). Siswa kini dapat melakukan simulasi interaksi genetik penyimpangan semu:
  - Normal Mendel (9:3:3:1)
  - Kriptomeri (9:3:4) - Visualisasi warna bunga.
  - Epistasis Dominan (12:3:1) - Visualisasi warna labu.
  - Polimeri (15:1) - Visualisasi warna gandum.
- **Laporan Klinis/Akademik Dinamis:** Teks deskripsi hasil analisis Punnett Square kini berubah menyesuaikan teori penyimpangan semu yang sedang disimulasikan.

#### 🔧 Perbaikan Teknis & Arsitektur (Technical & Architectural Revisions)
- **Konsolidasi Source Code (*Stand-alone HTML*):** Menghapus ketergantungan pada file eksternal (`css/style.css` dan `js/main.js`). Seluruh baris kode (HTML, CSS, JavaScript) kini telah dilebur (*embedded*) menjadi satu kesatuan di dalam setiap file modul `.html`. Ini mempermudah proses penyematan (*copy-paste*) ke dalam kotak *decode HTML* pada perangkat lunak pembuat *flipbook*.
- **Penyempurnaan Responsivitas Layar (Responsive UI):** Memperbaiki masalah tumpang-tindih (*overlapping*) pada tampilan *mobile* dan *tablet*:
  - Memperbaiki komponen *dropdown* agar merespons tumpukan *flexbox* dengan benar di layar sempit.
  - Memastikan *grid* Punnett 4x4 dapat digeser secara horizontal (*overflow-x-auto*) di perangkat seluler agar tidak memecah struktur halaman *flipbook*.

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
