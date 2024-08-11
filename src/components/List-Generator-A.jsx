import React, { useState } from 'react';

const ListGenerator = () => {
  const [characters, setCharacters] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState( { currentScore: 0, bestScore: 0} );

  const generateRandomNumbers = () => {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 826) + 1);
  };

  const fetchCharacterData = async (number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${number}`);
    const data = await response.json();
    return { key: number, img: data.image, clicked: false };
  };

  const fetchCharacters = async () => {
    setHasStarted(true);
    const randomNumbers = generateRandomNumbers();
    const characterPromises = randomNumbers.map(fetchCharacterData);
    const charactersData = await Promise.all(characterPromises);
    setCharacters(charactersData);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const cardClick = (index) => {
    const charactersCopy = [...characters];
    const scoreCopy = { ...score };
    if (charactersCopy[index].clicked === true) {
      alert('You already clicked this character!');
      setScore(prevScore => ({ 
        ...prevScore, 
        currentScore: 0 
      }));
      // Restart game
      fetchCharacters();
    } else {
      charactersCopy[index].clicked = true
      setScore(prevScore => {
        const newScore = prevScore.currentScore + 1;
        return {
          currentScore: newScore,
          bestScore: Math.max(newScore, prevScore.bestScore),
        };
      });
      shuffleArray(charactersCopy);
    }
    setCharacters(charactersCopy);
  }

  return (
    <div>
      <button onClick={fetchCharacters}>
        {hasStarted ? 'Restart' : 'Start'}
      </button>
      <div className='score-board'>
        <p>Current Score: {score.currentScore}</p>
        <p>Best Score: {score.bestScore}</p>
      </div>
      <div className='card-container'>
        {characters.map((character, index) => (
          <div onClick={() => cardClick(index)} key={index} className='card'>
            <img src={character.img} alt={`Character ${character.key}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGenerator;