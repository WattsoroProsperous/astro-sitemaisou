import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function StaggerItem({ children, className = '' }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          transform: reduce ? 'translateY(0px)' : 'translateY(20px)',
        },
        visible: {
          opacity: 1,
          transform: 'translateY(0px)',
          transition: { type: 'spring', duration: 0.5, bounce: 0.1 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
