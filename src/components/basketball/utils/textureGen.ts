import * as THREE from 'three';

export const generateBasketballTextures = (
  primaryColor: string = '#C25E00',
  lineColor: string = '#1a1a1a',
  pattern: 'classic' | 'cross' | 'street' | 'tech' = 'classic'
): { map: THREE.CanvasTexture, normalMap: THREE.CanvasTexture } => {
  const width = 1024;
  const height = 512;

  const drawPatternPaths = (ctx: CanvasRenderingContext2D) => {
    if (pattern === 'classic') {
      ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(width / 4, 0); ctx.lineTo(width / 4, height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(width * 0.75, 0); ctx.lineTo(width * 0.75, height); ctx.stroke();
      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const ang = (x / width) * Math.PI * 2;
        const y = height / 2 + Math.sin(ang) * (height * 0.42);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (pattern === 'cross') {
      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const ang = (x / width) * Math.PI * 2;
        const y = height / 2 + Math.cos(ang) * (height * 0.45);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const ang = (x / width) * Math.PI * 2;
        const y = height / 2 - Math.cos(ang) * (height * 0.45);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
    } else if (pattern === 'street') {
      ctx.beginPath(); ctx.moveTo(0, height * 0.3); ctx.lineTo(width, height * 0.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, height * 0.7); ctx.lineTo(width, height * 0.7); ctx.stroke();
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(width * (i / 4), 0); ctx.lineTo(width * (i / 4), height); ctx.stroke();
      }
    } else if (pattern === 'tech') {
      ctx.beginPath(); ctx.moveTo(0, height * 0.35); ctx.lineTo(width, height * 0.35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, height * 0.65); ctx.lineTo(width, height * 0.65); ctx.stroke();
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const x = (width / segments) * i;
        ctx.beginPath(); ctx.moveTo(x, height * 0.35); ctx.lineTo(x + 50, height * 0.65); ctx.stroke();
      }
    }
  };

  const renderPattern = (ctx: CanvasRenderingContext2D, color: string, lineWidth: number, isAlbedo: boolean) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    if (pattern === 'tech' && isAlbedo) {
      ctx.shadowColor = lineColor;
      ctx.shadowBlur = 10;
    }
    drawPatternPaths(ctx);
    if (pattern === 'tech' && isAlbedo) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = lineColor;
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const x = (width / segments) * i;
        ctx.beginPath(); ctx.arc(x, height * 0.35, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 50, height * 0.65, 8, 0, Math.PI * 2); ctx.fill();
      }
    }
  };

  // Albedo map
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  renderPattern(ctx, lineColor, 6, true);

  const mapTexture = new THREE.CanvasTexture(canvas);
  mapTexture.colorSpace = THREE.SRGBColorSpace;

  // Normal map
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = width;
  normalCanvas.height = height;
  const nCtx = normalCanvas.getContext('2d');
  if (!nCtx) throw new Error("No normal ctx");

  nCtx.fillStyle = '#8080ff';
  nCtx.fillRect(0, 0, width, height);

  const nData = nCtx.createImageData(width, height);
  const nd = nData.data;
  for (let i = 0; i < nd.length; i += 4) {
    nd[i] = 128 + (Math.random() - 0.5) * 60;
    nd[i + 1] = 128 + (Math.random() - 0.5) * 60;
    nd[i + 2] = 255;
    nd[i + 3] = 255;
  }
  nCtx.putImageData(nData, 0, 0);

  renderPattern(nCtx, '#2020ff', 8, false);

  const normalTexture = new THREE.CanvasTexture(normalCanvas);

  return { map: mapTexture, normalMap: normalTexture };
};
