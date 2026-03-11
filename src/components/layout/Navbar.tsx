"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Cpu, Globe, ChevronDown, ShoppingCart, LogOut } from "lucide-react";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="w-full bg-[#0B0E14] border-b border-white/5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left Side: Logo */}
                    <div className="flex-shrink-0 flex items-center pr-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Cpu className="text-[#00FFFF] w-8 h-8 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all" />
                            <span className="text-2xl font-extrabold tracking-wider text-white">
                                CORE <span className="text-[#FF007F]">&</span> GEAR
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex items-center flex-1 justify-center space-x-8">
                        {["COMPONENTS", "PRE-BUILT PCS", "PERIPHERALS", "SUPPORT"].map((link) => (
                            <Link
                                key={link}
                                href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                                className="text-sm font-semibold tracking-wide text-slate-300 hover:text-[#00FFFF] transition-colors"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Actions */}
                    <div className="hidden sm:flex items-center pl-8 space-x-6">

                        {/* User Profile / Auth */}
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full py-1.5 px-3 cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00FFFF] to-[#FF007F] flex items-center justify-center text-white font-bold mr-3 shadow-inner overflow-hidden">
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                                        ) : (
                                            session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-slate-200 mr-2 max-w-[100px] truncate">
                                        {session.user?.name?.split(" ")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="text-slate-400 hover:text-[#FF007F] transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="bg-[#00FFFF]/10 hover:bg-[#00FFFF]/20 border border-[#00FFFF]/30 text-[#00FFFF] px-4 py-2 rounded-md text-sm font-bold tracking-wide transition-colors uppercase"
                            >
                                Log In
                            </Link>
                        )}

                        {/* Language Dropdown */}
                        <div className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors">
                            <Globe className="w-5 h-5" />
                            <span className="text-sm font-semibold">AR</span>
                            <ChevronDown className="w-4 h-4 opacity-70" />
                        </div>

                        {/* Currency Dropdown */}
                        <div className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors">
                            <span className="text-sm font-semibold tracking-wide">ILS ₪</span>
                            <ChevronDown className="w-4 h-4 opacity-70" />
                        </div>

                        {/* Cart Icon */}
                        <div className="relative cursor-pointer text-slate-300 hover:text-[#00FFFF] transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1.5 -right-2 bg-[#FF007F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
}
