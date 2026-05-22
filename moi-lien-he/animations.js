// ===== Utility =====
const TAU = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => Math.random() * (max - min) + min;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// ===== Background Ambient Particles =====
function initBgCanvas() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: rand(0, W), y: rand(0, H),
            vx: rand(-0.2, 0.2), vy: rand(-0.15, 0.15),
            r: rand(1, 2.5), alpha: rand(0.1, 0.4)
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, TAU);
            ctx.fillStyle = `rgba(212,168,67,${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Animation 1: Tính khách quan =====
function initAnim1() {
    const canvas = document.getElementById('anim1');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const nodes = [{ x: cx, y: cy, r: 7, orbit: 0, angle: 0, speed: 0, color: '#f2c46d' }];
    const palette = ['#f2c46d', '#e8873a', '#9bd3ff'];
    for (let i = 0; i < 7; i++) nodes.push({ x: 0, y: 0, r: rand(3.2, 5), orbit: rand(34, 80), angle: (TAU / 7) * i, speed: rand(0.0038, 0.009) * (i % 2 ? -1 : 1), phase: rand(0, TAU), color: palette[i % palette.length] });
    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.012;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const bg = ctx.createRadialGradient(cx, cy, 18, cx, cy, 130);
        bg.addColorStop(0, 'rgba(242,196,109,0.08)'); bg.addColorStop(1, 'transparent');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        for (let i = 1; i < nodes.length; i++) {
            const n = nodes[i];
            n.angle += n.speed;
            n.x = cx + Math.cos(n.angle) * n.orbit;
            n.y = cy + Math.sin(n.angle * 1.12 + n.phase) * n.orbit * 0.62;
        }

        // soft network lines
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = dist(nodes[i], nodes[j]);
                if (d < 120) {
                    const a = (1 - d / 120) * 0.18;
                    ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(242,196,109,${a})`; ctx.lineWidth = 1; ctx.stroke();
                }
            }
        }

        // orbit rings
        nodes.slice(1).forEach((n, i) => {
            ctx.beginPath(); ctx.ellipse(cx, cy, n.orbit, n.orbit * 0.62, 0, 0, TAU);
            ctx.strokeStyle = `rgba(255,255,255,${0.045 + i * 0.005})`;
            ctx.lineWidth = 0.8; ctx.stroke();
        });

        // nodes + glow
        nodes.forEach((n, i) => {
            const pulse = Math.sin(t * 2.2 + i * 0.7) * 1.4;
            const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5 + pulse);
            glow.addColorStop(0, n.color + '88'); glow.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5 + pulse, 0, TAU); ctx.fillStyle = glow; ctx.fill();
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, TAU); ctx.fillStyle = n.color; ctx.fill();
        });

        // eye icon, softer
        const ex = W - 42, ey = 26, blink = 0.4 + Math.sin(t * 1.3) * 0.12;
        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = '#f2c46d';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ex - 11, ey); ctx.quadraticCurveTo(ex, ey - 7, ex + 11, ey); ctx.quadraticCurveTo(ex, ey + 7, ex - 11, ey); ctx.stroke();
        ctx.beginPath(); ctx.arc(ex, ey, 2.8, 0, TAU); ctx.stroke();
        ctx.globalAlpha = blink * 0.9;
        ctx.beginPath(); ctx.moveTo(ex - 13, ey + 9); ctx.lineTo(ex + 13, ey - 9); ctx.strokeStyle = '#ff7a4b'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();

        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Animation 2: Tính phổ biến =====
