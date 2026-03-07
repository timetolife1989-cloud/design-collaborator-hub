const Footer = () => (
  <footer className="border-t border-border px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'rgba(3,8,15,0.9)' }}>
    <div className="flex flex-col gap-1 text-center md:text-left">
      <span className="font-syne font-extrabold text-[0.9rem] text-ainova-bright tracking-[0.12em]">AINOVA Cloud Intelligence</span>
      <span className="font-space text-[0.6rem] tracking-[0.05em]" style={{ color: '#2e4d6e' }}>© 2026 ainovacloud.com — Silence the noise. See the truth.</span>
    </div>
    <ul className="flex gap-8 list-none">
      <li><a href="#" className="font-space text-[0.62rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors">Privacy</a></li>
      <li><a href="#" className="font-space text-[0.62rem] text-ainova-muted no-underline tracking-[0.1em] uppercase hover:text-ainova-accent2 transition-colors">Contact</a></li>
    </ul>
  </footer>
);

export default Footer;
