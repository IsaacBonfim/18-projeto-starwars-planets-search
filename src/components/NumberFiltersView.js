import React, { useContext } from 'react';
import Context from '../context/Context';

function NumberFiltersView() {
  const { filterByNumericValues, deleteFilter } = useContext(Context);

  return (
    <section>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => deleteFilter() }
      >
        Remover Todos
      </button>
      <section>
        {filterByNumericValues.map((filter) => (
          <p key={ filter.id } data-testid="filter">
            <span>{`${filter.column} ${filter.comparison} ${filter.value}`}</span>
            <button
              type="button"
              onClick={ () => deleteFilter(filter.id) }
            >
              X
            </button>
          </p>
        ))}
      </section>
    </section>
  );
}

export default NumberFiltersView;
