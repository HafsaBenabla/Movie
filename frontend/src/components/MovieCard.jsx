import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config/api.config';
import { FaStar, FaPlay, FaInfoCircle } from 'react-icons/fa';

const MovieCard = ({ movie, variant = 'default' }) => {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : '/placeholder.jpg';

  if (variant === 'light') {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-transform duration-300 hover:shadow-primary/40 hover:-translate-y-2 cursor-pointer">
        <img src={imageUrl} alt={movie.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="text-yellow-500 font-bold flex items-center"><FaStar className="mr-1" />{movie.vote_average.toFixed(1)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{movie.overview}</p>
          <div className="flex gap-2">
            <button className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition">Regarder</button>
            <Link to={`/movie/${movie.id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-1"><FaInfoCircle /> Détail</Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="relative h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/original${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative h-full container mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center mb-4 text-sm">
              <span className="flex items-center text-yellow-400">
                <FaStar className="mr-1" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="mx-2">•</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-300">{movie.original_language.toUpperCase()}</span>
            </div>
            <p className="text-gray-300 text-lg mb-8 line-clamp-3">{movie.overview}</p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition">
                <FaPlay />
                <span>Regarder</span>
              </button>
              <Link
                to={`/movie/${movie.id}`}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
              >
                <FaInfoCircle />
                <span>Plus d'infos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group bg-gray-900 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 shadow-xl"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-lg font-bold mb-1 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-yellow-400">
                <FaStar className="mr-1" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 