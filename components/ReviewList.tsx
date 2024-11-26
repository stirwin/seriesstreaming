import React from 'react'

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
        <div>
            {reviews.map((review: Review, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                    <h3 className="font-bold">{review.userName}</h3>
                    <div className="flex items-center">
                        <span className="text-yellow-500">
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(5 - review.rating)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">({review.rating} estrellas)</span>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                </div>
            ))}
        </div>
    )
}
