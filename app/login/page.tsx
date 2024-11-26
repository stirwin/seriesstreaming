'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#01057D] via-[#04038C] to-[#000B76] relative overflow-hidden">
            {/* Background Grid of Shows */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 opacity-40 blur-sm">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg">
                        <Image
                            src={`https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg`}
                            alt=""
                            width={300}
                            height={450}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8 text-center"
                >
                    {/* Logo */}
                    <div className="mb-12">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg"
                            alt="HBO Max Logo"
                            width={180}
                            height={60}
                            className="mx-auto"
                        />
                    </div>

                    {/* Welcome Text */}
                    <div className="space-y-4 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Welcome to Max
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Dive into all your favorites, and explore an expanded catalog with new stories to discover.
                        </p>
                    </div>

                    {/* Sign In Button */}
                    <div className="space-y-4">
                        <Button
                            onClick={() => signIn('google')}
                            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-6 rounded-full transition-colors duration-300 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span>Sign in with Google</span>
                        </Button>

                        <p className="text-gray-400 text-sm">
                            Questions? Visit our <a href="help.hbomax.com/upgrade" className="text-white hover:underline">Help Center</a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

