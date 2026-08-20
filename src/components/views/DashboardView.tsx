import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  SUBJECTS_METADATA,
  TOPICS_BY_SUBJECT,
  TOTAL_CURRICULUM_TOPICS,
  ALL_TOPICS
} from '../../data/courses';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileText,
  BookMarked,
  Bot,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle,
  PlayCircle,
  Code2,
  BarChart2,
  Database,
  BrainCircuit,
  PieChart,
  LineChart,
  Binary
} from 'lucide-react';
import { SubjectId, AppView } from '../../types';

interface DashboardViewProps {
  onSelectSubject: (subjectId: SubjectId) => void;
  onNavigate: (view: AppView) => void;
  onOpenAuth: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  BarChart2,
  Database,
  BrainCircuit,
  PieChart,
  LineChart,
  Binary
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectSubject,
  onNavigate,
  onOpenAuth
}) => {
  const { currentUser, userProfile, completedTopics, quizScores, notes, bookmarks } = useAuth();

  // Calculate Overall Progress
  const totalCompleted = completedTopics.length;
  const overallPercentage = Math.round((totalCompleted / TOTAL_CURRICULUM_TOPICS) * 100);

  // Calculate Subject-specific progress
  const getSubjectProgress = (subjectId: SubjectId) => {
    const topics = TOPICS_BY_SUBJECT[subjectId] || [];
    const completedInSubject = topics.filter((t) => completedTopics.includes(t.id)).length;
    const pct = topics.length > 0 ? Math.round((completedInSubject / topics.length) * 100) : 0;
    return { completed: completedInSubject, total: topics.length, percentage: pct };
  };

  // Average Quiz Score
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((acc, q) => acc + q.percentage, 0) / quizScores.length)
      : null;

  // Next topic to study
  const nextPendingTopic = ALL_TOPICS.find((t) => !completedTopics.includes(t.id)) || ALL_TOPICS[0];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Student Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/10">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full text-xs font-medium text-blue-100 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>University Data Science Academic Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser ? `Welcome back, ${userProfile?.fullName || 'Student'}!` : 'Master Data Science & AI'}
            </h1>
            <p className="text-blue-100/90 text-sm max-w-xl">
              {currentUser ? (
                <span>
                  {userProfile?.degree || 'Data Science Program'} • {userProfile?.university || 'University'} (
                  {userProfile?.semester || 'Semester 1'})
                </span>
              ) : (
                'Comprehensive study material, Python, SQL, Statistics, Machine Learning, interactive quizzes and an AI study assistant.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentUser ? (
              <button
                type="button"
                onClick={() => onSelectSubject(nextPendingTopic.subjectId)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-900 font-semibold rounded-xl text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-blue-600" />
                <span>Resume Learning</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-900 font-semibold rounded-xl text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Sign Up / Login</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('ai-assistant')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm border border-white/20 transition cursor-pointer backdrop-blur-xs"
            >
              <Bot className="w-4 h-4 text-purple-300" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Activity Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Curriculum Progress
            </span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({totalCompleted}/{TOTAL_CURRICULUM_TOPICS} topics)
            </span>
          </div>
          {/* Bar */}
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Quizzes Card */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Quiz Performance
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {avgQuizScore !== null ? `${avgQuizScore}%` : 'N/A'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({quizScores.length} attempted)
            </span>
          </div>
          <button
            onClick={() => onNavigate('quizzes')}
            className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Take subject quiz</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notes Card */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Personal Notes
            </span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {notes.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">saved notes</span>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="mt-3 text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Open notebook</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bookmarks Card */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Saved Bookmarks
            </span>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <BookMarked className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {bookmarks.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">bookmarked topics</span>
          </div>
          <button
            onClick={() => onNavigate('bookmarks')}
            className="mt-3 text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View bookmarks</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. Subjects & Course Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Core Data Science Subjects
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore syllabus topics with theory, math formulas, runnable code & practice questions
            </p>
          </div>
          <button
            onClick={() => onNavigate('study-materials')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View Formula Cheatsheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS_METADATA.map((subject) => {
            const Icon = ICON_MAP[subject.iconName] || BookOpen;
            const progress = getSubjectProgress(subject.id);

            return (
              <div
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${subject.accentColor} text-white flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-105 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${subject.badgeColor}`}>
                      {subject.totalTopics} Topics
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {subject.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      Progress: {progress.completed}/{progress.total}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {progress.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick AI Questions & Study Prompt Launchers */}
      <div className="p-6 bg-gradient-to-br from-purple-900/10 via-indigo-900/5 to-transparent dark:from-purple-950/40 dark:via-slate-900 rounded-2xl border border-purple-200/80 dark:border-purple-800/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-600 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                AI Data Science Study Assistant
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Powered by Gemini • Ask complex math questions, code debugging, or conceptual explanations
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
          >
            <span>Open Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-3">
          {[
            'Explain the Bias-Variance tradeoff with concrete examples',
            'Write an optimal SQL query to find top 3 earners per department',
            'Explain P-value, Alpha level and Type I vs Type II errors',
            'How does Backpropagation calculate derivatives with the Chain Rule?',
            'What is the difference between Lasso (L1) and Ridge (L2) Regularization?',
            'When should I use a Random Forest vs Gradient Boosting (XGBoost)?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate('ai-assistant')}
              className="p-2.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 text-left transition hover:border-purple-300 dark:hover:border-purple-600 flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="truncate pr-2">{prompt}</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
