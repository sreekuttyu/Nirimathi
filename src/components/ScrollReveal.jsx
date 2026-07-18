import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
