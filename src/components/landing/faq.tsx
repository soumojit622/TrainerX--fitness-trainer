"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

export default function FAQ() {
    const faqs = [
        {
            question: "How does TrainerX's AI technology work?",
            answer:
                "TrainerX uses advanced machine learning algorithms to analyze your workout performance, form, and progress. It then adapts your training plan in real-time, providing personalized workouts, form corrections, and recovery recommendations based on your unique needs and goals.",
        },
        {
            question: "Do I need special equipment to use TrainerX?",
            answer:
                "No, TrainerX adapts to whatever equipment you have available. Whether you're at a fully-equipped gym or working out at home with minimal equipment, the AI will create effective workouts tailored to your situation.",
        },
        {
            question: "How does the form correction feature work?",
            answer:
                "TrainerX uses your device's camera to analyze your movement patterns during exercises. The AI compares your form to ideal movement patterns and provides real-time feedback to help you correct your technique, reducing injury risk and maximizing effectiveness.",
        },
        {
            question: "Can I switch between different fitness goals?",
            answer:
                "You can change your fitness goals at any time, and TrainerX will automatically adjust your training plan. Whether you want to build muscle, lose weight, improve endurance, or focus on overall fitness, the AI will optimize your workouts accordingly.",
        },
        {
            question: "Is my data secure and private?",
            answer:
                "Yes, we take data privacy very seriously. All your personal information and workout data is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can request to delete your data at any time.",
        },
        {
            question: "Can I cancel my subscription at any time?",
            answer:
                "Yes, you can cancel your subscription at any time with no questions asked. There are no long-term contracts or cancellation fees. If you cancel, you'll continue to have access to your paid features until the end of your billing period.",
        },
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [searchQuery, setSearchQuery] = useState("")

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

            <div className="max-w-3xl mx-auto relative">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
                        Support
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Frequently Asked{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Questions</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Find answers to common questions about TrainerX and AI-powered fitness.
                    </p>
                </div>

                {/* Search bar */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border ${openIndex === index ? "border-cyan-800 shadow-lg shadow-cyan-900/10" : "border-gray-800"} overflow-hidden transition-all duration-300`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex justify-between items-center w-full p-6 text-left"
                                >
                                    <h3 className="font-medium text-lg pr-4">{faq.question}</h3>
                                    <div
                                        className={`flex-shrink-0 ml-2 bg-gray-800 rounded-full p-2 transition-colors ${openIndex === index ? "bg-cyan-500/20" : ""}`}
                                    >
                                        <ChevronDown
                                            className={`h-5 w-5 ${openIndex === index ? "text-cyan-500 rotate-180" : "text-gray-400"} transition-transform duration-300`}
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="px-6 pb-6">
                                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-800">
                                            <p className="text-gray-300">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No results found</h3>
                            <p className="text-gray-400">Try a different search term or browse all FAQs</p>
                            <button
                                className="mt-4 text-cyan-500 hover:text-cyan-400 transition-colors"
                                onClick={() => setSearchQuery("")}
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 mb-4">Still have questions?</p>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium transition-all duration-300"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}
