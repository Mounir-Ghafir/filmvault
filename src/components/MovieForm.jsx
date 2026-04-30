import { useState } from 'react';
import { MOVIE_GENRES } from '../constants/initialData';

function MovieForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    year: new Date().getFullYear(),
    genre: MOVIE_GENRES[0],
    director: '',
    actors: '',
    image: '',
    trailer: '',
    rating: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
      actors: typeof formData.actors === 'string' 
        ? formData.actors.split(',').map(a => a.trim()).filter(a => a !== '')
        : formData.actors
    };
    
    onSubmit(processedData);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input 
          type="text" id="title" name="title" required 
          value={formData.title} onChange={handleChange}
          placeholder="e.g. Inception"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">Release Year</label>
          <input 
            type="number" id="year" name="year" required 
            value={formData.year} onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={formData.genre} onChange={handleChange}>
            {MOVIE_GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" name="description" required rows="3"
          value={formData.description} onChange={handleChange}
          placeholder="Brief plot summary..."
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input 
            type="text" id="director" name="director" required 
            value={formData.director} onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <input 
            type="number" id="rating" name="rating" min="1" max="5" required 
            value={formData.rating} onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="actors">Main Actors (comma separated)</label>
        <input 
          type="text" id="actors" name="actors" required 
          value={formData.actors} onChange={handleChange}
          placeholder="Actor 1, Actor 2, ..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input 
          type="url" id="image" name="image" required 
          value={formData.image} onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="trailer">Trailer URL (YouTube)</label>
        <input 
          type="url" id="trailer" name="trailer" required 
          value={formData.trailer} onChange={handleChange}
          placeholder="https://youtube.com/..."
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-submit">
          {initialData ? 'Update Movie' : 'Add Movie'}
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
