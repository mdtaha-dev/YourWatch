import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { Movie } from '../types';
import TagChip from './TagChip';

interface MovieCardProps {
    movie: Movie;
    isWatchlisted: boolean;
    onToggleWatchlist: (movie: Movie) => void;
}

const MovieCard = ({ movie, isWatchlisted, onToggleWatchlist }: MovieCardProps) => {
    return (
        <div className="group relative bg-surface rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
            <Link to={`/movies/${movie.id}`}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </Link>

            <button
                onClick={() => onToggleWatchlist(movie)}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${isWatchlisted ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
            >
                {isWatchlisted ? <Check size={20} /> : <Plus size={20} />}
            </button>

            <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="flex items-center gap-2 mb-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="text-sm font-bold">{movie.rating}</span>
                    <span className="text-xs text-gray-400">({movie.year})</span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-2 truncate">{movie.title}</h3>
                <div className="flex flex-wrap gap-1">
                    {movie.tags.slice(0, 3).map(tag => (
                        <TagChip key={tag} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
