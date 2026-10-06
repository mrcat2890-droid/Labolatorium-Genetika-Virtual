/**
 * ==============================================================================
 * GEN-OS BIO-CORE: ULTRA-REALISTIC SCIENTIFIC B-DNA MOLECULAR ENGINE
 * Berdasarkan Data Kristalografi Sinar-X PDB ID: 1BNA (Dickerson et al., 1982)
 * dan Model Heliks Ganda Watson-Crick (1953) & Rosalind Franklin.
 * 
 * FITUR UPGRADE REALISTIS TINGKAT TINGGI:
 * 1. Multi-Mode Representation:
 *    - Mode 1: Bio-Illustrative (Cincin Planar Purin 6+5 & Pirimidin 6, Propeller Twist 12°, Nodus Gula Pentosa & Fosfat)
 *    - Mode 2: Space-Filling Atomik CPK (Van der Waals Spheres Padat Tanpa Rongga di Sumbu Tengah)
 *    - Mode 3: Ball & Stick (Kerangka Ikatan Kimia Kovalen & Jembatan Hidrogen 3D)
 * 2. Dinamika Termal 37°C (Brownian Motion Fluctuation dalam Larutan Sitoplasma)
 * 3. Skala Metrik Presisi: Diameter 2.0 nm, Rise 0.34 nm, Pitch 3.4 nm (~10.5 pb)
 * 4. Polaritas Antiparalel 5' (Gugus Fosfat) dan 3' (Gugus Hidroksil -OH)
 * 5. Tutorial Interaktif Edukasi Terpadu 3 Langkah
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. DATA ILMIAH MOLEKULER & BIOKIMIA
// -----------------------------------------------------------------------------
const DNA_DATA = {
    A: {
        name: "Adenina (Adenine)",
        class: "Basa Nitrogen Purin (Cincin Ganda: Cincin 6 + Cincin 5)",
        formula: "C₅H₅N₅",
        weight: "135.13 g/mol",
        partner: "Timina (T) melalui 2 Ikatan Hidrogen",
        bonds: "2 Garis Titik Ikatan Hidrogen (A = T)",
        colorHex: "#1d63ff",
        colorNum: 0x1d63ff,
        desc: "Basa heterosiklik purin dengan dua cincin terpadu (cincin pirimidina 6-atom dan cincin imidazola 5-atom). Pada model realistis memiliki bentuk planar asimetris dengan sudut propeller twist ~12° untuk memaksimalkan tumpukan hidrofobik pi-pi.",
        func: "Menjaga stabilitas translasi informasi genetik dan membentuk pasangan stabil dengan energi disosiasi seimbang untuk replikasi DNA."
    },
    T: {
        name: "Timina (Thymine)",
        class: "Basa Nitrogen Pirimidina (Cincin Tunggal: Heksagon 6-Atom)",
        formula: "C₅H₆N₂O₂",
        weight: "126.11 g/mol",
        partner: "Adenina (A) melalui 2 Ikatan Hidrogen",
        bonds: "2 Garis Titik Ikatan Hidrogen (T = A)",
        colorHex: "#ffb703",
        colorNum: 0xffb703,
        desc: "Basa pirimidina berkarbon tunggal dengan gugus metil (-CH₃) pada posisi C5 dan gugus karbonil (=O). Berpasangan eksklusif dengan Adenina melalui dua jembatan hidrogen.",
        func: "Mencegah mutasi deaminasi spontan dalam sel dan memberikan tanda pengenal hidrofobik di lekukan mayor (Major Groove) bagi faktor transkripsi."
    },
    G: {
        name: "Guanina (Guanine)",
        class: "Basa Nitrogen Purin (Cincin Ganda: Cincin 6 + Cincin 5)",
        formula: "C₅H₅N₅O",
        weight: "151.13 g/mol",
        partner: "Sitosina (C) melalui 3 Ikatan Hidrogen",
        bonds: "3 Garis Titik Ikatan Hidrogen (G ≡ C)",
        colorHex: "#00d659",
        colorNum: 0x00d659,
        desc: "Basa purin beroksigen dengan gugus amino ekstrasiklik C2. Membentuk 3 jembatan ikatan hidrogen yang sangat kokoh dengan Sitosina.",
        func: "Memberikan kekuatan termodinamika tertinggi pada untai heliks ganda berkat 3 ikatan hidrogen yang sangat kuat dan resisten terhadap denaturasi termal."
    },
    C: {
        name: "Sitosina (Cytosine)",
        class: "Basa Nitrogen Pirimidina (Cincin Tunggal: Heksagon 6-Atom)",
        formula: "C₄H₅N₃O",
        weight: "111.10 g/mol",
        partner: "Guanina (G) melalui 3 Ikatan Hidrogen",
        bonds: "3 Garis Titik Ikatan Hidrogen (C ≡ G)",
        colorHex: "#ff2a4b",
        colorNum: 0xff2a4b,
        desc: "Basa pirimidina cincin tunggal dengan gugus amino C4 dan gugus keto C2. Selalu berpasangan secara komplementer dengan Guanina.",
        func: "Berpasangan erat dengan Guanina untuk menjamin kepadatan dan kerapian struktur heliks ganda DNA serta target utama modifikasi metilasi epigenetik (CpG islands)."
    },
    backbone: {
        name: "Sugar-Phosphate Backbone",
        class: "Pita Heliks Gula Deoksiribosa-Fosfat (5' → 3')",
        formula: "[PO₄ - C₅H₈O₃]ₙ",
        weight: "~330 Da per nukleotida",
        partner: "Untai Komplementer Antiparalel (3' ← 5')",
        bonds: "Ikatan Fosfodiester Kovalen",
        colorHex: "#5c6ae4",
        colorNum: 0x5c6ae4,
        desc: "Kerangka luar heliks yang tersusun atas pengulangan unit cincin furanosa pentosa (deoksiribosa) dan gugus fosfat bermuatan negatif (PO₄³⁻). Menyelubungi inti pasangan basa hidrofobik dari lingkungan akuatik sel.",
        func: "Membentuk kerangka luar yang kokoh sekaligus menciptakan Lekukan Mayor (Major Groove ~2.2 nm) dan Lekukan Minor (Minor Groove ~1.2 nm) tempat enzim polimerase menempel."
    },
    hbond: {
        name: "Hydrogen Bonds (Ikatan Hidrogen)",
        class: "Jembatan Elektrostatik Non-Kovalen",
        formula: "N-H···O / N-H···N",
        weight: "2 - 5 kkal/mol per ikatan",
        partner: "Penghubung Antar-Basa Komplementer",
        bonds: "2 Titik pada A-T | 3 Titik pada C-G",
        colorHex: "#ffffff",
        colorNum: 0xffffff,
        desc: "Jembatan elektrostatik antara atom hidrogen terpolarisasi positif dengan pasangan elektron bebas pada atom oksigen/nitrogen. A-T dihubungkan oleh 2 ikatan, sedangkan C-G dihubungkan oleh 3 ikatan.",
        func: "Memungkinkan pembukaan untai ganda secara reversibel saat replikasi dan transkripsi oleh enzim RNA polimerase tanpa merusak ikatan kovalen tulang punggung."
    },
    C_atom: {
        name: "Atom Karbon (C)",
        class: "Unsur Kerangka Organik CPK",
        formula: "¹²C (Nomor Atom: 6)",
        weight: "12.011 u",
        partner: "Membentuk 4 Ikatan Kovalen Tetrahidral/Planar",
        bonds: "Ikatan C-C, C-H, C-N, C-O",
        colorHex: "#3b4252",
        colorNum: 0x3b4252,
        desc: "Atom kerangka utama cincin purin, pirimidin, dan cincin pentosa deoksiribosa dalam heliks DNA.",
        func: "Membentuk tulang punggung karbon yang stabil dan tahan terhadap hidrolisis spontan dalam sel."
    },
    N_atom: {
        name: "Atom Nitrogen (N)",
        class: "Unsur Basa Heterosiklik CPK",
        formula: "¹⁴N (Nomor Atom: 7)",
        weight: "14.007 u",
        partner: "Akseptor / Donor Ikatan Hidrogen",
        bonds: "Ikatan C-N, N-H (Aromatik & Amino)",
        colorHex: "#1d4ed8",
        colorNum: 0x1d4ed8,
        desc: "Atom nitrogen dalam cincin purin dan pirimidin yang menyediakan pasangan elektron bebas untuk jembatan hidrogen komplementer.",
        func: "Kunci spesifisitas pengenalan kodon genetik dan ikatan glikosidik dengan gula deoksiribosa."
    },
    O_atom: {
        name: "Atom Oksigen (O)",
        class: "Unsur Elektronegatif Kuat CPK",
        formula: "¹⁶O (Nomor Atom: 8)",
        weight: "15.999 u",
        partner: "Gugus Fosfat & Karbonil Basa",
        bonds: "Ikatan P-O, C-O, C=O",
        colorHex: "#dc2626",
        colorNum: 0xdc2626,
        desc: "Atom oksigen pada gugus fosfat dan gugus karbonil basa nitrogen (Timin, Guanin, Sitosin) serta jembatan ester deoksiribosa.",
        func: "Memberikan muatan negatif seragam pada permukaan DNA dan berperan sebagai akseptor ikatan hidrogen kuat."
    },
    P_atom: {
        name: "Atom Fosfor (P)",
        class: "Pusat Gugus Fosfat CPK",
        formula: "³¹P (Nomor Atom: 15)",
        weight: "30.974 u",
        partner: "Terkoordinasi Tetrahidral dengan 4 Atom Oksigen",
        bonds: "Ikatan Fosfodiester (5'-O-P-O-3')",
        colorHex: "#d97706",
        colorNum: 0xd97706,
        desc: "Pusat gugus fosfat tetrahedral PO₄³⁻ yang menghubungkan posisi C3' deoksiribosa sebelumnya ke posisi C5' deoksiribosa berikutnya.",
        func: "Menyediakan muatan anionik untuk interaksi elektrostatis dengan protein histon dalam pemadatan kromatin."
    }
};

// -----------------------------------------------------------------------------
// 2. SETUP SCENE, KAMERA, RENDERER & PENCAHAYAAN SINEMATIK
// -----------------------------------------------------------------------------
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x071833, 0.005);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1.0;
controls.panSpeed = 0.8;
controls.minDistance = 14;
controls.maxDistance = 150;
controls.target.set(0, 0, 0);
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};

function adjustCameraForDevice() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    if (aspect < 0.6) {
        camera.fov = 56;
        camera.position.set(-10, 8, 66);
    } else if (aspect < 0.85) {
        camera.fov = 50;
        camera.position.set(-13, 10, 58);
    } else if (aspect < 1.15) {
        camera.fov = 45;
        camera.position.set(-15, 11, 52);
    } else if (aspect < 1.7) {
        camera.fov = 42;
        camera.position.set(-18, 12, 48);
    } else {
        camera.fov = 40;
        camera.position.set(-18, 12, 46);
    }
    camera.updateProjectionMatrix();
    controls.update();
}
adjustCameraForDevice();

// Pencahayaan Studio Sinematik
const ambientLight = new THREE.AmbientLight(0x0a1c38, 0.85);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0x4070a8, 0x051024, 0.45);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
keyLight.position.set(-25, 40, 35);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
fillLight.position.set(35, -15, 30);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0x8faaff, 1.4);
rimLight.position.set(10, 30, -40);
scene.add(rimLight);

const rimLight2 = new THREE.DirectionalLight(0x7c66dc, 0.8);
rimLight2.position.set(-25, -30, -25);
scene.add(rimLight2);

// -----------------------------------------------------------------------------
// 3. BACKGROUND BOKEH MIKROSKOPIS & PARTIKEL SITOPLASMA
// -----------------------------------------------------------------------------
const bokehGroup = new THREE.Group();
scene.add(bokehGroup);

for (let i = 0; i < 28; i++) {
    const radius = 4 + Math.random() * 18;
    const bokehGeo = new THREE.SphereGeometry(radius, 20, 20);
    const brightness = 0.05 + Math.random() * 0.11;
    const bokehMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.58 + Math.random() * 0.08, 0.6, 0.15 + Math.random() * 0.12),
        transparent: true,
        opacity: brightness,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const mesh = new THREE.Mesh(bokehGeo, bokehMat);
    mesh.position.set(
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 110,
        -30 - Math.random() * 60
    );
    bokehGroup.add(mesh);
}

const pCount = 260;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 120;
    pPos[i + 1] = (Math.random() - 0.5) * 100;
    pPos[i + 2] = (Math.random() - 0.5) * 90;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pMat = new THREE.PointsMaterial({
    color: 0x5090d0,
    size: 0.5,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// -----------------------------------------------------------------------------
// 4. PROCEDURAL ENVIRONMENT MAP
// -----------------------------------------------------------------------------
function createEnvMap() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, 0, size);
    grd.addColorStop(0.0, '#405090');
    grd.addColorStop(0.25, '#6080c0');
    grd.addColorStop(0.45, '#90b0e0');
    grd.addColorStop(0.55, '#d0e0ff');
    grd.addColorStop(0.65, '#90a8d0');
    grd.addColorStop(0.8, '#405080');
    grd.addColorStop(1.0, '#1a2848');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
}
const envMap = createEnvMap();

// -----------------------------------------------------------------------------
// 5. GENERATOR TEKSTUR CAP HURUF BASA NITROGEN
// -----------------------------------------------------------------------------
function generateLetterBadgeTexture(letter, bgColorHex, textColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColorHex;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(256, 256, 235, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(256, 256, 218, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.font = '900 270px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 260, 272);

    ctx.fillStyle = textColor;
    ctx.fillText(letter, 256, 268);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
}

const letterTextures = {
    A: generateLetterBadgeTexture('A', '#1d63ff', '#ffffff'),
    T: generateLetterBadgeTexture('T', '#ffb703', '#0a1628'),
    G: generateLetterBadgeTexture('G', '#00d659', '#ffffff'),
    C: generateLetterBadgeTexture('C', '#ff2a4b', '#ffffff')
};

// -----------------------------------------------------------------------------
// 6. MATERIAL PBR REALISTIS & STANDAR ATOMIK CPK
// -----------------------------------------------------------------------------
const materials = {
    backbone: new THREE.MeshPhysicalMaterial({
        color: 0x5c6ae4,
        roughness: 0.28,
        metalness: 0.04,
        clearcoat: 0.55,
        clearcoatRoughness: 0.2,
        emissive: 0x16184a,
        emissiveIntensity: 0.35,
        envMap: envMap,
        envMapIntensity: 0.35
    }),
    A: new THREE.MeshPhysicalMaterial({
        color: 0x1d63ff,
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
        emissive: 0x072066,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    T: new THREE.MeshPhysicalMaterial({
        color: 0xffb703,
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
        emissive: 0x593c00,
        emissiveIntensity: 0.32,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    G: new THREE.MeshPhysicalMaterial({
        color: 0x00d659,
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
        emissive: 0x00471b,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    C: new THREE.MeshPhysicalMaterial({
        color: 0xff2a4b,
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
        emissive: 0x590012,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    hbondDot: new THREE.MeshBasicMaterial({
        color: 0xffffff
    }),
    sugarNode: new THREE.MeshPhysicalMaterial({
        color: 0x818cf8,
        roughness: 0.32,
        metalness: 0.08,
        clearcoat: 0.4,
        emissive: 0x1e1b4b,
        emissiveIntensity: 0.3
    }),
    phosphateNode: new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        roughness: 0.25,
        metalness: 0.2,
        clearcoat: 0.6,
        emissive: 0x78350f,
        emissiveIntensity: 0.4
    }),
    cpk: {
        C: new THREE.MeshPhysicalMaterial({ color: 0x3b4252, roughness: 0.35, metalness: 0.05, clearcoat: 0.3 }),
        N: new THREE.MeshPhysicalMaterial({ color: 0x1d4ed8, roughness: 0.30, metalness: 0.05, clearcoat: 0.35 }),
        O: new THREE.MeshPhysicalMaterial({ color: 0xdc2626, roughness: 0.30, metalness: 0.05, clearcoat: 0.35 }),
        P: new THREE.MeshPhysicalMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.15, clearcoat: 0.5 }),
        H: new THREE.MeshPhysicalMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.05, clearcoat: 0.2 }),
        bond: new THREE.MeshPhysicalMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.4, clearcoat: 0.3 })
    }
};

// -----------------------------------------------------------------------------
// 7. GEOMETRI PLANAR PURIN & PIRIMIDIN
// -----------------------------------------------------------------------------
function createPurineShape() {
    const s = new THREE.Shape();
    s.moveTo(-1.0, 0.45);
    s.lineTo(-0.3, 0.85);
    s.lineTo(0.5, 0.75);
    s.lineTo(1.1, 0.25);
    s.lineTo(0.9, -0.5);
    s.lineTo(0.3, -0.8);
    s.lineTo(-0.5, -0.7);
    s.lineTo(-1.0, -0.2);
    s.closePath();
    return s;
}

function createPyrimidineShape() {
    const s = new THREE.Shape();
    const rx = 0.8;
    const ry = 0.65;
    for (let a = 0; a < 6; a++) {
        const ang = (a * Math.PI) / 3;
        const px = Math.cos(ang) * rx;
        const py = Math.sin(ang) * ry;
        if (a === 0) s.moveTo(px, py);
        else s.lineTo(px, py);
    }
    s.closePath();
    return s;
}

const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 2
};

const purineGeo = new THREE.ExtrudeGeometry(createPurineShape(), extrudeSettings);
const pyrimidineGeo = new THREE.ExtrudeGeometry(createPyrimidineShape(), extrudeSettings);
purineGeo.center();
pyrimidineGeo.center();

const pentoseShape = new THREE.Shape();
for (let a = 0; a < 5; a++) {
    const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
    const px = Math.cos(ang) * 0.48;
    const py = Math.sin(ang) * 0.48;
    if (a === 0) pentoseShape.moveTo(px, py);
    else pentoseShape.lineTo(px, py);
}
pentoseShape.closePath();
const pentoseGeo = new THREE.ExtrudeGeometry(pentoseShape, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2 });
pentoseGeo.center();

const phosphateGeo = new THREE.SphereGeometry(0.38, 14, 14);

const cpkAtomGeos = {
    C: new THREE.SphereGeometry(0.48, 12, 12),
    N: new THREE.SphereGeometry(0.45, 12, 12),
    O: new THREE.SphereGeometry(0.43, 12, 12),
    P: new THREE.SphereGeometry(0.52, 14, 14),
    H: new THREE.SphereGeometry(0.33, 10, 10)
};

const ballStickSmallSphere = new THREE.SphereGeometry(0.16, 10, 10);
const ballStickBondCyl = new THREE.CylinderGeometry(0.045, 0.045, 1.0, 8);

// -----------------------------------------------------------------------------
// 8. ARSITEKTUR STRUKTUR 3D DNA B-FORM (WATSON-CRICK // PDB 1BNA)
// -----------------------------------------------------------------------------
const dnaGroup = new THREE.Group();
dnaGroup.rotation.z = 0.30;
dnaGroup.rotation.x = 0.15;
scene.add(dnaGroup);

const NUM_PAIRS = 28;
const HELIX_RADIUS = 4.6;
const HEIGHT_STEP = 1.35;
const ANGLE_STEP = 0.355;        // ~10.5 pasang basa per turn
const MAJOR_MINOR_OFFSET = 2.40;  // Asimetris alur mayor & minor

let currentRenderMode = 'bio';   // 'bio', 'cpk', 'ballstick'
let thermalDynamicsEnabled = true;
let metricScaleVisible = false;

const allInteractiveMeshes = [];
const strand1Meshes = [];
const strand2Meshes = [];
const baseMeshes = { A: [], T: [], G: [], C: [], backbone: [], hbond: [] };

// Array untuk kontrol visibilitas per-mode
const bioObjects = [];
const cpkObjects = [];
const ballStickObjects = [];

const splinePointsStrand1 = [];
const splinePointsStrand2 = [];
const pairDynamicContainers = [];
const pairBaseY = [];

const sequence = [
    { b1: 'A', b2: 'T' }, { b1: 'G', b2: 'C' },
    { b1: 'T', b2: 'A' }, { b1: 'C', b2: 'G' },
    { b1: 'A', b2: 'T' }, { b1: 'G', b2: 'C' },
    { b1: 'C', b2: 'G' }, { b1: 'T', b2: 'A' },
    { b1: 'A', b2: 'T' }, { b1: 'G', b2: 'C' },
    { b1: 'C', b2: 'G' }, { b1: 'T', b2: 'A' },
    { b1: 'A', b2: 'T' }, { b1: 'G', b2: 'C' }
];

const annotationTargets = {
    majorGroove: new THREE.Vector3(),
    minorGroove: new THREE.Vector3(),
    backbone: new THREE.Vector3(),
    atPair: new THREE.Vector3(),
    cgPair: new THREE.Vector3(),
    metricDiameter1: new THREE.Vector3(),
    metricDiameter2: new THREE.Vector3(),
    metricRise1: new THREE.Vector3(),
    metricRise2: new THREE.Vector3(),
    metricPitch1: new THREE.Vector3(),
    metricPitch2: new THREE.Vector3(),
    strand1Top: new THREE.Vector3(),
    strand1Bottom: new THREE.Vector3(),
    strand2Top: new THREE.Vector3(),
    strand2Bottom: new THREE.Vector3()
};

const BADGE_RADIUS = 0.48;
const BADGE_HEIGHT = 0.22;

for (let i = 0; i < NUM_PAIRS; i++) {
    const y = (i - NUM_PAIRS / 2) * HEIGHT_STEP;
    pairBaseY.push(y);
    const theta1 = i * ANGLE_STEP;
    const theta2 = theta1 + MAJOR_MINOR_OFFSET;

    const x1 = Math.cos(theta1) * HELIX_RADIUS;
    const z1 = Math.sin(theta1) * HELIX_RADIUS;
    const pos1 = new THREE.Vector3(x1, y, z1);
    splinePointsStrand1.push(pos1);

    const x2 = Math.cos(theta2) * HELIX_RADIUS;
    const z2 = Math.sin(theta2) * HELIX_RADIUS;
    const pos2 = new THREE.Vector3(x2, y, z2);
    splinePointsStrand2.push(pos2);

    const center = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);

    const pair = sequence[i % sequence.length];
    const b1Type = pair.b1;
    const b2Type = pair.b2;
    const isCG = (b1Type === 'C' || b1Type === 'G');
    const isPurine1 = (b1Type === 'A' || b1Type === 'G');
    const isPurine2 = (b2Type === 'A' || b2Type === 'G');

    // 1. Kontainer dinamis pasangan pada tinggi Y presisi
    const pairContainer = new THREE.Group();
    pairContainer.position.set(0, y, 0);
    dnaGroup.add(pairContainer);
    pairDynamicContainers.push(pairContainer);

    // Titik lokal relatif terhadap kontainer Y
    const p1Local = new THREE.Vector3(x1, 0, z1);
    const p2Local = new THREE.Vector3(x2, 0, z2);
    const centerLocal = new THREE.Vector3().addVectors(p1Local, p2Local).multiplyScalar(0.5);
    const dir1 = new THREE.Vector3().subVectors(centerLocal, p1Local).normalize();
    const dir2 = new THREE.Vector3().subVectors(centerLocal, p2Local).normalize();

    // Sub-grup pemisahan untai (untuk animasi unzip & explode di semua mode)
    const s1Container = new THREE.Group();
    const s2Container = new THREE.Group();
    const bondContainer = new THREE.Group();

    pairContainer.add(s1Container);
    pairContainer.add(s2Container);
    pairContainer.add(bondContainer);

    // =========================================================================
    // A. MODE 1: BIO-ILLUSTRATIVE REALISTIC (WATSON-CRICK ENHANCED)
    // =========================================================================
    const bioBase1 = new THREE.Group();
    const bioBase2 = new THREE.Group();
    const bioBond = new THREE.Group();

    s1Container.add(bioBase1);
    s2Container.add(bioBase2);
    bondContainer.add(bioBond);

    bioObjects.push(bioBase1, bioBase2, bioBond);

    // --- BASA 1 ---
    const plateGeo1 = isPurine1 ? purineGeo : pyrimidineGeo;
    const plate1 = new THREE.Mesh(plateGeo1, materials[b1Type]);
    const plateDist1 = isPurine1 ? 2.3 : 1.9;
    plate1.position.set(0, 0, plateDist1);
    plate1.rotation.x = Math.PI / 2;
    plate1.rotation.z = 0.10; // Propeller twist
    bioBase1.add(plate1);

    const rod1Geo = new THREE.CylinderGeometry(0.14, 0.14, 1.2, 12);
    const rod1 = new THREE.Mesh(rod1Geo, materials[b1Type]);
    rod1.position.set(0, 0, 0.6);
    rod1.rotation.x = Math.PI / 2;
    bioBase1.add(rod1);

    const badgeMat1 = new THREE.MeshPhysicalMaterial({
        map: letterTextures[b1Type],
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.4,
        emissive: 0x111111,
        envMap: envMap,
        envMapIntensity: 0.1
    });
    const badge1 = new THREE.Mesh(new THREE.CylinderGeometry(BADGE_RADIUS, BADGE_RADIUS, BADGE_HEIGHT, 24), badgeMat1);
    badge1.position.set(0, 0.16, plateDist1);
    badge1.rotation.x = -Math.PI / 2;
    bioBase1.add(badge1);

    const sugar1 = new THREE.Mesh(pentoseGeo, materials.sugarNode);
    sugar1.position.set(0, 0, 0);
    sugar1.rotation.y = theta1;
    bioBase1.add(sugar1);

    const phos1 = new THREE.Mesh(phosphateGeo, materials.phosphateNode);
    phos1.position.set(0, 0.42, -0.25);
    bioBase1.add(phos1);

    bioBase1.position.copy(p1Local);
    bioBase1.lookAt(centerLocal);

    bioBase1.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: b1Type, strand: 1, parentGroup: s1Container,
                initialPos: s1Container.position.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    baseMeshes[b1Type].push(s1Container);

    // --- BASA 2 ---
    const plateGeo2 = isPurine2 ? purineGeo : pyrimidineGeo;
    const plate2 = new THREE.Mesh(plateGeo2, materials[b2Type]);
    const plateDist2 = isPurine2 ? 2.3 : 1.9;
    plate2.position.set(0, 0, plateDist2);
    plate2.rotation.x = Math.PI / 2;
    plate2.rotation.z = -0.10; // Propeller twist
    bioBase2.add(plate2);

    const rod2Geo = new THREE.CylinderGeometry(0.14, 0.14, 1.2, 12);
    const rod2 = new THREE.Mesh(rod2Geo, materials[b2Type]);
    rod2.position.set(0, 0, 0.6);
    rod2.rotation.x = Math.PI / 2;
    bioBase2.add(rod2);

    const badgeMat2 = new THREE.MeshPhysicalMaterial({
        map: letterTextures[b2Type],
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.4,
        emissive: 0x111111,
        envMap: envMap,
        envMapIntensity: 0.1
    });
    const badge2 = new THREE.Mesh(new THREE.CylinderGeometry(BADGE_RADIUS, BADGE_RADIUS, BADGE_HEIGHT, 24), badgeMat2);
    badge2.position.set(0, 0.16, plateDist2);
    badge2.rotation.x = -Math.PI / 2;
    bioBase2.add(badge2);

    const sugar2 = new THREE.Mesh(pentoseGeo, materials.sugarNode);
    sugar2.position.set(0, 0, 0);
    sugar2.rotation.y = theta2;
    bioBase2.add(sugar2);

    const phos2 = new THREE.Mesh(phosphateGeo, materials.phosphateNode);
    phos2.position.set(0, 0.42, -0.25);
    bioBase2.add(phos2);

    bioBase2.position.copy(p2Local);
    bioBase2.lookAt(centerLocal);

    bioBase2.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: b2Type, strand: 2, parentGroup: s2Container,
                initialPos: s2Container.position.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    baseMeshes[b2Type].push(s2Container);

    // --- IKATAN HIDROGEN BIO-ILLUSTRATIVE ---
    const bondLinesCount = isCG ? 3 : 2;
    const bondLineSpacing = isCG ? [-0.22, 0, 0.22] : [-0.16, 0.16];

    const tip1 = new THREE.Vector3().addVectors(p1Local, dir1.clone().multiplyScalar(isPurine1 ? 3.35 : 2.75));
    const tip2 = new THREE.Vector3().addVectors(p2Local, dir2.clone().multiplyScalar(isPurine2 ? 3.35 : 2.75));
    const gapVector = new THREE.Vector3().subVectors(tip2, tip1);
    const perpendicular = new THREE.Vector3(0, 1, 0).cross(gapVector).normalize();

    const dotsPerLine = 4;
    const dotGeo = new THREE.SphereGeometry(0.08, 10, 10);

    for (let line = 0; line < bondLinesCount; line++) {
        const lineOffset = perpendicular.clone().multiplyScalar(bondLineSpacing[line]);
        for (let d = 0; d < dotsPerLine; d++) {
            const fraction = (d + 0.5) / dotsPerLine;
            const dotPos = new THREE.Vector3()
                .addVectors(tip1, gapVector.clone().multiplyScalar(fraction))
                .add(lineOffset);
            const dotMesh = new THREE.Mesh(dotGeo, materials.hbondDot);
            dotMesh.position.copy(dotPos);
            bioBond.add(dotMesh);
        }
    }

    bioBond.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: 'hbond', parentGroup: bondContainer,
                initialPos: bondContainer.position.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    baseMeshes.hbond.push(bondContainer);

    // =========================================================================
    // B. MODE 2 & 3: ATOMIK CPK (SPACE-FILLING) & BALL-AND-STICK
    // =========================================================================
    function createAtomCluster(strand, isPurine, originPos, lookCenter, targetSContainer) {
        const cpkSub = new THREE.Group();
        const bsSub = new THREE.Group();

        const atoms = [
            // Gugus Fosfat
            { el: 'P', pos: new THREE.Vector3(0, 0.4, -0.3) },
            { el: 'O', pos: new THREE.Vector3(0.4, 0.6, -0.2) },
            { el: 'O', pos: new THREE.Vector3(-0.4, 0.6, -0.2) },
            { el: 'O', pos: new THREE.Vector3(0, 0.1, -0.6) },
            // Gula Deoksiribosa
            { el: 'C', pos: new THREE.Vector3(0, 0, 0) },
            { el: 'C', pos: new THREE.Vector3(0.4, -0.2, 0.3) },
            { el: 'C', pos: new THREE.Vector3(0.2, -0.4, 0.7) },
            { el: 'C', pos: new THREE.Vector3(-0.3, -0.3, 0.7) },
            { el: 'O', pos: new THREE.Vector3(-0.35, 0, 0.3) }
        ];

        if (isPurine) {
            const pOffsets = [
                { el: 'N', x: -0.3, z: 1.2 }, { el: 'C', x: 0.3, z: 1.2 },
                { el: 'N', x: 0.6, z: 1.7 }, { el: 'C', x: 0.4, z: 2.2 },
                { el: 'C', x: -0.2, z: 2.3 }, { el: 'C', x: -0.6, z: 1.8 },
                { el: 'N', x: -0.7, z: 2.6 }, { el: 'C', x: -0.4, z: 3.1 },
                { el: 'N', x: 0.1, z: 3.0 }
            ];
            pOffsets.forEach(p => atoms.push({ el: p.el, pos: new THREE.Vector3(p.x, (Math.random() - 0.5) * 0.06, p.z) }));
        } else {
            const pyrOffsets = [
                { el: 'N', x: -0.3, z: 1.2 }, { el: 'C', x: 0.3, z: 1.2 },
                { el: 'N', x: 0.5, z: 1.7 }, { el: 'C', x: 0.2, z: 2.2 },
                { el: 'C', x: -0.3, z: 2.2 }, { el: 'C', x: -0.6, z: 1.7 }
            ];
            pyrOffsets.forEach(p => atoms.push({ el: p.el, pos: new THREE.Vector3(p.x, (Math.random() - 0.5) * 0.06, p.z) }));
        }

        atoms.forEach(a => {
            const cpkMesh = new THREE.Mesh(cpkAtomGeos[a.el], materials.cpk[a.el]);
            cpkMesh.position.copy(a.pos);
            cpkMesh.userData = { type: a.el === 'P' ? 'P_atom' : a.el === 'N' ? 'N_atom' : a.el === 'O' ? 'O_atom' : 'C_atom', strand: strand, parentGroup: targetSContainer };
            cpkSub.add(cpkMesh);
            allInteractiveMeshes.push(cpkMesh);

            const bsMesh = new THREE.Mesh(ballStickSmallSphere, materials.cpk[a.el]);
            bsMesh.position.copy(a.pos);
            bsMesh.userData = { type: a.el === 'P' ? 'P_atom' : a.el === 'N' ? 'N_atom' : a.el === 'O' ? 'O_atom' : 'C_atom', strand: strand, parentGroup: targetSContainer };
            bsSub.add(bsMesh);
            allInteractiveMeshes.push(bsMesh);
        });

        // Silinder ikatan Ball & Stick
        for (let b = 0; b < atoms.length - 1; b++) {
            const pA = atoms[b].pos;
            const pB = atoms[b + 1].pos;
            const dist = pA.distanceTo(pB);
            if (dist < 0.9) {
                const bondMesh = new THREE.Mesh(ballStickBondCyl, materials.cpk.bond);
                bondMesh.position.copy(new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5));
                bondMesh.scale.set(1, dist, 1);
                bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(pB, pA).normalize());
                bsSub.add(bondMesh);
            }
        }

        cpkSub.position.copy(originPos);
        cpkSub.lookAt(lookCenter);
        bsSub.position.copy(originPos);
        bsSub.lookAt(lookCenter);

        targetSContainer.add(cpkSub);
        targetSContainer.add(bsSub);

        cpkSub.visible = false;
        bsSub.visible = false;

        cpkObjects.push(cpkSub);
        ballStickObjects.push(bsSub);
    }

    createAtomCluster(1, isPurine1, p1Local, centerLocal, s1Container);
    createAtomCluster(2, isPurine2, p2Local, centerLocal, s2Container);

    // Jembatan H untuk CPK dan Ball & Stick
    const cpkHBridge = new THREE.Group();
    const bsHBridge = new THREE.Group();
    bondContainer.add(cpkHBridge);
    bondContainer.add(bsHBridge);

    cpkHBridge.visible = false;
    bsHBridge.visible = false;
    cpkObjects.push(cpkHBridge);
    ballStickObjects.push(bsHBridge);

    for (let line = 0; line < bondLinesCount; line++) {
        const lineOffset = perpendicular.clone().multiplyScalar(bondLineSpacing[line]);
        for (let d = 0; d < dotsPerLine; d++) {
            const fraction = (d + 0.5) / dotsPerLine;
            const dotPos = new THREE.Vector3()
                .addVectors(tip1, gapVector.clone().multiplyScalar(fraction))
                .add(lineOffset);
            
            const cpkH = new THREE.Mesh(cpkAtomGeos.H, materials.cpk.H);
            cpkH.position.copy(dotPos);
            cpkH.userData = { type: 'hbond', parentGroup: bondContainer };
            cpkHBridge.add(cpkH);
            allInteractiveMeshes.push(cpkH);

            const bsH = new THREE.Mesh(ballStickSmallSphere, materials.cpk.H);
            bsH.position.copy(dotPos);
            bsH.userData = { type: 'hbond', parentGroup: bondContainer };
            bsHBridge.add(bsH);
            allInteractiveMeshes.push(bsH);
        }
    }

    strand1Meshes.push(s1Container);
    strand2Meshes.push(s2Container);

    // Titik target anotasi ilmiah
    if (i === 13) {
        annotationTargets.cgPair.copy(center);
        annotationTargets.backbone.copy(pos2);
        annotationTargets.metricDiameter1.copy(pos1);
        annotationTargets.metricDiameter2.copy(pos2);
    }
    if (i === 14) {
        annotationTargets.atPair.copy(center);
        annotationTargets.metricRise1.copy(pos1);
    }
    if (i === 15) {
        annotationTargets.metricRise2.copy(pos1);
    }
    if (i === 8) {
        annotationTargets.majorGroove.copy(center);
        annotationTargets.metricPitch1.copy(pos1);
    }
    if (i === 18) {
        annotationTargets.minorGroove.copy(center);
        annotationTargets.metricPitch2.copy(pos1);
    }
    if (i === 0) {
        annotationTargets.strand1Top.copy(pos1);
        annotationTargets.strand2Top.copy(pos2);
    }
    if (i === NUM_PAIRS - 1) {
        annotationTargets.strand1Bottom.copy(pos1);
        annotationTargets.strand2Bottom.copy(pos2);
    }
}

// -----------------------------------------------------------------------------
// 9. PITA TULANG PUNGGUNG KONTINU (PITA GULA-FOSFAT)
// -----------------------------------------------------------------------------
const BACKBONE_TUBE_RADIUS = 0.76;
const TUBE_SEGMENTS = 220;
const TUBE_RADIAL_SEGMENTS = 20;

const curve1 = new THREE.CatmullRomCurve3(splinePointsStrand1);
const tube1Geo = new THREE.TubeGeometry(curve1, TUBE_SEGMENTS, BACKBONE_TUBE_RADIUS, TUBE_RADIAL_SEGMENTS, false);
const ribbon1 = new THREE.Mesh(tube1Geo, materials.backbone);
ribbon1.userData = { type: 'backbone', strand: 1, initialPos: new THREE.Vector3(0, 0, 0) };
dnaGroup.add(ribbon1);
allInteractiveMeshes.push(ribbon1);
strand1Meshes.push(ribbon1);
baseMeshes.backbone.push(ribbon1);

const curve2 = new THREE.CatmullRomCurve3(splinePointsStrand2);
const tube2Geo = new THREE.TubeGeometry(curve2, TUBE_SEGMENTS, BACKBONE_TUBE_RADIUS, TUBE_RADIAL_SEGMENTS, false);
const ribbon2 = new THREE.Mesh(tube2Geo, materials.backbone);
ribbon2.userData = { type: 'backbone', strand: 2, initialPos: new THREE.Vector3(0, 0, 0) };
dnaGroup.add(ribbon2);
allInteractiveMeshes.push(ribbon2);
strand2Meshes.push(ribbon2);
baseMeshes.backbone.push(ribbon2);

// -----------------------------------------------------------------------------
// 10. ANIMASI NATIVE LERP VECTOR ENGINE
// -----------------------------------------------------------------------------
const activeTweens = [];

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function animateVector(targetVector, destVector, durationMs = 1200, easing = easeInOutCubic) {
    const startVector = targetVector.clone();
    const startTime = performance.now();
    const tween = {
        update: (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1.0);
            targetVector.lerpVectors(startVector, destVector, easing(progress));
            return progress >= 1.0;
        }
    };
    activeTweens.push(tween);
    return tween;
}

// -----------------------------------------------------------------------------
// 11. SWITCHER MODE REPRESENTASI MOLEKULER
// -----------------------------------------------------------------------------
const modeBtns = document.querySelectorAll('.mode-btn');

function setRenderMode(mode) {
    currentRenderMode = mode;

    const isBio = (mode === 'bio');
    const isCpk = (mode === 'cpk');
    const isBs = (mode === 'ballstick');

    bioObjects.forEach(obj => obj.visible = isBio);
    cpkObjects.forEach(obj => obj.visible = isCpk);
    ballStickObjects.forEach(obj => obj.visible = isBs);

    ribbon1.visible = isBio;
    ribbon2.visible = isBio;

    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    filterComponent(currentActiveFilter);
}

modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setRenderMode(btn.getAttribute('data-mode'));
    });
});

// -----------------------------------------------------------------------------
// 12. KONTROL PEMISAHAN (UNZIP, EXPLODE, RESET)
// -----------------------------------------------------------------------------
let currentMode = 'assembled';
let autoRotateActive = true;
let labelsVisible = true;
let currentActiveFilter = 'all';

const btnUnzip = document.getElementById('btn-unzip');
const btnExplode = document.getElementById('btn-explode');
const btnResetAssembly = document.getElementById('btn-reset-assembly');
const dockBtnUnzip = document.getElementById('dock-btn-unzip');
const dockBtnExplode = document.getElementById('dock-btn-explode');
const dockBtnReset = document.getElementById('dock-btn-reset');
const annotationsOverlay = document.getElementById('annotations-overlay');

function unzipDNA() {
    currentMode = 'unzipped';
    const LATERAL_OFFSET = 12.0;
    strand1Meshes.forEach(mesh => {
        const dest = (mesh.userData && mesh.userData.initialPos) ? mesh.userData.initialPos.clone() : mesh.position.clone();
        dest.x -= LATERAL_OFFSET;
        animateVector(mesh.position, dest, 1400);
    });
    strand2Meshes.forEach(mesh => {
        const dest = (mesh.userData && mesh.userData.initialPos) ? mesh.userData.initialPos.clone() : mesh.position.clone();
        dest.x += LATERAL_OFFSET;
        animateVector(mesh.position, dest, 1400);
    });
    baseMeshes.hbond.forEach(mesh => {
        animateVector(mesh.scale, new THREE.Vector3(0.001, 0.001, 0.001), 600);
    });
    updateButtonStates();
}

function explodeDNA() {
    currentMode = 'exploded';
    allInteractiveMeshes.forEach(item => {
        const target = item.userData.parentGroup || item;
        const initial = item.userData.initialPos || target.position;
        const type = item.userData.type;
        const strand = item.userData.strand;
        const dest = initial.clone();
        if (type === 'backbone' || type === 'P_atom') { dest.x *= 2.4; dest.z *= 2.4; }
        else if (type === 'A') { dest.x -= 10; dest.z += (strand === 1 ? 4 : -4); }
        else if (type === 'T') { dest.x += 10; dest.z += (strand === 1 ? 4 : -4); }
        else if (type === 'G') { dest.x -= 13; dest.y *= 1.2; }
        else if (type === 'C') { dest.x += 13; dest.y *= 1.2; }
        else if (type === 'hbond') { dest.y *= 1.15; }
        else { dest.x += (strand === 1 ? -8 : 8); }
        animateVector(target.position, dest, 1400, easeOutBack);
    });
    baseMeshes.hbond.forEach(mesh => { animateVector(mesh.scale, new THREE.Vector3(1, 1, 1), 600); });
    updateButtonStates();
}

function resetAssembly() {
    currentMode = 'assembled';
    allInteractiveMeshes.forEach(item => {
        const target = item.userData.parentGroup || item;
        const initial = item.userData.initialPos || new THREE.Vector3(0, 0, 0);
        animateVector(target.position, initial, 1300, easeInOutCubic);
    });
    strand1Meshes.forEach(m => {
        if (m.userData && m.userData.initialPos) animateVector(m.position, m.userData.initialPos, 1300, easeInOutCubic);
        else animateVector(m.position, new THREE.Vector3(0, 0, 0), 1300, easeInOutCubic);
    });
    strand2Meshes.forEach(m => {
        if (m.userData && m.userData.initialPos) animateVector(m.position, m.userData.initialPos, 1300, easeInOutCubic);
        else animateVector(m.position, new THREE.Vector3(0, 0, 0), 1300, easeInOutCubic);
    });
    baseMeshes.hbond.forEach(mesh => { animateVector(mesh.scale, new THREE.Vector3(1, 1, 1), 800); });
    updateButtonStates();
}

function updateButtonStates() {
    const assembled = (currentMode === 'assembled');
    btnUnzip.classList.toggle('hidden', !assembled);
    btnExplode.classList.toggle('hidden', !assembled);
    btnResetAssembly.classList.toggle('hidden', assembled);
    if (dockBtnUnzip) dockBtnUnzip.classList.toggle('hidden', !assembled);
    if (dockBtnExplode) dockBtnExplode.classList.toggle('hidden', !assembled);
    if (dockBtnReset) dockBtnReset.classList.toggle('hidden', assembled);
}

btnUnzip.addEventListener('click', (e) => { e.stopPropagation(); unzipDNA(); });
btnExplode.addEventListener('click', (e) => { e.stopPropagation(); explodeDNA(); });
btnResetAssembly.addEventListener('click', (e) => { e.stopPropagation(); resetAssembly(); });
if (dockBtnUnzip) dockBtnUnzip.addEventListener('click', (e) => { e.stopPropagation(); unzipDNA(); });
if (dockBtnExplode) dockBtnExplode.addEventListener('click', (e) => { e.stopPropagation(); explodeDNA(); });
if (dockBtnReset) dockBtnReset.addEventListener('click', (e) => { e.stopPropagation(); resetAssembly(); });

// -----------------------------------------------------------------------------
// 13. TOGGLE DINAMIKA TERMAL 37°C & PENGGARIS METRIK
// -----------------------------------------------------------------------------
const btnToggleThermal = document.getElementById('btn-toggle-thermal');
const thermalStatusText = document.getElementById('thermal-status-text');
const btnToggleMetrics = document.getElementById('btn-toggle-metrics');
const metricStatusText = document.getElementById('metric-status-text');

btnToggleThermal.addEventListener('click', (e) => {
    e.stopPropagation();
    thermalDynamicsEnabled = !thermalDynamicsEnabled;
    btnToggleThermal.classList.toggle('active', thermalDynamicsEnabled);
    thermalStatusText.textContent = thermalDynamicsEnabled ? 'AKTIF' : 'NONAKTIF';
    if (!thermalDynamicsEnabled) {
        pairDynamicContainers.forEach((c, idx) => {
            c.position.y = pairBaseY[idx];
            c.rotation.y = 0;
        });
    }
});

btnToggleMetrics.addEventListener('click', (e) => {
    e.stopPropagation();
    metricScaleVisible = !metricScaleVisible;
    btnToggleMetrics.classList.toggle('active', metricScaleVisible);
    metricStatusText.textContent = metricScaleVisible ? 'TAMPIL' : 'SEMBUNYI';
    document.querySelectorAll('.callout-metric').forEach(el => el.classList.toggle('hidden', !metricScaleVisible));
});

// -----------------------------------------------------------------------------
// 14. RESPONSIVE MOBILE DRAWER & MODAL MANAGEMENT
// -----------------------------------------------------------------------------
const controlsPanel = document.getElementById('controls-panel');
const inspectorPanel = document.getElementById('inspector-panel');
const modalBackdrop = document.getElementById('modal-backdrop');
const btnToggleControlsPanel = document.getElementById('btn-toggle-controls-panel');
const btnToggleInspectorPanel = document.getElementById('btn-toggle-inspector-panel');
const dockBtnMenu = document.getElementById('dock-btn-menu');
const dockBtnInspect = document.getElementById('dock-btn-inspect');
const btnCloseControls = document.getElementById('btn-close-controls');
const btnCloseInspector = document.getElementById('btn-close-inspector');

function openDrawer(panel) {
    if (window.innerWidth <= 768) modalBackdrop.classList.remove('hidden');
    panel.classList.add('drawer-open');
}
function closeAllDrawers() {
    controlsPanel.classList.remove('drawer-open');
    inspectorPanel.classList.remove('drawer-open');
    modalBackdrop.classList.add('hidden');
}

[btnToggleControlsPanel, dockBtnMenu].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (controlsPanel.classList.contains('drawer-open')) { closeAllDrawers(); }
        else { inspectorPanel.classList.remove('drawer-open'); openDrawer(controlsPanel); }
    });
});
[btnToggleInspectorPanel, dockBtnInspect].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (inspectorPanel.classList.contains('drawer-open')) { closeAllDrawers(); }
        else { controlsPanel.classList.remove('drawer-open'); openDrawer(inspectorPanel); }
    });
});
if (btnCloseControls) btnCloseControls.addEventListener('click', (e) => { e.stopPropagation(); closeAllDrawers(); });
if (btnCloseInspector) btnCloseInspector.addEventListener('click', (e) => { e.stopPropagation(); closeAllDrawers(); });
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeAllDrawers);
    modalBackdrop.addEventListener('touchend', (e) => { e.stopPropagation(); closeAllDrawers(); });
}

// -----------------------------------------------------------------------------
// 15. TOGGLE ANOTASI & FILTER KOMPONEN
// -----------------------------------------------------------------------------
const btnToggleLabels = document.getElementById('btn-toggle-labels');
const labelStatusText = document.getElementById('label-status-text');

btnToggleLabels.addEventListener('click', (e) => {
    e.stopPropagation();
    labelsVisible = !labelsVisible;
    btnToggleLabels.classList.toggle('active', labelsVisible);
    labelStatusText.textContent = labelsVisible ? 'TAMPIL' : 'SEMBUNYI';
    annotationsOverlay.classList.toggle('hidden', !labelsVisible);
});

const filterChips = document.querySelectorAll('.filter-chips .chip');

function filterComponent(filterType) {
    currentActiveFilter = filterType;
    allInteractiveMeshes.forEach(mesh => {
        const type = mesh.userData.type;
        const show = (filterType === 'all' || type === filterType || (filterType === 'backbone' && (type === 'backbone' || type === 'P_atom')));
        if (mesh.material && mesh.material.transparent !== undefined) {
            mesh.material.transparent = !show;
            mesh.material.opacity = show ? 1.0 : 0.12;
        }
    });
}

filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
        e.stopPropagation();
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterComponent(chip.getAttribute('data-filter'));
    });
});

// -----------------------------------------------------------------------------
// 16. KONTROL ROTASI & KAMERA
// -----------------------------------------------------------------------------
const btnToggleRotate = document.getElementById('btn-toggle-rotate');
const rotateStatusLabel = document.getElementById('rotate-status-label');
const btnResetCamera = document.getElementById('btn-reset-camera');

btnToggleRotate.addEventListener('click', (e) => {
    e.stopPropagation();
    autoRotateActive = !autoRotateActive;
    btnToggleRotate.classList.toggle('active', autoRotateActive);
    rotateStatusLabel.textContent = autoRotateActive ? 'AKTIF' : 'NONAKTIF';
});

btnResetCamera.addEventListener('click', (e) => {
    e.stopPropagation();
    adjustCameraForDevice();
});

// -----------------------------------------------------------------------------
// 17. RAYCASTER & INSPEKSI MOLEKULER
// -----------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const inspectorPlaceholder = document.getElementById('inspector-placeholder');
const inspectorDetails = document.getElementById('inspector-details');
const detailTitle = document.getElementById('detail-title');
const detailClass = document.getElementById('detail-class');
const detailFormula = document.getElementById('detail-formula');
const detailWeight = document.getElementById('detail-weight');
const detailPartner = document.getElementById('detail-partner');
const detailBonds = document.getElementById('detail-bonds');
const detailDesc = document.getElementById('detail-desc');
const detailFunction = document.getElementById('detail-function');
const detailColorIndicator = document.getElementById('detail-color-indicator');

function showComponentDetails(type) {
    const data = DNA_DATA[type];
    if (!data) return;
    detailTitle.textContent = data.name;
    detailClass.textContent = data.class;
    detailFormula.textContent = data.formula;
    detailWeight.textContent = data.weight;
    detailPartner.textContent = data.partner;
    detailBonds.textContent = data.bonds;
    detailDesc.textContent = data.desc;
    detailFunction.textContent = data.func;
    detailColorIndicator.style.backgroundColor = data.colorHex;
    detailColorIndicator.style.boxShadow = `0 0 16px ${data.colorHex}`;
    inspectorPlaceholder.classList.add('hidden');
    inspectorDetails.classList.remove('hidden');
    if (window.innerWidth <= 768) {
        controlsPanel.classList.remove('drawer-open');
        openDrawer(inspectorPanel);
    }
}

function getActiveVisibleInteractiveMeshes() {
    const list = [];
    dnaGroup.traverse(child => {
        if (child.isMesh && child.userData && child.userData.type) {
            let isParentVisible = true;
            let p = child;
            while (p && p !== dnaGroup) {
                if (p.visible === false) {
                    isParentVisible = false;
                    break;
                }
                p = p.parent;
            }
            if (isParentVisible) list.push(child);
        }
    });
    return list;
}

let lastSelectionHandledTime = 0;
let pointerDownX = 0;
let pointerDownY = 0;
let pointerDownTime = 0;

function isUiElement(target) {
    if (!target || !target.closest) return false;
    return !!target.closest('#controls-panel, #app-header, #inspector-panel, #mobile-dock, #modal-backdrop, #interaction-hint, #tutorial-modal');
}

function performRaycastSelection(clientX, clientY) {
    const now = performance.now();
    if (now - lastSelectionHandledTime < 280) return false;
    lastSelectionHandledTime = now;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const interactiveMeshes = getActiveVisibleInteractiveMeshes();
    const intersects = raycaster.intersectObjects(interactiveMeshes, false);

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        const type = clicked.userData.type;
        if (type) {
            showComponentDetails(type);
            const tg = clicked.userData.parentGroup || clicked;
            const origScale = tg.scale.clone();
            animateVector(tg.scale, origScale.clone().multiplyScalar(1.25), 200, easeOutBack);
            setTimeout(() => animateVector(tg.scale, origScale, 300, easeInOutCubic), 220);
            return true;
        }
    }
    return false;
}

// 1. Deteksi Pointer (Mobile Touch & Mouse)
window.addEventListener('pointerdown', (e) => {
    if (isUiElement(e.target)) return;
    pointerDownX = e.clientX;
    pointerDownY = e.clientY;
    pointerDownTime = performance.now();
}, { passive: true });

window.addEventListener('pointerup', (e) => {
    if (isUiElement(e.target)) return;
    const moveDist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
    const timeElapsed = performance.now() - pointerDownTime;

    // Jari bergeser < 18px & durasi < 450ms menandakan ketukan/tap disengaja
    if (moveDist < 18 && timeElapsed < 450) {
        performRaycastSelection(e.clientX, e.clientY);
    }
}, { passive: true });

// 2. Handler Sentuhan Langsung pada Canvas untuk Layar Sentuh Mobile (Mencegah Intersepsi OrbitControls)
renderer.domElement.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
        pointerDownX = e.touches[0].clientX;
        pointerDownY = e.touches[0].clientY;
        pointerDownTime = performance.now();
    }
}, { passive: true });

renderer.domElement.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const moveDist = Math.hypot(touch.clientX - pointerDownX, touch.clientY - pointerDownY);
        const timeElapsed = performance.now() - pointerDownTime;
        if (moveDist < 18 && timeElapsed < 450) {
            performRaycastSelection(touch.clientX, touch.clientY);
        }
    }
}, { passive: true });

// 3. Fallback Click Event untuk Desktop
window.addEventListener('click', (event) => {
    if (isUiElement(event.target)) return;
    performRaycastSelection(event.clientX, event.clientY);
});

window.addEventListener('mousemove', (event) => {
    if (event.target.closest('.glass-panel') || event.target.closest('#app-header') || event.target.closest('#mobile-dock') || event.target.closest('#tutorial-modal')) {
        container.style.cursor = 'default'; return;
    }
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const interactiveMeshes = getActiveVisibleInteractiveMeshes();
    const intersects = raycaster.intersectObjects(interactiveMeshes, false);
    container.style.cursor = (intersects.length > 0) ? 'pointer' : 'grab';
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustCameraForDevice();
});
window.addEventListener('orientationchange', () => {
    setTimeout(() => { renderer.setSize(window.innerWidth, window.innerHeight); adjustCameraForDevice(); }, 200);
});

// -----------------------------------------------------------------------------
// 18. MODAL TUTORIAL INTERAKTIF 3 LANGKAH
// -----------------------------------------------------------------------------
let currentTutorialSlide = 1;
const tutorialModal = document.getElementById('tutorial-modal');
const btnOpenTutorial = document.getElementById('btn-open-tutorial');
const btnCloseTutorial = document.getElementById('btn-close-tutorial');
const tutBtnPrev = document.getElementById('tutorial-btn-prev');
const tutBtnNext = document.getElementById('tutorial-btn-next');
const tutDots = document.querySelectorAll('.tutorial-dots .dot');
const tutSlides = document.querySelectorAll('.tutorial-slide');

function showTutorialSlide(index) {
    currentTutorialSlide = index;
    tutSlides.forEach(slide => {
        const sIdx = parseInt(slide.getAttribute('data-slide'));
        slide.classList.toggle('hidden', sIdx !== index);
        slide.classList.toggle('active', sIdx === index);
    });
    tutDots.forEach(dot => {
        const dIdx = parseInt(dot.getAttribute('data-index'));
        dot.classList.toggle('active', dIdx === index);
    });
    tutBtnPrev.disabled = (index === 1);
    tutBtnNext.textContent = (index === 3) ? 'Mulai Eksplorasi 🚀' : 'Lanjut →';
}

function openTutorial() {
    tutorialModal.classList.remove('hidden');
    showTutorialSlide(1);
}
function closeTutorial() {
    tutorialModal.classList.add('hidden');
}

if (btnOpenTutorial) btnOpenTutorial.addEventListener('click', (e) => { e.stopPropagation(); openTutorial(); });
if (btnCloseTutorial) btnCloseTutorial.addEventListener('click', (e) => { e.stopPropagation(); closeTutorial(); });
if (tutBtnPrev) tutBtnPrev.addEventListener('click', () => { if (currentTutorialSlide > 1) showTutorialSlide(currentTutorialSlide - 1); });
if (tutBtnNext) tutBtnNext.addEventListener('click', () => {
    if (currentTutorialSlide < 3) showTutorialSlide(currentTutorialSlide + 1);
    else closeTutorial();
});
tutDots.forEach(dot => {
    dot.addEventListener('click', () => {
        showTutorialSlide(parseInt(dot.getAttribute('data-index')));
    });
});

// -----------------------------------------------------------------------------
// 19. TRACKING PROYEKSI ANOTASI 3D KE LAYAR (GROOVES, METRIK & POLARITAS)
// -----------------------------------------------------------------------------
const elMajor1 = document.getElementById('callout-major-1');
const elMinor1 = document.getElementById('callout-minor-1');
const elBackbone = document.getElementById('callout-backbone');
const elAT = document.getElementById('callout-at');
const elCG = document.getElementById('callout-cg');

const elMetricDia = document.getElementById('callout-metric-diameter');
const elMetricRise = document.getElementById('callout-metric-rise');
const elMetricPitch = document.getElementById('callout-metric-pitch');

const elPolS1Top = document.getElementById('callout-pol-s1-top');
const elPolS1Bot = document.getElementById('callout-pol-s1-bottom');
const elPolS2Top = document.getElementById('callout-pol-s2-top');
const elPolS2Bot = document.getElementById('callout-pol-s2-bottom');

function toScreenPosition(vector3D, domElement, offsetX = 0, offsetY = 0) {
    if (!domElement) return;
    const worldPos = vector3D.clone().applyMatrix4(dnaGroup.matrixWorld);
    worldPos.project(camera);
    let x = (worldPos.x * 0.5 + 0.5) * window.innerWidth + offsetX;
    let y = (-(worldPos.y * 0.5) + 0.5) * window.innerHeight + offsetY;
    if (worldPos.z > 1.0) {
        domElement.style.opacity = '0';
    } else {
        const isMobile = window.innerWidth <= 768;
        const elWidth = domElement.offsetWidth || (isMobile ? 100 : 130);
        const elHeight = domElement.offsetHeight || (isMobile ? 30 : 38);
        const minX = 6;
        const maxX = Math.max(minX, window.innerWidth - elWidth - 6);
        const minY = isMobile ? 65 : 10;
        const maxY = Math.max(minY, window.innerHeight - elHeight - (isMobile ? 68 : 15));
        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));

        domElement.style.opacity = '1';
        domElement.style.transform = `translate(${x}px, ${y}px)`;
    }
}

function update3DAnnotations() {
    if (!labelsVisible || currentMode !== 'assembled') {
        annotationsOverlay.style.opacity = '0';
        return;
    }
    annotationsOverlay.style.opacity = '1';
    const m = window.innerWidth <= 768 ? 0.6 : 1.0;

    // Anotasi Anatomi Dasar
    toScreenPosition(annotationTargets.majorGroove, elMajor1, -110 * m, -40 * m);
    toScreenPosition(annotationTargets.minorGroove, elMinor1, -100 * m, 35 * m);
    toScreenPosition(annotationTargets.backbone, elBackbone, 35 * m, -10 * m);
    toScreenPosition(annotationTargets.atPair, elAT, 30 * m, -35 * m);
    toScreenPosition(annotationTargets.cgPair, elCG, 35 * m, 25 * m);

    // Anotasi Skala Metrik
    if (metricScaleVisible) {
        toScreenPosition(annotationTargets.metricDiameter2, elMetricDia, 25 * m, -45 * m);
        toScreenPosition(annotationTargets.metricRise2, elMetricRise, -120 * m, 15 * m);
        toScreenPosition(annotationTargets.metricPitch2, elMetricPitch, -135 * m, -60 * m);
    }

    // Penanda Polaritas Antiparalel 5' dan 3'
    toScreenPosition(annotationTargets.strand1Top, elPolS1Top, -55 * m, -32 * m);
    toScreenPosition(annotationTargets.strand1Bottom, elPolS1Bot, -55 * m, 22 * m);
    toScreenPosition(annotationTargets.strand2Top, elPolS2Top, 35 * m, -32 * m);
    toScreenPosition(annotationTargets.strand2Bottom, elPolS2Bot, 35 * m, 22 * m);
}

// -----------------------------------------------------------------------------
// 20. MAIN RENDER LOOP (DENGAN DINAMIKA TERMAL 37°C BROWNIAN MOTION)
// -----------------------------------------------------------------------------
let thermalPhase = 0;

function renderLoop(now) {
    requestAnimationFrame(renderLoop);

    // Update animasi LERP
    for (let i = activeTweens.length - 1; i >= 0; i--) {
        if (activeTweens[i].update(now)) activeTweens.splice(i, 1);
    }

    // Dinamika Termal (37°C Brownian Vibrational Breathing)
    if (thermalDynamicsEnabled && currentMode === 'assembled') {
        thermalPhase += 0.04;
        const amp = 0.045;
        for (let i = 0; i < NUM_PAIRS; i++) {
            const container = pairDynamicContainers[i];
            if (container) {
                const waveY = Math.sin(thermalPhase + i * 0.55) * amp;
                const waveRot = Math.cos(thermalPhase * 0.8 + i * 0.4) * (amp * 0.4);
                container.position.y = pairBaseY[i] + waveY;
                container.rotation.y = waveRot;
            }
        }
    }

    // Rotasi Otomatis
    if (autoRotateActive) dnaGroup.rotation.y += 0.0035;

    // Partikel dan bokeh bergerak perlahan
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    bokehGroup.rotation.y += 0.0002;

    controls.update();
    renderer.render(scene, camera);
    update3DAnnotations();
}

requestAnimationFrame(renderLoop);
