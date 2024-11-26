"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Menu, Search, User } from 'lucide-react';
import Image from 'next/image';
import UserIcon from '@/components/UserIcon';

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-6">
                    <Menu className="w-6 h-6 text-white cursor-pointer hover:text-purple-400 transition-colors" />
                    <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-400 transition-colors" />
                </div>

                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg"
                        alt="HBO Max"
                        width={120}
                        height={40}
                        className="relative -top-1 border border-white rounded-md p-1"
                    />
                </Link>

                <div className="flex items-center space-x-6">
                    {status === "authenticated" ? (
                         <UserIcon />
                    ) : (
                        <Link href="/login" className="text-white hover:text-purple-400 transition-colors">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

