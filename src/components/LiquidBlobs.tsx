const LiquidBlobs = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform" style={{ filter: 'blur(80px)', opacity: 0.6 }}>
    <div className="blob absolute -top-[150px] -left-[150px] w-[400px] h-[400px] md:w-[600px] md:h-[600px]" style={{ background: 'radial-gradient(circle, hsl(220 70% 45%), transparent 70%)', animationDuration: '30s' }} />
    <div className="blob absolute top-[35%] -right-[80px] w-[300px] h-[300px] md:w-[450px] md:h-[450px]" style={{ background: 'radial-gradient(circle, hsl(190 50% 40%), transparent 70%)', animationDuration: '35s', animationDelay: '-10s' }} />
    <div className="blob absolute bottom-[15%] left-[25%] w-[250px] h-[250px] md:w-[350px] md:h-[350px]" style={{ background: 'radial-gradient(circle, hsl(260 45% 45%), transparent 70%)', animationDuration: '25s', animationDelay: '-18s' }} />
    <div className="blob absolute -bottom-[80px] right-[25%] w-[200px] h-[200px] md:w-[280px] md:h-[280px] hidden md:block" style={{ background: 'radial-gradient(circle, hsl(200 50% 35%), transparent 70%)', animationDuration: '40s', animationDelay: '-7s' }} />
  </div>
);

export default LiquidBlobs;
