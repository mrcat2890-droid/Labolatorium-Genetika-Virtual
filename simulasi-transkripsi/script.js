const canvas = document.getElementById('sim-canvas');
const ctx = canvas.getContext('2d');

// Polyfill roundRect untuk kompatibilitas browser lama
if (!ctx.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (typeof r === 'number') r = [r, r, r, r];
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

// Responsif: ukuran canvas mengikuti container
function resizeCanvas() {
    const container = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', () => { resizeCanvas(); drawScene(); });
resizeCanvas();

// --- DATA SEKUENS DNA & mRNA ---
// Untai Pengkode / Coding Strand (Sense) dibaca 5' → 3'
const seqCoding = "ATGGCATACCGGAATTTGGCTGAATAA".split('');
// Untai Cetakan / Template Strand (Antisense) dibaca 3' → 5'
const seqTemplate = "TACCGTATGGCCTTAAACCGACTTATT".split('');
// mRNA identik dengan untai pengkode, namun T diganti U (Urasil)
const seqMRNA = seqCoding.map(b => b === 'T' ? 'U' : b);

const colors = {
    'A': '#38bdf8',
    'T': '#fbbf24',
    'G': '#22c55e',
    'C': '#ef4444',
    'U': '#f97316'
};

const stepsData = [
    {
        title: "1. Inisiasi",
        desc: "RNA Polimerase mengenali dan mengikat daerah promoter pada DNA."
    },
    {
        title: "2. Pembukaan Heliks",
        desc: "Heliks ganda DNA terbuka membentuk gelembung transkripsi."
    },
    {
        title: "3. Elongasi",
        desc: "Basa pada cetakan DNA dipasangkan dengan basa pada mRNA."
    },
    {
        title: "4. Terminasi",
        desc: "RNA Polimerase mencapai sinyal terminasi, mRNA dilepaskan."
    },
    {
        title: "5. Hasil Akhir",
        desc: "Untai mRNA lengkap terbentuk dan siap keluar dari nukleus."
    }
];

let currentStep = 0;
let isPlaying = false;
let animationFrame;
let globalTime = 0;
let speed = 1;

// Simulation State
let dnaSeparation = 0; // 0 to 1
let polyX = -100; // RNA Polymerase position
let elongationProgress = 0; // 0 to seqCoding.length
let terminatorReached = false;
let mrnaReleaseProgress = 0; // 0 to 1

// Dimensi yang dihitung ulang saat resize
function getDims() {
    const w = canvas.style.width ? parseInt(canvas.style.width) : 1200;
    const h = canvas.style.height ? parseInt(canvas.style.height) : 600;
    const scale = Math.min(w / 1200, h / 600);
    return {
        w, h, scale,
        startX: 150 * scale,
        baseXSpacing: 32 * scale,
        baseYCoding: h * 0.42,
        baseYTemplate: h * 0.58,
        bubbleWidth: 10 * 32 * scale
    };
}

document.getElementById('speed-slider').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
});

function drawNucleus() {
    const d = getDims();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(d.w / 2, d.h / 2, d.w * 0.48, d.h * 0.46, 0, 0, Math.PI * 2);
    ctx.setLineDash([15, 10]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();
    
    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = `${20 * d.scale}px Orbitron`;
    ctx.textAlign = 'center';
    ctx.fillText('NUKLEUS', d.w / 2, d.h * 0.07);
    ctx.restore();
}

function drawPolymerase(x, y, scale = 1) {
    if (x < 50 || x > 1100) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Create gradient
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
    grad.addColorStop(0, 'rgba(129, 140, 248, 0.8)');
    grad.addColorStop(1, 'rgba(129, 140, 248, 0.3)');
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 100, 120, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.9)';
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('RNA Polimerase', 0, -135);
    
    ctx.restore();
}

function getBaseY(index, isCoding) {
    const d = getDims();
    const x = d.startX + index * d.baseXSpacing;
    let sep = 0;
    
    if (dnaSeparation > 0) {
        // Calculate bubble
        const polyCenter = polyX;
        const dist = Math.abs(x - polyCenter);
        if (dist < d.bubbleWidth / 2) {
            // Parabola shape for bubble
            const bubbleHeight = 60 * d.scale;
            sep = bubbleHeight * (1 - Math.pow(dist / (d.bubbleWidth / 2), 2)) * dnaSeparation;
        }
    }
    
    return isCoding ? d.baseYCoding - sep : d.baseYTemplate + sep;
}

