import React from 'react';
import { ScreenType } from '../types';

interface MobileBottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentScreen, onNavigate }) => {
  const whatsappUrl =
    'https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B9%20%E0%A4%A8%E0%A5%8B%E0%A4%82%E0%A4%A6%E0%A4%A3%E0%A5%80%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2%20%E0%A4%AE%E0%A4%A6%E0%A4%A4%20%E0%A4%B9%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87.';

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe"
    >
      <div className="grid grid-cols-4 h-16 items-center px-1 max-w-md mx-auto">
        {/* 1. Home */}
        <button
          id="mobile-nav-home"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
            currentScreen === 'home'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className={`material-symbols-outlined text-2xl ${
              currentScreen === 'home' ? 'fill-icon text-primary' : ''
            }`}
            data-icon="home"
          >
            home
          </span>
          <span className="text-[11px] leading-tight mt-0.5">मुख्य</span>
        </button>

        {/* 3. Center CTA: Register */}
        <button
          id="mobile-nav-register"
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer group"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-2 border-white ${
              currentScreen === 'register'
                ? 'bg-primary text-white ring-2 ring-primary-container'
                : 'bg-primary-container text-white group-hover:bg-primary'
            }`}
          >
            <span className="material-symbols-outlined text-2xl" data-icon="edit_note">
              edit_note
            </span>
          </div>
          <span
            className={`text-[11px] leading-tight mt-1 font-bold ${
              currentScreen === 'register' ? 'text-primary' : 'text-on-surface'
            }`}
          >
            नोंदणी
          </span>
        </button>

        {/* 4. Kundali */}
        <button
          id="mobile-nav-kundali"
          onClick={() => onNavigate('kundali')}
          className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
            currentScreen === 'kundali'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className={`material-symbols-outlined text-2xl ${
              currentScreen === 'kundali' ? 'fill-icon text-secondary' : ''
            }`}
            data-icon="auto_awesome"
          >
            auto_awesome
          </span>
          <span className="text-[11px] leading-tight mt-0.5">गुणमिलन</span>
        </button>

        {/* 5. WhatsApp Direct */}
        <a
          id="mobile-nav-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#128C7E] hover:text-[#004019] transition-colors"
        >
          <span className="material-symbols-outlined text-2xl fill-icon" data-icon="chat">
            chat
          </span>
          <span className="text-[11px] leading-tight mt-0.5 font-bold">व्हॉट्सअ‍ॅप</span>
        </a>
      </div>
    </nav>
  );
};
