import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [anecVotes, setAnecVotes] = useState(Array(7).fill(0))
  const [selected, setSelected] = useState(0)

  const mostVotes = Math.max(...anecVotes)
  const mostVotesIndex = anecVotes.indexOf(mostVotes)

  const handleAnecdote = (selected) => {
    const newAnecdotes = anecdotes.filter((v, i) => i !== selected)
    let selection = Math.floor(Math.random()*anecdotes.length)
    while (selection === selected) {
      selection = Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(selection)
  }

  const handleVote = () => {
    const newVotes = [...anecVotes]
    newVotes[selected] += 1
    setAnecVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes[selected]}
      <p>has {anecVotes[selected]} anecVotes</p>
      <div>
        <Button text={"vote"} onClick={() => handleVote()}/>
        <Button text={"next anecdote"} onClick={() => handleAnecdote(selected)}/>
      </div>
      <h1>
        Anecdote with Most Votes
      </h1>
      {anecdotes[mostVotesIndex]}
      <div>
        has {mostVotes} votes
      </div>
    </div>
  )
}

export default App
