import React from 'react';
import Provider from './context/Provider';
import Title from './components/Title';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import OrderColumn from './components/OrderColumn';
import NumberFiltersView from './components/NumberFiltersView';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Title />
      <NameFilter />
      <NumberFilter />
      <OrderColumn />
      <NumberFiltersView />
      <Table />
    </Provider>
  );
}

export default App;
