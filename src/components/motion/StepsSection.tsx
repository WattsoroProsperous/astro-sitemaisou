import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Votre médecin crée une ordonnance numérique et vous remet un code unique.', color: '#FF8A33', bg: '#FFF3E8' },
  { num: '02', title: 'Recherche', desc: 'Le moteur trouve les pharmacies proches avec vos médicaments en stock.', color: '#2A9D99', bg: '#E8F6F5' },
  { num: '03', title: 'Préparation', desc: 'La pharmacie valide et prépare votre commande en quelques minutes.', color: '#AD6DED', bg: '#F3ECFF' },
  { num: '04', title: 'Livraison', desc: 'Un livreur vérifié vous livre avec suivi GPS en temps réel.', color: '#3B5B32', bg: '#f0f5ee' },
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
          className="notion-card p-6"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-[12px] font-bold"
            style={{ color: s.color, background: s.bg }}
          >
            {s.num}
          </div>
          <h3 className="heading-card mb-2">{s.title}</h3>
          <p className="body-small">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
