const fetchApi = async () => {
  const endpoint = 'https://swapi.dev/api/planets/';
  const response = await fetch(endpoint);
  const data = await response.json();

  return data.results;
};

export default fetchApi;
