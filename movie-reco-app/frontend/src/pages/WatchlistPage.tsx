import { useWatchlist } from '../hooks/useWatchlist';
import MovieCard from '../components/MovieCard';
import { Bookmark, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchlistPage = () => {
    const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <Bookmark className="text-primary" size={32} />
                <h1 className="text-4xl font-black">My Watchlist</h1>
                <span className="ml-2 text-gray-500 font-bold bg-secondary px-3 py-1 rounded-full text-sm">
                    {watchlist.length}
                </span>
            </div>

            {watchlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlist.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isWatchlisted={isInWatchlist(movie.id)}
                            onToggleWatchlist={toggleWatchlist}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-surface py-32 rounded-3xl text-center border border-dashed border-secondary">
                    <div className="inline-block p-4 bg-secondary rounded-full mb-6">
                        <Film size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No movies in your watchlist yet</h2>
                    <p className="text-gray-400 mb-8">Start exploring and save your favorites here!</p>
                    <Link
                        to="/movies"
                        className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all inline-block"
                    >
                        Browse Movies
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
