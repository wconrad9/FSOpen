import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const Filter = ({onChange}) => {
  return (
  <>
  filter shown with <input onChange={onChange}/>
  </>
  )
}

const PersonForm = (props) => {
  const {newName, newNumber, addNewName, addNewNumber, onSubmit} = props
  return (
  <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={addNewName} value={newName}/>
        </div>
        <div>
          number: <input onChange={addNewNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  )
}

const Persons = ({ persons, remove }) => {

  return (
    <ul>
      {persons.map( person => 
        <li key={person.id}>
          {person.name} {person.number}
          <Button text={"delete"} onClick={() => remove(person)}/>
        </li>
        )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // test if name already exists in phonebook
    if (persons.map( person => person.name).includes(newName)) {
      const oldPerson = persons.find(p => p.name === newName)
      if (oldPerson.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old
        number with a new one?`)) {
          const updatedPerson = { ...oldPerson, number: newNumber }
          personService
            .update(updatedPerson)
            .then( updatedPerson => {
              setPersons(persons.map( p => p.id !== updatedPerson.id ? p : updatedPerson))
              setFilteredPersons(filteredPersons.map( p => p.id !== updatedPerson.id ? p : updatedPerson))
            })
          return
        } else {
          return
        }
      }
      alert(`${newName} is already in the phonebook!`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setFilteredPersons(filteredPersons.concat(newPerson))
      })
      .catch( reason => console.log(reason))
    setNewName('')
    setNewNumber('')
  }

  const filterNames = (event) => {
    const filter = event.target.value
    const newFilteredPersons = persons.filter( person => {
      return person.name.toLowerCase().includes(filter)
    })
    setFilteredPersons(newFilteredPersons)
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (personToDelete) => {
    console.log("person", personToDelete)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== personToDelete.id))
        })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterNames}/>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addNewName={addNewName}
        addNewNumber={addNewNumber}
        onSubmit={addPerson}
        />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} remove={(person) => deletePerson(person)}/>
    </div>
  )
}

export default App