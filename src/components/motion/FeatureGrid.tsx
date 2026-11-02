import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
    title: 'Géolocalisation',
    desc: "Le patient trouve votre pharmacie parce que vous avez le médicament. Pas seulement parce que vous êtes le plus proche.",
    iconColor: '#00bfa6', bg: 'rgba(0,191,166,0.1)',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>,
    title: 'Confirmation manuelle',
    desc: "Le pharmacien confirme la disponibilité directement depuis l'application. Aucune connexion à un logiciel externe n'est requise.",
    iconColor: '#e67a2e', bg: 'rgba(230,122,46,0.1)',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
    title: 'Dépannage entre officines',
    desc: "Stock dormant d'un côté, rupture de l'autre : Mainsou met en relation les officines du même quartier pour se dépanner mutuellement.",
    iconColor: '#9b5de5', bg: 'rgba(155,93,229,0.1)',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
    title: 'Aide à la commande',
    desc: "Savoir quoi commander et en quelle quantité selon la demande réelle de votre zone. Moins de surstock, moins de ruptures sur les produits courants.",
    iconColor: '#f15bb5', bg: 'rgba(241,91,181,0.1)',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
    title: 'Gestion avec RFID',
    desc: "L'option Officine ajoute un logiciel de gestion complet avec inventaire automatique par RFID et connexion stock par API.",
    iconColor: '#2a7a35', bg: 'rgba(42,122,53,0.1)',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>,
    title: 'Visibilité parapharmacie',
    desc: "Les marques de parapharmacie gagnent en visibilité auprès des patients qui cherchent leurs produits. 10 % sur les ventes apportées.",
    iconColor: '#00bbf9', bg: 'rgba(0,187,249,0.1)',
  },
];

const spring = { type: 'spring' as const, duration: 0.5, bounce: 0.1 };

export default function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const reduce = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      transform: reduce ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.97)',
      filter:    reduce ? 'blur(0px)' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0px) scale(1)',
      filter:    'blur(0px)',
      transition: spring,
    },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.04 } },
  };

  return (
    <motion.div
      ref={ref}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {features.map((f) => (
        <motion.div
          key={f.title}
          variants={itemVariants}
          className="notion-card p-9"
          style={{ cursor: 'default' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ color: f.iconColor, background: f.bg }}
          >
            {f.icon}
          </div>
          <p className="heading-card mb-3">{f.title}</p>
          <p className="body-default">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
