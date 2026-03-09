import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const StatsBar = () => {
  const { lang } = useLanguage();
  const s = translations.stats;

  const stats = [
    { num: '9', label: t(s.modules, lang) },
    { num: '∞', label: t(s.realtimeData, lang) },
    { num: 'SAP', label: t(s.integrationReady, lang) },
    { num: '0', label: t(s.hardcodedLogic, lang) },
  ];

  return (
    <div className="border-t border-b border-border" style={{ background: 'rgba(6,13,26,0.8)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((st, i) => (
          <motion.div
            key={st.label}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="px-8 py-10 text-center border-r border-border last:border-r-0 max-md:border-b max-md:border-r-0"
          >
            <div className="font-syne text-[2.5rem] font-extrabold stat-gradient leading-none mb-1.5">{st.num}</div>
            <div className="font-space text-[0.62rem] tracking-[0.12em] uppercase text-ainova-muted">{st.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
