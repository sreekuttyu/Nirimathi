import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    number: '01',
    title: 'Architecture',
    malayalam: 'വാസ്തുവിദ്യ',
    description:
      'From conceptual masterplanning to construction documents — we craft buildings that embody both contemporary vision and Kerala\'s living vernacular tradition.',
  },
  {
    number: '02',
    title: 'Interior Design',
    malayalam: 'ഇന്റീരിയർ ഡിസൈൻ',
    description:
      'Curated interiors where every surface, material, and piece of furniture is in conversation — warm, considered, and deeply personal to each client.',
  },
  {
    number: '03',
    title: 'Landscape Design',
    malayalam: 'ലാൻഡ്‌സ്‌കേപ്പ്',
    description:
      'Gardens and courtyards designed around Kerala\'s extraordinary biodiversity — blurring the boundary between house and rainforest.',
  },
  {
    number: '04',
    title: '3D Visualization',
    malayalam: 'വിഷ്വലൈസേഷൻ',
    description:
      'Cinematic-quality renders and walkthroughs that allow clients to inhabit the design before a single stone is laid.',
  },
  {
    number: '05',
    title: 'Construction Consulting',
    malayalam: 'നിർമ്മാണ കൺസൾട്ടിംഗ്',
    description:
      'On-site architectural oversight and material procurement support — ensuring the built work remains faithful to the design intent.',
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="py-28 md:py-40 overflow-hidden" style={{ background: '#F6F2EA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left sticky header */}
          <div className="lg:sticky lg:top-32 h-fit">
            <ScrollReveal delay={0}>
              <span className="eyebrow block mb-6">What We Do</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="text-display-md font-light mb-8"
                style={{ fontFamily: 'var(--font-display)', color: '#1F2B24' }}
              >
                Every service,{' '}
                <br />
                <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>one vision</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.6)', maxWidth: '36ch' }}
              >
                We offer an integrated suite of services — from first sketch to final nail —
                so your project speaks with one consistent, intentional voice.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — service list */}
          <div>
            {services.map((service, i) => (
              <ScrollReveal key={service.number} delay={0.05 * i}>
                <div
                  className="group relative py-8 cursor-default transition-all duration-500"
                  style={{
                    borderBottom: '1px solid rgba(34,34,34,0.08)',
                    paddingLeft: hoveredIndex === i ? '1rem' : '0',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover background strip */}
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: 'rgba(138,106,69,0.04)' }}
                  />

                  <div className="flex items-start gap-6 relative z-10">
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        fontWeight: 300,
                        color: hoveredIndex === i ? '#8A6A45' : 'rgba(34,34,34,0.25)',
                        letterSpacing: '0.1em',
                        paddingTop: '0.2rem',
                        minWidth: '2rem',
                        transition: 'color 0.3s',
                      }}
                    >
                      {service.number}
                    </span>

                    <div className="flex-1">
                      {/* Malayalam */}
                      <div className="eyebrow mb-1" style={{ color: 'rgba(138,106,69,0.5)' }}>
                        {service.malayalam}
                      </div>
                      {/* Title */}
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                            fontWeight: 400,
                            color: '#1F2B24',
                            letterSpacing: '-0.01em',
                            transition: 'color 0.3s',
                          }}
                        >
                          {service.title}
                        </h3>
                        <motion.div
                          animate={{
                            opacity: hoveredIndex === i ? 1 : 0,
                            x: hoveredIndex === i ? 0 : -8,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight size={18} color="#8A6A45" />
                        </motion.div>
                      </div>

                      {/* Description — expands on hover */}
                      <motion.div
                        animate={{
                          height: hoveredIndex === i ? 'auto' : 0,
                          opacity: hoveredIndex === i ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="text-sm leading-relaxed pt-3"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(34,34,34,0.6)' }}
                        >
                          {service.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
