import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchApi, fetchFilms } from '../services/fetchApi';

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

  const requestPlanets = async () => {
    await fetchApi().then((response) => {
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
  }

  const resquestFilms = async (url) => {
    const film = await fetchFilms(url).then((response) => {
      const data = response;
      
      return data;
    })
    return film;
  }
  
  useEffect(() => {
    requestPlanets();
  }, []);

  useEffect(() => {
    if (state.data.length > 0) {
      const { data } = state

      for (let i = 0 ; i < data.length ; i++) {
        const films = data[i].films.map(async (film) => {
          const title = await resquestFilms(film);
          
          return title;
        });
      }
    }
  }, [state.data, state.planets]);

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

  const contextValue = {
    data: state.data,
    filterByName: {
      name: state.name,
    },
    filterByNumericValues: state.filterByNumericValues,
    setState,
    changeName,
    resquestFilms,
    performeNumberFilter,
    deleteFilter,
    sortColumns,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
