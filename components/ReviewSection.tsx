'use client';
import React, { useState } from 'react'
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { addReview } from '@/actions/seriesActions';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

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
            await addReview(seriesId, rating, comment);
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
            setErrorMessage('There was an error submitting your review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6 bg-[#1f1f1f] p-6 rounded-lg"
        >
            <h3 className="text-2xl font-bold text-white">Leave Your Review</h3>

            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-yellow-400"
                    >
                        <Star
                            className={`h-8 w-8 ${(hoveredRating || rating) >= star ? 'fill-yellow-400' : 'fill-none'}`}
                        />
                    </motion.button>
                ))}
            </div>

            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="h-32 bg-[#2f2f2f] text-white border-none resize-none focus:ring-2 focus:ring-purple-500"
            />

            <AnimatePresence>
                {errorMessage && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500"
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </AnimatePresence>

            <Button
                onClick={handleSubmit}
                disabled={rating === 0 || !comment.trim() || isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition-colors duration-300"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </motion.div>
    )
}

