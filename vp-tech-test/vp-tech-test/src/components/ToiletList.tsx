import React, { useEffect, useState } from 'react';
import { fetchToilets, ToiletItem } from '../services/api';
import StarRating from './StarRating';
import '../styles/toiletList.css';
import PriceDisplay from './PriceDisplay';

const ToiletList: React.FC = () => {
  const [toilets, setToilets] = useState<ToiletItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getToilets = async () => {
      try {
        const data = await fetchToilets();
        setToilets(data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    getToilets();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Toilets</h1>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          margin: '0 -10px',
          listStyleType: 'none',
        }}
      >
        {toilets.map((toilet) => (
          <li
            key={toilet.id}
            style={{
              margin: '10px',
              border: '1px solid #ddd',
              padding: '10px',
              width: 'calc(33.333% - 20px)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <img
                src={toilet.image.url}
                alt={toilet.productName}
                style={{ objectFit: 'cover' }}
              />
              <img
                src={toilet.brand.brandImage.url}
                alt={toilet.brand.name}
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
            <h2>{toilet.productName}</h2>
            <PriceDisplay price={toilet.price} />
            <div className="inline-reviews">
              <StarRating rating={toilet.averageRating} />{' '}
              <p>{toilet.reviewsCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToiletList;
