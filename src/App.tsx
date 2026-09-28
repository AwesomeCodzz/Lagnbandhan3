import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ScreenType } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MetricsSection } from './components/MetricsSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SafetyPledgeSection } from './components/SafetyPledgeSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const RegistrationView = lazy(() =>
  import('./components/RegistrationView').then((m) => ({ default: m.RegistrationView }))
);
const KundaliGuideView = lazy(() =>
  import('./components/KundaliGuideView').then((m) => ({ default: m.KundaliGuideView }))
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [regInitialGender, setRegInitialGender] = useState<'bride' | 'groom'>('bride');

  // Scroll to top when switching screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNavigate = (screen: ScreenType) => {
    if (screen === 'profiles') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleOpenQuickRegister = (gender: 'bride' | 'groom') => {
    setRegInitialGender(gender);
    setCurrentScreen('register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* STICKY HEADER & TOP ANNOUNCEMENT */}
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* SCREEN CONTENT */}
      <main className="flex-grow">
        {currentScreen === 'home' && (
          <>
            {/* HERO WITH BRIDE & GROOM CTAs */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenQuickRegister={handleOpenQuickRegister}
            />

            {/* 4 PROOF METRICS */}
            <MetricsSection />

            {/* 3-STEP EASY WORKFLOW */}
            <ProcessSection onNavigate={handleNavigate} />

            {/* VERIFIED SUCCESS STORIES */}
            <TestimonialsSection />

            {/* SAFETY & PRIVACY PLEDGE */}
            <SafetyPledgeSection onNavigate={handleNavigate} />

            {/* FREQUENTLY ASKED QUESTIONS */}
            <FaqSection />
          </>
        )}

        <Suspense
          fallback={
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-on-surface-variant font-medium">कृपया प्रतीक्षा करा...</span>
            </div>
          }
        >
          {currentScreen === 'register' && (
            <RegistrationView
              initialGender={regInitialGender}
              onNavigateHome={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'kundali' && <KundaliGuideView />}
        </Suspense>
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING WHATSAPP BUTTON WITH HELPER PILL */}
      <WhatsAppFloatingButton />

      {/* MOBILE BOTTOM NAVIGATION (95% MOBILE AUDIENCE) */}
      <MobileBottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
