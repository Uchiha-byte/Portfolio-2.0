'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, RefreshCw, User, MessageSquare } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const QUICK_PROMPTS = [
    "What is Ans's experience with Multi-Agent systems?",
    "Is Ans open for freelance or full-time roles?",
    "Tell me about HireSense v2.0 & BlitzAI",
    "What is Ans's core tech stack?",
];

export default function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "👋 Hi! I'm **Ans AI Bot**, Ans Ahmed Khan's personal AI assistant. Ask me anything about Ans's AI/ML engineering experience, full-stack projects, tech stack, or availability!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    const handleSendMessage = async (textToSend?: string) => {
        const messageText = textToSend || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        if (!textToSend) setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await response.json();
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply || "I'm sorry, I couldn't process that request right now.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error asking AI Assistant:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '⚠️ Oops! Something went wrong connecting to the AI service. Please try again.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Chat reset! How else can I help you learn more about Ans Ahmed Khan?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
    };

    // Formats text into basic markdown bold and list display
    const renderFormattedText = (text: string) => {
        return text.split('\n').map((paragraph, pIdx) => {
            if (!paragraph.trim()) return <div key={pIdx} className="h-2" />;

            const formattedParts = paragraph.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={idx} className="font-semibold text-white">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                return part;
            });

            return (
                <p key={pIdx} className="mb-1.5 last:mb-0 leading-relaxed text-sm">
                    {formattedParts}
                </p>
            );
        });
    };

    return (
        <>
            {/* Floating Action Launcher Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-[#0047AB] hover:bg-[#003888] text-white p-3.5 rounded-full shadow-[0_0_25px_rgba(0,71,171,0.5)] border border-[#3380D4]/40 hover:scale-105 transition-all duration-300 ease-out active:scale-95"
                    aria-label="Open Ans AI Assistant"
                >
                    <div className="relative">
                        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-300"></span>
                        </span>
                    </div>
                    <span className="font-medium text-sm text-white pr-1 group-hover:max-w-xs max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                        Ask Ans AI Bot
                    </span>
                </button>
            )}

            {/* Chatbot Window / Drawer */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-40 w-[92vw] sm:w-[410px] h-[570px] max-h-[85vh] bg-[#161616]/95 backdrop-blur-xl border border-[#333333] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,71,171,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-5 duration-300 ease-out font-roboto-flex">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#1a1a1a] via-[#222222] to-[#1a1a1a] border-b border-[#333333]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#262626] border border-[#383838] shadow-inner">
                                <Bot className="w-5 h-5 text-[#3380D4] animate-pulse" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-white text-base tracking-wide">Ans AI Bot</h3>
                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#0047AB]/20 text-[#3380D4] border border-[#0047AB]/40 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3380D4] animate-ping"></span>
                                        Online
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                    <Sparkles className="w-3 h-3 text-[#3380D4] inline" /> Portfolio AI Representative
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:rotate-180"
                                title="Clear chat history"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                title="Close Assistant"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent bg-[#121212] scroll-smooth">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out ${
                                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-lg bg-[#242424] border border-[#383838] flex items-center justify-center text-[#3380D4] shrink-0 mt-0.5 shadow-sm">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[84%] rounded-2xl px-4 py-2.5 transition-all duration-200 ${
                                        msg.role === 'user'
                                            ? 'bg-[#0047AB] text-white rounded-br-none shadow-[0_4px_12px_rgba(0,71,171,0.3)]'
                                            : 'bg-[#222222] border border-[#363636] text-gray-200 rounded-bl-none shadow-sm'
                                    }`}
                                >
                                    {renderFormattedText(msg.content)}
                                    <span
                                        className={`block text-[10px] mt-1 text-right ${
                                            msg.role === 'user' ? 'text-blue-100/70' : 'text-gray-500'
                                        }`}
                                    >
                                        {msg.timestamp}
                                    </span>
                                </div>

                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 rounded-lg bg-[#242424] border border-[#383838] flex items-center justify-center text-gray-300 shrink-0 mt-0.5 shadow-sm">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-2.5 justify-start animate-in fade-in duration-200">
                                <div className="w-7 h-7 rounded-lg bg-[#242424] border border-[#383838] flex items-center justify-center text-[#3380D4] shrink-0">
                                    <Bot className="w-4 h-4 animate-spin" />
                                </div>
                                <div className="bg-[#222222] border border-[#363636] rounded-2xl rounded-bl-none px-4 py-3 text-gray-400 flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#3380D4] animate-bounce"></span>
                                    <span className="w-2 h-2 rounded-full bg-[#3380D4] animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-2 h-2 rounded-full bg-[#3380D4] animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Prompts Chips */}
                    {messages.length < 5 && (
                        <div className="px-3 py-2.5 bg-[#181818] border-t border-[#2a2a2a] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                            {QUICK_PROMPTS.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(prompt)}
                                    className="text-xs bg-[#242424] hover:bg-[#0047AB] text-gray-300 hover:text-white border border-[#383838] hover:border-[#3380D4] rounded-full px-3 py-1.5 transition-all duration-200 active:scale-95 shrink-0 flex items-center gap-1.5 shadow-sm"
                                >
                                    <Sparkles className="w-3 h-3 text-[#3380D4]" />
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Bar */}
                    <div className="p-3 bg-[#181818] border-t border-[#2a2a2a] flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Ans AI Bot anything..."
                            className="flex-1 bg-[#222222] text-white text-sm placeholder-gray-500 rounded-xl px-4 py-2.5 border border-[#363636] focus:outline-none focus:border-[#3380D4] transition-all duration-200"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!input.trim() || isLoading}
                            className="p-2.5 rounded-xl bg-[#0047AB] hover:bg-[#003888] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 group"
                        >
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
