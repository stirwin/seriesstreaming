'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from 'next/image';
import { Button } from "./ui/button";
import { Info, Play, Star } from 'lucide-react';
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion";

interface Season {
    _id: string;
    number: number;
    episodes: number;
}

interface Series {
    _id: string;
    title: string;
    description: string;
    poster: string;
    backdrop: string;
    badge?: string;
    rating?: number;
    year?: number;
    seasons?: Season[];
}

function Herosection({ series }: { series: Series[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    )

    if (!series || series.length === 0) {
        return (
            <div className="w-full h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">No series available</h2>
            </div>
        );
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {series.map((serie, index) => (
                    <CarouselItem key={serie._id || index} className="relative w-full">
                        <div className="w-full h-[80vh] relative overflow-hidden">
                            <Image
                                src={serie.backdrop}
                                alt={serie.title || 'Serie poster'}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-transparent" />
                            
                            {/* Serie Info */}
                            <motion.div 
                                className="absolute top-1/4 left-[8%] right-[8%] text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {/* Badge */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="text-xs font-bold bg-purple-500 px-2 py-1 rounded-full">
                                        {serie.badge || 'Featured Series'}
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 max-w-2xl">
                                    {serie.title}
                                </h1>

                                {/* Description */}
                                <p className="text-lg max-w-xl mb-6 text-gray-200">
                                    {serie.description}
                                </p>

                                {/* Buttons */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <Button className="bg-white text-purple-900 hover:bg-gray-200 font-semibold px-8 py-3 text-lg rounded-full transition-colors duration-300">
                                        <Play className="mr-2 h-5 w-5" /> Watch Now
                                    </Button>
                                    <Button variant="outline" className="border-2 border-white bg-transparent hover:bg-white/20 text-white font-semibold px-8 py-3 text-lg rounded-full transition-colors duration-300">
                                        <Info className="mr-2 h-5 w-5" /> More Info
                                    </Button>
                                </div>

                                {/* Rating and Additional Info */}
                                <div className="flex items-center space-x-4 text-sm">
                                    {serie.rating && (
                                        <div className="flex items-center">
                                            <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                            <span className="font-bold">{serie.rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                    {serie.year && <span>{serie.year}</span>}
                                    {serie.seasons && serie.seasons.length > 0 && (
                                        <span>{serie.seasons.length} season{serie.seasons.length !== 1 ? 's' : ''}</span>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
          
        </Carousel>
    );
}

export default Herosection;

