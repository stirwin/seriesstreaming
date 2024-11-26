import React from 'react'
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
    userName: string;
    email: string;
    rating: number;
    comment: string;
}

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div className="space-y-6">
            {reviews.map((review: Review, index) => (
                <motion.div 
                    key={index} 
                    className="p-6 bg-[#1f1f1f] rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-white">{review.userName}</h3>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star}
                                    className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                </motion.div>
            ))}
        </div>
    )
}

