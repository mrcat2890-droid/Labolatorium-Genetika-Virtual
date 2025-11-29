"use strict";

/**
 * GEN-LAB: Monohybrid Simulation Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#020617', // Slate 950
                    card: 'rgba(30, 41, 59, 0.7)', // Slate 800 glass
                    neon: '#06b6d4', // Cyan
                    rose: '#f43f5e',
                    purple: '#8b5cf6'
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'scan': 'scan 2s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        }
    }
};

// --- UX HELPERS ---

function autoTab(current, nextId) {
    if (current.value.length >= 1) {
        document.getElementById(nextId).focus();
    }
}

function checkRun(e) {
    if (e.key === "Enter") startSimulation();
}

// --- CHROMOSOME VISUALIZER ---

// Membuat batang warna kromosom berdasarkan alel
function getChromosomeHTML(allele) {
    // Jika huruf besar (Dominan) -> Warna Ungu/Cyan Terang
    // Jika huruf kecil (Resesif) -> Warna Teal/Abu Gelap
    const isDom = allele === allele.toUpperCase();
    const color = isDom ? '#8b5cf6' : '#2dd4bf'; // Purple vs Teal
    const glow = isDom ? 'box-shadow: 0 0 8px ' + color + ';' : '';

    return `
    <div class="w-full flex items-center gap-2 mb-1">
        <div class="h-2 flex-grow rounded-full" style="background-color: ${color}; ${glow}"></div>
        <span class="text-xs font-mono w-4 text-center ${isDom ? 'text-white font-bold' : 'text-slate-400'}">${allele}</span>
    </div>`;
}

// --- MAIN LOGIC ---

function startSimulation() {
    // 1. Ambil Input (JANGAN gunakan .toUpperCase() di sini agar bug teratasi)
    const p1a = document.getElementById('p1a').value.trim();
    const p1b = document.getElementById('p1b').value.trim();
    const p2a = document.getElementById('p2a').value.trim();
    const p2b = document.getElementById('p2b').value.trim();

    // 2. Validasi (Harus huruf)
    const allInputs = [p1a, p1b, p2a, p2b];
    if (allInputs.some(x => x === "" || !x.match(/[a-zA-Z]/))) {
        alert("Sistem Error: Mohon masukkan semua alel menggunakan huruf (A-Z atau a-z).");
        return;
    }

    // 3. Efek Loading "Scanning"
    const loader = document.getElementById('loader');
    const results = document.getElementById('results-container');

    loader.classList.remove('hidden');
    results.classList.add('hidden');
    results.style.opacity = '0';

    setTimeout(() => {
        loader.classList.add('hidden');
        results.classList.remove('hidden');
        // Trigger reflow
        void results.offsetWidth;
        results.style.opacity = '1';

        // Jalankan Kalkulasi
        calculateGenetics(p1a, p1b, p2a, p2b);

        // Scroll smooth
        results.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function calculateGenetics(p1a, p1b, p2a, p2b) {
    // Set Header Tabel
    document.getElementById('header-p1-1').innerText = p1a;
    document.getElementById('header-p1-2').innerText = p1b;
    document.getElementById('header-p2-1').innerText = p2a;
    document.getElementById('header-p2-2').innerText = p2b;

    const p1 = [p1a, p1b];
    const p2 = [p2a, p2b];
    let offsprings = [];
    let domCount = 0;

    // Loop 2x2
    let cellIndex = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const allele1 = p1[i];
            const allele2 = p2[j];

            // LOGIKA SORTING PENTING:
            // Kita ingin 'Aa', bukan 'aA'.
            // Huruf Kapital selalu di depan.
            let combined = "";

            // Cek jika salah satu kapital dan yang lain kecil
            const isA1Cap = allele1 === allele1.toUpperCase();
            const isA2Cap = allele2 === allele2.toUpperCase();

            if (isA1Cap && !isA2Cap) {
                combined = allele1 + allele2;
            } else if (!isA1Cap && isA2Cap) {
                combined = allele2 + allele1;
            } else {
                combined = allele1 + allele2;
            } // Sama-sama besar atau kecil

            // Cek Fenotipe (Dominan jika ada minimal 1 huruf kapital)
            // Kita asumsikan input valid satu jenis huruf (misal A dan a)
            const hasDominant = (combined !== combined.toLowerCase());

            if (hasDominant) domCount++;
            offsprings.push(combined);

            // Render Sel Visual
            const cell = document.getElementById(`cell-${cellIndex}`);
            cell.innerHTML = `
                <div class="w-full max-w-[60px]">
                    ${getChromosomeHTML(allele1)}
                    ${getChromosomeHTML(allele2)}
                </div>
                <div class="mt-2 text-2xl font-bold font-mono tracking-widest ${hasDominant ? 'text-purple-300 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'text-teal-200'}">
                    ${combined}
                </div>
            `;
            cellIndex++;
        }
    }

    updateStats(domCount, offsprings, p1, p2);
}

function updateStats(domCount, offsprings, p1, p2) {
    const domPct = (domCount / 4) * 100;
    const resPct = 100 - domPct;

    // Update Bars
    document.getElementById('bar-dom').style.width = domPct + '%';
    document.getElementById('bar-res').style.width = resPct + '%';
    document.getElementById('stat-dom-num').innerText = domPct + '%';
    document.getElementById('stat-res-num').innerText = resPct + '%';

    // Rasio
    let ratio = "";
    if (domPct === 100) ratio = "4 : 0";
    else if (domPct === 75) ratio = "3 : 1";
    else if (domPct === 50) ratio = "1 : 1";
    else if (domPct === 25) ratio = "1 : 3";
    else ratio = "0 : 4";
    document.getElementById('ratio-text').innerText = ratio;

    // Generate AI Report
    generateReport(domPct, offsprings, p1, p2);
}

function generateReport(domPct, offsprings, p1, p2) {
    const p1Gen = p1.join('');
    const p2Gen = p2.join('');
    const uniqueGenotypes = [...new Set(offsprings)].join(', ');

    let analysis = "";

    // Paragraf 1: Introduksi
    analysis += `<p><strong class="text-cyan-400">STATUS EKSPERIMEN:</strong> Persilangan genetik dilakukan antara P1 (<strong>${p1Gen}</strong>) dan P2 (<strong>${p2Gen}</strong>). Sistem mendeteksi pemisahan alel yang mengikuti <span class="citation-link" data-ref="Hukum I Mendel: Alel memisah secara bebas saat pembentukan gamet">Hukum Segregasi Mendel</span>.</p>`;

    // Paragraf 2: Analisis Inti
    analysis += `<p>Berdasarkan simulasi Punnett Square, probabilitas fenotipe dominan adalah <strong>${domPct}%</strong>. `;

    if (domPct === 75) {
        analysis += `Rasio 3:1 ini mengindikasikan persilangan <strong>Monohibrid Heterozigot</strong>. Kedua induk membawa sifat resesif tersembunyi (Carrier), yang muncul kembali pada 25% keturunan (homozigot resesif). Ini adalah bukti klasik pewarisan sifat diskrit <span class="citation-link" data-ref="Campbell Biology, Bab 14">(Urry et al., 2020)</span>.`;
    } else if (domPct === 50) {
        analysis += `Pola 1:1 ini adalah karakteristik dari <strong>Test Cross</strong> (Uji Silang). Salah satu induk adalah heterozigot sementara yang lain homozigot resesif. Hal ini sering digunakan di laboratorium untuk mengidentifikasi genotipe individu yang menunjukkan fenotipe dominan.`;
    } else if (domPct === 100) {
        analysis += `Keseragaman 100% fenotipe dominan menunjukkan berlakunya <strong>Hukum Uniformitas</strong>. Salah satu atau kedua induk adalah homozigot dominan (AA), sehingga menutupi ekspresi alel resesif pada seluruh keturunan F1 <span class="citation-link" data-ref="Genetics: A Conceptual Approach, Pierce 2020">(Pierce, 2020)</span>.`;
    } else if (domPct === 0) {
        analysis += `Absennya sifat dominan (0%) memastikan bahwa kedua induk tidak memiliki alel dominan sama sekali. Keduanya adalah galur murni resesif.`;
    }

    // Paragraf 3: Kesimpulan Genotipe
    analysis += `</p><p><strong class="text-pink-400">KESIMPULAN GENOTIPE:</strong> Variasi genetik yang dihasilkan adalah { ${uniqueGenotypes} }. Pemetaan ini penting untuk memprediksi stabilitas sifat pada generasi berikutnya (F2).</p>`;

    document.getElementById('ai-report-body').innerHTML = analysis;
}
