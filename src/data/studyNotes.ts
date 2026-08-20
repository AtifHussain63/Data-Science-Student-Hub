import { SubjectId } from '../types';

export interface StudyCheatSheet {
  id: string;
  subjectId: SubjectId;
  title: string;
  category: 'Cheatsheet' | 'Formula Sheet' | 'Summary Notes' | 'Interview Prep';
  content: string;
  downloadFilename: string;
}

export const STUDY_MATERIALS: StudyCheatSheet[] = [
  {
    id: 'mat-py-1',
    subjectId: 'python',
    title: 'Python for Data Science Quick Cheatsheet',
    category: 'Cheatsheet',
    downloadFilename: 'Python_DataScience_Cheatsheet.md',
    content: `# Python for Data Science Quick Cheatsheet

## Essential Data Structures
- **List**: \`[1, 2, 3]\` - Mutable, ordered sequence. \`nums.append(4)\`, \`nums.pop()\`
- **Tuple**: \`(1, 2, 3)\` - Immutable, hashable. Multi-returns from functions.
- **Dict**: \`{'k': 'v'}\` - Key-value store. \`d.get('k', default)\`, \`d.items()\`
- **Set**: \`{1, 2, 3}\` - Unordered, unique elements. Fast $O(1)$ lookup.

## NumPy Quick Reference
\`\`\`python
import numpy as np

arr = np.array([1, 2, 3])
matrix = np.zeros((3, 4))
identity = np.eye(3)
dot_product = np.dot(matrix, vec)
scaled = (arr - np.mean(arr)) / np.std(arr)
\`\`\`

## Pandas Essential Commands
\`\`\`python
import pandas as pd

df = pd.read_csv("data.csv")
df.head(10)                    # View top rows
df.info()                      # Types & non-null counts
df.describe()                  # Summary stats
df[df['gpa'] >= 3.8]           # Boolean filter
df.groupby('major')['gpa'].mean() # Groupby aggregation
df.isna().sum()                # Count missing values
df.drop_duplicates()           # Deduplicate
\`\`\`
`
  },
  {
    id: 'mat-stat-1',
    subjectId: 'statistics',
    title: 'Statistics & Probability Formula Reference Sheet',
    category: 'Formula Sheet',
    downloadFilename: 'Statistics_Formula_Sheet.md',
    content: `# Statistics & Probability Formula Reference Sheet

## 1. Measures of Central Tendency & Dispersion
- **Sample Mean**: $\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$
- **Sample Variance**: $s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2$
- **Sample Standard Deviation**: $s = \\sqrt{s^2}$
- **Interquartile Range**: $IQR = Q_3 - Q_1$
- **Outlier Fences**: $[Q_1 - 1.5 \\times IQR, \\; Q_3 + 1.5 \\times IQR]$

## 2. Standardized Scores & Distributions
- **Z-score**: $Z = \\frac{x - \\mu}{\\sigma}$
- **Empirical Rule**: $68.2\\%$ within $\\pm 1\\sigma$, $95.4\\%$ within $\\pm 2\\sigma$, $99.7\\%$ within $\\pm 3\\sigma$

## 3. Probability & Bayes' Theorem
- **Conditional Probability**: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$
- **Bayes' Rule**: $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$

## 4. Bivariate Statistics & Correlation
- **Covariance**: $\\text{Cov}(X, Y) = \\frac{1}{n-1} \\sum (x_i - \\bar{x})(y_i - \\bar{y})$
- **Pearson Correlation**: $r = \\frac{\\text{Cov}(X,Y)}{s_x s_y} \\in [-1, 1]$

## 5. Hypothesis Testing
- **Z-Statistic**: $Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$
- **Decision Rule**: If $p \\le \\alpha$ (e.g. $0.05$), **Reject $H_0$** (Statistically Significant).
`
  },
  {
    id: 'mat-sql-1',
    subjectId: 'sql',
    title: 'Master SQL Syntax & Query Design Sheet',
    category: 'Cheatsheet',
    downloadFilename: 'Master_SQL_Cheatsheet.md',
    content: `# Master SQL Syntax & Query Design Sheet

## Logical Execution Order
1. **FROM** & **JOIN** -> Determine source data
2. **WHERE** -> Filter rows
3. **GROUP BY** -> Aggregate rows into groups
4. **HAVING** -> Filter groups on aggregate conditions
5. **SELECT** -> Compute projections & expressions
6. **DISTINCT** -> Remove duplicate output rows
7. **ORDER BY** -> Sort final results
8. **LIMIT / OFFSET** -> Paginate rows

## Essential Join Types
\`\`\`sql
-- Inner Join: Only matches
SELECT * FROM users u JOIN orders o ON u.id = o.user_id;

-- Left Join: All users + orders (or NULL)
SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;

-- Find users who never ordered
SELECT u.id, u.name 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.id IS NULL;
\`\`\`

## CTEs (Common Table Expressions)
\`\`\`sql
WITH top_departments AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
    HAVING AVG(salary) > 80000
)
SELECT e.full_name, e.salary, t.avg_sal
FROM employees e
JOIN top_departments t ON e.department_id = t.department_id;
\`\`\`
`
  },
  {
    id: 'mat-ml-1',
    subjectId: 'machine-learning',
    title: 'Machine Learning Algorithms & Metrics Blueprint',
    category: 'Summary Notes',
    downloadFilename: 'Machine_Learning_Blueprint.md',
    content: `# Machine Learning Algorithms & Metrics Blueprint

## Supervised Learning Checklist
- **Linear Regression**: Continuous target $y$. Minimize MSE loss.
- **Logistic Regression**: Classification probabilities via Sigmoid function $\\sigma(z) = \\frac{1}{1+e^{-z}}$.
- **Decision Trees**: Partition feature space by minimizing Gini Impurity or Entropy.
- **Random Forest**: Bagging ensemble of de-correlated decision trees with random feature splits.
- **KNN**: Instance-based majority vote based on Euclidean distance (Requires Feature Scaling!).

## Classification Evaluation Metrics
| Metric | Formula | Best Used When |
| :--- | :--- | :--- |
| **Accuracy** | $\\frac{TP + TN}{TP + TN + FP + FN}$ | Balanced classes |
| **Precision** | $\\frac{TP}{TP + FP}$ | False Positives are costly (e.g. Spam) |
| **Recall** | $\\frac{TP}{TP + FN}$ | False Negatives are costly (e.g. Cancer) |
| **F1 Score** | $2 \\cdot \\frac{P \\cdot R}{P + R}$ | Imbalanced class distribution |

## Overfitting vs Underfitting
- **Overfitting (High Variance)**: Low train error, High test error. Fix: Regularization, Pruning, More data.
- **Underfitting (High Bias)**: High train error, High test error. Fix: Increase model capacity, add features.
`
  },
  {
    id: 'mat-viz-1',
    subjectId: 'data-visualization',
    title: 'Data Visualization Selection Guide',
    category: 'Cheatsheet',
    downloadFilename: 'Data_Visualization_Guide.md',
    content: `# Data Visualization Selection Guide

## Chart Chooser Matrix
- **Comparison across discrete categories**: Bar Chart (Horizontal for long labels)
- **Trends over continuous time**: Line Chart
- **Continuous numeric distribution**: Histogram (or KDE Plot)
- **Bivariate correlation & clusters**: Scatter Plot
- **Group distributions & outliers**: Box Plot (Tukey 5-number summary)
- **Pairwise correlation matrix**: Heatmap with diverging colormap
- **Simple composition (<=4 items)**: Donut / Pie Chart

## Visual Design Best Practices
1. Never truncate the quantitative y-axis of a bar chart away from zero.
2. Limit line charts to 4-5 series max to avoid "spaghetti" clutter.
3. Use diverging colormaps (e.g. \`coolwarm\`) centered at 0 for correlation matrices.
4. Ensure adequate color contrast for accessibility (WCAG AA).
`
  },
  {
    id: 'mat-math-1',
    subjectId: 'mathematics',
    title: 'Linear Algebra & Calculus for ML Cheat Sheet',
    category: 'Formula Sheet',
    downloadFilename: 'Linear_Algebra_Calculus_CheatSheet.md',
    content: `# Linear Algebra & Calculus for ML Cheat Sheet

## Matrix Multiplication
For Matrix $A \\in \\mathbb{R}^{m \\times k}$ and $B \\in \\mathbb{R}^{k \\times n}$:
$$C = AB \\in \\mathbb{R}^{m \\times n} \\quad \\text{where } C_{ij} = \\sum_{r=1}^k A_{ir} B_{rj}$$

## Dot Product & Cosine Similarity
$$\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^d u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)$$
$$\\text{Cosine Similarity} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}$$

## Derivatives & Backpropagation
- **Power Rule**: $\\frac{d}{dx} x^n = n x^{n-1}$
- **Chain Rule**: $\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)$
- **Gradient Descent Update**: $\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\nabla L(\\mathbf{w}_t)$
`
  }
];
