import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextEffectProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  per?: 'word' | 'char';
  delay?: number;
  preset?: 'blur' | 'slide' | 'fade';
}

const spring = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };

const presets = {
  blur:  { hidden: { opacity: 0, y: 10, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: spring } },
  slide: { hidden: { opacity: 0, y: 14 },                      visible: { opacity: 1, y: 0,                       transition: spring } },
  fade:  { hidden: { opacity: 0 },                              visible: { opacity: 1,                             transition: spring } },
};

function toText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(toText).join('');
  return '';
}

export function TextEffect({ children, as: Tag = 'p', className, style, per = 'word', delay = 0, preset = 'blur' }: TextEffectProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8% 0px' });

  const text = toText(children);
  const segments = per === 'word'
    ? text.split(' ').map((w, i, arr) => (i < arr.length - 1 ? w + ' ' : w))
    : text.split('');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: per === 'word' ? 0.06 : 0.028, delayChildren: delay } },
  };

  const item = presets[preset];
  const MotionEl = motion[Tag];

  return (
    <MotionEl
      ref={ref as any}
      className={className}
      style={{ display: 'block', ...style }}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {segments.map((seg, i) => (
        <motion.span key={i} variants={item} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {seg}
        </motion.span>
      ))}
    </MotionEl>
  );
}
