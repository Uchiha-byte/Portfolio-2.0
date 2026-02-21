'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_CERTIFICATES } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import { ExternalLink, Award, X } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Certificates = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.certificate-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <>
            <section className="py-section" id="certificates">
                <div className="container" ref={containerRef}>
                    <SectionTitle title="Certificates" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {MY_CERTIFICATES.map((cert, index) => (
                            <div
                                key={index}
                                className="certificate-item group relative border border-border rounded-xl overflow-hidden bg-background-light hover:border-primary transition-all duration-300 flex flex-col"
                            >
                                {/* Certificate Image Preview */}
                                {cert.image && (
                                    <button
                                        onClick={() => setLightboxSrc(cert.image)}
                                        className="relative w-full h-48 overflow-hidden bg-black/40 block cursor-pointer"
                                        aria-label={`View ${cert.title} certificate`}
                                    >
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                        {/* Hover overlay */}
                                        <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-xs font-medium text-white bg-primary/80 px-3 py-1 rounded-full">
                                                View Certificate
                                            </span>
                                        </span>
                                    </button>
                                )}

                                {/* Card body */}
                                <div className="flex flex-col gap-3 p-5 flex-1">
                                    {/* Icon + Issuer */}
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                                            <Award size={18} />
                                        </span>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-anton leading-tight group-hover:text-primary transition-colors duration-300">
                                        {cert.title}
                                    </h3>

                                    {/* Description */}
                                    {cert.description && (
                                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                            {cert.description}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                                        <span className="text-sm text-muted-foreground">
                                            {cert.date}
                                        </span>
                                        {cert.credentialUrl && cert.credentialUrl !== '#' && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                            >
                                                View Credential
                                                <ExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Left border accent */}
                                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setLightboxSrc(null)}
                >
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setLightboxSrc(null)}
                            className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
                            aria-label="Close"
                        >
                            <X size={28} />
                        </button>
                        <Image
                            src={lightboxSrc}
                            alt="Certificate"
                            width={800}
                            height={560}
                            className="w-full rounded-xl shadow-2xl"
                            unoptimized
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Certificates;
