import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import Hls from 'hls.js'

const VIDEO_SRC =
  'https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8'

const FLOAT_LINES = ['הטבע', 'חוזר לעיר']

const BRANDS = [
  'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'עיצוב תנועה', 'בניית מותג', 'עיצוב אתרים',
  'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'עיצוב תנועה', 'בניית מותג', 'עיצוב אתרים',
  'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'עיצוב תנועה', 'בניית מותג', 'עיצוב אתרים',
  'ג׳ק סטודיו', 'תלת-מימד', 'רנדרינג', 'עיצוב תנועה', 'בניית מותג', 'עיצוב אתרים',
]

export default function UrbanJungleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const panelWrapRef = useRef<HTMLDivElement>(null)
  const panelInnerRef = useRef<HTMLDivElement>(null)

  const seekPending = useRef(false)
  const currentTarget = useRef(0)
  const [videoReady, setVideoReady] = useState(false)
  const [active, setActive] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const doSeek = () => {
      if (!video.duration) return
      if (video.seeking) { seekPending.current = true; return }
      video.currentTime = currentTarget.current
      seekPending.current = false
    }
    const onSeeked = () => { if (seekPending.current) doSeek() }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('canplay', () => setVideoReady(true), { once: true })

    const prime = () => video.play().then(() => video.pause()).catch(() => {})

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        autoStartLoad: true,
        startLevel: -1,
      })
      hls.loadSource(VIDEO_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        hls.currentLevel = data.levels.length - 1
        prime()
      })
      return () => { hls.destroy(); video.removeEventListener('seeked', onSeeked) }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC
      prime()
      return () => video.removeEventListener('seeked', onSeeked)
    }
  }, [])

  // Scroll → seek video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    return scrollYProgress.on('change', (p) => {
      if (!video.duration) return
      currentTarget.current = p * video.duration
      if (video.seeking) { seekPending.current = true }
      else { video.currentTime = currentTarget.current; seekPending.current = false }
    })
  }, [scrollYProgress])

  // Show/hide fixed elements
  useEffect(() => {
    return scrollYProgress.on('change', (p) => setActive(p > 0.01 && p < 0.99))
  }, [scrollYProgress])

  // ScrollFloat: chars fly upward as you scroll
  useEffect(() => {
    const chars = textRef.current?.querySelectorAll<HTMLElement>('.uj-char')
    if (!chars || chars.length === 0) return
    const total = chars.length
    return scrollYProgress.on('change', (p) => {
      chars.forEach((el, i) => {
        const start = (i / total) * 0.28
        const end = start + 0.12
        const t = Math.max(0, Math.min(1, (p - start) / (end - start)))
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        el.style.transform = `translateY(${ease * 260}%) scaleY(${1 + ease * 0.2}) scaleX(${1 - ease * 0.1})`
        el.style.opacity = String(Math.max(0, 1 - ease * 1.6))
      })
    })
  }, [scrollYProgress])

  // Glass panel slides up
  useEffect(() => {
    const wrap = panelWrapRef.current
    if (!wrap) return
    return scrollYProgress.on('change', (p) => {
      const t = Math.max(0, Math.min(1, (p - 0.75) / 0.22))
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      wrap.style.transform = `translateY(${(1 - ease) * 100}%)`
    })
  }, [scrollYProgress])

  // Mouse parallax on panel
  useEffect(() => {
    const inner = panelInnerRef.current
    if (!inner) return
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      inner.style.transform = `perspective(1000px) rotateY(${cx * 5}deg) rotateX(${-cy * 5}deg) translate3d(${cx * 22}px, ${cy * 22}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '500vh' }}>

      {/* Fixed video background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }}>
        <video
          ref={videoRef}
          muted playsInline crossOrigin="anonymous"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: 'scale(1.35)',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)',
        }} />
      </div>

      {/* ScrollFloat text */}
      <div ref={textRef} style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        zIndex: 10, pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        {FLOAT_LINES.map((line, li) => (
          <div key={li} style={{ overflow: 'hidden', lineHeight: 0.85, display: 'block' }}>
            {line.split('').map((char, ci) => (
              <span key={`${li}-${ci}`} className="uj-char" style={{
                fontFamily: '"Heebo", sans-serif',
                fontSize: 'clamp(4rem, 16vw, 17rem)',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
                transformOrigin: '50% 0%',
              }}>
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Glass panel */}
      <div ref={panelWrapRef} style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        padding: '0 1rem 1rem', zIndex: 20,
        transform: 'translateY(100%)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: active ? 'auto' : 'none',
      }}>
        <div style={{ width: '100%', maxWidth: '1250px', perspective: '1000px' }}>
          <div ref={panelInnerRef} className="uj-panel-inner" style={{
            width: '100%',
            height: 'min(900px, 85vh)',
            borderRadius: '32px',
            backgroundColor: 'rgba(0,0,0,0.18)',
            backdropFilter: 'blur(160px)',
            WebkitBackdropFilter: 'blur(160px)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
          }}>
            {/* Main content */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(2rem, 5vw, 4rem)',
              textAlign: 'center', gap: '1.5rem',
            }}>
              <p style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              }}>אודותינו</p>

              <h2 style={{
                fontFamily: '"Instrument Serif", serif',
                color: 'white',
                fontSize: 'clamp(1.8rem, 5.5vw, 6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                maxWidth: '1000px',
              }}>
                אנו הופכים בטון קר{' '}
                <span style={{ fontStyle: 'italic' }}>לג׳ונגלים עירוניים</span>{' '}
                שוקקי חיים. עיצובינו החדשני מחזיר את{' '}
                <span style={{ fontStyle: 'italic' }}>הטבע</span>{' '}
                הפרוע לערים המודרניות. חוו את{' '}
                <span style={{ fontStyle: 'italic' }}>הפריחה</span>
              </h2>
            </div>

            {/* Bottom marquee */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              padding: '1.4rem 0', overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', gap: '3.5rem',
                animation: 'uj-marquee 18s linear infinite',
                whiteSpace: 'nowrap', width: 'max-content',
              }}>
                {BRANDS.map((name, i) => (
                  <span key={i} style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: '"Heebo", sans-serif',
                    fontWeight: 600, fontSize: '0.78rem',
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                  }}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
