import Button from './Button'

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

export default Persons