import React, { useState } from 'react';

const ListGenerator = () => {
  const [characters, setCharacters] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

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

  const cardClick = (index) => {
    const charactersCopy = [...characters];
    if (charactersCopy[index].clicked === true) {
      alert('You already clicked this character!');
      fetchCharacters();
    } else {
      charactersCopy[index].clicked = true
    }
  }

  return (
    <div>
      <button onClick={fetchCharacters}>
        {hasStarted ? 'Restart' : 'Start'}
      </button>
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