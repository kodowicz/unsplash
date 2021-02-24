import { useState, useEffect } from 'react';

export default function useAutoComplete(value, strings) {
  const [ suggestions, setSuggestions ] = useState(null);
  const regexp = new RegExp(value, 'gi');
  const maxSize = 5;

  useEffect(
    () => {

      function initializeSuggestions(strings) {
        setSuggestions(strings);
      }
      if (!suggestions) {
        initializeSuggestions(strings);
      }

    }, [value, strings, suggestions]
  );

  if (suggestions && strings?.length > 0) {
    const matching = strings.filter(word => regexp.test(word));

    return [ matching.slice(0, maxSize) ];
  } else {
    return [[]];
  }
}
