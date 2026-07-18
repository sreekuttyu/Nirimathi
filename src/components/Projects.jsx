import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowUpRight } from 'lucide-react';
import img1 from '../assets/image 1.png';
import img2 from '../assets/image 2.png';
import img3 from '../assets/image 3.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'The Canopy House',
    location: 'Thrissur, Kerala',
    year: '2023',
    tag: 'Residential',
    description:
      'A 4,200 sq ft tropical residence where an ancient rain tree dictated the floor plan. Exposed RCC frames embrace the canopy; interior courtyards channel monsoon light.',
    image: img1,
  },
  {
    id: 2,
    title: 'Malabar Retreat',
    location: 'Kozhikode, Kerala',
    year: '2022',
    tag: 'Hospitality',
    description:
      'A hillside wellness retreat of seven pavilions dissolving into the cardamom estate. Each suite frames a different horizon; materiality is entirely local — stone, bamboo, and thatch.',
    image: img2,
  },
  {
    id: 3,
    title: 'Laterite & Light',
    location: 'Palakkad, Kerala',
    year: '2024',
    tag: 'Residential',
    description:
      'A minimal family home where 2,800 laterite blocks were hand-laid by local craftsmen. The north-facing clerestory washes every room in diffused Kerala light throughout the day.',
    image: img3,
  },
];

