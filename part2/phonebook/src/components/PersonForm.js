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

export default PersonForm