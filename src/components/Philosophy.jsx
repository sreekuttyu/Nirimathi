import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Sun, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Leaf,
    title: 'Nature',
    malayalam: 'പ്രകൃതി',
    description: 'Every building begins with the land. We read the slope, the trees, the prevailing wind, and the path of monsoon water before a single line is drawn.',
  },
  {
    icon: Sun,
    title: 'Light',
    malayalam: 'വെളിച്ചം',
    description: 'In Kerala, light is mercurial — from the piercing clarity of summer to the diffused silver of the monsoon. We design for every season of luminance.',
  },
  {
    icon: Minus,
    title: 'Simplicity',
    malayalam: 'ലാളിത്യം',
    description: 'Restraint is not absence. It is the discipline to keep only what serves — so that space, material, and inhabitant can breathe and be fully present.',
  },
];

export default function Philosophy() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const cardsRef    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header — split blur-in */
      gsap.fromTo([eyebrowRef.current, titleRef.current],
        { y: 24, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.15, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      /* Cards — cascade in from below with scale */
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.2, ease: 'expo.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );

        /* Watermark text floats up continuously on scroll */
        const wm = card.querySelector('.wm');
        if (wm) {
          gsap.to(wm, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#1F2B24' }}
    >
      {/* Ambient blobs */}
      <div className="absolute pointer-events-none" style={{
        width: 700, height: 700, left: '-20%', top: '-10%',
        background: 'radial-gradient(circle, rgba(138,106,69,0.08) 0%, transparent 65%)',
        animation: 'floatBlob 22s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500, right: '-10%', bottom: '-5%',
        background: 'radial-gradient(circle, rgba(201,183,156,0.06) 0%, transparent 65%)',
        animation: 'floatBlob 18s ease-in-out infinite reverse',
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span ref={eyebrowRef} className="block mb-6" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8A6A45', opacity: 0,
          }}>Our Ethos</span>

          <h2 ref={titleRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, opacity: 0,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1,
            letterSpacing: '-0.02em', color: '#F6F2EA', maxWidth: '22ch', margin: '0 auto',
          }}>
            The three forces that{' '}
            <em style={{ fontStyle: 'italic', color: '#C9B79C' }}>guide every line</em>
            {' '}we draw
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col"
                style={{ minHeight: 340, opacity: 0 }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -6, duration: 0.5, ease: 'power2.out' });
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, duration: 0.7, ease: 'elastic.out(1,0.6)' });
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                }}
              >
                {/* Parallax watermark */}
                <div className="wm absolute -right-2 -bottom-4 pointer-events-none select-none" style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,10vw,8rem)',
                  fontWeight: 300, color: 'rgba(201,183,156,0.05)', lineHeight: 1,
                }}>
                  {pillar.malayalam}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8" style={{
                  background: 'rgba(138,106,69,0.2)', border: '1px solid rgba(138,106,69,0.3)',
                }}>
                  <Icon size={20} color="#8A6A45" strokeWidth={1.5} />
                </div>

                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.34em', textTransform: 'uppercase', color: '#8A6A45', marginBottom: '0.6rem' }}>
                  {pillar.malayalam}
                </div>

                <h3 className="mb-5" style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.2rem)',
                  fontWeight: 400, color: '#F6F2EA', letterSpacing: '-0.01em',
                }}>
                  {pillar.title}
                </h3>

                <p className="text-sm leading-relaxed mt-auto" style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.55)',
                }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
