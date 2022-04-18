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
    filterByNumericValue: [],
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
      setState((prevSt) => ({ ...prevSt, data, planets: data }));
    });
  });

  const contextVelue = {
    data: state.data,
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
