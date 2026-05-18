import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import BasketballBall from './BasketballBall'

export default function BasketballScene({
  targetX,
  targetScale,
}: {
  targetX: React.MutableRefObject<number>
  targetScale: React.MutableRefObject<number>
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={1.0} color="#FF8833" />
      <pointLight position={[3, -3, 1]} intensity={0.5} color="#330800" />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.6}>
          <BasketballBall targetX={targetX} targetScale={targetScale} />
        </Float>
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.4}
          scale={6}
          blur={2.5}
          far={5}
          color="#FF4400"
        />
      </Suspense>
    </Canvas>
  )
}
