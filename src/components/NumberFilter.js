import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import '../style/NumberFilter.css';

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
    <section className="numberFilter-section">
      <label htmlFor="column" className="numberFilter-label">
        Busque a:
        <select
          id="column"
          name="column"
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

      <label htmlFor="comparison" className="numberFilter-label">
        Que seja:
        <select
          id="comparison"
          name="comparison"
          data-testid="comparison-filter"
          value={ state.comparison }
          onChange={ onChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value" className="numberFilter-label">
        O valor
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          value={ state.value }
          onChange={ onChange }
        />
      </label>

      <button
        type="button"
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
