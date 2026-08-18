import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Votre médecin crée une ordonnance numérique et vous remet un code unique.', color: '#e67a2e', bg: 'rgba(230,122,46,0.1)' },
  { num: '02', title: 'Recherche', desc: 'Le moteur trouve les pharmacies proches avec vos médicaments en stock.', color: '#00bfa6', bg: 'rgba(0,191,166,0.1)' },
  { num: '03', title: 'Préparation', desc: 'La pharmacie valide et prépare votre commande en quelques minutes.', color: '#9b5de5', bg: 'rgba(155,93,229,0.1)' },
  { num: '04', title: 'Livraison', desc: 'Un livreur vérifié vous livre avec suivi GPS en temps réel.', color: '#2a7a35', bg: 'rgba(42,122,53,0.1)' },
];

const spring = { type: 'spring' as const, stiffness: 150, damping: 20, mass: 0.9 };

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: spring },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function StepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {steps.map((s) => (
        <motion.div
          key={s.num}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
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
