import React, { useEffect, useRef } from 'react';

export interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
  children?: React.ReactNode;
}

export const DottedGlowBackground: React.FC<DottedGlowBackgroundProps> = ({
  className = '',
  opacity = 0.85,
  gap = 14,
  radius = 1.4,
  speedMin = 0.4,
  speedMax = 1.6,
  speedScale = 1,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Dot {
      x: number;
      y: number;
      baseAlpha: number;
      phase: number;
      speed: number;
    }

    let dots: Dot[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement || document.body;
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Rebuild dots grid
      dots = [];
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = offsetX + c * gap;
          const y = offsetY + r * gap;
          dots.push({
            x,
            y,
            baseAlpha: 0.12 + Math.random() * 0.15,
            phase: Math.random() * Math.PI * 2,
            speed: (speedMin + Math.random() * (speedMax - speedMin)) * speedScale * 0.02,
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw monochrome twinkling dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.phase += dot.speed;
        const shimmer = Math.sin(dot.phase);
        // Alpha oscillates between subtle and crisp white glow
        const alpha = Math.max(0.04, Math.min(0.9, dot.baseAlpha + shimmer * 0.25)) * opacity;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Occasional glowing pulse on select bright dots
        if (alpha > 0.35) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(alpha - 0.35) * 0.5})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [gap, radius, opacity, speedMin, speedMax, speedScale]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

export default DottedGlowBackground;
