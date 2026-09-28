import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B9%20%E0%A4%A8%E0%A5%8B%E0%A4%82%E0%A4%A6%E0%A4%A3%E0%A5%80%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2%20%E0%A4%AE%E0%A4%A6%E0%A4%A4%20%E0%A4%B9%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87.';

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label="WhatsApp quick contact"
      className="fixed bottom-20 md:bottom-6 right-4 z-40 flex items-center gap-2"
    >
      {/* Tooltip helper pill for mobile reassurance */}
      <a
        id="whatsapp-tooltip-pill"
        className="hidden xs:flex items-center gap-1.5 bg-surface-container-lowest text-on-surface px-3 py-1.5 rounded-full shadow-lg border border-outline-variant/30 text-xs font-semibold hover:bg-surface transition-all cursor-pointer group"
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
        <span className="group-hover:text-primary transition-colors">मदत हवी आहे? व्हॉट्सअ‍ॅप करा</span>
      </a>

      {/* Circular WhatsApp FAB Button */}
      <a
        id="whatsapp-fab-btn"
        aria-label="WhatsApp द्वारे थेट संपर्क"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 border-2 border-white cursor-pointer"
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
        </svg>
      </a>
    </aside>
  );
};
