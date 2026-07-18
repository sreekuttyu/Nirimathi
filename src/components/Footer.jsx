// Inline SVG social icons — lucide-react doesn't include brand icons
const SocialIcons = {
  Instagram: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

const socialLinks = [
  { Icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
  { Icon: SocialIcons.Twitter, href: '#', label: 'Twitter' },
  { Icon: SocialIcons.Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: SocialIcons.Youtube, href: '#', label: 'YouTube' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#1F2B24', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 md:gap-16 mb-14">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,183,156,0.5)' }}>
                Timeless Kerala Architecture
              </div>
              <div
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: '#F6F2EA', letterSpacing: '-0.01em' }}
              >
                നിർമിതി<span className="mx-1.5 opacity-30">|</span>Nirmiti
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.4)', maxWidth: '34ch' }}
            >
              An architecture studio rooted in Kerala, crafting spaces that breathe with the land and honour the people who inhabit them.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(246,242,234,0.5)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(138,106,69,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(138,106,69,0.5)';
                    e.currentTarget.style.color = '#C9B79C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = 'rgba(246,242,234,0.5)';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="eyebrow mb-5" style={{ color: 'rgba(201,183,156,0.4)' }}>Navigate</div>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.45)' }}
                    onMouseEnter={(e) => (e.target.style.color = '#C9B79C')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(246,242,234,0.45)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <div className="eyebrow mb-5" style={{ color: 'rgba(201,183,156,0.4)' }}>Find Us</div>
            <address
              className="not-italic flex flex-col gap-2 text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.45)', lineHeight: 1.8 }}
            >
              <span>42, Marine Drive Road</span>
              <span>Kochi, Kerala — 682031</span>
              <a href="tel:+914842345678" style={{ color: 'rgba(246,242,234,0.45)' }}
                onMouseEnter={(e) => (e.target.style.color = '#C9B79C')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(246,242,234,0.45)')}
              >+91 484 234 5678</a>
              <a href="mailto:studio@nirmiti.in" style={{ color: 'rgba(246,242,234,0.45)' }}
                onMouseEnter={(e) => (e.target.style.color = '#C9B79C')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(246,242,234,0.45)')}
              >studio@nirmiti.in</a>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-[11px]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.25)', letterSpacing: '0.1em' }}
            >
              © {new Date().getFullYear()} Nirmiti Architecture Studio. All rights reserved.
            </p>
            <p
              className="text-[11px]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.25)', letterSpacing: '0.05em' }}
            >
              Designed with intention · Built with care
            </p>
          </div>
        </div>
      </div>

      {/* Large watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.02)',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}
      >
        Nirmiti
      </div>
    </footer>
  );
}
