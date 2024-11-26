import { Schema, model, models } from 'mongoose';

const reviewSchema = new Schema({
  userName: { type: String, required: true },
  Email: { type: String, required: false }, // Asegúrate de que este campo esté presente
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const episodeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  thumbnail: { type: String, required: true }
});

const seasonSchema = new Schema({
  number: { type: Number, required: true },
  episodes: [episodeSchema]
});

const seriesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  releaseYear: { type: Number, required: true },
  poster: { type: String, required: true },
  backdrop: { type: String, required: true },
  rating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  seasons: [seasonSchema],
  reviews: [reviewSchema]
}, { timestamps: true });

// Middleware para calcular el rating promedio
seriesSchema.pre('save', function(next) {
  if (this.reviews?.length > 0) {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
    this.numberOfRatings = this.reviews.length;
  }
  next();
});

const Series = models.Series || model('Series', seriesSchema);
export default Series;