"use strict";

/**
 * GEN-OS Configuration and Logic
 */

// Configure Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gen: {
                    bg: '#000000',
                    panel: 'rgba(10, 15, 20, 0.7)',
                    cyan: '#00f3ff',
                    green: '#00ff41',
                    purple: '#bd00ff'
                }
            },
            fontFamily: {
                mono: ['Courier Prime', 'monospace'],
                display: ['Orbitron', 'sans-serif'],
                sans: ['Rajdhani', 'sans-serif']
            }
        }
    }
};

// --- 1. DNA 3D CREATION ---

function create3DDNA() {
    const container = document.getElementById('dna-container');
    if (!container) return;

    const pairCount = 15;
    const width = 600;
    const spacing = width / pairCount;

    for (let i = 0; i < pairCount; i++) {
        const pair = document.createElement('div');
        pair.className = 'base-pair-h';
        pair.style.left = (i * spacing) + 'px';

        // Stagger animation delay for wave effect
        pair.style.animationDelay = `-${i * 0.2}s`;

        // Generate base pairs (A-T, G-C)
        const codes = ['A', 'T', 'G', 'C'];
        const t = codes[Math.floor(Math.random() * 4)];
        // Complementary base pairing logic: Adenine-Thymine, Guanine-Cytosine
        const b = t === 'A' ? 'T' : t === 'T' ? 'A' : t === 'G' ? 'C' : 'G';

        const top = document.createElement('span');
        top.className = 'nucleotide pair-a';
        top.innerText = t;

        const bot = document.createElement('span');
        bot.className = 'nucleotide pair-b';
        bot.innerText = b;

        const link = document.createElement('div');
        link.className = 'dna-link';

        pair.appendChild(top);
        pair.appendChild(link);
        pair.appendChild(bot);
        container.appendChild(pair);
    }
}


// --- 2. PARTICLE BACKGROUND ---

const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let width, height;
let particles = [];

function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#00ff41';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    if (!canvas) return;
    particles = [];
    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines if they are close enough
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < 100) {
                ctx.beginPath();
                const g = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                g.addColorStop(0, particles[i].color);
                g.addColorStop(1, particles[j].color);
                ctx.strokeStyle = g;
                ctx.globalAlpha = 1 - (d / 100);
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}


// --- 3. SEQUENCE CONTROLLER ---

// Helper for cleaner async timing
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runIntroSequence() {
    const introWrap = document.getElementById('intro-wrapper');
    const layerDNA = document.getElementById('layer-dna');
    const layerChromo = document.getElementById('layer-chromosome');
    const layerNeuron = document.getElementById('layer-neuron');
    const mainInterface = document.getElementById('main-interface');
    const txt = document.getElementById('loading-text');
    const percent = document.getElementById('loading-percent');

    // Simulate Loading
    await new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 3) + 1;
            if (progress > 100) progress = 100;
            if (percent) percent.innerText = progress + '%';

            if (progress === 100) {
                clearInterval(interval);
                resolve();
            }
        }, 30);
    });

    // STEP 1: DNA EXIT
    layerDNA.classList.add('anim-exit');
    if (txt) txt.innerText = "> CONDENSING CHROMATIN...";
    await delay(1000);
    layerDNA.style.display = 'none';

    // STEP 2: CHROMOSOME ENTER
    layerChromo.classList.add('anim-active', 'anim-enter');
    if (txt) txt.innerText = "> CHROMOSOME DETECTED";
    await delay(2000);

    // STEP 3: CHROMOSOME EXIT
    layerChromo.classList.remove('anim-enter');
    layerChromo.classList.add('anim-exit');
    await delay(800);
    layerChromo.style.display = 'none';

    // STEP 4: NEURON ENTER
    layerNeuron.classList.add('anim-active', 'anim-enter');
    document.querySelectorAll('.dendrite').forEach(d => d.classList.add('active'));
    if (txt) txt.innerText = "> NEURAL LINK ESTABLISHED";
    await delay(2000);

    // STEP 5: NEURON EXIT
    layerNeuron.classList.remove('anim-enter');
    layerNeuron.classList.add('anim-exit');
    await delay(800);

    // STEP 6: DASHBOARD ENTER
    introWrap.style.display = 'none';
    mainInterface.classList.add('dashboard-visible');
    animateParticles();
    document.body.style.overflow = 'auto';
}

window.onload = () => {
    create3DDNA();
    resize();
    initParticles();
    runIntroSequence();
};

// Clock
setInterval(() => {
    const clock = document.getElementById('clock');
    if (clock) clock.innerText = new Date().toLocaleTimeString();
}, 1000);
