import { useEffect, useState } from 'react'
import axios from 'axios'


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

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map( person => 
        <li key={person.id}>{person.name} {person.number}</li>
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
      alert(`${newName} is already in the phonebook.`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const newPersons = persons.concat(newPerson)
    setPersons(newPersons)
    const newFilteredPersons = filteredPersons.concat(newPerson)
    setFilteredPersons(newFilteredPersons)
    setNewName('')
    setNewNumber('')
  }

  const filterNames = (event) => {
    const filter = event.target.value
    const newFilteredPersons = persons.filter( person => {
      return person.name.toLowerCase().includes(filter)
    })
    console.log(newFilteredPersons)
    setFilteredPersons(newFilteredPersons)
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App