import Person from './Person';
import React from 'react';

const Persons = ({ persons, removeOnClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} removeOnClick={removeOnClick} />
      ))}
    </div>
  );
};

export default Persons;
