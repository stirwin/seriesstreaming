import { Suspense } from 'react';
import SeriesList from '@/components/SeriesList';
import { GenreFilter } from '@/components/GenreFilter';
import { SearchInput } from '@/components/SearchInput';
import { getSeries } from '@/actions/seriesActions';

// Marca la página como dinámica
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
  // Proporciona valores por defecto
  const genre = searchParams?.genre || undefined;
  const search = searchParams?.search || undefined;
  
  const series = await getSeries(genre, search);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Popular Series</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchInput />
          <GenreFilter />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <SeriesList series={series} />
        </Suspense>
      </div>
    </main>
  );
}