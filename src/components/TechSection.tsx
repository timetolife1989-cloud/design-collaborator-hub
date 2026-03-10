import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const pills = [
  'Next.js App Router', 'React 18+', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'MS SQL Server', 'Node.js Runtime', 'SAP SQVI Export', 'Cloudflare', 'bcrypt Auth',
  'Role-based Access', 'Excel Export', 'Audit Logging', 'SQL Transactions', 'Real-time Sync',
];

const TechSection = () => {
  const { lang } = useLanguage();
  const tc = translations.tech;

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1100px] mx-auto text-center" id="tech">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-space text-[0.65rem] tracking-[0.2em] uppercase text-ainova-accent2 mb-4">{t(tc.sectionLabel, lang)}</p>
        <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3rem)] text-ainova-bright leading-[1.1]">
          {t(tc.title1, lang)}<br />{t(tc.title2, lang)}
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mt-12">
        {pills.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: 22, scale: 0.82 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-space text-[0.68rem] tracking-[0.08em] px-4 py-2 rounded-lg border border-border/50 text-ainova-muted cursor-default transition-all duration-300 hover:border-ainova-accent2/20 hover:text-ainova-accent2"
            style={{ background: 'hsla(220, 30%, 12%, 0.2)' }}
          >
            {p}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default TechSection;
