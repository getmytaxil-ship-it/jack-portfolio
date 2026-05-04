import { useEffect, useRef, useState } from 'react'
import UrbanJungleTile from './UrbanJungleTile'

const EARTH_INDEX = 5

const row1Images = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  null,
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
]

const row2Images = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const row1 = [...row1Images, ...row1Images, ...row1Images]
const row2 = [...row2Images, ...row2Images, ...row2Images]

// גודל tile לפי גודל מסך — קטן במובייל, מלא בדסקטופ
function useTileSize() {
  const [size, setSize] = useState({ w: 420, h: 270 })
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSize({ w: 260, h: 167 })
      else if (window.innerWidth < 1024) setSize({ w: 340, h: 218 })
      else setSize({ w: 420, h: 270 })
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)
  const { w, h } = useTileSize()

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY
      const newOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tileStyle = { width: `${w}px`, height: `${h}px` }
  const gap = w < 350 ? '8px' : '12px'

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-6 sm:pb-10 overflow-hidden"
      dir="ltr"
    >
      {/* שורה 1 — נעה ימינה */}
      <div
        className="flex mb-2 sm:mb-3"
        style={{ gap, transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {row1.map((src, i) => {
          if (i % row1Images.length === EARTH_INDEX) {
            return (
              <div key={`urban-${i}`} className="flex-shrink-0" style={tileStyle}>
                <UrbanJungleTile width={w} height={h} />
              </div>
            )
          }
          return (
            <img
              key={i}
              src={src!}
              alt=""
              loading="lazy"
              className="rounded-xl sm:rounded-2xl object-cover flex-shrink-0"
              style={tileStyle}
            />
          )
        })}
      </div>

      {/* שורה 2 — נעה שמאלה */}
      <div
        className="flex"
        style={{ gap, transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {row2.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-xl sm:rounded-2xl object-cover flex-shrink-0"
            style={tileStyle}
          />
        ))}
      </div>
    </section>
  )
}
