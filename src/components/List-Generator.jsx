import React, { useState } from 'react';

const ListGenerator = () => {
  const [characters, setCharacters] = useState([]);

  const generateRandomNumbers = () => {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 826) + 1);
  };

  const fetchCharacterData = async (number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${number}`);
    const data = await response.json();
    return { key: number, img: data.image };
  };

  const fetchCharacters = async () => {
    const randomNumbers = generateRandomNumbers();
    const characterPromises = randomNumbers.map(fetchCharacterData);
    const charactersData = await Promise.all(characterPromises);
    setCharacters(charactersData);
  };

  return (
    <div>
      <button onClick={fetchCharacters}>Start</button>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <img src={character.img} alt={`Character ${character.key}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGenerator;