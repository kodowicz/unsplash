import { useState, useEffect, useMemo } from 'react';
import { RATIO } from '../variables';

export default function useScroll() {
  const [ scrollPos, setScrollPos ] = useState();
  const [ docHeight, setDocHeight ] = useState();

  const scrollBottom = useMemo(
    () => {
      const docHeightRatio = docHeight * RATIO;
      return scrollPos >= docHeightRatio
    },
    [scrollPos, docHeight]
  );

  function handleScroll() {
    const scrollPos = window.innerHeight + window.scrollY;
    const docHeight = document.body.offsetHeight;
    setScrollPos(scrollPos);
    setDocHeight(docHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return scrollBottom
}
