import { useState, useEffect, useMemo } from 'react';
import useScrollElement from './useScrollElement';
import { RATIO } from '../variables';

export default function useScrollGallery() {
  const [ scrollPos, setScrollPos ] = useState();
  const [ docHeight, setDocHeight ] = useState();

  const scrollBottom = useMemo(
    () => {
      const docHeightRatio = docHeight * RATIO;
      return scrollPos >= docHeightRatio
    },
    [scrollPos, docHeight]
  );

  useScrollElement(
    () => {
      function handleScroll() {
        const scrollPos = window.innerHeight + window.scrollY;
        const docHeight = document.body.offsetHeight;
        setScrollPos(scrollPos);
        setDocHeight(docHeight);
      };

      handleScroll();
    },
    [window]
  );

  return scrollBottom;
}
