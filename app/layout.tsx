import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from "@/components/ui/button";
import { Bell, BellIcon, Search } from "lucide-react";
import { SearchInput } from '@/components/SearchInput';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SeriesFlix - Streaming de Series',
  description: 'Tu plataforma de streaming favorita',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#141414]`}>
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-8">
            {/* Netflix Logo */}
            <Link href="/" className="text-red-600 font-bold text-3xl">
              NETFLIX
            </Link>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4 text-sm text-gray-300">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <Link href="/series" className="hover:text-white">Series</Link>
              <Link href="/peliculas" className="hover:text-white">Películas</Link>
              <Link href="/novedades" className="hover:text-white">Novedades populares</Link>
              <Link href="/mi-lista" className="hover:text-white">Mi lista</Link>
              <Link href="/idiomas" className="hover:text-white">Explora por idiomas</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <Search className="w-5 h-5 cursor-pointer" />
            <Link href="/ninos" className="text-sm hover:text-gray-300">Niños</Link>
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer" />
          </div>
        </div>
      </nav>
        {children}
      </body>
    </html>
  );
}
