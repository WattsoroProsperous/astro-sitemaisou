import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  blur?: boolean;
}

const spring = { type: 'spring' as const, duration: 0.5, bounce: 0.1 };

const transforms: Record<string, string> = {
  up:    'translateY(24px)',
  down:  'translateY(-24px)',
  left:  'translateX(28px)',
  right: 'translateX(-28px)',
};

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', blur = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const reduce = useReducedMotion();

  const hiddenTransform = reduce ? 'translateY(0px)' : transforms[direction];
  const hiddenFilter   = (blur && !reduce) ? 'blur(8px)' : 'blur(0px)';

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, transform: hiddenTransform, filter: hiddenFilter }}
      animate={inView
        ? { opacity: 1, transform: 'translateY(0px) translateX(0px)', filter: 'blur(0px)' }
        : { opacity: 0, transform: hiddenTransform, filter: hiddenFilter }
      }
      transition={{ ...spring, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
