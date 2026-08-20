import { Topic } from '../../types';

export const dataVisualizationTopics: Topic[] = [
  {
    id: 'viz-01',
    subjectId: 'data-visualization',
    title: '1. Bar Chart (Categorical Comparisons)',
    order: 1,
    explanation:
      'A Bar Chart presents categorical data with rectangular bars whose lengths or heights are proportional to the values they represent. It is the gold standard for discrete categorical comparisons across groups or across discrete time steps.',
    keyPoints: [
      'What it is: A chart mapping discrete categories on one axis and a quantitative metric on the other.',
      'When to use: Comparing counts, revenue, or averages across distinct categories (e.g. sales by country, students per major).',
      'Horizontal bar charts are ideal when category names are long to avoid diagonal truncated labels.',
      'Always start the numerical baseline at zero (0) to avoid misleading visual exaggeration.'
    ],
    code: `import matplotlib.pyplot as plt

majors = ['Data Science', 'CS', 'Statistics', 'Software Eng', 'Math']
students = [145, 210, 85, 175, 60]

plt.figure(figsize=(7, 4))
plt.bar(majors, students, color='#3b82f6', edgecolor='#1d4ed8')
plt.title("Student Enrollment by University Major", fontweight='bold')
plt.xlabel("Degree Program")
plt.ylabel("Number of Students")
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
print("Bar chart generated successfully.")`,
    codeLanguage: 'python',
    expectedOutput: `Bar chart generated successfully.`,
    practiceQuestion: {
      question: 'Why must the quantitative y-axis of a standard bar chart always begin at 0?',
      hint: 'Think about how the eye perceives bar height and ratio.',
      solution: 'The human eye compares the relative area and height of the bars; truncating the axis exaggerates small differences and distorts proportional comparison.'
    },
    tags: ['bar-chart', 'categorical', 'comparison']
  },
  {
    id: 'viz-02',
    subjectId: 'data-visualization',
    title: '2. Line Chart (Temporal Trends & Sequences)',
    order: 2,
    explanation:
      'A Line Chart displays information as a series of data points (markers) connected by straight line segments. It is the premier visualization for continuous time-series data, showing trend direction, velocity, and seasonal cycles.',
    keyPoints: [
      'What it is: Continuous connected points along an ordered temporal or continuous x-axis.',
      'When to use: Tracking changes over time (stock prices, temperature trends, training loss per epoch, monthly revenue).',
      'Do not use line charts for categorical variables that have no natural sequence or order.',
      'Limit the number of lines on a single chart (3-5 max) to avoid visual clutter (spaghetti chart).'
    ],
    code: `import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
gpu_hours = [120, 145, 190, 260, 310, 420]

plt.figure(figsize=(7, 4))
plt.plot(months, gpu_hours, marker='o', color='#10b981', linewidth=2.5)
plt.title("Monthly Compute Cluster GPU Usage", fontweight='bold')
plt.xlabel("Month")
plt.ylabel("GPU Hours Consumed")
plt.grid(True, alpha=0.3)
plt.tight_layout()
print("Line chart generated successfully.")`,
    codeLanguage: 'python',
    expectedOutput: `Line chart generated successfully.`,
    practiceQuestion: {
      question: 'Can you use a line chart to plot customer satisfaction for 5 different ice cream flavors? Why or why not?',
      hint: 'Are ice cream flavors sequential?',
      solution: 'No. Line charts imply a continuous connection or progression between points. Discrete unordered categories should be displayed using a bar chart instead.'
    },
    tags: ['line-chart', 'time-series', 'trends']
  },
  {
    id: 'viz-03',
    subjectId: 'data-visualization',
    title: '3. Pie Chart & Donut Chart (Proportions of a Whole)',
    order: 3,
    explanation:
      'A Pie Chart is a circular statistical graphic divided into slices to illustrate numerical proportion. Slices must sum to exactly 100%. Donut charts remove the center to emphasize arc lengths and allow metric placement in the center hole.',
    keyPoints: [
      'What it is: Circular chart showing percentage composition of a single total sum.',
      'When to use: Displaying simple composition with 3-5 categories max where proportions differ substantially.',
      'Avoid when categories have similar percentages, as human perception struggles to compare 2D angles.',
      'Bar charts are almost always more accurate for human cognitive decoding than pie charts.'
    ],
    code: `import matplotlib.pyplot as plt

categories = ['Supervised', 'Unsupervised', 'Reinforcement', 'GenAI']
shares = [45, 25, 10, 20]
colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

plt.figure(figsize=(5, 5))
plt.pie(shares, labels=categories, autopct='%1.1f%%', startangle=140, colors=colors)
plt.title("Data Science Curriculum Allocation", fontweight='bold')
plt.tight_layout()
print("Pie chart created.")`,
    codeLanguage: 'python',
    expectedOutput: `Pie chart created.`,
    practiceQuestion: {
      question: 'What is the maximum number of slices recommended for a clean, legible pie chart?',
      hint: 'Think about cognitive load.',
      solution: 'Between **3 to 5 slices**. More categories make angles indistinguishable and clutter labels.'
    },
    tags: ['pie-chart', 'proportions', 'composition']
  },
  {
    id: 'viz-04',
    subjectId: 'data-visualization',
    title: '4. Histogram (Continuous Distribution)',
    order: 4,
    explanation:
      'A Histogram bins continuous numerical data into discrete consecutive intervals and plots the frequency (count or density) of observations in each bin. It reveals distribution shape, skewness, modality, and spread.',
    keyPoints: [
      'What it is: Consecutive touching bars representing frequency counts across continuous numeric bins.',
      'When to use: Analyzing the probability distribution of a single numerical feature (e.g. age, salary, latency).',
      'Bin width / number of bins dramatically affects the visual story (use Freedman-Diaconis or Sturges rule).',
      'Reveals whether data is normal (bell-shaped), skewed left/right, or bimodal.'
    ],
    code: `import matplotlib.pyplot as plt
import numpy as np

# Generate normally distributed exam grades
np.random.seed(42)
grades = np.random.normal(loc=78, scale=10, size=500)

plt.figure(figsize=(7, 4))
plt.hist(grades, bins=15, color='#6366f1', edgecolor='white', alpha=0.85)
plt.title("Distribution of Student Midterm Scores (n=500)", fontweight='bold')
plt.xlabel("Score")
plt.ylabel("Frequency (Student Count)")
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
print("Histogram rendered.")`,
    codeLanguage: 'python',
    expectedOutput: `Histogram rendered.`,
    practiceQuestion: {
      question: 'What is the difference between a Bar Chart and a Histogram?',
      hint: 'Consider the x-axis: discrete categories vs continuous numeric ranges.',
      solution: 'A Bar Chart compares discrete categorical groups (with gaps between bars); a Histogram displays the continuous distribution of a single numeric variable (bars touch).'
    },
    tags: ['histogram', 'distribution', 'frequency', 'skewness']
  },
  {
    id: 'viz-05',
    subjectId: 'data-visualization',
    title: '5. Scatter Plot (Bivariate Correlation)',
    order: 5,
    explanation:
      'A Scatter Plot uses Cartesian coordinates to display values for two continuous numerical variables for a set of data points. It is the primary visual tool for detecting correlations, clusters, nonlinear relationships, and multivariate outliers.',
    keyPoints: [
      'What it is: Individual (x, y) coordinates plotted as markers on continuous axes.',
      'When to use: Investigating relationships, associations, and correlations between two numeric features.',
      'Can encode a 3rd variable via point color (hue) and a 4th via point size (bubble chart).',
      'Overplotting in massive datasets can be solved with alpha transparency or 2D hexbins.'
    ],
    code: `import matplotlib.pyplot as plt
import numpy as np

# Bivariate relationship: Study Hours vs Final Exam Score
study_hours = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
scores = np.array([45, 52, 58, 64, 71, 74, 82, 85, 89, 93, 95, 98])

plt.figure(figsize=(7, 4))
plt.scatter(study_hours, scores, color='#ec4899', s=60, edgecolors='black', alpha=0.8)
plt.title("Study Hours vs Exam Score", fontweight='bold')
plt.xlabel("Hours Studied per Week")
plt.ylabel("Exam Score (%)")
plt.grid(True, alpha=0.3)
plt.tight_layout()
print("Scatter plot plotted.")`,
    codeLanguage: 'python',
    expectedOutput: `Scatter plot plotted.`,
    practiceQuestion: {
      question: 'If points on a scatter plot slope downwards from top-left to bottom-right, what kind of correlation does this indicate?',
      hint: 'As x increases, y decreases.',
      solution: 'It indicates a **Negative Correlation**.'
    },
    tags: ['scatter-plot', 'correlation', 'bivariate']
  },
  {
    id: 'viz-06',
    subjectId: 'data-visualization',
    title: '6. Box Plot / Box-and-Whisker (Five-Number Summary)',
    order: 6,
    explanation:
      'A Box Plot provides a standardized graphical display of the five-number summary: Minimum, First Quartile ($Q_1$), Median ($Q_2$), Third Quartile ($Q_3$), and Maximum, with outliers marked as isolated points.',
    keyPoints: [
      'What it is: A box spanning $Q_1$ to $Q_3$ (IQR), a line at the median, and whiskers extending to $1.5 \\times IQR$.',
      'When to use: Comparing distributions across multiple categories and instantly diagnosing outliers.',
      'Whiskers capture the normal spread; isolated dots beyond whiskers denote statistical outliers.',
      'Compact footprint makes it ideal for side-by-side comparison of 10+ groups simultaneously.'
    ],
    code: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
group_python = np.random.normal(82, 6, 50)
group_sql = np.random.normal(88, 5, 50)
group_stats = np.random.normal(74, 9, 50)

plt.figure(figsize=(7, 4))
plt.boxplot([group_python, group_sql, group_stats], tick_labels=['Python', 'SQL', 'Statistics'], patch_artist=True)
plt.title("Course Score Distributions (Five-Number Summary)", fontweight='bold')
plt.ylabel("Score")
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
print("Box plot generated.")`,
    codeLanguage: 'python',
    expectedOutput: `Box plot generated.`,
    practiceQuestion: {
      question: 'What do the bottom and top edges of the box in a box plot represent?',
      hint: 'The 25th and 75th percentiles.',
      solution: 'The bottom edge represents **$Q_1$ (25th percentile)** and the top edge represents **$Q_3$ (75th percentile)**.'
    },
    tags: ['box-plot', 'five-number-summary', 'outliers', 'quartiles']
  },
  {
    id: 'viz-07',
    subjectId: 'data-visualization',
    title: '7. Heatmap & Correlation Matrix',
    order: 7,
    explanation:
      'A Heatmap visualizes a 2D matrix of values using a continuous color spectrum. In Data Science, heatmaps are most frequently utilized for correlation matrices, confusion matrices, and feature cross-tabulation.',
    keyPoints: [
      'What it is: A color-coded grid mapping numerical values to color hues and intensities.',
      'When to use: Visualizing pairwise feature correlations to diagnose multicollinearity before training ML models.',
      'Diverging colormaps (e.g. `coolwarm`, `RdBu`) are ideal for correlation matrices centered at zero.',
      'Always annotate cells with numerical values for precise interpretation.'
    ],
    code: `import matplotlib.pyplot as plt
import numpy as np

# 4x4 Correlation Matrix Simulation
corr_matrix = np.array([
    [1.00, 0.85, 0.20, -0.45],
    [0.85, 1.00, 0.15, -0.38],
    [0.20, 0.15, 1.00, 0.10],
    [-0.45, -0.38, 0.10, 1.00]
])
features = ['GPA', 'Study_Hours', 'Age', 'Absences']

plt.figure(figsize=(6, 5))
plt.imshow(corr_matrix, cmap='coolwarm', vmin=-1, vmax=1)
plt.colorbar(label='Pearson Correlation')
plt.xticks(range(4), features, rotation=30)
plt.yticks(range(4), features)
for i in range(4):
    for j in range(4):
        plt.text(j, i, f"{corr_matrix[i, j]:.2f}", ha='center', va='center', color='black')
plt.title("Feature Correlation Heatmap", fontweight='bold')
plt.tight_layout()
print("Heatmap created.")`,
    codeLanguage: 'python',
    expectedOutput: `Heatmap created.`,
    practiceQuestion: {
      question: 'In a feature correlation heatmap, what does a cell value of +0.95 between two features warn a Data Scientist about?',
      hint: 'High correlation between predictors.',
      solution: 'It warns of **Multicollinearity**—the two features contain redundant information, which can destabilize linear model coefficients.'
    },
    tags: ['heatmap', 'correlation-matrix', 'multicollinearity']
  }
];
