import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

const VIDEO_SRC =
  'https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8'

type Phase = 'hero' | 'fly' | 'panel'

// power2.inOut ≈ cubic-bezier(0.45,0,0.55,1)
const EASE = 'cubic-bezier(0.45,0,0.55,1)'

function Char({
  char,
  fly,
  index,
}: {
  char: string
  fly: boolean
  index: number
}) {
  const delay = (index * 0.05).toFixed(3)
  return (
    <span
      style={{
        display: 'inline-block',
        transformOrigin: '50% 100%',
        transform: fly
          ? 'translateY(-260%) scaleY(1.2) scaleX(0.9)'
          : 'translateY(0%) scaleY(1) scaleX(1)',
        opacity: fly ? 0 : 1,
        transition: fly
          ? `transform 0.6s ${EASE} ${delay}s, opacity 0.4s ease ${delay}s`
          : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {char === ' ' ? ' ' : char}
    </span>
  )
}

export default function UrbanJungleTile({
  width = 420,
  height = 270,
}: {
  width?: number
  height?: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState<Phase>('hero')

  // HLS video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.addEventListener('canplay', () => setReady(true), { once: true })
    const play = () => video.play().catch(() => {})
    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30, autoStartLoad: true })
      hls.loadSource(VIDEO_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, play)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC
      play()
    }
  }, [])

  // Animation loop:
  // 0s     → hero  (big text)
  // 2.8s   → fly   (chars exit upward, staggered)
  // 3.5s   → panel (glass panel slides up)
  // 7.5s   → reset
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setPhase('hero')
      timers.push(setTimeout(() => setPhase('fly'),   2800))
      timers.push(setTimeout(() => setPhase('panel'), 3500))
      timers.push(setTimeout(run,                     7500))
    }
    const init = setTimeout(run, 600)
    return () => {
      clearTimeout(init)
      timers.forEach(clearTimeout)
    }
  }, [])

  const flying = phase === 'fly' || phase === 'panel'
  const panelUp = phase === 'panel'

  const line1 = 'שחרר את'
  const line2 = 'הכוח המלא'
  const l1 = line1.split('')
  const l2 = line2.split('')

  return (
    <div
      dir="ltr"
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px`, background: '#05100a' }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      {/* Bottom-to-top dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        }}
      />

      {/* ── Phase 1 + 2: scrollfloat text ────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ padding: '0 14px 14px', lineHeight: 0.85, pointerEvents: 'none' }}
      >
        {/* Line 1 */}
        <div style={{ overflow: 'hidden', display: 'block' }}>
          <div
            style={{
              fontFamily: '"Heebo", sans-serif',
              fontWeight: 900,
              fontSize: '52px',
              color: 'white',
              letterSpacing: '-0.025em',
              opacity: phase === 'panel' ? 0 : 1,
              transition: phase === 'panel' ? 'opacity 0.12s ease' : 'none',
            }}
          >
            {l1.map((c, i) => (
              <Char key={i} char={c} fly={flying} index={i} />
            ))}
          </div>
        </div>

        {/* Line 2 — white-to-green gradient */}
        <div style={{ overflow: 'hidden', display: 'block' }}>
          <div
            style={{
              fontFamily: '"Heebo", sans-serif',
              fontWeight: 900,
              fontSize: '52px',
              letterSpacing: '-0.025em',
              background: 'linear-gradient(90deg, #fff 0%, #a8d4a8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: phase === 'panel' ? 0 : 1,
              transition: phase === 'panel' ? 'opacity 0.12s ease' : 'none',
            }}
          >
            {l2.map((c, i) => (
              <Char key={i} char={c} fly={flying} index={l1.length + i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase 3: glass panel slides up ───────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: panelUp ? 'translateY(0%)' : 'translateY(108%)',
          transition: panelUp
            ? 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.4s ease-in',
          zIndex: 10,
        }}
      >
        <div
          style={{
            margin: '0 8px 8px',
            borderRadius: '18px',
            background: 'rgba(0,0,0,0.16)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '14px 16px 11px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {/* Sub-label */}
          <p
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
              opacity: panelUp ? 1 : 0,
              transform: panelUp ? 'translateY(0px)' : 'translateY(8px)',
              transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s',
            }}
          >
            אודותינו
          </p>

          {/* Main line 1 */}
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: '1.22rem',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                transform: panelUp ? 'translateY(0%)' : 'translateY(110%)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s',
              }}
            >
              הופכים בטון קר
            </p>
          </div>

          {/* Main line 2 — italic green */}
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: '1.22rem',
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                background: 'linear-gradient(90deg, #d4edda 0%, #5fbe5f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: panelUp ? 'translateY(0%)' : 'translateY(110%)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s',
              }}
            >
              לג׳ונגל עירוני
            </p>
          </div>

          {/* Marquee ticker */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              marginTop: '4px',
              paddingTop: '6px',
              overflow: 'hidden',
              opacity: panelUp ? 1 : 0,
              transition: 'opacity 0.4s ease 0.55s',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1.8rem',
                animation: 'uj-marquee 10s linear infinite',
                whiteSpace: 'nowrap',
                width: 'max-content',
              }}
            >
              {[
                'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'תנועה', 'מותג', 'אתרים',
                'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'תנועה', 'מותג', 'אתרים',
              ].map((s, i) => (
                <span
                  key={i}
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: '"Heebo", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.48rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
