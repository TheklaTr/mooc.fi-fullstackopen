import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
   const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' },
   ]);
   const [newName, setNewName] = useState('');
   const [newNumber, setNewNumber] = useState('');
   const [filterPerson, setFilterPerson] = useState('');

   useEffect(() => {
      axios.get('http://localhost:3001/persons').then((response) => {
         setPersons(response.data);
      });
   }, []);

   const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
         name: newName,
         number: newNumber,
      };

      const existingNames = persons.map((person) => person.name);

      if (existingNames.indexOf(newName) !== -1) {
         alert(`${newName} is already added to phonebook`);
      } else {
         setPersons(persons.concat(personObject));
         setNewName('');
         setNewNumber('');
      }
   };

   // filter input
   const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(filterPerson.toLowerCase())
   );

   const handleFilterChange = (event) => {
      setFilterPerson(event.target.value);
   };

   const handleNameChange = (event) => {
      setNewName(event.target.value);
   };

   const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
   };

   return (
      <div>
         <h2>Phonebook</h2>
         <Filter filter={filterPerson} handleChange={handleFilterChange} />
         <h2>add a new</h2>
         <PersonForm
            handleSubmit={addPerson}
            name={newName}
            nameOnChange={handleNameChange}
            number={newNumber}
            numberOnChange={handleNumberChange}
         />
         <h2>Numbers</h2>
         <Persons persons={personsToShow} />
      </div>
   );
};

export default App;
