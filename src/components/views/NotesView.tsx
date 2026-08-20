import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUBJECTS_METADATA, ALL_TOPICS } from '../../data/courses';
import { SubjectId, StudentNote } from '../../types';
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  Download,
  BookOpen,
  Calendar,
  X,
  Check,
  Tag,
  AlertCircle
} from 'lucide-react';

interface NotesViewProps {
  initialSubjectId?: SubjectId;
  initialTopicId?: string;
  initialTopicTitle?: string;
}

export const NotesView: React.FC<NotesViewProps> = () => {
  const { notes, addNote, updateNote, deleteNote, currentUser } = useAuth();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formSubject, setFormSubject] = useState<SubjectId | 'general'>('python');
  const [formTopicId, setFormTopicId] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const filteredNotes = notes.filter((n) => {
    const matchesSubject = selectedSubject === 'all' || n.subjectId === selectedSubject;
    const matchesSearch =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.topicTitle && n.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormContent('');
    setFormSubject('python');
    setFormTopicId('');
    setEditingNoteId(null);
    setIsCreating(true);
  };

  const handleStartEdit = (note: StudentNote) => {
    setEditingNoteId(note.id);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormSubject(note.subjectId);
    setFormTopicId(note.topicId || '');
    setIsCreating(true);
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;
    setIsSubmitting(true);

    try {
      const matchedTopic = ALL_TOPICS.find((t) => t.id === formTopicId);
      const topicTitle = matchedTopic ? matchedTopic.title : '';

      if (editingNoteId) {
        await updateNote(editingNoteId, {
          title: formTitle,
          content: formContent,
          subjectId: formSubject
        });
      } else {
        await addNote(formTitle, formContent, formSubject, formTopicId, topicTitle);
      }
      setIsCreating(false);
      setEditingNoteId(null);
    } catch (err) {
      console.error('Error saving note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this study note?')) {
      await deleteNote(id);
    }
  };

  const handleExportNotes = () => {
    if (notes.length === 0) return;
    let exportText = `# DataScience Student Hub - Study Notebook\nExport Date: ${new Date().toLocaleDateString()}\n\n---\n\n`;

    notes.forEach((n, idx) => {
      exportText += `## ${idx + 1}. ${n.title}\n`;
      exportText += `**Subject:** ${n.subjectId.toUpperCase()} ${n.topicTitle ? `| **Topic:** ${n.topicTitle}` : ''}\n`;
      exportText += `**Date:** ${new Date(n.updatedAt).toLocaleString()}\n\n`;
      exportText += `${n.content}\n\n---\n\n`;
    });

    const blob = new Blob([exportText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'My_DataScience_Study_Notes.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                <FileText className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Personal Study Notebook
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Capture your insights, algorithm recipes, formulas, and course summaries securely in Firestore.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {notes.length > 0 && (
              <button
                onClick={handleExportNotes}
                className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                title="Export all notes to Markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .md</span>
              </button>
            )}

            <button
              onClick={handleOpenCreate}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Note</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your notes by keyword, topic, or code..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject Filter Pills */}
          <div className="flex space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              All ({notes.length})
            </button>
            {SUBJECTS_METADATA.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedSubject === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Note Creation / Editing Modal / Panel */}
      {isCreating && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/50 p-6 shadow-lg space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>{editingNoteId ? 'Edit Study Note' : 'Create New Study Note'}</span>
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveNote} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Key Matrix Inverse Formulas & PCA Steps"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Category
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value as SubjectId | 'general')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General / Multi-Subject</option>
                  {SUBJECTS_METADATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Study Content & Code Snippets (Supports Markdown) *
              </label>
              <textarea
                required
                rows={6}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Write your study takeaways, custom examples, Python snippets, formulas or exam reminders..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving...' : 'Save Note'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const subjectMeta =
              note.subjectId !== 'general'
                ? SUBJECTS_METADATA.find((s) => s.id === note.subjectId)
                : null;

            return (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        subjectMeta
                          ? subjectMeta.badgeColor
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {subjectMeta ? subjectMeta.title.split(' ')[0] : 'General'}
                    </span>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer"
                        title="Edit note"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {note.title}
                  </h3>

                  {note.topicTitle && (
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="truncate">{note.topicTitle}</span>
                    </p>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 whitespace-pre-line line-clamp-6 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-[11px]">
                    {note.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  </span>
                  <span>Firestore Synced</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500">
          <FileText className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-60" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            No Study Notes Found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Create personal notes to summarize complex equations, Python workflows, or SQL patterns.
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
          >
            Create Your First Note
          </button>
        </div>
      )}
    </div>
  );
};
