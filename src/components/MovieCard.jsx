import StarRating from './StarRating';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-card-image-container">
        <img src={movie.image} alt={movie.title} className="movie-card-image" />
        <div className="movie-card-rating-badge">
          <StarRating rating={movie.rating} size={12} />
        </div>
      </div>
      <div className="movie-card-content">
        <div className="movie-card-header">
          <span className="movie-card-year">{movie.year}</span>
          <span className="movie-card-genre">{movie.genre}</span>
        </div>
        <h3 className="movie-card-title">{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
