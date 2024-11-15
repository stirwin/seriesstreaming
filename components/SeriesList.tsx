'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Series } from '../app/types/series';

interface SeriesListProps {
  series: Series[];
}

export default function SeriesList({ series }: SeriesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {series.map((serie) => (
        <div key={serie._id} className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-48">
            <Image
              src={serie.poster}
              alt={serie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{serie.title}</h3>
            <p className="text-gray-600 mb-2">{serie.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{serie.rating.toFixed(1)}</span>
                <span className="ml-2 text-gray-500">({serie.numberOfRatings} reviews)</span>
              </div>
              <span className="text-gray-500">{serie.views} views</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {serie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}