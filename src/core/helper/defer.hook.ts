import React from 'react';

const useState = <S = undefined>(
  initialState: S | (() => S),
  init = true,
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [done, setDone] = React.useState<boolean>(false);
  const [state, setState] = React.useState<S>(initialState);
  // TODO: useOnceEffect
  React.useEffect(() => {
    if (!done && init) {
      setState(initialState);
      setDone(true);
    }
  }, [done, init]);
  return [state, setState];
};

const useEffect = (effect: React.EffectCallback, deps?: React.DependencyList, init = true): void => {
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

const useRef = <T = undefined>(initialState: T, init = true): React.RefObject<T> => {
  const [done, setDone] = React.useState<boolean>(false);
  const ref = React.useRef(initialState);
  React.useEffect(() => {
    if (!done && init) {
      ref.current = initialState;
      setDone(true);
    }
  }, [done, init]);
  return ref;
};

const useCallback = <T extends (...args: any[]) => any>(callback: T, deps: React.DependencyList, init = true): T => {
  const [done, setDone] = React.useState<boolean>(false);
  const dependency = React.useMemo<React.DependencyList>(() => [...deps, done], [deps, done]);
  React.useEffect(() => {
    if (init) setDone(true);
  }, [init]);
  return React.useCallback((...args: Parameters<T>) => {
    if (done) return callback(...args);
  }, dependency) as T;
};

const useMemo = <T>(factory: () => T, deps: React.DependencyList | undefined, init = true): T => {
  const [done, setDone] = React.useState<boolean>(false);
  const dependency = React.useMemo<React.DependencyList | undefined>(
    () => (deps ? [...deps, done] : undefined),
    [deps, done],
  );
  React.useEffect(() => {
    if (init) setDone(true);
  }, [init]);
  return React.useMemo(factory, dependency);
};

const Defer = {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
};

export default Defer;
