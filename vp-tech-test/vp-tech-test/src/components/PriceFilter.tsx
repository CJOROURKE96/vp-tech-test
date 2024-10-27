import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { ToiletItem } from '../services/api';

interface PriceRange {
  label: string;
  min: number;
  max: number;
  count?: number; // Optional: to display the number of products in that range
}

interface PriceFilterProps {
  onFilterChange: (range: PriceRange | null) => void;
  toilets: ToiletItem[];
}

const PRICE_RANGES: Omit<PriceRange, 'count'>[] = [
  { label: '£0 - £100', min: 0, max: 100 },
  { label: '£100 - £150', min: 100, max: 150 },
  { label: '£150 - £200', min: 150, max: 200 },
  { label: '£200 - £300', min: 200, max: 300 },
  { label: '£300 - £400', min: 300, max: 400 },
  { label: '£400 - £600', min: 400, max: 600 },
  { label: '£600 - £800', min: 600, max: 800 },
  { label: '£800 - £1000', min: 800, max: 1000 },
];

const PriceFilter: React.FC<PriceFilterProps> = ({
  onFilterChange,
  toilets,
}) => {
  const [selectedRange, setSelectedRange] = useState<PriceRange | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [priceRangesWithCounts, setPriceRangesWithCounts] = useState<
    PriceRange[]
  >([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const updatedRanges = PRICE_RANGES.map((range) => {
      const count = toilets.filter(
        (toilet) =>
          toilet.price.priceIncTax >= range.min &&
          toilet.price.priceIncTax < range.max
      ).length;
      return { ...range, count };
    });
    setPriceRangesWithCounts(updatedRanges);
  }, [toilets]);

  // Handle checkbox selection
  const handleCheckboxChange = (range: PriceRange) => {
    // Check if the selected range is the same as the clicked range
    const isSameRange = selectedRange === range;

    // Update the selected range
    setSelectedRange(isSameRange ? null : range);

    // Update min and max prices based on the selection
    if (isSameRange) {
      setMinPrice('');
      setMaxPrice('');
      onFilterChange(null);
    } else {
      setMinPrice('');
      setMaxPrice('');
      onFilterChange(range); // Apply the new selected range
    }
  };

  // Handle custom range submission
  const handleCustomRangeSubmit = () => {
    const min = minPrice ? parseFloat(minPrice) : 0; // Default min to 0 if empty
    const max = maxPrice ? parseFloat(maxPrice) : 1000; // Default max to 1000 if empty

    if (!isNaN(max) && min <= max) {
      setSelectedRange(null); // Deselect any pre-set range
      onFilterChange({ label: `£${min} - £${max}`, min, max });
    } else {
      alert('Please enter a valid price range.');
    }
  };

  // Render only the first 6 or all ranges based on showAll state
  const displayedRanges = showAll
    ? priceRangesWithCounts
    : priceRangesWithCounts.slice(0, 6);

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
      <Accordion title="Price">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span>£</span>
          <input
            type="text"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: '50px', margin: '0 5px' }}
          />
          <span>to</span>
          <input
            type="text"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '50px', margin: '0 5px' }}
          />
          <button
            onClick={handleCustomRangeSubmit}
            style={{
              padding: '5px 10px',
              background: '#666',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            GO
          </button>
        </div>

        {displayedRanges.map((range) => (
          <label
            key={range.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <input
              type="checkbox"
              checked={selectedRange?.label === range.label}
              onChange={() => handleCheckboxChange(range)}
              style={{ marginRight: '8px' }}
            />
            {range.label}{' '}
            <span style={{ marginLeft: '4px', color: '#888' }}>
              ({range.count})
            </span>
          </label>
        ))}

        {!showAll && priceRangesWithCounts.length > 6 && (
          <button
            onClick={() => setShowAll(true)}
            style={{
              padding: '5px 10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Show More
          </button>
        )}

        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            style={{
              padding: '5px 10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Show Less
          </button>
        )}
      </Accordion>
    </div>
  );
};

export default PriceFilter;
