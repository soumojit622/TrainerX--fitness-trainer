/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { Heart, MessageSquare, Share2, MoreHorizontal, Award, Users, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CommunityFeed() {
    const [activeTab, setActiveTab] = useState("trending")
    const [likedPosts, setLikedPosts] = useState<number[]>([])
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

        const element = document.getElementById("community-feed-section")
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [])

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId))
        } else {
            setLikedPosts([...likedPosts, postId])
        }
    }

    const posts = [
        {
            id: 1,
            user: {
                name: "Sarah K.",
                avatar: "SK",
                badge: "Pro",
            },
            time: "2 hours ago",
            content:
                "Just completed my 100th workout with TrainerX! The AI form correction has improved my squat depth significantly. 💪 #FitnessGoals",
            likes: 128,
            comments: 24,
            shares: 7,
            achievement: {
                title: "100 Workouts",
                icon: <Award className="h-4 w-4" />,
            },
            image: "workout-achievement",
        },
        {
            id: 2,
            user: {
                name: "Michael T.",
                avatar: "MT",
                badge: "Elite",
            },
            time: "Yesterday",
            content:
                "The new HIIT program is no joke! Burned 650 calories in just 35 minutes. TrainerX keeps pushing me to new limits every session.",
            likes: 87,
            comments: 15,
            shares: 3,
            achievement: null,
            image: "hiit-results",
        },
        {
            id: 3,
            user: {
                name: "Arjun S.",
                avatar: "AS",
                badge: "Coach",
            },
            time: "3 days ago",
            content:
                "Hosting a virtual group workout this Saturday using TrainerX's new multiplayer feature. Join me for a full-body strength session! Drop a comment if you're in. 🏋️‍♂️",
            likes: 215,
            comments: 42,
            shares: 18,
            achievement: null,
            image: null,
        },
    ]

    const leaderboard = [
        { name: "Jessica R.", points: 12450, avatar: "JR", rank: 1 },
        { name: "David M.", points: 10820, avatar: "DM", rank: 2 },
        { name: "Sophia L.", points: 9675, avatar: "SL", rank: 3 },
        { name: "Marcus W.", points: 8940, avatar: "MW", rank: 4 },
        { name: "Olivia P.", points: 8215, avatar: "OP", rank: 5 },
    ]

    const challenges = [
        {
            title: "30-Day Strength Challenge",
            participants: 1842,
            daysLeft: 12,
            progress: 60,
        },
        {
            title: "Summer Shred",
            participants: 3156,
            daysLeft: 25,
            progress: 16,
        },
        {
            title: "Yoga Flow Marathon",
            participants: 978,
            daysLeft: 5,
            progress: 83,
        },
    ]

    return (
        <div id="community-feed-section" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Community
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Join the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                            TrainerX Community
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Connect with fitness enthusiasts, share your achievements, and participate in challenges to stay motivated.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-2">
                        {/* Feed Tabs */}
                        <div className="flex border-b border-gray-800 mb-6">
                            {[
                                { id: "trending", label: "Trending" },
                                { id: "latest", label: "Latest" },
                                { id: "following", label: "Following" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "text-cyan-500" : "text-gray-400 hover:text-gray-300"
                                        }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500"></span>}
                                </button>
                            ))}
                        </div>

                        {/* Posts */}
                        <div className="space-y-6">
                            {posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    {/* Post Header */}
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gradient-to-br from-cyan-800/30 to-cyan-600/20 text-cyan-400 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                                                {post.user.avatar}
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="font-medium">{post.user.name}</span>
                                                    {post.user.badge && (
                                                        <span className="ml-2 bg-cyan-500/20 text-cyan-500 text-xs px-1.5 py-0.5 rounded">
                                                            {post.user.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">{post.time}</div>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-white p-1 rounded-full transition-colors">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Post Content */}
                                    <div className="px-4 pb-2">
                                        <p className="text-gray-300 mb-3">{post.content}</p>

                                        {/* Achievement */}
                                        {post.achievement && (
                                            <div className="bg-gradient-to-r from-cyan-900/20 to-cyan-800/10 rounded-lg p-3 border border-cyan-900/30 mb-3 flex items-center gap-3">
                                                <div className="bg-cyan-500/20 rounded-full p-2 text-cyan-500">{post.achievement.icon}</div>
                                                <div>
                                                    <div className="text-sm font-medium text-cyan-400">Achievement Unlocked</div>
                                                    <div className="text-xs text-gray-400">{post.achievement.title}</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Post Image */}
                                        {post.image && (
                                            <div className="mt-3 mb-4 bg-gray-800 h-48 rounded-lg overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-cyan-800/5 flex items-center justify-center">
                                                    <Zap className="h-12 w-12 text-cyan-500/30" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Post Actions */}
                                    <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
                                        <button
                                            className={`flex items-center gap-1.5 ${likedPosts.includes(post.id) ? "text-cyan-500" : "text-gray-400 hover:text-cyan-500"
                                                } transition-colors`}
                                            onClick={() => toggleLike(post.id)}
                                        >
                                            <Heart className={`h-5 w-5 ${likedPosts.includes(post.id) ? "fill-cyan-500" : ""}`} />
                                            <span className="text-sm">{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-500 transition-colors">
                                            <MessageSquare className="h-5 w-5" />
                                            <span className="text-sm">{post.comments}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-500 transition-colors">
                                            <Share2 className="h-5 w-5" />
                                            <span className="text-sm">{post.shares}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View More */}
                        <div className="text-center mt-8">
                            <button className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-900/50 text-gray-300 hover:text-white px-6 py-2 rounded-lg transition-all">
                                Load More Posts
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Leaderboard */}
                        <div
                            className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                        >
                            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                <h3 className="font-medium">Leaderboard</h3>
                                <div className="text-xs text-cyan-500">This Week</div>
                            </div>
                            <div className="p-4">
                                {leaderboard.map((user, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 text-center font-medium text-sm text-gray-400">#{user.rank}</div>
                                            <div className="bg-gradient-to-br from-cyan-800/30 to-cyan-600/20 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                                                {user.avatar}
                                            </div>
                                            <div className="text-sm">{user.name}</div>
                                        </div>
                                        <div className="text-sm text-cyan-500 font-medium">{user.points.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-800 text-center">
                                <Link
                                    href="#"
                                    className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center"
                                >
                                    View Full Leaderboard
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Active Challenges */}
                        <div
                            className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                            style={{ transitionDelay: "150ms" }}
                        >
                            <div className="p-4 border-b border-gray-800">
                                <h3 className="font-medium">Active Challenges</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {challenges.map((challenge, index) => (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-sm font-medium">{challenge.title}</h4>
                                            <div className="text-xs text-cyan-500">{challenge.daysLeft} days left</div>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 mb-2">
                                            <Users className="h-3 w-3 mr-1" />
                                            {challenge.participants.toLocaleString()} participants
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                                                style={{ width: `${challenge.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-right mt-1 text-gray-400">{challenge.progress}% complete</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-800 text-center">
                                <Link
                                    href="#"
                                    className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center"
                                >
                                    Join a Challenge
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Create Post */}
                        <div
                            className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                            style={{ transitionDelay: "300ms" }}
                        >
                            <div className="p-4">
                                <h3 className="font-medium mb-3">Share Your Progress</h3>
                                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-gray-400 mb-3">
                                    What's your fitness achievement today?
                                </div>
                                <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium py-2 rounded-md transition-all duration-300">
                                    Create Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
