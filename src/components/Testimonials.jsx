import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    quote:
      'Nirmiti didn\'t just design our home — they designed the way we live. Every morning the light enters exactly as they promised it would. That\'s not skill, that\'s care.',
    name: 'Arjun & Priya Menon',
    project: 'The Canopy House, Thrissur',
  },
  {
    quote:
      'Working with this team felt like collaborating with people who genuinely understood what we were trying to say. The result exceeded every brief we gave them.',
    name: 'Rajeev Pillai',
    project: 'Malabar Retreat, Kozhikode',
  },
  {
    quote:
      'The craftsmanship is extraordinary. I had been shown beautiful renders before — Nirmiti actually delivered a building more beautiful than the render.',
    name: 'Sunita & Arun Krishnan',
    project: 'Laterite & Light, Palakkad',
  },
  {
    quote:
      'Their understanding of how Kerala architecture relates to the body — the proportions, the threshold, the breeze — is unmatched among contemporary firms.',
    name: 'Dr. Sreelatha Nair',
    project: 'Pepper Estate, Wayanad',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setIndex(i);
    startTimer();
  };

  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#F6F2EA' }}
    >
      {/* Subtle ambient bg — no image, pure gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(138,106,69,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(246,242,234,0.9)' }} />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal delay={0}>
          <span className="eyebrow block text-center mb-16" style={{ color: '#8A6A45' }}>
            Client Stories
          </span>
        </ScrollReveal>

        <div className="relative" style={{ minHeight: 320 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-light rounded-2xl p-8 md:p-14 text-center"
              style={{ boxShadow: '0 30px 60px -20px rgba(31,43,36,0.1)' }}
            >
              <Quote
                size={32}
                className="mx-auto mb-8"
                style={{ color: '#8A6A45', opacity: 0.5 }}
              />
              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#1F2B24',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                  maxWidth: '52ch',
                  margin: '0 auto 2rem',
                }}
              >
                "{testimonials[index].quote}"
              </blockquote>
              <div
                className="text-sm font-medium"
                style={{ fontFamily: 'var(--font-sans)', color: '#1F2B24', letterSpacing: '0.02em' }}
              >
                {testimonials[index].name}
              </div>
              <div className="eyebrow mt-1" style={{ color: '#8A6A45' }}>
                {testimonials[index].project}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                background: i === index ? '#8A6A45' : 'rgba(138,106,69,0.25)',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
