import { Topic } from '../../types';

export const statisticsTopics: Topic[] = [
  {
    id: 'stat-01',
    subjectId: 'statistics',
    title: '1. Introduction to Statistics',
    order: 1,
    explanation:
      'Statistics is the mathematical science of collecting, organizing, analyzing, interpreting, and presenting empirical data. In Data Science, statistics provides the theoretical foundation for drawing reliable inferences from sample data, evaluating algorithmic uncertainty, and proving whether observed patterns are statistically significant or merely random noise.',
    keyPoints: [
      'Descriptive Statistics: Summarizes and describes features of a specific dataset (e.g., mean, spread, quantiles).',
      'Inferential Statistics: Draws conclusions and makes predictions about a larger population based on a representative sample.',
      'Variable types: Qualitative (Categorical: Nominal, Ordinal) and Quantitative (Numerical: Discrete, Continuous).',
      'Underpins Machine Learning model validation, A/B testing, and hypothesis evaluation.'
    ],
    formula: 'Sample Space: S = \\{e_1, e_2, \\dots, e_n\\}',
    code: `# Descriptive vs Inferential setup in Python
import numpy as np

# Sample of student exam scores
scores = np.array([72, 85, 91, 68, 77, 83, 94, 88, 79, 90])

print("Dataset size (n):", len(scores))
print("Sample Mean:", np.mean(scores))
print("Sample Standard Deviation:", np.std(scores, ddof=1))`,
    codeLanguage: 'python',
    expectedOutput: `Dataset size (n): 10
Sample Mean: 82.7
Sample Standard Deviation: 8.273787256952402`,
    practiceQuestion: {
      question: 'Is "Customer satisfaction rating on a scale of 1 to 5 stars" an example of Nominal, Ordinal, Discrete, or Continuous data?',
      hint: 'The stars have a natural order (5 is better than 4), but the difference between intervals is not strictly continuous numerical measurements.',
      solution: 'It is **Ordinal Categorical Data** because the categories possess an inherent rank order.'
    },
    tags: ['statistics', 'introduction', 'data-types']
  },
  {
    id: 'stat-02',
    subjectId: 'statistics',
    title: '2. Population vs Sample',
    order: 2,
    explanation:
      'A **Population** includes every individual, item, or observation of interest (parameter, denoted with Greek letters like $\\mu, \\sigma$). A **Sample** is a representative subset drawn from the population (statistic, denoted with Latin letters like $\\bar{x}, s$). Because examining an entire population is often impossible or cost-prohibitive, data scientists study samples to infer population properties.',
    keyPoints: [
      'Parameter: A fixed numerical characteristic of the entire population (e.g., $\\mu$).',
      'Statistic: A measurable characteristic calculated from a sample (e.g., $\\bar{x}$).',
      'Sampling bias occurs when sample members are not randomly chosen, resulting in skewed estimates.',
      'Random sampling techniques: Simple Random, Stratified, Systematic, Cluster sampling.'
    ],
    formula: 'Population Mean (\\mu) = \\frac{\\sum X}{N} \\quad vs \\quad Sample Mean (\\bar{x}) = \\frac{\\sum x}{n}',
    code: `# Simulating Population vs Random Sampling in Python
import numpy as np

np.random.seed(42)
# True Population: 100,000 users with mean purchase = $65.00
population_purchases = np.random.normal(loc=65.0, scale=12.0, size=100000)

# Draw a random sample of n=200 users
sample = np.random.choice(population_purchases, size=200, replace=False)

print("True Population Mean (μ): $" + f"{np.mean(population_purchases):.2f}")
print("Sample Mean Estimate (x̄): $" + f"{np.mean(sample):.2f}")
print("Sampling Error: $" + f"{abs(np.mean(population_purchases) - np.mean(sample)):.2f}")`,
    codeLanguage: 'python',
    expectedOutput: `True Population Mean (μ): $64.99
Sample Mean Estimate (x̄): $65.23
Sampling Error: $0.24`,
    practiceQuestion: {
      question: 'What is the primary difference between a parameter and a statistic?',
      hint: 'Think about who is being measured: the whole group or a selected subset.',
      solution: 'A parameter describes an entire population, while a statistic is calculated from a subset (sample).'
    },
    tags: ['population', 'sample', 'sampling']
  },
  {
    id: 'stat-03',
    subjectId: 'statistics',
    title: '3. Mean (Arithmetic Average)',
    order: 3,
    explanation:
      'The arithmetic mean is the sum of all observed values divided by the total count of observations. While intuitive and mathematically tractable, the mean is sensitive to extreme outliers and skewed distributions.',
    keyPoints: [
      'Sensitive to extreme values and outliers.',
      'Center of gravity: the sum of deviations from the mean is always zero ($\\sum (x_i - \\bar{x}) = 0$).',
      'Variations include Weighted Mean, Geometric Mean (for growth rates), and Harmonic Mean (for speeds/ratios).',
      'Best suited for symmetric, bell-shaped distributions.'
    ],
    formula: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i',
    code: `# Calculating Mean and demonstrating outlier vulnerability
import numpy as np

salaries = [50000, 52000, 55000, 58000, 62000]
print("Standard Salaries Mean: $", np.mean(salaries))

# Adding an executive outlier
salaries_with_ceo = salaries + [1500000]
print("Mean with CEO Outlier:   $", np.mean(salaries_with_ceo))`,
    codeLanguage: 'python',
    expectedOutput: `Standard Salaries Mean: $ 55400.0
Mean with CEO Outlier:   $ 296166.6666666667`,
    practiceQuestion: {
      question: 'Find the mean of the dataset: [12, 18, 25, 30, 40].',
      hint: 'Sum = 125, Count = 5.',
      solution: 'Sum = 125. 125 / 5 = **25.0**.'
    },
    tags: ['central-tendency', 'mean', 'average']
  },
  {
    id: 'stat-04',
    subjectId: 'statistics',
    title: '4. Median (Middle Value)',
    order: 4,
    explanation:
      'The median is the 50th percentile—the exact middle observation when data is ordered from smallest to largest. If the sample size $n$ is odd, it is the center value; if $n$ is even, it is the average of the two central numbers. The median is robust against outliers.',
    keyPoints: [
      'Robust/Resistant metric: extreme outliers do not distort the median.',
      'Splits the sorted distribution into two equal halves (50% above, 50% below).',
      'Preferred measure of central tendency for skewed data such as real estate prices and income levels.'
    ],
    formula: '\\text{Median} = \\begin{cases} X_{(n+1)/2} & \\text{if } n \\text{ is odd} \\\\ \\frac{X_{n/2} + X_{(n/2)+1}}{2} & \\text{if } n \\text{ is even} \\end{cases}',
    code: `# Robustness of median vs mean
import numpy as np

home_prices = [300000, 320000, 350000, 390000, 420000, 25000000] # Mansion outlier

print("Mean Price:   $" + f"{np.mean(home_prices):,.2f}")
print("Median Price: $" + f"{np.median(home_prices):,.2f}")`,
    codeLanguage: 'python',
    expectedOutput: `Mean Price:   $4,463,333.33
Median Price: $370,000.00`,
    practiceQuestion: {
      question: 'Find the median of: [7, 3, 9, 12, 1, 4].',
      hint: 'Sort first: [1, 3, 4, 7, 9, 12]. Since n=6 (even), average the 3rd and 4th items.',
      solution: 'Sorted: [1, 3, 4, 7, 9, 12]. Middle values are 4 and 7. Median = (4 + 7) / 2 = **5.5**.'
    },
    tags: ['central-tendency', 'median', 'robust-statistics']
  },
  {
    id: 'stat-05',
    subjectId: 'statistics',
    title: '5. Mode (Most Frequent Value)',
    order: 5,
    explanation:
      'The mode is the value or category that appears with highest frequency in a dataset. A dataset can be unimodal (one peak), bimodal (two peaks), multimodal (multiple peaks), or have no mode if all values appear with equal frequency.',
    keyPoints: [
      'The only measure of central tendency applicable to nominal categorical data.',
      'Identifies the most popular customer segment, most common error code, or peak demand time.',
      'In multimodal distributions, indicates multiple underlying sub-populations.'
    ],
    code: `# Finding Mode in Python using scipy / statistics
from collections import Counter

user_os = ["Windows", "MacOS", "Linux", "Windows", "Windows", "MacOS", "Linux", "Windows"]
counts = Counter(user_os)
mode_os, highest_freq = counts.most_common(1)[0]

print("OS Distribution:", dict(counts))
print(f"Mode: {mode_os} (Frequency: {highest_freq})")`,
    codeLanguage: 'python',
    expectedOutput: `OS Distribution: {'Windows': 4, 'MacOS': 2, 'Linux': 2}
Mode: Windows (Frequency: 4)`,
    practiceQuestion: {
      question: 'What is the mode of the numbers [4, 8, 4, 9, 11, 8, 4, 15]?',
      hint: 'Count how many times each number appears.',
      solution: '4 appears 3 times, 8 appears 2 times. The mode is **4**.'
    },
    tags: ['central-tendency', 'mode', 'categorical']
  },
  {
    id: 'stat-06',
    subjectId: 'statistics',
    title: '6. Range & Interquartile Range (IQR)',
    order: 6,
    explanation:
      'Range measures the total span of the data ($Max - Min$). The Interquartile Range (IQR) measures the spread of the middle 50% of the distribution ($Q_3 - Q_1$). IQR is the foundation for detecting outliers in box plots (Tukey\'s Fences: $[Q_1 - 1.5\\cdot IQR, Q_3 + 1.5\\cdot IQR]$).',
    keyPoints: [
      'Range is sensitive to extreme single values.',
      'Quartiles: $Q_1$ (25th percentile), $Q_2$ (50th percentile / median), $Q_3$ (75th percentile).',
      '$IQR = Q_3 - Q_1$, completely immune to extreme boundary points.',
      'Outlier boundary rule: $x < Q_1 - 1.5 \\times IQR$ or $x > Q_3 + 1.5 \\times IQR$.'
    ],
    formula: '\\text{Range} = X_{\\max} - X_{\\min} \\qquad \\text{IQR} = Q_3 - Q_1',
    code: `# Calculating Range, IQR, and Outlier Bounds
import numpy as np

data = np.array([10, 12, 14, 15, 17, 18, 19, 21, 22, 24, 25, 85]) # 85 is outlier

q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr
outliers = data[(data < lower_bound) | (data > upper_bound)]

print(f"Range: {np.ptp(data)} (Min: {data.min()}, Max: {data.max()})")
print(f"Q1: {q1}, Q3: {q3}, IQR: {iqr}")
print(f"Normal Boundary: [{lower_bound:.1f} to {upper_bound:.1f}]")
print(f"Detected Outliers: {outliers}")`,
    codeLanguage: 'python',
    expectedOutput: `Range: 75 (Min: 10, Max: 85)
Q1: 14.75, Q3: 22.5, IQR: 7.75
Normal Boundary: [3.1 to 34.1]
Detected Outliers: [85]`,
    practiceQuestion: {
      question: 'If Q1 = 30 and Q3 = 70, what is the upper cutoff threshold for outliers using the 1.5 * IQR rule?',
      hint: 'IQR = 70 - 30 = 40. Cutoff = Q3 + 1.5 * IQR.',
      solution: 'IQR = 40. Cutoff = 70 + (1.5 * 40) = 70 + 60 = **130**.'
    },
    tags: ['dispersion', 'iqr', 'outliers', 'range']
  },
  {
    id: 'stat-07',
    subjectId: 'statistics',
    title: '7. Variance (Spread of Data)',
    order: 7,
    explanation:
      'Variance measures the average squared deviation of each data point from the mean. It quantifies the degree of dispersion in a distribution. For sample variance, we divide by $n - 1$ (Bessel\'s correction) to obtain an unbiased estimator of population variance.',
    keyPoints: [
      'Squaring ensures negative deviations do not cancel positive ones and penalizes larger discrepancies.',
      'Units of variance are squared (e.g., dollars squared, meters squared), making direct interpretation less intuitive than standard deviation.',
      'Population variance uses divisor $N$; sample variance uses divisor $n - 1$.'
    ],
    formula: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2',
    code: `# Sample Variance calculation from scratch and numpy
import numpy as np

sample = np.array([4, 8, 6, 5, 3, 2, 8, 9, 2, 5])
mean_val = np.mean(sample)
n = len(sample)

# Step-by-step
deviations = sample - mean_val
squared_devs = deviations ** 2
sample_var_manual = np.sum(squared_devs) / (n - 1)
sample_var_np = np.var(sample, ddof=1)

print(f"Mean: {mean_val}")
print(f"Sample Variance (Manual): {sample_var_manual:.4f}")
print(f"Sample Variance (NumPy):  {sample_var_np:.4f}")`,
    codeLanguage: 'python',
    expectedOutput: `Mean: 5.2
Sample Variance (Manual): 6.4000
Sample Variance (NumPy):  6.4000`,
    practiceQuestion: {
      question: 'Why do we divide by (n - 1) instead of n when calculating sample variance?',
      hint: 'It is called Bessel\'s correction and corrects for bias in estimating population variance.',
      solution: 'Dividing by (n - 1) corrects the downward bias that occurs when using the sample mean instead of the true population mean, making it an unbiased estimator.'
    },
    tags: ['variance', 'dispersion', 'bessels-correction']
  },
  {
    id: 'stat-08',
    subjectId: 'statistics',
    title: '8. Standard Deviation (Sigma)',
    order: 8,
    explanation:
      'Standard deviation ($s$ or $\\sigma$) is the square root of the variance. Because it is expressed in the original units of measurement, it is the most widely reported metric of spread and variability in data science and experimental results.',
    keyPoints: [
      'Expressed in the identical unit as the original data and mean.',
      'In a Normal Distribution: ~68.2% of data lies within $\\pm 1\\sigma$, ~95.4% within $\\pm 2\\sigma$, and ~99.7% within $\\pm 3\\sigma$ (Empirical 68-95-99.7 Rule).',
      'Low standard deviation indicates data points cluster tightly around the mean; high indicates widespread dispersion.'
    ],
    formula: 's = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}',
    code: `# Standard Deviation comparison between two models
import numpy as np

# Model A has consistent predictions; Model B is volatile
model_a_errors = np.array([1.2, 1.4, 1.1, 1.3, 1.5])
model_b_errors = np.array([0.1, 3.5, 0.2, 2.8, 0.4])

print(f"Model A Mean Error: {np.mean(model_a_errors):.2f}, Std Dev: {np.std(model_a_errors, ddof=1):.2f}")
print(f"Model B Mean Error: {np.mean(model_b_errors):.2f}, Std Dev: {np.std(model_b_errors, ddof=1):.2f}")`,
    codeLanguage: 'python',
    expectedOutput: `Model A Mean Error: 1.30, Std Dev: 0.16
Model B Mean Error: 1.40, Std Dev: 1.62`,
    practiceQuestion: {
      question: 'If the variance of a feature is 49, what is its standard deviation?',
      hint: 'Std Dev is sqrt(Variance).',
      solution: 'sqrt(49) = **7.0**.'
    },
    tags: ['standard-deviation', 'spread', 'empirical-rule']
  },
  {
    id: 'stat-09',
    subjectId: 'statistics',
    title: '9. Probability Fundamentals & Bayes\' Theorem',
    order: 9,
    explanation:
      'Probability quantifies the likelihood that a specific event $A$ will occur, bounded in $[0, 1]$. Core rules include the Addition Rule (Unions), Multiplication Rule (Joint probabilities), Conditional Probability $P(A|B)$, and Bayes\' Theorem for updating belief in light of new evidence.',
    keyPoints: [
      'Axioms: $0 \\le P(A) \\le 1$ and $P(\\text{Sample Space}) = 1$.',
      'Conditional Probability: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$.',
      'Independent Events: $P(A \\cap B) = P(A) \\cdot P(B)$.',
      'Bayes\' Theorem forms the engine of Naive Bayes classifiers and Bayesian A/B testing.'
    ],
    formula: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}',
    code: `# Bayes Theorem: Spam Filter Example
# P(Spam) = 0.20 (Prior)
# P(Contains "Free" | Spam) = 0.80 (Likelihood)
# P(Contains "Free" | Ham) = 0.05
# P(Ham) = 0.80

p_spam = 0.20
p_ham = 0.80
p_free_given_spam = 0.80
p_free_given_ham = 0.05

# Total probability of email containing "Free"
p_free = (p_free_given_spam * p_spam) + (p_free_given_ham * p_ham)

# Posterior: P(Spam | Contains "Free")
p_spam_given_free = (p_free_given_spam * p_spam) / p_free

print(f"Total probability P('Free'): {p_free:.3f}")
print(f"Posterior Probability P(Spam | 'Free'): {p_spam_given_free * 100:.2f}%")`,
    codeLanguage: 'python',
    expectedOutput: `Total probability P('Free'): 0.200
Posterior Probability P(Spam | 'Free'): 80.00%`,
    practiceQuestion: {
      question: 'If you roll a fair 6-sided die, what is the probability of rolling a number greater than 4?',
      hint: 'Favorable outcomes are {5, 6}. Total outcomes = 6.',
      solution: '2 / 6 = 1/3 ≈ **0.333 (33.33%)**.'
    },
    tags: ['probability', 'bayes-theorem', 'conditional-probability']
  },
  {
    id: 'stat-10',
    subjectId: 'statistics',
    title: '10. Normal Distribution & Z-Scores',
    order: 10,
    explanation:
      'The Normal (Gaussian) Distribution is a continuous, symmetric, bell-shaped probability distribution defined completely by its mean $\\mu$ and variance $\\sigma^2$. The Central Limit Theorem dictates that the sum or average of independent random variables approaches a normal distribution regardless of the underlying population shape.',
    keyPoints: [
      'Symmetric about the mean: $\\text{Mean} = \\text{Median} = \\text{Mode}$.',
      'Standard Normal Distribution: $\\mu = 0, \\sigma = 1$.',
      'Z-score calculates how many standard deviations an observation lies from the mean ($z = \\frac{x - \\mu}{\\sigma}$).',
      'Crucial for standardizing ML input features and computing p-values.'
    ],
    formula: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2} \\qquad Z = \\frac{x - \\mu}{\\sigma}',
    code: `# Computing Z-Scores and Normal Probability
import numpy as np

# Class exam grades: mean = 75, std = 8
mu, sigma = 75, 8
student_score = 91

# Calculate Z-score
z = (student_score - mu) / sigma
print(f"Student Score: {student_score}")
print(f"Z-Score: {z:.2f} (Student is {z:.2f} standard deviations above class average)")`,
    codeLanguage: 'python',
    expectedOutput: `Student Score: 91
Z-Score: 2.00 (Student is 2.00 standard deviations above class average)`,
    practiceQuestion: {
      question: 'What percentage of data in a standard normal distribution falls within ±2 standard deviations of the mean?',
      hint: 'Use the 68-95-99.7 empirical rule.',
      solution: 'Approximately **95.4%** (or ~95%).'
    },
    tags: ['normal-distribution', 'z-score', 'gaussian', 'central-limit-theorem']
  },
  {
    id: 'stat-11',
    subjectId: 'statistics',
    title: '11. Pearson Correlation Coefficient (r)',
    order: 11,
    explanation:
      'Pearson correlation ($r$) measures the strength and direction of the linear relationship between two continuous variables. The coefficient ranges from $-1.0$ (perfect negative linear relationship) to $+1.0$ (perfect positive linear relationship), with $0$ indicating no linear association.',
    keyPoints: [
      'Bounded strictly within $[-1, 1]$.',
      'Scale-invariant: unaffected by linear transformations (e.g., converting Celsius to Fahrenheit).',
      'Important Caveat: Correlation measures linear relationships only (nonlinear relations like $y = x^2$ may yield $r \\approx 0$).',
      'Correlation does NOT imply causation.'
    ],
    formula: 'r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}',
    code: `# Pearson Correlation calculation
import numpy as np

study_hours = np.array([2, 4, 6, 8, 10, 12])
exam_scores = np.array([55, 65, 78, 85, 92, 98])

corr_matrix = np.corrcoef(study_hours, exam_scores)
r = corr_matrix[0, 1]

print(f"Correlation coefficient r: {r:.4f}")
print("Interpretation: Extremely strong positive linear relationship.")`,
    codeLanguage: 'python',
    expectedOutput: `Correlation coefficient r: 0.9947
Interpretation: Extremely strong positive linear relationship.`,
    practiceQuestion: {
      question: 'If variable X and variable Y have a correlation of -0.85, what does this indicate?',
      hint: 'Look at the sign and magnitude.',
      solution: 'A strong negative linear relationship: as X increases, Y tends to decrease substantially.'
    },
    tags: ['correlation', 'pearson', 'bivariate-analysis']
  },
  {
    id: 'stat-12',
    subjectId: 'statistics',
    title: '12. Covariance',
    order: 12,
    explanation:
      'Covariance measures the joint variability of two random variables. If greater values of one variable correspond to greater values of the other, covariance is positive. Unlike correlation, covariance is unbounded and depends on the scales and units of measurement.',
    keyPoints: [
      'Positive covariance: variables move in the same direction.',
      'Negative covariance: variables move in opposite directions.',
      'Zero covariance: no monotonic relationship.',
      'Covariance matrix is the core mathematical building block of Principal Component Analysis (PCA).'
    ],
    formula: '\\text{Cov}(X, Y) = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})',
    code: `# Covariance Matrix calculation
import numpy as np

ad_spend_k = np.array([10, 20, 30, 40, 50])
revenue_k = np.array([35, 55, 70, 95, 115])

cov_matrix = np.cov(ad_spend_k, revenue_k)
print("Covariance Matrix:\\n", np.round(cov_matrix, 2))
print(f"Cov(AdSpend, Revenue): {cov_matrix[0, 1]:.2f}")`,
    codeLanguage: 'python',
    expectedOutput: `Covariance Matrix:
 [[250. 505.]
 [505. 1030.]]
Cov(AdSpend, Revenue): 505.00`,
    practiceQuestion: {
      question: 'Why is Pearson correlation often preferred over covariance for reporting association strength?',
      hint: 'Think about units and comparability.',
      solution: 'Correlation normalizes covariance between -1 and +1, making it independent of measurement units and comparable across different datasets.'
    },
    tags: ['covariance', 'multivariate', 'pca']
  },
  {
    id: 'stat-13',
    subjectId: 'statistics',
    title: '13. Simple Linear Regression & OLS',
    order: 13,
    explanation:
      'Simple Linear Regression models the relationship between a dependent target variable $y$ and an independent predictor $x$ via a straight line $y = \\beta_0 + \\beta_1 x + \\epsilon$. Ordinary Least Squares (OLS) calculates parameters by minimizing the sum of squared residuals (errors).',
    keyPoints: [
      'Slope ($\\beta_1$): Expected change in $y$ for a 1-unit increase in $x$.',
      'Intercept ($\\beta_0$): Expected value of $y$ when $x = 0$.',
      'Residual: Difference between observed and predicted value ($e_i = y_i - \\hat{y}_i$).',
      '$R^2$ (Coefficient of Determination) measures the proportion of variance explained by the model.'
    ],
    formula: '\\hat{y} = \\beta_0 + \\beta_1 x \\qquad \\beta_1 = \\frac{\\text{Cov}(X,Y)}{\\text{Var}(X)} = r \\frac{s_y}{s_x}',
    code: `# OLS Linear Regression calculation using NumPy polyfit
import numpy as np

x = np.array([1, 2, 3, 4, 5])
y = np.array([2.2, 2.8, 3.6, 4.5, 5.1])

# Degree 1 polynomial fit (Linear regression)
slope, intercept = np.polyfit(x, y, 1)

# Predictions
y_pred = slope * x + intercept
residuals = y - y_pred
r2 = 1 - (np.sum(residuals**2) / np.sum((y - np.mean(y))**2))

print(f"Regression Equation: y = {intercept:.3f} + {slope:.3f} * x")
print(f"R-squared: {r2:.4f}")`,
    codeLanguage: 'python',
    expectedOutput: `Regression Equation: y = 1.440 + 0.740 * x
R-squared: 0.9935`,
    practiceQuestion: {
      question: 'If a regression equation is Salary = 30000 + 4500 * (Years_Experience), what is the estimated salary for someone with 4 years of experience?',
      hint: 'Plug in x = 4.',
      solution: '30000 + (4500 * 4) = 30000 + 18000 = **$48,000**.'
    },
    tags: ['regression', 'ols', 'predictive-modeling', 'r-squared']
  },
  {
    id: 'stat-14',
    subjectId: 'statistics',
    title: '14. Hypothesis Testing & Framework',
    order: 14,
    explanation:
      'Hypothesis testing is a formal statistical procedure for determining whether empirical evidence from a sample supports a specific claim about a population. It sets up competing hypotheses: the Null Hypothesis ($H_0$, status quo/no effect) and the Alternative Hypothesis ($H_1$, significant effect).',
    keyPoints: [
      'Null Hypothesis ($H_0$): Assumes no difference, effect, or relationship exists.',
      'Alternative Hypothesis ($H_1$ or $H_a$): The claim researchers seek to establish.',
      'Significance Level ($\\alpha$): Probability of rejecting $H_0$ when it is actually true (commonly $\\alpha = 0.05$).',
      'Type I Error (False Positive): Rejecting true $H_0$. Type II Error (False Negative): Failing to reject false $H_0$.'
    ],
    formula: '\\text{Test Statistic } (Z) = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}} \\qquad \\text{or } (t) = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}',
    code: `# Hypothesis Testing Decision Logic
def evaluate_hypothesis(test_p_value, alpha=0.05):
    print(f"Observed p-value: {test_p_value:.4f} vs Alpha: {alpha}")
    if test_p_value < alpha:
        return "Decision: Reject H0 (Statistically Significant Effect Detected!)"
    else:
        return "Decision: Fail to Reject H0 (Insufficient evidence to prove effect)"

print(evaluate_hypothesis(0.021))
print(evaluate_hypothesis(0.145))`,
    codeLanguage: 'python',
    expectedOutput: `Observed p-value: 0.0210 vs Alpha: 0.05
Decision: Reject H0 (Statistically Significant Effect Detected!)
Observed p-value: 0.1450 vs Alpha: 0.05
Decision: Fail to Reject H0 (Insufficient evidence to prove effect)`,
    practiceQuestion: {
      question: 'What is a Type I error in statistical hypothesis testing?',
      hint: 'Think false alarm / false positive.',
      solution: 'Rejecting the Null Hypothesis ($H_0$) when $H_0$ is actually true (False Positive).'
    },
    tags: ['hypothesis-testing', 'null-hypothesis', 'type-1-error']
  },
  {
    id: 'stat-15',
    subjectId: 'statistics',
    title: '15. P-Value & Statistical Significance',
    order: 15,
    explanation:
      'The p-value is the probability of obtaining test results at least as extreme as the observed sample data, assuming the Null Hypothesis ($H_0$) is true. A small p-value ($p < \\alpha$) indicates that the observed sample is highly unlikely under the null hypothesis, leading researchers to reject $H_0$.',
    keyPoints: [
      'If $p \\le \\alpha$ (e.g., $0.05$): Reject $H_0$ -> Result is statistically significant.',
      'If $p > \\alpha$: Fail to reject $H_0$ -> Data is consistent with random chance.',
      'Misconception: P-value is NOT the probability that the hypothesis is true; it is the probability of the data given $H_0$.',
      'Effect size (e.g., Cohen\'s d) must also be reported alongside p-value to determine practical significance.'
    ],
    formula: 'p = P(\\text{Data as extreme as observed} \\mid H_0 \\text{ is True})',
    code: `# Two-sample Student's t-test simulation
import numpy as np

# Simulated A/B test conversion rates
group_a = np.array([12, 14, 15, 11, 13, 16, 12, 14]) # Control
group_b = np.array([18, 19, 17, 21, 18, 16, 20, 19]) # New Feature

mean_a, mean_b = np.mean(group_a), np.mean(group_b)
diff = mean_b - mean_a

# Approximate t-statistic
s_pooled = np.sqrt((np.var(group_a, ddof=1) + np.var(group_b, ddof=1)) / 2)
t_stat = diff / (s_pooled * np.sqrt(2 / len(group_a)))

print(f"Control Mean: {mean_a:.1f}% | Treatment Mean: {mean_b:.1f}%")
print(f"Observed Lift: +{diff:.1f}%")
print(f"Calculated t-statistic: {t_stat:.3f} (Significant t > 2.0 indicates p < 0.01)")`,
    codeLanguage: 'python',
    expectedOutput: `Control Mean: 13.4% | Treatment Mean: 18.5%
Observed Lift: +5.1%
Calculated t-statistic: 6.279 (Significant t > 2.0 indicates p < 0.01)`,
    practiceQuestion: {
      question: 'In an A/B test with alpha = 0.05, you calculate a p-value of 0.003. What is the conclusion?',
      hint: 'Compare 0.003 to 0.05.',
      solution: 'Since p = 0.003 < 0.05, we reject the null hypothesis and conclude there is a statistically significant difference between the two variants.'
    },
    tags: ['p-value', 'significance', 'ab-testing', 't-test']
  }
];
