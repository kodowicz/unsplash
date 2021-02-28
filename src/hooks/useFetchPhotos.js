import { useState, useEffect } from 'react';
import { INITPAGE, PERPAGE } from '../variables';

export default function useFetchPhotos(query, page) {
  const [ photos, setPhotos ] = useState([]);

  useEffect(
    () => {
      const endpoint = `https://unsplash.com/napi/search/photos?query=${query}&per_page=${PERPAGE}&page=${page}`

      if (page >= INITPAGE) {
        fetch(`https://cors-anywhere.herokuapp.com/${endpoint}`)
          .then(res => res.json())
          .then(data => {
            setPhotos(data.results)
          })
      }
    },
    [page]
  );

  return photos;
};
