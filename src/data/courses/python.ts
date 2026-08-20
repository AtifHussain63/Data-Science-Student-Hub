import { Topic } from '../../types';

export const pythonTopics: Topic[] = [
  {
    id: 'py-01',
    subjectId: 'python',
    title: '1. Introduction to Python',
    order: 1,
    explanation:
      'Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum. It is renowned for its readable syntax, extensive standard libraries, and massive ecosystem for Data Science and Machine Learning.',
    keyPoints: [
      'Interpreted language: executes code line-by-line without prior compilation.',
      'Dynamically typed: variable types are inferred automatically at runtime.',
      'Massive ecosystem: NumPy, Pandas, Scikit-Learn, TensorFlow, PyTorch.',
      'Cross-platform: runs seamlessly on Linux, macOS, and Windows.'
    ],
    code: `# First Python program for Data Science
student_name = "Alex"
data_science_role = "Data Analyst"
years_of_experience = 2

print(f"Hello, my name is {student_name}!")
print(f"I am preparing to become a {data_science_role} with {years_of_experience} years of practical focus.")`,
    codeLanguage: 'python',
    expectedOutput: `Hello, my name is Alex!
I am preparing to become a Data Analyst with 2 years of practical focus.`,
    practiceQuestion: {
      question: 'Write a Python statement that stores your university name in a variable `univ` and prints "Studying Data Science at [univ]".',
      hint: 'Use an f-string: f"Studying Data Science at {univ}"',
      solution: `univ = "State University"
print(f"Studying Data Science at {univ}")`
    },
    tags: ['basics', 'intro', 'syntax']
  },
  {
    id: 'py-02',
    subjectId: 'python',
    title: '2. Variables & Memory Reference',
    order: 2,
    explanation:
      'In Python, variables are labels (pointers) attached to objects in memory rather than memory boxes holding values. Variable names must start with a letter or underscore and are case-sensitive.',
    keyPoints: [
      'Variables do not require explicit declaration of data types.',
      'Assignment operator (=) binds a variable name to an object.',
      'Use descriptive snake_case naming conventions in Data Science (e.g., train_loss, feature_matrix).',
      'id() function returns the unique identity/memory address of an object.'
    ],
    code: `# Variable assignment and dynamic re-assignment
samples_count = 1500
print("Initial samples:", samples_count, "Type:", type(samples_count))

# Re-assigning to float
samples_count = 1500.50
print("Updated samples:", samples_count, "Type:", type(samples_count))`,
    codeLanguage: 'python',
    expectedOutput: `Initial samples: 1500 Type: <class 'int'>
Updated samples: 1500.5 Type: <class 'float'>`,
    practiceQuestion: {
      question: 'Assign two variables `learning_rate = 0.01` and `epochs = 50`. Calculate total iterations assuming 10 batches per epoch.',
      hint: 'Multiply epochs by 10.',
      solution: `learning_rate = 0.01
epochs = 50
total_iterations = epochs * 10
print("Total iterations:", total_iterations)`
    },
    tags: ['variables', 'basics']
  },
  {
    id: 'py-03',
    subjectId: 'python',
    title: '3. Data Types & Type Casting',
    order: 3,
    explanation:
      'Python provides built-in primitive types: integers (`int`), floating-point numbers (`float`), strings (`str`), booleans (`bool`), and complex numbers (`complex`). In Data Science, understanding type precision is essential for memory efficiency and accurate statistical computation.',
    keyPoints: [
      'Numeric: int (unlimited precision), float (double precision IEEE 754), complex.',
      'Boolean: True or False (subclass of int, True == 1, False == 0).',
      'Type casting functions: int(), float(), str(), bool().',
      'Check types using type(obj) or isinstance(obj, type).'
    ],
    code: `# Data Types demonstration
batch_size = 64          # int
accuracy_score = 0.9425   # float
model_name = "XGBoost"   # str
is_trained = True         # bool

# Type casting
str_score = str(accuracy_score)
print(f"Model: {model_name} | Accuracy: {str_score} | Trained: {is_trained}")
print(f"Data types: {type(batch_size).__name__}, {type(accuracy_score).__name__}, {type(model_name).__name__}")`,
    codeLanguage: 'python',
    expectedOutput: `Model: XGBoost | Accuracy: 0.9425 | Trained: True
Data types: int, float, str`,
    practiceQuestion: {
      question: 'Convert string "85.75" to a float, multiply it by 2, and cast the final result to an integer.',
      hint: 'Use float("85.75") then int()',
      solution: `raw_val = "85.75"
result = int(float(raw_val) * 2)
print("Result:", result) # Output: 171`
    },
    tags: ['types', 'casting', 'primitives']
  },
  {
    id: 'py-04',
    subjectId: 'python',
    title: '4. Operators & Expressions',
    order: 4,
    explanation:
      'Operators perform computations on operands. Python supports Arithmetic (`+`, `-`, `*`, `/`, `//`, `%`, `**`), Comparison (`==`, `!=`, `<`, `>`, `<=`, `>=`), Logical (`and`, `or`, `not`), Bitwise, and Membership (`in`, `not in`) operators.',
    keyPoints: [
      '`//` performs floor division (integer result), while `/` always produces a float.',
      '`**` is the exponentiation operator (e.g., 2**3 = 8).',
      'Logical operators evaluate expressions with short-circuit evaluation.',
      'Membership `in` checks if an element exists inside a collection.'
    ],
    code: `# Arithmetic & Comparison operators
cost = 1450
discount_pct = 0.15
final_cost = cost * (1 - discount_pct)

# Modulo & Floor division
total_records = 105
batch_size = 10
full_batches = total_records // batch_size
leftover_records = total_records % batch_size

print("Final cost: $" + str(round(final_cost, 2)))
print(f"Full batches: {full_batches}, Leftover samples: {leftover_records}")`,
    codeLanguage: 'python',
    expectedOutput: `Final cost: $1232.50
Full batches: 10, Leftover samples: 5`,
    practiceQuestion: {
      question: 'Write an expression to check if a student score of 78 is between 70 (inclusive) and 90 (exclusive).',
      hint: 'In Python you can chain comparisons: 70 <= score < 90',
      solution: `score = 78
is_valid = 70 <= score < 90
print("Score in range:", is_valid)`
    },
    tags: ['operators', 'logic', 'arithmetic']
  },
  {
    id: 'py-05',
    subjectId: 'python',
    title: '5. Strings & Text Processing',
    order: 5,
    explanation:
      'Strings are immutable sequences of Unicode characters. String manipulation is fundamental for Natural Language Processing (NLP), data cleaning, text parsing, and log analysis in Data Science.',
    keyPoints: [
      'Indexing starts at 0; negative indexing starts from -1 (last character).',
      'Slicing syntax: `string[start:stop:step]`.',
      'Key methods: `.strip()`, `.lower()`, `.upper()`, `.replace()`, `.split()`, `.join()`.',
      'Formatted strings (f-strings) provide concise expression interpolation.'
    ],
    code: `# Text cleaning for NLP preparation
raw_feedback = "  Data Science and Machine Learning are AMAZING!  "
cleaned = raw_feedback.strip().lower()
words = cleaned.replace("!", "").split()

print("Original:", repr(raw_feedback))
print("Cleaned string:", cleaned)
print("Tokenized words:", words)
print("Contains 'science':", "science" in words)`,
    codeLanguage: 'python',
    expectedOutput: `Original: '  Data Science and Machine Learning are AMAZING!  '
Cleaned string: data science and machine learning are amazing!
Tokenized words: ['data', 'science', 'and', 'machine', 'learning', 'are', 'amazing']
Contains 'science': True`,
    practiceQuestion: {
      question: 'Take a string `sensor_log = "ID_1042:TEMP_24.6C:STATUS_OK"` and extract just the temperature value `"24.6C"`.',
      hint: 'Split by ":" and get the second element, then replace "TEMP_" with "" or slice.',
      solution: `sensor_log = "ID_1042:TEMP_24.6C:STATUS_OK"
parts = sensor_log.split(":")
temp = parts[1].replace("TEMP_", "")
print("Extracted temperature:", temp)`
    },
    tags: ['strings', 'nlp', 'text-cleaning']
  },
  {
    id: 'py-06',
    subjectId: 'python',
    title: '6. Lists & List Comprehensions',
    order: 6,
    explanation:
      'A list is an ordered, mutable collection of heterogeneous items. Lists are widely used to store feature vectors, data points, and iterative computations. List comprehensions provide an elegant, fast syntax for creating transformed lists.',
    keyPoints: [
      'Lists are mutable: elements can be modified, appended, inserted, or removed.',
      'Common methods: `.append()`, `.extend()`, `.pop()`, `.sort()`, `.reverse()`.',
      'List comprehension syntax: `[expression for item in iterable if condition]`.',
      'Slicing creates shallow copies of list portions.'
    ],
    code: `# Lists and List Comprehensions
raw_sensor_readings = [12.4, -999.0, 15.2, 18.9, -999.0, 22.1]

# Filter missing sentinel values (-999.0) and convert Celsius to Fahrenheit
valid_readings_f = [
    round((val * 9/5) + 32, 2)
    for val in raw_sensor_readings
    if val != -999.0
]

print("Raw readings:", raw_sensor_readings)
print("Cleaned & converted (F):", valid_readings_f)
print("Max valid temperature:", max(valid_readings_f))`,
    codeLanguage: 'python',
    expectedOutput: `Raw readings: [12.4, -999.0, 15.2, 18.9, -999.0, 22.1]
Cleaned & converted (F): [54.32, 59.36, 66.02, 71.78]
Max valid temperature: 71.78`,
    practiceQuestion: {
      question: 'Given numbers `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, write a list comprehension that squares only the even numbers.',
      hint: 'Use `[n**2 for n in nums if n % 2 == 0]`',
      solution: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [n**2 for n in nums if n % 2 == 0]
print("Even squares:", even_squares) # [4, 16, 36, 64, 100]`
    },
    tags: ['lists', 'comprehensions', 'data-structures']
  },
  {
    id: 'py-07',
    subjectId: 'python',
    title: '7. Tuples & Unpacking',
    order: 7,
    explanation:
      'Tuples are ordered, immutable collections defined with parentheses `( )`. Because they cannot be modified after creation, tuples are memory-efficient, hashable (can be dictionary keys), and ideal for returning multiple values from statistical functions.',
    keyPoints: [
      'Immutable: values cannot be added, deleted, or reassigned.',
      'Support unpacking: `x, y, z = (10, 20, 30)`.',
      'Faster iteration and smaller memory footprint than lists.',
      'Used for coordinate points, database row records, and function multi-returns.'
    ],
    code: `# Function returning multiple statistics as a tuple
def calculate_summary(data):
    n = len(data)
    mean_val = sum(data) / n
    min_val = min(data)
    max_val = max(data)
    return mean_val, min_val, max_val  # Returns a tuple

dataset = [88, 92, 79, 95, 85, 90]
avg, lowest, highest = calculate_summary(dataset)

print(f"Sample Count: {len(dataset)}")
print(f"Average: {avg:.2f} | Range: [{lowest} - {highest}]")`,
    codeLanguage: 'python',
    expectedOutput: `Sample Count: 6
Average: 88.17 | Range: [79 - 95]`,
    practiceQuestion: {
      question: 'Create a tuple of 3 model metrics: ("Accuracy", 0.95, "F1", 0.93). Unpack it into 4 separate variables.',
      hint: 'm1_name, m1_val, m2_name, m2_val = metrics_tuple',
      solution: `metrics = ("Accuracy", 0.95, "F1", 0.93)
m1_name, m1_val, m2_name, m2_val = metrics
print(f"{m1_name}: {m1_val}, {m2_name}: {m2_val}")`
    },
    tags: ['tuples', 'immutability', 'unpacking']
  },
  {
    id: 'py-08',
    subjectId: 'python',
    title: '8. Sets & Mathematical Operations',
    order: 8,
    explanation:
      'A set is an unordered collection of unique, hashable elements defined with curly braces `{ }`. Sets provide O(1) average time complexity for lookups and membership tests, making them crucial for deduplicating datasets and computing mathematical unions, intersections, and differences.',
    keyPoints: [
      'Duplicates are automatically discarded.',
      'Mathematical set operations: Union (`|`), Intersection (`&`), Difference (`-`), Symmetric Difference (`^`).',
      'Fast O(1) membership check using `item in my_set`.',
      'Elements must be immutable (numbers, strings, tuples).'
    ],
    code: `# User feature interaction analysis
web_visitors = {"user_1", "user_2", "user_3", "user_4", "user_5"}
app_users = {"user_3", "user_4", "user_5", "user_6", "user_7"}

# Set operations
cross_platform_users = web_visitors & app_users  # Intersection
all_unique_users = web_visitors | app_users       # Union
web_only_users = web_visitors - app_users         # Difference

print("Cross-platform users (Both):", cross_platform_users)
print("Total unique audience size:", len(all_unique_users))
print("Web-only active users:", web_only_users)`,
    codeLanguage: 'python',
    expectedOutput: `Cross-platform users (Both): {'user_3', 'user_4', 'user_5'}
Total unique audience size: 7
Web-only active users: {'user_1', 'user_2'}`,
    practiceQuestion: {
      question: 'Remove duplicates from list `raw_tags = ["ml", "ai", "python", "ml", "ai", "pandas"]` and find the total unique count.',
      hint: 'Convert to set: `set(raw_tags)` and use `len()`.',
      solution: `raw_tags = ["ml", "ai", "python", "ml", "ai", "pandas"]
unique_tags = set(raw_tags)
print("Unique tags:", unique_tags)
print("Count:", len(unique_tags))`
    },
    tags: ['sets', 'deduplication', 'math-operations']
  },
  {
    id: 'py-09',
    subjectId: 'python',
    title: '9. Dictionaries & Nested Structures',
    order: 9,
    explanation:
      'A dictionary is an ordered collection of key-value pairs. Dictionaries are the Python equivalent of JSON objects, hash tables, or single-record documents, forming the foundational representation for row-oriented data before ingestion into Pandas DataFrames.',
    keyPoints: [
      'Keys must be unique and immutable; values can be of any data type.',
      'Access values safely using `.get(key, default_val)` to avoid KeyError.',
      'Iterate over keys (`.keys()`), values (`.values()`), or pairs (`.items()`).',
      'Dictionary comprehensions: `{k: v for k, v in dict.items()}`.'
    ],
    code: `# Student metadata and performance dictionary
student_record = {
    "id": "DS-2026-88",
    "name": "Sophia Chen",
    "gpa": 3.89,
    "skills": ["Python", "SQL", "Statistics", "PyTorch"],
    "scores": {"quiz_1": 95, "quiz_2": 88, "midterm": 92}
}

# Calculate average score
scores_dict = student_record["scores"]
avg_score = sum(scores_dict.values()) / len(scores_dict)

print(f"Student: {student_record['name']} (GPA: {student_record['gpa']})")
print(f"Top Skills: {', '.join(student_record['skills'])}")
print(f"Average Exam Score: {avg_score:.1f}")`,
    codeLanguage: 'python',
    expectedOutput: `Student: Sophia Chen (GPA: 3.89)
Top Skills: Python, SQL, Statistics, PyTorch
Average Exam Score: 91.7`,
    practiceQuestion: {
      question: 'Given dictionary `word_counts = {"python": 12, "sql": 8, "java": 3}`, create a new dictionary containing only items with count > 5.',
      hint: 'Use a dictionary comprehension: `{k: v for k, v in word_counts.items() if v > 5}`',
      solution: `word_counts = {"python": 12, "sql": 8, "java": 3}
popular = {k: v for k, v in word_counts.items() if v > 5}
print("Popular languages:", popular)`
    },
    tags: ['dictionaries', 'json', 'data-structures']
  },
  {
    id: 'py-10',
    subjectId: 'python',
    title: '10. Conditional Statements (if/elif/else)',
    order: 10,
    explanation:
      'Conditional statements execute different code blocks based on whether specified boolean conditions evaluate to True or False. In Data Science, conditionals are used for threshold classification, data binning, and rule-based decision logic.',
    keyPoints: [
      'Python relies on indentation (4 spaces) to define code blocks.',
      '`elif` stands for else if; evaluated sequentially until a condition is met.',
      'Ternary operator for one-line assignment: `val = a if condition else b`.',
      'Always order conditions from most specific to general.'
    ],
    code: `# Credit Risk Classification based on FICO credit score
def classify_credit_risk(fico_score, annual_income):
    if fico_score >= 750 and annual_income >= 60000:
        tier = "Prime Low Risk"
        interest_rate = 4.5
    elif fico_score >= 670:
        tier = "Near Prime Moderate Risk"
        interest_rate = 7.2
    elif fico_score >= 580:
        tier = "Subprime High Risk"
        interest_rate = 12.8
    else:
        tier = "Deep Subprime Critical Risk"
        interest_rate = 19.5
    
    return tier, interest_rate

tier, rate = classify_credit_risk(720, 75000)
print(f"Risk Assessment: {tier} | Base Interest Rate: {rate}%")`,
    codeLanguage: 'python',
    expectedOutput: `Risk Assessment: Near Prime Moderate Risk | Base Interest Rate: 7.2%`,
    practiceQuestion: {
      question: 'Write a function `evaluate_p_value(p)` that returns "Reject Null Hypothesis" if p < 0.05, else "Fail to Reject".',
      hint: 'Use `if p < 0.05:`',
      solution: `def evaluate_p_value(p):
    return "Reject Null Hypothesis" if p < 0.05 else "Fail to Reject"

print(evaluate_p_value(0.012)) # Reject Null Hypothesis`
    },
    tags: ['conditionals', 'if-else', 'logic']
  },
  {
    id: 'py-11',
    subjectId: 'python',
    title: '11. For Loops & Iteration Tools',
    order: 11,
    explanation:
      'For loops iterate over elements of any sequence or iterable (lists, tuples, ranges, dictionaries). Python provides powerful built-in iterator functions like `enumerate()`, `zip()`, and `range()` for efficient data traversal.',
    keyPoints: [
      '`range(start, stop, step)` generates sequences of integers efficiently.',
      '`enumerate(iterable, start=0)` yields both the index and value.',
      '`zip(iter1, iter2)` pairs elements from multiple iterables simultaneously.',
      'Use `break` to exit early and `continue` to skip to the next iteration.'
    ],
    code: `# Model training epochs simulation with zip and enumerate
features = ["Square_Footage", "Bedrooms", "Bathrooms", "Zip_Code"]
importances = [0.45, 0.22, 0.18, 0.15]

print("--- Feature Importance Ranking ---")
for rank, (feat, imp) in enumerate(zip(features, importances), start=1):
    bar = "█" * int(imp * 25)
    print(f"{rank}. {feat:<16} | {imp:5.2f} | {bar}")`,
    codeLanguage: 'python',
    expectedOutput: `--- Feature Importance Ranking ---
1. Square_Footage   |  0.45 | ███████████
2. Bedrooms         |  0.22 | █████
3. Bathrooms        |  0.18 | ████
4. Zip_Code         |  0.15 | ███`,
    practiceQuestion: {
      question: 'Use `zip()` to combine `names = ["Alice", "Bob"]` and `scores = [85, 92]` into a dictionary.',
      hint: 'Pass `zip(names, scores)` directly to `dict()`.',
      solution: `names = ["Alice", "Bob"]
scores = [85, 92]
score_dict = dict(zip(names, scores))
print(score_dict) # {'Alice': 85, 'Bob': 92}`
    },
    tags: ['loops', 'for-loop', 'enumerate', 'zip']
  },
  {
    id: 'py-12',
    subjectId: 'python',
    title: '12. While Loops & Convergence Logic',
    order: 12,
    explanation:
      'While loops repeat a block of code as long as a boolean condition remains True. In Machine Learning optimization, while loops are frequently used in gradient descent and iterative solvers that continue until the loss change falls below a convergence tolerance (epsilon).',
    keyPoints: [
      'Condition is evaluated before each iteration.',
      'Must ensure variables inside loop are updated to prevent infinite loops.',
      'Used for convergence monitoring in numerical optimization algorithms.',
      '`else` block on a while loop executes if the loop terminates normally without a `break`.'
    ],
    code: `# Simulated Gradient Descent Convergence
weight = 10.0
learning_rate = 0.1
tolerance = 0.001
step = 0
max_steps = 100

print("Starting weight:", weight)
while step < max_steps:
    gradient = 2 * weight  # Derivative of f(w) = w^2
    new_weight = weight - learning_rate * gradient
    
    # Check convergence
    if abs(new_weight - weight) < tolerance:
        print(f"Converged at step {step}! Final weight: {new_weight:.5f}")
        break
    
    weight = new_weight
    step += 1`,
    codeLanguage: 'python',
    expectedOutput: `Starting weight: 10.0
Converged at step 42! Final weight: 0.00494`,
    practiceQuestion: {
      question: 'Write a while loop that doubles a starting balance of $1,000 at 7% annual interest until it reaches $2,000, counting the years.',
      hint: 'Multiply balance by 1.07 in each loop and increment `years`.',
      solution: `balance = 1000.0
years = 0
while balance < 2000:
    balance *= 1.07
    years += 1
print("Doubled in " + str(years) + " years to $" + str(round(balance, 2))) # 11 years`
    },
    tags: ['while-loop', 'convergence', 'algorithms']
  },
  {
    id: 'py-13',
    subjectId: 'python',
    title: '13. Functions, Arguments & Lambda Expressions',
    order: 13,
    explanation:
      'Functions are modular, reusable blocks of code defined with `def`. Python supports positional arguments, keyword arguments, default parameters, variable-length arguments (`*args`, `**kwargs`), and anonymous one-line functions (`lambda`).',
    keyPoints: [
      'Functions promote DRY (Don\'t Repeat Yourself) principle and modularity.',
      'Default arguments must follow non-default positional arguments.',
      '`*args` gathers extra positional arguments into a tuple; `**kwargs` gathers keyword arguments into a dict.',
      'Lambda syntax: `lambda x: x**2` (frequently used in Pandas `.apply()`).'
    ],
    code: `# Reusable metric calculation function with kwargs
def calculate_mse(actuals, predictions, rounded=True, **kwargs):
    """Calculate Mean Squared Error between actual and predicted vectors."""
    n = len(actuals)
    squared_errors = [(a - p) ** 2 for a, p in zip(actuals, predictions)]
    mse = sum(squared_errors) / n
    
    if rounded:
        decimals = kwargs.get("decimals", 4)
        return round(mse, decimals)
    return mse

y_true = [3.0, -0.5, 2.0, 7.0]
y_pred = [2.5, 0.0, 2.1, 7.8]

error = calculate_mse(y_true, y_pred, decimals=3)
print("Mean Squared Error:", error)

# Lambda transformation
normalize = lambda x, min_x, max_x: (x - min_x) / (max_x - min_x)
print("Normalized 75 in [50, 100]:", normalize(75, 50, 100))`,
    codeLanguage: 'python',
    expectedOutput: `Mean Squared Error: 0.288
Normalized 75 in [50, 100]: 0.5`,
    practiceQuestion: {
      question: 'Write a lambda function that takes temperature in Celsius and returns Kelvin (C + 273.15).',
      hint: '`to_kelvin = lambda c: c + 273.15`',
      solution: `to_kelvin = lambda c: c + 273.15
print("25C in Kelvin:", to_kelvin(25)) # 298.15`
    },
    tags: ['functions', 'lambda', 'args-kwargs']
  },
  {
    id: 'py-14',
    subjectId: 'python',
    title: '14. Modules, Packages & Virtual Environments',
    order: 14,
    explanation:
      'A module is a single Python file (`.py`) containing functions, classes, and variables. A package is a directory of modules containing an `__init__.py` file. Python’s standard library includes `math`, `random`, `datetime`, `collections`, `itertools`, and `os`.',
    keyPoints: [
      'Import syntax: `import math`, `from math import sqrt`, `import pandas as pd`.',
      '`__name__ == "__main__"` checks if the script is run directly or imported.',
      'The Python standard library is rich: `random.seed()`, `datetime.now()`, `statistics.mean()`.',
      'Virtual environments (`venv`, `conda`) isolate project dependencies.'
    ],
    code: `# Utilizing built-in modules for statistical exploration
import math
import random
from collections import Counter

# Set random seed for reproducibility in Data Science experiments
random.seed(42)
dice_rolls = [random.randint(1, 6) for _ in range(100)]
frequencies = Counter(dice_rolls)

print("Roll frequencies (100 trials):")
for outcome, count in sorted(frequencies.items()):
    pct = (count / len(dice_rolls)) * 100
    print(f"Number {outcome}: {count} times ({pct:.1f}%)")

# Standard deviation formula component
variance_sample = math.sqrt(25.0)
print(f"Square root of 25.0: {variance_sample}")`,
    codeLanguage: 'python',
    expectedOutput: `Roll frequencies (100 trials):
Number 1: 15 times (15.0%)
Number 2: 12 times (12.0%)
Number 3: 20 times (20.0%)
Number 4: 15 times (15.0%)
Number 5: 19 times (19.0%)
Number 6: 19 times (19.0%)
Square root of 25.0: 5.0`,
    practiceQuestion: {
      question: 'Use the `math` module to calculate the Euclidean distance between points (0, 0) and (3, 4).',
      hint: 'Use `math.hypot(3, 4)` or `math.sqrt(3**2 + 4**2)`.',
      solution: `import math
distance = math.hypot(3, 4)
print("Euclidean distance:", distance) # 5.0`
    },
    tags: ['modules', 'packages', 'standard-library']
  },
  {
    id: 'py-15',
    subjectId: 'python',
    title: '15. File Handling & CSV / JSON Parsing',
    order: 15,
    explanation:
      'Reading and writing files is essential for data pipelines. Python provides the `open()` function with context managers (`with` statement) to ensure files are closed safely. Standard libraries like `csv` and `json` handle structured flat files.',
    keyPoints: [
      'Context managers (`with open(...) as f:`) guarantee proper closing even if errors occur.',
      'File modes: `"r"` (read), `"w"` (write/overwrite), `"a"` (append), `"r+"` (read/write).',
      '`json.loads()` parses a JSON string; `json.dumps()` serializes Python dicts.',
      'In production, Pandas `pd.read_csv()` and `pd.read_json()` build on top of these concepts.'
    ],
    code: `# Parsing CSV-like dataset lines using context manager logic
raw_csv_content = """id,feature1,feature2,label
1,23.5,1.4,setosa
2,28.1,1.8,virginica
3,21.0,1.2,setosa"""

parsed_records = []
lines = raw_csv_content.strip().split("\\n")
headers = lines[0].split(",")

for line in lines[1:]:
    values = line.split(",")
    record = {headers[i]: values[i] for i in range(len(headers))}
    parsed_records.append(record)

print("Parsed Dataset Records:")
for rec in parsed_records:
    print(rec)`,
    codeLanguage: 'python',
    expectedOutput: `Parsed Dataset Records:
{'id': '1', 'feature1': '23.5', 'feature2': '1.4', 'label': 'setosa'}
{'id': '2', 'feature1': '28.1', 'feature2': '1.8', 'label': 'virginica'}
{'id': '3', 'feature1': '21.0', 'feature2': '1.2', 'label': 'setosa'}`,
    practiceQuestion: {
      question: 'How do you serialize a dictionary `meta = {"model": "RandomForest", "accuracy": 0.96}` into a formatted JSON string?',
      hint: 'Use `import json` and `json.dumps(meta, indent=2)`.',
      solution: `import json
meta = {"model": "RandomForest", "accuracy": 0.96}
json_str = json.dumps(meta, indent=2)
print(json_str)`
    },
    tags: ['file-io', 'csv', 'json', 'data-pipeline']
  },
  {
    id: 'py-16',
    subjectId: 'python',
    title: '16. Exception Handling (try/except/finally)',
    order: 16,
    explanation:
      'Robust data pipelines must handle dirty data, missing files, divide-by-zero occurrences, and API timeouts gracefully without crashing. Python uses `try`, `except`, `else`, and `finally` blocks for exception management.',
    keyPoints: [
      '`try` block contains risky code that might throw an error.',
      '`except SpecificException as e:` catches and responds to defined failure modes.',
      '`else` runs ONLY if no exception was raised in the try block.',
      '`finally` always runs regardless of whether an exception occurred (useful for cleanup).'
    ],
    code: `# Robust data conversion parser for messy raw inputs
def parse_measurement(val_str):
    try:
        clean_str = val_str.strip().replace("$", "")
        num = float(clean_str)
    except ValueError as ve:
        # Graceful fallback for invalid strings like "N/A" or "None"
        return None, f"ValueError: {ve}"
    except AttributeError:
        return None, "TypeError: non-string input provided"
    else:
        return num, "Success"
    finally:
        pass

test_inputs = [" $142.50 ", "N/A", "99.8", None]
for raw in test_inputs:
    result, status = parse_measurement(raw)
    print(f"Input: {str(raw):<10} -> Result: {str(result):<8} (Status: {status})")`,
    codeLanguage: 'python',
    expectedOutput: `Input:  $142.50   -> Result: 142.5    (Status: Success)
Input: N/A        -> Result: None     (Status: ValueError: could not convert string to float: 'N/A')
Input: 99.8       -> Result: 99.8     (Status: Success)
Input: None       -> Result: None     (Status: TypeError: non-string input provided)`,
    practiceQuestion: {
      question: 'Write a safe division function `safe_div(a, b)` that returns `0.0` if `ZeroDivisionError` occurs.',
      hint: 'Catch `ZeroDivisionError` in the `except` block.',
      solution: `def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return 0.0

print(safe_div(10, 0)) # 0.0`
    },
    tags: ['exceptions', 'debugging', 'error-handling']
  },
  {
    id: 'py-17',
    subjectId: 'python',
    title: '17. NumPy: N-Dimensional Arrays & Vectorization',
    order: 17,
    explanation:
      'NumPy (Numerical Python) is the bedrock of scientific computing and data science in Python. It provides high-performance N-dimensional arrays (`ndarray`) implemented in C, enabling vectorized operations without slow Python for-loops.',
    keyPoints: [
      'Homogeneous arrays: all elements must have identical data types for fast memory access.',
      'Vectorization: element-wise arithmetic executed at C-speed without explicit loops.',
      'Broadcasting: rules for arithmetic between arrays of different shapes.',
      'Key operations: `.shape`, `.reshape()`, `np.dot()`, `np.mean()`, `np.std()`, `np.linalg`.'
    ],
    code: `# NumPy array operations and vectorization simulation
import numpy as np

# Create feature matrix (4 samples, 3 features)
X = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0],
    [10.0, 11.0, 12.0]
])

# Weights vector
weights = np.array([0.5, -0.2, 0.1])

# Vectorized Matrix-Vector Multiplication (Dot product)
predictions = np.dot(X, weights)

# Standardize features (Z-score normalization)
mean_vals = np.mean(X, axis=0)
std_vals = np.std(X, axis=0)
X_scaled = (X - mean_vals) / std_vals

print("Feature matrix shape:", X.shape)
print("Linear Model Predictions:", predictions)
print("Feature column means:", mean_vals)
print("Standardized Matrix (Mean ~ 0, Std = 1):\\n", np.round(X_scaled, 2))`,
    codeLanguage: 'python',
    expectedOutput: `Feature matrix shape: (4, 3)
Linear Model Predictions: [0.4 1.6 2.8 4. ]
Feature column means: [5.5 6.5 7.5]
Standardized Matrix (Mean ~ 0, Std = 1):
 [[-1.34 -1.34 -1.34]
 [-0.45 -0.45 -0.45]
 [ 0.45  0.45  0.45]
 [ 1.34  1.34  1.34]]`,
    practiceQuestion: {
      question: 'How do you create a 3x3 identity matrix and calculate its determinant in NumPy?',
      hint: 'Use `np.eye(3)` and `np.linalg.det()`.',
      solution: `import numpy as np
I = np.eye(3)
det = np.linalg.det(I)
print("3x3 Identity:\\n", I)
print("Determinant:", det) # 1.0`
    },
    tags: ['numpy', 'linear-algebra', 'vectorization', 'arrays']
  },
  {
    id: 'py-18',
    subjectId: 'python',
    title: '18. Pandas: Series, DataFrames & Aggregation',
    order: 18,
    explanation:
      'Pandas is the premier library for tabular data manipulation in Python. It introduces two primary data structures: `Series` (1D labeled array) and `DataFrame` (2D labeled table with columns of potentially different types).',
    keyPoints: [
      '`df.head()`, `df.info()`, `df.describe()` for instant exploratory summary.',
      'Selecting data: `.loc[]` (label-based indexing) and `.iloc[]` (integer-position indexing).',
      'Filtering: boolean masking e.g., `df[df["age"] > 21]`.',
      'Groupby & Aggregate: `df.groupby("category")["sales"].agg(["mean", "sum"])`.'
    ],
    code: `# Pandas tabular data analysis demonstration
import pandas as pd

data = {
    "student_id": [101, 102, 103, 104, 105, 106],
    "department": ["Data Science", "CS", "Data Science", "Math", "CS", "Data Science"],
    "gpa": [3.85, 3.40, 3.92, 3.70, 3.65, 3.98],
    "credits": [60, 45, 90, 75, 50, 85]
}

df = pd.DataFrame(data)

# Filtering high achievers
honors = df[df["gpa"] >= 3.80]

# Department aggregation
dept_summary = df.groupby("department")["gpa"].agg(
    student_count="count",
    mean_gpa="mean",
    max_gpa="max"
).reset_index()

print("--- Full Dataset ---")
print(df.to_string(index=False))
print("\\n--- Department GPA Summary ---")
print(dept_summary.to_string(index=False))`,
    codeLanguage: 'python',
    expectedOutput: `--- Full Dataset ---
 student_id   department   gpa  credits
        101 Data Science  3.85       60
        102           CS  3.40       45
        103 Data Science  3.92       90
        104         Math  3.70       75
        105           CS  3.65       50
        106 Data Science  3.98       85

--- Department GPA Summary ---
  department  student_count  mean_gpa  max_gpa
          CS              2  3.525000     3.65
Data Science              3  3.916667     3.98
        Math              1  3.700000     3.70`,
    practiceQuestion: {
      question: 'How do you check for missing values in each column of a DataFrame `df` and count them?',
      hint: 'Use `df.isnull().sum()`.',
      solution: `import pandas as pd
# Assuming df is loaded:
# missing_summary = df.isnull().sum()
# print(missing_summary)`
    },
    tags: ['pandas', 'dataframes', 'eda', 'group-by']
  },
  {
    id: 'py-19',
    subjectId: 'python',
    title: '19. Matplotlib & Data Visualization Basics',
    order: 19,
    explanation:
      'Matplotlib is the foundational 2D plotting library in Python. The `pyplot` sub-module (`plt`) provides a MATLAB-like interface for creating line plots, scatter plots, bar charts, histograms, and customizable statistical figures.',
    keyPoints: [
      'Structure: `Figure` (the canvas window) and `Axes` (the individual plot area).',
      'Common plots: `plt.plot()` (line), `plt.scatter()` (correlation), `plt.hist()` (distribution), `plt.bar()` (categories).',
      'Customization: `plt.title()`, `plt.xlabel()`, `plt.ylabel()`, `plt.grid()`, `plt.legend()`.',
      'Always include units and clear axes labels for scientific rigor.'
    ],
    code: `# Matplotlib plotting script pattern
import matplotlib.pyplot as plt

# Simulated model training loss curve over 5 epochs
epochs = [1, 2, 3, 4, 5]
train_loss = [0.85, 0.42, 0.28, 0.18, 0.12]
val_loss = [0.89, 0.48, 0.35, 0.29, 0.27]

# Create Figure and Plot
plt.figure(figsize=(8, 4.5))
plt.plot(epochs, train_loss, label='Training Loss', marker='o', color='#2563eb', linewidth=2)
plt.plot(epochs, val_loss, label='Validation Loss', marker='s', color='#dc2626', linestyle='--', linewidth=2)

plt.title("Model Convergence: Training vs Validation Loss", fontsize=12, fontweight='bold')
plt.xlabel("Epochs", fontsize=10)
plt.ylabel("Cross-Entropy Loss", fontsize=10)
plt.grid(True, alpha=0.3)
plt.legend()
plt.tight_layout()
# In interactive environments: plt.show()
print("Plot successfully configured with 5 epochs curve.")`,
    codeLanguage: 'python',
    expectedOutput: `Plot successfully configured with 5 epochs curve.`,
    practiceQuestion: {
      question: 'What function is used to create a scatter plot of `height` vs `weight` in Matplotlib?',
      hint: 'Use `plt.scatter(height, weight)`.',
      solution: `import matplotlib.pyplot as plt
height = [160, 165, 170, 175, 180]
weight = [55, 62, 68, 74, 82]
plt.scatter(height, weight, color='green')
plt.xlabel("Height (cm)")
plt.ylabel("Weight (kg)")
# plt.show()`
    },
    tags: ['matplotlib', 'visualization', 'charts']
  },
  {
    id: 'py-20',
    subjectId: 'python',
    title: '20. End-to-End Basic Data Analysis Project',
    order: 20,
    explanation:
      'Putting it all together: a complete mini-pipeline combining data ingestion, cleaning, exploratory statistics, transformation, and insight generation using Python, NumPy, and Pandas.',
    keyPoints: [
      'Step 1: Load and inspect dataset structure (`.shape`, `.dtypes`).',
      'Step 2: Clean data (handle nulls, eliminate duplicates, fix types).',
      'Step 3: Univariate & Bivariate statistical exploration.',
      'Step 4: Extract actionable insights for business or research decision making.'
    ],
    code: `# Mini Data Analysis Pipeline: E-commerce Customer Spend
import pandas as pd
import numpy as np

# 1. Ingestion
raw_data = {
    "customer_id": [1, 2, 3, 4, 5, 6, 7, 8],
    "age": [25, 34, 45, np.nan, 23, 52, 38, 45],
    "spend_usd": [120.5, 450.0, 890.2, 310.0, 95.0, 1200.0, 560.5, 890.2],
    "is_member": [False, True, True, False, False, True, True, True]
}
df = pd.DataFrame(raw_data)

# 2. Cleaning: Impute missing age with median and drop duplicates
df["age"] = df["age"].fillna(df["age"].median())
df = df.drop_duplicates()

# 3. Aggregation & Insights
insights = df.groupby("is_member")["spend_usd"].agg(
    avg_spend="mean",
    total_spend="sum",
    customer_count="count"
).reset_index()

print("--- Cleaned Customer Data ---")
print(df.to_string(index=False))
print("\\n--- Membership Value Analysis ---")
print(insights.to_string(index=False))`,
    codeLanguage: 'python',
    expectedOutput: `--- Cleaned Customer Data ---
 customer_id   age  spend_usd  is_member
           1  25.0      120.5      False
           2  34.0      450.0       True
           3  45.0      890.2       True
           4  38.0      310.0      False
           5  23.0       95.0      False
           6  52.0     1200.0       True
           7  38.0      560.5       True

--- Membership Value Analysis ---
 is_member  avg_spend  total_spend  customer_count
     False 175.166667        525.5               3
      True 775.175000       3100.7               4`,
    practiceQuestion: {
      question: 'Calculate the percentage contribution of members to total overall spend.',
      hint: '`member_spend / total_spend * 100`',
      solution: `total_spend = 3100.7 + 525.5
member_spend = 3100.7
pct = (member_spend / total_spend) * 100
print("Members contribute " + str(round(pct, 1)) + "% of revenue") # 85.5%`
    },
    tags: ['project', 'eda', 'pipeline', 'capstone']
  }
];
