import { motion, useInView, useReducedMotion } from 'framer-motion';
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

const spring = { type: 'spring' as const, duration: 0.5, bounce: 0.1 };

const transformMap: Record<string, string> = {
  up:    'translateY(28px)',
  down:  'translateY(-28px)',
  left:  'translateX(28px)',
  right: 'translateX(-28px)',
};

function getItem(preset: string, direction: string, reduce: boolean) {
  const t = transformMap[direction] ?? 'translateY(28px)';
  switch (preset) {
    case 'blur-slide': return {
      hidden:  { opacity: 0, transform: reduce ? 'translateY(0px)' : t, filter: reduce ? 'blur(0px)' : 'blur(8px)' },
      visible: { opacity: 1, transform: 'translateY(0px) translateX(0px)', filter: 'blur(0px)', transition: spring },
    };
    case 'slide': return {
      hidden:  { opacity: 0, transform: reduce ? 'translateY(0px)' : t },
      visible: { opacity: 1, transform: 'translateY(0px) translateX(0px)', transition: spring },
    };
    case 'scale': return {
      hidden:  { opacity: 0, transform: reduce ? 'scale(1)' : 'scale(0.94)', filter: reduce ? 'blur(0px)' : 'blur(4px)' },
      visible: { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)', transition: spring },
    };
    default: return {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    };
  }
}

export function AnimatedGroup({ children, className, style, stagger = 0.07, delay = 0, preset = 'blur-slide', direction = 'up' }: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };

  const item = getItem(preset, direction, reduce ?? false);

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
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
}
