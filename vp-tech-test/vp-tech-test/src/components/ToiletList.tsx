import React, { useEffect, useState } from 'react';
import { fetchToilets, ToiletItem } from '../services/api';
import StarRating from './StarRating';
import '../styles/toiletList.css';
import PriceDisplay from './PriceDisplay';
import PriceFilter from './PriceFilter';

const ToiletList: React.FC = () => {
  const [toilets, setToilets] = useState<ToiletItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

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

  const filteredToilets = toilets.filter((toilet) => {
    if (!selectedRange) return true;
    const price = toilet.price.priceIncTax;
    return price >= selectedRange.min && price <= selectedRange.max;
  });

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Filter By</h1>
      <div style={{ display: 'flex' }}>
        <PriceFilter onFilterChange={setSelectedRange} toilets={toilets} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filteredToilets.map((toilet) => (
            <div
              key={toilet.id}
              style={{
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToiletList;
