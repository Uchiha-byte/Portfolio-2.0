'use client';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { Mail, Phone, User, Briefcase, FileText } from 'lucide-react';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SERVICE_ID = 'service_3uw96ty';
const TEMPLATE_ID = 'template_zkbx94y';
const PUBLIC_KEY = 'saYbKWFWHtzz84ryl';

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        reason: '',
        projectDetails: '',
    });

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.fromTo(
                '.contact-title',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
            )
                .fromTo(
                    '.contact-desc',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.4',
                )
                .fromTo(
                    '.form-item',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                    '-=0.2',
                );
        },
        { scope: containerRef },
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation removed as keys are now hardcoded


        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    reason: formData.reason,
                    projectDetails: formData.projectDetails,
                },
                PUBLIC_KEY,
            );

            alert('Thank you! Your message has been sent successfully.');
            setFormData({
                name: '',
                phone: '',
                email: '',
                reason: '',
                projectDetails: '',
            });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="min-h-screen pt-28 pb-10 container"
            ref={containerRef}
        >
            <div className="mb-8 contact-title opacity-0">
                <Button
                    as="link"
                    href="/"
                    variant="secondary"
                    className="pl-4 pr-6 h-10 text-base"
                >
                    ← Back to Home
                </Button>
            </div>

            <div className="contact-title opacity-0">
                <SectionTitle title="Hire Me" />
            </div>

            <div className="max-w-2xl mx-auto">
                <p className="contact-desc opacity-0 text-muted-foreground mb-10 text-lg leading-relaxed">
                    Interested in working together? Fill out the form below with
                    some info about your project and I will get back to you as
                    soon as possible.
                </p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 form-item opacity-0">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                            >
                                <User size={16} className="text-primary" /> Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="space-y-2 form-item opacity-0">
                            <label
                                htmlFor="phone"
                                className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                            >
                                <Phone size={16} className="text-primary" />{' '}
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 form-item opacity-0">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                        >
                            <Mail size={16} className="text-primary" /> Email
                            Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                            placeholder="Enter E-mail"
                        />
                    </div>

                    <div className="space-y-2 form-item opacity-0">
                        <label
                            htmlFor="reason"
                            className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                        >
                            <Briefcase size={16} className="text-primary" /> Why
                            do you want to hire me?
                        </label>
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                            placeholder="e.g. Full Stack Development, AI Integration..."
                        />
                    </div>

                    <div className="space-y-2 form-item opacity-0">
                        <label
                            htmlFor="projectDetails"
                            className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                        >
                            <FileText size={16} className="text-primary" />{' '}
                            Project Details
                        </label>
                        <textarea
                            id="projectDetails"
                            name="projectDetails"
                            value={formData.projectDetails}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-secondary/10 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50"
                            placeholder="Tell me about your project goals, timeline, and requirements..."
                        ></textarea>
                    </div>

                    <div className="pt-4 form-item opacity-0">
                        <Button
                            as="button"
                            type="submit"
                            variant="primary"
                            className="w-full md:w-auto min-w-[200px]"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
