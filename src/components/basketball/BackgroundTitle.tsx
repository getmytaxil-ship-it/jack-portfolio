import React, { useEffect, useRef } from 'react';
import { Product } from './types';
import gsap from 'gsap';

interface BackgroundTitleProps {
  product: Product;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

const CinematicText = ({ text, delay }: { text: string, delay: number }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char');

    gsap.killTweensOf(chars);

    gsap.fromTo(chars,
      {
        y: 120,
        opacity: 0,
        scale: 0.8,
        filter: 'blur(15px)',
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 0.4,
        scale: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: 1.4,
        stagger: 0.06,
        ease: "power4.out",
        delay: delay
      }
    );
  }, [text, delay]);

  return (
    <span ref={containerRef} className="inline-flex relative" style={{ perspective: '1000px' }}>
      {text.split('').map((char, i) => (
        <span key={`${text}-${i}`} className="char inline-block will-change-transform origin-bottom" style={{ transformStyle: 'preserve-3d' }}>
          {char}
        </span>
      ))}
    </span>
  );
};

export const BackgroundTitle: React.FC<BackgroundTitleProps> = ({ product, scrollRef }) => {
  const slamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef?.current || !slamRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      if (progress > 0.8) {
        slamRef.current.style.opacity = '0.1';
        slamRef.current.style.transform = `translateY(${(progress - 0.8) * -50}px)`;
      } else {
        slamRef.current.style.opacity = '0';
      }
    };

    const container = scrollRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-[6vh] md:translate-y-0">
        <h1
          key={`title-dt-${product.id}`}
          className="font-display font-bold text-white mix-blend-overlay w-full text-center flex flex-col items-center leading-[0.82] tracking-wider"
          style={{ fontSize: 'clamp(3rem, 22vw, 22rem)' }}
        >
          <span className="block w-full text-center">
            <CinematicText text={product.namePart1} delay={0} />
          </span>
          <span className="block w-full text-center">
            <CinematicText text={product.namePart2} delay={0.2} />
          </span>
        </h1>
      </div>

      <div ref={slamRef} className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-1000">
        <h1 className="font-display text-[18vw] text-white tracking-widest translate-y-[-10vh] font-hebrew uppercase">סלאם</h1>
      </div>
    </div>
  );
};
