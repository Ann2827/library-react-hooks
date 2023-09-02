import React from 'react';

type TDestructor = () => void;
type TFn = (...args: any[]) => TDestructor;
const makeEffectOn = <P extends Parameters<TFn>>(on: (fn: (...args: P[]) => void) => TDestructor) => {
  // prettier-ignore
  return (callback: (...args: P[]) => (TDestructor | void), deps?: React.DependencyList) => {
    const dependency = React.useMemo(() => [callback, ...(deps || [])], [callback, deps]);
    React.useEffect(() => {
      let destructor: TDestructor | void;
      const clean = on((...args: P[]) => {
        destructor = callback(...args);
      });
      return () => {
        clean();
        if (typeof destructor === 'function') destructor?.();
      };
    }, [callback, dependency]);
  };
};

export default makeEffectOn;
