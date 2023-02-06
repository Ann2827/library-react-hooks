import React from 'react';

const useUnmount = (cleanupCallback = () => {}) => {
  const callbackRef = React.useRef(cleanupCallback);
  callbackRef.current = cleanupCallback;
  React.useEffect(() => {
    return () => callbackRef.current();
  }, []);
};

export default useUnmount;
