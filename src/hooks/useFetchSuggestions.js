import { useState, useEffect } from 'react';

export default function useFetchSuggestions (query) {
  const [ suggestions, setSuggestions ] = useState();

  useEffect(
    () => {
      // to break up cors, because autocomplete is not a part of Unsplash API
      fetch(`https://cors-anywhere.herokuapp.com/https://unsplash.com/nautocomplete/${query}`)
        .then(res => res.json())
        .then(data => {console.log(data); setSuggestions(data.autocomplete)})
    },
    [query]
  );

  return suggestions;
};
