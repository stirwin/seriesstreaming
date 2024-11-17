import { Suspense } from 'react';
import SeriesList from '@/components/SeriesList';
import { GenreFilter } from '@/components/GenreFilter';
import { SearchInput } from '@/components/SearchInput';
import { getSeries } from '@/actions/seriesActions';
import { Button } from "@/components/ui/button";
import { BellIcon, SearchIcon } from "lucide-react";
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Series Streaming',
  description: 'Browse your favorite series'
};

export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string; search?: string; }
}) {
  const genre = searchParams?.genre || undefined;
  const search = searchParams?.search || undefined;
  
  const series = await getSeries(genre, search);

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gradient-to-b from-black/70 to-transparent px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Links */}
          <div className="flex items-center space-x-8">
            <h1 className="text-red-600 text-2xl font-bold">SERIESFLIX</h1>
            <div className="hidden md:flex space-x-4 text-sm text-gray-300">
              <a href="#" className="hover:text-white">Inicio</a>
              <a href="#" className="hover:text-white">Series</a>
              <a href="#" className="hover:text-white">Mi Lista</a>
            </div>
          </div>

          {/* Búsqueda y Perfil */}
          <div className="flex items-center space-x-4">
            <SearchInput />
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5 text-gray-200" />
            </Button>
            <div className="w-8 h-8 rounded overflow-hidden">
              <Image
                src="/avatar-placeholder.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent z-10" />
        <div className="absolute bottom-32 left-12 z-20">
          <h2 className="text-6xl font-bold text-white mb-4">Series Destacadas</h2>
          <p className="text-lg text-gray-200 w-1/2 mb-6">
            Descubre las mejores series y disfruta de una experiencia única de streaming.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200">
              ▶ Reproducir
            </Button>
            <Button className="bg-gray-500/70 text-white hover:bg-gray-500/50">
              ℹ Más información
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-20 px-12 pb-12 -mt-32">
        {/* Filtros */}
        <div className="flex items-center space-x-4 mb-8">
          <GenreFilter />
        </div>

        {/* Lista de Series */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Populares en SeriesFlix</h3>
            <Suspense fallback={
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-48 h-72 bg-gray-800 animate-pulse rounded" />
                ))}
              </div>
            }>
              <SeriesList series={series} />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}