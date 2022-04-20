import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import './App.css';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumberFilter />
      <Table />
    </Provider>
  );
}

export default App;
