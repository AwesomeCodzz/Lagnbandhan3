import React from 'react';
import { ScreenType } from '../types';

interface SafetyPledgeSectionProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SafetyPledgeSection: React.FC<SafetyPledgeSectionProps> = ({ onNavigate }) => {
  const privacyOfficerWhatsapp =
    'https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%97%E0%A5%8B%E0%A4%AA%E0%A4%A8%E0%A5%80%E0%A4%AF%E0%A4%A4%E0%A5%87%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2%20%E0%A4%B5%E0%A4%BF%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%AF%E0%A4%9A%E0%A5%87%20%E0%A4%86%E0%A4%B9%E0%A5%87.';

  return (
    <section id="safety-pledge-section" className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-primary-container text-on-primary rounded-3xl p-6 sm:p-8 card-shadow relative overflow-hidden">
        {/* Ambient background watermark icon */}
        <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl pointer-events-none select-none">
          <span className="material-symbols-outlined text-[140px]" data-icon="verified_user">
            verified_user
          </span>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest/20 rounded-full px-3 py-1 text-xs font-semibold text-secondary-fixed mb-3">
            <span className="material-symbols-outlined text-sm fill-icon" data-icon="security">
              security
            </span>
            <span>सुरक्षित व १००% गोपनीय</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-snug">
            'तुमच्या कुटुंबाचा आदर आणि गोपनीयता हेच आमचे प्रथम कर्तव्य'
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-surface-dim">
            <div className="flex items-start gap-2 bg-black/15 p-3 rounded-xl">
              <span
                className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5"
                data-icon="lock"
              >
                lock
              </span>
              <span className="leading-relaxed">
                तुमचे फोन नंबर आणि फोटो तुमच्या पूर्व संमतीशिवाय इतर कोणालाही पाठवले जात नाहीत.
              </span>
            </div>
            <div className="flex items-start gap-2 bg-black/15 p-3 rounded-xl">
              <span
                className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5"
                data-icon="shield"
              >
                shield
              </span>
              <span className="leading-relaxed">
                प्रत्येक नोंदणीकृत प्रोफाईलची फोनद्वारे प्रत्यक्ष कौटुंबिक पार्श्वभूमी तपासली जाते.
              </span>
            </div>
          </div>

          {/* Direct Double Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="safety-fill-form-btn"
              onClick={() => onNavigate('register')}
              className="min-h-[48px] bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container font-bold px-5 py-3 rounded-xl text-center flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg" data-icon="assignment">
                assignment
              </span>
              <span>गोपनीय बायोडाटा फॉर्म भरा</span>
            </button>

            <a
              id="safety-officer-chat-btn"
              className="min-h-[48px] bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary border border-surface-dim/40 font-semibold px-5 py-3 rounded-xl text-center flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm"
              href={privacyOfficerWhatsapp}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-lg" data-icon="support_agent">
                support_agent
              </span>
              <span>गोपनीयता अधिकाऱ्यांशी बोला</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
