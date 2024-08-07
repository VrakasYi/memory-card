import React, { useState } from 'react';

const ListGenerator = () => {
  const [numbers, setNumbers] = useState([]);

  const generateRandomNumbers = () => {
    const newNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 826) + 1);
    setNumbers(newNumbers);
  };

  return (
    <div>
      <button onClick={generateRandomNumbers}>Start</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListGenerator;
