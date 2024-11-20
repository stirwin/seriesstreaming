import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from "@/components/ui/button";
import { Bell, BellIcon, Search } from "lucide-react";
import { SearchInput } from '@/components/SearchInput';
import Image from 'next/image';
import Link from 'next/link';
import UserIcon from '@/components/UserIcon';
import { Providers } from './Providers';
import Navbar from '@/components/navbar';

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
        <Providers>
          {/* Navbar */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
