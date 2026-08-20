import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  SUBJECTS_METADATA,
  TOPICS_BY_SUBJECT
} from '../../data/courses';
import {
  BookOpen,
  Search,
  ArrowRight,
  Code2,
  BarChart2,
  Database,
  BrainCircuit,
  PieChart,
  LineChart,
  Binary,
  CheckCircle2
} from 'lucide-react';
import { SubjectId } from '../../types';

interface SubjectsCatalogViewProps {
  onSelectSubject: (subjectId: SubjectId) => void;
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

export const SubjectsCatalogView: React.FC<SubjectsCatalogViewProps> = ({ onSelectSubject }) => {
  const { completedTopics } = useAuth();
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredSubjects = SUBJECTS_METADATA.filter((s) => {
    const q = filterQuery.toLowerCase();
    const matchesTitle = s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q);
    const topics = TOPICS_BY_SUBJECT[s.id] || [];
    const matchesTopics = topics.some((t) => t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)));
    return matchesTitle || matchesTopics;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                <BookOpen className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                University Data Science Curriculum
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Structured courses with concept breakdowns, code implementations, mathematical formulas, and practice challenges.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter subjects & topics..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const Icon = ICON_MAP[subject.iconName] || BookOpen;
          const topics = TOPICS_BY_SUBJECT[subject.id] || [];
          const done = topics.filter((t) => completedTopics.includes(t.id)).length;
          const pct = topics.length > 0 ? Math.round((done / topics.length) * 100) : 0;

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${subject.accentColor} text-white flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-105 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${subject.badgeColor}`}>
                    {subject.totalTopics} Topics
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {subject.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {subject.shortDescription}
                </p>

                {/* Topic preview list */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Featured Topics:
                  </span>
                  {topics.slice(0, 3).map((t, idx) => (
                    <div
                      key={t.id}
                      className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2 truncate"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="truncate">{t.title}</span>
                    </div>
                  ))}
                  {topics.length > 3 && (
                    <span className="text-[10px] text-slate-400 block pl-3.5">
                      + {topics.length - 3} more modules
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">
                    Progress: {done}/{topics.length}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Open Subject</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
