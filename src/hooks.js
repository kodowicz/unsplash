import { useState, useEffect } from 'react';

export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
}

export function useAutoComplete(value, strings) {
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
