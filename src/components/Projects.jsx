import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import img1 from '../assets/image 1.png';
import img2 from '../assets/image 2.png';
import img3 from '../assets/image 3.png';

const projects = [
  {
    id: 1,
    title: 'The Canopy House',
    location: 'Thrissur, Kerala',
    year: '2023',
    tag: 'Residential',
    description: 'A 4,200 sq ft tropical residence where an ancient rain tree dictated the floor plan. Exposed RCC frames embrace the canopy; interior courtyards channel monsoon light.',
    image: img1,
  },
  {
    id: 2,
    title: 'Malabar Retreat',
    location: 'Kozhikode, Kerala',
    year: '2022',
    tag: 'Hospitality',
    description: 'A hillside wellness retreat of seven pavilions dissolving into the cardamom estate. Each suite frames a different horizon; materiality is entirely local — stone, bamboo, and thatch.',
    image: img2,
  },
  {
    id: 3,
    title: 'Laterite & Light',
    location: 'Palakkad, Kerala',
    year: '2024',
    tag: 'Residential',
    description: 'A minimal family home where 2,800 laterite blocks were hand-laid by local craftsmen. The north-facing clerestory washes every room in diffused Kerala light throughout the day.',
    image: img3,
  },
];

function ProjectCard({ project, onClick, index, featured = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.12}>
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{
          aspectRatio: featured ? '16/7' : '5/4',
          boxShadow: hovered
            ? '0 30px 70px -20px rgba(31,43,36,0.45)'
            : '0 20px 60px -30px rgba(31,43,36,0.35)',
          transition: 'box-shadow 0.6s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(project)}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(31,43,36,0.85) 0%, rgba(31,43,36,0.2) 50%, transparent 100%)',
          }}
        />

        {/* Tag */}
        <div className="absolute top-5 left-5">
          <span
            className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'rgba(138,106,69,0.85)',
              backdropFilter: 'blur(8px)',
              color: '#F6F2EA',
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* View badge */}
        <motion.div
          className="absolute top-5 right-5"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(246,242,234,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(246,242,234,0.2)' }}
          >
            <ArrowUpRight size={16} color="#F6F2EA" />
          </div>
        </motion.div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="eyebrow mb-2" style={{ color: 'rgba(201,183,156,0.7)' }}>
            {project.location} · {project.year}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 400,
              color: '#F6F2EA',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </ScrollReveal>
  );
}

function Lightbox({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
          style={{ background: 'rgba(15,20,17,0.9)', backdropFilter: 'blur(20px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full overflow-hidden rounded-2xl"
            style={{ background: '#1F2B24', boxShadow: '0 60px 120px -30px rgba(0,0,0,0.6)' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: 'rgba(246,242,234,0.1)', border: '1px solid rgba(246,242,234,0.15)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(246,242,234,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(246,242,234,0.1)')}
            >
              <X size={18} color="#F6F2EA" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', minHeight: 300 }}
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="eyebrow block mb-4" style={{ color: '#8A6A45' }}>{project.tag}</span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    fontWeight: 400,
                    color: '#F6F2EA',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-sans)', color: '#C9B79C', fontWeight: 300 }}>
                  {project.location} · {project.year}
                </p>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.6)' }}
                >
                  {project.description}
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="self-start group flex items-center gap-3 px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.3em] transition-all duration-400"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: '#8A6A45',
                    color: '#F6F2EA',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#7a5c38')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#8A6A45')}
                >
                  Enquire About This Project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-28 md:py-40" style={{ background: '#F6F2EA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <ScrollReveal delay={0}>
              <span className="eyebrow block mb-4">Featured Work</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="text-display-md font-light"
                style={{ fontFamily: 'var(--font-display)', color: '#1F2B24', maxWidth: '18ch' }}
              >
                Stories Told in{' '}
                <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>Stone & Light</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <a
              href="#contact"
              className="group self-start md:self-auto flex items-center gap-3 px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.3em] transition-all duration-400"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '1px solid rgba(34,34,34,0.2)',
                color: '#1F2B24',
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
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </ScrollReveal>
        </div>

        {/* Grid — first card full-width feature, next two side by side */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Featured card — full width */}
          <ProjectCard
            project={projects[0]}
            onClick={setSelected}
            index={0}
            featured
          />
          {/* Two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.slice(1).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelected}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
