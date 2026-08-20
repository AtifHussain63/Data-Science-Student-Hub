import { Topic } from '../../types';

export const machineLearningTopics: Topic[] = [
  {
    id: 'ml-01',
    subjectId: 'machine-learning',
    title: '1. What is Machine Learning?',
    order: 1,
    explanation:
      'Machine Learning (ML) is a branch of Artificial Intelligence focused on developing algorithms that learn patterns from empirical data and improve their performance through experience, without being explicitly programmed with static rule engines.',
    keyPoints: [
      'Arthur Samuel definition: "Field of study that gives computers the ability to learn without being explicitly programmed."',
      'Tom Mitchell formal definition: A program learns from experience E with respect to task T and performance measure P, if its performance on T, as measured by P, improves with experience E.',
      'Three main paradigms: Supervised Learning, Unsupervised Learning, and Reinforcement Learning.',
      'Applied across medical diagnosis, fraud detection, autonomous driving, and recommendation engines.'
    ],
    code: `# Conceptual Machine Learning pipeline with Scikit-learn
from sklearn.linear_model import LinearRegression
import numpy as np

# Experience E (Training Data): Hours studied -> Exam Score
X_hours = np.array([[2], [4], [6], [8], [10]])
y_scores = np.array([50, 65, 78, 88, 96])

# Task T: Learn mapping function f(X) -> y
model = LinearRegression()
model.fit(X_hours, y_scores)

# Performance evaluation on new unseen experience
test_student = np.array([[7]])
predicted_score = model.predict(test_student)[0]
print(f"Predicted score for 7 study hours: {predicted_score:.1f}%")`,
    codeLanguage: 'python',
    expectedOutput: `Predicted score for 7 study hours: 83.2%`,
    practiceQuestion: {
      question: 'In Tom Mitchell\'s framework of ML, what do E, T, and P represent in an email spam filter?',
      hint: 'Experience, Task, and Performance measure.',
      solution: 'E = Watching which emails users mark as spam; T = Classifying incoming emails as spam or not spam; P = Percentage of emails correctly classified (Accuracy).'
    },
    tags: ['machine-learning', 'intro', 'paradigms']
  },
  {
    id: 'ml-02',
    subjectId: 'machine-learning',
    title: '2. AI vs Machine Learning vs Deep Learning',
    order: 2,
    explanation:
      'Artificial Intelligence (AI) is the overarching vision of creating machines capable of intelligent behavior. Machine Learning (ML) is the subset of AI focused on learning statistical patterns from data. Deep Learning (DL) is a specialized subset of ML using multi-layered Artificial Neural Networks to model hierarchical representations.',
    keyPoints: [
      'AI: The broad umbrella (expert systems, search trees, knowledge graphs, ML).',
      'ML: Statistical algorithms that learn from feature vectors (Random Forests, SVMs, Gradient Boosting).',
      'Deep Learning: Neural networks with multiple hidden layers capable of automatic feature extraction from raw images, audio, and text.',
      'Generative AI & LLMs (e.g. Gemini) are modern breakthroughs built upon Deep Learning transformer architectures.'
    ],
    code: `# Visualizing the hierarchy of Intelligence
ai_ecosystem = {
    "AI": "Broad concept of smart machines",
    "Machine Learning": "Algorithms learning from structured data/features",
    "Deep Learning": "Multi-layer neural nets with automated feature representation",
    "Generative AI": "Deep models synthesizing new text, images, and code"
}

for level, desc in ai_ecosystem.items():
    print(f"[{level}] -> {desc}")`,
    codeLanguage: 'python',
    expectedOutput: `[AI] -> Broad concept of smart machines
[Machine Learning] -> Algorithms learning from structured data/features
[Deep Learning] -> Multi-layer neural nets with automated feature representation
[Generative AI] -> Deep models synthesizing new text, images, and code`,
    practiceQuestion: {
      question: 'Is every Deep Learning algorithm an example of Machine Learning?',
      hint: 'Think about nested subsets.',
      solution: 'Yes, Deep Learning is a specialized subfield of Machine Learning.'
    },
    tags: ['ai-vs-ml', 'deep-learning', 'taxonomy']
  },
  {
    id: 'ml-03',
    subjectId: 'machine-learning',
    title: '3. Data Science vs Machine Learning',
    order: 3,
    explanation:
      'Data Science is an interdisciplinary field that encompasses data engineering, data cleaning, exploratory data analysis, statistics, visualization, business domain insight, and machine learning. Machine Learning is the algorithmic engine within Data Science focused specifically on predictive and descriptive modeling.',
    keyPoints: [
      'Data Science encompasses the complete end-to-end data lifecycle (Collection -> Cleaning -> Exploration -> ML -> Business Decision).',
      'Machine Learning focuses on algorithmic optimization, mathematical loss minimization, generalization, and predictive accuracy.',
      'A Data Scientist spends ~70% of time in data preparation, EDA, feature engineering, and communication of insights.'
    ],
    code: `# Data Science Lifecycle simulation
phases = [
    ("1. Ingestion", "SQL / Cloud Buckets / APIs"),
    ("2. Wrangling", "Pandas cleaning, missing value imputation"),
    ("3. EDA & Viz", "Matplotlib / Seaborn distributions"),
    ("4. Feature Eng", "Scaling, One-hot encoding, PCA"),
    ("5. Machine Learning", "Model training, hyperparameter tuning"),
    ("6. Deployment & MLOps", "APIs, monitoring model drift")
]

for step, tech in phases:
    print(f"{step:<22} | Tech: {tech}")`,
    codeLanguage: 'python',
    expectedOutput: `1. Ingestion           | Tech: SQL / Cloud Buckets / APIs
2. Wrangling           | Tech: Pandas cleaning, missing value imputation
3. EDA & Viz           | Tech: Matplotlib / Seaborn distributions
4. Feature Eng         | Tech: Scaling, One-hot encoding, PCA
5. Machine Learning    | Tech: Model training, hyperparameter tuning
6. Deployment & MLOps  | Tech: APIs, monitoring model drift`,
    practiceQuestion: {
      question: 'True or False: Building an accurate ML model is the only responsibility of a Data Scientist.',
      hint: 'Consider problem formulation, communication, and data quality.',
      solution: 'False. Data Scientists formulate business hypotheses, clean data, engineer features, validate findings, and translate mathematical outputs into actionable decisions.'
    },
    tags: ['data-science-vs-ml', 'lifecycle', 'mlops']
  },
  {
    id: 'ml-04',
    subjectId: 'machine-learning',
    title: '4. Supervised Learning',
    order: 4,
    explanation:
      'Supervised Learning trains algorithms on labeled datasets where every input example $X$ is paired with a known ground-truth target output $y$. The algorithm minimizes a loss function to discover the optimal mapping function $\\hat{y} = f(X)$.',
    keyPoints: [
      'Input: Feature matrix $X$ and ground truth label vector $y$.',
      'Two major branches: **Classification** (discrete categories) and **Regression** (continuous numbers).',
      'Common algorithms: Linear/Logistic Regression, Decision Trees, Random Forest, Gradient Boosted Trees (XGBoost/LightGBM), SVMs.',
      'Requires high-quality labeled data, which can be costly and time-consuming to curate.'
    ],
    formula: '\\min_{\\theta} \\frac{1}{N} \\sum_{i=1}^{N} L(y_i, f(x_i; \\theta))',
    code: `# Supervised Learning example using Scikit-Learn
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier

# Generate synthetic supervised labeled dataset
X, y = make_classification(n_samples=100, n_features=4, random_state=42)

clf = RandomForestClassifier(n_estimators=10, random_state=42)
clf.fit(X, y)

print(f"Supervised model trained on {len(X)} samples with {X.shape[1]} features.")
print(f"Sample prediction on first record: {clf.predict(X[:1])} (True label: {y[0]})")`,
    codeLanguage: 'python',
    expectedOutput: `Supervised model trained on 100 samples with 4 features.
Sample prediction on first record: [1] (True label: 1)`,
    practiceQuestion: {
      question: 'Predicting whether a bank loan applicant will default (Yes or No) is an example of what type of Supervised Learning?',
      hint: 'The target is discrete categories.',
      solution: 'It is a **Binary Classification** problem.'
    },
    tags: ['supervised-learning', 'classification', 'regression', 'labels']
  },
  {
    id: 'ml-05',
    subjectId: 'machine-learning',
    title: '5. Unsupervised Learning',
    order: 5,
    explanation:
      'Unsupervised Learning uncovers hidden patterns, clusters, and intrinsic structures in datasets that have no pre-assigned ground truth target labels. The model is given only input features $X$.',
    keyPoints: [
      'Input: Feature matrix $X$ with NO target labels $y$.',
      'Major tasks: **Clustering** (K-Means, DBSCAN, Hierarchical), **Dimensionality Reduction** (PCA, t-SNE, UMAP), and **Anomaly Detection** (Isolation Forests).',
      'Used for customer segmentation, genomic sequencing groupings, fraud pattern detection, and data compression.'
    ],
    code: `# Unsupervised Clustering with K-Means
from sklearn.cluster import KMeans
import numpy as np

# Unlabeled customer purchase frequency and average basket size
X_customers = np.array([
    [2, 20], [1, 25], [2, 30],       # Low spenders
    [10, 150], [12, 180], [9, 140],   # High spenders
    [5, 80], [6, 75], [5, 90]         # Medium spenders
])

kmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')
clusters = kmeans.fit_predict(X_customers)

print("Assigned cluster IDs:", clusters)
print("Discovered Cluster Centroids:\\n", np.round(kmeans.cluster_centers_, 1))`,
    codeLanguage: 'python',
    expectedOutput: `Assigned cluster IDs: [1 1 1 0 0 0 2 2 2]
Discovered Cluster Centroids:
 [[ 10.3 156.7]
 [  1.7  25. ]
 [  5.3  81.7]]`,
    practiceQuestion: {
      question: 'Name two common applications of Unsupervised Learning in modern business.',
      hint: 'Think about customer groups and reducing dimensions.',
      solution: '1. Customer market segmentation (Clustering) and 2. Feature dimensionality reduction/compression (PCA).'
    },
    tags: ['unsupervised-learning', 'clustering', 'pca', 'segmentation']
  },
  {
    id: 'ml-06',
    subjectId: 'machine-learning',
    title: '6. Classification Tasks',
    order: 6,
    explanation:
      'Classification is a supervised learning task where the target output variable is a categorical class or discrete category. Models output probability distributions over class labels and assign instances to classes based on decision thresholds.',
    keyPoints: [
      'Binary Classification: Exactly 2 classes (e.g., Fraud vs Legitimate, Spam vs Not Spam).',
      'Multiclass Classification: >2 mutually exclusive classes (e.g., Handwritten digits 0-9, Iris flower species).',
      'Multilabel Classification: An instance can simultaneously belong to multiple classes (e.g., Movie genres: Action AND Sci-Fi).',
      'Decision boundaries separate the feature space into class regions.'
    ],
    code: `# Binary vs Multiclass classification summary
import numpy as np

# Simulated predicted class probabilities for a 3-class model
predicted_probs = np.array([0.10, 0.75, 0.15])
classes = ["Setosa", "Versicolor", "Virginica"]
predicted_class = classes[np.argmax(predicted_probs)]

print(f"Class Probabilities: {dict(zip(classes, predicted_probs))}")
print(f"Final Decision: {predicted_class} (Confidence: {np.max(predicted_probs)*100:.1f}%)")`,
    codeLanguage: 'python',
    expectedOutput: `Class Probabilities: {'Setosa': 0.1, 'Versicolor': 0.75, 'Virginica': 0.15}
Final Decision: Versicolor (Confidence: 75.0%)`,
    practiceQuestion: {
      question: 'If an image classifier outputs probabilities [Cat: 0.15, Dog: 0.80, Bird: 0.05], what is the predicted label and what function selected it?',
      hint: 'Look for highest value using argmax.',
      solution: 'Predicted label is **Dog** (80% confidence), selected by the `argmax` function.'
    },
    tags: ['classification', 'binary', 'multiclass', 'decision-boundary']
  },
  {
    id: 'ml-07',
    subjectId: 'machine-learning',
    title: '7. Regression Tasks',
    order: 7,
    explanation:
      'Regression is a supervised learning task where the target variable $y$ is a continuous numerical quantity (e.g., house price, temperature, stock price, user lifetime value).',
    keyPoints: [
      'Outputs continuous real numbers ($y \\in \\mathbb{R}$).',
      'Evaluation metrics: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), $R^2$ Score.',
      'Unlike classification where errors are right vs wrong, regression error magnitude matters directly ($|y - \\hat{y}|$).'
    ],
    formula: '\\text{RMSE} = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (y_i - \\hat{y}_i)^2}',
    code: `# Evaluating Regression predictions
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

y_true = np.array([300000, 450000, 280000, 520000, 390000])
y_pred = np.array([310000, 435000, 290000, 505000, 395000])

mae = mean_absolute_error(y_true, y_pred)
rmse = np.sqrt(mean_squared_error(y_true, y_pred))
r2 = r2_score(y_true, y_pred)

print("MAE:  $" + f"{mae:,.2f}")
print("RMSE: $" + f"{rmse:,.2f}")
print(f"R²:   {r2:.4f}")`,
    codeLanguage: 'python',
    expectedOutput: `MAE:  $11,000.00
RMSE: $11,916.38
R²:   0.9798`,
    practiceQuestion: {
      question: 'Why does RMSE penalize large prediction errors more severely than MAE?',
      hint: 'Look at the square inside the formula.',
      solution: 'Because the errors are squared before averaging, an error of 10 adds 100 to the sum while an error of 2 adds only 4, heavily penalizing large outliers.'
    },
    tags: ['regression', 'continuous-target', 'rmse', 'mae']
  },
  {
    id: 'ml-08',
    subjectId: 'machine-learning',
    title: '8. Linear Regression',
    order: 8,
    explanation:
      'Linear Regression models the expected value of target $y$ as a linear combination of input features $X$: $\\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \\dots + w_p x_p$. Parameters are optimized by minimizing the residual sum of squares (Ordinary Least Squares).',
    keyPoints: [
      'High interpretability: each coefficient $w_j$ represents the change in $y$ per unit change in $x_j$, holding all other features constant.',
      'Assumptions: Linearity, Independence of errors, Homoscedasticity (constant error variance), Normality of residuals, No multicollinearity.',
      'Regularization extensions: Ridge Regression (L2 penalty) and Lasso Regression (L1 penalty for sparse feature selection).'
    ],
    formula: '\\hat{y} = X w + b \\qquad L_{MSE}(w) = \\frac{1}{N} \\|y - Xw\\|^2',
    code: `# Multi-feature Linear Regression in Scikit-Learn
from sklearn.linear_model import LinearRegression
import numpy as np

# Features: [Square Footage, Bedrooms, Age of Home]
X = np.array([
    [1500, 3, 10],
    [2200, 4, 5],
    [1200, 2, 25],
    [1800, 3, 15]
])
# Target: Price in thousands
y = np.array([320, 480, 240, 380])

reg = LinearRegression()
reg.fit(X, y)

print("Intercept (b):", round(reg.intercept_, 2))
print("Feature Coefficients (w1, w2, w3):", np.round(reg.coef_, 4))`,
    codeLanguage: 'python',
    expectedOutput: `Intercept (b): -3.33
Feature Coefficients (w1, w2, w3): [ 0.2074  8.8889 -1.4815]`,
    practiceQuestion: {
      question: 'If the coefficient for "Bedrooms" is +8.88, how does adding 1 bedroom affect the estimated price (in thousands)?',
      hint: 'Interpret the slope coefficient.',
      solution: 'Holding other features constant, each additional bedroom is associated with an estimated $8.88k increase in price.'
    },
    tags: ['linear-regression', 'ols', 'coefficients', 'interpretability']
  },
  {
    id: 'ml-09',
    subjectId: 'machine-learning',
    title: '9. Logistic Regression',
    order: 9,
    explanation:
      'Despite its name, Logistic Regression is a classification algorithm. It maps linear combinations of features through the Sigmoid (logistic) function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ to produce calibrated probabilities between 0 and 1.',
    keyPoints: [
      'Transforms real-valued score $z = w^T x + b$ into probability $P(y=1|x) \\in (0, 1)$.',
      'Loss function: Binary Cross-Entropy (Log Loss), optimized via gradient descent.',
      'Default classification decision threshold is $0.50$ (can be adjusted for precision/recall tradeoffs).',
      'Odds Ratio: $e^{w_j}$ measures how the odds of the outcome change per unit increase in $x_j$.'
    ],
    formula: 'P(y=1|x) = \\sigma(w^T x + b) = \\frac{1}{1 + e^{-(w^T x + b)}}',
    code: `# Logistic Regression training and probability output
from sklearn.linear_model import LogisticRegression
import numpy as np

# Features: [Exam Prep Hours, Practice Exams Taken]
X = np.array([[2, 1], [4, 2], [5, 3], [8, 5], [10, 6]])
y = np.array([0, 0, 1, 1, 1]) # 0 = Fail, 1 = Pass

model = LogisticRegression()
model.fit(X, y)

test_student = np.array([[3, 2]])
prob_pass = model.predict_proba(test_student)[0, 1]
pred_label = model.predict(test_student)[0]

print(f"Predicted Class: {pred_label} (Pass)")
print(f"Calculated Probability of Passing: {prob_pass * 100:.1f}%")`,
    codeLanguage: 'python',
    expectedOutput: `Predicted Class: 0 (Pass)
Calculated Probability of Passing: 38.6%`,
    practiceQuestion: {
      question: 'What is the value of the Sigmoid function when z = 0?',
      hint: '1 / (1 + e^0)',
      solution: '1 / (1 + 1) = **0.50 (50%)**.'
    },
    tags: ['logistic-regression', 'sigmoid', 'log-loss', 'probabilities']
  },
  {
    id: 'ml-10',
    subjectId: 'machine-learning',
    title: '10. Decision Trees',
    order: 10,
    explanation:
      'Decision Trees partition feature space recursively into hierarchical rectangular regions using binary if-then decision rules. Splits are chosen to maximize information gain (minimizing Gini Impurity or Entropy for classification, or Variance for regression).',
    keyPoints: [
      'Non-parametric: Makes no assumptions about data distribution or linearity.',
      'Split criteria: Gini Impurity ($1 - \\sum p_i^2$) or Entropy ($-\\sum p_i \\log_2 p_i$).',
      'Highly interpretable and handles both numerical and categorical features.',
      'Vulnerable to high variance and overfitting if depth is unconstrained (pruning required).'
    ],
    formula: '\\text{Gini Impurity} = 1 - \\sum_{i=1}^{C} p_i^2 \\qquad \\text{Entropy} = -\\sum_{i=1}^{C} p_i \\log_2 p_i',
    code: `# Decision Tree Classifier in Scikit-Learn
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target

dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X, y)

tree_rules = export_text(dt, feature_names=iris.feature_names)
print("--- Learned Decision Rules ---")
print(tree_rules[:280] + "...")`,
    codeLanguage: 'python',
    expectedOutput: `--- Learned Decision Rules ---
|--- petal length (cm) <= 2.45
|   |--- class: 0
|--- petal length (cm) >  2.45
|   |--- petal width (cm) <= 1.75
|   |   |--- class: 1
|   |--- petal width (cm) >  1.75
|   |   |--- class: 2
...`,
    practiceQuestion: {
      question: 'What is the Gini impurity of a pure node where all 50 samples belong to class A?',
      hint: 'p_A = 1.0. Gini = 1 - (1.0)^2.',
      solution: 'Gini = 1 - (1.0)^2 = **0.0 (Pure Node)**.'
    },
    tags: ['decision-tree', 'gini', 'entropy', 'information-gain']
  },
  {
    id: 'ml-11',
    subjectId: 'machine-learning',
    title: '11. Random Forest & Bagging Ensembles',
    order: 11,
    explanation:
      'Random Forest is an ensemble learning method that constructs a multitude of uncorrelated Decision Trees during training. It combines Bootstrap Aggregation (Bagging) with Random Subspace feature selection to dramatically reduce variance and prevent overfitting.',
    keyPoints: [
      'Bagging: Each tree trains on a random bootstrap sample (with replacement) of training data.',
      'Feature Randomness: Each split considers only a random subset of features (typically $\\sqrt{p}$).',
      'Final prediction is the majority vote (classification) or average (regression) across all trees.',
      'Provides Out-of-Bag (OOB) error estimates and Feature Importance scores.'
    ],
    code: `# Random Forest Feature Importance
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
import numpy as np

data = load_iris()
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(data.data, data.target)

importances = rf.feature_importances_
for name, imp in zip(data.feature_names, importances):
    print(f"Feature: {name:<20} | Importance: {imp:.4f}")`,
    codeLanguage: 'python',
    expectedOutput: `Feature: sepal length (cm)   | Importance: 0.1081
Feature: sepal width (cm)    | Importance: 0.0247
Feature: petal length (cm)   | Importance: 0.4357
Feature: petal width (cm)    | Importance: 0.4315`,
    practiceQuestion: {
      question: 'What are the two random mechanisms that give Random Forest its diversity?',
      hint: 'One for rows (data points) and one for columns (features).',
      solution: '1. Bootstrap sampling of training instances (rows) and 2. Random subset selection of features at each split (columns).'
    },
    tags: ['random-forest', 'bagging', 'ensemble', 'feature-importance']
  },
  {
    id: 'ml-12',
    subjectId: 'machine-learning',
    title: '12. K-Nearest Neighbors (KNN)',
    order: 12,
    explanation:
      'K-Nearest Neighbors is an instance-based, non-parametric "lazy learning" algorithm. To classify a new query point, it calculates the distance to all points in the training dataset and assigns the majority class among the $k$ closest neighbors.',
    keyPoints: [
      'Distance metrics: Euclidean ($L_2$), Manhattan ($L_1$), Minkowski.',
      'Feature Scaling (StandardScaler/MinMaxScaler) is MANDATORY so large features don\'t dominate distances.',
      'Small $k$ leads to high variance / overfitting (sensitive to noise); large $k$ leads to high bias / underfitting.',
      'Computationally expensive at prediction time ($O(N \\cdot d)$).'
    ],
    formula: '\\text{Euclidean Distance: } d(p, q) = \\sqrt{\\sum_{i=1}^{n} (p_i - q_i)^2}',
    code: `# KNN Classifier with Feature Scaling
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import numpy as np

# Training data: [Age, Income]
X = np.array([[22, 25000], [25, 32000], [45, 85000], [50, 95000]])
y = np.array([0, 0, 1, 1])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_scaled, y)

new_customer = scaler.transform([[24, 29000]])
pred = knn.predict(new_customer)[0]
print(f"Predicted class for new customer: {pred} (0=Low Spend, 1=High Spend)")`,
    codeLanguage: 'python',
    expectedOutput: `Predicted class for new customer: 0 (0=Low Spend, 1=High Spend)`,
    practiceQuestion: {
      question: 'Why is feature scaling essential before training a KNN model?',
      hint: 'Think about how distance is computed if one feature is age (20-80) and another is salary ($20k-$100k).',
      solution: 'Without scaling, features with larger numerical magnitudes (like salary) will dominate Euclidean distance calculations, rendering smaller features (like age) irrelevant.'
    },
    tags: ['knn', 'distance-metrics', 'scaling', 'instance-based']
  },
  {
    id: 'ml-13',
    subjectId: 'machine-learning',
    title: '13. K-Means Clustering Algorithm',
    order: 13,
    explanation:
      'K-Means is an iterative unsupervised clustering algorithm that partitions $n$ observations into $k$ predefined clusters. Each point belongs to the cluster with the nearest mean centroid, minimizing within-cluster sum-of-squares (inertia / WCSS).',
    keyPoints: [
      'Step 1: Initialize $k$ centroids randomly (or via K-Means++).',
      'Step 2: Assign each point to the closest centroid.',
      'Step 3: Recompute centroids as the mean of all assigned points.',
      'Step 4: Repeat until centroids stabilize (convergence).',
      'Elbow Method and Silhouette Score determine the optimal number of clusters $k$.'
    ],
    formula: '\\min \\sum_{j=1}^{k} \\sum_{x_i \\in C_j} \\|x_i - \\mu_j\\|^2',
    code: `# K-Means and Inertia calculation
from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])
kmeans = KMeans(n_clusters=2, random_state=0, n_init='auto').fit(X)

print("Cluster Centroids:\\n", kmeans.cluster_centers_)
print("Cluster Labels:", kmeans.labels_)
print(f"Within-Cluster Inertia (WCSS): {kmeans.inertia_:.2f}")`,
    codeLanguage: 'python',
    expectedOutput: `Cluster Centroids:
 [[10.  2.]
 [ 1.  2.]]
Cluster Labels: [1 1 1 0 0 0]
Within-Cluster Inertia (WCSS): 16.00`,
    practiceQuestion: {
      question: 'What technique is commonly used to choose the optimal number of clusters (k) in K-Means?',
      hint: 'Plotting inertia against k produces an "arm" shape.',
      solution: 'The **Elbow Method** (finding the inflection point in the inertia vs. k plot) and the **Silhouette Analysis**.'
    },
    tags: ['kmeans', 'clustering', 'unsupervised', 'inertia']
  },
  {
    id: 'ml-14',
    subjectId: 'machine-learning',
    title: '14. Clustering Concepts & Density-Based Methods',
    order: 14,
    explanation:
      'Beyond partitioning methods like K-Means, clustering includes Hierarchical Clustering (agglomerative tree dendrograms) and Density-Based Clustering (DBSCAN), which can find arbitrary shaped clusters and separate spatial outliers/noise.',
    keyPoints: [
      'Partitioning (K-Means): Assumes spherical, equal-sized clusters.',
      'Hierarchical (Agglomerative): Builds a tree/dendrogram of nested merges.',
      'Density-Based (DBSCAN): Groups dense spatial regions; identifies outliers as noise; does NOT require pre-specifying $k$.',
      'Silhouette Score ranges from -1 (poor grouping) to +1 (dense, well-separated clusters).'
    ],
    code: `# Silhouette Score evaluation across clusterings
from sklearn.metrics import silhouette_score
from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1, 1], [1.5, 2], [2, 1], [8, 8], [9, 10], [10, 8]])

# Compare k=2 vs k=3
score_k2 = silhouette_score(X, KMeans(n_clusters=2, random_state=42, n_init='auto').fit_predict(X))
print(f"Silhouette Score for k=2: {score_k2:.4f} (Close to 1.0 indicates strong separation)")`,
    codeLanguage: 'python',
    expectedOutput: `Silhouette Score for k=2: 0.8115 (Close to 1.0 indicates strong separation)`,
    practiceQuestion: {
      question: 'Why is DBSCAN better than K-Means for discovering clusters that form concentric rings or irregular shapes?',
      hint: 'Think about density vs distance to a center point.',
      solution: 'DBSCAN connects contiguous high-density regions without assuming spherical geometry, allowing it to trace arbitrarily shaped clusters.'
    },
    tags: ['clustering', 'dbscan', 'silhouette-score', 'hierarchical']
  },
  {
    id: 'ml-15',
    subjectId: 'machine-learning',
    title: '15. Features & Feature Engineering',
    order: 15,
    explanation:
      'Features ($X$) are individual measurable properties or independent variables fed into a model. Feature Engineering is the craft of transforming raw domain data into informative mathematical representations that maximize model learning capacity.',
    keyPoints: [
      'Categorical Encoding: One-Hot Encoding (nominal) and Ordinal/Label Encoding (ranked).',
      'Numerical Transformations: Log transform (for skewed distributions), Polynomial features, Binning.',
      'Feature Scaling: Standardisation ($Z = \\frac{x-\\mu}{\\sigma}$) and Min-Max Normalisation ($[0, 1]$).',
      '"Feature engineering is the single most important factor determining ML project success." - Andrew Ng'
    ],
    code: `# One-Hot Encoding and Scaling using Pandas and Scikit-Learn
import pandas as pd
from sklearn.preprocessing import StandardScaler

raw_df = pd.DataFrame({
    "tier": ["Gold", "Silver", "Bronze", "Gold"],
    "income": [120000, 75000, 45000, 110000]
})

# One-hot encode categorical tier
encoded_df = pd.get_dummies(raw_df, columns=["tier"], drop_first=True, dtype=int)
print("Engineered Feature Matrix:")
print(encoded_df)`,
    codeLanguage: 'python',
    expectedOutput: `Engineered Feature Matrix:
   income  tier_Gold  tier_Silver
0  120000          1            0
1   75000          0            1
2   45000          0            0
3  110000          1            0`,
    practiceQuestion: {
      question: 'When should you use One-Hot Encoding instead of Label Encoding?',
      hint: 'Think about whether categories have a natural ranking.',
      solution: 'Use One-Hot Encoding for nominal categories without inherent rank (e.g. Red, Green, Blue) to prevent the model from assuming artificial mathematical order.'
    },
    tags: ['features', 'feature-engineering', 'one-hot-encoding', 'scaling']
  },
  {
    id: 'ml-16',
    subjectId: 'machine-learning',
    title: '16. Labels & Target Variables',
    order: 16,
    explanation:
      'A Label (target variable, $y$) is the true outcome or value we aim to predict. In supervised learning, ground truth labels supervise the training loss optimization process.',
    keyPoints: [
      'Discrete Labels: integers or string classes (e.g., 0/1 for binary, 0/1/2 for multiclass).',
      'Continuous Labels: floating point values in regression.',
      'Class Imbalance occurs when one label dominates (e.g., 99.5% legitimate transactions, 0.5% fraud).',
      'Techniques for handling imbalanced labels: SMOTE oversampling, class weighting, and evaluating PR-AUC instead of raw accuracy.'
    ],
    code: `# Inspecting Class Imbalance in Target Labels
import numpy as np
from collections import Counter

y_labels = np.array([0]*95 + [1]*5) # 95% majority, 5% minority
counts = Counter(y_labels)

print("Class distribution:", dict(counts))
imbalance_ratio = counts[0] / counts[1]
print(f"Imbalance Ratio: {imbalance_ratio}:1 (Heavily Imbalanced)")`,
    codeLanguage: 'python',
    expectedOutput: `Class distribution: {0: 95, 1: 5}
Imbalance Ratio: 19.0:1 (Heavily Imbalanced)`,
    practiceQuestion: {
      question: 'Why is raw accuracy misleading when evaluating an imbalanced dataset with 99% Class 0 and 1% Class 1?',
      hint: 'What happens if the model blindly predicts 0 for everything?',
      solution: 'A dumb model that predicts 0 for all instances achieves 99% accuracy while completely failing to detect any instances of the critical minority Class 1.'
    },
    tags: ['labels', 'targets', 'class-imbalance', 'smote']
  },
  {
    id: 'ml-17',
    subjectId: 'machine-learning',
    title: '17. Training Data',
    order: 17,
    explanation:
      'Training Data is the portion of the labeled dataset provided to the machine learning algorithm to learn weights, parameters, and decision boundaries during the fitting phase.',
    keyPoints: [
      'Typically constitutes 70% to 80% of the total available dataset.',
      'Parameters (weights $w$ and biases $b$) are updated exclusively on training data.',
      'Data leakage occurs when information from outside the training dataset is mistakenly used to train the model.'
    ],
    code: `# Simulated Training Set extraction
import numpy as np

# 1000 sample dataset
X_total = np.random.randn(1000, 10)
y_total = np.random.randint(0, 2, 1000)

train_size = int(0.80 * len(X_total))
X_train, y_train = X_total[:train_size], y_total[:train_size]

print(f"Total dataset: {len(X_total)} rows")
print(f"Training set:  {len(X_train)} rows ({len(X_train)/len(X_total)*100:.0f}%)")`,
    codeLanguage: 'python',
    expectedOutput: `Total dataset: 1000 rows
Training set:  800 rows (80%)`,
    practiceQuestion: {
      question: 'What is data leakage and why must it be prevented during model training?',
      hint: 'Think about test data leaking into training transformations.',
      solution: 'Data leakage happens when information from test/future data accidentally contaminates the training phase, giving an unrealistically optimistic evaluation that fails in real production.'
    },
    tags: ['training-data', 'dataset', 'data-leakage']
  },
  {
    id: 'ml-18',
    subjectId: 'machine-learning',
    title: '18. Testing Data & Out-of-Sample Validation',
    order: 18,
    explanation:
      'Testing Data is a held-out set of data that the model has NEVER encountered during training. It provides an unbiased evaluation of how well the trained model generalizes to new, real-world inputs.',
    keyPoints: [
      'Strict Isolation: The test set must remain untouched until final model evaluation.',
      'Never fit scalers or imputers on the test set; transform test data using the parameters learned from the training set.',
      'Validation Set: An intermediate split used during development for hyperparameter tuning and model selection.'
    ],
    code: `# Demonstrating proper transformation order without leakage
from sklearn.preprocessing import StandardScaler
import numpy as np

X_train_raw = np.array([[10.0], [20.0], [30.0]])
X_test_raw = np.array([[15.0], [25.0]])

# FIT on training only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_raw)

# TRANSFORM test set using training mean and std
X_test_scaled = scaler.transform(X_test_raw)

print("Learned Training Mean:", scaler.mean_[0])
print("Scaled Test Set:\\n", X_test_scaled)`,
    codeLanguage: 'python',
    expectedOutput: `Learned Training Mean: 20.0
Scaled Test Set:
 [[-0.61237244]
 [ 0.61237244]]`,
    practiceQuestion: {
      question: 'Why should you NEVER call `fit()` or `fit_transform()` on the test dataset?',
      hint: 'It leaks test distribution statistics into the scaler.',
      solution: 'Calling `fit()` on test data leaks test statistics (mean, variance) into your preprocessing pipeline, causing data leakage.'
    },
    tags: ['testing-data', 'validation', 'generalization']
  },
  {
    id: 'ml-19',
    subjectId: 'machine-learning',
    title: '19. Train/Test Split & K-Fold Cross-Validation',
    order: 19,
    explanation:
      'Partitioning data into training and testing sets prevents memorization. **K-Fold Cross-Validation** partitions data into $K$ equal folds, iteratively training on $K-1$ folds and validating on the remaining fold to generate robust, variance-reduced performance estimates.',
    keyPoints: [
      'Standard split: 80% Train, 20% Test (or 70/15/15 Train/Val/Test).',
      '`stratify=y` preserves original class proportions across both splits.',
      'K-Fold Cross-Validation (typically $K=5$ or $K=10$) maximizes data utility for smaller datasets.',
      '`cross_val_score()` provides the mean score and standard deviation across folds.'
    ],
    code: `# Stratified Train-Test Split and Cross-Validation
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
import numpy as np

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.20, random_state=42, stratify=iris.target
)

model = LogisticRegression(max_iter=200)
scores = cross_val_score(model, X_train, y_train, cv=5)

print(f"5-Fold CV Scores: {np.round(scores, 3)}")
print(f"Mean CV Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")`,
    codeLanguage: 'python',
    expectedOutput: `5-Fold CV Scores: [0.958 0.958 1.    0.958 0.958]
Mean CV Accuracy: 0.967 (+/- 0.017)`,
    practiceQuestion: {
      question: 'What does the `stratify=y` parameter in `train_test_split` ensure?',
      hint: 'Think about keeping percentage of classes identical.',
      solution: 'It ensures that the train and test subsets have the exact same proportion of target class labels as the original complete dataset.'
    },
    tags: ['train-test-split', 'cross-validation', 'k-fold', 'stratified']
  },
  {
    id: 'ml-20',
    subjectId: 'machine-learning',
    title: '20. Overfitting (High Variance)',
    order: 20,
    explanation:
      'Overfitting occurs when a machine learning model learns the training data "too well," memorizing random noise and sample idiosyncrasies rather than the underlying general pattern. As a result, the model achieves near-perfect training accuracy but performs poorly on unseen test data.',
    keyPoints: [
      'Symptom: Low Training Error + High Testing Error.',
      'Causes: Model too complex (e.g. unconstrained tree depth), noisy data, small training set relative to feature count.',
      'Remedies: Regularization (L1/L2), reducing model depth/complexity, early stopping, dropout (in neural nets), gathering more data.'
    ],
    code: `# Overfitting Demonstration: Unconstrained Decision Tree
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=200, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Unconstrained tree overfits to noise
overfit_tree = DecisionTreeClassifier(max_depth=None, random_state=42)
overfit_tree.fit(X_train, y_train)

print(f"Train Accuracy: {overfit_tree.score(X_train, y_train)*100:.1f}%")
print(f"Test Accuracy:  {overfit_tree.score(X_test, y_test)*100:.1f}%  (Notice the gap!)")`,
    codeLanguage: 'python',
    expectedOutput: `Train Accuracy: 100.0%
Test Accuracy:  78.3%  (Notice the gap!)`,
    practiceQuestion: {
      question: 'If your model has 99.8% training accuracy but 68.5% testing accuracy, what issue is present and how can you address it?',
      hint: 'High variance / memorization.',
      solution: 'The model is **Overfitting**. Remedies include adding regularization (L1/L2), pruning/limiting tree depth, using ensemble methods like Random Forest, and cross-validation.'
    },
    tags: ['overfitting', 'high-variance', 'regularization', 'generalization']
  },
  {
    id: 'ml-21',
    subjectId: 'machine-learning',
    title: '21. Underfitting (High Bias)',
    order: 21,
    explanation:
      'Underfitting occurs when a model is too simple to capture the underlying structure and relationships in the data. The model performs poorly on BOTH the training data and unseen testing data.',
    keyPoints: [
      'Symptom: High Training Error + High Testing Error.',
      'Causes: Model too simplistic (e.g. trying to fit a straight line to quadratic/nonlinear data), overly aggressive regularization, missing crucial features.',
      'Remedies: Increase model complexity (higher capacity algorithms, deeper trees), engineer more domain features, reduce regularization penalties.'
    ],
    code: `# Underfitting demonstration: Linear model on nonlinear data
from sklearn.linear_model import LinearRegression
import numpy as np

# Nonlinear quadratic true relationship: y = x^2
X = np.linspace(-3, 3, 50).reshape(-1, 1)
y = (X[:, 0] ** 2) + np.random.normal(0, 0.5, size=50)

linear_model = LinearRegression().fit(X, y)
r2_score = linear_model.score(X, y)

print(f"Linear Fit on Quadratic Data R²: {r2_score:.3f} (Poor fit due to underfitting)")`,
    codeLanguage: 'python',
    expectedOutput: `Linear Fit on Quadratic Data R²: 0.008 (Poor fit due to underfitting)`,
    practiceQuestion: {
      question: 'What is the primary difference between Underfitting and Overfitting in terms of training error?',
      hint: 'Compare training errors.',
      solution: 'Underfitting has high error on both training and test data; Overfitting has extremely low error on training data but high error on test data.'
    },
    tags: ['underfitting', 'high-bias', 'model-complexity']
  },
  {
    id: 'ml-22',
    subjectId: 'machine-learning',
    title: '22. Model Evaluation & Confusion Matrix',
    order: 22,
    explanation:
      'A Confusion Matrix is a 2x2 (or NxN) contingency table that cross-tabulates actual ground truth classes against model predicted classes. It lays the mathematical foundation for Accuracy, Precision, Recall, Specificity, and F1 Score.',
    keyPoints: [
      'True Positives (TP): Correctly predicted positive instances.',
      'True Negatives (TN): Correctly predicted negative instances.',
      'False Positives (FP, Type I error): Negative instances mistakenly flagged as positive.',
      'False Negatives (FN, Type II error): Positive instances mistakenly flagged as negative.'
    ],
    code: `# Confusion Matrix display with Scikit-Learn
from sklearn.metrics import confusion_matrix
import numpy as np

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

cm = confusion_matrix(y_true, y_pred)
tn, fp, fn, tp = cm.ravel()

print("Confusion Matrix:")
print(f"[[TN={tn}, FP={fp}],")
print(f" [FN={fn}, TP={tp}]]")`,
    codeLanguage: 'python',
    expectedOutput: `Confusion Matrix:
[[TN=4, FP=1],
 [FN=1, TP=4]]`,
    practiceQuestion: {
      question: 'In a medical cancer detection test, which error is far more dangerous: a False Positive or a False Negative?',
      hint: 'What happens if a sick patient is told they are healthy?',
      solution: 'A **False Negative** (Type II error) is far more dangerous because a sick patient with cancer is incorrectly told they are healthy and misses life-saving treatment.'
    },
    tags: ['confusion-matrix', 'tp-tn-fp-fn', 'evaluation']
  },
  {
    id: 'ml-23',
    subjectId: 'machine-learning',
    title: '23. Accuracy Metric',
    order: 23,
    explanation:
      'Accuracy measures the ratio of correct predictions (both True Positives and True Negatives) to the total number of input samples. While intuitive, it is only suitable for balanced datasets.',
    keyPoints: [
      'Formula: $\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}$.',
      'Effective when target classes are approximately balanced (50/50).',
      'Dangerous and misleading on skewed datasets (e.g. 99% accuracy by predicting all negatives in fraud).'
    ],
    formula: '\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}',
    code: `# Accuracy calculation
from sklearn.metrics import accuracy_score

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

acc = accuracy_score(y_true, y_pred)
print(f"Accuracy Score: {acc * 100:.1f}%")`,
    codeLanguage: 'python',
    expectedOutput: `Accuracy Score: 80.0%`,
    practiceQuestion: {
      question: 'If TP=40, TN=50, FP=5, FN=5, what is the accuracy?',
      hint: '(40 + 50) / (40 + 50 + 5 + 5)',
      solution: '90 / 100 = **0.90 (90%)**.'
    },
    tags: ['accuracy', 'metrics', 'classification-evaluation']
  },
  {
    id: 'ml-24',
    subjectId: 'machine-learning',
    title: '24. Precision Metric',
    order: 24,
    explanation:
      'Precision (Positive Predictive Value) measures the fraction of positive predictions that are actually correct: $\\frac{TP}{TP + FP}$. Precision is the primary metric to optimize when the cost of False Positives is high (e.g., spam filtering or video recommendation).',
    keyPoints: [
      'Answers: "Out of all instances predicted as positive, how many were actually positive?"',
      'Crucial when False Positives have severe consequences (e.g., flagging important client emails as spam).',
      'Can be increased by raising the decision threshold (e.g. to 0.80).'
    ],
    formula: '\\text{Precision} = \\frac{TP}{TP + FP}',
    code: `# Precision calculation
from sklearn.metrics import precision_score

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

prec = precision_score(y_true, y_pred)
print(f"Precision: {prec:.3f} (4 TP / (4 TP + 1 FP))")`,
    codeLanguage: 'python',
    expectedOutput: `Precision: 0.800 (4 TP / (4 TP + 1 FP))`,
    practiceQuestion: {
      question: 'If a model flags 20 transactions as fraudulent, and 16 of them are indeed fraudulent while 4 are false alarms, what is the precision?',
      hint: 'TP / (TP + FP) = 16 / 20.',
      solution: '16 / 20 = **0.80 (80%)**.'
    },
    tags: ['precision', 'false-positives', 'positive-predictive-value']
  },
  {
    id: 'ml-25',
    subjectId: 'machine-learning',
    title: '25. Recall (Sensitivity / True Positive Rate)',
    order: 25,
    explanation:
      'Recall (Sensitivity) measures the fraction of actual positive instances that were successfully identified by the model: $\\frac{TP}{TP + FN}$. Recall is the primary metric to optimize when the cost of False Negatives is critical (e.g., medical diagnosis, fraud detection).',
    keyPoints: [
      'Answers: "Out of all actual positive cases in reality, how many did the model find?"',
      'Crucial when missing a positive is catastrophic (e.g., contagious disease detection).',
      'Can be increased by lowering the decision threshold (e.g. to 0.20).'
    ],
    formula: '\\text{Recall} = \\frac{TP}{TP + FN}',
    code: `# Recall calculation
from sklearn.metrics import recall_score

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

rec = recall_score(y_true, y_pred)
print(f"Recall: {rec:.3f} (4 TP / (4 TP + 1 FN))")`,
    codeLanguage: 'python',
    expectedOutput: `Recall: 0.800 (4 TP / (4 TP + 1 FN))`,
    practiceQuestion: {
      question: 'If there are 50 patients with a rare condition, and an AI model identifies 45 of them, what is the model\'s recall?',
      hint: '45 / 50',
      solution: '45 / 50 = **0.90 (90%)**.'
    },
    tags: ['recall', 'sensitivity', 'false-negatives']
  },
  {
    id: 'ml-26',
    subjectId: 'machine-learning',
    title: '26. F1 Score & Precision-Recall Tradeoff',
    order: 26,
    explanation:
      'The F1 Score is the harmonic mean of Precision and Recall. It provides a balanced single metric when there is an uneven class distribution and you need a balance between false positives and false negatives.',
    keyPoints: [
      'Harmonic mean heavily penalizes extreme imbalances between precision and recall.',
      'Ranges from 0.0 (worst) to 1.0 (perfect precision and recall).',
      'Precision-Recall Tradeoff: Lowering decision threshold increases Recall but decreases Precision; raising threshold increases Precision but decreases Recall.'
    ],
    formula: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\cdot TP}{2 \\cdot TP + FP + FN}',
    code: `# Full classification report with F1 Score
from sklearn.metrics import classification_report

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

print("--- Comprehensive Evaluation Report ---")
print(classification_report(y_true, y_pred, target_names=["Negative", "Positive"]))`,
    codeLanguage: 'python',
    expectedOutput: `--- Comprehensive Evaluation Report ---
              precision    recall  f1-score   support

    Negative       0.80      0.80      0.80         5
    Positive       0.80      0.80      0.80         5

    accuracy                           0.80        10
   macro avg       0.80      0.80      0.80        10
weighted avg       0.80      0.80      0.80        10`,
    practiceQuestion: {
      question: 'If a model has Precision = 1.0 and Recall = 0.50, what is its F1 score?',
      hint: '2 * (1.0 * 0.5) / (1.0 + 0.5) = 1.0 / 1.5',
      solution: '2 * (0.5) / (1.5) = 1.0 / 1.5 ≈ **0.667 (66.7%)**.'
    },
    tags: ['f1-score', 'harmonic-mean', 'tradeoff', 'metrics']
  }
];
