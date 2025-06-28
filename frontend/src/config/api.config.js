export const API_KEY = '98d79a7251b4050b7449d0443748f383';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const BACKDROP_SIZE = 'original';
export const POSTER_SIZE = 'w500';

export const API_ENDPOINTS = {
  trending: `${BASE_URL}/trending/movie/week`,
  popular: `${BASE_URL}/movie/popular`,
  topRated: `${BASE_URL}/movie/top_rated`,
  upcoming: `${BASE_URL}/movie/upcoming`,
  search: `${BASE_URL}/search/movie`,
  movieDetails: (id) => `${BASE_URL}/movie/${id}`,
  movieCredits: (id) => `${BASE_URL}/movie/${id}/credits`,
  movieVideos: (id) => `${BASE_URL}/movie/${id}/videos`,
  movieRecommendations: (id) => `${BASE_URL}/movie/${id}/recommendations`,
}; 