import React, { useState } from 'react';
import PhotoCamera from './components/PhotoCamera';
import Image from './components/Image';

function App() {
  const [images, setImages] = useState<string[]>([]);
  return (
    <div className='App'>
      <PhotoCamera images={images} setImages={setImages} />
      <Image images={images} />
    </div>
  );
}

export default App;
