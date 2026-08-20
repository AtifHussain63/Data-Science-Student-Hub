import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/views/DashboardView';
import { SubjectsCatalogView } from './components/views/SubjectsCatalogView';
import { SubjectDetailView } from './components/views/SubjectDetailView';
import { QuizzesView } from './components/views/QuizzesView';
import { NotesView } from './components/views/NotesView';
import { BookmarksView } from './components/views/BookmarksView';
import { StudyMaterialsView } from './components/views/StudyMaterialsView';
import { AIAssistantView } from './components/views/AIAssistantView';
import { ProfileView } from './components/views/ProfileView';
import { AuthModal } from './components/auth/AuthModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AppView, SubjectId } from './types';

function MainApp() {
  const { currentUser, loading } = useAuth();

  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('python');
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = (subjectId: SubjectId, topicId?: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(topicId);
    setCurrentView('subject-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenNewNoteModal = (
    subjectId: SubjectId,
    topicId: string,
    topicTitle: string
  ) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(topicId);
    setCurrentView('notes');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Loading DataScience Student Hub...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'dashboard' && (
          <DashboardView
            onSelectSubject={handleSelectSubject}
            onNavigate={handleNavigate}
            onOpenAuth={() => handleOpenAuth('signup')}
          />
        )}

        {currentView === 'subjects' && (
          <SubjectsCatalogView onSelectSubject={handleSelectSubject} />
        )}

        {currentView === 'subject-detail' && (
          <SubjectDetailView
            subjectId={selectedSubjectId}
            initialTopicId={selectedTopicId}
            onBack={() => setCurrentView('subjects')}
            onNavigate={handleNavigate}
            onOpenNewNoteModal={handleOpenNewNoteModal}
          />
        )}

        {currentView === 'quizzes' && <QuizzesView />}

        {currentView === 'notes' && (
          <NotesView
            initialSubjectId={selectedSubjectId}
            initialTopicId={selectedTopicId}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksView
            onSelectTopic={(subjId, topicId) => handleSelectSubject(subjId, topicId)}
          />
        )}

        {currentView === 'study-materials' && <StudyMaterialsView />}

        {currentView === 'ai-assistant' && <AIAssistantView />}

        {currentView === 'profile' && (
          <ProfileView
            onNavigate={handleNavigate}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 DataScience Student Hub • University Data Science Academic Platform</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('study-materials')}
              className="hover:underline"
            >
              Formula Sheets
            </button>
            <button
              onClick={() => handleNavigate('quizzes')}
              className="hover:underline"
            >
              Quizzes
            </button>
            <button
              onClick={() => handleNavigate('ai-assistant')}
              className="hover:underline text-purple-600 dark:text-purple-400 font-semibold"
            >
              AI Assistant
            </button>
          </div>
        </div>
      </footer>

      {/* 4. Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTopic={(subjId, topicId) => handleSelectSubject(subjId, topicId)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
