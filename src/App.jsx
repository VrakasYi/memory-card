import React from 'react'
import './App.css'
// import Score from './components/Score.jsx'
// import Cards from './components/Cards.jsx'
import ListGenerator from './components/List-Generator.jsx'

function App() {
  // const [score, setScore] = useState(0);
  // const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <ListGenerator />
      {/* <div>
        <div className='header'>          
          Memory game
          <Score />
        </div>
        <div className='card-container'>
          <Cards />
        </div>
      </div> */}
    </>
  )
}

export default App
