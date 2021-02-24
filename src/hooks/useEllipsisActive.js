import { useState, useEffect } from 'react';

export default function useEllipsisActive(ref) {
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
