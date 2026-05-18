import { motion } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

export default function TransitionSection() {
  return (
    <section
      className="relative bg-[#020202] overflow-hidden flex items-center justify-center"
      style={{ minHeight: 'clamp(340px, 55vh, 600px)' }}
      dir="rtl"
    >
      {/* Subtle orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(255,85,0,0.055) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 text-center px-6 py-16 sm:py-20 max-w-3xl mx-auto">
        {/* Label */}
        <motion.p
          className="text-white/18 text-[9px] sm:text-[10px] uppercase tracking-[0.55em] mb-8 sm:mb-10"
          style={HEEBO}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          חוויה אינטראקטיבית
        </motion.p>

        {/* Main text */}
        <motion.h2
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span
            className="block text-white"
            style={{
              ...HEEBO,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 7vw, 5.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            עכשיו תרגישו
          </span>
          <span
            className="block"
            style={{
              ...HEEBO,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 7vw, 5.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            איך אתר באמת אמור לזוז.
          </span>
        </motion.h2>

        {/* Divider line */}
        <motion.div
          className="mt-10 sm:mt-12 mx-auto h-px bg-gradient-to-r from-transparent via-white/15 to-transparent max-w-xs"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />

        {/* Arrow bounce */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <path
              d="M3 6l5 5 5-5"
              stroke="rgba(255,85,0,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  )
}
