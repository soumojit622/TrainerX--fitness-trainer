"use client"

import { useState, useEffect } from "react"
import { Clock, Dumbbell, Flame, ChevronRight, Star, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

export default function WorkoutPrograms() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [hoveredProgram, setHoveredProgram] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        const element = document.getElementById("workout-programs-section")
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [])

    const categories = [
        { id: "all", name: "All Programs" },
        { id: "strength", name: "Strength" },
        { id: "hiit", name: "HIIT" },
        { id: "cardio", name: "Cardio" },
        { id: "yoga", name: "Yoga" },
    ]

    const programs = [
        {
            id: 1,
            title: "Ultimate Strength Builder",
            category: "strength",
            level: "Intermediate",
            duration: "8 weeks",
            sessions: "4-5 per week",
            calories: "500-700 per session",
            rating: 4.9,
            reviews: 342,
            image: "strength-builder",
            popular: true,
        },
        {
            id: 2,
            title: "HIIT Fat Burner",
            category: "hiit",
            level: "All Levels",
            duration: "6 weeks",
            sessions: "3-4 per week",
            calories: "400-600 per session",
            rating: 4.8,
            reviews: 287,
            image: "hiit-burner",
            popular: true,
        },
        {
            id: 3,
            title: "Endurance Runner",
            category: "cardio",
            level: "Beginner to Advanced",
            duration: "12 weeks",
            sessions: "3-5 per week",
            calories: "300-800 per session",
            rating: 4.7,
            reviews: 215,
            image: "endurance-runner",
            popular: false,
        },
        {
            id: 4,
            title: "Yoga Flow & Strength",
            category: "yoga",
            level: "All Levels",
            duration: "Ongoing",
            sessions: "3-7 per week",
            calories: "200-400 per session",
            rating: 4.9,
            reviews: 178,
            image: "yoga-flow",
            popular: false,
        },
    ]

    const filteredPrograms =
        activeCategory === "all" ? programs : programs.filter((program) => program.category === activeCategory)

    return (
        <div id="workout-programs-section" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
                        AI-Powered Programs
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Personalized{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                            Workout Programs
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Choose from our library of AI-optimized workout programs or let TrainerX create a custom plan just for you.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                                ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black"
                                : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPrograms.map((program, index) => (
                        <div
                            key={program.id}
                            className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 ${hoveredProgram === program.id ? "shadow-lg shadow-cyan-900/20 border-cyan-900/50 " : ""
                                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredProgram(program.id)}
                            onMouseLeave={() => setHoveredProgram(null)}
                        >
                            {/* Program Image */}
                            <div className="h-48 bg-gray-800 relative overflow-hidden">
                                {/* Placeholder for program image */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${program.category === "strength"
                                        ? "from-blue-900/30 to-cyan-900/30"
                                        : program.category === "hiit"
                                            ? "from-orange-900/30 to-red-900/30"
                                            : program.category === "cardio"
                                                ? "from-green-900/30 to-emerald-900/30"
                                                : "from-purple-900/30 to-pink-900/30"
                                        }`}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {program.category === "strength" && <Dumbbell className="h-16 w-16 text-cyan-500/40" />}
                                        {program.category === "hiit" && <Flame className="h-16 w-16 text-orange-500/40" />}
                                        {program.category === "cardio" && <BarChart3 className="h-16 w-16 text-green-500/40" />}
                                        {program.category === "yoga" && <Calendar className="h-16 w-16 text-purple-500/40" />}
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md">
                                    {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                                </div>

                                {/* Popular Badge */}
                                {program.popular && (
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black text-xs font-medium px-2 py-1 rounded-md">
                                        Popular
                                    </div>
                                )}
                            </div>

                            {/* Program Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold mb-2">{program.title}</h3>

                                <div className="flex items-center mb-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < Math.floor(program.rating) ? "text-cyan-500 fill-cyan-500" : "text-gray-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">
                                        {program.rating} ({program.reviews})
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Clock className="h-4 w-4 mr-2 text-cyan-500" />
                                        <span>{program.duration}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Calendar className="h-4 w-4 mr-2 text-cyan-500" />
                                        <span>{program.sessions}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Flame className="h-4 w-4 mr-2 text-cyan-500" />
                                        <span>{program.calories}</span>
                                    </div>
                                </div>

                                <Link
                                    href="#"
                                    className={`w-full flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${hoveredProgram === program.id
                                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-2 rounded-md transition-all duration-300 inline-flex items-center"
                                        : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-2 rounded-md transition-all duration-300 inline-flex items-center"
                                        }`}
                                >
                                    View Program
                                    <ChevronRight
                                        className={`h-4 w-4 ml-1 transition-transform ${hoveredProgram === program.id ? "translate-x-1" : ""
                                            }`}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Custom Program Card */}
                    <div
                        className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-dashed border-gray-700 transition-all duration-300 flex flex-col ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        style={{ transitionDelay: `${filteredPrograms.length * 100}ms` }}
                    >
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                                <svg
                                    className="w-8 h-8 text-cyan-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 5V19M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Create Custom Program</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Let our AI create a personalized program based on your goals, equipment, and schedule.
                            </p>
                            <Link
                                href="/generate-program"
                                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-2 rounded-md transition-all duration-300 inline-flex items-center"
                            >
                                Get Started
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* View All Link */}
                <div className="text-center mt-10">
                    <Link href="/generate-program" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 transition-colors group">
                        <span>View all workout programs</span>
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
