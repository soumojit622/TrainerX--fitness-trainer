"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(1) // Default highlight Pro plan
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Free",
      price: { monthly: "$0", yearly: "$0" },
      period: "forever",
      description: "Basic AI-powered workouts for casual fitness enthusiasts.",
      features: [
        "3 AI-generated workouts per week",
        "Basic form analysis",
        "Standard progress tracking",
        "Limited exercise library",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: { monthly: "$14.99", yearly: "$149.90" },
      period: "per month",
      yearlyPeriod: "per year",
      description: "Advanced AI features for dedicated fitness enthusiasts.",
      features: [
        "Unlimited AI-generated workouts",
        "Advanced form analysis & feedback",
        "Detailed progress analytics",
        "Full exercise library access",
        "Custom workout scheduling",
        "Priority support",
      ],
      cta: "Start 7-Day Trial",
      highlight: true,
      badge: "Most Popular",
      savings: "$30 savings",
    },
    {
      name: "Elite",
      price: { monthly: "$29.99", yearly: "$299.90" },
      period: "per month",
      yearlyPeriod: "per year",
      description: "Premium experience for maximum fitness results.",
      features: [
        "Everything in Pro plan",
        "1-on-1 virtual coaching sessions",
        "Nutrition planning & tracking",
        "Advanced biometric integration",
        "Custom fitness goal programming",
        "Early access to new features",
      ],
      cta: "Start 7-Day Trial",
      highlight: false,
      savings: "$60 savings",
    },
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full bg-cyan-950/50 border border-cyan-900/50 text-cyan-400 text-sm">
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your fitness goals and budget.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border ${
                hoveredPlan === index
                  ? "border-cyan-500 shadow-lg shadow-cyan-900/20"
                  : plan.highlight
                    ? "border-cyan-800"
                    : "border-gray-800"
              } flex flex-col h-full relative transition-all duration-300`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(plan.highlight ? 1 : null)}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black text-xs font-medium px-3 py-1 rounded-bl-lg">
                  {plan.badge}
                </div>
              )}

              <div className={`p-6 ${plan.highlight ? "bg-cyan-900/20" : ""}`}>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">
                    {billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === "monthly" ? plan.period : plan.yearlyPeriod || "year"}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                {billingCycle === "yearly" && plan.savings && (
                  <div className="bg-cyan-900/20 text-cyan-400 text-xs font-medium px-2 py-1 rounded-md inline-block mb-2">
                    {plan.savings}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-1 ${plan.highlight || hoveredPlan === index ? "bg-cyan-500/20 text-cyan-500" : "bg-gray-800 text-gray-300"}`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="#"
                  className={`group block text-center py-3 rounded-md font-medium transition-all duration-300 ${
                    plan.highlight || hoveredPlan === index
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {plan.cta}
                    <ArrowRight
                      className={`ml-2 h-4 w-4 transition-transform ${hoveredPlan === index ? "group-hover:translate-x-1" : ""}`}
                    />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Solutions</h3>
              <p className="text-gray-400">
                Custom AI fitness solutions for gyms, corporate wellness programs, and fitness studios.
              </p>
            </div>
            <Link
              href="#"
              className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-medium px-6 py-3 rounded-md transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
