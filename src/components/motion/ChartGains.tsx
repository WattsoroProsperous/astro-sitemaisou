import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── configs ──────────────────────────────────────────────────────────────────

const CONFIGS = {
  patient: {
    bg:       '#f0faf1',
    accent:   '#2a7a35',
    iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    title:    '43 minutes économisées',
    title2:   'par achat',
    subtitle: 'Temps par étape : parcours traditionnel vs. Mainsou.',
    maxY: 25,
    yTicks: [5, 10, 15, 20, 25],
    steps: [
      { label: 'Recherche', traditional: 15, mainsou: 2,  color: '#2a7a35' },
      { label: 'Trajet',    traditional: 22, mainsou: 8,  color: '#00897b' },
      { label: 'Attente',   traditional: 18, mainsou: 3,  color: '#e67e22' },
      { label: 'Retrait',   traditional: 8,  mainsou: 2,  color: '#0277bd' },
    ],
  },
  pharma: {
    bg:       '#f0faf9',
    accent:   '#00897b',
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125Z',
    title:    'Moins de stock dormant',
    title2:   'par officine',
    subtitle: 'Part non vendue par catégorie, avant et après Mainsou.',
    maxY: 60,
    yTicks: [15, 30, 45, 60],
    steps: [
      { label: 'Courants',  traditional: 28, mainsou: 8,  color: '#00897b' },
      { label: 'Ordonn.',   traditional: 35, mainsou: 9,  color: '#0097a7' },
      { label: 'Saison.',   traditional: 42, mainsou: 11, color: '#0288d1' },
      { label: 'Para.',     traditional: 51, mainsou: 14, color: '#6039b8' },
    ],
  },
} as const;

type Variant = keyof typeof CONFIGS;

// ─── OpenType feature strings ─────────────────────────────────────────────────

const OT_SANS    = "'kern' 1,'liga' 1,'calt' 1,'cv01' 1,'cv02' 1,'cv03' 1,'cv04' 1,'ss02' 1";
const OT_HEADING = "'kern' 1,'liga' 1,'calt' 1,'ss01' 1";

// ─── SVG layout constants ─────────────────────────────────────────────────────

const W  = 340;
const H  = 220;
const PL = 42;
const PR = 10;
const PT = 8;
const PB = 24;
const CW = W - PL - PR;
const CH = H - PT - PB;
const BW = 48;

function sp(n: number)                { return (CW - n * BW) / (n + 1); }
function bx(n: number, i: number)     { return PL + sp(n) + i * (BW + sp(n)); }
function cx(n: number, i: number)     { return bx(n, i) + BW / 2; }
function bh(v: number, m: number)     { return (v / m) * CH; }
function bt(v: number, m: number)     { return PT + CH - bh(v, m); }
const bot = PT + CH;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChartGains({ variant }: { variant: Variant }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cfg    = CONFIGS[variant];
  const n      = cfg.steps.length;

  const trendD = cfg.steps
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${cx(n,i).toFixed(1)} ${bt(s.mainsou, cfg.maxY).toFixed(1)}`)
    .join(' ');

  // Shared text style for SVG — local Inter Variable + full OT features
  const svgTextStyle = {
    fontFamily:         'var(--font-sans)',
    fontFeatureSettings: OT_SANS,
    fontVariantNumeric: 'proportional-nums',
  } as const;

  return (
    <div
      ref={ref}
      style={{
        background:    cfg.bg,
        borderRadius:  20,
        padding:       '28px 24px 20px',
        display:       'flex',
        flexDirection: 'column',
        boxSizing:     'border-box',
      }}
    >
      {/* ── Icon ── */}
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: '#111110', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
      }}>
        <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={cfg.iconPath} />
        </svg>
      </div>

      {/* ── Title ── */}
      <p style={{
        fontFamily:          'var(--font-heading)',
        fontFeatureSettings: OT_HEADING,
        fontSize: 20, fontWeight: 800,
        color: '#111110', letterSpacing: '-0.02em', lineHeight: 1.2,
        marginBottom: 6,
      }}>
        {cfg.title}<br />{cfg.title2}
      </p>

      {/* ── Subtitle ── */}
      <p style={{
        fontFamily:          'var(--font-sans)',
        fontFeatureSettings: OT_SANS,
        fontSize: 13, fontWeight: 500,
        color: '#111110', lineHeight: 1.5,
        marginBottom: 14,
      }}>
        {cfg.subtitle}
      </p>

      {/* ── Legend ── */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        {[
          { fill: 'rgba(0,0,0,0.14)', label: 'Traditionnel' },
          { fill: cfg.accent,          label: 'Avec Mainsou' },
        ].map(l => (
          <span key={l.label} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-sans)', fontFeatureSettings: OT_SANS,
            fontSize: 10, fontWeight: 600, color: '#111110',
          }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 2, background: l.fill, flexShrink: 0 }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* ── SVG chart ── */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* grid lines — intentionally very subtle, structural only */}
        {[0, ...cfg.yTicks].map(v => (
          <line key={v}
            x1={PL} y1={bt(v, cfg.maxY)}
            x2={W - PR} y2={bt(v, cfg.maxY)}
            stroke={v === 0 ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.08)'}
            strokeWidth="1"
            strokeDasharray={v > 0 ? '3 3' : undefined}
          />
        ))}

        {/* y-axis labels */}
        {cfg.yTicks.map(v => (
          <text key={v}
            x={PL - 5} y={bt(v, cfg.maxY) + 4}
            fontSize="10" fontWeight="600"
            fill="#111110"
            textAnchor="end"
            style={svgTextStyle}
          >{v}</text>
        ))}

        {/* backdrop bars (traditional) */}
        {cfg.steps.map((s, i) => (
          <rect key={`bg-${i}`}
            x={bx(n, i)} y={bt(s.traditional, cfg.maxY)}
            width={BW} height={bh(s.traditional, cfg.maxY)}
            rx={8} fill="rgba(0,0,0,0.09)"
          />
        ))}

        {/* Mainsou bars — animated */}
        {cfg.steps.map((s, i) => (
          <motion.rect key={`bar-${i}`}
            x={bx(n, i)} width={BW} rx={8} fill={s.color}
            initial={{ height: 0, y: bot }}
            animate={inView
              ? { height: bh(s.mainsou, cfg.maxY), y: bt(s.mainsou, cfg.maxY) }
              : { height: 0, y: bot }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ))}

        {/* trend line */}
        <motion.path d={trendD}
          fill="none" stroke="#111110" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* dots */}
        {cfg.steps.map((s, i) => (
          <motion.circle key={`dot-${i}`}
            cx={cx(n, i)} cy={bt(s.mainsou, cfg.maxY)}
            fill="white" stroke="#111110" strokeWidth="1.5"
            initial={{ r: 0 }}
            animate={inView ? { r: 4 } : { r: 0 }}
            transition={{ duration: 0.2, delay: 0.57 + i * 0.07 }}
          />
        ))}

        {/* x-axis labels */}
        {cfg.steps.map((s, i) => (
          <text key={`xl-${i}`}
            x={cx(n, i)} y={H - 4}
            fontSize="10" fontWeight="600"
            fill="#111110"
            textAnchor="middle"
            style={svgTextStyle}
          >{s.label}</text>
        ))}
      </svg>
    </div>
  );
}
