import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Snowflake, Maximize, Zap } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_URL = 'https://prod.spline.design/PIgTjpRFA03yfLyK/scene.splinecode'
const MONO: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }
const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

const specs = [
  { label: 'מחסנית',  value: 'React + Spline + Node' },
  { label: 'ביצועים', value: 'V8 Runtime Logic'       },
  { label: 'זמינות',  value: '99.9% High-Avail'       },
  { label: 'עיצוב',   value: 'Pixel-Perfect'          },
]

const pills = [
  { text: 'TS/JS',      active: true  },
  { text: 'תלת-מימד',   active: false },
  { text: 'Full-Stack', active: false },
  { text: 'ענן-מוכן',   active: false },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 0.7, ease: 'easeOut' as const, delay },
})

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [splineReady, setSplineReady] = useState(false)

  // טוען Spline רק כשהסקשן נכנס לתצוגה — שומר על ביצועים
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSplineReady(true); obs.disconnect() } },
      { rootMargin: '200px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
      dir="ltr"          /* LTR layout — זרוע ימינה, טקסט שמאלה */
    >
      {/* ── Spline — ימין בדסקטופ, מלא ברקע במובייל ────────────────────── */}
      {splineReady && (
        <div className="absolute inset-0 z-0 pointer-events-auto md:translate-x-[28%]">
          <Suspense fallback={null}>
            <Spline scene={SPLINE_URL} />
          </Suspense>
        </div>
      )}

      {/* ── גרדיאנט — שמאל כהה (טקסט קריא), ימין שקוף (זרוע נראית) ───── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            /* מובייל: כיסוי מלא מלמעלה + מהשמאל */
            'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%)',
            'linear-gradient(to right, #000 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.35) 70%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* ── תוכן — כל הטקסט שמאלה, לא חוסם את הזרוע ──────────────────── */}
      <div className="relative z-10 pointer-events-none min-h-screen flex flex-col justify-between px-6 sm:px-8 md:px-14 py-14 sm:py-16 md:py-20">

        {/* עליון */}
        <div className="max-w-[420px] space-y-6 sm:space-y-8">

          {/* תווית */}
          <motion.p
            className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={MONO}
            {...fadeUp(0)}
          >
            אודותינו
          </motion.p>

          {/* כותרת */}
          <motion.h2
            dir="rtl"
            style={{
              ...HEEBO,
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 6vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(to right, #fff 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            {...fadeUp(0.08)}
          >
            ג׳ק<br />סטודיו •
          </motion.h2>

          {/* פסקת אודות */}
          <motion.p
            dir="rtl"
            className="text-white/60 leading-relaxed max-w-[340px]"
            style={{ ...HEEBO, fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontWeight: 300 }}
            {...fadeUp(0.16)}
          >
            עם יותר מחמש שנות ניסיון בעיצוב, אנחנו מתמקדים בבניית מותגים,
            עיצוב אתרים וחוויית משתמש ברמות שלא ראית קודם. כל פרויקט
            מקבל עיצוב פיקסל-פרפקט, אנימציה מתקדמת ואדריכלות קוד
            שמביאה את המותג שלך למקום אחר לגמרי.
          </motion.p>

          {/* אייקון-כפתורים */}
          <motion.div className="flex gap-3 pointer-events-auto" {...fadeUp(0.24)}>
            {[Snowflake, Maximize, Zap].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/55 transition-colors duration-200 cursor-pointer"
              >
                <Icon size={14} className="text-white/55" />
              </button>
            ))}
          </motion.div>
        </div>

        {/* תחתון — מפרט + פילים */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 mt-14 md:mt-0">

          {/* מפרט טכני */}
          <motion.div className="w-full md:max-w-[280px] pointer-events-auto" {...fadeUp(0.34)}>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/38 mb-4 sm:mb-5" style={MONO}>
              מפרט טכני
            </p>
            <div className="space-y-3">
              {specs.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-end border-b border-white/10 pb-3 group cursor-default"
                  dir="rtl"
                >
                  <span className="text-xs text-white/50 group-hover:text-white transition-colors duration-200" style={HEEBO}>
                    {label}
                  </span>
                  <span className="text-xs text-white/80" style={MONO}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* פילים */}
          <motion.div className="pointer-events-auto" {...fadeUp(0.44)}>
            <div className="flex flex-wrap gap-2 bg-white/8 backdrop-blur-md rounded-2xl p-2 border border-white/5">
              {pills.map(({ text, active }) =>
                active ? (
                  <span key={text} className="px-3 sm:px-4 py-2 text-[10px] tracking-widest bg-white text-black rounded-full font-semibold" style={MONO}>
                    {text}
                  </span>
                ) : (
                  <span key={text} className="px-3 sm:px-4 py-2 text-[10px] tracking-widest border border-white/18 rounded-full text-white/55 hover:text-white hover:border-white/40 transition-colors duration-200 cursor-default" style={MONO}>
                    {text}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
