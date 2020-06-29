import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PhotoCamera from './components/PhotoCamera';
import Image from './components/Image';

function App() {
  const [images, setImages] = useState<string[]>([]);
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={() => <Image images={images} />} />
          <Route
            path='/create'
            component={() => (
              <PhotoCamera images={images} setImages={setImages} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
