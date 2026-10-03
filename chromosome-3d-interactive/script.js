/**
 * ==============================================================================
 * GEN-OS BIO-CORE: 3D CHROMOSOME INTERACTIVE SIMULATION
 * Model Anatomi Kromosom Metafase Duplikasi Berbentuk X (Sister Chromatids)
 * Dilengkapi Sentromer, Kinetokor, Telomer, Pita G-Banding, & Simulasi Anafase
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. DATA ILMIAH SITOGENETIKA KROMOSOM
// -----------------------------------------------------------------------------
const CHROMOSOME_DATA = {
    centromere: {
        name: "Sentromer (Centromere / Konstriksi Primer)",
        class: "Daerah Heterokromatin Sentromerik Terkondensasi Padat",
        formula: "Satelit DNA Alfa (~171 bp repeat) + Protein Khusus CENP-A",
        loc: "Titik Pusat Penyempitan Penghubung Dua Kromatid Saudara",
        role: "Penyatuan Kromatid Saudara & Titik Pembentukan Kinetokor",
        clinical: "Kerusakan sentromerik memicu kegagalan pemisahan kromosom (nondisjunction / aneuploidi)",
        colorHex: "#f59e0b",
        colorNum: 0xf59e0b,
        desc: "Sentromer adalah daerah penyempitan primer pada kromosom tempat dua kromatid saudara menyatu erat melalui kompleks protein kohesin. Daerah ini mengandung sekuens DNA repetitif berulang (DNA satelit alfa) yang tidak mengkode protein namun sangat krusial bagi stabilitas kromosom.",
        func: "Menahan kedua kromatid saudara tetap bersatu sampai metafase selesai, serta menjadi landasan struktural bagi perakitan kompleks protein kinetokor yang menuntun pemisahan kromosom saat anafase."
    },
    kinetochore: {
        name: "Kinetokor (Kinetochore)",
        class: "Kompleks Multi-Protein Motorik Pengikat Benang Spindel",
        formula: "Jaringan Kompleks KMN (Knl1, Mis12, Ndc80) + Protein Motorik Dynein/CENP",
        loc: "Permukaan Luar Sentromer pada Kedua Sisi Kromatid",
        role: "Penambat Mikrotubulus Spindel & Pembangkit Gaya Tarik Anafase",
        clinical: "Target utama Pos Pemeriksaan Perakitan Spindel (Spindle Assembly Checkpoint / SAC)",
        colorHex: "#ef4444",
        colorNum: 0xef4444,
        desc: "Kinetokor adalah struktur protein berbentuk lempeng cakram berlapis yang dirakit di atas heterokromatin sentromerik pada setiap kromatid. Kinetokor berfungsi sebagai jangkar dinamis tempat berikatan dengan ujung mikrotubulus benang spindel yang berasal dari sentrosom kutub sel.",
        func: "Merasakan tegangan tarikan benang spindel (tensi kinetokor). Jika semua kinetokor telah terikat dengan benar ke kutub berlawanan (amfitelik), sinyal pos pemeriksaan mitosis (SAC) dilepaskan, memicu aktivasi APC/C untuk membelah kohesin dan memulai gerakan anafase."
    },
    telomere: {
        name: "Telomer (Telomere)",
        class: "Tudung Pelindung Nukleoprotein Terminal Ujung Kromosom",
        formula: "Pengulangan Heksanukleotida Tandem (TTAGGG)ₙ + Kompleks Protein Shelterin",
        loc: "Ujung Ekstremitas Terminal pada Keempat Lengan Kromosom",
        role: "Mencegah Degradasi Enzimatik DNA & Fusi Antar-Kromosom",
        clinical: "Pemendekan telomer memicu penuaan seluler (senescence) & reaktivasi telomerase pada kanker",
        colorHex: "#eab308",
        colorNum: 0xeab308,
        desc: "Telomer adalah struktur tudung nukleoprotein khusus di ujung kromosom eukariotik yang bertindak mirip ujung pelindung tali sepatu. Tersusun atas ribuan pengulangan sekuens heksanukleotida TTAGGG yang berikatan dengan kompleks protein pelindung (shelterin) membentuk struktur lengkung T-loop.",
        func: "Melindungi ujung molekul DNA dari degradasi oleh enzim nuklease dan mencegah sistem perbaikan DNA sel memperlakukan ujung kromosom sebagai patahan untai ganda (double-strand break) yang dapat memicu fusi kromosom abnormal."
    },
    parm: {
        name: "Lengan Pendek (p arm / Petite Arm)",
        class: "Segmen Kromatin Superior di Atas Sentromer",
        formula: "Serat Kromatin 30 nm terpadu nukleosom (DNA ganda + oktamer histon)",
        loc: "Bagian Proksimal / Superior dari Sentromer",
        role: "Menampung Lokus Genetik Fungsional Spesifik",
        clinical: "Delesi segmen lengan pendek menyebabkan kelainan genetik (misal Sindrom Cri-du-chat 5p-)",
        colorHex: "#06b6d4",
        colorNum: 0x06b6d4,
        desc: "Lengan pendek kromosom, disingkat lengan 'p' (dari bahasa Prancis 'petite' yang berarti kecil/pendek), adalah bagian kromatid yang terletak di atas sentromer pada posisi standar sitogenetika. Rasio panjang lengan p terhadap lengan q menentukan tipe morfologi kromosom (metasentris, submetasentris, atau akrosentris).",
        func: "Mengandung kelompok gen penting bagi perkembangan dan fisiologi seluler, yang diekspresikan secara terkontrol selama siklus hidup sel eukariotik."
    },
    qarm: {
        name: "Lengan Panjang (q arm / Queue Arm)",
        class: "Segmen Kromatin Inferior di Bawah Sentromer",
        formula: "Serat Kromatin 30 nm terkondensasi padat dengan matriks protein perancah",
        loc: "Bagian Distal / Inferior dari Sentromer",
        role: "Menampung Sebagian Besar Urutan Pengkode Genom",
        clinical: "Translokasi timbal balik (misal kromosom Philadelphia t(9;22)(q34;q11) pada leukemia CML)",
        colorHex: "#3b82f6",
        colorNum: 0x3b82f6,
        desc: "Lengan panjang kromosom, disingkat lengan 'q' (huruf setelah 'p' dalam alfabet atau dari kata 'queue' yang berarti ekor), adalah bagian kromatid di bawah sentromer yang berukuran lebih panjang daripada lengan p pada sebagian besar kromosom manusia.",
        func: "Menyediakan ruang genomik bagi ribuan gen pengkode protein penting, serta daerah pengendali ekspresi gen jarak jauh (enhancer dan insulator)."
    },
    bands: {
        name: "Pita G-Bands (Giemsa Banding / Eukromatin & Heterokromatin)",
        class: "Pola Pita Horizontal Karakteristik Sitogenetika Medis",
        formula: "Pita Gelap (Heterokromatin Kaya A-T) vs Pita Terang (Eukromatin Kaya G-C)",
        loc: "Berselang-Seling secara Teratur di Sepanjang Lengan p dan Lengan q",
        role: "Landasan Pemetaan Gen, Analisis Kariotipe, & Deteksi Mutasi Struktural",
        clinical: "Mendeteksi translokasi kromosom, inversi, mikrodelesi, dan duplikasi abnormal",
        colorHex: "#94a3b8",
        colorNum: 0x94a3b8,
        desc: "Pita G-Bands adalah pola garis-garis gelap dan terang yang muncul melintang di sepanjang lengan kromosom setelah diberi perlakuan tripsin dan diwarnai dengan pewarna Giemsa. Pita gelap menandakan heterokromatin padat yang kaya basa Adenin-Timin dan lambat direplikasi, sedangkan pita terang mewakili eukromatin yang kaya Guanin-Sitosin dan aktif secara transkripsi.",
        func: "Berfungsi sebagai 'kode batang genetik' (genetic barcode) unik untuk setiap pasangan kromosom, memungkinkan ahli genetika klinis mengidentifikasi kromosom nomor 1 sampai 23 serta mendeteksi patahan atau kelainan struktural mikroskopis."
    }
};

// -----------------------------------------------------------------------------
// 2. SETUP SCENE, KAMERA PERSPEKTIF, RENDERER & PENCAHAYAAN STUDIO
// -----------------------------------------------------------------------------
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x071833, 0.005);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

// OrbitControls (Sentuhan Handphone, Pinch to Zoom, Pan 2 Jari, dan Rotasi 360°)
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

// Fungsi Pintar: Adaptasi Sudut & Jarak Kamera Berdasarkan Rasio Layar
function adjustCameraForDevice() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;

    if (aspect < 0.6) {
        camera.fov = 54;
        camera.position.set(0, 5, 58);
    } else if (aspect < 0.85) {
        camera.fov = 48;
        camera.position.set(0, 6, 50);
    } else if (aspect < 1.15) {
        camera.fov = 44;
        camera.position.set(0, 7, 46);
    } else if (aspect < 1.7) {
        camera.fov = 40;
        camera.position.set(0, 8, 42);
    } else {
        camera.fov = 38;
        camera.position.set(0, 8, 40);
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
keyLight.position.set(-25, 35, 35);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
fillLight.position.set(35, -15, 30);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0x8faaff, 1.4);
rimLight.position.set(10, 30, -35);
scene.add(rimLight);

const rimLight2 = new THREE.DirectionalLight(0x7c66dc, 0.8);
rimLight2.position.set(-25, -30, -25);
scene.add(rimLight2);

// -----------------------------------------------------------------------------
// 3. BACKGROUND BOKEH ORBS & PARTIKEL KEDALAMAN MIKROSKOPIS
// -----------------------------------------------------------------------------
const bokehGroup = new THREE.Group();
scene.add(bokehGroup);

const bokehColors = [0x0f3562, 0x1e3a8a, 0x1d4ed8, 0x0369a1];
for (let i = 0; i < 20; i++) {
    const radius = 5 + Math.random() * 14;
    const bokehGeo = new THREE.SphereGeometry(radius, 24, 24);
    const bokehMat = new THREE.MeshBasicMaterial({
        color: bokehColors[i % bokehColors.length],
        transparent: true,
        opacity: 0.12 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const bokehMesh = new THREE.Mesh(bokehGeo, bokehMat);
    bokehMesh.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 100,
        -35 - Math.random() * 50
    );
    bokehGroup.add(bokehMesh);
}

const pCount = 200;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 110;
    pPos[i + 1] = (Math.random() - 0.5) * 90;
    pPos[i + 2] = (Math.random() - 0.5) * 80;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.6,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// -----------------------------------------------------------------------------
// 4. MATERIAL PBR REALISTIS KROMOSOM
// Permukaan kromatin terkondensasi padat dengan tekstur beludru biologis
// -----------------------------------------------------------------------------
function createEnvMap() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, size);
    grd.addColorStop(0.0, '#304080');
    grd.addColorStop(0.5, '#7090d0');
    grd.addColorStop(1.0, '#102040');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
}

const envMap = createEnvMap();

const materials = {
    // Lengan Pendek (p) — Cyan Terang Berkilau
    parm: new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.25,
        emissive: 0x003f4d,
        emissiveIntensity: 0.25,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    // Lengan Panjang (q) — Biru Royal Pekat
    qarm: new THREE.MeshPhysicalMaterial({
        color: 0x2563eb,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.25,
        emissive: 0x0a1f59,
        emissiveIntensity: 0.25,
        envMap: envMap,
        envMapIntensity: 0.2
    }),
    // Sentromer — Amber Hangat Terang
    centromere: new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        roughness: 0.25,
        metalness: 0.08,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        emissive: 0x663c00,
        emissiveIntensity: 0.35,
        envMap: envMap,
        envMapIntensity: 0.25
    }),
    // Kinetokor — Merah Koral Menyala (Plat Protein Spindel)
    kinetochore: new THREE.MeshPhysicalMaterial({
        color: 0xef4444,
        roughness: 0.20,
        metalness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15,
        emissive: 0x590012,
        emissiveIntensity: 0.45,
        envMap: envMap,
        envMapIntensity: 0.3
    }),
    // Telomer — Kuning Emas Bercahaya
    telomere: new THREE.MeshPhysicalMaterial({
        color: 0xeab308,
        roughness: 0.25,
        metalness: 0.10,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        emissive: 0x543c00,
        emissiveIntensity: 0.4,
        envMap: envMap,
        envMapIntensity: 0.3
    }),
    // Pita G-Bands — Heterokromatin Gelap Giemsa
    gbandDark: new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.2,
        emissive: 0x0f172a,
        emissiveIntensity: 0.2
    }),
    // Pita G-Bands — Eukromatin Terang
    gbandLight: new THREE.MeshPhysicalMaterial({
        color: 0x94a3b8,
        roughness: 0.30,
        metalness: 0.05,
        clearcoat: 0.3,
        emissive: 0x1e293b,
        emissiveIntensity: 0.2
    }),
    // Serat Mikrotubulus Spindel (Benang Gelendong Pembelahan)
    spindleFiber: new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65
    })
};

// -----------------------------------------------------------------------------
// 5. PEMBUATAN STRUKTUR 3D KROMOSOM METASE METASENTRIS BERBENTUK "X"
// Tersusun atas 2 Kromatid Saudara Identik (Sister Chromatids)
// -----------------------------------------------------------------------------
const chromosomeGroup = new THREE.Group();
chromosomeGroup.rotation.z = 0.08;
scene.add(chromosomeGroup);

const allInteractiveMeshes = [];
const chromatid1Meshes = [];
const chromatid2Meshes = [];
const categoryMeshes = {
    centromere: [],
    kinetochore: [],
    telomere: [],
    parm: [],
    qarm: [],
    bands: []
};

// Titik referensi untuk penempatan anotasi 3D
const annotationTargets = {
    parm: new THREE.Vector3(-2.8, 6.0, 0),
    qarm: new THREE.Vector3(3.6, -11.0, 0),
    centromere: new THREE.Vector3(0.8, 0, 0),
    kinetochore: new THREE.Vector3(-2.3, 0, 0),
    telomere: new THREE.Vector3(-2.0, 11.5, 0)
};

// Dimensi Anatomi Kromosom
const CHROMATID_RADIUS = 1.35;
const CENTROMERE_RADIUS = 0.85; // Penyempitan primer sentromer
const P_ARM_LENGTH = 11.0;       // Panjang lengan pendek p
const Q_ARM_LENGTH = 16.5;       // Panjang lengan panjang q (rasio ~1.5x)

/**
 * Fungsi Pembangun Satu Kromatid Saudara (Kiri / Kanan)
 * @param {number} sideSign -1 untuk Kromatid 1 (kiri), +1 untuk Kromatid 2 (kanan)
 */
