import { useState, useEffect } from 'react';
import useWindowResize from './useWindowResize';

export default function useImageSize(ref, image) {
  const windowSize = useWindowResize();
  const [ size, setSize ] = useState({
    width: 0,
    height: 0
  });

  useEffect(
    () => {
      function getImageSize(image) {
        const container = ref.current.getBoundingClientRect();
        const ratio = image.height / image.width;
        let height;
        let width;

        if (windowSize.width < 768) {
          width = container.width;
          height = (image.height * width) / image.width;

        } else {
          if (ratio < 0.7) {
            width = container.width;
            height = (image.height * width) / image.width;
          } else {
            height = container.height;
            width = (image.width * height) / image.height;
          }
        }
        setSize({ width, height })
      };

      getImageSize(image);
    },
    [image, windowSize]
  );


  return size;
};
