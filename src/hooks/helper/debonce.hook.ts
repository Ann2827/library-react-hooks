import React from 'react';

const useDebounce = (): ((callback: () => void, debounceTime: number) => () => void) => {
  const refTimeout = React.useRef<ReturnType<typeof setTimeout>>();
  const refCounter = React.useRef<number>(0);
  const clear = React.useCallback(() => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
      refTimeout.current = undefined;
    }
  }, []);

  return React.useCallback(
    (callback, debounceTime = 300) => {
      const count = refCounter.current;
      if (count === 0) {
        refCounter.current = count + 1;
        callback();
      } else if (!refTimeout.current) {
        refTimeout.current = setTimeout(() => {
          refCounter.current = count + 1;
          clear();
          callback();
        }, debounceTime);
      }

      return () => clear();
    },
    [clear],
  );
};

export default useDebounce;
