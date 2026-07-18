import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/Ffirst.png';

// Subtle floating particles
const particles = [
  { size: 2.5, x: '12%', y: '22%', duration: 4.5, delay: 0 },
  { size: 2,   x: '82%', y: '18%', duration: 5.5, delay: 1.2 },
  { size: 3,   x: '68%', y: '72%', duration: 4,   delay: 0.6 },
  { size: 2,   x: '28%', y: '78%', duration: 6,   delay: 2 },
  { size: 2.5, x: '50%', y: '14%', duration: 5,   delay: 1.8 },
  { size: 2,   x: '90%', y: '55%', duration: 4.2, delay: 0.4 },
  { size: 3,   x: '8%',  y: '60%', duration: 5.8, delay: 1.5 },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax on background
  const imageY     = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Content fades + rises as user scrolls
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 620 }}
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: imageScale, transformOrigin: 'center center' }}
      >
        <img
          src={heroImg}
          alt="Kerala villa at dusk"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      {/* Top fade — keeps nav readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,16,12,0.55) 0%, rgba(10,16,12,0.1) 30%, rgba(10,16,12,0.15) 60%, rgba(10,16,12,0.72) 100%)',
        }}
      />

      {/* ── Floating dust particles ── */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: 'rgba(201,183,156,0.55)',
            animation: `floatDot ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ── Hero content — centered ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 400,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(201,183,156,0.8)',
            }}
          >
            നിർമിതി
          </span>
          <span style={{ color: 'rgba(201,183,156,0.4)', fontSize: '0.5rem', letterSpacing: '0.1em' }}>·</span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 400,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(201,183,156,0.8)',
            }}
          >
            Est. Kerala
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(18px)', y: 24 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.4, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#F6F2EA',
            maxWidth: '14ch',
            marginBottom: '1.5rem',
          }}
        >
          Designing{' '}
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#C9B79C',
            }}
          >
            Timeless
          </em>
          <br />
          Kerala Spaces
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: '0.9rem',
            letterSpacing: '0.03em',
            color: 'rgba(246,242,234,0.65)',
            maxWidth: '38ch',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Architecture inspired by nature, culture and modern living.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F6F2EA',
              border: '1px solid rgba(246,242,234,0.38)',
              padding: '0.85rem 2.2rem',
              borderRadius: '100px',
              background: 'transparent',
              transition: 'background 0.4s, color 0.4s, border-color 0.4s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F6F2EA';
              e.currentTarget.style.color = '#1F2B24';
              e.currentTarget.style.borderColor = '#F6F2EA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#F6F2EA';
              e.currentTarget.style.borderColor = 'rgba(246,242,234,0.38)';
            }}
          >
            Explore Projects
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              style={{ fontSize: '0.8rem' }}
            >
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator — bottom center ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: contentOpacity }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.58rem',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(246,242,234,0.38)',
          }}
        >
          Scroll
        </span>
        {/* Animated line */}
        <div
          className="relative overflow-hidden"
          style={{ width: 1, height: 36, background: 'rgba(246,242,234,0.12)' }}
        >
          <div
            className="absolute top-0 left-0 w-full animate-scroll-dot"
            style={{
              height: '50%',
              background: 'linear-gradient(to bottom, transparent, rgba(201,183,156,0.7))',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
