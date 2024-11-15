export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export interface Episode {
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Series {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  releaseYear: number;
  poster: string;
  backdrop: string;
  rating: number;
  numberOfRatings: number;
  views: number;
  seasons: Season[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}