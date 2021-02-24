import { useState, useEffect } from 'react';
import unsplash from '../api/index';

export default function useFetchPhotos(query, perPage) {
  const [ state, setState ] = useState([]);

  useEffect(
    () => {
      unsplash.search
        .getPhotos({ query, perPage })
        .then(({ response }) => setState(response.results))
    },
    [query, perPage]
  );

  return state;
};
