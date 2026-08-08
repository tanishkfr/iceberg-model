/**
 * Environmental background elements layered by ocean depth.
 * Rendered behind the iceberg inside `<Ocean />` to preserve focus on the main iceberg model.
 */
export function Environment() {
  return (
    <g className="environment-layer pointer-events-none select-none">
      <defs>
        {/* Soft Cloud Blur (gentle blur so clouds stay distinct & visible) */}
        <filter id="cloud-soft-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* Submarine Headlight Beam Gradient */}
        <linearGradient id="sub-beam-glow" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#7dd3fc" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#0284c7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="rov-beam-glow" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#0369a1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </linearGradient>

        {/* Caustics Light Ray Gradient */}
        <linearGradient id="sun-ray-bright" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#bae6fd" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5b7787" stopOpacity="0" />
        </linearGradient>

        {/* Bioluminescent Particle & Lure Glow */}
        <filter id="bio-glow-intense" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── 1. SKY: DISTINCT PASSING CLOUDS (y: 180 to 600) ────────────────────── */}
      <g filter="url(#cloud-soft-blur)">
        {/* Upper Cloud Deck (Drifting slowly from left to right) */}
        <g className="cloud-pass-slow" opacity="0.85">
          {/* Cloud 1 */}
          <path
            d="M -100,280 C -80,240 -20,230 20,260 C 50,225 120,230 150,265 C 190,245 250,260 270,290 C 310,295 330,330 300,355 C 270,370 -50,370 -100,350 Z"
            fill="#ffffff"
          />
          {/* Cloud 2 */}
          <path
            d="M 450,220 C 470,185 530,180 570,210 C 600,180 670,185 700,215 C 740,195 790,210 810,240 C 840,245 860,275 830,300 C 800,315 500,315 450,300 Z"
            fill="#f1f5f9"
            opacity="0.9"
          />
          {/* Cloud 3 */}
          <path
            d="M 980,290 C 1000,250 1060,245 1100,275 C 1140,245 1210,250 1240,280 C 1280,260 1340,275 1360,305 C 1390,310 1410,345 1380,370 C 1350,385 1020,385 980,365 Z"
            fill="#ffffff"
            opacity="0.8"
          />
        </g>

        {/* Lower Cloud Deck (Drifting at different speed) */}
        <g className="cloud-pass-slower" opacity="0.7">
          <path
            d="M 120,440 C 140,400 200,395 240,425 C 280,395 350,400 380,430 C 420,410 480,425 500,455 C 530,460 550,495 520,520 C 490,535 150,535 120,515 Z"
            fill="#e2e8f0"
          />
          <path
            d="M 750,410 C 770,375 830,370 870,400 C 900,370 970,375 1000,405 C 1040,385 1090,400 1110,430 C 1140,435 1160,465 1130,490 C 1100,505 780,505 750,490 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </g>

      {/* ── 2. WATERLINE: SURFACE SHIPS ANCHORED TO WATER (WATERLINE = 880) ──── */}
      {/* Left Ship: Research Vessel (x: ~180..270, y: 852..888) */}
      <g className="ship-anim-a">
        {/* Hull - bottom extends to 887 (7px BELOW waterline 880) */}
        <path d="M 175 887 L 192 874 L 272 874 L 282 882 L 275 887 Z" fill="#1e2e38" />
        {/* Red anti-fouling keel strip below waterline */}
        <path d="M 180 887 L 188 881 L 274 881 L 278 887 Z" fill="#7f1d1d" opacity="0.7" />
        {/* Superstructure */}
        <rect x="215" y="860" width="30" height="14" fill="#2d4352" rx="1" />
        <rect x="226" y="853" width="14" height="7" fill="#3f5a6d" />
        {/* Lit Portholes / Windows */}
        <circle cx="225" cy="866" r="1.5" fill="#fef08a" opacity="0.9" />
        <circle cx="232" cy="866" r="1.5" fill="#fef08a" opacity="0.9" />
        <circle cx="239" cy="866" r="1.5" fill="#fef08a" opacity="0.9" />
        {/* Radar Mast */}
        <line x1="233" y1="842" x2="233" y2="853" stroke="#527489" strokeWidth="1.5" />
        <line x1="229" y1="845" x2="237" y2="845" stroke="#527489" strokeWidth="1.5" />
        {/* Water Surface Ripple at waterline 880 */}
        <path d="M 165 880 Q 185 878 200 881 Q 230 878 290 881" stroke="#e0f2fe" strokeWidth="1.2" opacity="0.75" fill="none" />
      </g>

      {/* Right Ship: Sailboat (x: ~1340..1385, y: 840..887) */}
      <g className="ship-anim-b">
        {/* Hull - bottom extends to 886 (6px BELOW waterline 880) */}
        <path d="M 1340 886 L 1348 876 L 1388 876 L 1394 883 L 1390 886 Z" fill="#1c2e3a" />
        {/* Keel fin */}
        <path d="M 1362 886 L 1366 892 L 1372 892 L 1370 886 Z" fill="#0f172a" />
        {/* Mast */}
        <line x1="1366" y1="838" x2="1366" y2="876" stroke="#475569" strokeWidth="2" />
        {/* Main Sail (crisp & bright white-blue) */}
        <path d="M 1368 840 L 1386 872 L 1368 872 Z" fill="#e2ecf5" opacity="0.92" />
        {/* Front Jib Sail */}
        <path d="M 1364 845 L 1352 872 L 1364 872 Z" fill="#cbd5e1" opacity="0.8" />
        {/* Water Surface Ripple at waterline 880 */}
        <path d="M 1330 880 Q 1350 879 1370 881 Q 1385 879 1402 881" stroke="#e0f2fe" strokeWidth="1.2" opacity="0.75" fill="none" />
      </g>

      {/* ── 3. SHALLOW OCEAN: SUN RAYS & FISH (y: 880 to 1700) ─────────────────── */}
      {/* Sunbeams filtering down from surface */}
      <g opacity="0.9">
        <polygon points="180,880 340,880 620,1700 400,1700" fill="url(#sun-ray-bright)" />
        <polygon points="520,880 680,880 1020,1750 820,1750" fill="url(#sun-ray-bright)" opacity="0.7" />
        <polygon points="1080,880 1240,880 1520,1650 1330,1650" fill="url(#sun-ray-bright)" opacity="0.8" />
      </g>

      {/* School of Arctic Fish - Left flank (y: ~1180, x: 140..280, open water) */}
      <g className="fish-swim-a" opacity="0.65">
        {[
          { x: 140, y: 1180, s: 1.1 },
          { x: 170, y: 1160, s: 0.95 },
          { x: 180, y: 1195, s: 1.0 },
          { x: 210, y: 1170, s: 0.85 },
          { x: 225, y: 1205, s: 0.9 },
          { x: 260, y: 1185, s: 0.75 },
        ].map((f, i) => (
          <g key={`fish-l-${i}`} transform={`translate(${f.x}, ${f.y}) scale(${f.s})`}>
            <path d="M 0 0 C 10 -6 22 -5 30 0 C 22 5 10 6 0 0 Z" fill="#385e72" />
            <path d="M -5 -4 L 2 -0.5 L -5 3 Z" fill="#243f4e" />
            <circle cx="22" cy="-1.5" r="1" fill="#7dd3fc" />
          </g>
        ))}
      </g>

      {/* School of Fish - Right flank (y: ~1480, x: 1320..1460, open water) */}
      <g className="fish-swim-b" opacity="0.6">
        {[
          { x: 1440, y: 1480, s: 1.1 },
          { x: 1410, y: 1460, s: 0.95 },
          { x: 1400, y: 1495, s: 1.0 },
          { x: 1370, y: 1470, s: 0.85 },
          { x: 1355, y: 1505, s: 0.9 },
        ].map((f, i) => (
          <g key={`fish-r-${i}`} transform={`translate(${f.x}, ${f.y}) scale(${f.s})`}>
            <path d="M 0 0 C -10 -6 -22 -5 -30 0 C -22 5 -10 6 0 0 Z" fill="#385e72" />
            <path d="M 5 -4 L -2 -0.5 L 5 3 Z" fill="#243f4e" />
            <circle cx="-22" cy="-1.5" r="1" fill="#7dd3fc" />
          </g>
        ))}
      </g>

      {/* ── 4. MID DEPTH: SUBMARINE & ROV (y: 1700 to 2600 - OPEN WATER FLANKS) ── */}
      {/* Exploration Submarine on the LEFT OPEN WATER FLANK (x: 70..220, y: 2060) */}
      {/* (Iceberg is at x: 380..1300 at this depth, so x: 70..220 is 100% visible open water!) */}
      <g className="sub-anim">
        {/* Bright Glowing Spotlight Beam extending forward to the right toward iceberg flank */}
        <polygon points="215,2072 580,1980 600,2170" fill="url(#sub-beam-glow)" className="beam-pulse" />

        {/* Submarine Hull */}
        <g opacity="0.9">
          {/* Main Hull Body */}
          <path
            d="M 215 2072 
               C 210 2058, 150 2050, 100 2056 
               C 60 2062, 50 2072, 50 2072 
               C 50 2072, 60 2082, 100 2088 
               C 150 2094, 210 2086, 215 2072 Z"
            fill="#1e3a4c"
            stroke="#386b8b"
            strokeWidth="2"
          />
          {/* Glass Observation Dome Nose */}
          <path d="M 215 2063 C 224 2068, 224 2076, 215 2081 Z" fill="#7dd3fc" opacity="0.85" />

          {/* Conning Tower */}
          <path d="M 120 2054 L 124 2038 L 144 2038 L 148 2054 Z" fill="#172e3d" stroke="#386b8b" strokeWidth="1.5" />
          {/* Periscope with glowing tip */}
          <line x1="134" y1="2038" x2="134" y2="2024" stroke="#7dd3fc" strokeWidth="2" />
          <line x1="134" y1="2024" x2="140" y2="2024" stroke="#7dd3fc" strokeWidth="2" />
          <circle cx="140" cy="2024" r="2" fill="#fef08a" />

          {/* Illuminated Portholes along hull */}
          <circle cx="100" cy="2072" r="3" fill="#fef08a" />
          <circle cx="120" cy="2072" r="3" fill="#fef08a" />
          <circle cx="140" cy="2072" r="3" fill="#fef08a" />
          <circle cx="160" cy="2072" r="3" fill="#fef08a" />

          {/* Tail Fin & Propeller */}
          <path d="M 58 2056 L 42 2045 L 48 2072 L 42 2098 L 58 2088 Z" fill="#0f1f2a" />
          <line x1="41" y1="2060" x2="41" y2="2084" stroke="#527489" strokeWidth="2.5" />
        </g>
      </g>

      {/* Deep Sea ROV / Bathyscaphe on the RIGHT OPEN WATER FLANK (x: 1380..1480, y: 2420) */}
      <g className="sub-anim" style={{ animationDelay: '-12s' }}>
        {/* Dual headlights pointing left */}
        <polygon points="1390,2420 1080,2350 1060,2490" fill="url(#rov-beam-glow)" className="beam-pulse" />
        <g opacity="0.85">
          {/* Spherical pressure hull */}
          <circle cx="1420" cy="2420" r="22" fill="#172e3c" stroke="#0284c7" strokeWidth="2" />
          <circle cx="1410" cy="2420" r="10" fill="#38bdf8" opacity="0.75" />
          {/* Thruster frames */}
          <rect x="1440" y="2405" width="16" height="8" fill="#0f172a" rx="2" />
          <rect x="1440" y="2427" width="16" height="8" fill="#0f172a" rx="2" />
          {/* LED Light Bar */}
          <circle cx="1398" cy="2412" r="2.5" fill="#fef08a" />
          <circle cx="1398" cy="2428" r="2.5" fill="#fef08a" />
        </g>
      </g>

      {/* ── 5. DEEP OCEAN & ABYSS: RICH CONTENT (y: 2600 to 4300) ─────────────── */}
      {/* 5A. Giant Blue Whale Silhouette on Right Flank (x: 1260..1540, y: 2780..2880) */}
      <g opacity="0.45" className="fish-swim-b">
        {/* Giant Whale silhouette swimming left */}
        <path
          d="M 1260 2830 
             C 1290 2800, 1370 2790, 1440 2800 
             C 1500 2810, 1540 2825, 1570 2815 
             C 1590 2808, 1610 2795, 1620 2790 
             L 1615 2830 L 1630 2845 L 1605 2840 
             C 1570 2855, 1510 2865, 1430 2860 
             C 1360 2855, 1290 2850, 1260 2830 Z"
          fill="#1e3a4a"
        />
        {/* Pectoral Fin */}
        <path d="M 1360 2845 Q 1340 2885 1320 2895 Q 1345 2875 1375 2850 Z" fill="#162c38" />
      </g>

      {/* 5B. Bioluminescent Giant Jellyfish & Siphonophore (y: 3050 & 3400) */}
      {/* Left Flank Giant Bioluminescent Jelly (x: 160, y: 3120) */}
      <g className="jelly-anim" transform="translate(160, 3120)">
        {/* Glowing Outer Bell */}
        <path d="M -28 0 C -28 -30, 28 -30, 28 0 C 18 6, -18 6, -28 0 Z" fill="#0284c7" opacity="0.65" filter="url(#bio-glow-intense)" />
        <path d="M -20 -4 C -20 -22, 20 -22, 20 -4 C 12 2, -12 2, -20 -4 Z" fill="#38bdf8" opacity="0.8" />
        {/* Inner Glowing Core */}
        <circle cx="0" cy="-8" r="6" fill="#7dd3fc" opacity="0.9" />
        {/* Trailing Tentacles */}
        <path d="M -18 4 Q -24 35 -14 70 T -20 110" fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.7" />
        <path d="M -8 5 Q -2 40 -12 75 T -6 120" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.85" />
        <path d="M 0 6 Q 6 45 0 80 T 4 125" fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.9" />
        <path d="M 8 5 Q 14 40 4 75 T 10 120" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.85" />
        <path d="M 18 4 Q 24 35 14 70 T 20 110" fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.7" />
      </g>

      {/* Right Flank Siphonophore Chain (x: 1420, y: 3380) */}
      <g className="jelly-anim" transform="translate(1420, 3380) scale(0.9)" style={{ animationDelay: '-5s' }}>
        <path d="M -24 0 C -24 -26, 24 -26, 24 0 C 15 5, -15 5, -24 0 Z" fill="#0d9488" opacity="0.6" filter="url(#bio-glow-intense)" />
        <circle cx="0" cy="-6" r="5" fill="#2dd4bf" opacity="0.85" />
        <path d="M -14 4 Q -20 30 -10 60 T -16 100" fill="none" stroke="#2dd4bf" strokeWidth="1.6" opacity="0.75" />
        <path d="M 0 5 Q 5 35 -4 65 T 2 105" fill="none" stroke="#5eead4" strokeWidth="2" opacity="0.85" />
        <path d="M 14 4 Q 20 30 10 60 T 16 100" fill="none" stroke="#2dd4bf" strokeWidth="1.6" opacity="0.75" />
      </g>

      {/* 5C. Deep Anglerfish with Glowing Lure on Left Flank (x: 140, y: 3720) */}
      <g className="fish-swim-a" transform="translate(140, 3720)" opacity="0.85">
        {/* Anglerfish Body */}
        <path
          d="M 0 0 C 12 -18, 42 -14, 52 0 C 44 14, 20 22, 0 10 C -12 4, -20 -2, -26 0 L -32 -8 L -24 -2 Z"
          fill="#0c1921"
          stroke="#1e3a4c"
          strokeWidth="1.5"
        />
        {/* Sharp Teeth */}
        <path d="M 2 0 L 6 -6 L 10 0 L 14 -7 L 18 0 L 22 -6 L 26 0" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
        {/* Eye */}
        <circle cx="32" cy="-4" r="3" fill="#38bdf8" />
        {/* Esca / Lure Stalk */}
        <path d="M 38 -8 Q 48 -28 32 -38" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Glowing Lure Bulb */}
        <circle cx="32" cy="-38" r="5" fill="#fef08a" filter="url(#bio-glow-intense)" />
      </g>

      {/* 5D. Vibrant Abyssal Sea Forest & Coral Fan Structures (y: 2900..4200) */}
      {/* Left Seabed / Flank Vegetation (x: 40..250, y: 2900..4200) */}
      <g>
        {/* Tall Sea Kelp Fronds */}
        <g className="kelp-sway-l" transform="translate(90, 4200)">
          <path d="M 0 0 Q -40 -200 20 -400 Q 70 -600 -20 -800 Q -50 -950 0 -1100" fill="none" stroke="#0f766e" strokeWidth="14" strokeLinecap="round" opacity="0.75" />
          <path d="M 0 0 Q 35 -160 -20 -340 Q -45 -500 25 -680 Q 40 -820 -8 -960" fill="none" stroke="#14b8a6" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        </g>
        <g className="kelp-sway-r" transform="translate(170, 4200)" style={{ animationDelay: '-4s' }}>
          <path d="M 0 0 Q -30 -180 35 -360 Q 55 -520 -20 -700 Q -40 -850 15 -980" fill="none" stroke="#0369a1" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
          <path d="M 0 0 Q 25 -140 -15 -280 Q -30 -420 15 -580 Q 25 -700 -5 -820" fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Coral Fan Structures at y: 3500 & 3900 */}
        <g className="kelp-sway-l" transform="translate(50, 3550)" opacity="0.85">
          <path d="M 0 0 C -30 -40, -50 -80, -60 -120 M 0 0 C -10 -50, -20 -90, -10 -140 M 0 0 C 20 -45, 35 -85, 45 -130" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="-60" cy="-120" r="4" fill="#38bdf8" />
          <circle cx="-10" cy="-140" r="5" fill="#7dd3fc" />
          <circle cx="45" cy="-130" r="4" fill="#38bdf8" />
        </g>
      </g>

      {/* Right Seabed / Flank Vegetation (x: 1350..1560, y: 2900..4200) */}
      <g>
        <g className="kelp-sway-r" transform="translate(1480, 4200)" style={{ animationDelay: '-3s' }}>
          <path d="M 0 0 Q 40 -200 -20 -400 Q -70 -600 20 -800 Q 50 -950 0 -1100" fill="none" stroke="#0f766e" strokeWidth="14" strokeLinecap="round" opacity="0.75" />
          <path d="M 0 0 Q -35 -160 20 -340 Q 45 -500 -25 -680 Q -40 -820 8 -960" fill="none" stroke="#14b8a6" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        </g>
        <g className="kelp-sway-l" transform="translate(1400, 4200)" style={{ animationDelay: '-6s' }}>
          <path d="M 0 0 Q 30 -180 -35 -360 Q -55 -520 20 -700 Q 40 -850 -15 -980" fill="none" stroke="#0369a1" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
          <path d="M 0 0 Q -25 -140 15 -280 Q 30 -420 -15 -580 Q -25 -700 5 -820" fill="none" stroke="#2dd4bf" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Coral Fan Structures at y: 3450 & 3850 */}
        <g className="kelp-sway-r" transform="translate(1520, 3880)" opacity="0.85">
          <path d="M 0 0 C 30 -40, 50 -80, 60 -120 M 0 0 C 10 -50, 20 -90, 10 -140 M 0 0 C -20 -45, -35 -85, -45 -130" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="-120" r="4" fill="#2dd4bf" />
          <circle cx="10" cy="-140" r="5" fill="#5eead4" />
          <circle cx="-45" cy="-130" r="4" fill="#2dd4bf" />
        </g>
      </g>

      {/* 5E. Bioluminescent Glowing Plankton Swarm (x: 100..1500, y: 2700..4300) */}
      <g filter="url(#bio-glow-intense)">
        {[
          { x: 260, y: 2750, r: 4.5, d: '0s', c: '#7dd3fc' },
          { x: 1380, y: 2820, r: 5, d: '-2s', c: '#2dd4bf' },
          { x: 180, y: 2980, r: 4, d: '-4s', c: '#7dd3fc' },
          { x: 1440, y: 3120, r: 5.5, d: '-1s', c: '#fef08a' },
          { x: 320, y: 3320, r: 4, d: '-3s', c: '#2dd4bf' },
          { x: 1280, y: 3480, r: 6, d: '-5s', c: '#7dd3fc' },
          { x: 220, y: 3650, r: 4.5, d: '-2.5s', c: '#5eead4' },
          { x: 1420, y: 3780, r: 5, d: '-0.5s', c: '#7dd3fc' },
          { x: 380, y: 3950, r: 4, d: '-3.5s', c: '#fef08a' },
          { x: 1220, y: 4120, r: 5.5, d: '-1.5s', c: '#2dd4bf' },
          { x: 280, y: 4220, r: 4.5, d: '-4.5s', c: '#7dd3fc' },
        ].map((p, idx) => (
          <circle
            key={`bio-${idx}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.c}
            className="biolum-anim"
            style={{ animationDelay: p.d }}
          />
        ))}
      </g>
    </g>
  )
}
