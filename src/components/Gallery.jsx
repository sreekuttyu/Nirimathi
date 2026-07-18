import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/image 1.png';
import img2 from '../assets/image 2.png';
import img3 from '../assets/image 3.png';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: img1, caption: 'Courtyard at dusk — natural laterite and water' },
  { src: img2, caption: 'Modern Kerala villa — concrete and tropical canopy' },
  { src: img3, caption: 'Interior corridor — diffused afternoon light' },
];

function GalleryImage({ img, index }) {
  const wrapRef    = useRef(null);
  const imgRef     = useRef(null);
  const captionRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Clip reveal — each image wipes in from a different direction */
      const origins = ['inset(0% 100% 0% 0%)', 'inset(100% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'];
      gsap.fromTo(wrapRef.current,
        { clipPath: origins[index % 3], opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
          duration: 1.5, ease: 'expo.out', delay: index * 0.2,
          scrollTrigger: { trigger: wrapRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(imgRef.current,     { scale: 1.07, duration: 1.2, ease: 'power2.out' });
    gsap.to(captionRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(imgRef.current,     { scale: 1, duration: 1.4, ease: 'elastic.out(1,0.5)' });
    gsap.to(captionRef.current, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' });
  };

  return (
    <div ref={wrapRef} className="break-inside-avoid mb-4 md:mb-5 relative overflow-hidden rounded-xl cursor-pointer"
      style={{ opacity: 0, boxShadow: '0 8px 30px -10px rgba(31,43,36,0.22)' }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

      <img ref={imgRef} src={img.src} alt={img.caption} loading="lazy"
        style={{ width: '100%', display: 'block', willChange: 'transform' }} />

      {/* Caption */}
      <div ref={captionRef} className="absolute inset-0 flex items-end p-5 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(10px)',
          background: 'linear-gradient(0deg, rgba(31,43,36,0.82) 0%, rgba(31,43,36,0.2) 55%, transparent 100%)' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300,
          color: 'rgba(246,242,234,0.85)', letterSpacing: '0.06em' }}>
          {img.caption}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([eyebrowRef.current, titleRef.current],
        { y: 24, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.15, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-28 md:py-40" style={{ background: '#F6F2EA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="text-center mb-16">
          <span ref={eyebrowRef} className="block mb-4" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8A6A45', opacity: 0,
          }}>Moments Captured</span>

          <h2 ref={titleRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, opacity: 0,
            fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1F2B24',
          }}>
            The <em style={{ fontStyle: 'italic', color: '#8A6A45' }}>texture</em> of our work
          </h2>
        </div>

        <div className="masonry-grid">
          {images.map((img, i) => <GalleryImage key={i} img={img} index={i} />)}
        </div>
      </div>
    </section>
  );
}
