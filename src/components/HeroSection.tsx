import { motion } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

const PURPLE_BTN: React.CSSProperties = {
  ...HEEBO,
  background:
    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow:
    '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid white',
  outlineOffset: '-3px',
}

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
      className="relative min-h-[100svh] flex items-center justify-center bg-[#07070d] overflow-hidden"
      dir="ltr"
    >
      {/* ── Video background (serein-inspired) ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src={`${import.meta.env.BASE_URL}videos/0518.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.16 }}
        />
        {/* Gradient vignette over video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(7,7,13,0.72) 60%, rgba(7,7,13,0.97) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,7,13,0.5) 0%, transparent 25%, transparent 72%, rgba(7,7,13,0.9) 100%)',
          }}
        />
      </div>

      {/* ── Cube grid overlay ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(160,160,220,0.045) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(160,160,220,0.045) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '58px 58px',
        }}
      />

      {/* ── Glassmorphism floating navbar (serein-inspired) ─────────────────── */}
      <nav className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-50" dir="ltr">
        <div className="max-w-5xl mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/[0.07] rounded-full shadow-xl">
          <div className="flex items-center justify-between h-12 sm:h-14 px-5 sm:px-7">
            {/* Logo */}
            <motion.div
              className="flex items-baseline gap-[3px] select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-white font-black text-lg tracking-tight" style={HEEBO}>Nova</span>
              <span className="text-white/40 font-light text-lg tracking-tight" style={HEEBO}>Digital</span>
            </motion.div>

            {/* Nav links */}
            <motion.ul
              className="hidden md:flex gap-7"
              dir="rtl"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/38 hover:text-white/80 transition-colors duration-200 text-xs uppercase tracking-widest"
                    style={HEEBO}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="hidden md:inline-flex rounded-full text-white font-medium text-xs uppercase tracking-widest px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
              style={PURPLE_BTN}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              צור קשר
            </motion.a>
          </div>
        </div>
      </nav>

      {/* ── Hero content — centered (serein-inspired layout) ─────────────────── */}
      <div
        dir="rtl"
        className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-16 sm:pt-14 pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-white/22 text-[9px] sm:text-[10px] uppercase tracking-[0.45em] mb-5 sm:mb-6"
          style={HEEBO}
          {...up(0.28)}
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
          }}
          className="text-white mb-5 sm:mb-6"
          {...up(0.36)}
        >
          בונים אתרים<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #d42fcc 0%, #7621B0 65%)',
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
          className="text-white/50 mb-8 sm:mb-10 max-w-xs sm:max-w-sm mx-auto leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)' }}
          {...up(0.46)}
        >
          מעיצוב פיקסל-פרפקט ועד סוכני AI — פתרון דיגיטלי מלא.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center pointer-events-auto"
          {...up(0.56)}
        >
          <a
            href="#contact"
            className="rounded-full text-white font-semibold text-sm px-8 py-3 sm:px-9 sm:py-3.5 cursor-pointer hover:opacity-85 active:scale-[0.97] transition-all"
            style={PURPLE_BTN}
          >
            בואו נדבר
          </a>
          <a
            href="#projects"
            className="rounded-full border border-white/18 text-white/60 hover:text-white hover:border-white/40 font-medium text-sm px-8 py-3 sm:px-9 sm:py-3.5 cursor-pointer transition-colors duration-200 backdrop-blur-sm"
            style={HEEBO}
          >
            ראה עבודות
          </a>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="text-white/16 text-[10px] mt-6"
          style={HEEBO}
          {...up(0.7)}
        >
          מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
        </motion.p>
      </div>

      {/* ── Scroll hint ─────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-white/18 text-[8px] uppercase tracking-[0.35em]" style={HEEBO}>גלול</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
