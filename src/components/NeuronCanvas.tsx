import { useEffect, useRef } from 'react';

interface Neuron {
  x: number; y: number; z: number;
  vx: number; vy: number;
  size: number; phase: number; ps: number;
  col: string; opMax: number;
}

const COLORS = [
  '100,140,200', '80,160,210', '120,150,220',
  '90,180,200', '140,160,230', '110,170,215',
  '130,145,210', '95,175,205',
];

function createNeuron(W: number, H: number, init: boolean): Neuron {
  const z = Math.random(); // 0 = far, 1 = near
  const depthScale = 0.2 + z * 0.8;
  const speed = 0.02 + z * 0.18;

  return {
    x: Math.random() * W,
    y: init ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10),
    z,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: (0.3 + Math.random() * 1.8) * depthScale,
    phase: Math.random() * Math.PI * 2,
    ps: 0.002 + Math.random() * 0.008,
    col: COLORS[Math.floor(Math.random() * COLORS.length)],
    opMax: (0.06 + z * 0.3) * (0.7 + Math.random() * 0.3),
  };
}

const DESKTOP_COUNT = 45;
const MOBILE_COUNT = 18;
const CONNECT_DIST = 130;
const LINE_OP_MAX = 0.04;

const NeuronCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId: number;
    let lastTime = 0;
    const targetInterval = isMobile ? 50 : 33;

    const neurons: Neuron[] = [];
    for (let i = 0; i < count; i++) {
      neurons.push(createNeuron(W, H, true));
    }

    // Sort by depth so far ones render first
    neurons.sort((a, b) => a.z - b.z);

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    function loop(time: number) {
      animId = requestAnimationFrame(loop);
      if (time - lastTime < targetInterval) return;
      lastTime = time;

      ctx!.clearRect(0, 0, W, H);

      // Update positions
      for (const n of neurons) {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += n.ps;

        if (n.x < -20 || n.x > W + 20 || n.y < -20 || n.y > H + 20) {
          Object.assign(n, createNeuron(W, H, false));
        }
      }

      // Draw connections (only between nearby depth neurons)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i], b = neurons[j];
          const dz = Math.abs(a.z - b.z);
          if (dz > 0.3) continue; // Only connect similar depth

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const maxD = CONNECT_DIST * (0.5 + (a.z + b.z) / 2 * 0.5);
          
          if (d2 < maxD * maxD) {
            const d = Math.sqrt(d2);
            const avgZ = (a.z + b.z) / 2;
            const op = (1 - d / maxD) * LINE_OP_MAX * (0.2 + avgZ * 0.8);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${a.col},${op})`;
            ctx!.lineWidth = 0.3 + avgZ * 0.3;
            ctx!.stroke();
          }
        }
      }

      // Draw neurons
      for (const n of neurons) {
        const op = n.opMax * (0.4 + 0.6 * Math.sin(n.phase));
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${n.col},${op})`;
        ctx!.fill();
      }
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default NeuronCanvas;
