import { useEffect, useRef } from 'react';

interface Neuron {
  x: number; y: number; vx: number; vy: number;
  size: number; phase: number; ps: number;
  col: string; L: number;
  cfg: typeof DESKTOP_CFG[number];
}

const DESKTOP_CFG = [
  { count: 14, sMin: 0.12, sMax: 0.5, spd: 0.04, opMax: 0.12, psMin: 0.002, psMax: 0.006,
    dist: 80, lineOp: 0.02, lw: 0.3,
    colors: ['100,130,180', '80,110,160', '90,120,170'] },
  { count: 10, sMin: 0.4, sMax: 1.0, spd: 0.08, opMax: 0.2, psMin: 0.003, psMax: 0.008,
    dist: 110, lineOp: 0.035, lw: 0.35,
    colors: ['100,160,210', '80,180,200', '110,140,200'] },
  { count: 6, sMin: 0.8, sMax: 1.6, spd: 0.14, opMax: 0.32, psMin: 0.004, psMax: 0.01,
    dist: 140, lineOp: 0.05, lw: 0.4,
    colors: ['130,175,230', '90,190,210', '150,140,210'] }
];

const MOBILE_CFG = [
  { count: 6, sMin: 0.15, sMax: 0.4, spd: 0.03, opMax: 0.1, psMin: 0.002, psMax: 0.005,
    dist: 60, lineOp: 0.02, lw: 0.3,
    colors: ['100,130,180', '80,110,160'] },
  { count: 4, sMin: 0.4, sMax: 0.9, spd: 0.06, opMax: 0.16, psMin: 0.003, psMax: 0.007,
    dist: 85, lineOp: 0.03, lw: 0.35,
    colors: ['100,160,210', '80,180,200'] },
  { count: 3, sMin: 0.8, sMax: 1.3, spd: 0.1, opMax: 0.25, psMin: 0.004, psMax: 0.008,
    dist: 110, lineOp: 0.04, lw: 0.4,
    colors: ['130,175,230', '90,190,210'] }
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
    const targetInterval = isMobile ? 50 : 33;

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
      style={{ opacity: 0.7 }}
    />
  );
};

export default NeuronCanvas;
