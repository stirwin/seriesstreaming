'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const genres = ['All', 'Drama', 'Crime', 'Thriller', 'Sci-Fi', 'Horror'];

export function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get('genre') || 'All';

  const handleGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (genre === 'All') {
      params.delete('genre');
    } else {
      params.set('genre', genre);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreChange(genre)}
          className={`px-4 py-2 rounded-full ${
            currentGenre === genre
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}