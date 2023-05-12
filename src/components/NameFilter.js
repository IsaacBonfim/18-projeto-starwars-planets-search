import React, { useContext } from 'react';
import Context from '../context/Context';

function NameFilter() {
  const { filterByName: { name }, changeName } = useContext(Context);
  return (
    <input
      type="text"
      className="name-filter"
      data-testid="name-filter"
      value={ name }
      onChange={ changeName }
      placeholder="Procure um planeta"
    />
  );
}

export default NameFilter;
