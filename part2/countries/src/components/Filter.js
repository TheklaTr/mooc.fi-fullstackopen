import React from 'react';

const Filter = ({ filter, filterOnChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={filterOnChange} />
    </div>
  );
};

export default Filter;
