from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

def load_data(filename):
    path = os.path.join(os.path.dirname(__file__), 'data', filename)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/api/movies', methods=['GET'])
def get_movies():
    movies = load_data('movies.json')
    
    # Filtering params
    tags_param = request.args.get('tags')
    language = request.args.get('language')
    min_rating = request.args.get('minRating')

    filtered_movies = movies

    if tags_param:
        target_tags = [t.strip().lower() for t in tags_param.split(',')]
        filtered_movies = [
            m for m in filtered_movies 
            if all(t.lower() in [mt.lower() for mt in m.get('tags', [])] for t in target_tags)
        ]

    if language:
        filtered_movies = [m for m in filtered_movies if m.get('language', '').lower() == language.lower()]

    if min_rating:
        try:
            min_r = float(min_rating)
            filtered_movies = [m for m in filtered_movies if m.get('rating', 0) >= min_r]
        except ValueError:
            pass

    return jsonify(filtered_movies)

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movies = load_data('movies.json')
    movie = next((m for m in movies if m['id'] == movie_id), None)
    if movie:
        return jsonify(movie)
    return jsonify({"error": "Movie not found"}), 404

@app.route('/api/news', methods=['GET'])
def get_news():
    news = load_data('news.json')
    tags_param = request.args.get('tags')
    
    if tags_param:
        target_tags = [t.strip().lower() for t in tags_param.split(',')]
        news = [
            n for n in news 
            if any(t.lower() in [nt.lower() for nt in n.get('tags', [])] for t in target_tags)
        ]
        
    return jsonify(news)

if __name__ == '__main__':
    # Using default port 5000
    app.run(debug=True, port=5000)
