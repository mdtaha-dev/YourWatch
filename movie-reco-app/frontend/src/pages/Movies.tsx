import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import { useWatchlist } from '../hooks/useWatchlist';
import { Loader2 } from 'lucide-react';

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [language, setLanguage] = useState('');
    const [minRating, setMinRating] = useState(0);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
            if (language) params.append('language', language);
            if (minRating > 0) params.append('minRating', minRating.toString());

            const res = await axios.get(`http://localhost:5000/api/movies?${params.toString()}`);
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedTags, language, minRating]);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchMovies();
        }, 300);
        return () => clearTimeout(handler);
    }, [fetchMovies]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-9">
            <aside className="lg:h-[calc(100vh-120px)] lg:overflow-y-auto pr-2">
                <FilterBar
                    selectedTags={selectedTags}
                    onToggleTag={toggleTag}
                    language={language}
                    onLanguageChange={setLanguage}
                    minRating={minRating}
                    onRatingChange={setMinRating}
                />
            </aside>

            <main className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Browse Movies</h2>
                    <span className="text-gray-400">{movies.length} Results</span>
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {movies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isWatchlisted={isInWatchlist(movie.id)}
                                onToggleWatchlist={toggleWatchlist}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface p-12 rounded-3xl text-center border border-secondary">
                        <h3 className="text-2xl font-bold mb-2">No movies found</h3>
                        <p className="text-gray-400">Try adjusting your filters to find something else.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Movies;
