export interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    language: string;
    poster: string;
    trailer: string;
    tags: string[];
    popularity: number;
}

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    tags: string[];
    summary: string;
}
