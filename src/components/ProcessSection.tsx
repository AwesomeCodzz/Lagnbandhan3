import React from 'react';
import { ScreenType } from '../types';

interface ProcessSectionProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  return (
    <section id="process-section" className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] sm:text-xs text-secondary uppercase font-bold tracking-wider">
          अतिशय सोपी प्रक्रिया
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-primary font-bold mt-1">
          लग्न एक पवित्र बंधन कसे कार्य करते?
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-md mx-auto">
          फक्त ३ सोप्या टप्प्यांत मिळवा तुमच्या मनासारखा सुसंस्कृत जोडीदार
        </p>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
        {/* Step 1 */}
        <div
          id="process-step-1"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 relative flex sm:flex-col items-start gap-4 shadow-2xs hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 shadow-xs">
            ०१
          </div>
          <div>
            <h3 className="text-base sm:text-lg text-primary font-bold">वधू किंवा वर निवडा</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              आपल्या गरजेनुसार वधू किंवा वर निवडा. वेबसाईटवरील जलद इन-अ‍ॅप फॉर्ममध्ये अवघ्या २ मिनिटांत प्राथमिक माहिती सुरक्षितपणे नोंदवा.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div
          id="process-step-2"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 relative flex sm:flex-col items-start gap-4 shadow-2xs hover:border-secondary/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-bold flex items-center justify-center shrink-0 shadow-xs">
            ०२
          </div>
          <div>
            <h3 className="text-base sm:text-lg text-primary font-bold">अपेक्षा व बायोडाटा नोंदवा</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              शिक्षण, नोकरी/व्यवसाय, जात, पत्रिका व कौटुंबिक अपेक्षा नमूद करा. आमची टीम माहितीची खातरजमा करते.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div
          id="process-step-3"
          className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 relative flex sm:flex-col items-start gap-4 shadow-2xs hover:border-tertiary-container/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-primary font-bold flex items-center justify-center shrink-0 shadow-xs">
            ०३
          </div>
          <div>
            <h3 className="text-base sm:text-lg text-primary font-bold">योग्य स्थळांचे प्रस्ताव</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              केवळ जुळणाऱ्या व पडताळलेल्या स्थळांचे बायोडाटा थेट व्हॉट्सअ‍ॅपवर प्राप्त करा. दोन्ही कुटुंबे संमतीने पुढे बोलू शकतात.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Under Process */}
      <div className="mt-8 text-center">
        <button
          id="process-cta-btn"
          onClick={() => onNavigate('register')}
          className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary font-bold px-6 py-3.5 rounded-full hover:bg-primary shadow-md transition-transform active:scale-95 text-xs sm:text-base cursor-pointer"
        >
          <span>आत्ताच बायोडाटा नोंदवा (२ मिनिटे)</span>
          <span className="material-symbols-outlined text-lg" data-icon="edit_note">
            edit_note
          </span>
        </button>
      </div>
    </section>
  );
};
