import { useState, useEffect } from 'react';
import useWindowResize from './useWindowResize';

export default function useThumbnailSize(ref, image) {
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
