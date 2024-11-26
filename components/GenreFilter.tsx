'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const genres = ['All', 'Drama', 'Crime', 'Thriller', 'Sci-Fi', 'Horror'];

export function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentGenre, setCurrentGenre] = useState(searchParams.get('genre') || 'All');

  useEffect(() => {
    setCurrentGenre(searchParams.get('genre') || 'All');
  }, [searchParams]);

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
    <div className="relative inline-block text-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-primary border-secondary text-accent hover:bg-primary/90 hover:text-secondary"
          >
            {currentGenre} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-primary border-secondary">
          {genres.map((genre) => (
            <DropdownMenuItem
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`cursor-pointer ${
                currentGenre === genre
                  ? 'bg-secondary text-accent'
                  : 'text-accent hover:bg-secondary/20'
              }`}
            >
              {genre}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

