import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass =
    size === 'sm'
      ? 'h-9 sm:h-10'
      : size === 'lg'
      ? 'h-14 sm:h-16'
      : 'h-11 sm:h-13';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/LagnEkPavitraBandhanLogo.png"
        alt="लग्न एक पवित्र बंधन"
        className={`${heightClass} w-auto object-contain drop-shadow-2xs`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
