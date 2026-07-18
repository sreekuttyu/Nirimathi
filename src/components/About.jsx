import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/image 1.png';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated counter ───────────────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgRef      = useRef(null);
  const badgeRef    = useRef(null);
  const accentRef   = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const p1Ref       = useRef(null);
  const p2Ref       = useRef(null);
  const statsRef    = useRef(null);

  /* Framer parallax on the image */
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. Image — clip-path curtain reveal */
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
          duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );

      /* 2. Badge slides up from bottom of image */
      gsap.fromTo(badgeRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.6,
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );

      /* 3. Accent card — flies in from the right */
      gsap.fromTo(accentRef.current,
        { x: 40, opacity: 0, scale: 0.9 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out', delay: 0.8,
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );

      /* 4. Text block — staggered word-line reveal */
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, p1Ref.current, p2Ref.current, statsRef.current],
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.14, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 12, suffix: '+', label: 'Years of Craft' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#F6F2EA' }}
    >
      {/* Ambient blob */}
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500, right: '-15%', top: '10%',
        background: 'radial-gradient(circle, rgba(201,183,156,0.25) 0%, transparent 70%)',
        animation: 'floatBlob 20s ease-in-out infinite',
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image panel ── */}
          <div className="relative">
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/5', boxShadow: '0 40px 80px -20px rgba(31,43,36,0.25)', opacity: 0 }}
            >
              <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.1 }}>
                <img src={img1} alt="Nirmiti studio"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </motion.div>

              {/* Badge */}
              <div ref={badgeRef} className="absolute bottom-6 left-6 px-5 py-3 rounded-xl" style={{
                background: 'rgba(31,43,36,0.82)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)', opacity: 0,
              }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9B79C' }}>
                  Est. 2012 · Kochi, Kerala
                </span>
              </div>
            </div>

            {/* Floating accent card */}
            <div ref={accentRef} className="absolute -right-6 top-12 p-5 rounded-xl hidden lg:block"
              style={{ background: '#1F2B24', boxShadow: '0 20px 40px -10px rgba(31,43,36,0.4)', opacity: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: '#C9B79C', lineHeight: 1 }}>
                50<sup style={{ fontSize: '1rem', color: '#8A6A45' }}>+</sup>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 500,
                letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(246,242,234,0.5)', marginTop: '0.25rem' }}>
                Projects
              </div>
            </div>
          </div>

          {/* ── Text ── */}
          <div className="flex flex-col justify-center">
            <span ref={eyebrowRef} className="block mb-6" style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
              letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8A6A45', opacity: 0,
            }}>Our Story</span>

            <h2 ref={titleRef} className="mb-8" style={{
              fontFamily: 'var(--font-display)', fontWeight: 300, opacity: 0,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1,
              letterSpacing: '-0.02em', color: '#1F2B24',
            }}>
              Born from the<br />
              <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>soil of Kerala</em>
            </h2>

            <p ref={p1Ref} className="text-base leading-relaxed mb-5" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.7)',
              maxWidth: '44ch', opacity: 0,
            }}>
              Nirmiti was founded on a simple belief: that the best architecture is born from listening —
              to the land, to the light, to the people who will inhabit the space.
            </p>

            <p ref={p2Ref} className="text-base leading-relaxed mb-10" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.7)',
              maxWidth: '44ch', opacity: 0,
            }}>
              Every project we undertake is a conversation between ancient Keralan sensibility and
              contemporary precision — where exposed laterite meets glass, where rain courts
              become living rooms, and where every threshold is a ceremony.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8"
              style={{ borderTop: '1px solid rgba(34,34,34,0.08)', opacity: 0 }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)',
                    fontWeight: 300, color: '#8A6A45', lineHeight: 1 }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 400,
                    letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(34,34,34,0.45)', marginTop: '0.25rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
