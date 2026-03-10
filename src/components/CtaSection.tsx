import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const CtaSection = () => {
  const { lang } = useLanguage();
  const c = translations.cta;

  return (
    <section className="py-24 md:py-40 px-6 md:px-16 text-center relative overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, hsla(220, 70%, 55%, 0.04) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <h2 className="font-syne text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-ainova-bright leading-[1.05] mb-6">
          {t(c.title1, lang)}<br /><span className="gradient-text">{t(c.title2, lang)}</span>
        </h2>
        <p className="text-ainova-muted text-[0.95rem] mb-12 max-w-[400px] mx-auto leading-[1.8]">
          {t(c.subtitle, lang)}
        </p>

        <div className="flex max-w-[420px] mx-auto rounded-xl overflow-hidden border border-border/50 transition-all duration-300 focus-within:border-ainova-accent2/20 focus-within:shadow-[0_0_24px_rgba(90,180,200,0.04)]" style={{ background: 'hsla(220, 30%, 10%, 0.4)' }}>
          <input
            type="email"
            placeholder={t(c.placeholder, lang)}
            className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-foreground font-space text-[0.75rem] placeholder:text-foreground/15"
          />
          <button className="font-space text-[0.72rem] tracking-[0.08em] uppercase px-6 py-4 btn-gradient text-ainova-bright border-none cursor-pointer transition-opacity duration-300 hover:opacity-85 whitespace-nowrap rounded-r-xl">
            {t(c.send, lang)}
          </button>
        </div>

        <p className="mt-5 font-space text-[0.65rem] text-ainova-accent/40 tracking-[0.05em] leading-[1.8]">
          {t(c.directContact, lang)}
        </p>
      </motion.div>
    </section>
  );
};

export default CtaSection;
