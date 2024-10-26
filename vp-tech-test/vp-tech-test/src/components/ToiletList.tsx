import React, { useEffect, useState } from 'react';
import { fetchToilets, ToiletItem } from '../services/api';
import StarRating from './StarRating';
import '../styles/toiletList.css';

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
      <ul>
        {toilets.map((toilet) => (
          <li
            key={toilet.id}
            style={{
              marginBottom: '20px',
              border: '1px solid #ddd',
              padding: '10px',
            }}
          >
            <img
              src={toilet.image.url}
              alt={toilet.productName}
              style={{ width: '200px', height: 'auto' }}
            />
            <img
              src={toilet.brand.brandImage.url}
              alt={toilet.brand.name}
              style={{ width: '100px', height: 'auto' }}
            />
            <h2>{toilet.productName}</h2>
            <p>£{toilet.price.priceIncTax}</p>
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
