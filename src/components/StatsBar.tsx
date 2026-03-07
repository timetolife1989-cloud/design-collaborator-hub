import { motion } from 'framer-motion';

const stats = [
  { num: '9', label: 'Modules' },
  { num: '∞', label: 'Real-time data' },
  { num: 'SAP', label: 'Integration ready' },
  { num: '0', label: 'Hardcoded logic' },
];

const StatsBar = () => (
  <div className="border-t border-b border-border" style={{ background: 'rgba(6,13,26,0.8)', backdropFilter: 'blur(20px)' }}>
    <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
          className="px-8 py-10 text-center border-r border-border last:border-r-0 max-md:border-b max-md:border-r-0"
        >
          <div className="font-syne text-[2.5rem] font-extrabold stat-gradient leading-none mb-1.5">{s.num}</div>
          <div className="font-space text-[0.62rem] tracking-[0.12em] uppercase text-ainova-muted">{s.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default StatsBar;
