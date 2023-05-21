const fetchApi = async () => {
  const endpoint = 'https://swapi.py4e.com/api/planets/';
  const response = await fetch(endpoint);
  const data = await response.json();

  return data.results;
};

const fetchFilms = async (url) => {
  const endpoint = url;
  const response = await fetch(endpoint);
  const data = await response.json();

  return data.title;
}

export { fetchApi, fetchFilms };
