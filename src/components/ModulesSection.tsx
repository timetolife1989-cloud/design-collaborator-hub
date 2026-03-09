import { motion } from 'framer-motion';
import { BarChart3, Timer, UserCheck, ScanSearch, CalendarRange, Map, Package, Workflow, Settings2 } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const modules: { icon: LucideIcon; name: string; desc: string; tag: string }[] = [
  { icon: BarChart3, name: 'Headcount Recording', desc: 'Shift-by-shift headcount by position. Named absence tracking. Full audit log on every change.', tag: 'Real-time' },
  { icon: Timer, name: 'Daily Minutes', desc: 'SAP-based performance measurement. Pull vs. delivery, EUR calculation, shift breakdown to the minute.', tag: 'SAP Integration' },
  { icon: UserCheck, name: 'Operator Performance', desc: 'Individual tracking by employee ID. Minutes worked, orders completed, norm comparison.', tag: 'Dashboard' },
  { icon: ScanSearch, name: 'Production Tracking', desc: 'Order lifecycle tracking. Automatic 5+ hour critical wait alerts. Order, material, operator search.', tag: 'Alert System' },
  { icon: CalendarRange, name: 'Allocation Table', desc: 'Production scheduling and capacity planning. Automatic shift rotation in 3-week cycles.', tag: 'Shift Management' },
  { icon: Map, name: 'Area Performance', desc: 'Area-by-area reports. Multi-zone breakdown with comparable performance metrics.', tag: 'Multi-zone' },
  { icon: Package, name: 'Delivered Products', desc: 'Shipping return tracking. Product ID scan support. Full lifecycle visualization.', tag: 'Barcode Ready' },
  { icon: Workflow, name: 'Process Tracking', desc: 'Throughput time monitoring. Inter-process wait time measurement and alerting.', tag: 'Process Tracking' },
  { icon: Settings2, name: 'Admin Panel', desc: 'Users, roles, medical fitness, War Room printing. Everything configurable — no code changes needed.', tag: 'Full Control' },
];

const ModulesSection = () => (
  <section className="py-14 md:py-24 px-6 md:px-16 max-w-[1200px] mx-auto" id="modules">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="font-space text-[0.65rem] tracking-[0.2em] uppercase text-ainova-accent2 mb-4">// 01 — Modules</p>
      <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3rem)] text-ainova-bright leading-[1.1] mb-4">
        Everything your<br />factory needs to know
      </h2>
      <p className="text-ainova-muted text-[0.95rem] max-w-[480px] mb-16 leading-[1.9]">
        Admin-configurable. Zero hardcoded logic. Every module runs independently or as a unified system.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border" style={{ background: 'hsl(var(--border))' }}>
      {modules.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.65, delay: i * 0.07 }}
          className="bg-background p-10 transition-all relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--ainova-accent2)), transparent)' }} />
          <m.icon className="w-6 h-6 mb-6 text-ainova-accent2" strokeWidth={1.5} />
          <div className="font-syne font-bold text-[0.95rem] text-ainova-bright mb-2.5 tracking-[0.02em]">{m.name}</div>
          <div className="text-[0.82rem] text-ainova-muted leading-[1.8]">{m.desc}</div>
          <span className="inline-block mt-5 font-space text-[0.58rem] tracking-[0.1em] uppercase text-ainova-accent2 border border-ainova-accent2/15 px-2.5 py-1">{m.tag}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ModulesSection;
