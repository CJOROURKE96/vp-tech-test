import React from 'react';
import '../styles/starRating.css';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating); // Number of full stars
  const hasHalfStar = roundedRating % 1 !== 0; // Check for half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="star-rating">
      {'★'
        .repeat(fullStars)
        .split('')
        .map((star, index) => (
          <span key={index} className="star full">
            {star}
          </span>
        ))}

      {hasHalfStar && <span className="star half">★</span>}

      {'☆'
        .repeat(emptyStars)
        .split('')
        .map((star, index) => (
          <span key={fullStars + index + 1} className="star empty">
            {star}
          </span>
        ))}
    </div>
  );
};

export default StarRating;
