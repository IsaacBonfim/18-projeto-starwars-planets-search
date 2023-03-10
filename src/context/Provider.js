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
    order: {
      column: '',
      sort: '',
    },
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

  function verifyFilter(planets, { column, comparison, value }) {
    switch (comparison) {
    case 'maior que':
      planets = planets.filter((item) => parseFloat(item[column]) > value);
      break;
    case 'menor que':
      planets = planets.filter((item) => parseFloat(item[column]) < value);
      break;
    case 'igual a':
      planets = planets.filter((item) => item[column] === value);
      break;
    default: planets = state.planets;
    }

    return planets;
  }

  function numberFilter(filters = null) {
    const { planets, filterByNumericValues } = state;
    let data = planets;

    filterByNumericValues.forEach((filter) => {
      data = verifyFilter(data, filter);
    });

    if (filters) {
      data = verifyFilter(data, filters);
    }

    setState((prevState) => ({
      ...prevState,
      data,
    }));
  }

  useEffect(() => {
    numberFilter();
  }, [state.filterByNumericValues]);

  function performeNumberFilter({ column, comparison, value }) {
    setState((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
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

  function deleteFilter(id = null) {
    const { filterByNumericValues, planets } = state;

    if (!id) {
      setState((prevState) => ({
        ...prevState,
        filterByNumericValues: [],
        data: planets,
      }));
    } else {
      const filters = filterByNumericValues.filter((filter) => filter.id !== id);

      setState((prevState) => ({
        ...prevState,
        filterByNumericValues: filters,
      }));
    }
  }

  function orderList({ column, sort }, sortList) {
    const { data } = state;
    if (sort === 'ASC') {
      sortList = data.sort((a, b) => a[column] - b[column]);
    } else {
      sortList = data.sort((a, b) => b[column] - a[column]);
    }

    return sortList;
  }

  useEffect(() => {
    const { order } = state;
    const sortList = [];

    let list = [...orderList(order, sortList)];

    if (order.column === 'population') {
      const newInfo = list.filter((planet) => planet.population !== 'unknown');
      const unkPopulation = list.filter((planet) => planet.population === 'unknown');

      list = [...newInfo, ...unkPopulation];
    }

    setState((prevState) => ({
      ...prevState,
      data: list,
    }));
  }, [state.order]);

  function sortColumns(order) {
    setState((prevState) => ({
      ...prevState,
      order,
    }));
  }

  const contextVelue = {
    data: state.data,
    filterByName: {
      name: state.name,
    },
    filterByNumericValues: state.filterByNumericValues,
    changeName,
    performeNumberFilter,
    deleteFilter,
    sortColumns,
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
