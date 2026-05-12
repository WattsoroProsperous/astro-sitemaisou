import { motion } from 'framer-motion';

interface Props {
  apkUrl: string;
}

export default function HeroText({ apkUrl }: Props) {
  return (
    <div>
      {/* H1 + subtitle + CTAs — stays in left half so phone stays visible */}
      <div className="hero-content-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hero-title gradient-text text-left"
          style={{ marginBottom: '28px' }}
        >
          Nous simplifions chaque étape de votre parcours de soin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-left"
          style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '520px' }}
        >
          Pour vous livrer l'essentiel, là où vous êtes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-start"
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
    </div>
  );
}
