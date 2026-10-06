import React, { useState, useEffect } from 'react';
import { CollegeProvider, useCollege } from './context/CollegeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { ProvostPage } from './components/public/ProvostPage';
import { ProgrammesPage } from './components/public/ProgrammesPage';
import { DepartmentsPage } from './components/public/DepartmentsPage';
import { FacilitiesPage } from './components/public/FacilitiesPage';
import { GalleryPage } from './components/public/GalleryPage';
import { NewsPage } from './components/public/NewsPage';
import { AnnouncementsPage } from './components/public/AnnouncementsPage';
import { DownloadsPage } from './components/public/DownloadsPage';
import { ContactPage } from './components/public/ContactPage';
import { ApplicantPortal } from './components/portal/ApplicantPortal';
import { PortalLayout } from './components/portal/PortalLayout';
import { LoginModal } from './components/common/LoginModal';

const MainContent: React.FC = () => {
  const { activeView, setActiveView } = useCollege();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  if (activeView === 'portal') {
    return <PortalLayout onBackToWebsite={() => setActiveView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-800 selection:text-amber-300">
      <Navbar onNavigate={setActiveView} activeView={activeView} />

      <main className="flex-1">
        {activeView === 'home' && <HomePage onNavigate={setActiveView} />}
        {activeView === 'about' && <AboutPage onNavigate={setActiveView} />}
        {activeView === 'provost' && <ProvostPage onNavigate={setActiveView} />}
        {activeView === 'programmes' && <ProgrammesPage onNavigate={setActiveView} />}
        {activeView === 'departments' && <DepartmentsPage onNavigate={setActiveView} />}
        {activeView === 'facilities' && <FacilitiesPage onNavigate={setActiveView} />}
        {activeView === 'gallery' && <GalleryPage />}
        {activeView === 'news' && <NewsPage />}
        {activeView === 'announcements' && <AnnouncementsPage onNavigate={setActiveView} />}
        {activeView === 'downloads' && <DownloadsPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'admission' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <ApplicantPortal />
          </div>
        )}
      </main>

      <Footer onNavigate={setActiveView} />
      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <CollegeProvider>
      <MainContent />
    </CollegeProvider>
  );
}
