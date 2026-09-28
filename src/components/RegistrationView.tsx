import React, { useState } from 'react';
import { BiodataFormState } from '../types';
import {
  RASHI_OPTIONS,
  HEIGHT_OPTIONS,
  VARNA_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  SIBLING_COUNT_OPTIONS
} from '../data/formOptions';
import { submitBiodataHeadless, generateWhatsAppBiodataUrl } from '../utils/submitToGoogleForm';

interface RegistrationViewProps {
  initialGender?: 'bride' | 'groom';
  onNavigateHome: () => void;
  onNavigateProfiles?: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  initialGender = 'bride',
  onNavigateHome,
}) => {
  const [formData, setFormData] = useState<BiodataFormState>({
    gender: initialGender,
    caste: 'मराठा (९६ कुळी)',
    subcaste: '',
    fullName: '',
    surname: '',
    dob: '',
    birthTime: '',
    rashi: 'मेष / Aries',
    height: '5ft 4in / 162 cms',
    varna: 'गव्हाळ / Wheatish',
    bloodGroup: 'माहिती नाही',
    education: '',
    currentJob: '',
    salary: '',
    agriculture: '',
    address: '',
    nativeVillage: '',
    fatherName: '',
    uncleName: '',
    sister: 'नाही / None',
    brother: 'नाही / None',
    mamaName: '',
    mamaVillage: '',
    expectations: '',
    relations: '',
    contactNumber: '',
    email: '',
    agreedToTerms: true,
  });

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regId, setRegId] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSwitch = (gender: 'bride' | 'groom') => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `LEPB-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegId(generatedId);

    // Silent background dispatch to Google Forms backend
    await submitBiodataHeadless(formData);

    // Fire Meta Pixel & GA4 conversion events for ad tracking
    try {
      if (typeof window !== 'undefined') {
        const win = window as unknown as {
          fbq?: (type: string, event: string, params?: Record<string, unknown>) => void;
          gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
        };
        if (typeof win.fbq === 'function') {
          win.fbq('track', 'Lead', {
            content_name: 'Biodata Registration',
            content_category: formData.gender === 'bride' ? 'वधू (Bride)' : 'वर (Groom)',
            value: 0,
            currency: 'INR',
          });
        }
        if (typeof win.gtag === 'function') {
          win.gtag('event', 'generate_lead', {
            event_category: 'Biodata Registration',
            event_label: formData.gender === 'bride' ? 'Bride' : 'Groom',
          });
        }
      }
    } catch {
      // Ignore tracking errors to avoid blocking UI
    }

    // Simulated short smooth transition
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const isBride = formData.gender === 'bride';

  // -----------------------------------------------------------------------------
  // SUCCESS / CONFIRMATION MODAL STATE
  // -----------------------------------------------------------------------------
  if (isSubmitted) {
    const whatsappUrl = generateWhatsAppBiodataUrl(formData);

    return (
      <div id="submission-success-view" className="py-10 px-4 sm:px-6 max-w-xl mx-auto text-center">
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl card-shadow border border-secondary/20">
          <div className="w-16 h-16 bg-[#25d366]/15 text-[#128c7e] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#25d366]/30">
            <span className="material-symbols-outlined text-4xl fill-icon" data-icon="check_circle">
              check_circle
            </span>
          </div>

          <span className="text-xs bg-secondary-fixed text-on-secondary-fixed font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            नोंदणी यशस्वी
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif text-primary font-bold mt-2">
            अभिनंदन! बायोडाटा सुरक्षित जमा झाला
          </h2>

          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            आपली माहिती आमच्या विवाह समन्वयकांकडे सुरक्षितपणे नोंदली गेली आहे. पडताळणीनंतर आपल्या
            अपेक्षेनुसार योग्य स्थळांची यादी आपणास पाठवण्यात येईल.
          </p>

          <div className="my-5 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-left">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-surface-container">
              <span className="text-on-surface-variant font-medium">नोंदणी क्रमांक (ID):</span>
              <strong className="text-primary font-bold tracking-wider">{regId}</strong>
            </div>
            <div className="flex justify-between items-center text-xs py-2 border-b border-surface-container">
              <span className="text-on-surface-variant font-medium">उमेदवाराचे नाव:</span>
              <span className="font-semibold text-on-surface">
                {formData.fullName} {formData.surname} ({isBride ? 'वधू' : 'वर'})
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-on-surface-variant font-medium">संपर्क:</span>
              <span className="font-semibold text-on-surface">{formData.contactNumber}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              id="success-whatsapp-share-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-xl fill-icon">chat</span>
              <span>व्हॉट्सअ‍ॅपवर तात्काळ बायोडाटा पाठवा</span>
            </a>

            <button
              onClick={onNavigateHome}
              className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              मुख्य पृष्ठावर परत जा
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------------
  // PRIMARY IN-APP BIODATA FORM
  // -----------------------------------------------------------------------------
  return (
    <div id="registration-screen" className="py-6 sm:py-10 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold px-3.5 py-1 rounded-full border border-secondary/30 mb-2">
          <span className="material-symbols-outlined text-sm fill-icon" data-icon="lock">
            lock
          </span>
          <span>१००% सुरक्षित व कौटुंबिक गोपनीयता हमी</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold">
          विवाह माहितीपत्रक (बायोडाटा नोंदणी)
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
          खालील माहिती भरा. कोणत्याही माहिती संदर्भात उत्तर माहिती नसल्यास <strong>No</strong> लिहा.
        </p>
      </div>

      {/* GENDER / CANDIDATE TYPE SELECTOR */}
      <div className="flex bg-surface-container p-1 rounded-2xl mb-6 max-w-md mx-auto border border-outline-variant/30">
        <button
          type="button"
          onClick={() => handleGenderSwitch('bride')}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isBride
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span>वधू (मुलींसाठी)</span>
          <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.2 rounded-full font-bold">
            मोफत
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleGenderSwitch('groom')}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            !isBride
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span>वर (मुलांसाठी)</span>
        </button>
      </div>

      {/* STEP INDICATOR TABS */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-6 text-center text-xs">
        {[
          { step: 1, title: 'वैयक्तिक', icon: 'person' },
          { step: 2, title: 'शिक्षण/नोकरी', icon: 'work' },
          { step: 3, title: 'कुटुंब', icon: 'family_restroom' },
          { step: 4, title: 'अपेक्षा/संपर्क', icon: 'contact_phone' },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step as 1 | 2 | 3 | 4)}
            className={`py-2 px-1 rounded-xl font-semibold transition-all cursor-pointer border flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeStep === s.step
                ? 'bg-primary text-white border-primary shadow-xs'
                : activeStep > s.step
                ? 'bg-secondary-fixed/40 text-on-secondary-fixed border-secondary/30'
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{s.icon}</span>
            <span className="truncate">{s.title}</span>
          </button>
        ))}
      </div>

      {/* FORM CONTAINER */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest p-5 sm:p-8 rounded-3xl card-shadow border border-outline-variant/30 space-y-6"
      >
        {/* ========================================================================= */}
        {/* STEP 1: वैयक्तिक व जन्म माहिती (Personal & Kundali Details) */}
        {/* ========================================================================= */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-surface-container pb-2">
              <h3 className="text-base font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">badge</span>
                <span>१. वैयक्तिक व जन्म कुंडली माहिती</span>
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                उमेदवाराचे नाव, जात, जन्म तारीख व कुंडली तपशील
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  संपूर्ण नाव / Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="उदा. राहुल / प्रियांका"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  आडनाव / Surname <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  required
                  placeholder="उदा. पाटील, जोशी, शिंदे"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  जात / Caste <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="caste"
                  required
                  placeholder="उदा. मराठा, ब्राह्मण, वाणी, इ."
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  उपजाती / Subcaste <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="subcaste"
                  required
                  placeholder="उदा. ९६ कुळी, देशस्थ, चित्पावन, No"
                  value={formData.subcaste}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  जन्म तारीख / Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  जन्म वेळ / Birth Time (पर्यायी)
                </label>
                <input
                  type="text"
                  name="birthTime"
                  placeholder="उदा. सकाळी ०८:३० किंवा No"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  राशी / Rashi <span className="text-red-600">*</span>
                </label>
                <select
                  name="rashi"
                  value={formData.rashi}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {RASHI_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  उंची / Height <span className="text-red-600">*</span>
                </label>
                <select
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {HEIGHT_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  वर्ण / Varna <span className="text-red-600">*</span>
                </label>
                <select
                  name="varna"
                  value={formData.varna}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {VARNA_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  रक्तगट / Blood Group <span className="text-red-600">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {BLOOD_GROUP_OPTIONS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>पुढील पायरी: शिक्षण व नोकरी</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: शिक्षण, नोकरी व उत्पन्न (Education & Career) */}
        {/* ========================================================================= */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-surface-container pb-2">
              <h3 className="text-base font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">school</span>
                <span>२. शिक्षण, नोकरी व शेती माहिती</span>
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                शिक्षण, सध्याचे पद, वार्षिक उत्पन्न व शेतजमीन तपशील
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  शिक्षण / Education <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="education"
                  required
                  placeholder="उदा. B.E. Computer, MBA, MBBS, M.Com"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  सध्याची नोकरी / Current Job <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="currentJob"
                  required
                  placeholder="उदा. Software Engineer, Govt Job, स्वतःचा व्यवसाय"
                  value={formData.currentJob}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  वेतन / Salary (वार्षिक/मासिक) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="salary"
                  required
                  placeholder="उदा. १२ लाख/वर्ष किंवा ५०,०००/महिना"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  शेती / Agriculture (पर्यायी)
                </label>
                <input
                  type="text"
                  name="agriculture"
                  placeholder="उदा. ५ एकर बागायत शेती किंवा No"
                  value={formData.agriculture}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                मागील पायरी
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>पुढील पायरी: कौटुंबिक माहिती</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: कौटुंबिक माहिती (Family & Relative Details) */}
        {/* ========================================================================= */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-surface-container pb-2">
              <h3 className="text-base font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">cottage</span>
                <span>३. कौटुंबिक माहिती व मूळगाव</span>
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                आई-वडील, भावंडे, मामांचे नाव व मूळगाव तपशील
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  वडिलांचं संपूर्ण नाव / Father's Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  required
                  placeholder="वडिलांचे नाव व व्यवसाय"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  काका / Uncle's Name (पर्यायी)
                </label>
                <input
                  type="text"
                  name="uncleName"
                  placeholder="काकांचे नाव किंवा No"
                  value={formData.uncleName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  बहीण / Sister <span className="text-red-600">*</span>
                </label>
                <select
                  name="sister"
                  value={formData.sister}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {SIBLING_COUNT_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  भाऊ / Brother <span className="text-red-600">*</span>
                </label>
                <select
                  name="brother"
                  value={formData.brother}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                >
                  {SIBLING_COUNT_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  मामाचे नाव / Mama's Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="mamaName"
                  required
                  placeholder="मामांचे नाव व आडनाव"
                  value={formData.mamaName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  मामाचे गाव / Mama's Village <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="mamaVillage"
                  required
                  placeholder="उदा. बारामती, कराड, नाशिक"
                  value={formData.mamaVillage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  मुळगाव / Native Village <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nativeVillage"
                  required
                  placeholder="उदा. शिरूर, जि. पुणे"
                  value={formData.nativeVillage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  संपूर्ण पत्ता / Complete Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="सध्या राहण्याचा पूर्ण पत्ता"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                मागील पायरी
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>पुढील पायरी: अपेक्षा व संपर्क</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: अपेक्षा, नातेसंबंध व संपर्क (Expectations & Contact) */}
        {/* ========================================================================= */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-surface-container pb-2">
              <h3 className="text-base font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">favorite</span>
                <span>४. जोडीदाराकडून अपेक्षा व संपर्क माहिती</span>
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                अपेक्षित स्थळाचे शिक्षण, शहर, नातेसंबंध व संपर्क क्रमांक
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                अपेक्षा / Partner Expectations <span className="text-red-600">*</span>
              </label>
              <textarea
                name="expectations"
                required
                rows={3}
                placeholder="उदा. उच्चशिक्षित (BE/MBA), पुणे/मुंबई येथे नोकरी करणारा, समजूतदार, व्यसनमुक्त."
                value={formData.expectations}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                नातेसंबंध / Relations <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="relations"
                required
                placeholder="उदा. नाशिक, पुणे येथील नातेवाईक किंवा No"
                value={formData.relations}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  संपर्क क्रमांक / WhatsApp Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  placeholder="१० अंकी मोबाईल नंबर (उदा. 9876543210)"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  ई-मेल / Email (पर्यायी)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="उदा. yourname@gmail.com किंवा No"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms-check"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                className="mt-0.5 accent-primary w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="terms-check" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                मी जाहीर करतो/करते की वर दिलेली सर्व माहिती सत्य व पडताळणीयोग्य आहे. माझ्या संमतीने हा बायोडाटा
                लग्न एक पवित्र बंधन मंचावर जोडला जात आहे.
              </label>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                मागील पायरी
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreedToTerms}
                className="px-8 py-3.5 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">sync</span>
                    <span>बायोडाटा जमा होत आहे...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base fill-icon">check_circle</span>
                    <span>बायोडाटा सुरक्षितपणे सबमिट करा</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
