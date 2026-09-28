import React, { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'मुलींसाठी ही सेवा खरंच पूर्णपणे मोफत आहे का?',
    answer:
      'होय! लग्न एक पवित्र बंधन अंतर्गत वधू (मुलींसाठी) नावनोंदणी, प्रोफाईल पडताळणी आणि स्थळ जुळवणी सेवा १००% विनामूल्य आहे. मुलींकडून कोणतीही छुपी फी किंवा कमिशन आकारले जात नाही.'
  },
  {
    id: 'faq-2',
    question: 'माझा बायोडाटा भरल्यानंतर पुढे काय होईल?',
    answer:
      'इन-अ‍ॅप फॉर्म सबमिट केल्यानंतर आमची टीम २४ तासांच्या आत आपल्याशी संपर्क साधून माहितीची खात्री करते. त्यानंतर दोन्ही कुटुंबांच्या अपेक्षा, शिक्षण व कौटुंबिक पार्श्वभूमी लक्षात घेऊन योग्य स्थळांची शिफारस केली जाते.'
  },
  {
    id: 'faq-3',
    question: 'फोटो पब्लिक वेबसाइटवर सर्वांना दिसतात का?',
    answer:
      'बिलकुल नाही. उमेदवारांचे फोटो अथवा वैयक्तिक संपर्क क्रमांक सार्वजनिकपणे वेबसाइटवर प्रदर्शित केले जात नाहीत. संपूर्ण गोपनीयता पाळली जाते आणि केवळ परस्पर संमतीनेच कुटुंबांमध्ये माहितीची देवाणघेवाण केली जाते.'
  },
  {
    id: 'faq-4',
    question: 'पत्रिका व गुणमिलनाची माहिती कशी पाहिली जाते?',
    answer:
      'नोंदणी करताना जन्मदिनांक, वेळ, जन्मठिकाण, रास, नक्षत्र व मंगळ दोष अशी आवश्यक पत्रिका माहिती इन-अ‍ॅप फॉर्ममध्ये घेतली जाते. तसेच आमच्या वेबसाइटवर ३६ गुणमिलन व अष्टकूट पद्धतीचे सविस्तर माहितीपूर्ण मार्गदर्शन उपलब्ध आहे, जेणेकरून कुटुंबे आपल्या कौटुंबिक ज्योतिषांच्या साहाय्याने सुलभतेने गुणमिलन तपासू शकतात.'
  },
  {
    id: 'faq-5',
    question: 'मुलांसाठी (वर) आणि मुलींसाठी (वधू) नोंदणी प्रक्रिया कशी आहे?',
    answer:
      'नोंदणी प्रक्रिया अत्यंत सोपी व जलद आहे. आमच्या वेबसाइटवरील थेट इन-अ‍ॅप फॉर्मद्वारे अवघ्या २ मिनिटांत नाव, शिक्षण, नोकरी/व्यवसाय व कौटुंबिक माहिती सुरक्षितपणे नोंदवता येते.'
  },
  {
    id: 'faq-6',
    question: 'वेबसाइटवर सर्व उमेदवारांची खुली यादी का दिसत नाही?',
    answer:
      'उमेदवारांची १००% गोपनीयता आणि सुरक्षितता राखण्यासाठी आम्ही मुला-मुलींची वैयक्तिक माहिती इंटरनेटवर सार्वजनिकपणे खुली ठेवत नाही. नोंदणीकृत आणि पडताळणी झालेल्या सुसंस्कृत कुटुंबांनाच परस्पर संमतीने योग्य स्थळे सुचवली जातात.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq-section" className="py-8 px-4 sm:px-6 max-w-3xl mx-auto">
      <h3 className="text-center text-xl sm:text-2xl font-serif text-primary font-bold mb-6">
        वारंवार विचारले जाणारे प्रश्न (FAQ)
      </h3>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              id={item.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  className={`material-symbols-outlined text-secondary transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  data-icon="expand_more"
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-surface-container text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
