'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      router.push(`/?${params.toString()}`);
    }, 300),
    [router, searchParams]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <input
      type="search"
      placeholder="Search series..."
      value={searchTerm}
      onChange={handleSearch}
      className="px-4 py-2 border rounded-lg w-full md:w-64"
    />
  );
}