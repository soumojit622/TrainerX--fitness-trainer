/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { useState } from "react"

export default function CallToAction() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute"></div>

      <div className="max-w-5xl mx-auto relative">
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-800 shadow-[0_10px_50px_rgba(8,145,178,0.2)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950"></div>

          {/* Animated background elements */}
          <div
            className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
          ></div>
          <div
            className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
          ></div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

          {/* Content */}
          <div className="relative p-8 md:p-12 z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 text-cyan-500 px-4 py-1 rounded-full mb-6 border border-cyan-900/50">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Transform Your Fitness</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start your transformation{" "}
                <span className="relative">
                  <span className="relative z-10">today.</span>
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0"></span>
                </span>
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Join thousands of users who have already revolutionized their fitness journey with TrainerX's AI-powered
                personal training.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#"
                  className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-8 py-4 rounded-md transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
                  <span className="relative">Get Started Now</span>
                  <ArrowRight className="h-5 w-5 relative transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#"
                  className="group relative bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 overflow-hidden inline-flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
                  <span className="relative">View Demo</span>
                </Link>
              </div>

              <div className="mt-8 text-gray-400 text-sm">
                <p>No credit card required for free trial</p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-12 h-12 border border-cyan-900/50 rounded-lg"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border border-cyan-900/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
