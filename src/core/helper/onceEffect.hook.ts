import React from 'react';

// Плохо работает
const useOnceEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  condition = true,
  clean: () => void | undefined = () => {},
): void => {
  const [done, setDone] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!done && condition) {
      effect();
      setDone(true);
    }
  }, [deps, effect, done, condition]);
  React.useEffect(() => {
    return () => {
      if (!condition) clean();
    };
  }, [clean, condition]);
};

export default useOnceEffect;
