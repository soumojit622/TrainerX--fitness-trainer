"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "#" },
        {
            name: "Features",
            href: "#",
            dropdown: [
                { name: "AI Training", href: "#" },
                { name: "Progress Tracking", href: "#" },
                { name: "Nutrition Plans", href: "#" },
            ],
        },
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#" },
        { name: "FAQ", href: "#" },
    ]

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? "backdrop-blur-xl bg-black/90 border-b border-cyan-950/60 py-2 shadow-lg shadow-cyan-900/10"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 group">
                            <span className="text-xl font-bold text-white flex items-center">
                                <span className="relative">
                                    <span className="absolute -inset-1 bg-cyan-500/20 blur-md rounded-full group-hover:bg-cyan-500/30 transition-all duration-300"></span>
                                    <span className="relative">Trainer</span>
                                </span>
                                <span className="text-cyan-500 relative">
                                    <span className="absolute -inset-1 bg-cyan-500/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                    <span className="relative">X</span>
                                </span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(link.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-cyan-500 transition-colors text-sm font-medium relative group flex items-center"
                                    >
                                        {link.name}
                                        {link.dropdown && (
                                            <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                                        )}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>

                                    {link.dropdown && (
                                        <div
                                            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-gray-900/95 backdrop-blur-lg rounded-md shadow-lg border border-cyan-950/60 overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                                        >
                                            <div className="py-1">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-900/30 hover:text-cyan-400 transition-colors items-center"
                                                    >
                                                        <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link href="#" className="relative group overflow-hidden">
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-cyan-500 rounded-md opacity-0 group-hover:opacity-100"></span>
                                <span className="relative z-10 flex items-center justify-center border border-cyan-500 text-cyan-500 group-hover:text-black transition-colors px-5 py-2 rounded-md text-sm font-medium">
                                    Get Started
                                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none relative"
                        >
                            <span className="absolute -inset-2 bg-cyan-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-cyan-950 transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link
                                href={link.href}
                                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-500 hover:bg-gray-800/50 rounded-md transition-all items-center justify-between"
                                onClick={() => !link.dropdown && setIsMenuOpen(false)}
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown className="h-4 w-4" />}
                            </Link>

                            {link.dropdown && (
                                <div className="pl-4 space-y-1 mt-1">
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block px-3 py-2 text-sm font-medium text-gray-400 hover:text-cyan-500 hover:bg-gray-800/30 rounded-md transition-all"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-900 mr-2"></span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="#"
                        className="block px-3 py-2 mt-4 text-base font-medium text-center border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    )
}
