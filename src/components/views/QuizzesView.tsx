import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { quizzesBySubject } from '../../data/courses/quizzes';
import { SUBJECTS_METADATA } from '../../data/courses';
import { SubjectId, QuizQuestion } from '../../types';
import {
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  History,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const QuizzesView: React.FC = () => {
  const { currentUser, quizScores, saveQuizScore } = useAuth();

  const [activeSubject, setActiveSubject] = useState<SubjectId>('python');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [viewHistory, setViewHistory] = useState<boolean>(false);

  const questions: QuizQuestion[] = quizzesBySubject[activeSubject] || [];
  const currentQuestion = questions[currentQuestionIdx];
  const activeSubjectMeta = SUBJECTS_METADATA.find((s) => s.id === activeSubject)!;

  const handleSelectSubject = (subjId: SubjectId) => {
    setActiveSubject(subjId);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const total = questions.length;
    const pct = Math.round((score / total) * 100);

    // Confetti on high score
    if (pct >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }

    // Save to Firestore
    if (currentUser) {
      try {
        await saveQuizScore(activeSubject, activeSubjectMeta.title, score, total);
      } catch (err) {
        console.error('Failed to save quiz score:', err);
      }
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIdx(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / (questions.length || 1)) * 100);
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header & Subject Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <HelpCircle className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Interactive Knowledge Quizzes
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test your data science mastery with 10 questions per subject, instant scoring and Firestore tracking.
            </p>
          </div>

          <button
            onClick={() => setViewHistory(!viewHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>{viewHistory ? 'Back to Quiz' : `Score History (${quizScores.length})`}</span>
          </button>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="flex space-x-2 overflow-x-auto pt-5 pb-1 scrollbar-none">
          {SUBJECTS_METADATA.map((subject) => {
            const isActive = activeSubject === subject.id && !viewHistory;
            return (
              <button
                key={subject.id}
                onClick={() => {
                  handleSelectSubject(subject.id);
                  setViewHistory(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{subject.title.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75">
                  ({(quizzesBySubject[subject.id] || []).length} Qs)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. HISTORY VIEW */}
      {viewHistory ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Personal Quiz Performance History</span>
            </h2>
            <span className="text-xs text-slate-400">Recorded in Cloud Firestore</span>
          </div>

          {quizScores.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {quizScores.map((scoreItem) => (
                <div
                  key={scoreItem.id}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 rounded-lg transition"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {scoreItem.subjectTitle} Quiz
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(scoreItem.completedAt).toLocaleDateString()} at{' '}
                      {new Date(scoreItem.completedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-slate-500">
                      {scoreItem.score} / {scoreItem.totalQuestions}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        scoreItem.percentage >= 80
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : scoreItem.percentage >= 50
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                      }`}
                    >
                      {scoreItem.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <Award className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-sm">No quizzes completed yet.</p>
              <button
                onClick={() => setViewHistory(false)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Take Your First Quiz
              </button>
            </div>
          )}
        </div>
      ) : isSubmitted ? (
        /* 3. SUBMITTED SCORE SUMMARY & FULL REVIEW */
        <div className="space-y-6">
          {/* Result Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-2xl border border-slate-800 text-center shadow-xl relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
              <Award className="w-9 h-9 text-amber-300" />
            </div>

            <h2 className="text-2xl font-bold">
              {activeSubjectMeta.title} Quiz Results
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {percentage >= 80
                ? 'Outstanding performance! You have mastered this core subject.'
                : percentage >= 60
                ? 'Solid work! Review the questions below to polish your knowledge.'
                : 'Good effort! Review the subject topics and retry to improve your score.'}
            </p>

            <div className="my-6 inline-flex items-center space-x-6 px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
              <div className="text-center">
                <span className="text-xs text-slate-300 uppercase tracking-wider block">Score</span>
                <span className="text-2xl font-black text-white">
                  {score} / {questions.length}
                </span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <span className="text-xs text-slate-300 uppercase tracking-wider block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-400">
                  {percentage}%
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={handleRestart}
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake {activeSubjectMeta.title} Quiz</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Detailed Question Analysis & Explanations
            </h3>

            <div className="space-y-6">
              {questions.map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          Question {qIdx + 1}
                        </span>
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5">
                          {q.question}
                        </h4>

                        {/* Options List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = userAns === oIdx;
                            const isCorrectOpt = q.correctIndex === oIdx;

                            return (
                              <div
                                key={oIdx}
                                className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between ${
                                  isCorrectOpt
                                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 font-semibold'
                                    : isSelected
                                    ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <span>{opt}</span>
                                {isCorrectOpt && <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Correct</span>}
                                {isSelected && !isCorrectOpt && <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-300">Your Answer</span>}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Note */}
                        <div className="mt-3 p-3 bg-white dark:bg-slate-800/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                          <span className="font-bold text-blue-600 dark:text-blue-400">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* 4. ACTIVE QUIZ INTERFACE */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-xs">
                Question {currentQuestionIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                • {answeredCount} answered
              </span>
            </div>

            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`w-6 h-6 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                    currentQuestionIdx === idx
                      ? 'bg-blue-600 text-white'
                      : userAnswers[idx] !== undefined
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion?.question}
            </h3>
          </div>

          {/* Option Selection List */}
          <div className="space-y-3">
            {currentQuestion?.options.map((optionText, optIdx) => {
              const isSelected = userAnswers[currentQuestionIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-900 dark:text-blue-200 font-semibold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 dark:border-slate-600 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm leading-relaxed">{optionText}</span>
                </button>
              );
            })}
          </div>

          {/* Action Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
