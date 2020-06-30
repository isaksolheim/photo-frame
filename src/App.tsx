import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PhotoCamera from './components/PhotoCamera';
import Image from './components/Image';

function App() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/').then((res: any) => {
      setImages(res.data.images);
    });
  }, []);

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={() => <PhotoCamera />} />
          <Route
            exact
            path='/gallery'
            component={() => <Image images={images} setImages={setImages} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
