"use client"

import { Check, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function BenefitsSection() {
    const [activeComparison, setActiveComparison] = useState(0)

    const benefits = [
        "Personalized workouts that adapt in real-time",
        "Form correction with AI-powered feedback",
        "Progress tracking with predictive analytics",
        "Workout plans that adjust to your available equipment",
        "Recovery optimization based on performance data",
        "Time-efficient routines that maximize results",
    ]

    const comparisons = [
        {
            traditional: "Generic workout plans",
            trainerx: "Personalized AI-generated routines",
            icon: "📋",
        },
        {
            traditional: "Static weekly schedules",
            trainerx: "Dynamic plans that adapt daily",
            icon: "🗓️",
        },
        {
            traditional: "No real-time feedback",
            trainerx: "Instant form correction and tips",
            icon: "🔄",
        },
        {
            traditional: "Basic progress tracking",
            trainerx: "Advanced analytics and predictions",
            icon: "📊",
        },
    ]

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
                        Why Choose Us
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">TrainerX</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience the advantages of AI-powered fitness over traditional training methods.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 flex items-center">
                            <span className="bg-cyan-500/20 text-cyan-500 p-1 rounded-md mr-2">
                                <Check className="h-5 w-5" />
                            </span>
                            Key Benefits
                        </h3>
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3 group">
                                    <div className="bg-cyan-500/20 rounded-full p-1 mt-0.5 group-hover:bg-cyan-500/40 transition-colors">
                                        <Check className="h-4 w-4 text-cyan-500" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <button className="group inline-flex items-center text-cyan-500 hover:text-cyan-400 transition-colors">
                                <span>Learn more about our technology</span>
                                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-6 flex items-center">
                            <span className="bg-cyan-500/20 text-cyan-500 p-1 rounded-md mr-2">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V6C19 4.34315 17.6569 3 16 3Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 18H12.01"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            TrainerX vs. Traditional
                        </h3>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                            <div className="grid grid-cols-2 border-b border-gray-800">
                                <div className="p-4 text-center font-medium bg-gray-900 text-gray-300">Traditional</div>
                                <div className="p-4 text-center font-medium bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 text-cyan-500">
                                    TrainerX
                                </div>
                            </div>

                            {comparisons.map((item, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-2 border-b border-gray-800 last:border-0 transition-colors duration-300 ${activeComparison === index ? "bg-gray-900/50" : ""}`}
                                    onMouseEnter={() => setActiveComparison(index)}
                                >
                                    <div className="p-4 text-gray-400 border-r border-gray-800 flex items-center">
                                        <span className="mr-2 opacity-50">{item.icon}</span>
                                        {item.traditional}
                                    </div>
                                    <div className="p-4 text-white flex items-center">
                                        <span className="mr-2">{item.icon}</span>
                                        {item.trainerx}
                                        {activeComparison === index && (
                                            <span className="ml-2 text-cyan-500">
                                                <Check className="h-4 w-4 inline" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 rounded-lg p-4 border border-cyan-900/30">
                            <div className="flex items-start">
                                <div className="bg-cyan-500/20 rounded-full p-1 mr-3 mt-0.5">
                                    <svg
                                        className="h-4 w-4 text-cyan-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">
                                        <span className="text-cyan-400 font-medium">93% of users</span> reported better results with
                                        TrainerX compared to traditional training methods within just 30 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
