import { motion } from 'framer-motion';

interface Props {
  apkUrl: string;
}

export default function HeroText({ apkUrl }: Props) {
  return (
    <div className="flex-1 text-center md:text-left">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8"
      >
        <span className="pulse-dot" />
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Disponible en Afrique de l'Ouest</span>
      </motion.div>

      {/* H1 — clamp(44px, 9vw, 92px), weight 800 */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="heading-hero gradient-text mb-6"
      >
        Vos médicaments,
        <br />
        livrés chez vous.
      </motion.h1>

      {/* Body — responsive */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mx-auto md:mx-0"
        style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.4)', marginBottom: '44px', maxWidth: '500px' }}
      >
        De l'ordonnance à la livraison. Un écosystème complet qui connecte patients, médecins et pharmacies.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
      >
        <a href={apkUrl} download className="btn-primary-large group">
          <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Télécharger l'APK
        </a>
        <button
          onClick={() => (window as any).openAuth()}
          className="btn-secondary"
        >
          S'inscrire gratuitement
        </button>
      </motion.div>
    </div>
  );
}
