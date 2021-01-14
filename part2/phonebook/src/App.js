import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((newPerson) => setPersons(newPerson))
      .catch((error) => console.log(error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingNames = persons.map((person) => person.name);
    const existingId = existingNames.indexOf(newName);

    if (existingId !== -1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newInfo = { ...persons[existingId], number: newNumber };
        personService
          .replace(newInfo)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== newInfo.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => console.error());
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => console.log(error));
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

  const handleDeleteBtn = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          console.log(error);
        });
    }
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
      <Persons persons={personsToShow} removeOnClick={handleDeleteBtn} />
    </div>
  );
};

export default App;
