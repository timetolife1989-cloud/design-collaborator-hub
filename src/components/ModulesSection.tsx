import { motion } from 'framer-motion';
import { BarChart3, Timer, UserCheck, ScanSearch, CalendarRange, Map, Package, Workflow, Settings2 } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const icons: LucideIcon[] = [BarChart3, Timer, UserCheck, ScanSearch, CalendarRange, Map, Package, Workflow, Settings2];

const ModulesSection = () => {
  const { lang } = useLanguage();
  const m = translations.modules;

  return (
    <section className="py-14 md:py-24 px-6 md:px-16 max-w-[1200px] mx-auto" id="modules">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-space text-[0.65rem] tracking-[0.2em] uppercase text-ainova-accent2 mb-4">{t(m.sectionLabel, lang)}</p>
        <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3rem)] text-ainova-bright leading-[1.1] mb-4">
          {t(m.title1, lang)}<br />{t(m.title2, lang)}
        </h2>
        <p className="text-ainova-muted text-[0.95rem] max-w-[480px] mb-16 leading-[1.9]">
          {t(m.subtitle, lang)}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {m.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.65, delay: i * 0.07 }}
              className="glass-card p-8 transition-all duration-300 relative overflow-hidden group cursor-default hover:border-ainova-accent2/15"
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--ainova-accent2) / 0.4), transparent)' }} />
              <Icon className="w-6 h-6 mb-6 text-ainova-accent2" strokeWidth={1.5} />
              <div className="font-syne font-bold text-[0.95rem] text-ainova-bright mb-2.5 tracking-[0.02em]">{t(item.name, lang)}</div>
              <div className="text-[0.82rem] text-ainova-muted leading-[1.8]">{t(item.desc, lang)}</div>
              <span className="inline-block mt-5 font-space text-[0.58rem] tracking-[0.1em] uppercase text-ainova-accent2/70 border border-ainova-accent2/10 rounded-md px-2.5 py-1">{t(item.tag, lang)}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ModulesSection;
