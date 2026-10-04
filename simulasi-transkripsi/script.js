// ====================================================================
// GEN-OS // BIO-CORE: TRANSCRIPTION (RNA SYNTHESIS LAB) ENGINE
// Biological DNA Template -> mRNA Synthesis Simulation
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
        playTone(540, 'sine', 0.08, 0.08);
    } else if (type === 'polymerize') {
        playTone(680, 'triangle', 0.06, 0.07);
    } else if (type === 'finish') {
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
            setTimeout(() => playTone(freq, 'sine', 0.25, 0.1), idx * 80);
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
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
    playSound('step');
};

window.closeTutorialModal = function() {
    const modal = document.getElementById('modal-tutorial');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
    playSound('step');
};

window.openLiteratureModal = function() {
    const modal = document.getElementById('modal-literature');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
    playSound('step');
};

window.closeLiteratureModal = function() {
    const modal = document.getElementById('modal-literature');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
    playSound('step');
};

// Keyboard listener for ESC and backdrop click to close modals
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeTutorialModal();
        window.closeLiteratureModal();
    }
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'modal-tutorial') {
        window.closeTutorialModal();
    } else if (e.target && e.target.id === 'modal-literature') {
        window.closeLiteratureModal();
    }
});

// Polyfill roundRect for older canvas implementations
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (typeof r === 'number') r = [r, r, r, r];
        else if (!Array.isArray(r)) r = [4, 4, 4, 4];
        this.moveTo(x + r[0], y);
        this.lineTo(x + w - r[1], y);
        this.quadraticCurveTo(x + w, y, x + w, y + r[1]);
        this.lineTo(x + w, y + h - r[2]);
        this.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
        this.lineTo(x + r[3], y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r[3]);
        this.lineTo(x, y + r[0]);
        this.quadraticCurveTo(x, y, x + r[0], y);
        this.closePath();
    };
}

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
    
    const curTemplateEl = document.getElementById('current-template-base');
    const curMrnaEl = document.getElementById('current-mrna-base');
    const curBondEl = document.getElementById('current-bond-type');
    const mrnaLenEl = document.getElementById('mrna-length');
    const mrnaStreamEl = document.getElementById('mrna-chain-stream');

    // Biological Sequences (27 Nukleotida = 9 Kodon)
    // Coding Strand (Sense): 5' -> 3'
    const seqCoding = "ATGGCATACCGGAATTTGGCTGAATAA".split('');
    // Template Strand (Antisense): 3' -> 5'
    const seqTemplate = "TACCGTATGGCCTTAAACCGACTTATT".split('');
    // mRNA Sequence: 5' -> 3' (T digantikan U)
    const seqMRNA = seqCoding.map(b => b === 'T' ? 'U' : b);

    const baseColors = {
        'A': { bg: '#38bdf8', text: '#030712', name: 'Adenin' },
        'T': { bg: '#fbbf24', text: '#030712', name: 'Timin' },
        'G': { bg: '#22c55e', text: '#030712', name: 'Guanin' },
        'C': { bg: '#f43f5e', text: '#ffffff', name: 'Sitosin' },
        'U': { bg: '#f97316', text: '#ffffff', name: 'Urasil' }
    };

    const stepsData = [
        {
            title: "1. Inisiasi: Pengenalan Promoter",
            desc: "RNA Polimerase mengenali dan mengikat sekuens promoter (TATA Box) pada DNA. Enzim bersiap memisahkan pasangan basa untuk mengakses untai cetakan."
        },
        {
            title: "2. Pembukaan Heliks: Gelembung Transkripsi",
            desc: "Ikatan hidrogen antar-untai DNA diputus. Terbentuk <i>transcription bubble</i> sepanjang ~12-14 pasang basa, memisahkan untai pengkode (atas) dan untai cetakan (bawah)."
        },
        {
            title: "3. Elongasi: Polimerisasi Rantai mRNA",
            desc: "RNA Polimerase bergerak sepanjang untai cetakan (3' &rarr; 5') dan merangkai ribonukleotida komplementer (rNTP) menjadi rantai mRNA baru (5' &rarr; 3'). Adenin berpasangan dengan Urasil."
        },
        {
            title: "4. Terminasi: Pengenalan Sinyal Stop",
            desc: "RNA Polimerase mencapai sekuens terminasi. Transkripsi dihentikan, enzim melepaskan diri, dan untai mRNA lengkap memisahkan diri dari untai cetakan."
        },
        {
            title: "5. Hasil Akhir: mRNA Siap Translasi",
            desc: "Untai mRNA lengkap (27 nt) telah disintesis. Heliks ganda DNA menutup kembali secara sempurna. Molekul mRNA siap ditranspor ke sitoplasma untuk translasi protein."
        }
    ];

    let currentStep = 0;
    let isPlaying = false;
    let animationFrame;
    let globalTime = 0;
    let speed = 1.0;

    // Simulation Physics State
    let dnaSeparation = 0; // 0 to 1
    let polyX = -100;
    let elongationProgress = 0; // 0 to seqCoding.length
    let mrnaReleaseProgress = 0; // 0 to 1
    let floatAnimTime = 0;

    // Dynamic Camera Tracking State (Smooth Follow on Mobile)
    let cameraX = 0;
    let targetCameraX = 0;
    let maxScrollX = 0;
    let isUserPanning = false;
    let panStartX = 0;
    let panCameraStartX = 0;
    let userPanCooldown = 0;
    let isMobile = false;

    // Ambient Nucleoplasm Particles (Floating rNTPs inside nucleus)
    const nucleoplasmParticles = Array.from({ length: 16 }, () => ({
        x: Math.random() * 1000,
        y: Math.random() * 400,
        char: ['U', 'A', 'G', 'C'][Math.floor(Math.random() * 4)],
        size: 9 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: 0.18 + Math.random() * 0.25
    }));

    // Canvas layout dimensions
    let dims = {
        w: 1000,
        h: 460,
        scale: 1,
        startX: 140,
        baseXSpacing: 28,
        baseYCoding: 180,
        baseYTemplate: 260,
        bubbleWidth: 260
    };

    function updateCameraTarget(immediate = false) {
        if (maxScrollX <= 0) {
            targetCameraX = 0;
            if (immediate) cameraX = 0;
            return;
        }

        // Camera tracks the active biological action
        if (currentStep === 0) {
            targetCameraX = 0;
        } else if (currentStep === 1) {
            targetCameraX = Math.max(0, Math.min(maxScrollX, polyX - dims.w * 0.38));
        } else if (currentStep === 2) {
            // Elongation: Center RNA Polymerase smoothly as it polymerizes
            targetCameraX = Math.max(0, Math.min(maxScrollX, polyX - dims.w * 0.42));
        } else if (currentStep === 3) {
            // Termination: Focus on terminator end
            targetCameraX = maxScrollX;
        } else if (currentStep === 4) {
            // Final result: Show complete mRNA in the center
            const centerGeneX = dims.startX + (seqCoding.length * dims.baseXSpacing) / 2;
            targetCameraX = Math.max(0, Math.min(maxScrollX, centerGeneX - dims.w / 2));
        }

        if (immediate) {
            cameraX = targetCameraX;
        }
    }

    function resizeCanvas() {
        const container = document.getElementById('sim-container');
        if (!container) return;
        
        isMobile = window.innerWidth < 768;
        const rect = container.getBoundingClientRect();
        
        // Accurate inner width calculation avoiding overflow
        const padX = isMobile ? 24 : 32;
        const displayW = Math.max(280, Math.floor(rect.width - padX));
        
        // Proportionate height for mobile devices to keep nucleus & controls visible
        const displayH = isMobile 
            ? Math.min(360, Math.max(280, Math.floor(window.innerHeight * 0.38))) 
            : Math.max(380, rect.height - 110);
        
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        canvas.style.width = `${displayW}px`;
        canvas.style.height = `${displayH}px`;
        
        ctx.resetTransform();
        ctx.scale(dpr, dpr);

        // Responsive scaling
        const scale = Math.min(displayW / 960, displayH / 440);
        
        const totalBases = seqCoding.length;
        let baseXSpacing = 28;
        let startX = 85;
        
        if (displayW >= 720) {
            // Desktop / Wide viewport: comfortably fit entire strand and center it
            const availW = displayW - 130;
            baseXSpacing = Math.min(28, Math.max(22, Math.floor(availW / totalBases)));
            const totalDnaW = totalBases * baseXSpacing;
            startX = Math.floor((displayW - totalDnaW) / 2);
            maxScrollX = 0;
            cameraX = 0;
            targetCameraX = 0;
        } else {
            // Mobile / Narrow viewport: keep bases legible and large enough, camera smoothly tracks
            startX = 75;
            baseXSpacing = isMobile ? 25 : 27;
            const totalStrandSpan = startX + totalBases * baseXSpacing + 65;
            maxScrollX = Math.max(0, totalStrandSpan - displayW);
        }

        dims = {
            w: displayW,
            h: displayH,
            scale: scale,
            startX: startX,
            baseXSpacing: baseXSpacing,
            baseYCoding: displayH * 0.38,
            baseYTemplate: displayH * 0.58,
            bubbleWidth: baseXSpacing * 8.5
        };

        const camBadge = document.getElementById('camera-badge');
        if (camBadge) {
            if (maxScrollX > 0) {
                camBadge.classList.remove('hidden');
            } else {
                camBadge.classList.add('hidden');
            }
        }

        updateCameraTarget(true);
        drawScene();
    }
    window.addEventListener('resize', resizeCanvas);

    // Speed Slider listener
    if (speedSlider && speedLabel) {
        speedSlider.addEventListener('input', (e) => {
            speed = parseFloat(e.target.value);
            speedLabel.textContent = `${speed.toFixed(1)}x`;
        });
    }

    // Update base pairing table highlight
    function updatePairingTableHighlight(templateBase) {
        const table = document.getElementById('pairing-table');
        if (!table) return;
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(r => r.classList.remove('hl'));

        if (!templateBase || templateBase === '-') return;
        const activeRow = document.getElementById(`row-${templateBase}`);
        if (activeRow) {
            activeRow.classList.add('hl');
        }
    }

    // Update Stage Buttons
    function updateStageButtons() {
        const stageBtns = document.querySelectorAll('#stage-buttons .quick-btn');
        stageBtns.forEach((btn, idx) => {
            if (idx === currentStep) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Update mRNA stream chips
    function updateMRNAStream(count) {
        if (!mrnaStreamEl) return;
        if (count <= 0) {
            mrnaStreamEl.innerHTML = '<span class="text-slate-500 italic">Belum ada nukleotida disintesis</span>';
            mrnaLenEl.textContent = '0 / 27 Nt';
            return;
        }

        mrnaLenEl.textContent = `${count} / 27 Nukleotida`;
        const items = [];
        for (let i = 0; i < count; i++) {
            const b = seqMRNA[i];
            const col = baseColors[b] || { bg: '#f97316', text: '#fff' };
            const isLatest = (i === count - 1 && currentStep === 2);
            const isStartCodon = (i < 3);
            const borderGlow = isLatest ? 'ring-2 ring-amber-400 animate-pulse' : (isStartCodon ? 'border-emerald-400' : 'border-slate-700');
            
            items.push(`
                <span class="inline-flex items-center gap-0.5">
                    <span class="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] border transition ${borderGlow}" 
                          style="background: ${col.bg}; color: ${col.text};" title="Kodon ${Math.floor(i/3)+1}">
                        ${b}
                    </span>
                    ${(i + 1) % 3 === 0 && i < count - 1 ? '<span class="text-slate-600 font-mono text-[9px] mx-0.5">|</span>' : ''}
                </span>
            `);
        }
        mrnaStreamEl.innerHTML = items.join('');
    }

    function updateUI() {
        stepTitle.innerHTML = stepsData[currentStep].title;
        stepDesc.innerHTML = stepsData[currentStep].desc;

        stepCounter.textContent = `Langkah ${currentStep + 1} / 5`;
        progressFill.style.width = `${((currentStep) / 4) * 100}%`;

        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === 4;

        if (currentStep === 4) {
            isPlaying = false;
            btnPlay.innerHTML = '&#9658; Mulai Lagi';
            btnPlay.disabled = false;
        } else if (isPlaying) {
            btnPlay.innerHTML = '&#10074;&#10074; Jeda';
            btnPlay.disabled = false;
        } else {
            btnPlay.innerHTML = '&#9658; Mulai';
            btnPlay.disabled = false;
        }

        // Realtime monitor values
        const currIdx = Math.min(seqTemplate.length - 1, Math.max(0, Math.floor(elongationProgress)));
        if (currentStep === 2) {
            const tBase = seqTemplate[currIdx];
            const mBase = seqMRNA[currIdx];
            curTemplateEl.textContent = tBase;
            curMrnaEl.textContent = mBase;
            const hBonds = (tBase === 'G' || tBase === 'C') ? '3 Ikatan H (G≡C)' : '2 Ikatan H (A=U)';
            curBondEl.textContent = hBonds;
            updatePairingTableHighlight(tBase);
            updateMRNAStream(currIdx + 1);
        } else if (currentStep >= 3) {
            curTemplateEl.textContent = '—';
            curMrnaEl.textContent = 'LENGKAP';
            curBondEl.textContent = 'Fosfodiester Utuh';
            updatePairingTableHighlight(null);
            updateMRNAStream(seqMRNA.length);
        } else {
            curTemplateEl.textContent = '—';
            curMrnaEl.textContent = '—';
            curBondEl.textContent = 'Heliks Ganda (H-Bond)';
            updatePairingTableHighlight(null);
            updateMRNAStream(0);
        }

        updateStageButtons();
    }

    // Expose jumpToStep globally
    window.jumpToStep = function(stepIdx) {
        if (stepIdx >= 0 && stepIdx < 5) {
            setStep(stepIdx);
            playSound('step');
        }
    };

    function setStep(step) {
        currentStep = step;
        isPlaying = false;

        const { startX, baseXSpacing } = dims;

        if (step === 0) {
            dnaSeparation = 0;
            polyX = startX - 80;
            elongationProgress = 0;
            mrnaReleaseProgress = 0;
        } else if (step === 1) {
            dnaSeparation = 1;
            polyX = startX + 60;
            elongationProgress = 0;
            mrnaReleaseProgress = 0;
        } else if (step === 2) {
            dnaSeparation = 1;
            polyX = startX + 60;
            elongationProgress = 1;
            mrnaReleaseProgress = 0;
        } else if (step === 3) {
            dnaSeparation = 0.5;
            polyX = startX + seqCoding.length * baseXSpacing + 30;
            elongationProgress = seqCoding.length;
            mrnaReleaseProgress = 0.4;
        } else if (step === 4) {
            dnaSeparation = 0;
            polyX = startX + seqCoding.length * baseXSpacing + 60;
            elongationProgress = seqCoding.length;
            mrnaReleaseProgress = 1;
            playSound('finish');
        }

        updateCameraTarget(false);
        updateUI();
        drawScene();
    }

    function getBaseY(index, isCoding) {
        const x = dims.startX + index * dims.baseXSpacing;
        let sep = 0;
        
        if (dnaSeparation > 0) {
            const dist = Math.abs(x - polyX);
            if (dist < dims.bubbleWidth / 2) {
                const bubbleHeight = 55 * dims.scale;
                sep = bubbleHeight * (1 - Math.pow(dist / (dims.bubbleWidth / 2), 2)) * dnaSeparation;
            }
        }
        
        return isCoding ? (dims.baseYCoding - sep) : (dims.baseYTemplate + sep);
    }

    function drawNucleus() {
        ctx.save();
        
        // Nuclear matrix boundary fits comfortably inside canvas margins
        const padX = Math.max(10, Math.floor(14 * dims.scale));
        const padY = Math.max(8, Math.floor(12 * dims.scale));
        const radiusX = (dims.w / 2) - padX;
        const radiusY = (dims.h / 2) - padY;
        
        // Draw dashed nuclear envelope (Membran Inti Sel)
        ctx.beginPath();
        ctx.ellipse(dims.w / 2, dims.h / 2, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.setLineDash([10, 7]);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.32)';
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Nuclear matrix subtle atmospheric glow
        const nucGrad = ctx.createRadialGradient(dims.w / 2, dims.h / 2, 30, dims.w / 2, dims.h / 2, radiusX);
        nucGrad.addColorStop(0, 'rgba(255, 109, 0, 0.04)');
        nucGrad.addColorStop(0.7, 'rgba(10, 18, 38, 0.25)');
        nucGrad.addColorStop(1, 'rgba(245, 158, 11, 0.09)');
        ctx.fillStyle = nucGrad;
        ctx.fill();

        // Nuclear pores accent points along the envelope
        ctx.fillStyle = 'rgba(245, 158, 11, 0.55)';
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
            const px = dims.w / 2 + Math.cos(a) * radiusX;
            const py = dims.h / 2 + Math.sin(a) * radiusY;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Nucleus Label with sleek pill backdrop so it looks ultra crisp and never clashes
        const labelText = 'NUKLEUS SEL // MATRIKS INTI';
        ctx.font = `bold ${Math.max(9, Math.floor(10.5 * dims.scale))}px 'Orbitron', sans-serif`;
        const textW = ctx.measureText(labelText).width;
        
        ctx.fillStyle = 'rgba(8, 14, 30, 0.88)';
        ctx.beginPath();
        ctx.roundRect((dims.w - textW) / 2 - 8, padY + 6, textW + 16, 17, 4);
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, dims.w / 2, padY + 15);
        
        ctx.restore();
    }

    function drawNucleoplasmParticles() {
        ctx.save();
        nucleoplasmParticles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 10) p.x = dims.w - 10;
            if (p.x > dims.w - 10) p.x = 10;
            if (p.y < 35) p.y = dims.h - 35;
            if (p.y > dims.h - 35) p.y = 35;

            const col = baseColors[p.char] || { bg: '#ff9100' };
            ctx.fillStyle = col.bg;
            ctx.globalAlpha = p.alpha * 0.4;
            ctx.font = `bold ${Math.floor(p.size * dims.scale)}px 'Fira Code', monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(p.char, p.x, p.y);
        });
        ctx.restore();
    }

    function drawPolymerase(x, y) {
        ctx.save();
        ctx.translate(x, y);

        // Enzyme Main Glow & Body
        const r = 55 * dims.scale;
        const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, r);
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
        grad.addColorStop(0.6, 'rgba(217, 119, 6, 0.4)');
        grad.addColorStop(1, 'rgba(180, 83, 9, 0.15)');

        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.3, r, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();

        // Catalytic Core Indicator
        ctx.beginPath();
        ctx.arc(0, 0, 8 * dims.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#fef3c7';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Enzyme Label
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(10, 12 * dims.scale)}px 'Orbitron', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('RNA POLIMERASE II', 0, -r - 10);

        ctx.fillStyle = 'rgba(254, 243, 199, 0.8)';
        ctx.font = `${Math.max(8, 9 * dims.scale)}px 'Rajdhani', sans-serif`;
        ctx.fillText('Situs Katalitik Aktif', 0, r + 14);

        ctx.restore();
    }

    function drawBase(char, x, y, isBottom) {
        const col = baseColors[char] || { bg: '#ffffff', text: '#000000' };
        const w = Math.min(22, dims.baseXSpacing - 4);
        const h = 24 * dims.scale;

        ctx.save();
        ctx.translate(x, y);

        ctx.beginPath();
        if (isBottom) {
            ctx.roundRect(-w / 2, 0, w, h, 4);
        } else {
            ctx.roundRect(-w / 2, -h, w, h, 4);
        }
        ctx.fillStyle = col.bg;
        ctx.shadowColor = col.bg;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = col.text;
        ctx.font = `bold ${Math.max(10, 12 * dims.scale)}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(char, 0, isBottom ? h / 2 : -h / 2);

        ctx.restore();
    }

    function drawBackbone(pts, color, lineWidth = 3.5) {
        if (!pts || pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            const xc = (pts[i].x + pts[i - 1].x) / 2;
            const yc = (pts[i].y + pts[i - 1].y) / 2;
            ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    function drawStrandBadges(startX, baseXSpacing, baseYCoding, baseYTemplate) {
        const totalW = seqCoding.length * baseXSpacing;
        const endX = startX + totalW;

        ctx.save();
        ctx.textAlign = 'right';
        
        // Sense strand 5'
        ctx.font = `bold ${Math.max(10, Math.floor(11 * dims.scale))}px 'Fira Code', monospace`;
        ctx.fillStyle = '#38bdf8';
        ctx.fillText("5'", startX - 10, baseYCoding - 4);
        ctx.font = `${Math.max(9, Math.floor(10 * dims.scale))}px 'Rajdhani', sans-serif`;
        ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
        ctx.fillText("Sense", startX - 10, baseYCoding + 9);

        // Antisense strand 3'
        ctx.font = `bold ${Math.max(10, Math.floor(11 * dims.scale))}px 'Fira Code', monospace`;
        ctx.fillStyle = '#06b6d4';
        ctx.fillText("3'", startX - 10, baseYTemplate - 4);
        ctx.font = `${Math.max(9, Math.floor(10 * dims.scale))}px 'Rajdhani', sans-serif`;
        ctx.fillStyle = 'rgba(6, 182, 212, 0.9)';
        ctx.fillText("Cetakan", startX - 10, baseYTemplate + 9);

        // 3' End Labels
        ctx.textAlign = 'left';
        ctx.font = `bold ${Math.max(10, Math.floor(11 * dims.scale))}px 'Fira Code', monospace`;
        ctx.fillStyle = '#38bdf8';
        ctx.fillText("3'", endX + 10, baseYCoding - 4);
        
        ctx.fillStyle = '#06b6d4';
        ctx.fillText("5'", endX + 10, baseYTemplate + 10);
        ctx.restore();
    }

    function drawMiniMap() {
        if (maxScrollX <= 0) return;
        
        ctx.save();
        const mapW = Math.min(180, dims.w * 0.55);
        const mapH = 9;
        const mapX = (dims.w - mapW) / 2;
        const mapY = dims.h - 18;

        // Track background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1;
        ctx.roundRect(mapX, mapY, mapW, mapH, 4);
        ctx.fill();
        ctx.stroke();

        // Gene span (Promoter to Terminator)
        ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
        ctx.fillRect(mapX + 2, mapY + 3.5, mapW - 4, 2);

        // Active Camera Viewport box
        const totalSpan = dims.startX + seqCoding.length * dims.baseXSpacing + 70;
        const viewNormX = cameraX / totalSpan;
        const viewNormW = dims.w / totalSpan;
        const boxX = mapX + viewNormX * mapW;
        const boxW = Math.max(14, viewNormW * mapW);

        ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1;
        ctx.roundRect(Math.max(mapX, boxX), mapY + 1, Math.min(mapW - (boxX - mapX), boxW), mapH - 2, 2);
        ctx.fill();
        ctx.stroke();

        // RNA Polymerase Pip indicator
        if (currentStep > 0 && currentStep < 4) {
            const polyNorm = Math.max(0, Math.min(1, (polyX - dims.startX) / (seqCoding.length * dims.baseXSpacing)));
            const pipX = mapX + 3 + polyNorm * (mapW - 6);
            ctx.fillStyle = '#f59e0b';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(pipX, mapY + mapH / 2, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Labels: 5' (Promotor) and 3' (Terminator)
        ctx.font = "8px 'Fira Code', monospace";
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.textAlign = 'right';
        ctx.fillText("5' Promotor", mapX - 5, mapY + mapH - 1);
        ctx.textAlign = 'left';
        ctx.fillText("Terminator 3'", mapX + mapW + 5, mapY + mapH - 1);

        ctx.restore();
    }

    function drawScene() {
        ctx.clearRect(0, 0, dims.w, dims.h);
        floatAnimTime += 0.04;

        // 1. Draw Nuclear Envelope & Matrix (Stationary in canvas viewport)
        drawNucleus();
        drawNucleoplasmParticles();

        // 2. Draw Molecular Elements (In Camera Coordinate Space)
        ctx.save();
        ctx.translate(-Math.round(cameraX), 0);

        const { startX, baseXSpacing, baseYCoding, baseYTemplate } = dims;

        // Draw RNA Polymerase if in active steps
        if (currentStep > 0 && currentStep < 4) {
            drawPolymerase(polyX, (baseYCoding + baseYTemplate) / 2);
        }

        const codingPts = [];
        const templatePts = [];

        // Draw DNA Strands
        for (let i = 0; i < seqCoding.length; i++) {
            const x = startX + i * baseXSpacing;
            const cy = getBaseY(i, true);
            const ty = getBaseY(i, false);

            codingPts.push({ x, y: cy - 22 * dims.scale });
            templatePts.push({ x, y: ty + 22 * dims.scale });

            // Hydrogen bonding lines between intact DNA
            const sepDist = ty - cy;
            if (sepDist < 95 * dims.scale) {
                ctx.beginPath();
                ctx.moveTo(x, cy);
                ctx.lineTo(x, ty);
                ctx.setLineDash([3, 4]);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.setLineDash([]);
            }

            drawBase(seqCoding[i], x, cy, false);
            drawBase(seqTemplate[i], x, ty, true);
        }

        // DNA Backbones
        drawBackbone(codingPts, '#64748b', 3.5);
        drawBackbone(templatePts, '#06b6d4', 3.5);

        // DNA Strand End Markers (5' and 3')
        drawStrandBadges(startX, baseXSpacing, baseYCoding, baseYTemplate);

        // Draw mRNA if in Elongation, Termination, or Final steps
        if (currentStep >= 2) {
            drawMRNA();
        }

        ctx.restore();

        // 3. Draw MiniMap / Tracking Overlay in canvas space
        drawMiniMap();
    }

    function drawMRNA() {
        const { startX, baseXSpacing, baseYTemplate } = dims;
        const mrnaBaseY = baseYTemplate - 16 * dims.scale;
        const finalY = dims.h * 0.76;

        let currentY = mrnaBaseY;
        if (currentStep === 3) {
            currentY = mrnaBaseY + (finalY - mrnaBaseY) * mrnaReleaseProgress;
        } else if (currentStep === 4) {
            currentY = finalY + Math.sin(floatAnimTime) * 5;
        }

        const mrnaPts = [];
        const basesToDraw = Math.floor(elongationProgress);

        for (let i = 0; i < basesToDraw; i++) {
            const x = startX + i * baseXSpacing;
            let yPos = currentY;

            // Outside bubble curvature during active transcription
            if (currentStep === 2 && polyX > x + dims.bubbleWidth / 2) {
                yPos = mrnaBaseY + 42 * dims.scale;
            }

            mrnaPts.push({ x, y: yPos - 18 * dims.scale });

            // Hybridization dotted lines between mRNA and template inside catalytic bubble
            if (currentStep === 2 && x > polyX - dims.bubbleWidth / 2 && x <= polyX) {
                const ty = getBaseY(i, false);
                ctx.beginPath();
                ctx.moveTo(x, mrnaBaseY);
                ctx.lineTo(x, ty);
                ctx.setLineDash([2, 3]);
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 1.8;
                ctx.stroke();
                ctx.setLineDash([]);
            }

            drawBase(seqMRNA[i], x, yPos, false);
        }

        if (mrnaPts.length > 0) {
            // mRNA Ribose-phosphate backbone (Vibrant Neon Rose/Orange)
            drawBackbone(mrnaPts, '#f43f5e', 4);

            ctx.fillStyle = '#f43f5e';
            ctx.font = `bold ${Math.max(10, Math.floor(11 * dims.scale))}px 'Fira Code', monospace`;
            ctx.textAlign = 'right';
            ctx.fillText("5' mRNA", mrnaPts[0].x - 14, mrnaPts[0].y + 5);

            if (basesToDraw === seqMRNA.length) {
                ctx.textAlign = 'left';
                ctx.fillText("3' poly(A)", mrnaPts[mrnaPts.length - 1].x + 14, mrnaPts[mrnaPts.length - 1].y + 5);
            }
        }
    }

    // Main animation state update
    function updateState(dt) {
        // Smooth camera tracking interpolation
        if (!isUserPanning && maxScrollX > 0) {
            const now = Date.now();
            if (now > userPanCooldown) {
                updateCameraTarget(false);
                const lerpRate = Math.min(1, (dt / 16) * 0.08);
                cameraX += (targetCameraX - cameraX) * lerpRate;
                cameraX = Math.max(0, Math.min(maxScrollX, cameraX));
            }
        }

        if (!isPlaying) return;

        const { startX, baseXSpacing } = dims;
        const stepDt = dt * speed * 0.05;

        if (currentStep === 0) {
            polyX += (startX + 60 - polyX) * 0.05 * speed;
            if (Math.abs(polyX - (startX + 60)) < 4) {
                polyX = startX + 60;
                currentStep = 1;
                playSound('step');
                updateUI();
            }
        } else if (currentStep === 1) {
            dnaSeparation = Math.min(1, dnaSeparation + stepDt * 0.08);
            if (dnaSeparation >= 1) {
                dnaSeparation = 1;
                currentStep = 2;
                elongationProgress = 1;
                playSound('polymerize');
                updateUI();
            }
        } else if (currentStep === 2) {
            const oldIdx = Math.floor(elongationProgress);
            elongationProgress += stepDt * 0.18;
            const newIdx = Math.floor(elongationProgress);

            if (newIdx > oldIdx && newIdx < seqCoding.length) {
                playSound('polymerize');
            }

            polyX = startX + elongationProgress * baseXSpacing;

            if (elongationProgress >= seqCoding.length) {
                elongationProgress = seqCoding.length;
                currentStep = 3;
                playSound('step');
                updateUI();
            } else {
                updateUI();
            }
        } else if (currentStep === 3) {
            mrnaReleaseProgress = Math.min(1, mrnaReleaseProgress + stepDt * 0.05);
            polyX += stepDt * 20;
            dnaSeparation = Math.max(0, dnaSeparation - stepDt * 0.08);

            if (mrnaReleaseProgress >= 1) {
                mrnaReleaseProgress = 1;
                currentStep = 4;
                isPlaying = false;
                playSound('finish');
                updateUI();
            }
        }
    }

    function loop(timestamp) {
        const dt = globalTime ? timestamp - globalTime : 16;
        globalTime = timestamp;

        updateState(dt);
        drawScene();

        animationFrame = requestAnimationFrame(loop);
    }

    // Pointer / Touch Events for interactive panning
    canvas.addEventListener('pointerdown', (e) => {
        if (maxScrollX <= 0) return;
        isUserPanning = true;
        panStartX = e.clientX;
        panCameraStartX = cameraX;
        canvas.setPointerCapture(e.pointerId);
        
        const hint = document.getElementById('swipe-hint');
        if (hint) hint.classList.add('opacity-0');
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!isUserPanning) return;
        const deltaX = e.clientX - panStartX;
        cameraX = Math.max(0, Math.min(maxScrollX, panCameraStartX - deltaX));
        drawScene();
    });

    const endPan = (e) => {
        if (!isUserPanning) return;
        isUserPanning = false;
        try {
            canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
        userPanCooldown = Date.now() + 2500;
    };

    canvas.addEventListener('pointerup', endPan);
    canvas.addEventListener('pointercancel', endPan);
    canvas.addEventListener('pointerleave', endPan);

    // Button event listeners
    btnPlay.addEventListener('click', () => {
        if (currentStep === 4) {
            setStep(0);
        }
        isPlaying = !isPlaying;
        playSound('step');
        updateUI();
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < 4) {
            setStep(currentStep + 1);
            playSound('step');
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            setStep(currentStep - 1);
            playSound('step');
        }
    });

    // Initialize
    resizeCanvas();
    setStep(0);
    requestAnimationFrame(loop);
});
