import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  blur?: boolean;
}

const spring = { type: 'spring' as const, stiffness: 150, damping: 22, mass: 0.9 };

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', blur = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  const dir = { up: { y: 24, x: 0 }, down: { y: -24, x: 0 }, left: { y: 0, x: 28 }, right: { y: 0, x: -28 } }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dir, ...(blur ? { filter: 'blur(8px)' } : {}) }}
      animate={inView
        ? { opacity: 1, x: 0, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }
        : { opacity: 0, ...dir, ...(blur ? { filter: 'blur(8px)' } : {}) }
      }
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}
