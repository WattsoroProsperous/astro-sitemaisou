import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingPhone() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(40px) rotateY(-8deg)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) rotateY(0deg)' }}
      transition={{ type: 'spring', duration: 0.9, bounce: 0.1, delay: reduce ? 0 : 0.5 }}
      className="flex-shrink-0"
    >
      <motion.div
        animate={reduce ? {} : { transform: ['translateY(0px)', 'translateY(-4px)', 'translateY(0px)'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/mainsou-catalogue.png"
          alt="Mainsou App"
          className="w-[260px] sm:w-[300px] lg:w-[320px] rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10"
        />
      </motion.div>
    </motion.div>
  );
}