/* ─── Clip-path reveal + parallax card ─────────────────────────────────── */
function ProjectCard({ project, onClick, index, featured = false }) {
  const cardRef    = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const labelRef   = useRef(null);
  const titleRef   = useRef(null);

  /* 1. Scroll-triggered clip-path wipe reveal */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.4,
        ease: 'expo.out',
        delay: index * 0.18,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    /* Text stagger inside card */
    gsap.fromTo(
      [labelRef.current, titleRef.current],
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'expo.out',
        delay: index * 0.18 + 0.5,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [index]);

  /* 2. Mouse-move parallax — image drifts opposite to cursor */
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

    gsap.to(imgRef.current, {
      x: cx * -18,
      y: cy * -12,
      scale: 1.08,
      duration: 0.9,
      ease: 'power2.out',
    });

    gsap.to(overlayRef.current, {
      opacity: 0.55,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(overlayRef.current, {
      opacity: 0.7,
      duration: 0.5,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        aspectRatio: featured ? '16/7' : '5/4',
        opacity: 0,                          /* GSAP takes over */
        clipPath: 'inset(100% 0% 0% 0%)',
        boxShadow: '0 24px 64px -20px rgba(31,43,36,0.38)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Image — overflows so parallax doesn't reveal gap */}
      <div className="absolute inset-[-6%] overflow-hidden">
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Dark gradient — softens on hover */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.7,
          background:
            'linear-gradient(0deg, rgba(20,28,22,0.92) 0%, rgba(20,28,22,0.25) 50%, rgba(20,28,22,0.05) 100%)',
        }}
      />

      {/* Sheen line — slides across on clip reveal */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute top-0 bottom-0"
          style={{
            width: 2,
            left: '-4px',
            background: 'linear-gradient(180deg, transparent, rgba(201,183,156,0.5), transparent)',
            animation: `sheenSlide 1.6s ease forwards ${index * 0.18 + 0.2}s`,
          }}
        />
      </div>

      {/* Tag pill */}
      <div className="absolute top-5 left-5 z-10">
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F6F2EA',
            background: 'rgba(138,106,69,0.82)',
            backdropFilter: 'blur(10px)',
            padding: '0.4rem 0.9rem',
            borderRadius: '100px',
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Arrow badge */}
      <div
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: 'rgba(246,242,234,0.12)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(246,242,234,0.18)',
        }}
      >
        <ArrowUpRight size={16} color="#F6F2EA" />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6rem',
            fontWeight: 400,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(201,183,156,0.72)',
            marginBottom: '0.4rem',
          }}
        >
          {project.location} · {project.year}
        </div>
        <h3
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            fontWeight: 400,
            color: '#F6F2EA',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }) {
  const imgRef     = useRef(null);
  const contentRef = useRef(null);

  /* GSAP pan on open */
  useEffect(() => {
    if (!project) return;
    gsap.fromTo(
      imgRef.current,
      { scale: 1.12, x: 30 },
      { scale: 1, x: 0, duration: 1.6, ease: 'expo.out' }
    );
    gsap.fromTo(
      contentRef.current?.querySelectorAll('.lb-line'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
          style={{ background: 'rgba(10,15,12,0.92)', backdropFilter: 'blur(24px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full overflow-hidden rounded-2xl"
            style={{ background: '#1A2420', boxShadow: '0 80px 140px -30px rgba(0,0,0,0.7)' }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(246,242,234,0.08)',
                border: '1px solid rgba(246,242,234,0.14)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(246,242,234,0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(246,242,234,0.08)')}
            >
              <X size={17} color="#F6F2EA" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image with GSAP pan */}
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', minHeight: 280 }}>
                <img
                  ref={imgRef}
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    willChange: 'transform',
                  }}
                />
              </div>

              {/* Content */}
              <div ref={contentRef} className="p-8 md:p-12 flex flex-col justify-center gap-4">
                <span
                  className="lb-line"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.34em',
                    textTransform: 'uppercase',
                    color: '#8A6A45',
                  }}
                >
                  {project.tag}
                </span>

                <h3
                  className="lb-line"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                    fontWeight: 400,
                    color: '#F6F2EA',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="lb-line"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: '#C9B79C',
                  }}
                >
                  {project.location} · {project.year}
                </p>

                {/* Thin teak divider */}
                <div
                  className="lb-line"
                  style={{ height: 1, background: 'rgba(138,106,69,0.25)', width: '100%' }}
                />

                <p
                  className="lb-line text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    color: 'rgba(246,242,234,0.55)',
                    maxWidth: '40ch',
                  }}
                >
                  {project.description}
                </p>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="lb-line self-start group flex items-center gap-3 mt-2"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#F6F2EA',
                    background: '#8A6A45',
                    padding: '0.75rem 1.8rem',
                    borderRadius: '100px',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#7a5c38')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#8A6A45')}
                >
                  Enquire
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Section header with GSAP line draw ───────────────────────────────── */
function SectionHeader() {
  const lineRef    = useRef(null);
  const eyebrowRef = useRef(null);
  const headRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: eyebrowRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' })
      .fromTo(headRef.current,    { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, '-=0.4')
      .fromTo(lineRef.current,    { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'expo.out' }, '-=0.6');
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <div>
        <span
          ref={eyebrowRef}
          className="block mb-4"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#8A6A45',
            opacity: 0,
          }}
        >
          Featured Work
        </span>
        <h2
          ref={headRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: '#1F2B24',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            maxWidth: '18ch',
            opacity: 0,
          }}
        >
          Stories Told in{' '}
          <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>Stone & Light</em>
        </h2>

        {/* Animated underline */}
        <div
          ref={lineRef}
          style={{
            marginTop: '1.2rem',
            height: 1,
            width: '100%',
            maxWidth: 200,
            background: 'linear-gradient(90deg, #8A6A45, rgba(138,106,69,0.1))',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
      </div>

      <a
        href="#contact"
        className="group self-start md:self-auto flex items-center gap-3"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#1F2B24',
          border: '1px solid rgba(34,34,34,0.2)',
          padding: '0.7rem 1.6rem',
          borderRadius: '100px',
          transition: 'background 0.4s, color 0.4s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1F2B24';
          e.currentTarget.style.color = '#F6F2EA';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#1F2B24';
        }}
      >
        View All Projects
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-28 md:py-40" style={{ background: '#F6F2EA' }}>
      {/* Sheen keyframe */}
      <style>{`
        @keyframes sheenSlide {
          from { left: -4px; opacity: 0; }
          20%  { opacity: 1; }
          to   { left: 105%; opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader />

        {/* Grid — full-width feature + two side by side */}
        <div className="flex flex-col gap-6 md:gap-8">
          <ProjectCard project={projects[0]} onClick={setSelected} index={0} featured />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.slice(1).map((p, i) => (
              <ProjectCard key={p.id} project={p} onClick={setSelected} index={i + 1} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
