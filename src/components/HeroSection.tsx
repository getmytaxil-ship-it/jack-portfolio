import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

const PORTRAIT =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

const navLinks = [
  { label: 'אודות',    href: '#about' },
  { label: 'מחירים',   href: '#price' },
  { label: 'פרויקטים', href: '#projects' },
  { label: 'צור קשר',  href: '#contact' },
]

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
    >
      {/* ── ניווט ────────────────────────────────────────────────────────── */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8">
          {/* לוגו */}
          <span
            className="text-white font-black text-lg sm:text-xl tracking-tight select-none"
            style={{ fontFamily: '"Heebo", sans-serif' }}
          >
            ג׳ק.
          </span>

          {/* קישורי ניווט */}
          <ul className="flex gap-3 sm:gap-5 md:gap-8">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-base hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
                  style={{ fontFamily: '"Heebo", sans-serif' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </FadeIn>

      {/* ── כותרת ענקית ─────────────────────────────────────────────────── */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full mt-4 sm:mt-4 md:-mt-5"
            style={{
              fontSize: 'clamp(13vw, 16vw, 17.5vw)',
              fontFamily: '"Heebo", sans-serif',
            }}
          >
            היי, אני ג׳ק
          </h1>
        </FadeIn>
      </div>

      {/* ── פורטרט — אבסולוטי מרכז-תחתון, זז עם עכבר ───────────────────── */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10
                   top-1/2 -translate-y-1/2
                   sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={PORTRAIT}
            alt="ג׳ק"
            className="w-[220px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* ── שורה תחתונה ──────────────────────────────────────────────────── */}
      <div className="mt-auto flex justify-between items-end pb-5 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-medium text-xs sm:text-sm md:text-base max-w-[160px] sm:max-w-[220px] leading-snug"
            style={{ fontFamily: '"Heebo", sans-serif' }}
          >
            יוצר תלת-מימד שמונע על ידי יצירה
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
