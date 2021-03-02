import { useEffect } from 'react';

export default function useScrollElement(handler, [element]) {
  useEffect(
    () => {
      function listener(event) {
        handler(event);
      };

      if (!element) return; 
      element.addEventListener('scroll', listener);

      return () => {
        element.removeEventListener('scroll', listener);
      };
    },
    [handler, element]
  );
}
