import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { HeroUI } from './HeroUI';
import { Product } from './types';
import { Configurator } from './Configurator';
import { CartSidebar } from './CartSidebar';
import { audio } from './utils/audio';

const Scene = lazy(() => import('./Scene').then(m => ({ default: m.Scene })));

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, namePart1: 'כדור', namePart2: 'מנצח', price: 34.99, primaryColor: '#C25E00', lineColor: '#1a1a1a', accentColor: '#FF5500', texturePattern: 'classic' },
  { id: 2, namePart1: 'ור',   namePart2: 'טקס',  price: 49.99, primaryColor: '#004d25', lineColor: '#aaffaa', accentColor: '#00ff41', texturePattern: 'street'  },
  { id: 3, namePart1: 'נבו',  namePart2: 'לה',   price: 59.99, primaryColor: '#0077b6', lineColor: '#FFFFFF', accentColor: '#00C2FF', texturePattern: 'tech'    },
  { id: 4, namePart1: 'אינ',  namePart2: 'פרנו', price: 64.99, primaryColor: '#6a040f', lineColor: '#ffba08', accentColor: '#d00000', texturePattern: 'street'  },
  { id: 5, namePart1: 'סטל',  namePart2: "ט'",   price: 79.99, primaryColor: '#ff0080', lineColor: '#111111', accentColor: '#ff0080', texturePattern: 'cross'   },
];

const getBgColor = (product: Product) => {
  if (product.id === 1) return '#FF5500';
  if (product.id === 2) return '#004d25';
  if (product.id === 3) return '#003f5c';
  if (product.id === 4) return '#6a040f';
  if (product.id === 5) return '#9d174d';
  return product.primaryColor;
};

const BasketballSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartTriggerTime, setCartTriggerTime] = useState(0);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  // Lazy-load canvas on first intersection
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSceneLoaded(true); obs.disconnect(); } },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const initAudio = () => {
      audio.init();
      window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio);
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    audio.playClick();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    audio.playClick();
  };

  const handleAddToCart = () => {
    setCartTriggerTime(Date.now());
    setTimeout(() => {
      setCartItems(prev => [...prev, products[currentIndex]]);
      audio.playSuccess();
    }, 800);
  };

  const handleSaveConfiguration = (newProduct: Product) => {
    const customProduct = {
      ...newProduct,
      id: Date.now(),
      namePart1: 'עיצ',
      namePart2: 'וב'
    };
    setProducts(prev => [...prev, customProduct]);
    setCurrentIndex(products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(index) => setCartItems(prev => prev.filter((_, i) => i !== index))}
      />

      {isConfiguratorOpen && (
        <Configurator
          onClose={() => setIsConfiguratorOpen(false)}
          onSave={handleSaveConfiguration}
          initialProduct={currentProduct}
        />
      )}

      <div
        ref={appRef}
        className="relative w-full flex items-center justify-center overflow-hidden p-0 md:p-8 select-none"
        style={{
          height: '100svh',
          backgroundColor: getBgColor(currentProduct),
          transition: 'background-color 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="relative w-full h-full md:max-w-[1600px] md:max-h-[900px] bg-brand-dark md:rounded-[2.5rem] shadow-2xl flex flex-col border-0 md:border border-white/5 overflow-hidden">

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-black to-black opacity-80 pointer-events-none z-0"></div>

          {/* Grid lines overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 pointer-events-none z-0"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px)',
              transform: 'perspective(500px) rotateX(60deg) scale(2)',
              transformOrigin: 'bottom center',
              maskImage: 'linear-gradient(to top, black, transparent)'
            }}
          ></div>

          {/* 1. UI Layer (contains internal scroll) */}
          <HeroUI
            product={currentProduct}
            onNext={nextSlide}
            onPrev={prevSlide}
            scrollRef={scrollRef}
            cartCount={cartItems.length}
            onAddToCart={handleAddToCart}
            onCustomize={() => { audio.playClick(); setIsConfiguratorOpen(true); }}
            onOpenCart={() => { audio.playClick(); setIsCartOpen(true); }}
          />

          {/* 2. Scene Layer */}
          {sceneLoaded && (
            <div className="absolute inset-0 w-full h-full z-40 pointer-events-none">
              <Suspense fallback={null}>
                <Scene
                  currentProduct={currentProduct}
                  scrollContainer={scrollRef}
                  eventSource={appRef}
                  addToCartTrigger={cartTriggerTime}
                />
              </Suspense>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BasketballSection;
