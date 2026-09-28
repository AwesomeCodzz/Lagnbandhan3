import React from 'react';

export const MetricsSection: React.FC = () => {
  return (
    <section
      id="metrics-section"
      className="bg-surface-container py-8 px-4 border-y border-outline-variant/30"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-base sm:text-xl text-primary font-bold mb-6 font-serif">
          महाराष्ट्रातील सुजाण पालकांचा विश्वासू विवाह मंच
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Metric 1 */}
          <div
            id="metric-card-registered"
            className="bg-surface-container-lowest p-4 rounded-xl text-center border border-outline-variant/30 shadow-2xs transition-transform hover:-translate-y-0.5"
          >
            <span
              className="material-symbols-outlined text-primary text-2xl sm:text-3xl mb-1"
              data-icon="groups"
            >
              groups
            </span>
            <div className="text-xl sm:text-2xl text-primary font-bold font-serif">२,८५०+</div>
            <div className="text-xs sm:text-sm text-on-surface-variant mt-0.5 font-medium">
              नोंदणीकृत बायोडाटा
            </div>
          </div>

          {/* Metric 2 */}
          <div
            id="metric-card-verified"
            className="bg-surface-container-lowest p-4 rounded-xl text-center border border-outline-variant/30 shadow-2xs transition-transform hover:-translate-y-0.5"
          >
            <span
              className="material-symbols-outlined text-secondary text-2xl sm:text-3xl mb-1"
              data-icon="verified"
            >
              verified
            </span>
            <div className="text-xl sm:text-2xl text-secondary font-bold font-serif">१,९५०+</div>
            <div className="text-xs sm:text-sm text-on-surface-variant mt-0.5 font-medium">
              पडताळणी झालेले प्रोफाईल्स
            </div>
          </div>

          {/* Metric 3 */}
          <div
            id="metric-card-success"
            className="bg-surface-container-lowest p-4 rounded-xl text-center border border-outline-variant/30 shadow-2xs transition-transform hover:-translate-y-0.5"
          >
            <span
              className="material-symbols-outlined text-primary text-2xl sm:text-3xl mb-1 fill-icon"
              data-icon="favorite"
            >
              favorite
            </span>
            <div className="text-xl sm:text-2xl text-primary font-bold font-serif">३५०+</div>
            <div className="text-xs sm:text-sm text-on-surface-variant mt-0.5 font-medium">
              यशस्वी रेशीमगाठी
            </div>
          </div>

          {/* Metric 4 */}
          <div
            id="metric-card-privacy"
            className="bg-surface-container-lowest p-4 rounded-xl text-center border border-outline-variant/30 shadow-2xs transition-transform hover:-translate-y-0.5"
          >
            <span
              className="material-symbols-outlined text-tertiary-container text-2xl sm:text-3xl mb-1 fill-icon"
              data-icon="security"
            >
              security
            </span>
            <div className="text-xl sm:text-2xl text-tertiary-container font-bold font-serif">१००%</div>
            <div className="text-xs sm:text-sm text-on-surface-variant mt-0.5 font-medium">
              गोपनीयता व सुरक्षितता
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
