import { useEffect, useRef, useState } from 'react'
import UrbanJungleTile from './UrbanJungleTile'

// ── Row 1: Hebrew videos ──────────────────────────────────────────────────
const VIDEO_MAP_ROW1: Record<number, string> = {
  0: `${import.meta.env.BASE_URL}videos/yaar.mp4`,
  1: `${import.meta.env.BASE_URL}videos/tile_03.mp4`,
  2: `${import.meta.env.BASE_URL}videos/site5.mp4`,
  3: `${import.meta.env.BASE_URL}videos/site3.mp4`,
  4: `${import.meta.env.BASE_URL}videos/v0609_1.mp4`,
  5: `${import.meta.env.BASE_URL}videos/site6.mp4`,
  6: `${import.meta.env.BASE_URL}videos/site4.mp4`,
  7: `${import.meta.env.BASE_URL}videos/v0609.mp4`,
  8: `${import.meta.env.BASE_URL}videos/site2.mp4`,
  9: `${import.meta.env.BASE_URL}videos/new_site_web.mp4`,
}

// ── Row 2: English GIFs only ──────────────────────────────────────────────
const VIDEO_MAP_ROW2: Record<number, string> = {}

const row1Images = [
  null, null, null, null, null,
  null, null, null, null, null,
]

const row2Images = [
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]


const row1Desktop = [...row1Images, ...row1Images, ...row1Images]
const row2Desktop = [...row2Images, ...row2Images, ...row2Images]

function useTileSize() {
  const [size, setSize] = useState({ w: 540, h: 346 })
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSize({ w: 280, h: 180 })
      else if (window.innerWidth < 1024) setSize({ w: 400, h: 257 })
      else setSize({ w: 540, h: 346 })
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

// ── Tile ─────────────────────────────────────────────────────────────────────
function Tile({
  src,
  isUrban,
  videoSrc,
  w,
  h,
  rounded,
}: {
  src: string | null
  isUrban: boolean
  videoSrc?: string
  w: number
  h: number
  rounded: string
}) {
  // video tile — same height as image tiles, cropped from the top so headers are visible
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        className={`flex-shrink-0 object-cover object-top ${rounded}`}
        style={{ width: w, height: h }}
      />
    )
  }

  if (isUrban) {
    return (
      <div className={`flex-shrink-0 ${rounded} overflow-hidden`} style={{ width: w, height: h }}>
        <UrbanJungleTile width={w} height={h} />
      </div>
    )
  }

  return (
    <img
      src={src!}
      alt=""
      loading="lazy"
      className={`flex-shrink-0 object-cover ${rounded}`}
      style={{ width: w, height: h }}
    />
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)
  const { w, h } = useTileSize()
  const isMobile = w < 340  // mobile breakpoint stays at original threshold

  const gap = isMobile ? 8 : 12
  const rounded = isMobile ? 'rounded-xl' : 'rounded-2xl'

  useEffect(() => {
    if (isMobile) return
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
  }, [isMobile])

  const labelClass = 'text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] mb-3 sm:mb-4 px-4 sm:px-6 uppercase'

  // ── Mobile ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="marquee" ref={sectionRef} className="bg-[#0C0C0C] pt-16 pb-6" dir="ltr">
        <p className="text-white/25 text-[10px] text-center mb-3 tracking-widest uppercase">
          החלק לצפייה
        </p>

        <p className={labelClass} dir="rtl">אתרים בעברית</p>
        <div className="overflow-x-auto scrollbar-hide mb-8" style={{ paddingInline: 16, cursor: 'grab' }}>
          <div className="flex" style={{ gap, width: 'max-content' }}>
            {row1Images.map((src, i) => (
              <Tile
                key={i}
                src={src}
                isUrban={false}
                videoSrc={VIDEO_MAP_ROW1[i]}
                w={w}
                h={h}
                rounded={rounded}
              />
            ))}
          </div>
        </div>

        <p className={labelClass} dir="rtl">אתרים באנגלית</p>
        <div className="overflow-x-auto scrollbar-hide" style={{ paddingInline: 16, cursor: 'grab' }}>
          <div className="flex" style={{ gap, width: 'max-content' }}>
            {row2Images.map((src, i) => (
              <Tile
                key={i}
                src={src}
                isUrban={false}
                videoSrc={VIDEO_MAP_ROW2[i]}
                w={w}
                h={h}
                rounded={rounded}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Desktop ───────────────────────────────────────────────────────────────
  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-10 overflow-hidden"
      dir="ltr"
    >
      <p className={labelClass} dir="rtl">אתרים בעברית</p>
      <div
        className="flex mb-10 sm:mb-14"
        style={{ gap, transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {row1Desktop.map((src, i) => {
          const idx = i % row1Images.length
          return (
            <Tile
              key={i}
              src={src}
              isUrban={false}
              videoSrc={VIDEO_MAP_ROW1[idx]}
              w={w}
              h={h}
              rounded={rounded}
            />
          )
        })}
      </div>

      <p className={labelClass} dir="rtl">אתרים באנגלית</p>
      <div
        className="flex"
        style={{ gap, transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {row2Desktop.map((src, i) => {
          const idx = i % row2Images.length
          return (
            <Tile
              key={i}
              src={src}
              isUrban={false}
              videoSrc={VIDEO_MAP_ROW2[idx]}
              w={w}
              h={h}
              rounded={rounded}
            />
          )
        })}
      </div>
    </section>
  )
}
