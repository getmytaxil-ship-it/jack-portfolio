import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' }

export default function SolarVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax — video floats upward as you scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  // Dark overlay: starts very dark, clears to reveal video as you enter, darkens on exit
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.65, 1],
    [0.92, 0.08, 0.12, 0.92]
  )

  // Top/bottom fade-out gradients also dim with scroll
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.4, 0.4, 1])

  // Text fades in as video brightens
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1])
  const textY = useTransform(scrollYProgress, [0.15, 0.38], [30, 0])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      style={{ height: 'clamp(480px, 80vh, 800px)' }}
      dir="rtl"
    >
      {/* Video with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: videoY, scale: 1.18 }}
      >
        <video
          src={`${import.meta.env.BASE_URL}videos/0518.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Cinematic dark overlay — YOU control the energy */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Top & bottom fades for seamless transitions */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: fadeOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 78%, #000 100%)',
          }}
        />
      </motion.div>

      {/* Left accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Text content */}
      <motion.div
        className="absolute inset-0 flex items-center z-10 px-7 sm:px-12 md:px-16"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="max-w-xs sm:max-w-sm md:max-w-lg">
          <p
            className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] mb-3 sm:mb-4"
            style={HEEBO}
          >
            פרויקט / אנרגיה סולארית
          </p>
          <h2
            className="text-white font-black leading-[1.05] mb-3 sm:mb-5"
            style={{
              ...HEEBO,
              fontSize: 'clamp(1.7rem, 5.5vw, 3.6rem)',
              letterSpacing: '-0.02em',
            }}
          >
            7 שנות<br />
            <span style={{ color: '#FFD066' }}>חיסכון באנרגיה.</span>
          </h2>
          <p
            className="text-white/45 leading-relaxed"
            style={{ ...HEEBO, fontWeight: 300, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)' }}
          >
            אתר שמוכר את עצמו — ויזואלי, מרשים, ממיר.
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.85], [0, 1, 1, 0]) }}
      >
        <span className="text-white/25 text-[8px] uppercase tracking-[0.4em]" style={HEEBO}>
          גלול
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
