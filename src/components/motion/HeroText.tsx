import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  apkUrl: string;
}

export default function HeroText({ apkUrl }: Props) {
  const reduce = useReducedMotion();

  const spring = { type: 'spring' as const, duration: 0.6, bounce: 0.1 };

  return (
    <div>
      <div className="hero-content-left">
        <motion.h1
          initial={{ opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(24px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ ...spring, delay: reduce ? 0 : 0.2 }}
          className="hero-title gradient-text text-left"
          style={{ marginBottom: '28px' }}
        >
          Nous simplifions chaque étape de votre parcours de soin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(16px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ ...spring, delay: reduce ? 0 : 0.35 }}
          className="text-left"
          style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '520px' }}
        >
          Pour vous livrer l'essentiel, là où vous êtes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(16px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ ...spring, delay: reduce ? 0 : 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-start"
        >
          <button onClick={() => (window as any).openAuthForDownload()} className="btn-primary-large group">
            <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Télécharger
          </button>
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
