import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import img1 from '../assets/image 1.png';

function Counter({ target, suffix = '', duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 12, suffix: '+', label: 'Years of Craft' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#F6F2EA' }}>
      {/* Decorative blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          right: '-15%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(201,183,156,0.25) 0%, transparent 70%)',
          animation: 'floatBlob 20s ease-in-out infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <ScrollReveal className="relative" delay={0}>
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/5', boxShadow: '0 40px 80px -20px rgba(31,43,36,0.25)' }}
            >
              <motion.div className="w-full h-full" style={{ y: imageY, scale: 1.1 }}>
                <img
                  src={img1}
                  alt="Nirmiti studio — courtyard detail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </motion.div>
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 px-5 py-3 rounded-xl"
                style={{
                  background: 'rgba(31,43,36,0.82)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="eyebrow" style={{ color: '#C9B79C' }}>Est. 2012 · Kochi, Kerala</span>
              </div>
            </div>

            {/* Floating accent card */}
            <div
              className="absolute -right-6 top-12 p-5 rounded-xl hidden lg:block"
              style={{
                background: '#1F2B24',
                boxShadow: '0 20px 40px -10px rgba(31,43,36,0.4)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: '#C9B79C',
                  lineHeight: 1,
                }}
              >
                50<sup style={{ fontSize: '1rem', color: '#8A6A45' }}>+</sup>
              </div>
              <div className="eyebrow mt-1" style={{ color: 'rgba(246,242,234,0.5)' }}>
                Projects
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <ScrollReveal delay={0.1}>
              <span className="eyebrow block mb-6">Our Story</span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2
                className="text-display-md font-light mb-8"
                style={{ fontFamily: 'var(--font-display)', color: '#1F2B24' }}
              >
                Born from the<br />
                <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>soil of Kerala</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                className="text-base leading-relaxed mb-5"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.7)', maxWidth: '44ch' }}
              >
                Nirmiti was founded on a simple belief: that the best architecture is born from listening —
                to the land, to the light, to the people who will inhabit the space.
              </p>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.7)', maxWidth: '44ch' }}
              >
                Every project we undertake is a conversation between ancient Keralan sensibility and
                contemporary precision — where exposed laterite meets glass, where rain courts
                become living rooms, and where every threshold is a ceremony.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-3 gap-8 pt-8" style={{ borderTop: '1px solid rgba(34,34,34,0.08)' }}>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 300,
                        color: '#8A6A45',
                        lineHeight: 1,
                      }}
                    >
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div
                      className="mt-1 text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-sans)', color: 'rgba(34,34,34,0.45)', letterSpacing: '0.15em' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
