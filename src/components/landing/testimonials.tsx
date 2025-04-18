/* eslint-disable react/no-unescaped-entities */
"use client"

import { Star, Quote } from "lucide-react"
import { useState } from "react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Arjun S.",
      role: "CrossFit Enthusiast",
      content:
        "TrainerX has completely transformed my training. The AI feedback on my form has helped me prevent injuries and push harder than ever before.",
      rating: 5,
      image: "AS",
      stats: { workouts: 87, days: 45, progress: "+28%" },
    },
    {
      name: "Riya M.",
      role: "Busy Professional",
      content:
        "As someone with a packed schedule, TrainerX's ability to adapt workouts to my available time has been a game-changer. I've seen more progress in 2 months than in my previous year of training.",
      rating: 5,
      image: "RM",
      stats: { workouts: 64, days: 58, progress: "+32%" },
    },
    {
      name: "Michael T.",
      role: "Marathon Runner",
      content:
        "The way TrainerX integrates with my running schedule is incredible. It automatically adjusts my strength training based on my running performance and recovery needs.",
      rating: 4,
      image: "MT",
      stats: { workouts: 103, days: 90, progress: "+41%" },
    },
    {
      name: "Sarah K.",
      role: "Fitness Beginner",
      content:
        "I was intimidated by fitness apps before, but TrainerX makes everything so approachable. The AI guidance feels like having a personal trainer with me at all times.",
      rating: 5,
      image: "SK",
      stats: { workouts: 32, days: 28, progress: "+18%" },
    },
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
            User Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Users Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their fitness journey with TrainerX.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border ${activeIndex === index ? "border-cyan-800 shadow-lg shadow-cyan-900/10" : "border-gray-800"} relative transition-all duration-300 group`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-bl-full"></div>
              <div className="absolute -top-2 -left-2">
                <Quote className="h-8 w-8 text-cyan-500/20" />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-cyan-500 fill-cyan-500" : "text-gray-600"}`}
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-6 relative z-10">"{testimonial.content}"</p>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-cyan-800/30 to-cyan-600/20 text-cyan-400 w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>

              {/* User stats */}
              <div
                className={`mt-4 pt-4 border-t border-gray-800 grid grid-cols-3 gap-2 transition-all duration-300 ${activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-400">Workouts</div>
                  <div className="text-cyan-500 font-medium">{testimonial.stats.workouts}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Days</div>
                  <div className="text-cyan-500 font-medium">{testimonial.stats.days}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Progress</div>
                  <div className="text-cyan-500 font-medium">{testimonial.stats.progress}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 text-gray-300 hover:text-white transition-colors group">
            <span>Read more success stories</span>
            <svg
              className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
