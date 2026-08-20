import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  SUBJECTS_METADATA,
  TOPICS_BY_SUBJECT,
  TOTAL_CURRICULUM_TOPICS
} from '../../data/courses';
import {
  User,
  GraduationCap,
  Building,
  BookOpen,
  Calendar,
  Mail,
  Award,
  CheckCircle2,
  TrendingUp,
  FileText,
  BookMarked,
  Edit3,
  Check,
  LogOut,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Camera,
  Upload,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { AppView } from '../../types';

interface ProfileViewProps {
  onNavigate: (view: AppView) => void;
  onOpenAuth: () => void;
}

const PRESET_AVATARS = [
  { id: 'bot-1', label: 'AI Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=neural' },
  { id: 'bot-2', label: 'Quantum', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=quantum' },
  { id: 'bot-3', label: 'Cyber', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=data' },
  { id: 'scholar-1', label: 'Scholar 1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: 'scholar-2', label: 'Scholar 2', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: 'scholar-3', label: 'Scientist', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tinker' },
  { id: 'initials', label: 'Initials', url: '' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate, onOpenAuth }) => {
  const {
    currentUser,
    userProfile,
    updateStudentProfile,
    completedTopics,
    quizScores,
    notes,
    bookmarks,
    logout,
    resetPassword
  } = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(userProfile?.fullName || '');
  const [university, setUniversity] = useState<string>(userProfile?.university || '');
  const [degree, setDegree] = useState<string>(userProfile?.degree || '');
  const [semester, setSemester] = useState<string>(userProfile?.semester || 'Semester 1');
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>(userProfile?.avatarUrl || '');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when userProfile loads or changes
  React.useEffect(() => {
    if (userProfile && !isEditing) {
      setFullName(userProfile.fullName || '');
      setUniversity(userProfile.university || '');
      setDegree(userProfile.degree || '');
      setSemester(userProfile.semester || 'Semester 1');
      setCurrentAvatarUrl(userProfile.avatarUrl || '');
    }
  }, [userProfile, isEditing]);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <GraduationCap className="w-12 h-12 mx-auto text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Student Authentication Required
        </h2>
        <p className="text-xs text-slate-500">
          Sign in or create a student account to view your university profile, tracked progress, quiz scores, and notes.
        </p>
        <button
          type="button"
          onClick={onOpenAuth}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition shadow-md shadow-blue-500/20 cursor-pointer"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  // Compress & convert uploaded image to compact Base64 Data URL
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (PNG, JPG, JPEG, WebP).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 256; // 256x256 avatar
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCurrentAvatarUrl(compressedDataUrl);

          // Automatically save immediately if not editing form
          if (!isEditing) {
            updateStudentProfile({ avatarUrl: compressedDataUrl })
              .then(() => {
                setSaveStatus('Profile photo updated successfully!');
                setTimeout(() => setSaveStatus(null), 3000);
              })
              .catch((err) => console.error('Error saving avatar:', err));
          }
        }
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!customImageUrl.trim()) return;
    setCurrentAvatarUrl(customImageUrl.trim());
    if (!isEditing) {
      updateStudentProfile({ avatarUrl: customImageUrl.trim() })
        .then(() => {
          setSaveStatus('Profile photo updated!');
          setTimeout(() => setSaveStatus(null), 3000);
        })
        .catch(console.error);
    }
    setShowUrlInput(false);
    setCustomImageUrl('');
  };

  const handleSelectPreset = (url: string) => {
    setCurrentAvatarUrl(url);
    if (!isEditing) {
      updateStudentProfile({ avatarUrl: url })
        .then(() => {
          setSaveStatus('Avatar updated!');
          setTimeout(() => setSaveStatus(null), 3000);
        })
        .catch(console.error);
    }
  };

  const handleRemovePhoto = () => {
    setCurrentAvatarUrl('');
    if (!isEditing) {
      updateStudentProfile({ avatarUrl: '' })
        .then(() => {
          setSaveStatus('Profile photo reset.');
          setTimeout(() => setSaveStatus(null), 3000);
        })
        .catch(console.error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    try {
      await updateStudentProfile({
        fullName,
        university,
        degree,
        semester,
        avatarUrl: currentAvatarUrl
      });
      setSaveStatus('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (currentUser.email) {
      try {
        await resetPassword(currentUser.email);
        alert(`Password reset instructions have been sent to ${currentUser.email}`);
      } catch (err: any) {
        alert(err.message || 'Failed to send reset email');
      }
    }
  };

  const totalCompleted = completedTopics.length;
  const overallPercentage = Math.round((totalCompleted / TOTAL_CURRICULUM_TOPICS) * 100);

  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((acc, q) => acc + q.percentage, 0) / quizScores.length)
      : null;

  const displayAvatar = isEditing ? currentAvatarUrl : (userProfile?.avatarUrl || currentAvatarUrl);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* 1. Profile Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            
            {/* Interactive Avatar with Photo Upload Overlay */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20 shrink-0 border-2 border-white dark:border-slate-800">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt="Student Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{(userProfile?.fullName || fullName || 'S').charAt(0).toUpperCase()}</span>
                )}
              </div>

              {/* Upload trigger overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Click to change profile picture / photo upload"
                className="absolute inset-0 bg-slate-950/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 cursor-pointer backdrop-blur-xs"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-semibold">Change</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md border-2 border-white dark:border-slate-900 cursor-pointer sm:hidden"
                title="Upload Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {userProfile?.fullName || 'Data Science Student'}
                </h1>
                <span className="p-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300" title="Verified University Student">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{userProfile?.university || 'University'}</span>
                <span>•</span>
                <BookOpen className="w-3.5 h-3.5" />
                <span>{userProfile?.degree || 'Data Science'}</span>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {userProfile?.semester || 'Semester 1'} • {currentUser.email}
              </p>

              {/* Quick photo change trigger text */}
              <div className="pt-1 flex items-center space-x-3 text-[11px]">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo from Device</span>
                </button>
                {displayAvatar && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-slate-400 hover:text-rose-500 transition flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setFullName(userProfile?.fullName || '');
                setUniversity(userProfile?.university || '');
                setDegree(userProfile?.degree || '');
                setSemester(userProfile?.semester || 'Semester 1');
                setCurrentAvatarUrl(userProfile?.avatarUrl || '');
              }}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="flex items-center space-x-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Update Student Details & Profile Picture
            </h3>

            {/* Avatar Selection & Upload Section */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Choose or Upload Profile Picture
              </label>

              {/* Upload actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Paste Image Link</span>
                </button>

                {currentAvatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-xs font-semibold transition flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

              {showUrlInput && (
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Preset Avatars Bar */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-2">
                  Or select a preset avatar:
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {PRESET_AVATARS.map((preset) => {
                    const isSelected = preset.url ? currentAvatarUrl === preset.url : !currentAvatarUrl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition p-0.5 cursor-pointer flex items-center justify-center bg-white dark:bg-slate-800 ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                        title={preset.label}
                      >
                        {preset.url ? (
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {(fullName || 'S').charAt(0).toUpperCase()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Standard Profile Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Degree Program
                </label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Semester 1">Semester 1 (Freshman)</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3 (Sophomore)</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5 (Junior)</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7 (Senior)</option>
                  <option value="Semester 8">Semester 8</option>
                  <option value="Graduate / MS">Graduate / MS / PhD</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer"
              >
                {isSaving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Academic Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-500 block">Topics Completed</span>
          <span className="text-2xl font-bold text-blue-600 mt-1 block">
            {totalCompleted} / {TOTAL_CURRICULUM_TOPICS}
          </span>
          <span className="text-[11px] text-slate-400">({overallPercentage}%)</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-500 block">Avg Quiz Score</span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">
            {avgQuizScore !== null ? `${avgQuizScore}%` : 'N/A'}
          </span>
          <span className="text-[11px] text-slate-400">{quizScores.length} quizzes taken</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-500 block">Study Notes</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">
            {notes.length}
          </span>
          <span className="text-[11px] text-slate-400">captured in notebook</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-500 block">Saved Bookmarks</span>
          <span className="text-2xl font-bold text-purple-600 mt-1 block">
            {bookmarks.length}
          </span>
          <span className="text-[11px] text-slate-400">topics pinned</span>
        </div>
      </div>

      {/* 3. Subject Mastery Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Subject Mastery & Topic Completion
        </h3>

        <div className="space-y-4">
          {SUBJECTS_METADATA.map((subject) => {
            const subjectTopics = TOPICS_BY_SUBJECT[subject.id] || [];
            const completedCount = subjectTopics.filter((t) =>
              completedTopics.includes(t.id)
            ).length;
            const percentage =
              subjectTopics.length > 0
                ? Math.round((completedCount / subjectTopics.length) * 100)
                : 0;

            return (
              <div key={subject.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {subject.title}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {completedCount} / {subjectTopics.length} topics ({percentage}%)
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Actions / Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Account & Quick Navigation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('notes')}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700/60 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Study Notes
              </div>
              <div className="text-[11px] text-slate-400">
                {notes.length} notes stored
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('bookmarks')}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700/60 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer"
          >
            <BookMarked className="w-5 h-5 text-purple-500" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Bookmarks
              </div>
              <div className="text-[11px] text-slate-400">
                {bookmarks.length} topics saved
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleSendPasswordReset}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700/60 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Password Reset
              </div>
              <div className="text-[11px] text-slate-400">
                Send link to email
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
