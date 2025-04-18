"use client"

import { Brain, BarChartIcon as ChartBar, Clock, Dumbbell, Sparkles, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function FeatureGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

        const element = document.getElementById("feature-grid-section")
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [])

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Workouts",
            description: "Personalized routines that adapt to your progress and feedback in real-time.",
        },
        {
            icon: Zap,
            title: "Real-time Feedback",
            description: "Get instant form corrections and performance insights during your workout.",
        },
        {
            icon: ChartBar,
            title: "Progress Tracking",
            description: "Visualize your fitness journey with advanced metrics and goal tracking.",
        },
        {
            icon: Clock,
            title: "Time Optimization",
            description: "Maximize results with AI-optimized workout duration and intensity.",
        },
        {
            icon: Dumbbell,
            title: "Equipment Flexibility",
            description: "Workouts adapt to available equipment, whether at home or in the gym.",
        },
        {
            icon: Sparkles,
            title: "Recovery Analysis",
            description: "Smart recovery recommendations based on performance and biometric data.",
        },
    ]

    return (
        <div id="feature-grid-section" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm animate-fade-in-up">
                        Advanced Features
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Cutting-Edge{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 animate-gradient-x">
                            Features
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        TrainerX combines advanced AI technology with exercise science to deliver a truly personalized fitness
                        experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-cyan-900 transition-all duration-500 group card-3d ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Glow effect */}
                            <div
                                className={`absolute inset-0 bg-cyan-500/5 rounded-xl blur-xl transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                            ></div>

                            {/* Content */}
                            <div className="relative z-10 card-3d-content">
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-cyan-900/20 group-hover:to-cyan-800/10 transition-colors duration-500 shadow-lg">
                                    <feature.icon
                                        className={`h-6 w-6 text-cyan-500 transition-transform duration-500 ${hoveredIndex === index ? "scale-110" : ""}`}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner accent */}
                            <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                                <div
                                    className={`absolute bottom-0 right-0 w-16 h-16 bg-cyan-500/10 rotate-45 transform origin-bottom-right transition-transform duration-500 ${hoveredIndex === index ? "scale-100" : "scale-0"}`}
                                ></div>
                            </div>

                            {/* Animated border gradient on hover */}
                            <div
                                className={`absolute inset-0 rounded-xl overflow-hidden pointer-events-none transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 animate-shimmer"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
