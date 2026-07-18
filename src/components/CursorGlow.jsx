import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const checkPointer = () => {
      const el = document.elementFromPoint(mouseX.get(), mouseY.get());
      setIsPointer(el && (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('button') || el.closest('a')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkPointer);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, [mouseX, mouseY, visible]);

  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138,106,69,0.25) 0%, rgba(138,106,69,0) 70%)',
          transition: 'width 0.3s, height 0.3s',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 8 : 5,
          height: isPointer ? 8 : 5,
          borderRadius: '50%',
          backgroundColor: '#8A6A45',
          transition: 'width 0.2s, height 0.2s',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
