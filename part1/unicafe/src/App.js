import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({label, stat}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{stat}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
    <>
      <p>No feedback given</p> 
    </>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine label={"good"} stat={good}/>
        <StatisticLine label={"neutral"} stat={neutral}/>
        <StatisticLine label={"bad"} stat={bad}/>
        <StatisticLine label={"all"} stat={good + neutral + bad}/>
        <StatisticLine label={"average"} stat={((good + (bad * -1))/(good+neutral+bad)).toFixed(1)}/>
        <StatisticLine label={"positive"} stat={(100 * (good/(good+neutral+bad))).toFixed(1)+"%"}/>
      </tbody>
    </table>
  )
}


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>give feedback</h1>
    <div>
      <Button text={"good"} onClick={() => setGood(good+1)}/>
      <Button text={"neutral"} onClick={() => setNeutral(neutral+1)}/>
      <Button text={"bad"} onClick={() => setBad(bad+1)}/>
    </div>
    <h1>statistics</h1>
    <div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    </div>
  )
}

export default App
