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

export function useWindowResize() {
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useThumbnailSize(ref, image) {
  const windowSize = useWindowResize();
  const [ size, setSize ] = useState();

  useEffect(
    () => {
      function getThumbnailSize(image) {
        const container = ref.current.getBoundingClientRect();
        const width = container.width;
        const height = (width * image.height) / image.width;

        setSize({ width, height })
      };

      getThumbnailSize(image);
    },
    [ref, image, windowSize]
  );


  return size;
};

export function useEllipsisActive(ref) {
  const [ isActive, setActive ] = useState(false);

  useEffect(() => {
    function getEllipsis(ref) {
      const isActive = ref.current.offsetWidth < ref.current.scrollWidth;
      setActive(isActive);
    }
    getEllipsis(ref);
  }, [ref]);

  return isActive;
};
