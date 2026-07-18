import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { number: '01', title: 'Architecture',            malayalam: 'വാസ്തുവിദ്യ',           description: "From conceptual masterplanning to construction documents — we craft buildings that embody both contemporary vision and Kerala's living vernacular tradition." },
  { number: '02', title: 'Interior Design',         malayalam: 'ഇന്റീരിയർ ഡിസൈൻ',       description: 'Curated interiors where every surface, material, and piece of furniture is in conversation — warm, considered, and deeply personal to each client.' },
  { number: '03', title: 'Landscape Design',        malayalam: 'ലാൻഡ്‌സ്‌കേപ്പ്',         description: "Gardens and courtyards designed around Kerala's extraordinary biodiversity — blurring the boundary between house and rainforest." },
  { number: '04', title: '3D Visualization',        malayalam: 'വിഷ്വലൈസേഷൻ',          description: 'Cinematic-quality renders and walkthroughs that allow clients to inhabit the design before a single stone is laid.' },
  { number: '05', title: 'Construction Consulting', malayalam: 'നിർമ്മാണ കൺസൾട്ടിംഗ്', description: 'On-site architectural oversight and material procurement support — ensuring the built work remains faithful to the design intent.' },
];

function ServiceRow({ service, index }) {
  const rowRef  = useRef(null);
  const numRef  = useRef(null);
  const lineRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* Scroll-triggered slide-in per row */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(rowRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          delay: index * 0.1,
          scrollTrigger: { trigger: rowRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
      /* Bottom border draws in from left */
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.2, ease: 'expo.out',
          delay: index * 0.1 + 0.2,
          scrollTrigger: { trigger: rowRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(rowRef.current, { paddingLeft: 16, duration: 0.4, ease: 'power2.out' });
    gsap.to(numRef.current,  { color: '#8A6A45', duration: 0.3 });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(rowRef.current, { paddingLeft: 0, duration: 0.5, ease: 'elastic.out(1,0.7)' });
    gsap.to(numRef.current,  { color: 'rgba(34,34,34,0.22)', duration: 0.3 });
  };

  return (
    <div ref={rowRef} className="relative cursor-default" style={{ opacity: 0 }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {/* Hover bg */}
      <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{ background: 'rgba(138,106,69,0.04)', opacity: hovered ? 1 : 0 }} />

      <div className="flex items-start gap-6 relative z-10 py-8">
        <span ref={numRef} style={{
          fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 300,
          color: 'rgba(34,34,34,0.22)', letterSpacing: '0.1em', paddingTop: '0.2rem',
          minWidth: '2rem', transition: 'color 0s',
        }}>
          {service.number}
        </span>

        <div className="flex-1">
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(138,106,69,0.5)', marginBottom: '0.25rem' }}>
            {service.malayalam}
          </div>

          <div className="flex items-center justify-between gap-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)',
              fontWeight: 400, color: '#1F2B24', letterSpacing: '-0.01em' }}>
              {service.title}
            </h3>
            <div style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 0.3s, transform 0.3s' }}>
              <ArrowRight size={18} color="#8A6A45" />
            </div>
          </div>

          {/* Expand on hover */}
          <div style={{ overflow: 'hidden', maxHeight: hovered ? 120 : 0,
            opacity: hovered ? 1 : 0, transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s' }}>
            <p className="text-sm leading-relaxed pt-3" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.6)',
            }}>
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Animated divider */}
      <div ref={lineRef} style={{ height: 1, background: 'rgba(34,34,34,0.08)', transform: 'scaleX(0)' }} />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([eyebrowRef.current, titleRef.current, bodyRef.current],
        { y: 28, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.15, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-40 overflow-hidden" style={{ background: '#F6F2EA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Sticky left */}
          <div className="lg:sticky lg:top-32 h-fit">
            <span ref={eyebrowRef} className="block mb-6" style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
              letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8A6A45', opacity: 0,
            }}>What We Do</span>

            <h2 ref={titleRef} className="mb-8" style={{
              fontFamily: 'var(--font-display)', fontWeight: 300, opacity: 0,
              fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1F2B24',
            }}>
              Every service,<br />
              <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>one vision</em>
            </h2>

            <p ref={bodyRef} className="text-sm leading-relaxed" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.6)', maxWidth: '36ch', opacity: 0,
            }}>
              We offer an integrated suite of services — from first sketch to final nail —
              so your project speaks with one consistent, intentional voice.
            </p>
          </div>

          {/* Service rows */}
          <div>
            {services.map((s, i) => <ServiceRow key={s.number} service={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
