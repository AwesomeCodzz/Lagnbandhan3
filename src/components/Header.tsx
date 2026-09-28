import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappUrl =
    'https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%B2%E0%A4%97%E0%A5%8D%E0%A4%A8%20%E0%A4%8F%E0%A4%95%20%E0%A4%AA%E0%A4%B5%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%20%E0%A4%AC%E0%A4%82%E0%A4%A7%E0%A4%A8%20%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2%20%E0%A4%AE%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%80%20%E0%A4%B9%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87.';

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-surface-container-lowest/98 backdrop-blur-md border-b border-outline-variant/30 shadow-xs transition-all duration-200 ease-out"
    >
      {/* 1. TOP ANNOUNCEMENT / HELPLINE BAR */}
      <div
        id="header-announcement-bar"
        className="bg-primary text-white text-[11px] sm:text-xs py-1 px-4 border-b border-primary-container/40"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="material-symbols-outlined text-sm text-[#f9d423] fill-icon">
              verified
            </span>
            <span className="font-semibold truncate font-serif text-xs sm:text-[13px] tracking-wide">
              महाराष्ट्रातील विश्वासू विवाह संस्था | १००% सुरक्षित व पडताळणीकृत स्थळे
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25d366] hover:text-[#52e78b] transition-colors font-bold"
            >
              <span className="material-symbols-outlined text-xs fill-icon">chat</span>
              <span className="hidden sm:inline">व्हॉट्सअ‍ॅप साहाय्य</span>
              <span className="sm:hidden">व्हॉट्सअ‍ॅप</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION ROW */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo (ONLY LagnEkPavitraBandhanLogo.png) */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer focus:outline-hidden hover:opacity-90 transition-opacity"
          aria-label="लग्न एक पवित्र बंधन मुख्य पृष्ठ"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-main-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'home'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                currentScreen === 'home' ? 'fill-icon' : ''
              }`}
            >
              home
            </span>
            <span>मुख्य पृष्ठ</span>
          </button>

          <button
            id="nav-link-register"
            onClick={() => handleNavClick('register')}
            className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'register'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                currentScreen === 'register' ? 'fill-icon' : ''
              }`}
            >
              edit_note
            </span>
            <span>बायोडाटा नोंदणी</span>
            <span className="text-[10px] bg-secondary text-white font-bold px-1.5 py-0.2 rounded-full">
              मुलींसाठी मोफत
            </span>
          </button>

          <button
            id="nav-link-kundali"
            onClick={() => handleNavClick('kundali')}
            className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'kundali'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                currentScreen === 'kundali' ? 'fill-icon text-secondary' : ''
              }`}
            >
              auto_awesome
            </span>
            <span>गुणमिलन</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick WhatsApp Button */}
          <a
            id="header-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 font-bold text-xs border border-[#25d366]/30 transition-all"
            title="व्हॉट्सअ‍ॅपवर संदेश पाठवा"
          >
            <span className="material-symbols-outlined text-base fill-icon">chat</span>
            <span>व्हॉट्सअ‍ॅप</span>
          </a>

          {/* Primary Action Button */}
          <button
            id="header-cta-register-btn"
            onClick={() => handleNavClick('register')}
            className="py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">how_to_reg</span>
            <span className="whitespace-nowrap">बायोडाटा भरा</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="मेनू उघडा किंवा बंद करा"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentScreen === 'home'
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">home</span>
                <span>मुख्य पृष्ठ</span>
              </div>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>

            <button
              onClick={() => handleNavClick('register')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentScreen === 'register'
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">edit_note</span>
                <span>विवाह माहितीपत्रक (नोंदणी)</span>
              </div>
              <span className="text-[10px] bg-secondary text-white font-bold px-2 py-0.5 rounded-full">
                मुलींसाठी मोफत
              </span>
            </button>

            <button
              onClick={() => handleNavClick('kundali')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentScreen === 'kundali'
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-secondary">
                  auto_awesome
                </span>
                <span>कुंडली व ३६ गुणमिलन</span>
              </div>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>

            <div className="pt-2 border-t border-outline-variant/20">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#25d366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-base fill-icon">chat</span>
                <span>व्हॉट्सअ‍ॅप साहाय्य</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
