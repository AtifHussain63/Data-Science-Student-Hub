import { Topic } from '../../types';

export const mathematicsTopics: Topic[] = [
  {
    id: 'math-01',
    subjectId: 'mathematics',
    title: '1. Algebra Basics for Data Science',
    order: 1,
    explanation:
      'Algebra provides the symbolic language for formulating data science algorithms, cost functions, loss equations, and data transformations. Solving systems of linear equations underlies regression modeling, neural network forward passes, and optimization.',
    keyPoints: [
      'Variables, constants, coefficients, and algebraic equations.',
      'Exponent rules: $x^a \\cdot x^b = x^{a+b}$, $(x^a)^b = x^{ab}$, $x^{-1} = \\frac{1}{x}$.',
      'Logarithm properties: $\\log(ab) = \\log(a) + \\log(b)$, $\\log(a/b) = \\log(a) - \\log(b)$, $\\log(a^k) = k \\log(a)$.',
      'Summation notation $\\sum$ and Product notation $\\prod$ are ubiquitous in ML loss definitions.'
    ],
    formula: '\\log_b(xy) = \\log_b(x) + \\log_b(y) \\qquad \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
    code: `# Solving linear equation 3x + 5 = 20 using Python
# x = (20 - 5) / 3
a, b, c = 3, 5, 20
x = (c - b) / a
print(f"Solution to 3x + 5 = 20 is x = {x:.2f}")

# Logarithm property verification
import math
print("log(10 * 100) =", math.log10(10 * 100))
print("log(10) + log(100) =", math.log10(10) + math.log10(100))`,
    codeLanguage: 'python',
    expectedOutput: `Solution to 3x + 5 = 20 is x = 5.00
log(10 * 100) = 3.0
log(10) + log(100) = 3.0`,
    practiceQuestion: {
      question: 'Simplify the algebraic expression: log(e^(w * x + b)).',
      hint: 'Natural log (ln) and exponential function e^z are inverse functions.',
      solution: '`w * x + b` (since ln(e^z) = z).'
    },
    tags: ['algebra', 'logarithms', 'exponents', 'foundations']
  },
  {
    id: 'math-02',
    subjectId: 'mathematics',
    title: '2. Mathematical Functions & Activation Curves',
    order: 2,
    explanation:
      'A function $f: X \\to Y$ maps each input value $x$ in its domain to a unique output $y$ in its codomain. In Machine Learning, activation functions introduce non-linearity, enabling neural networks to learn arbitrary complex decision boundaries.',
    keyPoints: [
      'Linear Function: $f(x) = mx + b$.',
      'Sigmoid (Logistic): $\\sigma(x) = \\frac{1}{1 + e^{-x}}$, maps $(-\\infty, \\infty) \\to (0, 1)$.',
      'ReLU (Rectified Linear Unit): $f(x) = \\max(0, x)$, dominant in deep neural networks.',
      'Softmax: maps a vector of real numbers to a normalized probability distribution summing to 1.'
    ],
    formula: '\\sigma(z) = \\frac{1}{1 + e^{-z}} \\qquad \\text{ReLU}(z) = \\max(0, z) \\qquad \\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}',
    code: `# Implementing ML Activation Functions in Python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def relu(z):
    return np.maximum(0, z)

def softmax(z):
    exp_z = np.exp(z - np.max(z)) # numerically stable
    return exp_z / exp_z.sum()

z_values = np.array([-2.0, 0.0, 3.0])
print("Inputs:        ", z_values)
print("Sigmoid output:", np.round(sigmoid(z_values), 3))
print("ReLU output:   ", relu(z_values))
print("Softmax output:", np.round(softmax(z_values), 3), f"(Sum = {softmax(z_values).sum():.1f})")`,
    codeLanguage: 'python',
    expectedOutput: `Inputs:         [-2.  0.  3.]
Sigmoid output: [0.119 0.5   0.953]
ReLU output:    [0. 0. 3.]
Softmax output: [0.006 0.045 0.949] (Sum = 1.0)`,
    practiceQuestion: {
      question: 'What is the output of the ReLU activation function for an input value of -4.5?',
      hint: 'ReLU(z) = max(0, z).',
      solution: 'max(0, -4.5) = **0.0**.'
    },
    tags: ['functions', 'activation-functions', 'sigmoid', 'relu', 'softmax']
  },
  {
    id: 'math-03',
    subjectId: 'mathematics',
    title: '3. Matrices & Matrix Algebra',
    order: 3,
    explanation:
      'A Matrix is a rectangular 2D grid of numbers arranged in rows and columns. In Data Science, datasets are represented as matrices (rows = samples $n$, columns = features $p$), and neural network layers are computed as matrix multiplications.',
    keyPoints: [
      'Matrix Dimension: $m \\times n$ ($m$ rows, $n$ columns).',
      'Matrix Multiplication $C = AB$: Number of columns in $A$ MUST equal number of rows in $B$ ($m \\times k$ times $k \\times n$ yields $m \\times n$).',
      'Identity Matrix $I$: Square diagonal matrix with 1s on diagonal, where $AI = IA = A$.',
      'Transpose $A^T$: Swaps rows and columns ($A^T_{ij} = A_{ji}$).'
    ],
    formula: 'C_{ij} = \\sum_{k=1}^{p} A_{ik} B_{kj} \\qquad (AB)^T = B^T A^T',
    code: `# Matrix Multiplication and Transpose in NumPy
import numpy as np

# Feature Matrix X (3 samples, 2 features)
X = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

# Weight Matrix W (2 features, 1 output neuron)
W = np.array([
    [0.5],
    [-0.2]
])

# Matrix multiplication X @ W
output = np.matmul(X, W) # or X @ W

print("Matrix X (3x2):\\n", X)
print("Weight W (2x1):\\n", W)
print("Output X @ W (3x1):\\n", output)
print("X Transpose (2x3):\\n", X.T)`,
    codeLanguage: 'python',
    expectedOutput: `Matrix X (3x2):
 [[1 2]
 [3 4]
 [5 6]]
Weight W (2x1):
 [[ 0.5]
 [-0.2]]
Output X @ W (3x1):
 [[0.1]
 [0.7]
 [1.3]]
X Transpose (2x3):
 [[1 3 5]
 [2 4 6]]`,
    practiceQuestion: {
      question: 'If Matrix A has shape (50, 10) and Matrix B has shape (10, 4), what is the shape of the product A @ B?',
      hint: '(m x k) @ (k x n) = (m x n)',
      solution: 'The resulting matrix has shape **(50, 4)**.'
    },
    tags: ['matrices', 'matrix-multiplication', 'transpose', 'linear-algebra']
  },
  {
    id: 'math-04',
    subjectId: 'mathematics',
    title: '4. Vectors, Dot Products & Cosine Similarity',
    order: 4,
    explanation:
      'A Vector is an ordered 1D array of numbers with both magnitude and direction. In Data Science, individual data points, word embeddings, image feature representations, and model weights are vectors in high-dimensional vector spaces $\\mathbb{R}^d$.',
    keyPoints: [
      'Magnitude (L2 Norm / Euclidean length): $\\|v\\| = \\sqrt{v_1^2 + v_2^2 + \\dots + v_d^2}$.',
      'Dot Product: $u \\cdot v = \\sum u_i v_i = \\|u\\| \\|v\\| \\cos(\\theta)$. Measures alignment.',
      'Orthogonal Vectors: $u \\cdot v = 0$ (perpendicular, $90^\\circ$ angle).',
      'Cosine Similarity: $\\frac{u \\cdot v}{\\|u\\| \\|v\\|}$, standard metric for semantic similarity in LLMs and RAG.'
    ],
    formula: '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^{d} u_i v_i \\qquad \\text{Cosine Similarity} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}',
    code: `# Vector Dot Product and Cosine Similarity in Python
import numpy as np

# Two semantic word embedding vectors
vec_apple = np.array([0.9, 0.8, 0.1])
vec_banana = np.array([0.85, 0.75, 0.15])
vec_car = np.array([0.1, 0.2, 0.95])

def cosine_similarity(a, b):
    dot_prod = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_prod / (norm_a * norm_b)

print(f"Similarity (Apple, Banana): {cosine_similarity(vec_apple, vec_banana):.4f} (High semantic match)")
print(f"Similarity (Apple, Car):    {cosine_similarity(vec_apple, vec_car):.4f} (Unrelated concepts)")`,
    codeLanguage: 'python',
    expectedOutput: `Similarity (Apple, Banana): 0.9984 (High semantic match)
Similarity (Apple, Car):    0.2818 (Unrelated concepts)`,
    practiceQuestion: {
      question: 'What is the dot product of orthogonal (perpendicular) vectors?',
      hint: 'cos(90 degrees) = 0.',
      solution: 'The dot product is **0**.'
    },
    tags: ['vectors', 'dot-product', 'cosine-similarity', 'embeddings']
  },
  {
    id: 'math-05',
    subjectId: 'mathematics',
    title: '5. Probability Basics & Expected Value',
    order: 5,
    explanation:
      'Probability models randomness and quantify uncertainty. Expected Value $E[X]$ is the long-term weighted average outcome of a random variable, while Variance measures the expected squared deviation from the mean.',
    keyPoints: [
      'Discrete Random Variable: takes countable values with Probability Mass Function (PMF).',
      'Continuous Random Variable: takes values across continuous intervals with Probability Density Function (PDF).',
      'Expected Value: $E[X] = \\sum x_i P(X = x_i)$ (discrete) or $\\int x f(x) dx$ (continuous).',
      'Linearity of Expectation: $E[aX + bY] = aE[X] + bE[Y]$ always holds, even if variables are dependent.'
    ],
    formula: 'E[X] = \\sum_{i} x_i P(x_i) \\qquad \\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2',
    code: `# Expected Value and Variance of a Fair 6-sided Die
import numpy as np

outcomes = np.array([1, 2, 3, 4, 5, 6])
probabilities = np.array([1/6] * 6)

expected_val = np.sum(outcomes * probabilities)
expected_val_sq = np.sum((outcomes ** 2) * probabilities)
variance = expected_val_sq - (expected_val ** 2)

print(f"Expected Value E[X]: {expected_val:.2f}")
print(f"Theoretical Variance: {variance:.3f}")`,
    codeLanguage: 'python',
    expectedOutput: `Expected Value E[X]: 3.50
Theoretical Variance: 2.917`,
    practiceQuestion: {
      question: 'What is the expected value of rolling a fair 6-sided die?',
      hint: '(1+2+3+4+5+6)/6',
      solution: '21 / 6 = **3.5**.'
    },
    tags: ['probability', 'expected-value', 'variance', 'random-variables']
  },
  {
    id: 'math-06',
    subjectId: 'mathematics',
    title: '6. Calculus Basics & Optimization',
    order: 6,
    explanation:
      'Calculus is the mathematical study of continuous change. In Data Science and Machine Learning, Differential Calculus provides the mathematical engine to find minima of loss functions (optimization) and train algorithms.',
    keyPoints: [
      'Limits: $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ defines instantaneous rate of change.',
      'Optimization: Setting the first derivative to zero ($f\'(x) = 0$) finds stationary points (candidate local minima/maxima).',
      'Second Derivative ($f\'\'(x)$): Tests concavity/convexity ($f\'\'(x) > 0 \\implies$ local minimum).',
      'Convex functions have a guaranteed single global minimum, making optimization tractable.'
    ],
    formula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\qquad \\text{Stationary condition: } f\'(x^*) = 0',
    code: `# Finding analytical minimum of parabola f(x) = x^2 - 4x + 7
# f'(x) = 2x - 4 = 0 => x = 2
def f(x):
    return x**2 - 4*x + 7

def df(x):
    return 2*x - 4

# Optimum at df(x) = 0
optimal_x = 4 / 2
min_val = f(optimal_x)

print(f"Global minimum occurs at x = {optimal_x}")
print(f"Minimum value f({optimal_x}) = {min_val}")`,
    codeLanguage: 'python',
    expectedOutput: `Global minimum occurs at x = 2.0
Minimum value f(2.0) = 3.0`,
    practiceQuestion: {
      question: 'What is the derivative of f(x) = 5x^3 - 4x + 9 with respect to x?',
      hint: 'Power rule: d/dx(x^n) = n * x^(n-1).',
      solution: '`15x^2 - 4`.'
    },
    tags: ['calculus', 'optimization', 'minima', 'convexity']
  },
  {
    id: 'math-07',
    subjectId: 'mathematics',
    title: '7. Derivatives, Partial Derivatives & Gradients',
    order: 7,
    explanation:
      'A derivative measures the rate of change of a single-variable function. For multivariable functions $L(w_1, w_2, \\dots, w_p)$, a Partial Derivative $\\frac{\\partial L}{\\partial w_j}$ measures how the output changes when varying only $w_j$ while keeping all other parameters constant. The Gradient vector $\\nabla L$ points in the direction of steepest increase.',
    keyPoints: [
      'Power Rule: $\\frac{d}{dx} x^n = n x^{n-1}$.',
      'Chain Rule: $\\frac{d}{dx} f(g(x)) = f\'(g(x)) \\cdot g\'(x)$ (powers neural net Backpropagation).',
      'Gradient vector: $\\nabla f = \\left[ \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_p} \\right]^T$.',
      'Gradient Descent updates parameters in opposite direction of gradient: $w \\leftarrow w - \\alpha \\nabla L(w)$.'
    ],
    formula: '\\nabla L(\\mathbf{w}) = \\begin{bmatrix} \\frac{\\partial L}{\\partial w_1} \\\\ \\vdots \\\\ \\frac{\\partial L}{\\partial w_p} \\end{bmatrix} \\qquad \\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\nabla L(\\mathbf{w}_t)',
    code: `# Gradient computation for loss function L(w1, w2) = (w1 - 3)^2 + (w2 + 4)^2
import numpy as np

def compute_loss_and_gradients(w1, w2):
    loss = (w1 - 3)**2 + (w2 + 4)**2
    grad_w1 = 2 * (w1 - 3)
    grad_w2 = 2 * (w2 + 4)
    return loss, np.array([grad_w1, grad_w2])

w1, w2 = 0.0, 0.0
loss, grad = compute_loss_and_gradients(w1, w2)

print(f"At (w1=0, w2=0) -> Loss: {loss}")
print(f"Gradient Vector: {grad} (Steepest ascent direction)")`,
    codeLanguage: 'python',
    expectedOutput: `At (w1=0, w2=0) -> Loss: 25.0
Gradient Vector: [-6.  8.] (Steepest ascent direction)`,
    practiceQuestion: {
      question: 'What rule of differential calculus is responsible for calculating gradients backward through neural network layers in Backpropagation?',
      hint: 'It handles composite functions f(g(x)).',
      solution: 'The **Chain Rule**.'
    },
    tags: ['derivatives', 'partial-derivatives', 'gradient-descent', 'backpropagation']
  },
  {
    id: 'math-08',
    subjectId: 'mathematics',
    title: '8. Linear Algebra Basics (Eigenvalues, Inverses, SVD)',
    order: 8,
    explanation:
      'Advanced linear algebra concepts like Matrix Inverses ($A^{-1}$), Determinants, Eigenvalues/Eigenvectors ($A v = \\lambda v$), and Singular Value Decomposition (SVD) power Principal Component Analysis (PCA), recommendation algorithms, and dimensionality reduction.',
    keyPoints: [
      'Matrix Inverse $A^{-1}$: Exists only if $A$ is square and $\\det(A) \\ne 0$ (non-singular).',
      'Eigenvector $v$ and Eigenvalue $\\lambda$: $A v = \\lambda v$ (transformation only scales the vector without changing its direction).',
      'Singular Value Decomposition (SVD): Factorizes any matrix $A = U \\Sigma V^T$.',
      'Principal Component Analysis (PCA) computes eigenvectors of the data covariance matrix to capture directions of maximum variance.'
    ],
    formula: 'A \\mathbf{v} = \\lambda \\mathbf{v} \\qquad A = U \\Sigma V^T \\qquad A^{-1} A = I',
    code: `# Eigenvalue and Eigenvector decomposition in NumPy
import numpy as np

# Symmetric Covariance Matrix
cov_matrix = np.array([
    [3.0, 1.0],
    [1.0, 3.0]
])

eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

print("Matrix:\\n", cov_matrix)
print("Eigenvalues (Variance captured):", eigenvalues)
print("Eigenvectors (Principal directions):\\n", np.round(eigenvectors, 4))`,
    codeLanguage: 'python',
    expectedOutput: `Matrix:
 [[3. 1.]
 [1. 3.]]
Eigenvalues (Variance captured): [2. 4.]
Eigenvectors (Principal directions):
 [[-0.7071  0.7071]
 [ 0.7071  0.7071]]`,
    practiceQuestion: {
      question: 'What does the eigenvector with the largest eigenvalue represent in Principal Component Analysis (PCA)?',
      hint: 'Think about variance direction.',
      solution: 'It represents the First Principal Component—the direction in feature space along which data points exhibit the maximum variance.'
    },
    tags: ['eigenvalues', 'eigenvectors', 'svd', 'pca', 'inverses']
  }
];
