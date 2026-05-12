import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Votre médecin crée une ordonnance numérique et vous remet un code unique.', color: '#e67a2e', bg: 'rgba(230,122,46,0.1)' },
  { num: '02', title: 'Recherche', desc: 'Le moteur trouve les pharmacies proches avec vos médicaments en stock.', color: '#00bfa6', bg: 'rgba(0,191,166,0.1)' },
  { num: '03', title: 'Préparation', desc: 'La pharmacie valide et prépare votre commande en quelques minutes.', color: '#9b5de5', bg: 'rgba(155,93,229,0.1)' },
  { num: '04', title: 'Livraison', desc: 'Un livreur vérifié vous livre avec suivi GPS en temps réel.', color: '#2a7a35', bg: 'rgba(42,122,53,0.1)' },
];

export default function StepsSection() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="notion-card p-8"
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
    </div>
  );
}
