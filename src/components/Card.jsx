import React from 'react';

const Card = ({ character, onClick }) => {
  return (
    <div onClick={onClick} className='card'>
      <img src={character.img} alt={`Character ${character.key}`} />
    </div>
  );
};

export default Card;