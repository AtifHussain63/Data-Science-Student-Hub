import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../context/AuthContext';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Code2,
  BrainCircuit,
  Calculator
} from 'lucide-react';
import { ChatMessage } from '../../types';

export const AIAssistantView: React.FC = () => {
  const { userProfile, currentUser } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello ${userProfile?.fullName ? userProfile.fullName.split(' ')[0] : 'there'}! 👋 I am your **Data Science AI Study Assistant** powered by Gemini.

I can help you with:
- 🐍 **Python, NumPy, & Pandas** code debugging & examples
- 🗄️ **SQL Query formulation**, Joins, CTEs, and Window Functions
- 📊 **Statistics & Probability** (Hypothesis testing, p-values, Bayes Theorem)
- 🧠 **Machine Learning** algorithms, loss functions, & model evaluation
- 📐 **Linear Algebra & Calculus** (Gradients, Derivatives, Eigenvalues)

What concept or problem would you like to explore today?`,
      timestamp: new Date().toISOString()
    }
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = typeof textToSend === 'string' ? textToSend : inputText;
    if (!rawText || typeof rawText !== 'string') return;
    const queryText = rawText.trim();
    if (!queryText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          message: queryText,
          history: historyPayload
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I processed your request, but received an empty response.',
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat Error:', err);
      let displayMessage = err.message || 'Please check your connection and try again.';
      
      // Clean up raw JSON error messages if present
      try {
        const jsonMatch = displayMessage.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.error?.message) {
            displayMessage = parsed.error.message;
          }
        }
      } catch {
        // use displayMessage as-is
      }

      if (displayMessage.includes('503') || displayMessage.includes('UNAVAILABLE') || displayMessage.includes('high demand')) {
        displayMessage = 'The AI Assistant is currently experiencing temporary high traffic. Please try clicking **Try Again** below in a moment.';
      }

      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Service Notice**: ${displayMessage}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-new',
        role: 'assistant',
        content: `Chat cleared! How can I assist with your Data Science studies?`,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const handleCopyMessage = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const suggestionChips = [
    'Explain the Bias-Variance tradeoff with a diagram-like example',
    'Write a SQL query to compute a 7-day rolling revenue average',
    'How does Backpropagation calculate derivatives with the Chain Rule?',
    'Explain P-value, Alpha level, and Type I vs Type II errors',
    'Compare Random Forest vs Gradient Boosting (XGBoost)',
    'When to use Min-Max scaling vs Standard Z-score scaling?'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-16 flex flex-col h-[calc(100vh-8.5rem)]">
      {/* 1. Chat Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Data Science AI Study Assistant
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                Gemini 2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Real-time academic assistance for algorithms, statistics, SQL & coding.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* 2. Messages Viewport */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                }`}
              >
                {/* Copy Button */}
                {!isUser && (
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition rounded"
                    title="Copy text"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}

                <div className="prose prose-xs dark:prose-invert max-w-none break-words">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>

                {/* Interactive Retry Button for errors */}
                {msg.id.startsWith('err-') && (
                  <div className="mt-3 pt-2 border-t border-rose-200/50 dark:border-rose-800/50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        const lastUser = [...messages].reverse().find((m) => m.role === 'user');
                        if (lastUser) {
                          handleSendMessage(lastUser.content);
                        }
                      }}
                      disabled={isLoading}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900/90 text-rose-700 dark:text-rose-300 font-semibold rounded-lg text-xs transition cursor-pointer disabled:opacity-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                    <span className="text-[11px] text-slate-400">Temporary network spike</span>
                  </div>
                )}

                <div
                  className={`mt-2 text-[10px] text-right ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center space-x-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-slate-400 ml-1">Analyzing with Gemini...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Suggestion Prompt Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 whitespace-nowrap transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <span className="mr-1">✨</span>
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* 4. Input Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about Python, SQL, Statistics, ML algorithms, Calculus..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-purple-500/20 transition disabled:opacity-40 cursor-pointer"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
