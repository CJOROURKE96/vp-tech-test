import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { ToiletItem } from '../services/api';

interface StyleFilterProps {
  onStyleChange: (selectedStyles: string[]) => void;
  toilets: ToiletItem[];
}

const PRODUCT_STYLES = [
  { label: 'Modern', value: 'Modern Toilets' },
  { label: 'Back to Wall', value: 'Back To Wall Toilets' },
  { label: 'Accessible', value: 'Accessible Toilets' },
];

const StyleFilter: React.FC<StyleFilterProps> = ({
  onStyleChange,
  toilets,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [stylesWithCounts, setStylesWithCounts] = useState<
    { label: string; value: string; count: number }[]
  >([]);

  useEffect(() => {
    const updatedStyles = PRODUCT_STYLES.map((style) => {
      const count = toilets.filter(
        (toilet) => toilet.defaultCategory.name === style.value
      ).length; // Assuming 'style' is a property in ToiletItem
      return { ...style, count };
    });
    setStylesWithCounts(updatedStyles);
  }, [toilets]); // Update counts whenever toilets change

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
