import React from 'react';
import Provider from './context/Context';
import './App.css';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
    </Provider>
  );
}

export default App;
