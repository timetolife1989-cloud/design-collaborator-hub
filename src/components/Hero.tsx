import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const Hero = () => {
  const { lang } = useLanguage();
  const h = translations.hero;

  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 md:px-8 pt-8 pb-14 relative">
      <motion.h1
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.3, delay: 1.0 }}
        className="font-syne font-extrabold text-[clamp(1.9rem,4.2vw,4.8rem)] tracking-tight leading-[1.05] text-ainova-bright mb-2"
      >
        AINOVA<br />
        <span className="gradient-text">{t(h.tagline, lang)}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="font-space text-[clamp(0.9rem,2vw,1.2rem)] tracking-[0.12em] text-ainova-muted mb-8"
      >
        <em className="not-italic text-foreground/50">{t(h.silenceNoise, lang)}</em> &nbsp;{t(h.seeTheTruth, lang)}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.3 }}
        className="max-w-[560px] text-base text-ainova-muted/60 leading-[1.9] mb-14"
      >
        {t(h.desc, lang)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <Link to="/demo" className="font-space text-[0.78rem] tracking-[0.1em] uppercase px-10 py-4 btn-gradient text-ainova-bright no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(100,160,220,0.2)] rounded-lg relative overflow-hidden">
          <span className="relative z-10">{t(h.watchItWork, lang)}</span>
        </Link>
        <a href="#modules" className="font-space text-[0.78rem] tracking-[0.1em] uppercase px-10 py-4 rounded-lg border border-border text-ainova-muted no-underline transition-all duration-300 hover:border-ainova-accent/20 hover:text-foreground/50">
          {t(h.exploreModules, lang)}
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-[80px]" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--ainova-accent2)))', animation: 'scrollPulse 2.5s ease infinite' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
