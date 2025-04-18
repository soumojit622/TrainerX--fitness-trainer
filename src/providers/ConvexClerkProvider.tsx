"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { shadesOfPurple } from "@clerk/themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClerkProvider({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            appearance={{
                baseTheme: shadesOfPurple,
                variables: {
                    colorPrimary: "#00B5D9",
                    colorBackground: "#0f172a",
                    colorInputBackground: "#1a202c",
                    colorInputText: "#E0F7FA",
                },
                elements: {
                    formButtonPrimary:
                        "bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transform transition duration-200 ease-in-out",
                    card: "bg-cyan-800 text-white rounded-lg shadow-lg",
                    headerTitle: "text-cyan-400 text-3xl font-semibold",
                    headerSubtitle: "text-cyan-300 text-xl font-light",
                    formFieldInput:
                        "bg-cyan-900 border border-cyan-600 text-white rounded-md p-2 transition duration-150 ease-in-out focus:ring-2 focus:ring-cyan-500",
                    formFieldLabel: "text-cyan-200 text-sm font-semibold",
                    formButtonSecondary:
                        "bg-cyan-500 hover:bg-cyan-600 text-white rounded-md shadow-sm",
                },
            }}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

export default ConvexClerkProvider;
