import { useCallback, useEffect, useState } from 'react';
import { LoaderI } from './loader.types';
import { data } from './data';

const useLoader = (): LoaderI => {
  const [trigger, setTrigger] = useState(0);
  const [active, setActive] = useState(data.getActive());
  const loaderOn = useCallback(() => {
    data.activate();
    setTrigger((prev) => prev + 1);
  }, []);
  const loaderOff = useCallback(() => {
    data.determinate();
    setTrigger((prev) => prev + 1);
  }, []);
  const on = useCallback((fn) => data.on(fn), []);
  useEffect(() => {
    setActive(data.getActive());
  }, [trigger]);
  const loaderStop = useCallback(() => data.stop(), []);
  const _reset = useCallback(() => data._reset(), []);

  return { active, loaderOn, loaderOff, on, loaderStop, _reset };
};

export default useLoader;
