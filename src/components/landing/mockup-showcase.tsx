/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  BarChart3,
  Calendar,
  Activity,
  Heart,
  Zap,
  Dumbbell,
  User,
  Flame,
  SunriseIcon,
  SunIcon,
  CoffeeIcon,
  Droplets,
  Share2,
  Home,
} from "lucide-react"

export default function MockupShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(65)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [heartRate, setHeartRate] = useState(72)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [chartData, setChartData] = useState([40, 65, 45, 80, 75, 65, 60])

  // Detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("mockup-showcase-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        setMousePosition({ x: e.clientX, y: e.clientY })
        setRotation({
          x: (y - 0.5) * 8, // -4 to 4 degrees
          y: (x - 0.5) * -8, // -4 to 4 degrees
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Simulate changing progress for the chart
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5
        return Math.min(Math.max(newValue, 40), 90) // Keep between 40-90
      })

      // Simulate changing heart rate
      setHeartRate((prev) => {
        const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 3
        return Math.round(Math.min(Math.max(newValue, 68), 82))
      })

      // Update chart data
      setChartData((prev) => {
        const newData = [...prev]
        newData.shift()
        newData.push(Math.floor(Math.random() * 40) + 40) // Random value between 40-80
        return newData
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate slides
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const mockupSlides = [
    {
      title: "Workout Dashboard",
      description: "Track your progress and upcoming workouts",
      image: (
        <div
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl overflow-hidden w-full max-w-xl shadow-[0_10px_50px_rgba(8,145,178,0.15)] card-3d"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-800 card-3d-content">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm text-gray-400 flex items-center">
              <span className="h-2 w-2 rounded-full bg-cyan-500 mr-2"></span>
              TrainerX Dashboard
            </div>
          </div>
          <div className="p-6 card-3d-content">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-lg font-semibold">Welcome back, Soumojit</div>
                <div className="text-sm text-gray-400">Your fitness journey continues</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 text-cyan-500 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                Pro Plan
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 mb-6">
              {["Overview", "Workouts", "Nutrition", "Settings"].map((tab, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    activeTab === i ? "text-cyan-500" : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  {tab}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Workouts", value: "24", change: "+3", icon: <Activity className="h-3 w-3" /> },
                { label: "Calories", value: "12,840", change: "+840", icon: <BarChart3 className="h-3 w-3" /> },
                { label: "Streak", value: "8 days", change: "+2", icon: <Calendar className="h-3 w-3" /> },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                    <span className="text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </span>
                    {stat.label}
                  </div>
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className="text-xs text-cyan-500">{stat.change} this week</div>
                </div>
              ))}
            </div>

            {/* Progress Chart */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">Weekly Progress</div>
                <div className="text-xs text-cyan-500">+12% from last week</div>
              </div>
              <div className="flex items-end h-24 gap-2">
                {chartData.map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-gradient-to-t from-cyan-900/50 to-cyan-700/20 rounded-sm relative overflow-hidden group-hover:from-cyan-800/50 group-hover:to-cyan-600/20 transition-colors duration-300"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"></div>
                      {/* Animated highlight on top */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-cyan-500 transition-colors duration-300">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Workout */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="text-sm font-medium mb-3 flex items-center relative z-10">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                Today's Workout
              </div>
              <div className="text-lg font-semibold mb-1 relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                Upper Body Strength
              </div>
              <div className="text-sm text-gray-400 mb-3 relative z-10">45 min · Intermediate</div>
              <div className="flex gap-2 mb-4 relative z-10">
                {["Chest", "Shoulders", "Arms"].map((tag, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 text-xs px-2 py-1 rounded-full group-hover:bg-cyan-900/30 group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium py-2 rounded-md transition-all duration-300 relative z-10 group-hover:shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                Start Workout
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Workout Analysis",
      description: "Detailed performance metrics and AI feedback",
      image: (
        <div
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl overflow-hidden w-full max-w-xl shadow-[0_10px_50px_rgba(8,145,178,0.15)] card-3d"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-800 card-3d-content">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm text-gray-400 flex items-center">
              <span className="h-2 w-2 rounded-full bg-cyan-500 mr-2"></span>
              Workout Analysis
            </div>
          </div>
          <div className="p-6 card-3d-content">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-lg font-semibold">Workout Complete</div>
                <div className="text-sm text-gray-400">Upper Body Strength · 48 min</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 text-cyan-500 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                <span className="mr-1">+</span>320 Points
              </div>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-800 col-span-2 hover:border-cyan-900/30 transition-all duration-300 group">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300">
                    Performance Summary
                  </div>
                  <div className="text-xs text-cyan-500">+8% improvement</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#performance-gradient)"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * 78) / 100}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="performance-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0891b2" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
                        78%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="group/stat">
                        <div className="text-xs text-gray-400">Total Volume</div>
                        <div className="text-sm font-medium group-hover/stat:text-cyan-400 transition-colors duration-300">
                          4,320 kg
                        </div>
                      </div>
                      <div className="group/stat">
                        <div className="text-xs text-gray-400">Max Weight</div>
                        <div className="text-sm font-medium group-hover/stat:text-cyan-400 transition-colors duration-300">
                          85 kg
                        </div>
                      </div>
                      <div className="group/stat">
                        <div className="text-xs text-gray-400">Calories</div>
                        <div className="text-sm font-medium group-hover/stat:text-cyan-400 transition-colors duration-300">
                          420 kcal
                        </div>
                      </div>
                      <div className="group/stat">
                        <div className="text-xs text-gray-400">Heart Rate</div>
                        <div className="text-sm font-medium group-hover/stat:text-cyan-400 transition-colors duration-300 flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-cyan-500" /> {heartRate} bpm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Breakdown */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group">
              <div className="text-sm font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                Exercise Breakdown
              </div>
              <div className="space-y-3">
                {[
                  { name: "Bench Press", sets: 4, reps: "8-10", improvement: "+5%", weight: "75kg" },
                  { name: "Shoulder Press", sets: 3, reps: "10-12", improvement: "+3%", weight: "45kg" },
                  { name: "Lat Pulldown", sets: 4, reps: "12", improvement: "+7%", weight: "60kg" },
                ].map((exercise, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-900 p-2 rounded-md group-hover:bg-gray-800 transition-colors duration-300 group/exercise"
                  >
                    <div>
                      <div className="text-sm font-medium flex items-center group-hover/exercise:text-cyan-400 transition-colors duration-300">
                        <Dumbbell className="h-3 w-3 mr-1 text-cyan-500" />
                        {exercise.name}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <span>
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                        <span className="mx-1">•</span>
                        <span>{exercise.weight}</span>
                      </div>
                    </div>
                    <div className="text-xs text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      {exercise.improvement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="text-sm font-medium mb-3 flex items-center relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                AI Feedback
              </div>
              <div className="bg-gradient-to-r from-cyan-900/20 to-cyan-800/10 rounded-md p-3 border border-cyan-900/50 mb-3 relative z-10 group-hover:border-cyan-500/30 transition-colors duration-300">
                <p className="text-sm text-cyan-400">
                  "Your bench press form has improved significantly. Focus on maintaining scapular retraction throughout
                  the movement. Consider increasing weight by 5% next session."
                </p>
              </div>
              <div className="flex justify-between relative z-10">
                <button className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-2 rounded-md transition-colors flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Previous Workouts
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center group-hover:shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Nutrition Tracking",
      description: "Monitor your diet and nutritional intake",
      image: (
        <div
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl overflow-hidden w-full max-w-xl shadow-[0_10px_50px_rgba(8,145,178,0.15)] card-3d"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-800 card-3d-content">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm text-gray-400 flex items-center">
              <span className="h-2 w-2 rounded-full bg-cyan-500 mr-2"></span>
              Nutrition Tracker
            </div>
          </div>
          <div className="p-6 card-3d-content">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-lg font-semibold">Today's Nutrition</div>
                <div className="text-sm text-gray-400">Wednesday, April 16</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 text-cyan-500 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20 flex items-center">
                <Flame className="h-3 w-3 mr-1" />
                1,840 / 2,200 kcal
              </div>
            </div>

            {/* Macros Visualization */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group">
              <div className="text-sm font-medium mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                Macronutrients
              </div>
              <div className="flex justify-between mb-6">
                <div className="text-center group/macro">
                  <div className="relative w-16 h-16 mx-auto mb-2 group-hover/macro:scale-105 transition-transform duration-300">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#protein-gradient)"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * 65) / 100}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="protein-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0891b2" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold group-hover/macro:text-cyan-400 transition-colors duration-300">
                        65%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Protein</div>
                  <div className="text-sm font-medium group-hover/macro:text-cyan-400 transition-colors duration-300">
                    130g / 200g
                  </div>
                </div>
                <div className="text-center group/macro">
                  <div className="relative w-16 h-16 mx-auto mb-2 group-hover/macro:scale-105 transition-transform duration-300">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#carbs-gradient)"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * 80) / 100}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="carbs-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#67e8f9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold group-hover/macro:text-cyan-400 transition-colors duration-300">
                        80%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Carbs</div>
                  <div className="text-sm font-medium group-hover/macro:text-cyan-400 transition-colors duration-300">
                    200g / 250g
                  </div>
                </div>
                <div className="text-center group/macro">
                  <div className="relative w-16 h-16 mx-auto mb-2 group-hover/macro:scale-105 transition-transform duration-300">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#fats-gradient)"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * 45) / 100}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="fats-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0e7490" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold group-hover/macro:text-cyan-400 transition-colors duration-300">
                        45%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Fats</div>
                  <div className="text-sm font-medium group-hover/macro:text-cyan-400 transition-colors duration-300">
                    35g / 78g
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 relative" style={{ width: "70%" }}>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shimmer"></div>
                </div>
              </div>
              <div className="text-xs text-center text-gray-400 mt-1 group-hover:text-cyan-400 transition-colors duration-300">
                70% of daily goal completed
              </div>
            </div>

            {/* Meal Tracking */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group">
              <div className="text-sm font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                Today's Meals
              </div>
              <div className="space-y-3">
                {[
                  {
                    time: "7:30 AM",
                    name: "Breakfast",
                    calories: 450,
                    items: "Protein Oatmeal, Banana",
                    icon: <SunriseIcon className="h-3 w-3" />,
                  },
                  {
                    time: "12:15 PM",
                    name: "Lunch",
                    calories: 680,
                    items: "Chicken Salad, Quinoa",
                    icon: <SunIcon className="h-3 w-3" />,
                  },
                  {
                    time: "4:00 PM",
                    name: "Snack",
                    calories: 220,
                    items: "Protein Shake, Almonds",
                    icon: <CoffeeIcon className="h-3 w-3" />,
                  },
                ].map((meal, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-900 p-3 rounded-md group-hover:bg-gray-800 transition-colors duration-300 group/meal"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-cyan-900/30 text-cyan-500 px-2 py-1 rounded text-xs flex items-center">
                        {meal.icon}
                        <span className="ml-1">{meal.time}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium group-hover/meal:text-cyan-400 transition-colors duration-300">
                          {meal.name}
                        </div>
                        <div className="text-xs text-gray-400">{meal.items}</div>
                      </div>
                    </div>
                    <div className="text-sm flex items-center">
                      <Flame className="h-3 w-3 mr-1 text-cyan-500" />
                      {meal.calories} kcal
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 border border-dashed border-gray-700 text-gray-400 hover:text-cyan-500 hover:border-cyan-900 text-sm py-2 rounded-md transition-colors flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-900/10">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Meal
              </button>
            </div>

            {/* Water Tracking */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-800 hover:border-cyan-900/30 transition-all duration-300 group relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300 flex items-center">
                  <Droplets className="h-3 w-3 mr-1 text-cyan-500" />
                  Water Intake
                </div>
                <div className="text-xs text-cyan-500">1.6L / 2.5L</div>
              </div>
              <div className="flex items-center gap-2 mb-2 relative z-10">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-md ${i < 5 ? "bg-gradient-to-r from-cyan-500/30 to-cyan-600/20" : "bg-gray-700"} flex items-center justify-center transition-all duration-300 ${i === 4 ? "scale-105" : ""}`}
                  >
                    {i < 5 && (
                      <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-xs text-center text-gray-400 relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                Each glass represents 300ml
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div id="mockup-showcase-section" ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm animate-fade-in-up">
            Interactive Interface
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Experience the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 animate-gradient-x">
              Future
            </span>{" "}
            of Fitness
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            TrainerX's intelligent interface adapts to your needs, providing a seamless fitness experience.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Mockup Carousel */}
          <div className="relative w-full max-w-4xl mb-12">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {mockupSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col items-center">{slide.image}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors group"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                  ) : (
                    <Play className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                  )}
                </button>
                <div className="text-sm text-gray-400 group">
                  <span className="group-hover:text-cyan-400 transition-colors">{currentSlide + 1}</span> /{" "}
                  {mockupSlides.length}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + mockupSlides.length) % mockupSlides.length)}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors group"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % mockupSlides.length)}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors group"
                  disabled={currentSlide === mockupSlides.length - 1}
                >
                  <ChevronRight className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {mockupSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all ${
                    currentSlide === index
                      ? "w-8 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full"
                      : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Workout View */}
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden w-full max-w-xs h-[600px] flex flex-col shadow-[0_10px_50px_rgba(8,145,178,0.15)] card-3d"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x * 0.7}deg) rotateY(${rotation.y * 0.7}deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Status bar */}
            <div className="bg-black px-4 py-3 flex justify-between items-center border-b border-gray-800 card-3d-content">
              <div className="text-sm">9:41</div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                </div>
                <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                <div className="w-4 h-4 rounded-full border border-gray-600"></div>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col card-3d-content">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-lg font-semibold">Workout in Progress</div>
                  <div className="text-sm text-cyan-500 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                    12:45 elapsed
                  </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="w-2 h-4 bg-black rounded-sm"></div>
                </div>
              </div>

              {/* Exercise View */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-4 flex-1 border border-gray-800 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>

                {/* Animated background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

                <div className="text-center mb-4 relative z-10">
                  <div className="text-sm text-gray-400">Current Exercise</div>
                  <div className="text-xl font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                    Dumbbell Press
                  </div>
                  <div className="text-sm text-cyan-500">Set 2 of 4</div>
                </div>

                <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg mb-4 flex items-center justify-center relative z-10 border border-gray-800 group-hover:border-cyan-900/30 transition-all duration-300">
                  <div className="w-20 h-20 border-4 border-cyan-500 rounded-full flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping"></div>
                    <div className="text-2xl font-bold group-hover:text-cyan-400 transition-colors duration-300">8</div>
                  </div>
                </div>

                <div className="text-sm text-center mb-4 relative z-10">
                  <div className="text-gray-400">AI Feedback</div>
                  <div className="text-cyan-500 font-medium mt-1 bg-gradient-to-r from-cyan-900/20 to-cyan-800/10 py-2 px-3 rounded-md border border-cyan-900/50 group-hover:border-cyan-500/30 transition-colors duration-300">
                    "Keep your elbows tucked in slightly more"
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                  <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition-colors flex items-center justify-center group/btn">
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover/btn:text-cyan-400 transition-colors duration-300" />
                    <span className="group-hover/btn:text-cyan-400 transition-colors duration-300">Previous</span>
                  </button>
                  <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium py-2 rounded-md transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="grid grid-cols-4 gap-2 bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded-lg border border-gray-800">
                {[
                  { name: "Home", icon: <Home className="w-4 h-4" /> },
                  { name: "Workouts", icon: <Dumbbell className="w-4 h-4" />, active: true },
                  { name: "Progress", icon: <BarChart3 className="w-4 h-4" /> },
                  { name: "Profile", icon: <User className="w-4 h-4" /> },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center ${item.active ? "text-cyan-500" : "text-gray-400"} group/nav`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${item.active ? "bg-cyan-500/20" : "bg-gray-700"} flex items-center justify-center group-hover/nav:bg-cyan-500/10 transition-colors duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-xs mt-1 group-hover/nav:text-cyan-400 transition-colors duration-300">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
