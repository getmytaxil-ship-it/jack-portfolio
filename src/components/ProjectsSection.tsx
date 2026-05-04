import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'

const projects = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'לקוח',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'אישי',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'לקוח',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

const TOTAL_CARDS = projects.length

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
  sectionProgress: MotionValue<number>
}

function ProjectCard({ project, index, sectionProgress }: ProjectCardProps) {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03
  const rangeStart = index / TOTAL_CARDS
  const scale = useTransform(sectionProgress, [rangeStart, 1], [1, targetScale])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const topOffset = isMobile ? 60 + index * 18 : 96 + index * 28

  return (
    <div className="h-[85vh]">
      <div style={{ position: 'sticky', top: `${topOffset}px` }}>
        <motion.div
          style={{ scale, transformOrigin: 'top center' }}
          className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
        >
          {/* שורה עליונה: מספר, קטגוריה, שם, כפתור */}
          <div
            className="flex items-center justify-between mb-4 sm:mb-6 gap-4"
            dir="ltr"
          >
            <div className="flex items-end gap-3 sm:gap-5 min-w-0">
              <span
                className="font-black text-[#D7E2EA] leading-none flex-shrink-0 select-none"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
              >
                {project.number}
              </span>
              <div className="flex flex-col pb-1 min-w-0">
                <span
                  className="text-[#D7E2EA]/50 uppercase tracking-widest font-medium"
                  style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.9rem)' }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-[#D7E2EA] font-black uppercase leading-tight truncate"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 2.2rem)' }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0">
              <LiveProjectButton />
            </div>
          </div>

          {/* גריד תמונות */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" dir="ltr">
            {/* מובייל: תמונה ראשית מלאה + שתי תמונות צד בצד */}
            {/* דסקטופ: עמודה שמאלית 40% + עמודה ימנית 60% */}

            {/* עמודה שמאלית — מוסתרת במובייל, גלויה מ-sm */}
            <div
              className="hidden sm:flex flex-col gap-3 sm:gap-4 flex-shrink-0"
              style={{ width: '40%' }}
            >
              <img
                src={project.col1[0]}
                alt=""
                className="rounded-[20px] sm:rounded-[28px] md:rounded-[36px] object-cover w-full"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
              <img
                src={project.col1[1]}
                alt=""
                className="rounded-[20px] sm:rounded-[28px] md:rounded-[36px] object-cover w-full"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>

            {/* תמונה ראשית — מלאה במובייל, 60% מ-sm */}
            <div className="flex-1 min-h-0">
              <img
                src={project.col2}
                alt=""
                className="rounded-[20px] sm:rounded-[28px] md:rounded-[36px] object-cover w-full"
                style={{
                  height: 'clamp(220px, 38vw, 580px)',
                }}
              />
            </div>

            {/* שתי תמונות בשורה — גלויות רק במובייל */}
            <div className="flex sm:hidden gap-3">
              <img
                src={project.col1[0]}
                alt=""
                className="rounded-[16px] object-cover flex-1"
                style={{ height: '120px' }}
              />
              <img
                src={project.col1[1]}
                alt=""
                className="rounded-[16px] object-cover flex-1"
                style={{ height: '120px' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          פרויקט
        </h2>
      </FadeIn>

      <div>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            sectionProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
