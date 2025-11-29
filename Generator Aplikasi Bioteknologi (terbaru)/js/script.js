"use strict";

/**
 * BIO-ARCHIVE: Knowledge Base Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                arch: {
                    bg: '#030712',
                    panel: '#111827',
                    accent: '#3b82f6',
                    text: '#e2e8f0',
                    dim: '#94a3b8'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Oswald', 'sans-serif']
            },
            animation: {
                'scan-vertical': 'scanVertical 3s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                scanVertical: {
                    '0%': { top: '0%', opacity: 0 },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 1 },
                    '100%': { top: '100%', opacity: 0 }
                },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                }
            }
        }
    }
};

// --- DATABASE PENGETAHUAN LENGKAP ---
// Data ini disusun untuk kebutuhan edukasi tingkat lanjut (SMA/Kuliah Awal)
const database = [
    {
        id: '01',
        cat: 'BIOTEKNOLOGI MODERN (KESEHATAN)',
        title: 'Insulin Rekombinan',
        subtitle: 'Produksi hormon insulin manusia menggunakan bakteri E. coli.',
        icon: '💉',
        content: `
            <h3>1. Definisi & Latar Belakang</h3>
            <p>Insulin rekombinan adalah bentuk sintetis dari hormon insulin manusia yang diproduksi menggunakan teknologi DNA rekombinan. Sebelum teknologi ini ditemukan pada tahun 1978, penderita diabetes bergantung pada insulin yang diekstraksi dari pankreas sapi (bovine) atau babi (porcine). Meskipun efektif, insulin hewan sering menyebabkan reaksi alergi karena perbedaan struktur asam amino <a href="#" class="innote" data-ref="Campbell, N. A., et al. (2020). Biology: A Global Approach. 12th Ed. Pearson. Hal 435.">(Campbell et al., 2020)</a>.</p>

            <h3>2. Mekanisme Pembuatan (Prinsip Ilmiah)</h3>
            <p>Proses produksi melibatkan penyisipan gen insulin manusia ke dalam plasmid bakteri <em>Escherichia coli</em>. Tahapannya meliputi:</p>
            <ul>
                <li><strong>Isolasi Gen:</strong> Gen pengkode insulin manusia diisolasi atau disintesis secara kimiawi.</li>
                <li><strong>Pemotongan Plasmid:</strong> Plasmid bakteri dipotong menggunakan <em>Enzim Restriksi</em> (gunting molekuler) untuk membuka lingkaran DNA <a href="#" class="innote" data-ref="Smith, J. E. (2009). Biotechnology. Cambridge University Press. Hal 88.">(Smith, 2009)</a>.</li>
                <li><strong>Penyisipan (Ligasi):</strong> Gen insulin disambungkan ke plasmid menggunakan enzim <em>DNA Ligase</em>.</li>
                <li><strong>Transformasi:</strong> Plasmid rekombinan dimasukkan kembali ke dalam sel bakteri.</li>
                <li><strong>Fermentasi:</strong> Bakteri dikembangbiakkan dalam bioreaktor besar, memproduksi protein insulin seiring pembelahan sel.</li>
            </ul>

            <h3>3. Dampak & Keunggulan</h3>
            <p>Produk ini, yang dikenal dengan nama dagang seperti Humulin, memiliki struktur kimia yang 100% identik dengan insulin manusia, sehingga meminimalkan risiko penolakan imun. Selain itu, metode ini memungkinkan produksi massal yang lebih murah dan etis dibandingkan ekstraksi organ hewan.</p>
        `,
        stats: { eco: 95, sus: 90, eth: 20 },
        tags: ['DNA Rekombinan', 'Plasmid', 'E. coli', 'Diabetes', 'Enzim Restriksi']
    },
    {
        id: '02',
        cat: 'BIOTEKNOLOGI PANGAN (PERTANIAN)',
        title: 'Golden Rice',
        subtitle: 'Padi transgenik penghasil Beta-Karoten (Provitamin A).',
        icon: '🌾',
        content: `
            <h3>1. Definisi & Tujuan</h3>
            <p>Golden Rice adalah varietas padi transgenik (Genetically Modified Organism/GMO) yang direkayasa untuk menghasilkan beta-karoten di dalam bijinya (endosperma). Proyek ini bertujuan mengatasi defisiensi Vitamin A (VAD) yang menyebabkan kebutaan dan kematian pada anak-anak di negara berkembang yang makanan pokoknya adalah nasi <a href="#" class="innote" data-ref="Ye, X., et al. (2000). Engineering the provitamin A pathway into rice endosperm. Science, 287(5451), 303-305.">(Ye et al., 2000)</a>.</p>

            <h3>2. Mekanisme Rekayasa Genetika</h3>
            <p>Padi secara alami tidak memproduksi beta-karoten di bijinya. Ilmuwan menyisipkan dua gen asing ke dalam genom padi:</p>
            <ul>
                <li><strong>Gen <em>psy</em> (phytoene synthase):</strong> Berasal dari tanaman narsis (daffodil) atau jagung.</li>
                <li><strong>Gen <em>crtI</em> (carotene desaturase):</strong> Berasal dari bakteri tanah <em>Erwinia uredovora</em>.</li>
            </ul>
            <p>Kombinasi gen ini melengkapi jalur biosintesis karotenoid dalam biji padi, mengubah warnanya menjadi kuning keemasan <a href="#" class="innote" data-ref="Paine, J. A., et al. (2005). Improving the nutritional value of Golden Rice. Nature Biotechnology.">(Paine et al., 2005)</a>.</p>

            <h3>3. Kontroversi & Etika</h3>
            <p>Meskipun potensinya besar, Golden Rice menghadapi tantangan regulasi dan penolakan dari kelompok lingkungan yang mengkhawatirkan dampak jangka panjang GMO terhadap keanekaragaman hayati dan kesehatan manusia, meskipun studi ilmiah sejauh ini menunjukkan keamanannya.</p>
        `,
        stats: { eco: 80, sus: 85, eth: 60 },
        tags: ['GMO', 'Biofortifikasi', 'Vitamin A', 'Agrobacterium', 'Biosintesis']
    },
    {
        id: '03',
        cat: 'BIOTEKNOLOGI LINGKUNGAN',
        title: 'Bioremediasi',
        subtitle: 'Penggunaan mikroorganisme untuk membersihkan polutan.',
        icon: '🛢️',
        content: `
            <h3>1. Konsep Dasar</h3>
            <p>Bioremediasi adalah teknologi pengelolaan limbah yang menggunakan organisme hidup (terutama bakteri dan jamur) untuk menetralkan atau menghilangkan zat berbahaya dari lingkungan terkontaminasi. Ini adalah metode yang lebih ramah lingkungan dibandingkan metode fisik atau kimia.</p>

            <h3>2. Studi Kasus: Tumpahan Minyak</h3>
            <p>Salah satu aplikasi tersukses adalah penggunaan bakteri genus <em>Pseudomonas</em> untuk membersihkan tumpahan minyak di laut (seperti kasus Exxon Valdez). Bakteri ini memecah hidrokarbon kompleks dalam minyak bumi menjadi senyawa sederhana seperti karbon dioksida dan air <a href="#" class="innote" data-ref="Vidali, M. (2001). Bioremediation: an overview. Pure and Applied Chemistry, 73(7).">(Vidali, 2001)</a>.</p>

            <h3>3. Jenis Bioremediasi</h3>
            <ul>
                <li><strong>Biostimulasi:</strong> Menambahkan nutrisi (nitrogen/fosfor) ke lingkungan untuk merangsang pertumbuhan bakteri pengurai alami.</li>
                <li><strong>Bioaugmentasi:</strong> Menambahkan bakteri spesifik dari luar yang telah diseleksi kemampuan degradasinya.</li>
                <li><strong>Fitoremediasi:</strong> Menggunakan tanaman (seperti eceng gondok atau bunga matahari) untuk menyerap logam berat dari tanah/air.</li>
            </ul>
        `,
        stats: { eco: 70, sus: 100, eth: 10 },
        tags: ['Pseudomonas', 'Polusi', 'Degradasi', 'Fitoremediasi', 'Ramah Lingkungan']
    },
    {
        id: '04',
        cat: 'BIOTEKNOLOGI FORENSIK',
        title: 'DNA Profiling (PCR)',
        subtitle: 'Identifikasi individu berdasarkan sidik jari genetik.',
        icon: '🔍',
        content: `
            <h3>1. Prinsip Dasar</h3>
            <p>DNA Profiling (Fingerprinting) adalah teknik untuk mengidentifikasi individu berdasarkan profil DNA unik mereka. Metode ini sangat krusial dalam forensik (kriminalitas) dan tes paternitas. Metode modern menggunakan analisis STR (Short Tandem Repeats) pada bagian DNA non-coding yang sangat bervariasi antar individu.</p>

            <h3>2. Peran PCR (Polymerase Chain Reaction)</h3>
            <p>Seringkali sampel DNA di TKP sangat sedikit (tetesan darah kering, akar rambut). PCR digunakan untuk melipatgandakan (amplifikasi) segmen DNA tersebut jutaan kali lipat dalam waktu singkat secara in-vitro. PCR melibatkan siklus suhu:</p>
            <ul>
                <li><strong>Denaturasi (95°C):</strong> Memisahkan untai ganda DNA.</li>
                <li><strong>Annealing (50-60°C):</strong> Penempelan primer.</li>
                <li><strong>Ekstensi (72°C):</strong> Enzim Taq Polymerase membentuk untai DNA baru.</li>
            </ul>
            <p>Teknik ini ditemukan oleh Kary Mullis pada tahun 1983 dan memenangkan Hadiah Nobel <a href="#" class="innote" data-ref="Mullis, K., et al. (1986). Specific enzymatic amplification of DNA in vitro. Cold Spring Harbor Symposia.">(Mullis et al., 1986)</a>.</p>
        `,
        stats: { eco: 60, sus: 50, eth: 40 },
        tags: ['PCR', 'STR', 'Forensik', 'Elektroforesis', 'Taq Polymerase']
    }
];

// --- LOGIC ---

function init() {
    const menu = document.getElementById('menu-container');
    if (!menu) return;

    database.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
        btn.id = `btn-${index}`;
        btn.innerHTML = `<span class="font-bold mr-2">${item.id}.</span> ${item.title}`;
        btn.onclick = () => loadContent(index);
        menu.appendChild(btn);
    });

    // Load first item
    loadContent(0);
}

function loadContent(index) {
    const data = database[index];
    if (!data) return;

    // Update Active Menu
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${index}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Show Container
    const container = document.getElementById('article-container');
    if (container) container.classList.remove('hidden');

    // Update Header
    const idEl = document.getElementById('display-id');
    const catEl = document.getElementById('display-cat');
    const titleEl = document.getElementById('display-title');
    const subtitleEl = document.getElementById('display-subtitle');
    const iconEl = document.getElementById('display-icon');

    if (idEl) idEl.innerText = data.id;
    if (catEl) catEl.innerText = data.cat;
    if (titleEl) titleEl.innerText = data.title;
    if (subtitleEl) subtitleEl.innerText = data.subtitle;
    if (iconEl) iconEl.innerText = data.icon;

    // Update Body (With simple fade animation reset)
    const body = document.getElementById('display-body');
    if (body) {
        body.style.opacity = '0';
        setTimeout(() => {
            body.innerHTML = data.content;
            body.style.opacity = '1';
            body.style.transition = 'opacity 0.5s ease-in';
        }, 100);
    }

    // Update Stats
    updateBar('bar-eco', 'stat-eco', data.stats.eco);
    updateBar('bar-sus', 'stat-sus', data.stats.sus);
    updateBar('bar-eth', 'stat-eth', data.stats.eth);

    // Update Tags
    const tagsContainer = document.getElementById('display-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            tagsContainer.innerHTML += `<span class="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs text-blue-400 font-mono hover:border-blue-500 transition cursor-default">#${tag}</span>`;
        });
    }
}

function updateBar(barId, textId, value) {
    const textEl = document.getElementById(textId);
    if (textEl) textEl.innerText = value + '%';

    const bar = document.getElementById(barId);
    if (bar) {
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = value + '%', 200);
    }
}

// Run Init
window.onload = init;
