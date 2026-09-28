import React, { useState, useMemo } from 'react';
import { Profile } from '../types';
import { PROFILES_DATA, DISTRICTS_LIST, CASTES_LIST } from '../data/profilesData';

interface ProfilesViewProps {
  onSelectProfile: (profile: Profile) => void;
  onNavigateToRegister: () => void;
}

export const ProfilesView: React.FC<ProfilesViewProps> = ({
  onSelectProfile,
  onNavigateToRegister,
}) => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'bride' | 'groom'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('सर्व जिल्हे');
  const [selectedCaste, setSelectedCaste] = useState<string>('सर्व जाती / समाज');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProfiles = useMemo(() => {
    return PROFILES_DATA.filter((p) => {
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;
      if (selectedDistrict !== 'सर्व जिल्हे' && !p.district.includes(selectedDistrict)) return false;
      if (selectedCaste !== 'सर्व जाती / समाज' && !p.caste.includes(selectedCaste)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchEdu = p.education.toLowerCase().includes(q);
        const matchProf = p.profession.toLowerCase().includes(q);
        const matchCity = p.city.toLowerCase().includes(q);
        if (!matchName && !matchEdu && !matchProf && !matchCity) return false;
      }
      return true;
    });
  }, [selectedGender, selectedDistrict, selectedCaste, searchQuery]);

  return (
    <div id="profiles-screen" className="py-6 sm:py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Title & Banner */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold px-3 py-1 rounded-full border border-secondary/30 mb-2">
          <span className="material-symbols-outlined text-sm fill-icon" data-icon="shield">
            shield
          </span>
          <span>सर्व प्रोफाईल कुटुंब पडताळणीकृत आहेत</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-primary font-bold">
          अनुरूप वधू-वर स्थळे
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5">
          आपल्या पसंतीनुसार योग्य स्थळ निवडा आणि थेट विवाह सल्लागारांशी संपर्क साधा.
        </p>
      </div>

      {/* FILTER CONTROL BAR */}
      <div
        id="profiles-filter-bar"
        className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/30 card-shadow mb-6 sm:mb-8"
      >
        {/* Gender Selection Tabs */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            id="filter-gender-all"
            onClick={() => setSelectedGender('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedGender === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
            }`}
          >
            सर्व स्थळे ({PROFILES_DATA.length})
          </button>
          <button
            id="filter-gender-bride"
            onClick={() => setSelectedGender('bride')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedGender === 'bride'
                ? 'bg-primary-container text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
            }`}
          >
            <span className="material-symbols-outlined text-sm" data-icon="female">
              female
            </span>
            <span>वधू (मुली)</span>
          </button>
          <button
            id="filter-gender-groom"
            onClick={() => setSelectedGender('groom')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedGender === 'groom'
                ? 'bg-secondary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
            }`}
          >
            <span className="material-symbols-outlined text-sm" data-icon="male">
              male
            </span>
            <span>वर (मुलगे)</span>
          </button>
        </div>

        {/* Dropdown Filters & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* District */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              जिल्हा / शहर
            </label>
            <select
              id="filter-district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E5DCD0] focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-on-surface font-medium cursor-pointer"
            >
              {DISTRICTS_LIST.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Caste */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              जात / समाज
            </label>
            <select
              id="filter-caste-select"
              value={selectedCaste}
              onChange={(e) => setSelectedCaste(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E5DCD0] focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-on-surface font-medium cursor-pointer"
            >
              {CASTES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              शोध (शिक्षण, नाव, नोकरी)
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="उदा. Software, MBBS, पुणे..."
                className="w-full bg-[#FAF7F2] border border-[#E5DCD0] focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 font-medium"
              />
              <span
                className="material-symbols-outlined text-outline absolute left-2.5 top-2.5 text-base"
                data-icon="search"
              >
                search
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILES GRID */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-8">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-2">
            search_off
          </span>
          <h3 className="text-lg font-bold text-primary">कोणतेही स्थळ आढळले नाही</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            कृपया निवडलेले फिल्टर्स बदला अथवा थेट विवाह समुपदेशकांशी संपर्क साधा.
          </p>
          <button
            onClick={() => {
              setSelectedGender('all');
              setSelectedDistrict('सर्व जिल्हे');
              setSelectedCaste('सर्व जाती / समाज');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            सर्व फिल्टर्स रीसेट करा
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProfiles.map((profile) => {
            const isBride = profile.gender === 'bride';
            const whatsappMsg = encodeURIComponent(
              `नमस्कार, मला ${profile.name} (आयडी: ${profile.id}, शिक्षण: ${profile.education}) यांच्या स्थळाबद्दल माहिती हवी आहे.`
            );

            return (
              <div
                key={profile.id}
                id={`profile-card-${profile.id}`}
                className="bg-white rounded-2xl border border-outline-variant/30 card-shadow overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-secondary/50 group"
              >
                <div>
                  {/* Vertical Photo Container with 3:4 Portrait Aspect Ratio */}
                  <div className="relative aspect-[3/4] bg-surface-container-high overflow-hidden">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      width={360}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient shading over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                    {/* Embedded Verification Badge at top-right (Gold shield with tick) */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-secondary px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border border-secondary/20">
                      <span
                        className="material-symbols-outlined text-sm fill-icon text-secondary"
                        data-icon="verified"
                      >
                        verified
                      </span>
                      <span>पडताळणीकृत</span>
                    </div>

                    {/* ID & Gender Pill at top-left */}
                    <div className="absolute top-3 left-3 bg-black/55 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>{profile.id}</span>
                      <span>•</span>
                      <span>{isBride ? 'वधू' : 'वर'}</span>
                    </div>

                    {/* Compatibility Percentage Pill at bottom-left */}
                    <div className="absolute bottom-3 left-3 bg-primary-container/90 backdrop-blur-xs text-on-primary px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border border-primary-fixed-dim/30">
                      <span className="material-symbols-outlined text-xs fill-icon text-secondary-fixed">
                        favorite
                      </span>
                      <span>{profile.matchScore}% अनुरूप जुळणी</span>
                    </div>

                    {/* District Pill at bottom-right */}
                    <div className="absolute bottom-3 right-3 bg-white/90 text-on-surface text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-secondary">
                        location_on
                      </span>
                      <span>{profile.district}</span>
                    </div>
                  </div>

                  {/* Content Zone: Name, Key Traits with Micro Gold Dots */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-primary">{profile.name}</h3>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {profile.age} वर्षे, {profile.height}
                      </span>
                    </div>

                    {/* Key Traits separated by micro gold dots */}
                    <div className="mt-2.5 flex items-center flex-wrap gap-1.5 text-xs text-on-surface-variant font-medium">
                      <span className="font-semibold text-on-surface">{profile.caste}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                      <span>{profile.education}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                      <span className="text-primary font-semibold">{profile.profession}</span>
                    </div>

                    {/* Company / Income Tag */}
                    <div className="mt-2.5 bg-surface-container-low p-2 rounded-xl text-xs flex items-center justify-between">
                      <span className="text-on-surface-variant truncate mr-1">
                        🏢 {profile.companyOrBusiness}
                      </span>
                      {profile.income && (
                        <span className="shrink-0 font-bold text-tertiary-container bg-emerald-50 px-1.5 py-0.5 rounded">
                          {profile.income}
                        </span>
                      )}
                    </div>

                    {/* Astro Details */}
                    <div className="mt-2 text-[11px] text-on-surface-variant flex items-center gap-2 flex-wrap">
                      <span>रास: {profile.rashi}</span>
                      <span>•</span>
                      <span>नक्षत्र: {profile.nakshatra}</span>
                      <span>•</span>
                      <span>गोत्र: {profile.gotra}</span>
                      <span>•</span>
                      <span
                        className={`font-semibold ${
                          profile.manglik === 'नाही' ? 'text-emerald-700' : 'text-amber-800'
                        }`}
                      >
                        मंगळ: {profile.manglik}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* View Bio Button */}
                    <button
                      id={`btn-view-${profile.id}`}
                      onClick={() => onSelectProfile(profile)}
                      className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs flex items-center justify-center gap-1 border border-secondary/30 transition-all active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                      <span>बायोडाटा पाहा</span>
                    </button>

                    {/* WhatsApp Direct Connect */}
                    <a
                      id={`btn-whatsapp-${profile.id}`}
                      href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#004019] font-bold text-xs flex items-center justify-center gap-1 border border-[#25D366]/40 transition-all active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base fill-icon text-[#128C7E]">
                        chat
                      </span>
                      <span>स्थळ चौकशी</span>
                    </a>
                  </div>

                  {/* Express Interest Primary Button */}
                  <button
                    id={`btn-interest-${profile.id}`}
                    onClick={() => onSelectProfile(profile)}
                    className="w-full py-2.5 px-3 rounded-xl bg-primary-container text-white hover:bg-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base fill-icon text-secondary-fixed">
                      favorite
                    </span>
                    <span>पसंती कळवा (Express Interest)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom CTA to Register own biodata */}
      <div className="mt-10 bg-gradient-to-r from-primary-container via-primary to-primary-container text-white p-6 sm:p-8 rounded-3xl text-center shadow-lg">
        <h3 className="text-xl sm:text-2xl font-serif font-bold">आपला स्वतःचा बायोडाटा नोंदवला आहे का?</h3>
        <p className="text-xs sm:text-sm text-surface-dim mt-1.5 max-w-lg mx-auto">
          आपल्या शैक्षणिक, कौटुंबिक व पत्रिकेच्या निकषांनुसार थेट योग्य स्थळे मिळवण्यासाठी आजच विनामूल्य नोंदणी करा.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onNavigateToRegister}
            className="px-6 py-3 bg-secondary-fixed text-on-secondary-fixed rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-secondary-container transition-transform active:scale-95 cursor-pointer"
          >
            बायोडाटा नोंदणी फॉर्म भरा
          </button>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white rounded-full font-semibold text-xs sm:text-sm border border-white/30 transition-transform active:scale-95"
          >
            समुपदेशकांशी चर्चा करा
          </a>
        </div>
      </div>
    </div>
  );
};
