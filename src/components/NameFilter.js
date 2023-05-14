import React, { useContext } from 'react';
import Context from '../context/Context';

function NameFilter() {
  const { filterByName: { name }, changeName } = useContext(Context);
  return (
    <div className="container">
      <input
        type="text"
        className="name-filter"
        data-testid="name-filter"
        value={ name }
        onChange={ changeName }
        placeholder="Procure um planeta"
      />
    </div>
  );
}

export default NameFilter;
