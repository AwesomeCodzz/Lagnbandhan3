import React from 'react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappUrl =
    'https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE%E0%A4%97%E0%A4%BE%E0%A4%B0%20%E0%A4%AE%E0%A4%A6%E0%A4%A4%20%E0%A4%B9%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87.';

  return (
    <footer
      id="app-footer"
      className="bg-surface-container-high border-t border-outline-variant/40 py-8 px-4 text-center sm:text-left transition-colors duration-200 ease-in-out pb-20 md:pb-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <BrandLogo size="sm" />
          <p className="text-xs text-on-surface-variant mt-2 max-w-md leading-relaxed text-center md:text-left">
            © 2026 लग्न एक पवित्र बंधन Matrimonial Services. All rights reserved. Verified and confidential matrimonial alliances across Maharashtra.
          </p>
          <div className="mt-2 text-[11px] text-secondary font-medium">
            पुणे • मुंबई • नाशिक • कोल्हापूर • छत्रपती संभाजीनगर • नागपूर
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-on-surface-variant font-medium">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            मुख्य पृष्ठ
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('register')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            बायोडाटा नोंदणी फॉर्म
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('kundali')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            पत्रिका व गुणमिलन
          </button>
          <span>•</span>
          <a
            className="text-secondary font-bold hover:text-primary transition-colors duration-150 flex items-center gap-1"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-sm fill-icon text-[#128C7E]">chat</span>
            व्हॉट्सअ‍ॅप साहाय्य
          </a>
        </div>
      </div>
    </footer>
  );
};
