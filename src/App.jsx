import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { INITIAL_MOVIES } from './constants/initialData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modal from './components/Modal';
import MovieForm from './components/MovieForm';

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

  const [isModalOpen , setIsModalOpen] = useEffect(false)

  useEffect(() => {
    localStorage.setItem('filmvault_movies', JSON.stringify(movies));
  }, [movies]);

  const topRatedMovie = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating)[0];
  }, [movies]);

  const top3Movies = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [newMovie, ...prev]);
import { X } from 'lucide-react';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
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
                <div key={movie.id} style={{ 
                  height: '400px', 
                  background: 'var(--bg-card)', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)'
                }}>
                  {movie.title} (Top 3)
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">All Movies</h2>
            <div className="movies-grid">
              {movies.map(movie => (
                <div key={movie.id} style={{ 
                  height: '400px', 
                  background: 'var(--bg-card)', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)'
                }}>
                  {movie.title}
                </div>
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