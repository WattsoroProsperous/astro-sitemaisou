import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', title: 'Cherchez', desc: "Entrez le nom de votre médicament. Votre demande est envoyée aux pharmacies partenaires situées dans votre zone.", color: '#e67a2e', bg: 'rgba(230,122,46,0.1)' },
  { num: '02', title: 'La pharmacie confirme', desc: "Le pharmacien vérifie son stock et confirme : disponibilité, prix et délai de validité. Comptez 10 à 30 minutes pour vous rendre sur place.", color: '#00bfa6', bg: 'rgba(0,191,166,0.1)' },
  { num: '03', title: 'Rendez-vous', desc: "Vous savez exactement où aller. Si le délai expire avant votre arrivée, Mainsou vous en informe pour une nouvelle vérification.", color: '#2a7a35', bg: 'rgba(42,122,53,0.1)' },
];

const spring = { type: 'spring' as const, duration: 0.5, bounce: 0.1 };

export default function StepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduce = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      transform: reduce ? 'translateY(0px)' : 'translateY(28px)',
      filter:    reduce ? 'blur(0px)' : 'blur(8px)',
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0px)',
      filter:    'blur(0px)',
      transition: spring,
    },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 } },
  };

  return (
    <motion.div
      ref={ref}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {steps.map((s) => (
        <motion.div
          key={s.num}
          variants={itemVariants}
          className="notion-card p-8"
          style={{ cursor: 'default' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-[13px] font-bold"
            style={{ color: s.color, background: s.bg }}
          >
            {s.num}
          </div>
          <h3 className="heading-card mb-3">{s.title}</h3>
          <p className="body-small">{s.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
