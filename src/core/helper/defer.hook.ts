import React from 'react';

const useState = <S = undefined>(
  initialState: S | (() => S),
  init?: boolean,
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [done, setDone] = React.useState<boolean>(false);
  const [state, setState] = React.useState<S>(initialState);
  React.useEffect(() => {
    if (!done && init) {
      setState(initialState);
      setDone(true);
    }
  }, [done, init]);
  return [state, setState];
};

const useEffect = (effect: React.EffectCallback, deps?: React.DependencyList, init = true) => {
  const [done, setDone] = React.useState<boolean>(false);
  const dependency = React.useMemo<React.DependencyList | undefined>(
    () => (deps ? [...deps, done] : undefined),
    [deps, done],
  );
  React.useEffect(() => {
    if (init) setDone(true);
  }, [init]);
  React.useEffect(() => {
    if (done) return effect();
  }, dependency);
};

const Defer = {
  useEffect,
  useState,
};

export default Defer;
