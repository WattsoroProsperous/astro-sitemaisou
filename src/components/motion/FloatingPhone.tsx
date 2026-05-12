import { motion } from 'framer-motion';

export default function FloatingPhone() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex-shrink-0"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
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
