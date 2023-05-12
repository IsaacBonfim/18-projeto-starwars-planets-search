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
    <section className="orderColumn-section">
      <label htmlFor="column" className="orderColumn-select-label">
        Selecione uma Coluna
        <select
          id="column"
          name="column"
          data-testid="column-sort"
          value={ state.column }
          onChange={ onChange }
        >
          { columns.map((column, index) => (
            <option key={ index } value={ column }>{ column }</option>
          )) }
        </select>
      </label>

      <div className="orderColumn-radio-div" onChange={ onChange }>
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
        data-testid="column-sort-button"
        onClick={ performSort }
      >
        Ordenar
      </button>
    </section>
  );
}

export default OrderColumn;
