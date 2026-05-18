import React, { useEffect, useState } from 'react';

const NavItem = ({ text, active = false, onClick }: { text: string; active?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`text-sm font-medium tracking-wide transition-colors duration-300 interactive font-hebrew ${
      active ? 'text-brand-orange' : 'text-gray-300 hover:text-white'
    }`}
  >
    {text}
  </button>
);

interface NavigationProps {
  cartCount?: number;
  onCustomize?: () => void;
  onOpenCart?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ cartCount = 0, onCustomize, onOpenCart }) => {
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 md:py-8 w-full pointer-events-none md:pointer-events-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-black" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 1 0 20" opacity="0.5" />
            <path d="M2 12h20" opacity="0.5" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-white text-lg tracking-wider">SLAM</span>
          <span className="font-display font-bold text-white text-lg tracking-wider -mt-1">DUNK</span>
        </div>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-12 pointer-events-auto font-hebrew">
        <NavItem text="מוצרים" active />
        <NavItem text="התאמה אישית" onClick={onCustomize} />
        <NavItem text="צור קשר" />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6 text-white pointer-events-auto pr-2 md:pr-0">
        <button className="hover:text-brand-orange transition-colors interactive">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </button>
        <button
          id="cart-target"
          onClick={onOpenCart}
          className="hover:text-brand-orange transition-colors relative interactive"
        >
          <div className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-brand-orange rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1 transition-transform duration-300 ${cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${animateBadge ? 'scale-125' : ''}`}>
            {cartCount}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
