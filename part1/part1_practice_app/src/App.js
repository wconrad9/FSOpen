import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setLeft(left+1)
    setAllClicks(allClicks.concat("L"))
  }
  
  const handleRightClick = () => {
    setRight(right+1)
    setAllClicks(allClicks.concat("R"))
  }

  return (
    <div>
      {left}
      <Button text={"left"} handleClick={handleLeftClick}/>
      <Button text={"right"} handleClick={handleRightClick}/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App