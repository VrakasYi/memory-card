import React, { useState } from 'react';
import ScoreBoard from './ScoreBoard';
import Card from './Card';

const ListGenerator = () => {
  const [characters, setCharacters] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState({ currentScore: 0, bestScore: 0 });

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
      setScore({ currentScore: 0, bestScore: scoreCopy.bestScore });
      fetchCharacters();
    } else {
      charactersCopy[index].clicked = true;
      const newScore = scoreCopy.currentScore + 1;
      setScore({
        currentScore: newScore,
        bestScore: Math.max(newScore, scoreCopy.bestScore),
      });
      shuffleArray(charactersCopy);
    }

    setCharacters(charactersCopy);
  };

  return (
    <div>
      <button onClick={fetchCharacters}>
        {hasStarted ? 'Restart' : 'Start'}
      </button>
      <ScoreBoard currentScore={score.currentScore} bestScore={score.bestScore} />
      <div className='card-container'>
        {characters.map((character, index) => (
          <Card key={index} character={character} onClick={() => cardClick(index)} />
        ))}
      </div>
    </div>
  );
};

export default ListGenerator;
