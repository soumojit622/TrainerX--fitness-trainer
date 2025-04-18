"use client";

import {
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import {
    DumbbellIcon,
    HomeIcon,
    MenuIcon,
    UserIcon,
    XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

const MainNavbar = () => {
    const { isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Close drawer on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border py-3 shadow-sm">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group" onClick={closeMenu}>
                    <Image
                        src="/logo.png"
                        alt="TrainerX Logo"
                        width={32}
                        height={32}
                        className="rounded shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="text-2xl font-extrabold font-mono tracking-tight text-foreground">
                        Trainer<span className="text-primary">X.</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-5">
                    {isSignedIn ? (
                        <>
                            <NavLink href="/" icon={<HomeIcon size={16} />} text="Home" />
                            <NavLink
                                href="/generate-program"
                                icon={<DumbbellIcon size={16} />}
                                text="Generate"
                            />
                            <NavLink
                                href="/profile"
                                icon={<UserIcon size={16} />}
                                text="Profile"
                            />
                            <Button
                                asChild
                                variant="outline"
                                className="ml-2 border-primary text-primary hover:text-white hover:bg-primary/90 transition-colors"
                            >
                                <Link href="/generate-program">Get Started</Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <>
                            <SignInButton>
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:text-white hover:bg-primary/90 transition-colors"
                                >
                                    Sign In
                                </Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </>
                    )}
                </nav>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden p-2 rounded hover:bg-primary/10 transition"
                    onClick={toggleMenu}
                >
                    {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" />
            )}

            {/* Mobile Drawer – Dark Mode Compatible */}
            <div
                ref={drawerRef}
                className={clsx(
                    "fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out md:hidden",
                    isOpen ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="px-6 pt-6 pb-8 rounded-b-2xl shadow-xl bg-background border-b border-border flex flex-col items-center space-y-8">

                    {/* Title or Logo */}
                    <div className="text-xl font-semibold tracking-wide text-primary">
                        TrainerX.
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full space-y-4">
                        {isSignedIn && (
                            <>
                                <MobileNavLink
                                    href="/"
                                    icon={<HomeIcon size={20} />}
                                    text="Home"
                                    closeMenu={closeMenu}
                                    className="group hover:bg-primary/20 transition-all duration-300 rounded-md p-3"
                                />
                                <MobileNavLink
                                    href="/generate-program"
                                    icon={<DumbbellIcon size={20} />}
                                    text="Generate"
                                    closeMenu={closeMenu}
                                    className="group hover:bg-primary/20 transition-all duration-300 rounded-md p-3"
                                />
                                <MobileNavLink
                                    href="/profile"
                                    icon={<UserIcon size={20} />}
                                    text="Profile"
                                    closeMenu={closeMenu}
                                    className="group hover:bg-primary/20 transition-all duration-300 rounded-md p-3"
                                />
                            </>

                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-border" />

                    {/* Call-to-Actions */}
                    <div className="w-full space-y-3">
                        {isSignedIn ? (
                            <>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Link href="/generate-program" onClick={closeMenu}>
                                        Get Started
                                    </Link>
                                </Button>
                                <div className="flex justify-center">
                                    <UserButton />
                                </div>
                            </>
                        ) : (
                            <>
                                <SignInButton>
                                    <Button
                                        variant="outline"
                                        className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all"
                                    >
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all">
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </>
                        )}
                    </div>
                </div>
            </div>



        </header>
    );
};

// Reusable NavLink for desktop
const NavLink = ({
    href,
    icon,
    text,
}: {
    href: string;
    icon: React.ReactNode;
    text: string;
}) => (
    <Link
        href={href}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
    >
        {icon}
        {text}
    </Link>
);

// Reusable NavLink for mobile
const MobileNavLink = ({
    href,
    icon,
    text,
    closeMenu,
    className = "",
}: {
    href: string;
    icon: React.ReactNode;
    text: string;
    closeMenu: () => void;
    className?: string;
}) => (
    <Link
        href={href}
        onClick={closeMenu}
        className={clsx(
            "flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-primary transition-all duration-200",
            className
        )}
    >
        <span className="group-hover:text-primary">{icon}</span>
        <span className="group-hover:text-primary">{text}</span>
    </Link>
);


export default MainNavbar;
