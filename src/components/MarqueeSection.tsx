import { useEffect, useRef, useState } from 'react'
import UrbanJungleTile from './UrbanJungleTile'

const EARTH_INDEX = 5
// Video tiles — index in row1Images that is replaced by a local video
const VIDEO_INDEX_ROW1 = 0
const VIDEO_SRC_ROW1 = `${import.meta.env.BASE_URL}videos/tile_01.mp4`

const row1Images = [
  null, // ← video tile (tile_01.mp4)
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  null, // ← Urban Jungle tile
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

const row1Desktop = [...row1Images, ...row1Images, ...row1Images]
const row2Desktop = [...row2Images, ...row2Images, ...row2Images]

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

// ── Tile ─────────────────────────────────────────────────────────────────────
function Tile({
  src,
  isUrban,
  isVideo,
  videoSrc,
  w,
  h,
  rounded,
}: {
  src: string | null
  isUrban: boolean
  isVideo?: boolean
  videoSrc?: string
  w: number
  h: number
  rounded: string
}) {
  if (isUrban) {
    return (
      <div className={`flex-shrink-0 ${rounded} overflow-hidden`} style={{ width: w, height: h }}>
        <UrbanJungleTile width={w} height={h} />
      </div>
    )
  }

  if (isVideo && videoSrc) {
    return (
      <video
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        className={`flex-shrink-0 object-cover ${rounded}`}
        style={{ width: w, height: h }}
      />
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
  const isMobile = w < 340

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

  // ── Mobile ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section ref={sectionRef} className="bg-[#0C0C0C] pt-16 pb-6" dir="ltr">
        <p className="text-white/25 text-[10px] text-center mb-3 tracking-widest uppercase">
          החלק לצפייה
        </p>

        <div className="overflow-x-auto scrollbar-hide mb-2" style={{ paddingInline: 16, cursor: 'grab' }}>
          <div className="flex" style={{ gap, width: 'max-content' }}>
            {row1Images.map((src, i) => (
              <Tile
                key={i}
                src={src}
                isUrban={i === EARTH_INDEX}
                isVideo={i === VIDEO_INDEX_ROW1}
                videoSrc={VIDEO_SRC_ROW1}
                w={w}
                h={h}
                rounded={rounded}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide" style={{ paddingInline: 16, cursor: 'grab' }}>
          <div className="flex" style={{ gap, width: 'max-content' }}>
            {row2Images.map((src, i) => (
              <Tile
                key={i}
                src={src}
                isUrban={false}
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
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-6 sm:pb-10 overflow-hidden"
      dir="ltr"
    >
      <div
        className="flex mb-2 sm:mb-3"
        style={{ gap, transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {row1Desktop.map((src, i) => (
          <Tile
            key={i}
            src={src}
            isUrban={i % row1Images.length === EARTH_INDEX}
            isVideo={i % row1Images.length === VIDEO_INDEX_ROW1}
            videoSrc={VIDEO_SRC_ROW1}
            w={w}
            h={h}
            rounded={rounded}
          />
        ))}
      </div>

      <div
        className="flex"
        style={{ gap, transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {row2Desktop.map((src, i) => (
          <Tile
            key={i}
            src={src}
            isUrban={false}
            w={w}
            h={h}
            rounded={rounded}
          />
        ))}
      </div>
    </section>
  )
}
