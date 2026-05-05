import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_SCENE = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode'
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
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const, delay },
})

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

export default function HeroSection() {
  const isDesktop = useIsDesktop()

  return (
    <section
      className="relative min-h-[100svh] flex flex-col bg-[#080808] overflow-hidden"
      dir="ltr"
    >
      {/* ── Spline — desktop only ──────────────────────────────────────────── */}
      {isDesktop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={<div className="absolute inset-0 bg-[#080808]" />}>
            <Spline scene={SPLINE_SCENE} className="w-full h-full" />
          </Suspense>
        </div>
      )}

      {/* ── Mobile background glow ────────────────────────────────────────── */}
      {!isDesktop && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse 90% 55% at 50% 105%, rgba(182,0,168,0.20) 0%, transparent 65%)',
              'radial-gradient(ellipse 55% 35% at 85% 15%, rgba(118,33,176,0.14) 0%, transparent 55%)',
            ].join(', '),
          }}
        />
      )}

      {/* ── Desktop gradient — dark LEFT (text), transparent RIGHT (arm) ──── */}
      {isDesktop && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: [
              'linear-gradient(to right, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.90) 28%, rgba(8,8,8,0.50) 52%, transparent 78%)',
              'linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.15) 22%, transparent 45%)',
            ].join(', '),
          }}
        />
      )}

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav
        dir="ltr"
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-5 sm:px-8 md:px-14 py-5"
      >
        {/* Logo */}
        <motion.div
          className="flex items-baseline gap-[3px] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className="text-white font-black text-xl tracking-tight"
            style={HEEBO}
          >
            Nova
          </span>
          <span
            className="text-white/55 font-light text-xl tracking-tight"
            style={HEEBO}
          >
            Digital
          </span>
        </motion.div>

        {/* Nav links */}
        <motion.ul
          className="hidden md:flex gap-7 lg:gap-10"
          dir="rtl"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-white/50 hover:text-white transition-colors duration-200 text-sm uppercase tracking-widest"
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
          className="hidden md:inline-flex rounded-full text-white font-medium text-xs uppercase tracking-widest px-7 py-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          style={PURPLE_BTN}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          צור קשר
        </motion.a>
      </nav>

      {/* ── Spacer — pushes content to the bottom ─────────────────────────── */}
      <div className="flex-1" />

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div
        dir="rtl"
        className={[
          'relative z-10 pointer-events-none w-full',
          // desktop: left half only so arm is free on the right
          'md:max-w-[50%] lg:max-w-[46%] md:pl-14 md:pr-6 md:pb-20',
          // mobile: full width, snug bottom padding
          'px-5 pb-10 sm:px-8 sm:pb-14',
        ].join(' ')}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-white/30 text-[10px] uppercase tracking-[0.35em] mb-4"
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
            fontSize: 'clamp(2.6rem, 6.2vw, 6rem)',
            lineHeight: 0.93,
            letterSpacing: '-0.03em',
          }}
          className="text-white mb-4 md:mb-5"
          {...up(0.38)}
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
          className="text-white/70 mb-3 md:mb-4"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.95rem, 1.7vw, 1.3rem)' }}
          {...up(0.50)}
        >
          מעיצוב פיקסל-פרפקט ועד סוכני AI — פתרון דיגיטלי מלא.
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-white/40 mb-6 md:mb-9 max-w-[440px] leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.80rem, 1.2vw, 0.95rem)' }}
          {...up(0.62)}
        >
          אנחנו בונים אתרים שממירים, מטמיעים סוכני AI שחוסכים שעות עבודה,
          ומעצבים חוויות דיגיטליות שגורמות ללקוחות לחזור. מהרעיון ועד
          ההשקה — הכל תחת קורת גג אחת.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3 pointer-events-auto"
          {...up(0.74)}
        >
          <a
            href="#contact"
            className="rounded-full text-white font-semibold text-sm px-7 py-3 sm:px-8 sm:py-3.5 cursor-pointer hover:opacity-85 active:scale-[0.97] transition-all"
            style={PURPLE_BTN}
          >
            בואו נדבר
          </a>
          <a
            href="#projects"
            className="rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-medium text-sm px-7 py-3 sm:px-8 sm:py-3.5 cursor-pointer transition-colors duration-200"
            style={HEEBO}
          >
            ראה עבודות
          </a>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="text-white/22 text-[11px] mt-4 md:mt-6"
          style={HEEBO}
          {...up(0.88)}
        >
          מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
        </motion.p>
      </div>

      {/* ── Scroll hint — visible on mobile, hidden on desktop ────────────── */}
      <motion.div
        className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-white/25 text-[9px] uppercase tracking-[0.3em]" style={HEEBO}>
          גלול למטה
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
