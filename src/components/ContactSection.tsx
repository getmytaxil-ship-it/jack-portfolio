import { motion } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] pt-24 pb-20 px-6 flex flex-col items-center text-center"
      dir="rtl"
    >
      <motion.p
        className="text-white/20 text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-5"
        style={HEEBO}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        מעל 50 פרויקטים &nbsp;•&nbsp; לקוחות מרוצים &nbsp;•&nbsp; תוצאות מדידות
      </motion.p>

      <motion.h2
        className="text-white font-black mb-3 leading-tight"
        style={{ ...HEEBO, fontSize: 'clamp(2.2rem, 8vw, 5rem)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        יש לכם פרויקט?
      </motion.h2>

      <motion.p
        className="text-white/35 mb-10 max-w-xs sm:max-w-sm leading-relaxed"
        style={{ ...HEEBO, fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', fontWeight: 300 }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        נשמח לשמוע עליכם ולבנות יחד את הנוכחות הדיגיטלית שלכם.
      </motion.p>

      <motion.a
        href="https://wa.me/972523084834"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-full px-9 py-4 text-white font-bold text-base sm:text-lg cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all duration-200"
        style={{ ...HEEBO, background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        בואו נדבר
        <svg viewBox="0 0 32 32" fill="white" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.33.63 4.51 1.72 6.39L3 29l6.8-1.78A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.85a10.85 10.85 0 0 1-5.54-1.52l-.4-.23-4.04 1.06 1.07-3.93-.26-.41A10.85 10.85 0 1 1 16 26.85zm5.96-8.13c-.33-.16-1.93-.95-2.23-1.06-.3-.1-.51-.16-.73.17-.21.33-.84 1.06-1.03 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.62a9.84 9.84 0 0 1-1.82-2.27c-.19-.33-.02-.5.14-.67.15-.15.33-.38.5-.57.16-.19.21-.33.32-.54.1-.22.05-.41-.03-.57-.08-.16-.73-1.75-.99-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.86.41-.3.33-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.33c.16.22 2.28 3.48 5.53 4.74.77.33 1.38.53 1.85.68.78.25 1.48.21 2.04.13.62-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z" />
        </svg>
      </motion.a>

      <p className="text-white/15 text-xs mt-8" style={HEEBO}>
        © 2025 Nova Digital. כל הזכויות שמורות.
      </p>
    </section>
  )
}
