import React, { useEffect, useState } from 'react';

interface Props {
  images: string[];
  setImages: Function;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Image: React.FC<Props> = ({ images, setImages }) => {
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let newRandomIndex = getRandomInt(images.length);
      while (newRandomIndex === randomIndex) {
        newRandomIndex = getRandomInt(images.length);
      }
      setRandomIndex(newRandomIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, randomIndex, setImages]);

  return (
    <div className='image'>
      <img src={images[randomIndex]} alt='random' />
    </div>
  );
};

export default Image;
