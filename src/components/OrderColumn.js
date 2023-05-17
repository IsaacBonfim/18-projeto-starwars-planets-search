import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function OrderColumn() {
  const [state, setState] = useState({
    column: 'population',
    sort: 'asc',
  });

  function onChange({ target }) {
    const { name, value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const { sortColumns } = useContext(Context);

  function performSort() {
    const { column, sort } = state;
    const order = {
      column,
      sort,
    };

    sortColumns(order);
  }

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <section className="filter-section">
      <label htmlFor="column" className="filter-label">
        Selecione uma Coluna
        <select
          id="column"
          name="column"
          className="select-filter"
          data-testid="column-sort"
          value={ state.column }
          onChange={ onChange }
        >
          { columns.map((column, index) => (
            <option key={ index } value={ column }>{ column }</option>
          )) }
        </select>
      </label>

      <div className="filter-container" onChange={ onChange }>
        <label htmlFor="asc">
          <input
            id="asc"
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            id="desc"
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        className="button"
        data-testid="column-sort-button"
        onClick={ performSort }
      >
        ordenar
      </button>
    </section>
  );
}

export default OrderColumn;
