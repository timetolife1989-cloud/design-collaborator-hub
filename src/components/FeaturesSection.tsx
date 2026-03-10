import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

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

const FeaturesSection = () => {
  const { lang } = useLanguage();
  const f = translations.features;

  return (
    <section className="py-20 md:py-32 px-6 md:px-16" id="features">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-space text-[0.65rem] tracking-[0.2em] uppercase text-ainova-accent2 mb-4">{t(f.sectionLabel, lang)}</p>
            <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3rem)] text-ainova-bright leading-[1.1]">
              {t(f.title1, lang)}<br />{t(f.title2, lang)}
            </h2>
          </motion.div>

          <div className="flex flex-col mt-12">
            {f.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 py-7 border-b border-border/50 first:border-t first:border-border/50"
              >
                <span className="font-space text-[0.65rem] text-ainova-accent flex-shrink-0 pt-0.5 opacity-40">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="font-syne font-bold text-ainova-bright text-[0.95rem] mb-1.5">{t(item.title, lang)}</div>
                  <div className="text-[0.82rem] text-ainova-muted leading-[1.8]">{t(item.text, lang)}</div>
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
          className="sticky top-24 glass-card overflow-hidden"
          style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
        >
          <div className="border-b border-border/30 px-4 py-3 flex items-center gap-1.5" style={{ background: 'hsla(220, 30%, 12%, 0.3)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/30" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(43, 60%, 30%)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(150, 40%, 25%)' }} />
            <span className="font-space text-[0.62rem] ml-2 text-ainova-muted/40">ainova.intelligence.ts</span>
          </div>
          <div className="p-7 font-space text-[0.76rem] leading-[2.1]">
            {terminalLines.map((line, i) => {
              if (line.type === 'comment') return <span key={i} className="block t-comment">{line.text}</span>;
              if (line.type === 'code') return <span key={i} className="block">{line.content}</span>;
              if (line.type === 'indent') return <span key={i} className="block pl-6">{line.content}</span>;
              if (line.type === 'indent2') return <span key={i} className="block pl-[3.5rem]">{line.content}</span>;
              if (line.type === 'empty') return <span key={i} className="block">&nbsp;</span>;
              if (line.type === 'cursor') return <span key={i} className="block"><span className="inline-block w-[7px] h-[0.9em] bg-ainova-accent2 align-text-bottom" style={{ animation: 'blink 1.2s step-end infinite', opacity: 0.6 }} /></span>;
              return null;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
