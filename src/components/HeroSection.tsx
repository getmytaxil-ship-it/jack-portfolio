import { motion } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

const navLinks = [
  { label: 'אודות',    href: '#about'    },
  { label: 'שירותים',  href: '#services'  },
  { label: 'פרויקטים', href: '#projects'  },
  { label: 'צור קשר',  href: '#contact'  },
]

const up = (delay: number) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
})

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center bg-white overflow-hidden"
      dir="ltr"
    >
      {/* ── Subtle dot/grid pattern ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '52px 52px',
        }}
      />

      {/* ── Radial fade — hides grid at edges ─────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* ── Glassmorphism navbar (light) ────────────────────────────────────── */}
      <nav className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-50" dir="ltr">
        <motion.div
          className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-black/[0.07] rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between h-12 sm:h-14 px-5 sm:px-7">
            {/* Logo */}
            <div className="flex items-baseline gap-[3px] select-none">
              <span className="text-[#111] font-black text-lg tracking-tight" style={HEEBO}>Nova</span>
              <span className="text-[#111]/35 font-light text-lg tracking-tight" style={HEEBO}>Digital</span>
            </div>

            {/* Nav links */}
            <ul className="hidden md:flex gap-7" dir="rtl">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#111]/45 hover:text-[#111] transition-colors duration-200 text-xs uppercase tracking-widest"
                    style={HEEBO}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex rounded-full bg-[#111] text-white font-medium text-xs uppercase tracking-widest px-5 py-2 cursor-pointer hover:bg-[#333] transition-colors duration-200"
              style={HEEBO}
            >
              צור קשר
            </a>
          </div>
        </motion.div>
      </nav>

      {/* ── Hero content ─────────────────────────────────────────────────────── */}
      <div
        dir="rtl"
        className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-16 sm:pt-14 pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[#111]/28 text-[9px] sm:text-[10px] uppercase tracking-[0.45em] mb-5 sm:mb-6"
          style={HEEBO}
          {...up(0.22)}
        >
          סטודיו לעיצוב ופיתוח דיגיטלי
        </motion.p>

        {/* Main heading */}
        <motion.h1
          style={{
            ...HEEBO,
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 9.5vw, 5.6rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#111',
          }}
          className="mb-5 sm:mb-6"
          {...up(0.32)}
        >
          בונים אתרים<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #c026d3 0%, #7c3aed 65%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            שמשנים עסקים.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-[#111]/45 mb-8 sm:mb-10 max-w-xs sm:max-w-sm mx-auto leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)' }}
          {...up(0.42)}
        >
          מעיצוב פיקסל-פרפקט ועד סוכני AI — פתרון דיגיטלי מלא.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center pointer-events-auto"
          {...up(0.52)}
        >
          <a
            href="#contact"
            className="rounded-full bg-[#111] text-white font-semibold text-sm px-8 py-3 sm:px-9 sm:py-3.5 cursor-pointer hover:bg-[#333] active:scale-[0.97] transition-all duration-200"
            style={HEEBO}
          >
            בואו נדבר
          </a>
          <a
            href="#marquee"
            className="rounded-full border border-black/15 text-[#111]/55 hover:text-[#111] hover:border-black/30 font-medium text-sm px-8 py-3 sm:px-9 sm:py-3.5 cursor-pointer transition-colors duration-200"
            style={HEEBO}
          >
            ראה עבודות
          </a>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="text-[#111]/50 text-xs sm:text-sm font-medium mt-6 tracking-wide"
          style={HEEBO}
          {...up(0.66)}
        >
          מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
        </motion.p>
      </div>

      {/* ── Scroll hint ─────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="text-[#111]/20 text-[8px] uppercase tracking-[0.35em]" style={HEEBO}>גלול</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Fade to dark (transition to next section) ───────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 60%, #0C0C0C 100%)',
        }}
      />
    </section>
  )
}
