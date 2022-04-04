import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [didError, setDidError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then( response => {
        setPersons(response)
        setFilteredPersons(response)
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
              const msg = `Successfully updated ${updatedPerson.name}'s number.`
              setMessage(msg)
              setTimeout( () => {
                setMessage(null)
              }, 5000)
            })
            .catch( () => {
              const msg = `${updatedPerson.name} was already removed from the server.`
              setMessage(msg)
              setDidError(true)
              setNewName('')
              setNewNumber('')
              setPersons(persons.filter(person => person.id !== updatedPerson.id))
              setFilteredPersons(filteredPersons.filter(person => person.id !== updatedPerson.id))
              setTimeout( () => {
              setMessage(null)
              setDidError(false)
            }, 5000)
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
      id: persons[persons.length-1].id + 1
    }

    personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setFilteredPersons(filteredPersons.concat(newPerson))
        const msg = `Successfully added ${newPerson.name} to the phonebook.`
        setMessage(msg)
        setTimeout( () => {
          setMessage(null)
        }, 5000)
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
        .catch( () => {
          const msg = `${personToDelete.name} was already removed from the server.`
          setMessage(msg)
          setDidError(true)
          setNewName('')
          setNewNumber('')
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== personToDelete.id))
          setTimeout( () => {
          setMessage(null)
          setDidError(false)
        }, 5000)
      })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={didError}/>
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