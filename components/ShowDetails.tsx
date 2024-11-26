"use client"
import React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, ThumbsUp, Volume2, X, ChevronDown } from 'lucide-react'
import { useModal } from "@/context/ModalContext"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import ReviewSection from "./ReviewSection"
import { useSession } from "next-auth/react"
import ReviewList from "./ReviewList"
import { motion, AnimatePresence } from "framer-motion"

interface Episode {
    _id: string;
    title: string;
    description: string;
    duration: number;
    thumbnail: string;
}

interface Season {
    _id: string;
    episodes: Episode[];
}

export default function ShowDetails() {
    const { isOpen, closeModal, selectedSerie } = useModal()
    const [selectedSeason, setSelectedSeason] = useState(0)
    const [showFullDescription, setShowFullDescription] = useState(false)
    const { data: session } = useSession();
    const email = session?.user?.email;

    if (!selectedSerie) return null;

    const hasReviewed = selectedSerie.reviews.some((review: any) => review.Email === email);

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-w-7xl p-0 bg-[#0f0f0f] text-white overflow-hidden">
                <ScrollArea className="h-[90vh] w-full">
                    <div>
                        <div className="relative aspect-video w-full overflow-hidden">
                            <img
                                src={selectedSerie.backdrop}
                                alt={selectedSerie.title}
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="px-8 py-6">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-bold mb-4"
                            >
                                {selectedSerie.title}
                            </motion.h1>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8">
                                    <Play className="h-5 w-5 mr-2" /> Play
                                </Button>
                                <Button size="icon" variant="outline" className="rounded-full border-white/20">
                                    <Plus className="h-6 w-6" />
                                </Button>
                                <Button size="icon" variant="outline" className="rounded-full border-white/20">
                                    <ThumbsUp className="h-6 w-6" />
                                </Button>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="grid gap-6"
                            >
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-green-500 font-semibold">{selectedSerie.rating}% Match</span>
                                    <span>{selectedSerie.releaseYear}</span>
                                    <Badge variant="outline" className="border-white/20">16+</Badge>
                                    <span>{selectedSerie.seasons.length} Season{selectedSerie.seasons.length !== 1 ? 's' : ''}</span>
                                    <Badge variant="outline" className="border-white/20">HD</Badge>
                                </div>
                                <div>
                                    <p className={`text-white/80 ${showFullDescription ? '' : 'line-clamp-2'}`}>
                                        {selectedSerie.description}
                                    </p>
                                    <button 
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-white/60 hover:text-white mt-2 flex items-center"
                                    >
                                        {showFullDescription ? 'Show less' : 'Show more'}
                                        <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                                <div className="grid gap-2 text-sm">
                                    <div>
                                        <span className="text-white/60">Genres: </span>
                                        <span>{selectedSerie.genres.join(', ')}</span>
                                    </div>
                                    <div>
                                        <span className="text-white/60">This show is: </span>
                                        <span>Gritty, Suspenseful</span>
                                    </div>
                                </div>
                            </motion.div>
                            {selectedSerie.seasons.length > 1 && (
                                <div className="mt-8">
                                    <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
                                    <Select onValueChange={(value) => setSelectedSeason(Number(value))}>
                                        <SelectTrigger className="w-[180px] bg-[#1f1f1f] text-white border-white/20">
                                            <SelectValue placeholder={`Season ${selectedSeason + 1}`} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1f1f1f] text-white border-white/20">
                                            <SelectGroup>
                                                <SelectLabel>Seasons</SelectLabel>
                                                {selectedSerie.seasons.map((season: Season, index: number) => (
                                                    <SelectItem key={season._id} value={index.toString()}>
                                                        Season {index + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <div className="mt-6">
                                <div className="grid gap-4">
                                    {selectedSerie.seasons[selectedSeason].episodes.map((episode: Episode, index: number) => (
                                        <motion.div 
                                            key={episode._id} 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4 hover:bg-white/5 p-4 rounded-lg transition-colors"
                                        >
                                            <img
                                                src={episode.thumbnail}
                                                alt={episode.title}
                                                className="w-40 h-24 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{index + 1}. {episode.title}</h3>
                                                <p className="text-sm text-white/60 mt-1 line-clamp-2">{episode.description}</p>
                                                <span className="text-sm text-white/40 mt-2 block">{episode.duration} min</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                                {!hasReviewed ? (
                                    <ReviewSection seriesId={selectedSerie._id} />
                                ) : (
                                    <p className="text-green-500">You've already reviewed this series.</p>
                                )}
                                <div className="mt-6">
                                    <ReviewList reviews={selectedSerie.reviews} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

