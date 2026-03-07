import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="min-h-[95vh] flex flex-col items-center justify-center text-center px-6 md:px-8 py-24 relative">
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.8 }}
      className="inline-flex items-center gap-2.5 font-space text-[0.68rem] tracking-[0.2em] uppercase text-ainova-accent2 border border-ainova-accent2/20 px-5 py-2 mb-12"
      style={{ background: 'rgba(6,182,212,0.04)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ainova-accent2" style={{ animation: 'pulse 2s infinite' }} />
      Industry 4.0 · Cloud-native · Real-time
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, delay: 1.0 }}
      className="font-syne font-extrabold text-[clamp(1.9rem,4.2vw,4.8rem)] tracking-tight leading-[1.05] text-ainova-bright mb-2"
    >
      AINOVA<br />
      <span className="gradient-text">Cloud Intelligence</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.0 }}
      className="font-space text-[clamp(0.9rem,2vw,1.2rem)] tracking-[0.12em] text-ainova-muted mb-8"
    >
      <em className="not-italic text-foreground/60">Silence the noise.</em> &nbsp;See the truth.
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.3 }}
      className="max-w-[560px] text-base text-ainova-muted/70 leading-[1.9] mb-14"
    >
      Production, logistics, HR and finance — synchronized in one living system, in real time, from the cloud. Your factory's nervous system, elevated.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.5 }}
      className="flex gap-4 flex-wrap justify-center"
    >
      <Link to="/demo" className="font-space text-[0.78rem] tracking-[0.1em] uppercase px-10 py-4 btn-gradient text-ainova-bright no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(59,130,246,0.35)] relative overflow-hidden">
        <span className="relative z-10">▶ Watch it work</span>
      </Link>
      <a href="#modules" className="font-space text-[0.78rem] tracking-[0.1em] uppercase px-10 py-4 border border-border text-ainova-muted no-underline transition-all hover:border-ainova-accent/30 hover:text-foreground/60">
        Explore Modules
      </a>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 3.0 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
    >
      <div className="w-px h-[50px]" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--ainova-accent2)))', animation: 'scrollPulse 2s ease infinite' }} />
    </motion.div>
  </section>
);

export default Hero;
