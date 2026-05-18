import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.001 });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.001 });

    const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.2, ease: "power3" });
    const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(followerRef.current, { scale: 3, opacity: 0.15, backgroundColor: '#FF5500', duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.5, backgroundColor: 'transparent', duration: 0.3 });
    } else {
      gsap.to(followerRef.current, { scale: 1, opacity: 0.5, backgroundColor: 'white', duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'white', duration: 0.3 });
    }
  }, [isHovering]);

  return (
    <>
      <style>{`body, a, button { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </>
  );
};
