import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../types';
import TrailerPlayer from '../components/TrailerPlayer';
import TagChip from '../components/TagChip';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../hooks/useWatchlist';
import { Star, Calendar, Globe, ArrowLeft, Loader2 } from 'lucide-react';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [related, setRelated] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const [movieRes, allMoviesRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/movies/${id}`),
                    axios.get('http://localhost:5000/api/movies')
                ]);

                const currentMovie = movieRes.data;
                setMovie(currentMovie);

                // Related movies logic: count overlapping tags, exclude current movie, sort by overlap count
                const otherMovies = allMoviesRes.data.filter((m: Movie) => m.id !== parseInt(id!));
                const relatedMovies = otherMovies
                    .map((m: Movie) => {
                        const overlap = m.tags.filter(t => currentMovie.tags.includes(t)).length;
                        return { ...m, overlap };
                    })
                    .sort((a: any, b: any) => b.overlap - a.overlap)
                    .slice(0, 6);

                setRelated(relatedMovies);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={64} />
        </div>
    );

    if (!movie) return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold">Movie not found</h2>
            <Link to="/movies" className="text-primary hover:underline mt-4 inline-block">Back to Browse</Link>
        </div>
    );

    return (
        <div className="space-y-12">
            <Link to="/movies" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                Back to Movies
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                <div className="space-y-8">
                    <TrailerPlayer url={movie.trailer} />

                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-black">{movie.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-400">
                            <div className="flex items-center gap-1">
                                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                                <span className="text-white font-bold">{movie.rating}</span>/10
                            </div>
                            <div className="flex items-center gap-1 font-medium">
                                <Calendar size={18} />
                                {movie.year}
                            </div>
                            <div className="flex items-center gap-1 font-medium uppercase tracking-widest text-sm">
                                <Globe size={18} />
                                {movie.language}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {movie.tags.map(tag => (
                                <TagChip key={tag} tag={tag} />
                            ))}
                        </div>

                        <button
                            onClick={() => toggleWatchlist(movie)}
                            className={`mt-6 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isInWatchlist(movie.id)
                                    ? 'bg-secondary text-white hover:bg-gray-700'
                                    : 'bg-primary text-white hover:bg-red-700'
                                }`}
                        >
                            {isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </button>
                    </div>
                </div>

                <aside>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full rounded-2xl shadow-2xl border border-secondary"
                    />
                </aside>
            </div>

            <section className="pt-12 border-t border-secondary">
                <h2 className="text-2xl font-bold mb-8">Related Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {related.map(m => (
                        <MovieCard
                            key={m.id}
                            movie={m}
                            isWatchlisted={isInWatchlist(m.id)}
                            onToggleWatchlist={toggleWatchlist}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MovieDetails;
