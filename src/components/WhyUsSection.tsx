import { motion } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }
const MONO:  React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }

const reasons = [
  {
    num: '01',
    title: 'עיצוב שמוכר',
    body: 'כל פיקסל נבחר במטרה אחת — להמיר גולש ללקוח. אנחנו לא מעצבים כדי לזכות בפרסים, אנחנו מעצבים כדי שהעסק שלך יגדל.',
  },
  {
    num: '02',
    title: 'קוד ברמה גבוהה',
    body: 'React, TypeScript, ארכיטקטורת קוד שמחזיקה לשנים. אתר שנבנה אצלנו לא קורס בעומס, לא מאט, ולא "נשבר" בעדכון.',
  },
  {
    num: '03',
    title: 'חוויה שזוכרים',
    body: 'אנימציות, מעברים, תנועה — כל אינטראקציה נועדה לגרום למשתמש להרגיש שהוא נמצא בעולם אחר. זה מה שגורם לשיתופים.',
  },
  {
    num: '04',
    title: 'מהרעיון להשקה',
    body: 'ברייפ, עיצוב, פיתוח, השקה — הכל תחת קורת גג אחת. אין העברות בין ספקים, אין תרגומים, אין אובדן חזון.',
  },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const, delay },
})

export default function WhyUsSection() {
  return (
    <section
      className="relative bg-black text-white overflow-hidden py-20 sm:py-28 md:py-36"
      dir="rtl"
    >
      {/* Subtle top border */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,85,0,0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14">

        {/* Header */}
        <div className="mb-16 sm:mb-20 md:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4"
              style={MONO}
              {...fadeUp(0)}
            >
              למה לבחור בנו
            </motion.p>
            <motion.h2
              style={{
                ...HEEBO,
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
              }}
              {...fadeUp(0.06)}
            >
              אנחנו לא בונים אתרים.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>אנחנו מפעילים עסקים.</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-white/38 max-w-[280px] leading-relaxed sm:text-right"
            style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)' }}
            {...fadeUp(0.12)}
          >
            עם מעל 50 פרויקטים שהושקו — אנחנו יודעים מה עובד, מה לא, ואיך לבנות נכון מהיום הראשון.
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {reasons.map(({ num, title, body }, i) => (
            <motion.div
              key={num}
              className="bg-black p-8 sm:p-10 group hover:bg-[#0D0D0D] transition-colors duration-300"
              {...fadeUp(0.06 * i)}
            >
              <p
                className="text-[11px] tracking-[0.3em] text-white/20 mb-5"
                style={MONO}
              >
                {num}
              </p>
              <h3
                className="text-white mb-3 group-hover:text-white transition-colors"
                style={{
                  ...HEEBO,
                  fontWeight: 800,
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </h3>
              <p
                className="text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300"
                style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.82rem, 1.15vw, 0.9rem)' }}
              >
                {body}
              </p>

              {/* Accent line */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(to left, transparent, rgba(255,85,0,0.6))' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/8"
          {...fadeUp(0.3)}
        >
          <p
            className="text-white/30 text-sm"
            style={HEEBO}
          >
            מעל 50 פרויקטים • לקוחות מרוצים • תוצאות מדידות
          </p>
          <a
            href="#contact"
            className="rounded-full text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-3 hover:opacity-85 transition-opacity pointer-events-auto"
            style={{
              ...HEEBO,
              background: 'linear-gradient(135deg,#FF5500 0%,#CC2200 100%)',
              boxShadow: '0 0 32px rgba(255,85,0,0.35)',
            }}
          >
            בואו נדבר
          </a>
        </motion.div>
      </div>
    </section>
  )
}
