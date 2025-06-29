import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
import { API_ENDPOINTS } from './config/api.config';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';


// Page d'accueil
const Home = () => {
  const { data: popularData, loading: popularLoading, error: popularError } = useMovies(API_ENDPOINTS.popular);

  if (popularLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }
  if (popularError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Erreur lors du chargement des films : {popularError}
      </div>
    );
  }

  const bgImage = popularData?.results?.[0]?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${popularData.results[0].backdrop_path}`
    : null;

  return (
    <div className="relative min-h-screen w-full">
      {/* FOND DÉGRADÉ PLEIN ÉCRAN FIXE */}
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 -z-10" />
      {/* IMAGE ARRIÈRE-PLAN FILM */}
      {bgImage && (
        <div
          className="fixed inset-0 w-screen h-screen bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: "brightness(0.7)",
          }}
        />
      )}
      {/* OVERLAY COLORÉ LISIBILITÉ */}
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-white/80 via-white/60 to-white/40 -z-10" />

      {/* CONTENU PRINCIPAL */}
      <div className="relative min-h-screen z-20">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">Films Populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {popularData?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="light" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Composant principal App
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/top-rated" element={<Home />} />
          <Route path="/upcoming" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
