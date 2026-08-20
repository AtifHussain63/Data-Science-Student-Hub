import { SubjectId, SubjectMeta, Topic } from '../../types';
import { pythonTopics } from './python';
import { statisticsTopics } from './statistics';
import { sqlTopics } from './sql';
import { machineLearningTopics } from './machineLearning';
import { dataVisualizationTopics } from './dataVisualization';
import { dataAnalysisTopics } from './dataAnalysis';
import { mathematicsTopics } from './mathematics';

export {
  pythonTopics,
  statisticsTopics,
  sqlTopics,
  machineLearningTopics,
  dataVisualizationTopics,
  dataAnalysisTopics,
  mathematicsTopics
};

export const SUBJECTS_METADATA: SubjectMeta[] = [
  {
    id: 'python',
    title: 'Python for Data Science',
    shortDescription: 'Core syntax, data structures, NumPy arrays, Pandas DataFrames & visualization.',
    iconName: 'Code2',
    accentColor: 'from-blue-600 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    totalTopics: pythonTopics.length
  },
  {
    id: 'statistics',
    title: 'Statistics & Probability',
    shortDescription: 'Descriptive metrics, distributions, hypothesis testing, p-values & regression.',
    iconName: 'BarChart2',
    accentColor: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    totalTopics: statisticsTopics.length
  },
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    shortDescription: 'DQL queries, filtering, grouping, aggregate functions, Joins, subqueries & CTEs.',
    iconName: 'Database',
    accentColor: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    totalTopics: sqlTopics.length
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    shortDescription: 'Supervised & unsupervised models, trees, clustering, overfitting & evaluation.',
    iconName: 'BrainCircuit',
    accentColor: 'from-purple-600 to-violet-600',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    totalTopics: machineLearningTopics.length
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    shortDescription: 'Bar charts, scatter plots, histograms, box plots, heatmaps & visual storytelling.',
    iconName: 'PieChart',
    accentColor: 'from-pink-600 to-rose-600',
    badgeColor: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    totalTopics: dataVisualizationTopics.length
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis & EDA',
    shortDescription: 'Data cleaning, missing imputation, outlier treatment, transformations & insights.',
    iconName: 'LineChart',
    accentColor: 'from-cyan-600 to-sky-600',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    totalTopics: dataAnalysisTopics.length
  },
  {
    id: 'mathematics',
    title: 'Mathematics for Data Science',
    shortDescription: 'Linear algebra, vectors, matrices, calculus, derivatives & gradient descent.',
    iconName: 'Binary',
    accentColor: 'from-violet-600 to-indigo-700',
    badgeColor: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    totalTopics: mathematicsTopics.length
  }
];

export const TOPICS_BY_SUBJECT: Record<SubjectId, Topic[]> = {
  python: pythonTopics,
  statistics: statisticsTopics,
  sql: sqlTopics,
  'machine-learning': machineLearningTopics,
  'data-visualization': dataVisualizationTopics,
  'data-analysis': dataAnalysisTopics,
  mathematics: mathematicsTopics
};

export const ALL_TOPICS: Topic[] = [
  ...pythonTopics,
  ...statisticsTopics,
  ...sqlTopics,
  ...machineLearningTopics,
  ...dataVisualizationTopics,
  ...dataAnalysisTopics,
  ...mathematicsTopics
];

export const TOTAL_CURRICULUM_TOPICS = ALL_TOPICS.length;

export function getTopicById(id: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === id);
}

export function getSubjectMeta(subjectId: SubjectId): SubjectMeta {
  const meta = SUBJECTS_METADATA.find((s) => s.id === subjectId);
  return (
    meta || {
      id: subjectId,
      title: subjectId.toUpperCase(),
      shortDescription: '',
      iconName: 'BookOpen',
      accentColor: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-100 text-blue-800',
      totalTopics: 0
    }
  );
}

export function getAdjacentTopics(topicId: string): {
  prev: Topic | null;
  next: Topic | null;
} {
  const currentTopic = getTopicById(topicId);
  if (!currentTopic) return { prev: null, next: null };

  const subjectTopics = TOPICS_BY_SUBJECT[currentTopic.subjectId] || [];
  const currentIndex = subjectTopics.findIndex((t) => t.id === topicId);

  return {
    prev: currentIndex > 0 ? subjectTopics[currentIndex - 1] : null,
    next: currentIndex < subjectTopics.length - 1 ? subjectTopics[currentIndex + 1] : null
  };
}
