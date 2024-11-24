'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ModalContextType {
    isOpen: boolean
    openModal: (serie: any) => void
    closeModal: () => void
    selectedSerie: any
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedSerie, setSelectedSerie] = useState<any>(null)

    const openModal = (serie: any) => {
        setSelectedSerie(serie)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setSelectedSerie(null)
    }

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, selectedSerie }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}