import { motion } from 'framer-motion';

const features = [
  { num: '01', title: 'Automatic Shift Rotation', text: 'A/B/C team night→afternoon→morning rotation. 05:45 shift boundary with date correction. Full UTC/CET handling.' },
  { num: '02', title: 'War Room Printing', text: 'Selected charts print with one click from Admin Panel. Designed for control room wall display.' },
  { num: '03', title: 'Complete Audit Trail', text: 'Every modification logged. Past changes require written justification. Compliance-ready by design.' },
  { num: '04', title: 'Data-driven UI', text: 'Zero hardcoded roles or logic. Every position, category and rule configurable from Admin Panel.' },
  { num: '05', title: 'Pinnable Dashboards', text: 'Every chart and table is pinnable to the main dashboard. Personalized command center for every role.' },
];

const terminalLines = [
  { type: 'comment', text: '// Shift rotation — zero hardcode' },
  { type: 'code', content: <><span className="t-key">const</span> <span className="t-val">shifts</span> <span className="t-op">=</span> {'{'}</> },
  { type: 'indent', content: <><span className="t-str">MORNING</span><span className="t-op">:</span>   <span className="t-str">"05:45–13:45"</span><span className="t-op">,</span></> },
  { type: 'indent', content: <><span className="t-str">AFTERNOON</span><span className="t-op">:</span> <span className="t-str">"13:45–21:45"</span><span className="t-op">,</span></> },
  { type: 'indent', content: <><span className="t-str">NIGHT</span><span className="t-op">:</span>     <span className="t-str">"21:45–05:45"</span><span className="t-op">,</span></> },
  { type: 'code', content: <>{'}'}</> },
  { type: 'empty' },
  { type: 'comment', text: '// One truth — every level' },
  { type: 'code', content: <><span className="t-key">const</span> <span className="t-val">truth</span> <span className="t-op">=</span> <span className="t-key">await</span> db<span className="t-op">.</span><span className="t-val">sync</span>{'({'}</> },
  { type: 'indent', content: <>zones<span className="t-op">:</span> [<span className="t-str">"production"</span><span className="t-op">,</span></> },
  { type: 'indent2', content: <><span className="t-str">"logistics"</span><span className="t-op">,</span></> },
  { type: 'indent2', content: <><span className="t-str">"hr"</span><span className="t-op">,</span> <span className="t-str">"finance"</span>]<span className="t-op">,</span></> },
  { type: 'indent', content: <>realtime<span className="t-op">:</span> <span className="t-key">true</span></> },
  { type: 'code', content: <>{'})'}</> },
  { type: 'empty' },
  { type: 'comment', text: '// Silence the noise.' },
  { type: 'code', content: <><span className="t-key">return</span> truth<span className="t-op">.</span><span className="t-val">clarity</span> <span className="t-comment">// 1</span></> },
  { type: 'empty' },
  { type: 'cursor' },
];

const FeaturesSection = () => (
  <section className="py-20 md:py-32 px-6 md:px-16 border-t border-border" style={{ background: 'rgba(6,13,26,0.5)' }} id="features">
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-space text-[0.65rem] tracking-[0.2em] uppercase text-ainova-accent2 mb-4">// 02 — Core Features</p>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3rem)] text-ainova-bright leading-[1.1]">
            Built from<br />the floor up
          </h2>
        </motion.div>

        <div className="flex flex-col mt-12">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-6 py-7 border-b border-border first:border-t"
            >
              <span className="font-space text-[0.65rem] text-ainova-accent flex-shrink-0 pt-0.5 opacity-60">{f.num}</span>
              <div>
                <div className="font-syne font-bold text-ainova-bright text-[0.95rem] mb-1.5">{f.title}</div>
                <div className="text-[0.82rem] text-ainova-muted leading-[1.8]">{f.text}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
        className="sticky top-24 rounded border border-border overflow-hidden"
        style={{ background: '#010508', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}
      >
        <div className="border-b border-border px-4 py-3 flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#3f1f1f' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#3f3520' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#1a3a2a' }} />
          <span className="font-space text-[0.62rem] ml-2" style={{ color: '#2d3748' }}>ainova.intelligence.ts</span>
        </div>
        <div className="p-7 font-space text-[0.76rem] leading-[2.1]">
          {terminalLines.map((line, i) => {
            if (line.type === 'comment') return <span key={i} className="block t-comment">{line.text}</span>;
            if (line.type === 'code') return <span key={i} className="block">{line.content}</span>;
            if (line.type === 'indent') return <span key={i} className="block pl-6">{line.content}</span>;
            if (line.type === 'indent2') return <span key={i} className="block pl-[3.5rem]">{line.content}</span>;
            if (line.type === 'empty') return <span key={i} className="block">&nbsp;</span>;
            if (line.type === 'cursor') return <span key={i} className="block"><span className="inline-block w-[7px] h-[0.9em] bg-ainova-accent2 align-text-bottom" style={{ animation: 'blink 1.2s step-end infinite', opacity: 0.8 }} /></span>;
            return null;
          })}
        </div>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
