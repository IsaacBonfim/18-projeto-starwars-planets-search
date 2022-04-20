import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function NumberFilter() {
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const { performeNumberFilter } = useContext(Context);

  function onChange({ target }) {
    const { name, value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onClick() {
    const { column, comparison, value } = state;

    performeNumberFilter({ column, comparison, value });

    setState({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  }

  const options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <section>
      <label htmlFor="column">
        Busque a:
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          value={ state.column }
          onChange={ onChange }
        >
          { options.map((option) => (
            <option
              key={ Math.random() }
              value={ option }
            >
              { option }
            </option>
          )) }
        </select>
      </label>

      <label htmlFor="comparison">
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

      <input
        type="number"
        name="value"
        placeholder="O Valor"
        data-testid="value-filter"
        value={ state.value }
        onChange={ onChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClick }
      >
        Filtrar
      </button>
    </section>
  );
}

export default NumberFilter;
