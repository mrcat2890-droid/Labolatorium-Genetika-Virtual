# Catatan Perubahan (CHANGELOG)

Semua perubahan, perbaikan, dan revisi penting pada **Laboratorium Genetika Virtual (GEN-OS)** didokumentasikan dalam berkas ini. Format dokumentasi mengacu pada standar [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan penentuan versi mengacu pada [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### 📌 Refaktorisasi & Overhaul Desain: Modul TRANSCRIPTION (Simulasi Transkripsi DNA & Sintesis mRNA)
- **Harmonisasi Desain Sistem GEN-OS Futuristik (`simulasi-transkripsi/index.html` & `style.css`):**
  - Menggantikan antarmuka lama berbasis vanilla CSS (hasil buatan Claude yang tidak seragam) menjadi standar desain sistem futuristik GEN-OS menggunakan Tailwind CSS, latar belakang dark mode `#030712`, glassmorphism (`glass-panel`), tipografi resmi (`Orbitron`, `Rajdhani`, dan `Fira Code`), serta palet warna selaras (aksen Amber `#f59e0b` dan Orange `#f97316` sesuai tema Modul 09 pada `index.html`).
  - Menghubungkan modul secara utuh ke Beranda dengan tombol navigasi `← BERANDA GEN-OS` menuju `../index.html`.
- **Banner Ringkasan Ilmiah 3 Tahap Transkripsi:**
  - Menyediakan 3 kartu ringkasan visual interaktif:
    1. *Tahap 1: Inisiasi & Pembukaan Heliks* (pengenalan sekuens promoter/TATA Box oleh RNA Polimerase, pembukaan ikatan hidrogen DNA membentuk *transcription bubble*).
    2. *Tahap 2: Elongasi Rantai mRNA* (pembacaan untai cetakan 3' &rarr; 5', polimerisasi rNTP menjadi rantai mRNA komplementer 5' &rarr; 3' dengan penggantian Timin menjadi Urasil).
    3. *Tahap 3: Terminasi & Pelepasan* (pengenalan sekuens terminator, pelepasan untai mRNA lengkap, dan penutupan kembali heliks ganda DNA).
- **Peningkatan Engine Canvas & Visualisasi Molekuler (`simulasi-transkripsi/script.js`):**
  - Memperbaiki bug variabel global tidak terdefinisi (`startX`, `baseYCoding`, `baseYTemplate`, dll.) menjadi manajemen dimensi responsif terpadu dengan penskalaan Hi-DPI (Retina Canvas).
  - Visualisasi perimeter membran inti sel (*nuclear envelope*) dan ruang matriks nukleus.
  - Representasi anatomis enzim RNA Polimerase II dengan pendaran gradien amber-oranye, saluran masuk DNA, situs katalitik aktif pemanjangan rNTP, dan saluran keluar mRNA.
  - Dinamika gelembung transkripsi (*transcription bubble*) realistis: peregangan dan pemisahan untai cetakan vs pengkode saat enzim bergerak, ikatan hidrogen putus-putus, serta hibridisasi sementara DNA-RNA di situs katalitik.
  - Visualisasi pembebasan untai mRNA saat terminasi bergerak melayang (*floating*) menuju pori nukleus dengan ujung 5' cap dan 3' poly(A) teridentifikasi jelas.
- **Sinkronisasi Matriks Komplementaritas Basa & Monitor Transkripsi Realtime:**
  - Panel data realtime memantau basa DNA cetakan yang sedang dibaca, basa mRNA baru yang ditambahkan, status ikatan (2 ikatan H A=U vs 3 ikatan H G≡C), serta penghitung panjang nukleotida (0 hingga 27 Nt).
  - Aliran sekuens mRNA (*mRNA Stream Visualizer*) yang merender badge warna nukleotida interaktif (A di sky, T di amber, G di emerald, C di rose, dan U di orange) lengkap dengan sekat pembatas triplet kodon.
  - Penyorotan baris tabel aturan komplementaritas secara dinamis (*pairing-table highlight*) sesuai basa yang sedang diproses.
  - Tombol pintas navigasi lompat tahap langsung (*quick jump buttons*) untuk kelima tahap transkripsi.
- **Penerapan Modal Panduan & Referensi Ilmiah (Kepatuhan Aturan #1 & #5):**
  - Dialog modal **"📖 Panduan Lengkap Simulasi Transkripsi"** yang menjelaskan dogma sentral biologi molekuler, perbedaan mendasar untai sense vs antisense, dan petunjuk operasional simulator.
  - Dialog modal **"📚 Literatur Ilmiah"** dengan sitasi ilmiah primer:
    - *Jacob & Monod (1961) / Brenner et al. (1961)* – Penemuan dan pembuktian konsep messenger RNA (mRNA).
    - *Hurwitz et al. (1960) / Samuel B. Weiss (1960)* – Isolasi dan karakterisasi enzim RNA Polimerase bergantung-DNA.
    - *Cramer, Bushnell, & Kornberg (2001 & Nobel Kimia 2006)* – Struktur kristalografi resolusi atomik RNA Polimerase II eukariota.
  - Efek audio interaktif sintetis (Web Audio API) untuk umpan balik auditori pergantian tahap, polimerisasi nukleotida rNTP, dan penyelesaian sintesis mRNA.


### 📌 Refaktorisasi & Overhaul Desain: Modul TRANSLATION (Simulasi Translasi mRNA & Perakitan Protein)
- **Harmonisasi Desain Sistem GEN-OS Futuristik (`simulasi-translasi/index.html` & `style.css`):**
  - Menggantikan antarmuka lama berbasis vanilla CSS (hasil buatan Claude yang tidak seragam) menjadi standar desain sistem futuristik GEN-OS menggunakan Tailwind CSS, dark mode `#030712`, glassmorphism (`glass-panel`), tipografi resmi (`Orbitron`, `Rajdhani`, dan `Fira Code`), serta palet warna selaras (aksen Emerald `#10b981` dan Cyan `#06b6d4` sesuai tema Modul 10 pada `index.html`).
  - Menghubungkan modul secara utuh ke Beranda dengan tombol navigasi `← BERANDA GEN-OS` menuju `../index.html`.
- **Banner Ringkasan Ilmiah 3 Tahap Translasi:**
  - Menyediakan 3 kartu ringkasan visual interaktif:
    1. *Tahap 1: Inisiasi Ribosom* (kodon start AUG, inisiator tRNA Metionin pada Situs P).
    2. *Tahap 2: Elongasi Peptida* (masuknya aminoasil-tRNA di Situs A, pembentukan ikatan peptida oleh peptidil transferase, translokasi triplet kodon).
    3. *Tahap 3: Terminasi & Pelepasan* (pengenalan kodon stop UAA/UAG/UGA oleh Faktor Pelepas/Release Factor, pembebasan polipeptida).
- **Peningkatan Engine Canvas & Visualisasi Molekuler (`simulasi-translasi/script.js`):**
  - Rendering canvas responsif dan tajam dengan dukungan rasio layar Hi-DPI (Retina Display).
  - Visualisasi dinamis pita mRNA 5' cap ke 3' poly(A) lengkap dengan penanda triplet kodon berbingkai pendar neon.
  - Representasi anatomis kompleks ribosom: Subunit Besar (50S/60S) dan Subunit Kecil (30S/40S) dengan rongga chamber Situs P (Peptidil) dan Situs A (Aminoasil).
  - Visualisasi molekul tRNA berstruktur adaptor L-shape/cloverleaf dengan asam amino bermuatan, ikatan hidrogen komplementer antikodon-kodon, serta interaksi ikatan peptida.
  - Simulasi tahap terminasi dengan pengikatan Faktor Pelepas (*Release Factor* / RF) berwarna merah dan pembebasan rantai polipeptida 8 residu lengkap dengan ujung terminus N (`H2N─`) dan C (`─COOH`) beranimasi mengapung bebas (*free-floating*).
- **Sinkronisasi Matriks Kode Genetik Standar & Panel Status Translasi:**
  - Panel data realtime menampilkan kodon aktif, antikodon komplementer, nama asam amino lengkap, dan visualisator untai polipeptida dengan lencana warna per residu asam amino.
  - Tabel 64 kode genetik standar dengan penyorotan sel otomatis (*active codon highlighting*) secara realtime sesuai kodon yang sedang dibaca ribosom.
  - Tombol pintas navigasi langsung ke tahap kunci: *Inisiasi*, *Elongasi 1*, *Elongasi 4*, *Terminasi (STOP)*, dan *Hasil Akhir*.
- **Penerapan Modal Panduan & Referensi Ilmiah (Kepatuhan Aturan #1 & #5):**
  - Dialog modal **"📖 Panduan Lengkap Simulasi Translasi"** yang merinci konsep dogma sentral biologi molekuler, fungsi 3 situs ribosom (A, P, E), dan tata cara pengoperasian simulator.
  - Dialog modal **"📚 Literatur Ilmiah"** dengan rujukan orisinal: Marshall Nirenberg & J. Heinrich Matthaei (1961 - pemecahan kode triplet kodon), Francis Crick (1966 - hipotesis goyang/wobble pairing), serta Nenad Ban et al. (2000) dan Ramakrishnan, Steitz, & Yonath (Nobel Kimia 2009 - struktur resolusi atomik ribosom sebagai ribozim).
  - Efek audio interaktif sintetis (Web Audio API) untuk umpan balik auditori pergantian kodon, pembentukan ikatan peptida, dan penyelesaian sintesis protein.


### 📌 Peningkatan Visual & Estetika: Efek Glassmorphism Penuh pada Beranda Utama (`index.html`)
- **Penerapan Efek Glassmorphism Penuh pada 13 Kotak Modul Simulator:**
  - Mengubah seluruh kartu modul dari warna gelap solid menjadi panel kaca beku (*frosted glassmorphism*) dengan `backdrop-filter: blur(18px)`, latar belakang gradien semi-transparan ganda, border kaca halus (`border: 1px solid rgba(255, 255, 255, 0.12)`), dan sudut melengkung modern (`rounded-2xl`).
  - Menambahkan garis refleksi spekular di tepi atas kartu (`::before`) serta efek animasi sapuan kilau cahaya diagonal (*diagonal glass sheen sweep*) yang dinamis saat kartu di-*hover* (`::after`).
  - Memungkinkan jaring partikel konstelasi latar belakang (`#bg-canvas`) berpendar tembus pandang secara artistik di balik seluruh kartu simulator.
- **Kapsul Kaca Ikon Modul (`.card-icon-glass`):**
  - Mengemas setiap emoji ikon ke dalam wadah lensa kaca frosted khusus dengan efek *shadow-inner* dan pencahayaan aksen warna tema (*theme glow*) saat kursor diarahkan.
- **Tombol Peluncur Berbasis Kaca Futuristik (`.btn-launch`):**
  - Mendesain ulang seluruh tombol aksi peluncuran modul dengan isian kaca semi-transparan, efek blur 12px, border aksen neon, serta transformasi interaktif saat *hover*.
- **Header & Footer Glassmorphic Terpadu:**
  - Menyelaraskan bilah navigasi atas (*header*) dan catatan kaki (*footer*) dengan efek kaca transparan *heavy blur* (`backdrop-blur-xl`), dilengkapi kapsul kaca elegan untuk status sistem (*SYSTEM SECURE*) dan jam digital.


### 📌 Refaktorisasi & Overhaul Desain: Modul GAMETO-3D (Simulasi 3D Gametogenesis & Fertilisasi)
- **Harmonisasi Desain Sistem GEN-OS Futuristik (`gametogenesis.html`):**
  - Menggantikan antarmuka lama berbasis CSS mentah (hasil buatan Claude) menjadi standar desain sistem futuristik GEN-OS menggunakan Tailwind CSS, dark mode `#030712`, glassmorphism (`glass-panel`), tipografi resmi (`Orbitron`, `Rajdhani`, dan `Fira Code`), serta palet warna selaras (aksen Indigo `#6366f1`, Cyan `#22d3ee`, Pink `#ec4899`, dan Emerald `#10b981` sesuai tema Modul 11 pada `index.html`).
  - Menghubungkan modul secara utuh ke Beranda dengan tombol navigasi `← BERANDA` menuju `index.html`.
- **Peningkatan Antarmuka 3D & HUD Biological Viewport:**
  - Merapikan panggung WebGL Three.js dengan indikator status floating neon, badge tahapan meiosis real-time, serta tombol kontrol kamera melayang (Zoom In `+`, Zoom Out `-`, dan Reset View `R`).
  - Merestrukturisasi label anotasi 3D (billboard labels) menjadi tag lencana kaca berlatar gelap dengan border neon bercahaya yang dinamis mengikuti proyeksi koordinat 3D.
- **Penyempurnaan Panel Kontrol & Matriks Genetika (Kotak Punnett 4×4):**
  - Mengorganisasi ulang dock navigasi bawah menjadi 2 seksi utama: (1) Narasi Tahapan Biologis Ilmiah dan (2) Analisis Genetika Gamet & Kotak Punnett interaktif yang menyorot gamet terpilih serta genotipe zigot hasil fertilisasi secara dinamis.
  - Memperbaiki kontrol pemutaran: tombol Putar/Jeda dengan status aktif neon, pemilih kecepatan linimasa (`0.5x`, `1x`, `2x`), scrubber linimasa, serta tombol bookmark fase (`Induk 2n`, `Meiosis I`, `Meiosis II`, `Gamet`, `Fertilisasi`, `Zigot 2n`).
  - Menyediakan toggle parameter: *Pindah Silang (Crossing Over)*, *Meiosis Normal vs Error Tetraploidi (4n)*, *Label 3D*, dan *Acak Ulang*.
- **Penerapan Modal Panduan & Referensi Ilmiah (Kepatuhan Aturan #1 & #5):**
  - Dialog modal **"📖 Panduan Lengkap Simulasi 3D"** yang merinci 4 materi esensial: Konsep Meiosis, Spermatogenesis vs Oogenesis, Pindah Silang (Crossing Over), serta Fertilisasi & Reaksi Kortikal (Blok Polispermi).
  - Dialog modal **"📚 Literatur Ilmiah"** dengan rujukan biologi seluler & genetika: Oscar Hertwig (1876 - fusi inti fertilisasi), Sutton-Boveri (1902–1903 - teori kromosom meiosis), Thomas Hunt Morgan (1911 - crossing over), serta Inoue & Bianchi (2005 & 2014 - fusi molekuler Izumo1 dan Juno).
  - Efek audio interaktif sintetis (Web Audio API) untuk interaksi kontrol dan pembentukan zigot.


### 📌 Refaktorisasi & Overhaul Desain: Modul GENO-PHENO (Simulasi Genotipe vs Fenotipe)
- **Harmonisasi Desain Sistem GEN-OS Futuristik (`Simulasi Genotipe vs Fenotipe.html`):**
  - Menggantikan tampilan lama berbasis vanilla CSS (font Figtree buatan Claude) menjadi standar desain sistem futuristik GEN-OS menggunakan Tailwind CSS, dark mode `#030712`, glassmorphism (`glass-panel`), tipografi modern (`Orbitron`, `Rajdhani`, dan `Fira Code`), serta skema warna terpadu (aksen Sky `#38bdf8` dan Cyan `#00f3ff` sesuai tema Modul 06 pada `index.html`).
- **Ekspansi Sistem Persilangan Genetika Berbasis Literatur Ilmiah (Aturan #1):**
  - Menyediakan 4 sistem pewarisan sifat komprehensif:
    1. *Pisum sativum* Warna Bunga (Monohibrid Dominansi Penuh Mendel, alel P/p).
    2. *Pisum sativum* Bentuk Biji (Enzim SBEI, alel R/r).
    3. Sistem Golongan Darah ABO (Alel Ganda Kodominan Iᴬ, Iᴮ, dan i).
    4. *Mirabilis jalapa* Bunga Pukul Empat (Dominansi Tidak Lengkap / Intermediet, alel M/m).
  - Dilengkapi visualisasi ilustrasi vektor SVG resolusi tinggi yang responsif terhadap perubahan alel untuk setiap fenotipe (bunga ercis, biji bulat/keriput, tetesan darah antigenik, dan bunga mirabilis).
  - Menambahkan representasi visual pasangan lokus kromosom homolog pada kedua panel induk ($P_1$ dan $P_2$).
- **Matriks Papan Punnett & Penyederhanaan Rasio Otomatis:**
  - Papan catur Punnett dinamis dengan animasi sel, probabilitas per kotak 25% (1/4), dan kalkulator penyederhanaan rasio genotipe serta fenotipe otomatis (algoritma GCD).
- **Simulasi Fertilisasi Acak (Monte Carlo) & Uji Statistik Chi-Square (χ²):**
  - Simulasi persilangan acak dengan pilihan sampel keturunan $N = 4, 20, 100, 1.000$ untuk membuktikan *Hukum Bilangan Besar (Law of Large Numbers)*.
  - Visualisasi perbandingan frekuensi data Teramati ($O$) vs Harapan Teori ($E$).
  - Perhitungan Uji Chi-Square ($\chi^2 = \sum \frac{(O-E)^2}{E}$) otomatis dengan derajat kebebasan ($df$), nilai kritis taraf $\alpha = 0.05$, interpretasi kesimpulan ilmiah ($H_0$), dan peringatan frekuensi harapan kecil Cochran ($E < 5$).
  - Galeri sampel 30 keturunan pertama dengan toggle fitur *"Ungkap Genotipe (X-Ray Mode)"*.
- **Penerapan Modal Panduan & Referensi Ilmiah (Kepatuhan Aturan #1 & #5):**
  - Modal **"📖 Panduan Lengkap Simulasi"** yang menyajikan tutorial langkah demi langkah bagi peserta didik sebelum dan saat menjalankan simulasi.
  - Modal **"📚 Literatur Ilmiah"** yang mencantumkan sitasi sejarah dan data ilmiah genetika dari Gregor Mendel (1866), Karl Landsteiner (1900), Felix Bernstein (1924), dan Karl Pearson (1900).
  - Efek audio interaktif sintetis (Web Audio API) dengan opsi on/off suara.


### 📌 Modul Baru: HEMATO-LAB (Simulasi Penggolongan Darah & Transfusi Interaktif)
- **Pembuatan Modul Independen Baru (`Simulasi-Penggolongan-Darah.html`):**
  - Mengembangkan modul ke-13 yang secara khusus dan komprehensif membahas genetika penggolongan darah sistem ABO dan Rhesus sesuai standar medis klinis (merujuk pada literatur Campbell Biology dan genetika medis Landsteiner).
- **Fitur Simulasi & Kalkulasi Ilmiah pada HEMATO-LAB:**
  - **Uji Aglutinasi Laboratorium (Canvas HTML5):** Menghadirkan simulasi interaktif mikroskopis (Forward Typing) menggunakan Partikel Sel Darah (RBCs) dan dinamika *fluid-friction* untuk meneteskan Reagen Serum Anti-A, Anti-B, dan Anti-D, guna mendemonstrasikan penggumpalan eritrosit.
  - **Mesin Pewarisan Genetik Lengkap (ABO & Rh):** Simulasi papan Punnett ganda (2x2) untuk alel ganda kodominan (IA, IB, i) di kromosom 9 dan alel Rhesus (D, d) di kromosom 1, menghasilkan 16 kombinasi anak (F1).
  - **Sistem Peringatan Medis (Eritroblastosis Fetalis):** Fitur pendeteksi bahaya klinis otomatis yang mensimulasikan risiko Hemolytic Disease of the Newborn apabila ibu memiliki genotipe Rh- dan disilangkan dengan genotipe ayah Rh+, lengkap dengan penjelasan pencegahan via injeksi RhoGAM.
  - **Matriks Kompatibilitas Transfusi Medis (8x8 Grid):** Papan pemetaan klinis yang mengizinkan uji coba pendonoran (Packed RBC) antar 8 golongan darah, beserta penjelasan interaktif mengenai imunologis bentrok antigen-antibodi secara dinamis.
- **Integrasi Navigasi & Tutorial (Aturan #5):**
  - Modul telah dilengkapi dengan modal panduan/tutorial ilmu genetika darah step-by-step sebelum pengguna dapat mengakses *dashboard*, dan terhubung secara utuh pada `index.html` (kartu modul urutan ke-13).


### 📌 Peningkatan Responsivitas Mobile & Integrasi Penuh 12 Modul pada Beranda Klasik
- **Optimasi Responsivitas Multi-Perangkat (Mobile/Tablet/Desktop):**
  - Menerapkan arsitektur flex-wrap dinamis (`flex-wrap gap-1`) pada seluruh panel statistik genotipe dan fenotipe di dalam modul untuk mencegah bentrok dan tumpang-tindih (overlap) rasio ketika dibuka pada perangkat berlayar sempit (seperti di HP).
  - Modul yang diperbaiki rasio panelnya mencakup: *Generator Rasio Dihibrid*, *Simulasi Kriptomeri*, *Simulasi Epistasis*, *Simulasi Atavisme*, dan *Simulasi Hipostasis*.
  - Mengubah _padding_ absolut statis (`p-8`) menjadi _padding_ dinamis (`p-5 md:p-8` atau `p-5 md:p-6`) pada seluruh kartu antarmuka untuk memberikan ruang bernapas (breathing room) teks secara vertikal & horizontal saat dilihat dari perangkat mobile.
  - Memperbaiki tata letak (layout flex) tajuk judul/catatan kaki (*footer/metadata*) pada _Simulasi Deteksi Kromosom_ agar menurun terstruktur dan tidak keluar dari area layar (overflow).
- **Integrasi Penuh 12 Modul pada Template Antarmuka Lama (`index.html`):**
  - Mengembalikan tata letak kartu grid futuristik asli (dengan animasi _grayscale_ emoji) namun mengembangkannya untuk menampung seluruh 12 modul simulator yang sudah dibangun secara rapi, tanpa mengorbankan desain antarmuka klasik yang disukai.
  - Menyempurnakan skala elemen 3D loader DNA dan Jaringan Background Partikel (Particle Background) agar tampil _responsive_ menyesuaikan resolusi jendela browser (viewport width).

### 📌 Audit Komprehensif, Perbaikan Tautan & Navigasi Antar-Modul, Penambahan Tutorial Interaktif (Aturan #5), dan Integrasi Modul 3D Molekuler
- **Perbaikan Bug Kritis Tautan 404 pada Kartu Modul Beranda (`index.html`):**
  - Memperbaiki tautan modul GEN-K Deteksi Kromosom dari `Simulasi Deteksi Kromosom/Simulasi Deteksi Kromosom.html` (menggunakan spasi yang menyebabkan error 404 pada web server dan GitHub Pages) menjadi `Simulasi Deteksi Kromosom/Simulasi-Deteksi-Kromosom.html` (menggunakan tanda hubung sesuai berkas aktual).
- **Integrasi Penuh Beranda `index.html` Menjadi 12 Modul Terpadu (2 Seksi Besar):**
  - Mengorganisasi ulang tata letak kartu beranda dengan penataan visual rapi dan badge seksi:
    1. *Modul Persilangan & Genetika Klasik*:
       - `01`: GEN-LAB (Monohibrid & Hukum I Mendel)
       - `02`: BIO-SEQUENCER (Dihibrid & Hukum II Mendel)
       - `03`: EPI-GENETICS (Pusat Penyimpangan Semu: Kriptomeri, Atavisme, Epistasis Dominan, Hipostasis)
       - `04`: GEN-X (Pewarisan Sifat Terpaut Seks / X-Linked)
       - `05`: GEN-K (Deteksi Aneuploidi & Kariotipe Sitogenetika)
       - `06`: GENO-PHENO (Eksplorasi Konsep Interaktif Genotipe vs Fenotipe)
    2. *Simulasi Biologi Molekuler & Seluler 3D (Sentral Dogma & Sitologi)*:
       - `07`: HELIX-3D (Model Kristalografi B-DNA Watson-Crick 3D Interaktif)
       - `08`: CHROMA-3D (Anatomi Kromosom Metafase 3D, Kinetokor & G-Banding)
       - `09`: TRANSCRIPTION (Sintesis RNA Polimerase & Pemrosesan mRNA)
       - `10`: TRANSLATION (Sintesis Protein Ribosom, Kodon-Antikodon & Polipeptida)
       - `11`: GAMETO-3D (Simulasi Meiosis, Crossing Over & Fertilisasi 3D)
       - `12`: BIO-ARCHIVE (Ensiklopedia Aplikasi Bioteknologi Modern & Rekayasa Genetik)
- **Standardisasi Navigasi Universal ("← Beranda"):**
  - Menambahkan tombol navigasi kembali ke beranda utama (`index.html`) pada seluruh modul simulasi yang sebelumnya terisolasi tanpa akses kembali:
    - `simulasi-transkripsi/index.html` & `style.css`
    - `dna-3d-interactive/index.html` & `style.css`
    - `chromosome-3d-interactive/index.html` & `style.css`
    - `gametogenesis.html`
    - `Generator Aplikasi Bioteknologi (terbaru)/Generator Bioteknologi Profesional.html`
    - `Simulasi Genotipe vs Fenotipe.html`
- **Penerapan Modal Tutorial Interaktif (Kepatuhan Aturan Code Policy #5):**
  - Menambahkan tombol **"📖 Panduan Simulasi" / "📖 Panduan Modul"** beserta dialog modal interaktif ramah siswa pada modul-modul utama:
    - **Generator Rasio Dihibrid:** Panduan langkah persilangan 2 sifat beda, penjelasan papan catur 4×4 Punnett, pembacaan 16 kombinasi keturunan, dan interpretasi rasio klasik Mendel 9:3:3:1.
    - **Generator Genotipe Alel (Monohibrid):** Panduan penentuan alel dominan-resesif, fungsi preset cepat Mendel, mekanisme meiosis pembentukan gamet ercis, dan inspeksi molekuler fenotipe.
    - **Generator Risiko Pewarisan Sifat Seks:** Panduan pemahaman gonosom (XX vs XY), sifat terpaut X resesif (Hemofilia / Buta Warna), status karier wanita, dan pola transmisi bersilang (*criss-cross inheritance*).
    - **Simulasi Deteksi Kromosom:** Panduan penggunaan mikroskop sitogenetika, manipulasi jumlah salinan kromosom (Monosomi 2n-1, Disomi 2n, Trisomi 2n+1), dan interpretasi laporan letalitas klinis.
    - **Generator Penyimpangan Semu (Hub):** Panduan ringkas perbedaan mendasar mekanisme genetik Kriptomeri, Atavisme, Epistasis Dominan, dan Epistasis Resesif (Hipostasis).
- **Peningkatan UX & Otomasi Matematis pada Generator Rasio Dihibrid:**
  - **Bar Preset Cepat 1-Klik:** Menambahkan tombol eksperimen cepat untuk persilangan umum:
    - `BbKk × BbKk` (Dihibrid Heterozigot Ganda → Rasio 9:3:3:1)
    - `BBKK × bbkk` (Homozigot Dominan × Homozigot Resesif → 100% Bulat Kuning)
    - `BbKk × bbkk` (Uji Silang / *Test Cross* Dihibrid → Rasio 1:1:1:1)
    - `BbKK × BbKK` (Heterozigot Bunga-Kuning Homozigot → Rasio 3:1)
    - `bbkk × bbkk` (Galur Murni Resesif → 100% Kisut Hijau)
  - **Penyederhanaan Rasio Otomatis (Algoritma GCD / FPB):** Menghitung pembagi persekutuan terbesar secara matematis pada tabel rekapitulasi rasio fenotipe (misal: rasio 12 : 4 otomatis disederhanakan menjadi 3 : 1, atau 4 : 4 : 4 : 4 menjadi 1 : 1 : 1 : 1).


### 📌 Peningkatan Visualisasi Gamet & Keturunan Tanaman Ercis (Pisum sativum) - Generator Genotipe Alel
- **Transformasi Visual Gamet & Fenotipe Menjadi Tanaman Ercis (*Pisum sativum*):**
  - Mengganti representasi visual abstrak (garis batang kromosom kaku) dengan ilustrasi SVG tanaman ercis lengkap dan interaktif (batang merambat alami, sulur perambat *tendrils*, daun majemuk bersirip, polong ercis menggantung, dan bunga mekar khas Mendel) sehingga siswa dapat langsung melihat wujud fenotipe tanpa perlu membayangkan bentuk hasil persilangannya.
  - **Visualisasi Fenotipe Bunga Ungu vs Putih:** Tanaman dominan (`AA` dan `Aa`) mengekspresikan mahkota bunga ungu royal bercahaya (*purple flower*), sedangkan homozigot resesif (`aa`) mengekspresikan mahkota bunga putih bersih (*white flower*), lengkap dengan anatomi mahkota bendera (*standard*), sayap (*wings*), dan lunas (*keel*).
  - **Visualisasi Gamet Biologis Spesifik (Serbuk Sari ♂ & Bakal Biji ♀):** Mengubah header gamet Punnett square menjadi ikon representasi gametofit tumbuhan ercis yang sesungguhnya: Gamet Jantan (♂) berupa butir serbuk sari (*pollen grain*) emas/cyan bereksin gerigi dan Gamet Betina (♀) berupa bakal biji (*ovule*) pink/rose dengan integumen dan kantung embrio.
  - **Pratinjau Langsung Tanaman Induk (*Live Parental Preview*):** Menambahkan kartu pratinjau real-time wujud fisik tanaman tetua (Parental 1 ♂ dan Parental 2 ♀) tepat di bawah kolom input alel, menampilkan zigositas, nama fenotipe, dan proporsi gamet haploid yang dihasilkan.
  - **Dukungan 4 Karakter Klasik Mendel:** Menyediakan tombol pemilih sifat Mendel interaktif: Warna Bunga (Ungu vs Putih), Tinggi Batang (Tinggi vs Kerdil), Bentuk Biji (Bulat vs Keriput), dan Warna Biji (Kuning vs Hijau), dengan penyesuaian visual tanaman secara dinamis.
  - **Preset Cepat Persilangan Klasik Mendel:** Menambahkan tombol 1-klik untuk eksperimen cepat: Monohibrid Heterozigot × Heterozigot (`Aa × Aa` → Rasio 3:1), Galur Murni (`AA × aa` → 100% Dominan), Uji Silang / *Test Cross* (`Aa × aa` → Rasio 1:1), dan Galur Resesif (`aa × aa` → 100% Resesif).
  - **Galeri Hasil Panen F1 & Inspektur Morfologi Interaktif:** Menambahkan kartu galeri panen F1 yang menyandingkan visual tanaman dominan dan resesif beserta jumlah individu dan persentasenya, serta modal popup inspeksi morfologi dan landasan biokimiawi molekuler ekspresi gen (biosintesis antosianin, enzim SBEI, dll).
  - **Infografis Alur Hukum Segregasi Mendel I:** Mengganti placeholder teks diagram dengan infografis langkah biologis Hukum I Mendel: dari sel induk diploid (2n), meiosis & segregasi alel bebas (n), fertilisasi acak serbuk sari ke bakal biji, hingga ekspresi fenotipe tanaman dewasa F1.

### 📌 Penambahan Simulasi 3D Gametogenesis & Fertilisasi (gametogenesis.html)
- **Peluncuran Modul Simulasi 3D Gametogenesis & Pewarisan Alel (AaBb × AaBb):**
  - Mengembangkan visualisasi 3D real-time proses meiosis komprehensif (Meiosis I dan Meiosis II), sinapsis tetrad, crossing over (*pindah silang*) dengan pertukaran segmen kromatid, pembentukan badan kutub (*polar bodies*), spermiogenesis, hingga singami/fertilisasi zigot.
  - Tabel Punnett interaktif yang menyorot kombinasi alel hasil pertemuan sperma dan ovum secara dinamis sesuai pergerakan linimasa.
  - Dilengkapi kontrol interaktif: linimasa animasi dengan slider, pemilih kecepatan, tombol toggle meiosis & crossing over, serta inspeksi 16 tahap biologis meiosis secara rinci.

### 📌 Refaktorisasi Generator Rasio Dihibrid (Generator Rasio Dihibrid.html)
- **Fokus Murni Persilangan Hukum II Mendel (Asortasi Bebas):**
  - Merapikan dan merampingkan modul Generator Rasio Dihibrid dengan memisahkan modul penyimpangan semu ke folder khusus `Generator Penyimpangan Semu/`.
  - Mengoptimalkan penghitungan rasio genotipe dan fenotipe F2 klasik (9:3:3:1) dengan kartu visualisasi biji (Bulat Kuning, Bulat Hijau, Kisut Kuning, Kisut Hijau) dan laporan analisis sekuensial yang lebih cepat dan terstruktur.
### 📌 Pemisahan & Peningkatan Modul Penyimpangan Semu Hukum Mendel Menjadi 4 Berkas Independen
- **Arsitektur 4 Modul Mandiri (Standalone):**
  - Memisahkan simulasi penyimpangan semu hukum Mendel menjadi 4 berkas kode independen dan mandiri di dalam folder `Generator Penyimpangan Semu/`, lengkap dengan visualisasi organisme spesifik dan panel edukasi interaktif:
    1. **`Simulasi Kriptomeri.html` (Rasio F2 9:3:4):**
       - **Organisme:** Bunga *Linaria maroccana*.
       - **Visualisasi:** Bunga 5 kelopak realistis SVG dengan variasi warna Ungu (`A_B_`), Merah (`A_bb`), dan Putih (`aa__`).
       - **Fitur:** Landasan biokimia pigmen antosianin dan pH sel, tabel Punnett 4×4 dengan SVG bunga di setiap sel, pratinjau tetua langsung, distribusi genotipe, dan laporan analisis ilmiah.
    2. **`Simulasi Atavisme.html` (Rasio F2 9:3:3:1):**
       - **Organisme:** Bentuk Pial/Jengger Ayam (*Gallus gallus domesticus*).
       - **Visualisasi:** Profil kepala ayam dengan 4 variasi jengger SVG khas: Walnut/Sumpel (`R_P_`), Rose/Mawar (`R_pp`), Pea/Biji/Kapri (`rrP_`), dan Single/Bilah (`rrpp`).
       - **Fitur:** Penjelasan konsep interaksi antar gen (Bateson & Punnett 1906), preset cepat persilangan, visualisasi 16 kombinasi F2, dan statistik fenotipe dengan indikator warna.
    3. **`Simulasi Epistasis.html` (Epistasis Dominan - Rasio F2 12:3:1):**
       - **Organisme:** Buah Labu Musim Panas (*Cucurbita pepo*).
       - **Visualisasi:** Buah labu SVG beralur dengan warna Putih (`W___`), Kuning (`wwY_`), dan Hijau (`wwyy`).
       - **Fitur:** Konsep gen penghambat biosintesis klorofil/karotenoid, hierarki gen epistatis (W) terhadap hipostatis (Y), dan tabel Punnett interaktif.
    4. **`Simulasi Hipostasis.html` (Epistasis Resesif - Rasio F2 9:3:4):**
       - **Organisme:** Warna Bulu Anjing *Labrador Retriever*.
       - **Visualisasi:** Kepala anjing Labrador SVG dengan warna bulu Hitam (`B_E_`), Cokelat/Chocolate (`bbE_`), dan Kuning (`__ee`).
       - **Fitur:** Penjelasan mekanisme deposisi pigmen eumelanin oleh lokus Extension (E), diagram jalur pigmen, dan analisis rasio F2.
- **Transformasi Halaman Induk `Generator Penyimpangan Semu.html` Menjadi Pusat Navigasi (Hub/Dashboard):**
  - Mengubah berkas utama menjadi landing page terpadu dengan kartu visual interaktif untuk masing-masing dari ke-4 simulasi, dilengkapi ringkasan konsep, organisme model, dan rasio fenotipenya.

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
