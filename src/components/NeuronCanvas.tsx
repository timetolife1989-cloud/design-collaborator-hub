import { useEffect, useRef } from 'react';

interface Neuron {
  x: number; y: number; vx: number; vy: number;
  size: number; phase: number; ps: number;
  col: string; L: number;
  cfg: typeof DESKTOP_CFG[number];
}

const DESKTOP_CFG = [
  { count: 20, sMin: 0.15, sMax: 0.65, spd: 0.07, opMax: 0.22, psMin: 0.003, psMax: 0.009,
    dist: 75, lineOp: 0.035, lw: 0.3,
    colors: ['18,48,110', '8,38,88', '14,55,95'] },
  { count: 15, sMin: 0.45, sMax: 1.35, spd: 0.15, opMax: 0.38, psMin: 0.005, psMax: 0.013,
    dist: 115, lineOp: 0.065, lw: 0.4,
    colors: ['59,130,246', '6,182,212', '38,95,200'] },
  { count: 10, sMin: 1.0, sMax: 2.3, spd: 0.26, opMax: 0.62, psMin: 0.006, psMax: 0.016,
    dist: 148, lineOp: 0.09, lw: 0.55,
    colors: ['96,165,250', '6,182,212', '139,92,246'] }
];

const MOBILE_CFG = [
  { count: 8, sMin: 0.2, sMax: 0.5, spd: 0.05, opMax: 0.18, psMin: 0.003, psMax: 0.007,
    dist: 60, lineOp: 0.03, lw: 0.3,
    colors: ['18,48,110', '8,38,88'] },
  { count: 6, sMin: 0.5, sMax: 1.2, spd: 0.1, opMax: 0.3, psMin: 0.004, psMax: 0.01,
    dist: 90, lineOp: 0.05, lw: 0.4,
    colors: ['59,130,246', '6,182,212'] },
  { count: 4, sMin: 1.0, sMax: 1.8, spd: 0.2, opMax: 0.5, psMin: 0.005, psMax: 0.012,
    dist: 120, lineOp: 0.07, lw: 0.5,
    colors: ['96,165,250', '6,182,212'] }
];

function createNeuron(layerIdx: number, W: number, H: number, init: boolean, cfg: typeof DESKTOP_CFG): Neuron {
  const c = cfg[layerIdx];
  return {
    x: Math.random() * W,
    y: init ? Math.random() * H : (Math.random() < 0.5 ? -8 : H + 8),
    vx: (Math.random() - 0.5) * c.spd,
    vy: (Math.random() - 0.5) * c.spd,
    size: c.sMin + Math.random() * (c.sMax - c.sMin),
    phase: Math.random() * Math.PI * 2,
    ps: c.psMin + Math.random() * (c.psMax - c.psMin),
    col: c.colors[Math.floor(Math.random() * c.colors.length)],
    L: layerIdx, cfg: c,
  };
}

const NeuronCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const LAYER_CFG = isMobile ? MOBILE_CFG : DESKTOP_CFG;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId: number;
    let lastTime = 0;
    const targetInterval = isMobile ? 50 : 33; // ~20fps mobile, ~30fps desktop

    const neurons: Neuron[] = [];
    LAYER_CFG.forEach((_, li) => {
      for (let n = 0; n < LAYER_CFG[li].count; n++) {
        neurons.push(createNeuron(li, W, H, true, LAYER_CFG));
      }
    });

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    function tick(n: Neuron): number {
      n.x += n.vx; n.y += n.vy; n.phase += n.ps;
      if (n.x < -12 || n.x > W + 12 || n.y < -12 || n.y > H + 12) {
        Object.assign(n, createNeuron(n.L, W, H, false, LAYER_CFG));
      }
      return n.cfg.opMax * (0.3 + 0.7 * Math.sin(n.phase));
    }

    function loop(time: number) {
      animId = requestAnimationFrame(loop);
      if (time - lastTime < targetInterval) return;
      lastTime = time;

      ctx!.clearRect(0, 0, W, H);

      let idx = 0;
      for (const cfg of LAYER_CFG) {
        const slice = neurons.slice(idx, idx + cfg.count);
        idx += cfg.count;
        for (let i = 0; i < slice.length; i++) {
          for (let j = i + 1; j < slice.length; j++) {
            const dx = slice[i].x - slice[j].x;
            const dy = slice[i].y - slice[j].y;
            const d2 = dx * dx + dy * dy;
            const maxD = cfg.dist;
            if (d2 < maxD * maxD) {
              const d = Math.sqrt(d2);
              ctx!.beginPath();
              ctx!.moveTo(slice[i].x, slice[i].y);
              ctx!.lineTo(slice[j].x, slice[j].y);
              ctx!.strokeStyle = `rgba(${slice[i].col},${(1 - d / maxD) * cfg.lineOp})`;
              ctx!.lineWidth = cfg.lw;
              ctx!.stroke();
            }
          }
        }
      }

      neurons.forEach(n => {
        const op = tick(n);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${n.col},${op})`;
        ctx!.fill();
      });
    }

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.9 }}
    />
  );
};

export default NeuronCanvas;
