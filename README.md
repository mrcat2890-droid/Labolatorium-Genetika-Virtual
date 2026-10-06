# Laboratorium Genetika Virtual (GEN-OS)

<div align="center">

![GEN-OS Biological Interface](https://img.shields.io/badge/GEN--OS-v8.2_Biological_Interface-00f3ff?style=for-the-badge&logo=dna&logoColor=black)
![Active Modules](https://img.shields.io/badge/Active_Modules-15_Simulations-00ff41?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_•_Tailwind_•_Canvas_60FPS-a855f7?style=for-the-badge)
![Research Project](https://img.shields.io/badge/Skripsi_S1-Tadris_Biologi_UIN_Palangka_Raya-f59e0b?style=for-the-badge)

<p align="center">
  <strong>Media Pembelajaran Virtual & Simulasi Interaktif Berbasis Sains Terintegrasi E-Module Flipbook</strong><br>
  <em>Dirancang untuk Meningkatkan Keterampilan Berpikir Kritis Siswa Kelas XII SMA pada Pembelajaran Genetika & Bioteknologi</em>
</p>

</div>

---

## 📌 Identitas Penelitian & Konteks Akademik

| Komponen | Keterangan |
| :--- | :--- |
| **Judul Penelitian** | *Pengembangan E-Module Berbentuk Flipbook Materi Genetika untuk Meningkatkan Kemampuan Berpikir Kritis Siswa Kelas XII SMAN 2 Laung Tuhup* |
| **Peneliti / Pengembang** | **Muhammad Ikhwannor** (NIM: 2211140014) |
| **Program Studi** | Tadris Biologi |
| **Fakultas / Universitas** | Fakultas Tarbiyah dan Ilmu Keguruan, UIN Palangka Raya |
| **Subjek Penelitian** | Siswa Kelas XII SMAN 2 Laung Tuhup |
| **Tahun Pelaksanaan** | 2026 |

---

## 🔬 Pendahuluan & Latar Belakang

Konsep-konsep dalam materi **Genetika dan Bioteknologi** di tingkat SMA (seperti segregasi Mendel, transkripsi-translasi, mutasi titik hemoglobin, aberasi kromosom, serta rekayasa genetika) memiliki derajat keabstrakan yang tinggi dan fenomena molekuler yang tidak dapat diamati secara kasat mata di laboratorium sekolah konvensional.

**GEN-OS (Genetics Operating System - Virtual Biological Interface)** dikembangkan sebagai lingkungan laboratorium virtual komprehensif yang diintegrasikan (*embedded*) ke dalam **E-Module Berbentuk Flipbook**. Melalui pendekatan simulasi berbasis inkuiri, siswa tidak hanya menghafal konsep tetapi secara aktif:
1. **Menginterpretasi (*Interpretation*):** Mengamati fenotipe, struktur heliks DNA, kromatid, dan morfologi sel darah.
2. **Menganalisis (*Analysis*):** Menguraikan hubungan sebab-akibat antara perubahan sekuens nukleotida, ekspresi kodon, dan deformasi polipeptida.
3. **Mengevaluasi (*Evaluation*):** Membandingkan data persilangan aktual dengan rasio teoritis Mendel serta menguji hipotesis uji aglutinasi darah.
4. **Menyimpulkan (*Inference*):** Merumuskan pola pewarisan sifat autosom, gonosom, serta risiko letalitas kariotipe.
5. **Menjelaskan (*Explanation*):** Menyajikan argumen ilmiah logis berbasis data eksperimen dan sitasi literatur terakreditasi.

---

## 🧬 Direktori Lengkap 15 Modul Laboratorium Virtual

Dashboard utama `index.html` memuat **15 modul aktif** yang siap digunakan secara mandiri maupun disematkan ke dalam media flipbook:

```
GEN-OS v8.2 DIRECTORY
├── [01] GEN-LAB          : Generator Genotipe Alel (Simulasi Monohibrid)
├── [02] BIO-SEQUENCER    : Generator Rasio Dihibrid (Dihybrid Cross Engine 0ms)
├── [03] EPI-GENETICS     : Generator Penyimpangan Semu Hukum Mendel (5 Sub-Simulasi)
├── [04] GEN-X            : Sex-Linked Analyzer (Pewarisan Sifat Terpaut Seks)
├── [05] GEN-K            : Karyotype Scanner (Deteksi Aneuploidi Kromosom ISCN)
├── [06] GENO-PHENO       : Trait Explorer (Simulasi Genotipe vs Fenotipe)
├── [07] HELIX-3D         : DNA Structure Mapper (Model 3D Heliks Ganda B-DNA)
├── [08] CHROMA-3D        : Chromosome Modeler (Model 3D Struktur Kromosom & Telomer)
├── [09] TRANSCRIPTION    : RNA Synthesis Lab (Transkripsi & Dynamic Camera Tracking)
├── [10] TRANSLATION      : Protein Assembly (Translasi Ribosom & Kode Genetik 64 Kodon)
├── [11] GAMETO-3D        : Meiosis Engine (Gametogenesis & Fertilisasi Seluler)
├── [12] BIO-ARCHIVE      : Classified Database (Ensiklopedia 16 Modul Bioteknologi)
├── [13] HEMATO-LAB       : Blood Type Analyzer (Uji Aglutinasi ABO/Rh & Mode Kuis)
├── [14] SICKLE-MUT       : Point Mutation Analyzer (Mutasi HBB & Vaso-Oklusi 60 FPS)
└── [15] TRISOMY-21       : Autosomal Mutation Analyzer (Sindrom Down & Nondisjunction)
```

---

### Detail Fitur Setiap Modul

#### 1. 🌸 GEN-LAB — Generator Genotipe Alel (Monohibrid)
* **Berkas:** `Generator Genotipe Alel (terbaru)/Generator Genotipe Alel.html`
* **Materi:** Hukum I Mendel (Hukum Pemisahan Bebas / Segregasi).
* **Fitur Utama:**
  - Konfigurasi parental fleksibel (misal: $Aa \times Aa$, $AA \times aa$, $Aa \times aa$).
  - Papan catur Punnett adaptif responsif seluler dengan indikator kromosom homolog.
  - Perhitungan instan persentase genotipe ($1:2:1$) dan fenotipe dominan-resesif ($3:1$).
  - Panel evaluasi logika persilangan dan interpretasi hukum segregasi.

#### 2. 🌿 BIO-SEQUENCER — Generator Rasio Dihibrid (Dihybrid Cross Engine)
* **Berkas:** `Generator Rasio Dihibrid (terbaru)/Generator Rasio Dihibrid.html`
* **Materi:** Hukum II Mendel (Hukum Berpasangan Secara Bebas / Asortasi Bebas).
* **Fitur Utama & Optimalisasi:**
  - **Rendering Instan (0 ms Latency):** *Single-pass batch DOM generation* yang menghapus penundaan buatan sehingga kalkulasi Punnett 16 kotak berlangsung seketika.
  - Visualisasi SVG bentuk biji ercis (*Pisum sativum*): Bulat Kuning, Bulat Hijau, Kisut Kuning, Kisut Hijau.
  - Grafik distribusi statistik fenotipe klasik $9:3:3:1$ maupun pola *Test Cross* $1:1:1:1$.
  - Animasi pembentukan 4 tipe gamet parental secara independen.

#### 3. 🌺 EPI-GENETICS — Generator Penyimpangan Semu Hukum Mendel
* **Berkas Induk:** `Generator Penyimpangan Semu/Generator Penyimpangan Semu.html`
* **Materi:** Interaksi antargen yang memodifikasi rasio dihibirid klasik $9:3:3:1$.
* **Sub-Modul Interaktif:**
  - **Simulasi Atavisme** (`Generator Penyimpangan Semu/Simulasi Atavisme.html`): Interaksi gen $R$ dan $P$ pada bentuk jengger ayam (Walnut $9$, Rose $3$, Pea $3$, Single $1$).
  - **Simulasi Epistasis Dominan** (`Generator Penyimpangan Semu/Simulasi Epistasis.html`): Gen epistasis $W$ menghalangi ekspresi warna labu ($12$ Putih : $3$ Kuning : $1$ Hijau).
  - **Simulasi Hipostasis / Epistasis Resesif** (`Generator Penyimpangan Semu/Simulasi Hipostasis.html`): Pigmentasi warna rambut anjing Labrador Retriever ($9$ Hitam : $3$ Cokelat : $4$ Kuning).
  - **Simulasi Kriptomeri** (`Generator Penyimpangan Semu/Simulasi Kriptomeri.html`): Antosianin bunga *Linaria maroccana* dan derajat keasaman plasma sel ($9$ Ungu : $3$ Merah : $4$ Putih).
  - **Simulasi Polimeri & Gen Komplementer:** Rasio $15:1$ pada biji gandum dan $9:7$ pada bunga *Lathyrus odoratus*.
* **Fitur Khusus:** Preservasi huruf kecil (*lowercase*) pada alel resesif parental untuk memastikan kepatuhan kaidah notasi genetika resmi.

#### 4. 🩸 GEN-X — Generator Risiko Pewarisan Sifat Seks (Sex-Linked Analyzer)
* **Berkas:** `Generator Risiko Pewarisan Sifat Seks (terbaru)/Generator Risiko Pewarisan Sifat Seks.html`
* **Materi:** Gonosom dan penyakit menurun terpaut kromosom X (Hemofilia & Buta Warna).
* **Fitur Utama:**
  - Matriks parental: Ibu (Normal $X^H X^H$, Carrier $X^H X^h$, Sakit $X^h X^h$) & Ayah (Normal $X^H Y$, Sakit $X^h Y$).
  - *Risk Assessment Meter:* Visualisasi telemetri cincin probabilitas anak lahir normal, carrier, dan terkena penyakit.
  - Rekam medis klinis: Menjelaskan fenomena *Criss-Cross Inheritance* (pewarisan silang) dan proses inaktivasi kromosom X (Lyonisasi).
  - Palet warna kontras tinggi *Electric Neon Crimson & Laser Cyan* anti-washout.

#### 5. 🔬 GEN-K — Simulasi Deteksi Kromosom (Karyotype Scanner)
* **Berkas:** `Simulasi Deteksi Kromosom/Simulasi-Deteksi-Kromosom.html`
* **Materi:** Mutasi jumlah kromosom (Aneuploidi: Monosomi, Disomi, Trisomi).
* **Fitur Utama:**
  - Pemilihan lokus kromosom sasaran: Autosom (Kromosom 1, 3, 13, 18, 21) dan Gonosom (Kromosom X).
  - Simulasi pemindaian mikroskopis Giemsa G-Banding fase metafase.
  - Diagnosis sindrom sitogenetika manusia:
    - **Sindrom Down:** Trisomi 21 ($47, XX,+21$ / $47, XY,+21$).
    - **Sindrom Turner:** Monosomi X ($45, X0$).
    - **Sindrom Patau:** Trisomi 13 ($47, XX,+13$ / $47, XY,+13$).
    - **Sindrom Edwards:** Trisomi 18 ($47, XX,+18$ / $47, XY,+18$).
  - Integrasi rumus sitogenetika internasional **ISCN 2020** dan *Lethality Gauge Index*.

#### 6. 🧩 GENO-PHENO — Trait Explorer (Simulasi Genotipe vs Fenotipe)
* **Berkas:** `Simulasi Genotipe vs Fenotipe.html`
* **Materi:** Hubungan antara kode informasi genetik dan manifestasi fisik organisme.
* **Fitur Utama:**
  - Eksplorasi interaktif pengaruh alel homozigot dominan, heterozigot, dan homozigot resesif.
  - Komparasi langsung ekspresi fenotipik (morfologi, pigmen, dan fisiologi).
  - Rangkuman glosarium terminologi genetika penting (lokus, alel, dominansi penuh, kodominansi).

#### 7. 🧬 HELIX-3D — DNA Structure Mapper
* **Berkas:** `dna-3d-interactive/index.html`
* **Materi:** Struktur materi genetik (Model Heliks Ganda Watson & Crick 1953).
* **Fitur Utama:**
  - Visualisasi 3D interaktif heliks ganda DNA (B-DNA).
  - Identifikasi pasangan basa nitrogen purin-pirimidin:
    - Adenin (A) berpasangan dengan Timin (T) via 2 ikatan hidrogen.
    - Guanin (G) berpasangan dengan Sitosin (C) via 3 ikatan hidrogen.
  - Penandaan rantai tulang punggung gula deoksiribosa dan gugus fosfat yang bersifat antiparalel ($5' \rightarrow 3'$ dan $3' \rightarrow 5'$).

#### 8. 🧪 CHROMA-3D — Chromosome Modeler
* **Berkas:** `chromosome-3d-interactive/index.html`
* **Materi:** Struktur anatomi kromosom eukariotik dan pengemasan DNA.
* **Fitur Utama:**
  - Inspeksi 3D bagian-bagian kromosom: Kromatid saudara (*sister chromatids*), sentromer, kinetokor, matriks kromonema, serta lengan pendek ($p$) dan panjang ($q$).
  - Eksplorasi peran telomer dalam menjaga stabilitas genom dan penuaan seluler.

#### 9. 📝 TRANSCRIPTION — RNA Synthesis Lab (Simulasi Transkripsi)
* **Berkas:** `simulasi-transkripsi/index.html` (didukung `style.css` & `script.js`)
* **Materi:** Sintesis protein tahap transkripsi (DNA menjadi mRNA).
* **Fitur Unggulan:**
  - **Dynamic Camera Tracking (60 FPS):** Kamera virtual otomatis melacak (*lerp auto-track*) pergerakan enzim RNA Polimerase II dari ujung 5' (TATA box / Promotor), melintasi gelembung transkripsi (*transcription bubble*), hingga sinyal terminasi 3'.
  - **Mini-Map Sekuens Gen & Touch Dragging:** Memudahkan pengguna ponsel menggeser dan menginspeksi untai DNA secara bebas tanpa kehilangan fokus enzim.
  - Visualisasi ribonukleotida trifosfat bebas (rATP, rUTP, rGTP, rCTP) dan aturan pasangan basa komplementer DNA template $\rightarrow$ mRNA.

#### 10. 🧬 TRANSLATION — Protein Assembly (Simulasi Translasi)
* **Berkas:** `simulasi-translasi/index.html` (didukung `style.css` & `script.js`)
* **Materi:** Sintesis polipeptida di ribosom berdasarkan informasi kodon mRNA.
* **Fitur Utama:**
  - Visualisasi perakitan subunit ribosom (kecil 40S dan besar 60S), situs A (*Aminoacyl*), situs P (*Peptidyl*), dan situs E (*Exit*).
  - Pembacaan kodon inisiasi `AUG` (Metionin) oleh tRNA pembawa antikodon `UAC`.
  - Simulasi elongasi pembentukan ikatan peptida antar asam amino.
  - Pengenalan kodon terminasi / stop codon (`UAA`, `UAG`, `UGA`) dengan *release factor*.
  - Tabel interaktif 64 kode genetik standar.

#### 11. 🥚 GAMETO-3D — Meiosis Engine (Gametogenesis & Fertilisasi)
* **Berkas:** `gametogenesis.html`
* **Materi:** Pembelahan reduksi sel kelamin (Meiosis) dan pembuahan.
* **Fitur Utama:**
  - Komparasi mendalam **Spermatogenesis** (pembentukan 4 spermatozoa fungsional haploid $n$) vs **Oogenesis** (pembentukan 1 ovum fungsional $n$ dan 3 badan polar/polosit).
  - Visualisasi tahapan Meiosis I (reduksi jumlah kromosom $2n \rightarrow n$) dan Meiosis II (pemisahan kromatid saudara).
  - Simulasi fertilisasi: Penetrasi sperma pada zona pelusida dan pembentukan zigot diploid ($2n$).

#### 12. 📂 BIO-ARCHIVE — Classified Biotechnology Database
* **Berkas:** `Generator Aplikasi Bioteknologi (terbaru)/Generator Bioteknologi Profesional.html`
* **Materi:** Bioteknologi Konvensional dan Modern.
* **Fitur Unggulan:**
  - **Database Ensiklopedia 16 Modul Komprehensif Berbasis Literatur Ilmiah:**
    1. *CRISPR-Cas9 Genome Editing* (gRNA, Cas9, NHEJ vs HDR, Nobel Kimia 2020).
    2. *Terapi Gen* (Vektor AAV/Lentivirus, Luxturna, Zolgensma).
    3. *Sekuensing DNA Generasi Baru / NGS* (Illumina SBS, era pasca Human Genome Project).
    4. *Kloning Organisme & SCNT* (Transfer inti sel somatik, domba Dolly).
    5. *Antibodi Monoklonal & Sel Hibridoma* (Fusi sel B dan mieloma, seleksi medium HAT).
    6. *Tanaman Transgenik & Rekayasa Pertanian* (Plasmid Ti *Agrobacterium*, kapas/jagung Bt, Golden Rice).
    7. *Vaksin Asam Nukleat mRNA & LNP* (Modifikasi pseudouridin Karikó-Weissman, pengemasan nanopartikel lipid).
    8. *Bioremediasi Lingkungan & Mikroba Superbug* (Pseudomonas putida plasmid pemecah hidrokarbon karya Chakrabarty).
    9. *Fermentasi Presisi & Biologi Sintetis* (Sintesis artemisinin dan protein nabati via yeast).
    10. *Sel Punca (Stem Cells) & iPSC* (Pemrograman ulang fibroblas via 4 Faktor Yamanaka).
    11. *Epigenetika & Modifikasi Ekspresi Gen* (Metilasi DNA CpG, modifikasi ekor histon HAT/HDAC).
    12. *Bioetika & Regulasi Bioteknologi Global* (Prinsip Beauchamp-Childress, pedoman WHO genome editing).
    13. *Insulin Rekombinan Manusia* (Humulin via plasmid rekombinan E. coli).
    14. *Bioteknologi Fermentasi Pangan Konvensional* (Tempe, yogurt, tapai, keju).
    15. *Kultur Jaringan Tumbuhan* (Totipotensi sel tumbuhan, mikropropagasi eksplan).
    16. *DNA Profiling & Forensik STR* (PCR amplifikasi Short Tandem Repeats).
  - **Tri-Metrics Impact Analysis:** Penilaian skor ilmiah rasio *Economic Value*, *Sustainability*, dan *Bioethical Complexity*.
  - **Mobile Touch Citation Modal:** Rujukan jurnal ilmiah internasional yang ramah sentuh di layar ponsel tanpa risiko tooltip terpotong.
  - Fitur pencarian instan (*live search*), filter kategori (*Kesehatan, Pertanian, Lingkungan, Forensik, Bioetika*), dan laci navigasi seluler (*off-canvas drawer*).

#### 13. 🩸 HEMATO-LAB — Blood Type Analyzer (Penggolongan Darah ABO & Rh)
* **Berkas:** `Simulasi Penggolongan Darah/Simulasi-Penggolongan-Darah.html`
* **Materi:** Sistem golongan darah ABO (antigen A, B, aglutinin $\alpha, \beta$) dan Rhesus (faktor D).
* **Fitur Utama:**
  - Simulasi uji aglutinasi laboratorium serologi: Penetesan reagen Anti-A, Anti-B, dan Anti-D pada sumur sampel darah.
  - Visualisasi aglutinasi mikroskopis (penggumpalan eritrosit oleh antibodi).
  - **Mode Kuis Interaktif Anti-Spoiler:** Panel penjelasan dan hasil sengaja ditahan hingga siswa menentukan pilihan diagnosa golongan darah, merangsang pemikiran kritis siswa dalam membaca fenomena aglutinasi secara mandiri.
  - Matriks kalkulator transfusi darah: Donor universal ($O^-$) dan resipien universal ($AB^+$) serta kompatibilitas antar-golongan darah.

#### 14. 🧬 SICKLE-MUT — Point Mutation Analyzer (Mutasi Anemia Sel Sabit)
* **Berkas:** `Simulasi Mutasi Genetik/Simulasi-Anemia-Sel-Sabit.html`
* **Materi:** Mutasi genetik molekuler pada penyakit Anemia Sel Sabit (*Sickle Cell Disease*).
* **Arsitektur 7 Tahap Komprehensif Berbasis Literatur Ilmiah (NCBI/NIH, Pauling et al., Ingram):**
  1. **Overview:** Identitas genetik lokus gen $HBB$ (Kromosom 11p15.4), substitusi basa $A \rightarrow T$, pola autosomal resesif.
  2. **DNA Mutation:** Komparasi untai coding & template normal ($HbA$) vs mutan ($HbS$) pada kodon ke-6 ($GAG \rightarrow GTG$).
  3. **Transkripsi:** Perubahan kodon mRNA dari $GAG$ (asam glutamat) menjadi $GUG$ (valin).
  4. **Translasi:** Perubahan residu asam amino hidrofilik bermuatan negatif (Glutamat) menjadi asam amino hidrofobik nonpolar (Valin).
  5. **Hemoglobin:** Struktur kuartener $\alpha_2 \beta_2$, gugus heme $Fe^{2+}$, terbentuknya *sticky patch* hidrofobik pada kondisi deoksigenasi, serta animasi polimerisasi serat kristal kaku $HbS$.
  6. **Mesin Simulasi Aliran Darah Canvas 60 FPS (Hemodinamika Vaso-Oklusi):**
     - **Aliran Darah Normal ($HbA$):** Eritrosit bikonkaf fleksibel mengalir lancar di kapiler mengikuti profil kecepatan Poiseuille.
     - **Aliran Darah Sabit ($HbS$):** Deformasi sabit kaku menyumbat daerah bifurkasi/penyempitan mikrovaskular kapiler, memicu fenomena penumpukan trombus (*vaso-occlusive crisis*) secara dinamis.
     - Kontrol interaktif: Jeda/Lanjutkan dan Reset aliran.
  7. **Pewarisan & Seleksi Alam:** Diagram Punnett kombinasi parental ($HbAA, HbAS, HbSS$) dan penjelasan keunggulan heterozigot (*Heterozygote Advantage*) terhadap resistensi parasit malaria (*Plasmodium falciparum*).


#### 15. 🔬 TRISOMY-21 — Autosomal Mutation Analyzer (Mutasi Autosom Sindrom Down)
* **Berkas:** Simulasi Mutasi Genetik/Simulasi-Sindrom-Down.html
* **Materi:** Mutasi kromosom autosom (Aneuploidi: Trisomi 21 / Sindrom Down) dan sitogenetika manusia.
* **Arsitektur 7 Tahap Komprehensif Berbasis Literatur Ilmiah (Lejeune 1959, ISCN 2020, Nature Reviews, Antonarakis et al.):**
  1. **Overview & Skala Genom:** Identitas sitogenetika kromosom 21 (autosom akrosentrik terkecil, ~47 Mb, ~234 gen pengkode protein), konsep dosis gen (*gene dosage hypothesis* 150%), dan komparasi skala ukuran genom autosom 1 vs 13 vs 21 untuk menjelaskan kelangsungan hidup penderita (viabilitas).
  2. **Tipe Trisomi:** 3 varian sitogenetik utama:
     - *Trisomi 21 Penuh* (~95% kasus, nondisjunction meiotik, murni sporadis).
     - *Translokasi Robertsonian* (~3-4% kasus, fusi lengan panjang kr. 14 dan 21, satu-satunya varian yang dapat diwariskan dari orang tua karier seimbang).
     - *Sindrom Down Mosaik* (~1-2% kasus, nondisjunction mitosis pasca-fertilisasi embrio, campuran galur sel 46 dan 47 kromosom).
  3. **Simulator Interaktif Meiosis & Nondisjunction (5 Tahapan Beranimasi):**
     - Skenario Meiosis Normal vs Nondisjunction Meiosis I vs Nondisjunction Meiosis II.
     - Kontrol tahapan berurutan (*Metafase I → Anafase I → Anafase II → 4 Gamet → Fertilisasi*) dengan fitur pemutaran otomatis (*Auto Play*).
     - Perhitungan telemetri pembentukan gamet (, n+1, n-1$) dan pembentukan zigot diploid abnormal (+1 = 47$).
  4. **Pemindai Kariotipe ISCN 2020 & Inspektor Gen DSCR:**
     - Tampilan kariotipe lengkap 22 pasang autosom + gonosom perempuan (,XX,+21$) dan laki-laki (,XY,+21$).
     - Inspeksi interaktif lokus gen kritis *Down Syndrome Critical Region (DSCR)* pada lengan 21q22: *DYRK1A* (neurogenesis & defisit kognitif), *APP* (beta-amiloid & Alzheimer dini), *SOD1* (stres oksidatif), *RCAN1/DSCR1* (kalsineurin & jantung), dan *ETS2* (skelet & brakisefali).
  5. **Fenotipe & Patogenesis Klinis:**
     - Analisis 9 ciri fenotipik utama: fisura palpebra miring, lipatan epikantus, jembatan hidung datar, lipatan palmar tunggal (*simian crease*), clinodactyly, hipotonia, defek septum atrioventrikular (AVSD), perawakan pendek, dan disabilitas intelektual.
     - Kondisi medis penyerta: disfungsi tiroid, atresia duodenum, dan peningkatan harapan hidup (>60 tahun di era modern).
  6. **Risiko Usia Ibu & Visualisator Dot-Matrix 1.000 Kelahiran:**
     - Kurva risiko epidemiologis berbasis data maternal (usia 20 hingga 45 tahun).
     - Penggeser usia interaktif yang memperbarui probabilitas dan matriks visual 1.000 kelahiran bayi secara real-time.
     - Penjelasan molekuler degradasi cincin kohesin (*cohesin decay*: REC8 & SMC1B) pada oosit yang terhenti di profase I (dictyate) selama beberapa dekade.
  7. **Ringkasan, Kaskade Kronologis & Komparasi Mutasi:**
     - Animasi kaskade sekuensial kronologis patogenesis.
     - Matriks perbandingan menyeluruh antara mutasi gen molekuler (*SCA*) vs mutasi kromosom (*Down Syndrome*).
     - Daftar referensi jurnal internasional.

---

## ⚡ Pembaruan & Fitur Unggulan Sistem (Upgrade Highlights)

### 1. Desain Futuristik GEN-OS & Estetika Frosted Glassmorphism
* Mengadopsi bahasa desain antarmuka workstation bio-informatika masa depan (*Deep Darkfield Obsidian, Luminous Accents, Glassmorphism blur 24px saturate 180%–190%*).
* Palet warna cerah, tajam, dan berkontras tinggi (*anti-washout text*) untuk kenyamanan membaca dalam waktu lama.

### 2. Standar Kinerja Tinggi & Responsivitas Seluler Penuh (Mobile-First)
* **Mobile GPU & CPU Efficiency:** Menonaktifkan filter berat secara selektif pada perangkat seluler (`@media (max-width: 768px)`) untuk menjamin kestabilan **60 FPS** tanpa lag atau panas baterai berlebih pada ponsel siswa.
* **Touch-Friendly Controls:** Target sentuh tombol yang ergonomis, kontainer matriks Punnett berpelindung *touch-scroll* dengan gestur petunjuk geser, serta laci menu geser (*off-canvas drawers*).
* **Instantaneous Computing (0 ms):** Menghilangkan *artificial latency* dan mengadopsi teknik *single-pass batch DOM manipulation* untuk rendering data instan.

### 3. Tutorial Interaktif Bertahap di Setiap Modul
* Sesuai prinsip didaktis media pembelajaran, seluruh modul dilengkapi modal **Panduan Eksplorasi & Dasar Teori Ilmiah** yang dapat diakses kapan saja melalui tombol panduan (`? TUTORIAL` / `💡 PANDUAN`), memandu siswa sebelum melakukan simulasi mandiri.

### 4. Akurasi Ilmiah & Kepatuhan Kaidah Genetika
* Seluruh model biologis diverifikasi silang dengan literatur ilmiah terakreditasi internasional (NCBI, Nature Reviews, Science, NEJM, Cell, standar ISCN 2020).
* Notasi alel genetika mematuhi pembedaan huruf besar (dominan) dan huruf kecil (resesif) secara presisi.

---

## 💻 Cara Menggunakan / Menjalankan

### Integrasi Melalui E-Module Flipbook
Simulasi ini dapat langsung disematkan (*embedded*) ke dalam halaman flipbook menggunakan elemen `<iframe>`:

```html
<iframe 
    src="path-ke-modul/Simulasi-Anemia-Sel-Sabit.html" 
    width="100%" 
    height="750px" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" 
    allowfullscreen>
</iframe>
```

### Menjalankan Secara Lokal (Standalone)
1. **Clone atau Unduh Repositori:**
   ```bash
   git clone https://github.com/mrcat2890-droid/Labolatorium-Genetika-Virtual.git
   ```
2. **Buka Direktori Proyek:** Masuk ke folder proyek hasil unduhan.
3. **Buka Dashboard Utama:** Klik dua kali berkas `index.html` menggunakan peramban web modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
4. **Pilih Modul:** Klik tombol `INITIALIZE` pada kartu simulasi yang diinginkan dari direktori 14 modul.

---

## 🛠️ Arsitektur Teknologi

* **Frontend Engine:** HTML5 Semantik, JavaScript Modern (ES6+ Vanilla, Zero External Framework Overhead).
* **Styling Framework:** Tailwind CSS (JIT Utility) dipadukan dengan Custom Vanilla CSS Design System.
* **Mesin Rendering Grafis:** HTML5 Canvas API (GPU-Accelerated 2D Physics & Hemodynamics), SVG Dinamis Resolusi Tinggi.
* **Encoding & Standarisasi:** UTF-8 murni bebas mojibake, Mobile Viewport Dynamic Safe Bounds (`100dvh`).

---

## 📊 Pemetaan Indikator Berpikir Kritis (Facione, 2015)

| Indikator Berpikir Kritis | Implementasi Fitur di Dalam GEN-OS |
| :--- | :--- |
| **Interpretasi (*Interpretation*)** | Mengidentifikasi bentuk gamet, membaca pita sekuens DNA, dan mengenali reaksi aglutinasi darah. |
| **Analisis (*Analysis*)** | Menelusuri dampak mutasi kodon DNA terhadap konformasi rantai polipeptida dan vaso-oklusi aliran darah. |
| **Evaluasi (*Evaluation*)** | Menguji kebenaran rasio fenotipe aktual penyimpangan semu terhadap hukum Mendel klasik. |
| **Inferensi (*Inference*)** | Menyimpulkan formula sitogenetika kariotipe manusia dan mendiagnosis kelainan aneuploidi. |
| **Eksplanasi (*Explanation*)** | Menjelaskan mekanisme molekuler bioteknologi (CRISPR, mRNA, terapi gen) dengan bukti literatur valid. |

---

## 📜 Lisensi & Hak Cipta

Hak Cipta © 2026 **Muhammad Ikhwannor**. Seluruh hak cipta dilindungi undang-undang.  
Media simulasi ini dikembangkan dalam rangka penyusunan Skripsi Sarjana (S1) Program Studi Tadris Biologi, UIN Palangka Raya. Penggunaan non-komersial untuk keperluan edukasi dan penelitian diizinkan dengan menyertakan atribusi sumber ilmiah yang sah.

