'use client';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const SERVICE_ID = 'service_3uw96ty';
const TEMPLATE_ID = 'template_zkbx94y';
const PUBLIC_KEY = 'saYbKWFWHtzz84ryl';

const PROJECT_TYPES = ['Web App', 'AI Tool', 'Mobile App', 'Automation', 'Other'];
const TECH_PREFS = ['Python', 'JavaScript', 'AI/ML', 'No Preference'];
const COMPLEXITIES = ['Basic', 'Intermediate', 'Advanced'];
const TIMELINES = ['Quick', 'Flexible'];
const BUDGETS = ['Small', 'Medium', 'Large', 'Not Sure'];
const DESIGNS = ['Have Mockups', 'Need Design', 'Redesign', 'Other'];

const StartProjectPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    
    // User info state
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    
    // Selections state
    const [selections, setSelections] = useState({
        projectType: '',
        techPref: '',
        complexity: '',
        timeline: '',
        budget: '',
        design: '',
        notes: ''
    });

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.fromTo('.page-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
              .fromTo('.page-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
              .fromTo('.step-block', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.2');
        },
        { scope: containerRef },
    );

    const handleSelection = (category: keyof typeof selections, value: string) => {
        setSelections(prev => ({ ...prev, [category]: value }));
    };

    const handleSuggestIdea = () => {
        setSelections({
            projectType: 'Suggest an Idea',
            techPref: 'No Preference',
            complexity: 'Flexible',
            timeline: 'Flexible',
            budget: 'Not Sure',
            design: 'Need Design',
            notes: 'I am not sure exactly what I want to build yet. Please suggest an idea!'
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const projectDetails = `
Project Type: ${selections.projectType || 'Not specified'}
Tech Preference: ${selections.techPref || 'Not specified'}
Complexity: ${selections.complexity || 'Not specified'}
Timeline: ${selections.timeline || 'Not specified'}
Budget: ${selections.budget || 'Not specified'}
Design Assets: ${selections.design || 'Not specified'}
Additional Notes: ${selections.notes}
        `.trim();

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: 'N/A', // Not collected on this page, but needed for template?
                    reason: 'Project Build Request - ' + (selections.projectType || 'Generic'),
                    projectDetails: projectDetails,
                },
                PUBLIC_KEY,
            );

            alert('Awesome! Your project request has been sent. I will review it and get back to you soon.');
            setSelections({ projectType: '', techPref: '', complexity: '', timeline: '', budget: '', design: '', notes: '' });
            setUserInfo({ name: '', email: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const renderChips = (options: string[], category: keyof typeof selections) => (
        <div className="flex flex-wrap gap-3 mt-4">
            {options.map(option => (
                <button
                    type="button"
                    key={option}
                    onClick={() => handleSelection(category, option)}
                    className={cn(
                        "px-4 py-2 border rounded-full text-sm transition-all duration-200",
                        selections[category] === option 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "bg-secondary/10 border-border/50 text-foreground/80 hover:border-primary/50"
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );

    return (
        <section className="min-h-screen pt-28 pb-10 container" ref={containerRef}>
            <div className="mb-8 page-title opacity-0 flex justify-between items-center sm:flex-row flex-col gap-4">
                <Button as="link" href="/" variant="secondary" className="pl-4 pr-6 h-10 text-base self-start sm:self-auto">
                    ← Back to Home
                </Button>
                <button 
                    onClick={handleSuggestIdea}
                    className="text-primary hover:underline text-sm font-medium pr-5 pb-2"
                >
                    Not sure? Suggest me an idea 💡
                </button>
            </div>

            <div className="page-title opacity-0">
                <SectionTitle title="Start a Project" />
            </div>

            <div className="max-w-3xl mx-auto mt-6">
                <p className="page-desc opacity-0 text-muted-foreground mb-10 text-lg leading-relaxed">
                    Let's build something awesome together. Use the quick selector below to define your project needs, and I'll get back to you with a tailored plan.
                </p>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">1. What type of project is this?</h3>
                        {renderChips(PROJECT_TYPES, 'projectType')}
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">2. Any tech preference?</h3>
                        {renderChips(TECH_PREFS, 'techPref')}
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">3. Expected complexity</h3>
                        {renderChips(COMPLEXITIES, 'complexity')}
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">4. Timeline preference</h3>
                        {renderChips(TIMELINES, 'timeline')}
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">5. Project Scope</h3>
                        {renderChips(BUDGETS, 'budget')}
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide">6. Do you have mockups or wireframes?</h3>
                        {renderChips(DESIGNS, 'design')}
                    </div>
                    
                    <div className="step-block opacity-0 border-t border-border/50 pt-8 mt-8 grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80">Name</label>
                            <input
                                type="text"
                                value={userInfo.name}
                                onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                                required
                                className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80">Email Address</label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                                required
                                className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>

                    <div className="step-block opacity-0">
                        <h3 className="text-xl font-medium font-anton tracking-wide mb-3">Anything else I should know? (Optional)</h3>
                        <textarea
                            value={selections.notes}
                            onChange={(e) => handleSelection('notes', e.target.value)}
                            rows={3}
                            className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all resize-none"
                            placeholder="Add brief notes here..."
                        ></textarea>
                    </div>

                    <div className="step-block opacity-0 pt-4">
                        <Button
                            as="button"
                            type="submit"
                            variant="primary"
                            className="w-full md:w-auto min-w-[250px]"
                            disabled={loading || !userInfo.name || !userInfo.email}
                            loading={loading}
                        >
                            {loading ? 'Sending Request...' : 'Generate Idea / Request Build'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default StartProjectPage;
