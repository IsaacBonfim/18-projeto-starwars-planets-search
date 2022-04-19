import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../services/fetchApi';

const aux = -1;

function Provider({ children }) {
  const [state, setState] = useState({
    data: [],
    name: '',
  });

  useEffect(() => {
    fetchApi().then((response) => {
      const data = response.sort((a, b) => {
        if (a.name > b.name) return 1;

        if (a.name < b.name) return aux;

        return 0;
      });
      setState((prevState) => ({ ...prevState, data, planets: data }));
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

  const contextVelue = {
    data: state.data,
    filterByName: {
      name: state.name,
    },
    changeName,
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
