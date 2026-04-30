import { useState, useEffect } from 'react';
import { INITIAL_MOVIES } from './constants/initialData';

function App() {

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('filmvault_movies');
    if (savedMovies) {
      try {
        return JSON.parse(savedMovies);
      } catch (error) {
        console.error("Failed to parse movies from localStorage", error);
        return INITIAL_MOVIES;
      }
    }
    return INITIAL_MOVIES;
  });

  useEffect(() => {
    localStorage.setItem('filmvault_movies', JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="app">

      <header style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--accent)', fontSize: '3rem' }}>FilmVault</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          State Persistence Active: {movies.length} movies loaded.
        </p>
      </header>
      
      <main style={{ padding: '0 2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Debug View: Data Schema</h2>
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid var(--border)',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          <pre style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {JSON.stringify(movies, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default App;
