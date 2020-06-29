import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const PhotoCamera = () => {
  return (
    <div className='photo-camera'>
      <Camera
        onTakePhoto={(uri: string) => {
          axios.post('http://localhost:3001/create', {
            data: uri
          });
        }}
      />
      <Link to='/'>home</Link>
    </div>
  );
};

export default PhotoCamera;
