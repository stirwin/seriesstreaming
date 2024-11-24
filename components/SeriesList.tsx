'use client';
import { useState } from 'react';
import Image from 'next/image';
import ShowDetails from './ShowDetails';
import { useModal } from '@/context/ModalContext';

interface SeriesListProps {
  series: any[];
}

export default function SeriesList({ series }: SeriesListProps) {
  const { openModal } = useModal();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {series.map((serie) => (
        <div
          className='cursor-pointer' 
          key={serie._id}
          onClick={() => openModal(serie)}
        >
          <div className="group relative transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="aspect-[2/3] rounded-md overflow-hidden">
              <Image
                src={serie.poster}
                alt={serie.title}
                width={300}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-semibold">{serie.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>{serie.rating.toFixed(1)} ★</span>
                <span>•</span>
                <span>{serie.year}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ShowDetails />
    </div>
  );
}