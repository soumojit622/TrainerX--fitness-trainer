/* eslint-disable @next/next/no-img-element */
import { UserResource } from "@clerk/types";
import CornerElements from "./CornerElements";

const ProfileHeader = ({ user }: { user: UserResource | null | undefined }) => {
    if (!user) return null;
    return (
        <div className="mb-10 relative backdrop-blur-md border border-border p-8 rounded-lg shadow-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/20">
            <CornerElements />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                    {user.imageUrl ? (
                        <div className="relative w-28 h-28 overflow-hidden rounded-xl border-4 border-primary/60 shadow-lg">
                            <img
                                src={user.imageUrl}
                                alt={user.fullName || "Profile"}
                                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            />
                        </div>
                    ) : (
                        <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shadow-lg">
                            <span className="text-4xl font-bold text-primary tracking-wider">
                                {user.fullName?.charAt(0) || "U"}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-500 border-2 border-background shadow-md"></div>
                </div>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                            {user.fullName}
                        </h1>
                        <div className="flex items-center bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded-full px-4 py-2">
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse mr-3"></div>
                            <p className="text-sm font-mono text-primary">USER ACTIVE</p>
                        </div>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-30 my-4"></div>
                    <p className="text-muted-foreground font-mono text-lg">
                        {user.primaryEmailAddress?.emailAddress}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
