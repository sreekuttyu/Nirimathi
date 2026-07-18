import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import img1 from '../assets/image 1.png';
import img2 from '../assets/image 2.png';
import img3 from '../assets/image 3.png';

const images = [
  { src: img1, caption: 'Courtyard at dusk — natural laterite and water' },
  { src: img2, caption: 'Modern Kerala villa — concrete and tropical canopy' },
  { src: img3, caption: 'Interior corridor — diffused afternoon light' },
  { src: img1, caption: 'Verandah detail — teak and woven reed' },
  { src: img2, caption: 'Pool edge — forest reflections at golden hour' },
  { src: img3, caption: 'Entrance threshold — moss stone and light' },
];

function GalleryImage({ img, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.08} className="break-inside-avoid mb-4 md:mb-5">
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer group"
        style={{
          boxShadow: hovered
            ? '0 20px 50px -15px rgba(31,43,36,0.35)'
            : '0 8px 30px -10px rgba(31,43,36,0.18)',
          transition: 'box-shadow 0.5s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={img.src}
            alt={img.caption}
            loading="lazy"
            className="w-full block"
            style={{ display: 'block' }}
          />
        </motion.div>

        {/* Caption overlay */}
        <motion.div
          className="absolute inset-0 flex items-end p-5"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'linear-gradient(0deg, rgba(31,43,36,0.8) 0%, rgba(31,43,36,0.2) 50%, transparent 100%)',
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.85)', letterSpacing: '0.05em' }}
          >
            {img.caption}
          </p>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 md:py-40" style={{ background: '#F6F2EA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal delay={0}>
            <span className="eyebrow block mb-4">Moments Captured</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-display-md font-light"
              style={{ fontFamily: 'var(--font-display)', color: '#1F2B24' }}
            >
              The{' '}
              <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>texture</em>
              {' '}of our work
            </h2>
          </ScrollReveal>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {images.map((img, i) => (
            <GalleryImage key={i} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
