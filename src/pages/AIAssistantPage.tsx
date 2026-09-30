import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import {
  Bot,
  Sparkles,
  Send,
  Trash2,
  Lightbulb,
  ShieldCheck,
  User,
} from 'lucide-react';


export const AIAssistantPage: React.FC = () => {
  const { chatMessages, sendChatMessage, clearChat, user, formatCurrency } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const query = input;
    setInput('');
    setIsTyping(true);
    sendChatMessage(query);

    setTimeout(() => {
      setIsTyping(false);
    }, 650);
  };

  const handlePromptClick = (promptText: string) => {
    setIsTyping(true);
    sendChatMessage(promptText);
    setTimeout(() => {
      setIsTyping(false);
    }, 650);
  };

  const quickSuggestionButtons = [

    'Analyze my spending',
    'Create my budget',
    'Help me save money',
    'Find unnecessary expenses',
    'Give me a savings plan',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col h-screen max-w-6xl mx-auto overflow-hidden">
        {/* HEADER */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 mb-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-white">PocketSmart AI Assistant</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Context-aware AI financial recommendations based on your current budget ({formatCurrency(user.monthlyIncome)} Income).
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>

        {/* CHAT MESSAGES SCROLL AREA */}
        <div className="flex-1 glass-panel rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-y-auto space-y-6 mb-4">
          {chatMessages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-md ${
                    isAI
                      ? 'bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white'
                      : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className="space-y-3 min-w-0">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAI
                        ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                        : 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/20 shadow-md font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <span className="block text-[10px] text-slate-400 mt-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Dynamic Suggestion Chips attached to AI message */}
                  {isAI && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePromptClick(sug)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-semibold text-indigo-300 hover:border-indigo-500/50 hover:bg-slate-800 transition-all text-left"
                        >
                          💬 {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3 mr-auto max-w-md">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                PocketSmart AI is analyzing your financial records...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK SUGGESTION BUTTONS */}
        <div className="mb-3 space-y-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Quick AI Prompt Actions:
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {quickSuggestionButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handlePromptClick(btn)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800 transition-all shrink-0"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleSend} className="relative mb-3 shrink-0">
          <input
            type="text"
            placeholder="Ask AI anything (e.g. Can I afford a ₹20,000 phone? How can I save ₹5,000?)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* LEGAL DISCLAIMER */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>
            AI recommendations are for educational and planning purposes and are not professional financial advice.
          </span>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};
