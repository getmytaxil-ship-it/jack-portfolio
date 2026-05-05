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

// Spline is rendered only on md+ screens — saves mobile resources
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

export default function HeroSection() {
  const isDesktop = useIsDesktop()

  return (
    <section
      className="relative min-h-screen flex items-end bg-[#080808] overflow-hidden"
      dir="ltr"
    >
      {/* ── Spline — desktop only, pointer-events:none so scroll isn't blocked ── */}
      {isDesktop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={<div className="absolute inset-0 bg-[#080808]" />}>
            <Spline scene={SPLINE_SCENE} className="w-full h-full" />
          </Suspense>
        </div>
      )}

      {/* ── Mobile background — subtle radial glow instead of heavy 3D ────────── */}
      {!isDesktop && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(182,0,168,0.18) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(118,33,176,0.12) 0%, transparent 60%)',
            ].join(', '),
          }}
        />
      )}

      {/* ── Desktop gradient — dark LEFT (text), transparent RIGHT (arm) ──────── */}
      {isDesktop && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: [
              'linear-gradient(to right, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.88) 30%, rgba(8,8,8,0.45) 55%, transparent 80%)',
              'linear-gradient(to top, rgba(8,8,8,0.80) 0%, rgba(8,8,8,0.20) 25%, transparent 50%)',
            ].join(', '),
          }}
        />
      )}

      {/* ── Navbar ────────────────────────────────────────────────────────────── */}
      <nav
        dir="ltr"
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-5 sm:px-8 md:px-14 py-5"
      >
        <motion.span
          className="text-white font-black text-xl tracking-tight select-none"
          style={HEEBO}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ג׳ק.
        </motion.span>

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

      {/* ── Hero content ───────────────────────────────────────────────────────
           Desktop: anchored bottom-LEFT so arm is fully visible on the right
           Mobile:  centred, takes full width, larger spacing                  */}
      <div
        className={[
          'relative z-10 pointer-events-none w-full pt-28',
          // desktop — left side, arm has space on the right
          'md:max-w-[52%] lg:max-w-[48%] md:pl-14 md:pr-4 md:pb-24',
          // mobile — full width, comfortable padding
          'px-5 pb-16 sm:px-8 sm:pb-20',
        ].join(' ')}
        dir="rtl"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-white/30 text-[10px] uppercase tracking-[0.35em] mb-4 sm:mb-5"
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
            fontSize: 'clamp(2.6rem, 6.5vw, 6rem)',
            lineHeight: 0.93,
            letterSpacing: '-0.03em',
          }}
          className="text-white mb-4 md:mb-6"
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
          className="text-white/70 mb-3 md:mb-5"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
          {...up(0.50)}
        >
          מעיצוב פיקסל-פרפקט ועד סוכני AI — פתרון דיגיטלי מלא.
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-white/40 mb-7 md:mb-10 max-w-[440px] leading-relaxed"
          style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.82rem, 1.25vw, 0.97rem)' }}
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

        {/* Trust line */}
        <motion.p
          className="text-white/22 text-[11px] mt-5 md:mt-7"
          style={HEEBO}
          {...up(0.88)}
        >
          מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
        </motion.p>
      </div>
    </section>
  )
}
