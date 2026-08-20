import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSubjectMeta, getTopicById } from '../../data/courses';
import { SubjectId, Topic } from '../../types';
import {
  BookMarked,
  Trash2,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles
} from 'lucide-react';

interface BookmarksViewProps {
  onSelectTopic: (subjectId: SubjectId, topicId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onSelectTopic }) => {
  const { bookmarks, toggleBookmark } = useAuth();

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
            <BookMarked className="w-4 h-4" />
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Saved Bookmarks
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quickly access your pinned curriculum topics for revision and exam preparation.
        </p>
      </div>

      {/* 2. Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((b) => {
            const subjectMeta = getSubjectMeta(b.subjectId);
            const topic = getTopicById(b.topicId);

            return (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${subjectMeta.badgeColor}`}>
                      {subjectMeta.title}
                    </span>

                    <button
                      onClick={() => {
                        if (topic) toggleBookmark(topic);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {b.topicTitle}
                  </h3>

                  {topic && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {topic.explanation}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                  </span>

                  <button
                    onClick={() => onSelectTopic(b.subjectId, b.topicId)}
                    className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Read Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500">
          <BookMarked className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-60" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            No Bookmarked Topics
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Click the bookmark icon inside any course topic to pin it here for instant review.
          </p>
        </div>
      )}
    </div>
  );
};
