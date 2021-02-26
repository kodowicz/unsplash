import { useEffect } from 'react';

export default function useOnClickOutside(handler, [...refs]) {
  useEffect(
    () => {
      function listener(event) {
        const isOutside = refs
          .map(ref => !(!ref.current || ref.current.contains(event.target)))
          .every(isOut => isOut);

        if (!isOutside) return;

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [handler, refs]
  );
}
