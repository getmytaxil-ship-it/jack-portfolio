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
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
})

// ── Pure-CSS background — zero WebGL, zero JS, GPU-composited only ───────────
function HeroBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#08080e]" />

      {/* Cube grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(160,160,220,0.055) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(160,160,220,0.055) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '58px 58px',
        }}
      />

      {/* Inner cube highlight — top-left of each cell (3D illusion) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(220,220,255,0.025) 2px, transparent 2px)',
            'linear-gradient(90deg, rgba(220,220,255,0.025) 2px, transparent 2px)',
          ].join(', '),
          backgroundSize: '58px 58px',
          backgroundPosition: '3px 3px',
        }}
      />

      {/* Left-side volumetric glow — cube grid visible on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 110% at 12% 45%, rgba(55,55,100,0.55) 0%, rgba(25,20,55,0.30) 40%, transparent 68%)',
        }}
      />

      {/* Top-left corner highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 5% 5%, rgba(120,100,200,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Right dark fade — keeps Hebrew text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to left, rgba(8,8,14,0.98) 0%, rgba(8,8,14,0.82) 28%, rgba(8,8,14,0.35) 52%, transparent 75%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,14,0.75) 0%, transparent 40%)',
        }}
      />
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center md:justify-end bg-[#08080e] overflow-hidden"
      dir="ltr"
    >
      <HeroBg />

      {/* ── Navbar — absolute so it doesn't affect vertical content flow ───── */}
      <nav
        dir="ltr"
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-5 sm:px-8 md:px-14 py-5"
      >
        <motion.div
          className="flex items-baseline gap-[3px] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-white font-black text-xl tracking-tight" style={HEEBO}>Nova</span>
          <span className="text-white/50 font-light text-xl tracking-tight" style={HEEBO}>Digital</span>
        </motion.div>

        <motion.ul
          className="hidden md:flex gap-7 lg:gap-10"
          dir="rtl"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-white/45 hover:text-white transition-colors duration-200 text-xs sm:text-sm uppercase tracking-widest"
                style={HEEBO}
              >
                {label}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#contact"
          className="hidden md:inline-flex rounded-full text-white font-medium text-xs uppercase tracking-widest px-6 py-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          style={PURPLE_BTN}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          צור קשר
        </motion.a>
      </nav>

      {/* ── Hero content ─────────────────────────────────────────────────────
           Mobile: justify-center centres it vertically + pt-24 clears the nav
           Desktop: justify-end keeps it at bottom, ml-auto pushes it RIGHT     */}
      <div
        dir="rtl"
        className={[
          'relative z-10 pointer-events-none w-full ml-auto',
          'md:max-w-[50%] lg:max-w-[46%] xl:max-w-[42%]',
          'md:pr-14 md:pl-6 md:pb-16 lg:pb-20',
          'px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12 md:pt-0',
        ].join(' ')}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-white/28 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] mb-3 sm:mb-4"
          style={HEEBO}
          {...up(0.28)}
        >
          סטודיו לעיצוב ופיתוח דיגיטלי
        </motion.p>

        {/* Main heading — tighter clamp for desktop readability */}
        <motion.h1
          style={{
            ...HEEBO,
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 4.8vw, 4.8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
          className="text-white mb-3 sm:mb-4 md:mb-5"
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

        {/* Subheading */}
        <motion.p
          className="text-white/68 mb-2 sm:mb-3 md:mb-4"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.88rem, 1.5vw, 1.2rem)' }}
          {...up(0.48)}
        >
          מעיצוב פיקסל-פרפקט ועד סוכני AI — פתרון דיגיטלי מלא.
        </motion.p>

        {/* Description — hidden on small mobile, visible sm+ */}
        <motion.p
          className="hidden sm:block text-white/38 mb-5 md:mb-8 max-w-[420px] leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)' }}
          {...up(0.58)}
        >
          אנחנו בונים אתרים שממירים, מטמיעים סוכני AI שחוסכים שעות עבודה,
          ומעצבים חוויות דיגיטליות שגורמות ללקוחות לחזור. מהרעיון ועד
          ההשקה — הכל תחת קורת גג אחת.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-2.5 sm:gap-3 pointer-events-auto mb-4 sm:mb-5 md:mb-6"
          {...up(0.68)}
        >
          <a
            href="#contact"
            className="rounded-full text-white font-semibold text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 cursor-pointer hover:opacity-85 active:scale-[0.97] transition-all"
            style={PURPLE_BTN}
          >
            בואו נדבר
          </a>
          <a
            href="#projects"
            className="rounded-full border border-white/20 text-white/65 hover:text-white hover:border-white/45 font-medium text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 cursor-pointer transition-colors duration-200"
            style={HEEBO}
          >
            ראה עבודות
          </a>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="text-white/20 text-[10px] sm:text-[11px]"
          style={HEEBO}
          {...up(0.80)}
        >
          מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
        </motion.p>
      </div>

      {/* ── Mobile scroll hint ───────────────────────────────────────────────── */}
      <motion.div
        className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-white/22 text-[9px] uppercase tracking-[0.3em]" style={HEEBO}>גלול</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
