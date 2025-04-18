"use client"

import type React from "react"

import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function AdvancedFooter() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setEmail("")

            // Reset success message after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000)
        }, 1000)
    }

    const productLinks = [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Support", href: "#" },
        { name: "Testimonials", href: "#" },
    ]

    const resourceLinks = [
        { name: "Blog", href: "#" },
        { name: "Community", href: "#" },
        { name: "Workout Library", href: "#" },
        { name: "FAQ", href: "#" },
    ]

    const companyLinks = [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
    ]

    const socialLinks = [
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "GitHub", icon: Github, href: "#" },
    ]

    return (
        <footer className="bg-gray-950 border-t border-gray-800 relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4 group">
                            <span className="text-2xl font-bold text-white flex items-center">
                                <span className="relative">
                                    <span className="absolute -inset-1 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                    <span className="relative">Trainer</span>
                                </span>
                                <span className="text-cyan-500 relative">
                                    <span className="absolute -inset-1 bg-cyan-500/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                    <span className="relative">X</span>
                                </span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            TrainerX is revolutionizing fitness with AI-powered personal training that adapts to your body, goals, and
                            schedule in real-time.
                        </p>

                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-cyan-500 p-2 rounded-md transition-colors group relative"
                                    aria-label={link.name}
                                >
                                    <span className="absolute inset-0 bg-cyan-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <link.icon className="h-5 w-5 relative z-10" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center">
                            <span className="w-4 h-0.5 bg-cyan-500 mr-2"></span>
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-cyan-500 transition-colors group inline-flex items-center"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center">
                            <span className="w-4 h-0.5 bg-cyan-500 mr-2"></span>
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-cyan-500 transition-colors group inline-flex items-center"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center">
                            <span className="w-4 h-0.5 bg-cyan-500 mr-2"></span>
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-cyan-500 transition-colors group inline-flex items-center"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="max-w-md">
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center">
                            <span className="w-4 h-0.5 bg-cyan-500 mr-2"></span>
                            Subscribe to our newsletter
                        </h3>
                        <p className="text-gray-400 mb-4">Get the latest news and updates on AI fitness technology.</p>
                        <form className="flex gap-2" onSubmit={handleSubmit}>
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                                {isSubmitted && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center min-w-[100px]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : isSubmitted ? (
                                    "Subscribed!"
                                ) : (
                                    <>
                                        Subscribe
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} TrainerX. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
                        <p className="text-gray-500 text-sm">Designed for the future of fitness</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
