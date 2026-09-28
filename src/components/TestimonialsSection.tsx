import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials-section"
      className="bg-surface-container-low py-10 px-4 sm:px-6 border-t border-outline-variant/30"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-7">
          <span className="text-[11px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
            आनंदी दांपत्य
          </span>
          <h2 className="text-xl sm:text-3xl font-serif text-primary font-bold mt-1">
            आमच्या यशोगाथा
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            लग्न एक पवित्र बंधन च्या माध्यमातून जुळलेली काही मने
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              id={`testimonial-${t.id}`}
              className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-secondary mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm fill-icon"
                      data-icon="star"
                    >
                      star
                    </span>
                  ))}
                  <span className="text-xs font-bold text-on-surface ml-1">५.० / ५.०</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-sm text-primary font-bold">{t.coupleNames}</h4>
                  <p className="text-xs text-on-surface-variant">
                    विवाह: {t.weddingDate} ({t.locations})
                  </p>
                  <p className="text-[11px] text-on-surface-variant/80 font-medium">
                    {t.professions}
                  </p>
                </div>
                <span className="text-[11px] bg-secondary-fixed/50 text-on-secondary-fixed px-2 py-0.5 rounded-md font-semibold border border-secondary/20">
                  {t.community}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
