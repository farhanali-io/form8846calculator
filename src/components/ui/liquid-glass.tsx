import React, { useId } from 'react';

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tint?: number; // 0 to 1 opacity of glass background
  scale?: number; // distortion/scale
  bevelDepth?: number;
  aberration?: number;
  className?: string;
  contentClassName?: string;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  tint = 0.12,
  scale = 24,
  bevelDepth = 10,
  aberration = 1,
  className = '',
  contentClassName = '',
  style,
  ...props
}) => {
  const filterId = useId().replace(/:/g, '');

  const tintBg = `rgba(255, 255, 255, ${Math.max(0.04, Math.min(0.8, tint))})`;
  const bevelBorder = `1px solid rgba(255, 255, 255, ${Math.min(0.6, 0.2 + bevelDepth * 0.02)})`;

  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300 ${className}`}
      style={{
        background: tintBg,
        border: bevelBorder,
        boxShadow:
          '0 10px 40px -10px rgba(0, 0, 0, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.08)',
        ...style,
      }}
      {...props}
    >
      {/* SVG Refraction and chromatic reflection filter */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={`liquid-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale * 0.15}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Subtle chromatic / specular sheen overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 100%)',
        }}
      />

      {/* Glass contents */}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default LiquidGlass;
