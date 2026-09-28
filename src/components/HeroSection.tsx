import React from 'react';
import { ScreenType } from '../types';
import happyCoupleWebp from '../assets/happy_marathi_couple.webp';
import happyCoupleJpg from '../assets/happy_marathi_couple.jpg';

interface HeroSectionProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickRegister: (gender: 'bride' | 'groom') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenQuickRegister }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-6 pb-10 sm:pt-10 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient Background Accents */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[500px] h-[300px] bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 left-0 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Trust Pill */}
        <div
          id="hero-trust-pill"
          className="inline-flex items-center gap-2 bg-surface-container-high/80 border border-secondary/30 rounded-full px-3.5 py-1 mb-4 shadow-2xs"
        >
          <span
            className="material-symbols-outlined text-secondary text-sm fill-icon"
            data-icon="verified"
          >
            verified
          </span>
          <span className="text-xs sm:text-sm text-secondary font-bold tracking-wide">
            १००% सत्य व कुटुंब पडताळणीकृत विवाह केंद्र
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-main-heading"
          className="text-2xl sm:text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight max-w-2xl leading-tight sm:leading-tight"
        >
          महाराष्ट्रातील सुसंस्कृत व अनुरूप स्थळांचा पवित्र रेशीमगाठी संगम
        </h1>

        {/* Subheadline */}
        <p
          id="hero-subheading"
          className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl text-center leading-relaxed"
        >
          आपल्या लाडक्या पाल्यासाठी अथवा स्वतःसाठी योग्य जोडीदार शोधा. साधी, सोपी व संपूर्ण गोपनीय प्रक्रिया. अवघ्या{' '}
          <strong className="text-primary font-bold">२ मिनिटांत</strong> बायोडाटा सबमिट करा.
        </p>

        {/* COUPLE IMAGE BANNER BADGE */}
        <div
          id="hero-couple-card"
          className="mt-6 w-full max-w-md relative rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 group"
        >
          <div className="aspect-[16/10] relative">
            <picture>
              <source srcSet={happyCoupleWebp} type="image/webp" />
              <img
                alt="नवविवाहित सुखी जोडपे"
                width={448}
                height={280}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                src={happyCoupleJpg}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/30 to-transparent flex items-end p-4">
              <div className="text-left text-on-primary w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] bg-secondary px-2 py-0.5 rounded font-bold tracking-wide text-on-secondary uppercase">
                    सत्य कथा
                  </span>
                  <span className="text-xs text-secondary-fixed flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-xs fill-icon">favorite</span>
                    सुखी वैवाहिक जीवन
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-white mt-1">अमेय आणि सायली - पुणे</p>
                <p className="text-xs text-surface-dim mt-0.5 leading-snug">
                  "आमचे दोन्ही कुटुंबे येथे जुळली. अतिशय सन्माननीय व खाजगी सेवा!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION SELECTION CARDS (BRIDE VS GROOM) */}
        <div id="hero-action-cards" className="w-full max-w-lg mt-8 grid grid-cols-1 gap-4 text-left">
          {/* Card 1: Bride Registration */}
          <div
            id="bride-registration-card"
            className="relative bg-surface-container-lowest border-2 border-primary-container/40 hover:border-primary-container rounded-2xl p-5 card-shadow transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <div className="absolute -top-3 right-4 bg-tertiary-container text-tertiary-fixed text-xs font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-tertiary-fixed/30">
              <span className="material-symbols-outlined text-xs fill-icon" data-icon="stars">
                stars
              </span>
              मुलींसाठी १००% मोफत
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/60 flex items-center justify-center shrink-0 text-primary mt-1 shadow-2xs">
                <span className="material-symbols-outlined text-2xl fill-icon" data-icon="female">
                  female
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl text-primary font-bold">वधू (मुलींचा बायोडाटा)</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                  उच्चशिक्षित, सुसंस्कृत व अनुरूप वधू स्थळे नोंदणी करा.
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-on-surface-variant font-medium">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="lock">
                      lock
                    </span>{' '}
                    खाजगी प्रोफाइल
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-tertiary-container font-semibold">कोणतेही शुल्क नाही</span>
                </div>
              </div>
            </div>

            {/* Bride Actions: Direct In-App Fast Registration */}
            <div className="mt-4">
              <button
                id="bride-register-btn"
                onClick={() => onOpenQuickRegister('bride')}
                className="w-full min-h-[48px] bg-primary-container text-on-primary hover:bg-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cta-glow transition-all duration-150 active:scale-[0.98] text-sm sm:text-base cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-xl" data-icon="edit_note">
                  edit_note
                </span>
                <span>वधू बायोडाटा नोंदणी करा (मोफत)</span>
                <span className="material-symbols-outlined text-lg" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Groom Registration */}
          <div
            id="groom-registration-card"
            className="relative bg-surface-container-lowest border-2 border-secondary/40 hover:border-secondary rounded-2xl p-5 card-shadow transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <div className="absolute -top-3 right-4 bg-secondary text-on-secondary text-xs font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" data-icon="verified_user">
                verified_user
              </span>
              पडताळणी अनिवार्य
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center shrink-0 text-secondary mt-1 shadow-2xs">
                <span className="material-symbols-outlined text-2xl fill-icon" data-icon="male">
                  male
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl text-on-surface font-bold">वर (मुलांचा बायोडाटा)</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                  नोकरदार, व्यावसायिक व उत्तम कौटुंबिक पार्श्वभूमी असलेले वर.
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-on-surface-variant font-medium">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="shield">
                      shield
                    </span>{' '}
                    १००% खाजगी व सुरक्षित
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-primary font-semibold">त्वरित स्थळ सूचना</span>
                </div>
              </div>
            </div>

            {/* Groom Actions: Direct In-App Fast Registration */}
            <div className="mt-4">
              <button
                id="groom-register-btn"
                onClick={() => onOpenQuickRegister('groom')}
                className="w-full min-h-[48px] bg-secondary text-on-secondary hover:bg-secondary/90 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-150 active:scale-[0.98] text-sm sm:text-base cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl" data-icon="edit_note">
                  edit_note
                </span>
                <span>वर बायोडाटा नोंदणी करा</span>
                <span className="material-symbols-outlined text-lg" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Checkmarks underneath */}
        <div
          id="hero-trust-points"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-on-surface-variant"
        >
          <div className="flex items-center gap-1 font-medium">
            <span
              className="material-symbols-outlined text-tertiary-container text-base fill-icon"
              data-icon="check_circle"
            >
              check_circle
            </span>
            <span>१००% संपूर्ण गोपनीयता</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span
              className="material-symbols-outlined text-tertiary-container text-base fill-icon"
              data-icon="check_circle"
            >
              check_circle
            </span>
            <span>फोटोचा कोणताही गैरवापर नाही</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span
              className="material-symbols-outlined text-tertiary-container text-base fill-icon"
              data-icon="check_circle"
            >
              check_circle
            </span>
            <span>पत्रिका व गुणमिलन मार्गदर्शन</span>
          </div>
        </div>
      </div>
    </section>
  );
};
