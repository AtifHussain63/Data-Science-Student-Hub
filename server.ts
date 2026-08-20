import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Chat endpoint powered by Gemini API
  app.post('/api/chat', async (req, res) => {
    try {
      const rawPrompt = req.body?.prompt ?? req.body?.message;

      if (!rawPrompt || typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
        return res.status(400).json({ error: 'Prompt is required and must be a string' });
      }

      const prompt = rawPrompt.trim();
      const { history, subjectContext } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is provided in settings.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are DataScience AI Assistant, a friendly, patient, and highly expert personal AI study companion for university Data Science students.
You specialize in:
- Python programming (Core Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, PyTorch/TensorFlow basics)
- Relational Databases & SQL (Queries, Joins, Group By, Subqueries, Normalization, Window functions)
- Statistics & Probability (Descriptive statistics, Distributions, Hypothesis Testing, p-values, Confidence Intervals, Regression)
- Machine Learning (Supervised, Unsupervised, Algorithms, Overfitting/Underfitting, Metrics like Precision, Recall, F1-score, ROC/AUC)
- Data Analysis & EDA (Data Cleaning, Imputation, Outlier Detection, Feature Engineering)
- Data Visualization (Best charts to use, storytelling, Matplotlib/Seaborn code)
- Mathematics for Data Science (Linear Algebra, Calculus, Matrices, Vectors, Optimization)

Guidelines:
1. Explain complex concepts in simple, intuitive terms followed by technical accuracy and mathematical or logical formulation where appropriate.
2. Provide clean, well-commented Python or SQL code blocks with expected outputs.
3. If debugging code or errors, pinpoint the exact line, reason for the error, and provide the corrected code.
4. If asked for assignment help, provide structured hints, guiding steps, and foundational logic rather than blindly doing the assignment.
5. Create practice questions or MCQs when the student asks for test prep.
6. Context of current subject: ${subjectContext || 'General Data Science'}.
7. Use clean Markdown formatting with clear headings, bold terms, bullet lists, and syntax-highlighted code blocks.`;

      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        // Take recent history to preserve context
        const recentHistory = history.slice(-8);
        for (const item of recentHistory) {
          const text = item.content || item.text;
          if (text && typeof text === 'string' && text.trim()) {
            const isAi = item.role === 'assistant' || item.sender === 'ai' || item.role === 'model';
            contents.push({
              role: isAi ? 'model' : 'user',
              parts: [{ text: text.trim() }],
            });
          }
        }
      }

      // Add the current prompt
      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });

      // Helper to generate content with fallback models and retry
      const modelsToTry = ['gemini-3.7-flash', 'gemini-flash-latest'];
      let replyText: string | null = null;
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction,
                temperature: 0.7,
              },
            });

            if (response && response.text) {
              replyText = response.text;
              break;
            }
          } catch (err: any) {
            lastError = err;
            const errStr = String(err?.message || err);
            console.warn(`[AI Chat] Attempt ${attempt + 1} with ${modelName} failed:`, errStr);

            const isTransient =
              errStr.includes('503') ||
              errStr.includes('UNAVAILABLE') ||
              errStr.includes('429') ||
              errStr.includes('RESOURCE_EXHAUSTED') ||
              errStr.includes('high demand') ||
              errStr.includes('overloaded');

            if (isTransient && attempt === 0) {
              // Wait 1 second before retrying
              await new Promise((resolve) => setTimeout(resolve, 1000));
              continue;
            }
            // Move to next model
            break;
          }
        }

        if (replyText) {
          break;
        }
      }

      if (!replyText) {
        if (lastError) {
          throw lastError;
        }
        replyText = 'I apologize, but I could not generate a response. Please try rephrasing your question.';
      }

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error generating AI response:', err);

      let cleanError = 'Failed to generate AI response. Please try again.';
      const rawMsg = err?.message || String(err || '');

      try {
        const jsonMatch = rawMsg.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.error?.message) {
            if (parsed.error.code === 503 || parsed.error.status === 'UNAVAILABLE' || parsed.error.message.includes('high demand')) {
              cleanError = 'The AI Assistant is currently experiencing high demand. Spikes are temporary—please try again in a few moments.';
            } else {
              cleanError = parsed.error.message;
            }
          }
        } else if (rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE') || rawMsg.includes('high demand')) {
          cleanError = 'The AI Assistant is currently experiencing high demand. Spikes are temporary—please try again in a few moments.';
        } else if (rawMsg.includes('429') || rawMsg.includes('RESOURCE_EXHAUSTED')) {
          cleanError = 'Rate limit reached. Please wait a brief moment and retry.';
        } else if (rawMsg) {
          cleanError = rawMsg;
        }
      } catch {
        cleanError = rawMsg || cleanError;
      }

      res.status(503).json({ error: cleanError });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DataScience Student Hub server running on port ${PORT}`);
  });
}

startServer();
