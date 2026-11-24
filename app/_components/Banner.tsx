'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Download, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        if (!isResumeOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsResumeOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isResumeOpen]);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <>
            <section className="relative overflow-hidden" id="banner">
                <ArrowAnimation />
                <div
                    className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                    ref={containerRef}
                >
                    <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                        <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                            <span className="text-primary">
                                SOFTWARE ENGINEER
                            </span>
                            <br /> <span className="ml-4">& DESIGNER</span>
                        </h1>
                        <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                            Hi! I&apos;m{' '}
                            <span className="font-medium text-foreground">
                                Ans
                            </span>
                            . Innovative Software Engineer and UX Designer with
                            hands-on experience in Machine learning, automation,
                            and full-stack development.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-9 slide-up-and-fade banner-button">
                            <Button
                                as="link"
                                href="/contact"
                                variant="primary"
                            >
                                Contact Me
                            </Button>
                            <Button
                                as="link"
                                href="/start-project"
                                variant="secondary"
                            >
                                Start a Project
                            </Button>
                            <Button
                                as="link"
                                href="/collaborate"
                                variant="dark"
                            >
                                Collaborate with Me
                            </Button>
                            <Button
                                as="button"
                                type="button"
                                onClick={() => setIsResumeOpen(true)}
                                variant="dark"
                            >
                                View Resume
                            </Button>
                        </div>
                    </div>

                    <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                        <div className="slide-up-and-fade">
                            <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                                4+
                            </h5>
                            <p className="text-muted-foreground">
                                Years of Experience
                            </p>
                        </div>
                        <div className="slide-up-and-fade">
                            <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                                17+
                            </h5>
                            <p className="text-muted-foreground">
                                Completed Projects
                            </p>
                        </div>
                        <div className="slide-up-and-fade">
                            <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                                20k+
                            </h5>
                            <p className="text-muted-foreground">
                                Hours Worked
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Page Resume Modal */}
            {isResumeOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setIsResumeOpen(false)}
                >
                    <div
                        className="relative max-w-5xl w-full flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-4 text-white">
                            <h4 className="text-base sm:text-lg font-anton tracking-wide">
                                Ans Ahmed Khan — Resume
                            </h4>
                            <div className="flex items-center gap-3 shrink-0">
                                <a
                                    href="/Ans_Ahmed_Khan_Resume.pdf"
                                    download="Ans_Ahmed_Khan_Resume.pdf"
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Download size={14} />
                                    Download Resume
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsResumeOpen(false)}
                                    className="text-white hover:text-primary transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={28} />
                                </button>
                            </div>
                        </div>

                        <iframe
                            src="/Ans_Ahmed_Khan_Resume.pdf"
                            title="Ans Ahmed Khan Resume"
                            className="w-full h-[80vh] rounded-xl shadow-2xl bg-white border border-border"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Banner;
