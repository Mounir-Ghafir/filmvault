import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { INITIAL_MOVIES } from './constants/initialData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modal from './components/Modal';
import MovieForm from './components/MovieForm';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('filmvault_movies');
    if (savedMovies) {
      try {
        return JSON.parse(savedMovies);
      } catch (error) {
        console.error("Failed to parse movies", error);
        return INITIAL_MOVIES;
      }
    }
    return INITIAL_MOVIES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('filmvault_movies', JSON.stringify(movies));
  }, [movies]);

  const topRatedMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    return [...movies].sort((a, b) => b.rating - a.rating)[0];
  }, [movies]);

  const top3Movies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [newMovie, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Navbar onAddClick={() => setIsModalOpen(true)} />
      
      <main>
        <Hero movie={topRatedMovie} />

        <div className="container">
          <section>
            <h2 className="section-title">Top Rated Movies</h2>
            <div className="movies-grid">
              {top3Movies.map(movie => (
                <MovieCard key={`top-${movie.id}`} movie={movie} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">All Movies</h2>
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Movie"
      >
        <MovieForm 
          onSubmit={handleAddMovie} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}

export default App;
