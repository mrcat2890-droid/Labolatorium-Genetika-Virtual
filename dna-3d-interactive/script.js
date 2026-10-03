/**
 * ==============================================================================
 * GEN-OS BIO-CORE: ULTRA-REALISTIC 3D B-DNA — PERFECTED VISUAL FIDELITY
 * Persis Meniru Ilustrasi Medis Ilmiah: Pita Tulang Punggung Tebal Pearlescent,
 * Batang Basa Silinder Berwarna dengan Cap Huruf, Ikatan H Putus-Putus, 
 * Pencahayaan Rim Iridescent, dan Latar Belakang Bokeh Mikroskopis.
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. DATA ILMIAH MOLEKULER
// -----------------------------------------------------------------------------
const DNA_DATA = {
    A: {
        name: "Adenina (Adenine)",
        class: "Basa Nitrogen Purin (Cincin Ganda)",
        formula: "C₅H₅N₅",
        weight: "135.13 g/mol",
        partner: "Timina (T) melalui 2 Ikatan Hidrogen",
        bonds: "2 Garis Titik Ikatan Hidrogen (A = T)",
        colorHex: "#1d63ff",
        colorNum: 0x1d63ff,
        desc: "Basa heterosiklik purin dengan dua cincin terpadu. Pada gambar referensi diberi warna biru solid dengan cap silinder huruf 'A'. Adenina selalu berpasangan komplementer dengan Timina.",
        func: "Menjaga stabilitas translasi informasi genetik dan membentuk pasangan stabil dengan energi disosiasi seimbang untuk replikasi DNA."
    },
    T: {
        name: "Timina (Thymine)",
        class: "Basa Nitrogen Pirimidina (Cincin Tunggal)",
        formula: "C₅H₆N₂O₂",
        weight: "126.11 g/mol",
        partner: "Adenina (A) melalui 2 Ikatan Hidrogen",
        bonds: "2 Garis Titik Ikatan Hidrogen (T = A)",
        colorHex: "#ffb703",
        colorNum: 0xffb703,
        desc: "Basa pirimidina berkarbon tunggal dengan gugus metil pada posisi C5. Pada gambar referensi diberi warna kuning cerah dengan cap huruf 'T'. Berpasangan dengan Adenina melalui dua jembatan hidrogen.",
        func: "Mencegah mutasi deaminasi spontan dalam sel dan memberikan tanda pengenal hidrofobik di lekukan mayor bagi faktor transkripsi."
    },
    G: {
        name: "Guanina (Guanine)",
        class: "Basa Nitrogen Purin (Cincin Ganda)",
        formula: "C₅H₅N₅O",
        weight: "151.13 g/mol",
        partner: "Sitosina (C) melalui 3 Ikatan Hidrogen",
        bonds: "3 Garis Titik Ikatan Hidrogen (G ≡ C)",
        colorHex: "#00d659",
        colorNum: 0x00d659,
        desc: "Basa purin beroksigen yang pada gambar referensi diberi warna hijau daun dengan cap huruf 'G'. Membentuk 3 jembatan ikatan hidrogen dengan Sitosina.",
        func: "Memberikan kekuatan termodinamika tertinggi pada untai heliks ganda berkat 3 ikatan hidrogen yang sangat kuat dan resisten terhadap denaturasi termal."
    },
    C: {
        name: "Sitosina (Cytosine)",
        class: "Basa Nitrogen Pirimidina (Cincin Tunggal)",
        formula: "C₄H₅N₃O",
        weight: "111.10 g/mol",
        partner: "Guanina (G) melalui 3 Ikatan Hidrogen",
        bonds: "3 Garis Titik Ikatan Hidrogen (C ≡ G)",
        colorHex: "#ff2a4b",
        colorNum: 0xff2a4b,
        desc: "Basa pirimidina cincin tunggal yang pada gambar referensi diberi warna merah koral cerah dengan cap huruf 'C'. Selalu berpasangan secara eksklusif dengan Guanina.",
        func: "Berpasangan erat dengan Guanina untuk menjamin kepadatan dan kerapian struktur heliks ganda DNA serta target utama modifikasi metilasi epigenetik."
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
        desc: "Pita heliks tebal berkelok dengan kilau mutiara lavender-kebiruan yang membungkus inti molekul DNA. Terdiri dari ikatan berulang antara fosfat bermuatan negatif dan gula deoksiribosa.",
        func: "Membentuk kerangka luar yang kokoh sekaligus menciptakan Lekukan Mayor (Major Groove) dan Lekukan Minor (Minor Groove) tempat enzim polimerase menempel."
    },
    hbond: {
        name: "Hydrogen Bonds (Ikatan Hidrogen)",
        class: "Jembatan Titik Elektrostatik Non-Kovalen",
        formula: "N-H···O / N-H···N",
        weight: "2 - 5 kkal/mol per ikatan",
        partner: "Penghubung Antar-Basa Komplementer",
        bonds: "2 Titik pada A-T | 3 Titik pada C-G",
        colorHex: "#ffffff",
        colorNum: 0xffffff,
        desc: "Visualisasi garis putus-putus titik putih bercahaya yang menjembatani pasangan basa di pusat heliks. A-T dihubungkan oleh 2 garis titik, sedangkan C-G dihubungkan oleh 3 garis titik.",
        func: "Memungkinkan pembukaan untai ganda secara reversibel saat replikasi dan transkripsi oleh enzim RNA polimerase tanpa merusak ikatan kovalen tulang punggung."
    }
};

// -----------------------------------------------------------------------------
// 2. SETUP SCENE, KAMERA, RENDERER & PENCAHAYAAN SINEMATIK
// -----------------------------------------------------------------------------
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
// Fog kebiruan untuk kedalaman atmosfer mikroskopis
scene.fog = new THREE.FogExp2(0x071833, 0.005);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// Exposure seimbang 1.05 agar warna kaya, pekat, dan tidak pudar / over-exposed
renderer.toneMappingExposure = 1.05;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1.0;
controls.panSpeed = 0.8;
controls.minDistance = 15;
controls.maxDistance = 140;
controls.target.set(0, 0, 0);
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};

// Adaptasi Kamera berdasarkan rasio layar
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

// ==========================================
// PENCAHAYAAN STUDIO TERUKUR — WARNA PEKAT & JELAS
// ==========================================
// Ambient biru lembut agar bayangan tidak gelap gulita namun tidak memutihkan warna
const ambientLight = new THREE.AmbientLight(0x0a1c38, 0.85);
scene.add(ambientLight);

// Hemisphere light seimbang
const hemiLight = new THREE.HemisphereLight(0x4070a8, 0x051024, 0.45);
scene.add(hemiLight);

// Key Light putih murni terarah untuk bayangan dan dimensi bentuk
const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
keyLight.position.set(-25, 40, 35);
scene.add(keyLight);

// Fill Light biru laut lembut
const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.55);
fillLight.position.set(35, -15, 30);
scene.add(fillLight);

// Rim Light putih kebiruan di tepi lekukan heliks
const rimLight = new THREE.DirectionalLight(0x8faaff, 1.35);
rimLight.position.set(10, 30, -40);
scene.add(rimLight);

// Rim Light ungu lavender lembut dari belakang bawah
const rimLight2 = new THREE.DirectionalLight(0x7c66dc, 0.75);
rimLight2.position.set(-25, -30, -25);
scene.add(rimLight2);

// Accent point light lembut di dekat pusat
const accentLight = new THREE.PointLight(0x4477ee, 0.5, 45);
accentLight.position.set(0, 5, 8);
scene.add(accentLight);

// -----------------------------------------------------------------------------
// 3. BACKGROUND: BOLA BOKEH BESAR + PARTIKEL HALUS
// Persis meniru latar biru-laut mikroskopis dengan depth-of-field pada gambar
// -----------------------------------------------------------------------------
const bokehGroup = new THREE.Group();
scene.add(bokehGroup);

// Bola bokeh besar — kabur & transparan, memberi kesan kedalaman mikroskopis
for (let i = 0; i < 28; i++) {
    const radius = 4 + Math.random() * 18;
    const bokehGeo = new THREE.SphereGeometry(radius, 24, 24);
    const brightness = 0.06 + Math.random() * 0.12;
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

// Partikel sitoplasma halus
const pCount = 250;
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
// 4. PROCEDURAL ENVIRONMENT MAP — Memberi Refleksi Pearlescent pada Material
// Ini kunci untuk menciptakan kilau mutiara realistis pada pita backbone
// -----------------------------------------------------------------------------
function createEnvMap() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Gradien biru-ungu-putih untuk simulasi refleksi langit/studio
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
// 5. GENERATOR TEKSTUR CAP HURUF — Warna Pekat, Solid, Kontras Tinggi & Jelas
// -----------------------------------------------------------------------------
function generateLetterBadgeTexture(letter, bgColorHex, textColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Lingkaran dasar berwarna solid pekat
    ctx.fillStyle = bgColorHex;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // Bingkai lingkaran luar warna lebih gelap untuk ketegasan visual
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(256, 256, 235, 0, Math.PI * 2);
    ctx.stroke();

    // Bingkai emboss dalam putih terang tajam
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(256, 256, 218, 0, Math.PI * 2);
    ctx.stroke();

    // Bayangan teks untuk keterbacaan maksimal
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.font = '900 270px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 260, 272);

    // Huruf kapital tebal kontras tinggi di tengah
    ctx.fillStyle = textColor;
    ctx.fillText(letter, 256, 268);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
}

// Warna pekat & tajam sesuai referensi: Biru Royal, Kuning Emas Amber, Hijau Zamrud, Merah Koral
const letterTextures = {
    A: generateLetterBadgeTexture('A', '#1d63ff', '#ffffff'),
    T: generateLetterBadgeTexture('T', '#ffb703', '#0a1628'), // T gelap di atas kuning amber
    G: generateLetterBadgeTexture('G', '#00d659', '#ffffff'),
    C: generateLetterBadgeTexture('C', '#ff2a4b', '#ffffff')
};

// -----------------------------------------------------------------------------
// 6. MATERIAL PBR REALISTIS BERWARNA PEKAT & BERKILAU
// -----------------------------------------------------------------------------
const materials = {
    // Pita Tulang Punggung — Lilac / Indigo Pekat Berkilau Mutiara
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
    // Adenin (A) — Biru Royal Pekat & Tajam
    A: new THREE.MeshPhysicalMaterial({
        color: 0x1d63ff,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        emissive: 0x072066,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.15
    }),
    // Timin (T) — Kuning Amber / Emas Hangat Cerah (Tidak Pucat / Tidak Kehijauan)
    T: new THREE.MeshPhysicalMaterial({
        color: 0xffb703,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        emissive: 0x593c00,
        emissiveIntensity: 0.32,
        envMap: envMap,
        envMapIntensity: 0.15
    }),
    // Guanin (G) — Hijau Zamrud Segar & Hidup
    G: new THREE.MeshPhysicalMaterial({
        color: 0x00d659,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        emissive: 0x00471b,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.15
    }),
    // Sitosin (C) — Merah Koral Menyala / Ruby Red
    C: new THREE.MeshPhysicalMaterial({
        color: 0xff2a4b,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        emissive: 0x590012,
        emissiveIntensity: 0.3,
        envMap: envMap,
        envMapIntensity: 0.15
    }),
    // Titik Ikatan Hidrogen — Putih Murni Bercahaya
    hbondDot: new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
};

// -----------------------------------------------------------------------------
// 7. PEMBUATAN STRUKTUR 3D DNA B-FORM — PROPORSI REALISTIS SESUAI GAMBAR
// Backbone SANGAT TEBAL, Batang Basa LEBIH BESAR, Sudut Heliks Asimetris
// -----------------------------------------------------------------------------
const dnaGroup = new THREE.Group();
dnaGroup.rotation.z = 0.30;    // Kemiringan diagonal seperti gambar
dnaGroup.rotation.x = 0.15;
scene.add(dnaGroup);

const NUM_PAIRS = 28;
const HELIX_RADIUS = 4.6;       // Sedikit lebih besar
const HEIGHT_STEP = 1.35;
const ANGLE_STEP = 0.355;       // ~10.5 base pairs per helical turn
const MAJOR_MINOR_OFFSET = 2.40; // Asimetris untuk Major/Minor Groove

const allInteractiveMeshes = [];
const strand1Meshes = [];
const strand2Meshes = [];
const baseMeshes = { A: [], T: [], G: [], C: [], backbone: [], hbond: [] };

const splinePointsStrand1 = [];
const splinePointsStrand2 = [];

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
    cgPair: new THREE.Vector3()
};

// Geometri batang basa yang lebih tebal dan badge lebih besar
const ROD_LENGTH = 1.5;
const ROD_RADIUS = 0.16;
const BADGE_RADIUS = 0.50;
const BADGE_HEIGHT = 0.28;

for (let i = 0; i < NUM_PAIRS; i++) {
    const y = (i - NUM_PAIRS / 2) * HEIGHT_STEP;
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
    const dir1 = new THREE.Vector3().subVectors(center, pos1).normalize();
    const dir2 = new THREE.Vector3().subVectors(center, pos2).normalize();

    const pair = sequence[i % sequence.length];
    const b1Type = pair.b1;
    const b2Type = pair.b2;
    const isCG = (b1Type === 'C' || b1Type === 'G');

    // --- BASA 1 (Untai 1) ---
    const base1Group = new THREE.Group();
    // Batang silinder berwarna
    const rod1Geo = new THREE.CylinderGeometry(ROD_RADIUS, ROD_RADIUS, ROD_LENGTH, 16);
    const rod1 = new THREE.Mesh(rod1Geo, materials[b1Type]);
    rod1.position.set(0, 0, ROD_LENGTH / 2);
    rod1.rotation.x = Math.PI / 2;
    base1Group.add(rod1);

    // Ujung bola halus pada pangkal batang (di backbone)
    const capGeo = new THREE.SphereGeometry(ROD_RADIUS * 1.15, 12, 12);
    const cap1 = new THREE.Mesh(capGeo, materials[b1Type]);
    cap1.position.set(0, 0, 0);
    base1Group.add(cap1);

    // Badge bundar di ujung batang — LEBIH BESAR dengan cap halus
    const badgeMat1 = new THREE.MeshPhysicalMaterial({
        map: letterTextures[b1Type],
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.2,
        emissive: 0x111111,
        envMap: envMap,
        envMapIntensity: 0.08
    });
    const badge1Geo = new THREE.CylinderGeometry(BADGE_RADIUS, BADGE_RADIUS, BADGE_HEIGHT, 32);
    const badge1 = new THREE.Mesh(badge1Geo, badgeMat1);
    badge1.position.set(0, 0, ROD_LENGTH + BADGE_RADIUS * 0.15);
    badge1.rotation.y = Math.PI / 2;
    base1Group.add(badge1);

    base1Group.position.copy(pos1);
    base1Group.lookAt(center);

    base1Group.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: b1Type, strand: 1, parentGroup: base1Group,
                initialPos: pos1.clone(), initialLookAt: center.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    dnaGroup.add(base1Group);
    strand1Meshes.push(base1Group);
    baseMeshes[b1Type].push(base1Group);

    // --- BASA 2 (Untai 2) ---
    const base2Group = new THREE.Group();
    const rod2Geo = new THREE.CylinderGeometry(ROD_RADIUS, ROD_RADIUS, ROD_LENGTH, 16);
    const rod2 = new THREE.Mesh(rod2Geo, materials[b2Type]);
    rod2.position.set(0, 0, ROD_LENGTH / 2);
    rod2.rotation.x = Math.PI / 2;
    base2Group.add(rod2);

    const cap2 = new THREE.Mesh(capGeo.clone(), materials[b2Type]);
    cap2.position.set(0, 0, 0);
    base2Group.add(cap2);

    const badgeMat2 = new THREE.MeshPhysicalMaterial({
        map: letterTextures[b2Type],
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.2,
        emissive: 0x111111,
        envMap: envMap,
        envMapIntensity: 0.08
    });
    const badge2Geo = new THREE.CylinderGeometry(BADGE_RADIUS, BADGE_RADIUS, BADGE_HEIGHT, 32);
    const badge2 = new THREE.Mesh(badge2Geo, badgeMat2);
    badge2.position.set(0, 0, ROD_LENGTH + BADGE_RADIUS * 0.15);
    badge2.rotation.y = Math.PI / 2;
    base2Group.add(badge2);

    base2Group.position.copy(pos2);
    base2Group.lookAt(center);

    base2Group.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: b2Type, strand: 2, parentGroup: base2Group,
                initialPos: pos2.clone(), initialLookAt: center.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    dnaGroup.add(base2Group);
    strand2Meshes.push(base2Group);
    baseMeshes[b2Type].push(base2Group);

    // --- IKATAN HIDROGEN: 2 Garis Titik A-T, 3 Garis Titik C-G ---
    const bondGroup = new THREE.Group();
    const bondLinesCount = isCG ? 3 : 2;
    const bondLineSpacing = isCG ? [-0.24, 0, 0.24] : [-0.18, 0.18];

    const tip1 = new THREE.Vector3().addVectors(pos1, dir1.clone().multiplyScalar(ROD_LENGTH + BADGE_RADIUS * 0.55));
    const tip2 = new THREE.Vector3().addVectors(pos2, dir2.clone().multiplyScalar(ROD_LENGTH + BADGE_RADIUS * 0.55));
    const gapVector = new THREE.Vector3().subVectors(tip2, tip1);
    const perpendicular = new THREE.Vector3(0, 1, 0).cross(gapVector).normalize();

    const dotsPerLine = 5;
    const dotGeo = new THREE.SphereGeometry(0.075, 10, 10);

    for (let line = 0; line < bondLinesCount; line++) {
        const lineOffset = perpendicular.clone().multiplyScalar(bondLineSpacing[line]);
        for (let d = 0; d < dotsPerLine; d++) {
            const fraction = (d + 0.5) / dotsPerLine;
            const dotPos = new THREE.Vector3()
                .addVectors(tip1, gapVector.clone().multiplyScalar(fraction))
                .add(lineOffset);
            const dotMesh = new THREE.Mesh(dotGeo, materials.hbondDot);
            dotMesh.position.copy(dotPos);
            bondGroup.add(dotMesh);
        }
    }

    bondGroup.traverse((child) => {
        if (child.isMesh) {
            child.userData = {
                type: 'hbond', parentGroup: bondGroup,
                initialPos: center.clone(), pairIndex: i
            };
            allInteractiveMeshes.push(child);
        }
    });
    dnaGroup.add(bondGroup);
    baseMeshes.hbond.push(bondGroup);

    // Simpan koordinat anotasi
    if (i === 13) { annotationTargets.cgPair.copy(center); annotationTargets.backbone.copy(pos2); }
    if (i === 15) { annotationTargets.atPair.copy(center); }
    if (i === 9) { annotationTargets.majorGroove.copy(center); }
    if (i === 17) { annotationTargets.minorGroove.copy(center); }
}

// --- PITA TULANG PUNGGUNG KONTINU: SANGAT TEBAL (radius 0.78) SESUAI GAMBAR ---
// Pada gambar referensi, backbone SANGAT TEBAL dan merupakan elemen visual utama
const BACKBONE_TUBE_RADIUS = 0.78;
const TUBE_SEGMENTS = 200;
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
// 8. MESIN ANIMASI MANDIRI (NATIVE VECTOR LERP ENGINE)
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
// 9. LOGIKA PEMISAHAN BAGIAN DNA
// -----------------------------------------------------------------------------
let currentMode = 'assembled';
let autoRotateActive = true;
let labelsVisible = true;

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
        if (type === 'backbone') { dest.x *= 2.4; dest.z *= 2.4; }
        else if (type === 'A') { dest.x -= 10; dest.z += (strand === 1 ? 4 : -4); }
        else if (type === 'T') { dest.x += 10; dest.z += (strand === 1 ? 4 : -4); }
        else if (type === 'G') { dest.x -= 13; dest.y *= 1.2; }
        else if (type === 'C') { dest.x += 13; dest.y *= 1.2; }
        else if (type === 'hbond') { dest.y *= 1.15; }
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
// 10. RESPONSIVE MOBILE DRAWER & MODAL MANAGEMENT
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
if (btnCloseControls) btnCloseControls.addEventListener('click', (e) => { e.stopPropagation(); controlsPanel.classList.remove('drawer-open'); modalBackdrop.classList.add('hidden'); });
if (btnCloseInspector) btnCloseInspector.addEventListener('click', (e) => { e.stopPropagation(); inspectorPanel.classList.remove('drawer-open'); modalBackdrop.classList.add('hidden'); });
if (modalBackdrop) modalBackdrop.addEventListener('click', closeAllDrawers);

// -----------------------------------------------------------------------------
// 11. TOGGLE ANOTASI & FILTER KOMPONEN
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
    allInteractiveMeshes.forEach(mesh => {
        const type = mesh.userData.type;
        const show = (filterType === 'all' || type === filterType);
        mesh.material.transparent = !show;
        mesh.material.opacity = show ? 1.0 : 0.1;
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
// 12. KONTROL ROTASI & KAMERA
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
// 13. RAYCASTER & INSPEKSI MOLEKULER DENGAN AUTO-POPUP MOBILE
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

window.addEventListener('click', (event) => {
    if (event.target.closest('#controls-panel') || event.target.closest('#app-header') ||
        event.target.closest('#inspector-panel') || event.target.closest('#mobile-dock') ||
        event.target.closest('#modal-backdrop') || event.target.closest('#interaction-hint')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allInteractiveMeshes, false);
    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        const type = clicked.userData.type;
        if (type) {
            showComponentDetails(type);
            const tg = clicked.userData.parentGroup || clicked;
            const origScale = tg.scale.clone();
            animateVector(tg.scale, origScale.clone().multiplyScalar(1.3), 200, easeOutBack);
            setTimeout(() => animateVector(tg.scale, origScale, 300, easeInOutCubic), 220);
        }
    }
});

window.addEventListener('mousemove', (event) => {
    if (event.target.closest('.glass-panel') || event.target.closest('#app-header') || event.target.closest('#mobile-dock')) {
        container.style.cursor = 'default'; return;
    }
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allInteractiveMeshes, false);
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
// 14. TRACKING PROYEKSI ANOTASI 3D KE LAYAR
// -----------------------------------------------------------------------------
const elMajor1 = document.getElementById('callout-major-1');
const elMinor1 = document.getElementById('callout-minor-1');
const elBackbone = document.getElementById('callout-backbone');
const elAT = document.getElementById('callout-at');
const elCG = document.getElementById('callout-cg');

function toScreenPosition(vector3D, domElement, offsetX = 0, offsetY = 0) {
    if (!domElement) return;
    const worldPos = vector3D.clone().applyMatrix4(dnaGroup.matrixWorld);
    worldPos.project(camera);
    const x = (worldPos.x * 0.5 + 0.5) * window.innerWidth + offsetX;
    const y = (-(worldPos.y * 0.5) + 0.5) * window.innerHeight + offsetY;
    if (worldPos.z > 1.0) { domElement.style.opacity = '0'; }
    else { domElement.style.opacity = '1'; domElement.style.transform = `translate(${x}px, ${y}px)`; }
}

function update3DAnnotations() {
    if (!labelsVisible || currentMode !== 'assembled') { annotationsOverlay.style.opacity = '0'; return; }
    annotationsOverlay.style.opacity = '1';
    const m = window.innerWidth <= 768 ? 0.6 : 1.0;
    toScreenPosition(annotationTargets.majorGroove, elMajor1, -110 * m, -40 * m);
    toScreenPosition(annotationTargets.minorGroove, elMinor1, -100 * m, 35 * m);
    toScreenPosition(annotationTargets.backbone, elBackbone, 35 * m, -10 * m);
    toScreenPosition(annotationTargets.atPair, elAT, 30 * m, -35 * m);
    toScreenPosition(annotationTargets.cgPair, elCG, 35 * m, 25 * m);
}

// -----------------------------------------------------------------------------
// 15. MAIN RENDER LOOP
// -----------------------------------------------------------------------------
function renderLoop(now) {
    requestAnimationFrame(renderLoop);

    // Update animasi
    for (let i = activeTweens.length - 1; i >= 0; i--) {
        if (activeTweens[i].update(now)) activeTweens.splice(i, 1);
    }

    // Rotasi Otomatis
    if (autoRotateActive) dnaGroup.rotation.y += 0.004;

    // Partikel dan bokeh bergerak perlahan
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    bokehGroup.rotation.y += 0.0002;

    controls.update();
    renderer.render(scene, camera);
    update3DAnnotations();
}

requestAnimationFrame(renderLoop);
