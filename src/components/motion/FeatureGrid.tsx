import { motion } from 'framer-motion';

const features = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" /></svg>,
    title: 'OCR intelligent',
    desc: 'Photographiez votre ordonnance. Médicaments, dosages et quantités détectés automatiquement.',
    iconColor: '#FF8A33', bg: '#FFF3E8',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
    title: 'Géolocalisation',
    desc: 'Trouve les pharmacies proches avec vos médicaments en stock, triées par distance.',
    iconColor: '#2A9D99', bg: '#E8F6F5',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
    title: 'Scission intelligente',
    desc: 'Médicament manquant ? Le système optimise automatiquement entre pharmacies.',
    iconColor: '#AD6DED', bg: '#F3ECFF',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08" /></svg>,
    title: 'Dossier médical partagé',
    desc: 'Un dossier unique accessible par tous les hôpitaux agréés du réseau.',
    iconColor: '#529CCA', bg: '#EBF3FA',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>,
    title: 'Suivi temps réel',
    desc: 'Notification à chaque étape. Position GPS du livreur en direct sur la carte.',
    iconColor: '#FF83DD', bg: '#FFF0FA',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
    title: 'Sécurité santé',
    desc: 'Chiffrement bout-en-bout, audit trail complet, conformité données de santé.',
    iconColor: '#3B5B32', bg: '#f0f5ee',
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="notion-card p-8"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
            style={{ color: f.iconColor, background: f.bg }}
          >
            {f.icon}
          </div>
          <p className="heading-card mb-2">{f.title}</p>
          <p className="body-default">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
