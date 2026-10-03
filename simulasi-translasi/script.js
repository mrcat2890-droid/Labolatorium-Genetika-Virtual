document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('sim-canvas');
    const ctx = canvas.getContext('2d');
    
    // UI Elements
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnPlay = document.getElementById('btn-play');
    const speedSlider = document.getElementById('speed-slider');
    const progressFill = document.getElementById('progress-fill');
    const stepCounter = document.getElementById('step-counter');
    
    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-description');
    const curCodonEl = document.getElementById('current-codon');
    const curAnticodonEl = document.getElementById('current-anticodon');
    const curAaEl = document.getElementById('current-aa');
    const chainEl = document.getElementById('polypeptide-chain');

    // Resize canvas
    function resizeCanvas() {
        const container = document.getElementById('sim-container');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        draw();
    }
    window.addEventListener('resize', resizeCanvas);

    // Data
    const mRNA_sequence = ["AUG", "GCA", "UAC", "CGG", "AAU", "UUG", "GCU", "GAA", "UAA"];
    const amino_acids = [
        { codon: "AUG", anti: "UAC", aa: "Met", color: "#f59e0b" },
        { codon: "GCA", anti: "CGU", aa: "Ala", color: "#06b6d4" },
        { codon: "UAC", anti: "AUG", aa: "Tyr", color: "#8b5cf6" },
        { codon: "CGG", anti: "GCC", aa: "Arg", color: "#3b82f6" },
        { codon: "AAU", anti: "UUA", aa: "Asn", color: "#22c55e" },
        { codon: "UUG", anti: "AAC", aa: "Leu", color: "#ec4899" },
        { codon: "GCU", anti: "CGA", aa: "Ala", color: "#06b6d4" },
        { codon: "GAA", anti: "CUU", aa: "Glu", color: "#ef4444" },
        { codon: "UAA", anti: "-", aa: "STOP", color: "#475569" }
    ];

    const steps = [
        {
            title: "Inisiasi",
            desc: "Ribosom mengenali kodon awal AUG, tRNA pembawa Metionin masuk ke situs P.",
            codonIdx: 0,
            activeTRNA: true,
            chain: ["Met"]
        },
        ...amino_acids.slice(1, 8).map((data, i) => ({
            title: `Elongasi (Kodon ${data.codon})`,
            desc: `tRNA dengan antikodon ${data.anti} membawa asam amino ${data.aa} masuk ke situs A. Ikatan peptida terbentuk.`,
            codonIdx: i + 1,
            activeTRNA: true,
            chain: amino_acids.slice(0, i + 2).map(d => d.aa)
        })),
        {
            title: "Terminasi",
            desc: "Kodon terminasi UAA tercapai, faktor pelepas membebaskan rantai polipeptida. Ribosom terpisah.",
            codonIdx: 8,
            activeTRNA: false,
            chain: amino_acids.slice(0, 8).map(d => d.aa)
        },
        {
            title: "Hasil Akhir",
            desc: "Rantai polipeptida telah selesai disintesis: Met-Ala-Tyr-Arg-Asn-Leu-Ala-Glu",
            codonIdx: 8,
            activeTRNA: false,
            chain: amino_acids.slice(0, 8).map(d => d.aa),
            done: true
        }
    ];

    let currentStep = 0;
    let isPlaying = false;
    let animationFrame;
    let timer = 0;

    function updateUI() {
        const step = steps[currentStep];
        const aaData = amino_acids[step.codonIdx];
        
        stepTitle.textContent = step.title;
        stepDesc.textContent = step.desc;
        
        curCodonEl.textContent = aaData.codon;
        curAnticodonEl.textContent = step.activeTRNA ? aaData.anti : "-";
        curAaEl.textContent = step.activeTRNA ? aaData.aa : (step.done ? "-" : "STOP");
        
        chainEl.textContent = step.chain.join(" - ");
        
        stepCounter.textContent = `Langkah ${currentStep + 1} / ${steps.length}`;
        progressFill.style.width = `${((currentStep) / (steps.length - 1)) * 100}%`;
        
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === steps.length - 1;
        
        if (currentStep === steps.length - 1) {
            isPlaying = false;
            btnPlay.innerHTML = '<span class="icon">&#9658;</span> Mulai';
        }
    }

    // Animation vars
    let offsetTarget = 0;
    let offsetCurrent = 0;
    let trnaY = 0;
    let trnaAlpha = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        const step = steps[currentStep];
        
        // Update physics
        offsetTarget = -step.codonIdx * 60;
        offsetCurrent += (offsetTarget - offsetCurrent) * 0.1;
        
        if (step.activeTRNA && !step.done) {
            trnaY += (0 - trnaY) * 0.1;
            trnaAlpha += (1 - trnaAlpha) * 0.1;
        } else {
            trnaY += (-100 - trnaY) * 0.1;
            trnaAlpha += (0 - trnaAlpha) * 0.1;
        }

        const ribosomeAlpha = step.done ? 0 : 1;

        ctx.save();
        ctx.translate(cx, cy + 50);

        // Draw mRNA
        ctx.save();
        ctx.translate(offsetCurrent, 0);
        
        // Strip
        ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
        ctx.fillRect(-400, -20, 1000, 40);
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.strokeRect(-400, -20, 1000, 40);
        
        // 5' 3' labels
        ctx.fillStyle = "#38bdf8";
        ctx.font = "14px Inter";
        ctx.fillText("5'", -420, 5);
        ctx.fillText("3'", 620, 5);
        
        // Codons
        amino_acids.forEach((d, i) => {
            const x = i * 60;
            ctx.fillStyle = (i === step.codonIdx) ? "rgba(255, 255, 255, 0.3)" : "rgba(0,0,0,0.5)";
            ctx.fillRect(x - 28, -18, 56, 36);
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.strokeRect(x - 28, -18, 56, 36);
            
            ctx.fillStyle = "#fff";
            ctx.font = "bold 16px Inter";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(d.codon, x, 0);
        });
        
        ctx.restore();

        // Ribosome
        ctx.globalAlpha = step.done ? 0 : 1;
        // Large subunit
        ctx.fillStyle = "rgba(129, 140, 248, 0.3)";
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, -60, 100, 70, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Small subunit
        ctx.fillStyle = "rgba(2, 132, 199, 0.3)";
        ctx.strokeStyle = "#0284c7";
        ctx.beginPath();
        ctx.ellipse(0, 40, 80, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "14px Orbitron";
        ctx.fillText("P Site", -30, -60);
        ctx.fillText("A Site", 30, -60);

        ctx.globalAlpha = 1;
        
        // tRNA and Amino Acids
        if (!step.done) {
            // previous AA chain
            const px = -30;
            const py = -100;
            step.chain.slice(0, -1).reverse().forEach((aa, i) => {
                const color = amino_acids.find(a => a.aa === aa)?.color || "#fff";
                ctx.beginPath();
                ctx.arc(px, py - (i + 1) * 30, 12, 0, Math.PI*2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // connection
                ctx.beginPath();
                ctx.moveTo(px, py - i * 30 - 12);
                ctx.lineTo(px, py - (i+1) * 30 + 12);
                ctx.stroke();
            });
            
            if (step.activeTRNA) {
                // Current tRNA
                ctx.globalAlpha = trnaAlpha;
                ctx.save();
                // If it's initiation, put it in P site (-30), else A site (+30)
                const tx = currentStep === 0 ? -30 : 30;
                ctx.translate(tx, -40 + trnaY);
                
                // tRNA body
                ctx.fillStyle = "rgba(34, 197, 94, 0.5)";
                ctx.strokeStyle = "#22c55e";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-15, 0);
                ctx.lineTo(15, 0);
                ctx.lineTo(10, -40);
                ctx.lineTo(-10, -40);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                
                // Anticodon
                ctx.fillStyle = "#fff";
                ctx.font = "12px Inter";
                ctx.fillText(amino_acids[step.codonIdx].anti, 0, 15);
                
                // New AA
                const color = amino_acids[step.codonIdx].color;
                ctx.beginPath();
                ctx.arc(0, -50, 12, 0, Math.PI*2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.stroke();
                
                ctx.restore();
                ctx.globalAlpha = 1;
            }
        } else {
            // Final chain
            const py = -100;
            step.chain.forEach((aa, i) => {
                const color = amino_acids.find(a => a.aa === aa)?.color || "#fff";
                const cx = (i - step.chain.length/2) * 35;
                
                ctx.beginPath();
                ctx.arc(cx, py, 15, 0, Math.PI*2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = "#000";
                ctx.font = "10px Inter";
                ctx.fillText(aa, cx, py);
                
                if(i < step.chain.length - 1) {
                    ctx.beginPath();
                    ctx.moveTo(cx + 15, py);
                    ctx.lineTo(cx + 35 - 15, py);
                    ctx.stroke();
                }
            });
        }
        
        ctx.restore();

        animationFrame = requestAnimationFrame(draw);
    }

    function stepLoop() {
        if (!isPlaying) return;
        const speed = parseFloat(speedSlider.value);
        timer += speed;
        
        if (timer > 150) {
            timer = 0;
            if (currentStep < steps.length - 1) {
                currentStep++;
                trnaY = -50;
                trnaAlpha = 0;
                updateUI();
            } else {
                isPlaying = false;
                btnPlay.innerHTML = '<span class="icon">&#9658;</span> Mulai';
            }
        }
        
        if (isPlaying) {
            setTimeout(stepLoop, 16);
        }
    }

    btnPlay.addEventListener('click', () => {
        if (currentStep === steps.length - 1) {
            currentStep = 0;
            updateUI();
        }
        isPlaying = !isPlaying;
        if (isPlaying) {
            btnPlay.innerHTML = '<span class="icon">&#10074;&#10074;</span> Jeda';
            trnaY = -50;
            trnaAlpha = 0;
            stepLoop();
        } else {
            btnPlay.innerHTML = '<span class="icon">&#9658;</span> Mulai';
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            trnaY = -50;
            trnaAlpha = 0;
            updateUI();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            trnaY = -50;
            trnaAlpha = 0;
            updateUI();
        }
    });

    // Init
    resizeCanvas();
    updateUI();
});
