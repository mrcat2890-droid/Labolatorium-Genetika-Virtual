"use strict";

/**
 * GEN-X: Sex-Linked Heredity System Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                medical: {
                    dark: '#0f172a',
                    panel: '#1e293b',
                    cyan: '#06b6d4', // Normal
                    pink: '#ec4899', // Carrier/Female
                    danger: '#ef4444', // Affected
                    gold: '#f59e0b'
                }
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif']
            },
            animation: {
                'pulse-glow': 'pulseGlow 2s infinite',
                'float': 'float 3s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'glitch': 'glitch 0.5s infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' }
                }
            }
        }
    }
};

// --- STATE ---
let state = {
    mother: 'XX', // XX, Carrier, Sick
    father: 'XY'  // XY, Sick
};

// --- UI CONTROLLERS ---
function setMother(type) {
    state.mother = type;
    ['btn-m-norm', 'btn-m-car', 'btn-m-sick'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    if (type === 'XX') document.getElementById('btn-m-norm').classList.add('active');
    if (type === 'Carrier') document.getElementById('btn-m-car').classList.add('active');
    if (type === 'Sick') document.getElementById('btn-m-sick').classList.add('active');

    const statusEl = document.getElementById('mom-status');
    statusEl.innerText = type.toUpperCase();

    let colorClass = 'bg-medical-cyan';
    if (type === 'Carrier') colorClass = 'bg-medical-gold';
    if (type === 'Sick') colorClass = 'bg-medical-danger';

    statusEl.className = `text-[10px] px-2 py-1 rounded font-mono text-slate-900 font-bold ${colorClass}`;
}

function setFather(type) {
    state.father = type;
    ['btn-f-norm', 'btn-f-sick'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    if (type === 'XY') document.getElementById('btn-f-norm').classList.add('active');
    if (type === 'Sick') document.getElementById('btn-f-sick').classList.add('active');

    const statusEl = document.getElementById('dad-status');
    statusEl.innerText = type === 'XY' ? 'NORMAL' : 'SAKIT';

    const colorClass = type === 'XY' ? 'bg-medical-cyan' : 'bg-medical-danger';
    statusEl.className = `text-[10px] px-2 py-1 rounded font-mono text-slate-900 font-bold ${colorClass}`;
}

// --- ICONS (SVG) ---
const iconMale = `<svg class="w-12 h-12 mb-2 opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM20 22h-2v-4a2 2 0 0 0-2-2h-2v-3h2a3 3 0 0 0 3-3v-2h-2v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2h-2v2a3 3 0 0 0 3 3h2v3h-2a2 2 0 0 0-2 2v4H6v-5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5z"/></svg>`;
const iconFemale = `<svg class="w-12 h-12 mb-2 opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM16 22v-3a4 4 0 0 0-3-3.8V12h3v-2h-3V9h-2v1H8V9H6v1h3v2h3v3.2a4 4 0 0 0-3 3.8v3h2v-3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3h2z"/></svg>`;

// --- LOGIC ENGINE ---
function analyze() {
    const container = document.getElementById('result-container');
    const riskPanel = document.getElementById('risk-panel');
    const loader = document.getElementById('loader');

    // 1. Hide old results, show loader
    container.classList.add('hidden');
    riskPanel.classList.add('hidden');
    loader.classList.remove('hidden');
    loader.classList.add('flex'); // Enable flexbox

    // Scroll to loader
    loader.scrollIntoView({ behavior: 'smooth' });

    // 2. Wait for animation (2.5 seconds)
    setTimeout(() => {
        loader.classList.add('hidden');
        loader.classList.remove('flex');

        // Show new results
        container.classList.remove('hidden');
        riskPanel.classList.remove('hidden');

        // Process Data
        processData();

        // Scroll to result
        container.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
}

function processData() {
    // Determine Gametes
    let m1 = 'B', m2 = 'B';
    if (state.mother === 'Carrier') { m2 = 'b'; }
    else if (state.mother === 'Sick') { m1 = 'b'; m2 = 'b'; }

    let f1 = state.father === 'XY' ? 'B' : 'b';

    // Punnett Square Logic
    // m1, m2 are from Mother (X)
    // f1 is from Father (X), and Father also gives Y
    const children = [
        { sex: 'F', g1: m1, g2: f1 }, // Female 1 (Mom1 + DadX)
        { sex: 'F', g1: m2, g2: f1 }, // Female 2 (Mom2 + DadX)
        { sex: 'M', g1: m1, g2: 'Y' }, // Male 1 (Mom1 + DadY)
        { sex: 'M', g1: m2, g2: 'Y' }  // Male 2 (Mom2 + DadY)
    ];

    const grid = document.getElementById('children-grid');
    grid.innerHTML = '';

    let stats = { sick: 0, carrier: 0, normal: 0 };

    children.forEach((child, idx) => {
        let genotype = '', phenotype = '', status = '', colorVar = '', icon = '';

        if (child.sex === 'F') {
            // CRITICAL: Preserve Superscript Notation for Female
            genotype = `X<span class="sup">${child.g1}</span>X<span class="sup">${child.g2}</span>`;
            icon = iconFemale;
            let bCount = (child.g1 === 'b' ? 1 : 0) + (child.g2 === 'b' ? 1 : 0);

            if (bCount === 2) {
                status = 'SAKIT';
                colorVar = '--card-color: #ef4444; --card-color-glow: rgba(239, 68, 68, 0.5);';
                phenotype = 'text-medical-danger';
                stats.sick++;
            } else if (bCount === 1) {
                status = 'CARRIER';
                colorVar = '--card-color: #f59e0b; --card-color-glow: rgba(245, 158, 11, 0.5);';
                phenotype = 'text-medical-gold';
                stats.carrier++;
            } else {
                status = 'NORMAL';
                colorVar = '--card-color: #06b6d4; --card-color-glow: rgba(6, 182, 212, 0.5);';
                phenotype = 'text-medical-cyan';
                stats.normal++;
            }
        } else {
            // CRITICAL: Preserve Superscript Notation for Male
            genotype = `X<span class="sup">${child.g1}</span>Y`;
            icon = iconMale;
            if (child.g1 === 'b') {
                status = 'SAKIT';
                colorVar = '--card-color: #ef4444; --card-color-glow: rgba(239, 68, 68, 0.5);';
                phenotype = 'text-medical-danger';
                stats.sick++;
            } else {
                status = 'NORMAL';
                colorVar = '--card-color: #06b6d4; --card-color-glow: rgba(6, 182, 212, 0.5);';
                phenotype = 'text-medical-cyan';
                stats.normal++;
            }
        }

        grid.innerHTML += `
        <div class="baby-card rounded-xl p-4 flex flex-col items-center text-center group" style="${colorVar}">
            <div class="${phenotype} transition-transform duration-500 group-hover:scale-110">${icon}</div>
            <div class="text-xs text-slate-400 font-mono mb-1">ANAK ${idx + 1} (${child.sex === 'F' ? '♀' : '♂'})</div>
            <div class="text-xl font-display font-bold text-white mb-2">${genotype}</div>
            <div class="text-[10px] px-2 py-1 rounded bg-slate-900 font-bold tracking-widest ${phenotype.replace('text-', 'bg-').replace('medical-', 'medical-').replace('text-', 'text-slate-900 ')} bg-opacity-20 border border-current">${status}</div>
        </div>
        `;
    });

    // Update Risk Meters
    const sickPercent = (stats.sick / 4) * 100;
    const carrierPercent = (stats.carrier / 4) * 100;

    document.getElementById('ring-risk').style.setProperty('--percent', sickPercent + '%');
    document.getElementById('risk-percent').innerText = sickPercent + '%';

    document.getElementById('ring-carrier').style.setProperty('--percent', carrierPercent + '%');
    document.getElementById('carrier-percent').innerText = carrierPercent + '%';

    generateReport(stats);
}

function generateReport(stats) {
    let text = `<p class="mb-4">Analisis genetik dilakukan pada persilangan terpaut kromosom X (Sex-Linked). Sifat penyakit diasumsikan resesif (b) dan sifat normal dominan (B).</p>`;

    if (stats.sick > 0) {
        text += `<p class="mb-4"><strong class="text-medical-danger">PERINGATAN RISIKO TINGGI:</strong> Hasil menunjukkan probabilitas <strong>${(stats.sick / 4) * 100}%</strong> anak akan menderita penyakit genetik (Hemofilia/Buta Warna). Laki-laki jauh lebih rentan terkena karena bersifat <span class="citation" data-ref="Hemizigot: Kondisi di mana hanya terdapat satu salinan gen (pada kromosom X) sehingga sifat resesif langsung terekspresikan (Thompson & Thompson Genetics).">Hemizigot</span>.</p>`;
        if (stats.carrier > 0) {
            text += `<p class="mb-4">Selain itu, <strong>${(stats.carrier / 4) * 100}%</strong> anak (khususnya perempuan) berpotensi menjadi <strong>Carrier</strong>. Mereka akan tampak sehat secara fenotipe tetapi membawa gen penyakit yang dapat diturunkan ke cucu Anda.</p>`;
        }
    } else if (stats.carrier > 0) {
        text += `<p class="mb-4"><strong class="text-medical-gold">RISIKO CARRIER TERDETEKSI:</strong> Meskipun 100% anak akan lahir dengan fenotipe NORMAL (tidak sakit), terdapat peluang <strong>${(stats.carrier / 4) * 100}%</strong> anak perempuan menjadi Carrier. </p>
        <p>Hal ini terjadi karena Ayah atau Ibu menyumbangkan satu alel resesif, namun tertutupi oleh alel dominan normal (Hukum Dominasi). Waspadai pola pewarisan <span class="citation" data-ref="Criss-Cross Inheritance: Pola pewarisan dari ibu carrier ke anak laki-laki, melewati anak perempuan yang menjadi carrier (Campbell Biology).">Criss-Cross Inheritance</span> pada generasi berikutnya.</p>`;
    } else {
        text += `<p class="mb-4"><strong class="text-medical-cyan">HASIL NORMAL (AMAN):</strong> Analisis menunjukkan 0% risiko penyakit dan 0% risiko carrier. Seluruh alel yang diwariskan adalah Dominan Normal (B).</p>`;
    }

    text += `<p class="mt-4">Perlu dicatat bahwa pada wanita (XX), salah satu kromosom X akan dinonaktifkan secara acak melalui proses <span class="citation" data-ref="Lyonization (X-inactivation): Proses inaktivasi salah satu kromosom X pada sel wanita untuk menyeimbangkan dosis gen (Murray Barr, 1949).">Lyonisasi</span>, yang dapat mempengaruhi tingkat ekspresi gen pada individu carrier.</p>`;

    document.getElementById('report-text').innerHTML = text;
}
