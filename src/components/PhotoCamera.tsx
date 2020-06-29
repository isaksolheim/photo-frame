import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {
  images: string[];
  setImages: Function;
}

const PhotoCamera: React.FC<Props> = ({ images, setImages }) => {
  return (
    <div className='photo-camera'>
      <Camera
        onTakePhoto={(uri: string) => {
          setImages([...images, uri]);
        }}
      />
    </div>
  );
};

export default PhotoCamera;
