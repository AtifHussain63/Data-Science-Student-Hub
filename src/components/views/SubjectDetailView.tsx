import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  TOPICS_BY_SUBJECT,
  getSubjectMeta,
  getAdjacentTopics
} from '../../data/courses';
import { CodeBlock } from '../CodeBlock';
import {
  SubjectId,
  Topic,
  AppView
} from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Bookmark,
  BookmarkCheck,
  FilePlus,
  Bot,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Tag,
  Clock,
  ListFilter
} from 'lucide-react';

interface SubjectDetailViewProps {
  subjectId: SubjectId;
  initialTopicId?: string;
  onBack: () => void;
  onNavigate: (view: AppView) => void;
  onOpenNewNoteModal: (subjectId: SubjectId, topicId: string, topicTitle: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subjectId,
  initialTopicId,
  onBack,
  onNavigate,
  onOpenNewNoteModal
}) => {
  const {
    isTopicCompleted,
    toggleTopicCompletion,
    isBookmarked,
    toggleBookmark,
    currentUser
  } = useAuth();

  const topics = TOPICS_BY_SUBJECT[subjectId] || [];
  const subjectMeta = getSubjectMeta(subjectId);

  // Active Topic Selection
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (initialTopicId && topics.some((t) => t.id === initialTopicId)) {
      return initialTopicId;
    }
    return topics[0]?.id || '';
  });

  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];
  const { prev, next } = getAdjacentTopics(activeTopic?.id || '');

  const completedCount = topics.filter((t) => isTopicCompleted(t.id)).length;
  const progressPercent = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setShowHint(false);
    setShowSolution(false);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = async () => {
    if (activeTopic) {
      await toggleTopicCompletion(activeTopic.id, subjectId);
    }
  };

  const handleToggleBookmark = async () => {
    if (activeTopic) {
      await toggleBookmark(activeTopic);
    }
  };

  if (!activeTopic) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>No topics found for this subject.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const isCompleted = isTopicCompleted(activeTopic.id);
  const bookmarked = isBookmarked(activeTopic.id);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Subject Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Back to all subjects"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${subjectMeta.badgeColor}`}>
                  {subjectMeta.title}
                </span>
                <span className="text-xs text-slate-400">
                  {completedCount} / {topics.length} completed ({progressPercent}%)
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {subjectMeta.title} Curriculum
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Subject Progress Bar */}
            <div className="w-32 hidden md:block">
              <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1">
                <span>Subject Mastery</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Mobile Topic Drawer Button */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
            >
              <ListFilter className="w-4 h-4" />
              <span>Topics ({topics.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topics Navigation List (Desktop + Mobile Drawer) */}
        <div
          className={`lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs ${
            mobileDrawerOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Curriculum Roadmap
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {completedCount}/{topics.length} done
            </span>
          </div>

          <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
            {topics.map((t, idx) => {
              const active = t.id === activeTopic.id;
              const completed = isTopicCompleted(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTopic(t.id)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-xl text-left transition cursor-pointer group ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 shadow-2xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className={`w-4 h-4 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold leading-snug truncate ${
                        active
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {t.title}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      Topic #{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Study Canvas (Active Topic Reader) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Topic Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Topic {activeTopic.order} of {topics.length}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>~8 min read</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeTopic.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleComplete}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                  title={isCompleted ? 'Mark topic as incomplete' : 'Mark topic as completed'}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                </button>

                <button
                  onClick={handleToggleBookmark}
                  className={`p-2 rounded-lg transition cursor-pointer border ${
                    bookmarked
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark topic'}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() =>
                    onOpenNewNoteModal(subjectId, activeTopic.id, activeTopic.title)
                  }
                  className="flex items-center space-x-1 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Add personal note on this topic"
                >
                  <FilePlus className="w-3.5 h-3.5" />
                  <span>Take Note</span>
                </button>

                <button
                  onClick={() => onNavigate('ai-assistant')}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-semibold transition cursor-pointer"
                  title="Ask AI Assistant for explanation"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* 3. Detailed Theory & Explanation */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Concept Explanation
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {activeTopic.explanation}
              </p>
            </div>

            {/* 4. Key Takeaway Points */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Key Takeaways & Rules
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {activeTopic.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      {pIdx + 1}
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Mathematical Formula Display (if exists) */}
            {activeTopic.formula && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  3. Mathematical Formulation
                </h3>
                <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl text-center">
                  <p className="font-mono text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-200 overflow-x-auto py-1">
                    {activeTopic.formula}
                  </p>
                </div>
              </div>
            )}

            {/* 6. Interactive Code Block & Output Simulator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  4. Working Implementation Code
                </h3>
                <span className="text-xs text-slate-400">Click 'Run Simulation' to test</span>
              </div>
              <CodeBlock
                code={activeTopic.code}
                language={activeTopic.codeLanguage}
                expectedOutput={activeTopic.expectedOutput}
              />
            </div>

            {/* 7. Practice Question & Interactive Reveal */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                5. Check Your Understanding
              </h3>
              <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/60 dark:to-blue-950/20 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Practice Challenge
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {activeTopic.practiceQuestion.question}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
                  >
                    {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>

                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-xs"
                  >
                    {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 animate-fadeIn">
                    <span className="font-bold">💡 Hint: </span>
                    {activeTopic.practiceQuestion.hint}
                  </div>
                )}

                {showSolution && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 animate-fadeIn">
                    <span className="font-bold">✅ Correct Solution: </span>
                    {activeTopic.practiceQuestion.solution}
                  </div>
                )}
              </div>
            </div>

            {/* Tags footer */}
            {activeTopic.tags && activeTopic.tags.length > 0 && (
              <div className="flex items-center space-x-2 pt-2">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <div className="flex flex-wrap gap-1.5">
                  {activeTopic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Pagination Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 gap-4">
              {prev ? (
                <button
                  onClick={() => handleSelectTopic(prev.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous: {prev.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {next ? (
                <button
                  onClick={() => {
                    handleToggleComplete();
                    handleSelectTopic(next.id);
                  }}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
                >
                  <span className="hidden sm:inline">Mark & Next: {next.title}</span>
                  <span className="sm:hidden">Next Topic</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('quizzes')}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                >
                  <span>Subject Finished! Take Quiz</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
