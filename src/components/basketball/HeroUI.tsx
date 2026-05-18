import React, { useEffect, useRef } from 'react';
import { Product } from './types';
import gsap from 'gsap';
import { BackgroundTitle } from './BackgroundTitle';
import { Navigation } from './Navigation';
import { audio } from './utils/audio';

interface HeroUIProps {
  product: Product;
  onNext: () => void;
  onPrev: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  cartCount: number;
  onAddToCart: () => void;
  onCustomize: () => void;
  onOpenCart: () => void;
}

export const HeroUI: React.FC<HeroUIProps> = ({ product, onNext, onPrev, scrollRef, cartCount, onAddToCart, onCustomize, onOpenCart }) => {
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priceRef.current) {
      gsap.fromTo(priceRef.current,
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
    }
  }, [product.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (scrollRef.current) {
      const elements = scrollRef.current.querySelectorAll('.animate-item');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [product]);

  return (
    <div ref={scrollRef} className="absolute inset-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar snap-y snap-mandatory">

      {/* --- SECTION 1: HERO --- */}
      <div className="relative w-full h-full min-h-full flex flex-col md:block snap-start">
        <div className="absolute top-0 left-0 w-full z-50">
          <Navigation cartCount={cartCount} onCustomize={onCustomize} onOpenCart={onOpenCart} />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <BackgroundTitle product={product} scrollRef={scrollRef} />
        </div>
        <div className="relative w-full h-full pointer-events-none flex flex-col justify-end z-10">
          <div className="md:hidden w-full h-[20vh] shrink-0"></div>

          <div
            className="hidden md:flex absolute right-[10%] top-[20%] items-center gap-4 pointer-events-auto cursor-pointer group hover:scale-105 transition-transform duration-300 interactive"
            onMouseEnter={() => audio.playHover()}
            onClick={() => audio.playClick()}
          >
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all backdrop-blur-sm">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-white border-b-[6px] border-b-transparent mr-1"></div>
            </div>
            <div className="text-white text-xs font-light leading-tight opacity-70 group-hover:opacity-100 transition-opacity font-hebrew">סרטון<br />קידום</div>
          </div>

          <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent">
            <span className="absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-widest font-mono" style={{ color: product.accentColor }}>90/10</span>
          </div>

          <div className="w-full px-6 md:px-16 pb-6 md:pb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mt-auto md:mt-0 pointer-events-none">
            <div className="flex flex-col gap-2 w-full md:w-auto text-center md:text-right pointer-events-auto items-center md:items-start">
              <div key={`price-${product.id}`} ref={priceRef} className="font-sans text-6xl md:text-5xl font-light tracking-wide drop-shadow-2xl" style={{ color: product.accentColor }}>${product.price}</div>
              <div className="text-gray-400 text-xs tracking-wider uppercase font-medium flex items-center gap-2 font-hebrew">מידה: <span className="text-white">29.5"</span> <span className="w-1 h-1 bg-white/50 rounded-full"></span> רשמי</div>
            </div>

            <div className="w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12 pointer-events-auto order-last md:order-none mt-4 md:mt-0 flex justify-center gap-4">
              <button
                onClick={onAddToCart}
                onMouseEnter={() => audio.playHover()}
                className="interactive group relative w-full md:w-auto overflow-hidden rounded-sm px-14 py-5 shadow-glow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: product.accentColor }}
              >
                <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <span className="relative z-10 text-white font-bold text-sm tracking-[0.2em] uppercase font-hebrew">הוסף לסל</span>
              </button>
            </div>

            <div className="absolute top-1/2 left-4 -translate-y-1/2 md:static md:translate-y-0 flex flex-col items-start gap-8 pointer-events-auto">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button onClick={onPrev} onMouseEnter={() => audio.playHover()} className="interactive nav-btn group" aria-label="Previous">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transform scale-x-[-1]"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </div>
                </button>
                <button onClick={onNext} onMouseEnter={() => audio.playHover()} className="interactive nav-btn group" aria-label="Next">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transform scale-x-[-1]"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: TECH SPECS --- */}
      {/* Ball moves to the physical LEFT → text is anchored to the physical RIGHT */}
      <div className="relative w-full h-full min-h-full snap-start overflow-hidden pointer-events-none">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5"></div>
        </div>

        {/* Text panel — mobile: bottom strip | desktop: right side */}
        <div
          className="absolute inset-x-4 bottom-6 md:bottom-auto md:right-14 md:left-auto md:inset-x-auto md:inset-y-0 md:w-[42%] flex flex-col justify-end md:justify-center gap-4 md:gap-8 pb-2 md:py-20 pointer-events-auto"
          dir="rtl"
        >
          <div className="animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-100">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0"></span>
              <span className="text-[10px] font-mono text-brand-orange tracking-widest font-hebrew uppercase">מדדי ביצועים</span>
            </div>
            <h2 className="font-display text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight font-hebrew uppercase">
              שליטה<br />אבסולוטית
            </h2>
          </div>

          <div className="hidden md:block space-y-6">
            <div className="animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-200 border-r-2 border-brand-orange pr-5">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-hebrew">קומפוזיט מיקרופייבר</div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-hebrew">
                חומר ציפוי בלעדי המספק ניהול אחיזה מעולה בכל תנאי מזג האוויר.
              </p>
            </div>
            <div className="animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-300 border-r-2 border-white/25 pr-5">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                0.5<span className="text-xl text-gray-500">מ"מ</span>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-hebrew">עומק חריצים</div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-hebrew">
                מרקם פנים מותאם לטיפול מדויק ומשוב סיבובי.
              </p>
            </div>
          </div>

          {/* Stat cards — desktop only */}
          <div className="hidden md:flex animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-500 gap-3">
            <div className="flex-1 p-4 border border-white/10 bg-black/50 backdrop-blur-md rounded-xl">
              <div className="text-[10px] text-gray-500 font-mono mb-2 font-hebrew uppercase">איזון משקל</div>
              <div className="w-full h-[3px] bg-gray-800 rounded-full mb-2 overflow-hidden">
                <div className="w-[95%] h-full bg-white rounded-full"></div>
              </div>
              <div className="flex justify-between text-white font-bold text-sm font-hebrew">
                <span>95%</span><span className="text-gray-400 font-normal">מושלם</span>
              </div>
            </div>
            <div className="flex-1 p-4 border border-white/10 bg-black/50 backdrop-blur-md rounded-xl">
              <div className="text-[10px] text-gray-500 font-mono mb-2 font-hebrew uppercase">עקביות ניתור</div>
              <div className="w-full h-[3px] bg-gray-800 rounded-full mb-2 overflow-hidden">
                <div className="w-[99%] h-full bg-brand-orange rounded-full"></div>
              </div>
              <div className="flex justify-between text-white font-bold text-sm font-hebrew">
                <span>99%</span><span className="text-gray-400 font-normal">אחיד</span>
              </div>
            </div>
          </div>

          {/* Mobile compact stats */}
          <div className="flex md:hidden gap-4 animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-200">
            <div className="border-r-2 border-brand-orange pr-3">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wider font-hebrew">מיקרופייבר</div>
            </div>
            <div className="border-r-2 border-white/25 pr-3">
              <div className="text-2xl font-bold text-white">0.5<span className="text-sm text-gray-500">מ"מ</span></div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wider font-hebrew">עומק חריץ</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: AERODYNAMICS --- */}
      {/* Ball moves to the physical RIGHT → text is anchored to the physical LEFT */}
      <div className="relative w-full h-full min-h-full snap-start overflow-hidden pointer-events-none">
        {/* Background flow lines */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M -100 ${80 + i * 90} C 500 ${80 + i * 90}, 700 ${130 + i * 90}, 2000 ${80 + i * 90}`} fill="none" stroke="white" strokeWidth="1" strokeDasharray="12 6" style={{ animationDuration: `${4 + i}s` }} />
            ))}
          </svg>
        </div>

        {/* Text panel — mobile: bottom strip | desktop: left side */}
        <div
          className="absolute inset-x-4 bottom-6 md:bottom-auto md:left-14 md:right-auto md:inset-x-auto md:inset-y-0 md:w-[42%] flex flex-col justify-end md:justify-center gap-4 md:gap-8 pb-2 md:py-20 pointer-events-auto"
          dir="rtl"
        >
          <div className="animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-100">
            <div className="hidden md:inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono text-white/70 mb-4 tracking-widest font-hebrew uppercase">
              אווירודינמיקה
            </div>
            <div className="flex md:hidden items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white/40 shrink-0"></span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest font-hebrew uppercase">אווירודינמיקה</span>
            </div>
            <h2 className="font-display text-3xl md:text-7xl lg:text-8xl text-white leading-[0.9] font-hebrew">
              מעוף<br />מושלם
            </h2>
          </div>

          {/* Desktop full stats */}
          <div className="hidden md:flex animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-200 flex-col gap-5">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 border border-white/15 rounded-full flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors">
                <div className="w-2 h-2 bg-white rounded-full group-hover:bg-brand-orange transition-colors"></div>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono text-white group-hover:text-brand-orange transition-colors leading-none">0.85</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-hebrew">מקדם גרר</div>
              </div>
            </div>
            <div className="h-[1px] bg-white/10"></div>
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 border border-white/15 rounded-full flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors">
                <div className="w-2 h-2 bg-white rounded-full group-hover:bg-brand-orange transition-colors"></div>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono text-white group-hover:text-brand-orange transition-colors leading-none">28.5</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-hebrew">יציבות סיבובית</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-400 border-r-2 border-white/10 pr-5">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-hebrew">
              חלוקת משקל מאוזנת וסימטרית מבטיחה נתיב טיסה אמיתי ומהירות סיבוב עקבית.
            </p>
          </div>

          {/* Mobile compact stats */}
          <div className="flex md:hidden gap-4 animate-item transition-all duration-1000 opacity-0 translate-y-8 delay-200">
            <div className="border-r-2 border-white/30 pr-3">
              <div className="text-2xl font-bold font-mono text-white">0.85</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wider font-hebrew">מקדם גרר</div>
            </div>
            <div className="border-r-2 border-white/15 pr-3">
              <div className="text-2xl font-bold font-mono text-white">28.5</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wider font-hebrew">יציבות סיבובית</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: RINGS --- */}
      <div className="relative w-full h-full min-h-full flex items-center justify-center px-8 pointer-events-none snap-start overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-60">
          <svg className="w-full h-full animate-spin [animation-duration:30s]">
            <circle cx="275" cy="275" r="270" stroke="white" strokeWidth="1" fill="none" strokeDasharray="20 10" opacity="0.3" />
            <path d="M 275 0 L 275 20 M 275 530 L 275 550 M 0 275 L 20 275 M 530 275 L 550 275" stroke={product.accentColor} strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-80">
          <svg className="w-full h-full animate-spin [animation-duration:20s] [animation-direction:reverse]">
            <circle cx="200" cy="200" r="198" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
            <circle cx="200" cy="200" r="190" stroke={product.accentColor} strokeWidth="1" fill="none" strokeDasharray="50 150" opacity="0.6" />
          </svg>
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 L1,3 Z" fill="white" />
            </marker>
          </defs>
          <g className="animate-item opacity-0 transition-opacity duration-1000 delay-200">
            <path d="M 20% 25% L 35% 25% L 40% 40%" stroke="white" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
            <text x="20%" y="22%" fill="white" fontSize="10" fontFamily="Heebo">מיקרו-מרקם</text>
          </g>
          <g className="animate-item opacity-0 transition-opacity duration-1000 delay-500">
            <path d="M 80% 75% L 65% 75% L 60% 60%" stroke="white" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
            <text x="75%" y="79%" fill="white" fontSize="10" fontFamily="Heebo" textAnchor="end">עומק ערוץ</text>
          </g>
          <text x="90%" y="50%" fill="white" fontSize="9" fontFamily="monospace" textAnchor="end" opacity="0.6" className="animate-pulse">AZIMUTH: 45.2°</text>
          <text x="10%" y="50%" fill="white" fontSize="9" fontFamily="monospace" textAnchor="start" opacity="0.6" className="animate-pulse">ELEVATION: 12.8°</text>
          <rect x="48%" y="90%" width="4%" height="2" fill={product.accentColor} className="animate-pulse" />
        </svg>
        <div className="absolute top-[20%] left-6 md:top-[25%] md:left-[10%] pointer-events-auto animate-item opacity-0 -translate-x-5 transition-all duration-700 delay-100">
          <div className="border-l-2 border-white pl-4">
            <div className="text-3xl text-white font-bold tracking-tighter">1.2מ"מ</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-hebrew">גובה בליטה</div>
          </div>
        </div>
        <div className="absolute bottom-[20%] right-6 md:bottom-[25%] md:right-[10%] pointer-events-auto animate-item opacity-0 translate-x-5 transition-all duration-700 delay-300 text-right">
          <div className="border-r-2 border-white pr-4">
            <div className="text-3xl text-white font-bold tracking-tighter">אחיזה גבוהה</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-hebrew">מפרט ציפוי</div>
          </div>
        </div>
      </div>

      {/* --- SECTION 5: PODIUM --- */}
      <div className="relative w-full h-full min-h-full flex flex-col items-center justify-start pt-16 px-6 pointer-events-none snap-start">
        <div className="text-center pointer-events-auto z-20 relative -mt-7">
          <div className="inline-flex flex-col items-center">
            <div className="text-xs font-mono text-gray-400 tracking-[0.5em] mb-2 font-hebrew uppercase">מהדורה מוגבלת</div>
            <h2 className="animate-item transition-all duration-1000 opacity-0 translate-y-[-20px] delay-100 font-display text-5xl md:text-7xl text-white tracking-[0.1em] drop-shadow-lg font-hebrew">
              האלוף
            </h2>
          </div>
        </div>

        <div className="flex w-full items-start justify-between pointer-events-none px-2 md:px-10 mt-32 max-w-full">
          <div className="flex flex-col items-end text-right pointer-events-auto z-10">
            <div className="animate-item transition-all duration-1000 opacity-0 translate-x-10 delay-200">
              <div className="text-xs font-mono text-brand-orange mb-2 tracking-widest font-hebrew">דירוג 01</div>
              <h3 className="text-white font-sans font-bold text-2xl mb-1 font-hebrew">רמת עילית</h3>
              <div className="h-[1px] w-20 bg-white/30 my-2 ml-auto"></div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] font-hebrew">
                בנוי לרמה הגבוהה ביותר של תחרות.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start text-left pointer-events-auto z-10">
            <div className="animate-item transition-all duration-1000 opacity-0 -translate-x-10 delay-300">
              <div className="text-xs font-mono text-brand-orange mb-2 tracking-widest font-hebrew">מאושר</div>
              <h3 className="text-white font-sans font-bold text-2xl mb-1 font-hebrew">תקן זהב</h3>
              <div className="h-[1px] w-20 bg-white/30 my-2"></div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] font-hebrew">
                עומד בכל דרישות המשקל והגודל התקניות.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 6: FOOTER --- */}
      <div className="relative w-full h-full min-h-full flex flex-col items-center justify-center pb-20 pointer-events-none snap-start overflow-hidden">
        <div className="z-20 pointer-events-auto text-center flex flex-col items-center justify-center w-full px-6 max-w-7xl mx-auto">
          <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-100 relative w-full">
            <div className="inline-block px-4 py-1 border border-brand-orange rounded-full text-[10px] font-mono text-brand-orange tracking-widest mb-10 bg-black/50 backdrop-blur-sm font-hebrew">
              ביצועים ברמה הבאה
            </div>

            <h3 className="flex flex-col items-center justify-center text-[15vw] md:text-[9rem] font-display uppercase tracking-tight leading-[0.8] mb-8 drop-shadow-2xl font-hebrew">
              <span className="text-outline text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>לנצח את</span>
              <span className="text-white font-bold relative flex items-center gap-2">
                המשיכה<span className="text-brand-orange">.</span>
              </span>
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/10 py-8 my-10 gap-6 md:gap-0 bg-black/20 backdrop-blur-sm px-8">
              <div className="flex gap-8 text-[11px] font-mono tracking-[0.2em] text-gray-400 uppercase font-hebrew">
                <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div>חנות רשמית</span>
                <span className="hidden md:inline text-white/20">|</span>
                <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div>משלוח גלובלי</span>
              </div>

              <div className="flex items-center gap-10 text-white opacity-80 mt-4 md:mt-0">
                <a href="#" className="interactive hover:text-brand-orange transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="interactive hover:text-brand-orange transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="#" className="interactive hover:text-brand-orange transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </a>
              </div>

              <div className="flex gap-4 text-[11px] font-mono tracking-[0.2em] text-gray-400 uppercase mt-4 md:mt-0 font-hebrew">
                <span>תשלום מאובטח</span>
              </div>
            </div>

            <button
              onClick={onAddToCart}
              onMouseEnter={() => audio.playHover()}
              className="interactive group relative overflow-hidden bg-white text-black px-16 py-5 font-bold uppercase tracking-wider hover:bg-brand-orange hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-glow"
            >
              <span className="relative z-10 font-hebrew">לקולקציה המלאה</span>
            </button>
          </div>

          <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-400 absolute bottom-8 left-0 w-full text-center">
            <p className="text-white/10 text-[10px] tracking-widest uppercase font-hebrew">
              © 2024 SLAM DUNK STORE. הונדס למצוינות.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
};
