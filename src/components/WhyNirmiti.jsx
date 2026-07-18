import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const commitments = [
  { year: '01', title: 'Rooted in Place',       description: "We design for Kerala specifically — its climate, its materials, its culture, and its way of dwelling. Not generic architecture applied to a tropical setting." },
  { year: '02', title: 'Integrated Process',     description: 'Architecture, interior, landscape, and construction under one roof. Every decision is connected; nothing happens in isolation.' },
  { year: '03', title: 'Craft-First Execution',  description: 'We work with master craftsmen who understand laterite, teak, and traditional joinery. Modern precision meets generational knowledge.' },
  { year: '04', title: 'Transparent Partnership',description: 'You are part of the process from first sketch to final key. No surprises. Clear timelines, clear budgets, and clear communication — always.' },
];

export default function WhyNirmiti() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const lineRef     = useRef(null);   /* vertical timeline line */
  const itemsRef    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header */
      gsap.fromTo([eyebrowRef.current, titleRef.current],
        { y: 24, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.15, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      /* Vertical line draws downward */
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 2, ease: 'expo.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      /* Each timeline item — alternate left/right */
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? 50 : -50, opacity: 0, filter: 'blur(6px)' },
          {
            x: 0, opacity: 1, filter: 'blur(0px)',
            duration: 1.1, ease: 'expo.out', delay: i * 0.12,
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#1F2B24' }}>
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 600, right: '-15%', top: '20%',
        background: 'radial-gradient(circle, rgba(138,106,69,0.07) 0%, transparent 65%)',
        animation: 'floatBlob 20s ease-in-out infinite',
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="mb-20">
          <span ref={eyebrowRef} className="block mb-4" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8A6A45', opacity: 0,
          }}>Why Choose Us</span>

          <h2 ref={titleRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, opacity: 0,
            fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1,
            letterSpacing: '-0.02em', color: '#F6F2EA', maxWidth: '20ch',
          }}>
            Four commitments we{' '}
            <em style={{ fontStyle: 'italic', color: '#C9B79C' }}>never compromise</em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div ref={lineRef} className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'rgba(201,183,156,0.2)', transform: 'scaleY(0)' }} />

          <div className="flex flex-col gap-0">
            {commitments.map((item, i) => (
              <div
                key={item.year}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative flex gap-8 md:gap-16 pb-14"
                style={{ opacity: 0 }}
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 hidden md:flex flex-col items-center" style={{ width: '1.5rem' }}>
                  <div className="absolute top-1 w-4 h-4 rounded-full" style={{
                    background: 'rgba(138,106,69,0.15)',
                    animation: 'pulse-ring 3s ease-out infinite',
                    animationDelay: `${i * 0.75}s`,
                  }} />
                  <div className="relative z-10 w-3 h-3 rounded-full border-2 mt-1"
                    style={{ borderColor: '#8A6A45', background: '#1F2B24' }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-6">
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,4rem)',
                      fontWeight: 300, color: 'rgba(201,183,156,0.1)', lineHeight: 1, flexShrink: 0,
                    }}>{item.year}</span>
                    <div>
                      <h3 className="mb-3" style={{
                        fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                        fontWeight: 400, color: '#F6F2EA', letterSpacing: '-0.01em',
                      }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 300,
                        color: 'rgba(246,242,234,0.5)', maxWidth: '50ch',
                      }}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
