import { useState, useEffect } from 'react';
import { PERPAGE } from '../variables';

export default function useFetchSearched(query) {
  const [ data, setData ] = useState({
    initPhotos: [],
    topics: []
  });

  useEffect(
    () => {
      // to break up cors, because related_searches is not a part of Unsplash API
      const endpoint = `https://unsplash.com/napi/search?query=${query}&per_page=${PERPAGE}&xp=feedback-loop-v2`;

      fetch(`https://cors-anywhere.herokuapp.com/${endpoint}`)
        .then(res => res.json())
        .then(data => {
          setData({
            initPhotos: data.photos.results,
            topics: data.related_searches
          })
        })
    },
    [query]
  );

  return data;
};
