import { Topic } from '../../types';

export const sqlTopics: Topic[] = [
  {
    id: 'sql-01',
    subjectId: 'sql',
    title: '1. SQL Introduction & RDBMS',
    order: 1,
    explanation:
      'Structured Query Language (SQL) is the standard declarative language for interacting with Relational Database Management Systems (RDBMS) like PostgreSQL, MySQL, SQLite, and Snowflake. SQL allows data scientists to extract, filter, join, aggregate, and manipulate massive enterprise datasets.',
    keyPoints: [
      'Declarative: Specify *what* data you need, and the database query optimizer figures out *how* to execute it efficiently.',
      'Categories: DQL (Data Query: SELECT), DDL (Data Definition: CREATE, ALTER, DROP), DML (Data Manipulation: INSERT, UPDATE, DELETE), DCL (Control: GRANT, REVOKE).',
      'ACID properties: Atomicity, Consistency, Isolation, Durability guarantee transaction reliability.',
      'Foundational first step in almost every Data Science pipeline before Pandas or ML ingestion.'
    ],
    code: `-- Basic SQL query to explore student records
SELECT 
    student_id,
    first_name,
    major,
    gpa
FROM students
WHERE gpa >= 3.5
ORDER BY gpa DESC;`,
    codeLanguage: 'sql',
    expectedOutput: `+------------+------------+--------------+-----+
| student_id | first_name | major        | gpa |
+------------+------------+--------------+-----+
| 104        | Sophia     | Data Science | 3.98|
| 102        | Liam       | Data Science | 3.92|
| 108        | Emma       | CS           | 3.85|
+------------+------------+--------------+-----+`,
    practiceQuestion: {
      question: 'Which sublanguage of SQL does the `SELECT` statement belong to?',
      hint: 'It is used for querying data.',
      solution: '`SELECT` belongs to **DQL (Data Query Language)**.'
    },
    tags: ['sql-intro', 'rdbms', 'dql', 'acid']
  },
  {
    id: 'sql-02',
    subjectId: 'sql',
    title: '2. Database Basics & Schemas',
    order: 2,
    explanation:
      'A relational database consists of tables (relations) structured in columns (attributes/fields) and rows (tuples/records). A database schema defines the architecture, data types, constraints, and relationships between tables.',
    keyPoints: [
      'Table: 2D matrix of typed columns and populated rows.',
      'Data types: INT, VARCHAR(n), TEXT, NUMERIC(p,s), DATE, TIMESTAMP, BOOLEAN.',
      'Schema: Blueprint enforcing data integrity and referential constraints.',
      'Star Schema / Snowflake Schema: Common data warehouse designs for analytics.'
    ],
    code: `-- Inspect schema and list tables
-- PostgreSQL / Standard catalog query
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'students';`,
    codeLanguage: 'sql',
    expectedOutput: `+------------+-------------+-------------------+-------------+
| table_name | column_name | data_type         | is_nullable |
+------------+-------------+-------------------+-------------+
| students   | student_id  | integer           | NO          |
| students   | email       | character varying | NO          |
| students   | gpa         | numeric(3,2)      | YES         |
+------------+-------------+-------------------+-------------+`,
    practiceQuestion: {
      question: 'What is a row in a relational database table called in formal relational terminology?',
      hint: 'Starts with "T".',
      solution: 'A row is formally termed a **Tuple** or Record.'
    },
    tags: ['database-basics', 'schemas', 'data-types']
  },
  {
    id: 'sql-03',
    subjectId: 'sql',
    title: '3. CREATE TABLE & Constraints',
    order: 3,
    explanation:
      '`CREATE TABLE` defines a new table with named columns, specific data types, and integrity constraints such as `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, and `DEFAULT`.',
    keyPoints: [
      '`PRIMARY KEY`: Uniquely identifies each record and enforces non-null uniqueness.',
      '`NOT NULL`: Prevents missing values from being inserted into essential columns.',
      '`CHECK`: Validates that column values satisfy a custom logical condition.',
      '`DEFAULT`: Assigns a fallback value when none is explicitly provided.'
    ],
    code: `CREATE TABLE data_science_students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    university VARCHAR(120) NOT NULL,
    gpa NUMERIC(3, 2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 0 rows affected. Table 'data_science_students' created successfully.`,
    practiceQuestion: {
      question: 'Write a column definition for `age` that ensures age is an integer and cannot be less than 18.',
      hint: 'Use `CHECK (age >= 18)`.',
      solution: '`age INT CHECK (age >= 18)`'
    },
    tags: ['create-table', 'ddl', 'constraints']
  },
  {
    id: 'sql-04',
    subjectId: 'sql',
    title: '4. INSERT: Adding Records',
    order: 4,
    explanation:
      '`INSERT INTO` adds new rows of data into a table. You can insert a single record, multiple rows simultaneously in a batch, or populate a table from the results of another query.',
    keyPoints: [
      'Syntax: `INSERT INTO table_name (col1, col2) VALUES (val1, val2);`.',
      'Batch insertion: `VALUES (row1), (row2), (row3);` is much faster than individual statements.',
      'Auto-incrementing / SERIAL primary keys should typically be omitted from the column list.',
      '`RETURNING *` (PostgreSQL) returns inserted records with generated IDs.'
    ],
    code: `-- Batch insert multiple students
INSERT INTO data_science_students (full_name, email, university, gpa)
VALUES 
    ('Alex Johnson', 'alex.j@mit.edu', 'MIT', 3.88),
    ('Priya Sharma', 'priya.s@stanford.edu', 'Stanford', 3.95),
    ('David Kim', 'david.k@berkeley.edu', 'UC Berkeley', 3.72);`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 3 rows inserted.`,
    practiceQuestion: {
      question: 'Why is batch insertion (`VALUES (...), (...)`) preferred over multiple separate `INSERT` statements in Data Engineering?',
      hint: 'Consider transaction overhead and network roundtrips.',
      solution: 'Batch insertion reduces network round trips and commits transactions together, providing drastically higher throughput.'
    },
    tags: ['insert', 'dml', 'batch-loading']
  },
  {
    id: 'sql-05',
    subjectId: 'sql',
    title: '5. SELECT & Column Aliasing',
    order: 5,
    explanation:
      'The `SELECT` statement retrieves data from one or more tables. Data scientists use column projections, computations, string concatenations, `DISTINCT` for unique values, and `AS` for clear column aliases.',
    keyPoints: [
      '`SELECT *` retrieves all columns (avoid in production for performance).',
      '`DISTINCT` removes duplicate rows from the query output.',
      '`AS` renames columns or expression results for downstream clarity.',
      'Calculated columns perform on-the-fly arithmetic without altering stored table data.'
    ],
    code: `-- Selecting computed metrics and distinct universities
SELECT 
    full_name,
    gpa,
    ROUND(gpa * 25, 1) AS gpa_percentage,
    UPPER(university) AS institution
FROM data_science_students;`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+-----+----------------+---------------+
| full_name     | gpa | gpa_percentage | institution   |
+---------------+-----+----------------+---------------+
| Alex Johnson  | 3.88| 97.0           | MIT           |
| Priya Sharma  | 3.95| 98.8           | STANFORD      |
| David Kim     | 3.72| 93.0           | UC BERKELEY   |
+---------------+-----+----------------+---------------+`,
    practiceQuestion: {
      question: 'How do you retrieve a list of all unique universities without duplicates from the students table?',
      hint: 'Use `SELECT DISTINCT`.',
      solution: '`SELECT DISTINCT university FROM data_science_students;`'
    },
    tags: ['select', 'distinct', 'aliases', 'dql']
  },
  {
    id: 'sql-06',
    subjectId: 'sql',
    title: '6. WHERE Clause & Filtering Predicates',
    order: 6,
    explanation:
      'The `WHERE` clause filters rows before any grouping or aggregation takes place. It supports logical operators (`AND`, `OR`, `NOT`), range checking (`BETWEEN`), set inclusion (`IN`), pattern matching (`LIKE`, `ILIKE`), and null handling (`IS NULL`, `IS NOT NULL`).',
    keyPoints: [
      'Null evaluation: Always use `IS NULL` or `IS NOT NULL` (never `= NULL`).',
      'Wildcards: `%` matches zero or more characters; `_` matches exactly one character.',
      '`BETWEEN a AND b` is inclusive of both endpoints.',
      '`IN (val1, val2)` matches any value present in the listed set.'
    ],
    code: `-- Complex filtering for honor roll candidates
SELECT full_name, university, gpa
FROM data_science_students
WHERE gpa >= 3.80 
  AND university IN ('MIT', 'Stanford', 'Harvard')
  AND email LIKE '%.edu';`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+------------+-----+
| full_name     | university | gpa |
+---------------+------------+-----+
| Alex Johnson  | MIT        | 3.88|
| Priya Sharma  | Stanford   | 3.95|
+---------------+------------+-----+`,
    practiceQuestion: {
      question: 'Write a WHERE clause that selects products where `price` is between 50 and 100 AND `category` is not "Electronics".',
      hint: '`WHERE price BETWEEN 50 AND 100 AND category != \'Electronics\'`',
      solution: '`WHERE price BETWEEN 50 AND 100 AND category != \'Electronics\'`'
    },
    tags: ['where', 'filtering', 'predicates', 'like']
  },
  {
    id: 'sql-07',
    subjectId: 'sql',
    title: '7. ORDER BY, LIMIT & Pagination',
    order: 7,
    explanation:
      '`ORDER BY` sorts the result set by one or more columns in ascending (`ASC`, default) or descending (`DESC`) order. `LIMIT` (or `TOP` / `FETCH FIRST`) caps the maximum number of rows returned, which is vital when combined with `OFFSET` for pagination.',
    keyPoints: [
      'Default sorting order is `ASC` (smallest to largest / A to Z).',
      'Multiple sorting criteria: `ORDER BY department ASC, gpa DESC`.',
      '`LIMIT n OFFSET m`: skips $m$ rows and returns the next $n$ rows.',
      'Without an `ORDER BY`, relational tables have no guaranteed row ordering.'
    ],
    code: `-- Find the top 2 highest scoring students
SELECT full_name, university, gpa
FROM data_science_students
ORDER BY gpa DESC
LIMIT 2;`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+------------+-----+
| full_name     | university | gpa |
+---------------+------------+-----+
| Priya Sharma  | Stanford   | 3.95|
| Alex Johnson  | MIT        | 3.88|
+---------------+------------+-----+`,
    practiceQuestion: {
      question: 'How would you get the 2nd page of results if page size is 10 items?',
      hint: 'Skip the first 10 using OFFSET.',
      solution: '`ORDER BY id ASC LIMIT 10 OFFSET 10;`'
    },
    tags: ['order-by', 'limit', 'offset', 'pagination']
  },
  {
    id: 'sql-08',
    subjectId: 'sql',
    title: '8. GROUP BY & Data Aggregation',
    order: 8,
    explanation:
      '`GROUP BY` groups rows that have the same values in specified columns into summary rows. It is the SQL equivalent of pivot tables or Pandas `.groupby()`, powering dimensional analysis across categorical features.',
    keyPoints: [
      'Any non-aggregated column in the `SELECT` list MUST be included in the `GROUP BY` clause.',
      'Executes after `WHERE` filtering but before `HAVING` and `ORDER BY`.',
      'Transforms granular transaction rows into high-level statistical summaries.'
    ],
    code: `-- Student counts and average GPA by University
SELECT 
    university,
    COUNT(*) AS total_students,
    ROUND(AVG(gpa), 2) AS mean_gpa,
    MAX(gpa) AS highest_gpa
FROM data_science_students
GROUP BY university
ORDER BY mean_gpa DESC;`,
    codeLanguage: 'sql',
    expectedOutput: `+-------------+----------------+----------+-------------+
| university  | total_students | mean_gpa | highest_gpa |
+-------------+----------------+----------+-------------+
| Stanford    | 1              | 3.95     | 3.95        |
| MIT         | 1              | 3.88     | 3.88        |
| UC Berkeley | 1              | 3.72     | 3.72        |
+-------------+----------------+----------+-------------+`,
    practiceQuestion: {
      question: 'Why will `SELECT department, AVG(salary) FROM employees;` cause an SQL syntax error?',
      hint: '`department` is not wrapped in an aggregate and has no `GROUP BY`.',
      solution: 'Because `department` is selected without an aggregate function and was omitted from a `GROUP BY department` clause.'
    },
    tags: ['group-by', 'aggregation', 'analytics']
  },
  {
    id: 'sql-09',
    subjectId: 'sql',
    title: '9. HAVING Clause vs WHERE',
    order: 9,
    explanation:
      'While `WHERE` filters individual rows before grouping, `HAVING` filters aggregated group summaries *after* `GROUP BY` has collapsed the records. You cannot use aggregate functions (`SUM`, `COUNT`, `AVG`) in a `WHERE` clause; they must be placed in `HAVING`.',
    keyPoints: [
      '`WHERE` filters rows BEFORE grouping; `HAVING` filters groups AFTER aggregation.',
      '`HAVING` conditions can reference aggregate functions like `COUNT(*) > 5` or `AVG(score) >= 80`.',
      'Execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.'
    ],
    code: `-- Find universities with at least 2 students and average GPA >= 3.80
SELECT 
    university,
    COUNT(*) AS cohort_size,
    ROUND(AVG(gpa), 2) AS avg_gpa
FROM data_science_students
GROUP BY university
HAVING COUNT(*) >= 2 AND AVG(gpa) >= 3.80;`,
    codeLanguage: 'sql',
    expectedOutput: `+-------------+-------------+---------+
| university  | cohort_size | avg_gpa |
+-------------+-------------+---------+
| Stanford    | 4           | 3.86    |
| MIT         | 3           | 3.91    |
+-------------+-------------+---------+`,
    practiceQuestion: {
      question: 'When should you use HAVING instead of WHERE?',
      hint: 'Think about whether you are filtering raw records or calculated group aggregates.',
      solution: 'Use `HAVING` when filtering results based on an aggregate function (e.g., `SUM(sales) > 10000`) after groups are formed.'
    },
    tags: ['having', 'where-vs-having', 'aggregates']
  },
  {
    id: 'sql-10',
    subjectId: 'sql',
    title: '10. Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
    order: 10,
    explanation:
      'Aggregate functions perform a calculation on a set of column values and return a single scalar summary value. SQL provides `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()`.',
    keyPoints: [
      '`COUNT(*)` counts all rows including NULLs; `COUNT(column)` counts non-null entries only.',
      '`SUM()` and `AVG()` ignore NULL values during computation.',
      '`COUNT(DISTINCT column)` computes cardinality of unique non-null elements.',
      'Can be combined with arithmetic expressions, e.g., `AVG(revenue - cost)`.'
    ],
    code: `-- Statistical summary across all enrolled data science students
SELECT 
    COUNT(*) AS total_enrolled,
    COUNT(DISTINCT university) AS unique_universities,
    ROUND(AVG(gpa), 3) AS average_gpa,
    MIN(gpa) AS min_gpa,
    MAX(gpa) AS max_gpa
FROM data_science_students;`,
    codeLanguage: 'sql',
    expectedOutput: `+----------------+---------------------+-------------+---------+---------+
| total_enrolled | unique_universities | average_gpa | min_gpa | max_gpa |
+----------------+---------------------+-------------+---------+---------+
| 3              | 3                   | 3.850       | 3.72    | 3.95    |
+----------------+---------------------+-------------+---------+---------+`,
    practiceQuestion: {
      question: 'What is the result of COUNT(bonus) if there are 10 rows and 3 of them have bonus = NULL?',
      hint: 'COUNT(col) ignores NULLs.',
      solution: 'The result is **7**.'
    },
    tags: ['aggregates', 'count', 'sum', 'avg', 'min-max']
  },
  {
    id: 'sql-11',
    subjectId: 'sql',
    title: '11. UPDATE: Modifying Existing Rows',
    order: 11,
    explanation:
      '`UPDATE` alters existing data within specific columns of a table. Always supply a `WHERE` clause to avoid unintentionally updating every single row in the database.',
    keyPoints: [
      'Syntax: `UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;`.',
      'CRITICAL: Omitting `WHERE` updates all records in the table.',
      'Supports mathematical mutations, e.g., `SET salary = salary * 1.05`.',
      'Transactions (`BEGIN...COMMIT / ROLLBACK`) allow reverting accidental mass updates.'
    ],
    code: `-- Update GPA for a student who finished a high-grade semester
UPDATE data_science_students
SET gpa = 3.92
WHERE email = 'david.k@berkeley.edu';`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 1 row affected. Rows matched: 1  Changed: 1  Warnings: 0`,
    practiceQuestion: {
      question: 'What happens if you run `UPDATE students SET gpa = 4.0;` without a WHERE clause?',
      hint: 'Think about which rows will match.',
      solution: 'Every single student record in the table will have their GPA changed to 4.0.'
    },
    tags: ['update', 'dml', 'data-mutation']
  },
  {
    id: 'sql-12',
    subjectId: 'sql',
    title: '12. DELETE & TRUNCATE',
    order: 12,
    explanation:
      '`DELETE FROM` removes specific rows matching a `WHERE` predicate. `TRUNCATE TABLE` quickly empties all rows from a table by deallocating pages, which is faster than `DELETE` but cannot filter rows.',
    keyPoints: [
      '`DELETE FROM table WHERE condition;` removes matched rows and logs each deletion.',
      '`TRUNCATE TABLE table;` resets table state, resets auto-increment counters, and is DDL.',
      '`DROP TABLE table;` completely deletes the table schema and data.',
      'Foreign key constraints (`ON DELETE CASCADE` / `RESTRICT`) manage dependent child records.'
    ],
    code: `-- Delete an inactive student record safely
DELETE FROM data_science_students
WHERE student_id = 999;`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 0 rows affected.`,
    practiceQuestion: {
      question: 'What is the key difference between DELETE FROM table and TRUNCATE TABLE?',
      hint: 'Consider speed, WHERE clause support, and transaction logging.',
      solution: '`DELETE` can filter specific rows with a `WHERE` clause and logs individual row deletions; `TRUNCATE` rapidly wipes the entire table without row filtering.'
    },
    tags: ['delete', 'truncate', 'dml']
  },
  {
    id: 'sql-13',
    subjectId: 'sql',
    title: '13. INNER JOIN (Matching Rows)',
    order: 13,
    explanation:
      '`INNER JOIN` combines rows from two or more tables where there is an exact match on the specified join condition (`ON`). Rows that do not have a match in both tables are excluded from the result set.',
    keyPoints: [
      'Returns only intersection of matching rows ($A \\cap B$).',
      'Syntax: `SELECT * FROM tableA INNER JOIN tableB ON tableA.key = tableB.key`.',
      'The most common join type in data warehouse star-schema queries.',
      'Use table aliases (e.g., `FROM students s JOIN enrollments e ON s.id = e.student_id`) for readability.'
    ],
    code: `-- Join students with course enrollments
SELECT 
    s.full_name,
    s.university,
    c.course_code,
    c.course_name,
    e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE e.grade = 'A';`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+------------+-------------+----------------------+-------+
| full_name     | university | course_code | course_name          | grade |
+---------------+------------+-------------+----------------------+-------+
| Alex Johnson  | MIT        | DS-301      | Deep Learning        | A     |
| Priya Sharma  | Stanford   | DS-201      | Advanced Statistics  | A     |
+---------------+------------+-------------+----------------------+-------+`,
    practiceQuestion: {
      question: 'If Table A has 5 rows and Table B has 3 rows, and only 2 rows match the join predicate, how many rows will INNER JOIN return?',
      hint: 'INNER JOIN returns only matching pairs.',
      solution: 'It will return **2 rows**.'
    },
    tags: ['inner-join', 'joins', 'relational-algebra']
  },
  {
    id: 'sql-14',
    subjectId: 'sql',
    title: '14. LEFT JOIN (Left Outer Join)',
    order: 14,
    explanation:
      '`LEFT JOIN` returns all records from the left table, and the matched records from the right table. If there is no match on the right side, the result will contain `NULL` for right-table columns. Essential for finding missing relationships or inactive entities.',
    keyPoints: [
      'Guarantees every row from the left table is preserved in the output.',
      'Missing right-table columns are populated with `NULL`.',
      'Finding orphaned / unlinked records: `LEFT JOIN ... WHERE right_table.id IS NULL`.',
      'Critical for churn analysis and identifying users who never took a quiz.'
    ],
    code: `-- Find all students, including those who have not enrolled in any course yet
SELECT 
    s.full_name,
    s.email,
    COALESCE(c.course_name, 'No Course Enrolled') AS enrolled_course
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+----------------------+---------------------+
| full_name     | email                | enrolled_course     |
+---------------+----------------------+---------------------+
| Alex Johnson  | alex.j@mit.edu       | Deep Learning       |
| Priya Sharma  | priya.s@stanford.edu | Advanced Statistics |
| David Kim     | david.k@berkeley.edu | No Course Enrolled  |
+---------------+----------------------+---------------------+`,
    practiceQuestion: {
      question: 'How do you find customers who have NEVER placed an order using a LEFT JOIN?',
      hint: 'Join customers with orders and filter `WHERE orders.order_id IS NULL`.',
      solution: '`SELECT c.customer_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;`'
    },
    tags: ['left-join', 'outer-join', 'nulls']
  },
  {
    id: 'sql-15',
    subjectId: 'sql',
    title: '15. RIGHT JOIN & FULL OUTER JOIN',
    order: 15,
    explanation:
      '`RIGHT JOIN` returns all rows from the right table, plus matched rows from the left table. `FULL OUTER JOIN` returns all records when there is a match in either left or right table, filling missing sides with `NULL`.',
    keyPoints: [
      '`RIGHT JOIN` is symmetric to `LEFT JOIN` (swapping table order).',
      '`FULL OUTER JOIN` combines the results of both LEFT and RIGHT joins ($A \\cup B$).',
      'Useful in reconciliations and detecting discrepancies between two data sources.',
      'Emulated in MySQL using `UNION` between LEFT JOIN and RIGHT JOIN.'
    ],
    code: `-- Full Outer Join between Course Catalog and Scheduled Classes
SELECT 
    c.course_code,
    c.course_name,
    s.semester,
    s.instructor
FROM courses c
FULL OUTER JOIN scheduled_classes s ON c.course_id = s.course_id;`,
    codeLanguage: 'sql',
    expectedOutput: `+-------------+---------------------+-----------+---------------+
| course_code | course_name         | semester  | instructor    |
+-------------+---------------------+-----------+---------------+
| DS-101      | Intro to Python     | Fall 2026 | Dr. Turing    |
| DS-202      | Quantum Computing   | NULL      | NULL          |
| NULL        | Special Seminar     | Fall 2026 | Prof. Hopper  |
+-------------+---------------------+-----------+---------------+`,
    practiceQuestion: {
      question: 'What does a FULL OUTER JOIN return when an ID exists only in Table A but not Table B?',
      hint: 'It returns Table A\'s data with NULLs for Table B.',
      solution: 'It returns the row with Table A\'s attributes and `NULL` for all Table B columns.'
    },
    tags: ['right-join', 'full-outer-join', 'reconciliation']
  },
  {
    id: 'sql-16',
    subjectId: 'sql',
    title: '16. Subqueries & CTEs (WITH Clause)',
    order: 16,
    explanation:
      'A subquery is a query nested inside another SQL statement (`SELECT`, `FROM`, or `WHERE`). Common Table Expressions (CTEs, defined via `WITH`) make complex multi-step queries modular, readable, and reusable.',
    keyPoints: [
      'Scalar Subquery: returns a single value (can be used in SELECT or WHERE).',
      'Correlated Subquery: references columns from the outer query (evaluated per outer row).',
      'CTE syntax: `WITH cte_name AS (SELECT ...) SELECT * FROM cte_name;`.',
      'CTEs improve code readability and maintainability in large analytics pipelines.'
    ],
    code: `-- Find students with GPA higher than the overall department average using CTE
WITH dept_stats AS (
    SELECT AVG(gpa) AS benchmark_gpa
    FROM data_science_students
)
SELECT 
    s.full_name,
    s.gpa,
    ROUND(d.benchmark_gpa, 2) AS dept_avg,
    ROUND(s.gpa - d.benchmark_gpa, 2) AS gpa_diff
FROM data_science_students s
CROSS JOIN dept_stats d
WHERE s.gpa > d.benchmark_gpa
ORDER BY s.gpa DESC;`,
    codeLanguage: 'sql',
    expectedOutput: `+---------------+-----+----------+----------+
| full_name     | gpa | dept_avg | gpa_diff |
+---------------+-----+----------+----------+
| Priya Sharma  | 3.95| 3.85     | +0.10    |
| Alex Johnson  | 3.88| 3.85     | +0.03    |
+---------------+-----+----------+----------+`,
    practiceQuestion: {
      question: 'Why are CTEs (`WITH` clauses) preferred over deeply nested subqueries in professional data pipelines?',
      hint: 'Think about readability, debugging, and step-by-step logic.',
      solution: 'CTEs structure queries sequentially from top to bottom, making them vastly easier to read, debug, and reuse compared to nested subqueries.'
    },
    tags: ['subqueries', 'cte', 'with-clause', 'modular-sql']
  },
  {
    id: 'sql-17',
    subjectId: 'sql',
    title: '17. Primary Key Constraints',
    order: 17,
    explanation:
      'A Primary Key is a column (or set of columns, termed Composite Primary Key) that uniquely identifies each row in a database table. It enforces the Entity Integrity Rule: no duplicate keys are allowed, and no part of a primary key may ever be `NULL`.',
    keyPoints: [
      'Enforces Uniqueness and `NOT NULL` automatically.',
      'A table can have at most ONE Primary Key.',
      'Databases automatically construct a clustered or unique B-tree index on the primary key for O(log n) lookups.',
      'Surrogate Keys (e.g., auto-incrementing ID, UUID) vs Natural Keys (e.g., SSN, email).'
    ],
    code: `-- Defining a composite primary key for student course enrollment
CREATE TABLE course_registrations (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id)  -- Composite Primary Key
);`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 0 rows affected. Table 'course_registrations' created with composite PK.`,
    practiceQuestion: {
      question: 'Can a Primary Key column contain a NULL value?',
      hint: 'Think about entity integrity rules.',
      solution: 'No, Primary Key columns can **never** contain NULL values.'
    },
    tags: ['primary-key', 'constraints', 'indexing', 'integrity']
  },
  {
    id: 'sql-18',
    subjectId: 'sql',
    title: '18. Foreign Keys & Referential Integrity',
    order: 18,
    explanation:
      'A Foreign Key is a column or group of columns in one table that references the Primary Key of another table. It enforces Referential Integrity, preventing orphan records and invalid data relationships.',
    keyPoints: [
      'Enforces relationships between parent and child tables.',
      '`ON DELETE CASCADE`: Automatically deletes child records when the parent record is deleted.',
      '`ON DELETE SET NULL`: Sets child foreign key to NULL if parent is removed.',
      '`ON DELETE RESTRICT`: Prevents deletion of the parent if child records exist.'
    ],
    code: `-- Creating child table with Foreign Key and Cascade rules
CREATE TABLE student_submissions (
    submission_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    assignment_name VARCHAR(100) NOT NULL,
    score NUMERIC(5,2),
    CONSTRAINT fk_student
        FOREIGN KEY (student_id) 
        REFERENCES data_science_students(student_id)
        ON DELETE CASCADE
);`,
    codeLanguage: 'sql',
    expectedOutput: `Query OK, 0 rows affected. Foreign Key constraint 'fk_student' established.`,
    practiceQuestion: {
      question: 'What does `ON DELETE CASCADE` do when a student record in the parent table is deleted?',
      hint: 'It cascades the deletion to child tables.',
      solution: 'It automatically deletes all corresponding rows in the child table (e.g. submissions) linked to that deleted student ID.'
    },
    tags: ['foreign-key', 'referential-integrity', 'cascade', 'database-design']
  }
];
