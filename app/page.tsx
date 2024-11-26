import { Suspense } from 'react';
import SeriesList from '@/components/SeriesList';
import { GenreFilter } from '@/components/GenreFilter';
import { getSeries } from '@/actions/seriesActions';
import FeaturedCollection from '@/components/FeaturedCollection';
import { ModalProvider } from '@/context/ModalContext';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'HBO Max Clone',
  description: 'Stream your favorite series and movies'
};

export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string; search?: string; }
}) {
  const genre = searchParams?.genre || undefined;
  const search = searchParams?.search || undefined;

  const series = await getSeries(genre, search);

  if (!series || series.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <h1>No content available</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Featured Collection */}
      <div className="relative w-full">
        <FeaturedCollection series={series.slice(0, 5)} />
      </div>

      {/* Main Content */}
      <main className="px-12 pb-12 space-y-8">
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <GenreFilter />
        </div>

        {/* Series Lists */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Max Originals</h2>
            <Suspense fallback={
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-48 h-72 bg-gray-800 animate-pulse rounded-lg" />
                ))}
              </div>
            }>
              <ModalProvider>
                <SeriesList series={series} />
              </ModalProvider>
            </Suspense>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Popular on HBO Max</h2>
            <Suspense fallback={
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-48 h-72 bg-gray-800 animate-pulse rounded-lg" />
                ))}
              </div>
            }>
              <ModalProvider>
                <SeriesList series={series.slice().reverse()} />
              </ModalProvider>
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}

