const LiquidBlobs = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform" style={{ filter: 'blur(60px)', opacity: 0.8 }}>
    <div className="blob absolute -top-[200px] -left-[200px] w-[500px] h-[500px] md:w-[700px] md:h-[700px]" style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)', animationDuration: '25s' }} />
    <div className="blob absolute top-[30%] -right-[100px] w-[350px] h-[350px] md:w-[500px] md:h-[500px]" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', animationDuration: '30s', animationDelay: '-8s' }} />
    <div className="blob absolute bottom-[10%] left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px]" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', animationDuration: '20s', animationDelay: '-15s' }} />
    <div className="blob absolute -bottom-[100px] right-[30%] w-[220px] h-[220px] md:w-[300px] md:h-[300px] hidden md:block" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', animationDuration: '35s', animationDelay: '-5s' }} />
  </div>
);

export default LiquidBlobs;
