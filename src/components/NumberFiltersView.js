import React, { useContext } from 'react';
import Context from '../context/Context';
import '../style/NumberFiltersView.css';

function NumberFiltersView() {
  const { filterByNumericValues, deleteFilter } = useContext(Context);

  return (
    <section className="numberFiltersView-section">
      <button
        type="button"
        className="numberFiltersView-button-removeAll"
        data-testid="button-remove-filters"
        onClick={ () => deleteFilter() }
      >
        Remover Todos
      </button>
      <section className="numberFiltersView-filters-section">
        {filterByNumericValues.map((filter) => (
          <p key={ filter.id } data-testid="filter" className="numberFiltersView-filter">
            <span>{`${filter.column} ${filter.comparison} ${filter.value}`}</span>
            <button
              type="button"
              className="numberFiltersView-button-remove"
              onClick={ () => deleteFilter(filter.id) }
            >
              x
            </button>
          </p>
        ))}
      </section>
    </section>
  );
}

export default NumberFiltersView;
