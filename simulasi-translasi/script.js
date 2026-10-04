// ====================================================================
// GEN-OS // BIO-CORE: TRANSLATION (PROTEIN ASSEMBLY LAB) ENGINE
// Biological mRNA -> Polypeptide Translation Simulation
// ====================================================================

// --- Audio Synthesizer (Web Audio API) ---
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
}

function playTone(freq, type = 'sine', duration = 0.12, gainLevel = 0.1) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn('Audio not allowed yet:', e);
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    if (type === 'step') {
        playTone(520, 'sine', 0.08, 0.08);
    } else if (type === 'bond') {
        playTone(659.25, 'triangle', 0.15, 0.12);
        setTimeout(() => playTone(880, 'sine', 0.15, 0.08), 50);
    } else if (type === 'finish') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            setTimeout(() => playTone(freq, 'sine', 0.25, 0.1), idx * 90);
        });
    }
}

// Global modal & audio functions for HTML inline handlers
window.toggleSound = function() {
    soundEnabled = !soundEnabled;
    const icon = document.getElementById('sound-icon');
    if (icon) {
        icon.textContent = soundEnabled ? '🔊' : '🔇';
    }
    const btn = document.getElementById('btn-sound');
    if (btn) {
        if (!soundEnabled) {
            btn.classList.add('opacity-60');
        } else {
            btn.classList.remove('opacity-60');
            playSound('step');
        }
    }
};

window.openTutorialModal = function() {
    const modal = document.getElementById('modal-tutorial');
    if (modal) modal.classList.remove('hidden');
    playSound('step');
};

window.closeTutorialModal = function() {
    const modal = document.getElementById('modal-tutorial');
    if (modal) modal.classList.add('hidden');
    playSound('step');
};

window.openLiteratureModal = function() {
    const modal = document.getElementById('modal-literature');
    if (modal) modal.classList.remove('hidden');
    playSound('step');
};

window.closeLiteratureModal = function() {
    const modal = document.getElementById('modal-literature');
    if (modal) modal.classList.add('hidden');
    playSound('step');
};

