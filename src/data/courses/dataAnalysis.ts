import { Topic } from '../../types';

export const dataAnalysisTopics: Topic[] = [
  {
    id: 'da-01',
    subjectId: 'data-analysis',
    title: '1. Data Collection & Ingestion',
    order: 1,
    explanation:
      'Data Collection is the foundational stage of gathering raw information from heterogeneous sources including relational databases (SQL), REST APIs, web scraping, IoT telemetry, log files, and survey instruments. Data quality at collection directly sets the ceiling for all downstream analytical models ("Garbage In, Garbage Out").',
    keyPoints: [
      'Source formats: CSV, JSON, Parquet, SQL tables, NoSQL documents, Avro.',
      'API ingestion: REST endpoints with pagination, rate limiting, and Bearer authentication.',
      'Batch vs Streaming: Periodic ETL (e.g. daily cron) vs real-time event streaming (Kafka/PubSub).',
      'Ethical considerations: Data privacy (GDPR, HIPAA), consent, and security.'
    ],
    code: `# API Ingestion simulation using Python Requests & JSON
import json

sample_api_response = """[
    {"timestamp": "2026-08-20T08:00:00Z", "sensor_id": "SN-102", "reading": 24.5},
    {"timestamp": "2026-08-20T08:05:00Z", "sensor_id": "SN-102", "reading": 24.8}
]"""

data = json.loads(sample_api_response)
print(f"Ingested {len(data)} records from API stream.")
print("First record payload:", data[0])`,
    codeLanguage: 'python',
    expectedOutput: `Ingested 2 records from API stream.
First record payload: {'timestamp': '2026-08-20T08:00:00Z', 'sensor_id': 'SN-102', 'reading': 24.5}`,
    practiceQuestion: {
      question: 'What principle states that poor quality input data produces flawed analysis and unreliable predictions regardless of model sophistication?',
      hint: 'GIGO.',
      solution: '**Garbage In, Garbage Out (GIGO)**.'
    },
    tags: ['data-collection', 'ingestion', 'api', 'etl']
  },
  {
    id: 'da-02',
    subjectId: 'data-analysis',
    title: '2. Data Cleaning & Validation',
    order: 2,
    explanation:
      'Data Cleaning is the process of detecting and correcting (or removing) corrupt, inaccurate, incomplete, or irrelevant records from a raw dataset. Real-world datasets consistently contain whitespace errors, inconsistent casing, invalid characters, and mixed date formats.',
    keyPoints: [
      'Standardize strings: trim whitespace, unify casing (e.g., "USA", "U.S.A.", "usa" -> "USA").',
      'Type enforcement: convert string numbers to floats/ints and date strings to datetime objects.',
      'Schema validation: verify values fall within plausible domain boundaries (e.g. Age between 0 and 120).'
    ],
    code: `# Cleaning raw string columns with Pandas
import pandas as pd

raw_df = pd.DataFrame({
    "country": ["  United States ", "USA", "u.s.a.", "Canada  ", "CANADA"],
    "date": ["2026-01-15", "01/16/2026", "2026-01-17", "2026.01.18", "2026-01-19"],
    "revenue": ["$1,200.50", "$3,400.00", "$950.25", "$2,100.00", "$4,500.00"]
})

# Standardize Country
country_map = {"united states": "USA", "usa": "USA", "u.s.a.": "USA", "canada": "Canada"}
raw_df["clean_country"] = raw_df["country"].str.strip().str.lower().map(country_map)

# Standardize Revenue to float
raw_df["clean_revenue"] = raw_df["revenue"].str.replace("$", "", regex=False).str.replace(",", "", regex=False).astype(float)

print(raw_df[["clean_country", "clean_revenue"]])`,
    codeLanguage: 'python',
    expectedOutput: `  clean_country  clean_revenue
0           USA        1200.50
1           USA        3400.00
2           USA         950.25
3        Canada        2100.00
4        Canada        4500.00`,
    practiceQuestion: {
      question: 'Why should date strings always be converted to standard ISO 8601 datetime objects (e.g., `pd.to_datetime()`)?',
      hint: 'Think about sorting, filtering by month/year, and calculating time differences.',
      solution: 'Converting to datetime objects allows chronological sorting, calculating elapsed intervals, extracting components (day of week, month), and eliminates format ambiguity (e.g. MM/DD vs DD/MM).'
    },
    tags: ['data-cleaning', 'standardization', 'validation']
  },
  {
    id: 'da-03',
    subjectId: 'data-analysis',
    title: '3. Handling Missing Values (Imputation vs Deletion)',
    order: 3,
    explanation:
      'Missing data occurs due to sensor dropouts, optional user form fields, or system integration errors. Missing data mechanisms include MCAR (Missing Completely at Random), MAR (Missing at Random), and MNAR (Missing Not at Random).',
    keyPoints: [
      'Detection: `df.isna().sum()` and `df.isna().mean() * 100`.',
      'Listwise Deletion (`df.dropna()`): Suitable only when <3-5% of rows are missing and MCAR.',
      'Statistical Imputation: Mean (symmetric data), Median (skewed data with outliers), Mode (categorical).',
      'Advanced Imputation: KNN Imputation, MICE (IterativeImputer), or adding an indicator column (`is_missing`).'
    ],
    code: `# Handling missing values in Pandas
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "age": [25, 30, np.nan, 45, 22, np.nan, 38],
    "salary": [50000, 62000, 58000, np.nan, 48000, 95000, 72000],
    "education": ["BS", "MS", "BS", "PhD", np.nan, "MS", "BS"]
})

# Median imputation for numeric age
median_age = df["age"].median()
df["age_imputed"] = df["age"].fillna(median_age)

# Mode imputation for categorical education
mode_edu = df["education"].mode()[0]
df["edu_imputed"] = df["education"].fillna(mode_edu)

print(f"Median Age: {median_age} | Mode Education: {mode_edu}")
print(df[["age_imputed", "edu_imputed"]])`,
    codeLanguage: 'python',
    expectedOutput: `Median Age: 27.5 | Mode Education: BS
   age_imputed edu_imputed
0         25.0          BS
1         30.0          MS
2         27.5          BS
3         45.0         PhD
4         22.0          BS
5         27.5          MS
6         38.0          BS`,
    practiceQuestion: {
      question: 'When a numerical feature has severe positive skew and large outliers, why is Median imputation preferred over Mean imputation?',
      hint: 'Consider how outliers pull the mean.',
      solution: 'The mean is pulled upwards by extreme outliers, resulting in imputed values that are artificially high; the median represents the true typical center.'
    },
    tags: ['missing-values', 'imputation', 'mcar', 'pandas']
  },
  {
    id: 'da-04',
    subjectId: 'data-analysis',
    title: '4. Duplicate Data Detection & Removal',
    order: 4,
    explanation:
      'Duplicate records inflate sample sizes, bias statistical estimates, and cause artificial data leakage across train/test splits. Duplicates can be exact full-row copies or key-based duplicates (same customer ID or transaction ID).',
    keyPoints: [
      'Full row duplicates: `df.duplicated().sum()` and `df.drop_duplicates()`.',
      'Subset duplicates: `df.drop_duplicates(subset=["user_id", "date"], keep="last")`.',
      '`keep="first"` retains the first seen record, while `keep="last"` retains the latest update.'
    ],
    code: `# Identifying and removing duplicates in Pandas
import pandas as pd

orders = pd.DataFrame({
    "order_id": [101, 102, 102, 103, 104, 104],
    "customer": ["Alice", "Bob", "Bob", "Charlie", "David", "David"],
    "amount": [250, 400, 400, 150, 300, 300]
})

print("Raw order count:", len(orders))
print("Duplicate rows count:", orders.duplicated().sum())

clean_orders = orders.drop_duplicates(subset=["order_id"], keep="first")
print("Cleaned unique orders:", len(clean_orders))`,
    codeLanguage: 'python',
    expectedOutput: `Raw order count: 6
Duplicate rows count: 2
Cleaned unique orders: 4`,
    practiceQuestion: {
      question: 'What is the risk of having duplicated records when training a Machine Learning model?',
      hint: 'Think about test leakage and weighted overfitting.',
      solution: 'Duplicates give double weight to repeated patterns causing overfitting, and if duplicated across train and test sets, cause severe data leakage and fake high accuracy.'
    },
    tags: ['duplicates', 'deduplication', 'data-integrity']
  },
  {
    id: 'da-05',
    subjectId: 'data-analysis',
    title: '5. Outlier Detection & Treatment',
    order: 5,
    explanation:
      'Outliers are observations that deviate substantially from the overall distribution of the dataset. They can represent measurement errors (broken sensor), data entry typos (age = 250), or genuine rare high-value events (billionaire customer).',
    keyPoints: [
      'Z-score method: flags points with $|z| > 3$ (assuming normal distribution).',
      'IQR method (Tukey\'s fences): $[Q_1 - 1.5 \\cdot IQR, Q_3 + 1.5 \\cdot IQR]$ (distribution-free).',
      'Treatment options: Capping/Winsorization (clamping to percentiles), Log Transformation, or Removal if verified error.'
    ],
    code: `# Outlier Capping (Winsorization) using IQR
import numpy as np
import pandas as pd

data = pd.Series([12, 14, 15, 16, 18, 19, 20, 22, 23, 25, 120]) # 120 is extreme outlier

q1 = data.quantile(0.25)
q3 = data.quantile(0.75)
iqr = q3 - q1
upper_fence = q3 + 1.5 * iqr

# Cap outliers to upper fence (Winsorization)
data_capped = np.where(data > upper_fence, upper_fence, data)

print(f"Upper Fence: {upper_fence:.1f}")
print("Original Max:", data.max())
print("Capped Max:  ", data_capped.max())`,
    codeLanguage: 'python',
    expectedOutput: `Upper Fence: 34.0
Original Max: 120
Capped Max:   34.0`,
    practiceQuestion: {
      question: 'What is Winsorization in outlier treatment?',
      hint: 'Think about clamping values instead of deleting rows.',
      solution: 'Winsorization caps extreme values at a specified statistical threshold (like the 99th percentile or IQR fence) rather than discarding the entire record.'
    },
    tags: ['outliers', 'z-score', 'iqr', 'winsorization']
  },
  {
    id: 'da-06',
    subjectId: 'data-analysis',
    title: '6. Data Transformation & Scaling',
    order: 6,
    explanation:
      'Data Transformation modifies numerical scales or categorical encodings to satisfy statistical model assumptions. Key transformations include Log transforms (stabilizing variance and fixing right-skewness), Box-Cox, Min-Max scaling, and Standardization.',
    keyPoints: [
      'Log transform $\\log(1 + x)$ compresses long right tails into approximately normal shapes.',
      'Min-Max Normalization scales values to a fixed range $[0, 1]$: $x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}$.',
      'Standardization centers around 0 with unit variance: $z = \\frac{x - \\mu}{\\sigma}$.'
    ],
    formula: 'x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\qquad z = \\frac{x - \\bar{x}}{s}',
    code: `# Applying Log Transform and MinMax Scaling
import numpy as np

# Highly skewed positive revenue data
skewed_revenue = np.array([100, 250, 400, 1200, 8500, 95000])

log_revenue = np.log1p(skewed_revenue) # log(1 + x)
min_val, max_val = log_revenue.min(), log_revenue.max()
scaled_01 = (log_revenue - min_val) / (max_val - min_val)

print("Original Revenue:    ", skewed_revenue)
print("Log Transformed:     ", np.round(log_revenue, 2))
print("Normalized in [0, 1]:", np.round(scaled_01, 2))`,
    codeLanguage: 'python',
    expectedOutput: `Original Revenue:     [  100   250   400  1200  8500 95000]
Log Transformed:      [ 4.62  5.53  5.99  7.09  9.05 11.46]
Normalized in [0, 1]: [0.   0.13 0.2  0.36 0.65 1.  ]`,
    practiceQuestion: {
      question: 'Why is `np.log1p(x)` preferred over `np.log(x)` when transforming features that contain zero values?',
      hint: 'What is log(0)?',
      solution: '`log(0)` is mathematically undefined ($-\\infty$), whereas `log1p(x)` computes $\\log(1 + x)$, producing $\\log(1) = 0$ safely.'
    },
    tags: ['transformation', 'log-transform', 'scaling', 'normalization']
  },
  {
    id: 'da-07',
    subjectId: 'data-analysis',
    title: '7. Exploratory Data Analysis (EDA) Workflow',
    order: 7,
    explanation:
      'Exploratory Data Analysis (EDA) is an approach to analyzing datasets to summarize their main characteristics, often with visual methods, before applying formal modeling. Pioneered by John Tukey, EDA uncovers structure, tests hypotheses, and checks assumptions.',
    keyPoints: [
      'Univariate Analysis: inspecting individual feature distributions (mean, median, variance, histograms).',
      'Bivariate Analysis: exploring relationships between feature pairs (scatter plots, box plots, correlation coefficients).',
      'Multivariate Analysis: pairplots, correlation heatmaps, interaction terms, and dimensionality reduction.'
    ],
    code: `# Standard EDA Summary Checklist in Pandas
import pandas as pd

df = pd.DataFrame({
    "age": [21, 25, 32, 45, 54, 28, 33],
    "gpa": [3.8, 3.4, 3.9, 3.1, 3.7, 3.6, 3.95],
    "graduated": [True, True, True, False, True, True, True]
})

print("Shape:", df.shape)
print("\\n--- Column Data Types & Non-Nulls ---")
print(df.dtypes)
print("\\n--- Numerical Summary (Describe) ---")
print(df.describe().round(2))`,
    codeLanguage: 'python',
    expectedOutput: `Shape: (7, 3)

--- Column Data Types & Non-Nulls ---
age            int64
gpa          float64
graduated       bool
dtype: object

--- Numerical Summary (Describe) ---
         age   gpa
count   7.00  7.00
mean   33.86  3.64
std    11.88  0.30
min    21.00  3.10
25%    26.50  3.50
50%    32.00  3.70
75%    39.00  3.85
max    54.00  3.95`,
    practiceQuestion: {
      question: 'What are the three core questions an EDA workflow answers about a new dataset?',
      hint: 'Distributions, relationships, and anomalies.',
      solution: '1. What are the distributions of individual features? 2. How are features related to one another? 3. Are there missing values, anomalies, or errors?'
    },
    tags: ['eda', 'univariate', 'bivariate', 'describe']
  },
  {
    id: 'da-08',
    subjectId: 'data-analysis',
    title: '8. Data Visualization in EDA',
    order: 8,
    explanation:
      'Anscombe\'s Quartet demonstrates that datasets with identical statistical summary metrics (mean, variance, correlation) can have radically different underlying distributions. Visualization in EDA prevents analysts from being deceived by summary tables.',
    keyPoints: [
      'Never rely solely on numerical statistics; always visualize the data.',
      'Histograms and KDE plots for single variable distribution shapes.',
      'Scatter plots and correlation heatmaps for relationship discovery.',
      'FacetGrids / subplots for segmenting metrics by categorical groups.'
    ],
    code: `# Demonstrating EDA visual verification
# Group comparison summary
groups = {
    "Group A (Even spread)": [10, 20, 30, 40, 50],
    "Group B (Bimodal)":     [10, 10, 30, 50, 50]
}

for name, vals in groups.items():
    print(f"{name:<22} -> Mean: {sum(vals)/len(vals):.1f} | But distributions differ drastically!")`,
    codeLanguage: 'python',
    expectedOutput: `Group A (Even spread)  -> Mean: 30.0 | But distributions differ drastically!
Group B (Bimodal)      -> Mean: 30.0 | But distributions differ drastically!`,
    practiceQuestion: {
      question: 'What fundamental lesson does Anscombe\'s Quartet teach Data Scientists?',
      hint: 'Numbers vs visual shapes.',
      solution: 'Numerical summary statistics alone can be misleading; you must visualize the data to understand the true patterns and distributions.'
    },
    tags: ['eda-visualization', 'anscombes-quartet', 'distribution']
  },
  {
    id: 'da-09',
    subjectId: 'data-analysis',
    title: '9. Finding Patterns & Trends',
    order: 9,
    explanation:
      'Finding patterns involves detecting seasonal variations, trend directions, cluster segments, and nonlinear correlations. Time-series decomposition splits data into Trend, Seasonality, and Residual components.',
    keyPoints: [
      'Trend: Long-term directional movement (upward/downward).',
      'Seasonality: Periodic, repeating patterns occurring at fixed time intervals (e.g. daily, weekly, quarterly).',
      'Cyclical: Fluctuations without a fixed frequency (e.g., economic business cycles).',
      'Rolling averages / Moving averages smooth out short-term noise to illuminate underlying trends.'
    ],
    code: `# Computing a 3-period Rolling Moving Average for trend extraction
import pandas as pd

daily_logins = pd.Series([120, 135, 110, 190, 220, 210, 310, 340, 290])
rolling_trend = daily_logins.rolling(window=3).mean()

for raw, trend in zip(daily_logins, rolling_trend):
    trend_str = f"{trend:.1f}" if pd.notna(trend) else "N/A"
    print(f"Raw Value: {raw:<4} | Smoothed Trend (3-day MA): {trend_str}")`,
    codeLanguage: 'python',
    expectedOutput: `Raw Value: 120  | Smoothed Trend (3-day MA): N/A
Raw Value: 135  | Smoothed Trend (3-day MA): N/A
Raw Value: 110  | Smoothed Trend (3-day MA): 121.7
Raw Value: 190  | Smoothed Trend (3-day MA): 145.0
Raw Value: 220  | Smoothed Trend (3-day MA): 173.3
Raw Value: 210  | Smoothed Trend (3-day MA): 206.7
Raw Value: 310  | Smoothed Trend (3-day MA): 246.7
Raw Value: 340  | Smoothed Trend (3-day MA): 286.7
Raw Value: 290  | Smoothed Trend (3-day MA): 313.3`,
    practiceQuestion: {
      question: 'What is the purpose of applying a 7-day rolling average to daily website visitor metrics?',
      hint: 'Think about weekend vs weekday differences.',
      solution: 'It smooths out day-of-week seasonality (e.g. weekend traffic dips) to reveal the true underlying weekly growth trend.'
    },
    tags: ['patterns', 'trends', 'moving-average', 'seasonality']
  },
  {
    id: 'da-10',
    subjectId: 'data-analysis',
    title: '10. Drawing Insights & Business Storytelling',
    order: 10,
    explanation:
      'Data analysis is only as valuable as the decisions it empowers. Translating complex statistical findings and ML outputs into clear, actionable business recommendations is the defining skill of elite Data Scientists.',
    keyPoints: [
      'Focus on the "So What?": Connect mathematical findings directly to strategic objectives.',
      'Quantify impact: Report findings with effect sizes, confidence intervals, and projected ROI.',
      'Tailor communication: Executives need high-level outcomes and trade-offs; engineers need technical specifics and reproduction code.'
    ],
    code: `# Generating an Automated Executive Insight Summary
retention_rate_new = 0.84
retention_rate_old = 0.76
cohort_size = 50000
arr_per_user = 120

additional_retained = int((retention_rate_new - retention_rate_old) * cohort_size)
projected_revenue_impact = additional_retained * arr_per_user

print("=== EXECUTIVE DECISION BRIEF ===")
print(f"• Metric Lift: Retention improved from {retention_rate_old*100:.0f}% to {retention_rate_new*100:.0f}% (+8.0% absolute lift).")
print(f"• Customer Impact: Retains an estimated {additional_retained:,} additional users annually.")
print("• Revenue Impact: +$" + f"{projected_revenue_impact:,}" + " ARR incremental value.")
print("• Recommendation: Roll out feature to 100% of production traffic.")`,
    codeLanguage: 'python',
    expectedOutput: `=== EXECUTIVE DECISION BRIEF ===
• Metric Lift: Retention improved from 76% to 84% (+8.0% absolute lift).
• Customer Impact: Retains an estimated 4,000 additional users annually.
• Revenue Impact: +$480,000 ARR incremental value.
• Recommendation: Roll out feature to 100% of production traffic.`,
    practiceQuestion: {
      question: 'Why should a Data Science report present confidence intervals alongside average predicted outcomes?',
      hint: 'Think about risk, uncertainty, and decision making.',
      solution: 'Confidence intervals communicate the range of uncertainty, allowing decision-makers to assess best-case, expected, and worst-case risk scenarios.'
    },
    tags: ['insights', 'storytelling', 'decision-making', 'roi']
  }
];
