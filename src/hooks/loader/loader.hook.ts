import { useCallback, useEffect, useState } from 'react';
import { LoaderI } from './loader.types';
import { data } from './data';

const useLoader = (): LoaderI => {
  const [trigger, setTrigger] = useState<number>(0);
  const [active, setActive] = useState(data.getActive());
  const [quantity, setQuantity] = useState<number>(0);
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
    setQuantity(data.getQuantity());
  }, [trigger]);
  const loaderStop = useCallback(() => data.stop(), []);
  const _reset = useCallback(() => data.reset(), []);

  return { active, loaderOn, loaderOff, on, loaderStop, _reset, quantity };
};

export default useLoader;
