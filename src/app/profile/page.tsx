"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoFitnessPlan from "@/components/NoFitnessPlan";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CornerElements from "@/components/CornerElements";
import MainNavbar from "@/components/MainNavbar";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  return (
    <section className="relative z-10 pt-8 md:pt-12 pb-24 md:pb-32 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
      <MainNavbar />
      <div className="mt-10 md:mt-16">
        <ProfileHeader user={user} />

        {allPlans && allPlans.length > 0 ? (
          <div className="space-y-8">
            {/* PLAN SELECTOR */}
            <div className="relative backdrop-blur-md border border-border p-4 sm:p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <CornerElements />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  <span className="text-primary">Your</span>{" "}
                  <span className="text-foreground">Fitness Plans</span>
                </h2>
                <div className="font-mono text-sm text-muted-foreground">
                  TOTAL: {allPlans.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {allPlans.map((plan) => (
                  <Button
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`text-sm sm:text-base text-foreground border hover:text-white rounded-lg px-4 sm:px-6 py-2 transition-colors duration-300 ${selectedPlanId === plan._id
                      ? "bg-primary/20 text-primary border-primary"
                      : "bg-transparent border-border hover:border-primary/50"
                      }`}
                  >
                    {plan.name}
                    {plan.isActive && (
                      <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* PLAN DETAILS */}
            {currentPlan && (
              <div className="relative backdrop-blur-md border border-border rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <CornerElements />

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    PLAN: <span className="text-primary">{currentPlan.name}</span>
                  </h3>
                </div>

                <Tabs defaultValue="workout" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-2 bg-cyber-terminal-bg border rounded-xl overflow-hidden">
                    <TabsTrigger
                      value="workout"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary py-2 sm:py-3 text-base sm:text-lg font-semibold transition-colors duration-300"
                    >
                      <DumbbellIcon className="mr-2 size-4" />
                      Workout Plan
                    </TabsTrigger>
                    <TabsTrigger
                      value="diet"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary py-2 sm:py-3 text-base sm:text-lg font-semibold transition-colors duration-300"
                    >
                      <AppleIcon className="mr-2 h-4 w-4" />
                      Diet Plan
                    </TabsTrigger>
                  </TabsList>

                  {/* Workout Tab */}
                  <TabsContent value="workout">
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <span className="font-mono text-sm text-muted-foreground">
                          SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                        </span>
                      </div>

                      <Accordion type="multiple" className="space-y-6">
                        {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                          <AccordionItem
                            key={index}
                            value={exerciseDay.day}
                            className="border border-border rounded-lg overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline hover:bg-primary/10 font-mono text-lg transition-all duration-200">
                              <div className="flex justify-between w-full items-center">
                                <span className="text-primary">{exerciseDay.day}</span>
                                <div className="text-xs text-muted-foreground">
                                  {exerciseDay.routines.length} EXERCISES
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 px-4 sm:px-6">
                              <div className="space-y-4 mt-4">
                                {exerciseDay.routines.map((routine, routineIndex) => (
                                  <div
                                    key={routineIndex}
                                    className="border border-border rounded-lg p-4 bg-background/60"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-4 gap-2">
                                      <h4 className="font-semibold text-foreground">{routine.name}</h4>
                                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                        <div className="px-3 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                          {routine.sets} SETS
                                        </div>
                                        <div className="px-3 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                          {routine.reps} REPS
                                        </div>
                                      </div>
                                    </div>
                                    {routine.description && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {routine.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  {/* Diet Tab */}
                  <TabsContent value="diet">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-sm text-muted-foreground">
                          DAILY CALORIE TARGET
                        </span>
                        <div className="font-mono text-2xl text-primary">
                          {currentPlan.dietPlan.dailyCalories} KCAL
                        </div>
                      </div>

                      <div className="h-px w-full bg-border my-6"></div>

                      <div className="space-y-6">
                        {currentPlan.dietPlan.meals.map((meal, index) => (
                          <div
                            key={index}
                            className="border border-border rounded-lg overflow-hidden p-4 sm:p-6 bg-background/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <h4 className="font-mono text-lg text-primary">{meal.name}</h4>
                            </div>
                            <ul className="space-y-4">
                              {meal.foods.map((food, foodIndex) => (
                                <li
                                  key={foodIndex}
                                  className="flex items-center gap-3 text-sm text-muted-foreground"
                                >
                                  <span className="text-xs text-primary font-mono">
                                    {String(foodIndex + 1).padStart(2, "0")}
                                  </span>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ) : (
          <NoFitnessPlan />
        )}
      </div>
    </section>

  );
};
export default ProfilePage;