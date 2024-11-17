'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from 'next/image';
import { Button } from "./ui/button";
import { Info, Play } from "lucide-react";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

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
    badge?: string;
    rating?: number;
    year?: number;
    seasons?: Season[];
}

function Herosection({ series }: { series: Series[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    if (!series || series.length === 0) {
        return (
            <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
                <h2 className="text-white">No hay series disponibles</h2>
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
            <CarouselContent className="-ml-1">
                {series.map((serie, index) => (
                    <CarouselItem key={serie._id || index} className="pl-1 relative w-full">
                        <div className="w-full h-screen relative">
                            <Image
                                src={serie.poster}
                                alt={serie.title || 'Serie poster'}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                            {/* serie */}
                            <div className="absolute top-[25vh] left-[4%] right-[4%]">
                                {/* Badge */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="text-red-600 font-bold text-sm bg-red-600/20 px-2 py-1">
                                        {serie.badge || 'Serie'}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="w-full max-w-[600px] mb-6">
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-wide text-white">
                                        {serie.title}
                                    </h1>
                                </div>

                                {/* Description */}
                                <p className="text-white text-xl max-w-[600px] mb-6">
                                    {serie.description}
                                </p>

                                {/* Buttons */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <Button className="bg-white hover:bg-white/90 text-black font-semibold px-8 py-6 text-xl">
                                        <Play className="mr-2" /> Reproducir
                                    </Button>
                                    <Button variant="secondary" className="bg-gray-500/70 hover:bg-gray-500/50 text-white font-semibold px-8 py-6 text-xl">
                                        <Info className="mr-2" /> Más información
                                    </Button>
                                </div>
                            </div>

                            {/* Rating and Additional Info */}
                            <div className="absolute bottom-[10%] right-[4%] flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500 font-bold">
                                        {serie.rating ? `${serie.rating.toFixed(1)}★` : 'Nueva'}
                                    </span>
                                    {serie.year && (
                                        <>
                                            <span className="text-white">•</span>
                                            <span className="text-white">{serie.year}</span>
                                        </>
                                    )}
                                    {serie.seasons && serie.seasons.length > 0 && (
                                        <>
                                            <span className="text-white">•</span>
                                            <span className="text-white">
                                                {serie.seasons.length} temporada{serie.seasons.length !== 1 ? 's' : ''}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute bottom-4 right-14 flex gap-2">
                <CarouselPrevious className="bg-white/20 hover:bg-white/30 text-white" />
                <CarouselNext className="bg-white/20 hover:bg-white/30 text-white" />
            </div>
        </Carousel>
    );
}

export default Herosection;