import { useState, useEffect } from 'react';
import useWindowResize from './useWindowResize';

function getStyles(element, property) {
  return getComputedStyle(element).getPropertyValue(property);
};


// I must find better way to position images and blurhash
// it works but it is not a clean code
export default function useThumbnailSize(ref, image) {
  const windowResize = useWindowResize();
  const [ size, setSize ] = useState();
  const columnGapStyle = getStyles(document.documentElement, '--columns-gap');
  const gapValue = parseFloat(columnGapStyle);

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
    [ref, image]
  );

  useEffect(
    () => {
      function getThumbnailSize(image) {
        const container = ref.current.parentNode.parentNode.getBoundingClientRect();
        const width = container.width - gapValue;
        const height = (width * image.height) / image.width;
        
        setSize({ width, height })
      };

      if (size) {
        getThumbnailSize(image);
      }
    },
    [windowResize]
  );

  return size;
};
