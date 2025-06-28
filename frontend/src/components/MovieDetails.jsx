import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaPlay, FaStar } from 'react-icons/fa';
import { useMovies } from '../hooks/useMovies';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api.config';

const API_KEY = '98d79a7251b4050b7449d0443748f383';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movieData, loading: movieLoading } = useMovies(API_ENDPOINTS.movieDetails(id));
    const { data: creditsData, loading: creditsLoading } = useMovies(API_ENDPOINTS.movieCredits(id));
    const { data: videosData, loading: videosLoading } = useMovies(API_ENDPOINTS.movieVideos(id));
    const { data: recommendationsData, loading: recommendationsLoading } = useMovies(API_ENDPOINTS.movieRecommendations(id));

    if (movieLoading || creditsLoading || videosLoading || recommendationsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!movieData) return null;

    const director = creditsData?.crew?.find(person => person.job === 'Director');
    const cast = creditsData?.cast?.slice(0, 5) || [];
    const trailer = videosData?.results?.find(video => video.type === 'Trailer') || videosData?.results[0];

    return (
        <div className="min-h-screen bg-gray-900 pt-20">
            {/* Hero Section */}
            <div className="relative h-[70vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${IMAGE_BASE_URL}/original${movieData.backdrop_path})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                <div className="relative container mx-auto px-6 h-full flex items-center">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <img
                            src={`${IMAGE_BASE_URL}/w500${movieData.poster_path}`}
                            alt={movieData.title}
                            className="w-64 rounded-lg shadow-2xl"
                        />
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movieData.title}</h1>
                            <div className="flex items-center gap-4 text-sm mb-6">
                                <span className="flex items-center text-yellow-400">
                                    <FaStar className="mr-1" />
                                    {movieData.vote_average.toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{new Date(movieData.release_date).getFullYear()}</span>
                                <span>•</span>
                                <span>{Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}min</span>
                            </div>
                            <p className="text-gray-300 text-lg mb-8">{movieData.overview}</p>
                            <div className="space-y-4">
                                {director && (
                                    <p className="text-sm">
                                        <span className="text-gray-400">Réalisateur: </span>
                                        <span className="text-white">{director.name}</span>
                                    </p>
                                )}
                                {cast.length > 0 && (
                                    <p className="text-sm">
                                        <span className="text-gray-400">Casting: </span>
                                        <span className="text-white">{cast.map(actor => actor.name).join(', ')}</span>
                                    </p>
                                )}
                                <div className="flex gap-4 mt-8">
                                    {trailer && (
                                        <a
                                            href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
                                        >
                                            <FaPlay />
                                            <span>Voir la bande-annonce</span>
                                        </a>
                                    )}
                                    <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition">
                                        <FaHeart />
                                        <span>Ajouter aux favoris</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Films recommandés */}
            {recommendationsData?.results.length > 0 && (
                <section className="py-12">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-bold mb-6">Films similaires</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {recommendationsData.results.slice(0, 10).map(movie => (
                                <div key={movie.id} className="group relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105">
                                    <img
                                        src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-[300px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 p-4">
                                            <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                                            <div className="flex items-center text-sm">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                <span>{movie.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MovieDetails;
