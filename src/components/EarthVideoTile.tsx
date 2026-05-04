import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

const EARTH_SRC =
  'https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8'

// טקסט דרמטי לשתי שורות — סגנון ScrollFloat
const LINE_1 = 'שחרר את'
const LINE_2 = 'הכוח המלא'

export default function EarthVideoTile() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => video.play().catch(() => {})

    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30, autoStartLoad: true })
      hls.loadSource(EARTH_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, play)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = EARTH_SRC
      play()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onCanPlay = () => {
      setReady(true)
      // מפעיל את עליית הטקסט אחרי 0.6 שניות מרגע שהוידאו זז
      setTimeout(() => setAnimate(true), 600)
    }
    video.addEventListener('canplay', onCanPlay, { once: true })
    return () => video.removeEventListener('canplay', onCanPlay)
  }, [])

  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{ width: '420px', height: '270px', background: '#000' }}
    >
      {/* וידאו */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: ready ? 1 : 0 }}
      />

      {/* Skeleton */}
      {!ready && (
        <div className="absolute inset-0 bg-[#0a0a0a] animate-pulse" />
      )}

      {/* גרדיאנט — בדיוק כמו ScrollFloat, כהה מלמטה */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        }}
      />

      {/* טקסט — עולה מלמטה תוך כדי תנועת הוידאו */}
      <div
        className="absolute bottom-0 left-0 w-full px-5 pb-5 pointer-events-none"
        style={{ lineHeight: 0.85 }}
      >
        {/* שורה 1 */}
        <div style={{ overflow: 'hidden' }}>
          <p
            className="text-white font-black uppercase"
            style={{
              fontSize: 'clamp(1.6rem, 5.5vw, 2.6rem)',
              letterSpacing: '-0.01em',
              transform: animate ? 'translateY(0)' : 'translateY(110%)',
              opacity: animate ? 1 : 0,
              transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
              transitionDelay: '0ms',
            }}
          >
            {LINE_1}
          </p>
        </div>

        {/* שורה 2 */}
        <div style={{ overflow: 'hidden' }}>
          <p
            className="font-black uppercase"
            style={{
              fontSize: 'clamp(1.6rem, 5.5vw, 2.6rem)',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(90deg, #fff 30%, #8ba8be 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: animate ? 'translateY(0)' : 'translateY(110%)',
              opacity: animate ? 1 : 0,
              transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
              transitionDelay: '100ms',
            }}
          >
            {LINE_2}
          </p>
        </div>

        {/* שורה 3 — כיתוב קטן */}
        <p
          className="text-white/40 font-medium uppercase mt-2"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            opacity: animate ? 0.4 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: '260ms',
          }}
        >
          Jack — יוצר תלת-מימד
        </p>
      </div>
    </div>
  )
}
