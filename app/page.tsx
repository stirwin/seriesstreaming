import { Suspense } from 'react';
import SeriesList from '@/components/SeriesList';
import { GenreFilter } from '@/components/GenreFilter';
import { getSeries } from '@/actions/seriesActions';
import Herosection from '@/components/Herosection';
import { ModalProvider } from '@/context/ModalContext';

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

  console.log(series);

  // Si no hay series, mostrar un mensaje
  if (!series || series.length === 0) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <h1>No hay series disponibles</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Hero Section */}
      <div className="relative w-full">
        <Herosection series={series} />
      </div>

      {/* Main Content */}
      <main className="relative z-20 px-12 pb-12 -mt-32">
        {/* Filtros   */}
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
              <ModalProvider>
                <SeriesList series={series} />
              </ModalProvider>
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}