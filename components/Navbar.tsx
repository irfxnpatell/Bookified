"use client";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add new", href: "/pricing" },
    { label: "Tutorials", href: "/Books/new" }
];

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
    return (
        <header className="w-full fixed z-50 bg-[--bg-primary] text-[--text-secondary]">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-1.5 items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="Bookified Logo"
                        width={42}
                        height={26}
                    />
                    <span className="logo-text">Bookified</span>
                </Link>
                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href }) => {
                        const isActive =
                            pathName === href ||
                            (href !== "/" && pathName.startsWith(href));
                        return (
                            <Link
                                href={href}
                                key={href}
                                className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-3">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="nav-btn">Sign In</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="btn-primary !px-4 !py-2 !text-sm">Sign Up</button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                        {user?.firstName && (
                            <Link href="/subscriptions" className="nav-user-name">
                                {user.firstName}
                            </Link>
                        )}
                    </Show>
                </div>
            </div>
        </header>
    );
};

export default Navbar