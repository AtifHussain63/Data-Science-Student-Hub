export type SubjectId =
  | 'python'
  | 'statistics'
  | 'sql'
  | 'machine-learning'
  | 'data-visualization'
  | 'data-analysis'
  | 'mathematics';

export type AppView =
  | 'dashboard'
  | 'subjects'
  | 'subject-detail'
  | 'quizzes'
  | 'notes'
  | 'bookmarks'
  | 'study-materials'
  | 'ai-assistant'
  | 'profile';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  university: string;
  degree: string;
  semester: string;
  avatarUrl?: string;
  theme?: 'light' | 'dark';
  createdAt?: string;
  updatedAt?: string;
}

export interface Topic {
  id: string;
  subjectId: SubjectId;
  title: string;
  order: number;
  explanation: string;
  keyPoints: string[];
  formula?: string;
  code?: string;
  codeLanguage?: string;
  expectedOutput?: string;
  practiceQuestion: {
    question: string;
    hint?: string;
    solution: string;
  };
  tags?: string[];
}

export interface SubjectMeta {
  id: SubjectId;
  title: string;
  shortDescription: string;
  iconName: string;
  accentColor: string;
  badgeColor: string;
  totalTopics: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface QuizScore {
  id: string;
  subjectId: SubjectId;
  subjectTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface Bookmark {
  id: string;
  topicId: string;
  subjectId: SubjectId;
  topicTitle: string;
  subjectTitle: string;
  createdAt: string;
}

export interface StudentNote {
  id: string;
  title: string;
  content: string;
  subjectId: SubjectId | 'general';
  topicId?: string;
  topicTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface UserProgressData {
  completedTopics: string[]; // List of topicIds
  lastStudiedTopicId?: string;
  lastStudiedSubjectId?: SubjectId;
  updatedAt?: string;
}
