import { useState, useEffect } from 'react';
import { Movie } from '../types';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('watchlist');
        if (saved) {
            setWatchlist(jsonSafeParse(saved, []));
        }
    }, []);

    const jsonSafeParse = (str: string, fallback: any) => {
        try {
            return JSON.parse(str);
        } catch {
            return fallback;
        }
    };

    const toggleWatchlist = (movie: Movie) => {
        const isWatchlisted = watchlist.some(m => m.id === movie.id);
        let updated;
        if (isWatchlisted) {
            updated = watchlist.filter(m => m.id !== movie.id);
        } else {
            updated = [...watchlist, movie];
        }
        setWatchlist(updated);
        localStorage.setItem('watchlist', JSON.stringify(updated));
    };

    const isInWatchlist = (id: number) => watchlist.some(m => m.id === id);

    return { watchlist, toggleWatchlist, isInWatchlist };
};
