import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, t } from '@/i18n/translations';

const Navbar = () => {
  const { lang } = useLanguage();
  const n = translations.nav;

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 py-5 backdrop-blur-2xl sticky top-0 z-[100] rounded-none opacity-0 animate-[fadeIn_0.7s_ease_0.5s_forwards]"
      style={{
        background: 'hsla(222, 30%, 7%, 0.85)',
        borderBottom: '1px solid hsla(220, 40%, 50%, 0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}>
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <div>
          <span className="font-syne font-extrabold text-[1.1rem] tracking-[0.12em] nav-text-pulse">AINOVA</span>
          <span className="font-space text-[0.55rem] tracking-[0.15em] uppercase block -mt-0.5 nav-text-pulse">Cloud Intelligence</span>
        </div>
      </Link>
      <ul className="hidden md:flex gap-10 list-none">
        {[
          ['#modules', t(n.modules, lang)],
          ['#features', t(n.features, lang)],
          ['#tech', t(n.stack, lang)],
          ['#contact', t(n.contact, lang)],
        ].map(([href, label]) =>
          <li key={href}><a href={href} className="font-space text-[0.72rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors duration-300">{label}</a></li>
        )}
      </ul>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <a href="#contact" className="font-space text-[0.72rem] px-6 py-2.5 rounded-lg border border-ainova-accent/20 text-ainova-accent no-underline tracking-[0.1em] uppercase transition-all duration-300 hover:text-ainova-bright relative overflow-hidden group" style={{ background: 'hsla(220, 70%, 55%, 0.04)' }}>
          <span className="absolute inset-0 btn-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          <span className="relative z-10">{t(n.requestDemo, lang)}</span>
        </a>
      </div>
      <div className="nav-glow-line" />
    </nav>
  );
};

export default Navbar;
