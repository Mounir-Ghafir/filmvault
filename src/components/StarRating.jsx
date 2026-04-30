import { Star } from 'lucide-react';

function StarRating({ rating, maxRating = 5, size = 16 }) {
  return (
    <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < rating ? "var(--accent)" : "transparent"}
          color={index < rating ? "var(--accent)" : "var(--text-muted)"}
        />
      ))}
    </div>
  );
}

export default StarRating;
