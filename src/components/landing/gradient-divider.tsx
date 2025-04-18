"use client"

import { useEffect, useState } from "react"

export default function GradientDivider() {
  const [isVisible, setIsVisible] = useState(false)
  const [uniqueId] = useState(() => Math.random().toString(36).substring(2, 10))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`gradient-divider-${uniqueId}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [uniqueId])

  return (
    <div id={`gradient-divider-${uniqueId}`} className="relative h-px w-full max-w-7xl mx-auto my-12">
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-out ${
          isVisible ? "transform-none" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(8, 145, 178, 0.5) 50%, transparent 100%)",
        }}
      ></div>

      <div
        className={`absolute inset-0 blur-md transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(8, 145, 178, 0.3) 50%, transparent 100%)",
        }}
      ></div>
    </div>
  )
}
