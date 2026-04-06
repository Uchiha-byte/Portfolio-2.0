'use client';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GitPullRequest, GitFork, GitMerge, FileCode2, ExternalLink, Clock, GitCommitHorizontal } from 'lucide-react';

const SERVICE_ID = 'service_3uw96ty';
const TEMPLATE_ID = 'template_zkbx94y';
const PUBLIC_KEY = 'saYbKWFWHtzz84ryl';

const GITHUB_USERNAME = 'Uchiha-byte';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    updated_at: string;
    language: string;
    latest_commit_msg?: string;
}

const CollaboratePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', interest: '' });

    const [repos, setRepos] = useState<Repo[]>([]);
    const [reposLoading, setReposLoading] = useState(true);

    const fetchRepos = useCallback(async () => {
        try {
            // Fetch repos sorted by recently updated
            const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
            if (!res.ok) throw new Error('Failed to fetch repositories');
            
            const data = await res.json();
            
            // Filter: only repos updated in the last 14 days, max 4 projects
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
            
            // Filter and slice 
            // Note: If no repos updated in last 14 days, we fallback to the 3 most recently updated ones to avoid an empty screen
            let activeRepos = data.filter((repo: any) => new Date(repo.updated_at) >= fourteenDaysAgo);
            if (activeRepos.length === 0) {
                activeRepos = data.slice(0, 3); 
            } else {
                activeRepos = activeRepos.slice(0, 4);
            }

            // Map and fetch latest commit message for each
            const enrichedRepos = await Promise.all(activeRepos.map(async (repo: any) => {
                let latestCommitMsg = 'No recent commits';
                try {
                    // Fetch commits for this repo
                    const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`);
                    if (commitRes.ok) {
                        const commitData = await commitRes.json();
                        if (commitData && commitData.length > 0) {
                            latestCommitMsg = commitData[0].commit.message.split('\n')[0]; // get short commit msg
                        }
                    }
                } catch (e) {
                    console.error("Could not fetch commits for " + repo.name);
                }

                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || 'No description provided.',
                    html_url: repo.html_url,
                    updated_at: repo.updated_at,
                    language: repo.language,
                    latest_commit_msg: latestCommitMsg
                } as Repo;
            }));

            setRepos(enrichedRepos);
        } catch (error) {
            console.error("GitHub API error:", error);
        } finally {
            setReposLoading(false);
        }
    }, []);

    // Initial fetch and polling interval (60 seconds)
    useEffect(() => {
        fetchRepos();
        const interval = setInterval(() => {
            fetchRepos();
        }, 60000); // 60 seconds
        return () => clearInterval(interval);
    }, [fetchRepos]);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.fromTo('.collab-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
              .fromTo('.collab-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
              .fromTo('.steps-section', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
              .fromTo('.form-section', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
        },
        { scope: containerRef },
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: 'N/A', // Not needed for collab
                    reason: 'Open Source Collaboration Request',
                    projectDetails: `I am interested in contributing to: ${formData.interest}`,
                },
                PUBLIC_KEY,
            );

            alert('Thanks for your interest! I will reach out to you shortly.');
            setFormData({ name: '', email: '', interest: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    };

    return (
        <section className="min-h-screen pt-28 pb-10 container" ref={containerRef}>
            <div className="mb-8 collab-title opacity-0">
                <Button as="link" href="/" variant="secondary" className="pl-4 pr-6 h-10 text-base">
                    ← Back to Home
                </Button>
            </div>

            <div className="collab-title opacity-0">
                <SectionTitle title="Collaborate with Me" />
            </div>

            <div className="max-w-4xl mx-auto mt-6">
                <p className="collab-desc opacity-0 text-muted-foreground mb-12 text-lg leading-relaxed flex items-center justify-between">
                    <span>
                        I believe in the power of open source and community-driven development. 
                        Below are my active repositories. Feel free to explore, fork, and contribute!
                    </span>
                    <span className="text-xs font-mono bg-secondary/20 text-primary px-3 py-1.5 rounded-full whitespace-nowrap animate-pulse ml-4 border border-primary/20 flex items-center gap-1.5 hidden sm:flex">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live Dashboard
                    </span>
                </p>

                {/* Active Repositories */}
                <div className="mb-16 min-h-[200px]">
                    {reposLoading && repos.length === 0 ? (
                        <div className="flex justify-center items-center h-48 opacity-50">
                            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 relative">
                            {repos.map((repo, idx) => (
                                <div key={repo.id} className="bg-secondary/10 border border-border/50 rounded-xl p-6 flex flex-col h-full hover:border-primary/50 transition-all shadow-sm">
                                    <h3 className="text-xl font-anton text-foreground mb-2 flex justify-between items-start">
                                        {repo.name}
                                        <span className="text-[10px] font-sans px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-md uppercase tracking-wider mt-1 whitespace-nowrap ml-2">Active</span>
                                    </h3>
                                    
                                    <p className="text-sm text-muted-foreground mb-5 flex-grow line-clamp-2">
                                        {repo.description}
                                    </p>
                                    
                                    <div className="bg-background-light rounded-lg p-3 mb-5 border border-border/30">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <Clock size={12} className="text-primary" />
                                            <span>Updated: <span className="text-foreground/80">{formatDate(repo.updated_at)}</span></span>
                                        </div>
                                        <div className="flex gap-2 text-xs text-muted-foreground">
                                            <GitCommitHorizontal size={12} className="text-primary shrink-0 mt-0.5" />
                                            <span className="line-clamp-2 italic" title={repo.latest_commit_msg}>"{repo.latest_commit_msg}"</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        {repo.language && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-primary shadow shadow-primary/30"></span>
                                                {repo.language}
                                            </span>
                                        )}
                                        
                                        <a 
                                            href={repo.html_url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors ml-auto"
                                        >
                                            View Repo <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contribution Steps */}
                <div className="steps-section opacity-0 bg-background-light border border-border rounded-xl p-8 mb-16">
                    <h3 className="text-2xl font-anton mb-8 text-center text-primary">How to Contribute</h3>
                    <div className="grid sm:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                                <GitFork size={28} />
                            </div>
                            <h4 className="font-medium mb-2">1. Fork</h4>
                            <p className="text-sm text-muted-foreground">Fork the repository to your own GitHub account.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                                <FileCode2 size={28} />
                            </div>
                            <h4 className="font-medium mb-2">2. Branch</h4>
                            <p className="text-sm text-muted-foreground">Create a feature branch from main.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                                <GitMerge size={28} />
                            </div>
                            <h4 className="font-medium mb-2">3. Commit</h4>
                            <p className="text-sm text-muted-foreground">Make your changes and push to your branch.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                                <GitPullRequest size={28} />
                            </div>
                            <h4 className="font-medium mb-2">4. PR</h4>
                            <p className="text-sm text-muted-foreground">Submit a pull request for review.</p>
                        </div>
                    </div>
                </div>

                {/* Collaboration Form */}
                <div className="form-section opacity-0">
                    <h3 className="text-2xl font-anton mb-6">Let's build together</h3>
                    <p className="text-muted-foreground mb-8">
                        Not sure where to start? Send me a quick message and I'll help you find a good first issue!
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                    placeholder="Your Email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80">Which project interests you?</label>
                            <input
                                type="text"
                                value={formData.interest}
                                onChange={e => setFormData({ ...formData, interest: e.target.value })}
                                required
                                className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                placeholder="e.g. A specific repo name or General Interest"
                            />
                        </div>

                        <Button
                            as="button"
                            type="submit"
                            variant="primary"
                            className="min-w-[200px]"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? 'Sending...' : 'I want to contribute'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CollaboratePage;
