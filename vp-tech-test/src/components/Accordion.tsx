import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div style={{ borderBottom: '1px solid #ddd', marginBottom: '10px' }}>
      <div
        onClick={toggleAccordion}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '10px 0',
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
