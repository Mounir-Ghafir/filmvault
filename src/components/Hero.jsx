import { Play, Info } from 'lucide-react';

function Hero({ movie }) {
  if (!movie) return null;

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <img src={movie.image} alt={movie.title} className="hero-image" />
      <div className="hero-content">
        <span className="hero-badge">Featured Movie</span>
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-description">{movie.description}</p>
        <div className="hero-actions">
          <button className="btn-primary">
            <Play size={20} fill="currentColor" />
            Watch Trailer
          </button>
          <button className="btn-secondary">
            <Info size={20} />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
