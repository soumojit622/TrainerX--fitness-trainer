/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { Cpu, Zap } from "lucide-react"
import { useState } from "react"

export default function AIPowered() {
    const [activeTab, setActiveTab] = useState(0)

    const aiFeatures = [
        {
            title: "Adaptive Learning",
            description:
                "Our AI analyzes your performance patterns and adapts your workout plan in real-time, ensuring optimal progression.",
            code: [
                "function analyzePerformance(userData) {",
                "  const patterns = extractPatterns(userData.history);",
                "  const adaptations = generateAdaptations(patterns);",
                "  return optimizeWorkout(adaptations);",
                "}",
            ],
        },
        {
            title: "Form Analysis",
            description:
                "Computer vision technology monitors your exercise form and provides real-time corrections to prevent injuries.",
            code: [
                "function analyzeForm(videoFrame) {",
                "  const bodyPoints = detectKeyPoints(videoFrame);",
                "  const formScore = compareToIdealForm(bodyPoints);",
                "  return generateFeedback(formScore);",
                "}",
            ],
        },
        {
            title: "Predictive Analytics",
            description:
                "Our algorithms predict your optimal training zones and recovery needs based on historical performance data.",
            code: [
                "function predictRecovery(performanceData) {",
                "  const fatigueLevels = calculateFatigue(performanceData);",
                "  const optimalRecovery = modelRecoveryNeeds(fatigueLevels);",
                "  return generateRecoveryPlan(optimalRecovery);",
                "}",
            ],
        },
    ]

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 text-cyan-500 px-4 py-1 rounded-full mb-4 border border-cyan-900/50">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm font-medium">AI Technology</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        How{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">AI Powers</span>{" "}
                        Your Workouts
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        TrainerX uses advanced machine learning to create a truly personalized fitness experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="space-y-8">
                            {aiFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br from-gray-900 to-gray-950 border ${activeTab === index ? "border-cyan-800" : "border-gray-800"} rounded-xl p-6 transition-all duration-300 shadow-lg ${activeTab === index ? "shadow-cyan-900/20" : ""}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`bg-cyan-500/20 rounded-lg p-2 ${activeTab === index ? "animate-pulse" : ""}`}>
                                            <Zap className="h-6 w-6 text-cyan-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                            <p className="text-gray-400">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 relative shadow-[0_10px_50px_rgba(8,145,178,0.1)]">
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black text-xs font-medium px-2 py-1 rounded-md">
                                AI Logic
                            </div>

                            {/* Terminal header */}
                            <div className="bg-gray-950 rounded-t-lg border border-gray-800 p-2 flex items-center mb-2">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs text-gray-400 mx-auto">trainer-x-ai.js</div>
                            </div>

                            {/* Code-like UI */}
                            <div className="font-mono text-sm bg-gray-950 rounded-b-lg border border-t-0 border-gray-800 p-4 overflow-hidden">
                                <div className="mb-4">
                                    <span className="text-cyan-500">class</span> <span className="text-cyan-300">TrainerXAI</span> {"{"}
                                </div>

                                <div className="pl-4 mb-4">
                                    <div className="text-gray-400 mb-2">// User profile analysis</div>
                                    <div className="mb-1">
                                        <span className="text-cyan-500">function</span>{" "}
                                        <span className="text-cyan-300">analyzeUserProfile</span>(userData) {"{"}
                                    </div>
                                    <div className="pl-4 text-gray-300">
                                        <div>const fitnessLevel = calculateFitnessScore(userData);</div>
                                        <div>const limitations = identifyLimitations(userData.health);</div>
                                        <div>return optimizeTrainingPlan(fitnessLevel, limitations);</div>
                                    </div>
                                    <div>{"}"}</div>
                                </div>

                                {/* Dynamic code section based on selected tab */}
                                <div className="pl-4 mb-4 relative">
                                    <div className="absolute -left-0 top-0 w-1 h-full bg-cyan-500"></div>
                                    <div className="text-gray-400 mb-2">// {aiFeatures[activeTab].title}</div>
                                    {aiFeatures[activeTab].code.map((line, i) => (
                                        <div key={i} className="text-gray-300">
                                            <span className={i === 0 ? "text-cyan-500" : ""}>{line}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pl-4 mb-2">
                                    <div className="text-gray-400 mb-2">// Real-time adaptation</div>
                                    <div className="mb-1">
                                        <span className="text-cyan-500">function</span> <span className="text-cyan-300">adaptWorkout</span>
                                        (performance, fatigue) {"{"}
                                    </div>
                                    <div className="pl-4 text-gray-300">
                                        <div>if (performance.declining && fatigue.increasing) {"{"}</div>
                                        <div className="pl-4">return reduceIntensity(nextExercise);</div>
                                        <div>
                                            {"}"} else if (performance.stable && fatigue.low) {"{"}
                                        </div>
                                        <div className="pl-4">return increaseIntensity(nextExercise);</div>
                                        <div>{"}"}</div>
                                        <div>return maintainCurrentLevel(nextExercise);</div>
                                    </div>
                                    <div>{"}"}</div>
                                </div>

                                <div>{"}"}</div>

                                {/* Blinking cursor */}
                                <div className="mt-2 flex items-center">
                                    <span className="text-gray-400">{">"}</span>
                                    <span className="w-2 h-5 bg-cyan-500 ml-1 animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
