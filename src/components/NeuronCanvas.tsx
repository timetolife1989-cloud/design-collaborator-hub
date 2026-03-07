import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  ps: number;
  col: string;
  L: number;
  cfg: typeof LAYER_CFG[number];
}

const LAYER_CFG = [
  { count: 40, sMin: 0.15, sMax: 0.65, spd: 0.07, opMax: 0.22, psMin: 0.003, psMax: 0.009,
    dist: 75, lineOp: 0.035, lw: 0.3, glow: false,
    colors: ['18,48,110', '8,38,88', '14,55,95', '22,60,120'] },
  { count: 30, sMin: 0.45, sMax: 1.35, spd: 0.15, opMax: 0.38, psMin: 0.005, psMax: 0.013,
    dist: 115, lineOp: 0.065, lw: 0.4, glow: false,
    colors: ['59,130,246', '6,182,212', '38,95,200', '20,140,180'] },
  { count: 20, sMin: 1.0, sMax: 2.3, spd: 0.26, opMax: 0.62, psMin: 0.006, psMax: 0.016,
    dist: 148, lineOp: 0.09, lw: 0.55, glow: true,
    colors: ['96,165,250', '6,182,212', '139,92,246', '34,211,238', '56,189,248'] }
];

function createNeuron(layerIdx: number, W: number, H: number, init: boolean): Neuron {
  const cfg = LAYER_CFG[layerIdx];
  return {
    x: Math.random() * W,
    y: init ? Math.random() * H : (Math.random() < 0.5 ? -8 : H + 8),
    vx: (Math.random() - 0.5) * cfg.spd,
    vy: (Math.random() - 0.5) * cfg.spd,
    size: cfg.sMin + Math.random() * (cfg.sMax - cfg.sMin),
    phase: Math.random() * Math.PI * 2,
    ps: cfg.psMin + Math.random() * (cfg.psMax - cfg.psMin),
    col: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
    L: layerIdx,
    cfg,
  };
}

const NeuronCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId: number;

    const neurons: Neuron[] = [];
    LAYER_CFG.forEach((_, li) => {
      for (let n = 0; n < LAYER_CFG[li].count; n++) {
        neurons.push(createNeuron(li, W, H, true));
      }
    });

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    function tick(n: Neuron): number {
      n.x += n.vx;
      n.y += n.vy;
      n.phase += n.ps;
      if (n.x < -12 || n.x > W + 12 || n.y < -12 || n.y > H + 12) {
        Object.assign(n, createNeuron(n.L, W, H, false));
      }
      return n.cfg.opMax * (0.3 + 0.7 * Math.sin(n.phase));
    }

    function loop() {
      ctx!.clearRect(0, 0, W, H);

      // Draw connections per layer
      let idx = 0;
      for (const cfg of LAYER_CFG) {
        const slice = neurons.slice(idx, idx + cfg.count);
        idx += cfg.count;
        for (let i = 0; i < slice.length; i++) {
          for (let j = i + 1; j < slice.length; j++) {
            const dx = slice[i].x - slice[j].x;
            const dy = slice[i].y - slice[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < cfg.dist) {
              ctx!.beginPath();
              ctx!.moveTo(slice[i].x, slice[i].y);
              ctx!.lineTo(slice[j].x, slice[j].y);
              ctx!.strokeStyle = `rgba(${slice[i].col},${(1 - d / cfg.dist) * cfg.lineOp})`;
              ctx!.lineWidth = cfg.lw;
              ctx!.stroke();
            }
          }
        }
      }

      // Draw neurons
      neurons.forEach(n => {
        const op = tick(n);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${n.col},${op})`;
        ctx!.fill();
        if (n.cfg.glow && op > 0.08) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.size * 3.2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${n.col},${op * 0.13})`;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.size * 6.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${n.col},${op * 0.04})`;
          ctx!.fill();
        }
      });

      animId = requestAnimationFrame(loop);
    }

    loop();
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
