import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="flex items-center justify-between px-4 md:px-16 py-6 backdrop-blur-[40px] sticky top-0 z-[100] opacity-0 animate-[fadeIn_0.7s_ease_0.5s_forwards]"
    style={{
      background: 'linear-gradient(180deg, rgba(10,20,38,0.94) 0%, rgba(5,12,22,0.88) 100%)',
      boxShadow: '0 1px 0 hsla(187 92% 47% / 0.05), 0 4px 20px rgba(0,0,0,0.5), 0 16px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
    <Link to="/" className="flex items-center gap-3 no-underline">
      <div className="w-[38px] h-[38px] border border-ainova-accent/40 rounded-lg flex items-center justify-center font-space text-[0.6rem] text-ainova-accent2" style={{ background: 'rgba(59,130,246,0.06)' }}>
        ACI
      </div>
      <div>
        <span className="font-syne font-extrabold text-[1.1rem] text-ainova-bright tracking-[0.12em]">AINOVA</span>
        <span className="font-space text-[0.55rem] text-ainova-muted tracking-[0.15em] uppercase block -mt-0.5">Cloud Intelligence</span>
      </div>
    </Link>
    <ul className="hidden md:flex gap-10 list-none">
      {[['#modules', 'Modules'], ['#features', 'Features'], ['#tech', 'Stack'], ['#contact', 'Contact']].map(([href, label]) => (
        <li key={href}><a href={href} className="font-space text-[0.72rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors">{label}</a></li>
      ))}
    </ul>
    <a href="#contact" className="font-space text-[0.72rem] px-6 py-2.5 border border-ainova-accent/40 text-ainova-accent no-underline tracking-[0.1em] uppercase transition-all hover:text-ainova-bright relative overflow-hidden group" style={{ background: 'rgba(59,130,246,0.04)' }}>
      <span className="absolute inset-0 btn-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10">Request Demo</span>
    </a>
    <div className="nav-glow-line" />
  </nav>
);

export default Navbar;
