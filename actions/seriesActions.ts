'use server';
import Series from '@/lib/models/series';
import connectDB from '@/lib/db';
import { auth } from '@/auth';

interface Review {
  _id: string;
  userName: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export async function getSeries(genre?: string, search?: string) {
  try {
    await connectDB();

    let query: any = {};

    if (genre && genre !== 'All') {
      query.genres = genre;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const series = await Series.find(query)
      .sort({ rating: -1, views: -1 })
      .limit(20);

    // Convertir a objetos simples
    const plainSeries = series.map((s) => s.toObject());

    return plainSeries;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
}

/**
 * Agregar un review a una serie específica.
 */
export async function addReview(
  seriesId: string,
  rating: number,
  comment: string
) {
  const session = await auth();
  console.log('Session:', session);

  if (!session || !session.user || !session.user.email) {
    throw new Error('User is not authenticated or email is missing');
  }

  const email = "brayanfe2009@gmail.com";
  const userName = session.user.name;

  try {
    await connectDB();

    const series = await Series.findById(seriesId);
    if (!series) throw new Error('Series not found');

    console.log('Current reviews:', series.reviews);

    if (!email || !userName || !rating || !comment) {
      throw new Error('Missing required fields for review');
    }

    const newReview = {
      userName,
      Email: email,
      rating,
      comment,
    };

    series.reviews.push(newReview);

    await series.validate(); // Forzar validación del esquema antes de guardar
    const updatedSeries = await series.save();

    const plainSeries = updatedSeries.toObject();

    plainSeries._id = plainSeries._id.toString();
    plainSeries.reviews = plainSeries.reviews.map((review: Review) => ({
      ...review,
      _id: review._id.toString(),
    }));

    return plainSeries;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}


export async function incrementViews(seriesId: string) {
  try {
    await connectDB();
    const series = await Series.findByIdAndUpdate(
      seriesId,
      { $inc: { views: 1 } },
      { new: true }
    );
    return series;
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
} 