function drawBase(char, x, y, isBottom) {
    ctx.fillStyle = colors[char] || '#fff';
    
    const w = 20;
    const h = 26;
    
    ctx.save();
    ctx.translate(x, y);
    
    // Draw block
    ctx.beginPath();
    if (isBottom) {
        ctx.roundRect(-w/2, 0, w, h, 4);
    } else {
        ctx.roundRect(-w/2, -h, w, h, 4);
    }
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 0, isBottom ? h/2 : -h/2);
    
    ctx.restore();
}

function drawBackbone(pts, color) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
        const xc = (pts[i].x + pts[i-1].x) / 2;
        const yc = (pts[i].y + pts[i-1].y) / 2;
        ctx.quadraticCurveTo(pts[i-1].x, pts[i-1].y, xc, yc);
    }
    ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawNucleus();
    
    if (currentStep > 0 && currentStep < 4) {
        drawPolymerase(polyX, (baseYCoding + baseYTemplate) / 2);
    }
    
    const codingPts = [];
    const templatePts = [];
    
    for (let i = 0; i < seqCoding.length; i++) {
        const x = startX + i * baseXSpacing;
        const cy = getBaseY(i, true);
        const ty = getBaseY(i, false);
        
        codingPts.push({x, y: cy - 26});
        templatePts.push({x, y: ty + 26});
        
        if (ty - cy < 110) {
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.lineTo(x, ty);
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        drawBase(seqCoding[i], x, cy, false);
        drawBase(seqTemplate[i], x, ty, true);
    }
    
    drawBackbone(codingPts, '#cbd5e1');
    drawBackbone(templatePts, '#cbd5e1');
    
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'right';
    ctx.fillText("5'", startX - 25, baseYCoding - 15);
    ctx.fillText("3'", startX - 25, baseYTemplate + 25);
    
    ctx.textAlign = 'left';
    ctx.fillText("3'", startX + seqCoding.length * baseXSpacing + 10, baseYCoding - 15);
    ctx.fillText("5'", startX + seqCoding.length * baseXSpacing + 10, baseYTemplate + 25);
    
    ctx.textAlign = 'right';
    ctx.font = '12px Inter';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText("Coding (Sense)", startX - 55, baseYCoding - 15);
    ctx.fillText("Template (Antisense)", startX - 55, baseYTemplate + 25);
    
    if (currentStep >= 2) {
        drawMRNA();
    }
}

function drawMRNA() {
    const mrnaBaseY = baseYTemplate - 30;
    const finalY = 480;
    
    let currentY = mrnaBaseY;
    if (currentStep === 3) {
        currentY = mrnaBaseY + (finalY - mrnaBaseY) * mrnaReleaseProgress;
    } else if (currentStep === 4) {
        currentY = finalY;
    }

    const mrnaPts = [];
    
    const basesToDraw = Math.floor(elongationProgress);
    for (let i = 0; i < basesToDraw; i++) {
        const x = startX + i * baseXSpacing;
        
        let yPos = currentY;
        
        if (currentStep === 2 && polyX > x + bubbleWidth/2) {
            yPos = mrnaBaseY + 70; 
        }

        mrnaPts.push({x, y: yPos - 26});
        
        if (currentStep === 2 && x > polyX - bubbleWidth/2 && x <= polyX) {
            const ty = getBaseY(i, false);
            ctx.beginPath();
            ctx.moveTo(x, mrnaBaseY);
            ctx.lineTo(x, ty);
            ctx.setLineDash([2, 4]);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.setLineDash([]);
        }

        drawBase(seqMRNA[i], x, yPos, false);
    }
    
    if (mrnaPts.length > 0) {
        drawBackbone(mrnaPts, '#f472b6');
        
        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'right';
        ctx.fillText("5'", mrnaPts[0].x - 25, mrnaPts[0].y + 10);
        
        if (basesToDraw === seqMRNA.length) {
            ctx.textAlign = 'left';
            ctx.fillText("3'", mrnaPts[mrnaPts.length-1].x + 25, mrnaPts[mrnaPts.length-1].y + 10);
        }
    }
}

