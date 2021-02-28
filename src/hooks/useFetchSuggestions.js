import { useState, useEffect } from 'react';

export default function useFetchSuggestions (query) {
  const [ suggestions, setSuggestions ] = useState();

  useEffect(
    () => {
      // to break up cors, because autocomplete is not a part of Unsplash API
      const endpoint = `https://unsplash.com/nautocomplete/${query}`;

      if (query) {
        fetch(`https://cors-anywhere.herokuapp.com/${endpoint}`)
          .then(res => res.json())
          .then(data => setSuggestions(data.autocomplete))
      }
    },
    [query]
  );

  return suggestions;
};
