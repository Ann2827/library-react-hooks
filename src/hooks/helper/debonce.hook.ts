import React from 'react';

const useDebounce = (): ((callback: () => void, debounceTime: number) => () => void) => {
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  const counter = React.useRef<number>(0);
  const clear = React.useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  return React.useCallback(
    (callback, debounceTime = 300) => {
      const count = counter.current;
      if (count === 0) {
        counter.current = count + 1;
        callback();
      } else {
        clear();
        timeout.current = setTimeout(() => {
          counter.current = count + 1;
          callback();
        }, debounceTime);
      }

      return () => clear();
    },
    [clear],
  );
};

export default useDebounce;
