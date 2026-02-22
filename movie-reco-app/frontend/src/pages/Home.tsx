import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, NewsItem } from '../types';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../hooks/useWatchlist';
import { TrendingUp, Newspaper } from 'lucide-react';

const Home = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [moviesRes, newsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/movies'),
                    axios.get('http://localhost:5000/api/news')
                ]);
                setTrending(moviesRes.data.slice(0, 8).sort((a: Movie, b: Movie) => b.popularity - a.popularity));
                setNews(newsRes.data.slice(0, 4));
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative h-[60vh] rounded-3xl overflow-hidden flex items-end p-8 sm:p-12">
                <img
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">Discover Your Next Obsession</h1>
                    <p className="text-gray-300 text-lg sm:text-xl mb-6">
                        Explore a world of cinema tailored to your unique taste.
                    </p>
                    <button className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
                        Start Browsing
                    </button>
                </div>
            </section>

            {/* Trending Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-primary" />
                    <h2 className="text-2xl font-bold">Trending Now</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trending.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isWatchlisted={isInWatchlist(movie.id)}
                            onToggleWatchlist={toggleWatchlist}
                        />
                    ))}
                </div>
            </section>

            {/* News Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Newspaper className="text-primary" />
                    <h2 className="text-2xl font-bold">Latest in Cinema</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map(item => (
                        <div key={item.id} className="bg-surface p-6 rounded-2xl border border-secondary hover:border-primary/50 transition-colors">
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">{item.tags[0]}</span>
                            <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">{item.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.summary}</p>
                            <span className="text-xs text-secondary-foreground/50">{item.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
