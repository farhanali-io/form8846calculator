import React from 'react';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export function DottedGlowBackgroundDemo() {
  return (
    <div className="relative flex size-60 items-end justify-end overflow-hidden rounded-md rounded-tl-3xl rounded-br-3xl rounded-bl-3xl border border-transparent px-4 shadow ring-1 shadow-white/10 ring-white/10 md:size-100 bg-black">
      <div className="relative z-20 flex w-full justify-between px-2 py-3 backdrop-blur-[2px] md:px-4 text-white">
        <p className="text-xs font-normal text-neutral-400 md:text-sm">
          Form 8846 Dotted Matrix
        </p>
        <p className="text-xs font-normal text-white md:text-sm">
          &rarr;
        </p>
      </div>
      <DottedGlowBackground
        className="pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]"
        opacity={1}
        gap={12}
        radius={1.6}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
    </div>
  );
}

export default DottedGlowBackgroundDemo;
