import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { generateBasketballTextures } from './utils/textureGen';
import { Product } from './types';
import gsap from 'gsap';

interface BasketballProps {
  product: Product;
  scrollContainer?: React.RefObject<HTMLDivElement>;
  isConfigurator?: boolean;
}

export const Basketball: React.FC<BasketballProps> = ({ product, scrollContainer, isConfigurator = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const animRot = useRef({ x: 0, y: 0, z: 0 });
  const manualRot = useRef({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  const { map, normalMap } = useMemo(() =>
    generateBasketballTextures(product.primaryColor, product.lineColor, product.texturePattern),
  [product.primaryColor, product.lineColor, product.texturePattern]);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(animRot.current, {
        y: animRot.current.y + Math.PI * 3,
        x: animRot.current.x + Math.PI * 0.75,
        duration: 1.4,
        ease: "power4.inOut"
      });

      const tl = gsap.timeline();
      tl.to(meshRef.current.scale, {
        x: 0.75, y: 0.75, z: 0.75,
        duration: 0.2,
        ease: "power2.in"
      }).to(meshRef.current.scale, {
        x: 0.85, y: 0.85, z: 0.85,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)"
      });
    }
  }, [product]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // @ts-ignore
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // @ts-ignore
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    isDragging.current = false;
    document.body.style.cursor = 'grab';
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    manualRot.current.y += dx * 0.005;
    manualRot.current.x += dy * 0.005;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isConfigurator) {
      meshRef.current.rotation.x = manualRot.current.x;
      meshRef.current.rotation.y = manualRot.current.y + state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = 0;
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.scale.setScalar(1);
      return;
    }

    let scrollProgress = 0;
    if (scrollContainer && scrollContainer.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
      const maxScroll = scrollHeight - clientHeight;
      scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    }
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

    const viewportWidth = state.viewport.width;
    const viewportHeight = state.viewport.height;
    const isMobile = viewportWidth < viewportHeight;
    const isTablet = !isMobile && viewportWidth < 6.5;

    let heroY = 0;
    if (isMobile) heroY = 1.2;
    else if (isTablet) heroY = -0.3;

    const pos1 = new THREE.Vector3(0, heroY, 0);
    const scale1 = isMobile ? 0.75 : 0.85;

    const pos2 = new THREE.Vector3(-viewportWidth / 2.6, 0, 0);
    const scale2 = isMobile ? 1.0 : 1.7;

    const pos3 = new THREE.Vector3(viewportWidth / 2.6, 0, 0);
    const scale3 = isMobile ? 1.0 : 1.7;

    const pos4 = new THREE.Vector3(0, 0, 0);
    const scale4 = isMobile ? 0.9 : 1.0;

    const pos5 = new THREE.Vector3(0, 0.2, 0);
    const scale5 = isMobile ? 0.9 : 1.0;

    const pos6 = new THREE.Vector3(0, 15, 0);
    const scale6 = 1.0;

    let homePos = new THREE.Vector3();
    let targetScale = 1;
    let rotationSpeed = 1;

    const smoothEase = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    if (scrollProgress <= 0.2) {
      const t = smoothEase(scrollProgress * 5);
      homePos.lerpVectors(pos1, pos2, t);
      targetScale = THREE.MathUtils.lerp(scale1, scale2, t);
    } else if (scrollProgress <= 0.4) {
      const t = smoothEase((scrollProgress - 0.2) * 5);
      homePos.lerpVectors(pos2, pos3, t);
      targetScale = THREE.MathUtils.lerp(scale2, scale3, t);
    } else if (scrollProgress <= 0.6) {
      const t = smoothEase((scrollProgress - 0.4) * 5);
      homePos.lerpVectors(pos3, pos4, t);
      const arcHeight = 4.0;
      homePos.y += Math.sin(t * Math.PI) * arcHeight;
      targetScale = THREE.MathUtils.lerp(scale3, scale4, t);
    } else if (scrollProgress <= 0.8) {
      const t = smoothEase((scrollProgress - 0.6) * 5);
      homePos.lerpVectors(pos4, pos5, t);
      targetScale = THREE.MathUtils.lerp(scale4, scale5, t);
      rotationSpeed = 1 - t;
    } else {
      const t = smoothEase((scrollProgress - 0.8) * 5);
      homePos.lerpVectors(pos5, pos6, t);
      targetScale = THREE.MathUtils.lerp(scale5, scale6, t);
      rotationSpeed = t * 5;
    }

    meshRef.current.position.lerp(homePos, 0.08);

    animRot.current.z = THREE.MathUtils.lerp(animRot.current.z, 0, 0.1);

    if (rotationSpeed > 0.01) {
      animRot.current.x = scrollProgress * Math.PI * 6;
      animRot.current.y += (0.005 + (scrollProgress * 0.1)) * rotationSpeed;
    } else {
      animRot.current.x = THREE.MathUtils.lerp(animRot.current.x, 0, 0.05);
      animRot.current.y += 0.002;
    }

    if (scrollProgress > 0.05 && !isDragging.current) {
      manualRot.current.x = THREE.MathUtils.lerp(manualRot.current.x, 0, 0.1);
      manualRot.current.y = THREE.MathUtils.lerp(manualRot.current.y, 0, 0.1);
    }

    meshRef.current.rotation.x = animRot.current.x + manualRot.current.x;
    meshRef.current.rotation.y = animRot.current.y + manualRot.current.y;
    meshRef.current.rotation.z = animRot.current.z;

    if (scrollProgress < 0.05) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.05 * 0.05;
    }

    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
  });

  const getRoughness = () => (product.id === 3 ? 0.4 : 0.55);
  const getMetalness = () => (product.id === 3 ? 0.2 : 0.1);

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={() => { if (!isDragging.current) document.body.style.cursor = 'grab'; }}
      onPointerOut={() => { if (!isDragging.current) document.body.style.cursor = 'auto'; }}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={map}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.8, 0.8)}
        color={product.primaryColor}
        roughness={getRoughness()}
        metalness={getMetalness()}
        envMapIntensity={0.6}
        side={THREE.FrontSide}
        transparent={false}
        opacity={1}
      />
    </mesh>
  );
};
