import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.tsx';
import Movies from './pages/Movies.tsx';
import MovieDetails from './pages/MovieDetails.tsx';
import YourSpace from './pages/YourSpace.tsx';
import WatchlistPage from './pages/WatchlistPage.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/your-space" element={<YourSpace />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
