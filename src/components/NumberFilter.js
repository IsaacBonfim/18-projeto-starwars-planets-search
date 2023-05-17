import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function NumberFilter() {
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const { performeNumberFilter, filterByNumericValues } = useContext(Context);

  function Columns(column) {
    return filterByNumericValues.some((position) => position.column === column);
  }

  function onChange({ target }) {
    const { name, value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const availableColumns = columnOptions.filter((option) => !Columns(option));

  function onClick() {
    const { column, comparison, value } = state;

    performeNumberFilter({ column, comparison, value });

    setState({
      column: availableColumns[0],
      comparison: 'maior que',
      value: 0,
    });
  }

  return (
    <section className="filter-section">
      <label htmlFor="column" className="filter-label">
        Busque a:
        <select
          id="column"
          name="column"
          className="select-filter"
          data-testid="column-filter"
          value={ state.column }
          onChange={ onChange }
        >
          { availableColumns.map((option) => (
            <option
              key={ Math.random() }
              value={ option }
            >
              { option }
            </option>
          )) }
        </select>
      </label>

      <label htmlFor="comparison" className="filter-label">
        Que seja:
        <select
          id="comparison"
          name="comparison"
          className="select-filter"
          data-testid="comparison-filter"
          value={ state.comparison }
          onChange={ onChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value" className="filter-label">
        O valor
        <input
          type="number"
          name="value"
          className="input-filter"
          data-testid="value-filter"
          value={ state.value }
          onChange={ onChange }
        />
      </label>

      <button
        type="button"
        className="button"
        data-testid="button-filter"
        onClick={ onClick }
        disabled={ availableColumns.length === 0 }
      >
        Filtrar
      </button>
    </section>
  );
}

export default NumberFilter;
