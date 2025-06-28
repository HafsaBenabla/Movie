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
      {/* Contenu principal */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Logo animé */}
        <Link to="/" className="flex items-center gap-2 select-none mb-6 md:mb-0">
          <span className="text-4xl md:text-5xl animate-clap">🎬</span>
          <span className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow">Cinemotion</span>
        </Link>
        {/* Liens de navigation minimalistes */}
        <ul className="flex gap-8 mb-6 md:mb-0">
          <li><Link to="/" className="text-lg font-light text-white hover:underline underline-offset-8 transition">Accueil</Link></li>
          <li><Link to="/movies" className="text-lg font-light text-white hover:underline underline-offset-8 transition">Films</Link></li>
          <li><Link to="/top-rated" className="text-lg font-light text-white hover:underline underline-offset-8 transition">Mieux notés</Link></li>
          <li><Link to="/upcoming" className="text-lg font-light text-white hover:underline underline-offset-8 transition">À venir</Link></li>
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
              className="bg-white/20 border border-white/40 text-white placeholder-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 w-40 md:w-48 transition-all backdrop-blur-sm"
            />
          </form>
          <FaBell className="text-xl text-white/80 hover:text-pink-400 cursor-pointer transition drop-shadow" />
          <FaUserCircle className="text-2xl text-white/80 hover:text-pink-400 cursor-pointer transition drop-shadow" />
        </div>
      </nav>
    </header>
  );
}
