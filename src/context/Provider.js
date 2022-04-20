import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../services/fetchApi';

const aux = -1;

function Provider({ children }) {
  const [state, setState] = useState({
    planets: [],
    data: [],
    name: '',
    filterByNumericValues: [],
  });

  useEffect(() => {
    fetchApi().then((response) => {
      const data = response.sort((a, b) => {
        if (a.name > b.name) return 1;

        if (a.name < b.name) return aux;

        return 0;
      });
      setState((prevState) => ({
        ...prevState,
        data,
        planets: data,
      }));
    });
  }, []);

  function changeName({ target: { value } }) {
    setState((prevState) => ({
      ...prevState,
      name: value,
      data: state.planets
        .filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase())),
    }));
  }

  function numberFilter(filters = null) {
    const { planets, filterByNumericValues } = state;
    let data = planets;

    filterByNumericValues.forEach(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        data = data.filter((item) => parseFloat(item[column]) > value);
        break;
      case 'menor que':
        data = data.filter((item) => parseFloat(item[column]) < value);
        break;
      case 'igual a':
        data = data.filter((item) => item[column] === value);
        break;
      default: data = planets;
      }
    });

    if (filters) {
      const { column, comparison, value } = filters;

      switch (comparison) {
      case 'maior que':
        data = data.filter((item) => parseFloat(item[column]) > value);
        break;
      case 'menor que':
        data = data.filter((item) => parseFloat(item[column]) < value);
        break;
      case 'igual a':
        data = data.filter((item) => item[column] === value);
        break;
      default: data = planets;
      }
    }

    setState((prevState) => ({
      ...prevState,
      data,
    }));
  }

  function performeNumberFilter({ column, comparison, value }) {
    setState((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        {
          id: Math.random(),
          column,
          comparison,
          value,
        },
      ],
    }));

    const filter = {
      column,
      comparison,
      value,
    };

    numberFilter(filter);
  }

  const contextVelue = {
    data: state.data,
    filterByName: {
      name: state.name,
    },
    filterByNumericValues: state.filterByNumericValues,
    changeName,
    performeNumberFilter,
  };

  return (
    <Context.Provider value={ contextVelue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