function initAnim2() {
    const canvas = document.getElementById('anim2');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const zones = [{ cx: 58, cy: H / 2 }, { cx: W / 2, cy: H / 2 }, { cx: W - 58, cy: H / 2 }];
    let t = 0;

    function drawAtom(cx, cy, k) {
        const orbits = [18, 27, 37];
        const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
        coreGlow.addColorStop(0, 'rgba(242,196,109,0.88)'); coreGlow.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cx, cy, 26, 0, TAU); ctx.fillStyle = coreGlow; ctx.fill();
        ctx.beginPath(); ctx.arc(cx, cy, 4.8, 0, TAU); ctx.fillStyle = '#f2c46d'; ctx.fill();
        orbits.forEach((orb, i) => {
            ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * 0.2 + i * 0.8);
            ctx.beginPath(); ctx.ellipse(0, 0, orb, orb * 0.55, 0, 0, TAU); ctx.strokeStyle = 'rgba(242,196,109,0.24)'; ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore();
            const a = k * (1.8 + i * 0.2) + i * 2.1;
            const ex = cx + Math.cos(a) * orb;
            const ey = cy + Math.sin(a * 1.35) * orb * 0.55;
            ctx.beginPath(); ctx.arc(ex, ey, 2.4, 0, TAU); ctx.fillStyle = i === 1 ? '#9bd3ff' : '#f2c46d'; ctx.fill();
        });
    }

    function drawPlanet(cx, cy, k) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44);
        glow.addColorStop(0, 'rgba(232,135,58,0.55)'); glow.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cx, cy, 44, 0, TAU); ctx.fillStyle = glow; ctx.fill();
        const rings = [16, 28, 40];
        rings.forEach((r, i) => {
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.strokeStyle = `rgba(255,220,170,${0.16 - i * 0.03})`; ctx.lineWidth = 0.8; ctx.stroke();
            const a = k * (1.2 - i * 0.18) + i * 1.8;
            const px = cx + Math.cos(a) * r;
            const py = cy + Math.sin(a) * r * 0.72;
            ctx.beginPath(); ctx.arc(px, py, 2.8 - i * 0.25, 0, TAU); ctx.fillStyle = ['#9bd3ff', '#7ad45a', '#f2c46d'][i]; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fillStyle = '#ff9b52'; ctx.fill();
    }

    function drawGalaxy(cx, cy, k) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
        glow.addColorStop(0, 'rgba(242,196,109,0.72)'); glow.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cx, cy, 60, 0, TAU); ctx.fillStyle = glow; ctx.fill();
        ctx.restore();
        for (let arm = 0; arm < 2; arm++) {
            for (let i = 0; i < 42; i++) {
                const p = i / 42;
                const r = 8 + p * 42;
                const a = arm * Math.PI + p * 3.8 + k * 0.45;
                const x = cx + Math.cos(a) * r;
                const y = cy + Math.sin(a) * r * 0.58;
                ctx.beginPath(); ctx.arc(x, y, (1 - p) * 2.1 + 0.4, 0, TAU); ctx.fillStyle = `rgba(242,196,109,${(1 - p) * 0.52})`; ctx.fill();
            }
        }
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fillStyle = '#f2c46d'; ctx.fill();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.012;
        const pulse = 0.5 + Math.sin(t * 1.4) * 0.2;
        ctx.save();
        ctx.globalAlpha = 0.16;
        ctx.strokeStyle = '#f2c46d';
        ctx.lineWidth = 1;
        zones.forEach(z => { ctx.beginPath(); ctx.arc(z.cx, z.cy, 62 + pulse * 8, 0, TAU); ctx.stroke(); });
        ctx.restore();

        drawAtom(zones[0].cx, zones[0].cy, t);
        drawPlanet(zones[1].cx, zones[1].cy, t);
        drawGalaxy(zones[2].cx, zones[2].cy, t);

        // connectors
        for (let i = 0; i < zones.length - 1; i++) {
            const a = zones[i], b = zones[i + 1];
            ctx.save();
            ctx.setLineDash([5, 7]);
            ctx.lineDashOffset = -t * 32;
            ctx.beginPath(); ctx.moveTo(a.cx + 34, a.cy); ctx.lineTo(b.cx - 34, b.cy);
            ctx.strokeStyle = 'rgba(242,196,109,0.42)'; ctx.lineWidth = 1; ctx.stroke();
            ctx.restore();
            ctx.beginPath(); ctx.moveTo(b.cx - 34, b.cy); ctx.lineTo(b.cx - 41, b.cy - 4); ctx.lineTo(b.cx - 41, b.cy + 4); ctx.closePath();
            ctx.fillStyle = 'rgba(242,196,109,0.55)'; ctx.fill();
        }

        ctx.font = '10px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(230,225,210,0.6)';
        ['Vi mô', 'Vĩ mô', 'Vũ trụ'].forEach((label, i) => ctx.fillText(label, zones[i].cx, H - 12));
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Animation 3: Tính đa dạng =====
function initAnim3() {
    const canvas = document.getElementById('anim3');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const nodes = [
        { x: W * 0.16, y: H * 0.32, r: 5, color: '#f2c46d' },
        { x: W * 0.5, y: H * 0.14, r: 5, color: '#ff9b52' },
        { x: W * 0.84, y: H * 0.32, r: 5, color: '#9bd3ff' },
        { x: W * 0.24, y: H * 0.76, r: 5, color: '#7ad45a' },
        { x: W * 0.5, y: H * 0.6, r: 6, color: '#f2c46d' },
        { x: W * 0.76, y: H * 0.76, r: 5, color: '#d78cff' },
    ];
    const links = [
        { a: 0, b: 1, type: 'solid', color: '#f2c46d' },
        { a: 1, b: 2, type: 'dash', color: '#9bd3ff' },
        { a: 0, b: 3, type: 'thick', color: '#ff9b52' },
        { a: 2, b: 5, type: 'dot', color: '#d78cff' },
        { a: 3, b: 4, type: 'curve', color: '#7ad45a' },
        { a: 4, b: 5, type: 'wave', color: '#d78cff' },
    ];
    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.018;
        // subtle background glow
        const bg = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, 140);
        bg.addColorStop(0, 'rgba(255,255,255,0.03)'); bg.addColorStop(1, 'transparent');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        links.forEach((link, i) => {
            const a = nodes[link.a], b = nodes[link.b];
            ctx.save();
            ctx.strokeStyle = link.color;
            ctx.lineWidth = link.type === 'thick' ? 2.3 : 1.2;
            ctx.globalAlpha = 0.85;
            if (link.type === 'dash') { ctx.setLineDash([7, 5]); ctx.lineDashOffset = -t * 22; }
            if (link.type === 'dot') { ctx.setLineDash([2, 5]); ctx.lineDashOffset = -t * 18; }
            if (link.type === 'curve') {
                const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 26 + Math.sin(t + i) * 4;
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y); ctx.stroke();
            } else if (link.type === 'wave') {
                ctx.beginPath();
                for (let s = 0; s <= 24; s++) {
                    const p = s / 24;
                    const x = lerp(a.x, b.x, p);
                    const y = lerp(a.y, b.y, p) + Math.sin(p * TAU * 2 + t * 4) * 4;
                    s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            } else {
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
            ctx.restore();
        });

        nodes.forEach((n, i) => {
            const pulse = 1.5 + Math.sin(t * 2.2 + i) * 0.9;
            const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5 + pulse);
            glow.addColorStop(0, `${n.color}cc`);
            glow.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4 + pulse, 0, TAU); ctx.fillStyle = glow; ctx.fill();
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, TAU); ctx.fillStyle = n.color; ctx.fill();
        });

        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(230,225,210,0.58)';
        [['Bản chất', 56, 148], ['Bên trong', 130, 150], ['Gián tiếp', 206, 98]].forEach(([txt, x, y]) => ctx.fillText(txt, x, y));
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Main Network Animation =====
function initMainAnim() {
    const canvas = document.getElementById('mainAnim');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const nodes = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
        const angle = (TAU / nodeCount) * i + rand(-0.2, 0.2);
        const r = rand(40, 200);
        nodes.push({
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
            baseX: cx + Math.cos(angle) * r,
            baseY: cy + Math.sin(angle) * r,
            r: rand(3, 7),
            phase: rand(0, TAU),
            drift: rand(8, 20),
            speed: rand(0.3, 0.8),
            color: ['#d4a843', '#e8873a', '#5a9fd4', '#7ad45a'][Math.floor(rand(0, 4))]
        });
    }

    // Prominent nodes (triangle)
    const prominent = [
        { x: cx, y: cy - 160, r: 9, color: '#e8873a' },
        { x: cx - 140, y: cy + 100, r: 8, color: '#d4a843' },
        { x: cx + 140, y: cy + 50, r: 8, color: '#d4a843' }
    ];

    let time = 0;
    let activeCard = -1;

    // Listen for card hover
    document.querySelectorAll('.principle-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            activeCard = parseInt(card.dataset.principle);
        });
        card.addEventListener('mouseleave', () => { activeCard = -1; });
    });

    function draw() {
        ctx.clearRect(0, 0, W, H);
        time += 0.008;

        // Animate nodes floating
        nodes.forEach(n => {
            n.x = n.baseX + Math.sin(time * n.speed + n.phase) * n.drift;
            n.y = n.baseY + Math.cos(time * n.speed * 0.7 + n.phase) * n.drift * 0.6;
        });

        const allNodes = [...nodes, ...prominent];

        // Draw connections
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = i + 1; j < allNodes.length; j++) {
                const d = dist(allNodes[i], allNodes[j]);
                const maxD = 140;
                if (d < maxD) {
                    let alpha = (1 - d / maxD) * 0.35;

                    // Highlight based on active card
                    if (activeCard === 1) {
                        // Objectivity: pulse all connections
                        alpha *= 0.7 + Math.sin(time * 4) * 0.3;
                    } else if (activeCard === 2) {
                        // Universality: all connections bright
                        alpha = Math.min(alpha * 2, 0.6);
                    } else if (activeCard === 3) {
                        // Diversity: varied line styles
                        if ((i + j) % 3 === 0) {
                            ctx.setLineDash([4, 3]);
                        } else if ((i + j) % 3 === 1) {
                            ctx.setLineDash([1, 3]);
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(allNodes[i].x, allNodes[i].y);
                    ctx.lineTo(allNodes[j].x, allNodes[j].y);
                    ctx.strokeStyle = `rgba(200,170,100,${alpha})`;
                    ctx.lineWidth = alpha > 0.2 ? 1.2 : 0.6;
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Moving particle on line
                    if (d < 100 && (i + j) % 4 === 0) {
                        const t = ((time * 40 + i * 17) % 100) / 100;
                        const px = lerp(allNodes[i].x, allNodes[j].x, t);
                        const py = lerp(allNodes[i].y, allNodes[j].y, t);
                        ctx.beginPath(); ctx.arc(px, py, 1.5, 0, TAU);
                        ctx.fillStyle = `rgba(240,200,96,${alpha * 1.5})`;
                        ctx.fill();
                    }
                }
            }
        }

        // Draw prominent nodes
        prominent.forEach((n, i) => {
            const pulse = Math.sin(time * 3 + i * 2) * 3;
            // Outer glow
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4 + pulse);
            g.addColorStop(0, n.color + '30');
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4 + pulse, 0, TAU); ctx.fillStyle = g; ctx.fill();
            // Node
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, TAU); ctx.fillStyle = n.color; ctx.fill();
        });

        // Draw smaller nodes
        nodes.forEach(n => {
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, TAU);
            ctx.fillStyle = n.color;
            ctx.fill();
            // Tiny glow
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
            g.addColorStop(0, n.color + '20');
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.5, 0, TAU); ctx.fillStyle = g; ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Scroll Animation =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 150);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ===== HiDPI Canvas Fix =====
function fixCanvasDPI() {
    const dpr = window.devicePixelRatio || 1;
    document.querySelectorAll('canvas:not(#bgCanvas)').forEach(canvas => {
        const w = canvas.width, h = canvas.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.getContext('2d').scale(dpr, dpr);
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    fixCanvasDPI();
    initBgCanvas();
    initAnim1();
    initAnim2();
    initAnim3();
    initMainAnim();
    initScrollAnimations();
});
