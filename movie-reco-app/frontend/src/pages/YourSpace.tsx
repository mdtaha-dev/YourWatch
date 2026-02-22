import { useState, useEffect } from 'react';
import api from "../api/axios";
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import TagChip from '../components/TagChip';
import { useWatchlist } from '../hooks/useWatchlist';
import { Sparkles, Settings2, Loader2 } from 'lucide-react';

const ALL_TAGS = [
    'Action', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Comedy',
    'Mind-bending', 'Emotional', 'Dark', 'Feel-good', 'Fast-paced'
];

const YourSpace = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    useEffect(() => {
        const savedTags = localStorage.getItem('user_tags');
        if (savedTags) {
            const tags = JSON.parse(savedTags);
            setSelectedTags(tags);
            fetchRecommendations(tags);
        } else {
            setShowOnboarding(true);
            setLoading(false);
        }
    }, []);

    const fetchRecommendations = async (tags: string[]) => {
        setLoading(true);
        try {
            const res = await api.get('/api/movies');
            const allMovies = res.data;

            // Sort by number of matching tags
            const personalized = allMovies
                .map((m: Movie) => {
                    const matchCount = m.tags.filter(t => tags.includes(t)).length;
                    return { ...m, matchCount };
                })
                .filter((m: any) => m.matchCount > 0)
                .sort((a: any, b: any) => b.matchCount - a.matchCount || b.popularity - a.popularity);

            setMovies(personalized);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTags = () => {
        localStorage.setItem('user_tags', JSON.stringify(selectedTags));
        setShowOnboarding(false);
        fetchRecommendations(selectedTags);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="space-y-12">
            {/* Onboarding Modal Overlay */}
            {showOnboarding && (
                <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="max-w-xl w-full bg-surface border border-secondary p-8 rounded-3xl shadow-2xl">
                        <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
                            <Sparkles className="text-primary" />
                            Welcome to Your Space
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Tell us what you love, and we'll build a feed just for you. No algorithms, just your favorite tags.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {ALL_TAGS.map(tag => (
                                <TagChip
                                    key={tag}
                                    tag={tag}
                                    active={selectedTags.includes(tag)}
                                    onClick={toggleTag}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleSaveTags}
                            disabled={selectedTags.length === 0}
                            className="w-full bg-primary hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Generate My Feed
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black mb-2">Your Personal Feed</h1>
                    <p className="text-gray-400">Curated based on: {selectedTags.join(', ')}</p>
                </div>
                <button
                    onClick={() => setShowOnboarding(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-gray-700 transition-colors text-sm font-bold"
                >
                    <Settings2 size={16} />
                    Change My Tags
                </button>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={48} />
                </div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="bg-surface p-20 rounded-3xl text-center border border-secondary">
                    <h3 className="text-2xl font-bold mb-4">Your space is empty</h3>
                    <p className="text-gray-400 mb-8">Try selecting more tags to see movies you'll love.</p>
                    <button
                        onClick={() => setShowOnboarding(true)}
                        className="text-primary font-bold hover:underline"
                    >
                        Update Your Tags
                    </button>
                </div>
            )}
        </div>
    );
};

export default YourSpace;
