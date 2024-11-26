'use client';
import { useState } from 'react';
import Image from 'next/image';
import ShowDetails from './ShowDetails';
import { useModal } from '@/context/ModalContext';
import { motion } from 'framer-motion';

interface SeriesListProps {
  series: any[];
}

export default function SeriesList({ series }: SeriesListProps) {
  const { openModal } = useModal();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {series.map((serie) => (
        <motion.div
          key={serie._id}
          className="cursor-pointer"
          onClick={() => openModal(serie)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src={serie.poster}
              alt={serie.title}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{serie.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mt-1">
                  <span>{serie.rating.toFixed(1)} ★</span>
                  <span>•</span>
                  <span>{serie.year}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <ShowDetails />
    </div>
  );
}

