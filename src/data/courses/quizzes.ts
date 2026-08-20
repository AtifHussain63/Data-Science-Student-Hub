import { QuizQuestion, SubjectId } from '../../types';

export const quizzesBySubject: Record<SubjectId, QuizQuestion[]> = {
  python: [
    {
      id: 'py-q1',
      question: 'Which built-in Python data structure is mutable and defined with square brackets `[ ]`?',
      options: ['Tuple', 'List', 'Set', 'FrozenSet'],
      correctIndex: 1,
      explanation: 'Lists are mutable ordered sequences in Python denoted with square brackets []. Tuples are immutable and denoted with ().'
    },
    {
      id: 'py-q2',
      question: 'What is the output of `type(10 / 2)` in Python 3?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'double\'>', '<class \'number\'>'],
      correctIndex: 1,
      explanation: 'In Python 3, the `/` operator always performs floating-point division, returning `<class \'float\'>` (5.0).'
    },
    {
      id: 'py-q3',
      question: 'Which method is used in Pandas to inspect the first 5 rows of a DataFrame `df`?',
      options: ['df.first(5)', 'df.peek(5)', 'df.head()', 'df.preview()'],
      correctIndex: 2,
      explanation: '`df.head()` displays the first 5 rows of a DataFrame by default.'
    },
    {
      id: 'py-q4',
      question: 'In NumPy, what attribute is used to check the dimensions/shape of an array `arr`?',
      options: ['arr.dimension', 'arr.shape', 'arr.size()', 'arr.length'],
      correctIndex: 1,
      explanation: '`arr.shape` returns a tuple representing the size of each dimension in the array.'
    },
    {
      id: 'py-q5',
      question: 'What is the correct syntax for a list comprehension squaring all numbers in `nums = [1, 2, 3]`?',
      options: [
        '[x**2 for x in nums]',
        '[x^2 in nums]',
        'nums.map(lambda x: x**2)',
        '{for x in nums: x**2}'
      ],
      correctIndex: 0,
      explanation: '`[x**2 for x in nums]` is the standard Python list comprehension syntax.'
    },
    {
      id: 'py-q6',
      question: 'Which keyword is used in Python to define an anonymous, single-line function?',
      options: ['def', 'func', 'lambda', 'anonymous'],
      correctIndex: 2,
      explanation: 'The `lambda` keyword defines inline anonymous functions (e.g. `lambda x: x + 1`).'
    },
    {
      id: 'py-q7',
      question: 'What block in Python exception handling is guaranteed to execute regardless of whether an exception occurred?',
      options: ['catch', 'finally', 'else', 'ensure'],
      correctIndex: 1,
      explanation: 'The `finally` block always executes after `try` and `except`, regardless of errors.'
    },
    {
      id: 'py-q8',
      question: 'In Pandas, what is the difference between `.loc[]` and `.iloc[]`?',
      options: [
        '.loc is label-based, while .iloc is integer-position based',
        '.loc is integer-based, while .iloc is label-based',
        '.loc is for columns only, .iloc is for rows only',
        'There is no difference'
      ],
      correctIndex: 0,
      explanation: '`.loc[]` accesses data by index/column labels; `.iloc[]` accesses data by zero-based integer index positions.'
    },
    {
      id: 'py-q9',
      question: 'Which function creates a 3x3 identity matrix in NumPy?',
      options: ['np.zeros((3,3))', 'np.eye(3)', 'np.identity_matrix(3)', 'np.ones((3,3))'],
      correctIndex: 1,
      explanation: '`np.eye(N)` or `np.identity(N)` generates an N x N identity matrix.'
    },
    {
      id: 'py-q10',
      question: 'How do you check for missing/null values across all columns of a DataFrame `df` in Pandas?',
      options: ['df.check_null()', 'df.isna().sum()', 'df.has_missing()', 'df.count_empty()'],
      correctIndex: 1,
      explanation: '`df.isna().sum()` or `df.isnull().sum()` calculates the total count of null values per column.'
    }
  ],
  statistics: [
    {
      id: 'stat-q1',
      question: 'Which measure of central tendency is most robust against extreme outliers?',
      options: ['Mean', 'Median', 'Variance', 'Standard Deviation'],
      correctIndex: 1,
      explanation: 'The Median is the middle value and is not skewed by extreme high or low outlier values.'
    },
    {
      id: 'stat-q2',
      question: 'What is the relationship between Variance and Standard Deviation?',
      options: [
        'Variance = Standard Deviation / 2',
        'Standard Deviation = Square root of Variance',
        'Standard Deviation = Variance squared',
        'They are completely unrelated'
      ],
      correctIndex: 1,
      explanation: 'Standard deviation (s) is the square root of the variance ($s = \\sqrt{s^2}$).'
    },
    {
      id: 'stat-q3',
      question: 'In a Standard Normal Distribution, what are the Mean (μ) and Standard Deviation (σ)?',
      options: ['μ = 1, σ = 0', 'μ = 0, σ = 1', 'μ = 100, σ = 15', 'μ = 50, σ = 5'],
      correctIndex: 1,
      explanation: 'A Standard Normal Distribution ($Z$-distribution) has Mean $\\mu = 0$ and Standard Deviation $\\sigma = 1$.'
    },
    {
      id: 'stat-q4',
      question: 'According to the Empirical 68-95-99.7 Rule, approximately what percentage of data falls within ±2 standard deviations of the mean?',
      options: ['68.2%', '95.4%', '99.7%', '50.0%'],
      correctIndex: 1,
      explanation: 'Approximately 95.4% of data in a normal distribution falls within $\\pm 2\\sigma$.'
    },
    {
      id: 'stat-q5',
      question: 'What is the range of values that the Pearson correlation coefficient (r) can take?',
      options: ['[0, 1]', '[-1, 1]', '[-Infinity, +Infinity]', '[0, 100]'],
      correctIndex: 1,
      explanation: 'Pearson correlation is bounded strictly between -1.0 (perfect negative) and +1.0 (perfect positive).'
    },
    {
      id: 'stat-q6',
      question: 'What is a Type I error in statistical hypothesis testing?',
      hint: 'False Positive',
      options: [
        'Rejecting the null hypothesis when it is actually true',
        'Failing to reject the null hypothesis when it is false',
        'Calculating the mean incorrectly',
        'Having a sample size smaller than 30'
      ],
      correctIndex: 0,
      explanation: 'A Type I error (False Positive) occurs when researchers reject a true null hypothesis.'
    },
    {
      id: 'stat-q7',
      question: 'If a hypothesis test yields a p-value of 0.015 at an alpha significance level of 0.05, what is your decision?',
      options: [
        'Fail to reject the null hypothesis',
        'Reject the null hypothesis (statistically significant)',
        'Accept the null hypothesis as proven true',
        'The test is inconclusive'
      ],
      correctIndex: 1,
      explanation: 'Because p (0.015) < alpha (0.05), we reject the null hypothesis with statistical significance.'
    },
    {
      id: 'stat-q8',
      question: 'What is the Interquartile Range (IQR)?',
      options: ['Q3 - Q1', 'Max - Min', 'Mean / Standard Deviation', 'Q2 / 2'],
      correctIndex: 0,
      explanation: 'IQR = $Q_3 - Q_1$, representing the spread of the middle 50% of ordered observations.'
    },
    {
      id: 'stat-q9',
      question: 'What theorem states that the sample mean distribution approaches normality as sample size n increases, regardless of the population distribution shape?',
      options: [
        'Bayes\' Theorem',
        'Central Limit Theorem',
        'Law of Large Numbers',
        'Pythagorean Theorem'
      ],
      correctIndex: 1,
      explanation: 'The Central Limit Theorem (CLT) guarantees asymptotic normality for sample averages for sufficiently large $n$ ($n \\ge 30$).'
    },
    {
      id: 'stat-q10',
      question: 'What is the Z-score of a value x = 86 from a population with mean μ = 70 and standard deviation σ = 8?',
      options: ['1.5', '2.0', '2.5', '16.0'],
      correctIndex: 1,
      explanation: '$Z = (86 - 70) / 8 = 16 / 8 = 2.0$.'
    }
  ],
  sql: [
    {
      id: 'sql-q1',
      question: 'Which SQL clause is used to filter individual rows before grouping?',
      options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
      correctIndex: 1,
      explanation: '`WHERE` filters individual rows prior to grouping; `HAVING` filters aggregated groups.'
    },
    {
      id: 'sql-q2',
      question: 'Which JOIN returns all rows from the left table and matched rows from the right table, filling missing right columns with NULL?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
      correctIndex: 1,
      explanation: '`LEFT JOIN` (Left Outer Join) preserves every row from the left table regardless of matches.'
    },
    {
      id: 'sql-q3',
      question: 'Which SQL constraint guarantees that a column uniquely identifies each row and contains no NULL values?',
      options: ['UNIQUE', 'NOT NULL', 'PRIMARY KEY', 'FOREIGN KEY'],
      correctIndex: 2,
      explanation: '`PRIMARY KEY` enforces both entity uniqueness and mandatory non-null values.'
    },
    {
      id: 'sql-q4',
      question: 'What is the difference between `COUNT(*)` and `COUNT(column_name)`?',
      options: [
        'COUNT(*) counts all rows including NULLs; COUNT(column_name) ignores NULLs in that column',
        'COUNT(*) is slower than COUNT(column_name)',
        'COUNT(column_name) counts distinct values only',
        'There is no difference'
      ],
      correctIndex: 0,
      explanation: '`COUNT(*)` counts total rows in the result; `COUNT(column)` ignores NULL values in that specific column.'
    },
    {
      id: 'sql-q5',
      question: 'Which clause defines a Common Table Expression (CTE) in SQL?',
      options: ['CREATE VIEW', 'WITH', 'TEMPORARY', 'DECLARE'],
      correctIndex: 1,
      explanation: '`WITH cte_name AS (SELECT ...)` defines a Common Table Expression.'
    },
    {
      id: 'sql-q6',
      question: 'In which order are SQL clauses logically executed by the database engine?',
      options: [
        'SELECT -> FROM -> WHERE -> GROUP BY',
        'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY',
        'FROM -> SELECT -> WHERE -> ORDER BY',
        'WHERE -> FROM -> SELECT -> GROUP BY'
      ],
      correctIndex: 1,
      explanation: 'SQL executes logically: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.'
    },
    {
      id: 'sql-q7',
      question: 'Which statement permanently deletes all rows from a table rapidly by deallocating pages without row-by-row logging?',
      options: ['DELETE FROM table', 'TRUNCATE TABLE table', 'DROP TABLE table', 'REMOVE TABLE table'],
      correctIndex: 1,
      explanation: '`TRUNCATE TABLE` empties the entire table immediately as a DDL operation.'
    },
    {
      id: 'sql-q8',
      question: 'What is the correct syntax to sort results by salary descending, then by last_name ascending?',
      options: [
        'ORDER BY salary DESC, last_name ASC',
        'SORT BY salary DOWN, last_name UP',
        'GROUP BY salary DESC, last_name',
        'ORDER BY salary, last_name DESC'
      ],
      correctIndex: 0,
      explanation: '`ORDER BY salary DESC, last_name ASC` specifies secondary ordering.'
    },
    {
      id: 'sql-q9',
      question: 'Which operator is used to search for a specified pattern in a column (e.g. email ending with .edu)?',
      options: ['CONTAINS', 'LIKE', 'MATCH', 'EQUALS'],
      correctIndex: 1,
      explanation: '`LIKE` with wildcard `%` (e.g. `LIKE \'%.edu\'`) matches string patterns.'
    },
    {
      id: 'sql-q10',
      question: 'What action does `ON DELETE CASCADE` take on a foreign key relationship?',
      options: [
        'Prevents deleting the parent record',
        'Automatically deletes child records when the referenced parent record is deleted',
        'Sets child records foreign key to NULL',
        'Sends an error notification'
      ],
      correctIndex: 1,
      explanation: '`ON DELETE CASCADE` automatically propagates deletions from parent to child rows.'
    }
  ],
  'machine-learning': [
    {
      id: 'ml-q1',
      question: 'What is the primary difference between Supervised and Unsupervised Learning?',
      options: [
        'Supervised uses labeled training data; Unsupervised uses unlabeled data',
        'Supervised is only for text; Unsupervised is only for numbers',
        'Supervised never overfits; Unsupervised always overfits',
        'Supervised does not use computers'
      ],
      correctIndex: 0,
      explanation: 'Supervised learning trains on pairs of inputs and ground truth target labels $(X, y)$; Unsupervised learning discovers patterns in unlabeled inputs $X$.'
    },
    {
      id: 'ml-q2',
      question: 'What is Overfitting in Machine Learning?',
      options: [
        'When a model performs well on training data but poorly on unseen test data',
        'When a model performs poorly on both training and test data',
        'When a model has too few parameters',
        'When a model is trained for too few epochs'
      ],
      correctIndex: 0,
      explanation: 'Overfitting occurs when a model memorizes noise in the training set (high variance) and fails to generalize.'
    },
    {
      id: 'ml-q3',
      question: 'Which activation function maps real-valued numbers to probabilities between 0 and 1 in Logistic Regression?',
      options: ['ReLU', 'Sigmoid', 'Linear', 'LeakyReLU'],
      correctIndex: 1,
      explanation: 'The Sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ outputs values in $(0, 1)$.'
    },
    {
      id: 'ml-q4',
      question: 'What is the formula for the F1 Score?',
      options: [
        'Accuracy + Precision',
        '2 * (Precision * Recall) / (Precision + Recall)',
        '(Precision + Recall) / 2',
        'TP / (TP + FP + FN)'
      ],
      correctIndex: 1,
      explanation: 'The F1 Score is the harmonic mean of Precision and Recall: $2 \\cdot \\frac{P \\cdot R}{P + R}$.'
    },
    {
      id: 'ml-q5',
      question: 'Which algorithm is an ensemble method that combines multiple Decision Trees using Bootstrap Aggregation (Bagging)?',
      options: ['Linear Regression', 'K-Means', 'Random Forest', 'KNN'],
      correctIndex: 2,
      explanation: 'Random Forest builds an ensemble of decision trees trained on bootstrap samples with random feature splits.'
    },
    {
      id: 'ml-q6',
      question: 'Why is Feature Scaling crucial before training a K-Nearest Neighbors (KNN) model?',
      options: [
        'KNN uses distance metrics (e.g. Euclidean) that are distorted if features have different scales',
        'KNN cannot accept numbers larger than 1',
        'Feature scaling turns all features into integers',
        'KNN requires data to be normally distributed'
      ],
      correctIndex: 0,
      explanation: 'Because KNN calculates Euclidean distances, features with large scales would unfairly dominate the distance calculation.'
    },
    {
      id: 'ml-q7',
      question: 'In a medical diagnostic classifier, if missing a sick patient (False Negative) is catastrophic, which metric should be maximized?',
      options: ['Precision', 'Recall (Sensitivity)', 'Specificity', 'Training speed'],
      correctIndex: 1,
      explanation: 'Recall ($TP / (TP + FN)$) measures the percentage of actual sick cases detected, minimizing False Negatives.'
    },
    {
      id: 'ml-q8',
      question: 'What method is commonly used to determine the optimal number of clusters (k) in K-Means?',
      options: ['Elbow Method on Inertia', 'P-value test', 'R-squared fit', 'Gradient Descent'],
      correctIndex: 0,
      explanation: 'The Elbow Method plots within-cluster sum-of-squares (inertia) against $k$ to find the point of diminishing returns.'
    },
    {
      id: 'ml-q9',
      question: 'What does K-Fold Cross-Validation accomplish?',
      options: [
        'It splits data into K subsets and trains/validates K times to get a robust, variance-reduced performance estimate',
        'It increases the amount of raw data by K times',
        'It prevents all types of bugs',
        'It replaces the need for cleaning data'
      ],
      correctIndex: 0,
      explanation: 'K-Fold CV iteratively trains on $K-1$ folds and tests on the remaining fold, averaging performance across all $K$ rounds.'
    },
    {
      id: 'ml-q10',
      question: 'If a classifier has 40 True Positives, 10 False Positives, 50 True Negatives, and 0 False Negatives, what is its Precision?',
      options: ['0.80 (80%)', '0.90 (90%)', '1.00 (100%)', '0.75 (75%)'],
      correctIndex: 0,
      explanation: 'Precision = $TP / (TP + FP) = 40 / (40 + 10) = 40 / 50 = 0.80$ (80%).'
    }
  ],
  'data-visualization': [
    {
      id: 'viz-q1',
      question: 'Which chart type is best for showing trends and changes over continuous time?',
      options: ['Pie Chart', 'Line Chart', 'Heatmap', 'Box Plot'],
      correctIndex: 1,
      explanation: 'Line charts connect sequential data points to reveal temporal trends, momentum, and cycles.'
    },
    {
      id: 'viz-q2',
      question: 'Why should the quantitative axis of a standard Bar Chart always start at zero?',
      options: [
        'Because truncating the axis distorts the visual ratio of bar heights, misleading the reader',
        'Because computers cannot render negative numbers',
        'Because bar charts only work with positive percentages',
        'It does not need to start at zero'
      ],
      correctIndex: 0,
      explanation: 'Human visual perception assesses the relative area and height of bars from the baseline; truncating exaggerates differences.'
    },
    {
      id: 'viz-q3',
      question: 'What five summary statistics are displayed in a standard Box Plot?',
      options: [
        'Min, Q1, Median (Q2), Q3, Max',
        'Mean, Variance, Std Dev, Min, Max',
        'Mode, Mean, Median, IQR, Range',
        'P-value, Alpha, Beta, Gamma, Sigma'
      ],
      correctIndex: 0,
      explanation: 'A box plot visualizes Tukey\'s Five-Number Summary: Min, $Q_1$, Median ($Q_2$), $Q_3$, and Max.'
    },
    {
      id: 'viz-q4',
      question: 'Which visualization is ideal for inspecting the bivariate relationship and correlation between two continuous variables?',
      options: ['Donut Chart', 'Scatter Plot', 'Stacked Bar Chart', 'Treemap'],
      correctIndex: 1,
      explanation: 'A Scatter plot maps continuous $(x, y)$ coordinate pairs to show linear and nonlinear associations.'
    },
    {
      id: 'viz-q5',
      question: 'What does a Correlation Heatmap display?',
      options: [
        'A color-coded 2D matrix representing pairwise Pearson correlation coefficients between features',
        'The temperature of computer processors',
        'Geographic heat coordinates of users',
        'A sequence of web page visits'
      ],
      correctIndex: 0,
      explanation: 'Correlation heatmaps color-code pairwise correlation metrics between features to diagnose associations and multicollinearity.'
    },
    {
      id: 'viz-q6',
      question: 'What is the primary difference between a Bar Chart and a Histogram?',
      options: [
        'Bar charts show discrete categories; Histograms show continuous numerical distributions binned into intervals',
        'Bar charts are 3D; Histograms are 2D',
        'Histograms cannot have colors',
        'They are identical'
      ],
      correctIndex: 0,
      explanation: 'Bar charts display counts for discrete categorical groups; Histograms bin continuous data into numeric frequency intervals.'
    },
    {
      id: 'viz-q7',
      question: 'When should you generally AVOID using a Pie Chart?',
      options: [
        'When there are more than 5 categories or when category slices are very close in percentage',
        'When the data sums to 100%',
        'When displaying budget breakdowns with 2 items',
        'When using colors'
      ],
      correctIndex: 0,
      explanation: 'Pie charts with many categories or similar slice angles are difficult for the human eye to compare accurately.'
    },
    {
      id: 'viz-q8',
      question: 'In a box plot, how are individual points positioned beyond the whiskers interpreted?',
      options: ['Missing values', 'Statistical Outliers', 'Averages', 'Medians'],
      correctIndex: 1,
      explanation: 'Points plotted beyond the $1.5 \\times IQR$ whisker boundaries are flagged as statistical outliers.'
    },
    {
      id: 'viz-q9',
      question: 'What is overplotting in scatter plots, and how can it be mitigated?',
      options: [
        'When points overlap densely; fixed using alpha transparency or 2D density/hexbins',
        'When there are too few points to see',
        'When the plot size is too small for a phone',
        'When axes labels are missing'
      ],
      correctIndex: 0,
      explanation: 'Overplotting occurs when thousands of points overlap into a solid mass; transparency (alpha) or hexbin density maps resolve this.'
    },
    {
      id: 'viz-q10',
      question: 'Which Python visualization library is built on top of Matplotlib and offers high-level statistical plotting themes?',
      options: ['Seaborn', 'NumPy', 'Flask', 'SQLAlchemy'],
      correctIndex: 0,
      explanation: 'Seaborn is built directly on top of Matplotlib and integrates closely with Pandas DataFrames.'
    }
  ],
  'data-analysis': [
    {
      id: 'da-q1',
      question: 'What does the acronym EDA stand for in Data Science?',
      options: [
        'Exploratory Data Analysis',
        'Electronic Data Acquisition',
        'Estimated Distribution Algorithm',
        'Entity Database Architecture'
      ],
      correctIndex: 0,
      explanation: 'EDA stands for Exploratory Data Analysis, the approach of summarizing and visualizing datasets.'
    },
    {
      id: 'da-q2',
      question: 'What is the danger of blindly dropping all rows containing missing values (`df.dropna()`)?',
      options: [
        'It can discard massive proportions of valuable data and introduce severe sampling bias',
        'It increases the database size',
        'It converts numbers to strings',
        'It causes infinite loops'
      ],
      correctIndex: 0,
      explanation: 'Listwise deletion (`dropna`) can discard a huge percentage of observations and bias distributions if missingness is non-random.'
    },
    {
      id: 'da-q3',
      question: 'Which missing value imputation strategy is safest for a numerical column with severe outliers?',
      options: ['Mean Imputation', 'Median Imputation', 'Zero Imputation', 'Maximum Value Imputation'],
      correctIndex: 1,
      explanation: 'The Median is immune to outliers and provides a robust central estimate for imputation in skewed data.'
    },
    {
      id: 'da-q4',
      question: 'What transformation is commonly applied to compress right-skewed positive data (e.g. monetary income)?',
      options: ['Log Transformation (log1p)', 'Exponential Transformation', 'Squaring', 'Multiplying by 100'],
      correctIndex: 0,
      explanation: 'The Log transform $\\log(1 + x)$ compresses long right tails and stabilizes variance.'
    },
    {
      id: 'da-q5',
      question: 'What is Winsorization in outlier treatment?',
      options: [
        'Capping extreme values at a designated percentile cutoff rather than deleting the rows',
        'Deleting all negative numbers',
        'Multiplying outliers by zero',
        'Reordering the dataset alphabetically'
      ],
      correctIndex: 0,
      explanation: 'Winsorization caps extreme values at statistical boundaries (e.g. 1st and 99th percentiles) to preserve row counts.'
    },
    {
      id: 'da-q6',
      question: 'Why should a Data Analyst convert string date columns into DateTime objects?',
      options: [
        'To enable chronological sorting, date arithmetic, and extraction of components (day of week, month, year)',
        'To save computer battery',
        'Because strings cannot be printed',
        'DateTime objects take no memory'
      ],
      correctIndex: 0,
      explanation: 'DateTime objects allow standard time-series manipulation, duration calculations, and unambiguous sorting.'
    },
    {
      id: 'da-q7',
      question: 'What does Anscombe\'s Quartet teach data analysts?',
      options: [
        'Four datasets can have identical summary statistics (mean, variance, correlation) yet completely different visual distributions',
        'Always use four features in machine learning',
        'Quadratic equations have four roots',
        'Never use histograms'
      ],
      correctIndex: 0,
      explanation: 'Anscombe\'s Quartet highlights that numerical summaries alone can deceive; visualization is required.'
    },
    {
      id: 'da-q8',
      question: 'What is the formula for Min-Max Normalization to scale a feature into the range [0, 1]?',
      options: [
        '(x - x_min) / (x_max - x_min)',
        '(x - mean) / std',
        'x / mean',
        'x * 100'
      ],
      correctIndex: 0,
      explanation: 'Min-Max scaling formula is $x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$.'
    },
    {
      id: 'da-q9',
      question: 'What is a rolling / moving average primarily used for in time-series data analysis?',
      options: [
        'Smoothing out short-term noise and day-of-week fluctuations to reveal the underlying trend',
        'Encrypting the time-series',
        'Deleting duplicate timestamps',
        'Finding the maximum value'
      ],
      correctIndex: 0,
      explanation: 'Moving averages smooth high-frequency noise and seasonality, highlighting long-term trends.'
    },
    {
      id: 'da-q10',
      question: 'What is the difference between univariate and bivariate analysis?',
      options: [
        'Univariate analyzes one single variable; Bivariate explores relationships between two variables',
        'Univariate is for university data; Bivariate is for business data',
        'Univariate is supervised; Bivariate is unsupervised',
        'There is no difference'
      ],
      correctIndex: 0,
      explanation: 'Univariate examines a single feature distribution; Bivariate investigates the relationship between two variables.'
    }
  ],
  mathematics: [
    {
      id: 'math-q1',
      question: 'What is the derivative of $f(x) = 4x^3 - 5x + 7$ with respect to $x$?',
      options: ['12x^2 - 5', '12x^3 - 5', '4x^2 - 5', '12x^2 + 7'],
      correctIndex: 0,
      explanation: 'Using the power rule: $d/dx(4x^3) = 12x^2$, $d/dx(-5x) = -5$, $d/dx(7) = 0$. Result: $12x^2 - 5$.'
    },
    {
      id: 'math-q2',
      question: 'If Matrix A has dimension (4, 3) and Matrix B has dimension (3, 2), what is the shape of the matrix product A @ B?',
      options: ['(4, 2)', '(3, 3)', '(4, 3)', 'Multiplication is undefined'],
      correctIndex: 0,
      explanation: '$(4 \\times 3) \\times (3 \\times 2) = (4 \\times 2)$. The inner dimensions (3) match and cancel.'
    },
    {
      id: 'math-q3',
      question: 'What is the dot product of two orthogonal (perpendicular) non-zero vectors u and v?',
      options: ['0', '1', '-1', 'Infinity'],
      correctIndex: 0,
      explanation: '$u \\cdot v = \\|u\\| \\|v\\| \\cos(90^\\circ) = 0$.'
    },
    {
      id: 'math-q4',
      question: 'What calculus rule enables the Backpropagation algorithm to calculate gradients layer-by-layer in Deep Neural Networks?',
      options: ['Chain Rule', 'Product Rule', 'Quotient Rule', 'L\'Hopital\'s Rule'],
      correctIndex: 0,
      explanation: 'The Chain Rule computes the derivative of composite functions: $\\frac{dz}{dx} = \\frac{dz}{dy} \\cdot \\frac{dy}{dx}$.'
    },
    {
      id: 'math-q5',
      question: 'What is the value of the vector Cosine Similarity between two identical vectors pointing in the exact same direction?',
      options: ['1.0', '0.0', '-1.0', '0.5'],
      correctIndex: 0,
      explanation: 'Cosine of $0^\\circ$ angle is $\\cos(0^\\circ) = 1.0$, denoting perfect alignment.'
    },
    {
      id: 'math-q6',
      question: 'What is the expected value E[X] when rolling a fair six-sided die?',
      options: ['3.5', '3.0', '4.0', '6.0'],
      correctIndex: 0,
      explanation: '$E[X] = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3.5$.'
    },
    {
      id: 'math-q7',
      question: 'What does an Eigenvector v of a square matrix A satisfy?',
      options: ['Av = λv (where λ is a scalar eigenvalue)', 'Av = 0', 'Av = v^2', 'Av = A + v'],
      correctIndex: 0,
      explanation: '$A v = \\lambda v$: multiplying matrix $A$ by eigenvector $v$ only scales $v$ by eigenvalue $\\lambda$ without changing direction.'
    },
    {
      id: 'math-q8',
      question: 'What is the output of the ReLU activation function for an input z = -3.8?',
      options: ['0.0', '-3.8', '3.8', '1.0'],
      correctIndex: 0,
      explanation: '$\\text{ReLU}(z) = \\max(0, z)$. $\\max(0, -3.8) = 0.0$.'
    },
    {
      id: 'math-q9',
      question: 'What is the transpose of a 2x3 matrix?',
      options: ['A 3x2 matrix with rows and columns swapped', 'A 2x3 matrix with negated signs', 'A 2x2 identity matrix', 'A scalar number'],
      correctIndex: 0,
      explanation: 'Transposition swaps row and column indices ($A^T_{ij} = A_{ji}$), turning a $2 \\times 3$ into a $3 \\times 2$ matrix.'
    },
    {
      id: 'math-q10',
      question: 'In Gradient Descent optimization, in which direction do we update the weights w to minimize loss L(w)?',
      options: [
        'In the opposite direction of the gradient vector (-∇L)',
        'In the exact same direction as the gradient (+∇L)',
        'Perpendicular to the gradient',
        'At random'
      ],
      correctIndex: 0,
      explanation: 'Because the gradient $\\nabla L$ points in the direction of steepest ascent, we subtract it ($w \\leftarrow w - \\alpha \\nabla L$) to move downhill.'
    }
  ]
};
