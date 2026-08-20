import React, { useState } from 'react';
import { Check, Copy, Play, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  expectedOutput?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  expectedOutput
}) => {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 600);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md my-4">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono uppercase tracking-wider text-slate-400 font-semibold ml-2">
            {language}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {expectedOutput && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-md transition font-medium cursor-pointer shadow-sm active:scale-95 disabled:opacity-50 text-xs"
              title="Run code in interactive simulator"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition font-mono text-xs cursor-pointer active:scale-95"
            title="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewport with Line Numbers */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="text-slate-500 text-right pr-4 select-none w-8 text-xs font-mono">
                  {idx + 1}
                </td>
                <td className="text-slate-100 whitespace-pre font-mono">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simulated Output Terminal */}
      {showOutput && expectedOutput && (
        <div className="border-t border-slate-700 bg-slate-950 p-3.5 text-xs font-mono text-slate-200">
          <div className="flex items-center space-x-2 text-emerald-400 mb-2 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>Interactive Terminal Output</span>
          </div>
          <pre className="text-slate-300 whitespace-pre-wrap pl-2 border-l-2 border-emerald-500/70 bg-slate-900/60 p-2.5 rounded">
            {expectedOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
