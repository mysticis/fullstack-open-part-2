import React, { useState, useEffect } from "react";
import PhoneBookNotification from "./PhoneBookNotification";
import personService from "../services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorStatus, setError] = useState(false);
  useEffect(() => {
    personService.getRecords().then(records => setPersons(records));
  }, []);

  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleNewName = event => setNewName(event.target.value);

  //write the new addperson functionality here
  const addPerson = event => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newNumber
    };
    const checkName = persons.filter(person =>
      person.name.toLowerCase().includes(newName.toLowerCase())
    );
    console.log(checkName);
    //checkname = [{name: joe, number: 44444, id: 5}]
    if (checkName.length === 0) {
      personService.createRecord(newPersonObject).then(response => {
        setPersons(persons.concat(response));
        setError(false);
        setNotification(`${response.name} was added!`);
        setTimeout(() => {
          setNotification(null);
        }, 4000);
        setNewName("");
        setNewNumber("");
      });
    } else if (
      window.confirm(
        `${checkName[0].name} already exists, replace the old phone number with a new one?`
      )
    ) {
      const personToUpdate = {
        ...checkName[0],
        number: newNumber
      };
      personService
        .updateRecord(checkName[0].id, personToUpdate)
        .then(response => {
          setPersons(
            persons.map(pers => (pers.id === checkName[0].id ? response : pers))
          );
          setNotification(`${checkName[0].name}'s details was updated`);
          setTimeout(() => {
            setNotification(null);
          }, 4000);
          setNewName("");
          setNewNumber("");
        })
        .catch(err => {
          setNotification(
            `${checkName[0].name} has already been deleted from server!`
          );
          setTimeout(() => {
            setNotification(null);
          }, 4000);
          setError(true);
          setNewName("");
          setNewNumber("");
        });
    } else {
      setNewName("");
      setNewNumber("");
    }
  };

  const handleSearchTerm = event => setSearchTerm(event.target.value);
  const removePerson = (id, name) => {
    const person = persons.find(pers => pers.id === id);
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteResource(person.id);
      setPersons(persons.filter(pers => pers.id !== id));
      setError(false);
      setNotification(`${name} was deleted successfully!`);
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } else {
      setPersons(persons);
    }
  };

  const list = searchTerm => {
    return persons
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(pers => (
        <li key={pers.name}>
          {pers.name} {`: ${pers.number}`}
          <button
            onClick={() => removePerson(pers.id, pers.name)}
            style={{ marginLeft: `1rem` }}
          >
            Delete
          </button>
        </li>
      ));
  };
  return (
    <div>
      <h2>PhoneBook</h2>

      <div>Showing results for:</div>
      <PhoneBookNotification message={notification} errorStatus={errorStatus} />
      <Filter searchTerm={searchTerm} onChange={handleSearchTerm} />
      <br />
      <br />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h3>Records</h3>
      {list(searchTerm)}
    </div>
  );
};
export default App;

const Filter = ({ searchTerm, onChange }) => {
  return <input value={searchTerm} onChange={onChange} />;
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber
}) => {
  return (
    <form onSubmit={addPerson}>
      <label>Name:</label>
      <input value={newName} onChange={handleNewName} />
      <br />
      <br />
      <label>Number:</label>
      <input value={newNumber} onChange={handleNewNumber} /> <br />
      <button type="submit">Add</button>
    </form>
  );
};

// response object = {name: "joe", number: "4444", id: 5}
/*const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    const personArray = persons.map(person => person.name.toLowerCase());
    personArray.includes(newName.toLowerCase())
      ? window.alert(`${newName} already exists!`)
      : setPersons(persons.concat(personObject));
    personService
      .createRecord(personObject)
      .then(response => setPersons(persons.concat(response)));
    setNewName("");
    setNewNumber("");
  };
  */
