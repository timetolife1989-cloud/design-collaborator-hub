import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const Footer = () => {
  const { lang } = useLanguage();
  const f = translations.footer;

  return (
    <footer className="border-t border-border/30 px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'hsla(222, 30%, 4%, 0.8)' }}>
      <div className="flex flex-col gap-1 text-center md:text-left">
        <span className="font-syne font-extrabold text-[0.9rem] text-ainova-bright tracking-[0.12em]">AINOVA Cloud Intelligence</span>
        <span className="font-space text-[0.6rem] tracking-[0.05em] text-ainova-muted/40">{t(f.tagline, lang)}</span>
      </div>
      <ul className="flex gap-8 list-none">
        <li><a href="#" className="font-space text-[0.62rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors duration-300">{t(f.privacy, lang)}</a></li>
        <li><a href="#" className="font-space text-[0.62rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors duration-300">{t(f.contact, lang)}</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
