import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

import heroBg from '../assets/img.png';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Image d'arrière-plan locale */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />
      {/* Overlay sombre/degradé */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-transparent z-10" />
      {/* Navbar en haut */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-black/70 backdrop-blur-sm px-0 md:px-6 py-3 flex items-center justify-center shadow-md">
        <div className="w-full max-w-7xl flex items-center justify-between">
          {/* Logo animé */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="text-3xl md:text-4xl animate-clap text-red-600">🎬</span>
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow">
              Cine<span className="text-red-600">motion</span>
            </span>
          </Link>
          {/* Liens de navigation minimalistes */}
          <ul className="flex gap-8">
            <li><Link to="/" className="text-lg font-light text-white hover:text-red-600 hover:underline underline-offset-8 transition">Accueil</Link></li>
            <li><Link to="/movies" className="text-lg font-light text-white hover:text-red-600 hover:underline underline-offset-8 transition">Films</Link></li>
            <li><Link to="/top-rated" className="text-lg font-light text-white hover:text-red-600 hover:underline underline-offset-8 transition">Mieux notés</Link></li>
            <li><Link to="/upcoming" className="text-lg font-light text-white hover:text-red-600 hover:underline underline-offset-8 transition">À venir</Link></li>
          </ul>
          {/* Recherche et icônes */}
          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="bg-black/40 border border-red-600 text-white placeholder-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-500 w-32 md:w-48 transition-all backdrop-blur-sm"
              />
            </form>
            <FaBell className="text-xl text-white/80 hover:text-red-600 cursor-pointer transition drop-shadow" />
            <FaUserCircle className="text-2xl text-white/80 hover:text-red-600 cursor-pointer transition drop-shadow" />
          </div>
        </div>
      </nav>
      {/* Texte Hero centré */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full select-none">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fadeInUp">
          <span className="text-red-600">Découvrez</span> le meilleur du <span className="text-red-600">cinéma</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-8 animate-fadeInUp delay-100">
          Films, émotions et découvertes sur une plateforme <span className="text-red-500 font-semibold">rouge & noir</span>.
        </p>
        <Link to="/movies" className="inline-block px-8 py-3 rounded-full bg-red-600 text-white font-semibold text-lg shadow-lg hover:bg-red-700 transition animate-fadeInUp delay-200">
          Voir les films
        </Link>
      </div>
    </header>
  );
}
