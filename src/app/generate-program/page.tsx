/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { Mic, PhoneOff, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // SOLUTION to get rid of "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold font-mono tracking-tight leading-tight drop-shadow-lg">
            <span>Generate Your </span>
            <span className="text-primary uppercase underline decoration-wavy decoration-4 decoration-primary/80">
              Fitness Program
            </span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            🎙️ Have a voice conversation with our AI assistant to create your personalized plan.
          </p>
        </div>

        {/* Video Call Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* AI Assistant Card */}
          <Card className="relative border border-blue-400/30 backdrop-blur-md bg-gradient-to-tr from-indigo-500/20 to-blue-700/10 shadow-2xl transition-all hover:scale-[1.01] duration-300">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* Voice Animation */}
              <div className={`absolute inset-0 ${isSpeaking ? "opacity-40" : "opacity-0"} transition-opacity duration-300`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 bg-primary rounded-full ${isSpeaking ? "animate-sound-wave" : ""}`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 60 + 20}%` : "10%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Avatar */}
              <div className="relative w-32 h-32 mb-4">
                <div className={`absolute inset-0 bg-primary opacity-30 rounded-full blur-2xl ${isSpeaking ? "animate-pulse" : ""}`} />
                <div className="relative w-full h-full rounded-full bg-gray-800 flex items-center justify-center border border-primary/40 shadow-inner overflow-hidden">
                  <Image
                    src="/ai-avatar.png"
                    alt="AI Assistant"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-semibold">TrainerX</h2>
              <p className="text-sm text-gray-300">Fitness & Diet Coach</p>

              {/* Speaking Indicator */}
              <div className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border ${isSpeaking ? "border-primary" : "border-gray-600"} shadow-sm`}>
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-ping" : "bg-muted"}`} />
                <span className="text-sm text-gray-400">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                      ? "Listening..."
                      : callEnded
                        ? "Redirecting..."
                        : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* User Card */}
          <Card className="relative border border-green-400/30 backdrop-blur-md bg-gradient-to-tr from-green-500/10 to-emerald-700/10 shadow-2xl transition-all hover:scale-[1.01] duration-300">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* User Avatar */}
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-green-400 opacity-25 rounded-full blur-2xl" />
                <div className="relative w-full h-full rounded-full bg-gray-800 flex items-center justify-center border border-green-400/40 overflow-hidden shadow-inner">
                  <img
                    src={user?.imageUrl || "/default-user.png"}
                    alt="User"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-semibold">You</h2>
              <p className="text-sm text-gray-300">{user ? `${user.firstName} ${user.lastName || ""}`.trim() : "Guest"}</p>

              <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-600 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-sm text-gray-400">Ready</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Messages */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="bg-gray-900/70 border border-gray-700 rounded-2xl p-6 mb-16 h-64 overflow-y-auto backdrop-blur-md shadow-xl transition-all duration-300"
          >
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-sm text-gray-500 mb-1">
                    {msg.role === "assistant" ? "TrainerX AI" : "You"}:
                  </div>
                  <p className="text-white">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="w-full flex justify-center gap-6 mt-8">
          <Button
            className={`w-44 text-lg font-semibold rounded-full shadow-xl px-6 py-3 transition-all duration-300
      ${callActive
                ? "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                : callEnded
                  ? "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                  : "bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50"
              } 
      transform transition-all ease-in-out hover:scale-105 active:scale-95`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting
              ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  </svg>
                  Connecting...
                </>
              )
              : callActive
                ? (
                  <>
                    <PhoneOff className="w-5 h-5 mr-2" />
                    End Call
                  </>
                )
                : callEnded
                  ? (
                    <>
                      <User className="w-5 h-5 mr-2" />
                      View Profile
                    </>
                  )
                  : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Start Call
                    </>
                  )}
          </Button>
        </div>

      </div>
    </div>


  );
};
export default GenerateProgramPage;