function updateState(dt) {
    if (!isPlaying) return;
    
    const stepDt = dt * speed * 0.05;
    
    if (currentStep === 0) {
        polyX += (startX - polyX) * 0.05 * speed;
        if (Math.abs(polyX - startX) < 5) {
            polyX = startX;
            isPlaying = false;
            updateUI();
        }
    } else if (currentStep === 1) {
        dnaSeparation = Math.min(1, dnaSeparation + stepDt * 0.5);
        if (dnaSeparation >= 1) {
            isPlaying = false;
            updateUI();
        }
    } else if (currentStep === 2) {
        elongationProgress += stepDt * 0.5;
        if (elongationProgress >= seqCoding.length) {
            elongationProgress = seqCoding.length;
            isPlaying = false;
            updateUI();
        }
        polyX = startX + elongationProgress * baseXSpacing;
        
        const currIdx = Math.floor(elongationProgress);
        if (currIdx < seqCoding.length && currIdx >= 0) {
            document.getElementById('step-desc').innerText = `Basa ${seqTemplate[currIdx]} pada cetakan DNA dipasangkan dengan basa ${seqMRNA[currIdx]} pada mRNA.`;
        }
        
    } else if (currentStep === 3) {
        mrnaReleaseProgress = Math.min(1, mrnaReleaseProgress + stepDt * 0.5);
        polyX += stepDt * 100;
        dnaSeparation = Math.max(0, dnaSeparation - stepDt * 0.5);
        
        if (mrnaReleaseProgress >= 1) {
            isPlaying = false;
            updateUI();
        }
    }
}

function loop(timestamp) {
    const dt = globalTime ? timestamp - globalTime : 0;
    globalTime = timestamp;
    
    updateState(dt);
    drawScene();
    
    animationFrame = requestAnimationFrame(loop);
}

function setStep(step) {
    currentStep = step;
    isPlaying = false;
    
    if (step === 0) {
        dnaSeparation = 0;
        polyX = -100;
        elongationProgress = 0;
        mrnaReleaseProgress = 0;
    } else if (step === 1) {
        dnaSeparation = 0;
        polyX = startX;
        elongationProgress = 0;
        mrnaReleaseProgress = 0;
    } else if (step === 2) {
        dnaSeparation = 1;
        polyX = startX;
        elongationProgress = 0;
        mrnaReleaseProgress = 0;
    } else if (step === 3) {
        dnaSeparation = 1;
        polyX = startX + seqCoding.length * baseXSpacing;
        elongationProgress = seqCoding.length;
        mrnaReleaseProgress = 0;
    } else if (step === 4) {
        dnaSeparation = 0;
        polyX = 2000;
        elongationProgress = seqCoding.length;
        mrnaReleaseProgress = 1;
    }
    
    updateUI();
    drawScene();
}

function updateUI() {
    document.getElementById('step-title').innerText = stepsData[currentStep].title;
    
    if (currentStep !== 2 || !isPlaying) {
        document.getElementById('step-desc').innerText = stepsData[currentStep].desc;
    }
    
    document.getElementById('step-indicator').innerText = `Langkah ${currentStep + 1} / 5`;
    document.getElementById('progress-fill').style.width = `${((currentStep + 1) / 5) * 100}%`;
    
    document.getElementById('btn-prev').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === 4;
    
    const playBtn = document.getElementById('btn-play');
    if (currentStep === 4) {
        playBtn.disabled = true;
        playBtn.innerText = 'Selesai';
    } else {
        playBtn.disabled = false;
        playBtn.innerText = isPlaying ? 'Pause' : 'Play';
    }
}

document.getElementById('btn-prev').addEventListener('click', () => {
    if (currentStep > 0) setStep(currentStep - 1);
});

document.getElementById('btn-next').addEventListener('click', () => {
    if (currentStep < 4) {
        setStep(currentStep + 1);
    }
});

document.getElementById('btn-play').addEventListener('click', () => {
    isPlaying = !isPlaying;
    updateUI();
});

setStep(0);
requestAnimationFrame(loop);
