"use client"

import { useEffect, useState, useRef } from "react"

export default function BackgroundSpots() {
    const [scrollY, setScrollY] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY * 0.05)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                })
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Top right glow */}
            <div
                className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
                style={{
                    top: "0",
                    right: "0",
                    transform: `translate(${33 + mousePosition.x * 2}%, ${-50 + mousePosition.y * 2 + scrollY * 0.5}px)`,
                    transition: "transform 0.5s ease-out",
                }}
            ></div>

            {/* Bottom left glow */}
            <div
                className="absolute w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px]"
                style={{
                    bottom: "0",
                    left: "0",
                    transform: `translate(${-25 + -mousePosition.x * 2}%, ${33 + -mousePosition.y * 2 - scrollY * 0.3}px)`,
                    transition: "transform 0.5s ease-out",
                }}
            ></div>

            {/* Center glow */}
            <div
                className="absolute w-[900px] h-[900px] bg-cyan-950/30 rounded-full blur-[180px] opacity-70"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(${(-50 + mousePosition.x * 1)}%, ${-50 + mousePosition.y * 1}%) scale(${1 + scrollY * 0.001})`,
                    transition: "transform 0.5s ease-out",
                }}
            ></div>

            {/* Small accent spots */}
            <div
                className="absolute w-6 h-6 bg-cyan-500/30 rounded-full blur-sm animate-pulse-glow"
                style={{ top: "20%", left: "15%", transform: `translateY(${scrollY * 0.8}px)` }}
            ></div>
            <div
                className="absolute w-4 h-4 bg-cyan-500/40 rounded-full blur-sm animate-pulse-glow"
                style={{ top: "70%", right: "20%", transform: `translateY(${-scrollY * 0.6}px)`, animationDelay: "0.5s" }}
            ></div>
            <div
                className="absolute w-8 h-8 bg-cyan-500/20 rounded-full blur-md animate-pulse-glow"
                style={{ top: "40%", right: "10%", transform: `translateY(${scrollY * 0.4}px)`, animationDelay: "1s" }}
            ></div>
            <div
                className="absolute w-5 h-5 bg-cyan-500/30 rounded-full blur-sm animate-pulse-glow"
                style={{ bottom: "30%", left: "25%", transform: `translateY(${-scrollY * 0.7}px)`, animationDelay: "1.5s" }}
            ></div>

            {/* Animated particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 30 }).map((_, i) => {
                    const randomTop = Math.random() * 100
                    const randomLeft = Math.random() * 100
                    const randomSize = 1 + Math.random() * 2
                    const randomOpacity = 0.1 + Math.random() * 0.3
                    const randomDuration = 5 + Math.random() * 10
                    const randomDelay = Math.random() * 5
                    const randomScrollOffset = scrollY * (0.2 + Math.random() * 0.8)

                    return (
                        <div
                            key={i}
                            className="absolute bg-cyan-500/30 rounded-full animate-float"
                            style={{
                                top: `${randomTop}%`,
                                left: `${randomLeft}%`,
                                width: `${randomSize}px`,
                                height: `${randomSize}px`,
                                opacity: randomOpacity,
                                transform: `translateY(${randomScrollOffset}px)`,
                                boxShadow: "0 0 10px rgba(8, 145, 178, 0.5)",
                                animationDuration: `${randomDuration}s`,
                                animationDelay: `${randomDelay}s`,
                            }}
                        ></div>
                    )
                })}
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"
                style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            ></div>

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            ></div>
        </div>
    )
}
