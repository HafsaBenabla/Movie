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
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Overlay sombre/degradé */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-transparent z-10 pointer-events-none" />
      {/* Navbar en haut */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/70 backdrop-blur-sm px-0 md:px-6 py-3 flex items-center justify-center shadow-md pointer-events-auto">
        <div className="w-full max-w-7xl flex items-center justify-between">
          {/* Logo animé */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="text-3xl md:text-4xl animate-clap">🎬</span>
          </Link>
          {/* Liens de navigation minimalistes */}
          <ul className="flex gap-8">
            <li><Link to="/" className="text-lg font-light text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent hover:underline underline-offset-8 transition">Accueil</Link></li>
            <li><Link to="/movies" className="text-lg font-light text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent hover:underline underline-offset-8 transition">Films</Link></li>
            <li><Link to="/top-rated" className="text-lg font-light text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent hover:underline underline-offset-8 transition">Mieux notés</Link></li>
            <li><Link to="/upcoming" className="text-lg font-light text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent hover:underline underline-offset-8 transition">À venir</Link></li>
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
                className="bg-black/40 border border-yellow-400 text-white placeholder-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-400 w-32 md:w-48 transition-all backdrop-blur-sm"
              />
            </form>
            <FaBell className="text-xl text-white/80 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent cursor-pointer transition drop-shadow" />
            <FaUserCircle className="text-2xl text-white/80 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent cursor-pointer transition drop-shadow" />
          </div>
        </div>
      </nav>
      {/* Texte Hero centré */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full select-none">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-fadeInUp">
          Plongez dans l’univers du cinéma — <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">Action, émotion, chef-d’œuvres !</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-8 animate-fadeInUp delay-100">
          Un monde de films à portée de clic
        </p>
        <Link to="/movies" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-semibold text-lg shadow-lg hover:from-yellow-500 hover:to-yellow-400 transition animate-fadeInUp delay-200">
          Voir les films
        </Link>
      </div>
    </header>
  );
}
