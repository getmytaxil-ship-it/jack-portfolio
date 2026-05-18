import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HEEBO: React.CSSProperties  = { fontFamily: '"Heebo", sans-serif' }
const ANTON: React.CSSProperties  = { fontFamily: '"Anton", sans-serif' }

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
})

export default function ShowcaseSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1])

  return (
    <section
      className="relative bg-[#050505] overflow-hidden py-14 sm:py-20 md:py-28"
      dir="rtl"
    >
      {/* Eyebrow */}
      <motion.p
        className="text-center text-white/28 text-[10px] uppercase tracking-[0.4em] mb-8 sm:mb-12"
        style={HEEBO}
        {...fadeUp(0)}
      >
        ככה נראים האתרים שלנו
      </motion.p>

      {/* Card */}
      <motion.div
        ref={cardRef}
        style={{ scale }}
        className="relative mx-4 sm:mx-8 md:mx-auto md:max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        {/* Basketball website hero replica */}
        <div
          className="relative w-full flex flex-col items-center justify-center text-center select-none overflow-hidden"
          style={{
            height: 'clamp(280px, 50vw, 560px)',
            background: 'linear-gradient(160deg, #FF5500 0%, #CC3300 35%, #180800 80%, #050000 100%)',
          }}
        >
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize: '180px' }}
          />

          {/* Giant background SLAM */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ overflow: 'hidden' }}
          >
            <span
              className="text-white select-none leading-none"
              style={{
                ...ANTON,
                fontSize: 'clamp(120px, 28vw, 320px)',
                opacity: 0.06,
                letterSpacing: '-0.02em',
              }}
            >
              SLAM
            </span>
          </div>

          {/* Orange glow center */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '60%', height: '60%',
              background: 'radial-gradient(ellipse, rgba(255,85,0,0.35) 0%, transparent 70%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-5 px-6">
            {/* Badge */}
            <span
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-orange-200/70 border border-orange-400/30 rounded-full px-4 py-1.5"
              style={HEEBO}
            >
              חנות כדורסל פרימיום
            </span>

            {/* SLAM DUNK headline */}
            <div className="flex flex-col items-center leading-none gap-0">
              <span
                className="text-white leading-none"
                style={{
                  ...ANTON,
                  fontSize: 'clamp(52px, 10vw, 112px)',
                  letterSpacing: '0.04em',
                  textShadow: '0 0 40px rgba(255,120,0,0.6)',
                }}
              >
                SLAM
              </span>
              <span
                className="leading-none"
                style={{
                  ...ANTON,
                  fontSize: 'clamp(52px, 10vw, 112px)',
                  letterSpacing: '0.04em',
                  WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                  color: 'transparent',
                }}
              >
                DUNK
              </span>
            </div>

            {/* Hebrew sub-headline */}
            <p
              className="text-white/55 text-sm sm:text-base"
              style={{ ...HEEBO, fontWeight: 300 }}
              dir="rtl"
            >
              ציוד לשחקנים שרוצים לנצח
            </p>

            {/* Mock CTA button */}
            <button
              className="mt-1 sm:mt-2 rounded-full text-black text-xs sm:text-sm font-bold uppercase tracking-widest px-6 sm:px-8 py-2.5 sm:py-3 cursor-default pointer-events-none"
              style={{
                ...HEEBO,
                background: '#FF5500',
                boxShadow: '0 0 24px rgba(255,85,0,0.55)',
              }}
            >
              קנה עכשיו
            </button>
          </div>

          {/* Bottom gradient fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)' }}
          />
        </div>

        {/* Bottom bar — like a browser footer */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
          style={{ background: '#0E0E0E', borderTop: '1px solid rgba(255,85,0,0.12)' }}
        >
          <span className="text-white/25 text-[10px] sm:text-xs tracking-wide" style={HEEBO}>
            slamdunk.co.il
          </span>
          <div className="flex gap-1.5">
            {['#FF5500','#FF8833','#FFB366'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom copy */}
      <div className="text-center mt-10 sm:mt-14 px-4 space-y-3 sm:space-y-4">
        <motion.h2
          className="text-white font-black"
          style={{
            ...HEEBO,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.02em',
          }}
          {...fadeUp(0.08)}
        >
          תחוו חוויה ברמה אחרת
        </motion.h2>
        <motion.p
          className="text-white/45 max-w-[480px] mx-auto leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
          {...fadeUp(0.16)}
        >
          כל אתר שאנחנו בונים נותן לגולשים תחושה כזאת — עיצוב שמוכר, אנימציה שמרשימה, קוד שמבצע.
        </motion.p>
      </div>
    </section>
  )
}
