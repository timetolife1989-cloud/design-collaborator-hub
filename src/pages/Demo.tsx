import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SCENES = ['intro', 'login', 'electron', 'dashboard', 'chart', 'forecast', 'resolution'] as const;

const Demo = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginBtnText, setLoginBtnText] = useState('Bejelentkezés');
  const [authSteps, setAuthSteps] = useState([false, false, false, false]);
  const [dashCardsVisible, setDashCardsVisible] = useState(false);
  const [anomalyVisible, setAnomalyVisible] = useState(false);
  const [forecastVisible, setForecastVisible] = useState(false);
  const [resolutionStep, setResolutionStep] = useState(0);
  const [flash, setFlash] = useState(false);
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const electronCanvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }, []);

  const addTimer = useCallback((cb: () => void, ms: number) => {
    const t = setTimeout(cb, ms);
    timerRef.current.push(t);
    return t;
  }, []);

  const typeText = useCallback((setter: (v: string) => void, text: string, speed: number, cb?: () => void) => {
    let i = 0;
    const iv = setInterval(() => {
      setter(text.substring(0, ++i));
      if (i >= text.length) { clearInterval(iv); if (cb) cb(); }
    }, speed);
    timerRef.current.push(iv as unknown as NodeJS.Timeout);
  }, []);

  // Auto-start demo
  useEffect(() => {
    const t = addTimer(() => startDemo(), 2500);
    return () => { clearTimers(); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startDemo() {
    // Scene 1: Login
    setCurrentScene(1);
    addTimer(() => {
      typeText(setLoginUser, '30008047', 80, () => {
        addTimer(() => {
          typeText(setLoginPass, '••••••••••••', 60, () => {
            addTimer(() => {
              setLoginBtnText('Hitelesítés...');
              addTimer(() => runElectron(), 800);
            }, 400);
          });
        }, 400);
      });
    }, 600);
  }

  function runElectron() {
    setFlash(true);
    addTimer(() => setFlash(false), 300);
    setCurrentScene(2);
    initElectronCanvas();
    [0, 1, 2, 3].forEach(i => {
      addTimer(() => setAuthSteps(prev => { const n = [...prev]; n[i] = true; return n; }), 1000 + i * 600);
    });
    addTimer(() => runDashboard(), 4000);
  }

  function runDashboard() {
    setCurrentScene(3);
    addTimer(() => setDashCardsVisible(true), 200);
    addTimer(() => runChart(), 4000);
  }

  function runChart() {
    setCurrentScene(4);
    addTimer(() => drawChart(), 400);
    addTimer(() => setAnomalyVisible(true), 1400);
    addTimer(() => runForecast(), 5000);
  }

  function runForecast() {
    setCurrentScene(5);
    addTimer(() => setForecastVisible(true), 400);
    addTimer(() => runResolution(), 5000);
  }

  function runResolution() {
    setCurrentScene(6);
    [1, 2, 3, 4, 5, 6].forEach(i => {
      addTimer(() => setResolutionStep(i), 800 + i * 200);
    });
  }

  function restartDemo() {
    clearTimers();
    setCurrentScene(0);
    setLoginUser('');
    setLoginPass('');
    setLoginBtnText('Bejelentkezés');
    setAuthSteps([false, false, false, false]);
    setDashCardsVisible(false);
    setAnomalyVisible(false);
    setForecastVisible(false);
    setResolutionStep(0);
    addTimer(() => startDemo(), 2500);
  }

  function skipToEnd() {
    clearTimers();
    setCurrentScene(6);
    setResolutionStep(6);
  }

  function initElectronCanvas() {
    const canvas = electronCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 500;
    canvas.height = 400;

    const cx = 250, cy = 200;
    let t = 0;
    const electrons = Array.from({ length: 12 }, (_, i) => ({
      orbit: 60 + (i % 3) * 35,
      angle: (i / 12) * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
      size: 3 + Math.random() * 3,
      color: ['#00d4ff', '#7c3aed', '#10b981'][i % 3]
    }));

    let animId: number;
    function draw() {
      ctx!.clearRect(0, 0, 500, 400);
      ctx!.fillStyle = 'rgba(3,8,15,0.3)';
      ctx!.fillRect(0, 0, 500, 400);

      // Nucleus
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 20);
      grad.addColorStop(0, 'rgba(0,212,255,0.9)');
      grad.addColorStop(1, 'rgba(124,58,237,0)');
      ctx!.beginPath(); ctx!.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx!.fillStyle = grad; ctx!.fill();
      ctx!.beginPath(); ctx!.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx!.fillStyle = '#00d4ff'; ctx!.fill();

      // Orbits & electrons
      electrons.forEach(e => {
        ctx!.beginPath(); ctx!.arc(cx, cy, e.orbit, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(255,255,255,0.06)'; ctx!.lineWidth = 1; ctx!.stroke();
        e.angle += e.speed;
        const x = cx + Math.cos(e.angle) * e.orbit;
        const y = cy + Math.sin(e.angle) * e.orbit;
        ctx!.beginPath(); ctx!.arc(x, y, e.size, 0, Math.PI * 2);
        ctx!.fillStyle = e.color;
        ctx!.shadowBlur = 15; ctx!.shadowColor = e.color;
        ctx!.fill(); ctx!.shadowBlur = 0;
      });

      // Data streams
      for (let i = 0; i < 3; i++) {
        const angle = t * 0.5 + i * Math.PI * 0.667;
        const x1 = cx + Math.cos(angle) * 22, y1 = cy + Math.sin(angle) * 22;
        const x2 = cx + Math.cos(angle) * 140, y2 = cy + Math.sin(angle) * 140;
        const g = ctx!.createLinearGradient(x1, y1, x2, y2);
        g.addColorStop(0, ['rgba(0,212,255,0.8)', 'rgba(124,58,237,0.8)', 'rgba(16,185,129,0.8)'][i]);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.beginPath(); ctx!.moveTo(x1, y1); ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = g; ctx!.lineWidth = 1.5; ctx!.stroke();
      }

      t += 0.05;
      animId = requestAnimationFrame(draw);
    }
    draw();
    // Cleanup after scene changes
    addTimer(() => cancelAnimationFrame(animId), 5000);
  }

  function drawChart() {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const data = [26100, 17200, 16800, 1200, 24000, 29500, 26200, 32000, 24500, 17000, 22000, 24500, 26000, 27000, 15000, 24800, 22000, 26000];
    const labels = ['02.12', '02.13', '02.14', '02.15', '02.16', '02.17', '02.18', '02.19', '02.20', '02.21', '02.22', '02.23', '02.24', '02.25', '02.26', '02.27', '03.02', '03.03'];
    const target = 28000, maxVal = 36000;
    const padL = 50, padR = 20, padT = 20, padB = 32;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const bw = plotW / data.length;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    [0, 0.25, 0.5, 0.75, 1].forEach(f => {
      const y = padT + plotH * (1 - f);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Space Mono';
      ctx.fillText(Math.round(maxVal * f / 1000) + 'k', 4, y + 3);
    });

    // Target line
    const ty = padT + plotH * (1 - target / maxVal);
    ctx.beginPath(); ctx.setLineDash([6, 4]); ctx.moveTo(padL, ty); ctx.lineTo(padL + plotW, ty);
    ctx.strokeStyle = 'rgba(16,185,129,0.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);

    // Bars
    data.forEach((v, i) => {
      const bh = (v / maxVal) * plotH;
      const x = padL + i * bw + bw * 0.15;
      const y = padT + plotH - bh;
      const bWidth = bw * 0.7;
      const isAnomaly = i === 3;
      const color = isAnomaly ? 'rgba(239,68,68,0.9)' : v >= target ? 'rgba(59,130,246,0.85)' : 'rgba(59,130,246,0.5)';
      const grad = ctx.createLinearGradient(0, y, 0, y + bh);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color.replace(/0\.\d+\)/, '0.2)'));
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, bWidth, bh);
      if (isAnomaly) {
        ctx.strokeStyle = 'rgba(239,68,68,0.6)'; ctx.lineWidth = 1.5;
        ctx.strokeRect(x - 2, y - 2, bWidth + 4, bh + 4);
      }
      if (i % 3 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px Space Mono';
        ctx.fillText(labels[i], padL + i * bw + bw * 0.1, h - 8);
      }
    });

    // Performance line
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = padL + i * bw + bw * 0.5;
      const pct = v / target;
      const y = padT + plotH * (1 - Math.min(pct, 1.3) / 1.3);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
    ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b'; ctx.stroke(); ctx.shadowBlur = 0;
  }

  const dashCards = [
    { icon: '📊', title: 'Napi Perces', val: '25,820', sub: 'perc leadva · 92.2% cél', color: 'from-blue-500 to-blue-400' },
    { icon: '👥', title: 'Létszám', val: '98 fő', sub: '3 műszak aktív', color: 'from-purple-600 to-purple-400' },
    { icon: '📦', title: 'Leszállított', val: '2,061 db', sub: '30,647 EUR · ma', color: 'from-green-500 to-green-400' },
    { icon: '🗂️', title: 'Allokáció', val: 'CW10', sub: 'Heti terv vs teljesítés', color: 'from-amber-500 to-amber-400' },
    { icon: '🔍', title: 'Termeléskövetés', val: '⚠ 3 kritikus', sub: '5+ óra várakozás', color: 'from-cyan-400 to-cyan-300', valColor: 'text-red-400' },
    { icon: '⚡', title: 'Operátori Teljesítmény', val: '9 terület', sub: 'Szerelés · Tekercselő · Mérő', color: 'from-pink-500 to-pink-400' },
    { icon: '📥', title: 'SAP Import', val: '164,629', sub: 'sor feldolgozva', color: 'from-teal-500 to-teal-400' },
    { icon: '🏭', title: 'War Room', val: 'Élő', sub: 'Nyomtatásra kész', color: 'from-orange-500 to-orange-400' },
    { icon: '🚨', title: 'Anomália detektálva', val: '02.15', sub: 'Alacsony teljesítmény hét', color: 'from-red-500 to-red-400', highlight: true, valColor: 'text-red-400' },
  ];

  const forecastCards = [
    { title: '▲ Beérkező rendelések', val: '12,400', unit: 'db', sub: 'CW11 · következő hét igény', bar: 80, barColor: 'from-cyan-400 to-purple-400', note: 'vs kapacitás: 82%' },
    { title: '⚠ HC Kalkulátor', val: '−8 fő', unit: '', sub: 'Várható létszámhiány · C műszak · kedd', bar: 65, barColor: 'from-amber-500 to-red-500', note: 'Rendelési igény > elérhető kapacitás', alert: true, badge: 'Headcount Alert' },
    { title: '◎ Napi cél perc', val: '28,000', unit: 'min', sub: 'fallback target · heti nincs beállítva', bar: 92, barColor: 'from-green-500 to-cyan-300', note: 'Elérhető: 25,820 perc (92.2%)' },
    { title: '💶 EUR Bevétel becslés', val: '~34,000', unit: '€', sub: 'Siemens DC + No Siemens + Él tekercselés', bar: 88, barColor: 'from-green-500 to-green-400', note: 'Az előző hét átlagán alapul' },
  ];

  const resCards = [
    { icon: '📊', label: 'Napi Perces', status: '✓ OK' },
    { icon: '👥', label: 'Létszám', status: '✓ OK' },
    { icon: '📦', label: 'Leszállított', status: '✓ OK' },
    { icon: '🔍', label: 'Követés', status: '✓ OK' },
    { icon: '☁', label: 'Cloud', status: '✓ Live' },
  ];

  const authLabels = [
    { icon: '🔑', label: 'JWT Token', value: 'eyJhbGc...' },
    { icon: '🔐', label: 'bcrypt Hash', value: '$2b$12$...' },
    { icon: '✓', label: 'Role: Admin', value: 'Svasznik Tibor' },
    { icon: '☁', label: 'DB Connect', value: 'SQL Server ✓' },
  ];

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: 'hsl(var(--ainova-bg))' }}>
      {/* Scanlines */}
      <div className="fixed inset-0 z-[5] pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />

      {/* Corner decorations */}
      {['top-5 left-5 border-t border-l', 'top-5 right-5 border-t border-r', 'bottom-5 left-5 border-b border-l', 'bottom-5 right-5 border-b border-r'].map((cls, i) => (
        <div key={i} className={`fixed w-[60px] h-[60px] z-20 opacity-30 border-ainova-accent2 ${cls}`} />
      ))}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-0.5 z-[100] transition-all duration-300"
        style={{
          width: `${(currentScene / (SCENES.length - 1)) * 100}%`,
          background: 'linear-gradient(90deg, hsl(var(--ainova-accent2)), hsl(var(--ainova-accent3)))'
        }} />

      {/* Flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5">
        <Link to="/" className="flex items-center gap-3 font-syne font-extrabold text-xl tracking-[0.05em] text-ainova-bright no-underline">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'conic-gradient(hsl(var(--ainova-accent2)), hsl(var(--ainova-accent3)), hsl(var(--ainova-accent2)))', animation: 'spin 4s linear infinite' }}>
            ◈
          </div>
          AINOVA
        </Link>
        <div className="flex gap-3 items-center">
          <button onClick={skipToEnd} className="font-space text-[11px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border border-border text-ainova-muted hover:text-foreground transition-all" style={{ background: 'rgba(255,255,255,0.08)' }}>
            Skip →
          </button>
          <button onClick={restartDemo} className="font-space text-[11px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border border-ainova-accent2/30 text-ainova-accent2 hover:text-foreground transition-all" style={{ background: 'rgba(255,255,255,0.08)' }}>
            ↺ Újra
          </button>
          <Link to="/" className="font-space text-[11px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border border-border text-ainova-muted no-underline hover:text-foreground transition-all" style={{ background: 'rgba(255,255,255,0.08)' }}>
            ← Vissza
          </Link>
        </div>
      </nav>

      {/* Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {SCENES.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentScene ? 'bg-ainova-accent2 shadow-[0_0_10px_hsl(var(--ainova-accent2))] scale-130' : 'bg-border'}`} />
        ))}
      </div>

      {/* SCENES */}
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        {/* Scene 0: Intro */}
        <AnimatePresence mode="wait">
          {currentScene === 0 && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 text-center">
              <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                className="font-syne font-extrabold text-[clamp(64px,10vw,120px)] tracking-[0.1em] leading-none gradient-text">
                AINOVA
              </motion.div>
              <div className="font-space text-xs tracking-[0.25em] text-ainova-muted uppercase">
                Cloud Intelligence · Industry 4.0
              </div>
              <div className="text-lg text-foreground/60 font-light max-w-[400px]">
                From 164,629 SAP rows to one decision.
              </div>
              <button onClick={startDemo}
                className="mt-4 px-12 py-4 rounded btn-gradient text-ainova-bright font-syne font-bold text-sm tracking-[0.15em] uppercase hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,212,255,0.3)] transition-all relative overflow-hidden">
                ▶ &nbsp; Watch it work
              </button>
            </motion.div>
          )}

          {/* Scene 1: Login */}
          {currentScene === 1 && (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ perspective: '1000px' }}>
              <motion.div initial={{ y: 40, rotateX: 5 }} animate={{ y: 0, rotateX: 0 }} transition={{ duration: 0.8 }}
                className="w-[420px] p-12 rounded-2xl border border-ainova-accent2/20"
                style={{ background: 'rgba(7,13,26,0.95)', boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.05)' }}>
                <div className="text-center mb-8">
                  <div className="font-syne font-extrabold text-3xl tracking-[0.12em] gradient-text">AINOVA</div>
                  <div className="font-space text-[9px] tracking-[0.2em] text-ainova-muted uppercase mt-1">Advanced Intelligent Network Operations</div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium text-ainova-muted mb-2 tracking-[0.05em]">Felhasználónév</label>
                  <input readOnly value={loginUser} className={`w-full px-4 py-3.5 rounded-lg border font-space text-sm text-foreground outline-none transition-all ${loginUser ? 'border-ainova-accent2 shadow-[0_0_20px_rgba(0,212,255,0.1)]' : 'border-foreground/10'}`} style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium text-ainova-muted mb-2 tracking-[0.05em]">Jelszó</label>
                  <input readOnly type="password" value={loginPass} className={`w-full px-4 py-3.5 rounded-lg border font-space text-sm text-foreground outline-none transition-all ${loginPass ? 'border-ainova-accent2 shadow-[0_0_20px_rgba(0,212,255,0.1)]' : 'border-foreground/10'}`} style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <button className={`w-full py-4 rounded-lg text-ainova-bright font-syne font-bold text-sm tracking-[0.1em] ${loginBtnText !== 'Bejelentkezés' ? 'bg-gradient-to-r from-ainova-accent2 to-green-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
                  {loginBtnText}
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Scene 2: Electron Auth */}
          {currentScene === 2 && (
            <motion.div key="electron" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5">
              <canvas ref={electronCanvasRef} width={500} height={400} className="rounded-xl" />
              <div className="flex gap-8">
                {authLabels.map((a, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: authSteps[i] ? 1 : 0, y: authSteps[i] ? 0 : 20 }}
                    className="text-center">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mx-auto mb-2 text-xl transition-all ${authSteps[i] ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-border'}`}>
                      {a.icon}
                    </div>
                    <div className="font-space text-[10px] tracking-[0.1em] uppercase text-ainova-muted">{a.label}</div>
                    <div className="font-space text-[11px] text-ainova-accent2 mt-1">{a.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scene 3: Dashboard */}
          {currentScene === 3 && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-16 flex flex-col w-full max-w-[900px]">
              <div className="flex justify-between items-center px-6 py-4 rounded-t-xl border-b border-border" style={{ background: 'rgba(7,13,26,0.9)' }}>
                <div className="font-syne font-extrabold text-lg tracking-[0.1em] text-ainova-accent2 flex items-center gap-2.5">◈ AINOVA</div>
                <div className="flex items-center gap-2.5 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ainova-accent2 to-ainova-accent3 flex items-center justify-center text-xs font-bold">ST</div>
                  <div>
                    <div className="text-sm font-semibold">Svasznik Tibor</div>
                    <div className="text-[10px] text-ainova-accent3">Admin</div>
                  </div>
                  <div className="font-space text-xs text-ainova-muted ml-4">2026.03.07 · 10. hét</div>
                  <div className="ml-4 px-3.5 py-1.5 rounded-md text-[11px] font-space" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>⏻ KILÉPÉS</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 p-6 rounded-b-xl border border-t-0 border-border" style={{ background: 'rgba(7,13,26,0.85)' }}>
                {dashCards.map((c, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={dashCardsVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`rounded-xl p-5 border border-border relative overflow-hidden cursor-pointer transition-all hover:border-ainova-accent2/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.05)] ${c.highlight ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : ''}`}
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.color}`} />
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ainova-muted mb-1">{c.title}</div>
                    <div className={`font-syne text-[22px] font-bold ${c.valColor || 'text-foreground'}`}>{c.val}</div>
                    <div className="text-[11px] text-ainova-muted mt-1">{c.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scene 4: Chart */}
          {currentScene === 4 && (
            <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-10 flex flex-col gap-4 items-center">
              <div className="rounded-xl border border-border p-6 w-[860px]" style={{ background: 'rgba(7,13,26,0.9)' }}>
                <div className="font-syne text-sm font-bold tracking-[0.1em] uppercase text-ainova-accent2 text-center mb-1">— PERC LEADÁSOK —</div>
                <div className="text-xs text-ainova-muted text-center mb-5">Napi kimutatás · 02.12 – 03.03</div>
                <canvas ref={chartCanvasRef} className="w-full" style={{ height: 220 }} />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={anomalyVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="rounded-xl p-5 w-[860px] flex items-center gap-6"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <div className="text-3xl flex-shrink-0">🔴</div>
                <div>
                  <div className="font-syne font-bold text-base text-red-400 mb-1">Anomália: 2026.02.15 — Kiugróan alacsony hét</div>
                  <div className="text-sm text-ainova-muted">Az adatok automatikusan összevonódtak → A műszak táppénz rátája megkétszereződött ezen a héten.</div>
                </div>
                <div className="ml-auto text-right flex-shrink-0">
                  <div className="font-space text-3xl font-bold text-red-400">+47%</div>
                  <div className="text-[11px] text-ainova-muted">táppénz spike</div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Scene 5: Forecast */}
          {currentScene === 5 && (
            <motion.div key="forecast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-10 flex flex-col gap-4 items-center">
              <div className="font-syne text-[13px] tracking-[0.2em] uppercase text-ainova-muted">Következő hét előrejelzés</div>
              <div className="grid grid-cols-2 gap-4 w-[800px]">
                {forecastCards.map((c, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={forecastVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className={`rounded-xl border border-border p-6 ${c.alert ? 'border-amber-500/40' : ''}`}
                    style={{ background: c.alert ? 'rgba(245,158,11,0.06)' : 'rgba(7,13,26,0.9)' }}>
                    {c.badge && <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-3 text-amber-500" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>⚡ {c.badge}</div>}
                    <div className="font-space text-[10px] tracking-[0.15em] uppercase text-ainova-muted mb-4">{c.title}</div>
                    <div className={`font-syne text-4xl font-extrabold mb-2 ${c.alert ? 'text-amber-500' : 'text-foreground'}`}>{c.val} <span className="text-lg text-ainova-muted">{c.unit}</span></div>
                    <div className={`text-xs mb-3 ${c.alert ? 'text-amber-500' : 'text-ainova-muted'}`}>{c.sub}</div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className={`h-full rounded-full bg-gradient-to-r ${c.barColor} transition-all duration-1000`} style={{ width: forecastVisible ? `${c.bar}%` : '0%' }} />
                    </div>
                    <div className={`text-[11px] mt-2 ${c.alert ? 'text-amber-500' : 'text-green-400'}`}>{c.note}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scene 6: Resolution */}
          {currentScene === 6 && (
            <motion.div key="resolution" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: resolutionStep >= 1 ? 1 : 0 }}
                className="font-syne text-sm font-bold tracking-[0.2em] uppercase text-ainova-muted">
                Rendszer egyensúlyban
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: resolutionStep >= 1 ? 1 : 0 }}
                className="grid grid-cols-5 gap-2.5 w-[700px]">
                {resCards.map((c, i) => (
                  <div key={i} className={`rounded-lg p-4 text-center border transition-all duration-500 ${resolutionStep >= i + 2 ? 'bg-green-500/[0.08] border-green-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-border'}`}
                    style={{ background: resolutionStep >= i + 2 ? undefined : 'rgba(255,255,255,0.04)' }}>
                    <div className="text-xl mb-1.5">{c.icon}</div>
                    <div className="text-[10px] text-ainova-muted">{c.label}</div>
                    <div className={`font-space text-[9px] mt-1 text-green-400 transition-opacity ${resolutionStep >= i + 2 ? 'opacity-100' : 'opacity-0'}`}>{c.status}</div>
                  </div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: resolutionStep >= 6 ? 1 : 0, y: resolutionStep >= 6 ? 0 : 30 }}
                transition={{ duration: 0.8 }}
                className="font-syne text-3xl font-extrabold text-center tracking-[0.05em] leading-[1.2] gradient-text max-w-[600px]">
                Silence the noise.<br />See the truth.
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: resolutionStep >= 6 ? 1 : 0 }}
                className="flex gap-4">
                <a href="mailto:info@ainovacloud.com" className="px-9 py-3.5 rounded btn-gradient text-ainova-bright font-syne font-bold text-[13px] tracking-[0.1em] uppercase no-underline shadow-[0_10px_40px_rgba(0,212,255,0.2)] hover:-translate-y-0.5 transition-all">
                  Kapcsolatfelvétel
                </a>
                <Link to="/" className="px-9 py-3.5 rounded border border-border text-ainova-muted font-syne font-bold text-[13px] tracking-[0.1em] uppercase no-underline hover:border-foreground/30 hover:text-foreground transition-all">
                  ainovacloud.com ↗
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Demo;
