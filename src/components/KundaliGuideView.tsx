import React, { useState } from 'react';

const ASHTAKOOTA_GUNAS = [
  { name: 'वर्ण (Varna)', maxScore: 1, desc: 'कार्य, आचारविचार व आध्यात्मिक सुसंगतता' },
  { name: 'वश्य (Vashya)', maxScore: 2, desc: 'परस्पर आकर्षण, आदर व समतोल' },
  { name: 'तारा (Tara)', maxScore: 3, desc: 'भाग्य, दीर्घायुष्य व आरोग्य' },
  { name: 'योनी (Yoni)', maxScore: 4, desc: 'शारीरिक व मानसिक सामंजस्य' },
  { name: 'ग्रहमैत्री (Graha Maitri)', maxScore: 5, desc: 'दोघांमधील मैत्री व विचारसरणीचे ऐक्य' },
  { name: 'गण (Gana)', maxScore: 6, desc: 'स्वभाव जुळणी (देव, मनुष्य, राक्षस गण)' },
  { name: 'भकूट (Bhakoot)', maxScore: 7, desc: 'कौटुंबिक समृद्धी, प्रेम व प्रगती' },
  { name: 'नाडी (Nadi)', maxScore: 8, desc: 'संतती सुख, आरोग्य व अनुवांशिकता' },
];

export const KundaliGuideView: React.FC = () => {
  const [selectedGunaScore, setSelectedGunaScore] = useState<number>(28);

  const getVerdict = (score: number) => {
    if (score < 18) {
      return {
        title: 'असमाधानकारक / विशेष उपाय आवश्यक',
        desc: 'शास्त्रानुसार १८ पेक्षा कमी गुण असल्यास अनुभवी ज्योतिषांचा सल्ला आणि ग्रह शांती उपाय आवश्यक मानले जातात.',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
      };
    } else if (score <= 24) {
      return {
        title: 'मध्यम व उत्तम जुळणी (शुभ)',
        desc: 'वैवाहिक जीवनासाठी योग्य जुळणी मानली जाते. परस्पर समजुतीने सुखी संसार घडतो.',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      };
    } else if (score <= 32) {
      return {
        title: 'अत्यंत शुभ व अनुरूप रेशीमगाठ (सर्वोत्तम)',
        desc: '२५ ते ३२ गुण अत्यंत सुसंवादी मानले जातात. दोन्ही परिवारांसाठी हा विवाह मंगलदायी ठरतो.',
        color: 'text-primary bg-primary-fixed/30 border-primary/20',
      };
    } else {
      return {
        title: 'सर्वोत्कृष्ट दुर्मिळ जुळणी (अति-उत्कृष्ट)',
        desc: '३३ ते ३६ गुण अत्यंत दुर्मिळ मानले जातात. जन्मोजन्मींचे पवित्र बंधन!',
        color: 'text-secondary-fixed-variant bg-secondary-fixed/40 border-secondary/30',
      };
    }
  };

  const verdict = getVerdict(selectedGunaScore);

  return (
    <div id="kundali-screen" className="py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold px-3 py-1 rounded-full border border-secondary/30 mb-2">
          <span className="material-symbols-outlined text-sm fill-icon">auto_awesome</span>
          <span>अष्टकूट ३६ गुण विचार</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-primary font-bold">
          पत्रिका व गुणमिलन मार्गदर्शन
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5">
          हिंदू परंपरेनुसार विवाह जुळवताना पत्रिका गुणमिलन, मंगळ दोष व नाडी दोष याविषयी सविस्तर माहिती.
        </p>
      </div>

      {/* Interactive Guna Score Explainer */}
      <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 card-shadow mb-8">
        <h2 className="text-base sm:text-lg font-bold text-primary mb-3">
          ३६ गुणांचे महत्त्व व फलित
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
          खालील स्लाइडर फिरवून गुणांनुसार विवाहाचे फलित समजून घ्या:
        </p>

        {/* Score Slider */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-on-surface-variant">मिळालेले गुण:</span>
            <span className="text-2xl font-serif font-bold text-primary">
              {selectedGunaScore} / ३६
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={36}
            value={selectedGunaScore}
            onChange={(e) => setSelectedGunaScore(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-outline-variant/30 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-on-surface-variant mt-1">
            <span>१० (कमी)</span>
            <span>१८ (किमान आवश्यक)</span>
            <span>२५ (उत्तम)</span>
            <span>३६ (सर्वोत्कृष्ट)</span>
          </div>
        </div>

        {/* Dynamic Verdict Card */}
        <div className={`p-4 rounded-2xl border ${verdict.color} transition-all`}>
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <span className="material-symbols-outlined fill-icon">verified</span>
            <span>{verdict.title}</span>
          </div>
          <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">{verdict.desc}</p>
        </div>
      </div>

      {/* 8 Ashtakoot Guna breakdown cards */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-4 text-center">
          अष्टकूट विचार (८ पैलूंचे ३६ गुण)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ASHTAKOOTA_GUNAS.map((item, idx) => (
            <div
              key={item.name}
              className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 flex items-start gap-3 shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-secondary-fixed/40 text-secondary font-bold flex items-center justify-center shrink-0 text-sm">
                ०{idx + 1}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-primary">{item.name}</h4>
                  <span className="text-xs font-bold text-secondary bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {item.maxScore} गुण
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Doubts: Manglik & Nadi Dosha */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 space-y-4 mb-8">
        <h3 className="text-lg font-serif font-bold text-primary">
          महत्त्वाचे गैरसमज व उत्तरे (मंगळ व नाडी दोष)
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-on-surface-variant">
          <div className="bg-white p-4 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-primary text-sm mb-1">मंगळ (मांगलिक) असणे म्हणजे भीतीदायक का?</h4>
            <p className="leading-relaxed">
              नाही! जवळपास ४५% पत्रिकांमध्ये मंगळ असतो. सौम्य मंगळ अथवा वयाच्या २८ वर्षानंतर मंगळाचा प्रभाव कमी होतो. तसेच मंगळ असलेल्या स्थळाला मंगळ असलेले स्थळ जुळल्यास दोष राहत नाही.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-primary text-sm mb-1">नाडी दोष लागल्यास काय करावे?</h4>
            <p className="leading-relaxed">
              एकच नाडी असल्यास नाडी दोष मानला जातो. परंतु रास किंवा नक्षत्र भिन्न असल्यास नाडी दोषाचा परिहार (निवारण) शास्त्रात मान्य आहे.
            </p>
          </div>
        </div>
      </div>

      {/* Traditional Values & Meaningful Guidance Note */}
      <div className="bg-surface-container-high/70 border border-outline-variant/30 rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <span className="material-symbols-outlined text-4xl text-secondary fill-icon">
          volunteer_activism
        </span>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-primary">
          संस्कार, सामंजस्य आणि परस्पर आदर हेच सुखी संसाराचा खरा पाया
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          पत्रिका व अष्टकूट गुणमिलन हा हिंदू विवाह परंपरेतील सुसंवादाचा एक आदरणीय मार्गदर्शक भाग आहे. वैवाहिक जीवनात वधू-वरांचे उच्च विचार, एकमेकांप्रती निष्ठा, समजूतदारपणा आणि दोन्ही कुटुंबांचे कौटुंबिक संस्कार हेच चिरंतन सुखाची हमी देतात.
        </p>
      </div>
    </div>
  );
};
