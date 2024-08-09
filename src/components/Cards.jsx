import React, { useState } from 'react';

const CharacterCard = ({ character }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={`card ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
      <img src={character.img} alt={`Character ${character.key}`} />
      <p>{isClicked ? 'Clicked!' : 'Not clicked'}</p>
    </div>
  );
};

export default CharacterCard;



import React, { useState } from 'react';
import CharacterCard from './CharacterCard'; // Import the CharacterCard component

const ListGenerator = () => {
  const [characters, setCharacters] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  const generateRandomNumbers = () => {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 826) + 1);
  };

  const fetchCharacterData = async (number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${number}`);
    const data = await response.json();
    return { key: number, img: data.image };
  };

  const fetchCharacters = async () => {
    setHasStarted(true);
    const randomNumbers = generateRandomNumbers();
    const characterPromises = randomNumbers.map(fetchCharacterData);
    const charactersData = await Promise.all(characterPromises);
    setCharacters(charactersData);
  };

  return (
    <div>
      <button onClick={fetchCharacters}>
        {hasStarted ? 'Restart' : 'Start'}
      </button>
      <div className='card-container'>
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
};


.card {
  border: 2px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
}

.card.clicked {
  border-color: green;
}


export default ListGenerator;
