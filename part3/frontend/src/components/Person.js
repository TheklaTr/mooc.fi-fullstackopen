import React from 'react';

const Person = ({ person, removeOnClick }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={() => removeOnClick(person.id)}>delete</button>
    </p>
  );
};

export default Person;
