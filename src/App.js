import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import './App.css';

const App = () => (
  <Provider>
    <Table />
  </Provider>
);

export default App;
