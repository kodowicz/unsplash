import { useState, useEffect } from 'react';
import unsplash from '../api/index';

export default function useFetchTopics() {
  const [ state, setState ] = useState([]);

  useEffect(
    () => {
      unsplash.topics.list({
        page: 1
      }).then(({ response }) => setState(response.results))
    },
    []
  );

  return state;
};
