import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getRandomInt } from './getRandomInt';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [lastImagesLength, setLastImagesLength] = useState(0);
  const [forcedIndex, setForcedIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/').then((res: any) => {
      setImages(res.data.images);
      if (lastImagesLength !== res.data.images.length) {
        setLastImagesLength(res.data.images.length);
        setForcedIndex(res.data.images.length - 1);
      }
    });

    const interval = setInterval(() => {
      if (images.length !== 0) {
        let newRandomIndex = getRandomInt(images.length);
        while (newRandomIndex === randomIndex) {
          newRandomIndex = getRandomInt(images.length);
        }
        if (forcedIndex !== 0) {
          setRandomIndex(forcedIndex);
          setForcedIndex(0);
        } else {
          setRandomIndex(newRandomIndex);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, randomIndex, setImages, lastImagesLength, forcedIndex]);

  return (
    <div className='image'>
      <img src={images[randomIndex]} alt='random' />
    </div>
  );
};

export default Gallery;
