import React from 'react';

interface BroCodeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
}

export const BroCodeLogo: React.FC<BroCodeLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center bg-black border-2 border-[#6618F7] px-2 py-1 rounded font-display font-black text-[#FFFFFF] tracking-wider ${className}`}>
        BC
      </div>
    );
  }

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Top horizontal rule */}
      <div className="w-full h-[2px] bg-[#6618F7]" />

      {/* Brand Main Text in Tektur */}
      <div
        className={`font-display font-black tracking-wider text-[#FFFFFF] leading-none my-1 flex items-center justify-center ${
          isSmall ? 'text-sm' : isLarge ? 'text-2xl' : 'text-base'
        }`}
      >
        BRO-CODE
      </div>

      {/* Bottom horizontal rule */}
      <div className="w-full h-[2px] bg-[#6618F7]" />

      {/* Subtitle Softwares */}
      {variant === 'full' && (
        <span
          className={`font-display font-semibold tracking-[0.3em] text-[#8b4dff] uppercase block text-center mt-0.5 ${
            isSmall ? 'text-[8px]' : isLarge ? 'text-xs' : 'text-[10px]'
          }`}
        >
          SOFTWARES
        </span>
      )}
    </div>
  );
};
