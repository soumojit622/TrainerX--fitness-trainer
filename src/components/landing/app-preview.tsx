/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"

export default function AppPreview() {
    const [activeScreen, setActiveScreen] = useState(0)
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

        const element = document.getElementById("app-preview-section")
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [])

    // Auto-rotate screens
    useEffect(() => {
        if (!isVisible) return

        const interval = setInterval(() => {
            setActiveScreen((prev) => (prev + 1) % 3)
        }, 4000)

        return () => clearInterval(interval)
    }, [isVisible])

    const screens = [
        {
            name: "Dashboard",
            content: (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="text-lg font-semibold">
                                Trainer<span className="text-cyan-500">X</span>
                            </div>
                            <div className="text-xs text-gray-400">Your AI Trainer</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <div className="w-6 h-6 text-cyan-500">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-800 rounded-lg p-2">
                            <div className="text-xs text-gray-400">Workouts</div>
                            <div className="text-lg font-medium">12</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-2">
                            <div className="text-xs text-gray-400">Streak</div>
                            <div className="text-lg font-medium">5 days</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-2">
                            <div className="text-xs text-gray-400">Level</div>
                            <div className="text-lg font-medium">Pro</div>
                        </div>
                    </div>

                    {/* Workout card */}
                    <div className="bg-gray-800 rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-sm font-medium">Today's Workout</div>
                            <div className="text-xs text-cyan-500">45 min</div>
                        </div>
                        <div className="text-base font-medium mb-1">Full Body HIIT</div>
                        <div className="text-xs text-gray-400 mb-3">Intermediate · 12 exercises</div>
                        <div className="flex gap-2 mb-4">
                            {["Cardio", "Strength", "Core"].map((tag, i) => (
                                <div key={i} className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-medium py-2 rounded-md text-sm">
                            Start Workout
                        </button>
                    </div>
                </>
            ),
        },
        {
            name: "Workout",
            content: (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="text-base font-semibold">Workout in Progress</div>
                            <div className="text-xs text-cyan-500 flex items-center">
                                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                                12:45 elapsed
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-full w-8 h-8 flex items-center justify-center">
                            <div className="w-2 h-4 bg-black rounded-sm"></div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-3 mb-4">
                        <div className="text-center mb-2">
                            <div className="text-xs text-gray-400">Current Exercise</div>
                            <div className="text-base font-semibold">Dumbbell Press</div>
                            <div className="text-xs text-cyan-500">Set 2 of 4</div>
                        </div>

                        <div className="h-32 bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-cyan-500 rounded-full flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping"></div>
                                <div className="text-xl font-bold">8</div>
                            </div>
                        </div>

                        <div className="text-xs text-center mb-3">
                            <div className="text-gray-400">AI Feedback</div>
                            <div className="text-cyan-500 font-medium mt-1 bg-cyan-500/10 py-1 px-2 rounded-md">
                                "Keep your elbows tucked in"
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button className="bg-gray-700 py-1.5 rounded-md text-xs flex items-center justify-center">
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19 12H5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 19L5 12L12 5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Previous
                            </button>
                            <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black py-1.5 rounded-md text-xs font-medium flex items-center justify-center">
                                Next
                                <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 5L19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            ),
        },
        {
            name: "Progress",
            content: (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="text-base font-semibold">Your Progress</div>
                            <div className="text-xs text-gray-400">Last 30 days</div>
                        </div>
                        <div className="bg-gray-800 text-cyan-500 text-xs px-2 py-1 rounded-full">+18%</div>
                    </div>

                    {/* Progress chart */}
                    <div className="bg-gray-800 rounded-lg p-3 mb-4">
                        <div className="flex items-end h-32 gap-1">
                            {[40, 55, 35, 60, 50, 75, 65].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full bg-gradient-to-t from-cyan-900/50 to-cyan-700/20 rounded-sm relative overflow-hidden"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"></div>
                                    </div>
                                    <div className="text-[10px] text-gray-500">{["M", "T", "W", "T", "F", "S", "S"][i]}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-gray-800 rounded-lg p-3 mb-4">
                        <div className="text-xs font-medium mb-2">Recent Achievements</div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-md">
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                                    <Check className="w-3 h-3" />
                                </div>
                                <div>
                                    <div className="text-xs">5-Day Streak</div>
                                    <div className="text-[10px] text-gray-400">Completed yesterday</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-md">
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                                    <Check className="w-3 h-3" />
                                </div>
                                <div>
                                    <div className="text-xs">10 Workouts Completed</div>
                                    <div className="text-[10px] text-gray-400">Completed this week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ]

    return (
        <div id="app-preview-section" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
                        Mobile Experience
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Take TrainerX{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Anywhere</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our mobile app puts AI-powered fitness in your pocket, available on iOS and Android.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    <div className="w-full max-w-md order-2 lg:order-1">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center">
                            <span className="bg-cyan-500/20 text-cyan-500 p-1 rounded-md mr-2">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 6V12L16 14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            Mobile Experience
                        </h3>

                        {/* Screen selector */}
                        <div className="flex mb-6 bg-gray-900 p-1 rounded-lg">
                            {screens.map((screen, index) => (
                                <button
                                    key={index}
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeScreen === index
                                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                    onClick={() => setActiveScreen(index)}
                                >
                                    {screen.name}
                                </button>
                            ))}
                        </div>

                        <ul className="space-y-4">
                            {[
                                "Train anywhere with offline workout access",
                                "Real-time form analysis using your phone's camera",
                                "Voice-guided workouts for hands-free training",
                                "Sync with fitness wearables for enhanced tracking",
                                "Social features to connect with the TrainerX community",
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start gap-3 group">
                                    <div className="bg-cyan-500/20 text-cyan-500 rounded-full p-1 mt-0.5 group-hover:bg-cyan-500/40 transition-colors">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg p-4 border border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="bg-cyan-500/20 rounded-full p-2 text-cyan-500">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    <h4 className="text-sm font-medium">Coming Soon</h4>
                                    <p className="text-xs text-gray-400">
                                        Apple Watch and Android Wear apps with real-time workout tracking
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone mockup */}
                    <div
                        className={`relative order-1 lg:order-2 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
                    >
                        <div className="w-[280px] h-[580px] bg-gradient-to-br from-gray-950 to-black rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl relative">
                            {/* Status bar */}
                            <div className="bg-black h-6 w-full flex justify-between items-center px-6 text-xs text-gray-400">
                                <span>9:41</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full border border-gray-600 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                    </div>
                                    <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                                    <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                                </div>
                            </div>

                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-gray-800 rounded-b-xl"></div>

                            {/* App content */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-950 h-full p-4">
                                {screens[activeScreen].content}

                                {/* Bottom nav */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2 grid grid-cols-4">
                                        {["Home", "Workouts", "Progress", "Profile"].map((item, i) => (
                                            <div
                                                key={i}
                                                className={`flex flex-col items-center ${i === activeScreen ? "text-cyan-500" : "text-gray-400"}`}
                                            >
                                                <div
                                                    className={`w-6 h-6 rounded-full ${i === activeScreen ? "bg-cyan-500/20" : ""} flex items-center justify-center`}
                                                >
                                                    <div className="w-3 h-3 rounded-full bg-current"></div>
                                                </div>
                                                <div className="text-xs mt-1">{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Glow effects */}
                        <div className="absolute -inset-4 bg-cyan-500/5 rounded-[4rem] blur-md -z-10"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 rounded-[3.5rem] -z-10"></div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 border border-cyan-900/30 rounded-full"></div>
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 border border-cyan-900/30 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
