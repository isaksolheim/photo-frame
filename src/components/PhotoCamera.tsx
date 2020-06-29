import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const PhotoCamera = () => {
  const [photoUri, setPhotoUri] = useState('');

  return (
    <div className='photo-camera'>
      <Camera
        onTakePhoto={(uri: string) => {
          setPhotoUri(uri);
        }}
      />
      <img src={photoUri} alt='random' />
    </div>
  );
};

export default PhotoCamera;
