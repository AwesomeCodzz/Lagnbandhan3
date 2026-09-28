import React, { useState } from 'react';
import { Profile } from '../types';

interface ProfileDetailModalProps {
  profile: Profile | null;
  onClose: () => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({ profile, onClose }) => {
  const [interestSent, setInterestSent] = useState(false);

  if (!profile) return null;

  const isBride = profile.gender === 'bride';
  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `नमस्कार, मला ${profile.name} (आयडी: ${profile.id}, शिक्षण: ${profile.education}, जिल्हा: ${profile.district}) यांच्या स्थळाबाबत कौटुंबिक संपर्क व पत्रिका मिळवायची आहे.`
  )}`;

  const handleSendInterest = () => {
    setInterestSent(true);
    setTimeout(() => {
      window.open(whatsappInquiryUrl, '_blank');
    }, 600);
  };

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="profile-modal-dialog"
        className="bg-surface-container-lowest w-full max-w-lg rounded-3xl overflow-hidden card-shadow border border-outline-variant/40 my-auto relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="close-profile-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="बंद करा"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Modal Header with Portrait & Verification Banner */}
        <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            width={512}
            height={320}
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
            <div className="text-white w-full">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs fill-icon">verified</span>
                  पडताळणीकृत स्थळ
                </span>
                <span className="bg-primary-container text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {profile.id} • {isBride ? 'वधू' : 'वर'}
                </span>
                <span className="text-xs text-secondary-fixed font-bold ml-auto">
                  {profile.matchScore}% अनुरूप
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">{profile.name}</h2>
              <p className="text-xs sm:text-sm text-surface-dim">
                {profile.age} वर्षे • {profile.height} • {profile.city} ({profile.district})
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body with Tabular Biodata Sections */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* 1. Academic & Career */}
          <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-base">school</span>
              <span>शिक्षण व करिअर तपशील</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-on-surface-variant text-[11px]">शिक्षण:</span>
                <p className="font-semibold text-on-surface">{profile.education}</p>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px]">नोकरी / व्यवसाय:</span>
                <p className="font-semibold text-primary">{profile.profession}</p>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px]">कंपनी / फर्म:</span>
                <p className="font-medium text-on-surface">{profile.companyOrBusiness}</p>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px]">वार्षिक पॅकेज / उत्पन्न:</span>
                <p className="font-bold text-tertiary-container">{profile.income || 'उपलब्ध'}</p>
              </div>
            </div>
          </div>

          {/* 2. Family & Caste Background */}
          <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-base">family_restroom</span>
              <span>जात व कौटुंबिक पार्श्वभूमी</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-on-surface-variant text-[11px]">जात / समाज:</span>
                <p className="font-semibold text-on-surface">{profile.caste}</p>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px]">गोत्र:</span>
                <p className="font-semibold text-on-surface">{profile.gotra}</p>
              </div>
              <div className="col-span-2">
                <span className="text-on-surface-variant text-[11px]">कुटुंब परिचय:</span>
                <p className="font-medium text-on-surface mt-0.5">{profile.familyDetails}</p>
              </div>
            </div>
          </div>

          {/* 3. Horoscope (पत्रिका) Details */}
          <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>पत्रिका व जन्म तपशील</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-on-surface-variant">रास</span>
                <p className="font-bold text-primary">{profile.rashi}</p>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-on-surface-variant">नक्षत्र</span>
                <p className="font-bold text-primary">{profile.nakshatra}</p>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-on-surface-variant">मंगळ</span>
                <p className="font-bold text-secondary">{profile.manglik}</p>
              </div>
            </div>
          </div>

          {/* 4. Partner Expectations */}
          <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-base">favorite_border</span>
              <span>अपेक्षित जोडीदार</span>
            </h4>
            <p className="text-on-surface font-medium leading-relaxed">
              {profile.partnerExpectations}
            </p>
          </div>

          {/* 5. Personal Note / About */}
          <div className="p-3 bg-secondary-fixed/20 rounded-2xl border border-secondary/20">
            <p className="text-xs text-on-surface italic leading-relaxed">
              "{profile.about}"
            </p>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row gap-2.5">
          <button
            id="send-interest-modal-btn"
            onClick={handleSendInterest}
            disabled={interestSent}
            className="flex-1 min-h-[44px] bg-primary-container text-white hover:bg-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-75"
          >
            <span className="material-symbols-outlined text-lg fill-icon text-secondary-fixed">
              {interestSent ? 'check_circle' : 'favorite'}
            </span>
            <span>{interestSent ? 'पसंती नोंदवली! संपर्क उघडत आहे...' : 'पसंती कळवा (Express Interest)'}</span>
          </button>

          <a
            id="whatsapp-inquire-modal-btn"
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg fill-icon">chat</span>
            <span>व्हॉट्सअ‍ॅपवर संपर्क करा</span>
          </a>
        </div>
      </div>
    </div>
  );
};
