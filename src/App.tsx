import React, { useState, useEffect } from 'react';
import { StudentProfile, Subject } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, AppView } from './components/layout/Sidebar';
import { LandingWelcome } from './components/landing/LandingWelcome';
import { RegistrationWizard } from './components/auth/RegistrationWizard';
import { LoginModal } from './components/auth/LoginModal';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { AITutorView } from './components/tutor/AITutorView';
import { ExerciseScannerView } from './components/scanner/ExerciseScannerView';
import { PracticeArenaView } from './components/practice/PracticeArenaView';
import { KnowledgeMapView } from './components/progress/KnowledgeMapView';
import { SubjectManagerModal } from './components/subjects/SubjectManagerModal';
import { ProfileSettingsModal } from './components/profile/ProfileSettingsModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [appState, setAppState] = useState<'welcome' | 'register' | 'app'>('welcome');
  const [activeView, setActiveView] = useState<AppView>('dashboard');

  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Cross navigation parameters
  const [tutorSubject, setTutorSubject] = useState<Subject | null>(null);
  const [practiceSubjectId, setPracticeSubjectId] = useState<string | undefined>(undefined);
  const [practiceTopicName, setPracticeTopicName] = useState<string | undefined>(undefined);

  // Load current user from storage on mount
  useEffect(() => {
    const user = storageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const refreshCurrentUser = () => {
    const user = storageService.getCurrentUser();
    setCurrentUser(user ? { ...user } : null);
  };

  const handleStartFromLanding = () => {
    if (currentUser) {
      setAppState('app');
      setActiveView('dashboard');
    } else {
      setAppState('register');
    }
  };

  const handleRegistrationComplete = (newProfile: StudentProfile) => {
    setCurrentUser(newProfile);
    setAppState('app');
    setActiveView('dashboard');
  };

  const handleOpenTutorForSubject = (subject: Subject, topicName?: string) => {
    setTutorSubject(subject);
    setActiveView('tutor');
  };

  const handleNavigateToPractice = (subjectId?: string, topicName?: string) => {
    setPracticeSubjectId(subjectId);
    setPracticeTopicName(topicName);
    setActiveView('practice');
  };

  const handleNavigateToTutor = (subjectId?: string, topicName?: string) => {
    if (subjectId && currentUser) {
      const found = currentUser.subjects.find(s => s.id === subjectId);
      if (found) setTutorSubject(found);
    }
    setActiveView('tutor');
  };

  // Welcome Screen (Requirement 12)
  if (appState === 'welcome') {
    return (
      <>
        <LandingWelcome
          currentUser={currentUser}
          onStart={handleStartFromLanding}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSelectUser={(u) => {
            setCurrentUser(u);
            setAppState('app');
          }}
          onGoToRegister={() => setAppState('register')}
        />
      </>
    );
  }

  // Registration Screen (Requirement 2 & 3)
  if (appState === 'register') {
    return (
      <RegistrationWizard
        onComplete={handleRegistrationComplete}
        onCancel={() => setAppState(currentUser ? 'app' : 'welcome')}
      />
    );
  }

  // Main App View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white pb-16 lg:pb-0">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenAddSubject={() => setIsAddSubjectModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onGoHome={() => setAppState('welcome')}
      />

      {/* Main Container with Sidebar + View */}
      <div className="flex-1 flex w-full">
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          currentUser={currentUser}
          onOpenAddSubject={() => setIsAddSubjectModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />

        {/* Content View Container */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {currentUser && activeView === 'dashboard' && (
            <DashboardOverview
              currentUser={currentUser}
              onOpenAddSubject={() => setIsAddSubjectModalOpen(true)}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onNavigateToTutor={handleNavigateToTutor}
              onNavigateToScanner={() => setActiveView('scanner')}
              onNavigateToPractice={handleNavigateToPractice}
              onNavigateToMap={() => setActiveView('knowledge_map')}
            />
          )}

          {currentUser && activeView === 'tutor' && (
            <AITutorView
              currentUser={currentUser}
              initialSubject={tutorSubject}
              onNavigateToPractice={handleNavigateToPractice}
            />
          )}

          {currentUser && activeView === 'scanner' && (
            <ExerciseScannerView
              currentUser={currentUser}
              onSendToTutor={(query, subName) => {
                setActiveView('tutor');
              }}
              onSendToPractice={(subName) => {
                setActiveView('practice');
              }}
            />
          )}

          {currentUser && activeView === 'practice' && (
            <PracticeArenaView
              currentUser={currentUser}
              initialSubjectId={practiceSubjectId}
              initialTopicName={practiceTopicName}
              onUpdatedProfile={refreshCurrentUser}
              onNavigateToTutor={handleNavigateToTutor}
            />
          )}

          {currentUser && activeView === 'knowledge_map' && (
            <KnowledgeMapView
              currentUser={currentUser}
              onNavigateToPractice={handleNavigateToPractice}
              onNavigateToTutor={handleNavigateToTutor}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {currentUser && (
        <>
          <SubjectManagerModal
            isOpen={isAddSubjectModalOpen}
            onClose={() => setIsAddSubjectModalOpen(false)}
            subjects={currentUser.subjects}
            onSubjectsUpdated={refreshCurrentUser}
            onOpenTutorForSubject={handleOpenTutorForSubject}
          />

          <ProfileSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
            currentUser={currentUser}
            onProfileUpdated={refreshCurrentUser}
            onSwitchAccount={() => setIsLoginModalOpen(true)}
          />
        </>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSelectUser={(u) => {
          setCurrentUser(u);
          setAppState('app');
        }}
        onGoToRegister={() => setAppState('register')}
      />
    </div>
  );
}