// Keyboard listener for ESC to close modals
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeTutorialModal();
        window.closeLiteratureModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('sim-canvas');
    const ctx = canvas.getContext('2d');
    
    // UI Elements
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnPlay = document.getElementById('btn-play');
    const speedSlider = document.getElementById('speed-slider');
    const speedLabel = document.getElementById('speed-label');
    const progressFill = document.getElementById('progress-fill');
    const stepCounter = document.getElementById('step-counter');
    
    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-description');
    const curCodonEl = document.getElementById('current-codon');
    const curAnticodonEl = document.getElementById('current-anticodon');
    const curAaEl = document.getElementById('current-aa');
    const chainEl = document.getElementById('polypeptide-chain');
    const chainLenEl = document.getElementById('chain-length');

    // Display scale factor for Hi-DPI
    let displayWidth = 800;
    let displayHeight = 450;

    function resizeCanvas() {
        const container = document.getElementById('sim-container');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        displayWidth = Math.max(320, rect.width - 32);
        displayHeight = Math.max(380, rect.height - 110);
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
        draw();
    }
    window.addEventListener('resize', resizeCanvas);

    // Biological Data
    // mRNA Sequence: AUG - GCA - UAC - CGG - AAU - UUG - GCU - GAA - UAA
    const amino_acids = [
        { codon: "AUG", anti: "UAC", aa: "Met", fullName: "Metionin", color: "#f59e0b" },
        { codon: "GCA", anti: "CGU", aa: "Ala", fullName: "Alanin", color: "#06b6d4" },
        { codon: "UAC", anti: "AUG", aa: "Tyr", fullName: "Tirosin", color: "#8b5cf6" },
        { codon: "CGG", anti: "GCC", aa: "Arg", fullName: "Arginin", color: "#3b82f6" },
        { codon: "AAU", anti: "UUA", aa: "Asn", fullName: "Asparagin", color: "#22c55e" },
        { codon: "UUG", anti: "AAC", aa: "Leu", fullName: "Leusin", color: "#ec4899" },
        { codon: "GCU", anti: "CGA", aa: "Ala", fullName: "Alanin", color: "#06b6d4" },
        { codon: "GAA", anti: "CUU", aa: "Glu", fullName: "Glutamat", color: "#ef4444" },
        { codon: "UAA", anti: "—",   aa: "STOP", fullName: "Kodon Terminasi (Faktor Pelepas)", color: "#94a3b8" }
    ];

    const steps = [
        {
            title: "Tahap 1: Inisiasi Kompleks Ribosom",
            desc: "Subunit kecil ribosom (30S/40S) mengenali kodon awal AUG pada mRNA. Inisiator tRNA bermuatan Metionin (Met) dengan antikodon UAC terikat secara komplementer pada Situs P (Peptidil). Subunit besar (50S/60S) bergabung menyempurnakan kompleks inisiasi.",
            codonIdx: 0,
            activeTRNA: true,
            isInitiation: true,
            chain: ["Met"]
        },
        ...amino_acids.slice(1, 8).map((data, i) => ({
            title: `Tahap 2: Elongasi Siklus ke-${i + 1} (${data.codon} &rarr; ${data.aa})`,
            desc: `Aminoasil-tRNA baru pembawa ${data.fullName} (${data.aa}) dengan antikodon ${data.anti} memasuki Situs A. Enzim peptidil transferase mengkatalisis ikatan peptida antara rantai asam amino sebelumnya dengan ${data.aa}. Ribosom bertranslokasi 1 triplet kodon ke arah 3'.`,
            codonIdx: i + 1,
            activeTRNA: true,
            isInitiation: false,
            chain: amino_acids.slice(0, i + 2).map(d => d.aa)
        })),
        {
            title: "Tahap 3: Terminasi & Kodon STOP",
            desc: "Kodon terminasi UAA mencapai Situs A ribosom. Tidak ada tRNA yang cocok; sebaliknya, Faktor Pelepas (Release Factor / RF) berikatan ke Situs A dan memicu pemotongan hidrolitik ikatan antara polipeptida dan tRNA di Situs P.",
            codonIdx: 8,
            activeTRNA: false,
            isTermination: true,
            chain: amino_acids.slice(0, 8).map(d => d.aa)
        },
        {
            title: "Selesai: Polipeptida Terlepas & Disosiasi Ribosom",
            desc: "Sintesis selesai! Rantai polipeptida sepanjang 8 residu asam amino terlepas bebas ke sitoplasma untuk melipat diri (folding) menjadi konformasi protein fungsional. Subunit ribosom terurai siap untuk translasi mRNA berikutnya.",
            codonIdx: 8,
            activeTRNA: false,
            done: true,
            chain: amino_acids.slice(0, 8).map(d => d.aa)
        }
    ];

    let currentStep = 0;
    let isPlaying = false;
    let animationFrame;
    let timer = 0;

    // Highlights corresponding amino acid in genetic code table
    function updateCodonTableHighlight(codon) {
        const table = document.getElementById('codon-table');
        if (!table) return;
        const cells = table.querySelectorAll('td');
        cells.forEach(td => td.classList.remove('hl'));

        if (!codon || codon === '—') return;
        
        // Find which amino acid matches
        const aaInfo = amino_acids.find(a => a.codon === codon);
        if (!aaInfo) return;

        const targetAa = aaInfo.aa;
        cells.forEach(td => {
            if (td.textContent.includes(targetAa)) {
                td.classList.add('hl');
            }
        });
    }

    // Update Quick Jump stage button styles
    function updateStageButtons() {
        const stageBtns = document.querySelectorAll('#stage-buttons .quick-btn');
        stageBtns.forEach(btn => btn.classList.remove('active'));
        
        let targetIndex = -1;
        if (currentStep === 0) targetIndex = 0;
        else if (currentStep === 1) targetIndex = 1;
        else if (currentStep === 4) targetIndex = 2;
        else if (currentStep === 8) targetIndex = 3;
        else if (currentStep === 9) targetIndex = 4;

        if (targetIndex >= 0 && stageBtns[targetIndex]) {
            stageBtns[targetIndex].classList.add('active');
        }
    }

    function updateUI() {
        const step = steps[currentStep];
        const aaData = amino_acids[step.codonIdx];
        
        stepTitle.innerHTML = step.title;
        stepDesc.innerHTML = step.desc;
        
        curCodonEl.textContent = aaData.codon;
        curAnticodonEl.textContent = step.activeTRNA ? aaData.anti : "—";
        curAaEl.textContent = step.activeTRNA ? `${aaData.aa} (${aaData.fullName})` : (step.done ? "BEBAS" : "STOP");
        
        // Polypeptide chain display with badges
        if (step.chain.length === 0) {
            chainEl.innerHTML = '<span class="text-slate-500 italic">Belum ada asam amino</span>';
            chainLenEl.textContent = '0 Residu';
        } else {
            chainLenEl.textContent = `${step.chain.length} Residu Asam Amino`;
            chainEl.innerHTML = step.chain.map((aa, idx) => {
                const item = amino_acids.find(a => a.aa === aa);
                const col = item ? item.color : '#10b981';
                const isLatest = idx === step.chain.length - 1 && !step.done;
                const glowClass = isLatest ? 'ring-2 ring-emerald-400 animate-pulse' : '';
                return `
                    <span class="inline-flex items-center gap-1">
                        <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold border transition ${glowClass}" 
                              style="background: ${col}25; color: ${col}; border-color: ${col}80;">
                            ${aa}
                        </span>
                        ${idx < step.chain.length - 1 ? '<span class="text-slate-600 text-xs font-mono">&rarr;</span>' : ''}
                    </span>
                `;
            }).join('');
        }
        
        stepCounter.textContent = `Langkah ${currentStep + 1} / ${steps.length}`;
        progressFill.style.width = `${((currentStep) / (steps.length - 1)) * 100}%`;
        
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === steps.length - 1;
        
        if (currentStep === steps.length - 1) {
            isPlaying = false;
            btnPlay.innerHTML = '&#9658; Mulai Lagi';
            playSound('finish');
        } else if (!isPlaying) {
            btnPlay.innerHTML = '&#9658; Mulai';
        }

        updateCodonTableHighlight(aaData.codon);
        updateStageButtons();
    }

    // Expose jumpToStep to window for HTML onclick
    window.jumpToStep = function(stepIdx) {
        if (stepIdx >= 0 && stepIdx < steps.length) {
            currentStep = stepIdx;
            trnaY = -60;
            trnaAlpha = 0;
            playSound('step');
            updateUI();
        }
    };

    // Speed Slider listener
    if (speedSlider && speedLabel) {
        speedSlider.addEventListener('input', () => {
            const val = parseFloat(speedSlider.value);
            speedLabel.textContent = `${val.toFixed(1)}x`;
        });
    }

    // Animation Physics
    let offsetTarget = 0;
    let offsetCurrent = 0;
    let trnaY = -60;
    let trnaAlpha = 0;
    let bondEffectTimer = 0;
    let floatAnimTime = 0;

    function draw() {
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        floatAnimTime += 0.04;
        
        const cx = displayWidth / 2;
        const cy = displayHeight / 2;
        const step = steps[currentStep];
        
        // Physics lerping for mRNA motion
        offsetTarget = -step.codonIdx * 64;
        offsetCurrent += (offsetTarget - offsetCurrent) * 0.12;
        
        // tRNA drop animation
        if (step.activeTRNA && !step.done) {
            trnaY += (0 - trnaY) * 0.12;
            trnaAlpha += (1 - trnaAlpha) * 0.12;
        } else {
            trnaY += (-80 - trnaY) * 0.12;
            trnaAlpha += (0 - trnaAlpha) * 0.12;
        }

        ctx.save();
        ctx.translate(cx, cy + 30);

        // ==========================================
        // 1. mRNA STRAND (Single strand + codon blocks)
        // ==========================================
        ctx.save();
        ctx.translate(offsetCurrent, 0);
        
        // mRNA Backbone Ribbon
        const ribbonGrad = ctx.createLinearGradient(-450, 0, 850, 0);
        ribbonGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        ribbonGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.25)');
        ribbonGrad.addColorStop(1, 'rgba(6, 182, 212, 0.15)');
        
        ctx.fillStyle = ribbonGrad;
        ctx.fillRect(-450, -22, 1300, 44);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-450, -22, 1300, 44);

        // Backbone dashed centerline
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.moveTo(-450, 0);
        ctx.lineTo(850, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // 5' Cap and 3' Poly-A Tail Indicators
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 13px 'Fira Code', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("5' CAP ─", -400, 0);
        ctx.fillText("─ 3' poly(A)", 800, 0);

        // Codons
        amino_acids.forEach((d, i) => {
            const x = i * 64;
            const isCurrent = (i === step.codonIdx);
            
            // Codon Tile Background
            if (isCurrent) {
                ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
                ctx.strokeStyle = "#10b981";
                ctx.lineWidth = 2;
                ctx.shadowColor = "rgba(16, 185, 129, 0.6)";
                ctx.shadowBlur = 12;
            } else {
                ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
                ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
                ctx.lineWidth = 1;
                ctx.shadowBlur = 0;
            }
            
            // Rounded Box for Codon
            ctx.beginPath();
            ctx.roundRect(x - 28, -18, 56, 36, 6);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
            
            // Codon Text
            ctx.fillStyle = isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.7)";
            ctx.font = isCurrent ? "bold 15px 'Fira Code', monospace" : "14px 'Fira Code', monospace";
            ctx.fillText(d.codon, x, 0);

            // Small index label beneath codon
            ctx.fillStyle = isCurrent ? "#34d399" : "rgba(148, 163, 184, 0.5)";
            ctx.font = "9px 'Rajdhani', sans-serif";
            ctx.fillText(`k.${i + 1}`, x, 28);
        });
        
        ctx.restore();

        // ==========================================
        // 2. RIBOSOME COMPLEX (Large & Small Subunits)
        // ==========================================
        if (!step.done) {
            ctx.save();

            // Large Subunit (50S / 60S) - Upper Body
            const largeGrad = ctx.createRadialGradient(0, -90, 20, 0, -85, 130);
            largeGrad.addColorStop(0, "rgba(99, 102, 241, 0.45)");
            largeGrad.addColorStop(1, "rgba(30, 27, 75, 0.65)");

            ctx.fillStyle = largeGrad;
            ctx.strokeStyle = "#818cf8";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.ellipse(0, -80, 120, 80, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // P and A Site Cavities / Chambers (Transparent notches)
            ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
            ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
            ctx.lineWidth = 1.5;
            // P Site chamber
            ctx.beginPath();
            ctx.roundRect(-48, -75, 36, 50, 4);
            ctx.fill();
            ctx.stroke();
            // A Site chamber
            ctx.beginPath();
            ctx.roundRect(12, -75, 36, 50, 4);
            ctx.fill();
            ctx.stroke();

            // P-Site & A-Site HUD Labels
            ctx.fillStyle = "#c7d2fe";
            ctx.font = "bold 12px 'Orbitron', sans-serif";
            ctx.fillText("P", -30, -58);
            ctx.fillText("A", 30, -58);

            ctx.fillStyle = "rgba(199, 210, 254, 0.6)";
            ctx.font = "9px 'Rajdhani', sans-serif";
            ctx.fillText("Peptidil", -30, -44);
            ctx.fillText("Aminoasil", 30, -44);

            // Large Subunit Title
            ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
            ctx.font = "10px 'Orbitron', sans-serif";
            ctx.fillText("SUBUNIT BESAR (50S)", 0, -125);

            // Small Subunit (30S / 40S) - Lower Body
            const smallGrad = ctx.createRadialGradient(0, 50, 10, 0, 50, 80);
            smallGrad.addColorStop(0, "rgba(6, 182, 212, 0.45)");
            smallGrad.addColorStop(1, "rgba(8, 47, 73, 0.65)");

            ctx.fillStyle = smallGrad;
            ctx.strokeStyle = "#06b6d4";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(0, 50, 95, 38, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "rgba(6, 182, 212, 0.7)";
            ctx.font = "10px 'Orbitron', sans-serif";
            ctx.fillText("SUBUNIT KECIL (30S)", 0, 68);

            ctx.restore();
        }

        // ==========================================
        // 3. GROWING POLYPEPTIDE CHAIN (In P-Site)
        // ==========================================
        if (!step.done) {
            const px = -30;
            const py = -105;
            
            // Previous chain connected through exit tunnel
            const chainLength = step.isInitiation ? 1 : step.chain.length;
            const prevChain = step.chain.slice(0, step.isInitiation ? 1 : step.chain.length - 1);

            prevChain.slice().reverse().forEach((aa, i) => {
                const color = amino_acids.find(a => a.aa === aa)?.color || "#ffffff";
                const cyNode = py - (i * 26);
                
                // Peptide bond line
                if (i > 0) {
                    ctx.beginPath();
                    ctx.moveTo(px, py - (i - 1) * 26 - 11);
                    ctx.lineTo(px, cyNode + 11);
                    ctx.strokeStyle = "#34d399";
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }

                // Amino Acid Bead
                ctx.beginPath();
                ctx.arc(px, cyNode, 11, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Label
                ctx.fillStyle = "#030712";
                ctx.font = "bold 9px 'Fira Code', monospace";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(aa, px, cyNode);
            });

            // ==========================================
            // 4. ACTIVE tRNA / RELEASE FACTOR
            // ==========================================
            if (step.activeTRNA) {
                ctx.save();
                ctx.globalAlpha = trnaAlpha;
                
                // Dock into P site for step 0 (Initiation), A site for subsequent elongation
                const tx = step.isInitiation ? -30 : 30;
                ctx.translate(tx, -38 + trnaY);

                // tRNA Body (L-shape / Cloverleaf adapter)
                ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
                ctx.strokeStyle = "#10b981";
                ctx.lineWidth = 2;
                ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
                ctx.shadowBlur = 10;

                ctx.beginPath();
                ctx.moveTo(-12, 0);
                ctx.lineTo(12, 0);
                ctx.lineTo(8, -34);
                ctx.lineTo(15, -42);
                ctx.lineTo(7, -46);
                ctx.lineTo(5, -55);
                ctx.lineTo(-5, -55);
                ctx.lineTo(-7, -46);
                ctx.lineTo(-15, -42);
                ctx.lineTo(-8, -34);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Anticodon Letters at bottom
                const antiText = amino_acids[step.codonIdx].anti;
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 11px 'Fira Code', monospace";
                ctx.textAlign = "center";
                ctx.fillText(antiText, 0, 13);

                // Hydrogen bond dotted lines to mRNA codon
                ctx.beginPath();
                ctx.setLineDash([2, 3]);
                ctx.strokeStyle = "#34d399";
                ctx.lineWidth = 2;
                ctx.moveTo(0, 16);
                ctx.lineTo(0, 26);
                ctx.stroke();
                ctx.setLineDash([]);

                // New Amino Acid sitting at CCA-3' end of tRNA
                if (!step.isInitiation) {
                    const aaData = amino_acids[step.codonIdx];
                    ctx.beginPath();
                    ctx.arc(0, -68, 12, 0, Math.PI * 2);
                    ctx.fillStyle = aaData.color;
                    ctx.shadowColor = aaData.color;
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    ctx.fillStyle = "#030712";
                    ctx.font = "bold 10px 'Fira Code', monospace";
                    ctx.fillText(aaData.aa, 0, -68);

                    // Peptide Bond Flash Effect during elongation
                    if (trnaAlpha > 0.8) {
                        ctx.beginPath();
                        ctx.moveTo(0, -68);
                        ctx.lineTo(-60, -105);
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
                        ctx.setLineDash([3, 3]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                }

                ctx.restore();
            } else if (step.isTermination) {
                // Release Factor (RF) symbol at A site
                ctx.save();
                ctx.translate(30, -35);
                ctx.fillStyle = "rgba(239, 68, 68, 0.45)";
                ctx.strokeStyle = "#ef4444";
                ctx.lineWidth = 2;
                ctx.shadowColor = "rgba(239, 68, 68, 0.6)";
                ctx.shadowBlur = 12;

                ctx.beginPath();
                ctx.roundRect(-20, -45, 40, 50, 8);
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 11px 'Orbitron', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("RF", 0, -26);
                ctx.font = "9px 'Rajdhani', sans-serif";
                ctx.fillStyle = "#fca5a5";
                ctx.fillText("Faktor Pelepas", 0, -12);
                ctx.restore();
            }
        } else {
            // ==========================================
            // 5. FINAL ASSEMBLED PROTEIN (Free floating)
            // ==========================================
            ctx.save();
            const floatY = -80 + Math.sin(floatAnimTime) * 10;
            const chainLen = step.chain.length;
            const spacing = Math.min(38, (displayWidth - 60) / chainLen);
            const startX = -((chainLen - 1) * spacing) / 2;

            // Halo glow behind assembled protein
            ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
            ctx.shadowBlur = 25;
            ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
            ctx.beginPath();
            ctx.roundRect(startX - 25, floatY - 35, (chainLen - 1) * spacing + 50, 70, 20);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Peptide Bond lines between all residues
            for (let i = 0; i < chainLen - 1; i++) {
                const cx1 = startX + i * spacing;
                const cx2 = startX + (i + 1) * spacing;
                ctx.beginPath();
                ctx.moveTo(cx1 + 13, floatY);
                ctx.lineTo(cx2 - 13, floatY);
                ctx.strokeStyle = "#34d399";
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            // Amino Acid Beads
            step.chain.forEach((aa, i) => {
                const item = amino_acids.find(a => a.aa === aa);
                const col = item ? item.color : "#10b981";
                const cxNode = startX + i * spacing;

                ctx.beginPath();
                ctx.arc(cxNode, floatY, 14, 0, Math.PI * 2);
                ctx.fillStyle = col;
                ctx.shadowColor = col;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.fillStyle = "#030712";
                ctx.font = "bold 10px 'Fira Code', monospace";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(aa, cxNode, floatY);
            });

            // Protein N-terminus (H2N) & C-terminus (COOH)
            ctx.font = "bold 11px 'Fira Code', monospace";
            ctx.fillStyle = "#38bdf8";
            ctx.fillText("H2N ─", startX - 35, floatY);
            ctx.fillStyle = "#f43f5e";
            ctx.fillText("─ COOH", startX + (chainLen - 1) * spacing + 40, floatY);

            ctx.fillStyle = "#a7f3d0";
            ctx.font = "12px 'Orbitron', sans-serif";
            ctx.fillText("RANTAI POLIPEPTIDA LENGKAP SIAP FOLDING", 0, floatY + 55);

            ctx.restore();
        }

        ctx.restore();

        animationFrame = requestAnimationFrame(draw);
    }

    // Auto Playback Loop
    function stepLoop() {
        if (!isPlaying) return;
        const speed = parseFloat(speedSlider ? speedSlider.value : 1);
        timer += speed;
        
        if (timer > 140) {
            timer = 0;
            if (currentStep < steps.length - 1) {
                currentStep++;
                trnaY = -60;
                trnaAlpha = 0;
                playSound('bond');
                updateUI();
            } else {
                isPlaying = false;
                btnPlay.innerHTML = '&#9658; Mulai Lagi';
            }
        }
        
        if (isPlaying) {
            setTimeout(stepLoop, 16);
        }
    }

    btnPlay.addEventListener('click', () => {
        if (currentStep === steps.length - 1) {
            currentStep = 0;
            trnaY = -60;
            trnaAlpha = 0;
            updateUI();
        }
        isPlaying = !isPlaying;
        if (isPlaying) {
            btnPlay.innerHTML = '&#10074;&#10074; Jeda';
            trnaY = -60;
            trnaAlpha = 0;
            playSound('step');
            stepLoop();
        } else {
            btnPlay.innerHTML = '&#9658; Lanjutkan';
            playSound('step');
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            trnaY = -60;
            trnaAlpha = 0;
            playSound('step');
            updateUI();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            trnaY = -60;
            trnaAlpha = 0;
            playSound('step');
            updateUI();
        }
    });

    // Initial setup
    resizeCanvas();
    updateUI();
});
