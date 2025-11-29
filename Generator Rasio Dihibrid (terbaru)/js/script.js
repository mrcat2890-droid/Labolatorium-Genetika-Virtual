"use strict";

/**
 * GEN-LAB: Dihybrid Sequencing Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                lab: {
                    bg: '#020617',
                    card: '#0f172a',
                    gold: '#fbbf24',
                    emerald: '#10b981',
                    blue: '#3b82f6'
                }
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif']
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
            }
        }
    }
};

// --- UTILS ---

function formatGenotype(input) {
    let raw = input.replace(/[^a-zA-Z]/g, '');
    if (raw.length !== 4) return raw;
    let pair1 = raw.substring(0, 2);
    let pair2 = raw.substring(2, 4);

    const sortPair = (str) => {
        let arr = str.split('');
        if (arr[0].toLowerCase() === arr[0] && arr[1].toUpperCase() === arr[1]) {
            return arr[1] + arr[0]; // Sort Aa, not aA
        }
        return str;
    };

    return sortPair(pair1) + sortPair(pair2);
}

// --- SVG SEED VISUALIZER ---

function getSeedSVG(phenotype) {
    const isRound = phenotype.includes("Bulat");
    const isYellow = phenotype.includes("Kuning");
    const fill = isYellow ? "#fbbf24" : "#10b981";
    const stroke = isYellow ? "#d97706" : "#059669";

    const roundPath = "M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z";
    const wrinkledPath = "M50 10 C30 10 15 25 15 40 Q10 50 20 60 Q15 75 30 85 Q50 95 70 85 Q85 75 80 60 Q90 50 85 40 Q85 25 70 10 Z";

    return `<svg viewBox="0 0 100 100" class="w-8 h-8 md:w-10 md:h-10 mx-auto drop-shadow-md transition-transform hover:scale-125 duration-300"><path d="${isRound ? roundPath : wrinkledPath}" fill="${fill}" stroke="${stroke}" stroke-width="3"/><circle cx="30" cy="30" r="5" fill="white" opacity="0.3"/></svg>`;
}

// --- MAIN LOGIC ---

function startAnalysis() {
    let p1 = document.getElementById('p1').value;
    let p2 = document.getElementById('p2').value;

    if (p1.length !== 4 || p2.length !== 4) {
        alert("Mohon masukkan genotipe 4 huruf (Contoh: BbKk).");
        return;
    }

    const loader = document.getElementById('loading-overlay');
    const results = document.getElementById('result-container');
    const loadText = document.getElementById('loading-text');

    loader.classList.remove('hidden');
    results.classList.add('hidden');

    // Simulate process
    setTimeout(() => { if(loadText) loadText.innerText = "Recombining Alleles..."; }, 800);
    setTimeout(() => { if(loadText) loadText.innerText = "Calculating Phenotypes..."; }, 1500);

    setTimeout(() => {
        processDihybrid(p1, p2);
        loader.classList.add('hidden');
        results.classList.remove('hidden');
        results.scrollIntoView({ behavior: 'smooth' });
    }, 2200);
}

function processDihybrid(rawP1, rawP2) {
    const p1 = formatGenotype(rawP1);
    const p2 = formatGenotype(rawP2);
    document.getElementById('p1').value = p1;
    document.getElementById('p2').value = p2;

    const getGametes = (str) => {
        let a = [str[0], str[1]];
        let b = [str[2], str[3]];
        let res = [];
        a.forEach(x => b.forEach(y => res.push(x + y)));
        return res;
    };

    const g1 = getGametes(p1);
    const g2 = getGametes(p2);

    const grid = document.getElementById('punnett-grid');
    grid.innerHTML = '<div></div>'; // Corner

    // Header Top (Visual Gamete)
    g2.forEach(g => {
        grid.innerHTML += `<div class="bg-slate-800/80 text-emerald-400 font-mono font-bold py-2 rounded border border-slate-700 flex flex-col items-center justify-center"><div class="w-2 h-2 rounded-full bg-emerald-500 mb-1"></div>${g}</div>`;
    });

    let phenoCounts = { "Bulat Kuning": 0, "Bulat Hijau": 0, "Kisut Kuning": 0, "Kisut Hijau": 0 };

    for (let i = 0; i < 4; i++) {
        // Header Left
        grid.innerHTML += `<div class="flex flex-col items-center justify-center bg-slate-800/80 text-amber-400 font-mono font-bold rounded border border-slate-700"><div class="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>${g1[i]}</div>`;

        for (let j = 0; j < 4; j++) {
            // Sort alleles within pairs: Bb, Kk
            let char1 = [g1[i][0], g2[j][0]].sort((a, b) => (a === a.toLowerCase() && b === b.toUpperCase()) ? 1 : -1).join('');
            let char2 = [g1[i][1], g2[j][1]].sort((a, b) => (a === a.toLowerCase() && b === b.toUpperCase()) ? 1 : -1).join('');
            let fullGen = char1 + char2;

            // Determine Phenotype
            // Dominant if first char of pair is Uppercase
            let isRound = fullGen[0] === fullGen[0].toUpperCase();
            let isYellow = fullGen[2] === fullGen[2].toUpperCase();
            let pLabel = (isRound ? "Bulat" : "Kisut") + " " + (isYellow ? "Kuning" : "Hijau");
            phenoCounts[pLabel]++;

            grid.innerHTML += `
                <div class="bg-slate-800/40 border border-slate-700/50 rounded p-1 flex flex-col items-center group relative hover:bg-slate-700 transition">
                    ${getSeedSVG(pLabel)}
                    <span class="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">${fullGen}</span>
                    <div class="absolute bottom-full bg-black text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-20 border border-slate-700">${pLabel}</div>
                </div>
            `;
        }
    }
    updateStatsAndReport(phenoCounts, p1, p2);
}

function updateStatsAndReport(counts, p1, p2) {
    const statsDiv = document.getElementById('stats-bars');
    statsDiv.innerHTML = '';
    let total = 16;

    for (let [key, val] of Object.entries(counts)) {
        if (val > 0) {
            let pct = (val / total) * 100;
            let color = key.includes("Kuning") ? "bg-amber-400" : "bg-emerald-500";
            statsDiv.innerHTML += `
                <div class="mb-2">
                    <div class="flex justify-between text-xs text-slate-300 mb-1">
                        <span>${key}</span>
                        <span class="font-mono">${val}/16 (${pct}%)</span>
                    </div>
                    <div class="w-full bg-slate-700 rounded-full h-2">
                        <div class="${color} h-2 rounded-full transition-all duration-1000" style="width: ${pct}%"></div>
                    </div>
                </div>
            `;
        }
    }

    let report = "";
    let vals = Object.values(counts).sort((a, b) => b - a).filter(x => x > 0);
    let ratio = vals.join(':');

    report += `<p class="mb-3"><strong class="text-amber-400">ANALISIS SEKUENSIAL:</strong> Sistem telah memetakan persilangan P1 (${p1}) × P2 (${p2}). Berikut adalah interpretasi data:</p>`;

    if (ratio === "9:3:3:1") {
        report += `<p class="mb-3">Terdeteksi rasio klasik <strong>9:3:3:1</strong>. Fenomena ini mengkonfirmasi <span class="citation" data-ref="Prinsip Asortasi Bebas: Pasangan alel memisah secara independen satu sama lain (Campbell Biology, 12th Ed).">Hukum II Mendel</span>. Kedua induk bersifat Heterozigot untuk kedua sifat, memungkinkan munculnya kombinasi rekombinan (3+3) yang berbeda dari fenotipe parental.</p>`;
    } else if (ratio === "4:4:4:4" || ratio === "1:1:1:1") {
        report += `<p class="mb-3">Terdeteksi rasio <strong>1:1:1:1</strong>. Ini adalah tanda tangan genetik dari <span class="citation" data-ref="Metode persilangan dengan individu homozigot resesif untuk mengungkap genotipe (Pierce, 2020).">Test Cross Dihibrid</span>. Salah satu induk adalah pembawa sifat heterozigot ganda (AaBb) sedangkan pasangannya adalah galur murni resesif (aabb).</p>`;
    } else if (vals[0] === 16) {
        report += `<p class="mb-3">Terdeteksi <strong>Uniformitas Genetik (100%)</strong>. Alel dominan dari salah satu induk menutupi seluruh ekspresi alel resesif pada generasi F2, sesuai dengan <span class="citation" data-ref="Hukum Dominasi Mendel (1866).">Prinsip Dominasi Penuh</span>.</p>`;
    } else {
        report += `<p class="mb-3">Terdeteksi variasi rasio non-standar. Pola ini muncul dari interaksi spesifik genotipe kedua induk yang parsial heterozigot/homozigot.</p>`;
    }
    document.getElementById('academic-text').innerHTML = report;
}
