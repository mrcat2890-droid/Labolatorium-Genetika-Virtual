"use strict";

/**
 * GEN-K: Ultimate Karyotype Simulator Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                bio: {
                    dark: '#000000',
                    panel: '#0a0a0a',
                    cyan: '#00f0ff',
                    alert: '#ff2a6d',
                    warn: '#ffae00',
                    purple: '#d600ff'
                }
            },
            fontFamily: {
                mono: ['Space Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif']
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'jitter': 'jitter 0.2s infinite',
                'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'mitosis': 'mitosis 2s infinite ease-in-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                jitter: {
                    '0%, 100%': { transform: 'translate(0,0)' },
                    '25%': { transform: 'translate(1px,1px)' },
                    '75%': { transform: 'translate(-1px,-1px)' }
                },
                mitosis: {
                    '0%': { width: '20px' },
                    '50%': { width: '50px', gap: '10px' },
                    '100%': { width: '20px' }
                }
            }
        }
    }
};

// --- DATABASE: Karyotype Knowledge Base ---
const database = {
    '1': { // KROMOSOM 1 (LETHAL)
        1: {
            name: 'MONOSOMI 1', karyo: '45, XX, -1', class: 'LETHAL AUTOSOMAL', severe: 100, exp: 'Gagal tumbuh (Embrio)',
            clinical: 'Kromosom 1 adalah kromosom terbesar manusia, mengandung >2000 gen (~8% total DNA). Kehilangan satu salinan (Monosomi) menyebabkan hilangnya instruksi vital untuk pembentukan organ dasar.',
            mech: 'Terjadi akibat <span class="citation" data-ref="Kegagalan kromosom homolog untuk memisah saat meiosis (pembentukan gamet).">Non-Disjunction Total</span>. Zigot tidak memiliki informasi genetik yang cukup untuk pembelahan sel awal.',
            prog: 'Inkompatibel dengan kehidupan. Selalu berakhir dengan abortus spontan (keguguran) pada trimester pertama.'
        },
        2: { name: 'NORMAL (DISOMI 1)', karyo: '46, XX', class: 'EUPOLOID', severe: 0, exp: 'Normal', clinical: 'Kondisi genetik normal. Tidak ada kelainan.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'TRISOMI 1', karyo: '47, XX, +1', class: 'LETHAL AUTOSOMAL', severe: 100, exp: 'Gagal tumbuh (Embrio)',
            clinical: 'Kelebihan materi genetik dari kromosom terbesar menyebabkan kekacauan ekspresi gen yang masif. Tubuh tidak dapat mengatur dosis protein yang dihasilkan oleh 3 salinan gen.',
            mech: 'Non-Disjunction pada Meiosis I atau II. Menyebabkan <span class="citation" data-ref="Ketidakseimbangan jumlah gen yang parah (Gene Dosage Effect).">Over-ekspresi Gen</span> fatal.',
            prog: 'Selalu letal pada tahap embrional awal. Tidak pernah ditemukan pada kelahiran hidup.'
        }
    },
    '3': { // KROMOSOM 3 (LETHAL)
        1: { name: 'MONOSOMI 3', severe: 100, exp: 'Lethal', clinical: 'Kehilangan kromosom besar (Metasentrik). Tidak ada janin yang bertahan hidup.', mech: 'Non-disjunction.', prog: 'Abortus spontan.' },
        2: { name: 'NORMAL (DISOMI 3)', severe: 0, exp: 'Normal', clinical: 'Normal.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'TRISOMI 3', severe: 99, exp: 'Lethal (Lahir Mati)',
            clinical: 'Sangat jarang ditemukan pada kelahiran hidup. Jika lahir, bayi memiliki malformasi wajah parah (dismorfik), kelainan jantung, dan gagal napas.',
            mech: 'Non-disjunction kromosom autosom besar.',
            prog: 'Kematian terjadi dalam beberapa jam atau hari setelah lahir. Mosaikisme (hanya sebagian sel yang trisomi) mungkin bertahan lebih lama.'
        }
    },
    '13': { // PATAU
        1: { name: 'MONOSOMI 13', severe: 100, exp: 'Lethal', clinical: 'Fatal pada embrio.', mech: 'Nondisjunction.', prog: 'Abortus spontan.' },
        2: { name: 'NORMAL', severe: 0, exp: 'Normal', clinical: 'Normal.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'SINDROM PATAU', karyo: '47, XX, +13', severe: 95, exp: '< 1 Minggu',
            clinical: 'Kelainan berat berupa <strong>Holoprosencephaly</strong> (otak depan tidak membelah), bibir sumbing parah (cleft palate), mata kecil (mikroftalmia), dan jari berlebih (polidaktili).',
            mech: 'Non-disjunction maternal pada kromosom 13 (Akrosentrik). Risiko meningkat seiring usia ibu.',
            prog: 'Sangat buruk. >80% bayi meninggal di bulan pertama akibat gagal jantung atau napas.'
        }
    },
    '18': { // EDWARDS
        1: { name: 'MONOSOMI 18', severe: 100, exp: 'Lethal', clinical: 'Fatal.', mech: '-', prog: 'Abortus.' },
        2: { name: 'NORMAL', severe: 0, exp: 'Normal', clinical: 'Normal.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'SINDROM EDWARDS', karyo: '47, XX, +18', severe: 90, exp: '< 1 Tahun',
            clinical: 'Ciri khas: Berat lahir rendah, kepala kecil memanjang, <strong>Rocker-bottom feet</strong> (kaki kursi goyang), dan tangan mengepal dengan jari tumpang tindih.',
            mech: 'Trisomi autosom kedua tersering setelah Down Syndrome.',
            prog: 'Hanya 5-10% yang bertahan hidup lebih dari 1 tahun. Kematian biasanya disebabkan oleh henti napas sentral (apnea).'
        }
    },
    '21': { // DOWN
        1: { name: 'MONOSOMI 21', severe: 100, exp: 'Lethal', clinical: 'Sangat jarang bertahan hidup.', mech: '-', prog: 'Abortus.' },
        2: { name: 'NORMAL', severe: 0, exp: 'Normal', clinical: 'Normal.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'SINDROM DOWN', karyo: '47, XX, +21', severe: 40, exp: '~60 Tahun',
            clinical: 'Kelainan kromosom paling umum yang kompatibel dengan kehidupan. Gejala: Wajah datar (mongoloid), mata sipit ke atas, lidah menonjol, dan hipotonia (otot lemah).',
            mech: 'Non-disjunction (95%) atau <span class="citation" data-ref="Perpindahan segmen kromosom ke kromosom lain (biasanya 14 ke 21).">Translokasi Robertsonian</span> (4%).',
            prog: 'Harapan hidup kini baik dengan perawatan medis. Risiko penyakit jantung bawaan dan Alzheimer dini.'
        }
    },
    'X': { // SEX CHROMOSOME
        1: {
            name: 'SINDROM TURNER', karyo: '45, X0', severe: 20, exp: 'Normal',
            clinical: 'Satu-satunya monosomi yang bisa hidup. Wanita dengan perawakan pendek, leher bersayap (webbed neck), dan ovarium tidak berkembang (infertil).',
            mech: 'Hilangnya satu kromosom X (biasanya dari sperma ayah). Tidak berkaitan dengan usia ibu.',
            prog: 'Hidup normal dengan terapi hormon pertumbuhan dan estrogen.'
        },
        2: { name: 'NORMAL WANITA', severe: 0, exp: 'Normal', clinical: 'Normal.', mech: '-', prog: 'Sehat.' },
        3: {
            name: 'SINDROM TRIPLE X', karyo: '47, XXX', severe: 10, exp: 'Normal',
            clinical: 'Wanita super (Super Female). Seringkali tanpa gejala fisik yang jelas. Mungkin lebih tinggi dari rata-rata dan risiko keterlambatan bicara ringan.',
            mech: 'Non-disjunction kromosom X maternal.',
            prog: 'Sangat baik. Kesuburan biasanya normal.'
        }
    }
};

// --- SVG CHROMOSOME GENERATOR ---
function getChromoSVG(color, animationClass) {
    return `
    <svg class="w-16 h-32 md:w-24 md:h-48 chromo-svg ${animationClass}" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 10C35 10 55 10 55 30C55 50 45 70 45 90C45 95 55 95 55 90C55 70 65 50 65 30C65 10 45 10 45 10" stroke="${color}" stroke-width="12" stroke-linecap="round" class="opacity-50"/>
        <path d="M35 190C35 190 55 190 55 170C55 150 45 120 45 100C45 95 55 95 55 100C55 120 65 150 65 170C65 190 45 190 45 190" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="50" cy="95" r="8" fill="white" filter="drop-shadow(0 0 5px white)"/>
        <path d="M40 40H60 M38 60H62 M40 140H60 M42 160H58" stroke="black" stroke-width="2" opacity="0.3"/>
    </svg>
    `;
}

// --- STATE ---
let state = { chromo: '21', copy: 2 };

function setChromo(c) {
    state.chromo = c;
    document.querySelectorAll('[id^="btn-c-"]').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-c-${c}`);
    if(btn) btn.classList.add('active');
}

function setCopy(n) {
    state.copy = n;
    document.querySelectorAll('[id^="btn-n-"]').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-n-${n}`);
    if(btn) btn.classList.add('active');
}

// --- MAIN SEQUENCE ---
function runSimulation() {
    const loader = document.getElementById('loader');
    const stage = document.getElementById('chromo-stage');
    const report = document.getElementById('report-card');
    const monitor = document.getElementById('monitor-panel');
    const scanLine = document.getElementById('scan-line');
    const alertMsg = document.getElementById('alert-msg');

    // 1. Start Loading (Mitosis Animation)
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    report.classList.add('hidden');
    monitor.classList.add('hidden');
    stage.innerHTML = ''; // Clear
    alertMsg.classList.add('hidden');

    // 2. Process Data
    setTimeout(() => {
        loader.classList.add('hidden');
        loader.classList.remove('flex');

        renderChromosomes();
        scanLine.classList.remove('hidden'); // Start scanning effect

        // 3. Reveal Results after scan
        setTimeout(() => {
            showReport();
            scanLine.classList.add('hidden');
            if (state.copy !== 2) alertMsg.classList.remove('hidden');
        }, 1500);

    }, 2000); // 2 seconds mitosis
}

function renderChromosomes() {
    const stage = document.getElementById('chromo-stage');
    const data = database[state.chromo][state.copy];
    let html = '';

    // Determine Color & Animation
    let color = '#00f0ff'; // Normal Cyan
    let anim = 'animate-float';

    if (state.copy === 3) {
        // Red for Lethal, Purple for Syndrome
        color = (state.chromo === '1' || state.chromo === '3') ? '#ff2a6d' : '#d600ff';
        anim = 'animate-jitter';
    } else if (state.copy === 1) {
        color = '#ffae00'; // Amber
        anim = 'animate-pulse-fast opacity-50';
    }

    // Generate Copies
    for (let i = 0; i < state.copy; i++) {
        // Add slight delay for natural feel
        html += getChromoSVG(color, anim);
    }
    stage.innerHTML = html;
}

function showReport() {
    const data = database[state.chromo][state.copy];
    const report = document.getElementById('report-card');
    const monitor = document.getElementById('monitor-panel');
    const bar = document.getElementById('lethality-bar');

    // Fill Report
    document.getElementById('syn-name').innerText = data.name;
    document.getElementById('syn-karyotype').innerText = data.karyo || `N/A`;
    document.getElementById('syn-class').innerText = data.class || 'UNKNOWN';

    document.getElementById('desc-clinical').innerHTML = data.clinical;
    document.getElementById('desc-mech').innerHTML = data.mech;
    document.getElementById('desc-prog').innerHTML = data.prog;

    // Fill Monitor
    document.getElementById('lethality-val').innerText = data.severe + '%';
    bar.style.width = data.severe + '%';
    document.getElementById('life-exp').innerText = data.exp;
    document.getElementById('mut-type').innerText = state.copy === 2 ? 'Normal' : (state.copy === 1 ? 'Monosomy' : 'Trisomy');

    // Monitor Color Logic
    if (data.severe > 80) {
        bar.classList.remove('bg-bio-cyan');
        bar.classList.add('bg-bio-alert');
    } else {
        bar.classList.remove('bg-bio-alert');
        bar.classList.add('bg-bio-cyan');
    }

    // Reveal
    report.classList.remove('hidden');
    monitor.classList.remove('hidden');

    // Scroll
    report.scrollIntoView({ behavior: 'smooth' });
}
