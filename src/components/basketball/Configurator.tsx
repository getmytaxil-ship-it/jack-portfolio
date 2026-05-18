import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Basketball } from './Basketball';
import type { Product } from './types';

const HEEBO: React.CSSProperties = { fontFamily: '"Heebo", sans-serif' };
const PATTERNS: Product['texturePattern'][] = ['classic', 'cross', 'street', 'tech'];
const PATTERN_LABELS: Record<string, string> = { classic: 'קלאסי', cross: 'צלב', street: 'סטריט', tech: 'טכנו' };

export const Configurator: React.FC<{
  onClose: () => void;
  onSave: (p: Product) => void;
  initialProduct: Product;
}> = ({ onClose, onSave, initialProduct }) => {
  const [config, setConfig] = useState<Product>({ ...initialProduct });

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#050505]" dir="rtl">
      {/* 3D preview */}
      <div className="w-full md:w-3/5 h-[50vh] md:h-full">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1,1.5]} gl={{ alpha: false, antialias: true }}
          style={{ background: '#0A0A0A' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5,5,5]} intensity={2} />
          <pointLight position={[-3,3,2]} intensity={1} color="#FF8833" />
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Basketball product={config} isConfigurator />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="w-full md:w-2/5 bg-[#0A0A0A] border-r border-white/8 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 style={{ ...HEEBO, fontWeight: 800, color: '#fff', fontSize: '1.2rem' }}>עיצוב אישי</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Primary color */}
          <div>
            <p style={{ ...HEEBO, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>צבע בסיס</p>
            <div className="flex items-center gap-3">
              <input type="color" value={config.primaryColor}
                onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
              <span style={{ ...HEEBO, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{config.primaryColor}</span>
            </div>
          </div>

          {/* Line color */}
          <div>
            <p style={{ ...HEEBO, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>צבע תפרים</p>
            <div className="flex items-center gap-3">
              <input type="color" value={config.lineColor}
                onChange={e => setConfig({ ...config, lineColor: e.target.value })}
                className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
              <span style={{ ...HEEBO, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{config.lineColor}</span>
            </div>
          </div>

          {/* Pattern */}
          <div>
            <p style={{ ...HEEBO, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>דוגמה</p>
            <div className="grid grid-cols-2 gap-2">
              {PATTERNS.map(p => (
                <button key={p}
                  onClick={() => setConfig({ ...config, texturePattern: p })}
                  className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                  style={{
                    ...HEEBO,
                    borderColor: config.texturePattern === p ? 'rgba(255,85,0,0.7)' : 'rgba(255,255,255,0.1)',
                    color:       config.texturePattern === p ? '#FF7030' : 'rgba(255,255,255,0.4)',
                    background:  config.texturePattern === p ? 'rgba(255,85,0,0.08)' : 'transparent',
                  }}>
                  {PATTERN_LABELS[p]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-white/8">
          <button onClick={() => onSave(config)}
            className="w-full rounded-full text-white text-sm font-bold uppercase tracking-widest py-3.5 hover:opacity-85 transition-opacity"
            style={{ ...HEEBO, background: 'linear-gradient(135deg,#FF5500,#CC2200)', boxShadow: '0 0 28px rgba(255,85,0,0.35)' }}>
            שמור עיצוב
          </button>
        </div>
      </div>
    </div>
  );
};
