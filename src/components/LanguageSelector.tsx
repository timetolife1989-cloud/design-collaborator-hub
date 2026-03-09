import { useLanguage } from '@/i18n/LanguageContext';
import { type Lang } from '@/i18n/translations';

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hu', label: 'HU' },
  { code: 'de', label: 'DE' },
];

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 font-space text-[0.65rem] tracking-[0.08em]">
      {langs.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => setLang(l.code)}
            className={`px-1.5 py-0.5 transition-all border-none bg-transparent cursor-pointer ${
              lang === l.code
                ? 'text-ainova-accent2'
                : 'text-ainova-muted hover:text-foreground/60'
            }`}
          >
            {l.label}
          </button>
          {i < langs.length - 1 && <span className="text-border">|</span>}
        </span>
      ))}
    </div>
  );
};

export default LanguageSelector;
