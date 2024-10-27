import React, { useEffect, useState } from 'react';
import { fetchToilets, ToiletItem } from '../services/api';
import StarRating from './StarRating';
import '../styles/toiletList.css';
import PriceDisplay from './PriceDisplay';
import PriceFilter from './PriceFilter';
import StyleFilter from './StyleFilter';

const ToiletList: React.FC = () => {
  const [toilets, setToilets] = useState<ToiletItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [styleFilteredToilets, setStyleFilteredToilets] = useState<ToiletItem[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    const getToilets = async () => {
      try {
        const data = await fetchToilets();
        setToilets(data);
        setStyleFilteredToilets(data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    getToilets();
  }, []);

  const filteredToilets = toilets.filter((toilet) => {
    // Price range filter
    if (selectedRange) {
      const price = toilet.price.priceIncTax;
      if (price < selectedRange.min || price > selectedRange.max) return false;
    }

    // Style filter
    if (selectedStyles.length > 0) {
      return selectedStyles.includes(toilet.defaultCategory.name);
    }

    return true; // Include all if no filters are applied
  });

  const handleStyleChange = (styles: string[]) => {
    setSelectedStyles(styles);

    const newFilteredToilets = toilets.filter((toilet) => {
      // Check if the toilet's defaultCategory name matches any of the selected styles
      return styles.includes(toilet.defaultCategory.name);
    });

    setStyleFilteredToilets(newFilteredToilets);
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Filter By</h1>
      <div style={{ display: 'flex' }}>
        <div className="filter-container">
          <PriceFilter onFilterChange={setSelectedRange} toilets={toilets} />
          <StyleFilter onStyleChange={handleStyleChange} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}></div>
        </div>
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
  );
};

export default ToiletList;
