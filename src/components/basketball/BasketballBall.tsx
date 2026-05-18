import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

function buildTexture() {
  const S = 1024
  const c = document.createElement('canvas')
  c.width = S; c.height = S
  const ctx = c.getContext('2d')!

  // Base
  const g = ctx.createRadialGradient(S * 0.38, S * 0.32, S * 0.08, S * 0.5, S * 0.5, S * 0.72)
  g.addColorStop(0, '#E55800'); g.addColorStop(0.55, '#BF4200'); g.addColorStop(1, '#7A2600')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  // Pebble texture
  for (let i = 0; i < 5000; i++) {
    ctx.beginPath()
    ctx.arc(Math.random() * S, Math.random() * S, Math.random() * 2.2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.13})`
    ctx.fill()
  }

  // Seams
  const drawSeam = (fn: () => void) => {
    ctx.strokeStyle = '#1a0800'; ctx.lineCap = 'round'; fn(); ctx.stroke()
  }

  ctx.lineWidth = 11
  drawSeam(() => { ctx.beginPath(); ctx.moveTo(0, S / 2); ctx.lineTo(S, S / 2) })
  drawSeam(() => { ctx.beginPath(); ctx.moveTo(S / 2, 0); ctx.lineTo(S / 2, S) })

  ctx.lineWidth = 8
  drawSeam(() => {
    ctx.beginPath(); ctx.moveTo(S * 0.25, 0)
    ctx.bezierCurveTo(S * 0.45, S * 0.22, S * 0.06, S * 0.5, S * 0.25, S * 0.78)
  })
  drawSeam(() => {
    ctx.beginPath(); ctx.moveTo(S * 0.25, 0)
    ctx.bezierCurveTo(S * 0.05, S * 0.22, S * 0.44, S * 0.5, S * 0.25, S * 0.78)
  })
  drawSeam(() => {
    ctx.beginPath(); ctx.moveTo(S * 0.75, 0)
    ctx.bezierCurveTo(S * 0.95, S * 0.22, S * 0.56, S * 0.5, S * 0.75, S * 0.78)
  })
  drawSeam(() => {
    ctx.beginPath(); ctx.moveTo(S * 0.75, 0)
    ctx.bezierCurveTo(S * 0.55, S * 0.22, S * 0.94, S * 0.5, S * 0.75, S * 0.78)
  })

  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export default function BasketballBall({
  targetX,
  targetScale,
}: {
  targetX: React.MutableRefObject<number>
  targetScale: React.MutableRefObject<number>
}) {
  const groupRef = useRef<Group>(null)
  const texture = useMemo(() => buildTexture(), [])

  useFrame((_, dt) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += dt * 0.55
    groupRef.current.rotation.x += dt * 0.09
    // Smooth lerp to target position/scale
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, targetX.current, 0.06,
    )
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale.current, 0.06)
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0.05} />
      </mesh>
      {([
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
        [Math.PI / 7, 0, Math.PI / 6],
        [-Math.PI / 7, 0, -Math.PI / 6],
      ] as [number,number,number][]).map((rot, i) => (
        <mesh key={i} rotation={rot}>
          <torusGeometry args={[1.007, 0.012, 8, 120]} />
          <meshStandardMaterial color="#1a0800" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
