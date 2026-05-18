import React, { Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, SpotLight } from '@react-three/drei';
import { Basketball } from './Basketball';
import { Podium } from './Podium';
import { AntiGravityDebris } from './AntiGravityDebris';
import { AddToCartAnim } from './AddToCartAnim';
import { Product } from './types';
import * as THREE from 'three';

interface SceneProps {
  currentProduct: Product;
  scrollContainer: React.RefObject<HTMLDivElement>;
  eventSource?: React.RefObject<HTMLElement>;
  addToCartTrigger: number;
}

const ScrollManager = ({
  scrollContainer,
  setScrollStage
}: {
  scrollContainer: React.RefObject<HTMLDivElement>,
  setScrollStage: (stage: number) => void
}) => {
  useFrame(() => {
    if (scrollContainer.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      if (progress > 0.83) setScrollStage(6);
      else if (progress > 0.66) setScrollStage(5);
      else if (progress > 0.50) setScrollStage(4);
      else if (progress > 0.33) setScrollStage(3);
      else if (progress > 0.16) setScrollStage(2);
      else setScrollStage(1);
    }
  });
  return null;
};

export const Scene: React.FC<SceneProps> = ({ currentProduct, scrollContainer, eventSource, addToCartTrigger }) => {
  const [scrollStage, setScrollStage] = useState(1);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        className="pointer-events-auto"
        eventSource={eventSource?.current ?? undefined}
        eventPrefix="client"
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ScrollManager scrollContainer={scrollContainer} setScrollStage={setScrollStage} />

          <ambientLight intensity={0.4} />
          <SpotLight position={[-5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-bias={-0.0001} color="#ffffff" />
          <spotLight position={[5, 0, -5]} angle={0.5} penumbra={1} intensity={5} color={currentProduct.accentColor} />
          <pointLight position={[-5, 0, 5]} intensity={0.8} color="#4a5568" />

          <Basketball product={currentProduct} scrollContainer={scrollContainer} />

          <AddToCartAnim product={currentProduct} triggerTime={addToCartTrigger} />

          <Podium visible={scrollStage === 5} />

          <AntiGravityDebris product={currentProduct} active={scrollStage === 6} />

          <ContactShadows opacity={0.6} scale={10} blur={2.5} far={4} resolution={256} color="#000000" />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};
