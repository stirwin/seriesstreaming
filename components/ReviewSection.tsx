'use client';
import React, { useState } from 'react'
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { addReview } from '@/actions/seriesActions';
import { useSession } from 'next-auth/react';

interface ReviewSectionProps {
    seriesId: string;
}

export default function ReviewSection({ seriesId }: ReviewSectionProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async () => {

        if (rating === 0 || !comment.trim()) return;
    
        setIsSubmitting(true);
        setErrorMessage('');
    
    
        try {
            await addReview(
                seriesId,
                rating,
                comment
            );
    
            // Limpiar el formulario
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
            setErrorMessage('Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Deja tu reseña</h3>

            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        className="text-yellow-400"
                    >
                        <Star
                            className={`h-5 w-5 ${(hoveredRating || rating) >= star ? 'fill-yellow-400' : 'fill-none'
                                }`}
                        />
                    </button>
                ))}
            </div>

            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="h-24 text-black"
            />

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <Button
                onClick={handleSubmit}
                disabled={rating === 0 || !comment.trim() || isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : 'Enviar reseña'}
            </Button>
        </div>
    )
}

