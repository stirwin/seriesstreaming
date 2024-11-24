"use client"
import React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, ThumbsUp, Volume2, X } from 'lucide-react'
import { useModal } from "@/context/ModalContext"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

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

    if (!selectedSerie) return null;

    console.log(selectedSerie);

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSeason(Number(event.target.value))
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-w-6xl p-0 bg-black text-white">
                <ScrollArea className="h-[90vh] w-full">
                    <div>
                        <div className="relative z-50 aspect-video w-full overflow-hidden">
                            <img
                                src={selectedSerie.backdrop}
                                alt={selectedSerie.title}
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 rounded-full bg-neutral-900 p-2 hover:bg-neutral-800"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h1 className="mb-4 text-4xl font-bold">{selectedSerie.title}</h1>
                                <div className="flex items-center gap-3">
                                    <Button size="lg" className="gap-2">
                                        <Play className="h-5 w-5" /> Siguiente episodio
                                    </Button>
                                    <Button size="icon" className="rounded-full border-white/30">
                                        <Plus className="h-6 w-6" />
                                    </Button>
                                    <Button size="icon" className="rounded-full border-white/30">
                                        <ThumbsUp className="h-6 w-6" />
                                    </Button>
                                    <div className="ml-auto">
                                        <Button size="icon" className="rounded-full border-white/30">
                                            <Volume2 className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 p-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">{selectedSerie.releaseYear}</span>
                                <Badge >16+</Badge>
                                <span className="text-sm text-muted-foreground">{selectedSerie.seasons.length} Temporada</span>
                                <Badge >HD</Badge>
                            </div>
                            <p className="text-white">{selectedSerie.description}</p>
                            <div className="grid gap-2">
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Géneros: </span>
                                    <span>{selectedSerie.genres}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Este título es: </span>
                                    <span>Crudo, Imaginativo</span>
                                </div>
                            </div>
                            {selectedSerie.seasons.length > 1 && (
                                <div className="mt-4 text-black">
                                    <label htmlFor="season-select" className="text-sm text-muted-foreground">Selecciona una temporada:</label>
                                    <Select onValueChange={(value) => setSelectedSeason(Number(value))}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={`Temporada ${selectedSeason + 1}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Temporadas</SelectLabel>
                                                {selectedSerie.seasons.map((season: Season, index: number) => (
                                                    <SelectItem key={season._id} value={index.toString()}>
                                                        Temporada {index + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">Episodios</h2>
                                <div className="grid gap-4 mt-2">
                                    {selectedSerie.seasons[selectedSeason].episodes.map((episode: Episode) => (
                                        <div key={episode._id} className="flex gap-4">
                                            <img
                                                src={episode.thumbnail}
                                                alt={episode.title}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{episode.title}</h3>
                                                <p className="text-sm text-muted-foreground">{episode.description}</p>
                                                <span className="text-sm text-muted-foreground">{episode.duration} min</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>




            {/* <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="fixed inset-x-4 top-[5%] z-50 mx-auto max-w-6xl rounded-xl bg-black shadow-lg">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                        <img
                            src={selectedSerie.backdrop}
                            alt={selectedSerie.title}
                            className="w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <button
                            onClick={closeModal}
                            className="absolute right-4 top-4 rounded-full bg-neutral-900 p-2 hover:bg-neutral-800"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="mb-4 text-4xl font-bold">Arcane</h1>
                            <div className="flex items-center gap-3">
                                <Button size="lg" className="gap-2">
                                    <Play className="h-5 w-5" /> Siguiente episodio
                                </Button>
                                <Button size="icon" variant="outline" className="rounded-full border-white/30">
                                    <Plus className="h-6 w-6" />
                                </Button>
                                <Button size="icon" variant="outline" className="rounded-full border-white/30">
                                    <ThumbsUp className="h-6 w-6" />
                                </Button>
                                <div className="ml-auto">
                                    <Button size="icon" variant="outline" className="rounded-full border-white/30">
                                        <Volume2 className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 p-6">
                        <div className="flex items-center gap-4">
                            <Badge className="bg-red-600 text-white hover:bg-red-600">TOP 10</Badge>
                            <span className="text-sm text-green-500">N.º 3 en TV hoy</span>
                            <span className="text-sm text-muted-foreground">2024</span>
                            <Badge variant="outline">16+</Badge>
                            <span className="text-sm text-muted-foreground">2 temporadas</span>
                            <Badge variant="outline">HD</Badge>
                        </div>
                        <p className="text-lg">
                            En esta saga ganadora del Emmy®, dos hermanas tienen un amargo enfrentamiento y acaban en bandos opuestos de una
                            guerra arrasadora. «Una verdadera obra maestra» (IGN).
                        </p>
                        <div className="grid gap-2">
                            <div className="text-sm">
                                <span className="text-muted-foreground">Elenco: </span>
                                <span>Hailee Steinfeld, Ella Purnell, Kevin Alejandro, más</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-muted-foreground">Géneros: </span>
                                <span>Series de acción y aventura, Series de EE. UU., Series de fantasía</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-muted-foreground">Este título es: </span>
                                <span>Crudo, Imaginativo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </Dialog >

    )
}
