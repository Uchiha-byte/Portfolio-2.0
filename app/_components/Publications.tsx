'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_PUBLICATIONS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { FileText, Eye, X, Download } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Publication {
    title: string;
    pdfUrl: string;
}

const Publications = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePaper, setActivePaper] = useState<Publication | null>(null);

    useEffect(() => {
        if (!activePaper) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActivePaper(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePaper]);

    useGSAP(
        () => {
            gsap.fromTo(
                '.publication-item',
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: 'power2.out',
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <>
            <section id="publications">
                <div className="container" ref={containerRef}>
                    <SectionTitle title="Research & Publications" />

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        {MY_PUBLICATIONS.map((pub, index) => (
                            <div
                                key={index}
                                className="publication-item group relative border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col"
                                style={{
                                    backgroundColor:
                                        'hsl(var(--background-light))',
                                }}
                            >
                                {/* Paper Preview Window */}
                                <button
                                    type="button"
                                    onClick={() => setActivePaper(pub)}
                                    className="relative w-full overflow-hidden bg-black/40 block cursor-pointer text-left"
                                    style={{ height: '180px' }}
                                    aria-label={`Preview ${pub.title}`}
                                >
                                    <iframe
                                        src={`${pub.pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                                        title={`${pub.title} preview`}
                                        className="w-full h-[260px] border-0 pointer-events-none select-none bg-white opacity-90 group-hover:scale-105 transition-transform duration-500 origin-top"
                                        tabIndex={-1}
                                        loading="lazy"
                                    />
                                    <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white bg-primary/80 px-3 py-1 rounded-full">
                                            View Paper
                                        </span>
                                    </span>
                                </button>

                                {/* Card Body */}
                                <div className="flex flex-col gap-3 p-5 flex-1">
                                    {/* Icon + Label */}
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                                            <FileText size={18} />
                                        </span>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest leading-tight">
                                            Research Paper
                                        </p>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-anton leading-tight group-hover:text-primary transition-colors duration-300">
                                        {pub.title}
                                    </h3>

                                    {/* Spacer */}
                                    <div className="flex-1" />

                                    {/* Footer */}
                                    <div className="flex items-center justify-end mt-auto pt-3 border-t border-border">
                                        <button
                                            type="button"
                                            onClick={() => setActivePaper(pub)}
                                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                        >
                                            View Paper
                                            <Eye size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Left border accent */}
                                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* In-Page PDF Lightbox Modal */}
            {activePaper && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setActivePaper(null)}
                >
                    <div
                        className="relative max-w-5xl w-full flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-4 text-white">
                            <h4 className="text-base sm:text-lg font-anton tracking-wide truncate">
                                {activePaper.title}
                            </h4>
                            <div className="flex items-center gap-3 shrink-0">
                                <a
                                    href={activePaper.pdfUrl}
                                    download
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Download size={14} />
                                    Download
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setActivePaper(null)}
                                    className="text-white hover:text-primary transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={28} />
                                </button>
                            </div>
                        </div>

                        <iframe
                            src={activePaper.pdfUrl}
                            title={activePaper.title}
                            className="w-full h-[80vh] rounded-xl shadow-2xl bg-white border border-border"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Publications;
