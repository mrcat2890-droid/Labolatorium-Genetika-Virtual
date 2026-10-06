/**
 * ==============================================================================
 * GEN-OS BIO-CORE: 3D CHROMOSOME INTERACTIVE SIMULATION (ULTRA-REALISTIC V2.0)
 * Sitogenetika Metafase Komprehensif Berdasarkan Literatur Ilmiah Internasional:
 * - Earnshaw & Laemmli (1983) & Maeshima et al. (2016): Arsitektur Lup Kromatin SEM
 * - Rieder (1982) & Cheeseman & Desai (2008): Lempeng Kinetokor Trilaminar & K-Fibers
 * - Standar Sitogenetika Medis Internasional ISCN 2020: Morfologi & G-Banding
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. BASIS DATA ILMIAH SITOGENETIKA KROMOSOM (ISCN 2020 & CELL BIOLOGY STANDARD)
// -----------------------------------------------------------------------------
const CHROMOSOME_DATA = {
    centromere: {
        name: "Sentromer (Centromere / Konstriksi Primer)",
        class: "Daerah Heterokromatin Sentromerik Terkondensasi Padat",
        formula: "DNA Satelit Alfa (~171 bp repeat) + Nukleosom Varian CENP-A",
        loc: "Penyempitan Primer Penghubung Antar Kromatid Saudara",
        role: "Penyatuan Kromatid via Kohesin & Landasan Perakitan Kinetokor",
        clinical: "Kerusakan sentromerik memicu gagal pisah kromosom (nondisjunction / aneuploidi)",
        colorHex: "#f59e0b",
        colorNum: 0xf59e0b,
        desc: "Sentromer adalah daerah penyempitan primer pada kromosom tempat dua kromatid saudara menyatu erat melalui kompleks cincin protein kohesin. Daerah ini tersusun atas sekuens DNA repetitif berulang (DNA satelit alfa) yang menggantikan histon H3 standar dengan varian CENP-A untuk membentuk cetak biru epigenetik kinetokor.",
        func: "Menahan kedua kromatid saudara tetap bersatu sampai pos pemeriksaan mitosis (SAC) terpenuhi, serta menjadi landasan struktural bagi perakitan kompleks kinetokor yang menuntun pemisahan kromosom saat anafase."
    },
    kinetochore: {
        name: "Kinetokor Trilaminar (Trilaminar Kinetochore)",
        class: "Kompleks Multi-Protein Motorik Berlapis Tiga (KMN Network)",
        formula: "Inner Plate (CENP-C/T) + Interzone + Outer Plate (Ndc80, Mis12, Knl1)",
        loc: "Permukaan Luar Heterokromatin Sentromerik pada Kedua Kromatid",
        role: "Penambat Ujung Plus Benang Spindel & Pembangkit Gaya Tarik Anafase",
        clinical: "Target utama Pos Pemeriksaan Perakitan Spindel (Spindle Assembly Checkpoint / SAC)",
        colorHex: "#ef4444",
        colorNum: 0xef4444,
        desc: "Kinetokor adalah struktur protein cakram berlapis tiga yang dirakit di atas heterokromatin sentromerik. Lapisan dalam (inner plate) mengikat DNA satelit alfa, lapisan tengah transparan secara elektron, dan lapisan luar (outer plate KMN network) menambat 20-30 mikrotubulus benang spindel mitotic.",
        func: "Merasakan tegangan mekanik tarikan benang spindel (bi-orientasi amfitelik). Jika terjadi ketidakseimbangan tegangan, kompleks Mad2/BubR1 menghentikan siklus sel sampai semua kinetokor tertambat dengan benar ke kutub berlawanan."
    },
    telomere: {
        name: "Telomer & Struktur T-Loop (Telomere)",
        class: "Tudung Pelindung Terminal Heksanukleotida & Kompleks Shelterin",
        formula: "Pengulangan Tandem (TTAGGG)ₙ (10-15 kb) + Shelterin (TRF1, TRF2, POT1)",
        loc: "Ekstremitas Terminal pada Keempat Ujung Lengan Kromatid",
        role: "Mencegah Degradasi Enzimatik DNA & Fusi Antar-Kromosom Abnormal",
        clinical: "Pemendekan telomer memicu penuaan seluler (senescence) & reaktivasi telomerase pada kanker",
        colorHex: "#eab308",
        colorNum: 0xeab308,
        desc: "Telomer adalah tudung nukleoprotein khusus di ujung kromosom eukariotik. Ujung untai tunggal 3' DNA melipat kembali membentuk lengkung T-loop dan D-loop yang dikunci oleh kompleks protein shelterin, menyembunyikan ujung DNA bebas dari sensor perbaikan DNA seluler.",
        func: "Melindungi ujung molekul DNA dari degradasi oleh enzim nuklease dan mencegah sistem perbaikan DNA sel memperlakukan ujung kromosom sebagai patahan untai ganda (double-strand break) yang memicu fusi cincin atau translokasi."
    },
    parm: {
        name: "Lengan Pendek (p arm / Petite Arm)",
        class: "Segmen Kromatin Superior di Atas Konstriksi Primer",
        formula: "Lup Kromatin Radial 30-100 nm terikat Perancah Kondensin I/II",
        loc: "Bagian Superior / Proksimal dari Sentromer",
        role: "Menampung Kluster Gen Fungsional & Lokus Spesifik",
        clinical: "Delesi segmen lengan pendek menyebabkan kelainan genetik (misal Sindrom Cri-du-chat 5p-)",
        colorHex: "#06b6d4",
        colorNum: 0x06b6d4,
        desc: "Lengan pendek kromosom, disingkat lengan 'p' (dari bahasa Prancis 'petite' yang berarti kecil), adalah segmen kromatid di atas sentromer pada orientasi sitogenetika standar. Rasio panjang lengan p terhadap q menentukan klasifikasi morfologi kromosom (metasentris, submetasentris, atau akrosentris).",
        func: "Menyimpan kelompok gen esensial bagi perkembangan embrionik, metabolisme, dan diferensiasi seluler yang diekspresikan secara presisi selama siklus hidup sel eukariotik."
    },
    qarm: {
        name: "Lengan Panjang (q arm / Queue Arm)",
        class: "Segmen Kromatin Inferior di Bawah Konstriksi Primer",
        formula: "Domain Lup Topologi Terkondensasi Padat (TADs) + Topoisomerase IIα",
        loc: "Bagian Inferior / Distal dari Sentromer",
        role: "Menampung Sebagian Besar Urutan Pengkode Genomik Manusia",
        clinical: "Translokasi timbal balik (misal kromosom Philadelphia t(9;22)(q34;q11) pada leukemia CML)",
        colorHex: "#3b82f6",
        colorNum: 0x3b82f6,
        desc: "Lengan panjang kromosom, disingkat lengan 'q' (huruf setelah 'p' dalam alfabet atau dari 'queue' yang berarti ekor), mewakili segmen genom yang lebih masif pada sebagian besar kromosom manusia dengan kepadatan informasi genetik yang tinggi.",
        func: "Menyediakan ruang genomik bagi ribuan gen pengkode enzim, reseptor, dan faktor transkripsi, serta elemen pengendali transkripsi jarak jauh (enhancer dan insulator)."
    },
    bands: {
        name: "Pita G-Bands (Giemsa Banding / ISCN Cytogenetic Bands)",
        class: "Pola Pita Horizontal Karakteristik Sitogenetika Klinis",
        formula: "Pita Gelap G+ (Heterokromatin Kaya A-T) vs Pita Terang G- (Eukromatin Kaya G-C)",
        loc: "Berselang-Seling secara Teratur di Sepanjang Seluruh Lengan p dan q",
        role: "Barcode Genetik untuk Pemetaan Lokus & Diagnosis Penyakit Sitogenetika",
        clinical: "Mendeteksi translokasi kromosom, delesi interstisial, mikroduplikasi, dan inversi perisentrik",
        colorHex: "#94a3b8",
        colorNum: 0x94a3b8,
        desc: "Pita G-Bands adalah pola pita melintang spesifik yang dihasilkan setelah pencernaan parsial kromosom dengan tripsin dan pewarnaan Giemsa. Pita gelap menandakan heterokromatin kondensasi padat yang kaya pasangan basa A-T dan lambat bereplikasi, sedangkan pita terang menandakan eukromatin aktif kaya pasangan basa G-C.",
        func: "Berfungsi sebagai 'kode batang genetik' standar internasional (ISCN 2020) yang memungkinkan identifikasi tiap pasangan kromosom nomor 1 sampai 23 serta penentuan koordinat titik patah (breakpoint) mutasi struktural."
    },
    satellite: {
        name: "Satelit Kromosom & Daerah NOR (Nucleolar Organizer Region)",
        class: "Segmen Trabant Bulat Terminal & Konstriksi Sekunder",
        formula: "Kluster Tandem Gen rRNA (18S, 5.8S, 28S) + Faktor Transkripsi UBF/RNA Pol I",
        loc: "Ujung Distal Lengan Pendek Kromosom Akrosentris (Kromosom 13, 14, 15, 21, 22)",
        role: "Pusat Pengkodean Sintesis Ribosomal RNA (rRNA) & Pembentukan Nukleolus",
        clinical: "Translokasi Robertsonik (misal der(14;21) penyebab Sindrom Down translokasi 4%)",
        colorHex: "#10b981",
        colorNum: 0x10b981,
        desc: "Satelit kromosom (trabant) adalah badan bulat kecil di ujung lengan pendek kromosom akrosentris manusia yang dihubungkan oleh tangkai tipis konstriksi sekunder. Tangkai ini mengandung daerah pengatur nukleolus (NOR) yang memuat ratusan salinan gen pengkode RNA ribosom.",
        func: "Menyusun dan mengorganisasi nukleolus di dalam inti sel selama interfase untuk merakit ribosom baru yang mutlak diperlukan untuk sintesis protein di seluruh organel sel."
    },
    spindle: {
        name: "Serat Spindel Kinetokor (K-Fibers Microtubules)",
        class: "Berkas Mikrotubulus Paralel Polimer Heterodimer Tubulin",
        formula: "Berkas 20-30 Mikrotubulus berdiameter 25 nm per Kinetokor (α/β-tubulin)",
        loc: "Membentang dari Sentrosom Kutub Sel Menembus Pelat Luar Kinetokor",
        role: "Pembangkit Gaya Mekanis Penarik Kromatid Saudara ke Dua Kutub Sel",
        clinical: "Sasaran utama obat kemoterapi kanker anti-mitosis (misal Paclitaxel, Vinblastin)",
        colorHex: "#38bdf8",
        colorNum: 0x38bdf8,
        desc: "K-fibers (kinetochore fibers) adalah berkas kabel protein mikrotubulus berdiameter 25 nm yang berikatan kuat pada kompleks Ndc80 di pelat luar kinetokor. Berkas ini berfungsi seperti tali derek biologi bertegangan tinggi.",
        func: "Mengerahkan gaya tarik depolimerisasi ujung plus (pacman mechanism) dan flux tubulin kutub untuk membelah sentromer dan menghela kromatid saudara ke kutub sel yang berlawanan pada fase anafase."
    }
};

// -----------------------------------------------------------------------------
// 2. SETUP SCENE, KAMERA PERSPEKTIF, RENDERER & PENCAHAYAAN STUDIO
// -----------------------------------------------------------------------------
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x061126, 0.005);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

// OrbitControls Responsif Multi-Device
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
        camera.fov = 55;
        camera.position.set(0, 4, 58);
    } else if (aspect < 0.85) {
        camera.fov = 48;
        camera.position.set(0, 5, 52);
    } else if (aspect < 1.15) {
        camera.fov = 44;
        camera.position.set(0, 6, 46);
    } else if (aspect < 1.7) {
        camera.fov = 40;
        camera.position.set(0, 6, 42);
    } else {
        camera.fov = 38;
        camera.position.set(0, 7, 40);
    }

    camera.updateProjectionMatrix();
    controls.update();
}
adjustCameraForDevice();

// Pencahayaan Sinematik Biologis
const ambientLight = new THREE.AmbientLight(0x0c2044, 0.9);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0x5285c5, 0x07152b, 0.55);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
keyLight.position.set(-25, 35, 35);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
fillLight.position.set(35, -15, 30);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xa5b4fc, 1.5);
rimLight.position.set(10, 30, -35);
scene.add(rimLight);

const rimLight2 = new THREE.DirectionalLight(0x9333ea, 0.8);
rimLight2.position.set(-25, -30, -25);
scene.add(rimLight2);

// -----------------------------------------------------------------------------
// 3. BACKGROUND BOKEH & PARTIKEL SITOPLASMA
// -----------------------------------------------------------------------------
const bokehGroup = new THREE.Group();
scene.add(bokehGroup);

const bokehColors = [0x0f3562, 0x1e3a8a, 0x312e81, 0x581c87];
for (let i = 0; i < 22; i++) {
    const radius = 5 + Math.random() * 15;
    const bokehGeo = new THREE.SphereGeometry(radius, 20, 20);
    const bokehMat = new THREE.MeshBasicMaterial({
        color: bokehColors[i % bokehColors.length],
        transparent: true,
        opacity: 0.10 + Math.random() * 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const bokehMesh = new THREE.Mesh(bokehGeo, bokehMat);
    bokehMesh.position.set(
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 110,
        -35 - Math.random() * 55
    );
    bokehGroup.add(bokehMesh);
}

const pCount = 240;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 120;
    pPos[i + 1] = (Math.random() - 0.5) * 100;
    pPos[i + 2] = (Math.random() - 0.5) * 90;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pMat = new THREE.PointsMaterial({
    color: 0x67e8f9,
    size: 0.65,
    transparent: true,
    opacity: 0.38,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// -----------------------------------------------------------------------------
// 4. TEKSTUR PROCEDURAL SEM CHROMATIN LOOPS & ENVIRONMENT MAP
// -----------------------------------------------------------------------------
function createChromatinTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 1600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = 2.5 + Math.random() * 5.5;
        const brightness = Math.floor(90 + Math.random() * 140);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgb(${brightness}, ${brightness}, ${brightness})`);
        grad.addColorStop(0.7, `rgb(${Math.floor(brightness * 0.7)}, ${Math.floor(brightness * 0.7)}, ${Math.floor(brightness * 0.7)})`);
        grad.addColorStop(1, 'rgba(128, 128, 128, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.strokeStyle = 'rgba(200, 200, 200, 0.22)';
    ctx.lineWidth = 3;
    for (let y = 0; y < 512; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= 512; x += 32) {
            ctx.quadraticCurveTo(x + 16, y + Math.sin(x * 0.12) * 5, x + 32, y);
        }
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 10);
    return texture;
}

const chromatinBumpMap = createChromatinTexture();

function createEnvMap() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, size);
    grd.addColorStop(0.0, '#384c7d');
    grd.addColorStop(0.5, '#7694d9');
    grd.addColorStop(1.0, '#0d1d3d');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
}

const envMap = createEnvMap();

const MATERIALS_BY_MODE = {
    sem: {
        parm: new THREE.MeshPhysicalMaterial({
            color: 0x3b82f6,
            roughness: 0.55,
            metalness: 0.08,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.06,
            clearcoat: 0.35,
            clearcoatRoughness: 0.4,
            emissive: 0x0f2b5c,
            emissiveIntensity: 0.2,
            envMap: envMap,
            envMapIntensity: 0.25
        }),
        qarm: new THREE.MeshPhysicalMaterial({
            color: 0x1d4ed8,
            roughness: 0.55,
            metalness: 0.08,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.06,
            clearcoat: 0.35,
            clearcoatRoughness: 0.4,
            emissive: 0x0c214d,
            emissiveIntensity: 0.2,
            envMap: envMap,
            envMapIntensity: 0.25
        }),
        centromere: new THREE.MeshPhysicalMaterial({
            color: 0xd97706,
            roughness: 0.42,
            metalness: 0.12,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.04,
            clearcoat: 0.45,
            clearcoatRoughness: 0.3,
            emissive: 0x78350f,
            emissiveIntensity: 0.35,
            envMap: envMap,
            envMapIntensity: 0.3
        }),
        kinetochoreInner: new THREE.MeshPhysicalMaterial({
            color: 0x991b1b,
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0x450a0a,
            emissiveIntensity: 0.4
        }),
        kinetochoreOuter: new THREE.MeshPhysicalMaterial({
            color: 0xef4444,
            roughness: 0.2,
            metalness: 0.3,
            clearcoat: 0.8,
            emissive: 0x7f1d1d,
            emissiveIntensity: 0.55
        }),
        telomere: new THREE.MeshPhysicalMaterial({
            color: 0xeab308,
            roughness: 0.35,
            metalness: 0.15,
            clearcoat: 0.6,
            emissive: 0x713f12,
            emissiveIntensity: 0.45
        }),
        satellite: new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            roughness: 0.45,
            metalness: 0.1,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.05,
            clearcoat: 0.4,
            emissive: 0x064e3b,
            emissiveIntensity: 0.3
        }),
        gbandDark: new THREE.MeshPhysicalMaterial({
            color: 0x1e293b,
            roughness: 0.6,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.05,
            emissive: 0x090d16,
            emissiveIntensity: 0.2
        }),
        gbandLight: new THREE.MeshPhysicalMaterial({
            color: 0x94a3b8,
            roughness: 0.5,
            bumpMap: chromatinBumpMap,
            bumpScale: 0.05,
            emissive: 0x1e293b,
            emissiveIntensity: 0.2
        }),
        spindleFiber: new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.75
        })
    },
    fluorescent: {
        parm: new THREE.MeshPhysicalMaterial({
            color: 0x0284c7,
            roughness: 0.25,
            metalness: 0.1,
            clearcoat: 0.6,
            emissive: 0x0369a1,
            emissiveIntensity: 0.45,
            envMap: envMap,
            envMapIntensity: 0.35
        }),
        qarm: new THREE.MeshPhysicalMaterial({
            color: 0x2563eb,
            roughness: 0.25,
            metalness: 0.1,
            clearcoat: 0.6,
            emissive: 0x1d4ed8,
            emissiveIntensity: 0.45,
            envMap: envMap,
            envMapIntensity: 0.35
        }),
        centromere: new THREE.MeshPhysicalMaterial({
            color: 0xf59e0b,
            roughness: 0.2,
            metalness: 0.15,
            clearcoat: 0.7,
            emissive: 0xd97706,
            emissiveIntensity: 0.65
        }),
        kinetochoreInner: new THREE.MeshPhysicalMaterial({
            color: 0xb91c1c,
            roughness: 0.2,
            emissive: 0x991b1b,
            emissiveIntensity: 0.6
        }),
        kinetochoreOuter: new THREE.MeshPhysicalMaterial({
            color: 0xff2a55,
            roughness: 0.15,
            metalness: 0.2,
            clearcoat: 0.9,
            emissive: 0xff0037,
            emissiveIntensity: 0.85
        }),
        telomere: new THREE.MeshPhysicalMaterial({
            color: 0xfacc15,
            roughness: 0.15,
            metalness: 0.2,
            clearcoat: 0.9,
            emissive: 0xeab308,
            emissiveIntensity: 0.85
        }),
        satellite: new THREE.MeshPhysicalMaterial({
            color: 0x34d399,
            roughness: 0.2,
            metalness: 0.15,
            clearcoat: 0.7,
            emissive: 0x059669,
            emissiveIntensity: 0.65
        }),
        gbandDark: new THREE.MeshPhysicalMaterial({
            color: 0x0a1128,
            roughness: 0.3,
            metalness: 0.05,
            emissive: 0x050814,
            emissiveIntensity: 0.25
        }),
        gbandLight: new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            roughness: 0.2,
            metalness: 0.1,
            clearcoat: 0.5,
            emissive: 0x0284c7,
            emissiveIntensity: 0.55
        }),
        spindleFiber: new THREE.MeshBasicMaterial({
            color: 0x67e8f9,
            transparent: true,
            opacity: 0.9
        })
    },
    hierarchical: {
        parm: new THREE.MeshPhysicalMaterial({
            color: 0x8b5cf6,
            roughness: 0.35,
            metalness: 0.08,
            clearcoat: 0.5,
            emissive: 0x6d28d9,
            emissiveIntensity: 0.35
        }),
        qarm: new THREE.MeshPhysicalMaterial({
            color: 0x06b6d4,
            roughness: 0.35,
            metalness: 0.08,
            clearcoat: 0.5,
            emissive: 0x0891b2,
            emissiveIntensity: 0.35
        }),
        centromere: new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            roughness: 0.3,
            metalness: 0.1,
            clearcoat: 0.6,
            emissive: 0x047857,
            emissiveIntensity: 0.4
        }),
        kinetochoreInner: new THREE.MeshPhysicalMaterial({
            color: 0xf43f5e,
            roughness: 0.25,
            emissive: 0xe11d48,
            emissiveIntensity: 0.5
        }),
        kinetochoreOuter: new THREE.MeshPhysicalMaterial({
            color: 0xfb7185,
            roughness: 0.2,
            metalness: 0.2,
            clearcoat: 0.8,
            emissive: 0xf43f5e,
            emissiveIntensity: 0.65
        }),
        telomere: new THREE.MeshPhysicalMaterial({
            color: 0xf59e0b,
            roughness: 0.25,
            metalness: 0.15,
            clearcoat: 0.7,
            emissive: 0xd97706,
            emissiveIntensity: 0.55
        }),
        satellite: new THREE.MeshPhysicalMaterial({
            color: 0xa855f7,
            roughness: 0.3,
            metalness: 0.1,
            clearcoat: 0.5,
            emissive: 0x9333ea,
            emissiveIntensity: 0.45
        }),
        gbandDark: new THREE.MeshPhysicalMaterial({
            color: 0x4338ca,
            roughness: 0.4,
            emissive: 0x3730a3,
            emissiveIntensity: 0.3
        }),
        gbandLight: new THREE.MeshPhysicalMaterial({
            color: 0xc084fc,
            roughness: 0.3,
            emissive: 0xa855f7,
            emissiveIntensity: 0.4
        }),
        spindleFiber: new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.8
        })
    }
};

let currentVisualMode = 'sem';
let activeMaterials = MATERIALS_BY_MODE[currentVisualMode];

// -----------------------------------------------------------------------------
// 5. MORFOLOGI STANDAR ISCN 2020
// -----------------------------------------------------------------------------
const MORPHOLOGY_CONFIG = {
    metacentric: {
        pLength: 11.2,
        qLength: 14.5,
        radius: 1.35,
        hasSatellite: false,
        name: "Metasentris (p ≈ q)",
        calloutTargetP: new THREE.Vector3(-2.8, 6.2, 0),
        calloutTargetQ: new THREE.Vector3(3.6, -10.5, 0),
        calloutTargetCen: new THREE.Vector3(0.8, 0, 0),
        calloutTargetKin: new THREE.Vector3(-2.3, 0, 0),
        calloutTargetTel: new THREE.Vector3(-2.0, 11.5, 0),
        calloutTargetSat: null
    },
    submetacentric: {
        pLength: 7.2,
        qLength: 18.0,
        radius: 1.35,
        hasSatellite: false,
        name: "Submetasentris (p < q)",
        calloutTargetP: new THREE.Vector3(-2.6, 4.0, 0),
        calloutTargetQ: new THREE.Vector3(3.8, -12.5, 0),
        calloutTargetCen: new THREE.Vector3(0.8, 0, 0),
        calloutTargetKin: new THREE.Vector3(-2.3, 0, 0),
        calloutTargetTel: new THREE.Vector3(-1.8, 7.5, 0),
        calloutTargetSat: null
    },
    acrocentric: {
        pLength: 3.2,
        qLength: 20.5,
        radius: 1.35,
        hasSatellite: true,
        satelliteOffset: 4.8,
        name: "Akrosentris + Satelit NOR",
        calloutTargetP: new THREE.Vector3(-2.0, 2.0, 0),
        calloutTargetQ: new THREE.Vector3(3.9, -14.0, 0),
        calloutTargetCen: new THREE.Vector3(0.8, 0, 0),
        calloutTargetKin: new THREE.Vector3(-2.3, 0, 0),
        calloutTargetTel: new THREE.Vector3(2.5, -20.5, 0),
        calloutTargetSat: new THREE.Vector3(-1.8, 5.2, 0)
    }
};

let currentMorphology = 'metacentric';

// -----------------------------------------------------------------------------
// 6. STATE SIMULASI & REFERENSI ELEMEN DOM (DEKLARASI DI AWAL SEBELUM PEMANGGILAN)
// -----------------------------------------------------------------------------
let currentMode = 'assembled';
let autoRotateActive = true;
let labelsVisible = true;
let spindleActive = true;
let thermalActive = true;

// Grup 3D Objek
const chromosomeGroup = new THREE.Group();
chromosomeGroup.rotation.z = 0.08;
scene.add(chromosomeGroup);

const spindleGroup = new THREE.Group();
scene.add(spindleGroup);

let allInteractiveMeshes = [];
let chromatid1Meshes = [];
let chromatid2Meshes = [];
let chromatid1Group = null;
let chromatid2Group = null;
let spindleFibersList = [];

const categoryMeshes = {
    centromere: [],
    kinetochore: [],
    telomere: [],
    parm: [],
    qarm: [],
    bands: [],
    satellite: [],
    spindle: []
};

let annotationTargets = {
    parm: new THREE.Vector3(-2.8, 6.0, 0),
    qarm: new THREE.Vector3(3.6, -11.0, 0),
    centromere: new THREE.Vector3(0.8, 0, 0),
    kinetochore: new THREE.Vector3(-2.3, 0, 0),
    telomere: new THREE.Vector3(-2.0, 11.5, 0),
    satellite: null
};

// Referensi DOM Tombol Kontrol
const btnAnaphase = document.getElementById('btn-anaphase');
const btnExplode = document.getElementById('btn-explode');
const btnResetAssembly = document.getElementById('btn-reset-assembly');
const dockBtnAnaphase = document.getElementById('dock-btn-anaphase');
const dockBtnExplode = document.getElementById('dock-btn-explode');
const dockBtnReset = document.getElementById('dock-btn-reset');
const annotationsOverlay = document.getElementById('annotations-overlay');

// Panel & Drawer
const controlsPanel = document.getElementById('controls-panel');
const inspectorPanel = document.getElementById('inspector-panel');
const modalBackdrop = document.getElementById('modal-backdrop');

const btnToggleControlsPanel = document.getElementById('btn-toggle-controls-panel');
const btnToggleInspectorPanel = document.getElementById('btn-toggle-inspector-panel');
const dockBtnMenu = document.getElementById('dock-btn-menu');
const dockBtnInspect = document.getElementById('dock-btn-inspect');
const btnCloseControls = document.getElementById('btn-close-controls');
const btnCloseInspector = document.getElementById('btn-close-inspector');

// Tutorial Elements
const tutorialModal = document.getElementById('tutorial-modal');
const btnOpenTutorial = document.getElementById('btn-open-tutorial');
const btnCloseTutorial = document.getElementById('btn-close-tutorial');
const tutorialBtnPrev = document.getElementById('tutorial-btn-prev');
const tutorialBtnNext = document.getElementById('tutorial-btn-next');
const tutorialSlides = document.querySelectorAll('.tutorial-slide');
const tutorialDots = document.querySelectorAll('.tutorial-dots .dot');

// Mode & Morfologi Buttons
const modeButtons = document.querySelectorAll('.mode-btn');
const morphButtons = document.querySelectorAll('.morph-btn');
const btnToggleSpindle = document.getElementById('btn-toggle-spindle');
const spindleStatusText = document.getElementById('spindle-status-text');
const btnToggleThermal = document.getElementById('btn-toggle-thermal');
const thermalStatusText = document.getElementById('thermal-status-text');
const btnToggleLabels = document.getElementById('btn-toggle-labels');
const labelStatusText = document.getElementById('label-status-text');
const filterChips = document.querySelectorAll('.filter-chips .chip');
const btnToggleRotate = document.getElementById('btn-toggle-rotate');
const rotateStatusLabel = document.getElementById('rotate-status-label');
const btnResetCamera = document.getElementById('btn-reset-camera');

// Inspector Detail Elements
const inspectorPlaceholder = document.getElementById('inspector-placeholder');
const inspectorDetails = document.getElementById('inspector-details');
const detailTitle = document.getElementById('detail-title');
const detailClass = document.getElementById('detail-class');
const detailFormula = document.getElementById('detail-formula');
const detailLoc = document.getElementById('detail-loc');
const detailRole = document.getElementById('detail-role');
const detailClinical = document.getElementById('detail-clinical');
const detailDesc = document.getElementById('detail-desc');
const detailFunction = document.getElementById('detail-function');
const detailColorIndicator = document.getElementById('detail-color-indicator');

// Anotasi 3D Elements
const elParm = document.getElementById('callout-parm');
const elCentromere = document.getElementById('callout-centromere');
const elKinetochore = document.getElementById('callout-kinetochore');
const elQarm = document.getElementById('callout-qarm');
const elTelomere = document.getElementById('callout-telomere');
const elSatellite = document.getElementById('callout-satellite');

// -----------------------------------------------------------------------------
// 7. MESIN ANIMASI MANDIRI (NATIVE VECTOR LERP ENGINE)
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

function animateVector(target, dest, durationMs = 1200, easing = easeInOutCubic) {
    const startX = target.x;
    const startY = target.y;
    const startZ = target.z;
    const destX = dest.x !== undefined ? dest.x : startX;
    const destY = dest.y !== undefined ? dest.y : startY;
    const destZ = dest.z !== undefined ? dest.z : startZ;
    const startTime = performance.now();

    const tween = {
        update: (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1.0);
            const ease = easing(progress);

            target.x = startX + (destX - startX) * ease;
            target.y = startY + (destY - startY) * ease;
            target.z = startZ + (destZ - startZ) * ease;

            return progress >= 1.0;
        }
    };
    activeTweens.push(tween);
    return tween;
}

function updateButtonStates() {
    const assembled = (currentMode === 'assembled');
    if (btnAnaphase) btnAnaphase.classList.toggle('hidden', !assembled);
    if (btnExplode) btnExplode.classList.toggle('hidden', !assembled);
    if (btnResetAssembly) btnResetAssembly.classList.toggle('hidden', assembled);

    if (dockBtnAnaphase) dockBtnAnaphase.classList.toggle('hidden', !assembled);
    if (dockBtnExplode) dockBtnExplode.classList.toggle('hidden', !assembled);
    if (dockBtnReset) dockBtnReset.classList.toggle('hidden', assembled);
}

// -----------------------------------------------------------------------------
// 8. FUNGSI PEMBANGUN ARSITEKTUR 3D KROMOSOM
// -----------------------------------------------------------------------------
function buildChromatidBranch(sideSign, config) {
    const chromatidGroup = new THREE.Group();
    const strandId = (sideSign < 0) ? 1 : 2;
    const chromatidMeshList = (sideSign < 0) ? chromatid1Meshes : chromatid2Meshes;
    const lateralSpread = 1.75 * sideSign;
    const rad = config.radius;

    // Sentromer
    const centromereGeo = new THREE.SphereGeometry(rad * 0.65, 32, 32);
    centromereGeo.scale(1.15, 1.45, 0.92);
    const centromereMesh = new THREE.Mesh(centromereGeo, activeMaterials.centromere);
    centromereMesh.position.set(lateralSpread * 0.45, 0, 0);
    centromereMesh.userData = {
        type: 'centromere',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: centromereMesh.position.clone()
    };
    chromatidGroup.add(centromereMesh);
    allInteractiveMeshes.push(centromereMesh);
    chromatidMeshList.push(centromereMesh);
    categoryMeshes.centromere.push(centromereMesh);

    // Cincin Kohesin Inter-Kromatid
    const cohesinGeo = new THREE.TorusGeometry(rad * 0.75, 0.16, 16, 32);
    cohesinGeo.rotateY(Math.PI / 2);
    const cohesinMesh = new THREE.Mesh(cohesinGeo, activeMaterials.centromere);
    cohesinMesh.position.set(0, 0, 0);
    cohesinMesh.userData = {
        type: 'centromere',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: cohesinMesh.position.clone()
    };
    chromatidGroup.add(cohesinMesh);
    allInteractiveMeshes.push(cohesinMesh);
    chromatidMeshList.push(cohesinMesh);
    categoryMeshes.centromere.push(cohesinMesh);

    // Kinetokor Trilaminar
    const kinInnerGeo = new THREE.CylinderGeometry(0.70, 0.82, 0.22, 24);
    kinInnerGeo.rotateZ(Math.PI / 2);
    const kinInnerMesh = new THREE.Mesh(kinInnerGeo, activeMaterials.kinetochoreInner);
    const kinPosX = lateralSpread * 0.95 + 0.50 * sideSign;
    kinInnerMesh.position.set(kinPosX, 0, 0);
    kinInnerMesh.userData = {
        type: 'kinetochore',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: kinInnerMesh.position.clone()
    };
    chromatidGroup.add(kinInnerMesh);
    allInteractiveMeshes.push(kinInnerMesh);
    chromatidMeshList.push(kinInnerMesh);
    categoryMeshes.kinetochore.push(kinInnerMesh);

    const kinOuterGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.22, 24);
    kinOuterGeo.rotateZ(Math.PI / 2);
    const kinOuterMesh = new THREE.Mesh(kinOuterGeo, activeMaterials.kinetochoreOuter);
    const kinOuterPosX = lateralSpread * 0.95 + 0.72 * sideSign;
    kinOuterMesh.position.set(kinOuterPosX, 0, 0);
    kinOuterMesh.userData = {
        type: 'kinetochore',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: kinOuterMesh.position.clone()
    };
    chromatidGroup.add(kinOuterMesh);
    allInteractiveMeshes.push(kinOuterMesh);
    chromatidMeshList.push(kinOuterMesh);
    categoryMeshes.kinetochore.push(kinOuterMesh);

    // Lengan Pendek (p)
    const pCurvePoints = [
        new THREE.Vector3(lateralSpread * 0.45, 0.7, 0),
        new THREE.Vector3(lateralSpread * 1.3, config.pLength * 0.35, 0),
        new THREE.Vector3(lateralSpread * 1.5, config.pLength * 0.7, 0),
        new THREE.Vector3(lateralSpread * 1.1, config.pLength, 0)
    ];
    const pCurve = new THREE.CatmullRomCurve3(pCurvePoints);
    const pTubeGeo = new THREE.TubeGeometry(pCurve, 64, rad, 24, false);
    const pArmMesh = new THREE.Mesh(pTubeGeo, activeMaterials.parm);
    pArmMesh.userData = {
        type: 'parm',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: new THREE.Vector3(0, 0, 0)
    };
    chromatidGroup.add(pArmMesh);
    allInteractiveMeshes.push(pArmMesh);
    chromatidMeshList.push(pArmMesh);
    categoryMeshes.parm.push(pArmMesh);

    // Pita G-Bands Lengan p
    const pBandsCount = config.hasSatellite ? 1 : (config.pLength < 8.0 ? 2 : 3);
    const pFractions = pBandsCount === 1 ? [0.6] : (pBandsCount === 2 ? [0.4, 0.75] : [0.3, 0.55, 0.8]);
    pFractions.forEach((frac, idx) => {
        const pt = pCurve.getPoint(frac);
        const tangent = pCurve.getTangent(frac);
        const bandGeo = new THREE.CylinderGeometry(rad * 1.025, rad * 1.025, 0.75, 24);
        const bandMat = (idx % 2 === 0) ? activeMaterials.gbandDark : activeMaterials.gbandLight;
        const bandMesh = new THREE.Mesh(bandGeo, bandMat);
        bandMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
        bandMesh.position.copy(pt);
        bandMesh.userData = {
            type: 'bands',
            strand: strandId,
            parentGroup: chromatidGroup,
            initialPos: pt.clone()
        };
        chromatidGroup.add(bandMesh);
        allInteractiveMeshes.push(bandMesh);
        chromatidMeshList.push(bandMesh);
        categoryMeshes.bands.push(bandMesh);
    });

    // Telomer / Satelit Lengan p
    const pEndPt = pCurvePoints[pCurvePoints.length - 1];
    if (config.hasSatellite) {
        // Konstriksi Sekunder (Tangkai NOR)
        const stalkGeo = new THREE.CylinderGeometry(rad * 0.4, rad * 0.45, 1.3, 20);
        const stalkMesh = new THREE.Mesh(stalkGeo, activeMaterials.centromere);
        stalkMesh.position.set(pEndPt.x, pEndPt.y + 0.65, pEndPt.z);
        stalkMesh.userData = {
            type: 'satellite',
            strand: strandId,
            parentGroup: chromatidGroup,
            initialPos: stalkMesh.position.clone()
        };
        chromatidGroup.add(stalkMesh);
        allInteractiveMeshes.push(stalkMesh);
        chromatidMeshList.push(stalkMesh);
        categoryMeshes.satellite.push(stalkMesh);

        // Satelit Bulat Terminal
        const satGeo = new THREE.SphereGeometry(rad * 0.85, 24, 24);
        satGeo.scale(1.0, 1.25, 1.0);
        const satMesh = new THREE.Mesh(satGeo, activeMaterials.satellite);
        satMesh.position.set(pEndPt.x, pEndPt.y + 1.8, pEndPt.z);
        satMesh.userData = {
            type: 'satellite',
            strand: strandId,
            parentGroup: chromatidGroup,
            initialPos: satMesh.position.clone()
        };
        chromatidGroup.add(satMesh);
        allInteractiveMeshes.push(satMesh);
        chromatidMeshList.push(satMesh);
        categoryMeshes.satellite.push(satMesh);
    } else {
        const pTelGeo = new THREE.SphereGeometry(rad * 1.04, 24, 24);
        pTelGeo.scale(1, 1.25, 1);
        const pTelMesh = new THREE.Mesh(pTelGeo, activeMaterials.telomere);
        pTelMesh.position.copy(pEndPt);
        pTelMesh.userData = {
            type: 'telomere',
            strand: strandId,
            parentGroup: chromatidGroup,
            initialPos: pEndPt.clone()
        };
        chromatidGroup.add(pTelMesh);
        allInteractiveMeshes.push(pTelMesh);
        chromatidMeshList.push(pTelMesh);
        categoryMeshes.telomere.push(pTelMesh);
    }

    // Lengan Panjang (q)
    const qCurvePoints = [
        new THREE.Vector3(lateralSpread * 0.45, -0.7, 0),
        new THREE.Vector3(lateralSpread * 1.5, -config.qLength * 0.35, 0),
        new THREE.Vector3(lateralSpread * 1.9, -config.qLength * 0.75, 0),
        new THREE.Vector3(lateralSpread * 1.35, -config.qLength, 0)
    ];
    const qCurve = new THREE.CatmullRomCurve3(qCurvePoints);
    const qTubeGeo = new THREE.TubeGeometry(qCurve, 80, rad * 1.06, 24, false);
    const qArmMesh = new THREE.Mesh(qTubeGeo, activeMaterials.qarm);
    qArmMesh.userData = {
        type: 'qarm',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: new THREE.Vector3(0, 0, 0)
    };
    chromatidGroup.add(qArmMesh);
    allInteractiveMeshes.push(qArmMesh);
    chromatidMeshList.push(qArmMesh);
    categoryMeshes.qarm.push(qArmMesh);

    // Pita G-Bands Lengan q
    const qBandFractions = [0.18, 0.36, 0.54, 0.72, 0.88];
    qBandFractions.forEach((frac, idx) => {
        const pt = qCurve.getPoint(frac);
        const tangent = qCurve.getTangent(frac);
        const bandGeo = new THREE.CylinderGeometry(rad * 1.08, rad * 1.08, 0.85, 24);
        const bandMat = (idx % 2 === 0) ? activeMaterials.gbandDark : activeMaterials.gbandLight;
        const bandMesh = new THREE.Mesh(bandGeo, bandMat);
        bandMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
        bandMesh.position.copy(pt);
        bandMesh.userData = {
            type: 'bands',
            strand: strandId,
            parentGroup: chromatidGroup,
            initialPos: pt.clone()
        };
        chromatidGroup.add(bandMesh);
        allInteractiveMeshes.push(bandMesh);
        chromatidMeshList.push(bandMesh);
        categoryMeshes.bands.push(bandMesh);
    });

    // Telomer Lengan q
    const qEndPt = qCurvePoints[qCurvePoints.length - 1];
    const qTelGeo = new THREE.SphereGeometry(rad * 1.1, 24, 24);
    qTelGeo.scale(1, 1.25, 1);
    const qTelMesh = new THREE.Mesh(qTelGeo, activeMaterials.telomere);
    qTelMesh.position.copy(qEndPt);
    qTelMesh.userData = {
        type: 'telomere',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: qEndPt.clone()
    };
    chromatidGroup.add(qTelMesh);
    allInteractiveMeshes.push(qTelMesh);
    chromatidMeshList.push(qTelMesh);
    categoryMeshes.telomere.push(qTelMesh);

    chromosomeGroup.add(chromatidGroup);
    return chromatidGroup;
}

function buildSpindleFibers() {
    while (spindleGroup.children.length > 0) {
        const child = spindleGroup.children[0];
        spindleGroup.remove(child);
    }
    spindleFibersList = [];
    categoryMeshes.spindle = [];

    const poleDistance = 38.0;
    const fiberCounts = 14;

    [-1, 1].forEach(side => {
        const polePos = new THREE.Vector3(side * poleDistance, 0, 0);
        const kinAnchorX = side * 2.45;

        for (let i = 0; i < fiberCounts; i++) {
            const angle = (i / fiberCounts) * Math.PI * 2;
            const radiusAtKin = 0.55 + Math.random() * 0.35;
            const startX = kinAnchorX;
            const startY = Math.sin(angle) * radiusAtKin;
            const startZ = Math.cos(angle) * radiusAtKin;

            const spreadFactor = 2.8;
            const endY = startY * spreadFactor + (Math.random() - 0.5) * 1.5;
            const endZ = startZ * spreadFactor + (Math.random() - 0.5) * 1.5;

            const curve = new THREE.LineCurve3(
                new THREE.Vector3(startX, startY, startZ),
                new THREE.Vector3(polePos.x, endY, endZ)
            );
            const tubeGeo = new THREE.TubeGeometry(curve, 18, 0.08, 6, false);
            const tubeMesh = new THREE.Mesh(tubeGeo, activeMaterials.spindleFiber);
            tubeMesh.userData = {
                type: 'spindle',
                side: side,
                localOffset: new THREE.Vector3(startX - kinAnchorX, startY, startZ),
                poleEnd: new THREE.Vector3(polePos.x, endY, endZ)
            };
            spindleGroup.add(tubeMesh);
            allInteractiveMeshes.push(tubeMesh);
            spindleFibersList.push(tubeMesh);
            categoryMeshes.spindle.push(tubeMesh);
        }
    });
}

function rebuildChromosomeModel() {
    while (chromosomeGroup.children.length > 0) {
        const child = chromosomeGroup.children[0];
        chromosomeGroup.remove(child);
    }

    allInteractiveMeshes = [];
    chromatid1Meshes = [];
    chromatid2Meshes = [];
    Object.keys(categoryMeshes).forEach(k => categoryMeshes[k] = []);

    const config = MORPHOLOGY_CONFIG[currentMorphology];
    annotationTargets.parm = config.calloutTargetP;
    annotationTargets.qarm = config.calloutTargetQ;
    annotationTargets.centromere = config.calloutTargetCen;
    annotationTargets.kinetochore = config.calloutTargetKin;
    annotationTargets.telomere = config.calloutTargetTel;
    annotationTargets.satellite = config.calloutTargetSat;

    const satCallout = document.getElementById('callout-satellite');
    if (satCallout) {
        if (config.hasSatellite) {
            satCallout.classList.remove('hidden');
        } else {
            satCallout.classList.add('hidden');
        }
    }

    chromatid1Group = buildChromatidBranch(-1, config);
    chromatid2Group = buildChromatidBranch(1, config);
    buildSpindleFibers();

    currentMode = 'assembled';
    updateButtonStates();
}

// -----------------------------------------------------------------------------
// 9. LOGIKA PEMISAHAN KROMOSOM (ANAFASE MITOSIS & EXPLODED VIEW)
// -----------------------------------------------------------------------------
function separateAnaphase() {
    currentMode = 'anaphase';
    const LATERAL_PULL = 13.5;

    animateVector(chromatid1Group.position, new THREE.Vector3(-LATERAL_PULL, 0, 0), 1600, easeInOutCubic);
    animateVector(chromatid2Group.position, new THREE.Vector3(LATERAL_PULL, 0, 0), 1600, easeInOutCubic);

    const bendAngle = (currentMorphology === 'acrocentric') ? 0.35 : 0.24;
    animateVector(chromatid1Group.rotation, new THREE.Vector3(0, 0, bendAngle), 1600);
    animateVector(chromatid2Group.rotation, new THREE.Vector3(0, 0, -bendAngle), 1600);

    spindleFibersList.forEach(fiber => {
        animateVector(fiber.scale, new THREE.Vector3(0.55, 1, 1), 1600, easeInOutCubic);
    });

    updateButtonStates();
}

function explodeChromosome() {
    currentMode = 'exploded';

    animateVector(chromatid1Group.position, new THREE.Vector3(0, 0, 0), 500);
    animateVector(chromatid2Group.position, new THREE.Vector3(0, 0, 0), 500);
    animateVector(chromatid1Group.rotation, new THREE.Vector3(0, 0, 0), 500);
    animateVector(chromatid2Group.rotation, new THREE.Vector3(0, 0, 0), 500);

    allInteractiveMeshes.forEach(mesh => {
        const type = mesh.userData.type;
        const initial = mesh.userData.initialPos ? mesh.userData.initialPos.clone() : mesh.position.clone();
        const strand = mesh.userData.strand;
        const sideSign = (strand === 1) ? -1 : 1;
        const dest = initial.clone();

        if (type === 'telomere') {
            dest.y *= 1.38;
            dest.x += sideSign * 3.8;
        } else if (type === 'satellite') {
            dest.y += 4.5;
            dest.x += sideSign * 3.5;
        } else if (type === 'centromere') {
            dest.z += 6.5;
        } else if (type === 'kinetochore') {
            dest.x += sideSign * 6.5;
            dest.z += 3.5;
        } else if (type === 'parm') {
            dest.y += 4.2;
            dest.x += sideSign * 4.2;
        } else if (type === 'qarm') {
            dest.y -= 5.5;
            dest.x += sideSign * 4.8;
        } else if (type === 'bands') {
            dest.x += sideSign * 2.8;
        }

        animateVector(mesh.position, dest, 1400, easeOutBack);
    });

    updateButtonStates();
}

function resetAssembly() {
    currentMode = 'assembled';

    animateVector(chromatid1Group.position, new THREE.Vector3(0, 0, 0), 1200, easeInOutCubic);
    animateVector(chromatid2Group.position, new THREE.Vector3(0, 0, 0), 1200, easeInOutCubic);
    animateVector(chromatid1Group.rotation, new THREE.Vector3(0, 0, 0), 1200);
    animateVector(chromatid2Group.rotation, new THREE.Vector3(0, 0, 0), 1200);

    allInteractiveMeshes.forEach(mesh => {
        const initial = mesh.userData.initialPos ? mesh.userData.initialPos.clone() : new THREE.Vector3(0, 0, 0);
        animateVector(mesh.position, initial, 1200, easeInOutCubic);
    });

    spindleFibersList.forEach(fiber => {
        animateVector(fiber.scale, new THREE.Vector3(1, 1, 1), 1200, easeInOutCubic);
    });

    updateButtonStates();
}

[btnAnaphase, dockBtnAnaphase].forEach(b => {
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); separateAnaphase(); });
});
[btnExplode, dockBtnExplode].forEach(b => {
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); explodeChromosome(); });
});
[btnResetAssembly, dockBtnReset].forEach(b => {
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); resetAssembly(); });
});

// -----------------------------------------------------------------------------
// 10. TOGGLE MODE SITOGENETIKA & VARIASI MORFOLOGI
// -----------------------------------------------------------------------------
modeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-mode');
        if (MATERIALS_BY_MODE[mode]) {
            currentVisualMode = mode;
            activeMaterials = MATERIALS_BY_MODE[mode];
            rebuildChromosomeModel();
        }
    });
});

morphButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        morphButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const morph = btn.getAttribute('data-morph');
        if (MORPHOLOGY_CONFIG[morph]) {
            currentMorphology = morph;
            rebuildChromosomeModel();
        }
    });
});

if (btnToggleSpindle) {
    btnToggleSpindle.addEventListener('click', (e) => {
        e.stopPropagation();
        spindleActive = !spindleActive;
        spindleGroup.visible = spindleActive;
        btnToggleSpindle.classList.toggle('active', spindleActive);
        if (spindleStatusText) spindleStatusText.textContent = spindleActive ? 'AKTIF' : 'NONAKTIF';
    });
}

if (btnToggleThermal) {
    btnToggleThermal.addEventListener('click', (e) => {
        e.stopPropagation();
        thermalActive = !thermalActive;
        btnToggleThermal.classList.toggle('active', thermalActive);
        if (thermalStatusText) thermalStatusText.textContent = thermalActive ? 'AKTIF' : 'NONAKTIF';
    });
}

// -----------------------------------------------------------------------------
// 11. RESPONSIVE MOBILE DRAWER & MODAL MANAGEMENT (PERBAIKAN OVERFLOW)
// -----------------------------------------------------------------------------
function openDrawer(panel) {
    if (window.innerWidth <= 768) {
        modalBackdrop.classList.remove('hidden');
    }
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
        if (controlsPanel.classList.contains('drawer-open')) {
            closeAllDrawers();
        } else {
            inspectorPanel.classList.remove('drawer-open');
            openDrawer(controlsPanel);
        }
    });
});

[btnToggleInspectorPanel, dockBtnInspect].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (inspectorPanel.classList.contains('drawer-open')) {
            closeAllDrawers();
        } else {
            controlsPanel.classList.remove('drawer-open');
            openDrawer(inspectorPanel);
        }
    });
});

if (btnCloseControls) {
    btnCloseControls.addEventListener('click', (e) => {
        e.stopPropagation();
        controlsPanel.classList.remove('drawer-open');
        modalBackdrop.classList.add('hidden');
    });
}

if (btnCloseInspector) {
    btnCloseInspector.addEventListener('click', (e) => {
        e.stopPropagation();
        inspectorPanel.classList.remove('drawer-open');
        modalBackdrop.classList.add('hidden');
    });
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeAllDrawers);
}

// -----------------------------------------------------------------------------
// 12. TUTORIAL EDUKASI INTERAKTIF 3 LANGKAH TERPADU
// -----------------------------------------------------------------------------
let currentTutorialStep = 1;
const totalTutorialSteps = tutorialSlides.length || 3;

function updateTutorialView() {
    tutorialSlides.forEach(slide => {
        const step = parseInt(slide.getAttribute('data-slide'), 10);
        if (step === currentTutorialStep) {
            slide.classList.remove('hidden');
            slide.classList.add('active');
        } else {
            slide.classList.add('hidden');
            slide.classList.remove('active');
        }
    });

    tutorialDots.forEach(dot => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        dot.classList.toggle('active', idx === currentTutorialStep);
    });

    if (tutorialBtnPrev) {
        tutorialBtnPrev.disabled = (currentTutorialStep === 1);
    }
    if (tutorialBtnNext) {
        tutorialBtnNext.textContent = (currentTutorialStep === totalTutorialSteps) ? 'Selesai ✓' : 'Lanjut →';
    }
}

function openTutorial() {
    currentTutorialStep = 1;
    updateTutorialView();
    tutorialModal.classList.remove('hidden');
    closeAllDrawers();
}

function closeTutorial() {
    tutorialModal.classList.add('hidden');
}

if (btnOpenTutorial) btnOpenTutorial.addEventListener('click', (e) => { e.stopPropagation(); openTutorial(); });
if (btnCloseTutorial) btnCloseTutorial.addEventListener('click', (e) => { e.stopPropagation(); closeTutorial(); });

if (tutorialBtnPrev) {
    tutorialBtnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentTutorialStep > 1) {
            currentTutorialStep--;
            updateTutorialView();
        }
    });
}

if (tutorialBtnNext) {
    tutorialBtnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentTutorialStep < totalTutorialSteps) {
            currentTutorialStep++;
            updateTutorialView();
        } else {
            closeTutorial();
        }
    });
}

tutorialDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
            currentTutorialStep = idx;
            updateTutorialView();
        }
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTutorial();
        closeAllDrawers();
    }
});

// -----------------------------------------------------------------------------
// 13. TOGGLE ANOTASI 3D & FILTER BAGIAN KROMOSOM
// -----------------------------------------------------------------------------
if (btnToggleLabels) {
    btnToggleLabels.addEventListener('click', (e) => {
        e.stopPropagation();
        labelsVisible = !labelsVisible;
        btnToggleLabels.classList.toggle('active', labelsVisible);
        if (labelStatusText) labelStatusText.textContent = labelsVisible ? 'TAMPIL' : 'SEMBUNYI';
        if (annotationsOverlay) annotationsOverlay.classList.toggle('hidden', !labelsVisible);
    });
}

function filterComponent(filterType) {
    allInteractiveMeshes.forEach(mesh => {
        const type = mesh.userData.type;
        const shouldHighlight = (filterType === 'all' || type === filterType);

        if (mesh.material) {
            if (shouldHighlight) {
                mesh.material.opacity = (type === 'spindle') ? 0.85 : 1.0;
                mesh.material.transparent = (type === 'spindle');
            } else {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.10;
            }
        }
    });
}

filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
        e.stopPropagation();
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        filterComponent(filter);
    });
});

// -----------------------------------------------------------------------------
// 14. KONTROL ROTASI & KAMERA
// -----------------------------------------------------------------------------
if (btnToggleRotate) {
    btnToggleRotate.addEventListener('click', (e) => {
        e.stopPropagation();
        autoRotateActive = !autoRotateActive;
        btnToggleRotate.classList.toggle('active', autoRotateActive);
        if (rotateStatusLabel) rotateStatusLabel.textContent = autoRotateActive ? 'AKTIF' : 'NONAKTIF';
    });
}

if (btnResetCamera) {
    btnResetCamera.addEventListener('click', (e) => {
        e.stopPropagation();
        adjustCameraForDevice();
    });
}

// -----------------------------------------------------------------------------
// 15. RAYCASTER & INSPEKSI ANATOMI (PERBAIKAN BUG SENTUHAN MOBILE)
// -----------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function showComponentDetails(type) {
    const data = CHROMOSOME_DATA[type];
    if (!data) return;

    if (detailTitle) detailTitle.textContent = data.name;
    if (detailClass) detailClass.textContent = data.class;
    if (detailFormula) detailFormula.textContent = data.formula;
    if (detailLoc) detailLoc.textContent = data.loc;
    if (detailRole) detailRole.textContent = data.role;
    if (detailClinical) detailClinical.textContent = data.clinical;
    if (detailDesc) detailDesc.textContent = data.desc;
    if (detailFunction) detailFunction.textContent = data.func;

    if (detailColorIndicator) {
        detailColorIndicator.style.backgroundColor = data.colorHex;
        detailColorIndicator.style.boxShadow = `0 0 16px ${data.colorHex}`;
    }

    if (inspectorPlaceholder) inspectorPlaceholder.classList.add('hidden');
    if (inspectorDetails) inspectorDetails.classList.remove('hidden');

    if (window.innerWidth <= 768) {
        controlsPanel.classList.remove('drawer-open');
        openDrawer(inspectorPanel);
    }
}

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isTouchDragging = false;
let lastInteractionTime = 0;

function handleInteractionRaycast(clientX, clientY) {
    const now = performance.now();
    if (now - lastInteractionTime < 240) return;
    lastInteractionTime = now;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allInteractiveMeshes, false);

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        const type = clicked.userData ? clicked.userData.type : null;

        if (type) {
            showComponentDetails(type);

            const originalScale = clicked.scale.clone();
            const pulseScale = originalScale.clone().multiplyScalar(1.24);
            animateVector(clicked.scale, pulseScale, 180, easeOutBack);
            setTimeout(() => {
                animateVector(clicked.scale, originalScale, 260, easeInOutCubic);
            }, 200);
        }
    }
}

renderer.domElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = performance.now();
        isTouchDragging = false;
    }
}, { passive: true });

renderer.domElement.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.hypot(dx, dy) > 14) {
            isTouchDragging = true;
        }
    }
}, { passive: true });

renderer.domElement.addEventListener('touchend', (e) => {
    const duration = performance.now() - touchStartTime;
    if (!isTouchDragging && duration < 450 && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        handleInteractionRaycast(touch.clientX, touch.clientY);
    }
}, { passive: true });

renderer.domElement.addEventListener('click', (e) => {
    handleInteractionRaycast(e.clientX, e.clientY);
});

window.addEventListener('mousemove', (event) => {
    if (event.target.closest('.glass-panel') ||
        event.target.closest('#app-header') ||
        event.target.closest('#mobile-dock') ||
        event.target.closest('#tutorial-modal')) {
        container.style.cursor = 'default';
        return;
    }

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allInteractiveMeshes, false);
    container.style.cursor = (intersects.length > 0) ? 'pointer' : 'grab';
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustCameraForDevice();
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        adjustCameraForDevice();
    }, 200);
});

// -----------------------------------------------------------------------------
// 16. TRACKING PROYEKSI ANOTASI 3D (CLAMPING KETAT CEGAH KELUAR DARI LAYAR)
// -----------------------------------------------------------------------------
function toScreenPosition(vector3D, domElement) {
    if (!domElement || !vector3D) return;

    const worldPos = vector3D.clone().applyMatrix4(chromosomeGroup.matrixWorld);
    worldPos.project(camera);

    if (worldPos.z > 1.0) {
        domElement.style.opacity = '0';
        return;
    }

    const rawX = (worldPos.x * 0.5 + 0.5) * window.innerWidth;
    const rawY = (-(worldPos.y * 0.5) + 0.5) * window.innerHeight;

    const elWidth = domElement.offsetWidth || 135;
    const elHeight = domElement.offsetHeight || 44;
    const padX = 8;
    const padTop = 64;
    const padBottom = 72;

    const clampedX = Math.max(padX, Math.min(window.innerWidth - elWidth - padX, rawX));
    const clampedY = Math.max(padTop, Math.min(window.innerHeight - elHeight - padBottom, rawY));

    domElement.style.opacity = '1';
    domElement.style.setProperty('--x', `${clampedX}px`);
    domElement.style.setProperty('--y', `${clampedY}px`);
}

function update3DAnnotations() {
    if (!labelsVisible || currentMode !== 'assembled') {
        if (annotationsOverlay) annotationsOverlay.style.opacity = '0';
        return;
    }
    if (annotationsOverlay) annotationsOverlay.style.opacity = '1';

    toScreenPosition(annotationTargets.parm, elParm);
    toScreenPosition(annotationTargets.centromere, elCentromere);
    toScreenPosition(annotationTargets.kinetochore, elKinetochore);
    toScreenPosition(annotationTargets.qarm, elQarm);
    toScreenPosition(annotationTargets.telomere, elTelomere);
    if (annotationTargets.satellite) {
        toScreenPosition(annotationTargets.satellite, elSatellite);
    }
}

// -----------------------------------------------------------------------------
// 17. MAIN ANIMATION & RENDER LOOP
// -----------------------------------------------------------------------------
let clock = new THREE.Clock();

function renderLoop() {
    requestAnimationFrame(renderLoop);
    const now = performance.now();
    const elapsedTime = clock.getElapsedTime();

    for (let i = activeTweens.length - 1; i >= 0; i--) {
        const isDone = activeTweens[i].update(now);
        if (isDone) activeTweens.splice(i, 1);
    }

    if (autoRotateActive) {
        chromosomeGroup.rotation.y += 0.0038;
    }

    if (thermalActive && currentMode === 'assembled') {
        const thermalWave = Math.sin(elapsedTime * 1.8) * 0.015;
        if (chromatid1Group) chromatid1Group.rotation.z = thermalWave;
        if (chromatid2Group) chromatid2Group.rotation.z = -thermalWave;
    }

    particles.rotation.y += 0.0004;
    bokehGroup.rotation.y += 0.00015;

    controls.update();
    renderer.render(scene, camera);

    update3DAnnotations();
}

// Inisialisasi Model Kromosom & Jalankan Render Loop
rebuildChromosomeModel();
requestAnimationFrame(renderLoop);
