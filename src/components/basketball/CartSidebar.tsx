import React from 'react';
import type { Product } from './types';

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' };

export const CartSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (i: number) => void;
}> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((s, p) => s + p.price, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      )}
      <div
        className="fixed top-0 left-0 h-full w-full sm:w-[360px] bg-[#0A0A0A] border-r border-white/8 z-[70] flex flex-col transition-transform duration-500"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 style={{ ...HEEBO, fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
            עגלת קניות
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <p style={{ ...HEEBO, color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: 40, textAlign: 'center' }}>
              העגלה ריקה
            </p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-3 border-b border-white/6">
                <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: item.primaryColor }} />
                <div className="flex-1">
                  <p style={{ ...HEEBO, fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                    {item.namePart1} {item.namePart2}
                  </p>
                  <p style={{ ...HEEBO, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    ₪{item.price.toFixed(2)}
                  </p>
                </div>
                <button onClick={() => onRemoveItem(i)} className="text-white/25 hover:text-white/60 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-white/8 space-y-4">
            <div className="flex justify-between items-center">
              <span style={{ ...HEEBO, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>סה״כ</span>
              <span style={{ ...HEEBO, fontWeight: 900, color: '#fff', fontSize: '1.2rem' }}>
                ₪{total.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full rounded-full text-white text-sm font-bold uppercase tracking-widest py-3.5 hover:opacity-85 transition-opacity"
              style={{ ...HEEBO, background: 'linear-gradient(135deg,#FF5500,#CC2200)', boxShadow: '0 0 28px rgba(255,85,0,0.35)' }}
            >
              לתשלום
            </button>
          </div>
        )}
      </div>
    </>
  );
};
