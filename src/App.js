import './App.css';

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './components/routes/Routes';
import Example from './components/registration/Example'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes />
    </Router>
    {/* <Example /> */}
    </div>
  );
}

export default App;
