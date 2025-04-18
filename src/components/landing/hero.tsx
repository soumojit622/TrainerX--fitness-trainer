/* eslint-disable react/no-unescaped-entities */
"use client"

import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false)
    const [activeFeature, setActiveFeature] = useState(0)
    const heroRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        setIsVisible(true)

        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 3)
        }, 3000)

        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect()
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                })
            }
        }

        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("scroll", handleScroll)

        return () => {
            clearInterval(interval)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const features = ["AI-powered personalized workouts", "Real-time form correction", "Adaptive training plans"]

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 lg:py-0 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient background */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-black to-black"></div> */}

                {/* Animated particles */}
                <div className="absolute inset-0">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0.1 + Math.random() * 0.3,
                                transform: `translateY(${scrollY * (0.2 + Math.random() * 0.8)}px)`,
                                width: `${1 + Math.random() * 2}px`,
                                height: `${1 + Math.random() * 2}px`,
                                boxShadow: "0 0 10px rgba(8, 145, 178, 0.5)",
                                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Glow effect that follows mouse */}
                <div
                    className="absolute w-[40vw] h-[40vw] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"
                    style={{
                        left: `${mousePosition.x * 100}%`,
                        top: `${mousePosition.y * 100}%`,
                        transform: "translate(-50%, -50%)",
                        opacity: 0.6,
                        transition: "left 0.5s ease-out, top 0.5s ease-out",
                    }}
                ></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className="order-2 lg:order-1">
                        <div
                            className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            style={{ transitionDelay: "0.2s" }}
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm mb-6 backdrop-blur-sm">
                                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                                <span>Revolutionizing Fitness with AI</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                                Transform Your{" "}
                                <span className="relative inline-block">
                                    <span className="absolute -inset-1 blur-xl bg-cyan-500/20 rounded-full"></span>
                                    <span className="relative">Fitness</span>
                                </span>{" "}
                                Journey with{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 animate-gradient-x">
                                    TrainerX
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                The world's first AI-powered personal trainer that adapts to your body, goals, and schedule in real-time
                                for maximum results.
                            </p>

                            <div className="space-y-4 mb-8">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center transition-all duration-500 ${activeFeature === index ? "scale-105 text-white" : "text-gray-400"}`}
                                    >
                                        <div
                                            className={`mr-3 flex items-center justify-center w-6 h-6 rounded-full ${activeFeature === index ? "bg-cyan-500/20" : "bg-gray-800"} transition-colors duration-500`}
                                        >
                                            <CheckCircle
                                                className={`h-4 w-4 ${activeFeature === index ? "text-cyan-500" : "text-gray-600"}`}
                                            />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#"
                                    className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-3 rounded-md transition-all duration-300 text-center overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
                                    <span className="absolute inset-0 w-full h-full bg-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></span>
                                    <span className="relative flex items-center justify-center">
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <Link
                                    href="#"
                                    className="group relative bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 text-center overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
                                    <span className="relative">Watch Demo</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mockup Section */}
                    <div className="order-1 lg:order-2">
                        <div
                            className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            style={{ transitionDelay: "0.5s" }}
                        >
                            {/* Phone mockup */}
                            <div
                                className="relative mx-auto"
                                style={{
                                    transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * -10}deg) rotateX(${(mousePosition.y - 0.5) * 10}deg)`,
                                    transition: "transform 0.3s ease-out",
                                }}
                            >
                                <div className="w-[280px] h-[580px] bg-gradient-to-br from-gray-950 to-black rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl relative mx-auto">
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
                                        {/* App header */}
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <div className="text-lg font-semibold">
                                                    Trainer<span className="text-cyan-500">X</span>
                                                </div>
                                                <div className="text-xs text-gray-400">Welcome back, Somojit</div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-800/30 to-cyan-600/20 flex items-center justify-center">
                                                <div className="text-cyan-400">A</div>
                                            </div>
                                        </div>

                                        {/* Today's workout */}
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-4 border border-gray-800 relative overflow-hidden group">
                                            {/* Animated gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-sm font-medium">Today's Workout</div>
                                                <div className="text-xs text-cyan-500 flex items-center">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-1 animate-pulse"></span>
                                                    45 min
                                                </div>
                                            </div>
                                            <div className="text-base font-medium mb-1">Upper Body Strength</div>
                                            <div className="text-xs text-gray-400 mb-3">Intermediate · 8 exercises</div>
                                            <div className="flex gap-2 mb-4">
                                                {["Chest", "Shoulders", "Arms"].map((tag, i) => (
                                                    <div key={i} className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-medium py-2 rounded-md text-sm relative overflow-hidden group">
                                                <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
                                                <span className="relative">Start Workout</span>
                                            </button>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            {[
                                                { label: "Workouts", value: "24" },
                                                { label: "Streak", value: "7 days" },
                                                { label: "Progress", value: "+18%" },
                                            ].map((stat, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group"
                                                >
                                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                                    <div className="text-lg font-medium group-hover:text-cyan-400 transition-colors">
                                                        {stat.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Progress chart */}
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 mb-4 border border-gray-800">
                                            <div className="text-xs font-medium mb-2">Weekly Progress</div>
                                            <div className="flex items-end h-24 gap-1">
                                                {[40, 55, 35, 60, 50, 75, 65].map((height, i) => (
                                                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                                        <div
                                                            className="w-full bg-gradient-to-t from-cyan-900/50 to-cyan-700/20 rounded-sm relative overflow-hidden group-hover:from-cyan-800/50 group-hover:to-cyan-600/20 transition-colors duration-300"
                                                            style={{ height: `${height}%` }}
                                                        >
                                                            {/* Animated highlight on top */}
                                                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </div>
                                                        <div className="text-[10px] text-gray-500 group-hover:text-cyan-500 transition-colors duration-300">
                                                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom nav */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2 grid grid-cols-4">
                                                {["Home", "Workouts", "Progress", "Profile"].map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex flex-col items-center ${i === 0 ? "text-cyan-500" : "text-gray-400"}`}
                                                    >
                                                        <div
                                                            className={`w-6 h-6 rounded-full ${i === 0 ? "bg-cyan-500/20" : ""} flex items-center justify-center`}
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

                                {/* Floating UI elements */}
                                <div
                                    className="absolute -right-20 top-20 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-3 border border-gray-800 shadow-lg w-40 backdrop-blur-sm"
                                    style={{
                                        transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * -10}px)`,
                                        transition: "transform 0.3s ease-out",
                                    }}
                                >
                                    <div className="text-xs font-medium mb-2 flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                                        AI Feedback
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        "Great form on your squats! Try increasing weight by 5% next session."
                                    </div>
                                </div>

                                <div
                                    className="absolute -left-16 bottom-32 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-3 border border-gray-800 shadow-lg w-32 backdrop-blur-sm"
                                    style={{
                                        transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * 10}px)`,
                                        transition: "transform 0.3s ease-out",
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-xs font-medium">Heart Rate</div>
                                        <div className="text-xs text-cyan-500">72 bpm</div>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-gradient-to-r from-cyan-500 to-cyan-400 animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Additional floating element */}
                                <div
                                    className="absolute -right-12 bottom-16 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-3 border border-gray-800 shadow-lg backdrop-blur-sm"
                                    style={{
                                        transform: `translate(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px)`,
                                        transition: "transform 0.3s ease-out",
                                    }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                                            <Sparkles className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium">Achievement</div>
                                            <div className="text-xs text-cyan-500">5-Day Streak</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
