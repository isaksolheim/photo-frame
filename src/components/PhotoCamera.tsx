import React from 'react';
import axios from 'axios';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const postImage = (uri: string) => {
  axios.post('http://localhost:3001/create', {
    data: uri
  });
};

const PhotoCamera = () => {
  return (
    <div className='photo-camera'>
      <Camera onTakePhoto={(uri: string) => postImage(uri)} />
      <p>Eller velg bilde fra kamerarull</p>
      <input
        type='file'
        accept='image/*;capture=camera'
        onChange={(event: any) => {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = function() {
            var base64data = reader.result;
            if (typeof base64data === 'string') {
              postImage(base64data);
            }
          };
        }}
      />
    </div>
  );
};

export default PhotoCamera;