function buildChromatid(sideSign) {
    const chromatidGroup = new THREE.Group();
    const chromatidMeshList = (sideSign < 0) ? chromatid1Meshes : chromatid2Meshes;
    const strandId = (sideSign < 0) ? 1 : 2;

    const lateralSpread = 1.8 * sideSign;

    // --- 5.1 SENTROMER (KONSTRIKSI PRIMER TENGAH) ---
    const centromereGeo = new THREE.SphereGeometry(CENTROMERE_RADIUS, 32, 32);
    centromereGeo.scale(1.1, 1.4, 0.9);
    const centromereMesh = new THREE.Mesh(centromereGeo, materials.centromere);
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

    // --- 5.2 KINETOKOR (LEMPENG PROTEIN PADA SISI LUAR SENTROMER) ---
    const kinetochoreGeo = new THREE.CylinderGeometry(0.75, 0.85, 0.45, 24);
    kinetochoreGeo.rotateZ(Math.PI / 2);
    const kinetochoreMesh = new THREE.Mesh(kinetochoreGeo, materials.kinetochore);
    kinetochoreMesh.position.set(lateralSpread * 0.95 + 0.65 * sideSign, 0, 0);
    kinetochoreMesh.userData = {
        type: 'kinetochore',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: kinetochoreMesh.position.clone()
    };
    chromatidGroup.add(kinetochoreMesh);
    allInteractiveMeshes.push(kinetochoreMesh);
    chromatidMeshList.push(kinetochoreMesh);
    categoryMeshes.kinetochore.push(kinetochoreMesh);

    // --- 5.3 LENGAN PENDEK (p arm) KE ARAH ATAS ---
    // Kurva spline melengkung membentuk sayap atas huruf X
    const pCurvePoints = [
        new THREE.Vector3(lateralSpread * 0.45, 0.8, 0),
        new THREE.Vector3(lateralSpread * 1.4, P_ARM_LENGTH * 0.35, 0),
        new THREE.Vector3(lateralSpread * 1.6, P_ARM_LENGTH * 0.7, 0),
        new THREE.Vector3(lateralSpread * 1.1, P_ARM_LENGTH, 0)
    ];
    const pCurve = new THREE.CatmullRomCurve3(pCurvePoints);
    const pTubeGeo = new THREE.TubeGeometry(pCurve, 64, CHROMATID_RADIUS, 24, false);
    const pArmMesh = new THREE.Mesh(pTubeGeo, materials.parm);
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

    // Pita G-Bands pada Lengan p (3 Cincin Pita Berselang-seling)
    const pBandHeights = [0.3, 0.55, 0.8];
    pBandHeights.forEach((frac, idx) => {
        const pt = pCurve.getPoint(frac);
        const tangent = pCurve.getTangent(frac);
        const bandGeo = new THREE.CylinderGeometry(CHROMATID_RADIUS * 1.02, CHROMATID_RADIUS * 1.02, 0.75, 24);
        const bandMat = (idx % 2 === 0) ? materials.gbandDark : materials.gbandLight;
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

    // Telomer Lengan p (Tudung Kubah Emas di Ujung Atas)
    const pEndPt = pCurvePoints[pCurvePoints.length - 1];
    const pTelomereGeo = new THREE.SphereGeometry(CHROMATID_RADIUS * 1.05, 24, 24);
    pTelomereGeo.scale(1, 1.25, 1);
    const pTelomereMesh = new THREE.Mesh(pTelomereGeo, materials.telomere);
    pTelomereMesh.position.copy(pEndPt);
    pTelomereMesh.userData = {
        type: 'telomere',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: pEndPt.clone()
    };
    chromatidGroup.add(pTelomereMesh);
    allInteractiveMeshes.push(pTelomereMesh);
    chromatidMeshList.push(pTelomereMesh);
    categoryMeshes.telomere.push(pTelomereMesh);

    // --- 5.4 LENGAN PANJANG (q arm) KE ARAH BAWAH ---
    // Kurva spline melengkung membentuk sayap bawah huruf X (lebih panjang)
    const qCurvePoints = [
        new THREE.Vector3(lateralSpread * 0.45, -0.8, 0),
        new THREE.Vector3(lateralSpread * 1.6, -Q_ARM_LENGTH * 0.35, 0),
        new THREE.Vector3(lateralSpread * 2.0, -Q_ARM_LENGTH * 0.75, 0),
        new THREE.Vector3(lateralSpread * 1.4, -Q_ARM_LENGTH, 0)
    ];
    const qCurve = new THREE.CatmullRomCurve3(qCurvePoints);
    const qTubeGeo = new THREE.TubeGeometry(qCurve, 80, CHROMATID_RADIUS * 1.08, 24, false);
    const qArmMesh = new THREE.Mesh(qTubeGeo, materials.qarm);
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

    // Pita G-Bands pada Lengan q (5 Cincin Pita Berselang-seling)
    const qBandHeights = [0.2, 0.38, 0.55, 0.72, 0.88];
    qBandHeights.forEach((frac, idx) => {
        const pt = qCurve.getPoint(frac);
        const tangent = qCurve.getTangent(frac);
        const bandGeo = new THREE.CylinderGeometry(CHROMATID_RADIUS * 1.10, CHROMATID_RADIUS * 1.10, 0.85, 24);
        const bandMat = (idx % 2 === 0) ? materials.gbandDark : materials.gbandLight;
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

    // Telomer Lengan q (Tudung Kubah Emas di Ujung Bawah)
    const qEndPt = qCurvePoints[qCurvePoints.length - 1];
    const qTelomereGeo = new THREE.SphereGeometry(CHROMATID_RADIUS * 1.12, 24, 24);
    qTelomereGeo.scale(1, 1.25, 1);
    const qTelomereMesh = new THREE.Mesh(qTelomereGeo, materials.telomere);
    qTelomereMesh.position.copy(qEndPt);
    qTelomereMesh.userData = {
        type: 'telomere',
        strand: strandId,
        parentGroup: chromatidGroup,
        initialPos: qEndPt.clone()
    };
    chromatidGroup.add(qTelomereMesh);
    allInteractiveMeshes.push(qTelomereMesh);
    chromatidMeshList.push(qTelomereMesh);
    categoryMeshes.telomere.push(qTelomereMesh);

    chromosomeGroup.add(chromatidGroup);
    return chromatidGroup;
}

// Bangun Kromatid Saudara 1 (Sisi Kiri) dan Kromatid Saudara 2 (Sisi Kanan)
const chromatid1 = buildChromatid(-1);
const chromatid2 = buildChromatid(1);

// -----------------------------------------------------------------------------
// 6. MESIN ANIMASI MANDIRI (NATIVE VECTOR LERP ENGINE)
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

// -----------------------------------------------------------------------------
// 7. LOGIKA PEMISAHAN KROMOSOM (ANAFASE MITOSIS & EXPLODED VIEW)
// -----------------------------------------------------------------------------
let currentMode = 'assembled';
let autoRotateActive = true;
let labelsVisible = true;

const btnAnaphase = document.getElementById('btn-anaphase');
const btnExplode = document.getElementById('btn-explode');
const btnResetAssembly = document.getElementById('btn-reset-assembly');
const dockBtnAnaphase = document.getElementById('dock-btn-anaphase');
const dockBtnExplode = document.getElementById('dock-btn-explode');
const dockBtnReset = document.getElementById('dock-btn-reset');
const annotationsOverlay = document.getElementById('annotations-overlay');

/**
 * Mode 1: Pemisahan Kromatid Saudara (Anafase Mitosis)
 * Meniru tarikan benang spindel pada kinetokor yang membelah sentromer
 */
function separateAnaphase() {
    currentMode = 'anaphase';
    const LATERAL_PULL = 14.0;

    // Kromatid 1 tertarik ke kutub kiri
    animateVector(chromatid1.position, new THREE.Vector3(-LATERAL_PULL, 0, 0), 1500, easeInOutCubic);
    // Kromatid 2 tertarik ke kutub kanan
    animateVector(chromatid2.position, new THREE.Vector3(LATERAL_PULL, 0, 0), 1500, easeInOutCubic);

    // Kromatid sedikit membengkok karena hambatan geser sitoplasma (efek huruf V anafase)
    animateVector(chromatid1.rotation, new THREE.Vector3(0, 0, 0.22), 1500);
    animateVector(chromatid2.rotation, new THREE.Vector3(0, 0, -0.22), 1500);

    updateButtonStates();
}

/**
 * Mode 2: Penguraian Komponen (Exploded View)
 * Menguraikan seluruh anatomi: Telomer, Sentromer, Kinetokor, dan Lengan p/q
 */
function explodeChromosome() {
    currentMode = 'exploded';

    // Kembalikan posisi grup kromatid ke tengah dahulu
    animateVector(chromatid1.position, new THREE.Vector3(0, 0, 0), 600);
    animateVector(chromatid2.position, new THREE.Vector3(0, 0, 0), 600);
    animateVector(chromatid1.rotation, new THREE.Vector3(0, 0, 0), 600);
    animateVector(chromatid2.rotation, new THREE.Vector3(0, 0, 0), 600);

    allInteractiveMeshes.forEach(mesh => {
        const type = mesh.userData.type;
        const initial = mesh.userData.initialPos ? mesh.userData.initialPos.clone() : mesh.position.clone();
        const strand = mesh.userData.strand;
        const sideSign = (strand === 1) ? -1 : 1;

        const dest = initial.clone();

        if (type === 'telomere') {
            // Telomer meluncur jauh ke ujung kutub
            dest.y *= 1.35;
            dest.x += sideSign * 3.5;
        } else if (type === 'centromere') {
            // Sentromer melayang ke depan
            dest.z += 6.5;
        } else if (type === 'kinetochore') {
            // Kinetokor melayang ke lateral luar
            dest.x += sideSign * 6.0;
            dest.z += 3.5;
        } else if (type === 'parm') {
            // Lengan p bergeser ke atas-luar
            dest.y += 4.5;
            dest.x += sideSign * 4.0;
        } else if (type === 'qarm') {
            // Lengan q bergeser ke bawah-luar
            dest.y -= 5.5;
            dest.x += sideSign * 5.0;
        } else if (type === 'bands') {
            // Pita banding terurai sedikit ke luar
            dest.x += sideSign * 2.5;
        }

        animateVector(mesh.position, dest, 1400, easeOutBack);
    });

    updateButtonStates();
}

/**
 * Reset: Mengembalikan Kromosom ke Bentuk Metafase Utuh
 */
function resetAssembly() {
    currentMode = 'assembled';

    animateVector(chromatid1.position, new THREE.Vector3(0, 0, 0), 1200, easeInOutCubic);
    animateVector(chromatid2.position, new THREE.Vector3(0, 0, 0), 1200, easeInOutCubic);
    animateVector(chromatid1.rotation, new THREE.Vector3(0, 0, 0), 1200);
    animateVector(chromatid2.rotation, new THREE.Vector3(0, 0, 0), 1200);

    allInteractiveMeshes.forEach(mesh => {
        const initial = mesh.userData.initialPos ? mesh.userData.initialPos.clone() : new THREE.Vector3(0, 0, 0);
        animateVector(mesh.position, initial, 1200, easeInOutCubic);
    });

    updateButtonStates();
}

function updateButtonStates() {
    const assembled = (currentMode === 'assembled');
    btnAnaphase.classList.toggle('hidden', !assembled);
    btnExplode.classList.toggle('hidden', !assembled);
    btnResetAssembly.classList.toggle('hidden', assembled);

    if (dockBtnAnaphase) dockBtnAnaphase.classList.toggle('hidden', !assembled);
    if (dockBtnExplode) dockBtnExplode.classList.toggle('hidden', !assembled);
    if (dockBtnReset) dockBtnReset.classList.toggle('hidden', assembled);
}

btnAnaphase.addEventListener('click', (e) => { e.stopPropagation(); separateAnaphase(); });
btnExplode.addEventListener('click', (e) => { e.stopPropagation(); explodeChromosome(); });
btnResetAssembly.addEventListener('click', (e) => { e.stopPropagation(); resetAssembly(); });

if (dockBtnAnaphase) dockBtnAnaphase.addEventListener('click', (e) => { e.stopPropagation(); separateAnaphase(); });
if (dockBtnExplode) dockBtnExplode.addEventListener('click', (e) => { e.stopPropagation(); explodeChromosome(); });
if (dockBtnReset) dockBtnReset.addEventListener('click', (e) => { e.stopPropagation(); resetAssembly(); });

// -----------------------------------------------------------------------------
// 8. RESPONSIVE MOBILE DRAWER & MODAL MANAGEMENT
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
// 9. TOGGLE ANOTASI 3D & FILTER BAGIAN KROMOSOM
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
        const shouldHighlight = (filterType === 'all' || type === filterType);

        if (shouldHighlight) {
            mesh.material.opacity = 1.0;
            mesh.material.transparent = false;
        } else {
            mesh.material.transparent = true;
            mesh.material.opacity = 0.12;
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
// 10. KONTROL ROTASI & KAMERA
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
// 11. RAYCASTER & INSPEKSI ANATOMI KROMOSOM DENGAN AUTO-POPUP MOBILE
// -----------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

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

function showComponentDetails(type) {
    const data = CHROMOSOME_DATA[type];
    if (!data) return;

    detailTitle.textContent = data.name;
    detailClass.textContent = data.class;
    detailFormula.textContent = data.formula;
    detailLoc.textContent = data.loc;
    detailRole.textContent = data.role;
    detailClinical.textContent = data.clinical;
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
    if (event.target.closest('#controls-panel') || 
        event.target.closest('#app-header') || 
        event.target.closest('#inspector-panel') || 
        event.target.closest('#mobile-dock') ||
        event.target.closest('#modal-backdrop') ||
        event.target.closest('#interaction-hint')) {
        return;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allInteractiveMeshes, false);

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        const type = clicked.userData.type;

        if (type) {
            showComponentDetails(type);

            const target = clicked;
            const originalScale = target.scale.clone();
            const pulseScale = originalScale.clone().multiplyScalar(1.25);

            animateVector(target.scale, pulseScale, 200, easeOutBack);
            setTimeout(() => {
                animateVector(target.scale, originalScale, 300, easeInOutCubic);
            }, 220);
        }
    }
});

window.addEventListener('mousemove', (event) => {
    if (event.target.closest('.glass-panel') || 
        event.target.closest('#app-header') || 
        event.target.closest('#mobile-dock')) {
        container.style.cursor = 'default';
        return;
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
    setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        adjustCameraForDevice();
    }, 200);
});

// -----------------------------------------------------------------------------
// 12. TRACKING PROYEKSI ANOTASI 3D KE LAYAR
// -----------------------------------------------------------------------------
const elParm = document.getElementById('callout-parm');
const elCentromere = document.getElementById('callout-centromere');
const elKinetochore = document.getElementById('callout-kinetochore');
const elQarm = document.getElementById('callout-qarm');
const elTelomere = document.getElementById('callout-telomere');

function toScreenPosition(vector3D, domElement) {
    if (!domElement) return;

    const worldPos = vector3D.clone().applyMatrix4(chromosomeGroup.matrixWorld);
    worldPos.project(camera);

    const x = (worldPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(worldPos.y * 0.5) + 0.5) * window.innerHeight;

    if (worldPos.z > 1.0) {
        domElement.style.opacity = '0';
    } else {
        domElement.style.opacity = '1';
        domElement.style.setProperty('--x', `${x}px`);
        domElement.style.setProperty('--y', `${y}px`);
    }
}

function update3DAnnotations() {
    if (!labelsVisible || currentMode !== 'assembled') {
        annotationsOverlay.style.opacity = '0';
        return;
    }
    annotationsOverlay.style.opacity = '1';

    toScreenPosition(annotationTargets.parm, elParm);
    toScreenPosition(annotationTargets.centromere, elCentromere);
    toScreenPosition(annotationTargets.kinetochore, elKinetochore);
    toScreenPosition(annotationTargets.qarm, elQarm);
    toScreenPosition(annotationTargets.telomere, elTelomere);
}

// -----------------------------------------------------------------------------
// 13. MAIN RENDER LOOP
// -----------------------------------------------------------------------------
function renderLoop(now) {
    requestAnimationFrame(renderLoop);

    for (let i = activeTweens.length - 1; i >= 0; i--) {
        const isDone = activeTweens[i].update(now);
        if (isDone) activeTweens.splice(i, 1);
    }

    if (autoRotateActive) {
        chromosomeGroup.rotation.y += 0.004;
    }

    particles.rotation.y += 0.0005;
    bokehGroup.rotation.y += 0.0002;

    controls.update();
    renderer.render(scene, camera);

    update3DAnnotations();
}

requestAnimationFrame(renderLoop);
