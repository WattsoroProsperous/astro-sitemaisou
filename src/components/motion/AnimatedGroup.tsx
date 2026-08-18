import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  preset?: 'blur-slide' | 'slide' | 'scale' | 'fade';
  direction?: 'up' | 'down' | 'left' | 'right';
}

const spring = { type: 'spring' as const, stiffness: 140, damping: 20, mass: 0.9 };

function getItem(preset: string, direction: string) {
  const dir = { up: { y: 28 }, down: { y: -28 }, left: { x: 28 }, right: { x: -28 } }[direction] || { y: 28 };
  switch (preset) {
    case 'blur-slide': return {
      hidden: { opacity: 0, ...dir, filter: 'blur(8px)' },
      visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: spring },
    };
    case 'slide': return {
      hidden: { opacity: 0, ...dir },
      visible: { opacity: 1, x: 0, y: 0, transition: spring },
    };
    case 'scale': return {
      hidden: { opacity: 0, scale: 0.94, filter: 'blur(4px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: spring },
    };
    default: return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    };
  }
}

export function AnimatedGroup({ children, className, style, stagger = 0.08, delay = 0, preset = 'blur-slide', direction = 'up' }: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={getItem(preset, direction)}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={getItem(preset, direction)}>{children}</motion.div>
      }
    </motion.div>
  );
}
