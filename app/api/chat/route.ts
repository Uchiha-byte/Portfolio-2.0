import { NextResponse } from 'next/server';
import { SYSTEM_CONTEXT_PROMPT } from '@/lib/aiContext';

const CANDIDATE_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === 'user')?.content || '';
        const apiKey = process.env.GEMINI_API_KEY;

        // Step 1: Combine stored Ans context + User question into clean prompt template
        const combinedPrompt = `
CONTEXT ABOUT ANS AHMED KHAN:
${SYSTEM_CONTEXT_PROMPT}

USER QUESTION: "${lastUserMessage}"

RESPONSE RULES:
- Use the stored context about Ans above to answer the user's question accurately.
- Keep your answer short, simple, and human-friendly (1 to 2 sentences MAX).
- Talk naturally like a human team member. Do NOT use AI buzzwords, bullet lists, or generic intros.
`;

        // Step 2: Send Context + Question to Gemini API
        if (apiKey && apiKey.trim() !== '') {
            for (const model of CANDIDATE_MODELS) {
                try {
                    const response = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        role: 'user',
                                        parts: [{ text: combinedPrompt }],
                                    },
                                ],
                                generationConfig: {
                                    temperature: 0.3,
                                    maxOutputTokens: 200,
                                },
                            }),
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (reply && reply.trim()) {
                            return NextResponse.json({ reply: reply.trim() });
                        }
                    }
                } catch {
                    // Continue to next model if endpoint error occurs
                }
            }
        }

        // Step 3: Smart Fallback (when API key is missing or quota is reached)
        const query = lastUserMessage.toLowerCase();
        let fallbackReply = '';

        if (query.includes('multi-agent') || query.includes('agent')) {
            fallbackReply = `Ans has built production multi-agent systems like BlitzAI (Google x Kaggle Capstone), where he designed a coordinator agent that dynamically routes queries across specialized ML agents.`;
        } else if (query.includes('freelance') || query.includes('full-time') || query.includes('hire') || query.includes('available') || query.includes('job') || query.includes('work')) {
            fallbackReply = `Yes, Ans is actively open for full-time AI/ML & full-stack engineering roles, remote positions, and select freelance projects! You can reach him directly at uchihabyte.git@gmail.com.`;
        } else if (query.includes('hiresense')) {
            fallbackReply = `HireSense v2.0 is an AI truth engine for hiring. It cross-validates candidate digital profiles (LinkedIn, GitHub, LeetCode) and automates Zoom reference calls using Next.js 15, FastAPI, Groq/LLaMA, and ElevenLabs.`;
        } else if (query.includes('blitzai') || query.includes('blitz')) {
            fallbackReply = `BlitzAI is a multi-agent competition assistant Ans architected using Google Gemini API for the Google x Kaggle Capstone project.`;
        } else if (query.includes('truthscan') || query.includes('deepfake')) {
            fallbackReply = `TruthScan is a content verification platform built with Flask, BERT, and CNNs to detect text, image, and video deepfakes in real-time.`;
        } else if (query.includes('mednexus')) {
            fallbackReply = `MedNexus is an AI disease diagnosis app built with Streamlit that combines ML prediction models with Google Gemini for medical report analysis.`;
        } else if (query.includes('rag')) {
            fallbackReply = `Ans built a Retrieval-Augmented Generation (RAG) system using Python, LangChain, and vector databases for smart document querying.`;
        } else if (query.includes('project')) {
            fallbackReply = `Ans's top projects are HireSense v2.0 (AI hiring verification engine), BlitzAI (multi-agent competition assistant), TruthScan (deepfake detection), and MedNexus (disease prediction).`;
        } else if (query.includes('stack') || query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('framework')) {
            fallbackReply = `Ans's core stack includes Python, Next.js, React, TypeScript, FastAPI, Flask, PyTorch, Google Gemini API, PostgreSQL (Supabase), and Tailwind CSS.`;
        } else if (query.includes('experience') || query.includes('intern') || query.includes('company')) {
            fallbackReply = `Ans worked as a Machine Learning Intern at SystemTron (Jan–Mar 2025) and serves as a core organizer for hands-on AI workshops at NexGen Coders Club.`;
        } else if (query.includes('certif') || query.includes('coursera') || query.includes('google')) {
            fallbackReply = `Ans is Google Technical Support Fundamentals certified and holds recognitions from MumbaiHacks 2025 and NexGen Coders Club.`;
        } else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('linkedin') || query.includes('github')) {
            fallbackReply = `You can email Ans directly at uchihabyte.git@gmail.com, or check out his work on GitHub (@Uchiha-byte) and LinkedIn!`;
        } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            fallbackReply = `Hey there! I'm Ans's personal AI assistant. What would you like to know about his projects, skills, or availability?`;
        } else {
            fallbackReply = `Ans is an AI/ML Engineer & Full-Stack Developer specializing in Multi-Agent systems, Next.js, and FastAPI. Ask me anything about his projects, tech stack, or how to get in touch!`;
        }

        return NextResponse.json({ reply: fallbackReply });
    } catch (error) {
        console.error('Chat endpoint unexpected error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}
