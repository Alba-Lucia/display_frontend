import React from 'react';

function ProductAge() {
  const calculateAge = () => {
    const now = new Date();
    const createdTime = new Date();
    const diffInMs = now.getTime() - createdTime.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const age = calculateAge();

  return (
    <div>
      <p>Fecha de creación: {}</p>
      <p>Días desde la creación: {age}</p>
    </div>
  );
}

export default ProductAge;