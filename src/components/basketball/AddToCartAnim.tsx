import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from './types';
import { generateBasketballTextures } from './utils/textureGen';
import gsap from 'gsap';
import { audio } from './utils/audio';

interface AddToCartAnimProps {
  product: Product;
  triggerTime: number;
}

interface SingleFlightProps {
  id: number;
  product: Product;
  map: THREE.Texture;
  normalMap: THREE.Texture;
  onComplete: (id: number) => void;
  viewportWidth: number;
  viewportHeight: number;
}

const SingleFlight: React.FC<SingleFlightProps> = ({
  id,
  product,
  map,
  normalMap,
  onComplete,
  viewportWidth,
  viewportHeight
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const TRAIL_COUNT = 12;
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    if (!groupRef.current) return;

    const startPos = new THREE.Vector3(0, 0, 0);
    if (viewportWidth < viewportHeight) startPos.y = 1.2;

    const isMobile = viewportWidth < 6;
    const xOffset = isMobile ? 0.8 : 1.5;
    const yOffset = isMobile ? 0.8 : 1.2;

    const targetPos = new THREE.Vector3(
      (viewportWidth / 2) - xOffset,
      (viewportHeight / 2) - yOffset,
      0
    );

    targetPos.x += (Math.random() - 0.5) * 0.2;
    targetPos.y += (Math.random() - 0.5) * 0.2;

    const flightVector = new THREE.Vector3().subVectors(targetPos, startPos);
    const pullbackVector = flightVector.clone().normalize().negate().multiplyScalar(3.5);

    const baseScale = isMobile ? 0.75 : 0.85;

    if (meshRef.current) {
      meshRef.current.position.copy(startPos);
      meshRef.current.scale.setScalar(baseScale);
      meshRef.current.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    }

    if (flashRef.current) {
      flashRef.current.position.copy(targetPos);
      flashRef.current.position.z = 0.1;
      flashRef.current.scale.setScalar(0.01);
      flashRef.current.visible = false;
      (flashRef.current.material as THREE.MeshBasicMaterial).opacity = 1;
    }

    trailRefs.current.forEach((t) => {
      if (t) {
        t.position.copy(startPos);
        t.scale.setScalar(baseScale);
        t.visible = false;
        (t.material as THREE.MeshStandardMaterial).opacity = 0;
      }
    });

    audio.playSwoosh();

    const tl = gsap.timeline({
      onComplete: () => { onComplete(id); }
    });

    tl.to(groupRef.current!.position, {
      x: pullbackVector.x,
      y: pullbackVector.y,
      z: -5,
      duration: 0.4,
      ease: "back.out(1.5)"
    }, 0);

    tl.to(meshRef.current!.material, {
      emissiveIntensity: 3,
      duration: 0.4,
      ease: "power2.in"
    }, 0);

    const flightDuration = 0.55;
    tl.to(groupRef.current!.position, {
      x: targetPos.x - startPos.x,
      y: targetPos.y - startPos.y,
      z: 0,
      duration: flightDuration,
      ease: "power4.in",
    }, 0.4);

    tl.to(meshRef.current!.rotation, {
      x: "+=" + (Math.PI * 6),
      y: "+=" + (Math.PI * 6),
      duration: flightDuration + 0.4,
      ease: "power1.inOut"
    }, 0);

    trailRefs.current.forEach((trail, i) => {
      if (!trail) return;
      trail.visible = true;
      const delay = 0.4 + (i * 0.015);

      tl.to(trail.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: 0,
        duration: flightDuration,
        ease: "power4.in"
      }, delay);

      tl.to(trail.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.2,
        ease: "power1.in"
      }, delay + flightDuration - 0.2);

      tl.fromTo(trail.material,
        { opacity: 0.4 },
        { opacity: 0, duration: 0.3, delay: delay + flightDuration - 0.3 },
        delay
      );
    });

    const impactTime = 0.4 + flightDuration;

    tl.to(meshRef.current!.scale, {
      x: 0, y: 0, z: 0,
      duration: 0.1,
      ease: "power1.out"
    }, impactTime - 0.05);

    tl.call(() => {
      if (flashRef.current) flashRef.current.visible = true;
      audio.playSuccess();
    }, [], impactTime - 0.05);

    tl.to(flashRef.current!.scale, {
      x: 2.5, y: 2.5, z: 1,
      duration: 0.3,
      ease: "out"
    }, impactTime - 0.05);

    tl.to((flashRef.current!.material as THREE.MeshBasicMaterial), {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in"
    }, impactTime - 0.05);

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <group>
      <group ref={groupRef}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            color={product.primaryColor}
            roughness={0.4}
            metalness={0.1}
            emissive={product.accentColor}
            emissiveIntensity={0}
          />
        </mesh>
      </group>

      <mesh ref={flashRef}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          visible={false}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={product.primaryColor}
            transparent
            opacity={0}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

export const AddToCartAnim: React.FC<AddToCartAnimProps> = ({ product, triggerTime }) => {
  const [flights, setFlights] = useState<number[]>([]);
  const { viewport } = useThree();

  const { map, normalMap } = useMemo(() =>
    generateBasketballTextures(product.primaryColor, product.lineColor, product.texturePattern),
  [product]);

  useEffect(() => {
    if (triggerTime > 0) {
      setFlights(prev => [...prev, triggerTime]);
    }
  }, [triggerTime]);

  const handleFlightComplete = (id: number) => {
    setFlights(prev => prev.filter(flightId => flightId !== id));
  };

  return (
    <>
      {flights.map(flightId => (
        <SingleFlight
          key={flightId}
          id={flightId}
          product={product}
          map={map}
          normalMap={normalMap}
          onComplete={handleFlightComplete}
          viewportWidth={viewport.width}
          viewportHeight={viewport.height}
        />
      ))}
    </>
  );
};
