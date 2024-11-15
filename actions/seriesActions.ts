'use server';
import Series from '@/lib/models/series';
import connectDB from '@/lib/db';

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
        
      return JSON.parse(JSON.stringify(series));
    } catch (error) {
      console.error('Error fetching series:', error);
      throw error;
    }
  }

export async function addReview(
  seriesId: string,
  userId: string,
  userName: string,
  rating: number,
  comment: string
) {
  try {
    await connectDB();
    const series = await Series.findById(seriesId);
    if (!series) throw new Error('Series not found');

    series.reviews.push({
      userId,
      userName,
      rating,
      comment,
      likes: 0,
      dislikes: 0
    });

    await series.save();
    return series;
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