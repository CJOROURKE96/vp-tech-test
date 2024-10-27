import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { ToiletItem } from '../services/api';

interface StyleFilterProps {
  onStyleChange: (selectedStyles: string[]) => void;
  toilets: ToiletItem[];
  selectedPriceRange: { min: number; max: number } | null;
}

const PRODUCT_STYLES = [
  { label: 'Modern', value: 'Modern Toilets' },
  { label: 'Back to Wall', value: 'Back To Wall Toilets' },
  { label: 'Accessible', value: 'Accessible Toilets' },
];

const StyleFilter: React.FC<StyleFilterProps> = ({
  onStyleChange,
  toilets,
  selectedPriceRange,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [stylesWithCounts, setStylesWithCounts] = useState<
    { label: string; value: string; count: number }[]
  >([]);

  useEffect(() => {
    const updatedStyles = PRODUCT_STYLES.map((style) => {
      const count = toilets.filter((toilet) => {
        const withinPriceRange =
          !selectedPriceRange || // Check if there's no price range selected
          (toilet.price.priceIncTax >= selectedPriceRange.min &&
            toilet.price.priceIncTax < selectedPriceRange.max);
        return toilet.defaultCategory.name === style.value && withinPriceRange; // Filter by style and price range
      }).length;
      return { ...style, count };
    });
    setStylesWithCounts(updatedStyles);
  }, [toilets, selectedPriceRange]); // Recalculate counts when toilets or price range change

  // Handle checkbox selection
  const handleCheckboxChange = (style: string) => {
    // If the clicked style is already selected, deselect it or select new style if not selected
    const newSelected = selectedStyles.includes(style) ? [] : [style];

    setSelectedStyles(newSelected);
    onStyleChange(newSelected);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
      <Accordion title="Style">
        {stylesWithCounts.map((style) => (
          <label
            key={style.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <input
              type="checkbox"
              checked={selectedStyles.includes(style.value)} // Check if this style is selected
              onChange={() => handleCheckboxChange(style.value)}
              style={{ marginRight: '8px' }}
            />
            {style.label}{' '}
            <span style={{ marginLeft: '4px', color: '#888' }}>
              ({style.count})
            </span>
          </label>
        ))}
      </Accordion>
    </div>
  );
};

export default StyleFilter;
