/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { Home, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950 -z-10"></div>

      <div
        className={`max-w-md mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Simple 404 display */}
        <div className="mb-6">
          <div className="inline-block bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-2xl border border-gray-800">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-3 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
