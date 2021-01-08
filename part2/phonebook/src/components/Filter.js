import React from 'react';

const Filter = ({ handleChange, filter }) => {
   return (
      <div>
         filter shown with
         <input value={filter} onChange={handleChange} />
      </div>
   );
};

export default Filter;
