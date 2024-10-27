import React from 'react';

interface PriceProps {
  price: {
    currencyCode: string;
    isOnPromotion: boolean;
    priceIncTax: number;
    wasPriceIncTax: number;
  };
}

const PriceDisplay: React.FC<PriceProps> = ({ price }) => {
  const { currencyCode, isOnPromotion, priceIncTax, wasPriceIncTax } = price;

  return (
    <div style={{ marginBottom: '10px' }}>
      {isOnPromotion ? (
        <>
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {currencyCode} {priceIncTax.toFixed(2)}
          </span>
          <span
            style={{
              marginLeft: '10px',
              textDecoration: 'line-through',
              color: 'black',
            }}
          >
            {currencyCode} {wasPriceIncTax.toFixed(2)}
          </span>
        </>
      ) : (
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          {currencyCode} {priceIncTax.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
