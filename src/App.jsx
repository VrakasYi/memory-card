import { useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <div>
        <div className='header'>

        </div>
        <div className='card-container'>

        </div>
      </div>
    </>
  )
}

export default App
