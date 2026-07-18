import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[999]"
        style={{
          background: scrolled ? 'rgba(20, 28, 22, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-14 h-[68px] flex items-center justify-between">

          {/* Logo — left */}
          <a href="#" className="flex items-baseline gap-2 shrink-0">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: '#F6F2EA',
                letterSpacing: '-0.01em',
              }}
            >
              Nirmiti
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 400,
                color: 'rgba(201,183,156,0.7)',
                letterSpacing: '0.05em',
              }}
            >
              (നിർമിതി)
            </span>
          </a>

          {/* Center nav links */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(246,242,234,0.75)',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#F6F2EA')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(246,242,234,0.75)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Enquire button — right */}
          <a
            href="#contact"
            className="hidden md:flex items-center shrink-0"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F6F2EA',
              border: '1px solid rgba(246,242,234,0.45)',
              padding: '0.5rem 1.4rem',
              borderRadius: '2px',
              transition: 'background 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F6F2EA';
              e.currentTarget.style.color = '#1F2B24';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#F6F2EA';
            }}
          >
            Enquire
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            style={{ color: '#F6F2EA' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[998] flex flex-col justify-center px-10"
            style={{ background: 'rgba(20,28,22,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
                      fontWeight: 300,
                      color: '#F6F2EA',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
