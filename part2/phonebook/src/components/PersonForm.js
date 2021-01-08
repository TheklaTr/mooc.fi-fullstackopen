import React from 'react';

const PersonForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            name: <input value={props.name} onChange={props.nameOnChange} />
         </div>
         <div>
            number:{' '}
            <input value={props.number} onChange={props.numberOnChange} />
         </div>
         <div>
            <button type="submit">add</button>
         </div>
      </form>
   );
};

export default PersonForm;
